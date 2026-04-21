'use client';

import React from 'react';
import type { Block } from '@/types';
import { BLOCK_COLOURS } from '@/lib/blockCatalogue';

interface SimulationOverlayProps {
  isOpen: boolean;
  onContinue: () => void;
  blocks: Block[];
  title?: string;
  children: React.ReactNode;
}

export default function SimulationOverlay({
  isOpen,
  onContinue,
  blocks,
  title = 'See what your code does on the hardware',
  children,
}: SimulationOverlayProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-[90vw] max-w-5xl max-h-[85vh] bg-[#EDEDED] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">

        {/* Header */}
        <div className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-green-500 text-lg">✅</span>
              <h2 className="text-base font-bold text-[#2E4862]">Challenge Complete!</h2>
            </div>
            <p className="text-xs text-gray-500">{title}</p>
          </div>
          <button
            type="button"
            onClick={onContinue}
            className="bg-[#2E4862] hover:bg-[#3a5a7a] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
          >
            Continue →
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 gap-4 p-5 overflow-hidden">

          {/* Left: read-only blocks */}
          <div className="w-[220px] flex-shrink-0 flex flex-col">
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2 px-1">
              Your Solution
            </p>
            <div className="flex-1 overflow-y-auto flex flex-col gap-1.5">
              {blocks.map((block) => {
                const colourClass = BLOCK_COLOURS[block.type] ?? 'bg-gray-400';
                return (
                  <div
                    key={block.id}
                    className={`${colourClass} text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2`}
                  >
                    <span>{block.icon}</span>
                    <span className="truncate">{block.label.replace(/<[^>]+>/g, '…')}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-gray-200 flex-shrink-0" />

          {/* Right: simulation */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}
