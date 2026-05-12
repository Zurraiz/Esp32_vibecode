'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, Square } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function CounterSimulator() {
  const blocks = useAppStore(state => state.blocks);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [cycleCount, setCycleCount] = useState(0);
  const isRunningRef = useRef(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Read student's blocks
  const varBlock = blocks.find(b => b.type === 'var_int');
  const addBlock = blocks.find(b => b.type === 'var_add');
  const delayBlock = blocks.find(
    b => b.type === 'delay_ms' || b.type === 'delay_sec'
  );

  const varName = varBlock
    ? String(varBlock.values?.name ?? 'counter')
    : 'counter';
  const startValue = varBlock
    ? Math.trunc(Number(varBlock.values?.val ?? 0))
    : 0;
  const step = addBlock
    ? Number(addBlock.values?.step ?? 1)
    : 1;
  const delayMs = delayBlock
    ? delayBlock.type === 'delay_sec'
      ? Number(delayBlock.values?.sec ?? 1) * 1000
      : Number(delayBlock.values?.ms ?? 1000)
    : 1000;

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
      return;
    }
    isRunningRef.current = true;
    setIsRunning(true);
    setLogs([]);
    setCycleCount(0);
    setCurrentValue(startValue);

    let val = startValue;
    let cycles = 0;

    const tick = () => {
      if (!isRunningRef.current) return;
      val = Math.trunc(val + step);
      cycles++;
      setCurrentValue(val);
      setCycleCount(cycles);
      setLogs(prev => [...prev.slice(-24), `${varName} = ${val}`]);
      setTimeout(tick, Math.max(delayMs, 200));
    };

    setTimeout(tick, Math.max(delayMs, 200));
  };

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔢 Counter Simulator — Your Program Running
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          This shows exactly what your program does on the ESP32.
          Variable <span className="font-semibold font-mono
          text-[#2E4862]">{varName}</span> starts at{' '}
          <span className="font-semibold text-[#2E4862]">{startValue}</span>,
          increases by{' '}
          <span className="font-semibold text-[#2E4862]">{step}</span> every{' '}
          <span className="font-semibold text-[#2E4862]">
            {delayMs >= 1000 ? `${delayMs / 1000}s` : `${delayMs}ms`}
          </span>, and prints the new value to the Serial Monitor.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* Left: variable state */}
        <div className="flex flex-col gap-3">

          {/* Variable box */}
          <div className="rounded-xl bg-white border border-gray-200
            shadow-sm overflow-hidden">
            <div className="bg-sky-500 px-4 py-2.5">
              <p className="text-white text-xs font-bold font-mono">
                {varName}
              </p>
              <p className="text-white/70 text-[10px]">int — updates every cycle</p>
            </div>
            <div className="px-4 py-5 flex flex-col items-center gap-1">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                Current Value
              </p>
              <div className="text-4xl font-bold font-mono text-[#2E4862]
                transition-all duration-200">
                {currentValue}
              </div>
            </div>
          </div>

          {/* Cycle counter */}
          <div className="rounded-xl bg-white border border-gray-200
            p-4 shadow-sm flex justify-between items-center">
            <span className="text-xs text-gray-500 font-medium">
              Loop cycles
            </span>
            <span className="text-lg font-bold font-mono text-[#2E4862]">
              {cycleCount}
            </span>
          </div>

          {/* What's happening */}
          <div className="rounded-xl border border-blue-100 bg-blue-50
            px-4 py-3">
            <p className="text-xs text-blue-700 leading-relaxed">
              {!isRunning && cycleCount === 0
                ? `Press Run to start. The ESP32 will initialise ${varName} = ${startValue} in setup(), then increment and print it every ${delayMs >= 1000 ? `${delayMs / 1000}s` : `${delayMs}ms`} inside loop().`
                : isRunning
                ? `loop() is running. Each cycle: add ${step} to ${varName}, then print the new value, then wait ${delayMs >= 1000 ? `${delayMs / 1000}s` : `${delayMs}ms`}.`
                : `Stopped at cycle ${cycleCount}. ${varName} reached ${currentValue}.`
              }
            </p>
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
              : <><Play size={14} fill="currentColor" /> Run</>
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
            text-green-400 flex-1 overflow-y-auto flex flex-col gap-0.5
            min-h-[200px]">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic">
                {isRunning ? 'Starting...' : 'Waiting for program...'}
              </span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className={
                  i === logs.length - 1
                    ? 'text-green-300'
                    : 'text-green-600 opacity-60'
                }>
                  {'>'} {log}
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>

      </div>

      {/* Insight */}
      {cycleCount >= 3 && (
        <div className="rounded-xl border border-[#2E4862]/20
          bg-[#2E4862]/5 px-4 py-3 text-xs text-[#2E4862]
          leading-relaxed font-medium animate-in fade-in duration-300">
          💡 Notice how <span className="font-bold font-mono">{varName}</span> keeps
          changing every cycle — this is what makes variables powerful.
          Unlike a fixed message, a variable lets your program track and
          respond to changing information over time.
        </div>
      )}

    </div>
  );
}
