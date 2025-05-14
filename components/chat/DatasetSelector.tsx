import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export interface Dataset {
  id: string;
  name: string;
  description?: string;
  lastSync?: string;
}

interface DatasetSelectorProps {
  datasets: Dataset[];
  selectedDataset: Dataset;
  onSelect: (dataset: Dataset) => void;
}

export default function DatasetSelector({
  datasets,
  selectedDataset,
  onSelect
}: DatasetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-xl font-medium
          transition-all duration-200
          ${isOpen 
            ? 'bg-[#00C4A7]/20 text-[#00C4A7]' 
            : 'bg-[#00C4A7]/10 text-[#00C4A7] hover:bg-[#00C4A7]/20'
          }
        `}
      >
        <span className="text-sm">{selectedDataset.name}</span>
        <ChevronDownIcon className={`
          h-4 w-4 transition-transform duration-200
          ${isOpen ? 'transform rotate-180' : ''}
        `} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1A1F2E] rounded-xl shadow-lg py-2 z-10">
          {datasets.map((dataset) => (
            <button
              key={dataset.id}
              onClick={() => {
                onSelect(dataset);
                setIsOpen(false);
              }}
              className={`
                w-full text-left px-4 py-3 transition-colors
                ${selectedDataset.id === dataset.id
                  ? 'bg-[#00C4A7]/10 text-[#00C4A7]'
                  : 'text-gray-200 hover:bg-[#2A2F38]'
                }
              `}
            >
              <div className="flex flex-col">
                <span className="font-medium">{dataset.name}</span>
                {dataset.description && (
                  <span className="text-xs text-gray-400 mt-1">
                    {dataset.description}
                  </span>
                )}
                {dataset.lastSync && (
                  <span className="text-xs text-gray-400 mt-1">
                    Last synced: {dataset.lastSync}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 