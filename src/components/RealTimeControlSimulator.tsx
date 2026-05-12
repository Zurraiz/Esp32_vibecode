'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Lightbulb } from 'lucide-react';

type CloudLevel = 0 | 1 | 2 | 3 | 4;

const CLOUD_ICONS: Record<CloudLevel, string> = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '🌥️', 4: '☁️',
};
const CLOUD_LABELS: Record<CloudLevel, string> = {
  0: 'Bright', 1: 'Sunny', 2: 'Overcast',
  3: 'Cloudy', 4: 'Dark',
};
const CLOUD_VALUES: Record<CloudLevel, number> = {
  0: 3900, 1: 2900, 2: 1800, 3: 900, 4: 200,
};

const INSIGHTS = [
  'Manual mode: the user decides the output. Potentiometer = human intention.',
  'Automatic mode: the environment decides. Photoresistor = external condition.',
  'Same hardware, same pipeline — different input source creates different behavior.',
  'Real systems combine both: manual override when needed, automatic as default.',
];

export default function RealTimeControlSimulator() {
  const [mode, setMode] = useState<'manual' | 'auto'>('manual');
  const [potValue, setPotValue] = useState(2048);
  const [cloudLevel, setCloudLevel] = useState<CloudLevel>(1);
  const [cycle, setCycle] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);
  const potRef = useRef(potValue);
  const cloudRef = useRef(cloudLevel);
  potRef.current = potValue;
  cloudRef.current = cloudLevel;

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle(prev => prev + 1);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const rawValue = mode === 'manual'
    ? potValue
    : CLOUD_VALUES[cloudLevel];

  const mapped = Math.round((rawValue / 4095) * 255);
  const brightness = mapped / 255;

  const handleModeSwitch = (m: 'manual' | 'auto') => {
    setMode(m);
    setInsightIndex(prev => Math.max(prev, m === 'auto' ? 1 : 0));
  };

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          ⚡ Real-Time Control System
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Switch between Manual and Automatic mode. Watch how
          the same pipeline produces different behavior depending
          on which input source is active.
        </p>
      </div>

      {/* Mode selector */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleModeSwitch('manual')}
          className={`rounded-xl border-2 p-4 text-left transition-all
            duration-200 ${
            mode === 'manual'
              ? 'border-[#2E4862] bg-[#2E4862]/5'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className={`text-xs font-bold mb-0.5 ${
            mode === 'manual' ? 'text-[#2E4862]' : 'text-gray-600'
          }`}>
            🎛️ Manual Mode
          </p>
          <p className="text-[10px] text-gray-400">
            Potentiometer → user controls brightness
          </p>
        </button>
        <button
          type="button"
          onClick={() => handleModeSwitch('auto')}
          className={`rounded-xl border-2 p-4 text-left transition-all
            duration-200 ${
            mode === 'auto'
              ? 'border-[#2E4862] bg-[#2E4862]/5'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <p className={`text-xs font-bold mb-0.5 ${
            mode === 'auto' ? 'text-[#2E4862]' : 'text-gray-600'
          }`}>
            ☀️ Automatic Mode
          </p>
          <p className="text-[10px] text-gray-400">
            Photoresistor → environment controls brightness
          </p>
        </button>
      </div>

      {/* Input control */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        {mode === 'manual' ? (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold text-[#2E4862]">
                Potentiometer
              </p>
              <span className="text-xs font-mono text-gray-500">
                {potValue}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={4095}
              value={potValue}
              onChange={e => {
                setPotValue(Number(e.target.value));
                setInsightIndex(prev => Math.max(prev, 0));
              }}
              className="w-full accent-[#2E4862] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>Min (dim)</span>
              <span>Max (bright)</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold text-[#2E4862]">
              Light Conditions
            </p>
            <div className="flex gap-2">
              {([0, 1, 2, 3, 4] as CloudLevel[]).map(level => (
                <button
                  key={level}
                  type="button"
                  onClick={() => {
                    setCloudLevel(level);
                    setInsightIndex(prev => Math.max(prev, 2));
                  }}
                  className={`flex-1 py-3 rounded-xl border-2 text-xl
                    transition-all duration-150 ${
                    cloudLevel === level
                      ? 'border-[#2E4862] bg-[#2E4862]/5 scale-110'
                      : 'border-gray-200 bg-white'
                  }`}
                  title={CLOUD_LABELS[level]}
                >
                  {CLOUD_ICONS[level]}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 text-center">
              {CLOUD_LABELS[cloudLevel]} — sensor reads {CLOUD_VALUES[cloudLevel]}
            </p>
          </div>
        )}
      </div>

      {/* Live pipeline */}
      <div className="rounded-xl bg-white border border-gray-200
        shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5
          flex items-center justify-between">
          <p className="text-[10px] font-semibold text-gray-400 uppercase
            tracking-wider">Live Data Pipeline</p>
          <span className="text-[10px] font-mono text-emerald-600
            font-semibold">
            Loop #{cycle}
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-4
          gap-2">
          {[
            { label: 'INPUT', value: rawValue, color: 'text-blue-600' },
            { label: '→', value: null, color: 'text-gray-300' },
            { label: 'MAPPED', value: mapped, color: 'text-indigo-600' },
            { label: '→', value: null, color: 'text-gray-300' },
            { label: 'PWM', value: mapped, color: 'text-purple-600' },
            { label: '→', value: null, color: 'text-gray-300' },
            { label: 'LED', value: `${Math.round(brightness * 100)}%`, color: 'text-amber-500' },
          ].map((item, i) => (
            item.value === null
              ? <span key={i} className="text-gray-300 text-lg">→</span>
              : (
                <div key={i} className="text-center">
                  <p className="text-[9px] text-gray-400 uppercase
                    tracking-wider mb-1">{item.label}</p>
                  <p className={`text-sm font-bold font-mono ${item.color}
                    transition-all duration-100`}>
                    {item.value}
                  </p>
                </div>
              )
          ))}
        </div>
      </div>

      {/* LED */}
      <div className="rounded-xl bg-gray-50 border border-gray-100
        flex flex-col items-center justify-center gap-3 p-6">
        <p className="text-[10px] font-semibold text-gray-400 uppercase
          tracking-wider self-start">Output — LED Brightness</p>
        <div
          className="w-24 h-24 rounded-full border-4 flex items-center
            justify-center transition-all duration-150"
          style={{
            backgroundColor: `rgba(251,191,36,${brightness})`,
            borderColor: brightness > 0.1
              ? `rgba(252,211,77,${brightness})`
              : '#d1d5db',
            boxShadow: brightness > 0.05
              ? `0 0 ${Math.round(brightness * 60)}px rgba(251,191,36,${brightness * 0.8})`
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
        <p className="text-lg font-bold font-mono text-[#2E4862]">
          {Math.round(brightness * 100)}%
        </p>
        <p className="text-[10px] text-gray-400">
          {mode === 'manual'
            ? 'Controlled by user — potentiometer'
            : 'Controlled by environment — photoresistor'
          }
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
