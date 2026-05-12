import type { Block, Command } from "@/types";

const getNumberValue = (block: Block, key: string, fallback = 0): number => {
  const raw = block.values[key] ?? fallback;
  return Number(raw);
};

const getStringValue = (block: Block, key: string, fallback = ""): string => {
  const raw = block.values[key] ?? fallback;
  return String(raw);
};

const findMatchingEndLoop = (blocks: Block[], startIndex: number, endExclusive: number): number => {
  let depth = 0;

  for (let i = startIndex + 1; i < endExclusive; i += 1) {
    if (blocks[i].type === "for_loop" || blocks[i].type === "while_loop") {
      depth += 1;
      continue;
    }

    if (blocks[i].type === "end_loop") {
      if (depth === 0) {
        return i;
      }
      depth -= 1;
    }
  }

  return -1;
};

const compileCommandsRange = (blocks: Block[], start: number, endExclusive: number): Command[] => {
  const commands: Command[] = [];
  let i = start;

  while (i < endExclusive) {
    const block = blocks[i];

    if (block.type === "for_loop") {
      const endLoopIndex = findMatchingEndLoop(blocks, i, endExclusive);

      if (endLoopIndex === -1) {
        i += 1;
        continue;
      }

      const times = Number(getNumberValue(block, "times", 0));
      const safeTimes = Number.isFinite(times) ? Math.max(0, Math.floor(times)) : 0;

      for (let run = 0; run < safeTimes; run += 1) {
        commands.push(...compileCommandsRange(blocks, i + 1, endLoopIndex));
      }

      i = endLoopIndex + 1;
      continue;
    }
// while_loop: skipped in live mode — firmware doesn't support
// runtime conditions over MQTT. Kept for C++ code generation only.
    if (block.type === "while_loop") {
      const endLoopIndex = findMatchingEndLoop(blocks, i, endExclusive);
      i = endLoopIndex === -1 ? i + 1 : endLoopIndex + 1;
      continue;
    }

    switch (block.type) {
      case "pinMode":
        commands.push({
          action: "pinMode",
          pin: Number(getNumberValue(block, "pin", 0)),
          mode: getStringValue(block, "mode", "OUTPUT"),
        });
        break;
      case "dw_high":
        commands.push({
          action: "digitalWrite",
          pin: Number(getNumberValue(block, "pin", 0)),
          state: "HIGH",
        });
        break;
      case "dw_low":
        commands.push({
          action: "digitalWrite",
          pin: Number(getNumberValue(block, "pin", 0)),
          state: "LOW",
        });
        break;
      case "blink": {
        const pin = Number(getNumberValue(block, "pin", 0));
        const ms = Number(getNumberValue(block, "ms", 500));
        commands.push(
          { action: "digitalWrite", pin, state: "HIGH" },
          { action: "delay", ms },
          { action: "digitalWrite", pin, state: "LOW" },
          { action: "delay", ms },
        );
        break;
      }
      case "pwm_write":
        commands.push({
          action: "analogWrite",
          pin: Number(getNumberValue(block, "pin", 0)),
          value: Number(getNumberValue(block, "val", 0)),
        });
        break;
      case "servo_write":
        commands.push({
          action: "servo",
          pin: Number(getNumberValue(block, "pin", 0)),
          degrees: Number(getNumberValue(block, "deg", 0)),
        });
        break;
      case "tone_on":
        commands.push({
          action: "tone",
          pin: Number(getNumberValue(block, "pin", 0)),
          freq: Number(getNumberValue(block, "freq", 1000)),
        });
        break;
      case "tone_off":
        commands.push({
          action: "noTone",
          pin: Number(getNumberValue(block, "pin", 0)),
        });
        break;
      case "delay_ms":
        commands.push({
          action: "delay",
          ms: Number(getNumberValue(block, "ms", 0)),
        });
        break;
      case "delay_sec":
        commands.push({
          action: "delay",
          ms: Number(getNumberValue(block, "sec", 0)) * 1000,
        });
        break;
      case "btn_read":
        commands.push({
          action: "digitalRead",
          pin: Number(getNumberValue(block, "pin", 0)),
        });
        break;
      case "analog_read":
        commands.push({
          action: "analogRead",
          pin: Number(getNumberValue(block, "pin", 0)),
        });
        break;
      case "serial_print":
        commands.push({
          action: "serialPrint",
          message: getStringValue(block, "msg", ""),
        });
        break;
      case "serial_println":
        commands.push({
          action: "serialPrint",
          message: `${getStringValue(block, "label", "")}${getStringValue(block, "var", "")}`,
        });
        break;
      case "serial_printvar":
        commands.push({
          action: "serialPrint",
          message: getStringValue(block, "var", ""),
        });
        break;
      case "end_loop":
      case "if_block":
      case "else_block":
      case "end_if":
      case "serial_begin":
      case "dht_setup":
      case "pwm_setup":
      case "var_int":
      case "var_float":
      case "var_str":
      case "var_bool":
        break;
      default:
        break;
    }

    i += 1;
  }

  return commands;
};

/**
 * Converts visual block definitions into the flat JSON command list sent to ESP32 over MQTT.
 */
export const blocksToCommands = (blocks: Block[]): Command[] => {
  return compileCommandsRange(blocks, 0, blocks.length);
};

/**
 * Validates structural control-flow correctness for block programs and returns index-based errors.
 */
export const validateBlocks = (blocks: Block[]): Map<number, string> => {
  const errors = new Map<number, string>();
  const ifStack: Array<{ index: number; elseSeen: boolean }> = [];
  const loopStack: Array<{ index: number; type: "for_loop" | "while_loop" }> = [];

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i];

    if (block.type === "if_block") {
      ifStack.push({ index: i, elseSeen: false });
      continue;
    }

    if (block.type === "else_block") {
      const currentIf = ifStack[ifStack.length - 1];
      if (!currentIf) {
        errors.set(i, "else_block has no matching if_block.");
      } else if (currentIf.elseSeen) {
        errors.set(i, "if_block can only have one else_block before end_if.");
      } else {
        currentIf.elseSeen = true;
      }
      continue;
    }

    if (block.type === "end_if") {
      if (ifStack.length === 0) {
        errors.set(i, "end_if has no opening if_block.");
      } else {
        ifStack.pop();
      }
      continue;
    }

    if (block.type === "for_loop" || block.type === "while_loop") {
      loopStack.push({ index: i, type: block.type });
      continue;
    }

    if (block.type === "end_loop") {
      if (loopStack.length === 0) {
        errors.set(i, "end_loop has no opening for_loop or while_loop.");
      } else {
        loopStack.pop();
      }
    }
  }

  for (const unclosedIf of ifStack) {
    errors.set(unclosedIf.index, "if_block is missing a matching end_if.");
  }

  for (const unclosedLoop of loopStack) {
    errors.set(unclosedLoop.index, `${unclosedLoop.type} is missing a matching end_loop.`);
  }

  return errors;
};
