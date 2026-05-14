import React from 'react';

interface BreadboardProps {
  x?: number;
  y?: number;
  rows?: number;
}

/**
 * A Premium SVG Breadboard Component.
 * Renders a realistic breadboard with power rails and terminal strips.
 */
export default function Breadboard({ x = 0, y = 0, rows = 30 }: BreadboardProps) {
  const rowHeight = 10;
  const colWidth = 12;
  const boardWidth = 220;
  const boardHeight = rows * rowHeight + 40;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Main Body */}
      <rect
        width={boardWidth}
        height={boardHeight}
        rx="8"
        fill="#f8fafc"
        stroke="#e2e8f0"
        strokeWidth="1"
        className="drop-shadow-sm"
      />
      
      {/* Power Rails - Left */}
      <g transform="translate(10, 20)">
        {/* Blue Line (-) */}
        <line x1="2" y1="0" x2="2" y2={rows * rowHeight} stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
        {/* Red Line (+) */}
        <line x1="12" y1="0" x2="12" y2={rows * rowHeight} stroke="#ef4444" strokeWidth="1" strokeOpacity="0.5" />
        
        {Array.from({ length: rows }).map((_, i) => (
          <g key={`power-l-${i}`} transform={`translate(0, ${i * rowHeight})`}>
            <circle cx="2" cy="5" r="1.5" fill="#cbd5e1" />
            <circle cx="12" cy="5" r="1.5" fill="#cbd5e1" />
          </g>
        ))}
      </g>

      {/* Terminal Strips - Group 1 (A-E) */}
      <g transform="translate(40, 20)">
        {Array.from({ length: 5 }).map((_, col) => (
          <g key={`col-1-${col}`} transform={`translate(${col * colWidth}, 0)`}>
            {Array.from({ length: rows }).map((_, row) => (
              <circle
                key={`hole-1-${col}-${row}`}
                cx="5"
                cy={row * rowHeight + 5}
                r="1.8"
                fill="#94a3b8"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Center Divider */}
      <rect x="108" y="15" width="4" height={rows * rowHeight + 10} fill="#e2e8f0" rx="2" />

      {/* Terminal Strips - Group 2 (F-J) */}
      <g transform="translate(120, 20)">
        {Array.from({ length: 5 }).map((_, col) => (
          <g key={`col-2-${col}`} transform={`translate(${col * colWidth}, 0)`}>
            {Array.from({ length: rows }).map((_, row) => (
              <circle
                key={`hole-2-${col}-${row}`}
                cx="5"
                cy={row * rowHeight + 5}
                r="1.8"
                fill="#94a3b8"
              />
            ))}
          </g>
        ))}
      </g>

      {/* Power Rails - Right */}
      <g transform="translate(195, 20)">
        {/* Red Line (+) */}
        <line x1="2" y1="0" x2="2" y2={rows * rowHeight} stroke="#ef4444" strokeWidth="1" strokeOpacity="0.5" />
        {/* Blue Line (-) */}
        <line x1="12" y1="0" x2="12" y2={rows * rowHeight} stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.5" />
        
        {Array.from({ length: rows }).map((_, i) => (
          <g key={`power-r-${i}`} transform={`translate(0, ${i * rowHeight})`}>
            <circle cx="2" cy="5" r="1.5" fill="#cbd5e1" />
            <circle cx="12" cy="5" r="1.5" fill="#cbd5e1" />
          </g>
        ))}
      </g>

      {/* Labels */}
      <g fontSize="5" fill="#94a3b8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
        {/* Row numbers every 5 rows */}
        {Array.from({ length: Math.floor(rows / 5) + 1 }).map((_, i) => (
          <text key={`row-label-${i}`} x="110" y={i * 5 * rowHeight + 27} transform={`rotate(90, 110, ${i * 5 * rowHeight + 25})`}>
            {i * 5 + 1}
          </text>
        ))}
        
        {/* Column letters */}
        <g transform="translate(45, 12)">
          {['A', 'B', 'C', 'D', 'E'].map((l, i) => (
            <text key={l} x={i * colWidth} y="0">{l}</text>
          ))}
        </g>
        <g transform="translate(125, 12)">
          {['F', 'G', 'H', 'I', 'J'].map((l, i) => (
            <text key={l} x={i * colWidth} y="0">{l}</text>
          ))}
        </g>
      </g>
    </g>
  );
}
