'use client';

import React, { useState } from 'react';

const INSIGHTS = [
  'Without mapping, sensor values (0–4095) exceed the PWM range (0–255) — the LED hits full brightness at just 6% of knob rotation.',
  'map() scales proportionally — 25% input always gives 25% output, no matter the range.',
  'After mapping, the full sensor range drives the full output range smoothly.',
  'This translation layer is essential in all real embedded systems.',
];

export default function MappingSimulator() {
  const [input, setInput] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  const rawOutput = input;
  const mappedOutput = Math.round((input / 4095) * 255);
  const rawBrightness = Math.min(rawOutput / 255, 1);
  const mappedBrightness = mappedOutput / 255;
  const rawPercent = Math.round(rawBrightness * 100);
  const mappedPercent = Math.round(mappedBrightness * 100);

  const handleChange = (val: number) => {
    setInput(val);
    if (val > 255 && insightIndex < 1) setInsightIndex(1);
    if (val > 2000 && insightIndex < 2) setInsightIndex(2);
    if (val > 3500 && insightIndex < 3) setInsightIndex(3);
  };

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🗺️ Mapping Simulator — Before vs After
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Drag the slider to change the sensor input value.
          The left LED shows what happens without mapping —
          the right shows the same input with mapping applied.
          Watch how they differ.
        </p>
      </div>

      {/* Slider */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-bold text-[#2E4862]">
            Sensor Input (0–4095)
          </p>
          <span className="text-xs font-mono bg-[#2E4862] text-white
            px-2 py-1 rounded-lg">
            {input}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={4095}
          value={input}
          onChange={e => handleChange(Number(e.target.value))}
          className="w-full accent-blue-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>0</span>
          <span>2048</span>
          <span>4095</span>
        </div>
      </div>

      {/* Side by side comparison */}
      <div className="grid grid-cols-2 gap-4">

        {/* Raw — no mapping */}
        <div className="rounded-xl border-2 border-red-200 bg-red-50
          p-5 flex flex-col items-center gap-4">
          <p className="text-xs font-bold text-red-600 self-start">
            ❌ Direct — No Mapping
          </p>

          <div
            className="w-20 h-20 rounded-full border-4 transition-all
              duration-150 flex items-center justify-center"
            style={{
              backgroundColor: `rgba(251,191,36,${rawBrightness})`,
              borderColor: rawBrightness > 0.1
                ? `rgba(252,211,77,${rawBrightness})`
                : '#fca5a5',
              boxShadow: rawBrightness > 0.05
                ? `0 0 ${Math.round(rawBrightness * 40)}px rgba(251,191,36,${rawBrightness * 0.7})`
                : 'none',
            }}
          />

          <div className="w-full flex flex-col gap-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">analogWrite()</span>
              <span className={`font-bold font-mono ${
                rawOutput > 255 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {rawOutput > 255 ? '255 (capped)' : rawOutput}
              </span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">Brightness</span>
              <span className="font-bold text-gray-600">{rawPercent}%</span>
            </div>
            {rawOutput > 255 && (
              <p className="text-[10px] text-red-600 font-medium mt-1">
                ⚠️ Saturated at {Math.round((255/4095)*100)}% of knob range
              </p>
            )}
          </div>
        </div>

        {/* Mapped */}
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50
          p-5 flex flex-col items-center gap-4">
          <p className="text-xs font-bold text-emerald-600 self-start">
            ✅ With map()
          </p>

          <div
            className="w-20 h-20 rounded-full border-4 transition-all
              duration-150 flex items-center justify-center"
            style={{
              backgroundColor: `rgba(251,191,36,${mappedBrightness})`,
              borderColor: mappedBrightness > 0.1
                ? `rgba(252,211,77,${mappedBrightness})`
                : '#6ee7b7',
              boxShadow: mappedBrightness > 0.05
                ? `0 0 ${Math.round(mappedBrightness * 40)}px rgba(251,191,36,${mappedBrightness * 0.7})`
                : 'none',
            }}
          />

          <div className="w-full flex flex-col gap-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">map(val, 0, 4095, 0, 255)</span>
              <span className="font-bold font-mono text-emerald-600">
                {mappedOutput}
              </span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-500">Brightness</span>
              <span className="font-bold text-gray-600">{mappedPercent}%</span>
            </div>
            <p className="text-[10px] text-emerald-600 font-medium mt-1">
              ✓ Full range used proportionally
            </p>
          </div>
        </div>

      </div>

      {/* Pipeline */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 uppercase
          tracking-wider mb-3">Value Pipeline</p>
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <div className="bg-blue-50 border border-blue-200 rounded-lg
            px-3 py-2 font-mono font-semibold text-blue-700">
            {input}
          </div>
          <span className="text-gray-400">→</span>
          <div className="bg-gray-50 border border-gray-200 rounded-lg
            px-3 py-2 font-mono text-gray-600 text-[10px]">
            map(val, 0, 4095, 0, 255)
          </div>
          <span className="text-gray-400">→</span>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg
            px-3 py-2 font-mono font-semibold text-emerald-700">
            {mappedOutput}
          </div>
          <span className="text-gray-400">→</span>
          <div className="bg-amber-50 border border-amber-200 rounded-lg
            px-3 py-2 text-amber-700 font-semibold">
            {mappedPercent}% brightness
          </div>
        </div>
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
