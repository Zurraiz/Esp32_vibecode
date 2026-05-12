import React from 'react';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { HardwarePeripheral } from '@/lib/hardwareParser';
import Breadboard from './Breadboard';

interface HardwareBoardProps {
  peripherals: HardwarePeripheral[];
}

/**
 * A hardcoded map of the physical pin layout on an ESP32 WROOM-32 board.
 * Provides X/Y coordinates aligned with the Breadboard component's grid.
 */
const PIN_MAP: Record<string, { x: number; y: number; side: 'left' | 'right' }> = {
  // Left side pins (top to bottom)
  '36': { x: 57, y: 65, side: 'left' },
  '39': { x: 57, y: 75, side: 'left' },
  '34': { x: 57, y: 85, side: 'left' },
  '35': { x: 57, y: 95, side: 'left' },
  '32': { x: 57, y: 105, side: 'left' },
  '33': { x: 57, y: 115, side: 'left' },
  '25': { x: 57, y: 125, side: 'left' },
  '26': { x: 57, y: 135, side: 'left' },
  '27': { x: 57, y: 145, side: 'left' },
  '14': { x: 57, y: 155, side: 'left' },
  '12': { x: 57, y: 165, side: 'left' },
  '13': { x: 57, y: 175, side: 'left' },
  'GND': { x: 57, y: 185, side: 'left' },
  'VIN': { x: 57, y: 195, side: 'left' },
  'EN': { x: 57, y: 205, side: 'left' },

  // Right side pins (top to bottom)
  '23': { x: 161, y: 65, side: 'right' },
  '22': { x: 161, y: 75, side: 'right' },
  '1': { x: 161, y: 85, side: 'right' }, // TX
  '3': { x: 161, y: 95, side: 'right' }, // RX
  '21': { x: 161, y: 105, side: 'right' },
  '19': { x: 161, y: 115, side: 'right' },
  '18': { x: 161, y: 125, side: 'right' },
  '5': { x: 161, y: 135, side: 'right' },
  '17': { x: 161, y: 145, side: 'right' },
  '16': { x: 161, y: 155, side: 'right' },
  '4': { x: 161, y: 165, side: 'right' },
  '0': { x: 161, y: 175, side: 'right' },
  '2': { x: 161, y: 185, side: 'right' },
  '15': { x: 161, y: 195, side: 'right' },
  '3V3': { x: 161, y: 205, side: 'right' },
};

const getPinLoc = (pin: number | string) => {
  if (PIN_MAP[String(pin)]) return PIN_MAP[String(pin)];
  return { x: 110, y: 230, side: 'bottom' };
};

