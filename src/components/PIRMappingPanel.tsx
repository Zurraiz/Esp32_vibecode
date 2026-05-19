'use client';

import React from 'react';

export default function PIRMappingPanel() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden">
      <div className="h-10 bg-[#2E4862] text-white px-4 flex items-center flex-shrink-0">
        <span className="text-xs font-medium">Arduino Code — PIR Motion Detection</span>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-[#c9d1d9]">
        <pre className="whitespace-pre-wrap break-words">
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Pin definitions'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>{' pirPin = '}
          <span style={{ color: '#f0883e' }}>{'4'}</span>{';\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>{' ledPin = '}
          <span style={{ color: '#f0883e' }}>{'2'}</span>{';\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// setup() — runs once'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>{' '}
          <span style={{ color: '#79c0ff' }}>{'setup'}</span>{'() {\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'pinMode'}</span>{'(pirPin, INPUT);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'pinMode'}</span>{'(ledPin, OUTPUT);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial.begin'}</span>{'('}
          <span style={{ color: '#f0883e' }}>{'9600'}</span>{');\n'}
          {'}\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// loop() — reacts to motion events'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>{' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>{'() {\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>{' motion = '}
          <span style={{ color: '#79c0ff' }}>{'digitalRead'}</span>{'(pirPin);\n\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'if'}</span>{' (motion == HIGH) {\n'}
          {'    '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Motion detected'}</span>{'\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>{'(ledPin, HIGH);\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'Serial.println'}</span>{'('}
          <span style={{ color: '#a5d6ff' }}>{'\"Motion Detected\"'}</span>{');\n'}
          {'  } '}
          <span style={{ color: '#ff7b72' }}>{'else'}</span>{' {\n'}
          {'    '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// No motion'}</span>{'\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>{'(ledPin, LOW);\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'Serial.println'}</span>{'('}
          <span style={{ color: '#a5d6ff' }}>{'\"No Motion\"'}</span>{');\n'}
          {'  }\n'}
          {'}'}
        </pre>
      </div>
    </div>
  );
}
