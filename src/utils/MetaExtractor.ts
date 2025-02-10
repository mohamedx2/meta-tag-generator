import { LocalMetaGenerator } from './LocalMetaGenerator';

export interface MetaData {
  basic: {
    title: string;
    description: string;
    keywords: string[];
    language: string;
    author?: string;
    published?: string;
    viewport?: string;
    themeColor?: string;
    rating?: string;
    revisitAfter?: string;
    robots?: string;
  };
  openGraph: {
    title: string;
    description: string;
    image?: string;
    url: string;
    type: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image?: string;
    creator?: string;
  };
  schema: {
    "@context"?: string;
    "@type"?: string;
    type: string;
    name: string;
    description: string;
    image?: string;
    datePublished?: string;
    author?: {
      type: string;
      name: string;
    };
    mainEntityOfPage?: {
      "@type": string;
      "@id": string;
    };
    publisher?: {
      "@type": string;
      name: string;
      logo?: {
        "@type": string;
        url: string;
      };
    };
    headline?: string;
    alternativeHeadline?: string;
    articleSection?: string;
    keywords?: string[];
    readingTime?: string;
  };
}

export class MetaExtractor {
  static extractFromElement(element: HTMLElement): MetaData {
    const content = element.innerText || element.textContent || '';
    const { title, description, keywords } = LocalMetaGenerator.generateMetaTags(content);
    
    const headings = element.querySelectorAll('h1, h2, h3');
    const images = element.querySelectorAll('img');
    const firstImage = images.length > 0 ? images[0].src : undefined;
    
    const mainTitle = this.extractTitle(headings, title);
    const mainDesc = this.cleanDescription(description);
    const pageUrl = window.location.href;
    const siteName = document.title || 'My Website';
    
    const author = this.findAuthor(element);
    const publishDate = this.findPublishDate(element);

    return {
      basic: {
        title: mainTitle,
        description: mainDesc,
        keywords,
        language: document.documentElement.lang || 'en',
        author,
        published: publishDate
      },
      openGraph: {
        title: mainTitle,
        description: mainDesc,
        image: firstImage,
        url: pageUrl,
        type: 'article',
        siteName
      },
      twitter: {
        card: 'summary_large_image',
        title: mainTitle,
        description: mainDesc,
        image: firstImage,
        creator: author
      },
      schema: {
        type: 'Article',
        name: mainTitle,
        description: mainDesc,
        image: firstImage,
        datePublished: publishDate,
        author: author ? {
          type: 'Person',
          name: author
        } : undefined
      }
    };
  }

  private static extractTitle(headings: NodeListOf<Element>, fallback: string): string {
    const h1 = headings[0]?.textContent;
    return h1 || fallback;
  }

  private static cleanDescription(desc: string): string {
    return desc.length > 200 ? `${desc.slice(0, 197)}...` : desc;
  }

  private static findAuthor(element: HTMLElement): string | undefined {
    const authorMeta = element.querySelector('[itemprop="author"], .author, [rel="author"]');
    return authorMeta?.textContent?.trim();
  }

  private static findPublishDate(element: HTMLElement): string | undefined {
    const dateMeta = element.querySelector('[itemprop="datePublished"], time, .published');
    const datetime = dateMeta?.getAttribute('datetime');
    return datetime !== null && datetime !== undefined ? datetime : dateMeta?.textContent || undefined;
  }
}
