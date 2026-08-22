import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import logo from '../assets/logo.webp';
import { ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

/* Hallmark · genre: editorial · theme: Atelier
 * Login page redesigned with high-contrast typography and OKLCH Atelier design system
 */

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorMsg) setErrorMsg('');
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/facebook`;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        window.location.href = '/chat';
      } else {
        setErrorMsg(data.message || 'Login gagal. Silakan periksa kembali email dan kata sandi Anda.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('Gagal terhubung ke server. Periksa koneksi internet Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Masuk ke Akun — Guyu Chat"
        description="Masuk ke akun Guyu Chat untuk mengakses ruang obrolan terenkripsi end-to-end secara privat."
        keywords="login, masuk, guyu chat, e2ee chat, obrolan terenkripsi"
        type="website"
      />

      <div className="w-full max-w-md space-y-[var(--space-md)]">
        
        {/* Brand Header */}
        <div className="text-center space-y-[var(--space-xs)]">
          <Link to="/" className="inline-flex items-center gap-[var(--space-xs)] group">
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: 'var(--radius-sm)',
                border: 'var(--rule-hairline)',
                backgroundColor: 'var(--color-bg-surface)',
                padding: '3px',
                overflow: 'hidden',
              }}
            >
              <img src={logo} alt="Guyu Chat" className="w-full h-full object-cover" />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                letterSpacing: '-0.02em',
              }}
            >
              Guyu Chat
            </span>
          </Link>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-accent)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            [ OTENTIKASI SESI E2EE ]
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 600,
              color: 'var(--color-text-main)',
              lineHeight: 1.2,
            }}
          >
            Masuk ke Sesi Obrolan
          </h1>
        </div>

        {/* Login Form Container */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            border: 'var(--rule-hairline)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-lg)',
          }}
          className="space-y-[var(--space-md)]"
        >
          {errorMsg && (
            <div
              style={{
                padding: 'var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'oklch(95% 0.05 20)',
                border: '1px solid oklch(50% 0.2 20)',
                color: 'oklch(40% 0.2 20)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-xs)',
              }}
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-[var(--space-md)]">
            <div className="space-y-[var(--space-3xs)]">
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.05em',
                }}
              >
                ALAMAT EMAIL:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="nama@domain.com"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--color-bg-base)',
                  border: 'var(--rule-hairline)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-sm)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-main)',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-focus)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
              />
            </div>

            <div className="space-y-[var(--space-3xs)]">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  KATA SANDI:
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--color-bg-base)',
                  border: 'var(--rule-hairline)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-sm)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-main)',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-focus)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer flex items-center justify-center gap-2"
              style={{
                padding: 'var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-paper)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'var(--text-sm)',
                border: 'none',
                opacity: isLoading ? 0.6 : 1,
                transition: `opacity var(--dur-micro) var(--ease-out)`,
              }}
            >
              {isLoading ? (
                <span>Memproses Otentikasi...</span>
              ) : (
                <>
                  <span>Masuk Sesi</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social OAuth Divider */}
          <div className="relative py-[var(--space-2xs)]">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full" style={{ borderTop: 'var(--rule-hairline)' }} />
            </div>
            <div className="relative flex justify-center">
              <span
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  padding: '0 var(--space-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-dim)',
                  textTransform: 'uppercase',
                }}
              >
                Atau OAuth
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[var(--space-xs)]">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="cursor-pointer flex items-center justify-center gap-2"
              style={{
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                border: 'var(--rule-hairline)',
                backgroundColor: 'var(--color-bg-base)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-main)',
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleFacebookLogin}
              className="cursor-pointer flex items-center justify-center gap-2"
              style={{
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                border: 'var(--rule-hairline)',
                backgroundColor: 'var(--color-bg-base)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-main)',
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div
          className="text-center space-y-[var(--space-xs)]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          <p>
            Belum memiliki akun?{' '}
            <Link to="/register" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
              Buat akun baru
            </Link>
          </p>
          <div>
            <Link to="/" style={{ color: 'var(--color-text-dim)' }}>
              ← Kembali ke Beranda Utama
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}

export default Login;
