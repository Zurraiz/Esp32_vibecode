'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Lightbulb, Play, Square } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

type CloudLevel = 0 | 1 | 2 | 3 | 4;

const CLOUD_ICONS: Record<CloudLevel, string> = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '🌥️', 4: '☁️',
};
const CLOUD_LABELS: Record<CloudLevel, string> = {
  0: 'Bright sunlight', 1: 'Partly sunny',
  2: 'Overcast', 3: 'Heavy cloud', 4: 'Covered',
};
const CLOUD_VALUES: Record<CloudLevel, number> = {
  0: 3900, 1: 2900, 2: 1800, 3: 900, 4: 200,
};

export default function SensorBrightnessSimulator() {
  const blocks = useAppStore(state => state.blocks);
  const [potValue, setPotValue] = useState(2048);
  const [cloudLevel, setCloudLevel] = useState<CloudLevel>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeMode, setActiveMode] = useState<'pot' | 'light'>('pot');
  const isRunningRef = useRef(false);
  const potRef = useRef(potValue);
  const cloudRef = useRef(cloudLevel);
  potRef.current = potValue;
  cloudRef.current = cloudLevel;

  const analogBlock = blocks.find(b => b.type === 'analog_read');
  const pwmBlock = blocks.find(b => b.type === 'pwm_write');
  const pwmPin = pwmBlock ? Number(pwmBlock.values?.pin ?? 2) : 2;

  const rawValue = activeMode === 'pot'
    ? potValue
    : CLOUD_VALUES[cloudLevel];

  // Clamp to 0-255 (values above 255 cap at full brightness)
  const pwmValue = Math.min(rawValue, 255);
  const brightness = pwmValue / 255;

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1 flex
          items-center gap-2">
          <Lightbulb size={15} />
          Sensor → Brightness Simulator — Pin {pwmPin}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Your program reads a sensor value and passes it directly
          to PWM. Move the controls below and watch LED brightness
          respond in real time.
        </p>
        {rawValue > 255 && (
          <div className="mt-2 rounded-lg border border-amber-200
            bg-amber-50 px-3 py-2">
            <p className="text-[10px] text-amber-700 font-medium">
              ⚠️ Sensor value ({rawValue}) exceeds PWM range (255) —
              capped at full brightness. In the next lesson you will
              learn to map this properly.
            </p>
          </div>
        )}
      </div>

      {/* Mode selector */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveMode('pot')}
          className={`flex-1 py-2 rounded-lg border text-xs font-semibold
            transition-all ${
            activeMode === 'pot'
              ? 'bg-[#2E4862] text-white border-[#2E4862]'
              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
          }`}
        >
          🎛️ Potentiometer
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('light')}
          className={`flex-1 py-2 rounded-lg border text-xs font-semibold
            transition-all ${
            activeMode === 'light'
              ? 'bg-[#2E4862] text-white border-[#2E4862]'
              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
          }`}
        >
          ☀️ Photoresistor
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* Left: sensor control */}
        <div className="flex flex-col gap-3">

          {activeMode === 'pot' ? (
            <div className="rounded-xl bg-white border border-gray-200
              p-4 shadow-sm flex flex-col gap-3">
              <p className="text-xs font-bold text-[#2E4862]">
                Potentiometer — Pin {analogBlock
                  ? String(analogBlock.values?.pin ?? 34) : 34}
              </p>
              <input
                type="range"
                min={0}
                max={4095}
                value={potValue}
                onChange={e => setPotValue(Number(e.target.value))}
                className="w-full accent-[#2E4862] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>0</span>
                <span className="font-bold font-mono text-[#2E4862]">
                  {potValue}
                </span>
                <span>4095</span>
              </div>
            </div>
          ) : (
            <div className="rounded-xl bg-white border border-gray-200
              p-4 shadow-sm flex flex-col gap-3">
              <p className="text-xs font-bold text-[#2E4862]">
                Photoresistor — Light Conditions
              </p>
              <div className="flex gap-2">
                {([0, 1, 2, 3, 4] as CloudLevel[]).map(level => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setCloudLevel(level)}
                    className={`flex-1 py-2.5 rounded-xl border-2 text-lg
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
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-gray-500">
                  {CLOUD_LABELS[cloudLevel]}
                </span>
                <span className="text-xs font-bold font-mono text-[#2E4862]">
                  {CLOUD_VALUES[cloudLevel]}
                </span>
              </div>
            </div>
          )}

          {/* Value pipeline */}
          <div className="rounded-xl bg-white border border-gray-200
            p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400 uppercase
              tracking-wider mb-3">Value Pipeline</p>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center
                bg-gray-50 rounded-lg px-3 py-2">
                <span className="text-[10px] text-gray-500 font-mono">
                  analogRead()
                </span>
                <span className="text-xs font-bold font-mono text-[#2E4862]">
                  {rawValue}
                </span>
              </div>
              <div className="text-center text-gray-400 text-xs">↓</div>
              <div className={`flex justify-between items-center
                rounded-lg px-3 py-2 ${
                rawValue > 255
                  ? 'bg-amber-50 border border-amber-200'
                  : 'bg-gray-50'
              }`}>
                <span className="text-[10px] text-gray-500 font-mono">
                  analogWrite()
                </span>
                <span className={`text-xs font-bold font-mono ${
                  rawValue > 255 ? 'text-amber-600' : 'text-[#2E4862]'
                }`}>
                  {pwmValue}
                  {rawValue > 255 && (
                    <span className="text-[10px] font-normal ml-1">
                      (capped)
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: LED */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl bg-gray-50 border border-gray-100
            flex-1 flex flex-col items-center justify-center gap-4 p-6
            min-h-[200px]">
            <p className="text-[10px] font-semibold text-gray-400 uppercase
              tracking-wider self-start">LED on Pin {pwmPin}</p>
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
                {Math.round(brightness * 100)}%
              </p>
              <p className="text-xs text-gray-500">brightness</p>
            </div>
          </div>

          {/* PWM signal */}
          <div className="rounded-xl bg-white border border-gray-200
            p-3 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400 uppercase
              tracking-wider mb-2">PWM Signal</p>
            <div className="bg-gray-900 rounded-lg h-10 flex overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => {
                const isOn = (i % 10) / 10 < brightness;
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end">
                    <div
                      className={isOn ? 'bg-emerald-400' : 'bg-gray-700'}
                      style={{ height: isOn ? '80%' : '20%' }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
