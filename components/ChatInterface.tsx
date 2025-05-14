'use client';

import { useState } from 'react';
import { ArrowUpIcon, PaperClipIcon, ChevronDownIcon, Cog6ToothIcon, DocumentTextIcon, BuildingStorefrontIcon, ClipboardDocumentCheckIcon, TruckIcon, CubeIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { ThumbUpIcon, ThumbDownIcon, ShareIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';

// Define message types
type MessageRole = 'user' | 'assistant' | 'system';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

// Mock data sources for the dropdown
const dataSources = [
  { id: 'lims', name: 'LIMS Data' },
  { id: 'mes', name: 'MES Data' },
  { id: 'scada', name: 'SCADA/Historian' },
  { id: 'erp', name: 'ERP System' },
  { id: 'eln', name: 'Electronic Lab Notebook' },
  { id: 'qms', name: 'Quality Management System' },
  { id: 'bms', name: 'Batch Management System' },
  { id: 'dw', name: 'Data Warehouse' },
  { id: 'dms', name: 'Document Management System' },
  { id: 'custom', name: 'Custom Dataset' },
];

// Suggested queries based on user role and context
const suggestedQueries = [
  "Show turnaround trends for the last week",
  "Detect anomalies in QC results",
  "Compare batch quality across production lines",
  "Summarize failed tests by category",
  "Predict sample volume for next month",
];

const useCases = [
  { label: 'Workflow Optimization', icon: Cog6ToothIcon },
  { label: 'Digital Notebooks', icon: BookOpenIcon },
  { label: 'Vendor Management', icon: BuildingStorefrontIcon },
  { label: 'Compliance & Audits', icon: ClipboardDocumentCheckIcon },
  { label: 'Sample Tracking', icon: DocumentTextIcon },
  { label: 'Inventory Management', icon: CubeIcon },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Hello! I\'m Galaxy AI, your laboratory assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [selectedDataSource, setSelectedDataSource] = useState(dataSources[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulate AI response (would be replaced with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I'm analyzing data from ${selectedDataSource.name} related to your query about "${input}". Here are the insights...`,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuery = (query: string) => {
    setInput(query);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Chat Input */}
      <div className="w-full max-w-4xl flex items-center bg-[#232834] rounded-2xl px-6 py-4 mb-8 border border-[#2A2F38] shadow-md">
        <PaperClipIcon className="h-5 w-5 text-[#B0B8C1] mr-3" />
        <input
          type="text"
          placeholder="Ask me about below use cases"
          className="flex-1 bg-transparent outline-none text-[#B0B8C1] placeholder-[#B0B8C1] text-base"
        />
        <button className="ml-3 flex items-center gap-2 bg-[#1DE9B6]/10 text-[#1DE9B6] px-4 py-2 rounded-xl font-medium border border-[#1DE9B6]/30 hover:bg-[#1DE9B6]/20 transition-all">
          <span className="text-sm">Choose Your Dataset</span>
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </div>
      {/* Use Case Suggestions */}
      <div className="w-full max-w-3xl flex flex-col gap-4">
        <div className="flex gap-6 justify-center">
          {useCases.slice(0, 3).map((uc) => (
            <button key={uc.label} className="flex items-center gap-2 bg-[#232834] text-[#B0B8C1] hover:bg-[#1DE9B6]/10 hover:text-[#1DE9B6] px-6 py-3 rounded-xl border border-[#2A2F38] shadow-sm transition-all">
              <uc.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{uc.label}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-6 justify-center">
          {useCases.slice(3).map((uc) => (
            <button key={uc.label} className="flex items-center gap-2 bg-[#232834] text-[#B0B8C1] hover:bg-[#1DE9B6]/10 hover:text-[#1DE9B6] px-6 py-3 rounded-xl border border-[#2A2F38] shadow-sm transition-all">
              <uc.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{uc.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 