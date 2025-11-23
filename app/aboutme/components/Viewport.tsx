'use client';

import React, { useRef, useState } from 'react';
import { CareerEvent } from '../data';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ViewportProps {
  event: CareerEvent | null;
}

export default function Viewport({ event }: ViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [displayEvent, setDisplayEvent] = useState<CareerEvent | null>(event);

  useGSAP(() => {
    if (event?.id !== displayEvent?.id) {
      // Start Glitch Transition
      setIsRendering(true);
      
      const tl = gsap.timeline({
        onComplete: () => {
          setIsRendering(false);
          setDisplayEvent(event);
        }
      });

      // Glitch In
      tl.to(glitchRef.current, {
        opacity: 1,
        duration: 0.1,
        onStart: () => {
            // Random glitch slices
            gsap.to(".glitch-slice", {
                x: "random(-20, 20)",
                opacity: "random(0.5, 1)",
                duration: 0.05,
                repeat: 5,
                yoyo: true,
            });
        }
      })
      .to(contentRef.current, {
          opacity: 0,
          duration: 0.1
      }, "<")
      .to(glitchRef.current, {
          opacity: 0,
          duration: 0.2,
          delay: 0.3 // Fake render time
      })
      .to(contentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          clearProps: "all"
      });
    } else if (event && !displayEvent) {
        // Initial Load
        setDisplayEvent(event);
        gsap.fromTo(contentRef.current, 
            { opacity: 0, scale: 0.95, y: 10 },
            { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
        );
    }
  }, { scope: containerRef, dependencies: [event] });

  if (!event && !displayEvent) {
    return (
      <div className="h-full w-full bg-gray-200 dark:bg-[#0f0f0f] flex items-center justify-center text-gray-500 dark:text-gray-600 font-mono select-none transition-colors duration-300">
        <div className="text-center">
          <div className="text-4xl mb-4 opacity-20">NO SIGNAL</div>
          <p className="text-sm">Select a layer from the timeline</p>
        </div>
      </div>
    );
  }

  const currentEvent = displayEvent || event;

  return (
    <div ref={containerRef} className="h-full w-full bg-gray-200 dark:bg-[#0f0f0f] relative overflow-hidden flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#888 1px, transparent 1px), linear-gradient(90deg, #888 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}>
      </div>

      {/* Glitch Overlay */}
      <div ref={glitchRef} className="absolute inset-0 z-50 pointer-events-none opacity-0 flex flex-col justify-center items-center bg-black/50 backdrop-blur-sm">
          <div className="text-blue-500 font-mono text-xl font-bold mb-4 animate-pulse">RENDERING...</div>
          <div className="w-64 h-2 bg-gray-800 rounded overflow-hidden">
              <div className="h-full bg-blue-500 animate-progress"></div>
          </div>
          {/* Glitch Slices (Visual noise) */}
          <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                  <div key={i} className="glitch-slice absolute bg-white/10 h-2 w-full" style={{ top: `${Math.random() * 100}%` }}></div>
              ))}
          </div>
      </div>

      {/* Content Container (The "Composition") */}
      <div ref={contentRef} className="relative z-10 max-w-2xl w-full bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] shadow-2xl rounded-lg overflow-hidden transition-colors duration-300">
        {/* Window Header */}
        <div className="h-6 bg-gray-100 dark:bg-[#252525] border-b border-gray-300 dark:border-[#333] flex items-center px-3 justify-between">
            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">{currentEvent?.title}.comp</span>
            <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-red-500 opacity-50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500 opacity-50"></div>
            </div>
        </div>

        <div className="p-8">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{currentEvent?.role}</h1>
                    <h2 className="text-lg text-gray-600 dark:text-gray-400 font-mono">{currentEvent?.company}</h2>
                </div>
                <div className="text-right">
                    <div className="text-xs text-gray-500 font-mono mb-1">DATE</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400 font-mono">{currentEvent?.date}</div>
                </div>
            </div>

            <div className="mb-6">
                <div className="text-xs text-gray-500 font-mono mb-2 uppercase">Description</div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                    {currentEvent?.description}
                </p>
            </div>

            <div>
                <div className="text-xs text-gray-500 font-mono mb-2 uppercase">Skills / Tools</div>
                <div className="flex flex-wrap gap-2">
                    {currentEvent?.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#333] rounded text-xs text-gray-700 dark:text-gray-300 font-mono">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Footer Info */}
        <div className="h-6 bg-gray-100 dark:bg-[#151515] border-t border-gray-300 dark:border-[#333] flex items-center px-3 justify-between text-[10px] text-gray-500 font-mono">
            <span>ID: {currentEvent?.id}</span>
            <span>TYPE: {currentEvent?.type.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
}
