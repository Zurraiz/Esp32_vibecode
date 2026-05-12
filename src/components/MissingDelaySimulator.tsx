'use client';

import React, { useState, useEffect } from 'react';
import { Play, Square, AlertTriangle, Lightbulb, PowerOff, Pin } from 'lucide-react';

export default function MissingDelaySimulator() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [loopsPerSec, setLoopsPerSec] = useState<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setActiveBlock(prev => (prev === 1 ? 2 : 1));
        const base = 3420000;
        const jitter = Math.floor(Math.random() * 50000) - 25000;
        setLoopsPerSec(base + jitter);
      }, 50);
    } else {
      setActiveBlock(null);
      setLoopsPerSec(0);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full flex flex-col md:flex-row gap-6">

      {/* Left: Code blocks */}
      <div className="flex-1 flex flex-col">
        <div className="mb-4 pb-3 border-b border-gray-100">
          <h3 className="text-sm font-bold text-[#2E4862]">Your Program</h3>
          <p className="text-xs text-gray-500 mt-0.5">No delays — running at full CPU speed</p>
        </div>

        <div className="flex flex-col gap-2 relative pl-5">
          {/* Execution wire */}
          <div className="absolute left-2 top-4 bottom-4 w-0.5 bg-gray-200 rounded-full" />

          {/* Block 0: pinMode */}
          <div className="flex items-center gap-3 relative">
            <div className="absolute -left-[17px] w-3 h-3 bg-white flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>
            <div className="flex-1 bg-orange-500 text-white px-3 py-2.5 rounded-xl flex items-center gap-2 opacity-70">
              <Pin size={15} fill="currentColor" />
              <span className="text-xs font-semibold">Set Pin <span className="bg-black/20 px-1.5 py-0.5 rounded mx-0.5">48</span> as OUTPUT</span>
            </div>
          </div>

          {/* Block 1: Turn ON */}
          <div className="flex items-center gap-3 relative">
            <div className="absolute -left-[17px] w-3 h-3 bg-white flex items-center justify-center">
              {activeBlock === 1 ? (
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              ) : (
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              )}
            </div>
            <div className={`flex-1 bg-orange-500 text-white px-3 py-2.5 rounded-xl flex items-center gap-2 border-2 transition-all duration-75 ${
              activeBlock === 1 ? 'border-emerald-400 shadow-md scale-[1.02]' : 'border-transparent'
            }`}>
              <Lightbulb size={15} fill="currentColor" className="text-yellow-200" />
              <span className="text-xs font-semibold">Turn ON LED on Pin <span className="bg-black/20 px-1.5 py-0.5 rounded mx-0.5">48</span></span>
            </div>
          </div>

          {/* Block 2: Turn OFF */}
          <div className="flex items-center gap-3 relative">
            <div className="absolute -left-[17px] w-3 h-3 bg-white flex items-center justify-center">
              {activeBlock === 2 ? (
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              ) : (
                <div className="w-2 h-2 bg-gray-300 rounded-full" />
              )}
            </div>
            <div className={`flex-1 bg-orange-500 text-white px-3 py-2.5 rounded-xl flex items-center gap-2 border-2 transition-all duration-75 ${
              activeBlock === 2 ? 'border-emerald-400 shadow-md scale-[1.02]' : 'border-transparent'
            }`}>
              <PowerOff size={15} fill="currentColor" className="text-gray-200" />
              <span className="text-xs font-semibold">Turn OFF LED on Pin <span className="bg-black/20 px-1.5 py-0.5 rounded mx-0.5">48</span></span>
            </div>
          </div>
        </div>

        {/* Speed counter */}
        <div className="mt-4 rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">CPU Speed</span>
          <div className="text-right">
            <span className="text-xs text-gray-400 block">Loops per second</span>
            <span className="text-base font-bold text-[#2E4862] font-mono">
              {loopsPerSec > 0 ? loopsPerSec.toLocaleString() : '—'}
            </span>
          </div>
        </div>

        {/* Run button */}
        <button
          type="button"
          onClick={() => setIsRunning(!isRunning)}
          className={`mt-4 w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-[#2E4862] hover:bg-[#3a5a7a] text-white'
          }`}
        >
          {isRunning ? (
            <><Square size={15} fill="currentColor" /> Stop</>
          ) : (
            <><Play size={15} fill="currentColor" /> Run Simulation</>
          )}
        </button>
      </div>

      {/* Right: LED output */}
      <div className="flex-1 flex flex-col gap-4">

        {/* LED visual */}
        <div className="flex-1 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center min-h-[160px] relative overflow-hidden">
          <div className="flex flex-col items-center gap-3">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-75 ${
              isRunning
                ? 'bg-yellow-400 border-yellow-300 shadow-[0_0_40px_rgba(250,204,21,0.8)]'
                : 'bg-gray-200 border-gray-300'
            }`}>
              <Lightbulb
                size={36}
                className={isRunning ? 'text-yellow-700' : 'text-gray-400'}
                fill="currentColor"
              />
            </div>
            <span className="text-xs font-medium text-gray-500">
              {isRunning ? 'Appears always ON' : 'LED off'}
            </span>
          </div>
        </div>

        {/* Alert banner */}
        {isRunning && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex gap-2">
            <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-amber-800">Why does it look always on?</p>
              <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                The LED is actually blinking millions of times per second —
                far too fast for your eyes to see. It looks solid, but the code
                is running correctly. In the next lesson, you will learn how to
                slow it down so you can actually see the blink.
              </p>
            </div>
          </div>
        )}

        {!isRunning && (
          <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
            <p className="text-xs text-blue-700 leading-relaxed">
              👆 Press <span className="font-semibold">Run Simulation</span> to see
              what happens when you turn an LED on and off with no delay in between.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
