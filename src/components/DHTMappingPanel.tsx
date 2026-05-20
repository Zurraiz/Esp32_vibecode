'use client';

import React from 'react';

export default function DHTMappingPanel() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden">
      <div className="h-10 bg-[#2E4862] text-white px-4 flex items-center flex-shrink-0">
        <span className="text-xs font-medium">Arduino Code — DHT Sensor</span>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-[#c9d1d9]">
        <pre className="whitespace-pre-wrap break-words">
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// Include DHT library'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'#include'}</span>{' '}
          <span style={{ color: '#a5d6ff' }}>{'<DHT.h>'}</span>{'\n\n'}
          <span style={{ color: '#ff7b72' }}>{'#define'}</span>{' DHTPIN '}
          <span style={{ color: '#f0883e' }}>{'4'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'#define'}</span>{' DHTTYPE DHT11\n\n'}
          <span style={{ color: '#ff7b72' }}>{'DHT'}</span>{' dht(DHTPIN, DHTTYPE);\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// setup() — runs once'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>{' '}
          <span style={{ color: '#79c0ff' }}>{'setup'}</span>{'() {\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial.begin'}</span>{'('}
          <span style={{ color: '#f0883e' }}>{'9600'}</span>{');\n'}
          {'  dht.'}
          <span style={{ color: '#79c0ff' }}>{'begin'}</span>{'();\n'  }
          {'}\n\n'}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>{'// loop() — reads sensor continuously'}</span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>{' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>{'() {\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'float'}</span>{' temp = dht.'}
          <span style={{ color: '#79c0ff' }}>{'readTemperature'}</span>{'();\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'float'}</span>{' humidity = dht.'}
          <span style={{ color: '#79c0ff' }}>{'readHumidity'}</span>{'();\n\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial.print'}</span>{'('}
          <span style={{ color: '#a5d6ff' }}>{"\"Temperature: \""}</span>{');\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial.println'}</span>{'(temp);\n\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial.print'}</span>{'('}
          <span style={{ color: '#a5d6ff' }}>{"\"Humidity: \""}</span>{');\n'}
          {'  '}
          <span style={{ color: '#79c0ff' }}>{'Serial.println'}</span>{'(humidity);\n'}
          {'}'}
        </pre>
      </div>
    </div>
  );
}