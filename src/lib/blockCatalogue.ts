import type { BlockParam } from "@/types";

type BlockTemplate = {
  type: string;
  icon: string;
  label: string;
  params: BlockParam[];
};

export const BLOCK_COLOURS: Record<string, string> = {
  pinMode: 'bg-orange-500',
  dw_high: 'bg-orange-500',
  dw_low: 'bg-orange-500',
  blink: 'bg-orange-500',
  tone_on: 'bg-orange-500',
  tone_off: 'bg-orange-500',

  pwm_setup: 'bg-pink-500',
  pwm_write: 'bg-pink-500',
  servo_write: 'bg-pink-500',

  dht_setup: 'bg-purple-500',
  dht_temp: 'bg-purple-500',
  dht_hum: 'bg-purple-500',
  btn_read: 'bg-purple-500',
  pir_read: 'bg-purple-500',
  analog_read: 'bg-purple-500',
  map_val: 'bg-purple-500',
  ultrasonic: 'bg-purple-500',

  delay_ms: 'bg-yellow-500',
  delay_sec: 'bg-yellow-500',
  for_loop: 'bg-green-500',
  while_loop: 'bg-green-500',
  end_loop: 'bg-green-500',
  if_block: 'bg-yellow-400',
  else_block: 'bg-yellow-400',
  end_if: 'bg-yellow-400',

  wifi_connect: 'bg-red-500',
  wifi_wait: 'bg-red-500',
  wifi_ip: 'bg-red-500',

  mqtt_setup: 'bg-emerald-500',
  mqtt_publish: 'bg-emerald-500',
  mqtt_subscribe: 'bg-emerald-500',
  mqtt_loop: 'bg-emerald-500',

  serial_begin: 'bg-blue-500',
  serial_print: 'bg-blue-500',
  serial_printvar: 'bg-blue-500',
  serial_println: 'bg-blue-500',

  var_int: 'bg-sky-500',
  var_float: 'bg-sky-500',
  var_str: 'bg-sky-500',
  var_bool: 'bg-sky-500',
  var_add: 'bg-sky-500',
};

