import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowLeft, Loader2, FileText, CheckCircle2 } from 'lucide-react';

function Logo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#FFD700"/>
      <text x="20" y="27" textAnchor="middle" fontWeight="bold" fontSize="18" fill="#181c2a" fontFamily="Inter, system-ui, sans-serif">RP</text>
    </svg>
  );
}

const Login = ({ onBack }) => {
  const [step, setStep] = useState('input');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, requestOTP } = useAuth();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!email) {
      setError('Please provide your email address');
      setLoading(false);
      return;
    }
    const result = await requestOTP(email, '');
    if (result.success) {
      setStep('otp');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, '', otp);
    if (!result.success) {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        position: 'relative',
        backdropFilter: 'blur(12px)',
        border: 'none',
        padding: '0 0 24px 0',
        color: 'white',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 32px 16px',
        }}>
          <Logo />
          <h1 style={{
            margin: '18px 0 8px 0',
            fontSize: '26px',
            fontWeight: 800,
            color: 'white',
            letterSpacing: 0.5
          }}>
            Welcome Back
          </h1>
          <p style={{
            margin: 0,
            fontSize: '15px',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: '1.5',
            fontWeight: 400
          }}>
            {step === 'input' ? 'Sign in to access your resume editor' : 'Enter the verification code sent to your email'}
          </p>
        </div>
        <div style={{ padding: '0 32px' }}>
          {error && (
            <div style={{
              padding: '14px',
              backgroundColor: 'rgba(220,38,38,0.12)',
              color: '#FFD700',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#FFD700" strokeWidth="2" fill="none" />
                <rect x="9" y="5" width="2" height="6" rx="1" fill="#FFD700" />
                <rect x="9" y="13" width="2" height="2" rx="1" fill="#FFD700" />
              </svg>
              {error}
            </div>
          )}
          {step === 'input' ? (
            <form onSubmit={handleRequestOTP}>
              <div style={{ marginBottom: '22px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#FFD700',
                  marginBottom: '8px'
                }}>
                  Email Address
                </label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Mail size={18} style={{
                    position: 'absolute',
                    left: '16px',
                    color: '#FFD700'
                  }} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 48px',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: '15px',
                      color: '#181c2a',
                      backgroundColor: 'rgba(255,255,255,0.85)',
                      transition: 'all 0.2s',
                      outline: 'none',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                    }}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#FFD700',
                  color: '#181c2a',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(255,215,0,0.10)'
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Sending Code...
                  </>
                ) : (
                  'Continue'
                )}
              </button>
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  style={{
                    width: '100%',
                    padding: '14px',
                    marginTop: '12px',
                    backgroundColor: 'transparent',
                    color: '#FFD700',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s',
                    boxShadow: 'none'
                  }}
                >
                  <ArrowLeft size={18} />
                  Back to Home
                </button>
              )}
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div style={{ marginBottom: '22px' }}>
                <div style={{
                  backgroundColor: 'rgba(255,215,0,0.08)',
                  padding: '14px',
                  borderRadius: '10px',
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#FFD700',
                  fontWeight: 500
                }}>
                  <CheckCircle2 size={20} color="#FFD700" />
                  Verification code sent to {email}
                </div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#FFD700',
                  marginBottom: '8px'
                }}>
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '22px',
                    textAlign: 'center',
                    letterSpacing: '8px',
                    color: '#181c2a',
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    transition: 'all 0.2s',
                    outline: 'none',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
                  }}
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#FFD700',
                  color: '#181c2a',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(255,215,0,0.10)'
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>
              <button
                type="button"
                onClick={() => setStep('input')}
                style={{
                  width: '100%',
                  padding: '14px',
                  marginTop: '12px',
                  backgroundColor: 'transparent',
                  color: '#FFD700',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s',
                  boxShadow: 'none'
                }}
              >
                <ArrowLeft size={18} />
                Back to Email
              </button>
            </form>
          )}
        </div>
        <div style={{
          padding: '18px 32px 0 32px',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '13px',
        }}>
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          input:focus {
            box-shadow: 0 0 0 2px #FFD70044;
          }
          button:hover:not(:disabled) {
            transform: translateY(-1px);
            background-color: #ffe066;
          }
          button:active:not(:disabled) {
            transform: translateY(0);
          }
        `}
      </style>
    </div>
  );
};

export default Login; 