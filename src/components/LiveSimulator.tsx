import React, { useMemo } from 'react';
import { Play, Square } from 'lucide-react';
import { useSimulatorStore } from '@/store/useSimulatorStore';
import { runLoop, stopSimulation } from '@/lib/simulatorEngine';
import { useAppStore } from '@/store/useAppStore';
import HardwareBoard from '@/components/HardwareBoard';
import { deriveHardwareLayout } from '@/lib/hardwareParser';

export default function LiveSimulator() {
  const { serial, isRunning } = useSimulatorStore();
  const blocks = useAppStore((state) => state.blocks);

  const handleRunToggle = () => {
    if (isRunning) {
      stopSimulation();
    } else {
      runLoop(blocks);
    }
  };

  // Derive connected hardware peripherals based on the blocks the user has added
  const peripherals = useMemo(() => deriveHardwareLayout(blocks), [blocks]);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Control Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="text-sm font-semibold text-[#2E4862]">
            Live Simulator
          </div>
          {isRunning && (
            <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Running
            </span>
          )}
        </div>
        <button
          onClick={handleRunToggle}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-white transition-colors ${
            isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
          }`}
        >
          {isRunning ? (
            <>
              <Square size={14} className="fill-current" /> Stop
            </>
          ) : (
            <>
              <Play size={14} className="fill-current" /> Run
            </>
          )}
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col p-4 gap-4">
        
        {/* Hardware Board SVG View */}
        <div className="flex-1 min-h-[300px] bg-white rounded-xl shadow-sm border border-gray-200 p-2 overflow-hidden flex flex-col">
          <div className="text-xs font-semibold text-[#2E4862] uppercase tracking-wider mb-2 px-2 pt-2">
            Interactive Hardware
          </div>
          <div className="flex-1 w-full h-full relative overflow-hidden rounded-lg">
            {peripherals.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-center px-6">
                <span className="text-3xl">🔌</span>
                <p className="text-xs font-semibold text-gray-500">
                  No hardware detected
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Add blocks to the canvas - LEDs, servos, and buttons
                  will appear here automatically.
                </p>
              </div>
            ) : (
              <HardwareBoard peripherals={peripherals} />
            )}
          </div>
        </div>

        {/* Serial Monitor MVP */}
        <div className="bg-white rounded-xl border border-gray-200 flex flex-col h-[180px] shrink-0">
          <div className="bg-gray-50 text-gray-600 text-xs px-3 py-2 rounded-t-xl border-b border-gray-200 font-semibold flex justify-between items-center">
            <span>🖥️ Serial Monitor</span>
            {serial.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-400">
                  {serial.length} lines
                </span>
                <button
                  type="button"
                  onClick={() => useSimulatorStore.getState().resetSimulation()}
                  className="text-[10px] text-red-400 hover:text-red-600 font-medium transition-colors"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          <div className="p-3 font-mono text-[11px] text-gray-700 overflow-y-auto flex-1 flex flex-col gap-1 leading-relaxed bg-gray-50 rounded-b-xl">
            {serial.length === 0 ? (
              <span className="text-gray-400 italic">
                Waiting for data...
              </span>
            ) : (
              serial.map((line, i) => (
                <div key={i} className="text-gray-700">{line}</div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}