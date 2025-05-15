'use client';

import { useState } from 'react';
import { 
  BellAlertIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
  PlusIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  XCircleIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  AcademicCapIcon,
  BeakerIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import DocumentViewer from './alerts/DocumentViewer';

// Alert priority levels
type AlertPriority = 'high' | 'medium' | 'low' | 'info';

// Alert categories
type AlertCategory = 'qc' | 'compliance' | 'equipment' | 'inventory' | 'system';

// Alert status
type AlertStatus = 'active' | 'acknowledged' | 'resolved';

// Alert interface
interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
  timestamp: string;
  linkedDoc?: {
    name: string;
    path: string;
  };
}

// Mock alert data
const alerts: Alert[] = [
  {
    id: '1',
    title: 'Calibration Overdue',
    message: '⚠️ Analytical Balance (ML204) calibration is overdue by 5 days — last calibrated on 2025-04-01 per [Calibration Log – QA Lab]. Immediate recalibration required before next moisture test.',
    severity: 'critical',
    timestamp: '10 minutes ago',
    linkedDoc: {
      name: 'Calibration Log - QA Lab Equipment Records',
      path: '/components/assets/labresources/QA_Lab_Equipment_Calibration_Log_2025.pdf'
    }
  },
  {
    id: '2',
    title: 'Test Result Outside SOP Range',
    message: '🚨 Moisture result of 14.7% for Corn Batch #C-4456 exceeds SOP-LAB-QC-014\'s limit of 13.0%. Retest and CAPA action completed, see [CAPA Report – Moisture Deviation].',
    severity: 'critical',
    timestamp: '30 minutes ago',
    linkedDoc: {
      name: 'CAPA Report - Moisture Analysis Deviation',
      path: '/components/assets/labresources/CAPA_Moisture_Analysis_Report_C4456.pdf'
    }
  },
  {
    id: '3',
    title: 'Incomplete ELN Record',
    message: '📋 Incomplete ELN entry detected for moisture test on Batch #C-4483. Technician signature missing as noted in [Audit Report – QC Lab Q1 2025].',
    severity: 'warning',
    timestamp: '1 hour ago',
    linkedDoc: {
      name: 'QC Laboratory Audit Report - Q1 2025',
      path: '/components/assets/labresources/QC_Lab_Audit_Report_Q1_2025.pdf'
    }
  },
  {
    id: '4',
    title: 'Incoming Raw Material Approval',
    message: '✅ New wheat shipment (Batch WHT-HRS-4522) passed all quality checks. Moisture: 12.2%, Protein: 13.4%. Accepted by QA, see [Vendor Inspection Report – AgriPure].',
    severity: 'success',
    timestamp: '2 hours ago',
    linkedDoc: {
      name: 'Vendor Quality Inspection Report - AgriPure Wheat',
      path: '/components/assets/labresources/Vendor_Quality_Inspection_AgriPure_WHT4522.pdf'
    }
  },
  {
    id: '5',
    title: 'Low Stock Warning',
    message: '📦 Low stock alert: Drying Reagent A inventory at 1.5L as of March 31. Review needed per [Inventory Log – QC Lab, March 2025].',
    severity: 'warning',
    timestamp: '3 hours ago',
    linkedDoc: {
      name: 'QC Laboratory Inventory Report - March 2025',
      path: '/components/assets/labresources/QC_Lab_Inventory_Report_March_2025.pdf'
    }
  },
  {
    id: '6',
    title: 'Training Record Check Passed',
    message: '🎓 Technician Emily Saunders completed training on SOP-LAB-QC-014 and passed with 92%. Verified and archived in [Training Record – Emily Saunders, QC Lab].',
    severity: 'success',
    timestamp: '4 hours ago',
    linkedDoc: {
      name: 'Personnel Training Record - Emily Saunders',
      path: '/components/assets/labresources/Personnel_Training_Record_ES_2025.pdf'
    }
  }
];

// Priority display data
const priorityData = {
  high: { color: 'red', label: 'High Priority' },
  medium: { color: 'amber', label: 'Medium Priority' },
  low: { color: 'blue', label: 'Low Priority' },
  info: { color: 'green', label: 'Information' }
};

// Category display data
const categoryData = {
  qc: { label: 'Quality Control', icon: ExclamationTriangleIcon },
  compliance: { label: 'Compliance', icon: CheckCircleIcon },
  equipment: { label: 'Equipment', icon: AdjustmentsHorizontalIcon },
  inventory: { label: 'Inventory', icon: InformationCircleIcon },
  system: { label: 'System', icon: InformationCircleIcon }
};

export default function AlertsManager() {
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<Alert['linkedDoc'] | null>(null);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <ClipboardDocumentListIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'success':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      default:
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = selectedSeverity === 'all' || alert.severity === selectedSeverity;
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="flex-1 bg-[#121620] p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-white">Alerts & Notifications</h1>
          <div className="flex items-center gap-3">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-[#1A1F2E] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
            </select>
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1A1F2E] text-white px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7] w-full sm:w-auto"
            />
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-[#1A1F2E] rounded-xl p-4 sm:p-6 border ${getSeverityClass(alert.severity)}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{getSeverityIcon(alert.severity)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-medium text-white">{alert.title}</h3>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {alert.timestamp}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-300 text-sm">{alert.message}</p>
                  {alert.linkedDoc && (
                    <button
                      onClick={() => setSelectedDoc(alert.linkedDoc)}
                      className="mt-4 flex items-center gap-2 text-sm text-[#00C4A7] hover:text-[#00C4A7]/80 transition-colors"
                    >
                      <DocumentTextIcon className="h-5 w-5" />
                      <span>View Document: {alert.linkedDoc.name}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Viewer */}
      <DocumentViewer
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        documentPath={selectedDoc?.path || ''}
        documentName={selectedDoc?.name || ''}
      />
    </div>
  );
} 