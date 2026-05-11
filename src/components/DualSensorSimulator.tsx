'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Square } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

type CloudLevel = 0 | 1 | 2 | 3 | 4;

const CLOUD_ICONS: Record<CloudLevel, string> = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '🌥️',
  4: '☁️',
};

const CLOUD_LABELS: Record<CloudLevel, string> = {
  0: 'Bright sunlight',
  1: 'Partly sunny',
  2: 'Overcast',
  3: 'Heavy cloud',
  4: 'Covered / dark',
};

const CLOUD_VALUES: Record<CloudLevel, number> = {
  0: 3900,
  1: 2900,
  2: 1800,
  3: 900,
  4: 200,
};

export default function DualSensorSimulator() {
  const blocks = useAppStore(state => state.blocks);
  const [potValue, setPotValue] = useState(2048);
  const [cloudLevel, setCloudLevel] = useState<CloudLevel>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const delayBlock = blocks.find(
    b => b.type === 'delay_ms' || b.type === 'delay_sec'
  );
  const delayMs = delayBlock
    ? delayBlock.type === 'delay_sec'
      ? Number(delayBlock.values?.sec ?? 1) * 1000
      : Number(delayBlock.values?.ms ?? 500)
    : 500;

  const lightValue = CLOUD_VALUES[cloudLevel];

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  const handleRun = () => {
    if (isRunning) {
      isRunningRef.current = false;
      setIsRunning(false);
      setLogs([]);
      return;
    }
    isRunningRef.current = true;
    setIsRunning(true);
    setLogs([]);

    const tick = () => {
      if (!isRunningRef.current) return;
      const light = CLOUD_VALUES[cloudLevel];
      setLogs(prev => [
        ...prev.slice(-24),
        `Light: ${light} | Potentiometer: ${potValue}`,
      ]);
      setTimeout(tick, Math.max(delayMs, 300));
    };
    setTimeout(tick, Math.max(delayMs, 300));
  };

  // Keep logs updating with latest values when running
  const potRef = useRef(potValue);
  const cloudRef = useRef(cloudLevel);
  potRef.current = potValue;
  cloudRef.current = cloudLevel;

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          📊 Dual Sensor Simulator
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Interact with both sensors below. Press Run to see
          their values print to the Serial Monitor — just like
          your real ESP32 program would behave.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* Left: sensors */}
        <div className="flex flex-col gap-3">

          {/* Potentiometer */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-xs font-bold text-[#2E4862] mb-1">
              🎛️ Potentiometer
            </p>
            <p className="text-[10px] text-gray-400 mb-3">
              Drag to simulate rotating the knob
            </p>
            <input
              type="range"
              min={0}
              max={4095}
              value={potValue}
              onChange={e => setPotValue(Number(e.target.value))}
              className="w-full accent-[#2E4862] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>0 (min)</span>
              <span className="font-bold font-mono text-[#2E4862]">
                {potValue}
              </span>
              <span>4095 (max)</span>
            </div>
          </div>

          {/* Photoresistor */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-xs font-bold text-[#2E4862] mb-1">
              ☀️ Photoresistor
            </p>
            <p className="text-[10px] text-gray-400 mb-3">
              Click to change light conditions
            </p>
            <div className="flex gap-2">
              {([0, 1, 2, 3, 4] as CloudLevel[]).map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setCloudLevel(level)}
                  className={`flex-1 py-2 rounded-lg border-2 text-lg
                    transition-all duration-150 ${
                    cloudLevel === level
                      ? 'border-[#2E4862] bg-[#2E4862]/5 scale-110'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  title={CLOUD_LABELS[level]}
                >
                  {CLOUD_ICONS[level]}
                </button>
              ))}
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-[10px] text-gray-500">
                {CLOUD_LABELS[cloudLevel]}
              </span>
              <span className="text-xs font-bold font-mono text-[#2E4862]">
                {lightValue}
              </span>
            </div>
          </div>

          {/* Run button */}
          <button
            type="button"
            onClick={handleRun}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold
              flex items-center justify-center gap-2 transition-colors
              text-white ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
            }`}
          >
            {isRunning
              ? <><Square size={14} fill="currentColor" /> Stop</>
              : <><Play size={14} fill="currentColor" /> Run Program</>
            }
          </button>
        </div>

        {/* Right: serial monitor */}
        <div className="rounded-xl overflow-hidden border border-gray-800
          flex flex-col">
          <div className="bg-gray-800 px-4 py-2.5 flex items-center
            justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Terminal size={13} className="text-green-400" />
              <span className="text-xs font-semibold text-white">
                Serial Monitor
              </span>
            </div>
            {isRunning && (
              <span className="flex items-center gap-1 text-[10px]
                text-green-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full
                  animate-pulse inline-block" />
                Live
              </span>
            )}
          </div>
          <div className="bg-[#0d1117] p-3 font-mono text-[11px]
            text-green-400 flex-1 overflow-y-auto flex flex-col
            gap-0.5 min-h-[220px]">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic">
                {isRunning
                  ? 'Reading sensors...'
                  : 'Press Run to start reading...'
                }
              </span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className={
                  i === logs.length - 1
                    ? 'text-green-300'
                    : 'text-green-600 opacity-50'
                }>
                  {'>'} {log}
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
