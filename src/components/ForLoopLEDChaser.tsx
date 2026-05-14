'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Lightbulb } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

type Step = 'idle' | 'check' | 'turnon' | 'increment' | 'done';

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

export default function ForLoopLEDChaser() {
  const blocks = useAppStore(state => state.blocks);
  const forBlock = blocks.find(b => b.type === 'for_loop');
  const TOTAL = forBlock ? Math.max(1, Math.min(Number(forBlock.values?.times ?? 5), 10)) : 5;

  const [running, setRunning] = useState(false);
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [step, setStep] = useState<Step>('idle');
  const [cycleCount, setCycleCount] = useState(0);

  const runLoop = useCallback(async () => {
    setRunning(true);
    setCurrent(0);
    setCompleted([]);
    setStep('check');
    setCycleCount(0);

    for (let i = 0; i < TOTAL; i++) {
      setCurrent(i);

      setStep('check');
      await wait(600);

      setStep('turnon');
      await wait(900);

      setStep('increment');
      setCycleCount(i + 1);
      await wait(500);

      setCompleted(prev => [...prev, i]);
    }

    setStep('done');
    await wait(1500);
    setRunning(false);
    setStep('idle');
  }, [TOTAL]);

  useEffect(() => {
    return () => { /* cleanup on unmount */ };
  }, []);

  const STEP_LABELS: Record<Step, string> = {
    idle: 'Press Run to start the for loop',
    check: `Checking: i (${cycleCount}) < ${TOTAL} → ${cycleCount < TOTAL ? 'TRUE — continue' : 'FALSE — stop'}`,
    turnon: `Executing: turn ON LED ${current}`,
    increment: `Incrementing: i = ${cycleCount}`,
    done: `Loop complete — all ${TOTAL} LEDs blinked`,
  };

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔁 For Loop — LED Sequence Simulator
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Watch the ESP32 execute your for loop step by step.
          Each LED lights up as the counter increments.
          Loop runs <span className="font-semibold text-[#2E4862]">{TOTAL} times</span> — from your for_loop block.
        </p>
      </div>

      {/* LED board */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 uppercase
          tracking-wider mb-4">LED Board</p>
        <div className="flex justify-center gap-4 flex-wrap">
          {Array.from({ length: TOTAL }, (_, i) => {
            const isActive = running && current === i && step === 'turnon';
            const isDone = completed.includes(i);
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-full border-4 flex items-center
                    justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isActive
                      ? 'rgba(251,191,36,1)'
                      : isDone
                      ? 'rgba(251,191,36,0.4)'
                      : '#e5e7eb',
                    borderColor: isActive
                      ? 'rgba(252,211,77,1)'
                      : isDone
                      ? 'rgba(252,211,77,0.6)'
                      : '#d1d5db',
                    boxShadow: isActive
                      ? '0 0 20px rgba(251,191,36,0.8)'
                      : 'none',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  <Lightbulb
                    size={20}
                    style={{
                      color: isActive ? '#92400e' : isDone ? '#d97706' : '#9ca3af',
                      opacity: isActive ? 1 : isDone ? 0.6 : 0.4,
                    }}
                    fill="currentColor"
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-mono">
                  LED {i}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Loop flow + counter */}
      <div className="grid grid-cols-2 gap-4">

        {/* Flow steps */}
        <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
          <p className="text-[10px] font-semibold text-gray-400 uppercase
            tracking-wider mb-3">For Loop Flow</p>
          <div className="flex items-center justify-between gap-2">
            {(['check', 'turnon', 'increment'] as const).map((s, idx) => (
              <React.Fragment key={s}>
                <div className={`flex-1 py-2.5 rounded-lg text-center text-[10px]
                  font-semibold border-2 transition-all duration-300 ${
                  step === s
                    ? 'bg-[#2E4862] text-white border-[#2E4862] scale-105'
                    : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}>
                  {s === 'check' ? 'Check\ni < N' : s === 'turnon' ? 'Execute\nAction' : 'i + 1'}
                </div>
                {idx < 2 && (
                  <span className="text-gray-300 text-xs">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
          {running && step !== 'done' && (
            <p className="text-[10px] text-emerald-600 text-center mt-2 font-medium">
              ↺ repeats next iteration
            </p>
          )}
        </div>

        {/* Counter */}
        <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
          <p className="text-[10px] font-semibold text-gray-400 uppercase
            tracking-wider mb-3">Counter (i)</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-bold font-mono text-[#2E4862]">
                {cycleCount}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                iterations done
              </p>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${
                cycleCount < TOTAL ? 'text-emerald-600' : 'text-red-500'
              }`}>
                {cycleCount} &lt; {TOTAL}
              </p>
              <p className={`text-[10px] font-semibold mt-0.5 ${
                cycleCount < TOTAL ? 'text-emerald-500' : 'text-red-400'
              }`}>
                {cycleCount < TOTAL ? 'TRUE → continue' : 'FALSE → stop'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Status */}
      <div className={`rounded-xl border px-4 py-3 text-xs font-medium
        leading-relaxed transition-all duration-300 ${
        step === 'done'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
          : step === 'idle'
          ? 'bg-gray-50 border-gray-200 text-gray-500'
          : 'bg-[#2E4862]/5 border-[#2E4862]/20 text-[#2E4862]'
      }`}>
        ▶ {STEP_LABELS[step]}
      </div>

      {/* Run button */}
      <button
        type="button"
        onClick={runLoop}
        disabled={running}
        className="w-full py-2.5 rounded-lg text-sm font-semibold
          text-white transition-colors bg-[#2E4862] hover:bg-[#3a5a7a]
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {running ? `Running loop... (${cycleCount}/${TOTAL})` : 'Run For Loop'}
      </button>

    </div>
  );
}
