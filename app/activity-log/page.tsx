'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

// Mock data for activities
const activities = [
  {
    id: 1,
    action: 'File Upload',
    icon: '📤',
    description: 'Uploaded lab results data for Batch 2024-B56',
    timestamp: '2024-05-12 14:32:45',
    category: 'Data'
  },
  {
    id: 2,
    action: 'AI Query',
    icon: '🤖',
    description: 'Analyzed contamination trends in recent samples',
    timestamp: '2024-05-12 13:15:10',
    category: 'Analysis'
  },
  {
    id: 3,
    action: 'Report Generated',
    icon: '📊',
    description: 'Monthly compliance summary report',
    timestamp: '2024-05-12 11:28:33',
    category: 'Report'
  },
  {
    id: 4,
    action: 'Document Download',
    icon: '📥',
    description: 'Downloaded SOP for Sample Processing',
    timestamp: '2024-05-11 16:42:15',
    category: 'Document'
  },
  {
    id: 5,
    action: 'System Login',
    icon: '👤',
    description: 'User login from IP 192.168.1.45',
    timestamp: '2024-05-11 09:03:22',
    category: 'Security'
  },
  {
    id: 6,
    action: 'Data Export',
    icon: '📊',
    description: 'Exported analytical data to CSV',
    timestamp: '2024-05-11 08:45:12',
    category: 'Data'
  }
];

const ITEMS_PER_PAGE = 6;

export default function ActivityLogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);

  // Categories for filter
  const categories = ['All Categories', 'Data', 'Analysis', 'Report', 'Document', 'Security'];

  // Get category badge style
  const getCategoryStyle = (category: string) => {
    const styles = {
      'Data': 'bg-blue-950 text-blue-400',
      'Analysis': 'bg-purple-950 text-purple-400',
      'Report': 'bg-emerald-950 text-emerald-400',
      'Document': 'bg-amber-950 text-amber-400',
      'Security': 'bg-red-950 text-red-400'
    };
    return styles[category] || 'bg-gray-950 text-gray-400';
  };

  // Filter activities based on search and category
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === 'All Categories' || 
      activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Handle export
  const handleExport = () => {
    // Implementation for exporting activity log
    console.log('Exporting activity log...');
  };

  return (
    <main className="min-h-screen bg-[#121620] p-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </span>
            <h1 className="text-2xl font-semibold text-white">Activity Log</h1>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1F2E] text-white rounded-lg text-sm hover:bg-[#232834] transition-colors"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1F2E] text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#1A1F2E] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Activity Table */}
        <div className="bg-[#1A1F2E] rounded-xl overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#232834]">
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Action</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Description</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Timestamp</th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Category</th>
              </tr>
            </thead>
            <tbody>
              {paginatedActivities.map((activity) => (
                <tr key={activity.id} className="border-b border-[#232834] last:border-0">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span>{activity.icon}</span>
                      <span className="text-white text-sm">{activity.action}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">{activity.description}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-400 text-sm">{activity.timestamp}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-sm ${getCategoryStyle(activity.category)}`}>
                      {activity.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-lg text-sm ${
                currentPage === i + 1
                  ? 'bg-[#232834] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </main>
  );
} 