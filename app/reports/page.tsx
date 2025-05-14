'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, ArrowDownTrayIcon, PencilIcon, ShareIcon, Squares2X2Icon, ListBulletIcon, ViewColumnsIcon } from '@heroicons/react/24/outline';

interface Report {
  id: number;
  title: string;
  author: string;
  timeAgo: string;
  fileName: string;
  tags: string[];
  source: 'ai' | 'manual';
}

// Mock data for reports
const reports: Report[] = [
  {
    id: 1,
    title: 'DON Test Analysis - March 2025',
    author: 'John Smith',
    timeAgo: '2 days ago',
    fileName: 'Test_001.xlsx',
    tags: ['DON', 'Corn', 'Monthly'],
    source: 'manual'
  },
  {
    id: 2,
    title: 'Batch B-005 Compliance Report',
    author: 'Galaxy AI',
    timeAgo: '1 week ago',
    fileName: 'LIMS_Sync_B005',
    tags: ['Compliance', 'B-005'],
    source: 'ai'
  },
  {
    id: 3,
    title: 'Aflatoxin Trend Analysis Q1 2025',
    author: 'Sarah Lee',
    timeAgo: '2 weeks ago',
    fileName: 'Test_001.xlsx +1',
    tags: ['Aflatoxin', 'Trend', 'Quarterly'],
    source: 'manual'
  },
  {
    id: 4,
    title: 'Supplier Risk Assessment',
    author: 'Galaxy AI',
    timeAgo: '1 month ago',
    fileName: 'Supplier_Data_2025.xlsx',
    tags: ['Risk', 'Supplier', 'Automated'],
    source: 'ai'
  }
];

// Recent uploads for AI generation
const recentUploads = [
  { title: 'Corn Production 2025', category: 'Agriculture' },
  { title: 'Supplier Risk Assessment', category: 'Compliance' },
  { title: 'Q1 Sales Data', category: 'Sales' }
];

type ViewType = 'list' | 'grid' | 'gallery';

export default function ReportsPage() {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedCreator, setSelectedCreator] = useState('Created By');
  const [selectedTime, setSelectedTime] = useState('All Time');
  const [aiPrompt, setAiPrompt] = useState('');
  const [viewType, setViewType] = useState<ViewType>('list');

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All Types' || report.tags.includes(selectedType);
    const matchesCreator = selectedCreator === 'Created By' || 
      (selectedCreator === 'AI Generated' ? report.source === 'ai' : report.source === 'manual');
    return matchesSearch && matchesType && matchesCreator;
  });

  const handleGenerateReport = () => {
    // Implementation for generating report
    console.log('Generating report with prompt:', aiPrompt);
    setShowGenerateModal(false);
  };

  // Render the AI generation modal
  const renderGenerateModal = () => {
    if (!showGenerateModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-[#1A1F2E] rounded-xl w-[480px] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-medium">Generate with Galaxy AI</h2>
            <button
              onClick={() => setShowGenerateModal(false)}
              className="p-2 hover:bg-[#232834] rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm mb-2">Enter Your Prompt</label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe the report you want to generate (e.g., 'Analyze corn production trends for Q1 2025')"
                className="w-full h-32 bg-[#232834] text-white rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
              />
            </div>

            <div>
              <h3 className="text-white text-sm mb-2">Recent Uploads</h3>
              <div className="space-y-2">
                {recentUploads.map((upload, index) => (
                  <button
                    key={index}
                    className="w-full text-left bg-[#232834] hover:bg-[#2A2F38] p-3 rounded-lg transition-colors"
                  >
                    <p className="text-white text-sm">{upload.title}</p>
                    <p className="text-gray-400 text-xs">{upload.category}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              className="w-full bg-[#00C4A7] text-white py-2 rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#121620]">
      {/* Fixed width container for header and search */}
      <div className="w-full max-w-[1440px] mx-auto px-6 py-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">Your Reports</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGenerateModal(true)}
              className="px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors"
            >
              Generate with Galaxy AI
            </button>
            <button className="px-4 py-2 bg-[#2E5DEF] text-white rounded-lg text-sm hover:bg-[#2E5DEF]/90 transition-colors">
              New Report
            </button>
          </div>
        </div>

        {/* Search and Filters - Fixed width */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1F2E] text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7] placeholder-gray-400"
            />
          </div>

          <button className="px-4 py-2 bg-[#1A1F2E] text-white rounded-lg text-sm hover:bg-[#232834] transition-colors whitespace-nowrap">
            All Types
          </button>

          <button className="px-4 py-2 bg-[#1A1F2E] text-white rounded-lg text-sm hover:bg-[#232834] transition-colors whitespace-nowrap">
            Created By
          </button>

          <button className="px-4 py-2 bg-[#1A1F2E] text-white rounded-lg text-sm hover:bg-[#232834] transition-colors whitespace-nowrap">
            All Time
          </button>

          {/* View Toggle */}
          <div className="flex bg-[#1A1F2E] rounded-lg p-1">
            <button
              onClick={() => setViewType('list')}
              className={`p-1.5 rounded ${viewType === 'list' ? 'bg-[#232834]' : 'hover:bg-[#232834]'} transition-colors`}
            >
              <ListBulletIcon className="h-5 w-5 text-gray-400" />
            </button>
            <button
              onClick={() => setViewType('grid')}
              className={`p-1.5 rounded ${viewType === 'grid' ? 'bg-[#232834]' : 'hover:bg-[#232834]'} transition-colors`}
            >
              <Squares2X2Icon className="h-5 w-5 text-gray-400" />
            </button>
            <button
              onClick={() => setViewType('gallery')}
              className={`p-1.5 rounded ${viewType === 'gallery' ? 'bg-[#232834]' : 'hover:bg-[#232834]'} transition-colors`}
            >
              <ViewColumnsIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Reports section with dynamic layout */}
      <div className="w-full max-w-[1440px] mx-auto px-6">
        <div 
          className={`grid gap-3 ${
            viewType === 'list' 
              ? 'grid-cols-1' 
              : viewType === 'grid' 
                ? 'grid-cols-2' 
                : 'grid-cols-3'
          }`}
        >
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-[#1A1F2E] rounded-xl p-4 hover:bg-[#232834] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-white text-base font-medium">{report.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{report.author}</span>
                    <span>•</span>
                    <span>{report.timeAgo}</span>
                  </div>
                  <div className="text-sm text-[#4B5563]">{report.fileName}</div>
                  <div className="flex flex-wrap gap-2">
                    {report.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-[#232834] text-white text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-400 hover:bg-[#232834] rounded-lg transition-colors">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:bg-[#232834] rounded-lg transition-colors">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:bg-[#232834] rounded-lg transition-colors">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Modal */}
      {renderGenerateModal()}
    </main>
  );
} 