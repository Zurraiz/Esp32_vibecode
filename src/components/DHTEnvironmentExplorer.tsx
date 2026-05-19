'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Thermometer, Droplets } from 'lucide-react';

type EnvMode = 'sunny' | 'rainy' | 'cold' | 'hot';

const ENVIRONMENTS: Record<EnvMode, { label: string; emoji: string; temp: number; hum: number; tempLabel: string; humLabel: string }> = {
  sunny: { label: 'Sunny',    emoji: '☀️',  temp: 31, hum: 40, tempLabel: 'Warm',  humLabel: 'Dry'   },
  rainy: { label: 'Rainy',    emoji: '🌧️', temp: 24, hum: 82, tempLabel: 'Mild',  humLabel: 'Humid' },
  cold:  { label: 'Cold',     emoji: '❄️',  temp: 14, hum: 52, tempLabel: 'Cold',  humLabel: 'Normal'},
  hot:   { label: 'Hot Room', emoji: '🔥',  temp: 38, hum: 28, tempLabel: 'Hot',   humLabel: 'Dry'   },
};

const FLOW_NODES = [
  '🌍 Environment changes',
  '🌡️ DHT sensor reads data',
  '⚙️ ESP32 processes values',
  '🖥️ Serial Monitor updates',
  '🔁 loop() repeats',
];

// Pre-compute rain positions to avoid hydration mismatch
const RAIN_DROPS = Array.from({ length: 20 }, (_, i) => ({
  left: ((i * 37 + 11) % 97),
  top:  ((i * 53 + 7)  % 85),
  dur:  0.7 + (i % 5) * 0.15,
}));

