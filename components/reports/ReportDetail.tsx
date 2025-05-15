import { useState, useEffect } from 'react';
import {
  ArrowDownTrayIcon,
  ShareIcon,
  ChartBarIcon,
  TableCellsIcon,
  DocumentTextIcon,
  RocketLaunchIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

interface ReportDetailProps {
  report: {
    id: number;
    title: string;
    creator: {
      type: string;
      name: string;
      timestamp: string;
    };
    tags: string[];
    source: string;
    sourceSystem?: string;
    sourceFile?: string;
    data?: any;
  };
  onClose: () => void;
}

// Mock data for charts
const qualityData = [
  { name: 'Jan', actual: 85, target: 90 },
  { name: 'Feb', actual: 88, target: 90 },
  { name: 'Mar', actual: 92, target: 90 },
  { name: 'Apr', actual: 87, target: 90 },
  { name: 'May', actual: 91, target: 90 },
];

const deviationData = [
  { category: 'Process', count: 12 },
  { category: 'Equipment', count: 8 },
  { category: 'Material', count: 15 },
  { category: 'Personnel', count: 5 },
];

export default function ReportDetail({ report, onClose }: ReportDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [content, setContent] = useState<string[]>([]);

  useEffect(() => {
    // Check for pending content to be added to the report
    const pendingContent = localStorage.getItem(`report_${report.id}_pending_content`);
    if (pendingContent) {
      setContent(prev => [...prev, pendingContent]);
      // Clear the pending content
      localStorage.removeItem(`report_${report.id}_pending_content`);
    }
  }, [report.id]);

  return (
    <div className="bg-[#121620] min-h-screen">
      {/* Header */}
      <div className="bg-[#1A1F2E] border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-white">{report.title}</h1>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  {report.creator.type === 'AI' && (
                    <RocketLaunchIcon className="h-4 w-4 text-[#00C4A7]" />
                  )}
                  <span>{report.creator.name}</span>
                </div>
                <span>•</span>
                <span>{report.creator.timestamp}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <ShareIcon className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-[#232834] text-white rounded-lg text-sm hover:bg-[#2A303E] transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 mt-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-medium border-b-2 ${
                activeTab === 'overview'
                  ? 'text-[#00C4A7] border-[#00C4A7]'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`pb-3 text-sm font-medium border-b-2 ${
                activeTab === 'data'
                  ? 'text-[#00C4A7] border-[#00C4A7]'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              Data
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`pb-3 text-sm font-medium border-b-2 ${
                activeTab === 'insights'
                  ? 'text-[#00C4A7] border-[#00C4A7]'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              AI Insights
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quality Metrics Chart */}
            <div className="bg-[#1A1F2E] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Quality Metrics</h3>
                <button className="text-gray-400 hover:text-white">
                  <ChevronDownIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={qualityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '0.5rem',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#00C4A7"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      stroke="#6B7280"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Deviations Chart */}
            <div className="bg-[#1A1F2E] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Deviations by Category</h3>
                <button className="text-gray-400 hover:text-white">
                  <ChevronDownIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deviationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="category" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '0.5rem',
                      }}
                    />
                    <Bar dataKey="count" fill="#00C4A7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Key Findings */}
            <div className="bg-[#1A1F2E] rounded-lg p-6 lg:col-span-2">
              <h3 className="text-lg font-medium text-white mb-4">Key Findings</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ChartBarIcon className="h-5 w-5 text-[#00C4A7] mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Quality Metrics Above Target</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Overall quality metrics have exceeded the target of 90% in March and May,
                      showing positive trend in process control.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TableCellsIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Material-related Deviations</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Material-related deviations account for the highest number of incidents (15),
                      suggesting a need for improved material quality control.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DocumentTextIcon className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Process Improvement Opportunities</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Process deviations (12 incidents) represent the second highest category,
                      indicating potential areas for process optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'data' && (
          <div className="bg-[#1A1F2E] rounded-lg p-6">
            <h3 className="text-lg font-medium text-white mb-4">Raw Data</h3>
            {/* Add data table or other data visualization components */}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="bg-[#1A1F2E] rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <RocketLaunchIcon className="h-6 w-6 text-[#00C4A7]" />
              <h3 className="text-lg font-medium text-white">AI-Generated Insights</h3>
            </div>
            {/* Add AI-generated insights */}
          </div>
        )}
      </div>
    </div>
  );
} 