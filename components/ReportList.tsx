'use client';

import { DocumentTextIcon, ArrowDownTrayIcon, ChartBarIcon } from '@heroicons/react/24/outline';

// Mock data for demonstration
const reports = [
  {
    id: '1',
    title: 'Weekly Quality Summary',
    type: 'Auto-generated',
    date: '2023-05-10',
    icon: DocumentTextIcon
  },
  {
    id: '2',
    title: 'Batch 2023-B5 Analysis',
    type: 'Custom',
    date: '2023-05-08',
    icon: ChartBarIcon
  },
  {
    id: '3',
    title: 'Equipment Calibration Status',
    type: 'Auto-generated',
    date: '2023-05-05',
    icon: DocumentTextIcon
  },
  {
    id: '4',
    title: 'Compliance Audit Q1 2023',
    type: 'Custom',
    date: '2023-04-28',
    icon: ChartBarIcon
  },
  {
    id: '5',
    title: 'Production Line Efficiency',
    type: 'Auto-generated',
    date: '2023-04-25',
    icon: DocumentTextIcon
  }
];

export default function ReportList() {
  return (
    <div className="card h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recent Reports
        </h2>
        <button className="text-primary-600 text-sm font-medium hover:text-primary-800">
          See All
        </button>
      </div>

      <div className="space-y-3">
        {reports.map((report) => (
          <div 
            key={report.id}
            className="flex items-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center">
              <report.icon className="h-5 w-5" />
            </div>
            <div className="ml-4 flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {report.title}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <span className={`${report.type === 'Auto-generated' ? 'text-secondary-600' : 'text-primary-600'}`}>
                  {report.type}
                </span>
                <span>•</span>
                <span>{report.date}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <ArrowDownTrayIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
          Report Templates
        </h3>
        <div className="grid grid-cols-1 gap-2">
          <button className="flex items-center p-2 bg-gray-50 dark:bg-slate-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition text-left text-sm font-medium text-gray-700 dark:text-gray-300">
            <DocumentTextIcon className="h-4 w-4 mr-2 text-primary-600" />
            Batch Quality Analysis
          </button>
          <button className="flex items-center p-2 bg-gray-50 dark:bg-slate-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition text-left text-sm font-medium text-gray-700 dark:text-gray-300">
            <DocumentTextIcon className="h-4 w-4 mr-2 text-primary-600" />
            Monthly Compliance Summary
          </button>
          <button className="flex items-center p-2 bg-gray-50 dark:bg-slate-700/50 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 transition text-left text-sm font-medium text-gray-700 dark:text-gray-300">
            <DocumentTextIcon className="h-4 w-4 mr-2 text-primary-600" />
            Sample Turnaround Analysis
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="btn-secondary">
          Create New Report
        </button>
      </div>
    </div>
  );
} 