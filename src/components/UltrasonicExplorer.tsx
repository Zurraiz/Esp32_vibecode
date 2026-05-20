'use client';

import React, { useEffect, useRef, useState } from 'react';

type Zone = 'far' | 'safe' | 'warning' | 'danger';

const ZONES: Record<Zone, { label: string; color: string; border: string; bg: string; text: string }> = {
  far:     { label: 'Out of Range',  color: '#9ca3af', border: 'border-gray-300',   bg: 'bg-gray-50',    text: 'text-gray-500'   },
  safe:    { label: 'Safe Zone',     color: '#22c55e', border: 'border-green-400',  bg: 'bg-green-50',   text: 'text-green-700'  },
  warning: { label: 'Warning Zone',  color: '#f59e0b', border: 'border-amber-400',  bg: 'bg-amber-50',   text: 'text-amber-700'  },
  danger:  { label: 'Danger Zone',   color: '#ef4444', border: 'border-red-400',    bg: 'bg-red-50',     text: 'text-red-700'    },
};

const WAVE_STEPS = 4;

function getZone(d: number): Zone {
  if (d > 80) return 'far';
  if (d > 50) return 'safe';
  if (d > 20) return 'warning';
  return 'danger';
}

// Pre-computed wave offsets
const WAVE_OFFSETS = [0, 18, 36, 54];

