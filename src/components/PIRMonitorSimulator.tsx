'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, Play, Square, Lightbulb } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const REQUIRED = ['pir_read', 'if_block', 'dw_high', 'dw_low', 'end_if'];

export default function PIRMonitorSimulator() {
  const blocks = useAppStore(state => state.blocks);

  const pirBlock = blocks.find(b => b.type === 'pir_read');
  const pin = pirBlock ? Number(pirBlock.values?.pin ?? 14) : 14;
  const motionVar = pirBlock ? String(pirBlock.values?.var ?? 'motion') : 'motion';

  const missing = REQUIRED.filter(r => !blocks.find(b => b.type === r));

  const [running, setRunning] = useState(false);
  const [motion, setMotion] = useState(false);
  const [ledOn, setLedOn] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const isRunningRef = useRef(false);
  const motionRef = useRef(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => { return () => { isRunningRef.current = false; }; }, []);

  const handleMotion = (state: boolean) => {
    if (!running) return;
    setMotion(state);
    motionRef.current = state;
  };

  const handleRun = useCallback(() => {
    if (running) {
      isRunningRef.current = false;
      setRunning(false);
      setLedOn(false);
      setLogs([]);
      setMotion(false);
      motionRef.current = false;
      return;
    }
    isRunningRef.current = true;
    setRunning(true);
    setLogs([]);

    const tick = () => {
      if (!isRunningRef.current) return;
      const detected = motionRef.current;
      setLedOn(detected);
      setLogs(prev => [
        ...prev.slice(-26),
        detected
          ? `> ${motionVar} = HIGH — Motion Detected`
          : `> ${motionVar} = LOW — No Motion`,
        detected
          ? '> digitalWrite(LED, HIGH)'
          : '> digitalWrite(LED, LOW)',
        '─────────────',
      ]);
      setTimeout(tick, 700);
    };
    setTimeout(tick, 700);
  }, [running, motionVar]);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          👁️ PIR Monitor — Pin {pin}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Your program reads motion into{' '}
          <span className="font-mono font-semibold text-[#2E4862]">{motionVar}</span>.
          Press Run, then toggle motion to see the LED and Serial respond.
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

        {/* Left: controls + LED */}
        <div className="flex flex-col gap-3">

          {/* LED display */}
          <div className={`rounded-xl border-2 p-5 flex flex-col items-center gap-3 transition-all duration-300 ${
            ledOn ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-white'
          }`}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider self-start">LED Output</p>
            <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
              ledOn
                ? 'bg-amber-400 border-amber-300 shadow-[0_0_24px_rgba(251,191,36,0.7)]'
                : 'bg-gray-200 border-gray-300'
            }`}>
              <Lightbulb
                size={28}
                fill="currentColor"
                style={{ color: ledOn ? '#92400e' : '#9ca3af' }}
              />
            </div>
            <p className={`text-xs font-bold ${ledOn ? 'text-amber-600' : 'text-gray-400'}`}>
              {ledOn ? 'ON — Motion Active' : 'OFF — No Motion'}
            </p>
          </div>

          {/* Motion toggle */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
              PIR Sensor — Pin {pin}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onMouseDown={() => handleMotion(true)}
                onMouseUp={() => handleMotion(false)}
                onMouseLeave={() => handleMotion(false)}
                onTouchStart={() => handleMotion(true)}
                onTouchEnd={() => handleMotion(false)}
                disabled={!running}
                className={`flex-1 py-3 rounded-lg text-xs font-bold border-2 transition-all select-none ${
                  motion && running
                    ? 'bg-red-500 border-red-400 text-white shadow-none translate-y-0.5'
                    : running
                    ? 'bg-white border-gray-300 text-gray-600 shadow-[0_3px_0_#d1d5db]'
                    : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {motion && running ? '🚨 Motion!' : '👋 Hold = Motion'}
              </button>
            </div>
            <p className="text-[9px] text-gray-400 mt-2 text-center">
              {running ? 'Hold button to simulate motion' : 'Press Run first'}
            </p>
          </div>

          {/* PIR state badge */}
          <div className={`rounded-xl px-4 py-3 border-2 text-center transition-all ${
            motion && running
              ? 'bg-red-50 border-red-300'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
              {motionVar}
            </p>
            <p className={`text-xl font-bold font-mono ${
              motion && running ? 'text-red-600' : 'text-gray-300'
            }`}>
              {motion && running ? 'HIGH' : 'LOW'}
            </p>
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
          <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 h-[320px] overflow-y-auto flex flex-col gap-0.5">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic">
                {running ? 'Reading PIR sensor...' : 'Press Run to start...'}
              </span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={
                  l.startsWith('─')
                    ? 'text-gray-700'
                    : i >= logs.length - 3
                    ? l.includes('HIGH') ? 'text-red-400' : 'text-green-300'
                    : 'opacity-40 text-green-600'
                }>{l.startsWith('─') ? l : l}</div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>

      </div>

    </div>
  );
}