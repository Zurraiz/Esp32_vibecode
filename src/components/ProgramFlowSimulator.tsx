'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Power, RotateCcw, CheckCircle2, Repeat, Lock } from 'lucide-react';

export default function ProgramFlowSimulator() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeZone, setActiveZone] = useState<'setup' | 'loop' | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ledOn, setLedOn] = useState(false);
  const [setupCount, setSetupCount] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const isRunningRef = useRef(false);

  const loopBlocks = [
    { label: 'Turn ON LED', color: 'bg-amber-400 text-white' },
    { label: 'Wait 1s', color: 'bg-blue-400 text-white' },
    { label: 'Turn OFF LED', color: 'bg-gray-400 text-white' },
    { label: 'Wait 1s', color: 'bg-blue-400 text-white' },
  ];

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const togglePower = async () => {
    if (isRunning) {
      isRunningRef.current = false;
      setIsRunning(false);
      setActiveZone(null);
      setActiveIndex(null);
      setLedOn(false);
      setSetupCount(0);
      setLoopCount(0);
      return;
    }

    setIsRunning(true);
    isRunningRef.current = true;
    setSetupCount(0);
    setLoopCount(0);
    setLedOn(false);

    // Setup phase
    setActiveZone('setup');
    setActiveIndex(0);
    await sleep(1000);
    if (!isRunningRef.current) return;
    setSetupCount(1);
    setActiveIndex(null);
    await sleep(300);

    // Loop phase
    let cycles = 0;
    while (isRunningRef.current) {
      setActiveZone('loop');
      const actions = ['on', 'wait', 'off', 'wait'];
      for (let i = 0; i < actions.length; i++) {
        if (!isRunningRef.current) break;
        setActiveIndex(i);
        if (actions[i] === 'on') { setLedOn(true); await sleep(350); }
        else if (actions[i] === 'off') { setLedOn(false); await sleep(350); }
        else { await sleep(900); }
      }
      if (!isRunningRef.current) break;
      cycles++;
      setLoopCount(cycles);
      setActiveIndex(-1);
      await sleep(150);
    }
  };

  const isSetupDone = setupCount > 0;

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1 flex items-center gap-2">
          <Power size={15} className="text-[#2E4862]" />
          Program Flow Simulator
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Press <span className="font-semibold text-[#2E4862]">Power ON</span> to
          start the ESP32. Watch how Setup runs once and gets locked, while Loop
          keeps running forever.
        </p>
      </div>

      <div className="flex gap-4">

        {/* Left: Setup + Loop blocks */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Setup zone */}
          <div className={`rounded-xl border-2 p-4 transition-all duration-500 ${
            activeZone === 'setup'
              ? 'border-amber-400 bg-amber-50'
              : isSetupDone
              ? 'border-gray-200 bg-gray-50 opacity-70'
              : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-[#2E4862] font-mono">
                void setup()
              </p>
              {isSetupDone
                ? <div className="flex items-center gap-1 text-[10px] text-gray-400
                    bg-gray-100 border border-gray-200 rounded-full px-2 py-0.5">
                    <Lock size={9} /> Locked — ran once
                  </div>
                : activeZone === 'setup'
                ? <div className="flex items-center gap-1 text-[10px] text-amber-700
                    bg-amber-100 border border-amber-200 rounded-full px-2 py-0.5">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full
                      animate-pulse inline-block" /> Running
                  </div>
                : null
              }
            </div>
            <div className={`rounded-lg px-3 py-2.5 text-xs font-semibold
              border-2 flex items-center gap-2 transition-all duration-200 ${
              activeZone === 'setup' && activeIndex === 0
                ? 'bg-orange-500 text-white border-amber-400 scale-[1.02] shadow-sm'
                : isSetupDone
                ? 'bg-gray-100 text-gray-400 border-gray-200'
                : 'bg-orange-500 text-white border-transparent'
            }`}>
              <span>📌</span>
              <span>Set Pin Mode: OUTPUT</span>
            </div>
            {isSetupDone && (
              <p className="text-[10px] text-gray-400 italic text-center mt-2">
                ✓ Configured once — will never run again
              </p>
            )}
          </div>

          {/* Loop zone */}
          <div className={`rounded-xl border-2 p-4 transition-all duration-500 ${
            activeZone === 'loop'
              ? 'border-emerald-400 bg-emerald-50'
              : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-[#2E4862] font-mono">
                void loop()
              </p>
              {activeZone === 'loop' && (
                <div className="flex items-center gap-1 text-[10px] text-emerald-700
                  bg-emerald-100 border border-emerald-200 rounded-full px-2 py-0.5">
                  <Repeat size={9} /> Looping
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 relative pl-4">
              <div className="absolute left-1.5 top-2 bottom-2 w-0.5
                bg-gray-200 rounded-full" />
              {loopBlocks.map((block, i) => {
                const isActive = activeZone === 'loop' && activeIndex === i;
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
          </div>

          {/* Power button */}
          <button
            type="button"
            onClick={togglePower}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold flex
              items-center justify-center gap-2 transition-colors text-white ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
            }`}
          >
            {isRunning
              ? <><RotateCcw size={14} /> Reset</>
              : <><Power size={14} /> Power ON ESP32</>
            }
          </button>
        </div>

        {/* Right: counters + LED */}
        <div className="w-44 flex flex-col gap-3">

          {/* Counters */}
          <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400 uppercase
              tracking-wider mb-3">System State</p>
            <div className="flex flex-col gap-2">
              <div className="bg-gray-50 border border-gray-100 rounded-lg
                px-3 py-2 flex justify-between items-center">
                <span className="text-[10px] text-amber-600 font-medium">
                  Setup ran
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold font-mono text-[#2E4862]">
                    {setupCount}x
                  </span>
                  {isSetupDone && (
                    <CheckCircle2 size={12} className="text-amber-500" />
                  )}
                </div>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-lg
                px-3 py-2 flex justify-between items-center">
                <span className="text-[10px] text-emerald-600 font-medium">
                  Loop cycles
                </span>
                <span className="text-sm font-bold font-mono text-[#2E4862]">
                  {loopCount}
                </span>
              </div>
            </div>
          </div>

          {/* LED */}
          <div className="flex-1 rounded-xl bg-gray-50 border border-gray-200
            flex flex-col items-center justify-center gap-3 p-4 min-h-[140px]">
            <p className="text-[10px] font-semibold text-gray-400 uppercase
              tracking-wider self-start">LED</p>
            <div className={`w-14 h-14 rounded-full border-4 transition-all
              duration-150 ${
              ledOn
                ? 'bg-amber-400 border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.7)]'
                : 'bg-gray-200 border-gray-300'
            }`} />
            <span className={`text-xs font-bold ${
              ledOn ? 'text-amber-500' : 'text-gray-400'
            }`}>
              {ledOn ? 'ON' : 'OFF'}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
