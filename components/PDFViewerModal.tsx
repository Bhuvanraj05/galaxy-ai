import React, { useState, useEffect } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set worker using CDN
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string;
  documentTitle: string;
}

const PDFViewerModal: React.FC<PDFViewerModalProps> = ({
  isOpen,
  onClose,
  documentUrl,
  documentTitle,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.2);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Reset state when document changes
    if (isOpen) {
      setPageNumber(1);
      setError(null);
      setLoading(true);
      
      // Preload the PDF document
      const preloadDocument = async () => {
        try {
          const loadingTask = pdfjs.getDocument(documentUrl);
          await loadingTask.promise;
          setError(null);
        } catch (err) {
          console.error('Error preloading document:', err);
          // Don't set error here as it will be handled by onDocumentLoadError
        }
      };
      
      preloadDocument();
    }
  }, [isOpen, documentUrl]);

  // Add caching options for better performance
  const cacheOptions = {
    cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/'
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    let errorMessage = 'Failed to load PDF. ';
    
    if (error.message.includes('Failed to fetch')) {
      errorMessage += 'The document could not be accessed. Please check the file path.';
    } else if (error.message.includes('Invalid PDF')) {
      errorMessage += 'The file appears to be corrupted or is not a valid PDF.';
    } else {
      errorMessage += 'Please try again later or open in a new tab.';
    }
    
    setError(errorMessage);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPage = prevPageNumber + offset;
      return Math.min(Math.max(1, newPage), numPages);
    });
  };

  if (!isOpen) return null;

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00C4A7]"></div>
    </div>
  );

  return (
    <div 
      className={`fixed right-0 top-0 h-screen w-[800px] bg-[#1A1F2E] shadow-xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h2 className="text-lg font-medium text-white truncate">{documentTitle}</h2>
        </div>
        <a
          href={documentUrl}
          download
          className="text-gray-400 hover:text-white transition-colors"
          title="Download PDF"
        >
          <ArrowDownTrayIcon className="h-5 w-5" />
        </a>
      </div>

      {/* PDF Controls */}
      {!error && !loading && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
              className={`p-1 rounded ${pageNumber <= 1 ? 'text-gray-600' : 'text-gray-400 hover:text-white'}`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-400">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => changePage(1)}
              disabled={pageNumber >= numPages}
              className={`p-1 rounded ${pageNumber >= numPages ? 'text-gray-600' : 'text-gray-400 hover:text-white'}`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
              className="text-gray-400 hover:text-white text-sm"
            >
              -
            </button>
            <span className="text-sm text-gray-400">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale(prev => Math.min(2, prev + 0.1))}
              className="text-gray-400 hover:text-white text-sm"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto p-4 bg-[#121620]">
        <div className="flex justify-center">
          {loading && <LoadingSpinner />}
          {error ? (
            <div className="text-red-400 text-center p-4 bg-red-900/20 rounded-lg">
              <p className="mb-2">{error}</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    const url = new URL(documentUrl, window.location.href).toString();
                    window.open(url, '_blank');
                  }}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                >
                  Open in New Tab
                </button>
                <button
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    // Force reload the document in the viewer
                    const timestamp = new Date().getTime();
                    const url = `${documentUrl}?t=${timestamp}`;
                    setPageNumber(1);
                  }}
                  className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <Document
              file={documentUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={<LoadingSpinner />}
              error={null}
              options={cacheOptions}
            >
              <Page
                key={`page_${pageNumber}`}
                pageNumber={pageNumber}
                scale={scale}
                loading={<LoadingSpinner />}
                className="shadow-lg"
                renderAnnotationLayer={false}
                renderTextLayer={true}
              />
            </Document>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFViewerModal; 