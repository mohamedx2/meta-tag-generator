import React, { useMemo } from 'react';
import { useMetaTags } from '../hooks/useMetaTags';

export const ExampleComponent: React.FC = () => {
  const config = useMemo(() => ({
    useAI: false,
    title: 'Example Page',
    description: 'This is an example page about AI'
  }), []);

  const { componentRef, isLoading, error, generatedTags } = useMetaTags(config);

  return (
    <div>
      <div ref={componentRef}>
        <h1>Example Page</h1>
        <p>This is a comprehensive guide about artificial intelligence and machine learning.
           We cover topics like neural networks, deep learning, and natural language processing.</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        {isLoading && <div>Generating meta tags...</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        
        {generatedTags && generatedTags.length > 0 && (
          <div style={{ padding: '10px', background: '#f5f5f5' }}>
            <h3>Generated Meta Tags:</h3>
            <pre>{JSON.stringify(generatedTags, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
