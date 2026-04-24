import React from 'react';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { HardwarePeripheral } from '@/lib/hardwareParser';

interface HardwareBoardProps {
  peripherals: HardwarePeripheral[];
}

const PIN_MAP: Record<number, { x: number; y: number; side: 'left' | 'right' }> = {
  // Left side pins (top to bottom)
  36: { x: 0, y: 30, side: 'left' },
  39: { x: 0, y: 50, side: 'left' },
  34: { x: 0, y: 70, side: 'left' },
  35: { x: 0, y: 90, side: 'left' },
  32: { x: 0, y: 110, side: 'left' },
  33: { x: 0, y: 130, side: 'left' },
  25: { x: 0, y: 150, side: 'left' },
  26: { x: 0, y: 170, side: 'left' },
  27: { x: 0, y: 190, side: 'left' },
  14: { x: 0, y: 210, side: 'left' },
  12: { x: 0, y: 230, side: 'left' },
  13: { x: 0, y: 250, side: 'left' },
  // Right side pins (top to bottom)
  23: { x: 120, y: 30, side: 'right' },
  22: { x: 120, y: 50, side: 'right' },
  1:  { x: 120, y: 70, side: 'right' }, // TX
  3:  { x: 120, y: 90, side: 'right' }, // RX
  21: { x: 120, y: 110, side: 'right' },
  19: { x: 120, y: 130, side: 'right' },
  18: { x: 120, y: 150, side: 'right' },
  5:  { x: 120, y: 170, side: 'right' },
  17: { x: 120, y: 190, side: 'right' },
  16: { x: 120, y: 210, side: 'right' },
  4:  { x: 120, y: 230, side: 'right' },
  2:  { x: 120, y: 250, side: 'right' },
  15: { x: 120, y: 270, side: 'right' },
};

const getPinLoc = (pin: number) => {
  if (PIN_MAP[pin]) return PIN_MAP[pin];
  // fallback if pin not mapped
  return { x: 60, y: 290, side: 'bottom' };
};

