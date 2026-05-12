'use client';

import React, { useState, useRef } from 'react';
import { Lightbulb, Play, Square } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

type CloudLevel = 0 | 1 | 2 | 3 | 4;

const CLOUD_ICONS: Record<CloudLevel, string> = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '🌥️', 4: '☁️',
};
const CLOUD_LABELS: Record<CloudLevel, string> = {
  0: 'Bright sunlight', 1: 'Partly sunny',
  2: 'Overcast', 3: 'Heavy cloud', 4: 'Covered',
};
const CLOUD_VALUES: Record<CloudLevel, number> = {
  0: 3900, 1: 2900, 2: 1800, 3: 900, 4: 200,
};

export default function DualModeSimulator() {
  const blocks = useAppStore(state => state.blocks);
  const [potValue, setPotValue] = useState(2048);
  const [cloudLevel, setCloudLevel] = useState<CloudLevel>(1);
  const [activeMode, setActiveMode] = useState<'manual' | 'auto'>('manual');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const isRunningRef = useRef(false);
  const potRef = useRef(potValue);
  const cloudRef = useRef(cloudLevel);
  const modeRef = useRef(activeMode);
  potRef.current = potValue;
  cloudRef.current = cloudLevel;
  modeRef.current = activeMode;

  const mapBlocks = blocks.filter(b => b.type === 'map_val');
  const fromLow = mapBlocks[0] ? Number(mapBlocks[0].values?.fromLow ?? 0) : 0;
  const fromHigh = mapBlocks[0] ? Number(mapBlocks[0].values?.fromHigh ?? 4095) : 4095;
  const toLow = mapBlocks[0] ? Number(mapBlocks[0].values?.toLow ?? 0) : 0;
  const toHigh = mapBlocks[0] ? Number(mapBlocks[0].values?.toHigh ?? 255) : 255;

  const doMap = (val: number) => {
    if (fromHigh === fromLow) return toLow;
    return Math.max(toLow, Math.min(toHigh,
      Math.round(((val - fromLow) / (fromHigh - fromLow)) * (toHigh - toLow) + toLow)
    ));
  };

  const rawValue = activeMode === 'manual'
    ? potValue
    : CLOUD_VALUES[cloudLevel];
  const mappedValue = doMap(rawValue);
  const brightness = mappedValue / 255;

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
      const raw = modeRef.current === 'manual'
        ? potRef.current
        : CLOUD_VALUES[cloudRef.current];
      const mapped = doMap(raw);
      const mode = modeRef.current;
      setLogs(prev => [
        ...prev.slice(-24),
        `[${mode === 'manual' ? 'MANUAL' : 'AUTO'}] raw=${raw} → mapped=${mapped} → ${Math.round(mapped/255*100)}% brightness`,
      ]);
      setTimeout(tick, 600);
    };
    setTimeout(tick, 600);
  };

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          ⚡ Dual Mode Light System
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Switch between modes and observe how the same LED
          responds to different input sources. Run the program
          to see the Serial Monitor output for each mode.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setActiveMode('manual')}
          className={`py-2.5 rounded-xl border-2 text-xs font-semibold
            transition-all ${
            activeMode === 'manual'
              ? 'border-[#2E4862] bg-[#2E4862] text-white'
              : 'border-gray-200 bg-white text-gray-500'
          }`}
        >
          🎛️ Manual Mode
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('auto')}
          className={`py-2.5 rounded-xl border-2 text-xs font-semibold
            transition-all ${
            activeMode === 'auto'
              ? 'border-[#2E4862] bg-[#2E4862] text-white'
              : 'border-gray-200 bg-white text-gray-500'
          }`}
        >
          ☀️ Auto Mode
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* Left: input + pipeline */}
        <div className="flex flex-col gap-3">

          {activeMode === 'manual' ? (
            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-bold text-[#2E4862] mb-2">
                Potentiometer
              </p>
              <input
                type="range" min={0} max={4095} value={potValue}
                onChange={e => setPotValue(Number(e.target.value))}
                className="w-full accent-[#2E4862] cursor-pointer"
              />
              <div className="flex justify-between text-[10px]
                text-gray-400 mt-1">
                <span>0</span>
                <span className="font-bold font-mono text-[#2E4862]">
                  {potValue}
                </span>
                <span>4095</span>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-bold text-[#2E4862] mb-2">
                Light Conditions
              </p>
              <div className="flex gap-1.5">
                {([0,1,2,3,4] as CloudLevel[]).map(level => (
                  <button key={level} type="button"
                    onClick={() => setCloudLevel(level)}
                    className={`flex-1 py-2 rounded-lg border-2 text-base
                      transition-all ${
                      cloudLevel === level
                        ? 'border-[#2E4862] bg-[#2E4862]/5 scale-110'
                        : 'border-gray-200'
                    }`}
                  >
                    {CLOUD_ICONS[level]}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-1.5 text-center">
                {CLOUD_LABELS[cloudLevel]}
              </p>
            </div>
          )}

          {/* Pipeline */}
          <div className="rounded-xl bg-white border border-gray-200
            p-3 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400
              uppercase tracking-wider mb-2">Pipeline</p>
            <div className="flex flex-col gap-1.5 text-[10px] font-mono">
              <div className="flex justify-between bg-blue-50 rounded
                px-2 py-1.5">
                <span className="text-blue-500">analogRead()</span>
                <span className="font-bold text-blue-700">{rawValue}</span>
              </div>
              <div className="text-center text-gray-300">↓ map()</div>
              <div className="flex justify-between bg-emerald-50 rounded
                px-2 py-1.5">
                <span className="text-emerald-500">analogWrite()</span>
                <span className="font-bold text-emerald-700">
                  {mappedValue}
                </span>
              </div>
            </div>
          </div>

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
              : <><Play size={14} fill="currentColor" /> Run</>
            }
          </button>
        </div>

        {/* Right: LED + serial */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl bg-gray-50 border border-gray-100
            flex flex-col items-center justify-center gap-3 p-5
            min-h-[160px]">
            <p className="text-[10px] font-semibold text-gray-400
              uppercase tracking-wider self-start">LED Output</p>
            <div
              className="w-20 h-20 rounded-full border-4 flex items-center
                justify-center transition-all duration-150"
              style={{
                backgroundColor: `rgba(251,191,36,${brightness})`,
                borderColor: brightness > 0.1
                  ? `rgba(252,211,77,${brightness})`
                  : '#d1d5db',
                boxShadow: brightness > 0.05
                  ? `0 0 ${Math.round(brightness * 50)}px rgba(251,191,36,${brightness * 0.8})`
                  : 'none',
              }}
            >
              <Lightbulb size={30}
                style={{
                  color: brightness > 0.5 ? '#92400e' : '#9ca3af',
                  opacity: 0.4 + brightness * 0.6,
                }}
                fill="currentColor"
              />
            </div>
            <p className="text-xs font-bold font-mono text-[#2E4862]">
              {Math.round(brightness * 100)}%
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-800 flex-1">
            <div className="bg-gray-800 px-3 py-2 flex items-center
              justify-between">
              <span className="text-xs font-semibold text-white">
                Serial Monitor
              </span>
              {isRunning && (
                <span className="flex items-center gap-1 text-[10px]
                  text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full
                    animate-pulse inline-block" />
                  Live
                </span>
              )}
            </div>
            <div className="bg-[#0d1117] p-3 font-mono text-[10px]
              text-green-400 overflow-y-auto flex flex-col gap-0.5
              min-h-[100px]">
              {logs.length === 0 ? (
                <span className="text-gray-500 italic">
                  Press Run...
                </span>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className={
                    i === logs.length - 1
                      ? log.includes('MANUAL')
                        ? 'text-blue-300'
                        : 'text-amber-300'
                      : 'text-green-600 opacity-50'
                  }>
                    {'>'} {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
