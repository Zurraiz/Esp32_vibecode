'use client';

import { useMemo } from 'react';

import { useAppStore } from '@/store/useAppStore';
import type { DeviceStatus } from '@/types';

interface LiveBarProps {
  onConnect: () => void;
  onDisconnect: () => void;
  onRun: () => void;
  onSave: () => void;
  onClearSaved: () => void;
  hasBlocks: boolean;
}

type StatusConfig = {
  dotClass: string;
  textClass: string;
  label: string;
};

const STATUS_MAP: Record<DeviceStatus, StatusConfig> = {
  idle: {
    dotClass: 'bg-gray-400',
    textClass: 'text-gray-400',
    label: 'Not connected',
  },
  connecting: {
    dotClass: 'bg-yellow-400 animate-pulse',
    textClass: 'text-yellow-500',
    label: 'Connecting…',
  },
  online: {
    dotClass: 'bg-green-500 animate-pulse',
    textClass: 'text-green-600',
    label: 'Online',
  },
  offline: {
    dotClass: 'bg-red-500',
    textClass: 'text-red-500',
    label: 'Offline',
  },
};

export default function LiveBar({
  onConnect,
  onDisconnect,
  onRun,
  onSave,
  onClearSaved,
  hasBlocks,
}: LiveBarProps) {
  const activeDeviceId = useAppStore((state) => state.activeDeviceId);
  const deviceStatus = useAppStore((state) => state.deviceStatus);
  const loopMode = useAppStore((state) => state.loopMode);
  const savedProgramExists = useAppStore((state) => state.savedProgramExists);
  const savedProgramLoop = useAppStore((state) => state.savedProgramLoop);

  const setActiveDeviceId = useAppStore((state) => state.setActiveDeviceId);
  const setLoopMode = useAppStore((state) => state.setLoopMode);

  const statusInfo = STATUS_MAP[deviceStatus];
  const canRunOrSave = deviceStatus === 'online' && hasBlocks;

  const connectButton = useMemo(() => {
    if (deviceStatus === 'connecting') {
      return {
        label: 'Connecting...',
        className: 'bg-gray-400 text-white cursor-not-allowed',
        disabled: true,
        onClick: () => {},
      };
    }

    if (deviceStatus === 'online') {
      return {
        label: 'Disconnect',
        className: 'bg-red-500 text-white hover:bg-red-600',
        disabled: false,
        onClick: onDisconnect,
      };
    }

    return {
      label: 'Connect',
      className: 'bg-[#2E4862] text-white',
      disabled: false,
      onClick: onConnect,
    };
  }, [deviceStatus, onConnect, onDisconnect]);

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center">
          <span className="text-xs font-semibold text-gray-500 mr-1">📡 Device</span>
          <input
            type="text"
            placeholder="esp32_XXXXXXXX"
            className="font-mono text-xs w-36 border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#2E4862]"
            value={activeDeviceId ?? ''}
            onChange={(event) => setActiveDeviceId(event.target.value || null)}
          />
        </div>

        <button
          type="button"
          disabled={connectButton.disabled}
          onClick={connectButton.onClick}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${connectButton.className}`}
        >
          {connectButton.label}
        </button>

        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${statusInfo.dotClass}`} />
          <span className={`text-xs ${statusInfo.textClass}`}>{statusInfo.label}</span>
        </div>

        <div className="h-4 w-px bg-gray-200" />

        <button
          type="button"
          onClick={() => setLoopMode(!loopMode)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium border ${
            loopMode
              ? 'text-white bg-green-500 border-transparent'
              : 'text-gray-500 bg-gray-100 border-gray-200'
          }`}
        >
          🔁 Loop
        </button>

        <button
          type="button"
          onClick={onRun}
          disabled={!canRunOrSave}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
            canRunOrSave
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          ▶ Run
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={!canRunOrSave}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
            canRunOrSave
              ? 'bg-[#2E4862] hover:bg-[#1f3346] text-white'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          💾 Save
        </button>

        {savedProgramExists && (
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 border border-purple-200 rounded-full px-2.5 py-1 text-xs font-medium">
            <span>💾 Saved{savedProgramLoop ? ' (Loop)' : ''}</span>
            <button
              type="button"
              onClick={onClearSaved}
              className="text-purple-500 hover:text-purple-700"
              aria-label="Clear saved program"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
