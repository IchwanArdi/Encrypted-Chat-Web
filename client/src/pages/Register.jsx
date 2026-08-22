import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import logo from '../assets/logo.webp';
import { ArrowRight, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

/* Hallmark · genre: editorial · theme: Atelier
 * Register page redesigned with OKLCH Atelier design tokens & high-contrast editorial typography
 */

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName.trim()) return setError('Nama depan wajib diisi'), false;
    if (!lastName.trim()) return setError('Nama belakang wajib diisi'), false;
    if (!email.trim()) return setError('Alamat email wajib diisi'), false;
    if (!password) return setError('Kata sandi wajib diisi'), false;
    if (password.length < 3) return setError('Kata sandi minimal 3 karakter'), false;
    if (password !== confirmPassword) return setError('Konfirmasi kata sandi tidak cocok'), false;
    if (!agreedToTerms) return setError('Anda wajib menyetujui Ketentuan Layanan & Kebijakan Privasi'), false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Pendaftaran berhasil! Mengarahkan ke halaman masuk...');

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setAgreedToTerms(false);

        setTimeout(() => {
          navigate('/login', {
            state: {
              message: 'Pendaftaran berhasil! Silakan masuk dengan kredensial Anda.',
              email: formData.email.trim().toLowerCase(),
            },
          });
        }, 2000);
      } else {
        setError(data.message || 'Pendaftaran gagal. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Gagal terhubung ke jaringan. Periksa koneksi internet Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/${provider}`;
  };

  return (
    <>
      <SEO
        title="Daftar Akun Baru — Guyu Chat"
        description="Buat akun gratis di Guyu Chat untuk mendapatkan pasangan kunci enkripsi lokal dan memulai percakapan privat."
        keywords="daftar, register, akun baru, e2ee chat, guyu chat"
        type="website"
      />

      <div className="w-full max-w-md space-y-[var(--space-md)] py-[var(--space-md)]">
        
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
            [ REGISTRASI PENGGUNA TERENKRIPSI ]
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
            Buat Akun Terenkripsi
          </h1>
        </div>

        {/* Form Container */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            border: 'var(--rule-hairline)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-lg)',
          }}
          className="space-y-[var(--space-md)]"
        >
          {error && (
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
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div
              style={{
                padding: 'var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'oklch(95% 0.05 140)',
                border: '1px solid oklch(50% 0.15 140)',
                color: 'oklch(35% 0.15 140)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-xs)',
              }}
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-[var(--space-sm)]">
            
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-[var(--space-xs)]">
              <div className="space-y-[var(--space-3xs)]">
                <label
                  htmlFor="firstName"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  NAMA DEPAN:
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Budi"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-bg-base)',
                    border: 'var(--rule-hairline)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-xs) var(--space-sm)',
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
                <label
                  htmlFor="lastName"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  NAMA BELAKANG:
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Santoso"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-bg-base)',
                    border: 'var(--rule-hairline)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-xs) var(--space-sm)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-main)',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-focus)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-[var(--space-3xs)]">
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
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
                placeholder="budi@domain.com"
                disabled={isLoading}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--color-bg-base)',
                  border: 'var(--rule-hairline)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-xs) var(--space-sm)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-text-main)',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-focus)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
              />
            </div>

            {/* Password */}
            <div className="space-y-[var(--space-3xs)]">
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                KATA SANDI:
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-bg-base)',
                    border: 'var(--rule-hairline)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-xs) var(--space-sm)',
                    paddingRight: '2.5rem',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-main)',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-focus)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-2.5 cursor-pointer text-[var(--color-text-dim)]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-[var(--space-3xs)]">
              <label
                htmlFor="confirmPassword"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                KONFIRMASI SANDI:
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-bg-base)',
                    border: 'var(--rule-hairline)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-xs) var(--space-sm)',
                    paddingRight: '2.5rem',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-text-main)',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-focus)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2.5 top-2.5 cursor-pointer text-[var(--color-text-dim)]"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={isLoading}
                className="mt-0.5 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                Saya menyetujui{' '}
                <Link to="/terms-of-service" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                  Ketentuan Layanan
                </Link>{' '}
                dan{' '}
                <Link to="/privacy-policy" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                  Kebijakan Privasi
                </Link>.
              </label>
            </div>

            {/* Submit Button */}
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
                <span>Mendaftarkan Akun...</span>
              ) : (
                <>
                  <span>Daftar Akun Baru</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Register Divider */}
          <div className="relative py-1">
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
                Atau Register OAuth
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[var(--space-xs)] font-mono text-xs">
            <button
              type="button"
              onClick={() => handleSocialRegister('google')}
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
              onClick={() => handleSocialRegister('facebook')}
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

        {/* Footer Link */}
        <div
          className="text-center"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
          }}
        >
          Sudah memiliki akun?{' '}
          <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
            Masuk di sini
          </Link>
        </div>

      </div>
    </>
  );
}

export default Register;
