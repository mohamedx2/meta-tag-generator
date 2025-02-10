import { MetaData } from './MetaExtractor';

export class SeoEnhancer {
  static enhanceMetadata(metadata: MetaData): MetaData {
    const enhanced = { ...metadata };
    
    // Update schema with schema.org data
    enhanced.schema = {
      type: "Article",
      name: metadata.basic.title,
      description: metadata.basic.description,
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": metadata.openGraph.url
      },
      publisher: {
        "@type": "Organization",
        name: metadata.openGraph.siteName,
        logo: {
          "@type": "ImageObject",
          url: "/logo.png"
        }
      },
      headline: metadata.basic.title,
      alternativeHeadline: this.generateAlternativeHeadline(metadata.basic.title),
      articleSection: this.detectSection(metadata.basic.keywords),
      keywords: this.enhanceKeywords(metadata.basic.keywords),
      readingTime: this.calculateReadingTime(metadata.schema.description),
      image: metadata.schema.image,
      datePublished: metadata.schema.datePublished,
      author: metadata.schema.author
    };

    // Update basic meta with additional tags
    enhanced.basic = {
      ...enhanced.basic,
      title: this.optimizeTitle(metadata.basic.title),
      description: this.optimizeDescription(
        metadata.basic.description,
        metadata.basic.keywords
      ),
      viewport: "width=device-width, initial-scale=1",
      themeColor: "#ffffff",
      rating: "general",
      revisitAfter: "7 days",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    };

    return enhanced;
  }

  private static optimizeTitle(title: string): string {
    const brandName = "Your Brand";
    const maxLength = 60;
    const separator = " | ";
    
    if (title.length + separator.length + brandName.length > maxLength) {
      return title.slice(0, maxLength - separator.length - brandName.length) + separator + brandName;
    }
    
    return title + separator + brandName;
  }

  private static optimizeDescription(description: string, keywords: string[]): string {
    const maxLength = 155;
    let enhanced = description;

    // Try to include top keywords if they're not present
    keywords.slice(0, 2).forEach(keyword => {
      if (!description.toLowerCase().includes(keyword.toLowerCase())) {
        const suffix = ` Learn more about ${keyword}.`;
        if (enhanced.length + suffix.length <= maxLength) {
          enhanced += suffix;
        }
      }
    });

    return enhanced.slice(0, maxLength);
  }

  private static enhanceKeywords(keywords: string[]): string[] {
    const longTail = keywords.flatMap(keyword => [
      keyword,
      `best ${keyword}`,
      `${keyword} guide`,
      `${keyword} tutorial`,
      `how to ${keyword}`,
      `${keyword} examples`
    ]);

    // Remove duplicates using filter instead of Set
    return longTail
      .filter((value, index, self) => self.indexOf(value) === index)
      .slice(0, 20);
  }

  private static generateAlternativeHeadline(title: string): string {
    const prefixes = [
      "Complete Guide to",
      "Everything You Need to Know About",
      "The Ultimate Guide to",
      "A Comprehensive Look at"
    ];
    
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    return `${randomPrefix} ${title.replace(/^(The|A|An)\s+/i, '')}`;
  }

  private static detectSection(keywords: string[]): string {
    const sections = {
      technology: ["ai", "programming", "software", "tech", "computer"],
      business: ["marketing", "business", "strategy", "management"],
      science: ["research", "study", "analysis", "scientific"]
    };

    for (const [section, sectionKeywords] of Object.entries(sections)) {
      if (keywords.some(k => sectionKeywords.includes(k.toLowerCase()))) {
        return section;
      }
    }

    return "general";
  }

  private static calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `PT${minutes}M`;
  }
}
