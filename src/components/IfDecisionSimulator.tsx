'use client';

import React, { useState } from 'react';
import { MousePointerClick, GitBranch, Lightbulb } from 'lucide-react';

export default function IfDecisionSimulator() {
  const [pressed, setPressed] = useState(false);
  const condition = pressed;

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🔀 IF Decision Simulator
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Press and hold the button. Watch the ESP32 evaluate the
          condition and choose which path to execute — only one
          branch runs at a time.
        </p>
      </div>

      {/* Three panel layout */}
      <div className="grid grid-cols-3 gap-4">

        {/* Input */}
        <div className={`rounded-xl border-2 p-5 flex flex-col items-center
          justify-center gap-4 transition-all duration-200 ${
          pressed ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'
        }`}>
          <p className="text-xs font-bold text-[#2E4862] flex items-center
            gap-1.5 self-start">
            <MousePointerClick size={13} /> Input
          </p>
          <button
            type="button"
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            onTouchStart={() => setPressed(true)}
            onTouchEnd={() => setPressed(false)}
            className={`w-24 h-24 rounded-full select-none transition-all
              duration-75 flex items-center justify-center text-xs font-bold
              border-4 ${
              pressed
                ? 'bg-blue-500 border-blue-400 shadow-none translate-y-1 text-white'
                : 'bg-gradient-to-b from-gray-100 to-gray-200 border-gray-300 text-gray-600 shadow-[0_6px_0_#b0b0b0]'
            }`}
          >
            {pressed ? 'HIGH' : 'LOW'}
          </button>
          <p className="text-[10px] text-gray-400 text-center">
            {pressed ? 'btnState = 1 (HIGH)' : 'btnState = 0 (LOW)'}
          </p>
        </div>

        {/* Decision engine */}
        <div className={`rounded-xl border-2 overflow-hidden transition-all
          duration-200 ${
          pressed ? 'border-emerald-400' : 'border-yellow-300'
        }`}>
          <div className={`px-4 py-2.5 flex items-center gap-2
            transition-colors duration-200 ${
            pressed ? 'bg-emerald-500' : 'bg-yellow-400'
          }`}>
            <GitBranch size={13} className="text-white" />
            <span className="text-xs font-bold text-white">
              IF Condition
            </span>
          </div>
          <div className="bg-[#0d1117] p-4 font-mono text-[11px]
            text-[#c9d1d9] h-[calc(100%-36px)] flex flex-col gap-2">
            <div>
              <span style={{ color: '#ff7b72' }}>if</span>
              {' (btnState == '}
              <span style={{ color: '#79c0ff' }}>HIGH</span>
              {') {'}
            </div>
            <div className={`pl-3 transition-all duration-150 ${
              condition ? 'text-emerald-400' : 'opacity-30'
            }`}>
              {'  LED = ON;'}
            </div>
            <div>{'} '}
              <span style={{ color: '#ff7b72' }}>else</span>
              {' {'}
            </div>
            <div className={`pl-3 transition-all duration-150 ${
              !condition ? 'text-red-400' : 'opacity-30'
            }`}>
              {'  LED = OFF;'}
            </div>
            <div>{'}'}</div>
            <div className={`mt-2 rounded-lg px-3 py-2 border
              transition-all duration-150 text-[10px] ${
              condition
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400'
            }`}>
              Condition: <span className="font-bold">
                {condition ? 'TRUE → IF branch' : 'FALSE → ELSE branch'}
              </span>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="rounded-xl border-2 border-gray-200 bg-white p-5
          flex flex-col items-center justify-center gap-3">
          <p className="text-xs font-bold text-[#2E4862] flex items-center
            gap-1.5 self-start">
            <Lightbulb size={13} /> Output
          </p>

          {/* Branch indicator */}
          <div className="flex flex-col gap-2 w-full">
            <div className={`px-3 py-2 rounded-lg border text-xs font-semibold
              text-center transition-all duration-150 ${
              condition
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-gray-50 border-gray-200 text-gray-400'
            }`}>
              IF → LED ON
            </div>
            <div className={`px-3 py-2 rounded-lg border text-xs font-semibold
              text-center transition-all duration-150 ${
              !condition
                ? 'bg-red-50 border-red-300 text-red-700'
                : 'bg-gray-50 border-gray-200 text-gray-400'
            }`}>
              ELSE → LED OFF
            </div>
          </div>

          {/* LED */}
          <div className={`w-16 h-16 rounded-full border-4 transition-all
            duration-150 ${
            condition
              ? 'bg-amber-400 border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.7)]'
              : 'bg-gray-200 border-gray-300'
          }`} />
          <span className={`text-xs font-bold ${
            condition ? 'text-amber-500' : 'text-gray-400'
          }`}>
            LED {condition ? 'ON' : 'OFF'}
          </span>
          <p className="text-[10px] text-gray-400 text-center">
            Only one branch executes at a time
          </p>
        </div>

      </div>

      {/* Insight */}
      <div className={`rounded-xl border px-4 py-3 text-xs leading-relaxed
        transition-all duration-200 ${
        condition
          ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
          : 'bg-amber-50 border-amber-200 text-amber-700'
      }`}>
        {condition
          ? '✅ Button is HIGH — condition is TRUE. The IF branch executes. LED turns ON.'
          : '⚪ Button is LOW — condition is FALSE. The ELSE branch executes. LED stays OFF.'
        }
      </div>

    </div>
  );
}