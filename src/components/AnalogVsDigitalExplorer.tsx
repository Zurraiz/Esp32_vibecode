'use client';

import React, { useState, useEffect, useRef } from 'react';

const INSIGHTS = [
  'Digital input only has two states — 0 (LOW) or 1 (HIGH). Nothing in between.',
  'Analog input spans a full range from 0 to 4095 — every value in between is possible.',
  'Physical actions like rotating a knob or changing light produce smooth, gradual changes.',
  'The ESP32 reads analog values 12 bits deep — that gives 4096 possible levels of detail.',
];

export default function AnalogVsDigitalExplorer() {
  const [btnPressed, setBtnPressed] = useState(false);
  const [analogValue, setAnalogValue] = useState(0);
  const [digitalHistory, setDigitalHistory] = useState<number[]>([]);
  const [analogHistory, setAnalogHistory] = useState<number[]>([]);
  const [insightIndex, setInsightIndex] = useState(0);
  const interactionCount = useRef(0);

  useEffect(() => {
    setDigitalHistory(prev => [...prev.slice(-49), btnPressed ? 1 : 0]);
  }, [btnPressed]);

  useEffect(() => {
    setAnalogHistory(prev => [...prev.slice(-49), analogValue]);
    interactionCount.current += 1;
    if (interactionCount.current > 5) setInsightIndex(prev => Math.min(prev + 1, 3));
  }, [analogValue]);

  const handleBtnPress = () => {
    setBtnPressed(true);
    setInsightIndex(prev => Math.max(prev, 0));
  };

  const handleBtnRelease = () => {
    setBtnPressed(false);
  };

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnalogValue(Number(e.target.value));
    setInsightIndex(prev => Math.max(prev, 1));
  };

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          ⚡ Digital vs Analog — Spot the Difference
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Interact with both inputs. The left only ever produces
          two values. The right produces thousands.
          Watch the graphs to see the fundamental difference.
        </p>
      </div>

      {/* Side by side inputs */}
      <div className="grid grid-cols-2 gap-4">

        {/* Digital */}
        <div className={`rounded-xl border-2 p-5 flex flex-col gap-4
          transition-all duration-200 ${
          btnPressed
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-200 bg-white'
        }`}>
          <div>
            <p className="text-xs font-bold text-[#2E4862]">
              🔘 Digital Input (Button)
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Only two possible values
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              type="button"
              onMouseDown={handleBtnPress}
              onMouseUp={handleBtnRelease}
              onMouseLeave={handleBtnRelease}
              onTouchStart={handleBtnPress}
              onTouchEnd={handleBtnRelease}
              className={`w-20 h-20 rounded-full select-none
                transition-all duration-75 flex items-center justify-center
                text-xs font-bold border-4 ${
                btnPressed
                  ? 'bg-blue-500 border-blue-400 shadow-none translate-y-1 text-white'
                  : 'bg-gradient-to-b from-gray-100 to-gray-200 border-gray-300 text-gray-600 shadow-[0_5px_0_#b0b0b0]'
              }`}
            >
              {btnPressed ? 'HIGH' : 'LOW'}
            </button>
          </div>

          {/* Value display */}
          <div className="rounded-xl border-2 border-blue-200 bg-blue-50
            py-3 px-4 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
              digitalRead(pin)
            </p>
            <p className="text-3xl font-bold font-mono text-blue-600">
              {btnPressed ? 1 : 0}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              {btnPressed ? 'HIGH — button pressed' : 'LOW — not pressed'}
            </p>
          </div>

          {/* Graph */}
          <div>
            <p className="text-[10px] text-gray-400 mb-1.5 uppercase
              tracking-wider">Signal graph</p>
            <div className="bg-gray-900 rounded-lg h-16 flex gap-px
              items-end p-2 overflow-hidden">
              {digitalHistory.length === 0 ? (
                <p className="text-gray-600 text-[10px] italic self-center
                  w-full text-center">
                  Press the button...
                </p>
              ) : (
                digitalHistory.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-400 rounded-t-sm"
                    style={{ height: v === 1 ? '90%' : '10%' }}
                  />
                ))
              )}
            </div>
            <p className="text-[10px] text-gray-400 mt-1 text-center">
              Only two heights — 0 or 1
            </p>
          </div>
        </div>

        {/* Analog */}
        <div className="rounded-xl border-2 border-gray-200 bg-white p-5
          flex flex-col gap-4">
          <div>
            <p className="text-xs font-bold text-[#2E4862]">
              🎛️ Analog Input (Potentiometer)
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              4096 possible values (0–4095)
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-3">
            <input
              type="range"
              min={0}
              max={4095}
              value={analogValue}
              onChange={handleSlider}
              className="w-full accent-[#2E4862] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>0</span>
              <span>2048</span>
              <span>4095</span>
            </div>
          </div>

          {/* Value display */}
          <div className="rounded-xl border-2 border-[#2E4862]/20
            bg-[#2E4862]/5 py-3 px-4 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
              analogRead(pin)
            </p>
            <p className="text-3xl font-bold font-mono text-[#2E4862]
              transition-all duration-100">
              {analogValue}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">
              Any value from 0 to 4095
            </p>
          </div>

          {/* Graph */}
          <div>
            <p className="text-[10px] text-gray-400 mb-1.5 uppercase
              tracking-wider">Signal graph</p>
            <div className="bg-gray-900 rounded-lg h-16 flex gap-px
              items-end p-2 overflow-hidden">
              {analogHistory.length === 0 ? (
                <p className="text-gray-600 text-[10px] italic self-center
                  w-full text-center">
                  Move the slider...
                </p>
              ) : (
                analogHistory.map((v, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-emerald-400 rounded-t-sm
                      transition-all duration-100"
                    style={{ height: `${Math.round((v / 4095) * 100)}%` }}
                  />
                ))
              )}
            </div>
            <p className="text-[10px] text-gray-400 mt-1 text-center">
              Infinite heights — smooth curve
            </p>
          </div>
        </div>

      </div>

      {/* Key difference callout */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-blue-50 border border-blue-200
          px-4 py-3 text-center">
          <p className="text-xs font-bold text-blue-700 mb-1">
            Digital
          </p>
          <p className="text-2xl font-bold font-mono text-blue-600">
            2 values
          </p>
          <p className="text-[10px] text-blue-500 mt-1">
            0 or 1 only
          </p>
        </div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-200
          px-4 py-3 text-center">
          <p className="text-xs font-bold text-emerald-700 mb-1">
            Analog
          </p>
          <p className="text-2xl font-bold font-mono text-emerald-600">
            4096 values
          </p>
          <p className="text-[10px] text-emerald-500 mt-1">
            0 through 4095
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