export default function HardwareBoard({ peripherals }: HardwareBoardProps) {
  const pins = useSimulatorStore((state) => state.pins);
  const setPin = useSimulatorStore((state) => state.setPin);
  const oledScreen = useSimulatorStore((state) => state.oledScreen);

  const hasLeftPeripherals = peripherals.some(p => getPinLoc(p.pin).side === 'left');
  const hasRightPeripherals = peripherals.some(p => getPinLoc(p.pin).side === 'right');

  const hasOled = peripherals.some(p => p.type === 'OLED');
  const getWireCount = (type: string) => {
    if (type === 'OLED') return 4;
    if (type === 'SERVO') return 3;
    return 2;
  };

  const leftPeripherals = peripherals.filter(p => getPinLoc(p.pin).side === 'left');
  const rightPeripherals = peripherals.filter(p => getPinLoc(p.pin).side === 'right');

  const totalWiresLeft = leftPeripherals.reduce((sum, p) => sum + getWireCount(p.type), 0);
  const totalWiresRight = rightPeripherals.reduce((sum, p) => sum + getWireCount(p.type), 0);

  // Dynamic horizontal positioning to "make way" for wires
  const pxLeft = -20 - (totalWiresLeft * 5) - (hasLeftPeripherals && leftPeripherals.some(p => p.type === 'OLED') ? 60 : 20);
  const pxRight = 230 + (totalWiresRight * 5) + (hasOled ? 60 : 20);

  const minX = hasLeftPeripherals ? pxLeft - 40 : 0;
  const maxX = hasRightPeripherals ? pxRight + (hasOled ? 180 : 40) : 220;
  const width = maxX - minX;

  // --- Dynamic Layout Engine ---
  const getComponentMetrics = (type: string) => {
    switch (type) {
      case 'OLED': return { height: 250, offset: 60 };
      case 'SERVO': return { height: 60, offset: 30 };
      case 'BUZZER': return { height: 60, offset: 20 };
      case 'BUTTON': return { height: 50, offset: 20 };
      case 'LED': return { height: 50, offset: 15 };
      default: return { height: 50, offset: 20 };
    }
  };

  const layoutMap = new Map(); // p.pin -> origin py

  const buildStack = (stack: HardwarePeripheral[]) => {
    // Sort by target pin Y to minimize wire crossing
    stack.sort((a, b) => getPinLoc(a.pin).y - getPinLoc(b.pin).y);

    let currentY = 10; // Start with 10px top padding
    let maxY = currentY;

    stack.forEach(p => {
      const metrics = getComponentMetrics(p.type);
      // Try to place it near its pin, but strictly below currentY
      const targetTopY = Math.max(currentY, getPinLoc(p.pin).y - metrics.offset);
      const originPy = targetTopY + metrics.offset;

      layoutMap.set(p.pin, originPy);

      currentY = targetTopY + metrics.height + 15; // 15px gap between components
      maxY = currentY;
    });
    return maxY;
  };

  // We already defined these above to calculate pxLeft/pxRight


  const maxLeftY = buildStack(leftPeripherals);
  const maxRightY = buildStack(rightPeripherals);

  // Determine dynamic viewBox height to fit all components
  const maxStackY = Math.max(maxLeftY, maxRightY);
  const viewBoxHeight = Math.max(300, maxStackY);


  return (
    <div className="w-full h-full relative bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center p-2 border border-gray-700/50">
      <svg className="w-full h-full" viewBox={`${minX} 0 ${width} ${viewBoxHeight}`} preserveAspectRatio="xMidYMid meet">
        {/* Subtle background glow */}
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1e1e1e" stopOpacity="0" />
        </radialGradient>
        <rect x={minX} y="0" width={width} height={viewBoxHeight} fill="url(#bgGlow)" />

        {/* Breadboard */}
        <Breadboard x={0} y={10} rows={30} />

        {/* Rail Highlights */}
        <g>
          <defs>
            <filter id="railGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Rails */}
          <line x1="15" y1="15" x2="15" y2="310" stroke="#1e40af" strokeWidth="4" opacity="0.3" />
          <line x1="15" y1="15" x2="15" y2="310" stroke="#3b82f6" strokeWidth="2" filter="url(#railGlow)" opacity={peripherals.length > 0 ? 0.8 : 0.3} className="transition-opacity duration-500" />

          <line x1="25" y1="15" x2="25" y2="310" stroke="#991b1b" strokeWidth="4" opacity="0.3" />
          <line x1="25" y1="15" x2="25" y2="310" stroke="#ef4444" strokeWidth="2" filter="url(#railGlow)" opacity={peripherals.length > 0 ? 0.8 : 0.3} className="transition-opacity duration-500" />

          {/* Right Rails */}
          <line x1="193" y1="15" x2="193" y2="310" stroke="#991b1b" strokeWidth="4" opacity="0.3" />
          <line x1="193" y1="15" x2="193" y2="310" stroke="#ef4444" strokeWidth="2" filter="url(#railGlow)" opacity={peripherals.length > 0 ? 0.8 : 0.3} className="transition-opacity duration-500" />

          <line x1="203" y1="15" x2="203" y2="310" stroke="#1e40af" strokeWidth="4" opacity="0.3" />
          <line x1="203" y1="15" x2="203" y2="310" stroke="#3b82f6" strokeWidth="2" filter="url(#railGlow)" opacity={peripherals.length > 0 ? 0.8 : 0.3} className="transition-opacity duration-500" />
        </g>

        {/* Wires */}
        {(() => {
          let wireCountLeft = 0;
          let wireCountRight = 0;

          return peripherals.map((p, i) => {
            const loc = getPinLoc(p.pin);
            const isLeft = loc.side === 'left';
            const px = isLeft ? pxLeft : pxRight;
            const py = layoutMap.get(p.pin) ?? loc.y;

            const drawWire = (startX: number, startY: number, endX: number, endY: number, color: string, thickness = 2.5, opacity = 0.9) => {
              // Assign a unique vertical track to prevent overlap
              let midX: number;
              if (isLeft) {
                // Route in the channel between pxLeft and the breadboard
                midX = pxLeft + (hasLeftPeripherals && leftPeripherals.some(p => p.type === 'OLED') ? 65 : 25) + (wireCountLeft * 5);
                wireCountLeft++;
              } else {
                // Route in the channel between the breadboard and pxRight
                midX = pxRight - (hasOled ? 65 : 25) - (wireCountRight * 5);
                wireCountRight++;
              }

              // Orthogonal Manhattan routing
              const path = `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`;

              return (
                <g key={`wire-${startX}-${startY}-${endX}-${endY}-${color}-${wireCountLeft}-${wireCountRight}`}>
                  <path d={path} fill="none" stroke={color} strokeWidth={thickness} strokeOpacity={opacity} strokeLinejoin="round" strokeLinecap="round" className="transition-all duration-300" />
                  <circle cx={endX} cy={endY} r="2" fill={color} />
                </g>
              );
            };

            const pinData = pins[p.pin];
            const pinVal = pinData?.value || 0;
            let sigColor = '#4b5563';
            let sigOp = 0.8;
            if (pinVal > 0) {
              sigColor = '#ef4444';
              if (pinData?.mode === 'pwm' && pinVal <= 255) sigOp = Math.max(0.4, pinVal / 255);
            }

            const sigHoleX = isLeft ? loc.x - 12 : loc.x + 12;
            const sigHoleY = loc.y;

            // Power Rail Coordinates
            const railGndX = isLeft ? 15 : 203;
            const railVccX = isLeft ? 25 : 193;

            if (p.type === 'OLED') {
              const basePx = px;
              const basePy = py;
              const pinY = basePy - 50 + (5 * 3);
              const gndX = basePx - 60 + (28 * 3);
              const vccX = basePx - 60 + (36 * 3);
              const sclX = basePx - 60 + (44 * 3);
              const sdaX = basePx - 60 + (52 * 3);

              const sdaTargetY = getPinLoc('21').y;
              const sclTargetY = getPinLoc('22').y;

              return (
                <g key={`wire-group-${i}`}>
                  {/* OLED connects to rails at its own height to avoid overlap */}
                  {drawWire(gndX, pinY, railGndX, pinY + 2, '#111827')}
                  {drawWire(vccX, pinY, railVccX, pinY - 2, '#ef4444')}
                  {drawWire(sclX, pinY, sigHoleX, sclTargetY, '#eab308')}
                  {drawWire(sdaX, pinY, sigHoleX, sdaTargetY, '#3b82f6')}
                </g>
              );
            } else if (p.type === 'LED' || p.type === 'BUZZER' || p.type === 'BUTTON') {
              return (
                <g key={`wire-group-${i}`}>
                  {drawWire(px, py - 5, sigHoleX, sigHoleY, sigColor, 2.5, sigOp)}
                  {drawWire(px, py + 5, railGndX, py + 5, '#111827')}
                </g>
              );
            } else if (p.type === 'SERVO') {
              return (
                <g key={`wire-group-${i}`}>
                  {drawWire(px, py - 10, railGndX, py - 10, '#111827')}
                  {drawWire(px, py, railVccX, py, '#ef4444')}
                  {drawWire(px, py + 10, sigHoleX, sigHoleY, '#eab308', 2.5, sigOp)}
                </g>
              );
            } else {
              return (
                <g key={`wire-group-${i}`}>
                  {drawWire(px, py - 5, railVccX, py - 5, '#ef4444')}
                  {drawWire(px, py, sigHoleX, sigHoleY, sigColor, 2.5, sigOp)}
                  {drawWire(px, py + 5, railGndX, py + 5, '#111827')}
                </g>
              );
            }
          });
        })()}

        {/* Master Power Jumper Wires (ESP32 to Rails) */}
        {(() => {
          const gndL = getPinLoc('GND');
          const vccR = getPinLoc('3V3');
          // Simple straight jumpers for the main power
          return (
            <g opacity={peripherals.length > 0 ? 0.9 : 0.4} className="transition-opacity duration-500">
              <path d={`M ${gndL.x - 5} ${gndL.y} L 15 ${gndL.y}`} stroke="#111827" strokeWidth="3" fill="none" />
              <circle cx={gndL.x - 5} cy={gndL.y} r="2.5" fill="#111827" />
              <circle cx="15" cy={gndL.y} r="2.5" fill="#111827" filter="url(#railGlow)" />

              <path d={`M ${vccR.x + 5} ${vccR.y} L 193 ${vccR.y}`} stroke="#ef4444" strokeWidth="3" fill="none" />
              <circle cx={vccR.x + 5} cy={vccR.y} r="2.5" fill="#ef4444" />
              <circle cx="193" cy={vccR.y} r="2.5" fill="#ef4444" filter="url(#railGlow)" />
            </g>
          );
        })()}

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
              <g key={`p-pin-${pin}`}>
                <rect
                  x={isLeft ? 5 : 106}
                  y={loc.y - 50 - 2}
                  width="5"
                  height="4"
                  fill="#fbbf24"
                  rx="0.5"
                />
                <text
                  x={isLeft ? 12 : 104}
                  y={loc.y - 50 + 1}
                  fill="#94a3b8"
                  fontSize="4"
                  textAnchor={isLeft ? 'start' : 'end'}
                  fontFamily="monospace"
                >
                  {pin}
                </text>
              </g>
            );
          })}
        </g>

        {/* Peripherals */}
        {peripherals.map((p, i) => {
          const loc = getPinLoc(p.pin);
          const isLeft = loc.side === 'left';
          const px = isLeft ? pxLeft : pxRight;
          const py = layoutMap.get(p.pin) ?? loc.y;
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

              {p.type === 'OLED' && (
                <g transform="translate(-60, -50) scale(3)">
                  {/* OLED Module Base */}
                  <rect x="0" y="0" width="80" height="80" rx="4" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
                  <text x="40" y="74" fill="#94a3b8" fontSize="6" textAnchor="middle" fontWeight="bold">0.96" OLED</text>

                  {/* I2C Pins Header */}
                  <rect x="25" y="2" width="30" height="6" fill="#334155" />
                  <circle cx="28" cy="5" r="1.5" fill="#eab308" />
                  <circle cx="36" cy="5" r="1.5" fill="#eab308" />
                  <circle cx="44" cy="5" r="1.5" fill="#eab308" />
                  <circle cx="52" cy="5" r="1.5" fill="#eab308" />

                  {/* Screen Area (128x64 aspect ratio roughly) */}
                  {/* SVG viewBox is abstract, let's map 128x64 to 64x32 width/height */}
                  <rect x="8" y="15" width="64" height="32" fill="#000000" stroke="#334155" strokeWidth="1" />

                  {/* Screen Content Mapping */}
                  {/* We map original X [0..128] to SVG X [8..72] -> factor 0.5 */}
                  {/* We map original Y [0..64] to SVG Y [15..47] -> factor 0.5 */}
                  <g>
                    {oledScreen.map((line, idx) => (
                      <text
                        key={`oled-${idx}`}
                        x={8 + (line.x * 0.5)}
                        y={15 + (line.y * 0.5) + 5} // +5 for baseline adjustment
                        fill="#38bdf8" // Cyan/blue OLED color
                        fontSize="5"
                        fontFamily="monospace"
                        style={{ whiteSpace: 'pre' }}
                      >
                        {line.text}
                      </text>
                    ))}
                  </g>
                </g>
              )}

              {p.type === 'ULTRASONIC' && (
                <g transform="scale(0.8)">
                  <rect x="-25" y="-15" width="50" height="30" rx="3" fill="#1e3a8a" stroke="#1e40af" strokeWidth="2" />
                  <circle cx="-12" cy="0" r="10" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
                  <circle cx="-12" cy="0" r="4" fill="#0f172a" />
                  <circle cx="12" cy="0" r="10" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
                  <circle cx="12" cy="0" r="4" fill="#0f172a" />
                  <text y="25" fill="#94a3b8" fontSize="8" textAnchor="middle" fontWeight="bold">HC-SR04</text>
                </g>
              )}

              {p.type === 'DHT' && (
                <g>
                  <rect x="-15" y="-20" width="30" height="40" rx="2" fill="#38bdf8" stroke="#0ea5e9" strokeWidth="2" />
                  {/* Grid lines for DHT */}
                  <path d="M -10 -10 L 10 -10 M -10 -5 L 10 -5 M -10 0 L 10 0 M -10 5 L 10 5 M -10 10 L 10 10" stroke="#0284c7" strokeWidth="1" />
                  <text y="30" fill="#94a3b8" fontSize="8" textAnchor="middle" fontWeight="bold">DHT11</text>
                </g>
              )}

              {p.type === 'PIR' && (
                <g>
                  <rect x="-20" y="-20" width="40" height="40" rx="20" fill="#166534" stroke="#14532d" strokeWidth="2" />
                  <circle cx="0" cy="0" r="15" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" opacity="0.9" />
                  {/* Dome facet lines */}
                  <path d="M 0 -15 L 0 15 M -15 0 L 15 0 M -10 -10 L 10 10 M -10 10 L 10 -10" stroke="#cbd5e1" strokeWidth="0.5" opacity="0.5" />
                  <text y="30" fill="#94a3b8" fontSize="8" textAnchor="middle" fontWeight="bold">PIR</text>
                </g>
              )}

              {p.type === 'ANALOG_SENSOR' && (
                <g>
                  <rect x="-15" y="-15" width="30" height="30" rx="4" fill="#475569" stroke="#334155" strokeWidth="2" />
                  <circle cx="0" cy="0" r="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                  <path d="M 0 0 L 0 -8" stroke="#b45309" strokeWidth="2" />
                  <text y="25" fill="#94a3b8" fontSize="8" textAnchor="middle" fontWeight="bold">LDR/POT</text>
                </g>
              )}

              {/* Generic fallback for other types */}
              {!['LED', 'SERVO', 'BUZZER', 'BUTTON', 'OLED', 'ULTRASONIC', 'DHT', 'PIR', 'ANALOG_SENSOR'].includes(p.type) && (
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
