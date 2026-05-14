'use client';

import React from 'react';

export default function CombinedLogicMappingPanel() {
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
            {'// Variable to hold button state'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' btnState = '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {';\n\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'setup'}</span>
          {'() {\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'pinMode'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'12'}</span>
          {', INPUT);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'pinMode'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'48'}</span>
          {', OUTPUT);\n'}
          {'}\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// loop() runs forever — loop + condition combined'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>
          {'() {\n'}
          {'  btnState = '}
          <span style={{ color: '#79c0ff' }}>{'digitalRead'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'12'}</span>
          {');\n\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'if'}</span>
          {' (btnState == '}
          <span style={{ color: '#79c0ff' }}>{'HIGH'}</span>
          {') {\n'}
          {'    '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// button pressed → LED blinks'}
          </span>{'\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'48'}</span>
          {', HIGH);\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'delay'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'300'}</span>
          {');\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'48'}</span>
          {', LOW);\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'delay'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'300'}</span>
          {');\n'}
          {'  } '}
          <span style={{ color: '#ff7b72' }}>{'else'}</span>
          {' {\n'}
          {'    '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// button not pressed → LED off'}
          </span>{'\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'48'}</span>
          {', LOW);\n'}
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
            { n: 1, text: 'btnState = 0 — variable to hold the button reading.' },
            { n: 2, text: 'pinMode — button as INPUT, LED as OUTPUT.' },
            { n: 3, text: 'loop() runs forever — this IS the infinite loop.' },
            { n: 4, text: 'digitalRead(12) — reads button state on every iteration.' },
            { n: 5, text: 'if (btnState == HIGH) — condition checked inside the loop.' },
            { n: 6, text: 'TRUE branch — LED blinks ON/OFF with delays.' },
            { n: 7, text: 'FALSE (else) branch — LED stays OFF.' },
            { n: 8, text: 'Loop restarts immediately — system is always responsive.' },
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
