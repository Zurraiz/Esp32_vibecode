'use client';

import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';

type Rule = 'every2' | 'every3' | 'first4';

const RULES: { id: Rule; label: string; desc: string; fn: (i: number) => boolean }[] = [
  { id: 'every2', label: 'Every 2nd LED', desc: 'i % 2 == 0', fn: (i) => i % 2 === 0 },
  { id: 'every3', label: 'Every 3rd LED', desc: 'i % 3 == 0', fn: (i) => i % 3 === 0 },
  { id: 'first4', label: 'First 4 only',  desc: 'i < 4',      fn: (i) => i < 4 },
];

const INSIGHTS = [
  'The loop counter i is not just a counter — it is a value your code can use.',
  'An IF condition inside the loop runs once per LED, using the current value of i.',
  'Changing the condition changes which LEDs light up — the loop structure stays the same.',
  'This is how real systems generate patterns: one loop, one rule, many outputs.',
];

const LED_COUNT = 8;

export default function PatternSequenceExplorer() {
  const [rule, setRule] = useState<Rule>('every2');
  const [insightIndex, setInsightIndex] = useState(0);

  const activeRule = RULES.find(r => r.id === rule)!;

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          ✨ Pattern Builder — Loop Counter as Data
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Switch between pattern rules below. Watch how the same for loop produces
          a completely different result just by changing the IF condition inside it.
        </p>
      </div>

      {/* Rule selector */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Choose a pattern rule
        </p>
        <div className="flex gap-2 flex-wrap">
          {RULES.map((r, idx) => (
            <button
              key={r.id}
              type="button"
              onClick={() => {
                setRule(r.id);
                setInsightIndex(prev => Math.max(prev, idx));
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border-2 transition-all ${
                rule === r.id
                  ? 'bg-[#2E4862] text-white border-[#2E4862]'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-[#2E4862]/40'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* LED board */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-4">
          LED Board — 8 LEDs (i = 0 to 7)
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          {Array.from({ length: LED_COUNT }, (_, i) => {
            const on = activeRule.fn(i);
            return (
              <div key={i} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300"
                  style={{
                    backgroundColor: on ? 'rgba(251,191,36,1)' : '#e5e7eb',
                    borderColor: on ? 'rgba(252,211,77,1)' : '#d1d5db',
                    boxShadow: on ? '0 0 18px rgba(251,191,36,0.7)' : 'none',
                    transform: on ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  <Lightbulb
                    size={20}
                    style={{
                      color: on ? '#92400e' : '#9ca3af',
                      opacity: on ? 1 : 0.35,
                    }}
                    fill="currentColor"
                  />
                </div>
                <span className="text-[10px] text-gray-400 font-mono">i={i}</span>
                <span className={`text-[9px] font-bold ${on ? 'text-amber-500' : 'text-gray-300'}`}>
                  {on ? 'ON' : 'off'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code view */}
      <div className="rounded-xl overflow-hidden border border-gray-800">
        <div className="bg-gray-800 px-4 py-2.5">
          <span className="text-xs font-semibold text-white">What this looks like in code</span>
        </div>
        <div className="bg-[#0d1117] p-4 font-mono text-[11px] text-[#c9d1d9] leading-relaxed">
          <span style={{ color: '#ff7b72' }}>for</span>
          {'('}
          <span style={{ color: '#ff7b72' }}>int</span>
          {' i=0; i<'}
          <span style={{ color: '#f0883e' }}>8</span>
          {'; i++) {\n  '}
          <span style={{ color: '#ff7b72' }}>if</span>
          {' ('}
          <span style={{ color: '#f0883e' }}>{activeRule.desc}</span>
          {') {\n    '}
          <span style={{ color: '#79c0ff' }}>digitalWrite</span>
          {'(LED, HIGH);\n  }\n}'}
        </div>
      </div>

      {/* Progressive insights */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Key Concepts
        </p>
        <div className="flex flex-col gap-2">
          {INSIGHTS.map((insight, i) => (
            <div key={i} className={`flex gap-3 items-start rounded-lg px-3 py-2.5 transition-all duration-300 ${
              i <= insightIndex
                ? 'bg-[#2E4862]/5 border border-[#2E4862]/20'
                : 'bg-gray-50 border border-transparent opacity-40'
            }`}>
              <span className={`text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                i <= insightIndex ? 'bg-[#2E4862] text-white' : 'bg-gray-200 text-gray-500'
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