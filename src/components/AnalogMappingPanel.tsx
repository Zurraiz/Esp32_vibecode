'use client';

import React from 'react';

export default function AnalogMappingPanel() {
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
            {'// Global variables for sensor readings'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' lightValue = '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {';\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' potValue = '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {';\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// setup() — start Serial once'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'setup'}</span>
          {'() {\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial'}</span>
          {'.begin('}
          <span style={{ color: '#f0883e' }}>{'115200'}</span>
          {');\n'}
          {'}\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// loop() — read both sensors and print'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>
          {'() {\n'}
          {'  lightValue = '}
          <span style={{ color: '#79c0ff' }}>{'analogRead'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'34'}</span>
          {');\n'}
          {'  potValue = '}
          <span style={{ color: '#79c0ff' }}>{'analogRead'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'35'}</span>
          {');\n\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial'}</span>
          {'.print("Light: ");\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial'}</span>
          {'.print(lightValue);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial'}</span>
          {'.print(" | Potentiometer: ");\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial'}</span>
          {'.println(potValue);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'delay'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'500'}</span>
          {');\n'}
          {'}'}
        </pre>
      </div>
      <div className="border-t border-gray-200 bg-white px-4 py-3
        max-h-[180px] overflow-y-auto flex-shrink-0">
        <div className="text-xs font-semibold text-gray-400 uppercase
          tracking-wide mb-2">
          📖 What this code does
        </div>
        <div className="flex flex-col gap-1.5">
          {[
            { n: 1, text: 'lightValue and potValue — variables to hold each sensor reading.' },
            { n: 2, text: 'Serial.begin(115200) — starts Serial communication in setup.' },
            { n: 3, text: 'analogRead(34) — reads the photoresistor on pin 34 (0–4095).' },
            { n: 4, text: 'analogRead(35) — reads the potentiometer on pin 35 (0–4095).' },
            { n: 5, text: 'Serial.print() — sends labels and values to Serial Monitor.' },
            { n: 6, text: 'delay(500) — waits 500ms before reading again.' },
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
