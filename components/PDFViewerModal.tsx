import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure worker
if (typeof window !== 'undefined') {
  const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.entry');
  require('pdfjs-dist/build/pdf.worker');
  require('pdfjs-dist').GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

interface PDFViewerModalProps {
  pdfUrl: string;
  onClose: () => void;
}

interface OnDocumentLoadSuccess {
  numPages: number;
}

const PDFViewerModal: FC<PDFViewerModalProps> = ({ pdfUrl, onClose }): ReactElement => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: OnDocumentLoadSuccess): void => {
    setNumPages(numPages);
  };

  const goToPrevPage = (): void => {
    setPageNumber((prev: number) => Math.max(prev - 1, 1));
  };

  const goToNextPage = (): void => {
    setPageNumber((prev: number) => Math.min(prev + 1, numPages || prev));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1A1F2E] rounded-xl w-[800px] max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#2A2F38]">
          <h2 className="text-white text-lg font-medium">Document Viewer</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading="Loading PDF..."
            error="Failed to load PDF file."
            noData="No PDF file specified."
            options={{
              cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/cmaps/',
              cMapPacked: true,
            }}
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading="Loading page..."
              error="Failed to load page."
              className="max-w-full"
            />
          </Document>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-[#2A2F38]">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-gray-400">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= (numPages || 1)}
              className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal;