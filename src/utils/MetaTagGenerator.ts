import React from 'react';
import { MetaAIService } from '../services/MetaAIService';

export interface MetaConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  robots?: string;
  useAI?: boolean;
  elementRef?: React.RefObject<HTMLElement>;
}

export class MetaTagGenerator {
  static async generate(config: MetaConfig): Promise<HTMLMetaElement[]> {
    const tags: HTMLMetaElement[] = [];

    if (config.useAI && config.elementRef?.current) {
      const content = MetaAIService.extractContentFromComponent(config.elementRef.current);
      const aiSuggestions = await MetaAIService.generateMetaSuggestions(content);
      
      config = {
        ...config,
        title: config.title || aiSuggestions.title,
        description: config.description || aiSuggestions.description,
        keywords: config.keywords || aiSuggestions.keywords,
      };
    }

    if (config.title) {
      document.title = config.title;
    }

    if (config.description) {
      this.createMetaTag(tags, 'description', config.description);
      this.createMetaTag(tags, 'og:description', config.description);
    }

    if (config.keywords?.length) {
      this.createMetaTag(tags, 'keywords', config.keywords.join(', '));
    }

    if (config.ogImage) {
      this.createMetaTag(tags, 'og:image', config.ogImage);
    }

    if (config.canonical) {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = config.canonical;
      document.head.appendChild(link);
    }

    if (config.robots) {
      this.createMetaTag(tags, 'robots', config.robots);
    }

    return tags;
  }

  private static createMetaTag(tags: HTMLMetaElement[], name: string, content: string) {
    const tag = document.createElement('meta');
    tag.name = name;
    tag.content = content;
    tags.push(tag);
    document.head.appendChild(tag);
  }
}
