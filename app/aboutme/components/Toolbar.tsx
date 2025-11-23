'use client';

import React from 'react';
import { MousePointer2, Hand, ZoomIn, Type, PenTool, Move, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';

interface ToolbarProps {
    onTogglePanel?: () => void;
}

export default function Toolbar({ onTogglePanel }: ToolbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="h-10 bg-gray-200 dark:bg-[#252525] border-b border-gray-300 dark:border-[#333] flex items-center px-2 space-x-1 select-none transition-colors duration-300">
      {/* Mobile Toggle Button */}
      <div 
        className="md:hidden p-1.5 hover:bg-gray-300 dark:hover:bg-[#333] rounded text-gray-600 dark:text-gray-400 cursor-pointer transition-colors mr-2"
        onClick={onTogglePanel}
      >
        <Menu size={16} />
      </div>

      <div className="p-1.5 bg-gray-300 dark:bg-[#3a3a3a] rounded text-blue-600 dark:text-blue-400 cursor-pointer hidden md:block">
        <MousePointer2 size={16} />
      </div>
      <div className="p-1.5 hover:bg-gray-300 dark:hover:bg-[#333] rounded text-gray-600 dark:text-gray-400 cursor-pointer transition-colors hidden md:block">
        <Hand size={16} />
      </div>
      <div className="p-1.5 hover:bg-gray-300 dark:hover:bg-[#333] rounded text-gray-600 dark:text-gray-400 cursor-pointer transition-colors hidden md:block">
        <ZoomIn size={16} />
      </div>
      <div className="w-[1px] h-6 bg-gray-400 dark:bg-[#444] mx-1 hidden md:block"></div>
      <div className="p-1.5 hover:bg-gray-300 dark:hover:bg-[#333] rounded text-gray-600 dark:text-gray-400 cursor-pointer transition-colors hidden md:block">
        <Move size={16} />
      </div>
      <div className="p-1.5 hover:bg-gray-300 dark:hover:bg-[#333] rounded text-gray-600 dark:text-gray-400 cursor-pointer transition-colors hidden md:block">
        <Type size={16} />
      </div>
      <div className="p-1.5 hover:bg-gray-300 dark:hover:bg-[#333] rounded text-gray-600 dark:text-gray-400 cursor-pointer transition-colors hidden md:block">
        <PenTool size={16} />
      </div>
      
      <div className="flex-grow"></div>
      
      <div className="flex items-center space-x-3 mr-2">
        <div className="flex items-center space-x-1 bg-gray-100 dark:bg-[#1a1a1a] px-2 py-1 rounded border border-gray-300 dark:border-[#333] hidden sm:flex">
            <div className="w-3 h-3 rounded-full border border-gray-500"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">Snapping</span>
        </div>

        {mounted && (
          <button 
            onClick={toggleTheme}
            className="p-1.5 hover:bg-gray-300 dark:hover:bg-[#333] rounded text-gray-600 dark:text-gray-400 cursor-pointer transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
