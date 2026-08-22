import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

/* Hallmark · genre: editorial · theme: Atelier
 * 404 Not Found Page using Atelier design tokens
 */

function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 - Halaman Tidak Ditemukan"
        description="Halaman yang Anda cari tidak ditemukan di Guyu Chat. Silakan kembali ke beranda."
        noindex={true}
      />

      <div
        style={{
          backgroundColor: 'var(--color-bg-base)',
          color: 'var(--color-text-main)',
          fontFamily: 'var(--font-body)',
        }}
        className="min-h-screen flex items-center justify-center p-[var(--page-gutter)]"
      >
        <div className="max-w-md w-full text-center space-y-[var(--space-md)]">
          <div
            className="inline-flex items-center gap-2"
            style={{
              padding: 'var(--space-3xs) var(--space-xs)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-bg-surface)',
              border: 'var(--rule-hairline)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-accent)',
            }}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>ERROR 404 • ROUTE_NOT_FOUND</span>
          </div>

          <div className="space-y-[var(--space-xs)]">
            <h1
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                fontWeight: 700,
                color: 'var(--color-accent)',
                lineHeight: 1,
              }}
            >
              404
            </h1>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                fontWeight: 600,
                color: 'var(--color-text-main)',
              }}
            >
              Halaman Tidak Ditemukan
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
              }}
            >
              Alamat URL yang Anda tuju tidak terdaftar pada jalur protokol Guyu Chat atau telah dipindahkan.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              style={{
                padding: 'var(--space-sm) var(--space-lg)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-paper)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda Utama</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
