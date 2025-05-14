import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CanvasContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CanvasContainer({ isOpen, onClose, children }: CanvasContainerProps) {
  return (
    <div 
      className={`fixed right-0 top-0 h-screen bg-[#1A1F2E] border-l border-[#2A2F38] transition-all duration-300 ${
        isOpen ? 'w-[600px] translate-x-0' : 'w-0 translate-x-full'
      }`}
    >
      {isOpen && (
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-[#2A2F38]">
            <h2 className="text-white text-lg font-medium">Canvas View</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#232834] rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
} 