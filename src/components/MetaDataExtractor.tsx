import React, { useRef, useCallback } from 'react';
import { MetaExtractor, MetaData } from '../utils/MetaExtractor';

interface MetaDataExtractorProps {
  children: React.ReactNode;
  onExtract?: (metadata: MetaData) => void;
}

export const MetaDataExtractor: React.FC<MetaDataExtractorProps> = ({ 
  children, 
  onExtract 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const extractMetadata = useCallback(() => {
    if (containerRef.current) {
      const metadata = MetaExtractor.extractFromElement(containerRef.current);
      onExtract?.(metadata);
      return metadata;
    }
  }, [onExtract]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};
