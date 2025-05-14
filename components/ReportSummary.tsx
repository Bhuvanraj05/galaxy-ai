'use client';

import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

// Mock data for demonstration
const sampleStatusData = [
  { name: 'Completed', value: 142, color: '#4338ca' },
  { name: 'In Progress', value: 87, color: '#f59e0b' },
  { name: 'On Hold', value: 18, color: '#ef4444' },
  { name: 'Pending QC', value: 45, color: '#14b8a6' },
];

const testTypeData = [
  { name: 'Chemical', count: 87 },
  { name: 'Biological', count: 65 },
  { name: 'Stability', count: 42 },
  { name: 'Physical', count: 98 },
];

const COLORS = ['#4338ca', '#14b8a6', '#f59e0b', '#ef4444', '#84cc16', '#8b5cf6'];

export default function ReportSummary() {
  return (
    <div className="card h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Data Summary
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Sample Status Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sampleStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {sampleStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
          <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
            Test Types
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={testTypeData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#4338ca">
                  {testTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4">
        <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">
          Key Metrics
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Samples</div>
            <div className="text-2xl font-bold text-primary-600">292</div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">Avg. Turnaround</div>
            <div className="text-2xl font-bold text-primary-600">3.2 days</div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">QC Failure Rate</div>
            <div className="text-2xl font-bold text-primary-600">5.4%</div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-3 rounded-md shadow-sm">
            <div className="text-sm text-gray-500 dark:text-gray-400">Weekly Growth</div>
            <div className="text-2xl font-bold text-primary-600">+12%</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="btn-primary">
          Export to PDF
        </button>
      </div>
    </div>
  );
} 