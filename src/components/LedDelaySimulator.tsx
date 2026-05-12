'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Info } from 'lucide-react';

export default function LedDelaySimulator() {
  const [delay, setDelay] = useState<number>(0);
  const [ledState, setLedState] = useState<boolean>(false);

  const loopsPerSecond =
    delay === 0
      ? '3,420,512'
      : Math.round(1000 / (delay * 2 || 1)).toLocaleString();

  useEffect(() => {
    if (delay < 20) {
      setLedState(true);
      return;
    }
    const interval = setInterval(() => {
      setLedState((prev) => !prev);
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
        <div>
          <h3 className="text-sm font-bold text-[#2E4862] flex items-center gap-2">
            <Activity size={16} className="text-emerald-500" />
            Delay Simulator
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Adjust the delay to see how the LED and human eye react.
          </p>
        </div>
        <div className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-right">
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block">
            Loops / sec
          </span>
          <span className="text-sm font-mono font-bold text-[#2E4862]">
            {loopsPerSecond}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">

        {/* Left: Slider */}
        <div className="flex flex-col gap-4">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex justify-between items-end mb-3">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Delay (ms)
              </label>
              <span className="bg-[#2E4862] text-white font-mono text-xs px-2 py-1 rounded-lg">
                {delay} ms
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-mono">
              <span>0ms</span>
              <span>1000ms</span>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex items-center justify-center">
            {delay < 20 ? (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-3 py-2 rounded-lg w-full justify-center">
                <Info size={13} />
                Too fast — eye sees solid light
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium px-3 py-2 rounded-lg w-full justify-center">
                ✓ Visible blink established
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="rounded-lg bg-blue-50 border border-blue-100 px-4 py-3">
            <p className="text-xs text-blue-700 leading-relaxed">
              {delay === 0
                ? 'At 0ms delay the ESP32 toggles the LED millions of times per second — far too fast for eyes to see.'
                : delay < 20
                ? 'Still too fast. Try dragging past 20ms to see the LED actually blink.'
                : `At ${delay}ms the LED completes one blink cycle every ${delay * 2}ms — clearly visible to the human eye.`}
            </p>
          </div>
        </div>

        {/* Right: LED */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl flex flex-col items-center justify-center p-6 gap-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold self-start">
            Physical Output
          </p>
          <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 transition-all duration-75 ${
            ledState
              ? 'bg-yellow-400 border-yellow-300 shadow-[0_0_40px_rgba(250,204,21,0.8)]'
              : 'bg-gray-200 border-gray-300'
          }`}>
            <div className="w-10 h-5 bg-white opacity-20 rounded-full" />
          </div>
          <span className="text-xs font-medium text-gray-500">
            {ledState ? 'LED ON' : 'LED OFF'}
          </span>
        </div>

      </div>
    </div>
  );
}
