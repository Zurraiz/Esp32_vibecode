'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export type WirePin = {
    name: string;
    connectTo: string;
    color: 'red' | 'black' | 'yellow' | 'orange' | 'blue' | 'green' | 'white' | 'purple';
};
export type ComponentConfig = {
    type: 'DHT22' | 'HC-SR04' | 'LED' | 'BUTTON' | 'BUZZER' | 'SERVO' | 'TRAFFIC_LIGHT' | 'DISTANCE_ALARM' | 'BUTTON_LED';
    label?: string;
    pins: WirePin[];
};

// ─── Wire colors ──────────────────────────────────────────────────────────────
const WHex: Record<string, string> = {
    red: '#e53e3e', black: '#555', yellow: '#d69e2e', orange: '#dd6b20',
    blue: '#3182ce', green: '#38a169', white: '#ddd', purple: '#805ad5',
};

// ─── SVG dimensions ───────────────────────────────────────────────────────────
// ViewBox: 0 0 720 440
// Breadboard: x=4..324  (320px wide)
// ESP32 PCB:  x=68..244 (176px wide) sits on breadboard
// Left pins:  x=82  (inside PCB, left header)
// Right pins: x=230 (inside PCB, right header)
// Component zone: x=370..700

const LP_X = 82;   // left pin header x (wire endpoint on ESP32)
const RP_X = 230;  // right pin header x
const ROW0 = 52;   // first pin row y
const DY = 19;   // row spacing

// Breadboard left block holes: col 0..3 → x = 24 + col*12
// Breadboard right block holes: col 0..3 → x = 176 + col*12
const BB_L0 = 24;   // left block col-0 x
const BB_R0 = 176;  // right block col-0 x

function rowY(r: number) { return ROW0 + r * DY; }

// ─── ESP32 Pinout ─────────────────────────────────────────────────────────────
const LP = [
    '3V3', 'EN', 'VP', 'VN', 'IO34', 'IO35', 'IO32', 'IO33',
    'IO25', 'IO26', 'IO27', 'IO14', 'IO12', 'GND', 'IO13',
    'SD2', 'SD3', 'CMD', 'VIN',
];
const RP = [
    'GND', 'IO23', 'IO22', 'TX0', 'RX0', 'IO21', 'GND', 'IO19',
    'IO18', 'IO5', 'IO17', 'IO16', 'IO4', 'IO0', 'IO2', 'IO15',
    'SD1', 'SD0', 'CLK',
];
const PMAP: Record<string, string> = {
    '3.3V': '3V3', '3V3': '3V3', 'GND': 'GND', '5V': 'VIN', 'VIN': 'VIN',
    'GPIO0': 'IO0', 'GPIO2': 'IO2', 'GPIO4': 'IO4', 'GPIO5': 'IO5',
    'GPIO12': 'IO12', 'GPIO13': 'IO13', 'GPIO14': 'IO14', 'GPIO15': 'IO15',
    'GPIO16': 'IO16', 'GPIO17': 'IO17', 'GPIO18': 'IO18', 'GPIO19': 'IO19',
    'GPIO21': 'IO21', 'GPIO22': 'IO22', 'GPIO23': 'IO23',
    'GPIO25': 'IO25', 'GPIO26': 'IO26', 'GPIO27': 'IO27',
    'GPIO32': 'IO32', 'GPIO33': 'IO33', 'GPIO34': 'IO34',
    'GPIO36': 'VP', 'GPIO39': 'VN', 'GPIO48': 'IO4',
    'TX0': 'TX0', 'RX0': 'RX0',
};

function getEspCoord(raw: string): { x: number; y: number; side: 'left' | 'right' } {
    const n = PMAP[raw] ?? raw;
    const li = LP.indexOf(n);
    if (li !== -1) return { x: LP_X, y: rowY(li), side: 'left' };
    const ri = RP.indexOf(n);
    if (ri !== -1) return { x: RP_X, y: rowY(ri), side: 'right' };
    return { x: RP_X, y: rowY(5), side: 'right' };
}

// ─── Wire routing ─────────────────────────────────────────────────────────────
// ESP32 body: x=68..244. Component: x=370+
// For right-side pins: curve from component → right past ESP → down/up → pin
// For left-side pins:  curve from component → right past ESP → up/down around → left to pin
function makePath(x1: number, y1: number, x2: number, y2: number, side: 'left' | 'right', laneOffset = 0): string {
    // x1 = component pin (right side ~420+)
    // x2 = ESP32 pin (LP_X=82 or RP_X=230)
    const exitR = 260; // clear right of ESP32
    const exitL = 55;  // clear left of ESP32

    if (side === 'right') {
        // Slight stagger so wires don't stack
        const cx1 = x1 + 40;
        const cx2 = exitR + (x2 - exitR) * 0.6;
        return `M${x1},${y1} C${cx1},${y1} ${cx2},${y2} ${x2},${y2}`;
    } else {
        // Left pin: route above or below ESP32
        // laneOffset staggers multiple wires so they don't overlap
        const baseAbove = 6;
        const baseBelow = 432;
        const isAbove = (y1 + y2) / 2 < 220;
        const mid = isAbove
            ? baseAbove + laneOffset * 8   // stack upward: 6, 14, 22, 30...
            : baseBelow - laneOffset * 8;  // stack downward: 432, 424, 416...
        return [
            `M${x1},${y1}`,
            `C${x1 + 50},${y1} ${exitR + 30},${(y1 + mid) / 2} ${exitR},${mid}`,
            `C${exitR - 20},${mid} ${exitL + 10},${(mid + y2) / 2} ${exitL},${y2}`,
            `L${x2},${y2}`,
        ].join(' ');
    }
}

// ─── Resistor breadboard placement ───────────────────────────────────────────
const RES_COL_ESP = BB_L0;        // x=24  left block ESP side
const RES_COL_COMP = BB_L0 + 24;  // x=48  left block component side
const RES_MID_X = BB_L0 + 12;  // x=36  left block center

const RES_COL_ESP_R = 276;  // right block ESP side
const RES_COL_COMP_R = 252;  // right block component side
const RES_MID_X_R = 264;  // right block center

function resRowY(pinIndex: number): number {
    return rowY(3 + pinIndex * 2);
}

function makePathA(x1: number, y1: number, resY: number, side: 'left' | 'right'): string {
    const colComp = side === 'right' ? RES_COL_COMP_R : RES_COL_COMP;
    return `M${x1},${y1} L${x1},${resY} L${colComp},${resY}`;
}

function makePathB(resY: number, x2: number, y2: number, side: 'left' | 'right', laneOffset = 0): string {
    const colEsp = side === 'right' ? RES_COL_ESP_R : RES_COL_ESP;
    return makePath(colEsp, resY, x2, y2, side, laneOffset);
}

// ─── Component pin definitions ────────────────────────────────────────────────
type CPinDef = { name: string; cx: number; cy: number; color: string; tip: string };

// CORG = component group origin in SVG
const CORG = { x: 390, y: 55 };

const CPINS: Record<string, CPinDef[]> = {
    DHT22: [
        { name: 'VCC', cx: 20, cy: 170, color: '#e53e3e', tip: 'Power 3.3V' },
        { name: 'DATA', cx: 60, cy: 170, color: '#d69e2e', tip: 'Data to GPIO' },
        { name: 'NC', cx: 100, cy: 170, color: '#666', tip: 'Not Connected' },
        { name: 'GND', cx: 140, cy: 170, color: '#888', tip: 'Ground' },
    ],
    'HC-SR04': [
        { name: 'VCC', cx: 20, cy: 148, color: '#e53e3e', tip: 'Power 5V' },
        { name: 'TRIG', cx: 60, cy: 148, color: '#dd6b20', tip: 'Trigger GPIO' },
        { name: 'ECHO', cx: 100, cy: 148, color: '#805ad5', tip: 'Echo GPIO' },
        { name: 'GND', cx: 140, cy: 148, color: '#888', tip: 'Ground' },
    ],
    LED: [
        { name: '+', cx: 42, cy: 190, color: '#e53e3e', tip: 'Anode (+) long leg — needs 220Ω' },
        { name: '-', cx: 88, cy: 190, color: '#888', tip: 'Cathode (-) short leg' },
    ],
    BUTTON: [
        { name: 'PIN1', cx: 28, cy: 148, color: '#dd6b20', tip: 'To GPIO' },
        { name: 'PIN2', cx: 100, cy: 148, color: '#888', tip: 'To GND' },
    ],
    BUZZER: [
        { name: '+', cx: 42, cy: 148, color: '#e53e3e', tip: 'Positive to GPIO' },
        { name: '-', cx: 88, cy: 148, color: '#888', tip: 'Negative to GND' },
    ],
    SERVO: [
        { name: 'VCC', cx: 28, cy: 138, color: '#e53e3e', tip: 'Power 5V' },
        { name: 'GND', cx: 66, cy: 138, color: '#888', tip: 'Ground' },
        { name: 'SIG', cx: 104, cy: 138, color: '#dd6b20', tip: 'PWM signal' },
    ],
    TRAFFIC_LIGHT: [
        { name: 'RED+', cx: 20, cy: 222, color: '#e53e3e', tip: 'Red LED anode — 220Ω to GPIO25' },
        { name: 'R-GND', cx: 45, cy: 222, color: '#000000', tip: 'Red LED cathode to GND' },
        { name: 'YEL+', cx: 125, cy: 222, color: '#d69e2e', tip: 'Yellow LED anode — 220Ω to GPIO26' },
        { name: 'Y-GND', cx: 150, cy: 222, color: '#000000', tip: 'Yellow LED cathode to GND' },
        { name: 'GRN+', cx: 232, cy: 222, color: '#38a169', tip: 'Green LED anode — 220Ω to GPIO27' },
        { name: 'G-GND', cx: 257, cy: 222, color: '#050505', tip: 'Green LED cathode to GND' },
    ],
    BUTTON_LED: [
        // Button pins
        { name: 'PIN1', cx: 28, cy: 148, color: '#dd6b20', tip: 'Button → GPIO0 (with INPUT_PULLUP)' },
        { name: 'PIN2', cx: 111, cy: 148, color: '#888', tip: 'Button → GND' },
        // LED pins — separate component on right side
        { name: '+', cx: 198, cy: 185, color: '#e53e3e', tip: 'LED Anode (+) — through 220Ω resistor' },
        { name: '-', cx: 242, cy: 185, color: '#888', tip: 'LED Cathode (-) → GND' },
    ],
    DISTANCE_ALARM: [
        { name: 'VCC', cx: 30, cy: 115, color: '#e53e3e', tip: 'HC-SR04 Power 5V' },
        { name: 'TRIG', cx: 70, cy: 115, color: '#dd6b20', tip: 'Trigger GPIO12' },
        { name: 'ECHO', cx: 110, cy: 115, color: '#805ad5', tip: 'Echo GPIO13' },
        { name: 'SR-GND', cx: 150, cy: 115, color: '#888', tip: 'HC-SR04 Ground' },
        { name: 'BUZ+', cx: 220, cy: 115, color: '#e53e3e', tip: 'Buzzer+ GPIO14' },
        { name: 'BUZ-', cx: 260, cy: 115, color: '#888', tip: 'Buzzer- GND' },
    ],
};

function needsResistor(type: string, pinName: string): boolean {
    if (type === 'LED' && pinName === '+') return true;
    if (type === 'BUTTON_LED' && pinName === '+') return true;
    if (type === 'TRAFFIC_LIGHT' && pinName.endsWith('+')) return true;
    return false;
}

// ─── Steps ────────────────────────────────────────────────────────────────────
type WireData = {
    x1: number; y1: number; x2: number; y2: number;
    color: string; label: string; cpName: string; epKey: string;
    side: 'left' | 'right'; hasR: boolean; resY: number; pinIdx: number;
    laneOffset: number; // prevents wire overlap when multiple left-side wires
};
type Step = {
    instr: string; why: string;
    wire: WireData | null;
    logText: string | null; logColor: string;
};

const WHY_MAP: Record<string, string> = {
    VCC: 'Powers the component. 3.3V from ESP32 3V3 pin — regulated and stable.',
    DATA: 'Single-wire protocol. GPIO reads temp+humidity every 2 seconds.',
    GND: 'Ground completes the circuit. Every component needs a ground return path.',
    TRIG: 'ESP32 sends a 10µs HIGH pulse → sensor fires ultrasonic burst at 40kHz.',
    ECHO: 'Time-of-flight measurement. Distance = (pulse_width × 340m/s) ÷ 2.',
    SIG: 'PWM signal. 1ms=0°, 1.5ms=90°, 2ms=180°. Frequency: 50Hz.',
    '+': 'LED anode — positive leg (longer). MUST use 220Ω resistor to limit current.',
    '-': 'LED cathode — negative leg (shorter). Always connects to GND.',
    PIN1: 'GPIO with INPUT_PULLUP. When button pressed → GPIO reads LOW.',
    PIN2: 'Ground terminal. Button press creates LOW signal on GPIO.',
    'RED+': 'GPIO25 → HIGH → red LED on. 220Ω resistor in series = ~15mA.',
    'YEL+': 'GPIO26 controls yellow. Represents "slow down" in traffic cycle.',
    'GRN+': 'GPIO27 controls green. Represents "go" in traffic cycle.',
    'R-GND': 'Red LED cathode → GND. Completes circuit: GPIO25→R→LED→GND.',
    'Y-GND': 'Yellow LED cathode → GND.',
    'G-GND': 'Green LED cathode → GND.',
    'BUZ+': 'GPIO14 drives buzzer. HIGH when distance < 20cm.',
    'BUZ-': 'Buzzer negative → GND to complete circuit.',
    'SR-GND': 'HC-SR04 needs its own GND connection.',
};

