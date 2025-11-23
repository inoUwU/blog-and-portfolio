'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { CareerEvent } from '../data';
import TimelineLayer from './TimelineLayer';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

// Register Draggable
gsap.registerPlugin(Draggable);

interface TimelineProps {
  events: CareerEvent[];
  activeEventId: string | null;
  onEventSelect: (id: string) => void;
}

export default function Timeline({ events, activeEventId, onEventSelect }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef<HTMLDivElement>(null);
  const [timecode, setTimecode] = useState("00:00:00:00");

  // --- Chronological Logic ---
  const { minYear, maxYear, totalDuration } = useMemo(() => {
      let min = Infinity;
      let max = -Infinity;

      const parseYear = (dateStr: string) => {
          if (dateStr.toLowerCase().includes('present')) return new Date().getFullYear();
          const match = dateStr.match(/(\d{4})/);
          return match ? parseInt(match[1]) : new Date().getFullYear();
      };

      events.forEach(e => {
          const parts = e.date.split('-');
          const start = parseYear(parts[0]);
          const end = parts.length > 1 ? parseYear(parts[1]) : start;
          
          if (start < min) min = start;
          if (end > max) max = end;
      });

      // Add some padding
      min -= 1;
      max += 1;

      return { minYear: min, maxYear: max, totalDuration: max - min };
  }, [events]);

  const getEventPosition = (dateStr: string) => {
      const parseYear = (str: string) => {
          if (str.toLowerCase().includes('present')) return new Date().getFullYear();
          const match = str.match(/(\d{4})/);
          return match ? parseInt(match[1]) : new Date().getFullYear();
      };

      const parts = dateStr.split('-');
      const start = parseYear(parts[0]);
      const end = parts.length > 1 ? parseYear(parts[1]) : start; // Default to 1 year if single date

      const left = ((start - minYear) / totalDuration) * 100;
      const width = ((end - start) / totalDuration) * 100; // Simple year-based width
      
      // Ensure minimum width for visibility
      return { left, width: Math.max(width, 5) };
  };
  // ---------------------------

  useGSAP(() => {
    // Simple entrance animation for layers
    gsap.from('.timeline-layer', {
      x: -20,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power2.out',
    });

    // Draggable Playhead
    if (playheadRef.current && containerRef.current) {
        Draggable.create(playheadRef.current, {
            type: "x",
            bounds: containerRef.current,
            inertia: true,
            onDrag: function() {
                updateTimecode(this.x, this.maxX);
            },
            onThrowUpdate: function() {
                updateTimecode(this.x, this.maxX);
            }
        });
    }
  }, { scope: containerRef });

  const updateTimecode = (x: number, maxX: number) => {
      // Map X position to Year
      const progress = x / maxX;
      const currentYear = minYear + (progress * totalDuration);
      
      const year = Math.floor(currentYear);
      const month = Math.floor((currentYear % 1) * 12) + 1;
      
      setTimecode(`${year}:${month.toString().padStart(2, '0')}:00:00`);
  };

  return (
    <div className="flex flex-col h-full bg-gray-200 dark:bg-[#1e1e1e] border-t border-gray-300 dark:border-[#333] select-none transition-colors duration-300" ref={containerRef}>
      {/* Timeline Header / Time Ruler */}
      <div className="h-6 bg-gray-300 dark:bg-[#252525] border-b border-gray-300 dark:border-[#333] flex items-center px-2 relative overflow-hidden">
        <div className="text-[10px] text-blue-600 dark:text-blue-400 font-mono font-bold min-w-[80px]">{timecode}</div>
        {/* Ruler Marks (Chronological) */}
        <div className="flex-grow flex justify-between ml-4 opacity-30 relative h-full items-end pb-1">
            {[...Array(totalDuration + 1)].map((_, i) => (
                <div key={i} className="flex flex-col items-center" style={{ position: 'absolute', left: `${(i / totalDuration) * 100}%` }}>
                    <div className="h-2 w-[1px] bg-gray-600 dark:bg-gray-400"></div>
                    <span className="text-[8px] text-gray-500 mt-0.5">{minYear + i}</span>
                </div>
            ))}
        </div>
        
        {/* Playhead Top */}
        <div 
            ref={playheadRef}
            className="absolute top-0 left-0 w-0 h-full border-l-2 border-blue-600 dark:border-blue-500 z-10 cursor-ew-resize"
        >
            <div className="absolute -top-0 -left-[5px] w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[8px] border-t-blue-600 dark:border-t-blue-500"></div>
        </div>
      </div>

      {/* Layers List */}
      <div className="flex-grow overflow-y-auto p-1 custom-scrollbar relative">
        {/* Playhead Line (Hidden for now as discussed) */}
        <div className="absolute top-0 bottom-0 left-[100px] w-[1px] bg-blue-500 opacity-50 pointer-events-none z-0 hidden"></div> 

        {events.map((event, index) => {
            const { left, width } = getEventPosition(event.date);
            return (
              <div key={event.id} className="timeline-layer">
                <TimelineLayer
                  event={event}
                  isActive={activeEventId === event.id}
                  onClick={() => onEventSelect(event.id)}
                  index={index}
                  left={left}
                  width={width}
                />
              </div>
            );
        })}
      </div>
    </div>
  );
}
