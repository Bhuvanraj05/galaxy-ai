import dynamic from 'next/dynamic';

const ClientPDFViewer = dynamic(() => import('./ClientPDFViewer'), {
  ssr: false,
});

interface PDFViewerModalProps {
  isOpen: boolean;
  pdfUrl: string;
  documentTitle?: string;
  onClose: () => void;
}

export default function PDFViewerModal({ isOpen, pdfUrl, documentTitle, onClose }: PDFViewerModalProps) {
  if (!isOpen) return null;
  
  return <ClientPDFViewer pdfUrl={pdfUrl} onClose={onClose} />;
}