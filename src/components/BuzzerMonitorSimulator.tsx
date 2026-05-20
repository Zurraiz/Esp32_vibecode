'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Square } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

const WAVE_SIZE = 80;
const REQUIRED = ['pir_read', 'if_block', 'tone_on', 'tone_off', 'end_if'];

export default function BuzzerMonitorSimulator() {
  const blocks = useAppStore(state => state.blocks);

  const toneBlock = blocks.find(b => b.type === 'tone_on');
  const pirBlock  = blocks.find(b => b.type === 'pir_read');
  const pin  = toneBlock ? Number(toneBlock.values?.pin  ?? 13)   : 13;
  const freq = toneBlock ? Number(toneBlock.values?.freq ?? 1000) : 1000;
  const motionVar = pirBlock ? String(pirBlock.values?.var ?? 'motion') : 'motion';

  const missing = REQUIRED.filter(r => !blocks.find(b => b.type === r));

  const [running, setRunning]   = useState(false);
  const [motion,  setMotion]    = useState(false);
  const [buzzerOn, setBuzzerOn] = useState(false);
  const [wave, setWave]         = useState<number[]>(Array(WAVE_SIZE).fill(0));
  const [logs, setLogs]         = useState<string[]>([]);
  const isRunningRef = useRef(false);
  const motionRef    = useRef(false);
  const buzzerRef    = useRef(false);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const logEndRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => { return () => { isRunningRef.current = false; }; }, []);

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
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const step = W / WAVE_SIZE;
    wave.forEach((v, i) => {
      const x = i * step;
      const y = v ? 6 : H - 6;
      if (i === 0) { ctx.moveTo(x, y); return; }
      if (wave[i] !== wave[i - 1]) ctx.lineTo(x, y);
      ctx.lineTo(x + step, y);
    });
    ctx.stroke();
  }, [wave]);

  // Wave ticker
  useEffect(() => {
    const interval = setInterval(() => {
      if (!running) return;
      setWave(prev => [...prev.slice(1), buzzerRef.current ? 1 : 0]);
    }, 50);
    return () => clearInterval(interval);
  }, [running]);

  const handleMotion = (state: boolean) => {
    if (!running) return;
    setMotion(state);
    motionRef.current = state;
  };

  const handleRun = useCallback(() => {
    if (running) {
      isRunningRef.current = false;
      setRunning(false);
      setBuzzerOn(false);
      buzzerRef.current = false;
      setMotion(false);
      motionRef.current = false;
      setWave(Array(WAVE_SIZE).fill(0));
      setLogs([]);
      return;
    }
    isRunningRef.current = true;
    setRunning(true);
    setLogs([]);

    const tick = () => {
      if (!isRunningRef.current) return;
      const detected = motionRef.current;
      const wasOn = buzzerRef.current;
      buzzerRef.current = detected;
      setBuzzerOn(detected);
      if (detected !== wasOn) {
        setLogs(prev => [
          ...prev.slice(-24),
          detected
            ? `> ${motionVar} = HIGH → tone(${pin}, ${freq})`
            : `> ${motionVar} = LOW → noTone(${pin})`,
          '─────────────',
        ]);
      }
      setTimeout(tick, 100);
    };
    tick();
  }, [running, motionVar, pin, freq]);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔊 Buzzer Monitor — Pin {pin} @ {freq} Hz
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Hold the motion button to trigger the buzzer. Watch the waveform
          and serial log respond to your sensor input.
        </p>
      </div>

      {/* Validation */}
      {missing.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="text-xs font-semibold text-amber-700 mb-1">Missing blocks:</p>
          <p className="text-xs text-amber-600 font-mono">{missing.join(', ')}</p>
        </div>
      )}

      {/* Waveform */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Buzzer Signal — Pin {pin}
        </p>
        <canvas
          ref={canvasRef}
          width={500}
          height={56}
          className="w-full bg-[#0d1117] rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* Left: controls */}
        <div className="flex flex-col gap-3">

          {/* Speaker */}
          <div className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition-all duration-150 ${
            buzzerOn ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-white'
          }`}>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider self-start">
              Buzzer Pin {pin}
            </p>
            <span className="text-4xl transition-all duration-75" style={{
              filter: buzzerOn ? 'drop-shadow(0 0 10px rgba(251,191,36,0.8))' : 'none',
              transform: buzzerOn ? 'scale(1.1)' : 'scale(1)',
            }}>
              {buzzerOn ? '🔊' : '🔇'}
            </span>
            <p className={`text-xs font-bold ${buzzerOn ? 'text-amber-600' : 'text-gray-400'}`}>
              {buzzerOn ? `tone(${pin}, ${freq})` : `noTone(${pin})`}
            </p>
          </div>

          {/* PIR toggle */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
              PIR Input — {motionVar}
            </p>
            <button
              type="button"
              onMouseDown={() => handleMotion(true)}
              onMouseUp={() => handleMotion(false)}
              onMouseLeave={() => handleMotion(false)}
              onTouchStart={() => handleMotion(true)}
              onTouchEnd={() => handleMotion(false)}
              disabled={!running}
              className={`w-full py-3 rounded-lg text-xs font-bold border-2 transition-all select-none ${
                motion && running
                  ? 'bg-red-500 border-red-400 text-white translate-y-0.5 shadow-none'
                  : running
                  ? 'bg-white border-gray-300 text-gray-600 shadow-[0_3px_0_#d1d5db]'
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {motion && running ? '🚨 Motion Detected' : '👋 Hold = Motion'}
            </button>
            <div className={`mt-2 rounded-lg px-3 py-1.5 text-center text-[10px] font-mono font-bold border transition-all ${
              motion && running ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-50 border-gray-100 text-gray-300'
            }`}>
              {motionVar}: {motion && running ? 'HIGH' : 'LOW'}
            </div>
          </div>

          <button
            type="button"
            onClick={handleRun}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 text-white transition-colors ${
              running ? 'bg-red-500 hover:bg-red-600' : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
            }`}
          >
            {running
              ? <><Square size={13} fill="currentColor" /> Stop</>
              : <><Play size={13} fill="currentColor" /> Run Program</>}
          </button>
        </div>

        {/* Right: serial */}
        <div className="rounded-xl overflow-hidden border border-gray-800 flex flex-col">
          <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
            <span className="text-xs font-semibold text-white">Serial Monitor</span>
            {running && (
              <span className="flex items-center gap-1 text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                Live
              </span>
            )}
          </div>
          <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 h-[220px] overflow-y-auto flex flex-col gap-0.5">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic">
                {running ? 'Waiting for motion...' : 'Press Run to start...'}
              </span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={
                  l.startsWith('─') ? 'text-gray-700'
                  : i >= logs.length - 2
                  ? l.includes('HIGH') ? 'text-amber-400' : 'text-green-300'
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