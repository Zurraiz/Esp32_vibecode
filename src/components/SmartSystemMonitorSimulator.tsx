'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Square } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

type SystemState = 'idle' | 'alert' | 'high-alert';

function getState(motion: boolean, distance: number): SystemState {
  if (!motion) return 'idle';
  if (distance < 50) return 'high-alert';
  return 'alert';
}

const STATE_LABEL: Record<SystemState, string> = {
  'idle': 'IDLE — No activity',
  'alert': 'ALERT — Motion, low risk',
  'high-alert': 'HIGH ALERT — Motion + close object',
};
const STATE_COLOR: Record<SystemState, string> = {
  'idle': 'text-green-600', 'alert': 'text-amber-600', 'high-alert': 'text-red-600',
};

const REQUIRED = ['pir_read', 'ultrasonic', 'if_block', 'end_if'];

export default function SmartSystemMonitorSimulator() {
  const blocks = useAppStore(state => state.blocks);

  const pirBlock   = blocks.find(b => b.type === 'pir_read');
  const ultraBlock = blocks.find(b => b.type === 'ultrasonic');
  const motionVar  = pirBlock   ? String(pirBlock.values?.var   ?? 'motion')   : 'motion';
  const distVar    = ultraBlock ? String(ultraBlock.values?.var ?? 'distance') : 'distance';

  const missing = REQUIRED.filter(r => !blocks.find(b => b.type === r));

  const [running,  setRunning]  = useState(false);
  const [motion,   setMotion]   = useState(false);
  const [distance, setDistance] = useState(80);
  const [logs,     setLogs]     = useState<string[]>([]);
  const isRunningRef = useRef(false);
  const motionRef    = useRef(false);
  const distanceRef  = useRef(80);
  const prevStateRef = useRef<SystemState>('idle');
  const logEndRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => { return () => { isRunningRef.current = false; }; }, []);

  const handleMotion = (v: boolean) => {
    if (!running) return;
    setMotion(v);
    motionRef.current = v;
  };

  const handleRun = useCallback(() => {
    if (running) {
      isRunningRef.current = false;
      setRunning(false);
      setLogs([]);
      setMotion(false);
      motionRef.current = false;
      prevStateRef.current = 'idle';
      return;
    }
    isRunningRef.current = true;
    setRunning(true);
    setLogs([]);

    const tick = () => {
      if (!isRunningRef.current) return;
      const m = motionRef.current;
      const d = distanceRef.current;
      const state = getState(m, d);
      if (state !== prevStateRef.current) {
        prevStateRef.current = state;
        setLogs(prev => [
          ...prev.slice(-24),
          `> ${motionVar} = ${m ? 'HIGH' : 'LOW'}, ${distVar} = ${d} cm`,
          `> State: ${STATE_LABEL[state]}`,
          '─────────────',
        ]);
      }
      setTimeout(tick, 200);
    };
    tick();
  }, [running, motionVar, distVar]);

  const sysState = getState(motion, distance);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🧠 Smart System — PIR + Ultrasonic Combined
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Variables: <span className="font-mono font-semibold text-[#2E4862]">{motionVar}</span>
          {' '}and <span className="font-mono font-semibold text-[#2E4862]">{distVar}</span>.
          Toggle motion and adjust distance to trigger different system states.
        </p>
      </div>

      {/* Validation */}
      {missing.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="text-xs font-semibold text-amber-700 mb-1">Missing blocks:</p>
          <p className="text-xs text-amber-600 font-mono">{missing.join(', ')}</p>
        </div>
      )}

      {/* State display */}
      <div className={`rounded-xl border-2 px-4 py-3 text-center transition-all ${
        sysState === 'idle' ? 'border-green-300 bg-green-50'
        : sysState === 'alert' ? 'border-amber-300 bg-amber-50'
        : 'border-red-300 bg-red-50'
      }`}>
        <p className={`text-sm font-bold ${STATE_COLOR[sysState]}`}>
          {STATE_LABEL[sysState]}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* Left: controls */}
        <div className="flex flex-col gap-3">

          {/* PIR toggle */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              PIR — {motionVar}
            </p>
            <button
              type="button"
              onMouseDown={() => handleMotion(true)}
              onMouseUp={() => handleMotion(false)}
              onMouseLeave={() => handleMotion(false)}
              onTouchStart={() => handleMotion(true)}
              onTouchEnd={() => handleMotion(false)}
              disabled={!running}
              className={`w-full py-3 rounded-lg text-xs font-bold border-2 transition-all select-none ${
                motion && running
                  ? 'bg-red-500 border-red-400 text-white translate-y-0.5'
                  : running
                  ? 'bg-white border-gray-300 text-gray-600 shadow-[0_3px_0_#d1d5db]'
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {motion && running ? '🚨 Motion: HIGH' : '👋 Hold = Motion HIGH'}
            </button>
          </div>

          {/* Distance slider */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Ultrasonic — {distVar}: <span className="text-[#2E4862]">{distance} cm</span>
            </p>
            <input
              type="range" min={5} max={120} value={distance}
              onChange={e => {
                const v = Number(e.target.value);
                setDistance(v);
                distanceRef.current = v;
              }}
              className="w-full accent-[#2E4862] cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-gray-400 mt-1">
              <span>5 cm — Close</span><span>120 cm — Far</span>
            </div>
            <div className={`mt-2 text-center text-[10px] font-bold font-mono ${
              distance < 50 ? 'text-red-500' : 'text-green-600'
            }`}>
              {distance < 50 ? '⚠ Below 50 cm threshold' : '✓ Above 50 cm threshold'}
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

        {/* Right: serial */}
        <div className="rounded-xl overflow-hidden border border-gray-800 flex flex-col">
          <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
            <span className="text-xs font-semibold text-white">Serial Monitor</span>
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
                {running ? 'Monitoring sensors...' : 'Press Run to start...'}
              </span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={
                  l.startsWith('─') ? 'text-gray-700'
                  : l.includes('HIGH ALERT') ? (i >= logs.length - 3 ? 'text-red-400' : 'opacity-40 text-red-700')
                  : l.includes('ALERT') ? (i >= logs.length - 3 ? 'text-amber-400' : 'opacity-40 text-amber-700')
                  : i >= logs.length - 3 ? 'text-green-300'
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