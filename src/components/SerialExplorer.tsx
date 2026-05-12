'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Square, Terminal, Code2, Blocks } from 'lucide-react';

export default function SerialExplorer() {
  const [message, setMessage] = useState('Hello ESP32!');
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [activePanel, setActivePanel] = useState<'block' | 'code' | 'monitor' | null>(null);
  const [lineCount, setLineCount] = useState(0);
  const isRunningRef = useRef(false);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    return () => { isRunningRef.current = false; };
  }, []);

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const handleRun = async () => {
    if (isRunning) {
      isRunningRef.current = false;
      setIsRunning(false);
      setActivePanel(null);
      return;
    }

    const msg = message.trim() || 'Hello ESP32!';
    setIsRunning(true);
    isRunningRef.current = true;
    setLogs([]);
    setLineCount(0);
    let count = 0;

    while (isRunningRef.current) {
      // Block highlights
      setActivePanel('block');
      await sleep(300);
      if (!isRunningRef.current) break;

      // Code highlights
      setActivePanel('code');
      await sleep(300);
      if (!isRunningRef.current) break;

      // Message appears in monitor
      setActivePanel('monitor');
      count++;
      setLineCount(count);
      setLogs(prev => [...prev.slice(-19), msg]);
      await sleep(delay);
      if (!isRunningRef.current) break;
    }

    setActivePanel(null);
  };

  return (
    <div className="w-full flex flex-col gap-5">

      {/* Header */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-[#2E4862] mb-1">
          📡 Serial Pipeline — See How Data Flows
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Type your own message, set a delay, then press
          <span className="font-semibold text-[#2E4862]"> Run</span>.
          Watch how your message travels from the block through
          the code and into the Serial Monitor.
        </p>
      </div>

      {/* Controls */}
      <div className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm
        flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-xs font-semibold text-gray-500 uppercase
              tracking-wider block mb-1.5">
              Your Message
            </label>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              disabled={isRunning}
              maxLength={40}
              placeholder="Hello ESP32!"
              className="w-full border border-gray-200 rounded-lg px-3 py-2
                text-sm text-gray-700 focus:outline-none focus:border-[#2E4862]
                disabled:bg-gray-50 disabled:text-gray-400 transition-colors"
            />
          </div>
          <div className="w-48">
            <label className="text-xs font-semibold text-gray-500 uppercase
              tracking-wider block mb-1.5">
              Delay: <span className="text-[#2E4862]">{delay}ms</span>
            </label>
            <input
              type="range"
              min={300}
              max={3000}
              step={100}
              value={delay}
              onChange={e => setDelay(Number(e.target.value))}
              disabled={isRunning}
              className="w-full accent-[#2E4862] cursor-pointer disabled:opacity-50"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>300ms</span>
              <span>3000ms</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRun}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold flex
            items-center justify-center gap-2 transition-colors text-white ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-[#2E4862] hover:bg-[#3a5a7a]'
          }`}
        >
          {isRunning
            ? <><Square size={14} fill="currentColor" /> Stop</>
            : <><Play size={14} fill="currentColor" /> Run</>
          }
        </button>
      </div>

      {/* Pipeline — 3 panels */}
      <div className="grid grid-cols-3 gap-3">

        {/* Blocks */}
        <div className={`rounded-xl border-2 p-4 transition-all duration-300 ${
          activePanel === 'block'
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-200 bg-white'
        }`}>
          <p className="text-xs font-bold text-[#2E4862] flex items-center gap-1.5 mb-3">
            <Blocks size={13} /> Your Blocks
          </p>
          <div className="flex flex-col gap-1.5">
            <div className={`rounded-lg px-2.5 py-2 text-xs font-semibold
              border transition-all duration-200 ${
              activePanel === 'block'
                ? 'bg-blue-500 text-white border-blue-400 scale-[1.02]'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              🔌 Start Serial
            </div>
            <div className={`rounded-lg px-2.5 py-2 text-xs font-semibold
              border transition-all duration-200 ${
              activePanel === 'block'
                ? 'bg-blue-500 text-white border-blue-400 scale-[1.02]'
                : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              💬 Print &quot;{message.trim() || 'Hello ESP32!'}&quot;
            </div>
            <div className={`rounded-lg px-2.5 py-2 text-xs font-semibold
              border transition-all duration-200 ${
              activePanel === 'block'
                ? 'bg-yellow-400 text-white border-yellow-300 scale-[1.02]'
                : 'bg-yellow-50 text-yellow-700 border-yellow-200'
            }`}>
              ⏱️ Delay {delay}ms
            </div>
          </div>
          {activePanel === 'block' && (
            <p className="text-[10px] text-blue-600 mt-2 font-medium">
              ▶ Executing...
            </p>
          )}
        </div>

        {/* Code */}
        <div className={`rounded-xl border-2 overflow-hidden transition-all
          duration-300 ${
          activePanel === 'code'
            ? 'border-emerald-400'
            : 'border-gray-200'
        }`}>
          <div className={`px-3 py-2 flex items-center gap-1.5 text-xs
            font-bold transition-colors duration-300 ${
            activePanel === 'code'
              ? 'bg-emerald-500 text-white'
              : 'bg-[#2E4862] text-white'
          }`}>
            <Code2 size={12} /> Arduino Code
          </div>
          <div className="bg-[#0d1117] p-3 font-mono text-[10px] leading-relaxed
            text-[#c9d1d9] h-[calc(100%-32px)]">
            <span style={{ color: '#ff7b72' }}>void</span>{' '}
            <span style={{ color: '#79c0ff' }}>setup</span>{'() {\n'}
            {'  '}<span style={{ color: '#79c0ff' }}>Serial</span>
            {'.begin(115200);\n'}{'\n'}
            {'}\n\n'}
            <span style={{ color: '#ff7b72' }}>void</span>{' '}
            <span style={{ color: '#79c0ff' }}>loop</span>{'() {\n'}
            {'  '}
            <span className={`transition-all duration-200 ${
              activePanel === 'code'
                ? 'bg-emerald-500/30 rounded px-0.5'
                : ''
            }`}>
              <span style={{ color: '#79c0ff' }}>Serial</span>
              {`.print("`}
              <span style={{ color: '#a5d6ff' }}>
                {message.trim() || 'Hello ESP32!'}
              </span>
              {'");\n'}
            </span>
            {'  '}
            <span style={{ color: '#79c0ff' }}>delay</span>
            {'('}<span style={{ color: '#f0883e' }}>{delay}</span>{');\n'}
            {'}'}
          </div>
        </div>

        {/* Serial Monitor */}
        <div className={`rounded-xl border-2 overflow-hidden transition-all
          duration-300 ${
          activePanel === 'monitor'
            ? 'border-purple-400'
            : 'border-gray-200'
        }`}>
          <div className={`px-3 py-2 flex items-center justify-between
            text-xs font-bold transition-colors duration-300 ${
            activePanel === 'monitor'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-800 text-white'
          }`}>
            <div className="flex items-center gap-1.5">
              <Terminal size={12} /> Serial Monitor
            </div>
            {lineCount > 0 && (
              <span className="text-[10px] opacity-70">{lineCount} lines</span>
            )}
          </div>
          <div className="bg-[#0d1117] p-3 font-mono text-[11px] text-green-400
            overflow-y-auto h-[calc(100%-32px)] flex flex-col gap-0.5">
            {logs.length === 0 ? (
              <span className="text-gray-500 italic text-[10px]">
                Waiting for data...
              </span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className={i === logs.length - 1 && activePanel === 'monitor'
                  ? 'text-green-300 font-semibold'
                  : 'text-green-500 opacity-70'
                }>
                  {'>'} {log}
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </div>

      </div>

      {/* Insight */}
      {lineCount >= 3 && (
        <div className="rounded-xl border border-[#2E4862]/20 bg-[#2E4862]/5
          px-4 py-3 text-xs text-[#2E4862] leading-relaxed font-medium
          animate-in fade-in duration-300">
          💡 Your message repeated {lineCount} times — this is the
          <span className="font-bold"> loop()</span> in action.
          The delay you set controls how fast it prints.
          Try changing the delay and see what happens.
        </div>
      )}

    </div>
  );
}
