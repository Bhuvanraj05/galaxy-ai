'use client';

import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon, MagnifyingGlassIcon, ArrowsPointingOutIcon, XMarkIcon, ShareIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

// Mock data for the failed tests chart
const failedTestsData = [
  { time: '8:00 AM', count: 11 },
  { time: '9:30 AM', count: 7 },
  { time: '11:15 AM', count: 3 },
  { time: '1:45 PM', count: 14 },
  { time: '3:20 PM', count: 6 },
];

// Mock data for vendor performance
const vendorPerformanceData = [
  { metric: 'Quality', score: 95, status: 'Excellent' },
  { metric: 'Timeliness', score: 87, status: 'Good' },
  { metric: 'Documentation', score: 92, status: 'Excellent' },
  { metric: 'Communication', score: 90, status: 'Excellent' },
  { metric: 'Price', score: 85, status: 'Good' },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('Last 7 days');
  const [selectedDataset, setSelectedDataset] = useState('Choose tests dataset');
  const [expandedChart, setExpandedChart] = useState<'failed-tests' | 'vendor-performance' | null>(null);

  // Stats data
  const stats = [
    {
      title: 'Samples Processed',
      value: '4287',
      change: '12% from yesterday',
      trend: 'up',
      info: 'More info'
    },
    {
      title: 'Tests Processed Today',
      value: '2896',
      change: '8% from yesterday',
      trend: 'up',
      info: 'More info'
    },
    {
      title: 'Current Failure',
      value: '2%',
      change: '3% from yesterday',
      trend: 'down',
      info: 'More info'
    },
    {
      title: 'Critical Alerts',
      value: '5',
      change: '25% from yesterday',
      trend: 'down',
      info: 'More info'
    }
  ];

  // AI Insights
  const insights = [
    {
      title: 'High Failure Rate for AgroHarvest — 4 out of 6 lots flagged this week.',
      description: 'Vendor AgroHarvest has been linked to 4 batch QC failures over the past 7 days. Most were tied to moisture deviations in Line B. Recommend preparing for audit review.',
    },
    {
      title: 'Yield Drop Detected on Line B-Vendor Suspected',
      description: 'Three consecutive production batches using Vendor X inputs showed yield levels below the 30-day average by 12-14%. CAPA linked to moisture sensitivity was filed in Q1.',
    }
  ];

  // Handle adding to reports
  const handleAddToReports = () => {
    // Implementation for adding to reports
    console.log('Added to reports');
    setExpandedChart(null);
  };

  // Add new function for handling export
  const handleExport = () => {
    // Implementation for exporting chart
    console.log('Exporting chart');
  };

  // Add new function for handling share
  const handleShare = () => {
    // Implementation for sharing chart
    console.log('Sharing chart');
  };

  // Render expanded chart modal
  const renderExpandedChart = () => {
    if (!expandedChart) return null;

    const chartData = expandedChart === 'failed-tests' ? failedTestsData : vendorPerformanceData;
    const chartTitle = expandedChart === 'failed-tests' ? 'Number of Failed Tests' : 'AgroHarvest Q1 Performance Metrics';

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-[#1A1F2E] rounded-xl w-[90vw] h-[80vh] p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-medium">{chartTitle}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExport}
                className="p-2 text-[#B0B8C1] hover:text-[#00C4A7] transition-colors"
                title="Export"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleShare}
                className="p-2 text-[#B0B8C1] hover:text-[#00C4A7] transition-colors"
                title="Share"
              >
                <ShareIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleAddToReports}
                className="px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors"
              >
                Add to Reports
              </button>
              <button
                onClick={() => setExpandedChart(null)}
                className="p-2 hover:bg-[#232834] rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="h-[calc(100%-100px)]">
            <ResponsiveContainer width="100%" height="100%">
              {expandedChart === 'failed-tests' ? (
                <BarChart data={failedTestsData}>
                  <XAxis dataKey="time" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#232834',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <BarChart data={vendorPerformanceData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} stroke="#6B7280" />
                  <YAxis dataKey="metric" type="category" stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#232834',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="score"
                    radius={[0, 4, 4, 0]}
                  >
                    {vendorPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.status === 'Excellent' ? '#00C4A7' : '#F59E0B'} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-[#121620] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with controls */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Analytics</h1>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="bg-[#232834] text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            {/* Timeframe dropdown */}
            <div className="relative">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-[#232834] text-white px-4 py-2 rounded-lg text-sm appearance-none pr-10 focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#1A1F2E] rounded-xl p-6">
              <h3 className="text-gray-400 text-sm mb-2">{stat.title}</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white text-3xl font-semibold mb-2">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    {stat.trend === 'up' ? (
                      <ArrowUpIcon className="h-4 w-4 text-[#00C4A7]" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-[#00C4A7]' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <button className="text-[#00C4A7] text-sm hover:underline">
                  {stat.info}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <div className="bg-[#1A1F2E] rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-lg font-medium">Upload Analysis</h2>
              <div className="flex items-center gap-4">
                <select
                  value={selectedDataset}
                  onChange={(e) => setSelectedDataset(e.target.value)}
                  className="bg-[#232834] text-white px-4 py-2 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                >
                  <option>Choose tests dataset</option>
                  <option>Dataset 1</option>
                  <option>Dataset 2</option>
                </select>
                <select
                  className="bg-[#232834] text-white px-4 py-2 rounded-lg text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                >
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Daily</option>
                </select>
              </div>
            </div>

            <div className={`grid gap-3 ${
          'grid-cols-2'
            }`}>
              {/* Failed Tests Chart */}
              <div className="h-[300px] relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-white">Number of Failed Tests</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExport}
                      className="p-2 text-[#B0B8C1] hover:text-[#00C4A7] transition-colors"
                      title="Export"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 text-[#B0B8C1] hover:text-[#00C4A7] transition-colors"
                      title="Share"
                    >
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAddToReports()}
                      className="px-3 py-1.5 bg-[#00C4A7]/10 text-[#00C4A7] rounded-lg text-sm hover:bg-[#00C4A7]/20 transition-colors"
                    >
                      Add to Reports
                    </button>
                    <button
                      onClick={() => setExpandedChart('failed-tests')}
                      className="p-2 text-[#B0B8C1] hover:text-[#00C4A7] transition-colors"
                      title="Expand"
                    >
                      <ArrowsPointingOutIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={failedTestsData}>
                    <XAxis dataKey="time" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#232834',
                        border: 'none',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Vendor Performance Chart */}
              <div className="h-[300px] relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-white">AgroHarvest Q1 Performance Metrics</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleExport}
                      className="p-2 text-[#B0B8C1] hover:text-[#00C4A7] transition-colors"
                      title="Export"
                    >
                      <ArrowDownTrayIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleShare}
                      className="p-2 text-[#B0B8C1] hover:text-[#00C4A7] transition-colors"
                      title="Share"
                    >
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleAddToReports()}
                      className="px-3 py-1.5 bg-[#00C4A7]/10 text-[#00C4A7] rounded-lg text-sm hover:bg-[#00C4A7]/20 transition-colors"
                    >
                      Add to Reports
                    </button>
                    <button
                      onClick={() => setExpandedChart('vendor-performance')}
                      className="p-2 text-[#B0B8C1] hover:text-[#00C4A7] transition-colors"
                      title="Expand"
                    >
                      <ArrowsPointingOutIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={vendorPerformanceData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} stroke="#6B7280" />
                    <YAxis dataKey="metric" type="category" stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#232834',
                        border: 'none',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar
                      dataKey="score"
                      radius={[0, 4, 4, 0]}
                    >
                      {vendorPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.status === 'Excellent' ? '#00C4A7' : '#F59E0B'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <div key={index} className="bg-[#1A1F2E] rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-[#00C4A7] text-sm font-medium">Galaxy AI Insight</span>
                  <h3 className="text-white text-lg font-medium mt-2">{insight.title}</h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">{insight.description}</p>
              <div className="flex justify-end gap-4">
                <button className="px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors">
                  Deep Search with Galaxy AI
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Chart Modal */}
        {renderExpandedChart()}
      </div>
    </div>
  );
} 