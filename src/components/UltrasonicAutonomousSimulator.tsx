'use client';

import React, { useEffect, useRef, useState } from 'react';

type Zone = 'far' | 'safe' | 'warning' | 'danger';

function getZone(d: number): Zone {
  if (d > 80) return 'far';
  if (d > 50) return 'safe';
  if (d > 20) return 'warning';
  return 'danger';
}

const ZONE_COLOR: Record<Zone, string> = {
  far: '#9ca3af', safe: '#22c55e', warning: '#f59e0b', danger: '#ef4444',
};
const ZONE_LABEL: Record<Zone, string> = {
  far: 'Out of Range', safe: 'Safe', warning: 'Warning', danger: 'Danger',
};

const SCAN_LINES = [0, 20, 40, 60, 80];
const WAVE_OFFSETS = [0, 22, 44, 66];

export default function UltrasonicAutonomousSimulator() {
  const [distance, setDistance] = useState(85);
  const [waveStep, setWaveStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const dirRef = useRef(-0.4); // negative = approaching
  const distRef = useRef(85);
  const prevZoneRef = useRef<Zone>('far');
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Move car autonomously
  useEffect(() => {
    const move = setInterval(() => {
      let d = distRef.current + dirRef.current;
      if (d <= 5)  { d = 5;   dirRef.current = 0.35; }
      if (d >= 95) { d = 95;  dirRef.current = -0.4; }
      distRef.current = d;
      setDistance(parseFloat(d.toFixed(1)));

      const zone = getZone(d);
      if (zone !== prevZoneRef.current) {
        prevZoneRef.current = zone;
        setLogs(prev => [
          ...prev.slice(-20),
          `> distance = ${d.toFixed(0)} cm`,
          `> Zone: ${ZONE_LABEL[zone]}`,
          '─────────────',
        ]);
      }
    }, 60);
    return () => clearInterval(move);
  }, []);

  // Wave animation
  useEffect(() => {
    const wave = setInterval(() => {
      setWaveStep(s => (s + 1) % 4);
    }, 320);
    return () => clearInterval(wave);
  }, []);

  const zone = getZone(distance);
  const color = ZONE_COLOR[zone];
  const carLeft = 12 + ((distance - 5) / 90) * 62;

  return (
    <div className="h-full flex flex-col gap-3 p-1">

      {/* Scene */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
        <div className="bg-[#2E4862] px-4 py-2">
          <p className="text-xs font-semibold text-white">Autonomous Distance System</p>
        </div>

        <div className="relative bg-slate-800 overflow-hidden" style={{ height: '160px' }}>

          {/* Zone bands */}
          <div className="absolute top-0 bottom-0 bg-red-500/10 border-r border-red-400/30"   style={{ left: '12%', width: '14%' }} />
          <div className="absolute top-0 bottom-0 bg-amber-400/10 border-r border-amber-400/30" style={{ left: '26%', width: '22%' }} />
          <div className="absolute top-0 bottom-0 bg-green-400/10"                               style={{ left: '48%', width: '26%' }} />

          {/* Sensor */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-slate-700 flex items-center justify-center">
            <span className="text-lg">📡</span>
          </div>

          {/* Wave rings */}
          {WAVE_OFFSETS.map((offset, i) => {
            const progress = ((waveStep * 25 + offset) % 100);
            const maxReach = Math.min(carLeft, 88);
            const opacity = progress < maxReach ? 0.55 - (progress / maxReach) * 0.45 : 0;
            return (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 border-r-2 border-cyan-400 rounded-full pointer-events-none"
                style={{
                  left: '10%',
                  width: `${progress}%`,
                  height: `${28 + i * 10}%`,
                  opacity,
                  transition: 'none',
                }}
              />
            );
          })}

          {/* Car */}
          <div
            className="absolute bottom-4 text-2xl select-none"
            style={{ left: `${carLeft}%`, transition: 'left 60ms linear' }}
          >
            🚗
          </div>

          {/* Readout */}
          <div className="absolute bottom-0 left-10 right-0 bg-black/40 px-3 py-1 flex justify-between items-center">
            <span className="text-[9px] text-slate-400 font-mono">distance</span>
            <span className="text-xs font-bold font-mono" style={{ color }}>
              {distance.toFixed(0)} cm — {ZONE_LABEL[zone]}
            </span>
          </div>
        </div>
      </div>

      {/* Serial monitor */}
      <div className="rounded-xl overflow-hidden border border-gray-800 flex flex-col flex-1 min-h-0">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between flex-shrink-0">
          <span className="text-xs font-semibold text-white">Serial Monitor</span>
          <span className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
            Live
          </span>
        </div>
        <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 overflow-y-auto flex flex-col gap-0.5 flex-1">
          {logs.length === 0 ? (
            <span className="text-gray-500 italic">Waiting for zone change...</span>
          ) : (
            logs.map((l, i) => (
              <div key={i} className={
                l.startsWith('─') ? 'text-gray-700'
                : l.includes('Zone') ? (i >= logs.length - 3 ? 'text-amber-400' : 'opacity-40 text-amber-700')
                : i >= logs.length - 3 ? 'text-green-300'
                : 'opacity-40 text-green-600'
              }>{l}</div>
            ))
          )}
          <div ref={logEndRef} />
        </div>
      </div>

    </div>
  );
}