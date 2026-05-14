'use client';

// src/components/DynamicWiringSimulator.tsx — FULLY FIXED
// Fix 1: Pin labels moved OUTSIDE ESP32 body, font size 7px (readable)
// Fix 2: Wire routing never crosses ESP32 — proper orthogonal paths
// Fix 3: Correct ESP32 WROOM-32 pin mapping for all projects

import { useState, useEffect, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export type WirePin = {
  name: string;
  connectTo: string;
  color: 'red' | 'black' | 'yellow' | 'orange' | 'blue' | 'green' | 'white' | 'purple';
};

export type ComponentConfig = {
  type: 'DHT22' | 'HC-SR04' | 'LED' | 'BUTTON' | 'BUZZER' | 'SERVO';
  label?: string;
  pins: WirePin[];
};

// ─── Wire colours ─────────────────────────────────────────────────────────────
const COLORS: Record<string, string> = {
  red: '#cc3333', black: '#2d2d2d', yellow: '#cca300',
  orange: '#e67e22', blue: '#2980b9', green: '#27ae60',
  white: '#ecf0f1', purple: '#8e44ad',
};

// ─── ESP32 physical boundaries in SVG ────────────────────────────────────────
const ESP_X1 = 235; // left edge
const ESP_X2 = 395; // right edge
const ESP_Y1 = 42;  // top edge
const ESP_Y2 = 315; // bottom edge

// Pin header X positions (inside ESP32 body)
const LEFT_PIN_X  = 258;
const RIGHT_PIN_X = 372;
const PIN_ROW_Y0  = 58;   // y of row 0
const PIN_ROW_DY  = 13.5; // y step per row

function rowToY(row: number) { return PIN_ROW_Y0 + row * PIN_ROW_DY; }

// ─── ESP32 WROOM-32 accurate pin map ─────────────────────────────────────────
// side: which header the pin is on
// row:  0-based row index from top
const LEFT_PINS: string[] = [
  '3V3',    // row 0
  'EN',     // row 1
  'GPIO36', // row 2
  'GPIO39', // row 3
  'GPIO34', // row 4
  'GPIO35', // row 5
  'GPIO32', // row 6
  'GPIO33', // row 7
  'GPIO25', // row 8
  'GPIO26', // row 9
  'GPIO27', // row 10
  'GPIO14', // row 11
  'GPIO12', // row 12
  'GND',    // row 13
  'GPIO13', // row 14
  'GPIO9',  // row 15
  'GPIO10', // row 16
  'GPIO11', // row 17
  'VIN',    // row 18
];

const RIGHT_PINS: string[] = [
  'GND',    // row 0
  'GPIO23', // row 1
  'GPIO22', // row 2
  'TX0',    // row 3
  'RX0',    // row 4
  'GPIO21', // row 5
  'GND',    // row 6
  'GPIO19', // row 7
  'GPIO18', // row 8
  'GPIO5',  // row 9
  'GPIO17', // row 10
  'GPIO16', // row 11
  'GPIO4',  // row 12
  'GPIO0',  // row 13
  'GPIO2',  // row 14
  'GPIO15', // row 15
  'GPIO8',  // row 16
  'GPIO7',  // row 17
  'GPIO6',  // row 18
];

// Aliases: what activitiesData passes → internal pin name
const PIN_ALIASES: Record<string, string> = {
  '3.3V': '3V3', '3V3': '3V3',
  'GND': 'GND',
  '5V': 'VIN', 'VIN': 'VIN',
  'GPIO0': 'GPIO0', 'GPIO2': 'GPIO2', 'GPIO4': 'GPIO4',
  'GPIO5': 'GPIO5', 'GPIO12': 'GPIO12', 'GPIO13': 'GPIO13',
  'GPIO14': 'GPIO14', 'GPIO15': 'GPIO15', 'GPIO16': 'GPIO16',
  'GPIO17': 'GPIO17', 'GPIO18': 'GPIO18', 'GPIO19': 'GPIO19',
  'GPIO21': 'GPIO21', 'GPIO22': 'GPIO22', 'GPIO23': 'GPIO23',
  'GPIO25': 'GPIO25', 'GPIO26': 'GPIO26', 'GPIO27': 'GPIO27',
  'GPIO32': 'GPIO32', 'GPIO33': 'GPIO33', 'GPIO34': 'GPIO34',
  'GPIO36': 'GPIO36', 'GPIO39': 'GPIO39',
  'GPIO48': 'GPIO4', // ESP32-S3 GPIO48 mapped to GPIO4 on WROOM-32
  'TX0': 'TX0', 'RX0': 'RX0',
};

type EspPinInfo = { x: number; y: number; side: 'left' | 'right'; row: number };

function getEspPinInfo(rawName: string): EspPinInfo {
  const name = PIN_ALIASES[rawName] ?? rawName;
  const li = LEFT_PINS.indexOf(name);
  if (li !== -1) return { x: LEFT_PIN_X, y: rowToY(li), side: 'left', row: li };
  const ri = RIGHT_PINS.indexOf(name);
  if (ri !== -1) return { x: RIGHT_PIN_X, y: rowToY(ri), side: 'right', row: ri };
  // fallback: right side row 5
  return { x: RIGHT_PIN_X, y: rowToY(5), side: 'right', row: 5 };
}

// ─── Wire routing — NEVER crosses ESP32 ──────────────────────────────────────
//
// Component is always to the RIGHT of ESP32 (x1 > ESP_X2)
// ESP32 occupies ESP_X1=235 .. ESP_X2=395
//
// Strategy:
//   Right-side pin (x2 = RIGHT_PIN_X = 372):
//     Component → go right to x=413 → go vertical to pin y → go left to pin x
//     Path: M x1 y1  H 413  V y2  H x2
//
//   Left-side pin (x2 = LEFT_PIN_X = 258):
//     Must go around ESP32 — either above (y<ESP_Y1) or below (y>ESP_Y2)
//     Path: M x1 y1  H 413  V clearY  H 217  V y2  H x2
//     where clearY = above or below ESP32 body depending on which is closer
//
function getWirePath(x1: number, y1: number, x2: number, y2: number, side: 'left' | 'right'): string {
  const rightExit = ESP_X2 + 18;  // 413 — clear right edge
  const leftExit  = ESP_X1 - 18;  // 217 — clear left edge
  const aboveY    = ESP_Y1 - 16;  // 26  — clear above ESP
  const belowY    = ESP_Y2 + 16;  // 331 — clear below ESP

  if (side === 'right') {
    // Simple: go right past ESP, then down/up to pin y, then left to pin
    return `M ${x1} ${y1} H ${rightExit} V ${y2} H ${x2}`;
  } else {
    // Left pin: go right past ESP, then route ABOVE or BELOW, then approach from left
    const midY = (y1 + y2) / 2;
    // Choose above if midpoint is in upper half of ESP, else below
    const clearY = midY < (ESP_Y1 + ESP_Y2) / 2 ? aboveY : belowY;
    return `M ${x1} ${y1} H ${rightExit} V ${clearY} H ${leftExit} V ${y2} H ${x2}`;
  }
}

// ─── Component pin layouts ────────────────────────────────────────────────────
type CompPin = { name: string; relX: number; relY: number; fill: string };

const COMP_PINS: Record<string, CompPin[]> = {
  DHT22:     [
    { name: 'VCC',  relX: 20, relY: 88,  fill: '#cc3333' },
    { name: 'DATA', relX: 36, relY: 100, fill: '#cca300' },
    { name: 'GND',  relX: 52, relY: 112, fill: '#2d2d2d' },
  ],
  'HC-SR04': [
    { name: 'VCC',  relX: 18, relY: 78, fill: '#cc3333' },
    { name: 'TRIG', relX: 34, relY: 78, fill: '#e67e22' },
    { name: 'ECHO', relX: 50, relY: 78, fill: '#8e44ad' },
    { name: 'GND',  relX: 66, relY: 78, fill: '#2d2d2d' },
  ],
  LED: [
    { name: '+',  relX: 14, relY: 80, fill: '#cc3333' },
    { name: '-',  relX: 26, relY: 90, fill: '#2d2d2d' },
  ],
  BUTTON: [
    { name: 'PIN1', relX: 14, relY: 50, fill: '#e67e22' },
    { name: 'PIN2', relX: 34, relY: 50, fill: '#2d2d2d' },
  ],
  BUZZER: [
    { name: '+', relX: 18, relY: 66, fill: '#cc3333' },
    { name: '-', relX: 30, relY: 66, fill: '#2d2d2d' },
  ],
  SERVO: [
    { name: 'VCC',    relX: 18, relY: 70, fill: '#cc3333' },
    { name: 'GND',    relX: 30, relY: 70, fill: '#2d2d2d' },
    { name: 'SIGNAL', relX: 44, relY: 70, fill: '#e67e22' },
  ],
};

// Component placed here (right of ESP32)
const COMP_X = 490;
const COMP_Y = 84;

// ─── Step builder ─────────────────────────────────────────────────────────────
type Step = {
  text: string;
  wire: null | {
    x1: number; y1: number; x2: number; y2: number;
    color: string; label: string;
    compPinName: string; espPinKey: string;
    side: 'left' | 'right';
  };
};

function buildSteps(cfg: ComponentConfig): Step[] {
  const pins = COMP_PINS[cfg.type] || COMP_PINS.DHT22;
  const label = cfg.label || cfg.type;

  const steps: Step[] = [{
    text: `Place the ${label} beside the breadboard. We will connect each pin to the ESP32 step by step.`,
    wire: null,
  }];

  cfg.pins.forEach((pin, i) => {
    const compPin = pins.find(p => p.name.toUpperCase() === pin.name.toUpperCase())
      || pins[i] || pins[0];
    const espInfo  = getEspPinInfo(pin.connectTo);
    const colorHex = COLORS[pin.color] || COLORS.red;
    const colorCap = pin.color[0].toUpperCase() + pin.color.slice(1);

    steps.push({
      text: `Connect ${label} ${pin.name} → ESP32 ${pin.connectTo} using a ${pin.color} jumper wire.`,
      wire: {
        x1: COMP_X + compPin.relX,
        y1: COMP_Y + compPin.relY,
        x2: espInfo.x,
        y2: espInfo.y,
        color: colorHex,
        label: `${colorCap}  ·  ${pin.name} → ${pin.connectTo}`,
        compPinName: pin.name,
        espPinKey: PIN_ALIASES[pin.connectTo] ?? pin.connectTo,
        side: espInfo.side,
      },
    });
  });

  steps.push({
    text: 'All wires connected! Plug the ESP32 into your computer via USB, then click Run.',
    wire: null,
  });

  return steps;
}

function getDescription(type: string): string {
  const m: Record<string, string> = {
    DHT22: 'Temperature & Humidity Sensor', 'HC-SR04': 'Ultrasonic Distance Sensor',
    LED: 'LED', BUTTON: 'Push Button', BUZZER: 'Piezo Buzzer', SERVO: 'Servo Motor',
  };
  return m[type] || type;
}

// ─── ESP32 + Breadboard SVG ───────────────────────────────────────────────────
function ESP32SVG({ step, drawnEspKeys }: { step: Step; drawnEspKeys: Set<string> }) {
  return (
    <g>
      {/* ── Breadboard base ── */}
      <rect x="150" y="20" width="310" height="320" rx="14" fill="#ece7dc" stroke="#c8bea9" strokeWidth="2"/>

      {/* Left holes */}
      {Array.from({ length: 26 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => (
          <circle key={`lh-${row}-${col}`}
            cx={178 + col * 12} cy={34 + row * 12}
            r="2.3" fill="#faf7f0" stroke="#b9ae98" strokeWidth="0.6"/>
        ))
      )}
      {/* Right holes */}
      {Array.from({ length: 26 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => (
          <circle key={`rh-${row}-${col}`}
            cx={326 + col * 12} cy={34 + row * 12}
            r="2.3" fill="#faf7f0" stroke="#b9ae98" strokeWidth="0.6"/>
        ))
      )}

      {/* Power rails */}
      <rect x="156" y="24" width="8" height="308" fill="#ffe8e8" rx="2"/>
      <rect x="446" y="24" width="8" height="308" fill="#e8eeff" rx="2"/>
      <line x1="160" y1="28" x2="160" y2="326" stroke="#dc2626" strokeWidth="0.9" strokeDasharray="3,4"/>
      <line x1="450" y1="28" x2="450" y2="326" stroke="#3b82f6" strokeWidth="0.9" strokeDasharray="3,4"/>
      <text x="160" y="22" fill="#dc2626" fontSize="7" fontFamily="monospace" textAnchor="middle">+</text>
      <text x="450" y="22" fill="#3b82f6" fontSize="7" fontFamily="monospace" textAnchor="middle">−</text>

      {/* Column labels */}
      {['b','c','d','e'].map((l, i) => (
        <text key={l} x={178+i*12} y="22" fill="#999" fontSize="6" fontFamily="monospace" textAnchor="middle">{l}</text>
      ))}
      {['f','g','h','i'].map((l, i) => (
        <text key={l} x={326+i*12} y="22" fill="#999" fontSize="6" fontFamily="monospace" textAnchor="middle">{l}</text>
      ))}

      {/* ── ESP32 PCB ── */}
      <rect x={ESP_X1} y={ESP_Y1} width={ESP_X2-ESP_X1} height={ESP_Y2-ESP_Y1}
        rx="12" fill="#2f2a2a" stroke="#494040" strokeWidth="2"
        style={{filter:'drop-shadow(0 5px 12px rgba(0,0,0,0.5))'}}/>
      <rect x={ESP_X1+5} y={ESP_Y1+5} width={ESP_X2-ESP_X1-10} height={ESP_Y2-ESP_Y1-10}
        rx="10" fill="#3b3131"/>

      {/* RF module */}
      <rect x="262" y="55" width="106" height="84" rx="4" fill="#b7b7b7" stroke="#ddd" strokeWidth="1.5"/>
      {Array.from({length:6},(_,i) => (
        <line key={i} x1="265" x2="365" y1={62+i*9} y2={62+i*9} stroke="#8c8c8c" strokeWidth="0.7"/>
      ))}
      <text x="315" y="92" fill="#4f4f4f" fontSize="10" fontFamily="monospace" fontWeight="700" textAnchor="middle">ESP-WROOM-32</text>
      <text x="315" y="106" fill="#696969" fontSize="6.5" fontFamily="monospace" textAnchor="middle">WiFi + BLE</text>

      {/* Antenna */}
      <rect x="270" y="44" width="90" height="13" fill="#2b2323"/>
      {Array.from({length:5},(_,i) => (
        <path key={i} d={`M${276+i*16} 46 h8 v3 h-8 v3 h8`} fill="none" stroke="#6f4e4e" strokeWidth="1"/>
      ))}

      {/* USB */}
      <rect x="296" y="292" width="38" height="16" rx="3" fill="#8f979d" stroke="#d7dde2" strokeWidth="1"/>
      <rect x="301" y="296" width="28" height="9" rx="1.5" fill="#232323"/>
      {[47,53,59,65].map(x => <rect key={x} x={x+254} y="298" width="4" height="5" rx=".5" fill="#d4a843"/>)}

      {/* Buttons */}
      <rect x="246" y="279" width="18" height="12" rx="3" fill="#1f1f1f"/>
      <rect x="366" y="279" width="18" height="12" rx="3" fill="#1f1f1f"/>
      <text x="255" y="297" fill="#aaa" fontSize="5.5" fontFamily="monospace" textAnchor="middle">EN</text>
      <text x="375" y="297" fill="#aaa" fontSize="5.5" fontFamily="monospace" textAnchor="middle">BOOT</text>

      {/* Decorative SMD components */}
      <rect x="276" y="168" width="18" height="8" rx="1" fill="#d8c58f"/>
      <rect x="312" y="168" width="18" height="8" rx="1" fill="#d8c58f"/>
      {[280,302,324].map(x => <rect key={x} x={x} y="190" width="10" height="10" fill="#101010"/>)}

      {/* ── LEFT PINS — labels placed LEFT of breadboard (outside ESP) ── */}
      {LEFT_PINS.map((pin, i) => {
        const y = rowToY(i);
        const isActive = step.wire?.espPinKey === pin && step.wire?.side === 'left';
        const isDone   = drawnEspKeys.has(pin);
        return (
          <g key={`lp-${i}`}>
            {/* Solder pad */}
            <rect x={LEFT_PIN_X-3} y={y-4} width="6" height="8" rx="1" fill="#1b1b1b"/>
            {/* Gold pin dot */}
            <circle cx={LEFT_PIN_X} cy={y} r="2.5" fill="#c7b37a"/>
            {/* Highlight ring when active or done */}
            {(isActive || isDone) && (
              <circle cx={LEFT_PIN_X} cy={y} r="6"
                fill="none"
                stroke={isActive ? (step.wire?.color || '#fff') : '#2ecc71'}
                strokeWidth={isActive ? 2 : 1.5}
                opacity={isActive ? 1 : 0.7}
                strokeDasharray={isActive ? '3,2' : 'none'}/>
            )}
            {/* FIX 1: Label placed FAR LEFT — outside breadboard left edge, fully readable */}
            <text
              x={148}
              y={y + 3}
              fill={isActive ? '#ffffff' : isDone ? '#2ecc71' : '#c8c8c8'}
              fontSize="7"
              fontWeight={isActive ? '700' : '400'}
              fontFamily="monospace"
              textAnchor="end"
            >
              {pin}
            </text>
          </g>
        );
      })}

      {/* ── RIGHT PINS — labels placed RIGHT of breadboard (outside ESP) ── */}
      {RIGHT_PINS.map((pin, i) => {
        const y = rowToY(i);
        const isActive = step.wire?.espPinKey === pin && step.wire?.side === 'right';
        const isDone   = drawnEspKeys.has(pin);
        return (
          <g key={`rp-${i}`}>
            <rect x={RIGHT_PIN_X-3} y={y-4} width="6" height="8" rx="1" fill="#1b1b1b"/>
            <circle cx={RIGHT_PIN_X} cy={y} r="2.5" fill="#c7b37a"/>
            {(isActive || isDone) && (
              <circle cx={RIGHT_PIN_X} cy={y} r="6"
                fill="none"
                stroke={isActive ? (step.wire?.color || '#fff') : '#2ecc71'}
                strokeWidth={isActive ? 2 : 1.5}
                opacity={isActive ? 1 : 0.7}
                strokeDasharray={isActive ? '3,2' : 'none'}/>
            )}
            {/* FIX 1: Label placed FAR RIGHT — outside breadboard right edge */}
            <text
              x={462}
              y={y + 3}
              fill={isActive ? '#ffffff' : isDone ? '#2ecc71' : '#c8c8c8'}
              fontSize="7"
              fontWeight={isActive ? '700' : '400'}
              fontFamily="monospace"
              textAnchor="start"
            >
              {pin}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ─── Component SVG ────────────────────────────────────────────────────────────
function ComponentSVG({ cfg, activePinName, drawnPins, isRunning, output }: {
  cfg: ComponentConfig; activePinName?: string;
  drawnPins: Set<string>; isRunning: boolean; output?: string;
}) {
  const pins = COMP_PINS[cfg.type] || COMP_PINS.DHT22;
  const label = cfg.label || cfg.type;

  const renderBody = () => {
    switch (cfg.type) {
      case 'DHT22': return (
        <g>
          <rect width="72" height="110" rx="6" fill="#2e7bb7" stroke="#1d4f72" strokeWidth="2"/>
          <rect x="8" y="8" width="56" height="38" rx="4" fill="#1e4f77"/>
          {Array.from({length:5},(_,i) => <line key={i} x1="8" y1={15+i*6} x2="64" y2={15+i*6} stroke="#315e82" strokeWidth="0.7"/>)}
          {Array.from({length:4},(_,i) => <line key={i} x1={16+i*12} y1="8" x2={16+i*12} y2="46" stroke="#315e82" strokeWidth="0.7"/>)}
          <text x="36" y="60" fill="#eef7fb" fontSize="9" fontFamily="monospace" fontWeight="700" textAnchor="middle">DHT22</text>
          <text x="36" y="71" fill="#7ec8f0" fontSize="5.5" fontFamily="monospace" textAnchor="middle">TEMP+HUM</text>
          {isRunning && output && (
            <g>
              <rect x="6" y="76" width="60" height="20" rx="3" fill="#081016" stroke="#16304d" strokeWidth="0.8"/>
              <text x="36" y="90" fill="#2ecc71" fontSize="8" fontFamily="monospace" fontWeight="600" textAnchor="middle">{output}</text>
            </g>
          )}
        </g>
      );
      case 'HC-SR04': return (
        <g>
          <rect width="86" height="90" rx="5" fill="#2d4f65" stroke="#2b4252" strokeWidth="2"/>
          <circle cx="26" cy="28" r="16" fill="#d4d9dd" stroke="#8a96a3" strokeWidth="1.5"/>
          <circle cx="56" cy="28" r="16" fill="#d4d9dd" stroke="#8a96a3" strokeWidth="1.5"/>
          <circle cx="26" cy="28" r="8" fill="#5b6770"/>
          <circle cx="56" cy="28" r="8" fill="#5b6770"/>
          <text x="43" y="58" fill="#eef2f4" fontSize="8" fontFamily="monospace" fontWeight="700" textAnchor="middle">HC-SR04</text>
          {isRunning && output && (
            <text x="43" y="74" fill="#f1c40f" fontSize="8" fontFamily="monospace" fontWeight="600" textAnchor="middle">{output}</text>
          )}
        </g>
      );
      case 'LED': return (
        <g>
          <circle cx="20" cy="24" r="18" fill="#d74c3c" stroke="#a5362c" strokeWidth="2"/>
          <circle cx="20" cy="24" r="11" fill="#ef6d69"/>
          <circle cx="20" cy="24" r="6" fill="#fff" opacity="0.9"/>
          <line x1="20" y1="42" x2="20" y2="72" stroke="#b1b7bd" strokeWidth="2"/>
          <line x1="12" y1="42" x2="12" y2="72" stroke="#b1b7bd" strokeWidth="2"/>
          <text x="20" y="86" fill="#dfe6e9" fontSize="7" fontFamily="monospace" textAnchor="middle">LED</text>
        </g>
      );
      case 'BUTTON': return (
        <g>
          <rect x="4" y="6" width="40" height="32" rx="6" fill="#7f8a94" stroke="#374144" strokeWidth="2"/>
          <rect x="10" y="10" width="28" height="24" rx="5" fill="#e69f3a" stroke="#c87323" strokeWidth="1"/>
          <circle cx="28" cy="22" r="8" fill="#fafafa" stroke="#b1b1b1" strokeWidth="1"/>
          <text x="28" y="47" fill="#dfe6e9" fontSize="7" fontFamily="monospace" textAnchor="middle">BUTTON</text>
        </g>
      );
      case 'BUZZER': return (
        <g>
          <circle cx="24" cy="28" r="22" fill="#343434" stroke="#525252" strokeWidth="2"/>
          <circle cx="24" cy="28" r="9" fill="#7d7d7d"/>
          <circle cx="24" cy="28" r="3" fill="#fff"/>
          <text x="24" y="58" fill="#dfe6e9" fontSize="7" fontFamily="monospace" textAnchor="middle">BUZZER</text>
        </g>
      );
      case 'SERVO': return (
        <g>
          <rect x="6" y="4" width="50" height="44" rx="5" fill="#35495e" stroke="#293642" strokeWidth="2"/>
          <circle cx="31" cy="18" r="9" fill="#c3c7c8" stroke="#8a9399" strokeWidth="1.5"/>
          <rect x="30" y="6" width="2" height="12" fill="#e74c3c"/>
          <text x="31" y="58" fill="#ecf0f1" fontSize="7" fontFamily="monospace" fontWeight="700" textAnchor="middle">SERVO</text>
        </g>
      );
      default: return <rect width="72" height="110" rx="6" fill="#2e7bb7" stroke="#1d4f72" strokeWidth="2"/>;
    }
  };

  return (
    <g transform={`translate(${COMP_X}, ${COMP_Y})`}>
      {renderBody()}
      {/* Pin dots + labels */}
      {pins.map(pin => {
        const isActive = activePinName?.toUpperCase() === pin.name.toUpperCase();
        const isDone   = drawnPins.has(pin.name.toUpperCase());
        return (
          <g key={pin.name}>
            <circle cx={pin.relX} cy={pin.relY} r={isActive ? 7 : 5}
              fill={pin.fill}
              stroke={isDone ? '#2ecc71' : isActive ? '#ffffff' : '#7f8c8d'}
              strokeWidth={isActive ? 2 : 1.2}
              style={{transition:'all .2s'}}
            />
            {/* Pin label below dot — larger and readable */}
            <text x={pin.relX} y={pin.relY + 14}
              fill={isDone ? '#2ecc71' : '#e0e0e0'}
              fontSize="7.5" fontFamily="monospace" fontWeight="600" textAnchor="middle">
              {pin.name}
            </text>
          </g>
        );
      })}
      {/* Running indicator */}
      {isRunning && (
        <circle cx={36} cy={-10} r="5" fill="#4ade80"
          style={{animation:'ledpulse 1s ease-in-out infinite'}}/>
      )}
    </g>
  );
}

// ─── Wire legend panel ────────────────────────────────────────────────────────
function WireLegend({ cfg, steps, drawnPins }: {
  cfg: ComponentConfig; steps: Step[]; drawnPins: Set<string>;
}) {
  const wSteps = steps.filter(s => s.wire);
  const h = wSteps.length * 22 + 30;
  return (
    <g transform="translate(490, 230)">
      <rect width="152" height={h} rx="6" fill="#111" stroke="#2a2a2a" strokeWidth="1"/>
      <text x="76" y="16" fill="#ccc" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="700">
        {cfg.label || cfg.type} Pinout
      </text>
      {wSteps.map((s, i) => {
        if (!s.wire) return null;
        const done = drawnPins.has(s.wire.compPinName.toUpperCase());
        return (
          <g key={i} transform={`translate(8, ${22 + i * 22})`}>
            <circle cx="7" cy="7" r="5" fill={s.wire.color} stroke="#444" strokeWidth="0.8"/>
            <text x="17" y="11" fill={done ? '#2ecc71' : '#bbb'} fontSize="7.5" fontFamily="monospace">
              {s.wire.compPinName} → {s.wire.espPinKey}
            </text>
            {done && <text x="138" y="11" fill="#2ecc71" fontSize="9" fontFamily="monospace">✓</text>}
          </g>
        );
      })}
    </g>
  );
}

// ─── Output Monitor ───────────────────────────────────────────────────────────
function OutputMonitor({ logs }: { logs: string[] }) {
  if (!logs.length) return null;
  return (
    <div style={{background:'#0c0c0d',border:'1px solid #2c3e50',borderRadius:6,padding:'8px 12px',marginTop:10,maxHeight:80,overflowY:'auto',fontFamily:'monospace',fontSize:11,color:'#2ecc71'}}>
      {logs.map((l,i) => <div key={i} style={{lineHeight:1.4}}>{l}</div>)}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function DynamicWiringSimulator({ component }: { component: ComponentConfig }) {
  const steps = useCallback(() => buildSteps(component), [component.type, component.label])();
  const [cur,       setCur]       = useState(0);
  const [drawn,     setDrawn]     = useState<Set<number>>(new Set());
  const [isRunning, setIsRunning] = useState(false);
  const [output,    setOutput]    = useState<string>();
  const [logs,      setLogs]      = useState<string[]>([]);

  const totalWires = steps.filter(s => s.wire).length;
  const allDone    = drawn.size === totalWires;
  const isLast     = cur === steps.length - 1;
  const s          = steps[cur];

  const drawnPins    = new Set([...drawn].map(i => steps[i].wire?.compPinName?.toUpperCase()).filter(Boolean) as string[]);
  const drawnEspKeys = new Set([...drawn].map(i => steps[i].wire?.espPinKey).filter(Boolean) as string[]);

  const handleNext = () => {
    if (s.wire && !drawn.has(cur)) setDrawn(p => new Set([...p, cur]));
    if (!isLast) setCur(c => c + 1);
  };
  const handleReset = () => { setCur(0); setDrawn(new Set()); setIsRunning(false); setOutput(undefined); setLogs([]); };

  useEffect(() => {
    if (!isRunning || !allDone) return;
    const id = setInterval(() => {
      let o='', l='';
      switch (component.type) {
        case 'DHT22':   { const t=(20+Math.random()*10).toFixed(1),h=(40+Math.random()*20).toFixed(1); o=`${t}°C  ${h}%`; l=`Temp: ${t}°C, Hum: ${h}%`; break; }
        case 'HC-SR04': { const d=(2+Math.random()*200).toFixed(1); o=`${d} cm`; l=`Distance: ${d} cm`; break; }
        case 'LED':     o='ON'; l='LED is ON'; break;
        case 'BUTTON':  o=Math.random()>.5?'PRESSED':'RELEASED'; l=`Button ${o}`; break;
        case 'BUZZER':  o='BEEP'; l='Buzzer active'; break;
        case 'SERVO':   { const a=(Math.random()*180).toFixed(0); o=`${a}°`; l=`Angle: ${a}°`; break; }
      }
      setOutput(o);
      setLogs(p => [...p.slice(-9), `[${new Date().toLocaleTimeString()}] ${l}`]);
    }, 1200);
    return () => clearInterval(id);
  }, [isRunning, allDone, component.type]);

  const nextLabel = isLast && allDone ? '✓ Done'
    : s.wire && !drawn.has(cur) ? 'Connect Wire →' : 'Next →';

  return (
    <div style={{background:'#1e1e1e',borderRadius:10,overflow:'hidden',fontFamily:'Inter,system-ui,sans-serif',boxShadow:'0 10px 30px rgba(0,0,0,0.5)'}}>

      {/* Toolbar */}
      <div style={{background:'#2d2d2d',borderBottom:'1px solid #3e3e3e',padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <div style={{display:'flex',gap:5}}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{width:10,height:10,borderRadius:'50%',background:c}}/>)}
          </div>
          <span style={{fontSize:13,fontWeight:600,color:'#ecf0f1',letterSpacing:.3}}>
            {getDescription(component.type)} – {component.label || component.type}
          </span>
          <span style={{background:'#0e639c',color:'#fff',fontSize:11,fontWeight:500,padding:'3px 10px',borderRadius:99}}>
            Step {cur+1}/{steps.length}
          </span>
        </div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={handleReset}
            style={{background:'#3e3e3e',border:'1px solid #555',color:'#ccc',fontSize:12,fontWeight:500,padding:'6px 12px',borderRadius:6,cursor:'pointer',fontFamily:'inherit'}}>
            ↺ Reset
          </button>
          <button onClick={() => { if (allDone || isRunning) setIsRunning(r => !r); }}
            style={{background:isRunning?'#c0392b':allDone?'#27ae60':'#555',border:'none',color:'#fff',fontSize:12,fontWeight:500,padding:'6px 16px',borderRadius:6,cursor:allDone||isRunning?'pointer':'default',opacity:allDone||isRunning?1:.5,fontFamily:'inherit'}}>
            {isRunning ? '⏹ Stop' : '▶ Run'}
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div style={{background:'#252526',borderBottom:'1px solid #3e3e3e'}}>
        <svg viewBox="0 0 680 360" width="100%" style={{display:'block',maxHeight:360}} preserveAspectRatio="xMidYMid meet">

          <ESP32SVG step={s} drawnEspKeys={drawnEspKeys}/>

          <ComponentSVG
            cfg={component}
            activePinName={s.wire && !drawn.has(cur) ? s.wire.compPinName : undefined}
            drawnPins={drawnPins}
            isRunning={isRunning}
            output={output}
          />

          <WireLegend cfg={component} steps={steps} drawnPins={drawnPins}/>

          {/* Ghost preview — FIX 2: uses correct routing */}
          {s.wire && !drawn.has(cur) && (
            <path
              d={getWirePath(s.wire.x1, s.wire.y1, s.wire.x2, s.wire.y2, s.wire.side)}
              fill="none" stroke={s.wire.color} strokeWidth="2" strokeDasharray="5,4" opacity="0.3"
            />
          )}

          {/* Drawn wires — FIX 2: orthogonal routing never crosses ESP32 */}
          {[...drawn].map(idx => {
            const w = steps[idx].wire;
            if (!w) return null;
            const d = getWirePath(w.x1, w.y1, w.x2, w.y2, w.side);
            return (
              <g key={idx}>
                <path d={d} fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d={d} fill="none" stroke={w.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx={w.x1} cy={w.y1} r="5" fill={w.color} stroke="#fff" strokeWidth="1.5"/>
                <circle cx={w.x2} cy={w.y2} r="5" fill={w.color} stroke="#fff" strokeWidth="1.5"/>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom panel */}
      <div style={{background:'#2d2d2d',padding:'12px 16px'}}>
        {allDone && (
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'7px 12px',background:'rgba(39,174,96,.15)',border:'1px solid rgba(39,174,96,.35)',borderRadius:8,marginBottom:10}}>
            <span style={{fontSize:14}}>✅</span>
            <span style={{fontSize:12,color:'#2ecc71',fontWeight:500}}>Circuit complete — click Run to simulate!</span>
          </div>
        )}

        <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:10}}>
          <div style={{width:22,height:22,minWidth:22,borderRadius:'50%',background:'#0e639c',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,marginTop:1}}>
            {cur+1}
          </div>
          <p style={{fontSize:12,color:'#ccc',lineHeight:1.65,margin:0}}>{s.text}</p>
        </div>

        {s.wire && (
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
            <div style={{height:6,width:28,borderRadius:3,background:s.wire.color,boxShadow:`0 0 5px ${s.wire.color}`}}/>
            <span style={{fontSize:11,color:'#aaa',fontFamily:'monospace'}}>{s.wire.label}</span>
          </div>
        )}

        <div style={{display:'flex',gap:5,marginBottom:12}}>
          {steps.map((_,i) => (
            <div key={i} style={{height:5,borderRadius:99,transition:'all .3s',width:i===cur?18:5,
              background:drawn.has(i)?'#27ae60':i===cur?'#0e639c':'#3e3e3e'}}/>
          ))}
        </div>

        <div style={{display:'flex',gap:8}}>
          <button onClick={() => cur>0 && setCur(c=>c-1)} disabled={cur===0}
            style={{background:'#3e3e3e',border:'1px solid #555',color:'#ccc',fontSize:12,fontWeight:500,padding:'7px 14px',borderRadius:6,cursor:'pointer',opacity:cur===0?.3:1,fontFamily:'inherit'}}>
            ← Back
          </button>
          <button onClick={handleNext} disabled={isLast&&allDone}
            style={{flex:1,background:isLast&&allDone?'#555':'#0e639c',border:'none',color:'#fff',fontSize:12,fontWeight:500,padding:'7px 0',borderRadius:6,cursor:isLast&&allDone?'default':'pointer',opacity:isLast&&allDone?.6:1,fontFamily:'inherit'}}>
            {nextLabel}
          </button>
        </div>

        {isRunning && allDone && <OutputMonitor logs={logs}/>}
      </div>

      <style>{`
        @keyframes ledpulse { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes rotateServo { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  );
}