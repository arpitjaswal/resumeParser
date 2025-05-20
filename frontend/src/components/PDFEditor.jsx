import { useState, useRef, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Loader2, ZoomIn, ZoomOut } from 'lucide-react';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFEditor = ({ file }) => {
  const [scale, setScale] = useState(1.0);
  const [fileUrl, setFileUrl] = useState(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  if (!file) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <p style={{ color: '#666' }}>No file selected</p>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        padding: '8px',
        borderBottom: 'none',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px'
      }}>
        <button
          onClick={handleZoomOut}
          style={{
            padding: '4px 8px',
            border: 'none',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={handleZoomIn}
          style={{
            padding: '4px 8px',
            border: 'none',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer'
          }}
        >
          <ZoomIn size={16} />
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {fileUrl && (
          <Worker workerUrl="/pdf.worker/pdf.worker.min.js">
            <Viewer
              fileUrl={fileUrl}
              defaultScale={scale}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        )}
      </div>
    </div>
  );
};

export default PDFEditor; 