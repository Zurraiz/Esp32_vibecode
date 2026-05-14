// src/lib/wiringEngine.ts — NEW FILE
// Smart wiring engine — auto-calculates coordinates from high-level pin descriptions

// ─── Types ────────────────────────────────────────────────────────────────────

export type PinConnection = {
  name: string;       // e.g. 'VCC', 'GND', 'DATA', 'TRIG', 'ECHO'
  connectTo: string;  // e.g. '3.3V', 'GND', 'GPIO4', 'GPIO12'
  color: 'red' | 'black' | 'yellow' | 'orange' | 'blue' | 'green' | 'white' | 'purple';
};

export type ComponentConfig = {
  type: string;        // e.g. 'DHT22', 'LED', 'BUTTON', 'HC-SR04', 'BUZZER', 'SERVO'
  label?: string;      // override display label
  pins: PinConnection[];
};

export type ResolvedWire = {
  stepText: string;
  wire: {
    x1: number; y1: number;   // from component pin
    x2: number; y2: number;   // to ESP32 pin
    color: string;
    label: string;
    dhtPin: string;  // SVG element id on component side
    espPin: string;  // SVG element id on ESP32 side
  } | null;
  componentPinId?: string;
  espPinId?: string;
};

// ─── Wire Colors ──────────────────────────────────────────────────────────────

export const WIRE_COLORS: Record<string, string> = {
  red:    '#ef4444',
  black:  '#374151',
  yellow: '#eab308',
  orange: '#f97316',
  blue:   '#3b82f6',
  green:  '#22c55e',
  white:  '#e5e7eb',
  purple: '#a855f7',
};

// ─── ESP32 Pin Map ────────────────────────────────────────────────────────────
// Maps pin names to their SVG coordinates on the ESP32 board
// These match the ESP32 SVG rendered in DynamicWiringSimulator

const ESP32_PIN_MAP: Record<string, { x: number; y: number; id: string }> = {
  // Power
  '3.3V':   { x: 282, y: 129, id: 'esp-33v'   },
  'GND':    { x: 282, y: 143, id: 'esp-gnd'   },
  '5V':     { x: 282, y: 115, id: 'esp-5v'    },
  'VIN':    { x: 282, y: 115, id: 'esp-vin'   },
  // GPIO pins
  'GPIO0':  { x: 282, y: 157, id: 'esp-gpio0'  },
  'GPIO2':  { x: 282, y: 171, id: 'esp-gpio2'  },
  'GPIO4':  { x: 282, y: 157, id: 'esp-gpio4'  },
  'GPIO12': { x: 282, y: 171, id: 'esp-gpio12' },
  'GPIO13': { x: 282, y: 185, id: 'esp-gpio13' },
  'GPIO14': { x: 282, y: 199, id: 'esp-gpio14' },
  'GPIO25': { x: 282, y: 157, id: 'esp-gpio25' },
  'GPIO26': { x: 282, y: 171, id: 'esp-gpio26' },
  'GPIO27': { x: 282, y: 185, id: 'esp-gpio27' },
  'GPIO48': { x: 282, y: 199, id: 'esp-gpio48' },
};

// ─── Component Pin Layouts ────────────────────────────────────────────────────
// Each component type defines where its pins are relative to its position
// Component is always rendered at x=430, and pins are on left side (x=430)

type PinLayout = { name: string; yOffset: number };

const COMPONENT_PIN_LAYOUTS: Record<string, { pins: PinLayout[]; height: number; startY: number }> = {
  DHT22:   { startY: 60, height: 100, pins: [
    { name: 'VCC',  yOffset: 72 },
    { name: 'DATA', yOffset: 85 },
    { name: 'GND',  yOffset: 98 },
  ]},
  'HC-SR04': { startY: 50, height: 90, pins: [
    { name: 'VCC',  yOffset: 62 },
    { name: 'TRIG', yOffset: 75 },
    { name: 'ECHO', yOffset: 88 },
    { name: 'GND',  yOffset: 101 },
  ]},
  LED: { startY: 80, height: 60, pins: [
    { name: 'ANODE',   yOffset: 85 },
    { name: 'CATHODE', yOffset: 100 },
    { name: '+',       yOffset: 85 },
    { name: '-',       yOffset: 100 },
  ]},
  BUTTON: { startY: 90, height: 60, pins: [
    { name: 'PIN1', yOffset: 95 },
    { name: 'PIN2', yOffset: 110 },
  ]},
  BUZZER: { startY: 80, height: 60, pins: [
    { name: '+',   yOffset: 85 },
    { name: '-',   yOffset: 100 },
    { name: 'VCC', yOffset: 85 },
    { name: 'GND', yOffset: 100 },
  ]},
  SERVO: { startY: 70, height: 80, pins: [
    { name: 'VCC',    yOffset: 80 },
    { name: 'GND',    yOffset: 93 },
    { name: 'SIGNAL', yOffset: 106 },
    { name: 'PWM',    yOffset: 106 },
  ]},
};