function buildSteps(cfg: ComponentConfig): Step[] {
    const pins = CPINS[cfg.type] || CPINS.DHT22;
    const label = cfg.label || cfg.type;
    const steps: Step[] = [{
        instr: `Wiring ${label} to ESP32 WROOM-32. ${cfg.pins.length} connections needed. Follow each step carefully.`,
        why: `The ESP32 operates at 3.3V logic and has WiFi + BLE. Each pin serves a specific function — power, ground, or data.`,
        wire: null, logText: null, logColor: '#48bb78',
    }];

    cfg.pins.forEach((pin, i) => {
        const cp = pins.find(p => p.name.toUpperCase() === pin.name.toUpperCase()) || pins[i] || pins[0];
        const ep = getEspCoord(pin.connectTo);
        const hex = WHex[pin.color] || WHex.red;
        const epKey = PMAP[pin.connectTo] ?? pin.connectTo;
        const hasR = needsResistor(cfg.type, pin.name);
        const rY = hasR ? resRowY(i) : 0;

        steps.push({
            instr: hasR
                ? `⚡ Place 220Ω resistor in breadboard row ${3 + i * 2}. Then connect ${label} ${pin.name} → row ${3 + i * 2} → ESP32 ${pin.connectTo} (${pin.color} wire)`
                : `Connect ${label} ${pin.name} → ESP32 ${pin.connectTo} using ${pin.color} wire`,
            why: WHY_MAP[pin.name] || `Connects ${label} ${pin.name} to ESP32 ${pin.connectTo}.`,
            wire: {
                x1: CORG.x + cp.cx, y1: CORG.y + cp.cy,
                x2: ep.x, y2: ep.y,
                color: hex,
                label: `${pin.color} · ${pin.name} → ${pin.connectTo}${hasR ? ' (via 220Ω)' : ''}`,
                cpName: pin.name, epKey, side: ep.side,
                hasR, resY: rY, pinIdx: i,
                laneOffset: i, // each wire gets its own lane to prevent overlap
            },
            logText: `${pin.name} → ${pin.connectTo}${hasR ? ' [220Ω]' : ''}`,
            logColor: hex,
        });
    });

    steps.push({
        instr: '✅ All connections complete! Click ▶ Run to simulate.',
        why: 'Every pin is wired. Current can flow through all components now.',
        wire: null, logText: 'Circuit verified.', logColor: '#48bb78',
    });
    return steps;
}

function compLabel(t: string): string {
    return ({
        DHT22: 'Temp & Humidity', 'HC-SR04': 'Ultrasonic Distance',
        LED: 'LED', BUTTON: 'Push Button', BUZZER: 'Buzzer',
        SERVO: 'Servo Motor', TRAFFIC_LIGHT: 'Traffic Light',
        DISTANCE_ALARM: 'Distance Alarm', BUTTON_LED: 'Button + LED',
    } as Record<string, string>)[t] || t;
}

