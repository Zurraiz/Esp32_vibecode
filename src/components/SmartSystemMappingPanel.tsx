'use client';

import React from 'react';

export default function SmartSystemMappingPanel() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden">
      <div className="h-10 bg-[#2E4862] text-white px-4 flex items-center flex-shrink-0">
        <span className="text-xs font-medium">Arduino Code — Smart Sensor System</span>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-[#c9d1d9]">
        <pre className="whitespace-pre-wrap break-words">
          <span style={{ color: '#ff7b72' }}>{'#define'}</span>{' PIR_PIN '}
          <span style={{ color: '#f0883e' }}>{'4'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'#define'}</span>{' TRIG_PIN '}
          <span style={{ color: '#f0883e' }}>{'5'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'#define'}</span>{' ECHO_PIN '}
          <span style={{ color: '#f0883e' }}>{'18'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'#define'}</span>{' BUZZER_PIN '}
          <span style={{ color: '#f0883e' }}>{'12'}</span>{'\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Get distance from ultrasonic sensor'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'long'}</span>{' '}
          <span style={{ color: '#79c0ff' }}>{'getDistance'}</span>{'() {\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>{'(TRIG_PIN, LOW);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'delayMicroseconds'}</span>{'(2);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>{'(TRIG_PIN, HIGH);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'delayMicroseconds'}</span>{'(10);\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>{'(TRIG_PIN, LOW);\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'long'}</span>{' dur = '}
          <span style={{ color: '#79c0ff' }}>{'pulseIn'}</span>{'(ECHO_PIN, HIGH);\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'return'}</span>{' dur * '}
          <span style={{ color: '#f0883e' }}>{'0.034'}</span>{' / '}
          <span style={{ color: '#f0883e' }}>{'2'}</span>{';\n'  }
          {'}\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// loop() — multi-sensor decision logic'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>{' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>{'() {\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>{' motion = '}
          <span style={{ color: '#79c0ff' }}>{'digitalRead'}</span>{'(PIR_PIN);\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'long'}</span>{' distance = '}
          <span style={{ color: '#79c0ff' }}>{'getDistance'}</span>{'();\n\n'}
          {'  '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// AND condition — both sensors required'}</span>{'\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'if'}</span>{' (motion == HIGH && distance < '}
          <span style={{ color: '#f0883e' }}>{'50'}</span>{') {\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'tone'}</span>{'(BUZZER_PIN, '}
          <span style={{ color: '#f0883e' }}>{'2000'}</span>{');\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'Serial.println'}</span>{'('}
          <span style={{ color: '#a5d6ff' }}>{"\"HIGH ALERT\""}</span>{');\n'}
          {'  } '}
          <span style={{ color: '#ff7b72' }}>{'else if'}</span>{' (motion == HIGH) {\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'tone'}</span>{'(BUZZER_PIN, '}
          <span style={{ color: '#f0883e' }}>{'1000'}</span>{');\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'Serial.println'}</span>{'('}
          <span style={{ color: '#a5d6ff' }}>{"\"Motion detected\""}</span>{');\n'}
          {'  } '}
          <span style={{ color: '#ff7b72' }}>{'else'}</span>{' {\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'noTone'}</span>{'(BUZZER_PIN);\n'}
          {'    '}
          <span style={{ color: '#79c0ff' }}>{'Serial.println'}</span>{'('}
          <span style={{ color: '#a5d6ff' }}>{"\"No activity\""}</span>{');\n'}
          {'  }\n'}
          {'}'}
        </pre>
      </div>
    </div>
  );
}