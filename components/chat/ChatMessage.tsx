import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  HandThumbUpIcon, 
  HandThumbDownIcon, 
  ClipboardIcon, 
  ArrowPathIcon,
  CheckIcon,
  DocumentPlusIcon,
  ChevronDownIcon,
  FolderPlusIcon,
  ShareIcon
} from '@heroicons/react/24/outline';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
  onRegenerate?: () => void;
  onCopy?: () => void;
  onFeedback?: (type: 'like' | 'dislike') => void;
}

// Mock data for existing reports - replace with actual data
const existingReports = [
  { id: 1, name: 'Q1 Analysis Report', lastEdited: '2 days ago' },
  { id: 2, name: 'Equipment Maintenance Summary', lastEdited: '1 week ago' },
  { id: 3, name: 'Safety Compliance Review', lastEdited: '2 weeks ago' },
  { id: 4, name: 'Monthly Quality Metrics', lastEdited: '1 month ago' },
];

export default function ChatMessage({
  content,
  role,
  timestamp,
  onRegenerate,
  onCopy,
  onFeedback
}: ChatMessageProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);
  const [showReportOptions, setShowReportOptions] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowReportOptions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleFeedback = (type: 'like' | 'dislike') => {
    if (feedback === type) {
      setFeedback(null);
    } else {
      setFeedback(type);
      onFeedback?.(type);
    }
  };

  const handleNewReport = () => {
    localStorage.setItem('newReportContent', content);
    router.push('/reports?new=true');
    setShowReportOptions(false);
  };

  const handleAddToExistingReport = (reportId: number) => {
    // Store the content and report ID in localStorage
    localStorage.setItem('reportContent', content);
    localStorage.setItem('targetReportId', reportId.toString());
    // Navigate to the report page
    router.push(`/reports?edit=${reportId}`);
    setShowReportOptions(false);
  };

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`
          max-w-[80%] rounded-xl px-4 py-3
          ${role === 'user' 
            ? 'bg-[#00C4A7] text-white' 
            : 'bg-[#1A1F2E] text-gray-200'
          }
        `}
      >
        <p className="text-sm whitespace-pre-wrap">{content}</p>
        
        {timestamp && (
          <p className="text-xs mt-2 opacity-60">
            {new Date(timestamp).toLocaleTimeString()}
          </p>
        )}

        {role === 'assistant' && (
          <div className="mt-4 flex items-center gap-2 border-t border-[#2A2F38] pt-4">
            <button 
              onClick={() => handleFeedback('like')}
              className={`p-2 rounded-lg transition-colors ${
                feedback === 'like' 
                  ? 'bg-[#00C4A7]/20 text-[#00C4A7]' 
                  : 'hover:bg-[#2A2F38] text-gray-400'
              }`}
              aria-label="Like response"
            >
              <HandThumbUpIcon className="h-5 w-5" />
            </button>
            
            <button 
              onClick={() => handleFeedback('dislike')}
              className={`p-2 rounded-lg transition-colors ${
                feedback === 'dislike' 
                  ? 'bg-red-500/20 text-red-500' 
                  : 'hover:bg-[#2A2F38] text-gray-400'
              }`}
              aria-label="Dislike response"
            >
              <HandThumbDownIcon className="h-5 w-5" />
            </button>

            <button 
              onClick={handleCopy}
              className={`p-2 rounded-lg transition-colors ${
                copied 
                  ? 'bg-[#00C4A7]/20 text-[#00C4A7]' 
                  : 'hover:bg-[#2A2F38] text-gray-400'
              }`}
              aria-label="Copy to clipboard"
            >
              {copied ? <CheckIcon className="h-5 w-5" /> : <ClipboardIcon className="h-5 w-5" />}
            </button>

            <button 
              onClick={onRegenerate}
              className="p-2 hover:bg-[#2A2F38] rounded-lg transition-colors text-gray-400"
              aria-label="Regenerate response"
            >
              <ArrowPathIcon className="h-5 w-5" />
            </button>

            <div className="relative ml-auto" ref={dropdownRef}>
              <button
                onClick={() => setShowReportOptions(!showReportOptions)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-[#232834] text-white hover:bg-[#2A2F38] transition-colors"
              >
                <DocumentPlusIcon className="h-5 w-5" />
                Add to Report
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {showReportOptions && (
                <div 
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-72 bg-[#232834] rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50"
                >
                  <div className="p-2">
                    <button
                      onClick={handleNewReport}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white hover:bg-[#2A2F38] transition-colors"
                    >
                      <DocumentPlusIcon className="h-5 w-5 text-[#00C4A7]" />
                      <div className="text-left">
                        <div className="font-medium">Create New Report</div>
                        <div className="text-xs text-gray-400">Start a new report with this content</div>
                      </div>
                    </button>
                  </div>

                  <div className="border-t border-gray-700">
                    <div className="px-3 py-2">
                      <div className="text-sm font-medium text-white mb-1">Add to Existing Report</div>
                      <div className="text-xs text-gray-400">Select a report to add this content</div>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {existingReports.map((report) => (
                        <button
                          key={report.id}
                          onClick={() => handleAddToExistingReport(report.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#2A2F38] transition-colors"
                        >
                          <FolderPlusIcon className="h-5 w-5 text-gray-400" />
                          <div className="text-left">
                            <div className="text-white">{report.name}</div>
                            <div className="text-xs text-gray-400">Last edited {report.lastEdited}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {role === 'assistant' && (
              <button className="text-[#B0B8C1] hover:text-[#00C4A7] transition-colors">
                <ShareIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 