import React from 'react';
import type { MetaData } from '../utils/MetaExtractor';

interface MetaPreviewProps {
  metadata: MetaData;
}

export const MetaPreview: React.FC<MetaPreviewProps> = ({ metadata }) => {
  return (
    <div className="meta-preview">
      <h3>Meta Preview</h3>
      
      <div className="preview-section">
        <h4>Google Search Preview</h4>
        <div className="search-preview" style={{ fontFamily: 'arial, sans-serif' }}>
          <div style={{ color: '#1a0dab', fontSize: '18px' }}>{metadata.basic.title}</div>
          <div style={{ color: '#006621', fontSize: '14px' }}>{metadata.openGraph.url}</div>
          <div style={{ color: '#545454', fontSize: '14px' }}>{metadata.basic.description}</div>
        </div>
      </div>

      <div className="preview-section">
        <h4>Social Media Preview</h4>
        <div className="social-preview" style={{ border: '1px solid #ddd', padding: '10px' }}>
          {metadata.openGraph.image && (
            <img 
              src={metadata.openGraph.image} 
              alt="Preview"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
          <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{metadata.openGraph.title}</div>
          <div style={{ fontSize: '14px' }}>{metadata.openGraph.description}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{metadata.openGraph.siteName}</div>
        </div>
      </div>

      <div className="preview-section">
        <h4>Generated Tags</h4>
        <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(metadata, null, 2)}
        </pre>
      </div>
    </div>
  );
};
