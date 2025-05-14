import { useState } from 'react';
import { 
  HandThumbUpIcon, 
  HandThumbDownIcon, 
  ClipboardIcon, 
  ArrowPathIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant';
  timestamp?: Date;
  onRegenerate?: () => void;
  onCopy?: () => void;
  onFeedback?: (type: 'like' | 'dislike') => void;
}

export default function ChatMessage({
  content,
  role,
  timestamp,
  onRegenerate,
  onCopy,
  onFeedback
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

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
          </div>
        )}
      </div>
    </div>
  );
} 