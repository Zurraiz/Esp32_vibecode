'use client';

import React, { useEffect, useRef, useState } from 'react';

type Pattern = 'continuous' | 'slow' | 'fast' | 'sos';

const PATTERNS: Record<Pattern, { label: string; desc: string; on: number; off: number; color: string }> = {
  continuous: { label: 'Continuous Tone',  desc: 'Steady alarm signal',        on: 9999, off: 0,   color: '#ef4444' },
  slow:       { label: 'Slow Pulses',      desc: 'Warning — approaching',      on: 600,  off: 600, color: '#f59e0b' },
  fast:       { label: 'Fast Beeps',       desc: 'Urgent alert',               on: 150,  off: 150, color: '#3b82f6' },
  sos:        { label: 'SOS Pattern',      desc: 'Emergency signal',           on: 100,  off: 300, color: '#ef4444' },
};

const WAVE_SIZE = 80;

export default function BuzzerExplorer() {
  const [pattern, setPattern] = useState<Pattern>('slow');
  const [freq, setFreq] = useState(1000);
  const [buzzerOn, setBuzzerOn] = useState(false);
  const [wave, setWave] = useState<number[]>(Array(WAVE_SIZE).fill(0));
  const [running, setRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isRunningRef = useRef(false);
  const buzzerRef = useRef(false);
  const patternRef = useRef(pattern);
  patternRef.current = pattern;

  // Draw waveform on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Grid line
    ctx.strokeStyle = 'rgba(148,163,184,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H / 2);
    ctx.lineTo(W, H / 2);
    ctx.stroke();

    if (wave.every(v => v === 0)) return;

    const p = PATTERNS[pattern];
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    const step = W / WAVE_SIZE;
    wave.forEach((v, i) => {
      const x = i * step;
      const y = v ? 8 : H - 8;
      if (i === 0) ctx.moveTo(x, y);
      else {
        // Vertical edge for square wave
        if (wave[i] !== wave[i - 1]) ctx.lineTo(x, y);
        ctx.lineTo(x + step, y);
      }
    });
    ctx.stroke();
  }, [wave, pattern]);

  // Update wave from buzzer state
  useEffect(() => {
    const interval = setInterval(() => {
      if (!running) return;
      setWave(prev => [...prev.slice(1), buzzerRef.current ? 1 : 0]);
    }, 50);
    return () => clearInterval(interval);
  }, [running]);

  const handleRun = () => {
    if (running) {
      isRunningRef.current = false;
      setRunning(false);
      setBuzzerOn(false);
      buzzerRef.current = false;
      setWave(Array(WAVE_SIZE).fill(0));
      return;
    }
    isRunningRef.current = true;
    setRunning(true);

    const tick = () => {
      if (!isRunningRef.current) return;
      const p = PATTERNS[patternRef.current];
      buzzerRef.current = true;
      setBuzzerOn(true);
      setTimeout(() => {
        if (!isRunningRef.current) return;
        buzzerRef.current = false;
        setBuzzerOn(false);
        setTimeout(() => {
          if (!isRunningRef.current) return;
          tick();
        }, Math.min(p.off, 9999));
      }, p.on);
    };
    tick();
  };

  const p = PATTERNS[pattern];

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔊 Buzzer Explorer — Sound as Signal
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Select a pattern and press Run. Watch how ON/OFF timing shapes
          the waveform — and how that waveform creates different sounds.
        </p>
      </div>

      {/* Pattern selector */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">Choose a Buzzer Pattern</p>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(PATTERNS) as Pattern[]).map(k => (
            <button
              key={k}
              type="button"
              onClick={() => setPattern(k)}
              className={`px-3 py-2.5 rounded-xl border-2 text-left transition-all ${
                pattern === k
                  ? 'bg-[#2E4862] text-white border-[#2E4862]'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#2E4862]/40'
              }`}
            >
              <p className="text-xs font-semibold">{PATTERNS[k].label}</p>
              <p className={`text-[10px] mt-0.5 ${pattern === k ? 'text-white/70' : 'text-gray-400'}`}>
                {PATTERNS[k].desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Frequency slider */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1.5">
          🎵 Frequency: <span className="text-[#2E4862]">{freq} Hz</span>
        </label>
        <input
          type="range" min={200} max={4000} step={100} value={freq}
          onChange={e => setFreq(Number(e.target.value))}
          className="w-full accent-[#2E4862] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>200 Hz — Low</span><span>4000 Hz — High pitch</span>
        </div>
      </div>

      {/* Buzzer state + waveform */}
      <div className="grid grid-cols-3 gap-4">

        {/* Buzzer visual */}
        <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex flex-col items-center gap-3">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider self-start">Speaker</p>
          <div
            className="text-5xl transition-all duration-75"
            style={{
              filter: buzzerOn
                ? `drop-shadow(0 0 12px ${p.color})`
                : 'none',
              transform: buzzerOn ? 'scale(1.15)' : 'scale(1)',
            }}
          >
            {buzzerOn ? '🔊' : '🔇'}
          </div>
          <div
            className="text-xs font-bold px-3 py-1 rounded-full border-2 transition-all"
            style={{
              color: buzzerOn ? p.color : '#9ca3af',
              borderColor: buzzerOn ? p.color : '#e5e7eb',
              backgroundColor: buzzerOn ? `${p.color}15` : 'transparent',
            }}
          >
            {buzzerOn ? 'ON' : 'OFF'}
          </div>
          <p className="text-[10px] text-gray-400 text-center">{p.label}</p>
        </div>

        {/* Waveform — spans 2 cols */}
        <div className="col-span-2 rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Signal Waveform</p>
            <div className="flex gap-3 text-[10px] text-gray-400">
              <span>ON = <span className="font-bold" style={{ color: p.color }}>HIGH</span></span>
              <span>OFF = LOW</span>
            </div>
          </div>
          <canvas
            ref={canvasRef}
            width={500}
            height={60}
            className="w-full bg-[#0d1117] rounded-lg"
          />
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
              <span className="text-gray-400">ON duration: </span>
              <span className="font-mono font-bold text-[#2E4862]">
                {p.on >= 9999 ? '∞' : `${p.on} ms`}
              </span>
            </div>
            <div className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
              <span className="text-gray-400">OFF duration: </span>
              <span className="font-mono font-bold text-[#2E4862]">{p.off} ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Run button */}
      <button
        type="button"
        onClick={handleRun}
        className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 text-white transition-colors ${
          running ? 'bg-red-500 hover:bg-red-600' : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
        }`}
      >
        {running ? '⏹ Stop' : '▶ Run Pattern'}
      </button>

    </div>
  );
}