export const BLOCK_CATALOGUE: BlockTemplate[] = [
  // Output blocks
  {
    type: "pinMode",
    icon: "📌",
    label: "Set Pin <pin> as <mode>",
    params: [
      { name: "pin", type: "number", default: 2 },
      {
        name: "mode",
        type: "select",
        default: "OUTPUT",
        options: ["OUTPUT", "INPUT", "INPUT_PULLUP"],
      },
    ],
  },
  {
    type: "dw_high",
    icon: "💡",
    label: "Turn ON LED on Pin <pin>",
    params: [{ name: "pin", type: "number", default: 2 }],
  },
  {
    type: "dw_low",
    icon: "🌑",
    label: "Turn OFF LED on Pin <pin>",
    params: [{ name: "pin", type: "number", default: 2 }],
  },
  {
    type: "blink",
    icon: "✨",
    label: "Blink LED on Pin <pin> every <ms>ms",
    params: [
      { name: "pin", type: "number", default: 2 },
      { name: "ms", type: "number", default: 500 },
    ],
  },
  {
    type: "tone_on",
    icon: "🔊",
    label: "Play buzzer on Pin <pin> at <freq> Hz",
    params: [
      { name: "pin", type: "number", default: 13 },
      { name: "freq", type: "number", default: 1000 },
    ],
  },
  {
    type: "tone_off",
    icon: "🔕",
    label: "Stop buzzer on Pin <pin>",
    params: [{ name: "pin", type: "number", default: 13 }],
  },

  // PWM blocks
  {
    type: "pwm_setup",
    icon: "🔆",
    label: "Setup PWM Pin <pin>",
    params: [{ name: "pin", type: "number", default: 2 }],
  },
  {
    type: "pwm_write",
    icon: "🌗",
    label: "Set brightness on Pin <pin> to <val>",
    params: [
      { name: "pin", type: "number", default: 2 },
      { name: "val", type: "number", default: 128 },
    ],
  },
  {
    type: "servo_write",
    icon: "⚙️",
    label: "Set Servo on Pin <pin> to <deg> degrees",
    params: [
      { name: "pin", type: "number", default: 2 },
      { name: "deg", type: "number", default: 90 },
    ],
  },

  // Sensor blocks
  {
    type: "dht_setup",
    icon: "🌡️",
    label: "Setup DHT11 sensor on Pin <pin>",
    params: [{ name: "pin", type: "number", default: 4 }],
  },
  {
    type: "dht_temp",
    icon: "🌡️",
    label: "Read temperature into <var>",
    params: [{ name: "var", type: "text", default: "temp" }],
  },
  {
    type: "dht_hum",
    icon: "💧",
    label: "Read humidity into <var>",
    params: [{ name: "var", type: "text", default: "humidity" }],
  },
  {
    type: "btn_read",
    icon: "🔘",
    label: "Read button on Pin <pin> into <var>",
    params: [
      { name: "pin", type: "number", default: 12 },
      { name: "var", type: "text", default: "btnState" },
    ],
  },
  {
    type: "pir_read",
    icon: "👁️",
    label: "Read PIR motion on Pin <pin> into <var>",
    params: [
      { name: "pin", type: "number", default: 14 },
      { name: "var", type: "text", default: "motion" },
    ],
  },
  {
    type: "analog_read",
    icon: "📊",
    label: "Read analog Pin <pin> into <var>",
    params: [
      { name: "pin", type: "number", default: 34 },
      { name: "var", type: "text", default: "sensorVal" },
    ],
  },
  {
    type: "map_val",
    icon: "🗺️",
    label: "Map <var> from <fromLow>-<fromHigh> to <toLow>-<toHigh>",
    params: [
      { name: "var", type: "text", default: "sensorVal" },
      { name: "fromLow", type: "number", default: 0 },
      { name: "fromHigh", type: "number", default: 4095 },
      { name: "toLow", type: "number", default: 0 },
      { name: "toHigh", type: "number", default: 255 },
    ],
  },
  {
    type: "ultrasonic",
    icon: "📏",
    label: "Read ultrasonic Trig <trig> Echo <echo> into <var>",
    params: [
      { name: "trig", type: "number", default: 12 },
      { name: "echo", type: "number", default: 13 },
      { name: "var", type: "text", default: "distance" },
    ],
  },

  // Control blocks
  {
    type: "delay_ms",
    icon: "⏳",
    label: "Wait <ms> milliseconds",
    params: [{ name: "ms", type: "number", default: 1000 }],
  },
  {
    type: "delay_sec",
    icon: "🕐",
    label: "Wait <sec> seconds",
    params: [{ name: "sec", type: "number", default: 1 }],
  },
  {
    type: "for_loop",
    icon: "🔁",
    label: "Repeat <times> times ▼",
    params: [{ name: "times", type: "number", default: 5 }],
  },
  {
    type: "while_loop",
    icon: "🔄",
    label: "While <var> <op> <val> is true ▼",
    params: [
      { name: "var", type: "text", default: "counter" },
      {
        name: "op",
        type: "select",
        default: ">",
        options: ["==", "!=", ">", "<", ">=", "<="],
      },
      { name: "val", type: "text", default: "0" },
    ],
  },
  {
    type: "end_loop",
    icon: "🔚",
    label: "End loop ▲",
    params: [],
  },
  {
    type: "if_block",
    icon: "❓",
    label: "If <cond> then ▼",
    params: [{ name: "cond", type: "text", default: "temp > 30" }],
  },
  {
    type: "else_block",
    icon: "↩️",
    label: "Otherwise ▼",
    params: [],
  },
  {
    type: "end_if",
    icon: "🔚",
    label: "End If ▲",
    params: [],
  },

  // WiFi blocks
  {
    type: "wifi_connect",
    icon: "📶",
    label: 'Connect to WiFi "<ssid>" password "<pass>"',
    params: [
      { name: "ssid", type: "text", default: "MyWiFi" },
      { name: "pass", type: "text", default: "password123" },
    ],
  },
  {
    type: "wifi_wait",
    icon: "⌛",
    label: "Wait until WiFi is connected",
    params: [],
  },
  {
    type: "wifi_ip",
    icon: "🌐",
    label: "Print my IP address to Serial",
    params: [],
  },

  // MQTT blocks
  {
    type: "mqtt_setup",
    icon: "☁️",
    label: 'Connect to MQTT broker "<broker>"',
    params: [{ name: "broker", type: "text", default: "broker.hivemq.com" }],
  },
  {
    type: "mqtt_publish",
    icon: "📤",
    label: 'Publish <val> to topic "<topic>"',
    params: [
      { name: "val", type: "text", default: "temp" },
      { name: "topic", type: "text", default: "home/sensor" },
    ],
  },
  {
    type: "mqtt_subscribe",
    icon: "📥",
    label: 'Subscribe to topic "<topic>"',
    params: [{ name: "topic", type: "text", default: "home/led" }],
  },
  {
    type: "mqtt_loop",
    icon: "🔃",
    label: "Keep MQTT alive (put in loop)",
    params: [],
  },

  // Serial blocks
  {
    type: "serial_begin",
    icon: "🔌",
    label: "Start Serial Monitor",
    params: [],
  },
  {
    type: "serial_print",
    icon: "💬",
    label: 'Print "<msg>" to monitor',
    params: [{ name: "msg", type: "text", default: "Hello ESP32!" }],
  },
  {
    type: "serial_printvar",
    icon: "📊",
    label: "Print variable <var> to monitor",
    params: [{ name: "var", type: "text", default: "temp" }],
  },
  {
    type: "serial_println",
    icon: "📃",
    label: 'Print "<label>" + <var> on new line',
    params: [
      { name: "label", type: "text", default: "Temp: " },
      { name: "var", type: "text", default: "temp" },
    ],
  },

  // Variable blocks
  {
    type: "var_int",
    icon: "🔢",
    label: 'Create number "<name>" = <val>',
    params: [
      { name: "name", type: "text", default: "myNum" },
      { name: "val", type: "number", default: 0 },
    ],
  },
  {
    type: "var_float",
    icon: "🔣",
    label: 'Create decimal "<name>" = <val>',
    params: [
      { name: "name", type: "text", default: "myFloat" },
      { name: "val", type: "number", default: 0 },
    ],
  },
  {
    type: "var_str",
    icon: "📝",
    label: 'Create text "<name>" = "<val>"',
    params: [
      { name: "name", type: "text", default: "myText" },
      { name: "val", type: "text", default: "hello" },
    ],
  },
  {
    type: "var_bool",
    icon: "☑️",
    label: 'Create true/false "<name>" = <val>',
    params: [
      { name: "name", type: "text", default: "isOn" },
      {
        name: "val",
        type: "select",
        default: "false",
        options: ["true", "false"],
      },
    ],
  },
  {
    type: "var_add",
    icon: "🔢",
    label: 'Change "<name>" by <step>',
    params: [
      { name: "name", type: "text", default: "myNum" },
      { name: "step", type: "number", default: 1 },
    ],
  },
];