// ─── Main Engine ──────────────────────────────────────────────────────────────

export function resolveWiringSteps(component: ComponentConfig): ResolvedWire[] {
  const layout = COMPONENT_PIN_LAYOUTS[component.type] || COMPONENT_PIN_LAYOUTS['DHT22'];
  const steps: ResolvedWire[] = [];

  // Step 0: Intro — no wire
  steps.push({
    stepText: `Meet your components. The ESP32 (left) is your brain, and the ${component.label || component.type} (right) is your ${getComponentDescription(component.type)}. We will connect them wire by wire.`,
    wire: null,
  });

  // One step per pin connection
  component.pins.forEach((pin, idx) => {
    const pinLayout = layout.pins.find(
      (p) => p.name.toUpperCase() === pin.name.toUpperCase()
    ) || layout.pins[idx] || layout.pins[0];

    const espPin = ESP32_PIN_MAP[pin.connectTo.toUpperCase()] || ESP32_PIN_MAP['GPIO4'];
    const color = WIRE_COLORS[pin.color] || WIRE_COLORS.red;
    const componentX = 430;
    const componentY = layout.startY + pinLayout.yOffset - layout.startY;
    const pinY = layout.startY + pinLayout.yOffset - layout.startY;

    const componentPinId = `comp-pin-${pin.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    const espPinId = espPin.id;

    steps.push({
      stepText: getWireStepText(pin, component.type),
      componentPinId,
      espPinId,
      wire: {
        x1: componentX,
        y1: pinLayout.yOffset,
        x2: espPin.x,
        y2: espPin.y,
        color,
        label: `${pin.color.charAt(0).toUpperCase() + pin.color.slice(1)} — ${pin.name} to ${pin.connectTo}`,
        dhtPin: componentPinId,
        espPin: espPinId,
      },
    });
  });

  // Final step
  steps.push({
    stepText: 'Plug your ESP32 into your computer via USB cable. All wires are connected — your circuit is complete and ready to program!',
    wire: null,
  });

  return steps;
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

function getComponentDescription(type: string): string {
  const descriptions: Record<string, string> = {
    'DHT22':   'temperature and humidity sensor',
    'HC-SR04': 'ultrasonic distance sensor',
    'LED':     'light output',
    'BUTTON':  'input button',
    'BUZZER':  'sound output',
    'SERVO':   'motor',
  };
  return descriptions[type] || 'sensor';
}

function getWireStepText(pin: PinConnection, componentType: string): string {
  const colorLabel = pin.color.charAt(0).toUpperCase() + pin.color.slice(1);
  const explanations: Record<string, string> = {
    'VCC':    'This powers the component.',
    '5V':     'This provides 5V power.',
    '3.3V':   'This provides 3.3V power.',
    'GND':    'This completes the electrical ground circuit.',
    'DATA':   'This sends sensor readings to the ESP32.',
    'TRIG':   'This triggers the ultrasonic pulse.',
    'ECHO':   'This receives the reflected ultrasonic pulse.',
    'ANODE':  'This is the positive leg of the LED.',
    'CATHODE':'This is the negative leg of the LED.',
    'SIGNAL': 'This controls the servo motor position.',
    'PWM':    'This sends the PWM control signal.',
    '+':      'This is the positive connection.',
    '-':      'This is the negative/ground connection.',
  };
  const explanation = explanations[pin.name.toUpperCase()] || 'This connects the component to the ESP32.';
  return `Connect ${componentType} ${pin.name} → ESP32 ${pin.connectTo} using a ${pin.color} wire. ${explanation}`;
}

// ─── Get Component SVG Data ───────────────────────────────────────────────────
// Returns SVG elements for the component based on type

export function getComponentSVGData(type: string): {
  body: string;
  pins: { id: string; name: string; y: number; color: string }[];
  startY: number;
  height: number;
} {
  const layout = COMPONENT_PIN_LAYOUTS[type] || COMPONENT_PIN_LAYOUTS['DHT22'];

  const pinColors: Record<string, string> = {
    VCC: '#dc2626', GND: '#374151', DATA: '#ca8a04',
    TRIG: '#3b82f6', ECHO: '#8b5cf6', ANODE: '#dc2626',
    CATHODE: '#374151', SIGNAL: '#f97316', PWM: '#f97316',
    '+': '#dc2626', '-': '#374151', PIN1: '#6b7280', PIN2: '#374151',
  };

  const pins = layout.pins.map((p) => ({
    id: `comp-pin-${p.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
    name: p.name,
    y: p.yOffset,
    color: pinColors[p.name.toUpperCase()] || '#6b7280',
  }));

  return { body: type, pins, startY: layout.startY, height: layout.height };
}