import { useCallback, useEffect, useRef } from 'react';
import mqtt, { type MqttClient } from 'mqtt';

import { useAppStore } from '@/store/useAppStore';
import type { Command } from '@/types';

const MQTT_URL = 'wss://broker.hivemq.com:8884/mqtt';

const randomHex = (length: number): string => {
  const chars = '0123456789abcdef';
  let out = '';
  for (let i = 0; i < length; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
};

export function useMQTT() {
  const setDeviceStatus = useAppStore((state) => state.setDeviceStatus);
  const setSavedProgram = useAppStore((state) => state.setSavedProgram);
  const addLogEntry = useAppStore((state) => state.addLogEntry);

  const mqttClientRef = useRef<MqttClient | null>(null);
  const heartbeatTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeDeviceIdRef = useRef<string>('');

  const clearHeartbeatTimer = useCallback(() => {
    if (heartbeatTimerRef.current) {
      clearTimeout(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
  }, []);

  const scheduleHeartbeatDropout = useCallback(() => {
    clearHeartbeatTimer();
    heartbeatTimerRef.current = setTimeout(() => {
      setDeviceStatus('offline');
      addLogEntry('No heartbeat - device may be offline', 'err');
    }, 15000);
  }, [addLogEntry, clearHeartbeatTimer, setDeviceStatus]);

  const publishToDevice = useCallback(
    (payload: unknown) => {
      const client = mqttClientRef.current;
      const deviceId = activeDeviceIdRef.current;

      if (!client || !deviceId) {
        addLogEntry('Cannot publish: MQTT client/device not ready.', 'err');
        return;
      }

      client.publish(`esp32/${deviceId}/commands`, JSON.stringify(payload));
    },
    [addLogEntry],
  );

  const handleMessage = useCallback(
    (topic: string, payload: Uint8Array) => {
      let msg: Record<string, unknown>;

      try {
        msg = JSON.parse(payload.toString()) as Record<string, unknown>;
      } catch {
        addLogEntry(`Invalid JSON on ${topic}: ${payload.toString()}`, 'err');
        return;
      }

      if (topic.endsWith('/heartbeat')) {
        setDeviceStatus('online');

        const uptime = msg.uptime ?? 'n/a';
        const heap = msg.heap ?? 'n/a';
        const ip = msg.ip ?? 'n/a';
        addLogEntry(`Heartbeat: uptime=${uptime}, heap=${heap}, ip=${ip}`, 'ok');

        scheduleHeartbeatDropout();
        return;
      }

      if (topic.endsWith('/status')) {
        if (msg.action === 'pong') {
          setDeviceStatus('online');
          addLogEntry(`Pong received: ${JSON.stringify(msg)}`, 'ok');
          return;
        }

        if (msg.action === 'digitalRead' || msg.action === 'analogRead') {
          addLogEntry(`Sensor reading: ${JSON.stringify(msg)}`, 'data');
          return;
        }

        if (msg.status === 'online') {
          setDeviceStatus('online');
          addLogEntry('Device is online.', 'ok');
          return;
        }

        if (msg.status === 'offline') {
          addLogEntry('⚠️ Device disconnected - waiting for reconnect...', 'warn');
          return;
        }

        if (msg.status === 'saved') {
          setSavedProgram(true, Boolean(msg.loop));
          addLogEntry(`Program saved${msg.loop ? ' (loop mode)' : ''}.`, 'ok');
          return;
        }

        if (msg.status === 'ok' && msg.detail === 'program_cleared') {
          setSavedProgram(false, false);
          addLogEntry('Saved program cleared.', 'warn');
          return;
        }

        if (msg.status === 'running') {
          addLogEntry('Program is running on device.', 'warn');
          return;
        }

        if (msg.status === 'ready') {
          addLogEntry('Device is ready.', 'ok');
          return;
        }

        if (msg.status === 'error') {
          addLogEntry(`Device error: ${JSON.stringify(msg)}`, 'err');
          return;
        }

        addLogEntry(`Status data: ${JSON.stringify(msg)}`, 'data');
      }
    },
    [addLogEntry, scheduleHeartbeatDropout, setDeviceStatus, setSavedProgram],
  );

  const disconnect = useCallback(() => {
    clearHeartbeatTimer();

    if (mqttClientRef.current) {
      mqttClientRef.current.end(true);
      mqttClientRef.current = null;
    }

    activeDeviceIdRef.current = '';
    setDeviceStatus('idle');
    addLogEntry('Disconnected.', 'warn');
  }, [addLogEntry, clearHeartbeatTimer, setDeviceStatus]);

  const connect = useCallback(
    (deviceId: string) => {
      const trimmedId = deviceId.trim();

      if (!trimmedId.startsWith('esp32_')) {
        addLogEntry('Invalid device ID. Must start with esp32_.', 'err');
        return;
      }

      if (mqttClientRef.current) {
        mqttClientRef.current.end(true);
        mqttClientRef.current = null;
      }
      clearHeartbeatTimer();

      activeDeviceIdRef.current = trimmedId;
      setDeviceStatus('connecting');

      const client = mqtt.connect(MQTT_URL, {
        clientId: `webapp_${randomHex(8)}`,
        reconnectPeriod: 3000,
        connectTimeout: 8000,
      });

      mqttClientRef.current = client;

      client.on('connect', () => {
        client.subscribe(`esp32/${trimmedId}/status`);
        client.subscribe(`esp32/${trimmedId}/heartbeat`);

        client.publish(`esp32/${trimmedId}/commands`, JSON.stringify({ action: 'ping' }));

        addLogEntry('Connected to broker. Waiting for device...', 'warn');
        scheduleHeartbeatDropout();
      });

      client.on('message', handleMessage);

      client.on('error', (error) => {
        addLogEntry(`MQTT error: ${error.message}`, 'err');
      });

      client.on('offline', () => {
        setDeviceStatus('offline');
        addLogEntry('Broker connection lost', 'err');
      });

      client.on('reconnect', () => {
        addLogEntry('Reconnecting to broker...', 'warn');
        setDeviceStatus('connecting');
      });
    },
    [addLogEntry, clearHeartbeatTimer, handleMessage, scheduleHeartbeatDropout, setDeviceStatus],
  );

  const runProgram = useCallback(
    (commands: Command[]) => {
      publishToDevice(commands);
      addLogEntry(`Sent program with ${commands.length} command(s).`, 'ok');
    },
    [addLogEntry, publishToDevice],
  );

  const saveProgram = useCallback(
    (commands: Command[], loop: boolean) => {
      publishToDevice({ save: true, loop, program: commands });
      addLogEntry(`Saved program (${commands.length} command(s), loop=${loop}).`, 'ok');
    },
    [addLogEntry, publishToDevice],
  );

  const clearSavedProgram = useCallback(() => {
    publishToDevice({ control: 'clearProgram' });
    addLogEntry('Requested clear saved program.', 'warn');
  }, [addLogEntry, publishToDevice]);

  const sendPing = useCallback(() => {
    publishToDevice({ action: 'ping' });
  }, [publishToDevice]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    connect,
    disconnect,
    runProgram,
    saveProgram,
    clearSavedProgram,
    sendPing,
  };
}
