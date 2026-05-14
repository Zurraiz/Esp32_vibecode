'use client';

import React from 'react';

export default function DualModeMappingPanel() {
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
            {'// Sensor variables'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' potVal = '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {';\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' ldrVal = '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {';\n'}
          <span style={{ color: '#ff7b72' }}>{'bool'}</span>
          {' manualMode = '}
          <span style={{ color: '#79c0ff' }}>{'true'}</span>
          {';\n\n'}
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
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>
          {'() {\n'}
          {'  potVal = '}
          <span style={{ color: '#79c0ff' }}>{'analogRead'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'34'}</span>
          {');\n'}
          {'  ldrVal = '}
          <span style={{ color: '#79c0ff' }}>{'analogRead'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'35'}</span>
          {');\n\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' manual = '}
          <span style={{ color: '#79c0ff' }}>{'map'}</span>
          {'(potVal, '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {', '}
          <span style={{ color: '#f0883e' }}>{'4095'}</span>
          {', '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {', '}
          <span style={{ color: '#f0883e' }}>{'255'}</span>
          {');\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' autoBright = '}
          <span style={{ color: '#79c0ff' }}>{'map'}</span>
          {'(ldrVal, '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {', '}
          <span style={{ color: '#f0883e' }}>{'4095'}</span>
          {', '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {', '}
          <span style={{ color: '#f0883e' }}>{'255'}</span>
          {');\n\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'if'}</span>
          {' (manualMode) {\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'analogWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'2'}</span>
          {', manual);\n'}
          {'  } '}
          <span style={{ color: '#ff7b72' }}>{'else'}</span>
          {' {\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'analogWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'2'}</span>
          {', autoBright);\n'}
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
            { n: 1, text: 'potVal and ldrVal — read both sensors every loop cycle.' },
            { n: 2, text: 'manualMode — boolean flag that controls which input drives the LED.' },
            { n: 3, text: 'map() on both — both values translated to 0–255 range.' },
            { n: 4, text: 'if (manualMode) — when true, potentiometer controls LED.' },
            { n: 5, text: 'else — when false, photoresistor controls LED automatically.' },
            { n: 6, text: 'Same hardware, different behavior — logic determines the system mode.' },
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
