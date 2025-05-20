import { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Loader2, Upload, Download, RotateCcw, LogOut, User } from 'lucide-react';
import PDFEditor from './components/PDFEditor';
import PDFContentEditor from './components/PDFContentEditor';
import * as pdfjsLib from 'pdfjs-dist';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker/pdf.worker.min.js';

function Logo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="8" fill="#FFD700"/>
      <text x="18" y="24" textAnchor="middle" fontWeight="bold" fontSize="16" fill="#181c2a" fontFamily="Inter, system-ui, sans-serif">RP</text>
    </svg>
  );
}

function Header({ onLogin, user, onLogout }) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(24, 28, 42, 0.95)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      height: 80,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%',
      fontFamily: 'Inter, system-ui, sans-serif',
      width: '100%',
      left: 0,
      right: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, minWidth: 300 }}>
        <Logo />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 24, letterSpacing: 0.5 }}>ResumePro</span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Professional Resume Editor</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 48, flex: 1, justifyContent: 'center' }}>
        <nav style={{ display: 'flex', gap: 48 }}>
          <a href="#features" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}>Features</a>
          <a href="#pricing" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}>Pricing</a>
          <a href="#about" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}>About</a>
          <a href="#contact" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 15, fontWeight: 500, transition: 'color 0.2s' }}>Contact</a>
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, minWidth: 300, justifyContent: 'flex-end' }}>
        {user ? (
          <button onClick={onLogout} style={{
            background: 'rgba(255,215,0,0.1)',
            color: '#FFD700',
            border: '1px solid rgba(255,215,0,0.2)',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            padding: '10px 28px',
            borderRadius: 8,
            transition: 'all 0.2s',
            display: 'flex',
    alignItems: 'center',
            gap: 8,
            minWidth: 120,
    justifyContent: 'center', 
          }}>
            <LogOut size={18} />
            Logout
          </button>
        ) : (
          <button onClick={onLogin} style={{
            background: '#FFD700',
            color: '#181c2a',
    border: 'none',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            padding: '10px 28px',
            borderRadius: 8,
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 2px 8px rgba(255,215,0,0.15)',
            minWidth: 120,
            justifyContent: 'center',
          }}>
            <User size={18} />
            Get Started
          </button>
        )}
      </div>
      <style>
        {`
          nav a:hover {
            color: #FFD700 !important;
          }
          button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(255,215,0,0.2);
          }
          button:active {
            transform: translateY(0);
          }
        `}
      </style>
    </header>
  );
}

