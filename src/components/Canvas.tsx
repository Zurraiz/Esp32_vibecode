'use client';

import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from '@hello-pangea/dnd';

import { BLOCK_COLOURS } from '@/lib/blockCatalogue';
import { useAppStore } from '@/store/useAppStore';
import type { Block, BlockParam } from '@/types';

const TOKEN_REGEX = /(<[^>]+>)/g;

const stopEvent = (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation();
};

const renderParamControl = (
  block: Block,
  param: BlockParam,
  updateBlockValue: (id: number, param: string, value: string | number) => void,
) => {
  const commonClassName =
    'bg-black/25 border border-white/30 rounded px-1.5 py-0.5 text-white text-xs focus:outline-none focus:border-white/70';

  if (param.type === 'number') {
    return (
      <input
        type="number"
        className={`w-14 ${commonClassName}`}
        value={block.values[param.name] ?? ''}
        onMouseDown={stopEvent}
        onClick={stopEvent}
        onChange={(event) => {
          const nextValue = event.target.value;
          updateBlockValue(block.id, param.name, nextValue === '' ? '' : Number(nextValue));
        }}
      />
    );
  }

  if (param.type === 'select') {
    return (
      <select
        className={`w-24 ${commonClassName}`}
        value={String(block.values[param.name] ?? '')}
        onMouseDown={stopEvent}
        onClick={stopEvent}
        onChange={(event) => updateBlockValue(block.id, param.name, event.target.value)}
      >
        {(param.options ?? []).map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type="text"
      className={`w-24 ${commonClassName}`}
      value={String(block.values[param.name] ?? '')}
      onMouseDown={stopEvent}
      onClick={stopEvent}
      onChange={(event) => updateBlockValue(block.id, param.name, event.target.value)}
    />
  );
};

const renderInlineLabel = (
  block: Block,
  updateBlockValue: (id: number, param: string, value: string | number) => void,
) => {
  const paramsByName = new Map(block.params.map((param) => [param.name, param]));
  const parts = block.label.split(TOKEN_REGEX);

  return parts.map((part, index) => {
    const isToken = part.startsWith('<') && part.endsWith('>');

    if (!isToken) {
      return (
        <span key={`text-${block.id}-${index}`} className="whitespace-pre-wrap">
          {part}
        </span>
      );
    }

    const paramName = part.slice(1, -1);
    const param = paramsByName.get(paramName);

    if (!param) {
      return (
        <span key={`missing-${block.id}-${index}`} className="opacity-80">
          {part}
        </span>
      );
    }

    return (
      <span key={`input-${block.id}-${param.name}-${index}`} className="inline-flex items-center mx-1">
        {renderParamControl(block, param, updateBlockValue)}
      </span>
    );
  });
};

export default function Canvas() {
  const blocks = useAppStore((state) => state.blocks);
  const removeBlock = useAppStore((state) => state.removeBlock);
  const updateBlockValue = useAppStore((state) => state.updateBlockValue);
  const reorderBlocks = useAppStore((state) => state.reorderBlocks);
  const clearBlocks = useAppStore((state) => state.clearBlocks);

  const [selectedIds, setSelectedIds] = React.useState<Set<number>>(new Set());

  React.useEffect(() => {
    const existingIds = new Set(blocks.map((block) => block.id));
    setSelectedIds((prev) => {
      const filtered = new Set<number>();
      prev.forEach((id) => {
        if (existingIds.has(id)) {
          filtered.add(id);
        }
      });
      return filtered;
    });
  }, [blocks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;

    reorderBlocks(source.index, destination.index);
  };

  const handleBlockClick = (id: number, shiftKey: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (shiftKey) {
        next.add(id);
        return next;
      }

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => removeBlock(id));
    setSelectedIds(new Set());
  };

  const handleDeleteBlock = (blockId: number) => {
    if (selectedIds.has(blockId)) {
      handleDeleteSelected();
      return;
    }

    removeBlock(blockId);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(blockId);
      return next;
    });
  };

  return (
    <div
      className="relative h-full w-full rounded-xl overflow-hidden"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {selectedIds.size >= 2 && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-white/90 border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm">
          <span className="text-xs text-slate-700 font-medium">{selectedIds.size} blocks selected</span>
          <button
            type="button"
            onClick={handleDeleteSelected}
            className="text-xs font-medium text-red-600 hover:text-red-700"
          >
            Delete selected
          </button>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="canvas">
          {(droppableProvided) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              className="h-full overflow-y-auto p-4 pb-16"
            >
              {blocks.length === 0 ? (
                <div className="h-full min-h-[260px] flex flex-col items-center justify-center text-center pointer-events-none">
                  <div className="text-5xl">🧩</div>
                  <p className="mt-4 text-gray-400 font-medium">Drag blocks to get started</p>
                  <p className="mt-1 text-gray-300 text-sm">Click any block in the palette to add it here</p>
                </div>
              ) : (
                <div className="flex flex-col max-w-lg">
                  {blocks.map((block, index) => {
                    const isSelected = selectedIds.has(block.id);
                    const colourClass = BLOCK_COLOURS[block.type] ?? 'bg-slate-500';

                    return (
                      <React.Fragment key={block.id}>
                        <Draggable draggableId={String(block.id)} index={index}>
                          {(draggableProvided) => (
                            <div
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.draggableProps}
                              onClick={(event) => handleBlockClick(block.id, event.shiftKey)}
                              className={`rounded-xl py-2.5 px-3 text-white ${colourClass} ${
                                isSelected
                                  ? 'ring-2 ring-white ring-offset-1 ring-offset-transparent outline'
                                  : ''
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  {...draggableProvided.dragHandleProps}
                                  className="text-white/50 cursor-grab active:cursor-grabbing text-lg leading-none"
                                  onMouseDown={stopEvent}
                                  onClick={stopEvent}
                                >
                                  ⠿
                                </span>

                                <span className="text-base leading-none">{block.icon}</span>

                                <div className="flex-1 text-sm font-medium leading-relaxed flex flex-wrap items-center">
                                  {renderInlineLabel(block, updateBlockValue)}
                                </div>

                                <button
                                  type="button"
                                  onMouseDown={stopEvent}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleDeleteBlock(block.id);
                                  }}
                                  className="w-5 h-5 rounded-full bg-black/20 hover:bg-red-500 flex items-center justify-center text-xs cursor-pointer"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>

                        {index < blocks.length - 1 && (
                          <div className="h-2 flex items-center justify-center">
                            <div className="w-0.5 h-2 bg-gray-300" />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              )}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {blocks.length > 0 && (
        <div className="absolute bottom-3 right-3">
          <button
            type="button"
            onClick={() => {
              clearBlocks();
              setSelectedIds(new Set());
            }}
            className="bg-white text-red-500 border border-red-200 rounded-lg px-3 py-1.5 text-sm shadow-sm hover:bg-red-50"
          >
            🗑️ Clear All
          </button>
        </div>
      )}
    </div>
  );
}
