'use client';

import { useState, useRef } from 'react';
import { 
  DocumentIcon, 
  ArrowPathIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';

// Data source tabs
const dataSources = [
  { id: 'lims', name: 'LIMS' },
  { id: 'mes', name: 'MES' },
  { id: 'eln', name: 'ELN' },
  { id: 'scada', name: 'SCADA' },
  { id: 'qms', name: 'QMS' },
  { id: 'dms', name: 'DMS' }
];

// Mock data for different sources
const mockDatasets = {
  mes: [
    {
      name: 'MES_ProdRuns_LineA_May.json',
      entries: 3200,
      lastSynced: '15 mins ago',
      status: 'Syncing',
      aiReadiness: 'AI Linking',
      action: 'Syncing'
    },
    {
      name: 'Protein_Failure_Report_Q2.csv',
      entries: 780,
      lastSynced: '2 hrs ago',
      status: 'Ready',
      aiReadiness: 'AI Ready',
      action: 'Ask Galaxy AI'
    },
    {
      name: 'Moisture_Tests_LineB_April.csv',
      entries: 620,
      lastSynced: '20 mins ago',
      status: 'Ready',
      aiReadiness: 'AI Ready',
      action: 'Ask Galaxy AI'
    }
  ],
  dms: [
    {
      name: 'SOP_MoistureAnalysis_V2.pdf',
      entries: 1,
      lastSynced: '25 mins ago',
      status: 'Ready',
      aiReadiness: 'RAG Ready',
      action: 'Ask Galaxy AI'
    },
    {
      name: 'Halal_Cert_Summary_April2025.pdf',
      entries: 1,
      lastSynced: '30 mins ago',
      status: 'Ready',
      aiReadiness: 'Compilation Tag',
      action: 'View in Canvas'
    },
    {
      name: 'CAPA_Template_VendorDeviation.docx',
      entries: 1,
      lastSynced: '1 hr ago',
      status: 'Ready',
      aiReadiness: 'Editable',
      action: 'Add to Audit Prep'
    }
  ],
  lims: [
    {
      name: 'GPC_LIMS_Chickpea_QA_May.csv',
      entries: 3200,
      lastSynced: '10 mins ago',
      status: 'Ready',
      aiReadiness: 'AI Ready',
      action: 'Ask Galaxy AI'
    },
    {
      name: 'Protein_Failure_Report_Q2.csv',
      entries: 530,
      lastSynced: '8 mins ago',
      status: 'Ready',
      aiReadiness: 'AI Ready',
      action: 'Ask Galaxy AI'
    }
  ],
  // Add mock data for other sources as needed
};

export default function DataStores() {
  const [activeSource, setActiveSource] = useState('mes');
  const [isUploading, setIsUploading] = useState(false);
  const [datasets, setDatasets] = useState(mockDatasets);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [canvasData, setCanvasData] = useState(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  // Handle file upload
  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    // Validate file types
    const allowedTypes = ['.csv', '.xlsx', '.json', '.pdf', '.docx'];
    const invalidFiles = Array.from(files).filter(file => 
      !allowedTypes.some(type => file.name.toLowerCase().endsWith(type))
    );

    if (invalidFiles.length > 0) {
      showToast(`Invalid file type(s): ${invalidFiles.map(f => f.name).join(', ')}`, 'error');
      return;
    }

    setIsUploading(true);
    
    // Simulate file upload process
    setTimeout(() => {
      try {
        const newDatasets = [...(datasets[activeSource as keyof typeof datasets] || [])];
        
        Array.from(files).forEach(file => {
          newDatasets.unshift({
            name: file.name,
            entries: Math.floor(Math.random() * 1000) + 100,
            lastSynced: 'Just now',
            status: 'Ready',
            aiReadiness: 'AI Ready',
            action: 'Analyze'
          });
        });

        setDatasets({
          ...datasets,
          [activeSource]: newDatasets
        });
        showToast(`Successfully uploaded ${files.length} file(s)`);
      } catch (error) {
        showToast('Failed to upload files', 'error');
      } finally {
        setIsUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }, 2000);
  };

  // Handle import from external source
  const handleImport = () => {
    if (isUploading) return;
    
    setIsUploading(true);
    
    // Simulate import process
    setTimeout(() => {
      try {
        const newDataset = {
          name: `Imported_Data_${new Date().getTime()}.csv`,
          entries: Math.floor(Math.random() * 1000) + 100,
          lastSynced: 'Just now',
          status: 'Syncing',
          aiReadiness: 'AI Linking',
          action: 'Syncing'
        };

        setDatasets({
          ...datasets,
          [activeSource]: [newDataset, ...(datasets[activeSource as keyof typeof datasets] || [])]
        });

        showToast('Import started successfully');

        // Change status after "sync" completes
        setTimeout(() => {
          setDatasets(prev => ({
            ...prev,
            [activeSource]: prev[activeSource as keyof typeof datasets].map(ds => 
              ds.name === newDataset.name 
                ? { ...ds, status: 'Ready', aiReadiness: 'AI Ready', action: 'Analyze' }
                : ds
            )
          }));
          showToast('Import completed successfully');
        }, 3000);
      } catch (error) {
        showToast('Failed to import data', 'error');
      } finally {
        setIsUploading(false);
      }
    }, 1500);
  };

  // Handle dataset actions
  const handleDatasetAction = (dataset: any, action: string) => {
    try {
      switch (action) {
        case 'Analyze':
        case 'Ask Galaxy AI':
          // Simulate analysis process
          setDatasets(prev => ({
            ...prev,
            [activeSource]: prev[activeSource as keyof typeof datasets].map(ds =>
              ds.name === dataset.name
                ? { ...ds, status: 'Processing', action: 'Processing' }
                : ds
            )
          }));

          showToast(`Started analysis for ${dataset.name}`);

          setTimeout(() => {
            setDatasets(prev => ({
              ...prev,
              [activeSource]: prev[activeSource as keyof typeof datasets].map(ds =>
                ds.name === dataset.name
                  ? { ...ds, status: 'Ready', action: 'Ask Galaxy AI' }
                  : ds
              )
            }));
            showToast(`Analysis completed for ${dataset.name}`);
          }, 2000);
          break;

        case 'View in Canvas':
          setCanvasData(dataset);
          setIsCanvasOpen(true);
          showToast('Opening in Canvas view');
          break;

        case 'Add to Audit Prep':
          setDatasets(prev => ({
            ...prev,
            [activeSource]: prev[activeSource as keyof typeof datasets].map(ds =>
              ds.name === dataset.name
                ? { ...ds, status: 'Added to Audit', action: 'View in Audit' }
                : ds
            )
          }));
          showToast('Added to Audit Prep');
          break;

        default:
          showToast(`Action not implemented: ${action}`, 'error');
      }
    } catch (error) {
      showToast(`Failed to perform action: ${action}`, 'error');
    }
  };

  // Handle source change
  const handleSourceChange = (sourceId: string) => {
    if (sourceId === activeSource) return;
    setActiveSource(sourceId);
    showToast(`Switched to ${sourceId.toUpperCase()} data source`);
  };

  // Handle details view
  const handleViewDetails = (dataset: any) => {
    window.open(`/dataset/${encodeURIComponent(dataset.name)}`, '_blank');
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'Ready':
        return (
          <span className={`${baseClasses} bg-[#00C4A7]/10 text-[#00C4A7]`}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00C4A7]" />
            Ready
          </span>
        );
      case 'Syncing':
        return (
          <span className={`${baseClasses} bg-blue-500/10 text-blue-500`}>
            <ArrowPathIcon className="w-3 h-3 animate-spin" />
            Syncing
          </span>
        );
      default:
        return null;
    }
  };

  const getAIReadinessBadge = (readiness: string) => {
    const baseClasses = "px-2 py-0.5 rounded-full text-xs font-medium";
    switch (readiness) {
      case 'AI Ready':
        return <span className={`${baseClasses} bg-[#00C4A7]/10 text-[#00C4A7]`}>AI Ready</span>;
      case 'AI Linking':
        return <span className={`${baseClasses} bg-blue-500/10 text-blue-500`}>AI Linking</span>;
      case 'RAG Ready':
        return <span className={`${baseClasses} bg-purple-500/10 text-purple-500`}>RAG Ready</span>;
      case 'Compilation Tag':
        return <span className={`${baseClasses} bg-orange-500/10 text-orange-500`}>Compilation Tag</span>;
      case 'Editable':
        return <span className={`${baseClasses} bg-gray-500/10 text-gray-400`}>Editable</span>;
      default:
        return null;
    }
  };

  const getActionButton = (dataset: any) => {
    const baseClasses = "px-3 py-1.5 rounded-lg text-xs font-medium transition-all";
    switch (dataset.action) {
      case 'Analyze':
        return (
          <button 
            className={`${baseClasses} bg-[#00C4A7] text-white hover:bg-[#00C4A7]/90`}
            onClick={() => handleDatasetAction(dataset, 'Analyze')}
          >
            Analyze
          </button>
        );
      case 'Ask Galaxy AI':
        return (
          <button 
            className={`${baseClasses} bg-[#00C4A7] text-white hover:bg-[#00C4A7]/90`}
            onClick={() => handleDatasetAction(dataset, 'Ask Galaxy AI')}
          >
            Ask Galaxy AI
          </button>
        );
      case 'Syncing':
      case 'Processing':
        return (
          <button className={`${baseClasses} bg-[#00C4A7]/10 text-[#00C4A7]`} disabled>
            <ArrowPathIcon className="w-4 h-4 animate-spin" />
          </button>
        );
      case 'View in Canvas':
        return (
          <button 
            className={`${baseClasses} bg-[#00C4A7] text-white hover:bg-[#00C4A7]/90`}
            onClick={() => handleDatasetAction(dataset, 'View in Canvas')}
          >
            View in Canvas
          </button>
        );
      case 'Add to Audit Prep':
        return (
          <button 
            className={`${baseClasses} bg-[#00C4A7] text-white hover:bg-[#00C4A7]/90`}
            onClick={() => handleDatasetAction(dataset, 'Add to Audit Prep')}
          >
            Add to Audit Prep
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-[#121620] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          multiple
          accept=".csv,.xlsx,.json,.pdf,.docx"
        />

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Data Stores</h1>
            <p className="text-gray-400">Import and analyze your datasets</p>
          </div>
          <div className="flex gap-3">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00C4A7] text-white hover:bg-[#00C4A7]/90 transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
              ) : (
                <CloudArrowUpIcon className="w-5 h-5" />
              )}
              {isUploading ? 'Uploading...' : 'Upload Dataset'}
            </button>
            <button 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleImport}
              disabled={isUploading}
            >
              {isUploading ? (
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
              ) : (
                <DocumentArrowDownIcon className="w-5 h-5" />
              )}
              {isUploading ? 'Importing...' : 'Import'}
            </button>
          </div>
        </div>

        {/* Data Source Tabs */}
        <div className="bg-[#1A1F2E] rounded-xl p-1 mb-6">
          <div className="flex justify-between">
            {dataSources.map((source) => (
              <button
                key={source.id}
                className={`w-[120px] px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSource === source.id
                    ? 'bg-[#00C4A7] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => handleSourceChange(source.id)}
              >
                {source.name}
              </button>
            ))}
          </div>
        </div>

        {/* Dataset Table */}
        <div className="bg-[#1A1F2E] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2F38]">
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">DATASET NAME</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">ENTRIES</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">LAST SYNCED</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">STATUS</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">AI READINESS</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">ACTIONS</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {datasets[activeSource as keyof typeof datasets]?.map((dataset, index) => (
                <tr
                  key={dataset.name}
                  className="border-b border-[#2A2F38] last:border-0 hover:bg-[#232834] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <DocumentIcon className="w-5 h-5 text-gray-400" />
                      <span className="text-white text-sm">{dataset.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{dataset.entries}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{dataset.lastSynced}</td>
                  <td className="px-6 py-4">{getStatusBadge(dataset.status)}</td>
                  <td className="px-6 py-4">{getAIReadinessBadge(dataset.aiReadiness)}</td>
                  <td className="px-6 py-4">{getActionButton(dataset)}</td>
                  <td className="px-6 py-4">
                    <button 
                      className="text-gray-400 hover:text-white transition-colors"
                      onClick={() => handleViewDetails(dataset)}
                    >
                      <ChevronRightIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 