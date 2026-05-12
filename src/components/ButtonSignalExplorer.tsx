'use client';

import React, { useState } from 'react';
import { MousePointerClick, Cpu, Zap } from 'lucide-react';

const INSIGHTS = [
  'A button is an input device — it sends a signal to the ESP32 when pressed.',
  'When pressed, the button completes a circuit and the pin reads HIGH (1).',
  'When released, the circuit is open and the pin reads LOW (0).',
  'The ESP32 stores this reading as a number — 1 for pressed, 0 for not pressed.',
];

export default function ButtonSignalExplorer() {
  const [pressed, setPressed] = useState(false);
  const [insightIndex, setInsightIndex] = useState(0);
  const [pressCount, setPressCount] = useState(0);

  const handlePress = () => {
    setPressed(true);
    setPressCount(prev => {
      const next = prev + 1;
      if (next === 1) setInsightIndex(1);
      if (next === 2) setInsightIndex(2);
      return next;
    });
  };

  const handleRelease = () => {
    setPressed(false);
    if (pressCount >= 1) setInsightIndex(Math.max(insightIndex, 3));
  };

  const signalValue = pressed ? 1 : 0;

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔘 How a Button Sends a Signal
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Press and hold the button below. Watch how a physical action
          becomes an electrical signal that the ESP32 can read as a number.
          Release it and see the signal change.
        </p>
      </div>

      {/* Three panel pipeline */}
      <div className="grid grid-cols-3 gap-4">

        {/* Panel 1: Physical button */}
        <div className={`rounded-xl border-2 p-5 flex flex-col items-center
          justify-center gap-4 transition-all duration-200 ${
          pressed
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-200 bg-white'
        }`}>
          <p className="text-xs font-bold text-[#2E4862] flex items-center
            gap-1.5 self-start">
            <MousePointerClick size={13} /> Physical Input
          </p>

          <button
            type="button"
            onMouseDown={handlePress}
            onMouseUp={handleRelease}
            onMouseLeave={handleRelease}
            onTouchStart={handlePress}
            onTouchEnd={handleRelease}
            className={`w-24 h-24 rounded-full select-none
              transition-all duration-75 flex items-center justify-center
              text-xs font-bold relative border-4 ${
              pressed
                ? 'bg-blue-500 border-blue-400 shadow-none translate-y-1 text-white'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 border-gray-300 text-gray-600 shadow-[0_6px_0_#b0b0b0]'
            }`}
          >
            {pressed ? 'PRESSED' : 'PRESS ME'}
          </button>

          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            {pressed
              ? 'Circuit closed — current flows through pin'
              : 'Hold the button to send a signal'
            }
          </p>
        </div>

        {/* Panel 2: Signal */}
        <div className={`rounded-xl border-2 p-5 flex flex-col items-center
          justify-center gap-4 transition-all duration-200 ${
          pressed
            ? 'border-emerald-400 bg-emerald-50'
            : 'border-gray-200 bg-white'
        }`}>
          <p className="text-xs font-bold text-[#2E4862] flex items-center
            gap-1.5 self-start">
            <Zap size={13} /> Electrical Signal
          </p>

          <div className={`w-24 h-24 rounded-full border-4 flex flex-col
            items-center justify-center transition-all duration-150 ${
            pressed
              ? 'border-emerald-400 bg-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.5)]'
              : 'border-gray-300 bg-gray-100'
          }`}>
            <span className={`text-3xl font-bold font-mono transition-colors ${
              pressed ? 'text-white' : 'text-gray-400'
            }`}>
              {signalValue}
            </span>
            <span className={`text-[10px] font-bold transition-colors ${
              pressed ? 'text-white/80' : 'text-gray-400'
            }`}>
              {pressed ? 'HIGH' : 'LOW'}
            </span>
          </div>

          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            {pressed
              ? 'Signal is HIGH — voltage detected on pin'
              : 'Signal is LOW — no voltage on pin'
            }
          </p>
        </div>

        {/* Panel 3: ESP32 reading */}
        <div className={`rounded-xl border-2 overflow-hidden
          transition-all duration-200 ${
          pressed
            ? 'border-purple-400'
            : 'border-gray-200'
        }`}>
          <div className={`px-4 py-2.5 flex items-center gap-2
            transition-colors duration-200 ${
            pressed ? 'bg-purple-500' : 'bg-[#2E4862]'
          }`}>
            <Cpu size={13} className="text-white" />
            <span className="text-xs font-bold text-white">
              ESP32 Reading
            </span>
          </div>
          <div className="bg-[#0d1117] p-4 font-mono text-[11px]
            text-[#c9d1d9] h-[calc(100%-36px)] flex flex-col gap-1.5">
            <span style={{ color: '#ff7b72' }}>int</span>
            {' '}
            <span style={{ color: '#79c0ff' }}>btnState</span>
            {' = '}
            <span style={{ color: '#79c0ff' }}>digitalRead</span>
            {'(pin);\n\n'}
            <div className={`mt-2 rounded-lg px-3 py-2 border
              transition-all duration-150 ${
              pressed
                ? 'bg-emerald-500/20 border-emerald-500/40'
                : 'bg-white/5 border-white/10'
            }`}>
              <p className="text-[10px] text-gray-400 mb-1">
                btnState is now:
              </p>
              <p className={`text-xl font-bold font-mono transition-colors ${
                pressed ? 'text-emerald-400' : 'text-gray-500'
              }`}>
                {signalValue} ({pressed ? 'HIGH' : 'LOW'})
              </p>
            </div>
            <p className={`text-[10px] mt-2 transition-colors ${
              pressed ? 'text-purple-400' : 'text-gray-600'
            }`}>
              {pressed
                ? '▶ Button detected as pressed'
                : '// Waiting for input...'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Press counter */}
      {pressCount > 0 && (
        <div className="rounded-xl bg-white border border-gray-200 p-4
          shadow-sm flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">
            Times pressed
          </span>
          <span className="text-lg font-bold font-mono text-[#2E4862]">
            {pressCount}
          </span>
        </div>
      )}

      {/* Progressive insights */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase
          tracking-widest mb-3">Key Concepts</p>
        <div className="flex flex-col gap-2">
          {INSIGHTS.map((insight, i) => (
            <div key={i} className={`flex gap-3 items-start rounded-lg
              px-3 py-2.5 transition-all duration-300 ${
              i <= insightIndex
                ? 'bg-[#2E4862]/5 border border-[#2E4862]/20'
                : 'bg-gray-50 border border-transparent opacity-40'
            }`}>
              <span className={`text-xs font-bold w-4 h-4 rounded-full
                flex items-center justify-center flex-shrink-0 mt-0.5
                transition-colors duration-300 ${
                i <= insightIndex
                  ? 'bg-[#2E4862] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
