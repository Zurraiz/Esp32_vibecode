'use client';

import React, { useEffect, useState } from 'react';

type CycleStep = { label: string; color: string; description: string };

const CYCLE: CycleStep[] = [
  {
    label: 'HIGH',
    color: 'bg-amber-400 border-amber-300',
    description: 'The ESP32 executes the HIGH instruction. The LED turns ON immediately.',
  },
  {
    label: 'WAIT',
    color: 'bg-blue-400 border-blue-300',
    description: 'The delay() instruction pauses execution. The LED stays ON while the MCU waits.',
  },
  {
    label: 'LOW',
    color: 'bg-gray-400 border-gray-300',
    description: 'The ESP32 executes the LOW instruction. The LED turns OFF immediately.',
  },
  {
    label: 'WAIT',
    color: 'bg-blue-400 border-blue-300',
    description: 'Another delay() pauses execution. The LED stays OFF. Then the cycle repeats.',
  },
];

const INSIGHTS = [
  'Each block is one instruction — the ESP32 completes it fully before moving on.',
  'Order is everything. Swap HIGH and LOW and the behavior changes entirely.',
  'Delay does not change what the LED does — it controls how long a state lasts.',
  'The program never stops. After the last instruction, it returns to the first.',
];

export default function CycleTimelineSimulator() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % CYCLE.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const current = CYCLE[step];
  const isOn = current.label === 'HIGH' || (current.label === 'WAIT' && step === 1);

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Section header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔁 How the ESP32 executes your program
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Watch the execution pointer move through each instruction one by one.
          The ESP32 never skips, never reorders, and never stops — it loops forever.
        </p>
      </div>

      {/* Timeline */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Execution Timeline
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {CYCLE.map((c, i) => (
            <React.Fragment key={i}>
              <div className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
                i === step ? 'scale-110' : 'opacity-50 scale-100'
              }`}>
                <div className={`px-4 py-2 rounded-lg border-2 text-xs font-bold text-white
                  transition-all duration-300 ${c.color} ${
                  i === step ? 'shadow-lg' : ''
                }`}>
                  {c.label}
                </div>
                {i === step && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2E4862] animate-bounce" />
                )}
              </div>
              {i < CYCLE.length - 1 && (
                <div className="text-gray-300 text-xs font-mono">→</div>
              )}
            </React.Fragment>
          ))}
          {/* Loop arrow */}
          <div className="text-gray-400 text-xs font-medium ml-1">↩ repeats</div>
        </div>

        {/* Current step description */}
        <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 px-4 py-3">
          <p className="text-xs text-blue-700 leading-relaxed font-medium">
            ▶ {current.description}
          </p>
        </div>
      </div>

      {/* LED + state */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm flex items-center gap-6">
        <div className={`w-16 h-16 rounded-full border-4 flex-shrink-0 transition-all duration-300 ${
          isOn
            ? 'bg-amber-400 border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.6)]'
            : 'bg-gray-200 border-gray-300'
        }`} />
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            Current LED State
          </p>
          <p className={`text-lg font-bold ${isOn ? 'text-amber-500' : 'text-gray-400'}`}>
            {isOn ? 'ON' : 'OFF'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Step {step + 1} of {CYCLE.length} — {current.label}
          </p>
        </div>
      </div>

      {/* Key insights */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Key Insights
        </p>
        <div className="flex flex-col gap-2">
          {INSIGHTS.map((insight, i) => (
            <div key={i} className={`flex gap-3 items-start rounded-lg px-3 py-2.5
              transition-all duration-300 ${i === step
                ? 'bg-[#2E4862]/5 border border-[#2E4862]/20'
                : 'bg-gray-50 border border-transparent'
              }`}>
              <span className={`text-xs font-bold w-4 h-4 rounded-full flex items-center
                justify-center flex-shrink-0 mt-0.5 transition-colors duration-300 ${
                i === step
                  ? 'bg-[#2E4862] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
