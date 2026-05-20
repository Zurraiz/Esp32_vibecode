'use client';

import React from 'react';

export default function UltrasonicMappingPanel() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden">
      <div className="h-10 bg-[#2E4862] text-white px-4 flex items-center flex-shrink-0">
        <span className="text-xs font-medium">Arduino Code — Ultrasonic Distance</span>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-[#c9d1d9]">
        <pre className="whitespace-pre-wrap break-words">
          <span style={{ color: '#ff7b72' }}>{'#define'}</span>{' TRIG_PIN '}
          <span style={{ color: '#f0883e' }}>{'5'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'#define'}</span>{' ECHO_PIN '}
          <span style={{ color: '#f0883e' }}>{'18'}</span>{'\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// setup() — configure pins once'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>{' '}
          <span style={{ color: '#79c0ff' }}>{'setup'}</span>{'() {\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial.begin'}</span>{'('}
          <span style={{ color: '#f0883e' }}>{'9600'}</span>{');\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'pinMode'}</span>{'(TRIG_PIN, OUTPUT);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'pinMode'}</span>{'(ECHO_PIN, INPUT);\n'}
          {'}\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// loop() — measure distance continuously'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>{' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>{'() {\n'}
          {'  '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Send ultrasonic pulse'}</span>{'\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>{'(TRIG_PIN, LOW);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'delayMicroseconds'}</span>{'('}
          <span style={{ color: '#f0883e' }}>{'2'}</span>{');\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>{'(TRIG_PIN, HIGH);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'delayMicroseconds'}</span>{'('}
          <span style={{ color: '#f0883e' }}>{'10'}</span>{');\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>{'(TRIG_PIN, LOW);\n\n'}
          {'  '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Measure echo return time'}</span>{'\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'long'}</span>{' duration = '}
          <span style={{ color: '#79c0ff' }}>{'pulseIn'}</span>{'(ECHO_PIN, HIGH);\n\n'}
          {'  '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Convert time to distance in cm'}</span>{'\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'float'}</span>{' distance = duration * '}
          <span style={{ color: '#f0883e' }}>{'0.034'}</span>{' / '}
          <span style={{ color: '#f0883e' }}>{'2'}</span>{';\n\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial.println'}</span>{'(distance);\n'}
          {'}'}
        </pre>
      </div>
    </div>
  );
}