import { DocumentIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface Upload {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

interface RecentUploadsProps {
  uploads: Upload[];
}

export default function RecentUploads({ uploads }: RecentUploadsProps) {
  return (
    <div className="bg-[#1A1F2E] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-white">Recent Uploads</h2>
        <button className="text-sm text-[#00C4A7] hover:text-[#00C4A7]/80 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="flex items-center justify-between p-3 bg-[#232834] rounded-lg hover:bg-[#2A303E] transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00C4A7]/10 rounded-lg flex items-center justify-center">
                <DocumentIcon className="h-5 w-5 text-[#00C4A7]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-white group-hover:text-[#00C4A7] transition-colors">
                  {upload.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                  <span>{upload.type}</span>
                  <span>•</span>
                  <span>{upload.size}</span>
                  <span>•</span>
                  <span>{upload.uploadedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-gray-400">Uploaded by</p>
                <p className="text-sm text-white">{upload.uploadedBy}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">Upload New Files</p>
            <p className="text-xs text-gray-400 mt-1">
              Supported formats: CSV, XLSX, PDF, DOC
            </p>
          </div>
          <button className="px-4 py-2 bg-[#00C4A7] text-white rounded-lg text-sm hover:bg-[#00C4A7]/90 transition-colors">
            Upload Files
          </button>
        </div>
      </div>
    </div>
  );
} 