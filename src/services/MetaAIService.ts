import { LocalMetaGenerator } from '../utils/LocalMetaGenerator';

export class MetaAIService {
  // Remove OpenAI initialization
  
  static async generateMetaSuggestions(content: string) {
    try {
      // Use local generation for now
      return this.generateLocalMetaTags(content);
      
      /* Commented out OpenAI implementation for later use
      if (process.env.REACT_APP_USE_OPENAI === 'true') {
        const completion = await this.openai.chat.completions.create({
          // ...existing code...
        });
        return JSON.parse(completion.choices[0].message.content || '{}');
      }
      */
    } catch (error) {
      console.warn('Using local meta tag generation:', error);
      return this.generateLocalMetaTags(content);
    }
  }

  private static generateLocalMetaTags(content: string) {
    return LocalMetaGenerator.generateMetaTags(content);
  }

  static extractContentFromComponent(element: HTMLElement): string {
    return element.innerText || element.textContent || '';
  }
}
