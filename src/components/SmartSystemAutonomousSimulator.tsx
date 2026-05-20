'use client';

import React, { useEffect, useRef, useState } from 'react';

type SystemState = 'idle' | 'alert' | 'high-alert';

const ZONE_LEFT  = 35;
const ZONE_RIGHT = 65;
const DANGER_DIST = 50; // cm — maps to zone width visually

const INITIAL = [
  { id: 'person', emoji: '🚶', x: 8,  speed: 0.6,  y: 58 },
  { id: 'cat',    emoji: '🐈', x: 70, speed: -0.9, y: 35 },
];

const STATE_COLOR: Record<SystemState, string> = {
  'idle': '#22c55e', 'alert': '#f59e0b', 'high-alert': '#ef4444',
};
const STATE_LABEL: Record<SystemState, string> = {
  'idle': 'IDLE', 'alert': 'ALERT', 'high-alert': 'HIGH ALERT',
};

function getState(motion: boolean, distance: number): SystemState {
  if (!motion) return 'idle';
  if (distance < DANGER_DIST) return 'high-alert';
  return 'alert';
}

export default function SmartSystemAutonomousSimulator() {
  const [entities, setEntities] = useState(INITIAL);
  const [sysState, setSysState] = useState<SystemState>('idle');
  const [distance, setDistance] = useState(100);
  const [logs, setLogs] = useState<string[]>([]);
  const entitiesRef  = useRef(INITIAL.map(e => ({ ...e })));
  const prevStateRef = useRef<SystemState>('idle');
  const logEndRef    = useRef<HTMLDivElement>(null);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  useEffect(() => {
    const interval = setInterval(() => {
      entitiesRef.current = entitiesRef.current.map(e => {
        let nx = e.x + e.speed;
        let ns = e.speed;
        if (nx > 88 || nx < 2) { ns = -ns; nx = Math.max(2, Math.min(88, nx)); }
        return { ...e, x: nx, speed: ns };
      });

      const inZone = entitiesRef.current.filter(
        e => e.x > ZONE_LEFT && e.x < ZONE_RIGHT
      );
      const motion = inZone.length > 0;

      // Distance = how deep into zone the closest entity is (mapped to cm)
      let dist = 100;
      if (inZone.length > 0) {
        const midZone = (ZONE_LEFT + ZONE_RIGHT) / 2;
        const closest = inZone.reduce((a, b) =>
          Math.abs(a.x - midZone) < Math.abs(b.x - midZone) ? a : b
        );
        // Deeper into zone = closer = smaller distance
        dist = Math.round(100 - ((ZONE_RIGHT - closest.x) / (ZONE_RIGHT - ZONE_LEFT)) * 80);
      }

      const state = getState(motion, dist);
      setDistance(dist);
      setEntities([...entitiesRef.current]);
      setSysState(state);

      if (state !== prevStateRef.current) {
        prevStateRef.current = state;
        setLogs(prev => [
          ...prev.slice(-22),
          `> motion = ${motion ? 'HIGH' : 'LOW'}, distance = ${dist} cm`,
          `> → ${STATE_LABEL[state]}`,
          '─────────────',
        ]);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const color = STATE_COLOR[sysState];

  return (
    <div className="h-full flex flex-col gap-3 p-1">

      {/* Scene */}
      <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
        <div className="bg-[#2E4862] px-4 py-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-white">Autonomous Smart System</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-bold" style={{ color }}>{STATE_LABEL[sysState]}</span>
          </div>
        </div>

        {/* Room */}
        <div className="relative bg-slate-800 overflow-hidden" style={{ height: '140px' }}>
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{ backgroundColor: `${color}15` }}
          />

          {/* PIR zone */}
          <div
            className="absolute top-0 bottom-0 border-x-2 transition-all duration-300"
            style={{
              left: `${ZONE_LEFT}%`,
              width: `${ZONE_RIGHT - ZONE_LEFT}%`,
              borderColor: `${color}90`,
              backgroundColor: `${color}08`,
            }}
          >
            <p className="absolute bottom-1 left-0 right-0 text-center text-[8px] font-bold"
              style={{ color }}>PIR ZONE</p>
          </div>

          {/* PIR sensor */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5">
            <div
              className="w-7 h-7 rounded-lg border-2 flex items-center justify-center text-sm transition-all"
              style={{
                backgroundColor: sysState !== 'idle' ? `${color}25` : '#1e293b',
                borderColor: sysState !== 'idle' ? color : 'rgba(34,211,238,0.5)',
                boxShadow: sysState !== 'idle' ? `0 0 10px ${color}60` : 'none',
              }}
            >📡</div>
          </div>

          {/* Entities */}
          {entities.map(e => (
            <div key={e.id} className="absolute text-2xl select-none"
              style={{
                left: `${e.x}%`,
                top: `${e.y}%`,
                transform: e.speed < 0 ? 'scaleX(-1)' : 'none',
                transition: 'left 60ms linear',
              }}>
              {e.emoji}
            </div>
          ))}
        </div>

        {/* Status row */}
        <div className="px-3 py-2 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[8px] text-gray-400">PIR</p>
            <p className={`text-[10px] font-bold font-mono ${sysState !== 'idle' ? 'text-red-500' : 'text-gray-300'}`}>
              {sysState !== 'idle' ? 'HIGH' : 'LOW'}
            </p>
          </div>
          <div>
            <p className="text-[8px] text-gray-400">Distance</p>
            <p className="text-[10px] font-bold font-mono text-[#2E4862]">{distance} cm</p>
          </div>
          <div>
            <p className="text-[8px] text-gray-400">State</p>
            <p className="text-[10px] font-bold" style={{ color }}>{STATE_LABEL[sysState]}</p>
          </div>
        </div>
      </div>

      {/* Serial */}
      <div className="rounded-xl overflow-hidden border border-gray-800 flex flex-col flex-1 min-h-0">
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between flex-shrink-0">
          <span className="text-xs font-semibold text-white">Serial Monitor</span>
          <span className="flex items-center gap-1 text-[10px] text-green-400">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
            Live
          </span>
        </div>
        <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400 overflow-y-auto flex flex-col gap-0.5 flex-1">
          {logs.length === 0
            ? <span className="text-gray-500 italic">Waiting for state change...</span>
            : logs.map((l, i) => (
              <div key={i} className={
                l.startsWith('─') ? 'text-gray-700'
                : l.includes('HIGH ALERT') ? (i >= logs.length - 3 ? 'text-red-400' : 'opacity-40 text-red-700')
                : l.includes('ALERT') ? (i >= logs.length - 3 ? 'text-amber-400' : 'opacity-40 text-amber-700')
                : i >= logs.length - 3 ? 'text-green-300'
                : 'opacity-40 text-green-600'
              }>{l}</div>
            ))}
          <div ref={logEndRef} />
        </div>
      </div>

    </div>
  );
}