'use client';

import React, { useState, useRef } from 'react';
import Toolbar from './Toolbar';
import ProjectPanel from './ProjectPanel';
import Viewport from './Viewport';
import Timeline from './Timeline';
import { careerData } from '../data';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function AboutMeLayout() {
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const bgRef = useRef<HTMLDivElement>(null);

  // Responsive check
  React.useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 768) {
        setIsPanelOpen(false);
      } else {
        setIsPanelOpen(true);
      }
    };
    
    // Initial check
    checkSize();

    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const activeEvent = activeEventId 
    ? careerData.find(e => e.id === activeEventId) || null
    : null;

  useGSAP(() => {
      // Dynamic Background Particles
      const particles = gsap.utils.toArray('.bg-particle');
      
      const moveParticles = (e: MouseEvent) => {
          const mouseX = e.clientX;
          const mouseY = e.clientY;

          gsap.to(particles, {
              x: (i, target) => {
                  const rect = (target as HTMLElement).getBoundingClientRect();
                  const centerX = rect.left + rect.width / 2;
                  const dist = mouseX - centerX;
                  return dist * 0.05; // Move away/towards mouse slightly
              },
              y: (i, target) => {
                  const rect = (target as HTMLElement).getBoundingClientRect();
                  const centerY = rect.top + rect.height / 2;
                  const dist = mouseY - centerY;
                  return dist * 0.05;
              },
              duration: 1,
              ease: 'power2.out'
          });
      };

      window.addEventListener('mousemove', moveParticles);

      return () => {
          window.removeEventListener('mousemove', moveParticles);
      };
  }, { scope: bgRef });

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 dark:bg-[#111] text-gray-800 dark:text-gray-300 overflow-hidden font-sans transition-colors duration-300 relative">
      {/* Dynamic Background Layer */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20 dark:opacity-10">
          {[...Array(20)].map((_, i) => (
              <div 
                key={i} 
                className="bg-particle absolute w-2 h-2 bg-blue-500 rounded-full blur-[1px]"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.5 + 0.2,
                    transform: `scale(${Math.random() * 2 + 0.5})`
                }}
              ></div>
          ))}
      </div>

      {/* Top Toolbar */}
      <Toolbar onTogglePanel={() => setIsPanelOpen(!isPanelOpen)} />

      {/* Main Workspace Area */}
      <div className="flex flex-grow overflow-hidden z-10 relative">
        {/* Mobile Overlay */}
        {isPanelOpen && (
            <div 
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setIsPanelOpen(false)}
            ></div>
        )}

        {/* Left Sidebar (Project Panel) */}
        <div className={`
            fixed inset-y-0 left-0 z-50 w-64 h-full bg-gray-200 dark:bg-[#1e1e1e] transition-transform duration-300 ease-in-out shadow-xl md:shadow-none md:relative md:translate-x-0
            ${isPanelOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <ProjectPanel />
        </div>

        {/* Center/Right Area */}
        <div className="flex flex-col flex-grow h-full w-full">
          {/* Viewport (Composition) */}
          <div className="flex-grow relative bg-gray-200 dark:bg-[#0f0f0f]">
            <Viewport event={activeEvent} />
          </div>

          {/* Bottom Timeline */}
          <div className="h-1/3 min-h-[150px] md:min-h-[200px] border-t border-gray-300 dark:border-[#333]">
            <Timeline 
              events={careerData} 
              activeEventId={activeEventId} 
              onEventSelect={setActiveEventId} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
