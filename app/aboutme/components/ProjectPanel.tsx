'use client';

import React from 'react';
import { profileData } from '../data';

export default function ProjectPanel() {
  return (
    <div className="h-full bg-gray-200 dark:bg-[#1e1e1e] border-r border-gray-300 dark:border-[#333] flex flex-col text-gray-700 dark:text-gray-300 font-sans text-xs select-none transition-colors duration-300">
      {/* Panel Header */}
      <div className="h-8 bg-gray-300 dark:bg-[#252525] border-b border-gray-300 dark:border-[#333] flex items-center px-3 font-semibold text-gray-600 dark:text-gray-400">
        Project: {profileData.name}
      </div>

      {/* Project Items (Profile Info) */}
      <div className="flex-grow p-2 overflow-y-auto">
        <div className="mb-4">
          <div className="flex items-center mb-2 text-gray-500 uppercase tracking-wider text-[10px]">
            <span className="mr-1">▼</span> Composition
          </div>
          <div className="pl-4 space-y-1">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-500 rounded-sm mr-2 opacity-80"></div>
              <span>Main Comp</span>
            </div>
            <div className="flex items-center text-gray-500">
              <div className="w-4 h-4 bg-gray-400 dark:bg-gray-700 rounded-sm mr-2 opacity-50"></div>
              <span>Pre-comps</span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2 text-gray-500 uppercase tracking-wider text-[10px]">
            <span className="mr-1">▼</span> Assets
          </div>
          <div className="pl-4 space-y-2">
             <div className="flex items-center group cursor-pointer hover:bg-gray-300 dark:hover:bg-[#2a2a2a] p-1 rounded transition-colors">
                <span className="text-blue-600 dark:text-blue-400 mr-2">JS</span>
                <div className="flex flex-col">
                    <span className="text-gray-800 dark:text-gray-200">{profileData.role}</span>
                    <span className="text-[10px] text-gray-500">Type: Role</span>
                </div>
             </div>
             <div className="flex items-center group cursor-pointer hover:bg-gray-300 dark:hover:bg-[#2a2a2a] p-1 rounded transition-colors">
                <span className="text-green-600 dark:text-green-400 mr-2">LOC</span>
                <div className="flex flex-col">
                    <span className="text-gray-800 dark:text-gray-200">{profileData.location}</span>
                    <span className="text-[10px] text-gray-500">Type: String</span>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-300 dark:border-[#333] pt-4">
            <div className="text-[10px] text-gray-500 mb-2">METADATA</div>
            <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-100 dark:bg-[#252525] p-2 rounded border border-gray-300 dark:border-[#333]">
                    <div className="text-[10px] text-gray-500">EXP</div>
                    <div className="text-sm font-mono text-yellow-600 dark:text-yellow-500">{profileData.stats.experience}</div>
                </div>
                <div className="bg-gray-100 dark:bg-[#252525] p-2 rounded border border-gray-300 dark:border-[#333]">
                    <div className="text-[10px] text-gray-500">PROJECTS</div>
                    <div className="text-sm font-mono text-blue-600 dark:text-blue-500">{profileData.stats.projects}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
