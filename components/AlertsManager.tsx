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
  XMarkIcon
} from '@heroicons/react/24/outline';

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
  description: string;
  source: string;
  timestamp: Date;
  priority: AlertPriority;
  category: AlertCategory;
  status: AlertStatus;
}

// Mock alert data
const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'QC Deviation Detected',
    description: 'Batch #A2938 pH test results outside of specification range (4.5-6.5). Measured value: 6.8',
    source: 'LIMS Data',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    priority: 'high',
    category: 'qc',
    status: 'active'
  },
  {
    id: '2',
    title: 'Calibration Due',
    description: 'pH Meter #PM-103 calibration due in 3 days. Last calibrated: 2023-04-15',
    source: 'Equipment Records',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    priority: 'medium',
    category: 'equipment',
    status: 'active'
  },
  {
    id: '3',
    title: 'Low Inventory',
    description: 'Reagent R-291 (Methylene Blue Solution) is below minimum threshold. Current: 250mL, Minimum: 500mL',
    source: 'Inventory System',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    priority: 'medium',
    category: 'inventory',
    status: 'acknowledged'
  },
  {
    id: '4',
    title: 'SOP Updated',
    description: 'Standard Operating Procedure for Sample Preparation (SOP-023) has been updated. Review required.',
    source: 'Document Management',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    priority: 'low',
    category: 'compliance',
    status: 'active'
  },
  {
    id: '5',
    title: 'Audit Preparation',
    description: 'Annual ISO audit scheduled in 2 weeks. Pre-audit checklist generated.',
    source: 'QMS',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    priority: 'info',
    category: 'compliance',
    status: 'resolved'
  },
  {
    id: '6',
    title: 'Sample Backlog',
    description: 'Increasing trend in unprocessed samples detected. Current backlog: 35 samples (18% above normal)',
    source: 'LIMS Analytics',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    priority: 'medium',
    category: 'qc',
    status: 'active'
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
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [statusFilter, setStatusFilter] = useState<AlertStatus | 'all'>('active');
  const [priorityFilter, setPriorityFilter] = useState<AlertPriority | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<AlertCategory | 'all'>('all');
  const [isCreateAlertOpen, setIsCreateAlertOpen] = useState(false);

  // Filter alerts based on selected filters
  const filteredAlerts = alerts.filter(alert => {
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || alert.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter;
    return matchesStatus && matchesPriority && matchesCategory;
  });

  const handleAcknowledge = (alertId: string) => {
    setAlerts(
      alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'acknowledged' } 
          : alert
      )
    );
  };

  const handleResolve = (alertId: string) => {
    setAlerts(
      alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'resolved' } 
          : alert
      )
    );
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    }
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Alert Filters */}
      <div className="lg:col-span-1">
        <div className="card h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Filters
            </h2>
            <button 
              className="text-primary-600 hover:text-primary-800 text-sm font-medium"
              onClick={() => {
                setStatusFilter('all');
                setPriorityFilter('all');
                setCategoryFilter('all');
              }}
            >
              Reset
            </button>
          </div>

          <div className="space-y-6">
            {/* Status Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </h3>
              <div className="space-y-2">
                {(['all', 'active', 'acknowledged', 'resolved'] as const).map((status) => (
                  <label key={status} className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      checked={statusFilter === status}
                      onChange={() => setStatusFilter(status)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </h3>
              <div className="space-y-2">
                {(['all', 'high', 'medium', 'low', 'info'] as const).map((priority) => (
                  <label key={priority} className="flex items-center">
                    <input
                      type="radio"
                      name="priority"
                      checked={priorityFilter === priority}
                      onChange={() => setPriorityFilter(priority)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {priority === 'all' ? 'All Priorities' : priorityData[priority].label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === 'all'}
                    onChange={() => setCategoryFilter('all')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    All Categories
                  </span>
                </label>
                {(Object.keys(categoryData) as AlertCategory[]).map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={categoryFilter === category}
                      onChange={() => setCategoryFilter(category)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {categoryData[category].label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
              <button 
                className="btn-primary w-full flex items-center justify-center"
                onClick={() => setIsCreateAlertOpen(true)}
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Custom Alert
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="lg:col-span-3">
        <div className="card h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Alerts
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filteredAlerts.length} result{filteredAlerts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {filteredAlerts.length > 0 ? (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`border rounded-lg p-4 ${
                    alert.status === 'resolved'
                      ? 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50'
                      : alert.priority === 'high'
                        ? 'border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20'
                        : alert.priority === 'medium'
                          ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-900/20'
                          : alert.priority === 'low'
                            ? 'border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/20'
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`mt-0.5 flex-shrink-0 w-5 h-5 ${
                      alert.status === 'resolved'
                        ? 'text-gray-400 dark:text-gray-500'
                        : alert.priority === 'high'
                          ? 'text-red-600 dark:text-red-400'
                          : alert.priority === 'medium'
                            ? 'text-amber-600 dark:text-amber-400'
                            : alert.priority === 'low'
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-green-600 dark:text-green-400'
                    }`}>
                      <BellAlertIcon />
                    </div>
                    
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <h3 className={`text-sm font-medium ${
                          alert.status === 'resolved'
                            ? 'text-gray-500 dark:text-gray-400'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {alert.title}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimestamp(alert.timestamp)}
                        </span>
                      </div>
                      
                      <p className={`mt-1 text-sm ${
                        alert.status === 'resolved'
                          ? 'text-gray-500 dark:text-gray-400'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {alert.description}
                      </p>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            alert.status === 'resolved'
                              ? 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-gray-300'
                              : alert.priority === 'high'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                : alert.priority === 'medium'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                                  : alert.priority === 'low'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                            {priorityData[alert.priority].label}
                          </span>
                          
                          <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                          
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            Source: {alert.source}
                          </span>
                          
                          <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                          
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            alert.status === 'resolved'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : alert.status === 'acknowledged'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                          }`}>
                            {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex space-x-2">
                          {alert.status === 'active' && (
                            <button
                              onClick={() => handleAcknowledge(alert.id)}
                              className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                            >
                              Acknowledge
                            </button>
                          )}
                          
                          {(alert.status === 'active' || alert.status === 'acknowledged') && (
                            <button
                              onClick={() => handleResolve(alert.id)}
                              className="text-xs text-primary-600 hover:text-primary-800 font-medium"
                            >
                              Resolve
                            </button>
                          )}
                          
                          <button className="text-xs text-primary-600 hover:text-primary-800 font-medium flex items-center">
                            <ArrowTopRightOnSquareIcon className="h-3 w-3 mr-1" />
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BellAlertIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No alerts found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                There are no alerts matching your current filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Alert Modal */}
      {isCreateAlertOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create Custom Alert
              </h2>
              <button 
                onClick={() => setIsCreateAlertOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="alert-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Alert Title
                </label>
                <input
                  type="text"
                  id="alert-title"
                  className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-gray-900 dark:text-white"
                  placeholder="Enter alert title"
                />
              </div>
              
              <div>
                <label htmlFor="alert-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="alert-description"
                  rows={3}
                  className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-gray-900 dark:text-white"
                  placeholder="Enter alert description"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="alert-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    id="alert-priority"
                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-gray-900 dark:text-white"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                    <option value="info">Information</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="alert-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    id="alert-category"
                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-gray-900 dark:text-white"
                  >
                    <option value="qc">Quality Control</option>
                    <option value="compliance">Compliance</option>
                    <option value="equipment">Equipment</option>
                    <option value="inventory">Inventory</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsCreateAlertOpen(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button className="btn-primary">
                Create Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 