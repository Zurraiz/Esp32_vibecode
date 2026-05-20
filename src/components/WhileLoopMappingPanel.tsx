'use client';

import React from 'react';

export default function WhileLoopMappingPanel() {
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
            {'// Counter variable — initialised before the loop'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' counter = '}
          <span style={{ color: '#f0883e' }}>{'5'}</span>
          {';\n\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'setup'}</span>
          {'() {\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'pinMode'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'48'}</span>
          {', OUTPUT);\n'}
          {'}\n\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>
          {'() {\n'}
          {'  '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// while loop runs as long as counter > 0'}
          </span>{'\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'while'}</span>
          {' (counter > '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {') {\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'48'}</span>
          {', HIGH);\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'delay'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'500'}</span>
          {');\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'48'}</span>
          {', LOW);\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'delay'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'500'}</span>
          {');\n'}
          {'    counter = counter + ('}
          <span style={{ color: '#f0883e' }}>{'−1'}</span>
          {'); '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// decrement'}
          </span>{'\n'}
          {'  }\n'}
          {'}'}
        </pre>
      </div>
      <div className="border-t border-gray-200 bg-white px-4 py-3
        max-h-[200px] overflow-y-auto flex-shrink-0">
        <div className="text-xs font-semibold text-gray-400 uppercase
          tracking-wide mb-2">📖 What this code does</div>
        <div className="flex flex-col gap-1.5">
          {[
            { n: 1, text: 'counter = 5 — variable set to starting value before the loop.' },
            { n: 2, text: 'pinMode(48, OUTPUT) — LED pin configured once in setup.' },
            { n: 3, text: 'while (counter > 0) — condition checked before every iteration.' },
            { n: 4, text: 'digitalWrite HIGH + delay — LED blinks ON for 500ms.' },
            { n: 5, text: 'digitalWrite LOW + delay — LED blinks OFF for 500ms.' },
            { n: 6, text: 'counter = counter + (-1) — decrements counter by 1 each iteration.' },
            { n: 7, text: 'When counter reaches 0, condition becomes FALSE and loop stops.' },
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
