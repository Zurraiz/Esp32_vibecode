import React from 'react';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { HardwarePeripheral } from '@/lib/hardwareParser';

interface HardwareBoardProps {
  peripherals: HardwarePeripheral[];
}

/**
 * A hardcoded map of the physical pin layout on an ESP32 WROOM-32 board.
 * Provides X/Y coordinates aligned with the Breadboard component's grid.
 */
const PIN_MAP: Record<number, { x: number; y: number; side: 'left' | 'right' }> = {
  // Left side pins (top to bottom) - Col B (x=57)
  36: { x: 57, y: 65, side: 'left' },
  39: { x: 57, y: 75, side: 'left' },
  34: { x: 57, y: 85, side: 'left' },
  35: { x: 57, y: 95, side: 'left' },
  32: { x: 57, y: 105, side: 'left' },
  33: { x: 57, y: 115, side: 'left' },
  25: { x: 57, y: 125, side: 'left' },
  26: { x: 57, y: 135, side: 'left' },
  27: { x: 57, y: 145, side: 'left' },
  14: { x: 57, y: 155, side: 'left' },
  12: { x: 57, y: 165, side: 'left' },
  13: { x: 57, y: 175, side: 'left' },
  9:  { x: 57, y: 185, side: 'left' },
  10: { x: 57, y: 195, side: 'left' },
  11: { x: 57, y: 205, side: 'left' },

  // Right side pins (top to bottom) - Col I (x=161)
  23: { x: 161, y: 65, side: 'right' },
  22: { x: 161, y: 75, side: 'right' },
  1:  { x: 161, y: 85, side: 'right' }, // TX
  3:  { x: 161, y: 95, side: 'right' }, // RX
  21: { x: 161, y: 105, side: 'right' },
  19: { x: 161, y: 115, side: 'right' },
  18: { x: 161, y: 125, side: 'right' },
  5:  { x: 161, y: 135, side: 'right' },
  17: { x: 161, y: 145, side: 'right' },
  16: { x: 161, y: 155, side: 'right' },
  4:  { x: 161, y: 165, side: 'right' },
  0:  { x: 161, y: 175, side: 'right' },
  2:  { x: 161, y: 185, side: 'right' },
  15: { x: 161, y: 195, side: 'right' },
  8:  { x: 161, y: 205, side: 'right' },
};

const getPinLoc = (pin: number) => {
  if (PIN_MAP[pin]) return PIN_MAP[pin];
  return { x: 110, y: 230, side: 'bottom' };
};