function LandingPage({ onLogin }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      padding: '0 16px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 20%, rgba(108, 71, 255, 0.05) 0%, transparent 50%)',
        animation: 'pulse 15s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '70%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
        animation: 'float 10s ease-in-out infinite'
      }} />

      <Header onLogin={onLogin} />

      <main style={{ 
        textAlign: 'center', 
        maxWidth: 800,
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{ 
          fontSize: 56, 
          fontWeight: 800, 
          marginBottom: 24, 
          lineHeight: 1.2,
          color: 'white',
          letterSpacing: -0.5
        }}>
          Edit Your Resume <span style={{ 
            color: '#FFD700',
            fontWeight: 900
          }}>Like a Pro</span>
        </h1>
        <p style={{ 
          fontSize: 20, 
          fontWeight: 400, 
          marginBottom: 48, 
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.6,
          maxWidth: 600,
          margin: '0 auto 48px'
        }}>
          Transform your resume with our powerful editor. <br />
          <span style={{ 
            color: '#FFD700', 
            fontWeight: 600
          }}>
            Preserve your original theme while making perfect edits.
          </span>
        </p>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 24, 
          marginBottom: 48, 
          flexWrap: 'wrap'
        }}>
          <Feature 
            icon={<Upload size={24} color="#FFD700" />} 
            title="Upload PDF" 
            desc="Start with any PDF resume." 
          />
          <Feature 
            icon={<RotateCcw size={24} color="#FFD700" />} 
            title="Edit Instantly" 
            desc="Split-screen editor and preview." 
          />
          <Feature 
            icon={<Download size={24} color="#FFD700" />} 
            title="Export PDF" 
            desc="Download your updated resume." 
          />
        </div>

        <button onClick={onLogin} style={{ 
          padding: '16px 40px', 
          background: '#FFD700', 
          color: '#1a1a2e', 
          border: 'none', 
          borderRadius: 8, 
          fontWeight: 700, 
          fontSize: 18, 
          cursor: 'pointer', 
          transition: 'all 0.2s ease',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(255,215,0,0.10)'
        }}>
          <span style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.3s ease'
          }} />
          Get Started
    </button>
      </main>

      <footer style={{ 
        marginTop: 80, 
        color: 'rgba(255,255,255,0.6)', 
        fontSize: 14,
        position: 'relative',
        zIndex: 1
      }}>
        &copy; {new Date().getFullYear()} ResumePro. All rights reserved.
      </footer>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.05); opacity: 0.6; }
            100% { transform: scale(1); opacity: 0.5; }
          }
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
          button:hover span {
            transform: translateX(100%);
          }
          button:hover {
            transform: translateY(-1px);
          }
        `}
      </style>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div style={{ 
      background: 'rgba(255,255,255,0.05)', 
      backdropFilter: 'blur(10px)',
      color: 'white', 
      borderRadius: 12, 
      padding: '24px 32px', 
      minWidth: 180, 
    display: 'flex',
    flexDirection: 'column',
      alignItems: 'center', 
      gap: 12,
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 8px rgba(108, 71, 255, 0.08)'
    }}>
      <div style={{ 
        background: 'rgba(255,215,0,0.1)', 
        borderRadius: 8, 
        padding: 12, 
        marginBottom: 4,
        boxShadow: '0 1px 4px rgba(255,215,0,0.08)'
      }}>
        {icon}
      </div>
      <div style={{ fontWeight: 600, fontSize: 16 }}>{title}</div>
      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>{desc}</div>
    </div>
  );
}

function ResumeApp() {
  const { user, logout, loading: authLoading } = useAuth();
  const [originalPdfFile, setOriginalPdfFile] = useState(null);
  const [editedPdfFile, setEditedPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [originalContent, setOriginalContent] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [warning, setWarning] = useState('');

  // Upload handler (PDF only for now, can add DOCX with mammoth if needed)
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setWarning('');
    try {
      setLoading(true);
      setError(null);
      setFileName(file.name);
      if (file.type === 'application/pdf') {
        const arrayBuffer = await file.arrayBuffer();
        await PDFDocument.load(arrayBuffer);
        setOriginalPdfFile(file);
        setEditedPdfFile(file);
        setIsDirty(false);
        setWarning('Theme retention is limited: exported PDF will not perfectly match the original.');
        // Extract text for originalContent
        extractTextFromPDF(file);
      } else {
        setError('Only PDF upload is supported in this version.');
      }
    } catch (err) {
      console.error('Error processing file:', err);
      setError('Error processing file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Extract text from PDF for originalContent
  const extractTextFromPDF = async (pdfFile) => {
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let extractedText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const textItems = textContent.items;
        textItems.sort((a, b) => {
          const yDiff = b.transform[5] - a.transform[5];
          if (Math.abs(yDiff) > 5) return yDiff;
          return a.transform[4] - b.transform[4];
        });
        let currentY = null;
        for (const item of textItems) {
          const y = item.transform[5];
          if (currentY !== null && Math.abs(y - currentY) > 5) {
            extractedText += '\n';
          }
          extractedText += item.str;
          currentY = y;
        }
        extractedText += '\n\n';
      }
      setOriginalContent(extractedText);
      setEditedContent(extractedText);
    } catch (err) {
      setOriginalContent('');
      setEditedContent('');
    }
  };

  const handleOverlayReplace = async () => {
    if (!findText || !replaceText || !originalPdfFile) {
      setError('Please provide both the text to replace and the replacement text.');
      return;
    }
    setIsDirty(true);
    try {
      const originalPdfBytes = await originalPdfFile.arrayBuffer();
      // Create separate copies for PDF.js and pdf-lib
      const pdfjsBytes = originalPdfBytes.slice(0);
      const pdflibBytes = originalPdfBytes.slice(0);
      // Use PDF.js to find the text position
      const pdf = await pdfjsLib.getDocument({ data: pdfjsBytes }).promise;
      let found = false;
      let pos = null;
      let pageIndex = 0;
      let fontSize = 12;
      for (let i = 1; i <= pdf.numPages && !found; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        for (const item of textContent.items) {
          if (item.str.includes(findText)) {
            pos = {
              x: item.transform[4],
              y: page.getViewport({ scale: 1.0 }).height - item.transform[5],
              width: item.width,
              height: item.height,
            };
            fontSize = Math.sqrt(item.transform[0] * item.transform[0] + item.transform[1] * item.transform[1]);
            pageIndex = i - 1;
            found = true;
            break;
          }
        }
      }
      if (!found) {
        setError('Text to replace not found in the PDF.');
        return;
      }
      // Use pdf-lib to overlay the replacement
      const pdfDoc = await PDFDocument.load(pdflibBytes);
      const pages = pdfDoc.getPages();
      const page = pages[pageIndex];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      // Cover the old text
      page.drawRectangle({
        x: pos.x,
        y: pos.y,
        width: pos.width,
        height: fontSize + 2,
        color: rgb(1, 1, 1),
      });
      // Draw the new text
      page.drawText(replaceText, {
        x: pos.x,
        y: pos.y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      const pdfBytes = await pdfDoc.save();
      const newPdfFile = new File([pdfBytes], fileName, { type: 'application/pdf' });
      setEditedPdfFile(newPdfFile);
    } catch (err) {
      console.error('Error replacing text:', err);
      setError('Error replacing text. Please try again.');
    }
  };

  const handleContentChange = async (content) => {
    setEditedContent(content);
    setIsDirty(true);
    try {
      // Load the original PDF
      const originalPdfBytes = await originalPdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(originalPdfBytes);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      // Get the edited content lines and clean them
      const editedLines = content.split('\n')
        .filter(line => line.trim())
        .map(line => {
          // Remove control characters and keep only printable ASCII characters
          return line.replace(/[^\x20-\x7E]/g, '');
        });
      // For each page, clear and draw the edited content
      let lineIndex = 0;
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const { width, height } = page.getSize();
        // Clear the page
        page.drawRectangle({
          x: 0,
          y: 0,
          width,
          height,
          color: rgb(1, 1, 1)
        });
        // Draw lines with margin and spacing
        const margin = 50;
        const lineHeight = 18;
        let y = height - margin;
        while (y > margin && lineIndex < editedLines.length) {
          page.drawText(editedLines[lineIndex], {
            x: margin,
            y,
            size: 12,
            font,
            color: rgb(0, 0, 0)
          });
          y -= lineHeight;
          lineIndex++;
        }
      }
      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const newPdfFile = new File([pdfBytes], fileName, { type: 'application/pdf' });
      setEditedPdfFile(newPdfFile);
    } catch (err) {
      console.error('Error updating PDF:', err);
      setError('Error updating PDF. Please try again.');
    }
  };

  const handleDownloadPdf = async () => {
    if (!editedPdfFile) return;

    try {
    setIsPdfGenerating(true);
    
      // Create a download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(editedPdfFile);
      link.download = `edited_${fileName}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError('Error generating PDF. Please try again.');
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all changes?')) {
      setEditedPdfFile(originalPdfFile);
      setEditedContent(originalContent);
      setIsDirty(false);
    }
  };

  // UI
  if (authLoading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#6C47FF', fontWeight: 700 }}>Loading...</div>;
  if (!user) return <Login />;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #f6f9fc 0%, #eef2f7 100%)', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Header onLogin={() => {}} onLogout={logout} user={user} />

      {/* Upload & Warning */}
      <div style={{ display: 'flex', gap: '12px', padding: '24px 40px', background: 'white', borderBottom: 'none', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <label style={{ padding: '12px 28px', backgroundColor: '#6C47FF', color: 'white', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: 16, boxShadow: '0 2px 8px rgba(108,71,255,0.08)' }}>
          <Upload size={20} /> Upload Resume
          <input type="file" accept=".pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>
        {editedPdfFile && (
          <>
            <button onClick={handleReset} disabled={!isDirty} style={{ padding: '12px 28px', backgroundColor: isDirty ? '#dc3545' : '#ccc', color: 'white', border: 'none', borderRadius: '8px', cursor: isDirty ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: 16 }}>
              <RotateCcw size={20} /> Reset Changes
            </button>
            <button onClick={handleDownloadPdf} disabled={isPdfGenerating} style={{ padding: '12px 28px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: isPdfGenerating ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: 16 }}>
              {isPdfGenerating ? (<Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />) : (<Download size={20} />)} Export PDF
            </button>
                </>
              )}
        {warning && <span style={{ color: '#e67e22', marginLeft: '24px', fontWeight: 600, fontSize: 16 }}>{warning}</span>}
        </div>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
        {/* Original PDF View */}
        <div style={{ background: 'rgba(255,255,255,0.08)', boxShadow: '0 4px 24px rgba(108,71,255,0.08)', borderRadius: 16, backdropFilter: 'blur(8px)', border: 'none', overflow: 'hidden', height: 'calc(100vh - 220px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 24px', borderBottom: 'none', backgroundColor: '#f8f9fa' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#6C47FF' }}>Original PDF</h2>
          </div>
          <div style={{ flex: 1, overflow: 'auto', background: '#f6f9fc' }}>
            <PDFEditor file={originalPdfFile} />
          </div>
              </div>
        {/* Editor */}
        <div style={{ background: 'rgba(255,255,255,0.08)', boxShadow: '0 4px 24px rgba(108,71,255,0.08)', borderRadius: 16, backdropFilter: 'blur(8px)', border: 'none', overflow: 'hidden', height: 'calc(100vh - 220px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 24px', borderBottom: 'none', backgroundColor: '#f8f9fa' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#6C47FF' }}>Editor</h2>
                    </div>
          <div style={{ flex: 1, overflow: 'auto', background: '#f6f9fc' }}>
            <PDFContentEditor file={originalPdfFile} value={editedContent} onContentChange={handleContentChange} />
                        </div>
                      </div>
      </main>
      {/* Error Message */}
      {error && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', padding: '20px 32px', backgroundColor: '#dc3545', color: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', zIndex: 1000, fontWeight: 600, fontSize: 16 }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#6C47FF', fontWeight: 700 }}>Loading...</div>;

  if (!user) {
    if (showLogin) {
      return <Login onBack={() => setShowLogin(false)} />;
    }
    return <LandingPage onLogin={() => setShowLogin(true)} />;
  }

  return <ResumeApp />;
} 