declare module 'react-pdf' {
  import { FC, ReactElement, CSSProperties } from 'react';

  export interface LoadSuccess {
    numPages: number;
  }

  export interface DocumentProps {
    file: string | Uint8Array | { url: string; data: Uint8Array };
    onLoadSuccess?: (pdf: LoadSuccess) => void;
    onLoadError?: (error: Error) => void;
    onLoadProgress?: (progress: { loaded: number; total: number }) => void;
    loading?: string | ReactElement;
    error?: string | ReactElement;
    noData?: string | ReactElement;
    className?: string;
    options?: {
      cMapUrl?: string;
      cMapPacked?: boolean;
      standardFontDataUrl?: string;
      [key: string]: any;
    };
    rotate?: number;
    style?: CSSProperties;
    children?: ReactElement | ReactElement[];
  }

  export interface PageProps {
    pageNumber: number;
    width?: number;
    height?: number;
    scale?: number;
    rotate?: number;
    renderTextLayer?: boolean;
    renderAnnotationLayer?: boolean;
    loading?: string | ReactElement;
    error?: string | ReactElement;
    noData?: string | ReactElement;
    className?: string;
    style?: CSSProperties;
    customTextRenderer?: (props: { str: string; itemIndex: number }) => string | ReactElement;
    onLoadSuccess?: (page: { width: number; height: number }) => void;
    onLoadError?: (error: Error) => void;
    onRenderSuccess?: () => void;
    onRenderError?: (error: Error) => void;
  }

  export const Document: FC<DocumentProps>;
  export const Page: FC<PageProps>;
  
  export function pdfjs(): void;
  export const version: string;
} 