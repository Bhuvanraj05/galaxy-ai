'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  DocumentIcon, 
  ArrowPathIcon,
  ChevronRightIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import ImportModal from '@/components/data-stores/ImportModal';

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
      action: 'Syncing'
    },
    {
      name: 'Protein_Failure_Report_Q2.csv',
      entries: 780,
      lastSynced: '2 hrs ago',
      status: 'Ready',
      action: 'Ask Galaxy AI'
    },
    {
      name: 'Moisture_Tests_LineB_April.csv',
      entries: 620,
      lastSynced: '20 mins ago',
      status: 'Ready',
      action: 'Ask Galaxy AI'
    }
  ],
  dms: [
    {
      name: 'SOP_MoistureAnalysis_V2.pdf',
      entries: 1,
      lastSynced: '25 mins ago',
      status: 'Ready',
      action: 'Ask Galaxy AI'
    },
    {
      name: 'Halal_Cert_Summary_April2025.pdf',
      entries: 1,
      lastSynced: '30 mins ago',
      status: 'Ready',
      action: 'View in Canvas'
    },
    {
      name: 'CAPA_Template_VendorDeviation.docx',
      entries: 1,
      lastSynced: '1 hr ago',
      status: 'Ready',
      action: 'Add to Audit Prep'
    }
  ],
  lims: [
    {
      name: 'GPC_LIMS_Chickpea_QA_May.csv',
      entries: 3200,
      lastSynced: '10 mins ago',
      status: 'Ready',
      action: 'Ask Galaxy AI'
    },
    {
      name: 'Protein_Failure_Report_Q2.csv',
      entries: 530,
      lastSynced: '8 mins ago',
      status: 'Ready',
      action: 'Ask Galaxy AI'
    }
  ],
  // Add mock data for other sources as needed
};

