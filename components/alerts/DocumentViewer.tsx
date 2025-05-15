import { XMarkIcon } from '@heroicons/react/24/outline';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentPath: string;
  documentName: string;
}

export default function DocumentViewer({
  isOpen,
  onClose,
  documentPath,
  documentName,
}: DocumentViewerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[600px] bg-[#1A1F2E] shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white truncate pr-4">
          {documentName}
        </h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden">
        <iframe
          src={`${documentPath}#toolbar=0&navpanes=0`}
          className="w-full h-full"
          title={documentName}
        />
      </div>
    </div>
  );
} 