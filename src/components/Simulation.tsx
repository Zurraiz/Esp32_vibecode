'use client';

import React, { useEffect, useRef, useState } from 'react';

const loopSteps = [
  "loop() triggered",
  "Reading sensor value...",
  "Processing input...",
  "Serial output generated",
];

export default function SerialGearDialFinal() {
  const [sensor, setSensor] = useState(50);
  const [stepIndex, setStepIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const setupDone = useRef(false);

  // ✅ RUN SETUP ONLY ONCE
  useEffect(() => {
    if (!setupDone.current) {
      const time = new Date().toLocaleTimeString();

      setLogs([
        `[${time}] setup() started`,
        `[${time}] Serial.begin(115200) initialized`,
      ]);

      setupDone.current = true;
    }
  }, []);

  // LOOP simulation (NO setup here anymore)
  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % loopSteps.length);

      const time = new Date().toLocaleTimeString();

      setLogs((prev) => {
        const newLog = `[${time}] SENSOR:${sensor} → loop cycle OK`;
        return [newLog, ...prev].slice(0, 12);
      });
    }, 900);

    return () => clearInterval(interval);
  }, [sensor]);

  const rotation = (sensor / 100) * 360;

  return (
    <div className="bg-white border rounded-xl p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h3 className="text-sm font-bold text-gray-800">
          Serial Communication — Correct ESP32 Execution Model
        </h3>
        <p className="text-xs text-gray-500">
          setup() runs once, loop() runs continuously
        </p>
      </div>

      {/* GEAR SENSOR */}
      <div className="bg-gray-50 border rounded-xl p-6 flex flex-col items-center space-y-4">

        <div className="text-xs text-gray-600">
          Sensor Gear (0–100)
        </div>

        <div className="relative w-32 h-32 flex items-center justify-center">

          <div
            className="text-7xl transition-transform duration-200"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            ⚙️
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sensor}
            onChange={(e) => setSensor(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        <div className="text-lg font-bold text-[#2E4862]">
          {sensor}
        </div>

      </div>

      {/* SYSTEM PANELS */}
      <div className="grid grid-cols-2 gap-4">

        {/* LOOP TRACE (NO SETUP HERE) */}
        <div className="bg-gray-900 text-green-400 font-mono text-xs rounded-xl p-4 h-72 overflow-hidden">

          <div className="text-gray-500 mb-2">// LOOP EXECUTION TRACE</div>

          {loopSteps.map((step, i) => (
            <div
              key={i}
              className={`py-1 transition-all ${
                i === stepIndex ? "text-yellow-300 font-bold" : "opacity-40"
              }`}
            >
              {i === stepIndex ? ">> " : "   "}
              {step}
            </div>
          ))}
        </div>

        {/* SERIAL MONITOR */}
        <div className="bg-black text-green-400 font-mono text-xs rounded-xl p-4 h-72 overflow-y-auto">

          <div className="text-gray-500 mb-2">
            --- SERIAL MONITOR (115200 baud) ---
          </div>

          {logs.map((log, i) => (
            <div key={i} className="py-1 border-b border-gray-800">
              {">"} {log}
            </div>
          ))}

        </div>

      </div>

      {/* STATE */}
      <div className="bg-gray-50 border rounded-lg p-3 text-xs font-mono flex justify-between">
        <span>SENSOR: {sensor}</span>
        <span className="text-emerald-600">LOOP RUNNING</span>
      </div>

      {/* FINAL INSIGHT */}
      <div className="bg-blue-50 border border-blue-100 rounded p-3 text-xs text-blue-700">
        In real ESP32 systems, setup() runs once to initialize hardware, while loop() runs continuously. Serial output reflects only runtime behavior, not initialization repeats.
      </div>

    </div>
  );
}