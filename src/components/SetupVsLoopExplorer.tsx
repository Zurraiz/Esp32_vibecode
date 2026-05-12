'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, Lock, Repeat } from 'lucide-react';

const DISCOVERY_QUESTIONS = [
  'Notice anything different about the two sides?',
  'The left side stopped. Why might that be useful?',
  'Can you predict which of your blocks belong on each side?',
];

export default function SetupVsLoopExplorer() {
  const [isRunning, setIsRunning] = useState(false);
  const [setupDone, setSetupDone] = useState(false);
  const [setupActive, setSetupActive] = useState(false);
  const [loopIndex, setLoopIndex] = useState<number | null>(null);
  const [ledOn, setLedOn] = useState(false);
  const [loopCycles, setLoopCycles] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const isRunningRef = useRef(false);
  const cyclesRef = useRef(0);

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const handleRun = async () => {
    if (isRunning) {
      isRunningRef.current = false;
      setIsRunning(false);
      setSetupDone(false);
      setSetupActive(false);
      setLoopIndex(null);
      setLedOn(false);
      setLoopCycles(0);
      setQuestionIndex(-1);
      cyclesRef.current = 0;
      return;
    }

    setIsRunning(true);
    isRunningRef.current = true;
    setSetupDone(false);
    setLoopCycles(0);
    setQuestionIndex(-1);
    cyclesRef.current = 0;

    // Setup phase — runs once
    setSetupActive(true);
    await sleep(1200);
    if (!isRunningRef.current) return;
    setSetupActive(false);
    setSetupDone(true);

    // First discovery question after setup
    await sleep(800);
    if (!isRunningRef.current) return;
    setQuestionIndex(0);

    // Loop phase — runs forever
    const loopBlocks = ['on', 'wait', 'off', 'wait'];
    while (isRunningRef.current) {
      for (let i = 0; i < loopBlocks.length; i++) {
        if (!isRunningRef.current) break;
        setLoopIndex(i);
        if (loopBlocks[i] === 'on') {
          setLedOn(true);
          await sleep(350);
        } else if (loopBlocks[i] === 'off') {
          setLedOn(false);
          await sleep(350);
        } else {
          await sleep(900);
        }
      }
      if (!isRunningRef.current) break;

      cyclesRef.current += 1;
      setLoopCycles(cyclesRef.current);
      setLoopIndex(-1);
      await sleep(150);

      // Reveal questions progressively
      if (cyclesRef.current === 1) setQuestionIndex(1);
      if (cyclesRef.current === 3) setQuestionIndex(2);
    }
  };

  const loopBlockLabels = [
    { label: 'Turn ON LED', color: 'bg-amber-400 text-white' },
    { label: 'Wait 1s', color: 'bg-blue-400 text-white' },
    { label: 'Turn OFF LED', color: 'bg-gray-400 text-white' },
    { label: 'Wait 1s', color: 'bg-blue-400 text-white' },
  ];

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔍 Setup vs Loop — Spot the Difference
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Press <span className="font-semibold text-[#2E4862]">Run</span> and
          watch both sides carefully. One side will stop. The other will keep going.
          Try to figure out why before reading ahead.
        </p>
      </div>

      {/* Two panels */}
      <div className="grid grid-cols-2 gap-4">

        {/* Left: Setup */}
        <div className={`rounded-xl border-2 p-4 transition-all duration-500 ${
          setupActive
            ? 'border-amber-400 bg-amber-50'
            : setupDone
            ? 'border-gray-200 bg-gray-50 opacity-70'
            : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-bold text-[#2E4862] font-mono">
                void setup()
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Runs at startup
              </p>
            </div>
            {setupDone && (
              <div className="flex items-center gap-1 bg-gray-100 border border-gray-200
                rounded-full px-2 py-0.5">
                <Lock size={10} className="text-gray-400" />
                <span className="text-[10px] text-gray-400 font-medium">Done</span>
              </div>
            )}
            {setupActive && (
              <div className="flex items-center gap-1 bg-amber-100 border
                border-amber-200 rounded-full px-2 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400
                  animate-pulse inline-block" />
                <span className="text-[10px] text-amber-700 font-medium">
                  Running
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className={`rounded-lg px-3 py-2.5 border-2 text-xs font-semibold
              transition-all duration-200 flex items-center gap-2 ${
              setupActive
                ? 'bg-orange-500 text-white border-amber-400 scale-[1.02] shadow-sm'
                : setupDone
                ? 'bg-gray-100 text-gray-400 border-gray-200'
                : 'bg-orange-500 text-white border-transparent'
            }`}>
              <span>📌</span>
              <span>Set Pin Mode: OUTPUT</span>
            </div>
          </div>

          {setupDone && (
            <p className="text-[10px] text-gray-400 mt-3 italic text-center">
              ✓ Executed once — never runs again
            </p>
          )}

          <div className="mt-3 bg-gray-50 border border-gray-100 rounded-lg
            px-3 py-2 flex justify-between items-center">
            <span className="text-[10px] text-gray-400 font-medium">
              Times executed
            </span>
            <span className="text-sm font-bold font-mono text-[#2E4862]">
              {setupDone ? 1 : 0}
            </span>
          </div>
        </div>

        {/* Right: Loop */}
        <div className={`rounded-xl border-2 p-4 transition-all duration-500 ${
          loopIndex !== null && loopIndex >= 0
            ? 'border-emerald-400 bg-emerald-50'
            : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-bold text-[#2E4862] font-mono">
                void loop()
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Repeats forever
              </p>
            </div>
            {isRunning && setupDone && (
              <div className="flex items-center gap-1 bg-emerald-100 border
                border-emerald-200 rounded-full px-2 py-0.5">
                <Repeat size={10} className="text-emerald-600" />
                <span className="text-[10px] text-emerald-700 font-medium">
                  Looping
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5 relative pl-4">
            <div className="absolute left-1.5 top-2 bottom-2 w-0.5
              bg-gray-200 rounded-full" />
            {loopBlockLabels.map((block, i) => {
              const isActive = loopIndex === i;
              return (
                <div key={i} className="relative flex items-center gap-2">
                  <div className="absolute -left-[11px] w-2.5 h-2.5 bg-white
                    flex items-center justify-center">
                    {isActive
                      ? <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                      : <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                    }
                  </div>
                  <div className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold
                    border-2 transition-all duration-150 ${
                    isActive
                      ? `${block.color} border-emerald-400 scale-[1.02] shadow-sm`
                      : `${block.color} border-transparent opacity-70`
                  }`}>
                    {block.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 bg-gray-50 border border-gray-100 rounded-lg
            px-3 py-2 flex justify-between items-center">
            <span className="text-[10px] text-gray-400 font-medium">
              Cycles completed
            </span>
            <span className="text-sm font-bold font-mono text-[#2E4862]">
              {loopCycles}
            </span>
          </div>
        </div>

      </div>

      {/* LED output */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm
        flex items-center gap-6">
        <div className={`w-14 h-14 rounded-full border-4 flex-shrink-0
          transition-all duration-150 ${
          ledOn
            ? 'bg-amber-400 border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.7)]'
            : 'bg-gray-200 border-gray-300'
        }`} />
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase
            tracking-wider mb-1">
            LED State
          </p>
          <p className={`text-base font-bold ${
            ledOn ? 'text-amber-500' : 'text-gray-400'
          }`}>
            {ledOn ? 'ON' : 'OFF'}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {isRunning && setupDone
              ? 'Controlled by void loop()'
              : isRunning
              ? 'Waiting for setup to finish...'
              : 'Press Run to start'}
          </p>
        </div>
      </div>

      {/* Discovery questions — appear progressively */}
      {questionIndex >= 0 && (
        <div className="flex flex-col gap-2">
          {DISCOVERY_QUESTIONS.slice(0, questionIndex + 1).map((q, i) => (
            <div key={i} className={`rounded-lg px-4 py-3 border text-xs
              leading-relaxed transition-all duration-300 ${
              i === questionIndex
                ? 'bg-[#2E4862]/5 border-[#2E4862]/20 text-[#2E4862] font-medium'
                : 'bg-gray-50 border-gray-100 text-gray-500'
            }`}>
              💭 {q}
            </div>
          ))}
        </div>
      )}

      {/* Run button */}
      <button
        type="button"
        onClick={handleRun}
        className={`w-full py-2.5 rounded-lg text-sm font-semibold flex
          items-center justify-center gap-2 transition-colors text-white ${
          isRunning
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
        }`}
      >
        {isRunning
          ? <><Square size={14} fill="currentColor" /> Stop</>
          : <><Play size={14} fill="currentColor" /> Run</>
        }
      </button>

    </div>
  );
}
