'use client';

import React from 'react';

export default function PWMMappingPanel() {
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
            {'// Variable to hold sensor reading'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' sensorVal = '}
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
            {'// loop() — read sensor, write PWM'}
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
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'analogWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'2'}</span>
          {', sensorVal); '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// values above 255 cap at full brightness'}
          </span>{'\n'}
          {'}'}
        </pre>
      </div>
      <div className="border-t border-gray-200 bg-white px-4 py-3
        max-h-[180px] overflow-y-auto flex-shrink-0">
        <div className="text-xs font-semibold text-gray-400 uppercase
          tracking-wide mb-2">📖 What this code does</div>
        <div className="flex flex-col gap-1.5">
          {[
            { n: 1, text: 'sensorVal = 0 — variable to store the analog reading.' },
            { n: 2, text: 'pinMode(2, OUTPUT) — configures the LED pin for output in setup.' },
            { n: 3, text: 'analogRead(34) — reads the sensor value (0–4095) every loop cycle.' },
            { n: 4, text: 'analogWrite(2, sensorVal) — sets LED brightness based on sensor value.' },
            { n: 5, text: 'Values above 255 cap at full brightness — mapping fixes this in Lesson 3-3.' },
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
