import React, { useState } from 'react';
import { MetaDataExtractor } from './MetaDataExtractor';
import type { MetaData } from '../utils/MetaExtractor';

export const ExampleUsage: React.FC = () => {
  const [metadata, setMetadata] = useState<MetaData | null>(null);

  return (
    <div>
      <MetaDataExtractor onExtract={setMetadata}>
        <h1>Understanding Artificial Intelligence</h1>
        <p>
          Artificial Intelligence (AI) is revolutionizing how we interact with technology.
          From machine learning to neural networks, AI is changing our world.
        </p>
        <img src="/ai-illustration.jpg" alt="AI Concept" />
      </MetaDataExtractor>

      {metadata && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f5f5f5' }}>
          <h3>Generated Meta Data:</h3>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
