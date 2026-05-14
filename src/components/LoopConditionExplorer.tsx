'use client';

import React, { useState, useEffect, useRef } from 'react';

type FlowStep = 'loop' | 'read' | 'check' | 'if-branch' | 'else-branch' | 'back';

const INSIGHTS = [
  'The loop() function runs forever — it never stops on its own.',
  'Inside the loop, we read the button state on every iteration.',
  'The IF condition checks the state and chooses which branch to execute.',
  'Only one branch executes per iteration — then the loop restarts immediately.',
];

export default function LoopConditionExplorer() {
  const [btnPressed, setBtnPressed] = useState(false);
  const [activeStep, setActiveStep] = useState<FlowStep>('loop');
  const [isRunning, setIsRunning] = useState(false);
  const [iterCount, setIterCount] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);
  const isRunningRef = useRef(false);
  const btnRef = useRef(false);

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  const sleep = (ms: number) =>
    new Promise<void>(resolve => setTimeout(resolve, ms));

  const handleRun = async () => {
    if (isRunning) {
      isRunningRef.current = false;
      setIsRunning(false);
      setActiveStep('loop');
      setIterCount(0);
      return;
    }

    isRunningRef.current = true;
    setIsRunning(true);
    setIterCount(0);
    let iters = 0;

    while (isRunningRef.current) {
      // Step 1: loop start
      setActiveStep('loop');
      setInsightIndex(prev => Math.max(prev, 0));
      await sleep(500);
      if (!isRunningRef.current) break;

      // Step 2: read input
      setActiveStep('read');
      setInsightIndex(prev => Math.max(prev, 1));
      await sleep(500);
      if (!isRunningRef.current) break;

      // Step 3: check condition
      setActiveStep('check');
      setInsightIndex(prev => Math.max(prev, 2));
      await sleep(600);
      if (!isRunningRef.current) break;

      // Step 4: branch
      const pressed = btnRef.current;
      setActiveStep(pressed ? 'if-branch' : 'else-branch');
      setInsightIndex(prev => Math.max(prev, 3));
      await sleep(800);
      if (!isRunningRef.current) break;

      // Step 5: back to loop
      setActiveStep('back');
      iters++;
      setIterCount(iters);
      await sleep(400);
      if (!isRunningRef.current) break;
    }
  };

  const handleBtnPress = () => {
    setBtnPressed(true);
    btnRef.current = true;
  };

  const handleBtnRelease = () => {
    setBtnPressed(false);
    btnRef.current = false;
  };

  const stepStyle = (step: FlowStep) =>
    activeStep === step && isRunning
      ? 'bg-[#2E4862] text-white border-[#2E4862] scale-105 shadow-md'
      : 'bg-white text-gray-600 border-gray-200';

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          🧠 Loop + Condition Flow Explorer
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Press Run and hold the button at different times.
          Watch how the execution flows through the loop,
          reads the input, checks the condition, and chooses
          a branch — then repeats.
        </p>
      </div>

      {/* Flow diagram + button side by side */}
      <div className="grid grid-cols-2 gap-4">

        {/* Flow diagram */}
        <div className="rounded-xl bg-white border border-gray-200
          p-5 shadow-sm flex flex-col gap-3">
          <p className="text-[10px] font-semibold text-gray-400 uppercase
            tracking-wider">Execution Flow</p>

          {/* Loop start */}
          <div className={`rounded-xl border-2 px-4 py-3 text-xs
            font-semibold text-center transition-all duration-200 ${
            stepStyle('loop')
          }`}>
            🔁 void loop() — starts
          </div>

          <div className="text-center text-gray-300 text-sm">↓</div>

          {/* Read input */}
          <div className={`rounded-xl border-2 px-4 py-3 text-xs
            font-semibold text-center transition-all duration-200 ${
            stepStyle('read')
          }`}>
            📖 Read button state
          </div>

          <div className="text-center text-gray-300 text-sm">↓</div>

          {/* Condition */}
          <div className={`rounded-xl border-2 px-4 py-3 text-xs
            font-semibold text-center transition-all duration-200 ${
            stepStyle('check')
          }`}>
            ❓ IF btnState == HIGH?
          </div>

          <div className="text-center text-gray-300 text-sm">↓</div>

          {/* Two branches */}
          <div className="grid grid-cols-2 gap-2">
            <div className={`rounded-xl border-2 px-3 py-2.5 text-[10px]
              font-semibold text-center transition-all duration-200 ${
              activeStep === 'if-branch' && isRunning
                ? 'bg-emerald-500 text-white border-emerald-400 scale-105'
                : 'bg-white text-gray-500 border-gray-200'
            }`}>
              ✅ TRUE<br/>
              <span className="text-[9px] font-normal">LED blinks</span>
            </div>
            <div className={`rounded-xl border-2 px-3 py-2.5 text-[10px]
              font-semibold text-center transition-all duration-200 ${
              activeStep === 'else-branch' && isRunning
                ? 'bg-gray-500 text-white border-gray-400 scale-105'
                : 'bg-white text-gray-500 border-gray-200'
            }`}>
              ❌ FALSE<br/>
              <span className="text-[9px] font-normal">LED off</span>
            </div>
          </div>

          <div className="text-center text-gray-300 text-sm">↓</div>

          {/* Back */}
          <div className={`rounded-xl border-2 px-4 py-3 text-xs
            font-semibold text-center transition-all duration-200 ${
            stepStyle('back')
          }`}>
            ↺ loop repeats (#{iterCount})
          </div>
        </div>

        {/* Right: button + status */}
        <div className="flex flex-col gap-4">

          {/* Button */}
          <div className={`rounded-xl border-2 p-5 flex flex-col
            items-center gap-3 transition-all duration-200 ${
            btnPressed ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'
          }`}>
            <p className="text-xs font-bold text-[#2E4862] self-start">
              Button Input
            </p>
            <button
              type="button"
              onMouseDown={handleBtnPress}
              onMouseUp={handleBtnRelease}
              onMouseLeave={handleBtnRelease}
              onTouchStart={handleBtnPress}
              onTouchEnd={handleBtnRelease}
              className={`w-20 h-20 rounded-full select-none
                transition-all duration-75 flex items-center justify-center
                text-xs font-bold border-4 ${
                btnPressed
                  ? 'bg-blue-500 border-blue-400 shadow-none translate-y-1 text-white'
                  : 'bg-gradient-to-b from-gray-100 to-gray-200 border-gray-300 text-gray-600 shadow-[0_5px_0_#b0b0b0]'
              }`}
            >
              {btnPressed ? 'HIGH' : 'HOLD'}
            </button>
            <p className={`text-[10px] font-semibold ${
              btnPressed ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {btnPressed ? 'btnState = 1 (HIGH)' : 'btnState = 0 (LOW)'}
            </p>
          </div>

          {/* Current action */}
          <div className={`rounded-xl border px-4 py-3 text-xs
            font-medium leading-relaxed transition-all duration-200 ${
            activeStep === 'if-branch'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : activeStep === 'else-branch'
              ? 'bg-gray-50 border-gray-200 text-gray-600'
              : 'bg-[#2E4862]/5 border-[#2E4862]/20 text-[#2E4862]'
          }`}>
            {!isRunning
              ? '▶ Press Run to start the loop'
              : activeStep === 'loop'
              ? '🔁 loop() starting new iteration'
              : activeStep === 'read'
              ? '📖 Reading button state...'
              : activeStep === 'check'
              ? `❓ Checking: btnState == HIGH → ${btnPressed ? 'TRUE' : 'FALSE'}`
              : activeStep === 'if-branch'
              ? '✅ Condition TRUE — LED blinks'
              : activeStep === 'else-branch'
              ? '❌ Condition FALSE — LED stays OFF'
              : '↺ Returning to top of loop...'
            }
          </div>

          {/* Iteration counter */}
          {isRunning && (
            <div className="rounded-xl bg-white border border-gray-200
              px-4 py-3 flex justify-between items-center shadow-sm">
              <span className="text-xs text-gray-500">Loop iterations</span>
              <span className="text-lg font-bold font-mono text-[#2E4862]">
                {iterCount}
              </span>
            </div>
          )}

          {/* Run button */}
          <button
            type="button"
            onClick={handleRun}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold
              flex items-center justify-center gap-2 transition-colors
              text-white mt-auto ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
            }`}
          >
            {isRunning ? 'Stop' : '▶ Run'}
          </button>
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
