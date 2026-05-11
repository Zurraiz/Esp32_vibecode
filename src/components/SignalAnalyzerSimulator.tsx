'use client';

import React, { useState, useEffect, useRef } from 'react';

type Mode = 'button' | 'dht';

const BUTTON_INSIGHTS = [
  'Press and hold — the signal jumps to HIGH (1). Release — it drops to LOW (0).',
  'The ESP32 reads this change instantly on every loop cycle.',
  'HIGH and LOW are the two states of any digital signal — 1 and 0.',
];

const DHT_INSIGHTS = [
  'Unlike a button, the DHT11 sends a stream of data values, not just 0 or 1.',
  'The ESP32 reads temperature and humidity as real numbers stored in variables.',
  'This is how sensors give your program awareness of the physical environment.',
];

export default function SignalAnalyzerSimulator() {
  const [pressed, setPressed] = useState(false);
  const [signalHistory, setSignalHistory] = useState<number[]>([]);
  const [mode, setMode] = useState<Mode>('button');
  const [insightIndex, setInsightIndex] = useState(0);
  const pressCountRef = useRef(0);
  const pressedRef = useRef(false);

  const currentSignal = pressedRef.current ? 1 : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (mode === 'button') {
        const val = pressedRef.current ? 1 : 0;
        setSignalHistory(prev => [val, ...prev.slice(0, 39)]);
      } else {
        const temp = 20 + Math.floor(Math.random() * 10);
        setSignalHistory(prev => [temp, ...prev.slice(0, 39)]);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [mode]);

  const handlePress = () => {
    setPressed(true);
    pressedRef.current = true;
    pressCountRef.current += 1;
    if (pressCountRef.current === 1) setInsightIndex(0);
    if (pressCountRef.current === 2) setInsightIndex(1);
    if (pressCountRef.current >= 3) setInsightIndex(2);
  };

  const handleRelease = () => {
    setPressed(false);
    pressedRef.current = false;
  };

  const handleModeSwitch = (m: Mode) => {
    setMode(m);
    setSignalHistory([]);
    setInsightIndex(0);
    pressCountRef.current = 0;
  };

  const insights = mode === 'button' ? BUTTON_INSIGHTS : DHT_INSIGHTS;
  const latestVal = signalHistory[0];

  // Normalise bar heights for display
  const maxVal = mode === 'dht' ? 30 : 1;
  const minVal = mode === 'dht' ? 20 : 0;

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header + mode toggle */}
      <div className="rounded-xl bg-white border border-gray-200 p-5
        shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#2E4862] mb-0.5">
            📊 Signal Analyzer
          </h3>
          <p className="text-xs text-gray-500">
            See how the ESP32 reads and samples input signals in real time.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleModeSwitch('button')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg
              transition-colors ${
              mode === 'button'
                ? 'bg-[#2E4862] text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            🔘 Button
          </button>
          <button
            type="button"
            onClick={() => handleModeSwitch('dht')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg
              transition-colors ${
              mode === 'dht'
                ? 'bg-[#2E4862] text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            🌡️ DHT11
          </button>
        </div>
      </div>

      {/* Button control */}
      {mode === 'button' && (
        <div className="rounded-xl bg-white border border-gray-200 p-5
          shadow-sm flex flex-col items-center gap-3">
          <p className="text-xs text-gray-500 self-start">
            Press and hold to send a HIGH signal:
          </p>
          <button
            type="button"
            onMouseDown={handlePress}
            onMouseUp={handleRelease}
            onMouseLeave={handleRelease}
            onTouchStart={handlePress}
            onTouchEnd={handleRelease}
            className={`w-24 h-24 rounded-full select-none transition-all
              duration-75 flex items-center justify-center text-xs font-bold
              border-4 ${
              pressed
                ? 'bg-blue-500 border-blue-400 shadow-none translate-y-1 text-white'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 border-gray-300 text-gray-600 shadow-[0_6px_0_#b0b0b0]'
            }`}
          >
            {pressed ? 'HIGH' : 'LOW'}
          </button>
        </div>
      )}

      {/* DHT info */}
      {mode === 'dht' && (
        <div className="rounded-xl bg-white border border-gray-200 p-5
          shadow-sm flex items-center gap-4">
          <div className="text-4xl">🌡️</div>
          <div>
            <p className="text-xs font-semibold text-[#2E4862] mb-0.5">
              DHT11 Sensor — Auto Sampling
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              The sensor continuously sends temperature readings.
              The ESP32 reads and stores each value automatically.
              No button press needed — data flows on its own.
            </p>
          </div>
        </div>
      )}

      {/* Signal graph */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm
        overflow-hidden">
        <div className="px-4 py-2.5 border-b border-gray-100 flex items-center
          justify-between">
          <p className="text-xs font-semibold text-gray-400 uppercase
            tracking-wider">
            Live Signal Graph
          </p>
          <p className="text-xs font-mono text-[#2E4862] font-semibold">
            {mode === 'button'
              ? `Current: ${pressed ? 'HIGH (1)' : 'LOW (0)'}`
              : `Current: ${latestVal ?? '--'}°C`
            }
          </p>
        </div>
        <div className="bg-gray-900 p-4 h-28 flex gap-0.5 items-end">
          {signalHistory.length === 0 ? (
            <p className="text-gray-600 text-xs italic w-full text-center
              self-center">
              Waiting for signal...
            </p>
          ) : (
            signalHistory.map((val, i) => {
              const pct = maxVal === minVal
                ? 50
                : ((val - minVal) / (maxVal - minVal)) * 100;
              const height = Math.max(pct, mode === 'button' && val === 0 ? 15 : pct);
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm transition-all duration-100 ${
                    mode === 'button'
                      ? val === 1 ? 'bg-emerald-400' : 'bg-gray-600'
                      : 'bg-blue-400'
                  }`}
                  style={{ height: `${height}%` }}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Data interpretation */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-white border border-gray-200 p-4
          shadow-sm">
          <p className="text-[10px] font-semibold text-gray-400 uppercase
            tracking-wider mb-2">Raw Signal</p>
          <p className="text-sm font-bold text-[#2E4862]">
            {mode === 'button'
              ? pressed ? 'HIGH' : 'LOW'
              : 'Data Stream'
            }
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            {mode === 'button'
              ? 'Electrical state on pin'
              : 'Continuous sensor output'
            }
          </p>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 p-4
          shadow-sm">
          <p className="text-[10px] font-semibold text-gray-400 uppercase
            tracking-wider mb-2">Digital Value</p>
          <p className="text-2xl font-bold font-mono text-[#2E4862]">
            {mode === 'button'
              ? pressed ? '1' : '0'
              : latestVal !== undefined ? `${latestVal}°C` : '--'
            }
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            {mode === 'button'
              ? 'What ESP32 reads'
              : 'Processed measurement'
            }
          </p>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 p-4
          shadow-sm">
          <p className="text-[10px] font-semibold text-gray-400 uppercase
            tracking-wider mb-2">Stored Variable</p>
          <p className="text-xs font-bold font-mono text-[#2E4862]">
            {mode === 'button'
              ? `btnState = ${pressed ? '1' : '0'}`
              : `temp = ${latestVal ?? '--'}`
            }
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            Ready to use in program
          </p>
        </div>
      </div>

      {/* Progressive insights */}
      <div className="rounded-xl bg-white border border-gray-200 p-5
        shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase
          tracking-widest mb-3">Key Concepts</p>
        <div className="flex flex-col gap-2">
          {insights.map((insight, i) => (
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