export default function DataStores() {
  const router = useRouter();
  const [activeSource, setActiveSource] = useState('mes');
  const [isUploading, setIsUploading] = useState(false);
  const [datasets, setDatasets] = useState(mockDatasets);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [canvasData, setCanvasData] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);

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
    setShowImportModal(true);
  };

  const handleImportComplete = (importData: any) => {
    setIsUploading(true);
    showToast('Import started successfully');

    // Simulate import process
    setTimeout(() => {
      try {
        const newDataset = {
          name: `Imported_Data_${new Date().getTime()}.csv`,
          entries: Math.floor(Math.random() * 1000) + 100,
          lastSynced: 'Just now',
          status: 'Syncing',
          action: 'Syncing'
        };

        setDatasets({
          ...datasets,
          [activeSource]: [newDataset, ...(datasets[activeSource as keyof typeof datasets] || [])]
        });

        // Change status after "sync" completes
        setTimeout(() => {
          setDatasets(prev => ({
            ...prev,
            [activeSource]: prev[activeSource as keyof typeof datasets].map(ds => 
              ds.name === newDataset.name 
                ? { ...ds, status: 'Ready', action: 'Analyze' }
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
          // Navigate to chat screen with dataset context
          router.push(`/ask?dataset=${encodeURIComponent(dataset.name)}`);
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
    switch (status) {
      case 'Ready':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00C4A7]/10 text-[#00C4A7]">
            Ready
          </span>
        );
      case 'Syncing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FFB547]/10 text-[#FFB547]">
            <ArrowPathIcon className="w-3 h-3 mr-1 animate-spin" />
            Syncing
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4F46E5]/10 text-[#4F46E5]">
            <ArrowPathIcon className="w-3 h-3 mr-1 animate-spin" />
            Processing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-400/10 text-gray-400">
            {status}
          </span>
        );
    }
  };

  const getActionButton = (dataset: any) => {
    switch (dataset.action) {
      case 'Ask Galaxy AI':
        return (
          <button
            onClick={() => handleDatasetAction(dataset, 'Ask Galaxy AI')}
            className="flex items-center justify-center gap-2 bg-[#00C4A7]/10 text-[#00C4A7] px-3 py-1.5 rounded-lg hover:bg-[#00C4A7]/20 transition-colors text-sm font-medium w-[140px]"
          >
            Ask Galaxy AI
          </button>
        );
      case 'View in Canvas':
        return (
          <button
            onClick={() => handleDatasetAction(dataset, 'View in Canvas')}
            className="flex items-center justify-center gap-2 bg-[#4F46E5]/10 text-[#4F46E5] px-3 py-1.5 rounded-lg hover:bg-[#4F46E5]/20 transition-colors text-sm font-medium w-[140px]"
          >
            View in Canvas
          </button>
        );
      case 'Add to Audit Prep':
        return (
          <button
            onClick={() => handleDatasetAction(dataset, 'Add to Audit Prep')}
            className="flex items-center justify-center gap-2 bg-[#FFB547]/10 text-[#FFB547] px-3 py-1.5 rounded-lg hover:bg-[#FFB547]/20 transition-colors text-sm font-medium w-[140px]"
          >
            Add to Audit Prep
          </button>
        );
      case 'Syncing':
      case 'Processing':
        return (
          <span className="inline-flex items-center justify-center w-[140px]">
            <ArrowPathIcon className="w-5 h-5 text-gray-400 animate-spin" />
          </span>
        );
      default:
        return (
          <button
            onClick={() => handleDatasetAction(dataset, dataset.action)}
            className="flex items-center justify-center gap-2 bg-[#00C4A7]/10 text-[#00C4A7] px-3 py-1.5 rounded-lg hover:bg-[#00C4A7]/20 transition-colors text-sm font-medium w-[140px]"
          >
            {dataset.action}
          </button>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#121620] p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[32px] font-semibold text-white mb-2">Data Stores</h1>
          <p className="text-[#B0B8C1]">Import and analyze your datasets</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center gap-2 bg-[#00C4A7] text-white px-4 py-2 rounded-xl hover:bg-[#00C4A7]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CloudArrowUpIcon className="h-5 w-5" />
            <span>Upload Dataset</span>
          </button>
          <button
            onClick={handleImport}
            disabled={isUploading}
            className="flex items-center gap-2 bg-[#4F46E5] text-white px-4 py-2 rounded-xl hover:bg-[#4F46E5]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <DocumentArrowDownIcon className="h-5 w-5" />
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* Data source tabs */}
      <div className="flex gap-2 mb-6">
        {dataSources.map((source) => (
          <button
            key={source.id}
            onClick={() => handleSourceChange(source.id)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSource === source.id
                ? 'bg-[#00C4A7] text-white'
                : 'text-[#B0B8C1] hover:bg-[#1A1F2E]'
            }`}
          >
            {source.name}
          </button>
        ))}
      </div>

      {/* Dataset table */}
      <div className="bg-[#1A1F2E] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#2A2F38]">
              <th className="text-left py-4 px-6 text-[#B0B8C1] font-medium">DATASET NAME</th>
              <th className="text-left py-4 px-6 text-[#B0B8C1] font-medium">ENTRIES</th>
              <th className="text-left py-4 px-6 text-[#B0B8C1] font-medium">LAST SYNCED</th>
              <th className="text-left py-4 px-6 text-[#B0B8C1] font-medium">STATUS</th>
              <th className="text-right py-4 px-6 text-[#B0B8C1] font-medium">ACTIONS</th>
              <th className="w-16"></th> {/* Empty header for preview icon */}
            </tr>
          </thead>
          <tbody>
            {(datasets[activeSource as keyof typeof datasets] || []).map((dataset, index) => (
              <tr key={index} className="border-b border-[#2A2F38] last:border-0">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <DocumentIcon className="h-5 w-5 text-[#B0B8C1]" />
                    <span className="text-white">{dataset.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-[#B0B8C1]">{dataset.entries}</td>
                <td className="py-4 px-6 text-[#B0B8C1]">{dataset.lastSynced}</td>
                <td className="py-4 px-6">{getStatusBadge(dataset.status)}</td>
                <td className="py-4 px-6 text-right">
                  {getActionButton(dataset)}
                </td>
                <td className="py-4 px-6 w-16 text-center">
                  <button
                    onClick={() => handleViewDetails(dataset)}
                    className="p-1.5 text-[#B0B8C1] hover:text-[#00C4A7] transition-colors"
                    title="Preview Dataset"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* File input (hidden) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".csv,.xlsx,.json,.pdf,.docx"
      />

      {/* Import Modal */}
      <ImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImportComplete}
      />

      {/* Toast notification */}
      {toastVisible && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${
          toastType === 'success' ? 'bg-[#00C4A7]' : 'bg-red-500'
        }`}>
          {toastMessage}
        </div>
      )}
    </div>
  );
} 