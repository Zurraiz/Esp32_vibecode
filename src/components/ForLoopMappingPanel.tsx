'use client';

import React from 'react';

export default function ForLoopMappingPanel() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden">
      <div className="h-10 bg-[#2E4862] text-white px-4 flex items-center
        flex-shrink-0">
        <div className="text-xs font-medium">Arduino Code</div>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#0d1117] p-4 font-mono
        text-xs leading-relaxed text-[#c9d1d9]">
        <pre className="whitespace-pre-wrap break-words">
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// setup() — configure LED pin once'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'setup'}</span>
          {'() {\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'pinMode'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'2'}</span>
          {', OUTPUT);\n'}
          {'}\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// loop() — for loop blinks LED 5 times then stops'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>
          {'() {\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'for'}</span>
          {'('}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' i='}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {'; i<'}
          <span style={{ color: '#f0883e' }}>{'5'}</span>
          {'; i++) {\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'2'}</span>
          {', HIGH);\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'delay'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'500'}</span>
          {');\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'2'}</span>
          {', LOW);\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'delay'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'500'}</span>
          {');\n'}
          {'  }\n'}
          {'}'}
        </pre>
      </div>
      <div className="border-t border-gray-200 bg-white px-4 py-3
        max-h-[180px] overflow-y-auto flex-shrink-0">
        <div className="text-xs font-semibold text-gray-400 uppercase
          tracking-wide mb-2">📖 What this code does</div>
        <div className="flex flex-col gap-1.5">
          {[
            { n: 1, text: 'pinMode(2, OUTPUT) — configures LED pin once in setup.' },
            { n: 2, text: 'for(int i=0; i<5; i++) — loop starts at 0, runs while i < 5, increments i each time.' },
            { n: 3, text: 'digitalWrite(2, HIGH) — turns LED ON at start of each iteration.' },
            { n: 4, text: 'delay(500) — waits 500ms so the ON state is visible.' },
            { n: 5, text: 'digitalWrite(2, LOW) — turns LED OFF.' },
            { n: 6, text: 'After 5 iterations i reaches 5, condition becomes false, loop ends.' },
          ].map(({ n, text }) => (
            <div key={n} className="flex gap-2 items-start">
              <span className="bg-[#2E4862] text-white text-[10px] w-4 h-4
                rounded-full flex items-center justify-center flex-shrink-0
                mt-[1px]">
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
