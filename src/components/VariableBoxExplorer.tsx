'use client';

import React, { useState } from 'react';
import { Plus, RotateCcw } from 'lucide-react';

type VarType = 'int' | 'float' | 'string';

interface VariableBox {
  name: string;
  type: VarType;
  value: string | number;
  history: (string | number)[];
}

const TYPE_COLOURS: Record<VarType, string> = {
  int: 'bg-sky-500',
  float: 'bg-purple-500',
  string: 'bg-emerald-500',
};

const TYPE_LABELS: Record<VarType, string> = {
  int: 'Integer (whole number)',
  float: 'Decimal number',
  string: 'Text',
};

const INSIGHTS = [
  'A variable is like a labelled box — it holds one value at a time.',
  'When you update a variable, the old value is replaced by the new one.',
  'Each variable has a type — int for whole numbers, float for decimals, string for text.',
  'The program can read or change the variable\'s value at any point during execution.',
];

export default function VariableBoxExplorer() {
  const [boxes, setBoxes] = useState<VariableBox[]>([]);
  const [name, setName] = useState('counter');
  const [type, setType] = useState<VarType>('int');
  const [initVal, setInitVal] = useState('0');
  const [step, setStep] = useState('1');
  const [error, setError] = useState('');
  const [activeInsight, setActiveInsight] = useState(0);

  const handleCreate = () => {
    if (!name.trim()) { setError('Variable needs a name.'); return; }
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name.trim())) {
      setError('Name must start with a letter and contain only letters, numbers, or underscores.');
      return;
    }
    if (boxes.find(b => b.name === name.trim())) {
      setError(`Variable "${name}" already exists.`);
      return;
    }
    setError('');
    const val = type === 'string' ? initVal : type === 'int' ? Math.trunc(Number(initVal)) : Number(initVal);
    setBoxes(prev => [...prev, { name: name.trim(), type, value: val, history: [val] }]);
    setActiveInsight(0);
  };

  const handleUpdate = (boxName: string) => {
    setBoxes(prev => prev.map(b => {
      if (b.name !== boxName) return b;
      let newVal: string | number;
      if (b.type === 'string') {
        newVal = String(b.value) + step;
      } else if (b.type === 'int') {
        newVal = Math.trunc(Number(b.value) + Number(step));
      } else {
        newVal = Number((Number(b.value) + Number(step)).toFixed(2));
      }
      setActiveInsight(1);
      return { ...b, value: newVal, history: [...b.history.slice(-4), newVal] };
    }));
  };

  const handleReset = (boxName: string) => {
    setBoxes(prev => prev.map(b => {
      if (b.name !== boxName) return b;
      const original = b.history[0];
      return { ...b, value: original, history: [original] };
    }));
  };

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          📦 Variable Memory Explorer
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          A variable is a <span className="font-semibold text-[#2E4862]">
          named container</span> that stores a value your program can use
          and update. Create variables below and watch how the ESP32
          stores and changes them in memory.
        </p>
      </div>

      {/* Creator */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase
          tracking-widest mb-3">
          Create a Variable
        </p>
        <div className="flex gap-3 flex-wrap items-end">
          <div>
            <label className="text-[10px] text-gray-400 font-medium
              uppercase tracking-wider block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="counter"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm
                text-gray-700 focus:outline-none focus:border-[#2E4862] w-32"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 font-medium
              uppercase tracking-wider block mb-1">Type</label>
            <select
              value={type}
              onChange={e => setType(e.target.value as VarType)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm
                text-gray-700 focus:outline-none focus:border-[#2E4862]"
            >
              <option value="int">int (whole number)</option>
              <option value="float">float (decimal)</option>
              <option value="string">string (text)</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-gray-400 font-medium
              uppercase tracking-wider block mb-1">Starting Value</label>
            <input
              type="text"
              value={initVal}
              onChange={e => setInitVal(e.target.value)}
              placeholder="0"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm
                text-gray-700 focus:outline-none focus:border-[#2E4862] w-24"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 font-medium
              uppercase tracking-wider block mb-1">
              {type === 'string' ? 'Append text' : 'Add step'}
            </label>
            <input
              type="text"
              value={step}
              onChange={e => setStep(e.target.value)}
              placeholder="1"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm
                text-gray-700 focus:outline-none focus:border-[#2E4862] w-20"
            />
          </div>
          <button
            type="button"
            onClick={handleCreate}
            className="bg-[#2E4862] hover:bg-[#3a5a7a] text-white px-4
              py-2 rounded-lg text-sm font-semibold flex items-center
              gap-1.5 transition-colors"
          >
            <Plus size={14} /> Store
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-2">{error}</p>
        )}
      </div>

      {/* Variable boxes */}
      {boxes.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {boxes.map(box => (
            <div key={box.name} className="flex-1 min-w-[200px] rounded-xl
              bg-white border border-gray-200 shadow-sm overflow-hidden">
              {/* Box header */}
              <div className={`${TYPE_COLOURS[box.type]} px-4 py-2.5
                flex items-center justify-between`}>
                <div>
                  <p className="text-white text-xs font-bold font-mono">
                    {box.name}
                  </p>
                  <p className="text-white/70 text-[10px]">
                    {TYPE_LABELS[box.type]}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleReset(box.name)}
                  className="text-white/70 hover:text-white transition-colors"
                  title="Reset to initial value"
                >
                  <RotateCcw size={13} />
                </button>
              </div>

              {/* Current value */}
              <div className="px-4 py-4 flex flex-col items-center gap-1">
                <p className="text-[10px] text-gray-400 uppercase
                  tracking-wider">Current Value</p>
                <div className="text-3xl font-bold font-mono text-[#2E4862]
                  transition-all duration-200">
                  {String(box.value)}
                </div>
              </div>

              {/* History */}
              {box.history.length > 1 && (
                <div className="px-4 pb-3">
                  <p className="text-[10px] text-gray-400 uppercase
                    tracking-wider mb-1.5">Value History</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {box.history.map((h, i) => (
                      <React.Fragment key={i}>
                        <span className={`text-xs font-mono px-2 py-0.5
                          rounded-md border ${
                          i === box.history.length - 1
                            ? 'bg-[#2E4862] text-white border-[#2E4862]'
                            : 'bg-gray-50 text-gray-400 border-gray-200'
                        }`}>
                          {String(h)}
                        </span>
                        {i < box.history.length - 1 && (
                          <span className="text-gray-300 text-xs">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* Update button */}
              <div className="px-4 pb-4">
                <button
                  type="button"
                  onClick={() => handleUpdate(box.name)}
                  className={`w-full py-2 rounded-lg text-xs font-semibold
                    text-white transition-colors ${TYPE_COLOURS[box.type]}
                    hover:opacity-90`}
                >
                  {box.type === 'string'
                    ? `Append "${step}"`
                    : `Add ${step} to ${box.name}`
                  }
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {boxes.length === 0 && (
        <div className="rounded-xl bg-gray-50 border border-gray-200
          px-6 py-10 flex flex-col items-center gap-2 text-center">
          <span className="text-3xl">📦</span>
          <p className="text-xs font-semibold text-gray-500">
            No variables created yet
          </p>
          <p className="text-xs text-gray-400">
            Fill in the form above and click Store to create your
            first variable.
          </p>
        </div>
      )}

      {/* Progressive insights */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-xs font-semibold text-gray-400 uppercase
          tracking-widest mb-3">Key Concepts</p>
        <div className="flex flex-col gap-2">
          {INSIGHTS.map((insight, i) => (
            <div key={i} className={`flex gap-3 items-start rounded-lg
              px-3 py-2.5 transition-all duration-300 ${
              i <= activeInsight
                ? 'bg-[#2E4862]/5 border border-[#2E4862]/20'
                : 'bg-gray-50 border border-transparent opacity-40'
            }`}>
              <span className={`text-xs font-bold w-4 h-4 rounded-full
                flex items-center justify-center flex-shrink-0 mt-0.5
                transition-colors duration-300 ${
                i <= activeInsight
                  ? 'bg-[#2E4862] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {i + 1}
              </span>
              <p className="text-xs text-gray-600 leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
