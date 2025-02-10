import React, { useRef, useCallback, useEffect } from 'react';
import { MetaExtractor, MetaData } from '../utils/MetaExtractor';
import { SeoEnhancer } from '../utils/SeoEnhancer';

interface MetaDataExtractorProps {
  children: React.ReactNode;
  onExtract?: (metadata: MetaData) => void;
  autoEnhance?: boolean;
}

export const MetaDataExtractor: React.FC<MetaDataExtractorProps> = ({ 
  children, 
  onExtract,
  autoEnhance = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      let metadata = MetaExtractor.extractFromElement(containerRef.current);
      
      if (autoEnhance) {
        metadata = SeoEnhancer.enhanceMetadata(metadata);
      }
      
      onExtract?.(metadata);
    }
  }, [onExtract, autoEnhance]);

  return <div ref={containerRef}>{children}</div>;
};
