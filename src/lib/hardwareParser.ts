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

  const register = (pin: number, type: PeripheralType, pin2?: number) => {
    if (isNaN(pin)) return;
    if (peripherals.has(pin)) {
      if (peripherals.get(pin)!.type !== type) {
        console.warn(`[Simulator] Hardware conflict on Pin ${pin}: Trying to map ${type} but already mapped as ${peripherals.get(pin)!.type}`);
      }
      return;
    }
    peripherals.set(pin, { type, pin, pin2 });
  };

  for (const block of blocks) {
    const pin = Number(block.values.pin ?? block.params.find(p => p.name === 'pin')?.default);

    switch (block.type) {
      case 'dw_high':
      case 'dw_low':
      case 'blink':
      case 'pwm_setup':
      case 'pwm_write':
        register(pin, 'LED');
        break;

      case 'servo_write':
        register(pin, 'SERVO');
        break;

      case 'dht_setup':
        register(pin, 'DHT');
        break;

      case 'btn_read':
        register(pin, 'BUTTON');
        break;

      case 'pir_read':
        register(pin, 'PIR');
        break;

      case 'analog_read':
        register(pin, 'ANALOG_SENSOR');
        break;

      case 'tone_on':
      case 'tone_off':
        register(pin, 'BUZZER');
        break;

      case 'ultrasonic': {
        const trig = Number(block.values.trig ?? block.params.find(p => p.name === 'trig')?.default);
        const echo = Number(block.values.echo ?? block.params.find(p => p.name === 'echo')?.default);
        register(trig, 'ULTRASONIC', echo);
        break;
      }
    }
  }

  return Array.from(peripherals.values());
}
