import { ReactNode } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" aria-modal="true" role="dialog">
      {/* Overlay with blur */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal content */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] bg-[#1A1F2E] rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-medium">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>
        
        {children}
      </div>
    </div>
  );
} 