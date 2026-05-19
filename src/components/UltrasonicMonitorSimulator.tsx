'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, Play, Square } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

type Zone = 'far' | 'safe' | 'warning' | 'danger';

function getZone(d: number): Zone {
  if (d > 80) return 'far';
  if (d > 50) return 'safe';
  if (d > 20) return 'warning';
  return 'danger';
}

const ZONE_STYLE: Record<Zone, { label: string; bar: string; text: string }> = {
  far:     { label: 'Out of Range', bar: 'bg-gray-400',   text: 'text-gray-500'  },
  safe:    { label: 'Safe',         bar: 'bg-green-400',  text: 'text-green-600' },
  warning: { label: 'Warning',      bar: 'bg-amber-400',  text: 'text-amber-600' },
  danger:  { label: 'Danger',       bar: 'bg-red-500',    text: 'text-red-600'   },
};

const REQUIRED = ['ultrasonic', 'serial_println'];

export default function UltrasonicMonitorSimulator() {
  const blocks = useAppStore(state => state.blocks);

  const ultraBlock = blocks.find(b => b.type === 'ultrasonic');
  const trig = ultraBlock ? Number(ultraBlock.values?.trig ?? 12) : 12;
  const echo = ultraBlock ? Number(ultraBlock.values?.echo ?? 13) : 13;
  const distVar = ultraBlock ? String(ultraBlock.values?.var ?? 'distance') : 'distance';

  const missing = REQUIRED.filter(r => !blocks.find(b => b.type === r));

  const [running, setRunning] = useState(false);
  const [distance, setDistance] = useState(75);
  const [logs, setLogs] = useState<string[]>([]);
  const isRunningRef = useRef(false);
  const distanceRef = useRef(75);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => { return () => { isRunningRef.current = false; }; }, []);

  const handleRun = useCallback(() => {
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
      const d = distanceRef.current;
      setLogs(prev => [
        ...prev.slice(-24),
        `> ${distVar} = ${d.toFixed(0)} cm`,
        '─────────────',
      ]);
      setTimeout(tick, 800);
    };
    setTimeout(tick, 800);
  }, [running, distVar]);

  const zone = getZone(distance);
  const zs = ZONE_STYLE[zone];
  const barWidth = Math.max(4, Math.min((distance / 100) * 100, 100));

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          📏 Ultrasonic Monitor — Trig:{trig} Echo:{echo}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Distance stored in{' '}
          <span className="font-mono font-semibold text-[#2E4862]">{distVar}</span>.
          Press Run, then drag the slider to simulate an object moving.
        </p>
      </div>

      {/* Validation */}
      {missing.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="text-xs font-semibold text-amber-700 mb-1">Missing blocks:</p>
          <p className="text-xs text-amber-600 font-mono">{missing.join(', ')}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">

        {/* Left: distance controls */}
        <div className="flex flex-col gap-3">

          {/* Distance display */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Distance Reading</p>
            <p className={`text-5xl font-bold font-mono text-center transition-colors ${zs.text}`}>
              {running ? distance.toFixed(0) : '--'}
            </p>
            <p className="text-xs text-gray-400 text-center mt-1">cm</p>
            <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${zs.bar}`}
                style={{ width: `${barWidth}%` }}
              />
            </div>
            <p className={`text-[10px] text-center mt-1.5 font-semibold ${zs.text}`}>
              {running ? zs.label : '—'}
            </p>
          </div>

          {/* Slider */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Simulate Object Position
            </p>
            <input
              type="range" min={5} max={100} value={distance}
              onChange={e => {
                const v = Number(e.target.value);
                setDistance(v);
                distanceRef.current = v;
              }}
              className="w-full accent-[#2E4862] cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-gray-400 mt-1">
              <span>5 cm — Close</span><span>100 cm — Far</span>
            </div>
          </div>

          {/* Run button */}
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

        {/* Right: serial monitor */}
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
          <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 h-[280px] overflow-y-auto flex flex-col gap-0.5">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic">
                {running ? 'Reading ultrasonic sensor...' : 'Press Run to start...'}
              </span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={
                  l.startsWith('─') ? 'text-gray-700'
                  : i >= logs.length - 2 ? 'text-green-300'
                  : 'opacity-40 text-green-600'
                }>{l}</div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>

      </div>

    </div>
  );
}