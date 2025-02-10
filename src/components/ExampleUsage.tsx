import React, { useState, useEffect } from 'react';
import { MetaDataExtractor } from './MetaDataExtractor';
import { MetaPreview } from './MetaPreview';
import type { MetaData } from '../utils/MetaExtractor';

export const ExampleUsage: React.FC = () => {
  const [metadata, setMetadata] = useState<MetaData | null>(null);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <MetaDataExtractor onExtract={setMetadata}>
        <article itemScope itemType="http://schema.org/Article">
          <h1 itemProp="headline">Understanding Artificial Intelligence</h1>
          <div className="article-meta">
            <span itemProp="author">John Doe</span>
            <time itemProp="datePublished" dateTime="2023-10-20">October 20, 2023</time>
          </div>
          <img 
            src="/ai-illustration.jpg" 
            alt="AI Concept" 
            itemProp="image"
          />
          <div itemProp="articleBody">
            <p>
              Artificial Intelligence (AI) is revolutionizing how we interact with technology.
              From machine learning to neural networks, AI is changing our world.
            </p>
            <h2>Key Concepts in AI</h2>
            <p>
              Machine learning, deep learning, and neural networks form the backbone
              of modern AI systems. These technologies enable computers to learn from
              data and make intelligent decisions.
            </p>
          </div>
        </article>
      </MetaDataExtractor>

      {metadata && (
        <div style={{ marginTop: '40px' }}>
          <MetaPreview metadata={metadata} />
        </div>
      )}
    </div>
  );
};