function WireErrorBoundary({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

// ─── Wire SVG with breadboard resistor ────────────────────────────────────────
function WireEl({ w, running }: { w: WireData; running: boolean }) {
    const refA = useRef<SVGPathElement>(null);
    const refB = useRef<SVGPathElement>(null);
    const dot1 = useRef<SVGCircleElement>(null);
    const dot2 = useRef<SVGCircleElement>(null);
    const prog = useRef(0.0);
    const prog2 = useRef(0.5);
    const rafId = useRef<number>(0);

    // Side-aware resistor positions
    const midX = w.side === 'right' ? RES_MID_X_R : RES_MID_X;
    const colESP = w.side === 'right' ? RES_COL_ESP_R : RES_COL_ESP;
    const colCOMP = w.side === 'right' ? RES_COL_COMP_R : RES_COL_COMP;

    const dA = w.hasR ? makePathA(w.x1, w.y1, w.resY, w.side) : makePath(w.x1, w.y1, w.x2, w.y2, w.side, w.laneOffset);
    const dB = w.hasR ? makePathB(w.resY, w.x2, w.y2, w.side, w.laneOffset) : '';

    useEffect(() => {
        const anim = (el: SVGPathElement | null, delay: number) => {
            if (!el) return () => { };
            try {
                const len = el.getTotalLength() || 300;
                el.style.strokeDasharray = `${len}`;
                el.style.strokeDashoffset = `${len}`;
                let st: number | null = null;
                let rf: number;
                const tick = (ts: number) => {
                    if (!st) st = ts + delay;
                    const t = Math.min((ts - st) / 650, 1);
                    if (t < 0) { rf = requestAnimationFrame(tick); return; }
                    el.style.strokeDashoffset = `${len * (1 - (1 - Math.pow(1 - t, 3)))}`;
                    if (t < 1) rf = requestAnimationFrame(tick);
                };
                rf = requestAnimationFrame(tick);
                return () => cancelAnimationFrame(rf);
            } catch { return () => { }; }
        };
        if (refA.current) refA.current.setAttribute('d', dA);
        if (refB.current) refB.current.setAttribute('d', dB);
        const c1 = anim(refA.current, 0);
        const c2 = anim(refB.current, 350);
        return () => { c1(); c2(); };
    }, [dA, dB]);

    useEffect(() => {
        const flowEl = w.hasR ? refB.current : refA.current;
        if (!running || !flowEl) {
            if (dot1.current) dot1.current.setAttribute('opacity', '0');
            if (dot2.current) dot2.current.setAttribute('opacity', '0');
            return;
        }
        let last = 0;
        let cancelled = false;                              // ← added
        const cachedLen = flowEl.getTotalLength();          // ← cache length once, not every frame
        const tick = (ts: number) => {
            if (cancelled) return;                          // ← added
            const dt = Math.min(ts - last, 50); last = ts;
            prog.current = (prog.current + dt * 0.00038) % 1;
            prog2.current = (prog2.current + dt * 0.00038) % 1;
            try {
                const p1 = flowEl.getPointAtLength(prog.current * cachedLen);
                const p2 = flowEl.getPointAtLength(prog2.current * cachedLen);
                dot1.current?.setAttribute('cx', `${p1.x}`);
                dot1.current?.setAttribute('cy', `${p1.y}`);
                dot1.current?.setAttribute('opacity', '0.9');
                dot2.current?.setAttribute('cx', `${p2.x}`);
                dot2.current?.setAttribute('cy', `${p2.y}`);
                dot2.current?.setAttribute('opacity', '0.55');
            } catch { }
            rafId.current = requestAnimationFrame(tick);
        };
        rafId.current = requestAnimationFrame(tick);
        return () => {
            cancelled = true;                               // ← added
            cancelAnimationFrame(rafId.current);
            dot1.current?.setAttribute('opacity', '0');
            dot2.current?.setAttribute('opacity', '0');
        };
    }, [running, w.hasR, dA, dB]);

    const renderWirePath = (d: string, ref: React.RefObject<SVGPathElement>) => (
        <g>
            <path d={d} fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
            <path ref={ref} d={d} fill="none" stroke={w.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d={d} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeLinecap="round" />
        </g>
    );

    return (
        <g>
            {renderWirePath(dA, refA)}
            <circle cx={w.x1} cy={w.y1} r="5" fill={w.color} stroke="#fff" strokeWidth="1.5" />

            {w.hasR ? (
                <>
                    <g>
                        {/* Highlighted row strip */}
                        <rect
                            x={Math.min(colESP, colCOMP) - 4} y={w.resY - 6}
                            width={Math.abs(colCOMP - colESP) + 12} height="12"
                            rx="2" fill="rgba(210,160,40,0.15)" stroke="rgba(210,160,40,0.4)" strokeWidth="0.8"
                        />
                        {/* Component side leg hole */}
                        <circle cx={colCOMP} cy={w.resY} r="4" fill={w.color} stroke="#fff" strokeWidth="1.5" />
                        {/* Resistor body */}
                        <g transform={`translate(${midX},${w.resY})`}>
                            <line x1="-18" y1="0" x2="-12" y2="0" stroke="#999" strokeWidth="1.8" />
                            <line x1="12" y1="0" x2="18" y2="0" stroke="#999" strokeWidth="1.8" />
                            <rect x="-12" y="-6" width="24" height="12" rx="3.5" fill="#c8903c" stroke="#8a6000" strokeWidth="1.2" />
                            <rect x="-9" y="-6" width="5" height="12" fill="#c0392b" opacity="0.95" />
                            <rect x="-3" y="-6" width="5" height="12" fill="#c0392b" opacity="0.95" />
                            <rect x="3" y="-6" width="5" height="12" fill="#6d3800" opacity="0.95" />
                            <text x="0" y="-10" fill="#e6a020" fontSize="8.5" fontFamily="monospace" textAnchor="middle" fontWeight="700">220Ω</text>
                        </g>
                        {/* ESP32 side leg hole */}
                        <circle cx={colESP} cy={w.resY} r="4" fill={w.color} stroke="#fff" strokeWidth="1.5" />
                    </g>
                    {renderWirePath(dB, refB)}
                    <circle cx={w.x2} cy={w.y2} r="5" fill={w.color} stroke="#fff" strokeWidth="1.5" />
                </>
            ) : (
                <circle cx={w.x2} cy={w.y2} r="5" fill={w.color} stroke="#fff" strokeWidth="1.5" />
            )}

            <circle ref={dot1} cx="0" cy="0" r="4" fill="rgba(255,255,255,0.9)" opacity="0" />
            <circle ref={dot2} cx="0" cy="0" r="2.8" fill="rgba(255,255,255,0.6)" opacity="0" />
        </g>
    );
}

// ─── Component bodies ─────────────────────────────────────────────────────────
function DHT22Body({ running, out }: { running: boolean; out?: string }) {
    return (
        <g>
            <rect width="160" height="145" rx="8" fill="#1a2a4a" stroke="#2b4a8a" strokeWidth="2" />
            <rect x="8" y="8" width="144" height="82" rx="6" fill="#0d1e3a" />
            {[0, 1, 2, 3].map(r => [0, 1, 2, 3, 4].map(c => (
                <circle key={`${r}${c}`} cx={24 + c * 24} cy={24 + r * 18} r="3" fill="#1a3a6a" opacity="0.8" />
            )))}
            <text x="80" y="112" fill="#ffffff" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="monospace">DHT22</text>
            <text x="80" y="126" fill="#ffffff" fontSize="8" textAnchor="middle" fontFamily="monospace">TEMP + HUMIDITY</text>
            <rect x="8" y="132" width="144" height="22" rx="4" fill="#010a18" stroke="#1a4a7a" strokeWidth="1" />
            {running && out
                ? <text x="80" y="147" fill="#00e676" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">{out}</text>
                : <text x="80" y="146" fill="#0d2a3a" fontSize="9" textAnchor="middle" fontFamily="monospace">-- °C  -- %</text>
            }
            {[20, 60, 100, 140].map(x => <line key={x} x1={x} y1="154" x2={x} y2="170" stroke="#888" strokeWidth="2.5" />)}
        </g>
    );
}

function HCSRBody({ running, out }: { running: boolean; out?: string }) {
    return (
        <g>
            <rect width="168" height="128" rx="8" fill="#1a3a1a" stroke="#2d6a2d" strokeWidth="2" />
            {[42, 126].map((cx, i) => (
                <g key={i}>
                    <circle cx={cx} cy={52} r="34" fill="#bec8d0" stroke="#8a9298" strokeWidth="2" />
                    <circle cx={cx} cy={52} r="24" fill="#3a3a3a" />
                    <circle cx={cx} cy={52} r="13" fill="#111" />
                    <circle cx={cx - 7} cy={45} r="5" fill="rgba(255,255,255,0.28)" />
                    {running && (
                        <>
                            <circle cx={cx} cy={52} r="38" fill="none" stroke="rgba(0,255,180,0.28)" strokeWidth="2"
                                style={{ animation: `ping 1.5s ${i * 0.45}s ease-out infinite` }} />
                            <circle cx={cx} cy={52} r="46" fill="none" stroke="rgba(0,255,180,0.13)" strokeWidth="1.5"
                                style={{ animation: `ping 1.5s ${i * 0.45 + 0.5}s ease-out infinite` }} />
                        </>
                    )}
                </g>
            ))}
            <text x="84" y="105" fill="#86efac" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="monospace">HC-SR04</text>
            <rect x="6" y="112" width="156" height="20" rx="3" fill="#010a02" stroke="#2d6a2d" />
            {running && out
                ? <text x="84" y="126" fill="#00e676" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">{out}</text>
                : <text x="84" y="125" fill="#0a2a0a" fontSize="9" textAnchor="middle" fontFamily="monospace">-- cm</text>
            }
            {[20, 60, 100, 140].map(x => <line key={x} x1={x} y1="132" x2={x} y2="148" stroke="#888" strokeWidth="2.5" />)}
        </g>
    );
}

function LEDBody({ running, on, sim }: { running: boolean; on: boolean; sim?: string }) {
    const lit = running && on && sim === 'ON';

    return (
        <g>
            {/* 🔥 Soft outer glow (multi-layer for realism) */}
            {lit && (
                <>
                    <circle cx="65" cy="60" r="75" fill="rgba(255,80,80,0.08)" />
                    <circle cx="65" cy="60" r="60" fill="rgba(255,60,60,0.12)" />
                </>
            )}

            {/* 💡 LED Dome (gradient illusion) */}
            <defs>
                <radialGradient id="ledGlow" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor={lit ? "#ffd1d1" : "#3a1b1b"} />
                    <stop offset="40%" stopColor={lit ? "#ff4d4d" : "#2a1515"} />
                    <stop offset="100%" stopColor={lit ? "#b91c1c" : "#120909"} />
                </radialGradient>
            </defs>

            <ellipse
                cx="65"
                cy="60"
                rx="52"
                ry="52"
                fill="url(#ledGlow)"
                stroke={lit ? "#ff8a8a" : "#3a2020"}
                strokeWidth="2"
                style={{ transition: "all .3s ease" }}
            />

            {/* ✨ Highlight reflection */}
            {lit && (
                <ellipse
                    cx="50"
                    cy="40"
                    rx="18"
                    ry="14"
                    fill="rgba(255,255,255,0.45)"
                />
            )}

            {/* 🧱 Base (more solid look) */}
            <rect
                x="12"
                y="108"
                width="106"
                height="14"
                rx="4"
                fill={lit ? "#9b1c1c" : "#1a1010"}
                style={{ transition: "fill .3s" }}
            />

            {/* ⚡ Legs slightly angled (more realistic) */}
            <line
                x1="45"
                y1="120"
                x2="40"
                y2="185"
                stroke="#9ca3af"
                strokeWidth="3.5"
            />
            <line
                x1="85"
                y1="120"
                x2="90"
                y2="185"
                stroke="#9ca3af"
                strokeWidth="3.5"
            />

            {/* ➕➖ Labels */}
            <text x="42" y="198" fill="#6b7280" fontSize="10" textAnchor="middle">
                +
            </text>
            <text x="88" y="198" fill="#6b7280" fontSize="10" textAnchor="middle">
                -
            </text>

            {/* 📊 Status (animated feel) */}
            <text
                x="65"
                y="215"
                fill={lit ? "#ff6b6b" : "#475569"}
                fontSize="14"
                fontWeight="700"
                textAnchor="middle"
            >
                {running ? (lit ? "● ACTIVE" : "○ INACTIVE") : "LED MODULE"}
            </text>

            {/* ⚡ Optional learning cue (current flow hint) */}
            {lit && (
                <text
                    x="65"
                    y="232"
                    fill="rgba(255,100,100,0.7)"
                    fontSize="10"
                    textAnchor="middle"
                >
                    current flowing...
                </text>
            )}
        </g>
    );
}

function ButtonBody({ running, pressed }: { running: boolean; pressed: boolean }) {
    const p = running && pressed;
    return (
        <g>
            <rect width="140" height="132" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            {[[10, 10], [130, 10], [10, 122], [130, 122]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3.5" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            ))}
            <rect x="16" y="14" width="108" height="88" rx="8" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <rect x="24" y={p ? '22' : '18'} width="92" height="72" rx="7"
                fill={p ? '#f97316' : '#ea580c'} stroke={p ? '#fdba74' : '#c2410c'} strokeWidth="2"
                style={{ transition: 'all .08s' }} />
            {p && <circle cx="70" cy="56" r="26" fill="rgba(249,115,22,0.18)" />}
            <text x="70" y="61" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="700"
                textAnchor="middle" fontFamily="monospace">{p ? 'PRESS' : 'BTN'}</text>
            <rect x="10" y="108" width="120" height="18" rx="4" fill="#0f172a" stroke="#1e293b" />
            <text x="70" y="121" fill={p ? '#fb923c' : '#64748b'} fontSize="10" fontWeight="700"
                textAnchor="middle" fontFamily="monospace">
                {running ? (p ? 'PRESSED' : 'RELEASED') : 'BUTTON'}
            </text>
            {[28, 52, 88, 112].map((x, i) => (
                <g key={i}>
                    <line x1={x} y1="126" x2={x} y2="148" stroke="#cbd5e1" strokeWidth="2.5" />
                    <circle cx={x} cy="148" r="2" fill="#94a3b8" />
                </g>
            ))}
        </g>
    );
}

function BuzzerBody({ running, beep }: { running: boolean; beep: boolean }) {
    const b = running && beep;
    return (
        <g>
            <circle cx="65" cy="65" r="60" fill="#111" stroke="#222" strokeWidth="2" />
            <circle cx="65" cy="65" r="42" fill="#1a1a1a" />
            <circle cx="65" cy="65" r="22" fill="#2a2a2a" />
            <circle cx="65" cy="65" r="8" fill="#3a3a3a" />
            <circle cx="65" cy="65" r="3" fill="#ddd" opacity="0.6" />
            {b && [1.2, 1.6, 2.0].map((r, i) => (
                <circle key={i} cx="65" cy="65" r={r * 42} fill="none" stroke="#fbbf24" strokeWidth="2"
                    opacity={0.6 - i * 0.18} style={{ animation: `ping 0.85s ${i * 0.16}s ease-out infinite` }} />
            ))}
            <text x="65" y="148" fill={b ? '#fbbf24' : '#4a5568'} fontSize="13" fontWeight="700"
                textAnchor="middle" fontFamily="monospace">
                {running ? (b ? 'BEEP!' : '—') : 'BUZZER'}
            </text>
            <line x1="42" y1="125" x2="42" y2="148" stroke="#888" strokeWidth="2.5" />
            <line x1="88" y1="125" x2="88" y2="148" stroke="#888" strokeWidth="2.5" />
        </g>
    );
}

function TrafficBody({ running, state, redOn, yellOn, greenOn }: {
    running: boolean; state?: string;
    redOn: boolean; yellOn: boolean; greenOn: boolean;
}) {
    const ro = redOn, yo = yellOn, go = greenOn;
    return (
        <g>
            {/* Housing */}
            <rect x="-8" y="-14" width="306" height="260" rx="12" fill="#0a0a0a" stroke="#1a1a1a" strokeWidth="2" />
            <rect x="-6" y="-12" width="302" height="256" rx="10" fill="#111" stroke="#222" strokeWidth="1" />

            {/* Title */}
            <text x="145" y="-2" fill="#2a2a2a" fontSize="7" textAnchor="middle"
                fontFamily="Inter,monospace" letterSpacing="1.5" fontWeight="600">TRAFFIC LIGHT</text>

            {[
                { cx: 30, on: ro, col: '#ef4444', dark: '#4a0000', glow: 'rgba(239,68,68,0.25)', lbl: 'RED' },
                { cx: 133, on: yo, col: '#eab308', dark: '#3d3000', glow: 'rgba(234,179,8,0.25)', lbl: 'YELLOW' },
                { cx: 240, on: go, col: '#22c55e', dark: '#003a15', glow: 'rgba(34,197,94,0.25)', lbl: 'GREEN' },
            ].map(led => (
                <g key={led.lbl}>
                    {/* Column */}
                    <rect x={led.cx - 38} y="-8" width="76" height="232" rx="6"
                        fill="#161616" stroke="#252525" strokeWidth="0.8" />

                    {/* LED label */}
                    <text x={led.cx} y="10" fill={led.on ? led.col : '#2a2a2a'} fontSize="8" fontWeight="700"
                        textAnchor="middle" fontFamily="Inter,monospace" letterSpacing="0.5">{led.lbl}</text>

                    {/* Outer ring — always visible */}
                    <circle cx={led.cx} cy="54" r="34"
                        fill={led.on ? led.dark : '#0d0d0d'}
                        stroke={led.on ? led.col : '#2a2a2a'} strokeWidth="2" />

                    {/* Glow bloom */}
                    {led.on && <circle cx={led.cx} cy="54" r="48" fill={led.glow} style={{ filter: 'blur(4px)' }} />}

                    {/* LED dome */}
                    <circle cx={led.cx} cy="54" r="26"
                        fill={led.on ? led.col : '#1a1a1a'}
                        stroke={led.on ? led.col : '#222'} strokeWidth="1.5"
                        style={{ transition: 'fill .25s, stroke .25s' }} />

                    {/* Dome shine */}
                    {led.on && (
                        <ellipse cx={led.cx - 8} cy={44} rx="9" ry="6"
                            fill="rgba(255,255,255,0.38)" />
                    )}

                    {/* Legs */}
                    <line x1={led.cx - 6} y1="90" x2={led.cx - 6} y2="162" stroke="#3a3a3a" strokeWidth="2" />
                    <line x1={led.cx + 6} y1="90" x2={led.cx + 6} y2="162" stroke="#3a3a3a" strokeWidth="2" />

                    {/* Pin labels */}
                    <text x={led.cx - 6} y="173" fill="#3a3a3a" fontSize="7"
                        textAnchor="middle" fontFamily="monospace">+</text>
                    <text x={led.cx + 6} y="173" fill="#3a3a3a" fontSize="7"
                        textAnchor="middle" fontFamily="monospace">-</text>
                </g>
            ))}

            {/* Status bar */}
            <rect x="-6" y="178" width="302" height="30" rx="5"
                fill={ro ? 'rgba(239,68,68,0.1)' : yo ? 'rgba(234,179,8,0.1)' : go ? 'rgba(34,197,94,0.1)' : '#080808'}
                stroke={ro ? '#ef444440' : yo ? '#eab30840' : go ? '#22c55e40' : '#1a1a1a'}
                strokeWidth="1" style={{ transition: 'all .3s' }} />
            {running && state
                ? <text x="145" y="198"
                    fill={state === 'RED' ? '#ef4444' : state === 'YELLOW' ? '#eab308' : '#22c55e'}
                    fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="Inter,monospace">
                    {state === 'RED' ? 'STOP' : state === 'YELLOW' ? 'WAIT' : 'GO'}
                </text>
                : <text x="145" y="197" fill="#2a2a2a" fontSize="9"
                    textAnchor="middle" fontFamily="Inter,monospace">● ● ●</text>
            }
        </g>
    );
}

function ServoBody({ running, out }: { running: boolean; out?: string }) {
    const angle = out ? parseInt(out) : 90;
    const rad = (angle - 90) * Math.PI / 180;
    return (
        <g>
            <rect width="148" height="108" rx="8" fill="#1a2a5a" stroke="#2a4a9a" strokeWidth="2" />
            <circle cx="74" cy="46" r="30" fill="#607d8b" stroke="#78909c" strokeWidth="2" />
            <circle cx="74" cy="46" r="18" fill="#455a64" />
            <circle cx="74" cy="46" r="8" fill="#37474f" />
            <line x1="74" y1="46"
                x2={74 + 26 * Math.cos(rad)} y2={46 + 26 * Math.sin(rad)}
                stroke="#ef5350" strokeWidth="5" strokeLinecap="round" />
            <rect x="8" y="88" width="132" height="16" rx="3" fill="#111" />
            {['#e53e3e', '#555', '#dd6b20'].map((c, i) => (
                <rect key={i} x={18 + i * 38} y="91" width="24" height="10" rx="2" fill={c} />
            ))}
            <text x="74" y="122" fill="#90caf9" fontSize="11" textAnchor="middle" fontFamily="monospace">
                {running && out ? out : 'SERVO'}
            </text>
            {[28, 64, 100].map(x => <line key={x} x1={x} y1="104" x2={x} y2="128" stroke="#888" strokeWidth="2.5" />)}
        </g>
    );
}

function DistanceAlarmBody({ running, sim }: { running: boolean; sim?: string }) {
    const dist = sim ? parseFloat(sim) : 999;
    const alarm = running && dist < 20;
    return (
        <g>
            {/* HC-SR04 */}
            <text x="85" y="-6" fill="#4a5568" fontSize="9" textAnchor="middle" fontFamily="monospace">HC-SR04</text>
            <rect width="170" height="100" rx="8" fill="#1a3a1a" stroke="#2d6a2d" strokeWidth="2" />
            {[42, 128].map((cx, i) => (
                <g key={i}>
                    <circle cx={cx} cy={42} r="30" fill="#bec8d0" stroke="#8a9298" strokeWidth="2" />
                    <circle cx={cx} cy={42} r="20" fill="#3a3a3a" />
                    <circle cx={cx} cy={42} r="10" fill="#111" />
                    <circle cx={cx - 7} cy={34} r="4" fill="rgba(255,255,255,0.28)" />
                    {running && (
                        <>
                            <circle cx={cx} cy={42} r="34" fill="none" stroke="rgba(0,255,180,0.3)" strokeWidth="2"
                                style={{ animation: `ping 1.5s ${i * 0.4}s ease-out infinite` }} />
                            <circle cx={cx} cy={42} r="40" fill="none" stroke="rgba(0,255,180,0.14)" strokeWidth="1.5"
                                style={{ animation: `ping 1.5s ${i * 0.4 + 0.5}s ease-out infinite` }} />
                        </>
                    )}
                </g>
            ))}
            <text x="85" y="78" fill="#86efac" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">HC-SR04</text>
            <rect x="5" y="84" width="160" height="20" rx="3" fill="#010a02" stroke="#2d6a2d" />
            {running && sim
                ? <text x="85" y="98" fill="#00e676" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="monospace">{sim}</text>
                : <text x="85" y="97" fill="#0a2a0a" fontSize="9" textAnchor="middle" fontFamily="monospace">-- cm</text>
            }

            {/* Buzzer */}
            <text x="238" y="10" fill="#4a5568" fontSize="9" textAnchor="middle" fontFamily="monospace">BUZZER</text>
            <g transform="translate(188,15)">
                <circle cx="50" cy="50" r="46" fill="#111" stroke="#222" strokeWidth="2" />
                <circle cx="50" cy="50" r="30" fill="#1a1a1a" />
                <circle cx="50" cy="50" r="14" fill="#2a2a2a" />
                <circle cx="50" cy="50" r="5" fill="#aaa" opacity="0.5" />
                {alarm && [1.1, 1.5, 1.9].map((r, i) => (
                    <circle key={i} cx="50" cy="50" r={r * 30} fill="none" stroke="#fbbf24" strokeWidth="2"
                        opacity={0.65 - i * 0.19} style={{ animation: `ping 0.6s ${i * 0.12}s ease-out infinite` }} />
                ))}
                <text x="50" y="160" fill={alarm ? '#fbbf24' : '#4a5568'} fontSize="9" fontWeight="700"
                    textAnchor="middle" fontFamily="monospace">
                    {running ? (alarm ? '⚠ BEEP' : 'SILENT') : 'BUZZER'}
                </text>
            </g>

            {/* Distance bar */}
            {running && sim && (
                <g transform="translate(0,255)">
                    {/* Track */}
                    <rect width="290" height="24" rx="6" fill="#0a0f0a" stroke="#1f2f1f" strokeWidth="1" />
                    {/* Fill */}
                    <rect x="2" y="2" width={Math.min(dist / 40 * 286, 286)} height="20" rx="5"
                        fill={dist < 20 ? '#ef4444' : dist < 40 ? '#f59e0b' : '#22c55e'}
                        style={{ transition: 'width .6s ease' }} />
                    {/* Distance left-aligned */}
                    <text x="8" y="16" fill="#fff" fontSize="9" fontWeight="700" fontFamily="monospace">
                        {sim}
                    </text>
                    {/* Status right-aligned */}
                    <text x="282" y="16" fill={dist < 20 ? '#fff' : '#000'} fontSize="9" fontWeight="700"
                        fontFamily="monospace" textAnchor="end">
                        {dist < 20 ? '⚠ ALARM!' : dist < 40 ? 'NEAR' : '✓ SAFE'}
                    </text>
                </g>
            )}
        </g>
    );
}

// ─── Button + LED combined component ─────────────────────────────────────────
function ButtonLEDBody({ running, pressed, ledOn, sim }: { running: boolean; pressed: boolean; ledOn: boolean; sim?: string }) {
    const p = running && sim === 'PRESSED';
    const lit = running && ledOn && p;
    return (
        <g>
            {/* ── BUTTON (left side) ── */}
            <text x="70" y="-8" fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">BUTTON</text>
            <rect width="140" height="132" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            {/* Corner holes */}
            {[[10, 10], [130, 10], [10, 122], [130, 122]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="3.5" fill="#0f172a" stroke="#475569" strokeWidth="1" />
            ))}
            <rect x="16" y="14" width="108" height="88" rx="8" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <rect x="24" y={p ? '22' : '18'} width="92" height="72" rx="7"
                fill={p ? '#f97316' : '#ea580c'} stroke={p ? '#fdba74' : '#c2410c'} strokeWidth="2"
                style={{ transition: 'all .08s' }} />
            {p && <circle cx="70" cy="56" r="26" fill="rgba(249,115,22,0.18)" />}
            <text x="70" y="61" fill="rgba(255,255,255,0.9)" fontSize="11" fontWeight="700"
                textAnchor="middle" fontFamily="monospace">{p ? 'PRESS' : 'BTN'}</text>
            <rect x="10" y="108" width="120" height="18" rx="4" fill="#0f172a" stroke="#1e293b" />
            <text x="70" y="121" fill={p ? '#fb923c' : '#64748b'} fontSize="10" fontWeight="700"
                textAnchor="middle" fontFamily="monospace">
                {running ? (p ? 'PRESSED' : 'RELEASED') : 'BUTTON'}
            </text>
            {/* Button legs */}
            {[28, 52, 88, 112].map((x, i) => (
                <g key={i}>
                    <line x1={x} y1="126" x2={x} y2="148" stroke="#cbd5e1" strokeWidth="2.5" />
                    <circle cx={x} cy="148" r="2" fill="#94a3b8" />
                </g>
            ))}

            {/* ── LED (right side) ── */}
            <text x="222" y="-8" fill="#64748b" fontSize="9" textAnchor="middle" fontFamily="monospace">LED</text>
            <g transform="translate(158, 0)">
                {/* Glow when lit */}
                {lit && <circle cx="62" cy="55" r="58" fill="rgba(255,60,60,0.16)" />}
                {/* Dome */}
                <ellipse cx="62" cy="55" rx="48" ry="48"
                    fill={lit ? '#e53e3e' : '#2a1515'} stroke={lit ? '#fc8181' : '#3a2020'} strokeWidth="2"
                    style={{ transition: 'fill .25s,stroke .25s' }} />
                {lit && <ellipse cx="48" cy="39" rx="15" ry="11" fill="rgba(255,255,255,0.48)" />}
                {/* Flat base */}
                <rect x="14" y="100" width="96" height="11" rx="3"
                    fill={lit ? '#c53030' : '#1a1010'} style={{ transition: 'fill .25s' }} />
                {/* Legs */}
                <line x1="40" y1="111" x2="40" y2="180" stroke="#909090" strokeWidth="3.5" />
                <line x1="84" y1="111" x2="84" y2="180" stroke="#909090" strokeWidth="3.5" />
                {/* Polarity */}
                <text x="40" y="193" fill="#666" fontSize="9" textAnchor="middle" fontFamily="monospace">+</text>
                <text x="84" y="193" fill="#666" fontSize="9" textAnchor="middle" fontFamily="monospace">-</text>
                {/* Status */}
                <text x="62" y="210" fill={lit ? '#fc8181' : '#4a5568'} fontSize="14" fontWeight="700"
                    textAnchor="middle" fontFamily="monospace">
                    {running ? (lit ? '● ON' : '○ OFF') : 'LED'}
                </text>
                {/* Logic arrow */}
                {running && (
                    <g transform="translate(-60, 60)">
                        <line x1="0" y1="0" x2="44" y2="0" stroke={p ? '#fb923c' : '#374151'} strokeWidth="2"
                            strokeDasharray={p ? 'none' : '4,3'} />
                        <polygon points="44,0 36,-4 36,4" fill={p ? '#fb923c' : '#374151'} />
                        <text x="22" y="-6" fill={p ? '#fb923c' : '#374151'} fontSize="7.5"
                            textAnchor="middle" fontFamily="monospace">{p ? 'HIGH' : 'LOW'}</text>
                    </g>
                )}
            </g>
        </g>
    );
}

// ─── Component dispatcher ─────────────────────────────────────────────────────
function CompGroup({ type, dp, active, running, sim }: {
    type: string; dp: Set<string>; active?: string; running: boolean; sim?: string;
}) {
    const ledOn = running && dp.has('+') && dp.has('-');
    const redOn = running && dp.has('RED+') && dp.has('R-GND') && sim === 'RED';
    const yellOn = running && dp.has('YEL+') && dp.has('Y-GND') && sim === 'YELLOW';
    const greenOn = running && dp.has('GRN+') && dp.has('G-GND') && sim === 'GREEN';
    const btnOn = running && sim === 'PRESSED';
    const beepOn = running && sim === 'BEEP';

    const body = (() => {
        switch (type) {
            case 'DHT22': return <DHT22Body running={running} out={sim} />;
            case 'HC-SR04': return <HCSRBody running={running} out={sim} />;
            case 'LED': return <LEDBody running={running} on={ledOn} sim={sim} />;
            case 'BUTTON': return <ButtonBody running={running} pressed={btnOn} />;
            case 'BUTTON_LED': return <ButtonLEDBody running={running} pressed={btnOn} ledOn={running && dp.has('+') && dp.has('-')} sim={sim} />;
            case 'BUZZER': return <BuzzerBody running={running} beep={beepOn} />;
            case 'SERVO': return <ServoBody running={running} out={sim} />;
            case 'TRAFFIC_LIGHT': return <TrafficBody running={running} state={sim} redOn={redOn} yellOn={yellOn} greenOn={greenOn} />;
            case 'DISTANCE_ALARM': return <DistanceAlarmBody running={running} sim={sim} />;
            default: return <rect width="100" height="80" rx="6" fill="#1a2a4a" stroke="#2b4a8a" strokeWidth="2" />;
        }
    })();

    const pins = CPINS[type] || [];
    return (
        <g transform={`translate(${CORG.x},${CORG.y})`}>
            {body}
            {pins.map(p => {
                if (p.name === 'NC') return null;
                const isAct = active?.toUpperCase() === p.name.toUpperCase();
                const isDone = dp.has(p.name.toUpperCase());
                return (
                    <g key={p.name}>
                        {isAct && <circle cx={p.cx} cy={p.cy} r="16" fill={p.color} opacity="0.14" />}
                        <circle cx={p.cx} cy={p.cy} r={isAct ? 9 : 7}
                            fill={p.color} stroke={isDone ? '#48bb78' : isAct ? '#fff' : 'rgba(255,255,255,0.25)'}
                            strokeWidth={isAct ? 2.5 : 1.5} style={{ transition: 'r .2s' }} />
                        <text x={p.cx} y={p.cy + 20} fill={isDone ? '#48bb78' : '#a0aec0'}
                            fontSize="9" fontFamily="monospace" fontWeight="600" textAnchor="middle">
                            {p.name}
                        </text>
                    </g>
                );
            })}
        </g>
    );
}
// ─── Board (ESP32 + Breadboard) ───────────────────────────────────────────────
function Board({ step, doneKeys, running }: {
    step: Step; doneKeys: Set<string>; running: boolean;
}) {
    const [hov, setHov] = useState<string | null>(null);
    const [txBlink, setTxBlink] = useState(false);

    const ak = step.wire?.epKey;
    const as = step.wire?.side;

    useEffect(() => {
        if (!running) {
            setTxBlink(false);
            return;
        }

        const id = setInterval(() => setTxBlink(b => !b), 700);
        return () => clearInterval(id);
    }, [running]);

    return (
        <g>
            {/* ───────────────── BREADBOARD ───────────────── */}
            <rect
                x="4"
                y="4"
                width="316"
                height="418"
                rx="12"
                fill="#ede8dc"
                stroke="#ccc5b0"
                strokeWidth="2.5"
            />

            <rect
                x="152"
                y="10"
                width="18"
                height="406"
                fill="#d6d0c4"
                rx="2"
            />

            {/* Left holes */}
            {Array.from({ length: 22 }, (_, r) =>
                Array.from({ length: 4 }, (_, c) => (
                    <g key={`l${r}${c}`}>
                        <circle
                            cx={24 + c * 12}
                            cy={ROW0 + r * DY}
                            r="3.8"
                            fill="#cac4b2"
                        />
                        <circle
                            cx={24 + c * 12}
                            cy={ROW0 + r * DY}
                            r="2.6"
                            fill="#f5f2e6"
                        />
                        <circle
                            cx={24 + c * 12}
                            cy={ROW0 + r * DY}
                            r="1.2"
                            fill="#555"
                        />
                    </g>
                ))
            )}

            {/* Right holes */}
            {Array.from({ length: 22 }, (_, r) =>
                Array.from({ length: 4 }, (_, c) => (
                    <g key={`r${r}${c}`}>
                        <circle
                            cx={252 + c * 12}
                            cy={ROW0 + r * DY}
                            r="3.8"
                            fill="#cac4b2"
                        />
                        <circle
                            cx={252 + c * 12}
                            cy={ROW0 + r * DY}
                            r="2.6"
                            fill="#f5f2e6"
                        />
                        <circle
                            cx={252 + c * 12}
                            cy={ROW0 + r * DY}
                            r="1.2"
                            fill="#555"
                        />
                    </g>
                ))
            )}

            {/* Power rails */}
            <rect
                x="8"
                y="8"
                width="10"
                height="410"
                fill="#ffe8e8"
                rx="2"
                opacity="0.72"
            />

            <rect
                x="306"
                y="8"
                width="10"
                height="410"
                fill="#e8eeff"
                rx="2"
                opacity="0.72"
            />

            <line
                x1="13"
                y1="12"
                x2="13"
                y2="416"
                stroke="#cc0000"
                strokeWidth="1.4"
                strokeDasharray="3,5"
            />

            <line
                x1="311"
                y1="12"
                x2="311"
                y2="416"
                stroke="#0044cc"
                strokeWidth="1.4"
                strokeDasharray="3,5"
            />

            <text
                x="13"
                y="9"
                fill="#cc0000"
                fontSize="9"
                textAnchor="middle"
                fontFamily="Inter"
                fontWeight="700"
            >
                +
            </text>

            <text
                x="311"
                y="9"
                fill="#0044cc"
                fontSize="9"
                textAnchor="middle"
                fontFamily="Inter"
                fontWeight="700"
            >
                −
            </text>

            {/* Row Numbers */}
            {Array.from({ length: 19 }, (_, i) => (
                <text
                    key={i}
                    x="5"
                    y={rowY(i) + 5}
                    fill="#a09080"
                    fontSize="6.5"
                    textAnchor="middle"
                    fontFamily="Inter"
                >
                    {i + 1}
                </text>
            ))}

            {/* ───────────────── ESP32 PCB ───────────────── */}

            {/* PCB Shadow */}
            <rect
                x="68"
                y="18"
                width="176"
                height="395"
                rx="12"
                fill="#0c1c2e"
                stroke="#1e4080"
                strokeWidth="3.5"
                style={{
                    filter: 'drop-shadow(0 5px 14px rgba(0,0,0,0.65))'
                }}
            />

            {/* PCB Main */}
            <rect
                x="73"
                y="23"
                width="166"
                height="385"
                rx="9"
                fill="#0f2238"
            />

            {/* PCB Glow */}
            <rect
                x="73"
                y="23"
                width="166"
                height="385"
                rx="9"
                fill="url(#pcbGlow)"
                opacity="0.10"
            />

            {/* PCB traces */}
            {[LP_X, RP_X].map(px => (
                <line
                    key={px}
                    x1={px}
                    y1="28"
                    x2={px}
                    y2="400"
                    stroke="rgba(80,160,240,0.10)"
                    strokeWidth="2"
                />
            ))}

            {/* ───────────────── ANTENNA ───────────────── */}
            <rect
                x="94"
                y="22"
                width="124"
                height="15"
                rx="2"
                fill="#080e18"
            />

            {[0, 1, 2, 3, 4, 5].map(i => (
                <path
                    key={i}
                    d={`M${98 + i * 20} 24 h12 v5 h-12 v5 h12`}
                    fill="none"
                    stroke="#2a1408"
                    strokeWidth="1"
                />
            ))}

            {/* ───────────────── RF MODULE ───────────────── */}
            <rect
                x="112"
                y="42"
                width="88"
                height="64"
                rx="4"
                fill="#8a9aa8"
                stroke="#6a7a88"
                strokeWidth="1.5"
            />

            {[0, 1, 2, 3, 4, 5].map(i => (
                <line
                    key={i}
                    x1="114"
                    x2="198"
                    y1={48 + i * 9}
                    y2={48 + i * 9}
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth="0.8"
                />
            ))}

            <text
                x="156"
                y="74"
                fill="#111827"
                fontSize="9"
                fontWeight="900"
                textAnchor="middle"
                fontFamily="'Inter', system-ui, sans-serif"
                letterSpacing="0.4"
            >
                ESP-WROOM-32
            </text>

            <text
                x="156"
                y="86"
                fill="#000000"
                fontSize="7"
                fontWeight="500"
                textAnchor="middle"
                fontFamily="Inter"
            >
                WiFi+BLE · 240MHz
            </text>

            {/* ───────────────── AMS1117 ───────────────── */}
            <rect
                x="142"
                y="142"
                width="34"
                height="20"
                rx="3"
                fill="#111827"
                stroke="#475569"
                strokeWidth="1.2"
            />

            <text
                x="158"
                y="154"
                fill="#94a3b8"
                fontSize="7"
                fontWeight="700"
                textAnchor="middle"
                fontFamily="Inter"
            >
                AMS1117
            </text>

            {/* Capacitors */}
            <rect
                x="116"
                y="132"
                width="18"
                height="8"
                rx="2"
                fill="#854d0e"
                stroke="#facc15"
                strokeWidth="0.8"
            />

            <rect
                x="180"
                y="132"
                width="18"
                height="8"
                rx="2"
                fill="#854d0e"
                stroke="#facc15"
                strokeWidth="0.8"
            />

            {/* SMD Chips */}
            {[134, 152, 172].map(x => (
                <rect
                    key={x}
                    x={x}
                    y="170"
                    width="11"
                    height="11"
                    rx="2"
                    fill="#080808"
                    stroke="#111"
                />
            ))}

            {/* ───────────────── STATUS LEDS ───────────────── */}
            <circle
                cx="146"
                cy="195"
                r="6.5"
                fill={running ? '#22c55e' : '#14532d'}
                style={{
                    filter: running
                        ? 'drop-shadow(0 0 5px #22c55e)'
                        : undefined
                }}
            />

            <text
                x="146"
                y="207"
                fill={running ? '#22c55e' : '#14532d'}
                fontSize="5"
                textAnchor="middle"
                fontFamily="Inter"
            >
                PWR
            </text>

            <circle
                cx="166"
                cy="195"
                r="5.5"
                fill={running && txBlink ? '#38bdf8' : '#082f49'}
                style={{
                    filter:
                        running && txBlink
                            ? 'drop-shadow(0 0 4px #38bdf8)'
                            : undefined
                }}
            />

            <text
                x="166"
                y="207"
                fill={running && txBlink ? '#38bdf8' : '#0a3050'}
                fontSize="5"
                textAnchor="middle"
                fontFamily="Inter"
            >
                TX
            </text>

            {/* ───────────────── USB-C ───────────────── */}
            <rect
                x="128"
                y="388"
                width="56"
                height="14"
                rx="3"
                fill="#475569"
                stroke="#94a3b8"
                strokeWidth="1.2"
            />

            <rect
                x="132"
                y="391"
                width="48"
                height="7"
                rx="2"
                fill="#0f172a"
            />

            {/* ── EN button ── */}
            <rect x="118" y="350" width="17" height="12" rx="3" fill="#0f172a" stroke="#1e2535" />
            <circle cx="126" cy="356" r="5" fill="#1a4a8a" opacity="0.9" />
            <text x="126" y="368" fill="#ffffff" fontSize="5" textAnchor="middle" fontFamily="Inter">EN</text>

            {/* ── BOOT button ── */}
            <rect x="181" y="350" width="17" height="12" rx="3" fill="#0f172a" stroke="#1e2535" />
            <circle cx="189" cy="356" r="5" fill="#8a1010" opacity="0.9" />
            <text x="189" y="368" fill="#ffffff" fontSize="5" textAnchor="middle" fontFamily="Inter">BOOT</text>

            {/* ───────────────── LEFT PINS ───────────────── */}
            {LP.map((pin, i) => {
                const y = rowY(i);

                const isAct = ak === pin && as === 'left';
                const isDone = doneKeys.has(pin);
                const isH = hov === `l${i}`;

                return (
                    <g
                        key={`lp${i}`}
                        onMouseEnter={() => setHov(`l${i}`)}
                        onMouseLeave={() => setHov(null)}
                    >
                        <rect
                            x={LP_X - 4}
                            y={y - 5}
                            width="8"
                            height="10"
                            rx="1.5"
                            fill="#1a2535"
                        />

                        <circle
                            cx={LP_X}
                            cy={y}
                            r="4"
                            fill={
                                isAct
                                    ? (step.wire?.color || '#eee')
                                    : isDone
                                        ? '#4ade80'
                                        : '#fbbf24'
                            }
                        />
                        <text
                            x={LP_X + 8}
                            y={y + 4}
                            fill={
                                isAct
                                    ? (step.wire?.color || '#fef08c')
                                    : isDone
                                        ? '#86efac'
                                        : isH
                                            ? '#e2e8f0'
                                            : '#b6c2d1'
                            }
                            fontSize="9"
                            fontFamily="Inter, Arial, sans-serif"
                            letterSpacing="0.2"
                            fontWeight={isAct || isH ? '700' : '500'}
                        >
                            {pin}
                        </text>
                    </g>
                );
            })}

            {/* ───────────────── RIGHT PINS ───────────────── */}
            {RP.map((pin, i) => {
                const y = rowY(i);

                const isAct = ak === pin && as === 'right';
                const isDone = doneKeys.has(pin);
                const isH = hov === `r${i}`;

                return (
                    <g
                        key={`rp${i}`}
                        onMouseEnter={() => setHov(`r${i}`)}
                        onMouseLeave={() => setHov(null)}
                    >
                        <rect
                            x={RP_X - 4}
                            y={y - 5}
                            width="8"
                            height="10"
                            rx="1.5"
                            fill="#1a2535"
                        />

                        <circle
                            cx={RP_X}
                            cy={y}
                            r="4"
                            fill={
                                isAct
                                    ? (step.wire?.color || '#eee')
                                    : isDone
                                        ? '#4ade80'
                                        : '#fbbf24'
                            }
                        />

                        <text
                            x={RP_X - 8}
                            y={y + 4}
                            fill={
                                isAct
                                    ? (step.wire?.color || '#fef08c')
                                    : isDone
                                        ? '#86efac'
                                        : isH
                                            ? '#e2e8f0'
                                            : '#b6c2d1'
                            }
                            fontSize="9"
                            fontFamily="Inter, Arial, sans-serif"
                            letterSpacing="0.2"
                            fontWeight={isAct || isH ? '700' : '500'}
                            textAnchor="end"
                        >
                            {pin}
                        </text>
                    </g>
                );
            })}
        </g>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DynamicWiringSimulator({ component }: { component: ComponentConfig }) {
    const steps = useMemo(() => buildSteps(component), [component.type, component.label]);
    const [cur, setCur] = useState(0);
    const [drawn, setDrawn] = useState<Set<number>>(new Set());
    const [running, setRunning] = useState(false);
    const [tab, setTab] = useState<'learn' | 'log' | 'serial'>('learn');
    const [split, setSplit] = useState(52);
    const [logs, setLogs] = useState([{ c: '#48bb78', t: 'ESP32 WROOM-32 ready.', ts: '' }]);
    const [serial, setSerial] = useState<string[]>([]);
    const [sim, setSim] = useState<string>();

    const isDrag = useRef(false);
    const contRef = useRef<HTMLDivElement>(null);
    const logEl = useRef<HTMLDivElement>(null);
    const serEl = useRef<HTMLDivElement>(null);

    const tw = steps.filter(s => s.wire).length;
    const connectedCount = drawn.size;
    const allDone = drawn.size === tw;
    const isLast = cur === steps.length - 1;
    const s = steps[cur];
    const dp = new Set([...drawn].map(i => steps[i].wire?.cpName?.toUpperCase()).filter(Boolean) as string[]);
    const dk = new Set([...drawn].map(i => steps[i].wire?.epKey).filter(Boolean) as string[]);

    function tn() { return new Date().toLocaleTimeString('en', { hour12: false }); }
    function addLog(c: string, t: string) {
        setLogs(p => [...p, { c, t, ts: tn() }]);
        setTimeout(() => { if (logEl.current) logEl.current.scrollTop = 9999; }, 50);
    }

    const drag = (e: React.MouseEvent) => {
        e.preventDefault(); isDrag.current = true;
        const mv = (ev: MouseEvent) => {
            if (!isDrag.current || !contRef.current) return;
            const r = contRef.current.getBoundingClientRect();
            setSplit(Math.round(Math.min(Math.max(((ev.clientX - r.left) / r.width) * 100, 28), 74)));
        };
        const up = () => { isDrag.current = false; window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); };
        window.addEventListener('mousemove', mv);
        window.addEventListener('mouseup', up);
    };

    const next = () => {
        if (s.wire && !drawn.has(cur)) {
            setDrawn(p => new Set([...p, cur]));
            if (s.logText) addLog(s.logColor, s.logText);
        }
        if (!isLast) setCur(c => c + 1);
    };
    const reset = () => {
        setCur(0); setDrawn(new Set()); setRunning(false);
        setSerial([]); setSim(undefined);
        setLogs([{ c: '#48bb78', t: 'Reset — ready to wire.', ts: tn() }]);
    };

    // Simulation loop
    useEffect(() => {
        if (!running || !allDone) return;
        setTab('serial');
        addLog('#48bb78', '▶ Simulation started — 115200 baud.');
        let tick = 0;
        const id = setInterval(() => {
            tick++;
            let ss = '', line = '';
            switch (component.type) {
                case 'DHT22': {
                    const t = (22 + Math.sin(tick * .28) * 4).toFixed(1);
                    const h = (58 + Math.cos(tick * .2) * 8).toFixed(1);
                    ss = `${t}°C|${h}%`; line = `T:${t}°C  H:${h}%`;
                    break;
                }
                case 'HC-SR04': {
                    const d = (20 + Math.sin(tick * .5) * 12).toFixed(1);
                    ss = `${d} cm`; line = `Distance: ${d} cm`;
                    break;
                }
                case 'LED': {
                    const on = tick % 2 === 0;
                    ss = on ? 'ON' : 'OFF';
                    line = `[GPIO48] ${on ? 'HIGH → LED ON ●' : 'LOW  → LED OFF ○'}`;
                    break;
                }
                case 'BUTTON': {
                    const p = Math.random() > .78;
                    ss = p ? 'PRESSED' : 'RELEASED';
                    line = `Button: ${p ? 'PRESSED (LOW)' : 'RELEASED (HIGH)'}`;
                    break;
                }
                case 'BUTTON_LED': {
                    const p = Math.random() > .75;
                    ss = p ? 'PRESSED' : 'RELEASED';
                    line = `Button: ${p ? 'PRESSED' : 'RELEASED'} → LED: ${p ? 'ON' : 'OFF'} (GPIO48: ${p ? 'HIGH' : 'LOW'})`;
                    break;
                }
                case 'BUZZER': {
                    const b = tick % 3 === 0;
                    ss = b ? 'BEEP' : 'IDLE';
                    line = `Buzzer: ${b ? 'ACTIVE 880Hz' : 'SILENT'}`;
                    break;
                }
                case 'SERVO': {
                    const a = Math.round(90 + Math.sin(tick * .35) * 85);
                    ss = `${a}°`; line = `Servo: ${a}°`;
                    break;
                }
                case 'DISTANCE_ALARM': {
                    const d = (15 + Math.sin(tick * .4) * 13).toFixed(1);
                    const alarm = parseFloat(d) < 20;
                    ss = `${d} cm`;
                    line = `Distance: ${d} cm — ${alarm ? '⚠ ALARM! Buzzer ON' : 'Buzzer OFF'}`;
                    break;
                }
                case 'TRAFFIC_LIGHT': {
                    const ph = tick % 8;
                    const l = ph < 3 ? 'RED' : ph < 4 ? 'YELLOW' : ph < 7 ? 'GREEN' : 'YELLOW';
                    ss = l; line = `${l}: IO25=${l === 'RED' ? 1 : 0} IO26=${l === 'YELLOW' ? 1 : 0} IO27=${l === 'GREEN' ? 1 : 0}`;
                    setSim(ss);
                    setSerial(p => [...p.slice(-40), `[${tn()}] ${line}`]);
                    setTimeout(() => { if (serEl.current) serEl.current.scrollTop = 9999; }, 50);
                    return;
                }
            }
            setSim(ss);
            setSerial(p => [...p.slice(-40), `[${tn()}] ${line}`]);
            setTimeout(() => { if (serEl.current) serEl.current.scrollTop = 9999; }, 50);
        }, 1000);
        return () => clearInterval(id);
    }, [running, allDone, component.type]);

    const cName = compLabel(component.type);
    // Hydration fix: move styles outside component or use a stable injection.
    // Add this OUTSIDE your component (module level), before the component definition:

    const WU_STYLES = `
 @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

  .wu-root {
    --bg0: #0a0e14; --bg1: #0f1520; --bg2: #141c28; --bg3: #1a2333; --bg4: #1f2a3d;
    --border: #1e2d42; --border2: #2a3d56; --border3: #3a5068;
    --text0: #e8f0fc; --text1: #9eb3cc; --text2: #5a7592; --text3: #3a5068;
    --blue: #4d9de0; --blue-dim: #0d2240; --blue-border: #1a3d6e;
    --green: #3ecf6e; --green-dim: #0a2318; --green-border: #1a4d30;
    --amber: #e8a020; --amber-dim: #281800; --amber-border: #5a3800;
    --red: #e05555;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: var(--bg0);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    color: var(--text1);
  }
  .wu-root * { box-sizing: border-box; margin: 0; padding: 0; }
  font-family: 'JetBrains Mono', 'Fira Mono', 'Courier New', monospace;
  .wu-root ::-webkit-scrollbar { width: 4px; }
  .wu-root ::-webkit-scrollbar-track { background: transparent; }
  .wu-root ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 99px; }

  .wu-bar { display:flex; align-items:center; justify-content:space-between; padding:11px 18px; background:var(--bg1); border-bottom:1px solid var(--border); gap:12px; }
  .wu-bar-l { display:flex; align-items:center; gap:14px; min-width:0; }
  .wu-dots3 { display:flex; gap:6px; flex-shrink:0; }
  .wu-dot3 { width:11px; height:11px; border-radius:50%; }
  .wu-vsep { width:1px; height:18px; background:var(--border2); flex-shrink:0; }
  .wu-cname { font-family:'Inter',sans-serif; font-size:13px; font-weight:600; color:var(--text0); white-space:nowrap; letter-spacing:-0.2px; }
  .wu-ctype { font-family:'JetBrains Mono',monospace; font-size:11px; color:var(--text2); white-space:nowrap; }
  .wu-badge { font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:600; padding:3px 10px; border-radius:99px; white-space:nowrap; flex-shrink:0; }
  .wu-badge-step { background:var(--bg3); color:var(--text1); border:1px solid var(--border2); }
  .wu-badge-wired { background:var(--green-dim); color:var(--green); border:1px solid var(--green-border); display:flex; align-items:center; gap:5px; }
  .wu-pulse-dot { width:5px; height:5px; border-radius:50%; background:var(--green); animation:wuPulse 1.6s ease-in-out infinite; }
  .wu-bar-r { display:flex; gap:8px; flex-shrink:0; }
  .wu-tbtn { font-family:'Inter',sans-serif; font-size:12px; font-weight:500; padding:6px 14px; border-radius:8px; cursor:pointer; border:1px solid var(--border2); background:transparent; color:var(--text2); transition:color .15s,background .15s,border-color .15s; white-space:nowrap; }
  .wu-tbtn:hover { background:var(--bg3); color:var(--text0); border-color:var(--border3); }
  .wu-rbtn { font-family:'Inter',sans-serif; font-size:12px; font-weight:600; padding:6px 16px; border-radius:8px; cursor:pointer; border:1px solid var(--blue-border); background:var(--blue-dim); color:var(--blue); transition:filter .15s,opacity .15s; white-space:nowrap; }
  .wu-rbtn:hover { filter:brightness(1.2); }
  .wu-rbtn.running { background:#200a0a; border-color:#4a1a1a; color:var(--red); }
  .wu-rbtn.dim { opacity:.35; cursor:default; pointer-events:none; }

  .wu-pbar { height:2px; background:var(--bg3); }
  .wu-pbar-fill { height:100%; transition:width .45s ease; }

  .wu-main { display:flex; position:relative; }
  .wu-circuit { flex-shrink:0; background:#05080f; overflow:hidden; border-right:1px solid var(--border); }
  .wu-dragger { width:4px; flex-shrink:0; background:var(--border); cursor:col-resize; transition:background .15s; }
  .wu-dragger:hover { background:var(--blue); }
  .wu-right { flex:1; display:flex; flex-direction:column; min-width:0; }

  .wu-tabs { display:flex; background:var(--bg1); border-bottom:1px solid var(--border); }
  .wu-tab { flex:1; display:flex; align-items:center; justify-content:center; gap:7px; padding:10px 8px; font-family:'Inter',sans-serif; font-size:11px; font-weight:600; letter-spacing:.5px; background:transparent; border:none; border-bottom:2px solid transparent; cursor:pointer; color:var(--text2); transition:color .15s,border-color .15s; }
  .wu-tab:hover { color:var(--text1); }
  .wu-tab.active { color:var(--blue); border-bottom-color:var(--blue); }

  .wu-learn { flex:1; overflow-y:auto; padding:14px 14px 8px; display:flex; flex-direction:column; gap:10px; }
  .wu-icard { border-radius:10px; overflow:hidden; border:1px solid var(--border); background:var(--bg2); }
  .wu-icard-head { display:flex; align-items:center; gap:9px; padding:8px 13px; background:var(--bg2); border-bottom:1px solid var(--border); }
  .wu-icard-accent { width:3px; height:16px; border-radius:2px; flex-shrink:0; }
  .wu-icard-label { font-family:'Inter',sans-serif; font-size:10px; font-weight:600; letter-spacing:.6px; text-transform:uppercase; }
  .wu-icard-body { padding:12px 14px; background:var(--bg2); }
  .wu-icard-text { font-family:'Inter',sans-serif; font-size:12.5px; font-weight:400; color:var(--text1); line-height:1.85; }
  .wu-icard.warn { border-color:var(--amber-border); }
  .wu-icard.warn .wu-icard-head { background:var(--amber-dim); border-bottom-color:var(--amber-border); }
  .wu-icard.warn .wu-icard-body { background:#150e00; }
  .wu-icard.warn .wu-icard-text { color:#b08040; }

  .wu-icard-pins { padding:8px 12px 12px; background:var(--bg1); display:flex; flex-direction:column; gap:5px; }
  .wu-pin { display:flex; align-items:center; gap:11px; padding:7px 11px; border-radius:7px; border:1px solid transparent; background:var(--bg2); transition:all .3s ease; }
  .wu-pin.done { background:var(--green-dim); border-color:var(--green-border); }
  .wu-pin-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
  .wu-pin-name { font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; color:var(--text0); min-width:40px; }
  .wu-pin-tip { font-family:'Inter',sans-serif; font-size:11px; color:var(--text2); flex:1; line-height:1.4; }
  .wu-pin-check { font-size:12px; color:var(--green); flex-shrink:0; }

  .wu-serial { flex:1; display:flex; flex-direction:column; background:#030609; }
  .wu-serial-bar { display:flex; align-items:center; justify-content:space-between; padding:7px 14px; border-bottom:1px solid #0a1a0f; }
  .wu-serial-meta { font-family:'JetBrains Mono',monospace; font-size:9px; color:#1e4a28; letter-spacing:.5px; }
  .wu-serial-live { display:flex; align-items:center; gap:6px; }
  .wu-sdot { width:6px; height:6px; border-radius:50%; background:#1a3a20; transition:background .3s; }
  .wu-sdot.on { background:var(--green); animation:wuPulse 1.5s infinite; }
  .wu-sstate { font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:700; letter-spacing:.6px; color:#1a3a20; transition:color .3s; }
  .wu-sstate.on { color:var(--green); }
  .wu-serial-log { flex:1; overflow-y:auto; padding:10px 14px; }
  .wu-serial-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:8px; opacity:.25; }
  .wu-serial-empty-label { font-family:'JetBrains Mono',monospace; font-size:11px; color:#2a5a30; }
  .wu-log-line { display:flex; gap:7px; align-items:flex-start; margin-bottom:3px; }
  .wu-log-caret { font-family:'JetBrains Mono',monospace; color:#1e4a28; font-size:11px; flex-shrink:0; margin-top:3px; }
  .wu-log-txt { font-family:'JetBrains Mono',monospace; font-size:11px; line-height:1.85; color:#2a7a40; }
  .wu-log-txt.fresh { color:var(--green); }

  /* ── CONNECTIONS — fixed contrast ── */
  .wu-conn { border-top:1px solid var(--border); background:var(--bg2); padding:10px 14px; }
  .wu-conn-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:9px; }
  .wu-conn-title { font-family:'Inter',sans-serif; font-size:9px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--text2); }
  .wu-conn-meta { display:flex; align-items:center; gap:9px; }
  .wu-conn-track { height:3px; width:56px; border-radius:99px; background:var(--bg4); overflow:hidden; }
  .wu-conn-fill { height:100%; border-radius:99px; transition:width .45s ease; }
  .wu-conn-frac { font-family:'JetBrains Mono',monospace; font-size:10px; font-weight:700; color:var(--text1); min-width:24px; text-align:right; }
  .wu-conn-frac.done { color:var(--green); }
  .wu-conn-rows { display:flex; flex-direction:column; gap:4px; }

  .wu-conn-row {
    display:flex; align-items:center; gap:9px;
    padding:7px 10px;
    border-radius:7px;
    background:var(--bg3);
    border:1px solid var(--border2);
    transition:background .3s, border-color .3s;
  }
  .wu-conn-row.done {
    background:rgba(62,207,110,.08);
    border-color:rgba(62,207,110,.2);
  }

  /* Swatch: always full opacity so gray wires are visible */
  .wu-wire-swatch {
    height:4px; width:20px; border-radius:2px; flex-shrink:0;
    opacity:1;
  }
  .wu-wire-swatch.pending { opacity:0.45; }

  .wu-ohm { font-family:'JetBrains Mono',monospace; font-size:8px; font-weight:700; padding:1px 5px; border-radius:3px; background:var(--amber-dim); color:var(--amber); border:1px solid var(--amber-border); flex-shrink:0; }

  /* Pin name: always bright white — never dimmed */
  .wu-cpin {
    font-family:'JetBrains Mono',monospace;
    font-size:11px; font-weight:700;
    color:var(--text0);
    flex-shrink:0; min-width:48px;
  }

.wu-carr { font-size:11px; color:var(--text1); flex-shrink:0; }

  /* Endpoint: readable gray always, blue when done */
  .wu-cep {
    font-family:'JetBrains Mono',monospace;
    font-size:11px;
    color:var(--text1);
    flex:1;
    transition:color .3s;
  }
  .wu-cep.done { color:var(--blue); }

  .wu-cchk { font-size:12px; flex-shrink:0; color:var(--border3); transition:color .3s; }
  .wu-cchk.done { color:var(--green); }

  .wu-bottom { background:var(--bg1); border-top:1px solid var(--border); padding:13px 18px; }
  .wu-done-banner { display:flex; align-items:center; gap:10px; padding:9px 13px; margin-bottom:13px; background:var(--green-dim); border:1px solid var(--green-border); border-radius:9px; }
  .wu-done-txt { font-family:'Inter',sans-serif; font-size:12px; font-weight:500; color:var(--green); }
  .wu-instr-row { display:flex; gap:11px; align-items:flex-start; margin-bottom:11px; }
  .wu-step-num { width:24px; height:24px; min-width:24px; border-radius:50%; background:var(--blue-dim); color:var(--blue); border:1px solid var(--blue-border); display:flex; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; flex-shrink:0; margin-top:1px; }
  .wu-instr-txt { font-family:'Inter',sans-serif; font-size:12.5px; font-weight:400; color:var(--text1); line-height:1.75; }
  .wu-wire-pill-row { display:flex; align-items:center; gap:10px; padding:7px 12px; margin-bottom:11px; background:var(--bg2); border:1px solid var(--border); border-radius:8px; }
  .wu-wire-stripe { height:3px; width:24px; border-radius:2px; flex-shrink:0; }
  .wu-wire-lbl { font-family:'Inter',sans-serif; font-size:11px; color:var(--text1); }
  .wu-stepdots { display:flex; gap:4px; align-items:center; margin-bottom:13px; }
  .wu-stepdot { height:3px; border-radius:99px; transition:all .3s ease; }
  .wu-actions { display:flex; gap:9px; }
  .wu-back-btn { font-family:'Inter',sans-serif; font-size:12px; font-weight:500; padding:9px 20px; border-radius:9px; cursor:pointer; border:1px solid var(--border2); background:transparent; color:var(--text1); transition:all .15s; }
  .wu-back-btn:not(:disabled):hover { background:var(--bg3); color:var(--text0); }
  .wu-back-btn:disabled { opacity:.25; cursor:default; }
  .wu-next-btn { flex:1; font-family:'Inter',sans-serif; font-size:12px; font-weight:600; padding:9px 0; border-radius:9px; cursor:pointer; border:1px solid var(--blue-border); background:var(--blue-dim); color:var(--blue); transition:filter .15s,opacity .15s; }
  .wu-next-btn:hover:not(:disabled) { filter:brightness(1.18); }
  .wu-next-btn.wire { background:var(--blue); border-color:var(--blue); color:#030c18; }
  .wu-next-btn.complete { background:transparent; border-color:var(--border); color:var(--text3); cursor:default; opacity:.4; }

  @keyframes wuPulse { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes wuCelebrate {
    0%   { transform: scale(0.85); opacity: 0; }
    60%  { transform: scale(1.05); opacity: 1; }
    100% { transform: scale(1);    opacity: 1; }
}`;

    // ─── Style injector — call once at module level ───────────────────────────────
    // This avoids the hydration mismatch caused by <style> inside JSX.
    useEffect(() => {
        const id = 'wu-styles';
        if (!document.getElementById(id)) {
            const el = document.createElement('style');
            el.id = id;
            el.textContent = WU_STYLES;
            document.head.appendChild(el);
        }
    }, []);
    // ─────────────────────────────────────────────────────────────────────────────


    // ─── Your component's return — no <style> tag inside JSX anymore ─────────────
    return (
        <div className="wu-root">

            {/* ══════════════ TOOLBAR ══════════════ */}
            <div className="wu-bar" style={{
                borderBottom: '1px solid transparent',
                backgroundImage: 'linear-gradient(var(--bg1), var(--bg1)), linear-gradient(90deg, var(--blue-border), var(--border2), var(--blue-border))',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
            }}>
                <div className="wu-bar-l">
                    <div className="wu-dots3">
                        {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                            <div key={c} className="wu-dot3" style={{
                                background: c,
                                boxShadow: `0 0 6px ${c}88`,
                            }} />
                        ))}
                    </div>
                    <div className="wu-vsep" />
                    <span className="wu-cname" style={{
                        fontSize: 15,
                        fontWeight: 700,
                        letterSpacing: '-0.3px',
                        color: 'var(--text0)',
                    }}>{cName}</span>
                    <span className="wu-ctype" style={{
                        background: 'var(--bg3)',
                        border: '1px solid var(--border2)',
                        borderRadius: 6,
                        padding: '2px 8px',
                        fontSize: 10,
                        fontFamily: 'JetBrains Mono, monospace',
                        color: 'var(--text2)',
                    }}>{component.label || component.type}</span>
                    <span className="wu-badge wu-badge-step">{cur + 1} / {steps.length}</span>
                    {allDone && (
                        <span className="wu-badge wu-badge-wired">
                            <span className="wu-pulse-dot" />
                            Wired
                        </span>
                    )}
                </div>
                <div className="wu-bar-r">

                    {/* Back button */}
                    <button
                        disabled={cur === 0}
                        onClick={() => {
                            if (cur === 0) return;
                            const prev = cur - 1;
                            setDrawn(p => { const ns = new Set(p); ns.delete(prev); return ns; });
                            setCur(prev);
                        }}
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 12,
                            fontWeight: 700,
                            padding: '6px 16px',
                            borderRadius: 8,
                            cursor: cur === 0 ? 'default' : 'pointer',
                            border: cur === 0 ? '1px solid #244c75' : '1px solid #3a4a5a',
                            background: cur === 0 ? '#0d1520' : '#1e2d42',
                            color: '#ffffff',
                            boxShadow: cur === 0 ? 'none' : '0 0 10px rgba(80,140,200,0.2)',
                            transition: 'all 0.2s ease',
                        }}
                    >← Back</button>

                    {/* Next button */}
                    <button
                        disabled={isLast && allDone}
                        onClick={next}
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 12,
                            fontWeight: 700,
                            padding: '6px 16px',
                            borderRadius: 8,
                            cursor: isLast && allDone ? 'default' : 'pointer',
                            border: isLast && allDone
                                ? '1px solid #1a3a5a'
                                : s.wire && !drawn.has(cur)
                                    ? '1px solid #4d9de0'
                                    : '1px solid #2a5a8a',
                            background: isLast && allDone
                                ? '#0d1e2e'
                                : s.wire && !drawn.has(cur)
                                    ? '#185fa5'
                                    : '#0d3258',
                            color: isLast && allDone
                                ? '#1a4a6a'
                                : '#ffffff',
                            boxShadow: isLast && allDone
                                ? 'none'
                                : s.wire && !drawn.has(cur)
                                    ? '0 0 14px rgba(77,157,224,0.55)'
                                    : '0 0 8px rgba(77,157,224,0.25)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {isLast && allDone ? '✓ Done' : 'Next →'}
                    </button>

                    {/* Separator */}
                    <div className="wu-vsep" />

                    {/* Reset button */}
                    <button
                        onClick={reset}
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 12,
                            fontWeight: 700,
                            padding: '6px 14px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            border: '1px solid #c2410c',
                            background: '#431407',
                            color: '#fb923c',
                            boxShadow: '0 0 12px rgba(251,146,60,0.25)',
                            transition: 'all 0.2s ease',
                        }}
                    >↺ Reset</button>

                    {/* Run / Stop button */}
                    <button
                        onClick={() => { if (allDone || running) setRunning(r => !r); }}
                        style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 12,
                            fontWeight: 700,
                            padding: '6px 16px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            border: running
                                ? '1px solid #6a1a1a'
                                : !allDone
                                    ? '1px solid #6a5200'
                                    : '1px solid #1a6a3a',
                            background: running
                                ? '#3d0a0a'
                                : !allDone
                                    ? '#3d3000'
                                    : '#0a3d20',
                            color: running
                                ? '#ef4444'
                                : !allDone
                                    ? '#eab308'
                                    : '#3ecf6e',
                            boxShadow: running
                                ? '0 0 14px rgba(239,68,68,0.4)'
                                : !allDone
                                    ? '0 0 10px rgba(234,179,8,0.3)'
                                    : '0 0 14px rgba(62,207,110,0.4)',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {running
                            ? '⏹ Stop'
                            : !allDone
                                ? '▶ Run'
                                : '▶ Run'}
                    </button>

                </div>
            </div>

            {/* ── Progress bar ── */}
            <div className="wu-pbar">
                <div className="wu-pbar-fill" style={{
                    width: `${Math.round((connectedCount / Math.max(tw, 1)) * 100)}%`,
                    background: allDone
                        ? 'linear-gradient(90deg, var(--green), #00ffaa)'
                        : 'linear-gradient(90deg, var(--blue), #60b4ff)',
                    transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1), background 0.3s ease',
                    boxShadow: allDone
                        ? '0 0 8px rgba(62,207,110,0.5)'
                        : '0 0 8px rgba(77,157,224,0.4)',
                }} />
            </div>

            {/* ══════════════ MAIN SPLIT ══════════════ */}
            <div ref={contRef} className="wu-main">

                {/* ── Circuit pane ── */}
                <div className="wu-circuit" style={{ width: `${split}%`, height: 460 }}>
                    <svg
                        viewBox="0 0 720 440"
                        width="100%"
                        height="460"
                        style={{ display: 'block' }}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <filter id="esp-shadow">
                                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.6" />
                            </filter>
                        </defs>

                        <Board step={s} doneKeys={dk} running={running} />

                        <CompGroup
                            type={component.type}
                            dp={dp}
                            active={s.wire && !drawn.has(cur) ? s.wire.cpName : undefined}
                            running={running}
                            sim={sim}
                        />

                        {/* Ghost wire preview */}
                        {s.wire && !drawn.has(cur) && (
                            <path
                                d={s.wire.hasR
                                    ? makePathB(s.wire.resY, s.wire.x2, s.wire.y2, s.wire.side, s.wire.laneOffset)
                                    : makePath(s.wire.x1, s.wire.y1, s.wire.x2, s.wire.y2, s.wire.side, s.wire.laneOffset)}
                                fill="none"
                                stroke={s.wire.color}
                                strokeWidth="1.5"
                                strokeDasharray="6,4"
                                opacity="0.28"
                            />
                        )}

                        {/* Drawn wires */}
                        {[...drawn].map(idx => {
                            const w = steps[idx].wire;
                            if (!w) return null;
                            return (
                                <WireErrorBoundary key={idx}>
                                    <WireEl w={w} running={running} />
                                </WireErrorBoundary>
                            );
                        })}
                    </svg>
                </div>

                {/* ── Drag handle ── */}
                <div
                    className="wu-dragger"
                    onMouseDown={drag}
                    onTouchStart={(e) => {
                        e.preventDefault();
                        const mv = (ev: TouchEvent) => {
                            if (!contRef.current) return;
                            const r = contRef.current.getBoundingClientRect();
                            setSplit(Math.round(Math.min(Math.max(
                                ((ev.touches[0].clientX - r.left) / r.width) * 100, 28), 74)));
                        };
                        const up = () => {
                            window.removeEventListener('touchmove', mv);
                            window.removeEventListener('touchend', up);
                        };
                        window.addEventListener('touchmove', mv, { passive: false });
                        window.addEventListener('touchend', up);
                    }}
                />

                {/* ══ RIGHT PANEL ══ */}
                <div className="wu-right">

                    {/* ── Tabs ── */}
                    <div className="wu-tabs">
                        {([
                            { id: 'learn', label: 'LEARN', icon: '📖' },
                            { id: 'serial', label: 'LIVE OUTPUT', icon: '📟' },
                        ] as const).map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id as 'learn' | 'serial')}
                                className={`wu-tab${tab === t.id ? ' active' : ''}`}
                            >
                                {t.icon} {t.label}
                            </button>
                        ))}
                    </div>

                    {/* ── LEARN TAB ── */}
                    {tab === 'learn' && (
                        <div className="wu-learn">

                            {/* Why card */}
                            <div className="wu-icard">
                                <div className="wu-icard-head">
                                    <div className="wu-icard-accent" style={{ background: 'var(--blue)' }} />
                                    <span className="wu-icard-label" style={{ color: 'var(--blue)' }}>
                                        Why this connection?
                                    </span>
                                </div>
                                <div className="wu-icard-body">
                                    <p className="wu-icard-text">{s.why}</p>
                                </div>
                            </div>

                            {/* Resistor warning */}
                            {s.wire?.hasR && (
                                <div className="wu-icard warn">
                                    <div className="wu-icard-head">
                                        <div className="wu-icard-accent" style={{ background: 'var(--amber)' }} />
                                        <span className="wu-icard-label" style={{ color: 'var(--amber)' }}>
                                            ⚡ 220Ω resistor required
                                        </span>
                                    </div>
                                    <div className="wu-icard-body">
                                        <p className="wu-icard-text">
                                            Without a resistor the LED draws 80mA+ — burns instantly and
                                            damages the ESP32 GPIO pin. 220Ω limits current to ~15mA.
                                            Place it in the breadboard between the GPIO wire and LED anode.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Pin guide */}
                            <div className="wu-icard">
                                <div className="wu-icard-head">
                                    <div className="wu-icard-accent" style={{ background: 'var(--border3)' }} />
                                    <span className="wu-icard-label" style={{ color: 'var(--text2)' }}>
                                        Pin guide
                                    </span>
                                </div>
                                <div style={{ padding: '8px 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {(CPINS[component.type] || [])
                                        .filter(p => p.name !== 'NC')
                                        .map(p => {
                                            const isDone = dp.has(p.name.toUpperCase());
                                            return (
                                                <div key={p.name} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 10,
                                                    padding: '8px 12px',
                                                    borderRadius: 8,
                                                    background: isDone ? 'rgba(62,207,110,0.06)' : 'var(--bg2)',
                                                    border: `1px solid ${isDone ? 'rgba(62,207,110,0.18)' : 'var(--border)'}`,
                                                    borderLeft: `3px solid ${isDone ? p.color : 'var(--border)'}`,
                                                    transition: 'all 0.3s ease',
                                                }}>
                                                    <div style={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: '50%',
                                                        background: p.color,
                                                        flexShrink: 0,
                                                        boxShadow: isDone ? `0 0 5px ${p.color}88` : 'none',
                                                    }} />
                                                    <span style={{
                                                        fontFamily: 'JetBrains Mono, monospace',
                                                        fontSize: 12,
                                                        fontWeight: 700,
                                                        color: 'var(--text0)',
                                                        minWidth: 52,
                                                        flexShrink: 0,
                                                    }}>{p.name}</span>
                                                    <span style={{
                                                        fontFamily: 'Inter, sans-serif',
                                                        fontSize: 12,
                                                        color: isDone ? 'var(--text1)' : 'var(--text2)',
                                                        flex: 1,
                                                        lineHeight: 1.5,
                                                        transition: 'color 0.3s ease',
                                                    }}>{p.tip}</span>
                                                    {isDone && (
                                                        <span style={{
                                                            fontSize: 14,
                                                            color: 'var(--green)',
                                                            fontWeight: 700,
                                                            flexShrink: 0,
                                                        }}>✓</span>
                                                    )}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                            {/* Connections — lives here in learn tab */}
                            <div className="wu-icard">
                                <div className="wu-icard-head">
                                    <div className="wu-icard-accent" style={{ background: 'var(--green)' }} />
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                                        <span className="wu-icard-label" style={{ color: 'var(--green)' }}>
                                            Wiring checklist
                                        </span>
                                        <span style={{
                                            fontSize: 9,
                                            fontFamily: 'JetBrains Mono, monospace',
                                            fontWeight: 700,
                                            padding: '1px 7px',
                                            borderRadius: 99,
                                            background: connectedCount === tw ? 'var(--green-dim)' : 'var(--bg3)',
                                            color: connectedCount === tw ? 'var(--green)' : 'var(--text2)',
                                            border: `1px solid ${connectedCount === tw ? 'var(--green-border)' : 'var(--border2)'}`,
                                            transition: 'all 0.3s ease',
                                        }}>{connectedCount}/{tw} done</span>
                                    </div>
                                </div>

                                {/* Progress bar */}
                                <div style={{
                                    height: 3,
                                    background: 'var(--bg3)',
                                    overflow: 'hidden',
                                }}>
                                    <div style={{
                                        height: '100%',
                                        width: `${tw > 0 ? Math.round((connectedCount / tw) * 100) : 0}%`,
                                        background: connectedCount === tw
                                            ? 'linear-gradient(90deg, var(--green), #00ffaa)'
                                            : 'linear-gradient(90deg, var(--blue), #60b4ff)',
                                        transition: 'width 0.4s ease, background 0.3s ease',
                                        boxShadow: connectedCount === tw
                                            ? '0 0 6px rgba(62,207,110,0.5)'
                                            : '0 0 6px rgba(77,157,224,0.4)',
                                    }} />
                                </div>

                                {/* Wire rows */}
                                <div style={{ padding: '8px 12px 12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                                    {steps
                                        .filter((st): st is Step & { wire: WireData } => st.wire !== null)
                                        .map((st, i) => {
                                            const done = dp.has(st.wire.cpName.toUpperCase());
                                            return (
                                                <div key={i} style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    padding: '7px 10px',
                                                    borderRadius: 8,
                                                    background: done ? 'rgba(62,207,110,0.05)' : 'var(--bg2)',
                                                    border: `1px solid ${done ? 'rgba(62,207,110,0.15)' : 'var(--border)'}`,
                                                    borderLeft: `3px solid ${done ? st.wire.color : 'var(--border2)'}`,
                                                    transition: 'all 0.35s ease',
                                                }}>

                                                    {/* Wire color dot */}
                                                    <div style={{
                                                        width: 9,
                                                        height: 9,
                                                        borderRadius: '50%',
                                                        background: st.wire.color,
                                                        flexShrink: 0,
                                                        boxShadow: done ? `0 0 5px ${st.wire.color}88` : 'none',
                                                        transition: 'box-shadow 0.3s ease',
                                                    }} />

                                                    {/* Resistor badge */}
                                                    {st.wire.hasR && (
                                                        <span style={{
                                                            fontSize: 8,
                                                            fontWeight: 700,
                                                            padding: '1px 4px',
                                                            borderRadius: 3,
                                                            background: 'var(--amber-dim)',
                                                            color: 'var(--amber)',
                                                            border: '1px solid var(--amber-border)',
                                                            fontFamily: 'JetBrains Mono, monospace',
                                                            flexShrink: 0,
                                                        }}>220Ω</span>
                                                    )}

                                                    {/* From pin */}
                                                    <span style={{
                                                        fontFamily: 'JetBrains Mono, monospace',
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        color: 'var(--text0)',
                                                        minWidth: 44,
                                                        flexShrink: 0,
                                                    }}>{st.wire.cpName}</span>

                                                    {/* Wire arrow */}
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexShrink: 0,
                                                    }}>
                                                        <div style={{
                                                            height: 2,
                                                            width: 20,
                                                            background: done ? st.wire.color : 'var(--border2)',
                                                            transition: 'background 0.4s ease',
                                                        }} />
                                                        <div style={{
                                                            width: 0,
                                                            height: 0,
                                                            borderTop: '4px solid transparent',
                                                            borderBottom: '4px solid transparent',
                                                            borderLeft: `5px solid ${done ? st.wire.color : 'var(--border2)'}`,
                                                            transition: 'border-color 0.4s ease',
                                                        }} />
                                                    </div>

                                                    {/* To pin */}
                                                    <span style={{
                                                        fontFamily: 'JetBrains Mono, monospace',
                                                        fontSize: 11,
                                                        color: done ? 'var(--blue)' : 'var(--text2)',
                                                        flex: 1,
                                                        transition: 'color 0.3s ease',
                                                    }}>{st.wire.epKey}</span>

                                                    {/* Status */}
                                                    <span style={{
                                                        fontSize: 12,
                                                        color: done ? 'var(--green)' : 'var(--border3)',
                                                        fontWeight: done ? 700 : 400,
                                                        flexShrink: 0,
                                                        transition: 'color 0.3s ease',
                                                    }}>{done ? '✓' : '○'}</span>

                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                        </div>
                    )}

                    {/* ── LIVE OUTPUT TAB ── */}
                    {tab === 'serial' && (
                        <div className="wu-serial">

                            {/* Serial bar */}
                            <div className="wu-serial-bar">
                                <span className="wu-serial-meta">
                                    115200 BAUD · {component.type}
                                </span>
                                <div className="wu-serial-live">
                                    <div className={`wu-sdot${running ? ' on' : ''}`} />
                                    <span className={`wu-sstate${running ? ' on' : ''}`}>
                                        {running ? 'LIVE' : 'IDLE'}
                                    </span>
                                </div>
                            </div>

                            {/* Serial log */}
                            <div ref={serEl} className="wu-serial-log" style={{
                                height: 340,
                                minHeight: 340,
                                maxHeight: 340,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'var(--border2) transparent',
                            }}>
                                {serial.length === 0 ? (
                                    <div className="wu-serial-empty">
                                        <span style={{ fontSize: 28 }}>📟</span>
                                        <span className="wu-serial-empty-label">
                                            {allDone ? 'Click ▶ Run to start...' : 'Wire all pins first...'}
                                        </span>
                                    </div>
                                ) : (
                                    serial.map((l, i) => {
                                        const isLatest = i === serial.length - 1;
                                        const isAlarm = l.includes('ALARM') || l.includes('BEEP')
                                            || l.includes('PRESSED') || l.includes('STOP');
                                        const isWarn = l.includes('NEAR') || l.includes('WAIT')
                                            || l.includes('YELLOW');
                                        const lineColor = isLatest
                                            ? isAlarm ? '#ef4444'
                                                : isWarn ? '#eab308'
                                                    : '#00e676'
                                            : isAlarm ? '#7f1d1d'
                                                : isWarn ? '#713f12'
                                                    : '#2a7a40';
                                        return (
                                            <div key={i} className="wu-log-line" style={{
                                                borderLeft: isLatest
                                                    ? `2px solid ${lineColor}`
                                                    : '2px solid transparent',
                                                paddingLeft: 8,
                                                marginBottom: 2,
                                                transition: 'border-color 0.3s ease',
                                            }}>
                                                <span className="wu-log-caret" style={{ color: lineColor }}>›</span>
                                                <span className="wu-log-txt" style={{ color: lineColor }}>{l}</span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                        </div>
                    )}
                </div>
            </div>

            {/* ══════════════ BOTTOM BAR ══════════════ */}
            <div className="wu-bottom">

                {/* Success banner */}
                {allDone && (
                    <div className="wu-done-banner" style={{
                        animation: 'wuCelebrate 0.5s ease-out',
                        background: 'linear-gradient(135deg, var(--green-dim), rgba(62,207,110,0.08))',
                        border: '1px solid var(--green-border)',
                        boxShadow: '0 0 20px rgba(62,207,110,0.12)',
                    }}>
                        <span style={{ fontSize: 22 }}>🎉</span>
                        <span className="wu-done-txt">
                            All connections verified — click ▶ Run to simulate!
                        </span>
                    </div>
                )}

                {/* Step instruction */}
                {!allDone && (
                    <div className="wu-instr-row">
                        <div className="wu-step-num" style={{
                            background: 'linear-gradient(135deg, var(--blue-dim), rgba(77,157,224,0.15))',
                            boxShadow: '0 0 10px rgba(77,157,224,0.2)',
                            border: '1px solid var(--blue-border)',
                            fontWeight: 800,
                            fontSize: 13,
                        }}>{cur + 1}</div>
                        <p className="wu-instr-txt" style={{
                            fontSize: 13,
                            lineHeight: 1.8,
                            color: 'var(--text0)',
                        }}>{s.instr}</p>
                    </div>
                )}

                {/* Wire pill */}
                {s.wire && !allDone && (
                    <div className="wu-wire-pill-row" style={{
                        borderLeft: `3px solid ${s.wire.color}`,
                        background: 'var(--bg2)',
                        borderRadius: '0 8px 8px 0',
                    }}>
                        <div className="wu-wire-stripe" style={{
                            background: s.wire.color,
                            boxShadow: `0 0 6px ${s.wire.color}88`,
                        }} />
                        {s.wire.hasR && <span className="wu-ohm">⚡ 220Ω</span>}
                        <span className="wu-wire-lbl">{s.wire.label}</span>
                    </div>
                )}

                {/* Step dots — premium pill indicator */}
                <div className="wu-stepdots">
                    {steps.map((st, i) => {
                        const isDone = drawn.has(i);
                        const isCur = i === cur;
                        return (
                            <div
                                key={i}
                                title={st.wire ? `${st.wire.cpName} → ${st.wire.epKey}` : `Step ${i + 1}`}
                                style={{
                                    height: 6,
                                    width: isCur ? 24 : isDone ? 8 : 4,
                                    borderRadius: 99,
                                    background: isDone
                                        ? 'var(--green)'
                                        : isCur
                                            ? 'var(--blue)'
                                            : 'var(--bg4)',
                                    boxShadow: isCur
                                        ? '0 0 8px rgba(77,157,224,0.6)'
                                        : isDone
                                            ? '0 0 4px rgba(62,207,110,0.4)'
                                            : 'none',
                                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                                    flexShrink: 0,
                                }}
                            />
                        );
                    })}
                </div>

            </div>
        </div>
    );
}