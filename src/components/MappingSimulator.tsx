'use client';

import React, { useState, useRef, useCallback } from 'react';

const INSIGHTS = [
  'Without mapping, sensor values (0–4095) exceed the PWM range (0–255) — the LED hits full brightness at just 6% of knob rotation.',
  'map() scales proportionally — 25% input always gives 25% output, no matter the range.',
  'After mapping, the full sensor range drives the full output range smoothly.',
  'This translation layer is essential in all real embedded systems.',
];

// Knob sweep: from -135deg to +135deg (270deg total, like a real potentiometer)
const MIN_ANGLE = -135;
const MAX_ANGLE = 135;

function Knob({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  const isDragging = useRef(false);
  const lastY = useRef(0);
  const knobRef = useRef<SVGSVGElement>(null);

  // Convert value (0-4095) to angle
  const angle = MIN_ANGLE + (value / 4095) * (MAX_ANGLE - MIN_ANGLE);
  const rad = (angle * Math.PI) / 180;
  const indicatorX = 50 + 28 * Math.sin(rad);
  const indicatorY = 50 - 28 * Math.cos(rad);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastY.current = e.clientY;
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    const delta = lastY.current - e.clientY;
    lastY.current = e.clientY;
    onChange(Math.max(0, Math.min(4095, value + delta * 20)));
  }, [value, onChange]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    lastY.current = e.touches[0].clientY;
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging.current) return;
    const delta = lastY.current - e.touches[0].clientY;
    lastY.current = e.touches[0].clientY;
    onChange(Math.max(0, Math.min(4095, value + delta * 20)));
  }, [value, onChange]);

  React.useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleTouchMove, handleMouseUp]);

  // Arc path for filled sweep
  const startRad = (MIN_ANGLE * Math.PI) / 180;
  const endRad = rad;
  const startX = 50 + 34 * Math.sin(startRad);
  const startY = 50 - 34 * Math.cos(startRad);
  const endX = 50 + 34 * Math.sin(endRad);
  const endY = 50 - 34 * Math.cos(endRad);
  const largeArc = angle - MIN_ANGLE > 180 ? 1 : 0;

  return (
    <svg
      ref={knobRef}
      width={100}
      height={100}
      viewBox="0 0 100 100"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className="cursor-grab active:cursor-grabbing select-none"
    >
      {/* Background track */}
      <circle cx="50" cy="50" r="34" fill="none"
        stroke="#e5e7eb" strokeWidth="6"
        strokeDasharray="213 300"
        strokeDashoffset="-75"
        strokeLinecap="round" />

      {/* Filled arc */}
      {value > 0 && (
        <path
          d={`M ${startX.toFixed(1)} ${startY.toFixed(1)} A 34 34 0 ${largeArc} 1 ${endX.toFixed(1)} ${endY.toFixed(1)}`}
          fill="none"
          stroke="#2E4862"
          strokeWidth="6"
          strokeLinecap="round"
        />
      )}

      {/* Knob body */}
      <circle cx="50" cy="50" r="26"
        fill="url(#knobGrad)" stroke="#d1d5db" strokeWidth="1.5" />

      {/* Gradient */}
      <defs>
        <radialGradient id="knobGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#f9fafb" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </radialGradient>
      </defs>

      {/* Indicator dot */}
      <circle
        cx={indicatorX.toFixed(1)}
        cy={indicatorY.toFixed(1)}
        r="3.5"
        fill="#2E4862"
      />

      {/* Center dot */}
      <circle cx="50" cy="50" r="3" fill="#9ca3af" />
    </svg>
  );
}

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
    setInput(Math.round(val));
    if (val > 255 && insightIndex < 1) setInsightIndex(1);
    if (val > 2000 && insightIndex < 2) setInsightIndex(2);
    if (val > 3500 && insightIndex < 3) setInsightIndex(3);
  };

  const rotationPercent = Math.round((input / 4095) * 100);

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🗺️ Mapping Simulator — Before vs After
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Drag the knob to simulate rotating a potentiometer.
          The left LED shows what happens without mapping —
          the right shows the same input with mapping applied.
        </p>
      </div>

      {/* Knob + comparison */}
      <div className="rounded-xl bg-white border border-gray-200 p-5
        shadow-sm flex flex-col items-center gap-4">

        <p className="text-xs font-bold text-[#2E4862] self-start">
          🎛️ Potentiometer — Drag to rotate
        </p>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Knob value={input} onChange={handleChange} />
            <div className="text-center">
              <p className="text-lg font-bold font-mono text-[#2E4862]">
                {input}
              </p>
              <p className="text-[10px] text-gray-400">
                analogRead() = {input} ({rotationPercent}% rotation)
              </p>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1 text-gray-300">
            <div className="w-12 h-0.5 bg-gray-200" />
            <span className="text-[10px] text-gray-400">feeds into</span>
          </div>

          {/* Pipeline */}
          <div className="flex flex-col gap-2">
            <div className="rounded-lg bg-red-50 border border-red-200
              px-3 py-2 text-center w-32">
              <p className="text-[10px] text-red-500 font-semibold mb-0.5">
                Direct
              </p>
              <p className={`text-sm font-bold font-mono ${
                rawOutput > 255 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {Math.min(rawOutput, 255)}
                {rawOutput > 255 && (
                  <span className="text-[9px] font-normal ml-1">cap</span>
                )}
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200
              px-3 py-2 text-center w-32">
              <p className="text-[10px] text-emerald-600 font-semibold mb-0.5">
                Mapped
              </p>
              <p className="text-sm font-bold font-mono text-emerald-700">
                {mappedOutput}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Side by side LEDs */}
      <div className="grid grid-cols-2 gap-4">

        {/* Raw */}
        <div className="rounded-xl border-2 border-red-200 bg-red-50
          p-5 flex flex-col items-center gap-3">
          <p className="text-xs font-bold text-red-600 self-start">
            ❌ Direct — No Mapping
          </p>
          <div
            className="w-20 h-20 rounded-full border-4 transition-all
              duration-150"
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
          <div className="w-full text-center">
            <p className="text-xs font-bold font-mono text-gray-700">
              PWM: {Math.min(rawOutput, 255)}
              {rawOutput > 255 && ' (capped)'}
            </p>
            <p className={`text-[10px] mt-0.5 ${
              rawOutput > 255 ? 'text-red-500 font-medium' : 'text-gray-400'
            }`}>
              {rawOutput > 255
                ? `⚠️ Full brightness at ${Math.round((255/4095)*100)}% rotation`
                : `${rawPercent}% brightness`
              }
            </p>
          </div>
        </div>

        {/* Mapped */}
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50
          p-5 flex flex-col items-center gap-3">
          <p className="text-xs font-bold text-emerald-600 self-start">
            ✅ With map()
          </p>
          <div
            className="w-20 h-20 rounded-full border-4 transition-all
              duration-150"
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
          <div className="w-full text-center">
            <p className="text-xs font-bold font-mono text-gray-700">
              PWM: {mappedOutput}
            </p>
            <p className="text-[10px] text-emerald-600 font-medium mt-0.5">
              ✓ {mappedPercent}% brightness — full range used
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
