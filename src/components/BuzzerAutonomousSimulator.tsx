'use client';

import React, { useEffect, useRef, useState } from 'react';

const WAVE_SIZE = 80;

// Autonomous entities with pre-computed movement
const INITIAL = [
  { id: 'person', emoji: '🚶', x: 10,  speed: 0.7,  y: 60 },
  { id: 'cat',    emoji: '🐈', x: 60,  speed: -1.0, y: 35 },
];

const ZONE_LEFT = 40;
const ZONE_RIGHT = 70;

export default function BuzzerAutonomousSimulator() {
  const [entities, setEntities] = useState(INITIAL);
  const [motion, setMotion]     = useState(false);
  const [buzzerOn, setBuzzerOn] = useState(false);
  const [wave, setWave]         = useState<number[]>(Array(WAVE_SIZE).fill(0));
  const [activeId, setActiveId] = useState<string | null>(null);
  const entitiesRef  = useRef(INITIAL.map(e => ({ ...e })));
  const buzzerRef    = useRef(false);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const logEndRef    = useRef<HTMLDivElement>(null);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  // Move entities
  useEffect(() => {
    const interval = setInterval(() => {
      entitiesRef.current = entitiesRef.current.map(e => {
        let nx = e.x + e.speed;
        let ns = e.speed;
        if (nx > 88 || nx < 2) { ns = -ns; nx = Math.max(2, Math.min(88, nx)); }
        return { ...e, x: nx, speed: ns };
      });
      const inZone = entitiesRef.current.filter(e => e.x > ZONE_LEFT && e.x < ZONE_RIGHT);
      const detected = inZone.length > 0;
      const changed = detected !== buzzerRef.current;
      buzzerRef.current = detected;
      setEntities([...entitiesRef.current]);
      setMotion(detected);
      setBuzzerOn(detected);
      setActiveId(detected ? inZone[0].id : null);
      if (changed) {
        setLogs(prev => [
          ...prev.slice(-20),
          detected
            ? `> motion = HIGH → tone(13, 1000)`
            : '> motion = LOW → noTone(13)',
          '─────────────',
        ]);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Wave ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setWave(prev => [...prev.slice(1), buzzerRef.current ? 1 : 0]);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Draw waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(148,163,184,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    if (wave.every(v => v === 0)) return;
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const step = W / WAVE_SIZE;
    wave.forEach((v, i) => {
      const x = i * step;
      const y = v ? 5 : H - 5;
      if (i === 0) { ctx.moveTo(x, y); return; }
      if (wave[i] !== wave[i - 1]) ctx.lineTo(x, y);
      ctx.lineTo(x + step, y);
    });
    ctx.stroke();
  }, [wave]);

  return (
    <div className="h-full flex flex-col gap-3 p-1">

      {/* Scene */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
        <div className="bg-[#2E4862] px-4 py-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-white">Autonomous PIR + Buzzer</p>
          <span className="text-lg">{buzzerOn ? '🔊' : '🔇'}</span>
        </div>

        {/* Room */}
        <div className="relative bg-slate-800 overflow-hidden" style={{ height: '130px' }}>
          <div className={`absolute inset-0 transition-all duration-300 ${buzzerOn ? 'bg-amber-400/10' : 'bg-black/20'}`} />

          {/* Zone */}
          <div
            className={`absolute top-0 bottom-0 border-x-2 transition-all ${
              motion ? 'border-red-400 bg-red-500/10' : 'border-cyan-400/50 bg-cyan-500/5'
            }`}
            style={{ left: `${ZONE_LEFT}%`, width: `${ZONE_RIGHT - ZONE_LEFT}%` }}
          />

          {/* PIR */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
            <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm transition-all ${
              motion ? 'bg-red-100 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.6)]' : 'bg-slate-700 border-cyan-400/50'
            }`}>📡</div>
          </div>

          {/* Entities */}
          {entities.map(e => (
            <div key={e.id} className="absolute text-2xl select-none"
              style={{
                left: `${e.x}%`,
                top: `${e.y}%`,
                transform: e.speed < 0 ? 'scaleX(-1)' : 'none',
                filter: activeId === e.id ? 'drop-shadow(0 0 5px rgba(239,68,68,0.8))' : 'none',
                transition: 'left 60ms linear',
              }}>
              {e.emoji}
            </div>
          ))}
        </div>

        {/* Waveform */}
        <div className="px-3 pb-2 pt-1">
          <p className="text-[9px] text-gray-400 mb-1">Buzzer Signal</p>
          <canvas ref={canvasRef} width={500} height={44}
            className="w-full bg-[#0d1117] rounded-lg" />
        </div>

        {/* Status */}
        <div className="px-3 pb-2 flex items-center justify-between">
          <p className={`text-[10px] font-bold ${motion ? 'text-red-500' : 'text-gray-400'}`}>
            PIR: {motion ? 'HIGH' : 'LOW'}
          </p>
          <p className={`text-[10px] font-bold ${buzzerOn ? 'text-amber-500' : 'text-gray-400'}`}>
            Buzzer: {buzzerOn ? 'ON — 1000 Hz' : 'OFF'}
          </p>
        </div>
      </div>

      {/* Serial */}
      <div className="rounded-xl overflow-hidden border border-gray-800 flex flex-col flex-1 min-h-0">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between flex-shrink-0">
          <span className="text-xs font-semibold text-white">Serial Monitor</span>
          <span className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
            Live
          </span>
        </div>
        <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 overflow-y-auto flex flex-col gap-0.5 flex-1">
          {logs.length === 0
            ? <span className="text-gray-500 italic">Waiting for motion...</span>
            : logs.map((l, i) => (
              <div key={i} className={
                l.startsWith('─') ? 'text-gray-700'
                : i >= logs.length - 2
                ? l.includes('HIGH') ? 'text-amber-400' : 'text-green-300'
                : 'opacity-40 text-green-600'
              }>{l}</div>
            ))}
          <div ref={logEndRef} />
        </div>
      </div>

    </div>
  );
}