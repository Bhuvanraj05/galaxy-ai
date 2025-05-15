'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  PencilIcon,
  ShareIcon,
  Squares2X2Icon,
  XMarkIcon,
  RocketLaunchIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import GenerateReportModal from '@/components/reports/GenerateReportModal';
import ReportDetail from '@/components/reports/ReportDetail';
import RecentUploads from '@/components/reports/RecentUploads';
import NewReportCanvas from '@/components/reports/NewReportCanvas';

// Mock data for reports
const mockReports = [
  {
    id: 1,
    title: 'Vendor Failures & SLA Review – Q2',
    creator: {
      type: 'AI',
      name: 'Galaxy AI',
      timestamp: '2024-05-15'
    },
    tags: ['QA', 'Moisture', 'Monthly'],
    source: 'Galaxy AI',
    sourceSystem: 'WinLIMS'
  },
  {
    id: 2,
    title: 'Inventory Delay Impact Report – May',
    creator: {
      type: 'AI',
      name: 'Galaxy AI',
      timestamp: '2024-05-08'
    },
    tags: ['Inventory', 'Delay'],
    source: 'Galaxy AI',
    sourceSystem: 'WinLIMS'
  },
  {
    id: 3,
    title: 'Starch Retest Spike – Audit Flag',
    creator: {
      type: 'User',
      name: 'Sarah Lee',
      timestamp: '2024-05-01'
    },
    tags: ['Compliance', 'Retest', 'Alert'],
    source: 'ELN'
  },
  {
    id: 4,
    title: 'Supplier Risk Assessment',
    creator: {
      type: 'AI',
      name: 'Galaxy AI',
      timestamp: '2024-04-15'
    },
    tags: ['Risk', 'Supplier', 'Automated'],
    source: 'Galaxy AI',
    sourceFile: 'Supplier_Data_2025.xlsx'
  }
];

// Mock data for recent uploads
const mockUploads = [
  {
    id: '1',
    name: 'Quality_Metrics_May2025.xlsx',
    type: 'Excel',
    size: '2.4 MB',
    uploadedAt: '2 hours ago',
    uploadedBy: 'John Smith'
  },
  {
    id: '2',
    name: 'Lab_Analysis_Report_Q2.pdf',
    type: 'PDF',
    size: '4.1 MB',
    uploadedAt: '5 hours ago',
    uploadedBy: 'Emily Chen'
  },
  {
    id: '3',
    name: 'Equipment_Calibration_Data.csv',
    type: 'CSV',
    size: '1.8 MB',
    uploadedAt: '1 day ago',
    uploadedBy: 'Michael Brown'
  }
];

// Separate client component for search params handling
function ReportsContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedCreator, setSelectedCreator] = useState('Created By');
  const [selectedTime, setSelectedTime] = useState('All Time');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [showNewReport, setShowNewReport] = useState(false);
  const [initialContent, setInitialContent] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're coming from chat with new report content
    if (searchParams.get('new') === 'true') {
      const content = localStorage.getItem('newReportContent');
      if (content) {
        setInitialContent(content);
        setShowNewReport(true);
        // Clear the stored content
        localStorage.removeItem('newReportContent');
      }
    }
    // Check if we're editing an existing report
    const editReportId = searchParams.get('edit');
    if (editReportId) {
      const content = localStorage.getItem('reportContent');
      const reportId = parseInt(editReportId);
      if (content && !isNaN(reportId)) {
        setSelectedReport(reportId);
        // Store the content to be added to the report
        localStorage.setItem(`report_${reportId}_pending_content`, content);
        // Clear the stored content
        localStorage.removeItem('reportContent');
        localStorage.removeItem('targetReportId');
      }
    }
  }, [searchParams]);

  const handleGenerateReport = (prompt: string) => {
    console.log('Generating report with prompt:', prompt);
    // Add logic to generate report using Galaxy AI
  };

  if (showNewReport) {
    return <NewReportCanvas 
      onClose={() => {
        setShowNewReport(false);
        setInitialContent(null);
      }}
      initialContent={initialContent}
    />;
  }

  if (selectedReport !== null) {
    const report = mockReports.find(r => r.id === selectedReport);
    if (report) {
      return <ReportDetail report={report} onClose={() => setSelectedReport(null)} />;
    }
  }

  return (
    <div className="flex-1 bg-[#121620] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl font-semibold text-white">Your Reports</h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowGenerateModal(true)}
              className="flex-1 sm:flex-none px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors flex items-center justify-center gap-2"
            >
              <RocketLaunchIcon className="h-5 w-5" />
              <span className="whitespace-nowrap">Generate with Galaxy AI</span>
            </button>
            <button
              onClick={() => setShowNewReport(true)}
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              New Report
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="relative flex-1 mb-4">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1F2E] text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="flex-1 sm:flex-none bg-[#1A1F2E] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
            >
              <option>All Types</option>
              <option>Analytics</option>
              <option>Compliance</option>
              <option>Quality Control</option>
            </select>

            <select
              value={selectedCreator}
              onChange={(e) => setSelectedCreator(e.target.value)}
              className="flex-1 sm:flex-none bg-[#1A1F2E] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
            >
              <option>Created By</option>
              <option>Galaxy AI</option>
              <option>Team Members</option>
            </select>

            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="flex-1 sm:flex-none bg-[#1A1F2E] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
            >
              <option>All Time</option>
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last Quarter</option>
            </select>

            <div className="flex items-center gap-2 bg-[#1A1F2E] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-[#232834] text-white'
                    : 'text-gray-400 hover:text-white'
                } transition-colors`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-[#232834] text-white'
                    : 'text-gray-400 hover:text-white'
                } transition-colors`}
              >
                <ListBulletIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Reports Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {mockReports.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`bg-[#1A1F2E] rounded-xl p-4 sm:p-6 cursor-pointer hover:bg-[#232834] transition-colors ${
                viewMode === 'list' ? 'flex items-start gap-4' : ''
              }`}
            >
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-lg font-medium mb-2 truncate">
                  {report.title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    {report.creator.type === 'AI' ? (
                      <RocketLaunchIcon className="h-4 w-4 text-[#00C4A7] flex-shrink-0" />
                    ) : null}
                    <span>{report.creator.name}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                  <span>{new Date(report.creator.timestamp).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {report.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#232834] text-white/80 px-3 py-1 rounded-lg text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm">
                  <span className="text-gray-400">Source:</span>
                  <span className="text-[#00C4A7]">{report.source}</span>
                  {report.sourceSystem && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                      <span className="text-gray-400">{report.sourceSystem}</span>
                    </>
                  )}
                  {report.sourceFile && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                      <span className="text-gray-400">{report.sourceFile}</span>
                    </>
                  )}
                </div>
              </div>

              {viewMode === 'list' && (
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Generate Report Modal */}
      <GenerateReportModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onGenerate={handleGenerateReport}
      />
    </div>
  );
}

// Main page component with Suspense boundary
export default function ReportsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 bg-[#121620] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-[#1A1F2E] rounded mb-6"></div>
            <div className="h-10 w-full bg-[#1A1F2E] rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#1A1F2E] rounded-xl p-6 h-48"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <ReportsContent />
    </Suspense>
  );
} 