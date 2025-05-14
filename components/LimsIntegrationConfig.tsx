'use client';

import { useState } from 'react';
import { 
  CloudArrowUpIcon, 
  ServerIcon, 
  ArrowPathIcon, 
  InformationCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

// LIMS system options
const limsOptions = [
  { id: 'labware', name: 'LabWare LIMS' },
  { id: 'starlims', name: 'STARLIMS' },
  { id: 'thermo', name: 'Thermo Fisher SampleManager' },
  { id: 'labvantage', name: 'LabVantage' },
  { id: 'custom', name: 'Custom/Other LIMS' },
];

export default function LimsIntegrationConfig() {
  const [selectedLims, setSelectedLims] = useState('');
  const [connectionMethod, setConnectionMethod] = useState('api');
  const [apiConfig, setApiConfig] = useState({
    endpoint: '',
    username: '',
    password: '',
    apiKey: '',
  });
  const [fileConfig, setFileConfig] = useState({
    filename: '',
  });
  const [syncFrequency, setSyncFrequency] = useState('60');
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleLimsSelect = (limsId: string) => {
    setSelectedLims(limsId);
    setIsConnected(false);
  };

  const handleApiConfigChange = (key: string, value: string) => {
    setApiConfig({
      ...apiConfig,
      [key]: value,
    });
  };

  const handleConnect = () => {
    // Simulate connection process
    setIsConfiguring(true);
    
    setTimeout(() => {
      setIsConfiguring(false);
      setIsConnected(true);
      setLastSynced(new Date().toLocaleString());
    }, 2000);
  };

  const handleSync = () => {
    // Simulate sync process
    setIsSyncing(true);
    
    setTimeout(() => {
      setIsSyncing(false);
      setLastSynced(new Date().toLocaleString());
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* LIMS Selection */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Select LIMS System
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {limsOptions.map((lims) => (
            <button
              key={lims.id}
              className={`p-4 rounded-lg border text-left flex items-center hover:border-primary-600 transition-colors ${
                selectedLims === lims.id 
                  ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20' 
                  : 'border-gray-200 dark:border-slate-700'
              }`}
              onClick={() => handleLimsSelect(lims.id)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                selectedLims === lims.id 
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' 
                  : 'bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-300'
              }`}>
                <ServerIcon className="h-5 w-5" />
              </div>
              <span className="font-medium text-gray-900 dark:text-white">
                {lims.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Connection Configuration */}
      {selectedLims && (
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Connection Configuration
          </h2>

          {/* Tab Selection */}
          <div className="flex border-b border-gray-200 dark:border-slate-700 mb-6">
            <button
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                connectionMethod === 'api'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setConnectionMethod('api')}
            >
              API Integration
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm border-b-2 ${
                connectionMethod === 'file'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setConnectionMethod('file')}
            >
              File Upload
            </button>
          </div>

          {/* API Configuration */}
          {connectionMethod === 'api' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="endpoint" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Endpoint URL
                </label>
                <input
                  type="text"
                  id="endpoint"
                  className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-gray-900 dark:text-white"
                  placeholder="https://your-lims-server.com/api/v1"
                  value={apiConfig.endpoint}
                  onChange={(e) => handleApiConfigChange('endpoint', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-gray-900 dark:text-white"
                    placeholder="api_user"
                    value={apiConfig.username}
                    onChange={(e) => handleApiConfigChange('username', e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-gray-900 dark:text-white"
                    placeholder="••••••••"
                    value={apiConfig.password}
                    onChange={(e) => handleApiConfigChange('password', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  API Key (if required)
                </label>
                <input
                  type="text"
                  id="apiKey"
                  className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-gray-900 dark:text-white"
                  placeholder="api_key_123456789"
                  value={apiConfig.apiKey}
                  onChange={(e) => handleApiConfigChange('apiKey', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* File Upload Configuration */}
          {connectionMethod === 'file' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <DocumentTextIcon className="h-12 w-12 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Drag and drop your LIMS export file here, or click to browse
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Supported formats: CSV, XLSX, XML, JSON
                </p>
                <button className="btn-primary mt-2">
                  Browse Files
                </button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-md p-4 flex">
                <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    To use file upload, please ensure your export contains the following columns:
                  </p>
                  <ul className="text-xs text-blue-700 dark:text-blue-400 list-disc list-inside mt-1">
                    <li>Sample ID</li>
                    <li>Test Name/Type</li>
                    <li>Result Value</li>
                    <li>Result Unit</li>
                    <li>Status (e.g., Complete, In Progress)</li>
                    <li>Date/Time</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Sync Configuration */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Sync Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="syncFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sync Frequency (minutes)
                </label>
                <select
                  id="syncFrequency"
                  className="w-full rounded-md border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 text-gray-900 dark:text-white"
                  value={syncFrequency}
                  onChange={(e) => setSyncFrequency(e.target.value)}
                >
                  <option value="15">Every 15 minutes</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Every hour</option>
                  <option value="360">Every 6 hours</option>
                  <option value="720">Every 12 hours</option>
                  <option value="1440">Daily</option>
                </select>
              </div>

              <div className="flex items-end">
                {isConnected ? (
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Connection Status
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm font-medium text-green-700 dark:text-green-400">
                        Connected
                      </span>
                      {lastSynced && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-3">
                          Last synced: {lastSynced}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Connection Status
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-gray-300 dark:bg-gray-600 mr-2"></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Not Connected
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            {isConnected ? (
              <button
                className="btn-primary flex items-center"
                onClick={handleSync}
                disabled={isSyncing}
              >
                {isSyncing ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <ArrowPathIcon className="h-5 w-5 mr-2" />
                    Sync Now
                  </>
                )}
              </button>
            ) : (
              <button
                className="btn-primary flex items-center"
                onClick={handleConnect}
                disabled={isConfiguring}
              >
                {isConfiguring ? (
                  <>
                    <CloudArrowUpIcon className="h-5 w-5 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <CloudArrowUpIcon className="h-5 w-5 mr-2" />
                    Connect
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Real-Time Sync Notice */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 rounded-md p-4 flex">
        <InformationCircleIcon className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
        <div>
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Real-time sync is not enabled in the MVP version.
          </p>
          <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
            Data will be synchronized based on the configured schedule, or you can trigger a manual sync when needed.
          </p>
        </div>
      </div>
    </div>
  );
} 