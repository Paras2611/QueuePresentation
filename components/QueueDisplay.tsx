
import React from 'react';
import { QueueState } from '../types';

interface QueueDisplayProps {
  queue: QueueState;
}

const QueueDisplay: React.FC<QueueDisplayProps> = ({ queue }) => {
  const { items, front, rear, size } = queue;
  const radius = 160;
  const innerRadius = 90;
  const center = 200;

  const getCoordinates = (index: number, r: number) => {
    // Offset by -90 degrees to start from top
    const angle = (index / size) * 2 * Math.PI - Math.PI / 2;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const getArcPath = (index: number) => {
    const startAngle = (index / size) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((index + 1) / size) * 2 * Math.PI - Math.PI / 2;
    
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    
    const x3 = center + innerRadius * Math.cos(endAngle);
    const y3 = center + innerRadius * Math.sin(endAngle);
    const x4 = center + innerRadius * Math.cos(startAngle);
    const y4 = center + innerRadius * Math.sin(startAngle);
    
    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
  };

  return (
    <div className="relative">
      <svg width="400" height="400" viewBox="0 0 400 400" className="drop-shadow-xl">
        {/* Background circle */}
        <circle cx={center} cy={center} r={radius} fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx={center} cy={center} r={innerRadius} fill="white" stroke="#e2e8f0" strokeWidth="1" />

        {/* Segments */}
        {items.map((item, i) => {
          const isFull = item !== null;
          const isFront = i === front;
          const isRear = i === rear;
          
          return (
            <g key={i}>
              <path 
                d={getArcPath(i)} 
                fill={isFull ? '#3b82f6' : 'white'} 
                stroke="#e2e8f0" 
                strokeWidth="2"
                className="transition-all duration-500"
              />
              
              {/* Index label outside */}
              <text 
                {...getCoordinates(i, radius + 25)} 
                textAnchor="middle" 
                dominantBaseline="middle"
                className="text-sm font-bold fill-slate-500 font-mono"
              >
                {i}
              </text>

              {/* Value inside */}
              {isFull && (
                <text 
                  {...getCoordinates(i + 0.5, (radius + innerRadius) / 2)} 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  className="text-lg font-bold fill-white"
                >
                  {item}
                </text>
              )}

              {/* Front Pointer Indicator */}
              {isFront && (
                <g className="animate-pulse">
                   <path 
                    d={`M ${getCoordinates(i + 0.5, radius + 55).x} ${getCoordinates(i + 0.5, radius + 55).y} L ${getCoordinates(i + 0.5, radius + 10).x} ${getCoordinates(i + 0.5, radius + 10).y}`}
                    stroke="#3b82f6" 
                    strokeWidth="3"
                    markerEnd="url(#arrow-front)"
                  />
                  <text 
                    {...getCoordinates(i + 0.5, radius + 70)}
                    textAnchor="middle"
                    className="text-xs font-black fill-blue-600 uppercase"
                  >
                    Front
                  </text>
                </g>
              )}

              {/* Rear Pointer Indicator */}
              {isRear && (
                <g className="animate-pulse">
                   <path 
                    d={`M ${getCoordinates(i + 0.5, radius + 55).x} ${getCoordinates(i + 0.5, radius + 55).y} L ${getCoordinates(i + 0.5, radius + 10).x} ${getCoordinates(i + 0.5, radius + 10).y}`}
                    stroke="#f97316" 
                    strokeWidth="3"
                    markerEnd="url(#arrow-rear)"
                  />
                  <text 
                    {...getCoordinates(i + 0.5, radius + 70)}
                    textAnchor="middle"
                    className="text-xs font-black fill-orange-500 uppercase"
                  >
                    Rear
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Center Text */}
        <text 
          x={center} 
          y={center - 10} 
          textAnchor="middle" 
          className="text-sm font-semibold fill-slate-400 uppercase tracking-widest"
        >
          Circular
        </text>
        <text 
          x={center} 
          y={center + 15} 
          textAnchor="middle" 
          className="text-xl font-bold fill-slate-800"
        >
          Queue
        </text>

        {/* Markers definitions */}
        <defs>
          <marker id="arrow-front" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
          </marker>
          <marker id="arrow-rear" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#f97316" />
          </marker>
        </defs>
      </svg>
      
      {/* Legend */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-6 text-xs font-semibold uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-slate-600">Filled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full border border-slate-200 bg-white"></div>
          <span className="text-slate-600">Empty</span>
        </div>
      </div>
    </div>
  );
};

export default QueueDisplay;
