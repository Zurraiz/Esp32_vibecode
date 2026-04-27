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
    <div className="flex flex-col h-full bg-[#EDEDED] overflow-hidden">
      {/* Control Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <div className="text-sm font-semibold text-[#2E4862]">Live Simulator</div>
        <button
          onClick={handleRunToggle}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold text-white transition-colors ${
            isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
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
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2 pt-2">
            Interactive Hardware
          </div>
          <div className="flex-1 w-full h-full relative overflow-hidden rounded-lg">
            <HardwareBoard peripherals={peripherals} />
          </div>
        </div>

        {/* Serial Monitor MVP */}
        <div className="bg-[#0d1117] rounded-xl shadow-sm border border-gray-800 flex flex-col h-[180px] shrink-0">
          <div className="bg-gray-800 text-gray-300 text-xs px-3 py-2 rounded-t-xl border-b border-gray-700 font-semibold flex justify-between items-center">
            <span>Serial Monitor</span>
            {serial.length > 0 && (
              <span className="text-[10px] font-mono opacity-60">{serial.length} lines</span>
            )}
          </div>
          <div className="p-3 font-mono text-[11px] text-[#c9d1d9] overflow-y-auto flex-1 flex flex-col gap-1 leading-relaxed">
            {serial.length === 0 ? (
              <span className="text-gray-500 italic">Waiting for data...</span>
            ) : (
              serial.map((line, i) => (
                <div key={i}>{line}</div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}