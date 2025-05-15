import { useState, useEffect } from 'react';
import {
  DocumentTextIcon,
  TableCellsIcon,
  ChartBarIcon,
  PhotoIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface NewReportCanvasProps {
  onClose: () => void;
  initialContent?: string | null;
}

export default function NewReportCanvas({ onClose, initialContent }: NewReportCanvasProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string[]>([]);

  useEffect(() => {
    // If there's initial content from chat, add it as a text block
    if (initialContent) {
      setContent([initialContent]);
    }
  }, [initialContent]);

  const blocks = [
    {
      id: 'text',
      name: 'Text Block',
      description: 'Add paragraphs, headings, or lists',
      icon: DocumentTextIcon,
    },
    {
      id: 'table',
      name: 'Data Table',
      description: 'Insert structured data in table format',
      icon: TableCellsIcon,
    },
    {
      id: 'chart',
      name: 'Chart',
      description: 'Visualize data with various chart types',
      icon: ChartBarIcon,
    },
    {
      id: 'image',
      name: 'Image',
      description: 'Upload and embed images',
      icon: PhotoIcon,
    },
  ];

  return (
    <div className="bg-[#121620] min-h-screen">
      {/* Header */}
      <div className="bg-[#1A1F2E] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled Report"
                className="bg-transparent text-xl font-semibold text-white focus:outline-none focus:ring-0 w-full"
              />
              <p className="text-sm text-gray-400 mt-1">Draft • Last edited just now</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-white rounded-lg text-sm hover:bg-[#232834] transition-colors">
                Save Draft
              </button>
              <button className="px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors">
                Publish
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {content.length > 0 ? (
          <div className="space-y-6">
            {content.map((block, index) => (
              <div key={index} className="bg-[#1A1F2E] rounded-lg p-6">
                <p className="text-white whitespace-pre-wrap">{block}</p>
              </div>
            ))}
            <div className="text-center">
              <h2 className="text-lg font-medium text-white mb-2">Add More Content</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {blocks.map((block) => (
                  <button
                    key={block.id}
                    className="bg-[#1A1F2E] p-6 rounded-lg text-left hover:bg-[#232834] transition-colors group"
                  >
                    <block.icon className="h-8 w-8 text-[#00C4A7] mb-4" />
                    <h3 className="text-white font-medium mb-2 group-hover:text-[#00C4A7] transition-colors">
                      {block.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {block.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-medium text-white mb-2">Start Your Report</h2>
            <p className="text-sm text-gray-400 mb-8">
              Choose a block type below to start building your report
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {blocks.map((block) => (
                <button
                  key={block.id}
                  className="bg-[#1A1F2E] p-6 rounded-lg text-left hover:bg-[#232834] transition-colors group"
                >
                  <block.icon className="h-8 w-8 text-[#00C4A7] mb-4" />
                  <h3 className="text-white font-medium mb-2 group-hover:text-[#00C4A7] transition-colors">
                    {block.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {block.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-12 p-8 border-2 border-dashed border-gray-700 rounded-lg">
              <p className="text-gray-400 text-sm">
                You can also drag and drop files here to add them to your report
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 