'use client';

import React, { useState } from 'react';
import { MousePointerClick, Cpu, Lightbulb, GitBranch } from 'lucide-react';

export default function IfDecisionSimulator() {
  const [pressed, setPressed] = useState(false);

  const condition = pressed; // button HIGH = true

  return (
    <div className="grid grid-cols-3 gap-4 w-full">

      {/* 🧠 INPUT */}
      <div className="bg-white border rounded-xl p-5 flex flex-col items-center justify-center gap-4">
        <h3 className="text-xs font-bold flex items-center gap-2 text-gray-700">
          <MousePointerClick size={14} />
          Input
        </h3>

        <button
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          className="
w-28 h-28 rounded-full
bg-gradient-to-b from-gray-100 to-gray-200
border border-gray-300
shadow-[0_6px_0_#b0b0b0]
active:shadow-[0_2px_0_#b0b0b0]
active:translate-y-[4px]
transition-all duration-75
flex items-center justify-center
text-xs font-bold text-gray-700
relative overflow-hidden
          "
        >
          {pressed ? 'HIGH (1)' : 'LOW (0)'}
        </button>

        <p className="text-[10px] text-gray-500 text-center">
          Physical signal from button
        </p>
      </div>

      {/* ⚙️ DECISION ENGINE */}
      <div className="bg-gray-900 text-green-400 font-mono text-xs rounded-xl p-5">
        <h3 className="text-white mb-3 flex items-center gap-2">
          <Cpu size={14} />
          IF Condition Engine
        </h3>

        <pre>
{`if (buttonState == HIGH) {
    LED = ON;
} else {
    LED = OFF;
}`}
        </pre>

        <div className="mt-4 space-y-2 text-[11px]">
          <div>
            Condition:{" "}
            <span className="text-white">
              buttonState == HIGH
            </span>
          </div>

          <div>
            Evaluation:{" "}
            <span className="text-white">
              {condition ? 'TRUE' : 'FALSE'}
            </span>
          </div>

          <div>
            Active Path:{" "}
            <span className="text-white">
              {condition ? 'IF BLOCK' : 'ELSE BLOCK'}
            </span>
          </div>
        </div>
      </div>

      {/* 🔀 OUTPUT BRANCH VISUAL */}
      <div className="bg-white border rounded-xl p-5 flex flex-col items-center justify-center gap-4">
        <h3 className="text-xs font-bold flex items-center gap-2 text-gray-700">
          <GitBranch size={14} />
          Decision Output
        </h3>

        {/* Branch indicator */}
        <div className="flex flex-col items-center gap-2 text-xs">
          <div className={`px-3 py-1 rounded border ${
            condition ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'
          }`}>
            IF → LED ON
          </div>

          <div className={`px-3 py-1 rounded border ${
            !condition ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-300'
          }`}>
            ELSE → LED OFF
          </div>
        </div>

        {/* LED */}
        <div
          className={`w-20 h-20 rounded-full border-4 transition-all duration-200 ${
            condition
              ? 'bg-yellow-400 border-yellow-300 shadow-[0_0_25px_rgba(250,204,21,0.7)]'
              : 'bg-gray-200 border-gray-300'
          }`}
        />

        <p className="text-[10px] text-gray-500 text-center">
          Only one branch executes at a time
        </p>
      </div>

    </div>
  );
}