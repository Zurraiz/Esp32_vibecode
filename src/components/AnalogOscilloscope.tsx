'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb } from 'lucide-react';

const INSIGHTS = [
  'Analog values change continuously — not just 0 or 1, but any value in between.',
  'The oscilloscope shows the signal over time — a flat line means no change.',
  'Moving the slider smoothly creates a smooth curve — sudden moves create sharp edges.',
  'This continuous stream of data is what makes sensors so powerful for real systems.',
];

export default function AnalogOscilloscope() {
  const [value, setValue] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [insightIndex, setInsightIndex] = useState(0);
  const moveCount = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(prev => [...prev.slice(-79), value]);
    }, 50);
    return () => clearInterval(interval);
  }, [value]);

  const handleChange = (val: number) => {
    setValue(val);
    moveCount.current += 1;
    if (moveCount.current > 3) setInsightIndex(prev => Math.min(prev + 1, 3));
  };

  const generatePath = () => {
    if (history.length < 2) return '';
    const w = 300;
    const h = 120;
    const stepX = w / Math.max(history.length - 1, 1);
    return history.map((v, i) => {
      const x = i * stepX;
      const y = h - (v / 4095) * h;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  const path = generatePath();
  const brightness = value / 4095;

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          📈 Analog Signal Oscilloscope
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Move the slider to simulate a changing sensor value.
          The oscilloscope traces your signal over time —
          showing how analog input forms a continuous waveform,
          not just individual snapshots.
        </p>
      </div>

      {/* Slider */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-bold text-[#2E4862]">
            Analog Input (0–4095)
          </p>
          <span className="text-xs font-mono bg-[#2E4862] text-white
            px-2 py-1 rounded-lg">
            {value}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={4095}
          value={value}
          onChange={e => handleChange(Number(e.target.value))}
          className="w-full accent-blue-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>0 (min)</span>
          <span>2048 (mid)</span>
          <span>4095 (max)</span>
        </div>
      </div>

      {/* Oscilloscope + LED */}
      <div className="grid grid-cols-2 gap-4">

        {/* Oscilloscope */}
        <div className="rounded-xl bg-white border border-gray-200
          shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100">
            <p className="text-[10px] font-semibold text-gray-400 uppercase
              tracking-wider">Signal over Time</p>
          </div>
          <div className="bg-gray-900 p-3">
            <svg viewBox="0 0 300 120" className="w-full h-28">
              {/* Grid lines */}
              {[30, 60, 90].map(y => (
                <line key={y} x1="0" y1={y} x2="300" y2={y}
                  stroke="#374151" strokeWidth="0.5" />
              ))}
              {path && (
                <>
                  <path d={path} stroke="rgba(59,130,246,0.3)"
                    strokeWidth="6" fill="none" />
                  <path d={path} stroke="#3b82f6"
                    strokeWidth="2" fill="none" />
                </>
              )}
              {!path && (
                <text x="150" y="65" textAnchor="middle"
                  fill="#4b5563" fontSize="10">
                  Move the slider...
                </text>
              )}
            </svg>
          </div>
          <div className="px-4 py-2 bg-white flex justify-between
            text-[10px] text-gray-400">
            <span>← past</span>
            <span>now →</span>
          </div>
        </div>

        {/* LED + value */}
        <div className="rounded-xl bg-gray-50 border border-gray-100
          flex flex-col items-center justify-center gap-3 p-5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase
            tracking-wider self-start">Visual Output</p>
          <div
            className="w-20 h-20 rounded-full border-4 flex items-center
              justify-center transition-all duration-150"
            style={{
              backgroundColor: `rgba(251,191,36,${brightness})`,
              borderColor: brightness > 0.1
                ? `rgba(252,211,77,${brightness})`
                : '#d1d5db',
              boxShadow: brightness > 0.05
                ? `0 0 ${Math.round(brightness * 50)}px rgba(251,191,36,${brightness * 0.8})`
                : 'none',
            }}
          >
            <Lightbulb
              size={30}
              style={{
                color: brightness > 0.5 ? '#92400e' : '#9ca3af',
                opacity: 0.4 + brightness * 0.6,
              }}
              fill="currentColor"
            />
          </div>
          <div className="rounded-xl border-2 border-[#2E4862]/20
            bg-[#2E4862]/5 px-4 py-2 text-center w-full">
            <p className="text-[10px] text-gray-400">analogRead()</p>
            <p className="text-lg font-bold font-mono text-[#2E4862]">
              {value}
            </p>
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
