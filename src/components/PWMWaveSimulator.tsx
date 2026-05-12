'use client';

import React, { useState, useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

const INSIGHTS = [
  'PWM stands for Pulse Width Modulation — the signal rapidly switches ON and OFF.',
  'The "width" of each ON pulse controls brightness — wider = brighter.',
  'At 255 the signal is always ON. At 0 it is always OFF. In between is partial brightness.',
  'The switching happens thousands of times per second — too fast for eyes to see.',
];

export default function PWMWaveSimulator() {
  const [value, setValue] = useState(128);
  const [time, setTime] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 1);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const duty = value / 255;
  const dutyPercent = Math.round(duty * 100);

  const width = 300;
  const height = 80;
  const points: string[] = [];

  for (let x = 0; x < width; x++) {
    const cyclePos = ((x + time * 4) % 100) / 100;
    const y = cyclePos < duty ? 10 : 70;
    points.push(`${x},${y}`);
  }

  const handleChange = (val: number) => {
    setValue(val);
    if (val !== 128 && insightIndex < 1) setInsightIndex(1);
    if (val > 200 && insightIndex < 2) setInsightIndex(2);
    if ((val === 255 || val === 0) && insightIndex < 3) setInsightIndex(3);
  };

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          〰️ PWM Wave Visualizer
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Watch the signal pattern change as you move the slider.
          The wave shows exactly how the ESP32 creates different
          brightness levels — not by changing voltage, but by
          changing timing.
        </p>
      </div>

      {/* Slider */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-bold text-[#2E4862]">PWM Value</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-[#2E4862] text-white
              px-2 py-1 rounded-lg">
              {value}
            </span>
            <span className="text-xs text-gray-400">
              ({dutyPercent}% duty)
            </span>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={255}
          value={value}
          onChange={e => handleChange(Number(e.target.value))}
          className="w-full accent-[#2E4862] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>0 (off)</span>
          <span>128 (50%)</span>
          <span>255 (full)</span>
        </div>
      </div>

      {/* Wave + LED side by side */}
      <div className="grid grid-cols-2 gap-4">

        {/* Wave */}
        <div className="rounded-xl bg-white border border-gray-200
          shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-[10px] font-semibold text-gray-400 uppercase
              tracking-wider">Live PWM Signal</p>
          </div>
          <div className="bg-gray-900 p-3">
            <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
              <polyline
                fill="none"
                stroke="#facc15"
                strokeWidth="2"
                points={points.join(' ')}
              />
            </svg>
          </div>
          <div className="px-4 py-2 flex justify-between
            text-[10px] text-gray-400 bg-white">
            <span>HIGH (ON)</span>
            <span>LOW (OFF)</span>
          </div>
        </div>

        {/* LED */}
        <div className="rounded-xl bg-gray-50 border border-gray-100
          flex flex-col items-center justify-center gap-3 p-5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase
            tracking-wider self-start">LED Output</p>
          <div
            className="w-20 h-20 rounded-full border-4 flex items-center
              justify-center transition-all duration-150"
            style={{
              backgroundColor: `rgba(251,191,36,${duty})`,
              borderColor: duty > 0.1
                ? `rgba(252,211,77,${duty})`
                : '#d1d5db',
              boxShadow: duty > 0.05
                ? `0 0 ${Math.round(duty * 50)}px rgba(251,191,36,${duty * 0.8})`
                : 'none',
            }}
          >
            <Lightbulb
              size={30}
              style={{
                color: duty > 0.5 ? '#92400e' : '#9ca3af',
                opacity: 0.4 + duty * 0.6,
              }}
              fill="currentColor"
            />
          </div>
          <p className="text-xs text-gray-500">
            {dutyPercent}% brightness
          </p>
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
