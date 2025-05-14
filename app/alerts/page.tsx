'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock data for alerts with status field
const initialAlerts = [
  {
    id: 1,
    title: 'Critical Yield Drop Detected – Line B',
    severity: 'Critical',
    tags: ['Yield', 'Vendor', 'Retest'],
    description: 'Batch #CPSC-238 shows a yield 19% below baseline, triggered by a rise in protein reprocessing and retests. Potential correlation with low-quality input from Vendor AgroHarvest.',
    status: 'New',
    source: 'System'
  },
  {
    id: 2,
    title: 'Test Kit Inventory Low – Moisture Analysis',
    severity: 'Medium',
    tags: ['Inventory', 'Delay', 'Reagents'],
    description: 'Inventory for Moisture Kit B has dropped below the reorder threshold. 6 pending samples may face test delays if not restocked in the next 24 hours.',
    status: 'Unresolved',
    source: 'Integration'
  },
  {
    id: 3,
    title: 'Retest Spike in Shift 3 – Protein Testing',
    severity: 'Medium',
    tags: ['Retest', 'Shift', 'Calibration'],
    description: 'Shift 3 recorded a 32% retest rate on protein tests — double the weekly average. Technician ELN logs mention "drift in calibration baseline."',
    status: 'New',
    source: 'User'
  },
  {
    id: 4,
    title: 'Repeated Deviation – Vendor BioHarvest',
    severity: 'Critical',
    tags: ['Vendor', 'CAPA', 'Failure Pattern'],
    description: '3 batches from BioHarvest Inc. failed moisture thresholds in the past 5 days. Pattern matches prior CAPA #QMS-104 (open status).',
    status: 'Unresolved',
    source: 'System'
  },
  {
    id: 5,
    title: 'Dryer Calibration Drift Alert – Equipment DRY-42',
    severity: 'Info',
    tags: ['Calibration', 'Equipment', 'Process'],
    description: 'Batch #CPSC-238 shows a yield 19% below baseline, triggered by a rise in protein reprocessing and retests. Potential correlation with low-quality input from Vendor AgroHarvest.',
    status: 'New',
    source: 'Integration'
  }
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  const [selectedSource, setSelectedSource] = useState('All Sources');

  // Filter statuses
  const statuses = ['All', 'New', 'Unresolved', 'Resolved'];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-950 text-red-400';
      case 'medium':
        return 'bg-amber-950 text-amber-400';
      case 'info':
        return 'bg-blue-950 text-blue-400';
      default:
        return 'bg-gray-950 text-gray-400';
    }
  };

  const getTagStyle = (tag: string) => {
    return 'bg-[#232834] text-white px-3 py-1 rounded-full text-sm';
  };

  // Handle resolve button click
  const handleResolve = (alertId: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'Resolved' }
        : alert
    ));
  };

  // Filter alerts based on all criteria
  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = filterStatus === 'All' || alert.status === filterStatus;
    const matchesSeverity = selectedSeverity === 'All Severity' || alert.severity === selectedSeverity;
    const matchesSource = selectedSource === 'All Sources' || alert.source === selectedSource;
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesSeverity && matchesSource && matchesSearch;
  });

  // Get alert counts for each status
  const getStatusCount = (status: string) => {
    if (status === 'All') return alerts.length;
    return alerts.filter(alert => alert.status === status).length;
  };

  return (
    <main className="min-h-screen bg-[#121620] p-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Status Filter Tabs */}
        <div className="flex space-x-1 bg-[#1A1F2E] rounded-lg p-1 w-fit mb-6">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                filterStatus === status
                  ? 'bg-[#232834] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {status}
              <span className="bg-[#232834] px-2 py-0.5 rounded-full text-xs">
                {getStatusCount(status)}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests, batches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1F2E] text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
            />
          </div>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-[#1A1F2E] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
          >
            <option>All Severity</option>
            <option>Critical</option>
            <option>Medium</option>
            <option>Info</option>
          </select>

          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="bg-[#1A1F2E] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
          >
            <option>All Sources</option>
            <option>System</option>
            <option>User</option>
            <option>Integration</option>
          </select>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAlerts.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-400 text-lg">No alerts match your filters</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className="bg-[#1A1F2E] rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[#00C4A7] text-lg font-medium flex-1">
                    {alert.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">{alert.source}</span>
                    <span className={`ml-4 px-3 py-1 rounded-lg text-sm ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {alert.tags.map((tag, index) => (
                    <span key={index} className={getTagStyle(tag)}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  {alert.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className={`text-sm ${
                    alert.status === 'Resolved' 
                      ? 'text-[#00C4A7]' 
                      : alert.status === 'New' 
                        ? 'text-blue-400'
                        : 'text-amber-400'
                  }`}>
                    {alert.status}
                  </span>
                  <button 
                    onClick={() => handleResolve(alert.id)}
                    disabled={alert.status === 'Resolved'}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      alert.status === 'Resolved'
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-[#00C4A7] text-white hover:bg-[#00C4A7]/90'
                    }`}
                  >
                    {alert.status === 'Resolved' ? 'Resolved' : 'Resolve'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
} 