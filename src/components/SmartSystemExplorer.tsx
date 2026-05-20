'use client';

import React, { useEffect, useRef, useState } from 'react';

type SystemState = 'idle' | 'alert' | 'high-alert';

const STATE_CONFIG: Record<SystemState, {
  label: string; color: string; border: string; bg: string;
  buzzerOn: boolean; buzzerInterval: number; ledColor: string;
  desc: string;
}> = {
  'idle':       { label: 'IDLE',       color: '#22c55e', border: 'border-green-400',  bg: 'bg-green-50',  buzzerOn: false, buzzerInterval: 0,   ledColor: '#9ca3af', desc: 'No motion detected — system at rest' },
  'alert':      { label: 'ALERT',      color: '#f59e0b', border: 'border-amber-400',  bg: 'bg-amber-50',  buzzerOn: true,  buzzerInterval: 600, ledColor: '#fbbf24', desc: 'Motion detected — object is far — low risk' },
  'high-alert': { label: 'HIGH ALERT', color: '#ef4444', border: 'border-red-400',    bg: 'bg-red-50',    buzzerOn: true,  buzzerInterval: 150, ledColor: '#fbbf24', desc: 'Motion detected AND object is close — HIGH RISK' },
};

const WAVE_SIZE = 80;

function getState(motion: boolean, distance: number): SystemState {
  if (!motion) return 'idle';
  if (distance < 50) return 'high-alert';
  return 'alert';
}

export default function SmartSystemExplorer() {
  const [motion,   setMotion]   = useState(false);
  const [distance, setDistance] = useState(80);
  const [buzzerOn, setBuzzerOn] = useState(false);
  const [wave,     setWave]     = useState<number[]>(Array(WAVE_SIZE).fill(0));
  const buzzerRef    = useRef(false);
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);

  const sysState = getState(motion, distance);
  const cfg = STATE_CONFIG[sysState];

  // Buzzer pattern based on state
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!cfg.buzzerOn) {
      buzzerRef.current = false;
      setBuzzerOn(false);
      return;
    }
    intervalRef.current = setInterval(() => {
      buzzerRef.current = !buzzerRef.current;
      setBuzzerOn(b => !b);
    }, cfg.buzzerInterval);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [sysState, cfg.buzzerOn, cfg.buzzerInterval]);

  // Wave ticker
  useEffect(() => {
    const t = setInterval(() => {
      setWave(prev => [...prev.slice(1), buzzerRef.current ? 1 : 0]);
    }, 50);
    return () => clearInterval(t);
  }, []);

  // Draw waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(148,163,184,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    if (wave.every(v => v === 0)) return;
    ctx.strokeStyle = cfg.color;
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
  }, [wave, cfg.color]);

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🧠 Smart System Explorer — Multi-Sensor Decision Logic
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Toggle motion and adjust distance. Watch how combining two sensors
          creates three distinct system states — more accurate than either sensor alone.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">

        {/* Left: sensor controls */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#2E4862] px-4 py-2.5">
            <p className="text-xs font-semibold text-white">Sensor Inputs</p>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-4">

            {/* PIR toggle */}
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">PIR Sensor</p>
              <button
                type="button"
                onClick={() => setMotion(m => !m)}
                className={`w-full py-3 rounded-xl border-2 text-xs font-bold transition-all ${
                  motion
                    ? 'bg-red-500 border-red-400 text-white'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {motion ? '🚨 Motion: HIGH' : '✅ Motion: LOW'}
              </button>
            </div>

            {/* Distance slider */}
            <div>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Ultrasonic — <span className="text-[#2E4862]">{distance} cm</span>
              </p>
              <input
                type="range" min={5} max={120} value={distance}
                onChange={e => setDistance(Number(e.target.value))}
                className="w-full accent-[#2E4862] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-gray-400 mt-1">
                <span>5 cm</span><span>120 cm</span>
              </div>
            </div>

            {/* Current values */}
            <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400 font-mono">motion</span>
                <span className={`font-bold font-mono ${motion ? 'text-red-500' : 'text-gray-400'}`}>
                  {motion ? 'HIGH' : 'LOW'}
                </span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400 font-mono">distance</span>
                <span className="font-bold font-mono text-[#2E4862]">{distance} cm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: decision logic */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#2E4862] px-4 py-2.5">
            <p className="text-xs font-semibold text-white">Decision Logic</p>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-2 justify-center">
            {([
              { key: 'high-alert', label: 'if (motion AND distance < 50)', cond: motion && distance < 50 },
              { key: 'alert',      label: 'else if (motion)',               cond: motion && distance >= 50 },
              { key: 'idle',       label: 'else (no motion)',               cond: !motion },
            ] as { key: SystemState; label: string; cond: boolean }[]).map((item, i) => (
              <React.Fragment key={item.key}>
                <div className={`px-3 py-3 rounded-xl border-2 text-[10px] font-semibold font-mono transition-all duration-200 ${
                  item.cond
                    ? `${STATE_CONFIG[item.key].border} ${STATE_CONFIG[item.key].bg} scale-[1.02]`
                    : 'border-gray-100 bg-gray-50 text-gray-400'
                }`} style={{ color: item.cond ? STATE_CONFIG[item.key].color : undefined }}>
                  {item.label}
                </div>
                {i < 2 && (
                  <div className="text-center text-gray-200 text-xs leading-none">↓</div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* State badge */}
          <div className={`mx-4 mb-4 rounded-xl border-2 px-4 py-3 text-center transition-all ${cfg.border} ${cfg.bg}`}>
            <p className="text-xs font-bold" style={{ color: cfg.color }}>{cfg.label}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{cfg.desc}</p>
          </div>
        </div>

        {/* Right: outputs */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#2E4862] px-4 py-2.5">
            <p className="text-xs font-semibold text-white">System Outputs</p>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-3">

            {/* LED */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold self-start">LED</p>
              <div
                className="w-12 h-12 rounded-full border-4 transition-all duration-300"
                style={{
                  backgroundColor: cfg.ledColor,
                  borderColor: cfg.ledColor,
                  boxShadow: sysState !== 'idle' ? `0 0 18px ${cfg.ledColor}99` : 'none',
                }}
              />
              <p className="text-[10px] font-bold" style={{ color: sysState !== 'idle' ? cfg.color : '#9ca3af' }}>
                {sysState === 'idle' ? 'OFF' : 'ON'}
              </p>
            </div>

            {/* Buzzer */}
            <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold self-start">Buzzer</p>
              <span className="text-3xl transition-all duration-75" style={{
                filter: buzzerOn ? `drop-shadow(0 0 8px ${cfg.color})` : 'none',
                transform: buzzerOn ? 'scale(1.1)' : 'scale(1)',
              }}>
                {buzzerOn ? '🔊' : '🔇'}
              </span>
              <p className="text-[10px] font-bold" style={{ color: buzzerOn ? cfg.color : '#9ca3af' }}>
                {sysState === 'idle' ? 'OFF' : sysState === 'alert' ? 'SLOW BEEP' : 'FAST ALERT'}
              </p>
            </div>

            {/* Waveform */}
            <div className="rounded-xl overflow-hidden border border-gray-800">
              <div className="bg-gray-800 px-2 py-1">
                <p className="text-[9px] text-gray-400">Buzzer Signal</p>
              </div>
              <canvas ref={canvasRef} width={300} height={44}
                className="w-full bg-[#0d1117]" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}