'use client';

import React from 'react';

export default function MappingMappingPanel() {
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
            {'// Variables for sensor and mapped values'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' sensorVal = '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {';\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' mappedVal = '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {';\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// setup() — configure PWM pin once'}
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
            {'// loop() — read, map, write'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>
          {'() {\n'}
          {'  sensorVal = '}
          <span style={{ color: '#79c0ff' }}>{'analogRead'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'34'}</span>
          {');\n'}
          {'  mappedVal = '}
          <span style={{ color: '#79c0ff' }}>{'map'}</span>
          {'(sensorVal, '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {', '}
          <span style={{ color: '#f0883e' }}>{'4095'}</span>
          {', '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {', '}
          <span style={{ color: '#f0883e' }}>{'255'}</span>
          {');\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'analogWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'2'}</span>
          {', mappedVal);\n'}
          {'}'}
        </pre>
      </div>
      <div className="border-t border-gray-200 bg-white px-4 py-3
        max-h-[180px] overflow-y-auto flex-shrink-0">
        <div className="text-xs font-semibold text-gray-400 uppercase
          tracking-wide mb-2">📖 What this code does</div>
        <div className="flex flex-col gap-1.5">
          {[
            { n: 1, text: 'sensorVal and mappedVal — two variables: raw input and translated output.' },
            { n: 2, text: 'pinMode(2, OUTPUT) — configures LED pin for output.' },
            { n: 3, text: 'analogRead(34) — reads raw sensor value (0–4095).' },
            { n: 4, text: 'map(sensorVal, 0, 4095, 0, 255) — translates sensor range to PWM range.' },
            { n: 5, text: 'analogWrite(2, mappedVal) — controls LED with the correctly scaled value.' },
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
