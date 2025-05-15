import dynamic from 'next/dynamic';

const ClientPDFViewer = dynamic(() => import('./ClientPDFViewer'), {
  ssr: false,
});

interface PDFViewerModalProps {
  pdfUrl: string;
  onClose: () => void;
}

export default function PDFViewerModal({ pdfUrl, onClose }: PDFViewerModalProps) {
  return <ClientPDFViewer pdfUrl={pdfUrl} onClose={onClose} />;
}