export default function HardwareBoard({ peripherals }: HardwareBoardProps) {
  const pins = useSimulatorStore((state) => state.pins);
  const setPin = useSimulatorStore((state) => state.setPin);

  return (
    <div className="w-full h-full relative bg-[#1e1e1e] rounded-xl overflow-hidden shadow-inner flex items-center justify-center p-4">
      {/* SVG Canvas for drawing wires and the board */}
      <svg className="w-full h-full" viewBox="-75 0 270 310" preserveAspectRatio="xMidYMid meet">
        {/* Wires underneath */}
        {peripherals.map((p, i) => {
          const loc = getPinLoc(p.pin);
          const isLeft = loc.side === 'left';
          const px = isLeft ? -50 : 170; // Peripheral X much closer to board
          const py = loc.y;              // Peripheral Y aligns roughly with pin
          
          const wirePath = `M ${px} ${py} C ${isLeft ? px + 25 : px - 25} ${py}, ${isLeft ? loc.x - 25 : loc.x + 25} ${loc.y}, ${loc.x} ${loc.y}`;
          
          return (
            <path
              key={`wire-${i}`}
              d={wirePath}
              fill="none"
              stroke={pins[p.pin] ? '#ef4444' : '#6b7280'}
              strokeWidth="3"
              className="transition-colors duration-200"
            />
          );
        })}

        {/* ESP32 Board */}
        <g transform="translate(0, 0)">
          {/* Base board */}
          <rect width="120" height="290" rx="6" fill="#111827" stroke="#374151" strokeWidth="2" />
          
          {/* ESP32 Chip */}
          <rect x="20" y="40" width="80" height="90" rx="4" fill="#1f2937" stroke="#4b5563" strokeWidth="1" />
          <text x="60" y="80" fill="#9ca3af" fontSize="10" textAnchor="middle" fontFamily="monospace" fontWeight="bold">ESP32</text>
          <text x="60" y="95" fill="#6b7280" fontSize="8" textAnchor="middle" fontFamily="monospace">WROOM-32</text>

          {/* Wi-Fi Antenna */}
          <path d="M 20 15 L 20 25 L 30 25 L 30 15 L 40 15 L 40 25 L 50 25 L 50 15" fill="none" stroke="#d1d5db" strokeWidth="2" />

          {/* Pins */}
          {Object.entries(PIN_MAP).map(([pin, loc]) => (
            <g key={`pin-${pin}`}>
              <rect x={loc.side === 'left' ? -2 : 118} y={loc.y - 4} width="4" height="8" fill="#fbbf24" />
              <text
                x={loc.side === 'left' ? 10 : 110}
                y={loc.y + 3}
                fill="#9ca3af"
                fontSize="8"
                fontFamily="monospace"
                textAnchor={loc.side === 'left' ? 'start' : 'end'}
              >
                P{pin}
              </text>
            </g>
          ))}
        </g>

        {/* Peripherals */}
        {peripherals.map((p, i) => {
          const loc = getPinLoc(p.pin);
          const isLeft = loc.side === 'left';
          const px = isLeft ? -50 : 170; // Peripheral X much closer to board
          const py = loc.y;
          const pinState = pins[p.pin] || 0;

          if (p.type === 'LED') {
            let ledOpacity = 0;
            if (pinState === 1) ledOpacity = 1;
            else if (pinState > 1) ledOpacity = Math.min(1, pinState / 255);
            const isOn = ledOpacity > 0;

            return (
              <g key={`p-${i}`} transform={`translate(${px}, ${py})`}>
                <circle cx="0" cy="0" r="12" fill={isOn ? '#ef4444' : '#4b5563'} stroke={isOn ? '#fca5a5' : '#1f2937'} strokeWidth="2" opacity={isOn ? ledOpacity : 1} className="transition-all duration-200" />
                {isOn && <circle cx="0" cy="0" r="16" fill="none" stroke="#ef4444" strokeWidth="2" opacity={ledOpacity * 0.5} className="animate-pulse" />}
                <text x="0" y="22" fill="#d1d5db" fontSize="10" textAnchor="middle" fontFamily="sans-serif">LED</text>
              </g>
            );
          }

          if (p.type === 'SERVO') {
            const angle = Math.min(180, Math.max(0, pinState));
            return (
              <g key={`p-${i}`} transform={`translate(${px}, ${py})`}>
                <rect x="-15" y="-15" width="30" height="30" rx="4" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
                <circle cx="0" cy="0" r="10" fill="#1e40af" />
                <g transform={`rotate(${angle - 90})`} className="transition-transform duration-300 ease-out">
                  <line x1="0" y1="0" x2="12" y2="0" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
                </g>
                <text x="0" y="28" fill="#d1d5db" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Servo</text>
                <text x="0" y="-20" fill="#60a5fa" fontSize="8" textAnchor="middle" fontFamily="monospace">{angle}°</text>
              </g>
            );
          }

          if (p.type === 'BUZZER') {
            const isOn = pinState > 0;
            return (
              <g key={`p-${i}`} transform={`translate(${px}, ${py})`}>
                <circle cx="0" cy="0" r="14" fill="#000" stroke="#374151" strokeWidth="3" />
                <circle cx="0" cy="0" r="4" fill="#374151" />
                {isOn && (
                  <g className="animate-pulse">
                    <path d="M 16 -8 A 12 12 0 0 1 16 8" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 22 -12 A 18 18 0 0 1 22 12" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
                  </g>
                )}
                <text x="0" y="26" fill="#d1d5db" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Buzzer</text>
              </g>
            );
          }

          if (p.type === 'DHT') {
            return (
              <g key={`p-${i}`} transform={`translate(${px}, ${py})`}>
                <rect x="-12" y="-16" width="24" height="32" rx="2" fill="#0ea5e9" stroke="#0284c7" strokeWidth="2" />
                <line x1="-6" y1="-8" x2="6" y2="-8" stroke="#bae6fd" strokeWidth="1" />
                <line x1="-6" y1="-4" x2="6" y2="-4" stroke="#bae6fd" strokeWidth="1" />
                <line x1="-6" y1="0" x2="6" y2="0" stroke="#bae6fd" strokeWidth="1" />
                <text x="0" y="28" fill="#d1d5db" fontSize="10" textAnchor="middle" fontFamily="sans-serif">DHT11</text>
              </g>
            );
          }

          if (p.type === 'ULTRASONIC') {
            return (
              <g key={`p-${i}`} transform={`translate(${px}, ${py})`}>
                <rect x="-20" y="-10" width="40" height="20" rx="2" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
                <circle cx="-10" cy="0" r="6" fill="#000" stroke="#bae6fd" strokeWidth="1" />
                <circle cx="10" cy="0" r="6" fill="#000" stroke="#bae6fd" strokeWidth="1" />
                <text x="0" y="22" fill="#d1d5db" fontSize="10" textAnchor="middle" fontFamily="sans-serif">HC-SR04</text>
              </g>
            );
          }

          if (p.type === 'PIR') {
            return (
              <g key={`p-${i}`} transform={`translate(${px}, ${py})`}>
                <rect x="-12" y="-5" width="24" height="15" fill="#fcd34d" stroke="#f59e0b" strokeWidth="2" />
                <path d="M -10 -5 A 10 10 0 0 1 10 -5 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
                <text x="0" y="24" fill="#d1d5db" fontSize="10" textAnchor="middle" fontFamily="sans-serif">PIR</text>
              </g>
            );
          }

          if (p.type === 'ANALOG_SENSOR') {
            return (
              <g key={`p-${i}`} transform={`translate(${px}, ${py})`}>
                <rect x="-12" y="-12" width="24" height="24" rx="2" fill="#84cc16" stroke="#4d7c0f" strokeWidth="2" />
                <path d="M -8 -4 L 0 -8 L 8 -4 L 8 4 L 0 8 L -8 4 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                <text x="0" y="24" fill="#d1d5db" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Analog</text>
              </g>
            );
          }

          if (p.type === 'BUTTON') {
            const isPressed = pinState === 1;
            return (
              <g 
                key={`p-${i}`} 
                transform={`translate(${px}, ${py})`} 
                onClick={() => setPin(p.pin, isPressed ? 0 : 1)}
                className="cursor-pointer"
              >
                <rect x="-14" y="-14" width="28" height="28" rx="4" fill="#4b5563" stroke="#374151" strokeWidth="2" />
                <circle cx="0" cy="0" r="8" fill={isPressed ? '#ef4444' : '#1f2937'} className="transition-colors duration-100" />
                <text x="0" y="26" fill="#d1d5db" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Button</text>
                <text x="0" y="-18" fill="#9ca3af" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Click me!</text>
              </g>
            );
          }

          // Generic peripheral fallback
          return (
            <g key={`p-${i}`} transform={`translate(${px}, ${py})`}>
              <rect x="-15" y="-15" width="30" height="30" rx="4" fill="#4b5563" stroke="#374151" strokeWidth="2" />
              <text x="0" y="28" fill="#d1d5db" fontSize="10" textAnchor="middle" fontFamily="sans-serif">{p.type}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
