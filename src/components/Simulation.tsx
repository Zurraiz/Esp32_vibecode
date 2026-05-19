'use client';

import { useEffect, useState } from "react";

// ─── Simulated Sensor Generators ─────────────────────────────────────

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// ─── Main System ─────────────────────────────────────────────────────

export default function SmartHomeFusionInteractive() {

  const [motion, setMotion] = useState(false);
  const [temp, setTemp] = useState(28);
  const [gas, setGas] = useState(10);

  const [state, setState] = useState("SAFE");
  const [buzzer, setBuzzer] = useState("OFF");
  const [pulse, setPulse] = useState(false);

  const [doorLocked, setDoorLocked] = useState(true);

  // ─── Sensor Simulation Loop ───────────────────────────────────────

  useEffect(() => {

    const interval = setInterval(() => {

      // Motion flickers (like real PIR sensor)
      const m = Math.random() > 0.55;
      setMotion(m);

      // Temperature slowly drifts
      setTemp(t => clamp(t + (Math.random() * 4 - 2), 20, 80));

      // Gas fluctuates with spikes
      setGas(g => clamp(g + (Math.random() * 10 - 5), 0, 100));

    }, 1200);

    return () => clearInterval(interval);

  }, []);

  // ─── Decision Engine (Multi-Sensor Fusion) ────────────────────────

  useEffect(() => {

    const danger =
      (motion && gas > 65) ||
      (temp > 70 && gas > 50) ||
      (motion && temp > 75);

    const warning =
      motion || gas > 45 || temp > 55;

    let newState = "SAFE";
    let newBuzzer = "OFF";

    if (danger) {
      newState = "DANGER";
      newBuzzer = "FAST";
      setDoorLocked(true);
    }
    else if (warning) {
      newState = "WARNING";
      newBuzzer = "SLOW";
    }
    else {
      newState = "SAFE";
      newBuzzer = "OFF";
      setDoorLocked(false);
    }

    setState(newState);
    setBuzzer(newBuzzer);

  }, [motion, temp, gas]);

  // ─── Buzzer Pulse Animation ───────────────────────────────────────

  useEffect(() => {

    if (buzzer === "OFF") {
      setPulse(false);
      return;
    }

    const interval = setInterval(() => {
      setPulse(p => !p);
    }, buzzer === "FAST" ? 120 : 500);

    return () => clearInterval(interval);

  }, [buzzer]);

  // ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Smart Home Sensor Fusion Lab
        </h1>
        <p className="text-slate-500">
          Multi-sensor decision system with live environmental simulation
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* ─── HOUSE VISUAL ───────────────────────────────────────── */}
        <div className="bg-white border rounded-3xl p-6 space-y-4">

          <h2 className="text-xl font-bold">Smart House</h2>

          <div className={`relative h-64 rounded-2xl overflow-hidden border flex items-center justify-center transition-all ${state === "DANGER"
              ? "bg-red-500/20"
              : state === "WARNING"
                ? "bg-yellow-400/20"
                : "bg-green-400/20"
            }`}>

            {/* Door */}
            <div className={`absolute bottom-6 w-20 h-32 rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all ${doorLocked ? "bg-red-500 text-white border-red-700" : "bg-green-500 text-white border-green-700"
              }`}>
              {doorLocked ? "LOCKED" : "OPEN"}
            </div>

            {/* Motion indicator */}
            <div className={`absolute top-6 text-sm font-bold ${motion ? "text-red-600 animate-pulse" : "text-slate-400"
              }`}>
              🚶 Motion: {motion ? "DETECTED" : "NONE"}
            </div>

            {/* Buzzer visual */}
            {buzzer !== "OFF" && (
              <div className={`absolute inset-0 flex items-center justify-center ${pulse ? "opacity-100" : "opacity-30"
                }`}>
                <div className="text-5xl">🔊</div>
              </div>
            )}

            {/* State label */}
            <div className="absolute bottom-2 text-xs font-mono text-slate-600">
              STATE: {state}
            </div>

          </div>

          {/* Sensor sliders (manual override for learning) */}
          <div className="space-y-3">

            <Slider label="Temperature" value={temp} setValue={setTemp} max={90} />
            <Slider label="Gas Level" value={gas} setValue={setGas} max={100} />
            <Toggle label="Force Motion Sensor" value={motion} setValue={setMotion} />

          </div>

        </div>

        {/* ─── SENSOR PANEL ───────────────────────────────────────── */}
        <div className="bg-white border rounded-3xl p-6 space-y-4">

          <h2 className="text-xl font-bold">Live Sensors</h2>

          <Sensor label="Motion" value={motion ? "DETECTED" : "CLEAR"} />
          <Sensor label="Temperature" value={`${temp.toFixed(1)} °C`} />
          <Sensor label="Gas Level" value={`${gas.toFixed(1)} ppm`} />

          <div className="p-4 bg-slate-900 text-green-400 rounded-xl text-xs font-mono space-y-1">
            <div>STATE: {state}</div>
            <div>BUZZER: {buzzer}</div>
            <div>LOGIC: Motion + Gas + Temp Fusion</div>
          </div>

        </div>

        {/* ─── LOGIC EXPLANATION ───────────────────────────────────── */}
        <div className="bg-white border rounded-3xl p-6 space-y-4">

          <h2 className="text-xl font-bold">Decision Logic</h2>

          <LogicBlock active={state === "SAFE"}>
            SAFE → all sensors normal
          </LogicBlock>

          <LogicBlock active={state === "WARNING"}>
            WARNING → one sensor abnormal (OR condition)
          </LogicBlock>

          <LogicBlock active={state === "DANGER"}>
            DANGER → multiple dangerous conditions (AND logic)
          </LogicBlock>

          {/* LIVE EXPLANATION */}
          <div className="p-4 bg-slate-950 text-green-400 rounded-xl text-xs font-mono">

            <div className="font-bold mb-2">LIVE EXPLANATION</div>

            {state === "SAFE" && "System is stable. No hazardous readings detected."}

            {state === "WARNING" && "One or more sensors show abnormal values. System increases alert level."}

            {state === "DANGER" && "Multiple sensors confirm danger. Emergency protocol activated."}

          </div>

        </div>

      </div>
    </div>
  );
}

// ─── UI COMPONENTS ─────────────────────────────────────────────────

function Sensor({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between p-3 bg-slate-50 border rounded-xl">
      <span className="text-slate-600">{label}</span>
      <span className="font-bold text-slate-800">{value}</span>
    </div>
  );
}

function LogicBlock({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <div className={`p-3 rounded-xl border transition-all ${active
        ? "bg-cyan-100 border-cyan-400 text-cyan-700 font-bold"
        : "bg-slate-50 border-slate-200 text-slate-500"
      }`}>
      {children}
    </div>
  );
}

function Toggle({ label, value, setValue }: { label: string; value: boolean; setValue: (v: boolean) => void }) {
  return (
    <div
      onClick={() => setValue(!value)}
      className={`p-3 rounded-xl border cursor-pointer ${value
          ? "bg-green-100 border-green-400 text-green-700 font-bold"
          : "bg-slate-50 border-slate-200 text-slate-600"
        }`}
    >
      {label}
    </div>
  );
}

function Slider({ label, value, setValue, max }: { label: string; value: number; setValue: (v: number) => void; max: number }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-slate-600 flex justify-between">
        <span>{label}</span>
        <span>{value.toFixed(0)}</span>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-cyan-500"
      />
    </div>
  );
}