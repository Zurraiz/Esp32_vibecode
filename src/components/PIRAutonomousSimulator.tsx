'use client';

import React, { useEffect, useRef, useState } from 'react';

const ZONE_LEFT = 38;
const ZONE_RIGHT = 68;
const SCAN_LINES = [0, 20, 40, 60, 80];

type Entity = {
  id: string;
  emoji: string;
  x: number;
  speed: number; // % per tick, positive = right
  y: number;    // fixed vertical position %
};

const INITIAL_ENTITIES: Entity[] = [
  { id: 'person', emoji: '🚶', x: 5,  speed: 0.8,  y: 62 },
  { id: 'cat',    emoji: '🐈', x: 55, speed: -1.2, y: 44 },
  { id: 'robot',  emoji: '🤖', x: 80, speed: -0.5, y: 26 },
];

const SCAN_INTERVAL = 50; // ms per physics tick

export default function PIRAutonomousSimulator() {
  const [entities, setEntities] = useState<Entity[]>(INITIAL_ENTITIES);
  const [motionDetected, setMotionDetected] = useState(false);
  const [ledOn, setLedOn] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [activeEntity, setActiveEntity] = useState<string | null>(null);
  const entitiesRef = useRef(INITIAL_ENTITIES.map(e => ({ ...e })));
  const logEndRef = useRef<HTMLDivElement>(null);
  const prevMotionRef = useRef(false);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Move entities, bounce at walls
      entitiesRef.current = entitiesRef.current.map(e => {
        let nx = e.x + e.speed;
        let ns = e.speed;
        if (nx > 88 || nx < 2) {
          ns = -ns;
          nx = Math.max(2, Math.min(88, nx));
        }
        return { ...e, x: nx, speed: ns };
      });

      // Check zone
      const inZone = entitiesRef.current.filter(
        e => e.x > ZONE_LEFT && e.x < ZONE_RIGHT
      );
      const detected = inZone.length > 0;
      const trigger = detected !== prevMotionRef.current;
      prevMotionRef.current = detected;

      setEntities([...entitiesRef.current]);
      setMotionDetected(detected);
      setLedOn(detected);
      setActiveEntity(detected ? (inZone[0]?.id ?? null) : null);

      if (trigger) {
        setLogs(prev => [
          ...prev.slice(-22),
          detected
            ? `> motion = HIGH — ${inZone[0]?.emoji} in zone`
            : '> motion = LOW — zone clear',
          detected
            ? '> digitalWrite(LED, HIGH)'
            : '> digitalWrite(LED, LOW)',
          '─────────────',
        ]);
      }
    }, SCAN_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col gap-3 p-1">

      {/* Room scene */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
        <div className="bg-[#2E4862] px-4 py-2">
          <p className="text-xs font-semibold text-white">Autonomous PIR Room</p>
        </div>

        {/* Scene */}
        <div className="relative bg-slate-800 overflow-hidden" style={{ height: '180px' }}>

          {/* Light overlay */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            ledOn ? 'bg-amber-400/15' : 'bg-black/30'
          }`} />

          {/* Detection zone */}
          <div
            className={`absolute top-0 bottom-0 border-x-2 transition-all duration-300 ${
              motionDetected
                ? 'border-red-400 bg-red-500/10'
                : 'border-cyan-400/60 bg-cyan-500/5'
            }`}
            style={{ left: `${ZONE_LEFT}%`, width: `${ZONE_RIGHT - ZONE_LEFT}%` }}
          >
            {SCAN_LINES.map(top => (
              <div
                key={top}
                className={`absolute left-0 right-0 h-px animate-pulse ${
                  motionDetected ? 'bg-red-400/50' : 'bg-cyan-400/20'
                }`}
                style={{ top: `${top}%`, animationDelay: `${top * 0.04}s` }}
              />
            ))}
            <p className={`absolute bottom-1 left-0 right-0 text-center text-[8px] font-bold ${
              motionDetected ? 'text-red-400' : 'text-cyan-400/60'
            }`}>ZONE</p>
          </div>

          {/* PIR sensor */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
            <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center text-sm transition-all duration-300 ${
              motionDetected
                ? 'bg-red-100 border-red-400 shadow-[0_0_14px_rgba(239,68,68,0.7)]'
                : 'bg-slate-700 border-cyan-400/60'
            }`}>📡</div>
            <span className="text-[7px] text-slate-400">PIR</span>
          </div>

          {/* LED */}
          <div className="absolute top-2 right-3 flex flex-col items-center gap-0.5">
            <div className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
              ledOn
                ? 'bg-amber-400 border-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.8)]'
                : 'bg-slate-600 border-slate-500'
            }`} />
            <span className="text-[7px] text-slate-400">LED</span>
          </div>

          {/* Entities */}
          {entities.map(e => (
            <div
              key={e.id}
              className="absolute text-2xl transition-none select-none"
              style={{
                left: `${e.x}%`,
                top: `${e.y}%`,
                transform: e.speed < 0 ? 'scaleX(-1)' : 'none',
                filter: activeEntity === e.id ? 'drop-shadow(0 0 6px rgba(239,68,68,0.9))' : 'none',
              }}
            >
              {e.emoji}
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
          <div className={`text-xs font-bold ${motionDetected ? 'text-red-600' : 'text-gray-400'}`}>
            PIR: {motionDetected ? `HIGH — ${activeEntity} detected` : 'LOW — No Motion'}
          </div>
          <div className={`text-xs font-bold ${ledOn ? 'text-amber-500' : 'text-gray-300'}`}>
            LED: {ledOn ? 'ON' : 'OFF'}
          </div>
        </div>
      </div>

      {/* Serial monitor */}
      <div className="rounded-xl overflow-hidden border border-gray-800 flex flex-col flex-1 min-h-0">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between flex-shrink-0">
          <span className="text-xs font-semibold text-white">Serial Monitor</span>
          <span className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
            Live
          </span>
        </div>
        <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 overflow-y-auto flex flex-col gap-0.5 flex-1">
          {logs.length === 0 ? (
            <span className="text-gray-500 italic">Waiting for motion events...</span>
          ) : (
            logs.map((l, i) => (
              <div key={i} className={
                l.startsWith('─')
                  ? 'text-gray-700'
                  : i >= logs.length - 3
                  ? l.includes('HIGH') ? 'text-red-400' : 'text-green-300'
                  : 'opacity-40 text-green-600'
              }>{l}</div>
            ))
          )}
          <div ref={logEndRef} />
        </div>
      </div>

    </div>
  );
}