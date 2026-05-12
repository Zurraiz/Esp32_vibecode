// src/lib/activitiesData.ts
// REPLACE YOUR EXISTING activitiesData.ts WITH THIS FILE ENTIRELY

// ─── Types ────────────────────────────────────────────────────────────────────

export type Equipment = {
  name: string;
  description: string;
  emoji: string;
  image?: string;
  quantity: number;
};

// Matches the Block shape useAppStore expects (Omit<Block, 'id'>)
// type + label + icon come from BLOCK_CATALOGUE, values are the param values
export type PlaygroundBlock = {
  type: string;
  icon: string;
  label: string;
  values: Record<string, string | number>;
  params: { name: string; type: 'number' | 'text' | 'select'; default: string | number; options?: string[] }[];
};

export type Activity = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  icon: string;
  tags: string[];
  teaches: string[];
  intro: {
    headline: string;
    what: string;
    why: string;
  };
  equipment: Equipment[];
  assemble: {
    videoUrl: string;
    wokwiUrl: string;
    steps: string[];
  };
  code: {
    arduino: string;
    platformDescription: string; // human readable description of what the blocks do
  };
  playgroundBlocks: PlaygroundBlock[]; // ← REAL blocks, properly typed
  output: {
    description: string;
    expected: string[];
    tips: string[];
  };
};

// ─── Activities ───────────────────────────────────────────────────────────────

