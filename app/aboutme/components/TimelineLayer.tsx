'use client';

import React from 'react';
import { CareerEvent } from '../data';

interface TimelineLayerProps {
  event: CareerEvent;
  isActive: boolean;
  onClick: () => void;
  index: number;
  left: number;
  width: number;
}

export default function TimelineLayer({ event, isActive, onClick, index, left, width }: TimelineLayerProps) {
  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-center h-8 mb-1 cursor-pointer transition-colors select-none
        ${isActive ? 'bg-gray-400 dark:bg-[#4a4a4a]' : 'hover:bg-gray-300 dark:hover:bg-[#3a3a3a]'}
      `}
    >
      {/* Layer Number/Index */}
      <div className="w-8 flex-shrink-0 text-xs text-gray-500 dark:text-gray-400 text-center border-r border-gray-300 dark:border-[#333]">
        {index + 1}
      </div>

      {/* Layer Name/Color Indicator */}
      <div className="flex items-center w-48 flex-shrink-0 px-2 overflow-hidden border-r border-gray-300 dark:border-[#333]">
        <div 
          className="w-3 h-3 rounded-sm mr-2 flex-shrink-0" 
          style={{ backgroundColor: event.color }}
        />
        <span className="text-xs text-gray-700 dark:text-gray-200 truncate font-mono">
          {event.title}
        </span>
      </div>

      {/* Duration Bar Visual (Chronological) */}
      <div className="flex-grow h-full bg-gray-300 dark:bg-[#2a2a2a] relative overflow-hidden">
        <div 
          className="absolute top-1 bottom-1 rounded-sm opacity-80 shadow-sm"
          style={{ 
              backgroundColor: event.color,
              left: `${left}%`,
              width: `${width}%`
          }}
        />
      </div>
    </div>
  );
}
