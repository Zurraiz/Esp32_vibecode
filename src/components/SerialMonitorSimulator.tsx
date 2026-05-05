'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function SerialMonitorSimulator() {
  const blocks = useAppStore(state => state.blocks);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Extract message and delay from student's blocks
  const printBlock = blocks.find(b => b.type === 'serial_print');
  const delayBlock = blocks.find(
    b => b.type === 'delay_ms' || b.type === 'delay_sec'
  );

  const message = printBlock
    ? String(printBlock.values?.msg ?? 'Hello ESP32!')
    : 'Hello ESP32!';

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

  useEffect(() => {
    if (!isRunning) return;
    isRunningRef.current = true;
    setLogs([]);

    const interval = setInterval(() => {
      if (!isRunningRef.current) return;
      setLogs(prev => [...prev.slice(-24), message]);
    }, Math.max(delayMs, 300));

    return () => {
      clearInterval(interval);
      isRunningRef.current = false;
    };
  }, [isRunning, message, delayMs]);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1 flex items-center gap-2">
          <Terminal size={15} />
          Serial Monitor — Your Program Running
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          This is what the Serial Monitor would show when your
          ESP32 runs the program you just built.
          Your message: <span className="font-semibold text-[#2E4862]">
            &quot;{message}&quot;
          </span> — printing every{' '}
          <span className="font-semibold text-[#2E4862]">
            {delayMs >= 1000 ? `${delayMs / 1000}s` : `${delayMs}ms`}
          </span>.
        </p>
      </div>

      {/* Monitor */}
      <div className="rounded-xl overflow-hidden border border-gray-800">
        <div className="bg-gray-800 px-4 py-2.5 flex items-center
          justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={13} className="text-green-400" />
            <span className="text-xs font-semibold text-white">
              Serial Monitor
            </span>
            <span className="text-[10px] text-gray-400">115200 baud</span>
          </div>
          <div className="flex items-center gap-2">
            {isRunning && (
              <span className="flex items-center gap-1 text-[10px]
                text-green-400 font-medium">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full
                  animate-pulse inline-block" />
                Connected
              </span>
            )}
            <button
              type="button"
              onClick={() => {
                if (isRunning) {
                  isRunningRef.current = false;
                  setIsRunning(false);
                  setLogs([]);
                } else {
                  setIsRunning(true);
                }
              }}
              className={`text-[11px] font-semibold px-3 py-1 rounded-md
                transition-colors ${
                isRunning
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-[#2E4862] hover:bg-[#3a5a7a] text-white'
              }`}
            >
              {isRunning ? 'Stop' : 'Run'}
            </button>
          </div>
        </div>

        <div className="bg-[#0d1117] p-4 font-mono text-[11px] text-green-400
          h-64 overflow-y-auto flex flex-col gap-0.5">
          {!isRunning && logs.length === 0 ? (
            <span className="text-gray-500 italic">
              Press Run to simulate your program...
            </span>
          ) : logs.length === 0 ? (
            <span className="text-gray-500 italic animate-pulse">
              Starting...
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

      {/* Insight */}
      <div className="rounded-xl border border-blue-200 bg-blue-50
        px-4 py-3 text-xs text-blue-700 leading-relaxed">
        <span className="font-semibold">When connected to real hardware</span>,
        this is exactly what you would see in the Serial Monitor of your
        development environment. The message your ESP32 sends over Serial
        appears here in real time.
      </div>

    </div>
  );
}
