'use client';

import React, { useEffect, useRef, useState } from 'react';

const FLOW_NODES = [
  '🚶 Movement enters detection zone',
  '📡 PIR sensor detects infrared change',
  '⚡ PIR signal becomes HIGH',
  '⚙️ ESP32 reads signal in loop()',
  '💡 LED turns ON — reaction complete',
];

// Pre-computed positions — no Math.random() in render
const SCAN_LINES = [0, 20, 40, 60, 80];

export default function PIRExplorer() {
  const [personX, setPersonX] = useState(15);
  const [motionDetected, setMotionDetected] = useState(false);
  const [flowStep, setFlowStep] = useState(-1);
  const [logs, setLogs] = useState<string[]>([]);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flowTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const insideZone = personX > 42 && personX < 72;

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    if (insideZone) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (!motionDetected) {
        setMotionDetected(true);
        setFlowStep(0);
        flowTimers.current.forEach(clearTimeout);
        flowTimers.current = FLOW_NODES.map((_, i) =>
          setTimeout(() => setFlowStep(i), i * 600)
        );
        setLogs(prev => [...prev.slice(-14),
          '> PIR: HIGH — motion detected',
          '> digitalWrite(LED, HIGH)',
        ]);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        setMotionDetected(false);
        setFlowStep(-1);
        setLogs(prev => [...prev.slice(-14),
          '> PIR: LOW — area clear',
          '> digitalWrite(LED, LOW)',
        ]);
      }, 1200);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [insideZone]);

  useEffect(() => {
    return () => { flowTimers.current.forEach(clearTimeout); };
  }, []);

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          👁️ PIR Motion Explorer — Event-Based Detection
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Drag the slider to move the person through the room.
          When they enter the detection zone the PIR fires — watch the
          execution flow and serial log respond instantly.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">

        {/* Left: room scene */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#2E4862] px-4 py-2.5 flex-shrink-0">
            <p className="text-xs font-semibold text-white">Smart Room</p>
          </div>

          {/* Scene */}
          <div className="relative flex-1 min-h-[240px] bg-slate-800 overflow-hidden">

            {/* Ambient light overlay */}
            <div className={`absolute inset-0 transition-all duration-700 ${
              motionDetected ? 'bg-amber-400/15' : 'bg-black/30'
            }`} />

            {/* Detection zone */}
            <div className={`absolute top-0 bottom-0 border-x-2 transition-all duration-300 ${
              motionDetected
                ? 'border-red-400 bg-red-500/10'
                : 'border-cyan-400/60 bg-cyan-500/5'
            }`} style={{ left: '42%', width: '30%' }}>
              {SCAN_LINES.map(top => (
                <div
                  key={top}
                  className={`absolute left-0 right-0 h-px animate-pulse ${
                    motionDetected ? 'bg-red-400/50' : 'bg-cyan-400/20'
                  }`}
                  style={{ top: `${top}%`, animationDelay: `${top * 0.04}s` }}
                />
              ))}
              <p className={`absolute bottom-2 left-0 right-0 text-center text-[9px] font-bold ${
                motionDetected ? 'text-red-400' : 'text-cyan-400/60'
              }`}>ZONE</p>
            </div>

            {/* PIR sensor at top */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
              <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-lg transition-all duration-300 ${
                motionDetected
                  ? 'bg-red-100 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.7)]'
                  : 'bg-slate-700 border-cyan-400/60'
              }`}>
                📡
              </div>
              <span className="text-[8px] text-slate-400">PIR</span>
            </div>

            {/* LED indicator */}
            <div className="absolute top-3 right-3 flex flex-col items-center gap-1">
              <div className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                motionDetected
                  ? 'bg-amber-400 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.8)]'
                  : 'bg-slate-600 border-slate-500'
              }`} />
              <span className="text-[8px] text-slate-400">LED</span>
            </div>

            {/* Person */}
            <div
              className="absolute bottom-6 text-3xl transition-all duration-200 select-none"
              style={{ left: `${personX}%` }}
            >
              🚶
            </div>
          </div>

          {/* Slider */}
          <div className="p-3 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 mb-1.5">Move person through room</p>
            <input
              type="range" min={0} max={90} value={personX}
              onChange={e => setPersonX(Number(e.target.value))}
              className="w-full accent-[#2E4862] cursor-pointer"
            />

            {/* State badge */}
            <div className={`mt-2 rounded-lg px-3 py-1.5 text-center text-xs font-bold border-2 transition-all ${
              motionDetected
                ? 'bg-red-50 border-red-300 text-red-700'
                : 'bg-gray-50 border-gray-200 text-gray-400'
            }`}>
              PIR: {motionDetected ? 'HIGH — Motion Detected' : 'LOW — No Motion'}
            </div>
          </div>
        </div>

        {/* Middle: event flow */}
        <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[#2E4862] px-4 py-2.5 flex-shrink-0">
            <p className="text-xs font-semibold text-white">Event Flow</p>
          </div>
          <div className="flex-1 p-4 flex flex-col justify-center gap-2">
            {FLOW_NODES.map((node, i) => (
              <React.Fragment key={i}>
                <div className={`px-3 py-2.5 rounded-xl border-2 text-center text-[10px] font-semibold transition-all duration-300 ${
                  flowStep >= i
                    ? 'bg-[#2E4862] text-white border-[#2E4862] scale-[1.02]'
                    : 'bg-gray-50 text-gray-400 border-gray-100'
                }`}>
                  {node}
                </div>
                {i < FLOW_NODES.length - 1 && (
                  <div className={`text-center text-xs leading-none transition-colors duration-300 ${
                    flowStep > i ? 'text-[#2E4862]' : 'text-gray-200'
                  }`}>↓</div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className={`mx-4 mb-4 rounded-lg px-3 py-2 text-[10px] font-semibold text-center border transition-all ${
            motionDetected
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-gray-50 border-gray-100 text-gray-400'
          }`}>
            {motionDetected ? '🚨 System reacting' : '⏸ Waiting for motion...'}
          </div>
        </div>

        {/* Right: serial monitor */}
        <div className="rounded-xl overflow-hidden border border-gray-800 flex flex-col">
          <div className="bg-gray-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
            <span className="text-xs font-semibold text-white">Serial Monitor</span>
            <span className="flex items-center gap-1 text-[10px] text-green-400">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
              Live
            </span>
          </div>
          <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 h-[300px] overflow-y-auto flex flex-col gap-0.5">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic">Move the person into the zone...</span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={
                  i >= logs.length - 2 ? 'text-green-300' : 'opacity-40 text-green-600'
                }>{l}</div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>

      </div>

    </div>
  );
}