export default function HardwareBoard({ peripherals }: HardwareBoardProps) {
  const pins = useSimulatorStore((state) => state.pins);
  const setPin = useSimulatorStore((state) => state.setPin);

  return (
    <div className="w-full h-full relative bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center p-6 border border-gray-700/50">
      <svg className="w-full h-full" viewBox="-80 0 380 340" preserveAspectRatio="xMidYMid meet">
        {/* Subtle background glow */}
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1e1e1e" stopOpacity="0" />
        </radialGradient>
        <rect x="-80" y="0" width="380" height="340" fill="url(#bgGlow)" />

        {/* Breadboard */}
        <g transform="translate(0, 10)">
          {/* Breadboard base */}
          <rect width="220" height="300" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1" />

          {/* Center divider */}
          <rect x="98" y="10" width="24" height="280" fill="#d1d5db" />

          {/* Left hole columns (A-E) */}
          {Array.from({ length: 30 }, (_, row) =>
            Array.from({ length: 5 }, (_, col) => (
              <circle
                key={`l-${row}-${col}`}
                cx={15 + col * 10}
                cy={20 + row * 10}
                r="2"
                fill="#9ca3af"
              />
            ))
          )}

          {/* Right hole columns (F-J) */}
          {Array.from({ length: 30 }, (_, row) =>
            Array.from({ length: 5 }, (_, col) => (
              <circle
                key={`r-${row}-${col}`}
                cx={125 + col * 10}
                cy={20 + row * 10}
                r="2"
                fill="#9ca3af"
              />
            ))
          )}

          {/* Power rail lines */}
          <line x1="5" y1="5" x2="5" y2="295" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" />
          <line x1="215" y1="5" x2="215" y2="295" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,2" />
        </g>

        {/* Wires */}
        {peripherals.map((p, i) => {
          const loc = getPinLoc(p.pin);
          const isLeft = loc.side === 'left';
          // Peripherals are placed outside the breadboard
          const px = isLeft ? -50 : 270;
          const py = loc.y;

          const pinData = pins[p.pin];
          const pinVal = pinData?.value || 0;
          let strokeColor = '#4b5563';
          let strokeOpacity = 0.8;

          if (pinVal > 0) {
            strokeColor = '#ef4444';
            if (pinData?.mode === 'pwm' && pinVal <= 255) {
              strokeOpacity = Math.max(0.4, pinVal / 255);
            }
          }

          // Use a more realistic wire path (connecting to the hole NEXT to the pin)
          const holeX = isLeft ? loc.x - 12 : loc.x + 12; // Col A or Col J
          const wirePath = `M ${px} ${py} L ${px + (isLeft ? 10 : -10)} ${py} C ${px + (isLeft ? 30 : -30)} ${py}, ${holeX} ${py + 20}, ${holeX} ${py}`;

          return (
            <g key={`wire-group-${i}`}>
              <path
                d={wirePath}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeOpacity={strokeOpacity}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              {/* Little "plug" at the breadboard hole */}
              <circle cx={holeX} cy={py} r="2.5" fill={strokeColor} />
            </g>
          );
        })}

        {/* ESP32 Board - Placed on the Breadboard */}
        <g transform="translate(52, 50)">
          {/* Base board (black PCB) */}
          <rect width="116" height="170" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1" className="shadow-lg" />

          {/* Main ESP32 Module */}
          <rect x="25" y="20" width="66" height="70" rx="3" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <path d="M 25 35 L 91 35 M 25 50 L 91 50 M 25 65 L 91 65" stroke="#334155" strokeWidth="0.5" />

          <text x="58" y="55" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">ESP32</text>
          <text x="58" y="68" fill="#64748b" fontSize="6" textAnchor="middle" fontFamily="monospace">WROOM-32D</text>

          {/* Gold Antenna */}
          <path d="M 35 5 L 35 15 L 45 15 L 45 5 L 55 5 L 55 15 L 65 15 L 65 5 L 75 5 L 75 15 L 81 15" fill="none" stroke="#d4af37" strokeWidth="1.5" />

          {/* Micro USB Port */}
          <rect x="43" y="155" width="30" height="15" rx="1" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="0.5" />

          {/* Buttons (Boot & EN) */}
          <rect x="10" y="145" width="12" height="12" rx="2" fill="#334155" />
          <circle cx="16" cy="151" r="3" fill="#475569" />
          <rect x="94" y="145" width="12" height="12" rx="2" fill="#334155" />
          <circle cx="100" cy="151" r="3" fill="#475569" />

          {/* Pins (Visual only) */}
          {Object.entries(PIN_MAP).map(([pin, loc]) => {
            const isLeft = loc.side === 'left';
            return (
              <rect
                key={`p-pin-${pin}`}
                x={isLeft ? 5 : 106}
                y={loc.y - 50 - 2}
                width="5"
                height="4"
                fill="#fbbf24"
                rx="0.5"
              />
            );
          })}
        </g>

        {/* Peripherals */}
        {peripherals.map((p, i) => {
          const loc = getPinLoc(p.pin);
          const isLeft = loc.side === 'left';
          const px = isLeft ? -50 : 270;
          const py = loc.y;
          const pinState = pins[p.pin]?.value || 0;

          return (
            <g key={`peripheral-${i}`} transform={`translate(${px}, ${py})`}>
              {p.type === 'LED' && (
                <g>
                  {/* LED Component */}
                  <path d="M -8 10 L -8 -5 A 8 8 0 0 1 8 -5 L 8 10 Z" fill={pinState > 0 ? '#ef4444' : '#4b5563'} opacity={pinState > 0 ? Math.max(0.4, pinState / 255) : 0.8} />
                  <rect x="-10" y="10" width="20" height="3" fill="#94a3b8" />
                  {pinState > 0 && (
                    <circle cx="0" cy="0" r="15" fill="url(#ledGlow)" className="animate-pulse" />
                  )}
                  <text y="25" fill="#94a3b8" fontSize="8" textAnchor="middle" fontWeight="bold">LED</text>

                  <defs>
                    <radialGradient id="ledGlow">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </g>
              )}

              {p.type === 'SERVO' && (
                <g transform="scale(0.8)">
                  <rect x="-20" y="-20" width="40" height="40" rx="4" fill="#1e40af" stroke="#1e3a8a" strokeWidth="2" />
                  <circle cx="0" cy="0" r="12" fill="#3b82f6" />
                  <g transform={`rotate(${Math.min(180, Math.max(0, pinState)) - 90})`} className="transition-transform duration-300">
                    <rect x="-2" y="-15" width="4" height="30" rx="2" fill="white" />
                    <circle cx="0" cy="0" r="4" fill="#1e40af" />
                  </g>
                  <text y="35" fill="#94a3b8" fontSize="10" textAnchor="middle">Servo</text>
                </g>
              )}

              {p.type === 'BUZZER' && (
                <g>
                  <circle r="15" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  <circle r="4" fill="#334155" />
                  {pinState > 0 && (
                    <g className="animate-ping">
                      <circle r="20" fill="none" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
                    </g>
                  )}
                  <text y="28" fill="#94a3b8" fontSize="8" textAnchor="middle">Buzzer</text>
                </g>
              )}

              {p.type === 'BUTTON' && (
                <g
                  onClick={() => setPin(p.pin, pinState === 1 ? 0 : 1)}
                  className="cursor-pointer group"
                >
                  <rect x="-15" y="-15" width="30" height="30" rx="6" fill="#334155" stroke="#475569" strokeWidth="2" className="group-hover:stroke-blue-400 transition-colors" />
                  <circle r="10" fill={pinState === 1 ? '#ef4444' : '#1e293b'} className="transition-colors duration-100" />
                  <text y="28" fill="#94a3b8" fontSize="8" textAnchor="middle">Button</text>
                </g>
              )}

              {/* Generic fallback for other types */}
              {!['LED', 'SERVO', 'BUZZER', 'BUTTON'].includes(p.type) && (
                <g>
                  <rect x="-15" y="-15" width="30" height="30" rx="4" fill="#334155" stroke="#475569" strokeWidth="2" />
                  <text y="5" fill="#94a3b8" fontSize="6" textAnchor="middle">{p.type}</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}