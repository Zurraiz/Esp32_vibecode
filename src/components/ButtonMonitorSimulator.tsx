'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, MousePointerClick } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function ButtonMonitorSimulator() {
  const blocks = useAppStore(state => state.blocks);
  const [pressed, setPressed] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const isRunningRef = useRef(false);
  const pressedRef = useRef(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  const btnBlock = blocks.find(b => b.type === 'btn_read');
  const delayBlock = blocks.find(
    b => b.type === 'delay_ms' || b.type === 'delay_sec'
  );
  const pin = btnBlock ? Number(btnBlock.values?.pin ?? 12) : 12;
  const delayMs = delayBlock
    ? delayBlock.type === 'delay_sec'
      ? Number(delayBlock.values?.sec ?? 1) * 1000
      : Number(delayBlock.values?.ms ?? 500)
    : 500;

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  const handlePress = () => {
    setPressed(true);
    pressedRef.current = true;
  };

  const handleRelease = () => {
    setPressed(false);
    pressedRef.current = false;
  };

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
      const value = pressedRef.current ? 1 : 0;
      const label = pressedRef.current ? 'HIGH (1) — Button Pressed' : 'LOW (0) — Not Pressed';
      setLogs(prev => [...prev.slice(-24), label]);
      setTimeout(tick, Math.max(delayMs, 200));
    };
    setTimeout(tick, Math.max(delayMs, 200));
  };

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1 flex
          items-center gap-2">
          <MousePointerClick size={15} />
          Button Input Simulator — Pin {pin}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          This simulates what happens when your ESP32 runs the program
          you built. Press and hold the button to send a signal —
          watch the Serial Monitor update every{' '}
          <span className="font-semibold text-[#2E4862]">
            {delayMs >= 1000 ? `${delayMs / 1000}s` : `${delayMs}ms`}
          </span>.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* Left: button + state */}
        <div className="flex flex-col gap-3">

          {/* Button */}
          <div className={`rounded-xl border-2 p-5 flex flex-col
            items-center gap-4 transition-all duration-200 ${
            pressed
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-200 bg-white'
          }`}>
            <p className="text-xs font-semibold text-gray-400 uppercase
              tracking-wider self-start">
              Button on Pin {pin}
            </p>
            <button
              type="button"
              onMouseDown={handlePress}
              onMouseUp={handleRelease}
              onMouseLeave={handleRelease}
              onTouchStart={handlePress}
              onTouchEnd={handleRelease}
              className={`w-20 h-20 rounded-full select-none
                transition-all duration-75 flex items-center justify-center
                text-xs font-bold border-4 ${
                pressed
                  ? 'bg-blue-500 border-blue-400 shadow-none translate-y-1 text-white'
                  : 'bg-gradient-to-b from-gray-100 to-gray-200 border-gray-300 text-gray-600 shadow-[0_5px_0_#b0b0b0]'
              }`}
            >
              {pressed ? 'ON' : 'PRESS'}
            </button>
          </div>

          {/* Pin state */}
          <div className="rounded-xl bg-white border border-gray-200
            p-4 shadow-sm flex flex-col gap-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider
              font-semibold">
              Pin {pin} Reading
            </p>
            <div className={`rounded-lg px-4 py-3 border-2 text-center
              transition-all duration-150 ${
              pressed
                ? 'bg-emerald-50 border-emerald-300'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <p className={`text-2xl font-bold font-mono transition-colors ${
                pressed ? 'text-emerald-600' : 'text-gray-400'
              }`}>
                {pressed ? '1' : '0'}
              </p>
              <p className={`text-[10px] font-semibold mt-0.5 ${
                pressed ? 'text-emerald-500' : 'text-gray-400'
              }`}>
                {pressed ? 'HIGH — Button pressed' : 'LOW — Not pressed'}
              </p>
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
            {isRunning ? 'Stop' : 'Run Program'}
          </button>

          {/* Insight */}
          <div className="rounded-lg border border-blue-100 bg-blue-50
            px-4 py-3">
            <p className="text-xs text-blue-700 leading-relaxed">
              {!isRunning
                ? 'Press Run, then hold the button to see the ESP32 detect your input in real time.'
                : pressed
                ? '✅ Button pressed — ESP32 reads HIGH (1) on the pin.'
                : '⚪ Button not pressed — ESP32 reads LOW (0) on the pin.'
              }
            </p>
          </div>
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
            gap-0.5 min-h-[260px]">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic">
                {isRunning
                  ? 'Reading button state...'
                  : 'Press Run to start reading input...'
                }
              </span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className={
                  i === logs.length - 1
                    ? log.includes('HIGH')
                      ? 'text-emerald-300'
                      : 'text-gray-400'
                    : 'opacity-40 text-green-600'
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
