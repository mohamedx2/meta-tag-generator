export class LocalMetaGenerator {
  private static stopWords = new Set([
    'a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'and', 'or', 'but', 'is', 'are', 'was', 'were', 'this', 'that'
  ]);

  static generateMetaTags(content: string) {
    // Clean content
    const cleanContent = content.replace(/<[^>]+>/g, ' ').trim();
    
    // Get title
    const title = this.generateTitle(cleanContent);
    
    // Get description
    const description = this.generateDescription(cleanContent);
    
    // Get keywords
    const keywords = this.extractKeywords(cleanContent);

    return { title, description, keywords };
  }

  private static generateTitle(content: string): string {
    const firstSentence = content.split(/[.!?]/)[0];
    return firstSentence.length > 60 
      ? `${firstSentence.slice(0, 57)}...`
      : firstSentence;
  }

  private static generateDescription(content: string): string {
    const words = content.split(/\s+/);
    const description = words.slice(0, 30).join(' ');
    return description.length > 160 
      ? `${description.slice(0, 157)}...`
      : description;
  }

  private static extractKeywords(content: string): string[] {
    const words = content.toLowerCase()
      .split(/\s+/)
      .filter(word => 
        word.length > 3 && 
        !this.stopWords.has(word) &&
        /^[a-z]+$/.test(word)
      );

    const wordFrequency = new Map<string, number>();
    words.forEach(word => {
      wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
    });

    return Array.from(wordFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  }
}
