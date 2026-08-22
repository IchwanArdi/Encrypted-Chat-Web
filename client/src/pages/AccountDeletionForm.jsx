import { useState } from 'react';
import { AlertTriangle, CheckCircle2, AlertCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO';

/* Hallmark · genre: editorial · theme: Atelier
 * Account Deletion Form page redesigned with Atelier design system tokens
 */

function AccountDeletionForm() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    reason: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim() || !formData.fullName.trim()) {
      setMessage({ type: 'error', text: 'Email dan nama lengkap wajib diisi' });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Format email tidak valid' });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/api/data/request-deletion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          fullName: formData.fullName.trim(),
          reason: formData.reason.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: 'success', text: data.message });
        setFormData({ email: '', fullName: '', reason: '' });
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Terjadi kesalahan saat mengirim permintaan',
        });
      }
    } catch (error) {
      console.error('Request error:', error);
      setMessage({
        type: 'error',
        text: 'Tidak dapat terhubung ke server. Silakan coba lagi nanti.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Permintaan Penghapusan Akun — Guyu Chat"
        description="Formulir permohonan penghapusan akun dan pembersihan data pribadi di Guyu Chat."
        noindex={true}
      />

      <div className="w-full max-w-md space-y-[var(--space-md)] py-[var(--space-md)]">
        {/* Header */}
        <div className="text-center space-y-[var(--space-xs)]">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-accent)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            [ DERAJAT HAK PENGGUNA ]
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 600,
              color: 'var(--color-text-main)',
            }}
          >
            Penghapusan Data Akun
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
            }}
          >
            Isi formulir di bawah ini untuk mengajukan permohonan pembersihan data akun secara permanen.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            border: 'var(--rule-hairline)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-lg)',
          }}
          className="space-y-[var(--space-md)]"
        >
          {message.text && (
            <div
              style={{
                padding: 'var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: message.type === 'success' ? 'oklch(95% 0.05 140)' : 'oklch(95% 0.05 20)',
                border: message.type === 'success' ? '1px solid oklch(50% 0.15 140)' : '1px solid oklch(50% 0.2 20)',
                color: message.type === 'success' ? 'oklch(35% 0.15 140)' : 'oklch(40% 0.2 20)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-xs)',
              }}
            >
              {message.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <div>
                <div style={{ fontWeight: 700 }}>
                  {message.type === 'success' ? 'Permintaan Terkirim' : 'Gagal Mengirim'}
                </div>
                <div>{message.text}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-[var(--space-sm)]">
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
                EMAIL AKUN <span style={{ color: 'var(--color-accent)' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="nama@domain.com"
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
                htmlFor="fullName"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                NAMA LENGKAP <span style={{ color: 'var(--color-accent)' }}>*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Budi Santoso"
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
                htmlFor="reason"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                ALASAN PENGHAPUSAN (OPSIONAL)
              </label>
              <textarea
                id="reason"
                name="reason"
                rows={3}
                value={formData.reason}
                onChange={handleInputChange}
                disabled={loading}
                placeholder="Tuliskan alasan Anda..."
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

            {/* Warning Box */}
            <div
              style={{
                padding: 'var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-paper-3)',
                border: 'var(--rule-hairline)',
              }}
              className="space-y-[var(--space-2xs)]"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[var(--color-accent)]" />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: 'var(--color-text-main)',
                  }}
                >
                  PERINGATAN PERMANEN
                </span>
              </div>
              <ul
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-muted)',
                }}
                className="space-y-1 pl-5 list-disc"
              >
                <li>Penghapusan akun bersifat irreversible (tidak dapat dibatalkan).</li>
                <li>Seluruh identitas otentikasi akan dibersihkan dari basis data.</li>
                <li>Proses pembersihan memerlukan 7–30 hari kerja.</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer flex items-center justify-center gap-2"
              style={{
                padding: 'var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-paper)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'var(--text-sm)',
                border: 'none',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? <span>Mengirimkan Permintaan...</span> : <span>Kirim Permintaan Penghapusan</span>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountDeletionForm;
