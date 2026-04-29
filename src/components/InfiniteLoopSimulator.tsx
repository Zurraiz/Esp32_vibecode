'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, Repeat, AlertTriangle } from 'lucide-react';

type BlockAction = 'Turn ON' | 'Turn OFF' | 'Delay (1s)' | 'Empty';

const BLOCK_OPTIONS: BlockAction[] = ['Turn ON', 'Turn OFF', 'Delay (1s)', 'Empty'];

const BLOCK_STYLE: Record<BlockAction, string> = {
  'Turn ON': 'bg-amber-400 text-white border-amber-300',
  'Turn OFF': 'bg-gray-400 text-white border-gray-300',
  'Delay (1s)': 'bg-blue-400 text-white border-blue-300',
  'Empty': 'bg-gray-100 text-gray-400 border-gray-200',
};

export default function InfiniteLoopSimulator() {
  const [slots, setSlots] = useState<BlockAction[]>([
    'Turn ON', 'Delay (1s)', 'Turn OFF', 'Delay (1s)',
  ]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [ledOn, setLedOn] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [cycleCount, setCycleCount] = useState<number>(0);
  const isRunningRef = useRef(false);

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  const handleSlotChange = (index: number, value: BlockAction) => {
    const newSlots = [...slots];
    newSlots[index] = value;
    setSlots(newSlots);
  };

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const toggleLoop = async () => {
    if (isRunning) {
      setIsRunning(false);
      isRunningRef.current = false;
      setActiveSlot(null);
      return;
    }

    setIsRunning(true);
    isRunningRef.current = true;
    setCycleCount(0);
    setLedOn(false);

    let currentSlot = 0;
    let currentCycles = 0;
    const READ_SPEED = 300;

    while (isRunningRef.current) {
      setActiveSlot(currentSlot);
      const action = slots[currentSlot];

      if (action === 'Turn ON') {
        setLedOn(true);
        await sleep(READ_SPEED);
      } else if (action === 'Turn OFF') {
        setLedOn(false);
        await sleep(READ_SPEED);
      } else if (action === 'Delay (1s)') {
        await sleep(1000);
      } else {
        // Empty slots execute instantly — no delay at all
        await sleep(0);
      }

      if (!isRunningRef.current) break;

      currentSlot++;
      if (currentSlot >= slots.length) {
        currentSlot = 0;
        currentCycles++;
        setCycleCount(currentCycles);
        setActiveSlot(-1);
        await sleep(150);
      }
    }
  };

  const hasMissingDelay =
    slots.includes('Turn ON') &&
    slots.includes('Turn OFF') &&
    slots.filter((s) => s === 'Delay (1s)').length < 1;

  const hasNoOffState =
    !slots.includes('Turn OFF') && slots.includes('Turn ON');

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1 flex items-center gap-2">
          <Repeat size={15} className="text-[#2E4862]" />
          void loop() — Build Your Own Sequence
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Each coloured block below is a slot in your program.
          <span className="font-semibold text-[#2E4862]"> Click any slot
          to open a dropdown</span> and change what that instruction does.
          Build your sequence, then press <span className="font-semibold
          text-[#2E4862]">Run Loop</span> to see your program execute.
        </p>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-semibold text-gray-400 uppercase
            tracking-wider">Try:</span>
          <span className="text-[10px] bg-amber-100 text-amber-700 border
            border-amber-200 rounded-md px-2 py-1 font-medium">
            Swap ON ↔ OFF
          </span>
          <span className="text-[10px] bg-red-50 text-red-600 border
            border-red-200 rounded-md px-2 py-1 font-medium">
            Remove a Delay
          </span>
          <span className="text-[10px] bg-gray-100 text-gray-600 border
            border-gray-200 rounded-md px-2 py-1 font-medium">
            Set a slot to Empty
          </span>
        </div>
      </div>

      {/* Loop builder + LED side by side */}
      <div className="flex gap-4">

        {/* Left: slot builder */}
        <div className="flex-1 rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Instructions
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-center">
              <span className="text-[10px] text-gray-400 block uppercase tracking-wider">
                Cycles
              </span>
              <span className="text-base font-bold font-mono text-[#2E4862]">
                {cycleCount}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 relative pl-5">
            {/* Execution wire */}
            <div className="absolute left-2 top-3 bottom-3 w-0.5 bg-gray-200 rounded-full" />

            {/* Loop return indicator */}
            <div className={`absolute -left-3 top-3 bottom-3 w-5 border-l-2 border-t-2
              border-b-2 rounded-l-lg transition-colors duration-200 ${
              activeSlot === -1
                ? 'border-emerald-400'
                : 'border-gray-200'
            }`} />

            {slots.map((block, index) => {
              const isActive = activeSlot === index;
              return (
                <div key={index} className="flex items-center gap-3 relative">
                  {/* Playhead dot */}
                  <div className="absolute -left-[17px] w-3 h-3 bg-white
                    flex items-center justify-center">
                    {isActive ? (
                      <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                    )}
                  </div>

                  {/* Slot */}
                  <div className={`flex-1 rounded-xl border-2 px-3 py-2.5
                    transition-all duration-150 ${
                    isActive
                      ? 'border-emerald-400 shadow-md scale-[1.02]'
                      : 'border-transparent'
                  } ${BLOCK_STYLE[block]}`}>
                    <select
                      value={block}
                      onChange={(e) =>
                        handleSlotChange(index, e.target.value as BlockAction)
                      }
                      disabled={isRunning}
                      className="bg-transparent text-xs font-semibold w-full
                        appearance-none focus:outline-none cursor-pointer
                        disabled:cursor-not-allowed"
                    >
                      {BLOCK_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}
                          className="bg-white text-gray-700">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Run button */}
          <button
            type="button"
            onClick={toggleLoop}
            className={`mt-5 w-full py-2.5 rounded-lg text-sm font-semibold
              flex items-center justify-center gap-2 transition-colors text-white ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
            }`}
          >
            {isRunning ? (
              <><Square size={14} fill="currentColor" /> Stop</>
            ) : (
              <><Play size={14} fill="currentColor" /> Run Loop</>
            )}
          </button>
        </div>

        {/* Right: LED + status */}
        <div className="w-48 flex flex-col gap-3">
          <div className="flex-1 rounded-xl bg-gray-50 border border-gray-200
            flex flex-col items-center justify-center gap-3 p-4">
            <p className="text-[10px] font-semibold text-gray-400 uppercase
              tracking-widest self-start">
              LED Output
            </p>
            <div className={`w-16 h-16 rounded-full border-4 transition-all
              duration-150 flex items-center justify-center ${
              ledOn
                ? 'bg-amber-400 border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.7)]'
                : 'bg-gray-200 border-gray-300'
            }`} />
            <span className={`text-xs font-bold ${
              ledOn ? 'text-amber-500' : 'text-gray-400'
            }`}>
              {ledOn ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Current action */}
          {isRunning && activeSlot !== null && activeSlot >= 0 && (
            <div className="rounded-xl bg-white border border-gray-200 p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                Executing
              </p>
              <p className="text-xs font-bold text-[#2E4862]">
                Slot {activeSlot + 1}: {slots[activeSlot]}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Diagnostic hints */}
      {hasMissingDelay && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3
          flex gap-3 items-start">
          <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-800">
              Missing delay — LED may appear always ON
            </p>
            <p className="text-xs text-amber-700 mt-0.5 leading-relaxed">
              Without a delay between ON and OFF, the ESP32 switches so fast
              your eyes only see the final state. Add a Delay slot between them.
            </p>
          </div>
        </div>
      )}

      {hasNoOffState && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3
          flex gap-3 items-start">
          <AlertTriangle size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-800">
              No OFF instruction
            </p>
            <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
              Your loop only turns the LED ON — it never turns it OFF.
              The LED will stay ON regardless of how many cycles run.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
