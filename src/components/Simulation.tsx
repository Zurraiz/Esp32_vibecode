'use client';

import React, { useEffect, useState } from 'react';

export default function ChristmasTreeSystem() {

  const [step, setStep] = useState(0);

  // 0 = top glow, 1 = mid glow, 2 = bottom glow, 3 = sparkle reset
  const pattern = [0, 1, 2, 3];

  useEffect(() => {

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % pattern.length);
    }, 600);

    return () => clearInterval(interval);

  }, []);

  const current = pattern[step];

  return (
    <div className="bg-slate-100 p-8 rounded-3xl space-y-10">

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Christmas Tree LED Pattern System
        </h2>
        <p className="text-sm text-slate-500">
          Small LEDs → sequence → loop → festive animation
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT: FULL LOOP EXECUTION MODEL */}

        <div className="bg-white border rounded-3xl p-8 space-y-6 font-mono text-sm">

          <div className="font-bold text-slate-800 text-lg">
            ESP32 Full Execution Cycle
          </div>

          {/* LOOP WRAPPER */}
          <div className="border-2 border-blue-100 rounded-2xl p-4 bg-blue-50 space-y-4">

            <div className="text-blue-700 font-bold">
              while(true) {`{`}
            </div>

            <div className="ml-4 space-y-4 border-l-2 border-blue-200 pl-4">

              <FlowStep active>
                loop() iteration starts
              </FlowStep>

              <Arrow />

              <FlowStep active>
                delay(600) → timing control
              </FlowStep>

              <Arrow />

              <FlowStep active>
                index = (index + 1) % 4
              </FlowStep>

              <Arrow />

              {/* INSIDE LOOP: FULL IF/ELSE CHAIN */}
              <div className="bg-white border rounded-xl p-3 space-y-3">

                <div className="text-slate-500 text-xs">
                  decision logic (runs every loop cycle)
                </div>

                <FlowStep active={current === 0} color="pink">
                  if (index == 0) → topLEDs()
                </FlowStep>

                <FlowStep active={current === 1} color="yellow">
                  else if (index == 1) → middleLEDs()
                </FlowStep>

                <FlowStep active={current === 2} color="green">
                  else if (index == 2) → bottomLEDs()
                </FlowStep>

                <FlowStep active={current === 3} color="purple">
                  else → sparkleEffect()
                </FlowStep>

              </div>

              <Arrow />

              <div className="p-3 rounded-xl border bg-emerald-50 text-emerald-700 font-bold text-center">
                digitalWrite(LED_STRIP, currentPattern)
              </div>

            </div>

            <div className="text-blue-700 font-bold">
              {`}`}
            </div>

          </div>

        </div>
        {/* RIGHT: CHRISTMAS TREE */}
        <div className="bg-white border rounded-3xl p-10 flex flex-col items-center space-y-4">

          <h3 className="font-bold text-lg text-slate-800">
            LED Christmas Tree
          </h3>

          {/* TREE SHAPE */}
          <div className="relative flex flex-col items-center">

            {/* STAR */}
            <div className={`
              text-3xl mb-2 transition-all
              ${current === 3 ? 'scale-125 drop-shadow-xl' : 'opacity-60'}
            `}>
              ⭐
            </div>

            {/* TREE BODY (triangle style) */}
            <div className="flex flex-col items-center space-y-2">

              {/* TOP ROW */}
              <div className="flex gap-2">
                <Led active={current === 0} color="pink" />
              </div>

              {/* MIDDLE ROW */}
              <div className="flex gap-2">
                <Led active={current === 1} color="yellow" />
                <Led active={current === 1} color="yellow" />
              </div>

              {/* LOWER ROW */}
              <div className="flex gap-2">
                <Led active={current === 2} color="green" />
                <Led active={current === 2} color="green" />
                <Led active={current === 2} color="green" />
              </div>

              {/* BASE ROW */}
              <div className="flex gap-2">
                <Led active={current === 2} color="green" />
                <Led active={current === 2} color="green" />
                <Led active={current === 2} color="green" />
                <Led active={current === 2} color="green" />
              </div>

            </div>

            {/* TRUNK */}
            <div className="w-6 h-10 bg-amber-800 mt-2 rounded-md" />

          </div>

        </div>

      </div>

    </div>
  );
}

/* SMALL LED COMPONENT */
function Led({ active, color }: any) {

  const colors: any = {
    pink: 'bg-pink-400 shadow-pink-300',
    yellow: 'bg-yellow-300 shadow-yellow-200',
    green: 'bg-green-400 shadow-green-300'
  };

  return (
    <div
      className={`
        w-4 h-4 rounded-full transition-all duration-300
        ${active
          ? `${colors[color]} shadow-[0_0_10px_rgba(0,0,0,0.3)] scale-125`
          : 'bg-slate-300'
        }
      `}
    />
  );
}

const base =
  "p-3 rounded-xl border bg-slate-50 text-slate-600 text-center";

const active =
  "p-3 rounded-xl border bg-yellow-100 border-yellow-400 text-yellow-700 font-bold text-center scale-[1.03]";
function Step({ label, active, color }: any) {

  const colors: any = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    red: "border-red-200 bg-red-50 text-red-700",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
    green: "border-green-200 bg-green-50 text-green-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700"
  };

  return (
    <pre
      className={`
        p-3 rounded-xl border whitespace-pre-wrap transition-all
        ${active
          ? colors[color] + " font-bold scale-[1.02] shadow-md"
          : "bg-slate-50 text-slate-500 border-slate-200"
        }
      `}
    >
      {label}
    </pre>
  );
}

function Arrow() {
  return <div className="text-slate-400 text-center">↓</div>;
}
function FlowStep({ children, active, color }: any) {

  const colors: any = {
    pink: "border-pink-200 bg-pink-50 text-pink-700",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
    green: "border-green-200 bg-green-50 text-green-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
    default: "border-slate-200 bg-slate-50 text-slate-600"
  };

  return (
    <div
      className={`
        p-3 rounded-xl border transition-all
        ${active
          ? (colors[color] || colors.default) + " font-bold scale-[1.02] shadow-md"
          : "bg-white text-slate-400 border-slate-100"
        }
      `}
    >
      {children}
    </div>
  );
}
