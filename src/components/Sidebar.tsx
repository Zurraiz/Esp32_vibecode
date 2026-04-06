'use client';

import type { BlockParam } from '@/types';
import { BLOCK_CATALOGUE, BLOCK_COLOURS } from '@/lib/blockCatalogue';
import { useAppStore } from '@/store/useAppStore';

type Category = {
  title: string;
  types: string[];
};

const CATEGORIES: Category[] = [
  { title: '⚡ Output', types: ['pinMode', 'dw_high', 'dw_low', 'blink', 'tone_on', 'tone_off'] },
  { title: '🔆 PWM', types: ['pwm_setup', 'pwm_write', 'servo_write'] },
  {
    title: '📡 Sensors',
    types: ['dht_setup', 'dht_temp', 'dht_hum', 'btn_read', 'pir_read', 'analog_read', 'ultrasonic'],
  },
  {
    title: '🔁 Control',
    types: ['delay_ms', 'delay_sec', 'for_loop', 'while_loop', 'end_loop', 'if_block', 'else_block', 'end_if'],
  },
  { title: '📶 WiFi', types: ['wifi_connect', 'wifi_wait', 'wifi_ip'] },
  { title: '☁️ MQTT', types: ['mqtt_setup', 'mqtt_publish', 'mqtt_subscribe', 'mqtt_loop'] },
  { title: '💬 Serial', types: ['serial_begin', 'serial_print', 'serial_printvar', 'serial_println'] },
  { title: '🔢 Variables', types: ['var_int', 'var_float', 'var_str', 'var_bool'] },
];

const makeShortName = (label: string): string => {
  return label
    .replace(/<[^>]+>/g, '')
    .replace(/\s+on\s+Pin.*$/i, '')
    .replace(/\s+into\s+.*$/i, '')
    .replace(/\s+every\s+.*$/i, '')
    .replace(/\s+to\s+topic.*$/i, '')
    .replace(/\s+to\s+Serial.*$/i, '')
    .replace(/\s+\(put\s+in\s+loop\).*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
};

export default function Sidebar() {
  const addBlock = useAppStore((state) => state.addBlock);

  const handleAddBlock = (type: string) => {
    const template = BLOCK_CATALOGUE.find((block) => block.type === type);
    if (!template) return;

    const values: Record<string, string | number> = Object.fromEntries(
      template.params.map((param: BlockParam) => [param.name, param.default]),
    );

    addBlock({
      type: template.type,
      icon: template.icon,
      label: template.label,
      params: template.params,
      values,
    });
  };

  return (
    <aside className="h-full w-full p-3 overflow-y-auto">
      {CATEGORIES.map((category, index) => {
        const blocks = category.types
          .map((type) => BLOCK_CATALOGUE.find((block) => block.type === type))
          .filter((block): block is NonNullable<typeof block> => Boolean(block));

        if (blocks.length === 0) return null;

        return (
          <section key={category.title} className={index === 0 ? '' : 'mt-4'}>
            <h3 className="text-[11px] uppercase tracking-wide font-semibold text-[#2E4862] border-b border-slate-200 pb-1">
              {category.title}
            </h3>

            <div className="mt-2 flex flex-col gap-1.5">
              {blocks.map((block) => {
                const gradient = BLOCK_COLOURS[block.type] ?? 'from-slate-500 to-slate-700';
                const shortName = makeShortName(block.label);

                return (
                  <button
                    key={block.type}
                    type="button"
                    draggable
                    onClick={() => handleAddBlock(block.type)}
                    className={`w-full rounded-lg py-2 px-3 flex items-center gap-2 ${gradient} text-white text-sm font-medium hover:brightness-110 transition cursor-pointer text-left`}
                    title={block.label}
                  >
                    <span className="text-base leading-none">{block.icon}</span>
                    <span className="truncate">{shortName}</span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </aside>
  );
}
