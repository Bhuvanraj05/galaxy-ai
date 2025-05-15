'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';

// Define the valid categories type
type CategoryType = 'Analysis' | 'Safety' | 'Equipment' | 'Quality';

// Define document interface
interface Document {
  id: number;
  title: string;
  type: string;
  dateAdded: string;
  category: string;
  status: string;
}

// Mock data for documents
const documents: Document[] = [
  {
    id: 1,
    title: 'Standard Operating Procedure - Sample Analysis',
    type: 'SOP',
    dateAdded: '2024-04-15',
    category: 'Analysis',
    status: 'Active'
  },
  {
    id: 2,
    title: 'Material Safety Data Sheet - Reagent X',
    type: 'MSDS',
    dateAdded: '2024-04-10',
    category: 'Safety',
    status: 'Active'
  },
  {
    id: 3,
    title: 'Lab Equipment Calibration Guide',
    type: 'Guide',
    dateAdded: '2024-03-22',
    category: 'Equipment',
    status: 'Active'
  },
  {
    id: 4,
    title: 'Quality Assurance Protocol',
    type: 'Protocol',
    dateAdded: '2024-03-15',
    category: 'Quality',
    status: 'Active'
  },
  {
    id: 5,
    title: 'Contamination Control Procedure',
    type: 'SOP',
    dateAdded: '2024-02-28',
    category: 'Safety',
    status: 'Active'
  }
];

// Categories with counts
const categories = [
  { name: 'All', count: 25 },
  { name: 'SOPs', count: 8 },
  { name: 'MSDS', count: 5 },
  { name: 'Guides', count: 4 },
  { name: 'Protocols', count: 6 },
  { name: 'Reports', count: 2 }
];

export default function LabResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showCustomCategory, setShowCustomCategory] = useState(false);

  // Get category badge style
  const getCategoryStyle = (category: string): string => {
    const categoryStyles = {
      'Analysis': 'bg-teal-950 text-teal-400',
      'Safety': 'bg-red-950 text-red-400',
      'Equipment': 'bg-blue-950 text-blue-400',
      'Quality': 'bg-purple-950 text-purple-400'
    } as const;

    return (categoryStyles as Record<string, string>)[category] || 'bg-gray-950 text-gray-400';
  };

  // Filter documents based on search and category
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.type === selectedCategory.slice(0, -1);
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#121620] p-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-white">Knowledge base</h1>
            <p className="text-gray-400 text-sm mt-1">Train Galaxy AI with your Knowledge base</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors"
          >
            <ArrowUpTrayIcon className="h-4 w-4" />
            Upload Documents
          </button>
        </div>

        <div className="flex gap-6">
          {/* Categories Sidebar */}
          <div className="w-64 bg-[#1A1F2E] rounded-xl p-6">
            <h2 className="text-white text-lg font-medium mb-4">Categories</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.name
                      ? 'bg-[#232834] text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="bg-[#232834] px-2 py-0.5 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Documents List */}
          <div className="flex-1">
            <div className="mb-6">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1A1F2E] text-white pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                />
              </div>
            </div>

            <div className="bg-[#1A1F2E] rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#232834]">
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Title</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Type</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Date Added</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Category</th>
                    <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="border-b border-[#232834] last:border-0">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-[#00C4A7]">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V5C5 4.45 5.196 3.979 5.588 3.587C5.98 3.195 6.45067 2.99933 7 3H17C17.55 3 18.021 3.196 18.413 3.588C18.805 3.98 19.0007 4.45067 19 5V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7Z" fill="currentColor"/>
                            </svg>
                          </span>
                          <span className="text-white text-sm">{doc.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-sm">{doc.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-sm">{doc.dateAdded}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-sm ${getCategoryStyle(doc.category)}`}>
                          {doc.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[#00C4A7] text-sm">{doc.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-[#1A1F2E] rounded-xl w-[480px] p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white text-xl font-medium">Upload Documents</h2>
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setShowCustomCategory(false);
                    setCustomCategory('');
                    setDocumentType('');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <ArrowUpTrayIcon className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                  <p className="text-white text-sm mb-2">Drag and drop files here</p>
                  <p className="text-gray-400 text-xs">or</p>
                  <button className="mt-4 px-4 py-2 bg-[#232834] text-white rounded-lg text-sm hover:bg-[#2A2F38] transition-colors">
                    Browse Files
                  </button>
                </div>

                <div>
                  <label className="block text-white text-sm mb-2">Document Type</label>
                  <select 
                    value={documentType}
                    onChange={(e) => {
                      setDocumentType(e.target.value);
                      setShowCustomCategory(e.target.value === 'Other');
                      if (e.target.value !== 'Other') {
                        setCustomCategory('');
                      }
                    }}
                    className="w-full bg-[#232834] text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                  >
                    <option value="">Select type...</option>
                    <option value="SOP">SOP</option>
                    <option value="MSDS">MSDS</option>
                    <option value="Guide">Guide</option>
                    <option value="Protocol">Protocol</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {showCustomCategory && (
                  <div className="space-y-2">
                    <label className="block text-white text-sm">Custom Category Name</label>
                    <input
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      placeholder="Enter custom category name"
                      className="w-full bg-[#232834] text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#00C4A7]"
                    />
                    <p className="text-gray-400 text-xs">
                      Please enter a descriptive name for your custom category
                    </p>
                  </div>
                )}

                <button 
                  className={`w-full py-2 rounded-lg text-sm transition-colors ${
                    (!documentType || (showCustomCategory && !customCategory))
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'bg-[#00C4A7] text-white hover:bg-[#00C4A7]/90'
                  }`}
                  disabled={!documentType || (showCustomCategory && !customCategory)}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 