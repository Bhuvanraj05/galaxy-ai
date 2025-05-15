declare module 'react-pdf' {
  import { FC, ReactElement } from 'react';

  interface DocumentProps {
    file: string;
    onLoadSuccess?: (data: { numPages: number }) => void;
    loading?: string | ReactElement;
    error?: string | ReactElement;
    noData?: string | ReactElement;
    options?: {
      cMapUrl?: string;
      cMapPacked?: boolean;
    };
    children?: ReactElement | ReactElement[];
  }

  interface PageProps {
    pageNumber: number;
    renderTextLayer?: boolean;
    renderAnnotationLayer?: boolean;
    loading?: string | ReactElement;
    error?: string | ReactElement;
    className?: string;
  }

  export const Document: FC<DocumentProps>;
  export const Page: FC<PageProps>;
} 