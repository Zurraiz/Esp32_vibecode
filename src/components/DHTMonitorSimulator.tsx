'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Thermometer, Droplets, Terminal, Play, Square } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

function randomDrift(base: number, range: number) {
  return parseFloat((base + (Math.random() - 0.5) * range).toFixed(1));
}

const REQUIRED = ['dht_setup', 'dht_temp', 'dht_hum', 'serial_println'];

export default function DHTMonitorSimulator() {
  const blocks = useAppStore(state => state.blocks);

  const dhtBlock = blocks.find(b => b.type === 'dht_setup');
  const tempBlock = blocks.find(b => b.type === 'dht_temp');
  const humBlock  = blocks.find(b => b.type === 'dht_hum');
  const pin = dhtBlock ? Number(dhtBlock.values?.pin ?? 4) : 4;
  const tempVar = tempBlock ? String(tempBlock.values?.var ?? 'temp') : 'temp';
  const humVar  = humBlock  ? String(humBlock.values?.var  ?? 'humidity') : 'humidity';

  const missing = REQUIRED.filter(r => !blocks.find(b => b.type === r));

  const [running, setRunning] = useState(false);
  const [temp, setTemp] = useState(24.0);
  const [hum, setHum]   = useState(55.0);
  const [logs, setLogs] = useState<string[]>([]);
  const isRunningRef = useRef(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => { return () => { isRunningRef.current = false; }; }, []);

  const handleRun = () => {
    if (running) {
      isRunningRef.current = false;
      setRunning(false);
      setLogs([]);
      return;
    }
    isRunningRef.current = true;
    setRunning(true);
    setLogs([]);

    const tick = () => {
      if (!isRunningRef.current) return;
      const t = randomDrift(24, 1.2);
      const h = randomDrift(55, 2.5);
      setTemp(t);
      setHum(h);
      setLogs(prev => [
        ...prev.slice(-28),
        `${tempVar}: ${t.toFixed(1)}°C`,
        `${humVar}: ${h.toFixed(1)}%`,
        '---',
      ]);
      setTimeout(tick, 900);
    };
    setTimeout(tick, 900);
  };

  const tempColor = temp < 20 ? '#3b82f6' : temp < 30 ? '#2E4862' : '#ef4444';
  const humColor  = hum < 40 ? '#f59e0b' : hum < 70 ? '#2E4862' : '#3b82f6';

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🌡️ DHT Monitor — Pin {pin}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Your program reads temperature into{' '}
          <span className="font-mono font-semibold text-[#2E4862]">{tempVar}</span>{' '}
          and humidity into{' '}
          <span className="font-mono font-semibold text-[#2E4862]">{humVar}</span>{' '}
          — both printed to Serial in a continuous loop.
        </p>
      </div>

      {/* Validation */}
      {missing.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="text-xs font-semibold text-amber-700 mb-1">Missing blocks:</p>
          <p className="text-xs text-amber-600 font-mono">{missing.join(', ')}</p>
        </div>
      )}

      {/* Live gauges + serial */}
      <div className="grid grid-cols-2 gap-4">

        {/* Gauges */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex flex-col items-center gap-1">
            <Thermometer size={18} style={{ color: tempColor }} />
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Temperature</p>
            <p className="text-3xl font-bold font-mono transition-all" style={{ color: tempColor }}>
              {running ? temp.toFixed(1) : '--.-'}
            </p>
            <p className="text-xs text-gray-400">°C</p>
            <div className="w-full mt-2 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(((temp - 10) / 35) * 100, 100)}%`,
                  backgroundColor: tempColor,
                }}
              />
            </div>
          </div>
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex flex-col items-center gap-1">
            <Droplets size={18} style={{ color: humColor }} />
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Humidity</p>
            <p className="text-3xl font-bold font-mono transition-all" style={{ color: humColor }}>
              {running ? hum.toFixed(1) : '--.-'}
            </p>
            <p className="text-xs text-gray-400">%RH</p>
            <div className="w-full mt-2 bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(((hum - 20) / 70) * 100, 100)}%`,
                  backgroundColor: humColor,
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleRun}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 text-white transition-colors ${
              running ? 'bg-red-500 hover:bg-red-600' : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
            }`}
          >
            {running
              ? <><Square size={13} fill="currentColor" /> Stop</>
              : <><Play size={13} fill="currentColor" /> Run Program</>}
          </button>
        </div>

        {/* Serial monitor */}
        <div className="rounded-xl overflow-hidden border border-gray-800 flex flex-col">
          <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Terminal size={13} className="text-green-400" />
              <span className="text-xs font-semibold text-white">Serial Monitor</span>
            </div>
            {running && (
              <span className="flex items-center gap-1 text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                Live
              </span>
            )}
          </div>
          <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 flex-1 overflow-y-auto min-h-[220px] flex flex-col gap-0.5">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic">
                {running ? 'Initialising DHT sensor...' : 'Press Run to start monitoring...'}
              </span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={
                  l === '---'
                    ? 'text-gray-700'
                    : i >= logs.length - 3
                    ? 'text-green-300'
                    : 'opacity-40 text-green-600'
                }>
                  {l === '---' ? '─────────────' : `> ${l}`}
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>

    </div>
  );
}