export default function UltrasonicExplorer() {
  const [distance, setDistance] = useState(75);
  const [waveStep, setWaveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const distanceRef = useRef(distance);
  distanceRef.current = distance;
  const logEndRef = useRef<HTMLDivElement>(null);
  const prevZoneRef = useRef<Zone>('far');

  const zone = getZone(distance);
  const z = ZONES[zone];

  // Wave pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveStep(s => (s + 1) % WAVE_STEPS);
    }, 350);
    return () => clearInterval(interval);
  }, []);

  // Serial log on zone change + continuous distance
  useEffect(() => {
    if (zone !== prevZoneRef.current) {
      prevZoneRef.current = zone;
      setLogs(prev => [
        ...prev.slice(-16),
        `> Zone changed: ${ZONES[zone].label}`,
        `> distance = ${distance.toFixed(0)} cm`,
        '─────────────',
      ]);
    }
  }, [zone, distance]);

  // Continuous distance log
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [
        ...prev.slice(-16),
        `> distance = ${distanceRef.current.toFixed(0)} cm`,
      ]);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Car position: distance 100 = rightmost, 5 = leftmost (near sensor)
  const carLeft = 12 + ((distance - 5) / 95) * 62;

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          📏 Ultrasonic Explorer — Distance as Data
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Drag the slider to move the car. Watch the sensor measure distance
          in real time and trigger zone-based responses.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">

        {/* Left: parking scene */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#2E4862] px-4 py-2.5 flex-shrink-0">
            <p className="text-xs font-semibold text-white">Parking Assist</p>
          </div>

          {/* Scene */}
          <div className="relative bg-slate-800 overflow-hidden flex-shrink-0" style={{ height: '200px' }}>

            {/* Zone bands */}
            <div className="absolute top-0 bottom-0 bg-red-500/10 border-r border-red-400/40"   style={{ left: '12%', width: '14%' }} />
            <div className="absolute top-0 bottom-0 bg-amber-400/10 border-r border-amber-400/40" style={{ left: '26%', width: '22%' }} />
            <div className="absolute top-0 bottom-0 bg-green-400/10 border-r border-green-400/40" style={{ left: '48%', width: '26%' }} />

            {/* Zone labels */}
            <div className="absolute top-2 text-[8px] font-bold text-red-400"   style={{ left: '13%' }}>DANGER</div>
            <div className="absolute top-2 text-[8px] font-bold text-amber-400" style={{ left: '28%' }}>WARN</div>
            <div className="absolute top-2 text-[8px] font-bold text-green-400" style={{ left: '50%' }}>SAFE</div>

            {/* Sensor on left wall */}
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-slate-700 flex items-center justify-center flex-shrink-0">
              <div className="text-xl">📡</div>
            </div>

            {/* Ultrasonic wave pulses */}
            {WAVE_OFFSETS.map((offset, i) => {
              const progress = ((waveStep * 25 + offset) % 100);
              const maxReach = Math.min(carLeft, 90);
              const opacity = progress < maxReach ? 0.6 - (progress / maxReach) * 0.5 : 0;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 border-r-2 border-cyan-400 rounded-full pointer-events-none"
                  style={{
                    left: '10%',
                    width: `${progress}%`,
                    height: `${30 + i * 12}%`,
                    opacity,
                    transition: 'none',
                  }}
                />
              );
            })}

            {/* Car */}
            <div
              className="absolute bottom-6 text-3xl transition-all duration-150 select-none"
              style={{ left: `${carLeft}%` }}
            >
              🚗
            </div>

            {/* Distance readout */}
            <div className="absolute bottom-0 left-10 right-0 bg-black/40 px-3 py-1.5 flex items-center justify-between">
              <span className="text-[10px] text-slate-300 font-mono">distance</span>
              <span className="text-sm font-bold font-mono" style={{ color: z.color }}>
                {distance.toFixed(0)} cm
              </span>
            </div>
          </div>

          {/* Zone badge */}
          <div className={`mx-3 mt-3 rounded-lg px-3 py-2 text-center text-xs font-bold border-2 transition-all ${z.border} ${z.bg} ${z.text}`}>
            {z.label}
          </div>

          {/* Slider */}
          <div className="p-3">
            <p className="text-[10px] text-gray-400 mb-1.5 flex justify-between">
              <span>← Close (5 cm)</span><span>Far (100 cm) →</span>
            </p>
            <input
              type="range" min={5} max={100} value={distance}
              onChange={e => setDistance(Number(e.target.value))}
              className="w-full accent-[#2E4862] cursor-pointer"
            />
          </div>
        </div>

        {/* Middle: decision flow */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#2E4862] px-4 py-2.5 flex-shrink-0">
            <p className="text-xs font-semibold text-white">ESP32 Decision Flow</p>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-center gap-2">
            {([
              { label: 'distance = readUltrasonic()', always: true },
              { label: 'if (distance > 80) → Out of range', z: 'far' },
              { label: 'else if (distance > 50) → Safe', z: 'safe' },
              { label: 'else if (distance > 20) → Warning', z: 'warning' },
              { label: 'else → Danger', z: 'danger' },
            ] as { label: string; always?: boolean; z?: Zone }[]).map((item, i) => (
              <React.Fragment key={i}>
                <div className={`px-3 py-2.5 rounded-xl border-2 text-[10px] font-semibold transition-all duration-300 font-mono ${
                  item.always || item.z === zone
                    ? 'bg-[#2E4862] text-white border-[#2E4862] scale-[1.02]'
                    : 'bg-gray-50 text-gray-400 border-gray-100'
                }`}>
                  {item.label}
                </div>
                {i < 4 && (
                  <div className={`text-center text-xs leading-none transition-colors ${
                    item.always || item.z === zone ? 'text-[#2E4862]' : 'text-gray-200'
                  }`}>↓</div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Output state */}
          <div className={`mx-4 mb-4 rounded-lg px-3 py-2.5 border-2 transition-all ${z.border} ${z.bg}`}>
            <p className={`text-[10px] font-bold text-center ${z.text}`}>
              Current Zone: {z.label} — {distance.toFixed(0)} cm
            </p>
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
          <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 h-[300px] overflow-y-auto flex flex-col gap-0.5">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic">Move the slider to start...</span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={
                  l.startsWith('─') ? 'text-gray-700'
                  : l.includes('Zone') ? (i >= logs.length - 3 ? 'text-amber-400' : 'opacity-40 text-amber-700')
                  : i >= logs.length - 1 ? 'text-green-300'
                  : 'opacity-40 text-green-600'
                }>{l}</div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>

      </div>

    </div>
  );
}