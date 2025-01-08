import { marked } from "marked";

export const markdownConverter = (content: string): { heading: string; content: string; type: string }[] => {
    const tokens = marked.lexer(content);
    let sections: { heading: string; content: string; type: string }[] = [];

    let currentHeading = '';
    let currentContent = '';

    tokens.forEach((token) => {
      if (token.type === 'heading' && token.depth === 1) {
        
        if (currentHeading) {
          sections.push({
            heading: currentHeading.trim(),
            content: currentContent.trim(),
            type: currentHeading.trim(),
          });
        }

        currentHeading = token.text;
        currentContent = '';
      } else if (token.type === 'paragraph') {
        currentContent += token.text + '\n';
      }
    });

    if (currentHeading) {
      sections.push({
        heading: currentHeading.trim(),
        content: currentContent.trim(),
        type: currentHeading.trim()
      });
    }

    return sections;
  }