'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Lightbulb, Play, Square } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

type Step = 'idle' | 'check-loop' | 'check-if' | 'led-on' | 'led-off' | 'increment' | 'done';

const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

const REQUIRED_BLOCKS = ['for_loop', 'if_block', 'dw_high', 'end_if', 'end_loop'];

export default function PatternChaserSimulator() {
  const blocks = useAppStore(state => state.blocks);

  const forBlock = blocks.find(b => b.type === 'for_loop');
  const TOTAL = forBlock ? Math.max(1, Math.min(Number(forBlock.values?.times ?? 8), 10)) : 8;

  const missingBlocks = REQUIRED_BLOCKS.filter(
    req => !blocks.find(b => b.type === req)
  );

  const [running, setRunning] = useState(false);
  const [step, setStep] = useState<Step>('idle');
  const [currentI, setCurrentI] = useState(0);
  const [litLeds, setLitLeds] = useState<number[]>([]);
  const [activeI, setActiveI] = useState<number | null>(null);
  const isRunningRef = useRef(false);

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  const runPattern = useCallback(async () => {
    if (running) {
      isRunningRef.current = false;
      setRunning(false);
      setStep('idle');
      setActiveI(null);
      setLitLeds([]);
      return;
    }

    isRunningRef.current = true;
    setRunning(true);
    setLitLeds([]);
    setActiveI(null);

    for (let i = 0; i < TOTAL; i++) {
      if (!isRunningRef.current) break;

      // Check loop condition
      setStep('check-loop');
      setCurrentI(i);
      setActiveI(i);
      await wait(500);
      if (!isRunningRef.current) break;

      // Check IF condition (i % 2 == 0)
      setStep('check-if');
      await wait(500);
      if (!isRunningRef.current) break;

      const condResult = i % 2 === 0;

      if (condResult) {
        setStep('led-on');
        setLitLeds(prev => [...prev, i]);
        await wait(700);
        if (!isRunningRef.current) break;
      } else {
        setStep('led-off');
        await wait(500);
        if (!isRunningRef.current) break;
      }

      // Increment
      setStep('increment');
      await wait(400);
      if (!isRunningRef.current) break;
    }

    if (isRunningRef.current) {
      setStep('done');
      await wait(1200);
    }

    setRunning(false);
    setActiveI(null);
    setStep('idle');
    isRunningRef.current = false;
  }, [TOTAL, running]);

  const STEP_LABEL: Record<Step, string> = {
    idle: 'Press Run to execute the pattern loop',
    'check-loop': `Checking: i (${currentI}) < ${TOTAL} → ${currentI < TOTAL ? 'TRUE — enter loop' : 'FALSE — stop'}`,
    'check-if': `Checking: ${currentI} % 2 == 0 → ${currentI % 2 === 0 ? 'TRUE — LED ON' : 'FALSE — skip'}`,
    'led-on': `i = ${currentI} → condition TRUE → LED ON`,
    'led-off': `i = ${currentI} → condition FALSE → LED stays OFF`,
    increment: `i++ → i is now ${currentI + 1}`,
    done: `Pattern complete — ${litLeds.length} LEDs lit`,
  };

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          ✨ Pattern Chaser — For Loop + IF Condition
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Your for loop runs <span className="font-semibold text-[#2E4862]">{TOTAL} times</span>.
          Each iteration checks <span className="font-semibold text-[#2E4862]">i % 2 == 0</span> —
          even-indexed LEDs light up, odd ones stay off.
        </p>
      </div>

      {/* Validation */}
      {missingBlocks.length > 0 && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
          <p className="text-xs font-semibold text-amber-700 mb-1">Missing blocks:</p>
          <p className="text-xs text-amber-600">{missingBlocks.join(', ')}</p>
        </div>
      )}

      {/* LED board */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
          LED Board
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          {Array.from({ length: TOTAL }, (_, i) => {
            const isActive = activeI === i && running;
            const isLit = litLeds.includes(i);
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-11 h-11 rounded-full border-4 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: isActive
                      ? 'rgba(251,191,36,1)'
                      : isLit
                      ? 'rgba(251,191,36,0.45)'
                      : '#e5e7eb',
                    borderColor: isActive
                      ? 'rgba(252,211,77,1)'
                      : isLit
                      ? 'rgba(252,211,77,0.6)'
                      : '#d1d5db',
                    boxShadow: isActive ? '0 0 20px rgba(251,191,36,0.75)' : 'none',
                    transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  }}
                >
                  <Lightbulb
                    size={18}
                    style={{
                      color: isActive ? '#92400e' : isLit ? '#d97706' : '#9ca3af',
                      opacity: isActive ? 1 : isLit ? 0.65 : 0.35,
                    }}
                    fill="currentColor"
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-mono">i={i}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Flow steps + counter */}
      <div className="grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Execution Steps
          </p>
          <div className="flex flex-col gap-1.5">
            {(['check-loop', 'check-if', 'led-on', 'increment'] as Step[]).map(s => (
              <div
                key={s}
                className={`px-3 py-2 rounded-lg text-[10px] font-semibold border-2 transition-all duration-200 ${
                  step === s && running
                    ? 'bg-[#2E4862] text-white border-[#2E4862]'
                    : 'bg-gray-50 text-gray-400 border-gray-100'
                }`}
              >
                {s === 'check-loop' ? 'i < N ?' : s === 'check-if' ? 'i % 2 == 0 ?' : s === 'led-on' ? 'LED ON' : 'i++'}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Counter i
          </p>
          <p className="text-4xl font-bold font-mono text-[#2E4862]">{currentI}</p>
          <p className="text-[10px] text-gray-400 mt-1">of {TOTAL} iterations</p>
          <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-[#2E4862] rounded-full transition-all duration-300"
              style={{ width: `${(currentI / TOTAL) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-2">
            {litLeds.length} LED{litLeds.length !== 1 ? 's' : ''} lit so far
          </p>
        </div>

      </div>

      {/* Status */}
      <div className={`rounded-xl border px-4 py-3 text-xs font-medium leading-relaxed transition-all duration-300 ${
        step === 'done'
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
          : step === 'idle'
          ? 'bg-gray-50 border-gray-200 text-gray-500'
          : step === 'led-off'
          ? 'bg-gray-50 border-gray-200 text-gray-600'
          : 'bg-[#2E4862]/5 border-[#2E4862]/20 text-[#2E4862]'
      }`}>
        ▶ {STEP_LABEL[step]}
      </div>

      {/* Run button */}
      <button
        type="button"
        onClick={runPattern}
        className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors text-white ${
          running ? 'bg-red-500 hover:bg-red-600' : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
        }`}
      >
        {running
          ? <><Square size={13} fill="currentColor" /> Stop</>
          : <><Play size={13} fill="currentColor" /> Run Pattern Loop</>
        }
      </button>

    </div>
  );
}