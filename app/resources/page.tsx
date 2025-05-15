'use client';

import { useState } from 'react';
import { 
  DocumentTextIcon, 
  DocumentArrowUpIcon, 
  FolderIcon, 
  TagIcon, 
  MagnifyingGlassIcon,
  EllipsisHorizontalIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

// Sample document data
const initialDocuments = [
  { 
    id: 1, 
    name: 'Stability_Logs_May.docx', 
    type: 'Stability', 
    tags: ['Soy', 'Line B'], 
    dateUploaded: '2024-05-14',
    uploadedBy: 'Mike Skelley'
  },
  { 
    id: 2, 
    name: 'CAPA_Findings_VendorZ.pdf', 
    type: 'CAPA', 
    tags: ['AgroHarvest', 'QMS'], 
    dateUploaded: '2024-05-13',
    uploadedBy: 'Lisa Davis'
  },
  { 
    id: 3, 
    name: 'Training_Log_Shift3.xlsx', 
    type: 'Training', 
    tags: ['Technician', 'Shift'], 
    dateUploaded: '2024-05-10',
    uploadedBy: 'Marcus Chen'
  },
  { 
    id: 4, 
    name: 'Halal_Cert_Summary_April2025.pdf', 
    type: 'Compliance', 
    tags: ['Certification'], 
    dateUploaded: '2024-05-05',
    uploadedBy: 'Mike Skelley'
  },
  { 
    id: 5, 
    name: 'DryerProtocol_LineA.pdf', 
    type: 'SOP', 
    tags: ['Process'], 
    dateUploaded: '2024-04-28',
    uploadedBy: 'Andrea Voss'
  },
];

// Available document types for filtering
const documentTypes = ['All Types', 'SOP', 'CAPA', 'Compliance', 'Training', 'Stability'];

export default function LabResources() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [isUploading, setIsUploading] = useState(false);

  // Filter documents based on search query and selected type
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = selectedType === 'All Types' || doc.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Mock function to handle document upload
  const handleUpload = () => {
    setIsUploading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newDocument = {
        id: documents.length + 1,
        name: 'Chickpea_Moisture_Protocol_Update.pdf',
        type: 'SOP',
        tags: ['Chickpea', 'Moisture', 'Update'],
        dateUploaded: new Date().toISOString().split('T')[0],
        uploadedBy: 'Mike Skelley'
      };
      
      setDocuments([newDocument, ...documents]);
      setIsUploading(false);
    }, 1500);
  };
  
  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto pt-6 px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Knowledge base</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Upload and manage lab documentation including SOPs, protocols, and compliance documents
        </p>
      </div>
      
      {/* Filters and upload */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div className="relative w-80">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents or tags..."
            className="pl-10 w-full bg-gray-50 dark:bg-[#232834] border border-gray-300 dark:border-slate-600 rounded-lg py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1DE9B6]"
          />
        </div>
        
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-gray-50 dark:bg-[#232834] border border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white rounded-lg px-3 py-2"
        >
          {documentTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        
        <div className="ml-auto">
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center gap-2 bg-[#1DE9B6] text-[#232834] px-4 py-2 rounded-lg hover:bg-[#18C39A] transition-colors disabled:opacity-50"
          >
            <DocumentArrowUpIcon className="w-5 h-5" />
            {isUploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>
      </div>
      
      {/* Document cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white dark:bg-[#232834] rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-8 w-8 text-[#1DE9B6] mr-3" />
                  <div>
                    <h3 className="text-md font-medium text-gray-900 dark:text-white truncate max-w-xs" title={doc.name}>
                      {doc.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.dateUploaded} by {doc.uploadedBy}
                    </p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <EllipsisHorizontalIcon className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-4 flex items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mr-2">
                  {doc.type}
                </span>
                
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                    >
                      <TagIcon className="h-3 w-3 mr-0.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button className="inline-flex items-center text-sm font-medium text-[#1DE9B6] hover:text-[#18C39A]">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state if no documents */}
      {filteredDocuments.length === 0 && (
        <div className="mt-4 text-center py-12">
          <FolderIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No documents found</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {searchQuery || selectedType !== 'All Types' 
              ? 'Try adjusting your filters' 
              : 'Get started by uploading documentation'}
          </p>
        </div>
      )}
    </div>
  );
} 