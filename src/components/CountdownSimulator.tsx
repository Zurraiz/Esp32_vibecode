'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Lightbulb, Play, Square } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function CountdownSimulator() {
  const blocks = useAppStore(state => state.blocks);

  const varBlock = blocks.find(b => b.type === 'var_int');
  const addBlock = blocks.find(b => b.type === 'var_add');
  const delayBlock = blocks.find(
    b => b.type === 'delay_ms' || b.type === 'delay_sec'
  );
  const whileBlock = blocks.find(b => b.type === 'while_loop');

  const varName = varBlock
    ? String(varBlock.values?.name ?? 'counter')
    : 'counter';
  const startValue = varBlock
    ? Math.trunc(Number(varBlock.values?.val ?? 5))
    : 5;
  const step = addBlock
    ? Number(addBlock.values?.step ?? -1)
    : -1;
  const delayMs = delayBlock
    ? delayBlock.type === 'delay_sec'
      ? Number(delayBlock.values?.sec ?? 1) * 1000
      : Number(delayBlock.values?.ms ?? 500)
    : 500;
  const condition = whileBlock
    ? `${varBlock ? varName : 'counter'} ${String(whileBlock.values?.op ?? '>')} ${String(whileBlock.values?.val ?? '0')}`
    : `${varName} > 0`;

  const [counter, setCounter] = useState(startValue);
  const [ledOn, setLedOn] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [iterCount, setIterCount] = useState(0);
  const isRunningRef = useRef(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  const sleep = (ms: number) =>
    new Promise<void>(resolve => setTimeout(resolve, ms));

  const evaluateCondition = useCallback((val: number): boolean => {
    const threshold = Number(whileBlock?.values?.val ?? 0);
    const op = String(whileBlock?.values?.op ?? '>');
    switch (op) {
      case '>': return val > threshold;
      case '<': return val < threshold;
      case '>=': return val >= threshold;
      case '<=': return val <= threshold;
      case '==': return val === threshold;
      case '!=': return val !== threshold;
      default: return val > 0;
    }
  }, [whileBlock]);

  const handleRun = async () => {
    if (isRunning) {
      isRunningRef.current = false;
      setIsRunning(false);
      setLedOn(false);
      setLogs([]);
      setCounter(startValue);
      setIterCount(0);
      return;
    }

    isRunningRef.current = true;
    setIsRunning(true);
    setLogs([]);
    setIterCount(0);

    let current = startValue;
    setCounter(current);
    let iters = 0;

    while (isRunningRef.current && evaluateCondition(current)) {
      iters++;
      setIterCount(iters);
      setLogs(prev => [
        ...prev.slice(-24),
        `${varName} = ${current} → condition ${condition} → TRUE`,
      ]);

      // LED ON
      setLedOn(true);
      await sleep(Math.max(delayMs, 200));
      if (!isRunningRef.current) break;

      // LED OFF
      setLedOn(false);
      await sleep(Math.max(delayMs, 200));
      if (!isRunningRef.current) break;

      // Update counter
      current = Math.trunc(current + step);
      setCounter(current);
    }

    if (isRunningRef.current) {
      setLogs(prev => [
        ...prev.slice(-24),
        `${varName} = ${current} → condition ${condition} → FALSE → loop ended`,
      ]);
    }

    setLedOn(false);
    setIsRunning(false);
    isRunningRef.current = false;
  };

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔄 While Loop Simulator
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Your while loop starts at{' '}
          <span className="font-semibold text-[#2E4862]">{varName} = {startValue}</span>,
          changes by{' '}
          <span className="font-semibold text-[#2E4862]">{step}</span> each iteration,
          and stops when{' '}
          <span className="font-semibold text-[#2E4862]">{condition}</span> is false.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {/* Left: counter + LED */}
        <div className="flex flex-col gap-3">

          {/* Counter display */}
          <div className="rounded-xl bg-white border border-gray-200
            p-4 shadow-sm">
            <p className="text-[10px] font-semibold text-gray-400
              uppercase tracking-wider mb-3">
              Variable: {varName}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold font-mono text-[#2E4862]
                  transition-all duration-200">
                  {counter}
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {iterCount} iterations done
                </p>
              </div>
              <div className="text-right">
                <p className={`text-xs font-bold font-mono ${
                  evaluateCondition(counter) && isRunning
                    ? 'text-emerald-600'
                    : 'text-red-500'
                }`}>
                  {condition}
                </p>
                <p className={`text-[10px] font-semibold mt-0.5 ${
                  evaluateCondition(counter) && isRunning
                    ? 'text-emerald-500'
                    : 'text-red-400'
                }`}>
                  {isRunning
                    ? evaluateCondition(counter)
                      ? 'TRUE → continue'
                      : 'FALSE → stop'
                    : '—'
                  }
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-[#2E4862] rounded-full transition-all
                  duration-300"
                style={{
                  width: startValue !== 0
                    ? `${Math.max(0, Math.min(100, (counter / startValue) * 100))}%`
                    : '0%'
                }}
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1 text-right">
              {startValue !== 0
                ? `${Math.round((counter / startValue) * 100)}% remaining`
                : ''}
            </p>
          </div>

          {/* LED */}
          <div className="rounded-xl bg-gray-50 border border-gray-100
            flex flex-col items-center justify-center gap-3 p-4
            min-h-[120px]">
            <p className="text-[10px] font-semibold text-gray-400
              uppercase tracking-wider self-start">LED Output</p>
            <div className={`w-14 h-14 rounded-full border-4
              transition-all duration-150 flex items-center justify-center ${
              ledOn
                ? 'bg-amber-400 border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.7)]'
                : 'bg-gray-200 border-gray-300'
            }`}>
              <Lightbulb size={24}
                style={{
                  color: ledOn ? '#92400e' : '#9ca3af',
                  opacity: ledOn ? 1 : 0.4,
                }}
                fill="currentColor"
              />
            </div>
            <span className={`text-xs font-bold ${
              ledOn ? 'text-amber-500' : 'text-gray-400'
            }`}>
              {ledOn ? 'ON' : 'OFF'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRun}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold
              flex items-center justify-center gap-2 transition-colors
              text-white ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
            }`}
          >
            {isRunning
              ? <><Square size={14} fill="currentColor" /> Stop</>
              : <><Play size={14} fill="currentColor" /> Run While Loop</>
            }
          </button>
        </div>

        {/* Right: condition log */}
        <div className="flex flex-col gap-3">
          <div className="rounded-xl overflow-hidden border border-gray-800
            flex-1 flex flex-col">
            <div className="bg-gray-800 px-4 py-2.5 flex items-center
              justify-between flex-shrink-0">
              <span className="text-xs font-semibold text-white">
                Condition Log
              </span>
              {isRunning && (
                <span className="flex items-center gap-1 text-[10px]
                  text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full
                    animate-pulse inline-block" />
                  Running
                </span>
              )}
            </div>
            <div className="bg-[#0d1117] p-3 font-mono text-[10px]
              text-green-400 overflow-y-auto flex flex-col gap-0.5
              min-h-[260px]">
              {logs.length === 0 ? (
                <span className="text-gray-500 italic">
                  {isRunning ? 'Starting...' : 'Press Run...'}
                </span>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className={
                    i === logs.length - 1
                      ? log.includes('FALSE')
                        ? 'text-red-400'
                        : 'text-emerald-300'
                      : 'opacity-40 text-green-600'
                  }>
                    {'>'} {log}
                  </div>
                ))
              )}
              <div ref={logEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
