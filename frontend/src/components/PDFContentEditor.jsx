import { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { Loader2, Bold, Italic, List, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker/pdf.worker.min.js';

const PDFContentEditor = ({ file, onContentChange, value }) => {
  const [content, setContent] = useState(value || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setContent(value || '');
  }, [value]);

  useEffect(() => {
    if (file) {
      extractTextFromPDF(file);
    }
  }, [file]);

  const extractTextFromPDF = async (pdfFile) => {
    try {
      setLoading(true);
      setError(null);

      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      
      let extractedText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const textItems = textContent.items;
        
        // Sort text items by vertical position
        textItems.sort((a, b) => {
          const yDiff = b.transform[5] - a.transform[5];
          if (Math.abs(yDiff) > 5) return yDiff;
          return a.transform[4] - b.transform[4];
        });

        let currentY = null;
        let currentFontSize = null;
        let currentFontName = null;
        let currentColor = null;

        for (const item of textItems) {
          const y = item.transform[5];
          const fontSize = item.fontSize;
          const fontName = item.fontName;
          const color = item.color;

          // Add line break if there's a significant change in vertical position
          if (currentY !== null && Math.abs(y - currentY) > 5) {
            extractedText += '\n';
          }

          // Add formatting based on font properties
          if (currentFontSize !== null && Math.abs(fontSize - currentFontSize) > 2) {
            if (fontSize > currentFontSize) {
              extractedText += '\n# ';
            }
          }

          if (currentFontName !== null && fontName !== currentFontName) {
            if (fontName.toLowerCase().includes('bold')) {
              extractedText += '**';
            }
            if (fontName.toLowerCase().includes('italic')) {
              extractedText += '*';
            }
          }

          if (currentColor !== null && color !== currentColor) {
            // Add color formatting if needed
          }

          extractedText += item.str;

          currentY = y;
          currentFontSize = fontSize;
          currentFontName = fontName;
          currentColor = color;
        }

        extractedText += '\n\n';
      }

      setContent(extractedText);
      onContentChange(extractedText);
    } catch (err) {
      console.error('Error extracting text:', err);
      setError('Error extracting text from PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    onContentChange(newContent);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '16px',
        backgroundColor: '#fee',
        color: '#c00',
        borderRadius: '8px',
        margin: '16px'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div style={{
        padding: '8px',
        borderBottom: 'none',
        display: 'flex',
        gap: '8px',
        backgroundColor: '#f8f9fa'
      }}>
        <button
          onClick={() => document.execCommand('bold', false, null)}
          style={{
            padding: '4px 8px',
            border: 'none',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => document.execCommand('italic', false, null)}
          style={{
            padding: '4px 8px',
            border: 'none',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => document.execCommand('insertUnorderedList', false, null)}
          style={{
            padding: '4px 8px',
            border: 'none',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          <List size={16} />
        </button>
        <button
          onClick={() => document.execCommand('justifyLeft', false, null)}
          style={{
            padding: '4px 8px',
            border: 'none',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => document.execCommand('justifyCenter', false, null)}
          style={{
            padding: '4px 8px',
            border: 'none',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => document.execCommand('justifyRight', false, null)}
          style={{
            padding: '4px 8px',
            border: 'none',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          <AlignRight size={16} />
        </button>
      </div>

      {/* Editor */}
      <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
        <textarea
          value={content}
          onChange={handleContentChange}
          style={{
            width: '100%',
            height: '100%',
            padding: '8px',
            border: 'none',
            borderRadius: '4px',
            resize: 'none',
            fontFamily: 'monospace',
            fontSize: '14px',
            lineHeight: '1.5'
          }}
          placeholder="Edit your resume content here..."
        />
      </div>
    </div>
  );
};

export default PDFContentEditor; 