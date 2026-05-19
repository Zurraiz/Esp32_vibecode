'use client';

import React from 'react';

export default function PatternMappingPanel() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden">
      <div className="h-10 bg-[#2E4862] text-white px-4 flex items-center flex-shrink-0">
        <div className="text-xs font-medium">Arduino Code</div>
      </div>
      <div className="flex-1 overflow-y-auto bg-[#0d1117] p-4 font-mono text-xs leading-relaxed text-[#c9d1d9]">
        <pre className="whitespace-pre-wrap break-words">
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// setup() — configure LED pin once'}
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
            {'// loop() — for loop with IF condition creates the pattern'}
          </span>{'\n'}
          <span style={{ color: '#ff7b72' }}>{'void'}</span>
          {' '}
          <span style={{ color: '#79c0ff' }}>{'loop'}</span>
          {'() {\n'}
          {'  '}
          <span style={{ color: '#ff7b72' }}>{'for'}</span>
          {'('}
          <span style={{ color: '#ff7b72' }}>{'int'}</span>
          {' i='}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {'; i<'}
          <span style={{ color: '#f0883e' }}>{'8'}</span>
          {'; i++) {\n'}
          {'    '}
          <span style={{ color: '#ff7b72' }}>{'if'}</span>
          {'(i % '}
          <span style={{ color: '#f0883e' }}>{'2'}</span>
          {' == '}
          <span style={{ color: '#f0883e' }}>{'0'}</span>
          {') {\n'}
          {'      '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// even index → LED ON'}
          </span>{'\n'}
          {'      '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'2'}</span>
          {', HIGH);\n'}
          {'      '}
          <span style={{ color: '#79c0ff' }}>{'delay'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'300'}</span>
          {');\n'}
          {'    } '}
          <span style={{ color: '#ff7b72' }}>{'else'}</span>
          {' {\n'}
          {'      '}
          <span style={{ color: '#8b949e', fontStyle: 'italic' }}>
            {'// odd index → LED OFF'}
          </span>{'\n'}
          {'      '}
          <span style={{ color: '#79c0ff' }}>{'digitalWrite'}</span>
          {'('}
          <span style={{ color: '#f0883e' }}>{'2'}</span>
          {', LOW);\n'}
          {'    }\n'}
          {'  }\n'}
          {'}'}
        </pre>
      </div>
    </div>
  );
}