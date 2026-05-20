'use client';

import React from 'react';

export default function BuzzerMappingPanel() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden">
      <div className="h-10 bg-[#2E4862] text-white px-4 flex items-center flex-shrink-0">
        <span className="text-xs font-medium">Arduino Code — Buzzer Control</span>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-[#c9d1d9]">
        <pre className="whitespace-pre-wrap break-words">
          <span style={{ color: '#ff7b72' }}>{'#define'}</span>{' BUZZER_PIN '}
          <span style={{ color: '#f0883e' }}>{'13'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'#define'}</span>{' PIR_PIN '}
          <span style={{ color: '#f0883e' }}>{'4'}</span>{'\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// setup() — configure pins once'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>{' '}
          <span style={{ color: '#79c0ff' }}>{'setup'}</span>{'() {\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'pinMode'}</span>{'(BUZZER_PIN, OUTPUT);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'pinMode'}</span>{'(PIR_PIN, INPUT);\n'}
          {'}\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// loop() — sensor drives sound output'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>{' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>{'() {\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>{' motion = '}
          <span style={{ color: '#79c0ff' }}>{'digitalRead'}</span>{'(PIR_PIN);\n\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'if'}</span>{' (motion == HIGH) {\n'}
          {'    '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Motion detected — activate buzzer'}</span>{'\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'tone'}</span>{'(BUZZER_PIN, '}
          <span style={{ color: '#f0883e' }}>{'1000'}</span>{');\n'}
          {'  } '}
          <span style={{ color: '#ff7b72' }}>{'else'}</span>{' {\n'}
          {'    '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// No motion — silence'}</span>{'\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'noTone'}</span>{'(BUZZER_PIN);\n'}
          {'  }\n'}
          {'}'}
        </pre>
      </div>
    </div>
  );
}