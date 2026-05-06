import type { Block } from "@/types";

export function generateCode(blocks: Block[]): { code: string; english: string[] } {
  const includes = new Set<string>();
  const globals: string[] = [];
  const setup: string[] = [];
  const loop: string[] = [];
  const missingList: string[] = [];
  const globalKeys = new Set<string>();
  const setupKeys = new Set<string>();
  const english: string[] = [];
  let indent = 1;

  const esc = (v: unknown): string =>
    String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const kw = (v: string): string => `<span class="kw">${esc(v)}</span>`;
  const fn = (v: string): string => `<span class="fn">${esc(v)}</span>`;
  const num = (v: string | number): string => `<span class="num">${esc(v)}</span>`;
  const str = (v: string): string => `<span class="str">&quot;${esc(v)}&quot;</span>`;
  const cmt = (v: string): string => `<span class="cmt">${esc(v)}</span>`;
  const pp = (v: string): string => `<span class="pp">${esc(v)}</span>`;
  const tp = (v: string): string => `<span class="tp">${esc(v)}</span>`;

  const isMissing = (v: unknown): boolean => v === "" || v === undefined || v === null;

  const addMissing = (label: string): void => {
    if (!missingList.includes(label)) {
      missingList.push(label);
    }
  };

  const safe = (val: unknown, label: string): string => {
    if (isMissing(val)) {
      addMissing(label);
      return `/* FILL_IN_${label} */`;
    }
    return String(val);
  };

  const safePin = (val: unknown, label: string): string => {
    if (isMissing(val)) {
      addMissing(label);
      return `/* FILL_IN_${label} */ 0`;
    }
    return String(Number(val));
  };

  const safeVar = (val: unknown, fallback: string): string => {
    const source = isMissing(val) ? fallback : String(val);
    let cleaned = source.replace(/[^A-Za-z0-9_]/g, "");
    if (!cleaned) {
      cleaned = fallback.replace(/[^A-Za-z0-9_]/g, "") || "varValue";
    }
    if (/^[0-9]/.test(cleaned)) {
      cleaned = `_${cleaned}`;
    }
    return cleaned;
  };

  const ind = (n: number): string => " ".repeat(n * 2);

  const addGlobal = (key: string, line: string): void => {
    if (!globalKeys.has(key)) {
      globals.push(line);
      globalKeys.add(key);
    }
  };

  const addSetupOnce = (key: string, line: string): void => {
    if (!setupKeys.has(key)) {
      setup.push(`${ind(1)}${line}`);
      setupKeys.add(key);
    }
  };

  const si = (line: string): void => {
    setup.push(`${ind(1)}${line}`);
  };

  const li = (line: string): void => {
    loop.push(`${ind(indent)}${line}`);
  };

  const numberToken = (val: unknown, label: string, fallback: number): string => {
    if (isMissing(val)) {
      return safePin(val, label);
    }
    const str = String(val).trim();
    // If the value is a valid number, output as numeric literal
    if (str !== '' && !isNaN(Number(str))) {
      return num(str);
    }
    // If it looks like a valid variable name (letters, digits, underscore,
    // not starting with a digit), output as-is for use as a variable reference
    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(str)) {
      return str;
    }
    // Fallback to safe placeholder
    return safePin(val, label);
  };

  const textExpr = (val: unknown, label: string, fallback: string): string => {
    if (isMissing(val)) {
      return safe(val, label);
    }
    const out = String(val || fallback);
    return esc(out);
  };

  for (const block of blocks) {
    switch (block.type) {
      case "pinMode": {
        const pin = numberToken(block.values.pin, "PIN", 0);
        const mode = textExpr(block.values.mode, "MODE", "OUTPUT");
        si(`${fn("pinMode")}(${pin}, ${mode});`);
        english.push(`Set pin ${String(block.values.pin ?? "?")} mode to ${String(block.values.mode ?? "?")}.`);
        break;
      }
      case "dw_high": {
        const pin = numberToken(block.values.pin, "PIN", 0);
        li(`${fn("digitalWrite")}(${pin}, HIGH); ${cmt("// LED ON")}`);
        english.push(`Turn LED on pin ${String(block.values.pin ?? "?")} ON.`);
        break;
      }
      case "dw_low": {
        const pin = numberToken(block.values.pin, "PIN", 0);
        li(`${fn("digitalWrite")}(${pin}, LOW); ${cmt("// LED OFF")}`);
        english.push(`Turn LED on pin ${String(block.values.pin ?? "?")} OFF.`);
        break;
      }
      case "blink": {
        const pin = numberToken(block.values.pin, "PIN", 0);
        const ms = numberToken(block.values.ms, "MS", 500);
        li(`${fn("digitalWrite")}(${pin}, HIGH);`);
        li(`${fn("delay")}(${ms});`);
        li(`${fn("digitalWrite")}(${pin}, LOW);`);
        li(`${fn("delay")}(${ms});`);
        english.push(`Blink pin ${String(block.values.pin ?? "?")} every ${String(block.values.ms ?? "?")} ms.`);
        break;
      }
      case "tone_on": {
        const pin = numberToken(block.values.pin, "PIN", 0);
        const freq = numberToken(block.values.freq, "FREQ", 1000);
        li(`${fn("tone")}(${pin}, ${freq}); ${cmt("// Buzzer ON")}`);
        english.push(`Play buzzer on pin ${String(block.values.pin ?? "?")} at ${String(block.values.freq ?? "?")} Hz.`);
        break;
      }
      case "tone_off": {
        const pin = numberToken(block.values.pin, "PIN", 0);
        li(`${fn("noTone")}(${pin}); ${cmt("// Buzzer OFF")}`);
        english.push(`Stop buzzer on pin ${String(block.values.pin ?? "?")}.`);
        break;
      }
      case "pwm_setup": {
        const pin = numberToken(block.values.pin, "PIN", 0);
        si(`${fn("analogWriteResolution")}(8);`);
        si(`${fn("pinMode")}(${pin}, OUTPUT);`);
        english.push(`Setup PWM on pin ${String(block.values.pin ?? "?")}.`);
        break;
      }
      case "pwm_write": {
        const pin = numberToken(block.values.pin, "PIN", 0);
        const val = numberToken(block.values.val, "VAL", 128);
        li(`${fn("analogWrite")}(${pin}, ${val}); ${cmt("// 0=off, 255=full")}`);
        english.push(`Write PWM value ${String(block.values.val ?? "?")} to pin ${String(block.values.pin ?? "?")}.`);
        break;
      }
      case "servo_write": {
        includes.add("ESP32Servo.h");
        const pinRaw = safePin(block.values.pin, "PIN");
        const pin = isMissing(block.values.pin) ? pinRaw : num(String(Number(block.values.pin)));
        const deg = numberToken(block.values.deg, "DEG", 90);
        const servoName = `servo_${safeVar(block.values.pin, "pin")}`;
        addGlobal(`servo:${servoName}`, `${tp("Servo")} ${servoName};`);
        addSetupOnce(`servo_attach:${servoName}`, `${servoName}.${fn("attach")}(${pin});`);
        li(`${servoName}.${fn("write")}(${deg});`);
        english.push(`Set servo on pin ${String(block.values.pin ?? "?")} to ${String(block.values.deg ?? "?")} degrees.`);
        break;
      }
      case "dht_setup": {
        includes.add("DHT.h");
        const pinRaw = safePin(block.values.pin, "PIN");
        const pin = isMissing(block.values.pin) ? pinRaw : num(String(Number(block.values.pin)));
        addGlobal("dht", `${tp("DHT")} dht(${pin}, DHT11);`);
        addSetupOnce("dht.begin", `dht.${fn("begin")}();`);
        english.push(`Setup DHT11 sensor on pin ${String(block.values.pin ?? "?")}.`);
        break;
      }
      case "dht_temp": {
        const varName = safeVar(block.values.var, "temp");
        addGlobal(`var_float:${varName}`, `${tp("float")} ${varName} = ${num("0")};`);
        li(`${varName} = dht.${fn("readTemperature")}();`);
        english.push(`Read temperature into variable ${varName}.`);
        break;
      }
      case "dht_hum": {
        const varName = safeVar(block.values.var, "humidity");
        addGlobal(`var_float:${varName}`, `${tp("float")} ${varName} = ${num("0")};`);
        li(`${varName} = dht.${fn("readHumidity")}();`);
        english.push(`Read humidity into variable ${varName}.`);
        break;
      }
      case "btn_read": {
        const pin = numberToken(block.values.pin, "PIN", 0);
        const varName = safeVar(block.values.var, "btnState");
        addGlobal(`var_int:${varName}`, `${tp("int")} ${varName} = ${num("0")};`);
        li(`${varName} = ${fn("digitalRead")}(${pin});`);
        english.push(`Read button on pin ${String(block.values.pin ?? "?")} into ${varName}.`);
        break;
      }
      case "pir_read": {
        const pin = numberToken(block.values.pin, "PIN", 0);
        const varName = safeVar(block.values.var, "motion");
        addGlobal(`var_int:${varName}`, `${tp("int")} ${varName} = ${num("0")};`);
        li(`${varName} = ${fn("digitalRead")}(${pin});`);
        english.push(`Read PIR on pin ${String(block.values.pin ?? "?")} into ${varName}.`);
        break;
      }
      case "analog_read": {
        const pin = numberToken(block.values.pin, "PIN", 34);
        const varName = safeVar(block.values.var, "sensorVal");
        addGlobal(`var_int:${varName}`, `${tp("int")} ${varName} = ${num("0")};`);
        li(`${varName} = ${fn("analogRead")}(${pin});`);
        english.push(`Read analog pin ${String(block.values.pin ?? "?")} into ${varName}.`);
        break;
      }
      case "ultrasonic": {
        const trig = numberToken(block.values.trig, "TRIG", 12);
        const echo = numberToken(block.values.echo, "ECHO", 13);
        const varName = safeVar(block.values.var, "distance");
        addGlobal(`var_long:${varName}`, `${tp("long")} ${varName} = ${num("0")};`);
        li(`${fn("pinMode")}(${trig}, OUTPUT);`);
        li(`${fn("pinMode")}(${echo}, INPUT);`);
        li(`${fn("digitalWrite")}(${trig}, LOW);`);
        li(`${fn("delayMicroseconds")}(2);`);
        li(`${fn("digitalWrite")}(${trig}, HIGH);`);
        li(`${fn("delayMicroseconds")}(10);`);
        li(`${fn("digitalWrite")}(${trig}, LOW);`);
        li(`${varName} = ${fn("pulseIn")}(${echo}, HIGH);`);
        english.push(`Measure distance with ultrasonic sensor into ${varName}.`);
        break;
      }
      case "soil_read": {
        const pin = numberToken(block.values.pin, "PIN", 34);
        const varName = safeVar(block.values.var, "soil");
        addGlobal(`var_int:${varName}`, `${tp("int")} ${varName} = ${num("0")};`);
        li(`${varName} = ${fn("analogRead")}(${pin});`);
        english.push(`Read soil sensor from pin ${String(block.values.pin ?? "?")} into ${varName}.`);
        break;
      }
      case "delay_ms": {
        const ms = numberToken(block.values.ms, "MS", 1000);
        li(`${fn("delay")}(${ms});`);
        english.push(`Wait ${String(block.values.ms ?? "?")} milliseconds.`);
        break;
      }
      case "delay_sec": {
        const sec = numberToken(block.values.sec, "SEC", 1);
        li(`${fn("delay")}(${sec} * ${num("1000")});`);
        english.push(`Wait ${String(block.values.sec ?? "?")} seconds.`);
        break;
      }
      case "for_loop": {
        const times = numberToken(block.values.times, "TIMES", 1);
        li(`${kw("for")}(${tp("int")} i=${num("0")}; i&lt;${times}; i++){`);
        indent += 1;
        english.push(`Repeat enclosed blocks ${String(block.values.times ?? "?")} times.`);
        break;
      }
      case "while_loop": {
        const cond = textExpr(block.values.cond, "COND", "true");
        li(`${kw("while")}(${cond}){`);
        indent += 1;
        english.push(`Repeat enclosed blocks while condition is true.`);
        break;
      }
      case "end_loop": {
        indent = Math.max(1, indent - 1);
        li("}");
        english.push("End loop block.");
        break;
      }
      case "if_block": {
        const cond = textExpr(block.values.cond, "COND", "true");
        li(`${kw("if")}(${cond}){`);
        indent += 1;
        english.push("Run enclosed blocks if condition is true.");
        break;
      }
      case "else_block": {
        indent = Math.max(1, indent - 1);
        li(`} ${kw("else")} {`);
        indent += 1;
        english.push("Otherwise branch.");
        break;
      }
      case "end_if": {
        indent = Math.max(1, indent - 1);
        li("}");
        english.push("End if block.");
        break;
      }
      case "wifi_connect": {
        includes.add("WiFi.h");
        const ssid = isMissing(block.values.ssid) ? safe(block.values.ssid, "SSID") : str(String(block.values.ssid));
        const pass = isMissing(block.values.pass) ? safe(block.values.pass, "PASS") : str(String(block.values.pass));
        addGlobal("wifi:ssid", `${kw("const")} char* WIFI_SSID = ${ssid};`);
        addGlobal("wifi:pass", `${kw("const")} char* WIFI_PASS = ${pass};`);
        si(`WiFi.${fn("begin")}(WIFI_SSID, WIFI_PASS);`);
        english.push("Connect to configured WiFi network.");
        break;
      }
      case "wifi_wait": {
        li(`${kw("while")}(WiFi.${fn("status")}() != WL_CONNECTED){`);
        li(`${ind(0)}  ${fn("delay")}(${num("500")});`);
        li("}");
        english.push("Wait until WiFi is connected.");
        break;
      }
      case "wifi_ip": {
        li(`Serial.${fn("println")}(WiFi.${fn("localIP")}());`);
        english.push("Print local WiFi IP address.");
        break;
      }
      case "server_begin": {
        includes.add("WebServer.h");
        const port = numberToken(block.values.port, "PORT", 80);
        addGlobal("server", `${tp("WebServer")} server(${port});`);
        addSetupOnce("server.begin", `server.${fn("begin")}();`);
        english.push("Start HTTP web server.");
        break;
      }
      case "server_handle": {
        li(`server.${fn("handleClient")}();`);
        english.push("Handle incoming web server clients.");
        break;
      }
      case "ntp_setup": {
        includes.add("time.h");
        li(`${fn("configTime")}(0, 0, ${str("pool.ntp.org")});`);
        english.push("Configure NTP time service.");
        break;
      }
      case "mqtt_setup": {
        includes.add("WiFi.h");
        includes.add("PubSubClient.h");
        addGlobal("mqtt:wifiClient", "WiFiClient espClient;");
        addGlobal("mqtt:client", "PubSubClient client(espClient);");
        const broker = isMissing(block.values.broker)
          ? safe(block.values.broker, "BROKER")
          : str(String(block.values.broker));
        const port = numberToken(block.values.port, "PORT", 1883);
        si(`client.${fn("setServer")}(${broker}, ${port});`);
        english.push("Setup MQTT broker connection details.");
        break;
      }
      case "mqtt_publish": {
        const topic = isMissing(block.values.topic) ? safe(block.values.topic, "TOPIC") : str(String(block.values.topic));
        const valueExpr = textExpr(block.values.val, "VAL", "value");
        li(`client.${fn("publish")}(${topic}, String(${valueExpr}).${fn("c_str")}());`);
        english.push("Publish a value to MQTT topic.");
        break;
      }
      case "mqtt_subscribe": {
        const topic = isMissing(block.values.topic) ? safe(block.values.topic, "TOPIC") : str(String(block.values.topic));
        li(`client.${fn("subscribe")}(${topic});`);
        english.push("Subscribe to MQTT topic.");
        break;
      }
      case "mqtt_loop": {
        li(`client.${fn("loop")}();`);
        english.push("Keep MQTT client alive.");
        break;
      }
      case "serial_begin": {
        si(`Serial.${fn("begin")}(${num("115200")});`);
        english.push("Start Serial monitor.");
        break;
      }
      case "serial_print": {
        const msg = isMissing(block.values.msg) ? safe(block.values.msg, "MSG") : str(String(block.values.msg));
        li(`Serial.${fn("print")}(${msg});`);
        english.push("Print message to Serial monitor.");
        break;
      }
      case "serial_printvar": {
        const varName = safeVar(block.values.var, "temp");
        li(`Serial.${fn("print")}(${varName});`);
        english.push(`Print variable ${varName} to Serial monitor.`);
        break;
      }
      case "serial_println": {
        const label = isMissing(block.values.label) ? safe(block.values.label, "LABEL") : str(String(block.values.label));
        const varName = safeVar(block.values.var, "temp");
        li(`Serial.${fn("print")}(${label});`);
        li(`Serial.${fn("println")}(${varName});`);
        english.push(`Print label and variable ${varName} on new Serial line.`);
        break;
      }
      case "var_int": {
        const name = safeVar(block.values.name, "myInt");
        const val = numberToken(block.values.val, "VAL", 0);
        addGlobal(`var_int:${name}`, `${tp("int")} ${name} = ${val};`);
        english.push(`Create integer variable ${name}.`);
        break;
      }
      case "var_float": {
        const name = safeVar(block.values.name, "myFloat");
        const val = numberToken(block.values.val, "VAL", 0);
        addGlobal(`var_float:${name}`, `${tp("float")} ${name} = ${val};`);
        english.push(`Create float variable ${name}.`);
        break;
      }
      case "var_str": {
        const name = safeVar(block.values.name, "myText");
        const val = isMissing(block.values.val) ? safe(block.values.val, "VAL") : str(String(block.values.val));
        addGlobal(`var_str:${name}`, `${tp("String")} ${name} = ${val};`);
        english.push(`Create text variable ${name}.`);
        break;
      }
      case "var_bool": {
        const name = safeVar(block.values.name, "isOn");
        const val = isMissing(block.values.val) ? safe(block.values.val, "VAL") : String(block.values.val).toLowerCase();
        addGlobal(`var_bool:${name}`, `${tp("bool")} ${name} = ${esc(val)};`);
        english.push(`Create boolean variable ${name}.`);
        break;
      }
      case "var_add": {
        const name = safeVar(block.values.name, "myNum");
        const step = numberToken(block.values.step, "STEP", 1);
        li(`${name} = ${name} + ${step};`);
        english.push(`Add ${step} to variable ${name}.`);
        break;
      }
      default:
        english.push(`Skip unsupported block type: ${block.type}.`);
        break;
    }
  }

  while (indent > 1) {
    indent -= 1;
    li("}");
  }

  const lines: string[] = [];

  if (missingList.length > 0) {
    lines.push(cmt("/* Missing values detected: */"));
    for (const label of missingList) {
      lines.push(cmt(`// - ${label}`));
    }
    lines.push("");
  }

  for (const inc of Array.from(includes)) {
    lines.push(pp(`#include <${inc}>`));
  }

  if (includes.size > 0) {
    lines.push("");
  }

  lines.push(...globals);
  if (globals.length > 0) {
    lines.push("");
  }

  lines.push(`${kw("void")} ${fn("setup")}() {`);
  lines.push(...setup);
  lines.push("}");
  lines.push("");
  lines.push(`${kw("void")} ${fn("loop")}() {`);
  lines.push(...loop);
  lines.push("}");

  return {
    code: lines.join("\n"),
    english,
  };
}
