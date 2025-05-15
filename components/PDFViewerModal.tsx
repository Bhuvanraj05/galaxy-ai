import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Configure options to avoid canvas dependency
const options = {
  cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/standard_fonts/',
  disableWorker: true,
  disableAutoFetch: true,
  disableStream: true,
  disableCreateObjectURL: true,
  disableFontFace: true,
  useSystemFonts: false,
  useWorkerFetch: false,
  canvasFactory: null,
  isEvalSupported: false,
  maxImageSize: -1,
  renderInteractiveForms: false
} as const;

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
            options={options}
            loading="Loading PDF..."
            error="Failed to load PDF file."
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="max-w-full"
              loading="Loading page..."
              error="Failed to load page."
              canvasBackground="transparent"
              renderMode="svg"
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