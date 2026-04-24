import type { Block } from '@/types';

/**
 * Defines the possible physical components that can be visually simulated.
 */
export type PeripheralType = 'LED' | 'SERVO' | 'DHT' | 'BUTTON' | 'PIR' | 'ANALOG_SENSOR' | 'ULTRASONIC' | 'BUZZER';

export interface HardwarePeripheral {
  type: PeripheralType;
  pin: number;     // Primary pin
  pin2?: number;   // Secondary pin (e.g. echo for ultrasonic)
}

/**
 * Scans the user's workspace blocks and automatically determines which hardware 
 * peripherals (LEDs, Servos, etc.) need to be rendered on the SVG board.
 * It ensures we only draw components that are actually referenced in the code.
 * 
 * @param blocks - The array of blocks currently placed in the workspace.
 * @returns An array of uniquely mapped hardware peripherals.
 */
export function deriveHardwareLayout(blocks: Block[]): HardwarePeripheral[] {
  // Use a Map keyed by pin number to prevent drawing multiple components on the same pin
  const peripherals = new Map<number, HardwarePeripheral>();

  for (const block of blocks) {
    const pin = Number(block.values.pin ?? block.params.find(p => p.name === 'pin')?.default);

    switch (block.type) {
      case 'dw_high':
      case 'dw_low':
      case 'blink':
      case 'pwm_setup':
      case 'pwm_write':
        if (!isNaN(pin) && !peripherals.has(pin)) {
          peripherals.set(pin, { type: 'LED', pin });
        }
        break;

      case 'servo_write':
        if (!isNaN(pin) && !peripherals.has(pin)) {
          peripherals.set(pin, { type: 'SERVO', pin });
        }
        break;

      case 'dht_setup':
        if (!isNaN(pin) && !peripherals.has(pin)) {
          peripherals.set(pin, { type: 'DHT', pin });
        }
        break;

      case 'btn_read':
        if (!isNaN(pin) && !peripherals.has(pin)) {
          peripherals.set(pin, { type: 'BUTTON', pin });
        }
        break;

      case 'pir_read':
        if (!isNaN(pin) && !peripherals.has(pin)) {
          peripherals.set(pin, { type: 'PIR', pin });
        }
        break;

      case 'analog_read':
        if (!isNaN(pin) && !peripherals.has(pin)) {
          peripherals.set(pin, { type: 'ANALOG_SENSOR', pin });
        }
        break;

      case 'tone_on':
      case 'tone_off':
        if (!isNaN(pin) && !peripherals.has(pin)) {
          peripherals.set(pin, { type: 'BUZZER', pin });
        }
        break;

      case 'ultrasonic': {
        const trig = Number(block.values.trig ?? block.params.find(p => p.name === 'trig')?.default);
        const echo = Number(block.values.echo ?? block.params.find(p => p.name === 'echo')?.default);
        if (!isNaN(trig) && !peripherals.has(trig)) {
          peripherals.set(trig, { type: 'ULTRASONIC', pin: trig, pin2: echo });
        }
        break;
      }
    }
  }

  return Array.from(peripherals.values());
}