export const ACTIVITIES: Activity[] = [
  // ── 1. DHT Sensor ──────────────────────────────────────────────────────────
  {
    id: 'dht_sensor',
    title: 'Read Temperature & Humidity',
    description:
      'Connect a DHT22 sensor to your ESP32 and read real temperature and humidity data every 2 seconds.',
    difficulty: 'Beginner',
    duration: '20 min',
    icon: '🌡️',
    tags: ['Sensor', 'Serial', 'DHT22'],
    teaches: ['Sensor wiring', 'DHT library', 'Serial output', 'Variables'],
    intro: {
      headline: 'Read real-world temperature & humidity with your ESP32!',
      what: 'Connect a DHT22 sensor to your ESP32 and write a program that reads temperature and humidity every 2 seconds and prints the results to the Serial Monitor.',
      why: 'Temperature and humidity sensing is one of the most common IoT use cases — from smart home thermostats to industrial monitoring systems.',
    },
    equipment: [
      {
        name: 'ESP32 Dev Board',
        description: 'The main microcontroller. Any ESP32 dev board works.',
        emoji: '🖥️',
        image: '/images/equipment/esp32.jpg',
        quantity: 1,
      },
      {
        name: 'DHT22 Sensor',
        description: 'Digital temperature and humidity sensor. Blue module with 3 pins.',
        emoji: '🌡️',
        quantity: 1,
      },
      {
        name: 'Jumper Wires',
        description: 'Male-to-female jumper wires to connect sensor to ESP32.',
        emoji: '🔌',
        quantity: 3,
      },
      {
        name: 'USB Cable',
        description: 'Micro-USB or USB-C cable to connect ESP32 to your computer.',
        emoji: '🔋',
        quantity: 1,
      },
      {
        name: 'Breadboard (optional)',
        description: 'Helps organize your wiring.',
        emoji: '🧱',
        quantity: 1,
      },
    ],
    assemble: {
      videoUrl: 'https://www.youtube.com/embed/bHhRxw3CgBQ?origin=http://localhost:3000',
      wokwiUrl: 'https://wokwi.com/projects/463700449068203009',
      steps: [
        'Connect DHT22 VCC pin → ESP32 3.3V (red wire)',
        'Connect DHT22 GND pin → ESP32 GND (black wire)',
        'Connect DHT22 DATA pin → ESP32 GPIO 4 (yellow wire)',
        'Plug ESP32 into your computer via USB',
        'Open Arduino IDE or use the Platform Playground',
      ],
    },
    code: {
      arduino: `#include <DHT.h>

#define DHTPIN 4
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  Serial.println("DHT22 Sensor Ready!");
}

void loop() {
  delay(2000);

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");

  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println(" %");
}`,
      platformDescription:
        'These blocks start Serial, set up the DHT22 sensor on pin 4, read temperature and humidity into variables, print them to the Serial Monitor, then wait 2 seconds before repeating.',
    },

    // ← THE FIX: real block objects that match BLOCK_CATALOGUE types
    // values keys must match the param `name` fields in BLOCK_CATALOGUE
    playgroundBlocks: [
      {
        type: 'serial_begin',
        icon: '🔌',
        label: 'Start Serial Monitor',
        params: [],
        values: {},
      },
      {
        type: 'dht_setup',
        icon: '🌡️',
        label: 'Setup DHT22 sensor on Pin <pin>',  // fixed: was DHT11
        params: [{ name: 'pin', type: 'number', default: 4 }],
        values: { pin: 4 },
      },
      {
        type: 'dht_temp',
        icon: '🌡️',
        label: 'Read temperature into <var>',
        params: [{ name: 'var', type: 'text', default: 'temp' }],
        values: { var: 'temp' },
      },
      {
        type: 'dht_hum',
        icon: '💧',
        label: 'Read humidity into <var>',
        params: [{ name: 'var', type: 'text', default: 'humidity' }],
        values: { var: 'humidity' },
      },
      {
        type: 'serial_println',
        icon: '📃',
        label: 'Print "<label>" + <var> on new line',
        params: [
          { name: 'label', type: 'text', default: 'Temp: ' },
          { name: 'var', type: 'text', default: 'temp' },
        ],
        values: { label: 'Temperature: ', var: 'temp' },
      },
      {
        type: 'serial_println',
        icon: '📃',
        label: 'Print "<label>" + <var> on new line',
        params: [
          { name: 'label', type: 'text', default: 'Humidity: ' },
          { name: 'var', type: 'text', default: 'humidity' },
        ],
        values: { label: 'Humidity: ', var: 'humidity' },
      },
      {
        type: 'delay_sec',
        icon: '🕐',
        label: 'Wait <sec> seconds',
        params: [{ name: 'sec', type: 'number', default: 2 }],
        values: { sec: 2 },
      },
    ],

    output: {
      description:
        'Open the Serial Monitor at 115200 baud. You should see temperature and humidity readings printing every 2 seconds.',
      expected: [
        'DHT22 Sensor Ready!',
        'Temperature: 24.00 °C',
        'Humidity: 55.00 %',
        '(values update every 2 seconds)',
      ],
      tips: [
        'If you see "nan" values, check your wiring — especially the DATA pin on GPIO 4.',
        'The DHT22 takes about 1 second to stabilize after power-on.',
        'Try breathing on the sensor — you will see the humidity value jump!',
        'DHT22 accuracy: ±2°C temperature, ±5% humidity.',
      ],
    },
  },

  // ── 2. Blink LED ───────────────────────────────────────────────────────────
  {
    id: 'blink_led',
    title: 'Blink an LED',
    description:
      'The classic first ESP32 project. Make an LED blink on and off every 500ms using GPIO pins.',
    difficulty: 'Beginner',
    duration: '10 min',
    icon: '💡',
    tags: ['Output', 'GPIO', 'LED'],
    teaches: ['pinMode', 'digitalWrite', 'delay', 'GPIO basics'],
    intro: {
      headline: 'Make your first LED blink with the ESP32!',
      what: 'Wire up an LED to your ESP32 and write a simple program that turns it on and off every 500ms — the "Hello World" of electronics.',
      why: 'Blinking an LED teaches you the fundamental building blocks of any microcontroller program: setup, loop, digital output, and timing.',
    },
    equipment: [
      { name: 'ESP32 Dev Board', description: 'The main microcontroller.', emoji: '🖥️', quantity: 1 },
      { name: 'LED', description: 'Any 5mm LED works. Red, green, or blue.', emoji: '💡', quantity: 1 },
      { name: '220Ω Resistor', description: 'Protects the LED from burning out.', emoji: '🔩', quantity: 1 },
      { name: 'Breadboard', description: 'For easy component connections.', emoji: '🧱', quantity: 1 },
      { name: 'Jumper Wires', description: 'To connect components.', emoji: '🔌', quantity: 2 },
    ],
    assemble: {
      videoUrl: 'https://www.youtube.com/embed/5XH8n8d1ZCM',
      wokwiUrl: 'https://wokwi.com/projects/305568836183130690',
      steps: [
        'Place the LED on the breadboard (longer leg = positive/anode)',
        'Connect a 220Ω resistor from LED anode → ESP32 GPIO 48',
        'Connect LED cathode (short leg) → GND rail on breadboard',
        'Connect GND rail → ESP32 GND pin',
        'Plug in USB and upload the code',
      ],
    },
    code: {
      arduino: `#define LED_PIN 48

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  Serial.println("LED Blink Ready!");
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  Serial.println("LED ON");
  delay(500);

  digitalWrite(LED_PIN, LOW);
  Serial.println("LED OFF");
  delay(500);
}`,
      platformDescription:
        'These blocks start Serial, set pin 48 as OUTPUT, then repeatedly turn the LED on, wait 500ms, turn it off, and wait 500ms.',
    },

    playgroundBlocks: [
      {
        type: 'serial_begin',
        icon: '🔌',
        label: 'Start Serial Monitor',
        params: [],
        values: {},
      },
      {
        type: 'pinMode',
        icon: '📌',
        label: 'Set Pin <pin> as <mode>',
        params: [
          { name: 'pin', type: 'number', default: 2 },
          { name: 'mode', type: 'select', default: 'OUTPUT', options: ['OUTPUT', 'INPUT', 'INPUT_PULLUP'] },
        ],
        values: { pin: 48, mode: 'OUTPUT' },
      },
      {
        type: 'dw_high',
        icon: '💡',
        label: 'Turn ON LED on Pin <pin>',
        params: [{ name: 'pin', type: 'number', default: 2 }],
        values: { pin: 48 },
      },
      {
        type: 'serial_print',
        icon: '💬',
        label: 'Print "<msg>" to monitor',
        params: [{ name: 'msg', type: 'text', default: 'Hello ESP32!' }],
        values: { msg: 'LED ON' },
      },
      {
        type: 'delay_ms',
        icon: '⏳',
        label: 'Wait <ms> milliseconds',
        params: [{ name: 'ms', type: 'number', default: 1000 }],
        values: { ms: 500 },
      },
      {
        type: 'dw_low',
        icon: '🌑',
        label: 'Turn OFF LED on Pin <pin>',
        params: [{ name: 'pin', type: 'number', default: 2 }],
        values: { pin: 48 },
      },
      {
        type: 'serial_print',
        icon: '💬',
        label: 'Print "<msg>" to monitor',
        params: [{ name: 'msg', type: 'text', default: 'Hello ESP32!' }],
        values: { msg: 'LED OFF' },
      },
      {
        type: 'delay_ms',
        icon: '⏳',
        label: 'Wait <ms> milliseconds',
        params: [{ name: 'ms', type: 'number', default: 1000 }],
        values: { ms: 500 },
      },
    ],

    output: {
      description:
        'Your LED should blink on and off every 500ms. The Serial Monitor will confirm with ON/OFF messages.',
      expected: ['LED Blink Ready!', 'LED ON', 'LED OFF', '(repeats every 500ms)'],
      tips: [
        "If the LED doesn't light up, flip it around — LEDs are polarity sensitive.",
        'No resistor = burnt LED. Always use a 220Ω or 330Ω resistor.',
        'Try changing the delay value to make it blink faster or slower!',
        'GPIO 48 is the built-in LED on many ESP32-S3 boards.',
      ],
    },
  },

  // ── 3. Button Controls LED ─────────────────────────────────────────────────
  {
    id: 'button_led',
    title: 'Button Controls LED',
    description:
      'Press a physical button to toggle an LED on and off. Learn digital input and if/else logic.',
    difficulty: 'Beginner',
    duration: '15 min',
    icon: '🔘',
    tags: ['Input', 'Output', 'Logic'],
    teaches: ['digitalRead', 'if/else', 'INPUT_PULLUP', 'Debouncing'],
    intro: {
      headline: 'Control hardware with a button press!',
      what: 'Wire up a push button and LED. When you press the button, the LED turns on. Release it, the LED turns off.',
      why: 'Reading digital inputs is half of all IoT projects. Understanding pull-up resistors and if/else logic is essential for any embedded system.',
    },
    equipment: [
      { name: 'ESP32 Dev Board', description: 'Main microcontroller.', emoji: '🖥️', quantity: 1 },
      { name: 'Push Button', description: '4-pin tactile switch.', emoji: '🔘', quantity: 1 },
      { name: 'LED', description: 'Any 5mm LED.', emoji: '💡', quantity: 1 },
      { name: '220Ω Resistor', description: 'For the LED.', emoji: '🔩', quantity: 1 },
      { name: 'Breadboard', description: 'For easy wiring.', emoji: '🧱', quantity: 1 },
      { name: 'Jumper Wires', description: 'To connect everything.', emoji: '🔌', quantity: 4 },
    ],
    assemble: {
      videoUrl: 'https://www.youtube.com/embed/GkH5J0YJVBM',
      wokwiUrl: 'https://wokwi.com/projects/323048568863048276',
      steps: [
        'Place the button on the breadboard straddling the center gap',
        'Connect one button leg → GPIO 0 on ESP32',
        'Connect other button leg → GND',
        'Wire LED anode → 220Ω resistor → GPIO 48',
        'Wire LED cathode → GND',
        'Upload code — the built-in pull-up does the rest',
      ],
    },
    code: {
      arduino: `#define BTN_PIN 0
#define LED_PIN 48

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  pinMode(BTN_PIN, INPUT_PULLUP);
}

void loop() {
  int btnState = digitalRead(BTN_PIN);

  if (btnState == LOW) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Button pressed - LED ON");
  } else {
    digitalWrite(LED_PIN, LOW);
  }

  delay(50);
}`,
      platformDescription:
        'These blocks set up Serial, configure pin 48 as OUTPUT and pin 0 as INPUT_PULLUP, then read the button state. If the button is pressed (LOW), the LED turns on. Otherwise it turns off. 50ms delay prevents bouncing.',
    },

    playgroundBlocks: [
      {
        type: 'serial_begin',
        icon: '🔌',
        label: 'Start Serial Monitor',
        params: [],
        values: {},
      },
      {
        type: 'pinMode',
        icon: '📌',
        label: 'Set Pin <pin> as <mode>',
        params: [
          { name: 'pin', type: 'number', default: 2 },
          { name: 'mode', type: 'select', default: 'OUTPUT', options: ['OUTPUT', 'INPUT', 'INPUT_PULLUP'] },
        ],
        values: { pin: 48, mode: 'OUTPUT' },
      },
      {
        type: 'pinMode',
        icon: '📌',
        label: 'Set Pin <pin> as <mode>',
        params: [
          { name: 'pin', type: 'number', default: 2 },
          { name: 'mode', type: 'select', default: 'OUTPUT', options: ['OUTPUT', 'INPUT', 'INPUT_PULLUP'] },
        ],
        values: { pin: 0, mode: 'INPUT_PULLUP' },
      },
      {
        type: 'btn_read',
        icon: '🔘',
        label: 'Read button on Pin <pin> into <var>',
        params: [
          { name: 'pin', type: 'number', default: 12 },
          { name: 'var', type: 'text', default: 'btnState' },
        ],
        values: { pin: 0, var: 'btnState' },
      },
      {
        type: 'if_block',
        icon: '❓',
        label: 'If <cond> then ▼',
        params: [{ name: 'cond', type: 'text', default: 'temp > 30' }],
        values: { cond: 'btnState == LOW' },
      },
      {
        type: 'dw_high',
        icon: '💡',
        label: 'Turn ON LED on Pin <pin>',
        params: [{ name: 'pin', type: 'number', default: 2 }],
        values: { pin: 48 },
      },
      {
        type: 'else_block',
        icon: '↩️',
        label: 'Otherwise ▼',
        params: [],
        values: {},
      },
      {
        type: 'dw_low',
        icon: '🌑',
        label: 'Turn OFF LED on Pin <pin>',
        params: [{ name: 'pin', type: 'number', default: 2 }],
        values: { pin: 48 },
      },
      {
        type: 'end_if',
        icon: '🔚',
        label: 'End If ▲',
        params: [],
        values: {},
      },
      {
        type: 'delay_ms',
        icon: '⏳',
        label: 'Wait <ms> milliseconds',
        params: [{ name: 'ms', type: 'number', default: 1000 }],
        values: { ms: 50 },
      },
    ],

    output: {
      description: 'LED turns on while button is held. Releases when you let go.',
      expected: ['Button pressed - LED ON', '(LED off when released)'],
      tips: [
        'INPUT_PULLUP means the pin reads HIGH by default. Pressing the button pulls it LOW.',
        'The 50ms delay prevents "bouncing" — rapid on/off flickers from the button.',
        'Try making it toggle instead: flip a boolean variable on each press.',
      ],
    },
  },
];