export default function DHTEnvironmentExplorer() {
  const [mode, setMode] = useState<EnvMode>('sunny');
  const [temp, setTemp] = useState(31.0);
  const [hum,  setHum]  = useState(40.0);
  const [pulse, setPulse] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const modeRef = useRef(mode);
  modeRef.current = mode;
  const tempRef = useRef(temp);
  const humRef  = useRef(hum);
  tempRef.current = temp;
  humRef.current  = hum;
  const logEndRef = useRef<HTMLDivElement>(null);

  // Smooth interpolation toward target
  useEffect(() => {
    const interval = setInterval(() => {
      const target = ENVIRONMENTS[modeRef.current];
      setTemp(prev => {
        const next = parseFloat((prev + (target.temp - prev) * 0.1).toFixed(1));
        tempRef.current = next;
        return next;
      });
      setHum(prev => {
        const next = parseFloat((prev + (target.hum - prev) * 0.1).toFixed(1));
        humRef.current = next;
        return next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Pipeline pulse — slower, independent of interpolation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % FLOW_NODES.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // Serial log stream
  useEffect(() => {
    const serial = setInterval(() => {
      const t = tempRef.current;
      const h = humRef.current;
      setLogs(prev => [
        ...prev.slice(-18),
        `Temperature: ${t.toFixed(1)}°C`,
        `Humidity: ${h.toFixed(1)}%`,
        '─────────────',
      ]);
    }, 1800);
    return () => clearInterval(serial);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const env = ENVIRONMENTS[mode];
  const tempColor = temp < 18 ? '#3b82f6' : temp < 30 ? '#2E4862' : '#ef4444';
  const humColor  = hum  < 40 ? '#f59e0b' : hum  < 70 ? '#2E4862' : '#3b82f6';

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🌍 DHT Sensor — Environment Explorer
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Switch between environments. Watch the DHT sensor respond to real-world
          conditions and stream data through the ESP32 to Serial output.
        </p>
      </div>

      {/* Environment selector */}
      <div className="flex gap-2 flex-wrap">
        {(Object.keys(ENVIRONMENTS) as EnvMode[]).map(m => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
              mode === m
                ? 'bg-[#2E4862] text-white border-[#2E4862]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-[#2E4862]/40'
            }`}
          >
            <span>{ENVIRONMENTS[m].emoji}</span>
            {ENVIRONMENTS[m].label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">

        {/* Left: environment visual */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#2E4862] px-4 py-2.5">
            <p className="text-xs font-semibold text-white">Environment</p>
          </div>
          <div className="flex-1 relative flex items-center justify-center min-h-[200px] bg-gradient-to-b from-sky-50 to-white">
            {mode === 'sunny' && (
              <div className="w-20 h-20 rounded-full bg-amber-300 shadow-[0_0_60px_rgba(251,191,36,0.8)] animate-pulse flex items-center justify-center text-3xl">
                ☀️
              </div>
            )}
            {mode === 'rainy' && (
              <div className="w-full h-full absolute inset-0">
                {RAIN_DROPS.map((d, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-6 bg-blue-400 opacity-60 rounded-full"
                    style={{
                      left: `${d.left}%`,
                      top: `${d.top}%`,
                      animation: `bounce ${d.dur}s infinite`,
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center text-5xl">🌧️</div>
              </div>
            )}
            {mode === 'cold' && (
              <div className="text-6xl animate-pulse">❄️</div>
            )}
            {mode === 'hot' && (
              <div className="text-6xl animate-bounce">🔥</div>
            )}
          </div>
          <div className="p-3 border-t border-gray-100 flex flex-col gap-2">
            <div>
              <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                <span>Temp</span>
                <span style={{ color: tempColor }} className="font-mono font-bold">{temp.toFixed(1)}°C</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((temp / 45) * 100, 100)}%`, backgroundColor: tempColor }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                <span>Humidity</span>
                <span style={{ color: humColor }} className="font-mono font-bold">{hum.toFixed(1)}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${hum}%`, backgroundColor: humColor }} />
              </div>
            </div>
          </div>
        </div>

        {/* Middle: flow pipeline */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#2E4862] px-4 py-2.5">
            <p className="text-xs font-semibold text-white">Execution Pipeline</p>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-center gap-2">
            {FLOW_NODES.map((node, i) => (
              <React.Fragment key={i}>
                <div className={`px-3 py-2.5 rounded-xl border-2 text-center text-[10px] font-semibold transition-all duration-200 ${
                  pulse === i
                    ? 'bg-[#2E4862] text-white border-[#2E4862] scale-[1.03]'
                    : 'bg-gray-50 text-gray-500 border-gray-100'
                }`}>
                  {node}
                </div>
                {i < FLOW_NODES.length - 1 && (
                  <div className="text-center text-gray-300 text-xs leading-none">↓</div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Live readings */}
          <div className="border-t border-gray-100 p-3 grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center gap-0.5">
              <Thermometer size={14} style={{ color: tempColor }} />
              <p className="text-lg font-bold font-mono" style={{ color: tempColor }}>{temp.toFixed(1)}</p>
              <p className="text-[9px] text-gray-400">°C</p>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <Droplets size={14} style={{ color: humColor }} />
              <p className="text-lg font-bold font-mono" style={{ color: humColor }}>{hum.toFixed(1)}</p>
              <p className="text-[9px] text-gray-400">%RH</p>
            </div>
          </div>
        </div>

        {/* Right: serial monitor */}
        <div className="rounded-xl overflow-hidden border border-gray-800 flex flex-col">
          <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
            <span className="text-xs font-semibold text-white">Serial Monitor</span>
            <span className="flex items-center gap-1 text-[10px] text-green-400">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
              Live
            </span>
          </div>
          <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 h-[240px] overflow-y-auto flex flex-col gap-0.5">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic">Waiting for sensor data...</span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={
                  l.startsWith('─')
                    ? 'text-gray-700'
                    : i >= logs.length - 3
                    ? 'text-green-300'
                    : 'opacity-40 text-green-600'
                }>
                  {l.startsWith('─') ? l : `> ${l}`}
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>

      </div>


    </div>
  );
}