'use client';

import React from 'react';

export default function StaticCodePanel() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden">
      <div className="h-10 bg-[#2E4862] text-white px-4 flex items-center flex-shrink-0">
        <div className="text-xs font-medium">Arduino Code</div>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-[#c9d1d9]">
        <pre className="whitespace-pre-wrap break-words">
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// void setup() runs once when the ESP32 powers on'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>void</span>{' '}
          <span style={{ color: '#79c0ff' }}>setup</span>{'() {\n'}
          {'  '}<span style={{ color: '#79c0ff' }}>pinMode</span>{'('}
          <span style={{ color: '#f0883e' }}>2</span>
          {', OUTPUT);   '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Set pin 2 as an output'}</span>{'\n'}
          {'}\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// void loop() runs forever — it never stops'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>void</span>{' '}
          <span style={{ color: '#79c0ff' }}>loop</span>{'() {\n'}
          {'  '}<span style={{ color: '#79c0ff' }}>digitalWrite</span>{'('}
          <span style={{ color: '#f0883e' }}>2</span>
          {', HIGH);  '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Turn LED ON'}</span>{'\n'}
          {'  '}<span style={{ color: '#79c0ff' }}>delay</span>{'('}
          <span style={{ color: '#f0883e' }}>1000</span>
          {');             '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Wait 1 second'}</span>{'\n'}
          {'  '}<span style={{ color: '#79c0ff' }}>digitalWrite</span>{'('}
          <span style={{ color: '#f0883e' }}>2</span>
          {', LOW);   '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Turn LED OFF'}</span>{'\n'}
          {'  '}<span style={{ color: '#79c0ff' }}>delay</span>{'('}
          <span style={{ color: '#f0883e' }}>1000</span>
          {');             '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Wait 1 second'}</span>{'\n'}
          {'  '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// ↩ jumps back to top of loop() automatically'}</span>{'\n'}
          {'}'}
        </pre>
      </div>
      <div className="border-t border-gray-200 bg-white px-4 py-3 max-h-[180px] overflow-y-auto flex-shrink-0">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
          📖 What this code does
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { n: 1, text: 'pinMode sets pin 2 as an output — runs once.' },
            { n: 2, text: 'digitalWrite HIGH turns the LED ON.' },
            { n: 3, text: 'delay(1000) pauses execution for 1 second.' },
            { n: 4, text: 'digitalWrite LOW turns the LED OFF.' },
            { n: 5, text: 'delay(1000) pauses again — then loop() repeats.' },
          ].map(({ n, text }) => (
            <div key={n} className="flex gap-2 items-start">
              <span className="bg-[#2E4862] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-[1px]">
                {n}
              </span>
              <p className="text-xs text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
