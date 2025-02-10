import { useEffect, useRef, useState } from 'react';
import { MetaConfig, MetaTagGenerator } from '../utils/MetaTagGenerator';

interface MetaTagState {
  isLoading: boolean;
  error: string | null;
  tags: Array<{ name: string; content: string }>;
}

export const useMetaTags = (config: MetaConfig) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const [state, setState] = useState<MetaTagState>({
    isLoading: true,
    error: null,
    tags: []
  });

  useEffect(() => {
    mountedRef.current = true;
    
    const tagsToCleanup: HTMLMetaElement[] = [];
    
    const generateMetaTags = async () => {
      if (!componentRef.current || !mountedRef.current) return;
      
      try {
        const newTags = await MetaTagGenerator.generate({
          ...config,
          elementRef: componentRef
        });
        
        if (mountedRef.current) {
          tagsToCleanup.push(...newTags);
          setState({
            isLoading: false,
            error: null,
            tags: newTags.map(tag => ({
              name: tag.getAttribute('name') || '',
              content: tag.getAttribute('content') || ''
            }))
          });
        }
      } catch (err) {
        if (mountedRef.current) {
          setState({
            isLoading: false,
            error: err instanceof Error ? err.message : 'Failed to generate meta tags',
            tags: []
          });
        }
      }
    };

    generateMetaTags();

    return () => {
      mountedRef.current = false;
      tagsToCleanup.forEach(tag => tag.remove());
      const canonical = document.querySelector('link[rel="canonical"]');
      canonical?.remove();
    };
  }, [config.title, config.description, config.keywords]); // Only re-run if these specific props change

  return {
    componentRef,
    isLoading: state.isLoading,
    error: state.error,
    generatedTags: state.tags
  };
};
