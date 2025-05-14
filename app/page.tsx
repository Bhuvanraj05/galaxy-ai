'use client';

import React, { useState, useRef, useEffect, JSX } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronDownIcon,
  PaperClipIcon,
  ChartBarIcon,       // For Workflow Optimization
  BookOpenIcon,       // For Digital Notebooks
  BuildingStorefrontIcon, // For Vendor Management
  ClipboardDocumentCheckIcon, // For Compliance & Audits
  TagIcon,            // For Sample Tracking
  CubeIcon            // For Inventory Management
} from '@heroicons/react/24/outline';

// Interface for query categories
interface QueryCategory {
  id: string;
  name: string;
  icon: JSX.Element;
  prompts: string[];
}

// Define query categories
const queryCategories: QueryCategory[] = [
  {
    id: 'workflow',
    name: 'Workflow Optimization',
    icon: <ChartBarIcon className="h-4 w-4" />,
    prompts: [
      'How can I optimize my sample processing workflow?',
      'What are the bottlenecks in my current process?',
      'Suggest improvements for my testing procedure'
    ]
  },
  {
    id: 'notebooks',
    name: 'Digital Notebooks',
    icon: <BookOpenIcon className="h-4 w-4" />,
    prompts: [
      'Help me organize my experiment notes',
      'How to structure my research documentation?',
      'Best practices for digital lab notebooks'
    ]
  },
  {
    id: 'vendor',
    name: 'Vendor Management',
    icon: <BuildingStorefrontIcon className="h-4 w-4" />,
    prompts: [
      'Compare supplier quality metrics',
      'Analyze vendor performance trends',
      'Optimize supplier selection process'
    ]
  },
  {
    id: 'compliance',
    name: 'Compliance & Audits',
    icon: <ClipboardDocumentCheckIcon className="h-4 w-4" />,
    prompts: [
      'Check regulatory compliance status',
      'Prepare for upcoming audit',
      'Review compliance history'
    ]
  },
  {
    id: 'samples',
    name: 'Sample Tracking',
    icon: <TagIcon className="h-4 w-4" />,
    prompts: [
      'Track sample location and status',
      'Monitor sample stability data',
      'Review sample testing history'
    ]
  },
  {
    id: 'inventory',
    name: 'Inventory Management',
    icon: <CubeIcon className="h-4 w-4" />,
    prompts: [
      'Check reagent stock levels',
      'Predict inventory needs',
      'Optimize storage allocation'
    ]
  }
];

// Mock chat message type (if you plan to extend to a full chat later)
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

