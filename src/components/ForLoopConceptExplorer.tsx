'use client';

import React, { useState } from 'react';

const INSIGHTS = [
  'Without a loop, you must write the same instruction once for each repetition.',
  'A for loop writes the instruction once and repeats it automatically.',
  'The counter i tracks how many times the loop has run.',
  'When i reaches the limit, the condition becomes false and the loop stops.',
];

export default function ForLoopConceptExplorer() {
  const [times, setTimes] = useState(3);
  const [mode, setMode] = useState<'manual' | 'loop'>('manual');
  const [insightIndex, setInsightIndex] = useState(0);

  const manualBlocks = Array.from({ length: times }, (_, i) => i);

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔁 Manual vs Loop — Why Loops Exist
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Change the repeat count and switch between modes.
          See how a for loop replaces writing the same
          instructions over and over.
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm flex items-center gap-6">
        <div className="flex-1">
          <label className="text-[10px] font-semibold text-gray-400
            uppercase tracking-wider block mb-1.5">
            Repeat count: <span className="text-[#2E4862]">{times} times</span>
          </label>
          <input
            type="range" min={1} max={8} value={times}
            onChange={e => {
              setTimes(Number(e.target.value));
              setInsightIndex(prev => Math.max(prev, 0));
            }}
            className="w-full accent-[#2E4862] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>1</span><span>8</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {(['manual', 'loop'] as const).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setInsightIndex(prev => Math.max(prev, m === 'loop' ? 1 : 0));
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold
                border-2 transition-all ${
                mode === m
                  ? 'bg-[#2E4862] text-white border-[#2E4862]'
                  : 'bg-white text-gray-500 border-gray-200'
              }`}
            >
              {m === 'manual' ? '✍️ Manual' : '🔁 For Loop'}
            </button>
          ))}
        </div>
      </div>

      {/* Code comparison */}
      <div className="grid grid-cols-2 gap-4">

        {/* Manual */}
        <div className={`rounded-xl border-2 overflow-hidden transition-all ${
          mode === 'manual' ? 'border-red-300' : 'border-gray-200 opacity-60'
        }`}>
          <div className={`px-4 py-2.5 text-xs font-bold flex items-center
            justify-between ${
            mode === 'manual' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-500'
          }`}>
            <span>✍️ Without a loop</span>
            <span className="font-normal">{times} × written</span>
          </div>
          <div className="bg-[#0d1117] p-3 font-mono text-[11px]
            text-[#c9d1d9] flex flex-col gap-1 max-h-48 overflow-y-auto">
            {manualBlocks.map(i => (
              <div key={i} className={`transition-all ${
                mode === 'manual' ? 'opacity-100' : 'opacity-30'
              }`}>
                <span style={{ color: '#79c0ff' }}>digitalWrite</span>
                {'(LED, HIGH);\n'}
                <span style={{ color: '#79c0ff' }}>delay</span>
                {'(500);\n'}
                <span style={{ color: '#79c0ff' }}>digitalWrite</span>
                {'(LED, LOW);\n'}
                <span style={{ color: '#79c0ff' }}>delay</span>
                {'(500);'}
                {i < times - 1 && (
                  <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
                    {'\n// repeat...'}
                  </span>
                )}
                {'\n'}
              </div>
            ))}
          </div>
          {mode === 'manual' && (
            <div className="px-3 py-2 bg-red-50 border-t border-red-100">
              <p className="text-[10px] text-red-600 font-medium">
                ⚠️ {times * 4} lines — grows with each repetition
              </p>
            </div>
          )}
        </div>

        {/* Loop */}
        <div className={`rounded-xl border-2 overflow-hidden transition-all ${
          mode === 'loop' ? 'border-emerald-400' : 'border-gray-200 opacity-60'
        }`}>
          <div className={`px-4 py-2.5 text-xs font-bold flex items-center
            justify-between ${
            mode === 'loop' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-500'
          }`}>
            <span>🔁 With a for loop</span>
            <span className="font-normal">always 6 lines</span>
          </div>
          <div className="bg-[#0d1117] p-3 font-mono text-[11px]
            text-[#c9d1d9]">
            <span style={{ color: '#ff7b72' }}>for</span>
            {'('}
            <span style={{ color: '#ff7b72' }}>int</span>
            {' i=0; i<'}
            <span style={{ color: '#f0883e' }}>{times}</span>
            {'; i++) {\n'}
            {'  '}
            <span style={{ color: '#79c0ff' }}>digitalWrite</span>
            {'(LED, HIGH);\n'}
            {'  '}
            <span style={{ color: '#79c0ff' }}>delay</span>
            {'(500);\n'}
            {'  '}
            <span style={{ color: '#79c0ff' }}>digitalWrite</span>
            {'(LED, LOW);\n'}
            {'  '}
            <span style={{ color: '#79c0ff' }}>delay</span>
            {'(500);\n'}
            {'}'}
          </div>
          {mode === 'loop' && (
            <div className="px-3 py-2 bg-emerald-50 border-t border-emerald-100">
              <p className="text-[10px] text-emerald-600 font-medium">
                ✓ Same result — change {times} to any number, code stays the same
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Counter visualisation */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <p className="text-[10px] font-semibold text-gray-400 uppercase
          tracking-wider mb-3">
          Counter i — how the loop tracks repetitions
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {Array.from({ length: times }, (_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-lg bg-[#2E4862] text-white
                flex items-center justify-center text-sm font-bold font-mono">
                {i}
              </div>
              <span className="text-[10px] text-gray-400">i={i}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-1 opacity-50">
            <div className="w-10 h-10 rounded-lg bg-red-100 border-2
              border-red-300 text-red-600 flex items-center justify-center
              text-sm font-bold font-mono">
              {times}
            </div>
            <span className="text-[10px] text-red-400">stop</span>
          </div>
        </div>
        <p className="text-[10px] text-gray-400 mt-2">
          Loop runs when i &lt; {times} — stops when i reaches {times}
        </p>
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
