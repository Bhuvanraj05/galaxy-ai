import { useState } from 'react';
import {
  ChartBarIcon,
  TableCellsIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ArrowUpTrayIcon,
  ShareIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

interface CanvasProps {
  data: any;
  type?: 'workflow' | 'notebook' | 'vendor' | 'compliance';
}

export default function Canvas({ data, type = 'workflow' }: CanvasProps) {
  const [activeTab, setActiveTab] = useState('chart');
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [isPushing, setIsPushing] = useState(false);

  // Get current date in the format "Month DD, YYYY"
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handlePushToELN = async () => {
    setIsPushing(true);
    // Simulate push to ELN
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsPushing(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'chart':
        return (
          <div className="bg-[#232834] rounded-lg p-4">
            <h3 className="text-white text-lg font-medium mb-4">Data Visualization</h3>
            {data?.chart ? (
              <div className="h-64 bg-[#1A1F2E] rounded-lg">
                {/* Render actual chart here */}
              </div>
            ) : (
              <div className="h-64 bg-[#1A1F2E] rounded-lg flex items-center justify-center">
                <ChartBarIcon className="h-12 w-12 text-[#00C4A7]" />
              </div>
            )}
          </div>
        );
      case 'table':
        return (
          <div className="bg-[#232834] rounded-lg p-4">
            <h3 className="text-white text-lg font-medium mb-4">Data Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-sm text-gray-400">
                  <tr>
                    <th className="p-3">Metric</th>
                    <th className="p-3">Value</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-white text-sm">
                  {data?.dataTable ? (
                    data.dataTable.map((row: any, index: number) => (
                      <tr key={index} className="border-t border-[#2A2F38]">
                        <td className="p-3">{row.technician}</td>
                        <td className="p-3">{row.moisture}</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            row.status.toLowerCase().includes('fail') 
                              ? 'bg-[#FF5A75]/10 text-[#FF5A75]'
                              : row.status.toLowerCase().includes('warning')
                                ? 'bg-[#FFB547]/10 text-[#FFB547]'
                                : 'bg-[#00C4A7]/10 text-[#00C4A7]'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-t border-[#2A2F38]">
                      <td className="p-3">No data available</td>
                      <td className="p-3"></td>
                      <td className="p-3"></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'summary':
        return (
          <div className="bg-[#232834] rounded-lg p-4">
            <h3 className="text-white text-lg font-medium mb-4">Analysis Summary</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {data?.description || 'No summary available.'}
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Date display */}
      <div className="flex items-center gap-2 text-[#B0B8C1] text-sm">
        <CalendarIcon className="h-4 w-4" />
        <span>{currentDate}</span>
      </div>

      {/* Push to ELN Button - Only show for notebook type */}
      {type === 'notebook' && (
        <div className="flex justify-end">
          <button
            onClick={handlePushToELN}
            disabled={isPushing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isPushing
                ? 'bg-[#00C4A7]/50 text-white cursor-not-allowed'
                : 'bg-[#00C4A7] text-white hover:bg-[#00C4A7]/90'
            }`}
          >
            <ArrowUpTrayIcon className="h-4 w-4" />
            {isPushing ? 'Pushing to ELN...' : 'Push to Original ELN'}
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 bg-[#232834] rounded-lg p-1">
        <button
          onClick={() => setActiveTab('chart')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'chart'
              ? 'bg-[#00C4A7] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1A1F2E]'
          }`}
        >
          <ChartBarIcon className="h-4 w-4" />
          Chart
        </button>
        <button
          onClick={() => setActiveTab('table')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'table'
              ? 'bg-[#00C4A7] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1A1F2E]'
          }`}
        >
          <TableCellsIcon className="h-4 w-4" />
          Table
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'summary'
              ? 'bg-[#00C4A7] text-white'
              : 'text-gray-400 hover:text-white hover:bg-[#1A1F2E]'
          }`}
        >
          <DocumentTextIcon className="h-4 w-4" />
          Summary
        </button>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#2A2F38]">
        <div className="flex gap-2">
          <button
            onClick={() => setFeedback('positive')}
            className={`p-2 rounded-lg transition-colors ${
              feedback === 'positive'
                ? 'bg-[#00C4A7]/10 text-[#00C4A7]'
                : 'text-gray-400 hover:bg-[#232834] hover:text-white'
            }`}
          >
            <HandThumbUpIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setFeedback('negative')}
            className={`p-2 rounded-lg transition-colors ${
              feedback === 'negative'
                ? 'bg-[#00C4A7]/10 text-[#00C4A7]'
                : 'text-gray-400 hover:bg-[#232834] hover:text-white'
            }`}
          >
            <HandThumbDownIcon className="h-5 w-5" />
          </button>
          <button
            className="p-2 rounded-lg transition-colors text-gray-400 hover:bg-[#232834] hover:text-white"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-[#232834] text-white hover:bg-[#2A2F38] transition-colors"
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Download Report
        </button>
      </div>
    </div>
  );
} 