// Add file type interface
interface AttachedFile {
  name: string;
  size: number;
  type: string;
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]); // For actual chat messages
  const [input, setInput] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('Sample_data.xlsx');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null); // If you add a message list
  const inputRef = useRef<HTMLInputElement>(null);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If you implement a message list, this helps scroll
    if (messages.length) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    // Handle clicks outside dropdowns
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Create user message with dataset context
    const userMessage: ChatMessage = { 
      role: 'user', 
      content: input,
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and suggestions
    setInput('');
    setShowSuggestions(false);
    
    // Simulate AI response with more context
    setTimeout(() => {
      const aiResponse: ChatMessage = { 
        role: 'assistant', 
        content: `I'm analyzing your query: "${input}" using the dataset ${selectedDataset}. Based on the selected category ${activeCategoryId ? `(${queryCategories.find(c => c.id === activeCategoryId)?.name})` : ''}, here's what I found...`
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // Scroll to bottom after new message
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  const handleCategorySelect = (categoryId: string) => {
    if (activeCategoryId === categoryId) {
      // Optional: Deselect if the same category is clicked again
      // setActiveCategoryId(null);
      // setShowSuggestions(false);
    } else {
      setActiveCategoryId(categoryId);
      setShowSuggestions(false); // Suggestions will appear on input focus
      setInput(''); 
    }
    inputRef.current?.focus(); // Focus the input field, its onFocus will handle suggestions
  };

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleDatasetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDataset(event.target.value);
    // Optionally, you might want to close suggestions or reset the category
    // setShowSuggestions(false);
    // setActiveCategoryId(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: AttachedFile[] = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setAttachedFiles(prev => [...prev, ...newFiles]);
      
      // Add file names to input
      const fileNames = newFiles.map(f => f.name).join(', ');
      setInput(prev => prev + (prev ? ' ' : '') + `[Attached: ${fileNames}]`);
    }
  };

  const currentPrompts = queryCategories.find((c: QueryCategory) => c.id === activeCategoryId)?.prompts || [];

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[#121620] text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-[#00C4A7] mb-12">Ask Galaxy AI</h1>

      {/* Input field and Dataset Selector Area */}
      <div className="w-full max-w-3xl mb-6 relative" ref={dropdownRef}>
        <div className="flex items-center bg-[#232834] rounded-xl px-4 py-1 border border-[#2A2F38] shadow-lg">
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            multiple
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="focus:outline-none"
          >
            <PaperClipIcon className="h-5 w-5 text-[#B0B8C1] mr-3 hover:text-[#00C4A7] transition-colors" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => {
              if (activeCategoryId && currentPrompts.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} // Hide suggestions on blur, with delay for click
            placeholder={activeCategoryId ? "Select a prompt or type your query" : "Ask me about below use cases"}
            className="flex-1 bg-transparent py-3 text-[#B0B8C1] placeholder-[#B0B8C1] text-sm focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Send on Enter key
          />
          <div className="relative ml-3">
            <button 
              className="flex items-center gap-2 bg-[#00C4A7]/10 text-[#00C4A7] px-3 py-2 rounded-lg font-medium border border-[#00C4A7]/30 hover:bg-[#00C4A7]/20 transition-all text-xs"
              onClick={(e) => {(e.currentTarget.nextSibling as HTMLSelectElement)?.click()}} // Programmatically click the hidden select
            >
              <span>{selectedDataset || 'Choose Dataset'}</span>
              <ChevronDownIcon className="h-3 w-3" />
            </button>
            <select 
              value={selectedDataset}
              onChange={handleDatasetChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Choose Your Dataset"
            >
              <option value="Sample_data.xlsx">Sample_data.xlsx</option>
              <option value="GPC_Chickpea_QA_May.csv">GPC_Chickpea_QA_May.csv</option>
              <option value="Test-batch-002.csv">Test-batch-002.csv</option>
            </select>
          </div>
        </div>

        {/* Prompt Suggestions Dropdown */}
        {showSuggestions && activeCategoryId && currentPrompts.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 w-full bg-[#232834] rounded-xl border border-[#2A2F38] shadow-lg z-10 max-h-60 overflow-y-auto">
            <ul className="py-1">
              {currentPrompts.map((prompt: string, idx: number) => (
                <li key={idx}>
                  <button
                    onMouseDown={() => handlePromptSelect(prompt)} // Use onMouseDown to register click before blur
                    className="w-full text-left px-4 py-2.5 text-sm text-[#B0B8C1] hover:bg-[#2A2F38] flex items-center gap-3"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4 text-[#B0B8C1] flex-shrink-0" />
                    <span>{prompt}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Category suggestion pills - always visible */}
      <div className="w-full max-w-3xl">
        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
          {queryCategories.map((category: QueryCategory) => {
            const isActive = activeCategoryId === category.id;
            // Clone the icon to apply active color if needed
            const iconWithColor = React.cloneElement(category.icon, {
              className: `h-4 w-4 ${isActive ? 'text-[#00C4A7]' : 'text-[#B0B8C1]'}`
            });
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border shadow-sm transition-all justify-start text-xs font-medium
                  ${isActive 
                    ? 'bg-[#00C4A7]/10 text-[#00C4A7] border-[#00C4A7]/50'
                    : 'bg-[#232834] text-[#B0B8C1] border-[#2A2F38] hover:bg-[#2A2F38]'}`}
              >
                {iconWithColor} 
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Message Display Area */}
      {messages.length > 0 && (
        <div className="w-full max-w-3xl mt-8 space-y-4 overflow-y-auto max-h-[400px] custom-scrollbar">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  message.role === 'assistant'
                    ? 'bg-[#232834] text-[#B0B8C1]'
                    : 'bg-[#00C4A7]/10 text-[#00C4A7]'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} /> {/* Scroll anchor */}
        </div>
      )}
    </div>
  );
} 