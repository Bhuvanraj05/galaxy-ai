'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PlusIcon, 
  XMarkIcon, 
  ArrowTopRightOnSquareIcon,
  BellAlertIcon,
  Squares2X2Icon,
  ListBulletIcon,
  PencilIcon,
  CheckIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import PDFViewerModal from '@/components/PDFViewerModal';

// Add severity types
type SeverityLevel = 'Critical' | 'Medium' | 'Info';

// Update alert interface
interface Alert {
  id: number;
  title: string;
  severity: SeverityLevel;
  category: string;
  description: string;
  status: string;
  source: string;
  sourceDocument: {
    type: string;
    link: string;
    reference: string;
  };
}

// Mock data for alerts with status field
const initialAlerts: Alert[] = [
  {
    id: 1,
    title: 'Calibration Overdue',
    severity: 'Critical',
    category: 'Equipment Management',
    description: '⚠️ Analytical Balance (ML204) calibration is overdue by 5 days — last calibrated on 2025-04-01 per [Calibration Log – QA Lab]. Immediate recalibration required before next moisture test.',
    status: 'New',
    source: 'System',
    sourceDocument: {
      type: 'SOP Document',
      link: '/assets/labresources/SOP_Lab_Moisture_Analysis_Expanded_v3.docx.pdf',
      reference: 'SOP-LAB-MA-003'
    }
  },
  {
    id: 2,
    title: 'Test Result Outside SOP Range',
    severity: 'Critical',
    category: 'Quality Control',
    description: '🚨 Moisture result of 14.7% for Corn Batch #C-4456 exceeds SOP-LAB-QC-014\'s limit of 13.0%. Retest and CAPA action completed, see [CAPA Report – Moisture Deviation].',
    status: 'Unresolved',
    source: 'Integration',
    sourceDocument: {
      type: 'CAPA Report',
      link: '/assets/labresources/CAPA_Report_Corn_Batch_C4456_Moisture.pdf',
      reference: 'CAPA-C4456-M'
    }
  },
  {
    id: 3,
    title: 'Incomplete ELN Record',
    severity: 'Medium',
    category: 'Documentation',
    description: '📋 Incomplete ELN entry detected for moisture test on Batch #C-4483. Technician signature missing as noted in [Audit Report – QC Lab Q1 2025].',
    status: 'New',
    source: 'System',
    sourceDocument: {
      type: 'Audit Report',
      link: '/assets/labresources/Audit_Report_QC_Lab_Q1_2025.pdf',
      reference: 'AUD-QC-Q1-25'
    }
  },
  {
    id: 4,
    title: 'Incoming Raw Material Approval',
    severity: 'Info',
    category: 'Quality Control',
    description: '✅ New wheat shipment (Batch WHT-HRS-4522) passed all quality checks. Moisture: 12.2%, Protein: 13.4%. Accepted by QA, see [Vendor Inspection Report – AgriPure].',
    status: 'New',
    source: 'User',
    sourceDocument: {
      type: 'Inspection Report',
      link: '/assets/labresources/Vendor_Inspection_Report_Wheat_AgriPure_2025.pdf',
      reference: 'VQI-WHT4522'
    }
  },
  {
    id: 5,
    title: 'Low Stock Warning',
    severity: 'Medium',
    category: 'Inventory Management',
    description: '📦 Low stock alert: Drying Reagent A inventory at 1.5L as of March 31. Review needed per [Inventory Log – QC Lab, March 2025].',
    status: 'Unresolved',
    source: 'System',
    sourceDocument: {
      type: 'Inventory Report',
      link: '/assets/labresources/Inventory_Reagent_Log_QC_March_2025.pdf',
      reference: 'INV-QC-MAR25'
    }
  },
  {
    id: 6,
    title: 'Training Record Check Passed',
    severity: 'Info',
    category: 'Training',
    description: '🎓 Technician Emily Saunders completed training on SOP-LAB-QC-014 and passed with 92%. Verified and archived in [Training Record – Emily Saunders, QC Lab].',
    status: 'Resolved',
    source: 'Integration',
    sourceDocument: {
      type: 'Training Record',
      link: '/assets/labresources/Training_Record_Emily_Saunders_QC_2025.pdf',
      reference: 'TRN-ES-2025'
    }
  }
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All Severity');
  const [selectedSource, setSelectedSource] = useState('All Sources');
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'gallery'>('list');
  const [editingSeverity, setEditingSeverity] = useState<number | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<{
    url: string;
    title: string;
  } | null>(null);

  // Filter statuses
  const statuses = ['All', 'New', 'Unresolved', 'Resolved'];

  // Update the getTagStyle function for the new pill-style tags
  const getTagStyle = () => {
    return 'bg-[#232834] text-white/80 px-4 py-1.5 rounded-full text-sm font-medium';
  };

  // Update the getSeverityColor function for the new design
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-950/50 text-red-400 border border-red-800';
      case 'medium':
        return 'bg-amber-950/50 text-amber-400 border border-amber-800';
      case 'info':
        return 'bg-blue-950/50 text-blue-400 border border-blue-800';
      default:
        return 'bg-gray-950/50 text-gray-400 border border-gray-800';
    }
  };

  // Handle resolve button click
  const handleResolve = (alertId: number) => {
    setAlerts(alerts.map((alert: Alert) => 
      alert.id === alertId 
        ? { ...alert, status: 'Resolved' }
        : alert
    ));
  };

  // Add severity update handler
  const handleSeverityUpdate = (alertId: number, newSeverity: SeverityLevel) => {
    setAlerts(alerts.map((alert: Alert) => 
      alert.id === alertId 
        ? { ...alert, severity: newSeverity }
        : alert
    ));
    setEditingSeverity(null);
  };

  // Filter alerts based on all criteria
  const filteredAlerts = alerts.filter((alert: Alert) => {
    const matchesStatus = filterStatus === 'All' || alert.status === filterStatus;
    const matchesSeverity = selectedSeverity === 'All Severity' || alert.severity === selectedSeverity;
    const matchesSource = selectedSource === 'All Sources' || alert.source === selectedSource;
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         alert.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSeverity && matchesSource && matchesSearch;
  });

  // Get alert counts for each status
  const getStatusCount = (status: string) => {
    if (status === 'All') return alerts.length;
    return alerts.filter((alert: Alert) => alert.status === status).length;
  };

  return (
    <div className="flex-1 bg-[#121620] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Alerts</h1>
          <button
            onClick={() => setShowCreateAlert(true)}
            className="px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Create Alert
          </button>
        </div>

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
              <span className={`${
                filterStatus === status ? 'bg-[#00C4A7]/20 text-[#00C4A7]' : 'bg-[#232834]'
              } px-2 py-0.5 rounded-full text-xs`}>
                {getStatusCount(status)}
              </span>
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search alerts by title, description, or category..."
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

          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'gallery' : 'list')}
            className="p-2 bg-[#1A1F2E] text-gray-400 hover:text-white rounded-lg transition-colors"
            title={`Switch to ${viewMode === 'list' ? 'gallery' : 'list'} view`}
          >
            {viewMode === 'list' ? (
              <Squares2X2Icon className="h-5 w-5" />
            ) : (
              <ListBulletIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Alerts Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'gallery' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        }`}>
          {filteredAlerts.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-[#1A1F2E] rounded-xl">
              <BellAlertIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-white">No alerts found</h3>
              <p className="mt-1 text-sm text-gray-400">
                No alerts match your current filters.
              </p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="bg-[#1A1F2E] rounded-xl p-6 min-h-[320px] flex flex-col"
              >
                {/* Title and Severity */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-[#00C4A7] text-lg font-medium leading-tight pr-4">
                    {alert.title}
                  </h3>
                  <div className="flex-shrink-0 relative">
                    <button
                      onClick={() => setEditingSeverity(editingSeverity === alert.id ? null : alert.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors whitespace-nowrap ${getSeverityColor(alert.severity)}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        alert.severity === 'Critical' ? 'bg-red-400' :
                        alert.severity === 'Medium' ? 'bg-amber-400' :
                        'bg-blue-400'
                      }`}></span>
                      {alert.severity}
                      <ChevronDownIcon className="h-3.5 w-3.5 opacity-60" />
                    </button>
                    
                    {editingSeverity === alert.id && (
                      <div className="absolute z-10 mt-2 w-40 right-0 top-full">
                        <div className="bg-[#232834] rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                          {(['Critical', 'Medium', 'Info'] as SeverityLevel[]).map((severity) => (
                            <button
                              key={severity}
                              onClick={() => handleSeverityUpdate(alert.id, severity)}
                              className={`w-full px-4 py-2 text-sm text-left hover:bg-[#2A303C] transition-colors flex items-center justify-between group ${
                                alert.severity === severity ? 'text-[#00C4A7]' : 'text-white'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${
                                  severity === 'Critical' ? 'bg-red-400' :
                                  severity === 'Medium' ? 'bg-amber-400' :
                                  'bg-blue-400'
                                }`}></span>
                                {severity}
                              </div>
                              {alert.severity === severity && (
                                <CheckIcon className="h-4 w-4" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Info */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-400 text-sm">{alert.source}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                  <span className="text-gray-400 text-sm">{alert.status}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                  <span className="text-gray-400 text-sm">{alert.category}</span>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {alert.category.split(' ').map((word: string, index: number) => (
                    <span 
                      key={index} 
                      className="bg-[#232834] text-white/80 px-3 py-1 rounded-lg text-sm"
                    >
                      {word}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {alert.description}
                </p>

                {/* Source Document */}
                <div className="mt-auto">
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <span className="text-gray-400">Source Document:</span>
                    <button
                      onClick={() => setSelectedDocument({
                        url: alert.sourceDocument.link,
                        title: `${alert.sourceDocument.type} - ${alert.sourceDocument.reference}`
                      })}
                      className="text-[#00C4A7] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {alert.sourceDocument.type}
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </button>
                    <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                    <span className="text-gray-400">
                      Ref: {alert.sourceDocument.reference}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleResolve(alert.id)}
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                        alert.status === 'Resolved'
                          ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                          : 'bg-[#00C4A7] text-white hover:bg-[#00C4A7]/90'
                      }`}
                      disabled={alert.status === 'Resolved'}
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Alert Modal */}
        {showCreateAlert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#1A1F2E] rounded-xl p-6 w-full max-w-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Create Alert</h2>
                <button
                  onClick={() => setShowCreateAlert(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#232834] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    placeholder="Enter alert title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="w-full bg-[#232834] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    placeholder="Enter alert description"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Severity
                    </label>
                    <select 
                      className="w-full bg-[#232834] text-white pl-4 pr-8 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7] appearance-none relative"
                      defaultValue="Medium"
                    >
                      <option value="Critical" className="flex items-center gap-2">
                        Critical
                      </option>
                      <option value="Medium">
                        Medium
                      </option>
                      <option value="Info">
                        Info
                      </option>
                    </select>
                    <p className="mt-1 text-xs text-gray-400">
                      Choose the severity level carefully. This can be changed later if needed.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Source
                    </label>
                    <select className="w-full bg-[#232834] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]">
                      <option>System</option>
                      <option>User</option>
                      <option>Integration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#232834] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    placeholder="Enter category"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowCreateAlert(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors">
                  Create Alert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add PDF Viewer Modal */}
        <PDFViewerModal
          isOpen={selectedDocument !== null}
          onClose={() => setSelectedDocument(null)}
          pdfUrl={selectedDocument?.url || ''}
          documentTitle={selectedDocument?.title || ''}
        />
      </div>
    </div>
  );
} 