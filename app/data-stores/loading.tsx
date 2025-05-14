'use client';

export default function Loading() {
  return (
    <div className="flex-1 bg-[#121620] p-8">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="h-8 w-48 bg-[#232834] rounded-lg mb-2"></div>
            <div className="h-4 w-64 bg-[#232834] rounded-lg"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-[#232834] rounded-lg"></div>
            <div className="h-10 w-32 bg-[#232834] rounded-lg"></div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="bg-[#1A1F2E] rounded-xl p-1 mb-6">
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-1 h-9 bg-[#232834] rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-[#1A1F2E] rounded-xl overflow-hidden">
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 w-64 bg-[#232834] rounded-lg"></div>
                <div className="h-4 w-20 bg-[#232834] rounded-lg"></div>
                <div className="h-4 w-32 bg-[#232834] rounded-lg"></div>
                <div className="h-4 w-24 bg-[#232834] rounded-lg"></div>
                <div className="h-4 w-32 bg-[#232834] rounded-lg"></div>
                <div className="h-8 w-24 bg-[#232834] rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 