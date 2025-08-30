interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  // Simple markdown parser for basic formatting
  const parseMarkdown = (text: string): string => {
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      
      // Code blocks
      .replace(/```[\s\S]*?```/g, (match) => {
        const code = match.slice(3, -3).trim();
        return `<pre><code>${code}</code></pre>`;
      })
      
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      
      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
      
      // Unordered lists
      .replace(/^[\-\*] (.*$)/gim, '<li>$1</li>')
      
      // Line breaks
      .replace(/\n/g, '<br />');
  };

  // Wrap consecutive list items
  const wrapLists = (html: string): string => {
    return html
      .replace(/(<li>.*?<\/li>)/g, (match) => {
        if (match.includes('<li>')) {
          return match;
        }
        return match;
      })
      .replace(/(<li>.*?<\/li>)(\s*<li>.*?<\/li>)+/g, (match) => {
        return `<ul>${match}</ul>`;
      });
  };

  const htmlContent = wrapLists(parseMarkdown(content));

  return (
    <div 
      className="markdown-content text-foreground prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
