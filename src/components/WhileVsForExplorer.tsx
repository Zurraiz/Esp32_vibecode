'use client';

import React, { useState, useEffect, useRef } from 'react';

const INSIGHTS = [
  'A for loop runs a fixed number of times — you decide the count before it starts.',
  'A while loop runs based on a condition — it keeps going as long as something is true.',
  'You cannot always predict how many times a while loop will run.',
  'While loops are ideal when repetition depends on a changing variable or sensor state.',
];

export default function WhileVsForExplorer() {
  const [forCount] = useState(5);
  const [forRunning, setForRunning] = useState(false);
  const [forCurrent, setForCurrent] = useState(0);
  const [counter, setCounter] = useState(5);
  const [whileRunning, setWhileRunning] = useState(false);
  const [insightIndex, setInsightIndex] = useState(0);
  const whileRef = useRef(false);

  // For loop animation
  useEffect(() => {
    if (!forRunning) return;
    if (forCurrent >= forCount) {
      setForRunning(false);
      setInsightIndex(prev => Math.max(prev, 1));
      return;
    }
    const t = setTimeout(() => setForCurrent(prev => prev + 1), 600);
    return () => clearTimeout(t);
  }, [forRunning, forCurrent, forCount]);

  // While loop countdown engine
  useEffect(() => {
    if (!whileRunning) return;
    whileRef.current = true;

    const tick = async () => {
      if (!whileRef.current) return;
      setCounter(prev => {
        if (prev <= 0) {
          setWhileRunning(false);
          whileRef.current = false;
          setInsightIndex(prev2 => Math.max(prev2, 3));
          return 0;
        }
        setInsightIndex(prev2 => Math.max(prev2, 2));
        return prev - 1;
      });
    };

    const interval = setInterval(tick, 700);
    return () => {
      clearInterval(interval);
      whileRef.current = false;
    };
  }, [whileRunning]);

  const startFor = () => {
    setForCurrent(0);
    setForRunning(true);
    setInsightIndex(prev => Math.max(prev, 0));
  };

  const startWhile = () => {
    setCounter(5);
    setWhileRunning(true);
  };

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔁 For Loop vs While Loop — Feel the Difference
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Run both loops and observe how they differ.
          The for loop counts up to a fixed number.
          The while loop counts down until a condition becomes false.
        </p>
      </div>

      {/* Side by side */}
      <div className="grid grid-cols-2 gap-4">

        {/* For loop */}
        <div className={`rounded-xl border-2 p-5 flex flex-col gap-4
          transition-all duration-200 ${
          forRunning
            ? 'border-[#2E4862] bg-[#2E4862]/5'
            : 'border-gray-200 bg-white'
        }`}>
          <div>
            <p className="text-xs font-bold text-[#2E4862]">
              🔁 For Loop
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Fixed count — runs exactly {forCount} times
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: forCount }, (_, i) => (
              <div key={i} className={`w-8 h-8 rounded-lg border-2
                flex items-center justify-center text-xs font-bold
                transition-all duration-300 ${
                i < forCurrent
                  ? 'bg-[#2E4862] text-white border-[#2E4862]'
                  : i === forCurrent && forRunning
                  ? 'bg-amber-400 text-white border-amber-300 scale-110'
                  : 'bg-gray-100 text-gray-400 border-gray-200'
              }`}>
                {i}
              </div>
            ))}
          </div>

          <div className="bg-[#0d1117] rounded-lg px-3 py-2 font-mono
            text-[10px] text-[#c9d1d9]">
            <span style={{ color: '#ff7b72' }}>for</span>
            {'(i=0; i<'}
            <span style={{ color: '#f0883e' }}>{forCount}</span>
            {'; i++) { ... }'}
          </div>

          <div className="rounded-lg bg-gray-50 border border-gray-200
            px-3 py-2 flex justify-between text-[10px]">
            <span className="text-gray-500">Progress</span>
            <span className="font-bold font-mono text-[#2E4862]">
              {forCurrent} / {forCount}
            </span>
          </div>

          <button
            type="button"
            onClick={startFor}
            disabled={forRunning}
            className="w-full py-2 rounded-lg text-xs font-semibold
              text-white bg-[#2E4862] hover:bg-[#3a5a7a]
              disabled:opacity-50 transition-colors"
          >
            {forRunning
              ? `Running... ${forCurrent}/${forCount}`
              : 'Run For Loop'}
          </button>

          {!forRunning && forCurrent === forCount && forCurrent > 0 && (
            <p className="text-[10px] text-emerald-600 font-medium
              text-center">
              ✓ Completed {forCount} iterations — stopped
            </p>
          )}
        </div>

        {/* While loop */}
        <div className={`rounded-xl border-2 p-5 flex flex-col gap-4
          transition-all duration-200 ${
          whileRunning
            ? 'border-emerald-400 bg-emerald-50'
            : 'border-gray-200 bg-white'
        }`}>
          <div>
            <p className="text-xs font-bold text-[#2E4862]">
              🔄 While Loop
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Condition-based — runs while counter &gt; 0
            </p>
          </div>

          {/* Counter display */}
          <div className="flex flex-col items-center gap-2">
            <div className={`w-20 h-20 rounded-xl border-4 flex items-center
              justify-center transition-all duration-300 ${
              whileRunning && counter > 0
                ? 'border-emerald-400 bg-emerald-50'
                : counter === 0
                ? 'border-red-300 bg-red-50'
                : 'border-gray-200 bg-gray-50'
            }`}>
              <span className={`text-3xl font-bold font-mono ${
                counter > 0 ? 'text-[#2E4862]' : 'text-red-500'
              }`}>
                {counter}
              </span>
            </div>
            <p className={`text-[10px] font-semibold ${
              whileRunning && counter > 0
                ? 'text-emerald-600'
                : counter === 0
                ? 'text-red-500'
                : 'text-gray-400'
            }`}>
              {whileRunning && counter > 0
                ? `${counter} > 0 → TRUE → continue`
                : counter === 0
                ? '0 > 0 → FALSE → stop'
                : 'counter = 5'}
            </p>
          </div>

          <div className="bg-[#0d1117] rounded-lg px-3 py-2 font-mono
            text-[10px] text-[#c9d1d9]">
            <span style={{ color: '#ff7b72' }}>while</span>
            {'(counter > '}
            <span style={{ color: '#f0883e' }}>0</span>
            {') { counter--; }'}
          </div>

          <button
            type="button"
            onClick={startWhile}
            disabled={whileRunning}
            className="w-full py-2 rounded-lg text-xs font-semibold
              text-white bg-[#2E4862] hover:bg-[#3a5a7a]
              disabled:opacity-50 transition-colors"
          >
            {whileRunning ? `Counting down... ${counter}` : 'Run While Loop'}
          </button>

          {!whileRunning && counter === 0 && (
            <p className="text-[10px] text-red-500 font-medium text-center">
              Condition became FALSE — loop stopped
            </p>
          )}
        </div>

      </div>

      {/* Key difference */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#2E4862]/5 border border-[#2E4862]/20
          px-4 py-3 text-center">
          <p className="text-xs font-bold text-[#2E4862] mb-1">For Loop</p>
          <p className="text-[10px] text-gray-600">
            Count decided <span className="font-bold">before</span> start
            — always runs exactly {forCount} times
          </p>
        </div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-200
          px-4 py-3 text-center">
          <p className="text-xs font-bold text-emerald-700 mb-1">While Loop</p>
          <p className="text-[10px] text-gray-600">
            Runs until <span className="font-bold">condition is false</span>
            — count depends on variable
          </p>
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
