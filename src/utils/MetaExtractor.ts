import { LocalMetaGenerator } from './LocalMetaGenerator';

export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
}

export class MetaExtractor {
  static extractFromElement(element: HTMLElement): MetaData {
    const content = element.innerText || element.textContent || '';
    const headings = element.querySelectorAll('h1, h2, h3');
    const images = element.querySelectorAll('img');
    
    // Extract title from first heading or generate from content
    const title = headings.length > 0 
      ? headings[0].textContent || ''
      : LocalMetaGenerator.generateMetaTags(content).title;

    // Generate description and keywords
    const { description, keywords } = LocalMetaGenerator.generateMetaTags(content);

    // Build OpenGraph data
    const openGraph = {
      title,
      description,
      image: images.length > 0 ? images[0].src : undefined,
      url: window.location.href
    };

    return {
      title,
      description,
      keywords,
      openGraph
    };
  }
}
