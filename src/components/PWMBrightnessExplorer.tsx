'use client';

import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';

const PRESETS = [
  { label: 'Off', value: 0 },
  { label: 'Dim', value: 64 },
  { label: 'Medium', value: 128 },
  { label: 'Bright', value: 192 },
  { label: 'Full', value: 255 },
];

const INSIGHTS = [
  'PWM controls brightness by switching the LED on and off thousands of times per second.',
  'The value (0–255) controls how long the signal stays ON in each cycle.',
  '0 = always OFF, 255 = always ON, 128 = half the time ON — that\'s 50% brightness.',
  'The human eye cannot see the switching — it only perceives the average brightness.',
];

export default function PWMBrightnessExplorer() {
  const [pwmValue, setPwmValue] = useState(128);
  const [insightIndex, setInsightIndex] = useState(0);

  const brightness = pwmValue / 255;
  const dutyPercent = Math.round(brightness * 100);

  const handleChange = (val: number) => {
    setPwmValue(val);
    if (val > 0 && insightIndex < 1) setInsightIndex(1);
    if (val > 100 && insightIndex < 2) setInsightIndex(2);
    if (val === 255 || val === 0) setInsightIndex(3);
  };

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔆 PWM Brightness Explorer
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Drag the slider to change the PWM value (0–255).
          Watch how the LED brightness and duty cycle change.
          Try the presets to see specific brightness levels.
        </p>
      </div>

      {/* Main controls + LED */}
      <div className="grid grid-cols-2 gap-4">

        {/* Left: controls */}
        <div className="flex flex-col gap-4">

          {/* Slider */}
          <div className="rounded-xl bg-white border border-gray-200
            p-4 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold text-[#2E4862]">
                PWM Value
              </p>
              <span className="text-sm font-bold font-mono text-[#2E4862]">
                {pwmValue}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={255}
              value={pwmValue}
              onChange={e => handleChange(Number(e.target.value))}
              className="w-full accent-[#2E4862] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>0 (off)</span>
              <span>128 (50%)</span>
              <span>255 (full)</span>
            </div>
          </div>

          {/* Presets */}
          <div className="rounded-xl bg-white border border-gray-200
            p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400
              uppercase tracking-wider mb-2">Quick Presets</p>
            <div className="flex gap-2">
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleChange(p.value)}
                  className={`flex-1 py-2 rounded-lg border text-[10px]
                    font-semibold transition-all ${
                    pwmValue === p.value
                      ? 'bg-[#2E4862] text-white border-[#2E4862]'
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duty cycle */}
          <div className="rounded-xl bg-white border border-gray-200
            p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400
              uppercase tracking-wider mb-3">Duty Cycle</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-[#2E4862] rounded-full transition-all
                    duration-150"
                  style={{ width: `${dutyPercent}%` }}
                />
              </div>
              <span className="text-sm font-bold font-mono text-[#2E4862]
                w-10 text-right">
                {dutyPercent}%
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
              {dutyPercent === 0
                ? 'Signal always OFF — LED off'
                : dutyPercent === 100
                ? 'Signal always ON — full brightness'
                : `Signal ON ${dutyPercent}% of the time — ${dutyPercent < 50 ? 'dim' : dutyPercent < 80 ? 'moderate' : 'bright'}`
              }
            </p>
          </div>

        </div>

        {/* Right: LED visual */}
        <div className="flex flex-col gap-4">

          {/* LED */}
          <div className="rounded-xl bg-gray-50 border border-gray-100
            flex-1 flex flex-col items-center justify-center gap-4 p-6
            min-h-[200px]">
            <p className="text-[10px] font-semibold text-gray-400 uppercase
              tracking-wider self-start">LED Output</p>

            <div
              className="w-24 h-24 rounded-full border-4 flex items-center
                justify-center transition-all duration-150"
              style={{
                backgroundColor: `rgba(251, 191, 36, ${brightness})`,
                borderColor: brightness > 0.1
                  ? `rgba(252, 211, 77, ${brightness})`
                  : '#d1d5db',
                boxShadow: brightness > 0.05
                  ? `0 0 ${Math.round(brightness * 60)}px rgba(251, 191, 36, ${brightness * 0.8})`
                  : 'none',
              }}
            >
              <Lightbulb
                size={36}
                style={{
                  color: brightness > 0.5 ? '#92400e' : '#9ca3af',
                  opacity: 0.4 + brightness * 0.6,
                }}
                fill="currentColor"
              />
            </div>

            <div className="text-center">
              <p className="text-lg font-bold font-mono text-[#2E4862]">
                {pwmValue}
                <span className="text-xs text-gray-400 font-normal ml-1">
                  / 255
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {pwmValue === 0
                  ? 'LED off'
                  : pwmValue < 64
                  ? 'Barely visible'
                  : pwmValue < 128
                  ? 'Dim'
                  : pwmValue < 192
                  ? 'Moderate'
                  : pwmValue < 255
                  ? 'Bright'
                  : 'Full brightness'
                }
              </p>
            </div>
          </div>

          {/* Code preview */}
          <div className="rounded-xl overflow-hidden border border-gray-200
            shadow-sm">
            <div className="bg-[#2E4862] px-4 py-2">
              <p className="text-[10px] font-medium text-white">
                What your block generates
              </p>
            </div>
            <div className="bg-[#0d1117] px-4 py-3 font-mono text-[11px]
              text-[#c9d1d9]">
              <span style={{ color: '#79c0ff' }}>analogWrite</span>
              {'(pin, '}
              <span style={{ color: '#f0883e' }}>{pwmValue}</span>
              {');'}
              <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
                {' // ' + dutyPercent + '% brightness'}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* PWM signal visualisation */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 uppercase
          tracking-wider mb-3">PWM Signal Pattern</p>
        <div className="bg-gray-900 rounded-lg h-14 flex overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => {
            const cyclePos = (i % 10) / 10;
            const isOn = cyclePos < brightness;
            return (
              <div key={i} className="flex-1 flex flex-col justify-end">
                <div
                  className={`w-full transition-none ${
                    isOn ? 'bg-emerald-400' : 'bg-gray-700'
                  }`}
                  style={{ height: isOn ? '80%' : '20%' }}
                />
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-gray-400 mt-2 text-center">
          Green = signal ON, Grey = signal OFF —
          more green = brighter LED
        </p>
      </div>

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
                flex items-center justify-center flex-shrink-0 mt-0.5 ${
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
