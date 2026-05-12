'use client';

import React from 'react';

import { PROJECT_TEMPLATES, type ProjectTemplate } from '@/lib/projectTemplates';
import { useAppStore } from '@/store/useAppStore';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplatesModal({ isOpen, onClose }: TemplatesModalProps) {
  const blocks = useAppStore((state) => state.blocks);
  const addBlock = useAppStore((state) => state.addBlock);
  const clearBlocks = useAppStore((state) => state.clearBlocks);

  const [loadedTemplateId, setLoadedTemplateId] = React.useState<string | null>(null);

  const handleLoad = (template: ProjectTemplate) => {
    if (blocks.length > 0) {
      const shouldReplace = window.confirm('Replace current blocks?');
      if (!shouldReplace) {
        return;
      }
    }

    clearBlocks();
    template.blocks.forEach((block) => {
      addBlock(block);
    });

    setLoadedTemplateId(template.id);
    window.setTimeout(() => setLoadedTemplateId(null), 1200);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl mx-4 rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#2E4862]">🚀 Starter Templates</h2>
            <p className="mt-0.5 text-xs text-gray-400">Load a pre-built project to get started quickly</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close templates"
          >
            ✕
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {PROJECT_TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => handleLoad(template)}
              className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-left cursor-pointer transition-all hover:border-[#2E4862]/30 hover:bg-[#2E4862]/5"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-2xl">{template.icon}</span>
                <div className="flex flex-wrap justify-end gap-1">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[10px] text-gray-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="mt-2 text-sm font-bold text-[#2E4862]">{template.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{template.description}</p>

              <div className="mt-2 flex flex-wrap gap-1">
                {template.components.map((c) => (
                  <span
                    key={c}
                    className="bg-blue-50 text-blue-600 border border-blue-100 rounded-full px-2 py-0.5 text-[10px]"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-gray-400">{template.blocks.length} blocks</p>
                {loadedTemplateId === template.id && (
                  <span className="text-[10px] font-semibold text-green-600">Loaded ✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
