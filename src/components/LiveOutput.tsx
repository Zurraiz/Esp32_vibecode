'use client';

import { useEffect, useRef } from 'react';

import { useAppStore } from '@/store/useAppStore';

const TYPE_COLOR: Record<string, string> = {
  ok: 'text-green-400',
  err: 'text-red-400',
  warn: 'text-yellow-400',
  data: 'text-purple-400',
  '': 'text-gray-400',
};

export default function LiveOutput() {
  const liveLog = useAppStore((state) => state.liveLog);
  const clearLog = useAppStore((state) => state.clearLog);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }, [liveLog]);

  return (
    <div
      ref={scrollRef}
      className="border-t border-gray-200 bg-[#0d1117] max-h-[160px] overflow-y-auto px-[14px] py-2 rounded-b-xl"
    >
      <div className="flex justify-between items-center mb-[6px]">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">📡 Device Output</div>
        <button
          type="button"
          onClick={clearLog}
          className="text-xs text-gray-500 hover:text-gray-300"
        >
          Clear
        </button>
      </div>

      {liveLog.length === 0 ? (
        <p className="text-xs text-gray-600 italic">No output yet — connect a device to see live data</p>
      ) : (
        <div>
          {liveLog.map((entry) => (
            <div key={entry.id} className="flex gap-2 font-mono text-xs leading-relaxed">
              <span className="text-gray-600 flex-shrink-0">{entry.timestamp}</span>
              <span className={TYPE_COLOR[entry.type] ?? 'text-gray-400'}>{entry.message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
