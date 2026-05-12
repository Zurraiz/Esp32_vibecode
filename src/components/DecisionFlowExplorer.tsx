'use client';

import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';

type Scenario = { label: string; condition: boolean; ifResult: string; elseResult: string };

const SCENARIOS: Scenario[] = [
  { label: 'Button Pressed', condition: true, ifResult: 'LED turns ON', elseResult: 'LED stays OFF' },
  { label: 'Button Released', condition: false, ifResult: 'LED turns ON', elseResult: 'LED stays OFF' },
  { label: 'Temp > 30°C', condition: true, ifResult: 'Fan turns ON', elseResult: 'Fan stays OFF' },
  { label: 'Temp ≤ 30°C', condition: false, ifResult: 'Fan turns ON', elseResult: 'Fan stays OFF' },
];

const INSIGHTS = [
  'An IF condition checks whether something is TRUE or FALSE.',
  'Only one branch executes — either IF or ELSE, never both.',
  'The program moves forward immediately after the chosen branch.',
  'This lets the ESP32 respond differently to different situations.',
];

export default function DecisionFlowExplorer() {
  const [selected, setSelected] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);

  const scenario = SCENARIOS[selected];

  const handleSelect = (i: number) => {
    setSelected(i);
    setInsightIndex((prev) => Math.min(prev + 1, INSIGHTS.length - 1));
  };

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔀 Decision Flow Explorer
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Select a scenario below. See how the ESP32 evaluates
          the condition and chooses which path to follow.
          Only one path executes — never both.
        </p>
      </div>

      {/* Scenario selector */}
      <div className="grid grid-cols-2 gap-3">
        {SCENARIOS.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSelect(i)}
            className={`rounded-xl border-2 px-4 py-3 text-left
              transition-all duration-150 ${
              selected === i
                ? 'border-[#2E4862] bg-[#2E4862]/5'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <p className={`text-xs font-bold ${
              selected === i ? 'text-[#2E4862]' : 'text-gray-600'
            }`}>
              {s.label}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Condition: {s.condition ? 'TRUE' : 'FALSE'}
            </p>
          </button>
        ))}
      </div>

      {/* Flow diagram */}
      <div className="rounded-xl bg-white border border-gray-200 p-5
        shadow-sm flex flex-col items-center gap-3">

        {/* Input */}
        <div className="rounded-lg bg-blue-50 border border-blue-200
          px-6 py-3 text-xs font-semibold text-blue-700 text-center">
          Input: {scenario.label}
        </div>

        <ArrowDown size={16} className="text-gray-400" />

        {/* Condition */}
        <div className={`rounded-lg border-2 px-6 py-3 text-xs font-bold
          text-center transition-all duration-200 ${
          scenario.condition
            ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
            : 'bg-amber-50 border-amber-400 text-amber-700'
        }`}>
          Condition: {scenario.condition ? '✅ TRUE' : '❌ FALSE'}
        </div>

        <ArrowDown size={16} className="text-gray-400" />

        {/* Two branches */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className={`rounded-xl border-2 p-4 text-center
            transition-all duration-200 ${
            scenario.condition
              ? 'border-emerald-400 bg-emerald-50'
              : 'border-gray-200 bg-gray-50 opacity-40'
          }`}>
            <p className="text-[10px] font-bold text-gray-500 uppercase
              tracking-wider mb-1">IF branch</p>
            <p className={`text-xs font-semibold ${
              scenario.condition ? 'text-emerald-700' : 'text-gray-400'
            }`}>
              {scenario.ifResult}
            </p>
            {scenario.condition && (
              <p className="text-[10px] text-emerald-600 mt-1 font-medium">
                ← Executes
              </p>
            )}
          </div>

          <div className={`rounded-xl border-2 p-4 text-center
            transition-all duration-200 ${
            !scenario.condition
              ? 'border-red-400 bg-red-50'
              : 'border-gray-200 bg-gray-50 opacity-40'
          }`}>
            <p className="text-[10px] font-bold text-gray-500 uppercase
              tracking-wider mb-1">ELSE branch</p>
            <p className={`text-xs font-semibold ${
              !scenario.condition ? 'text-red-700' : 'text-gray-400'
            }`}>
              {scenario.elseResult}
            </p>
            {!scenario.condition && (
              <p className="text-[10px] text-red-600 mt-1 font-medium">
                ← Executes
              </p>
            )}
          </div>
        </div>

        {/* Result */}
        <div className={`w-full rounded-lg px-4 py-3 text-xs font-medium
          text-center border transition-all duration-200 ${
          scenario.condition
            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
            : 'bg-red-50 border-red-200 text-red-700'
        }`}>
          Result: {scenario.condition ? scenario.ifResult : scenario.elseResult}
        </div>

      </div>

      {/* Progressive insights */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase
          tracking-widest mb-3">Key Concepts</p>
        <div className="flex flex-col gap-2">
          {INSIGHTS.map((insight, i) => (
            <div key={i} className={`flex gap-3 items-start rounded-lg
              px-3 py-2.5 transition-all duration-300 ${
              i <= insightIndex
                ? 'bg-[#2E4862]/5 border border-[#2E4862]/20'
                : 'bg-gray-50 border border-transparent opacity-40'
            }`}>
              <span className={`text-xs font-bold w-4 h-4 rounded-full
                flex items-center justify-center flex-shrink-0 mt-0.5 ${
                i <= insightIndex
                  ? 'bg-[#2E4862] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
