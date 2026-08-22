import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ShieldCheck, Check, X } from 'lucide-react';

/* Hallmark · genre: editorial · theme: Atelier
 * Privacy Policy page with responsive clamp spacing and Atelier tokens
 */

function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Kebijakan Privasi - Guyu Chat"
        description="Dokumentasi resmi mengenai perlindungan data pribadi dan enkripsi zero-knowledge di platform Guyu Chat."
        keywords="kebijakan privasi, privacy policy, guyu chat, enkripsi e2ee, zero-knowledge, perlindungan data"
        type="article"
      />

      <div
        style={{
          backgroundColor: 'var(--color-bg-base)',
          color: 'var(--color-text-main)',
          fontFamily: 'var(--font-body)',
        }}
        className="min-h-screen pb-[var(--space-2xl)]"
      >
        {/* Header */}
        <section
          style={{
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            borderBottom: 'var(--rule-hairline)',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
        >
          <div className="max-w-3xl space-y-[var(--space-sm)]">
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
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DOKUMEN PRIVASI & TRANSPARANSI DATA</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              Kebijakan <span style={{ color: 'var(--color-accent)' }}>Privasi</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(var(--text-sm), 2vw, var(--text-md))',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
              }}
            >
              Transparansi penuh mengenai pemrosesan data, enkripsi lokal, serta komitmen kami terhadap arsitektur zero-knowledge.
            </p>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-dim)',
              }}
            >
              Terakhir Diperbarui: Januari 2026 • Versi Protokol: E2EE-v2
            </div>
          </div>
        </section>

        {/* Matrix Comparison Section */}
        <section
          style={{
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            borderBottom: 'var(--rule-hairline)',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)]">
            
            {/* Allowed Data Practices */}
            <div
              style={{
                padding: 'var(--space-lg)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-surface)',
                border: 'var(--rule-hairline)',
              }}
              className="space-y-[var(--space-xs)]"
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'oklch(60% 0.15 140)',
                }}
                className="flex items-center gap-2 font-bold"
              >
                <Check className="w-4 h-4" />
                <span>PRAKTIK DITERAPKAN (YANG KAMI LAKUKAN)</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <span style={{ color: 'oklch(60% 0.15 140)' }}>•</span>
                  <span>Enkripsi AES-256-GCM pada tingkat perangkat sebelum pesan dikirim.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'oklch(60% 0.15 140)' }}>•</span>
                  <span>Penyimpanan data minimal hanya untuk otentikasi akun dasar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'oklch(60% 0.15 140)' }}>•</span>
                  <span>Pertukaran kunci privat ECDH langsung antar-browser tanpa perantara.</span>
                </li>
              </ul>
            </div>

            {/* Prohibited Data Practices */}
            <div
              style={{
                padding: 'var(--space-lg)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-surface)',
                border: 'var(--rule-hairline)',
              }}
              className="space-y-[var(--space-xs)]"
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent)',
                }}
                className="flex items-center gap-2 font-bold"
              >
                <X className="w-4 h-4" />
                <span>PRAKTIK DILARANG (YANG TIDAK KAMI LAKUKAN)</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-[var(--color-text-muted)]">
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>•</span>
                  <span>Menjual, menyewakan, atau membagikan data pengguna ke pihak ketiga.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>•</span>
                  <span>Membaca atau merekam konten percakapan plaintext di peladen.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: 'var(--color-accent)' }}>•</span>
                  <span>Melacak aktivitas jelajah web pengguna di luar aplikasi Guyu Chat.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* Detailed Sections */}
        <section
          style={{
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
          className="space-y-[var(--space-lg)]"
        >
          {/* Data Collection Details */}
          <div className="space-y-[var(--space-xs)]">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                borderLeft: '2px solid var(--color-accent)',
                paddingLeft: 'var(--space-xs)',
              }}
            >
              1. Informasi yang Dikumpulkan
            </h2>
            <div
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: 'var(--rule-hairline)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md)',
              }}
              className="space-y-[var(--space-xs)] text-sm text-[var(--color-text-muted)] leading-relaxed"
            >
              <div>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-main)' }} className="block mb-1">
                  INFORMASI AKUN OPERASIONAL
                </strong>
                Alamat email terverifikasi dan hash kata sandi terenkripsi yang digunakan khusus untuk keperluan otentikasi sesi login.
              </div>
              <div>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-main)' }} className="block mb-1">
                  METADATA KONEKSI TEMPORER
                </strong>
                Informasi dasar berupa IP address dan user agent saat koneksi WebSocket dibuat untuk mendeteksi ancaman bot. Metadata ini dibersihkan secara berkala.
              </div>
            </div>
          </div>

          {/* Encryption Architecture */}
          <div className="space-y-[var(--space-xs)]">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                borderLeft: '2px solid var(--color-accent)',
                paddingLeft: 'var(--space-xs)',
              }}
            >
              2. Keamanan Enkripsi Client-Side
            </h2>
            <div
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: 'var(--rule-hairline)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-md)',
              }}
              className="space-y-2 text-sm text-[var(--color-text-muted)] leading-relaxed"
            >
              <p>
                Seluruh percakapan privat menggunakan algoritma enkripsi simetris <code className="font-mono text-xs text-[var(--color-accent)]">AES-256-GCM</code>. Kunci sesi dibangkitkan melalui kurva eliptis <code className="font-mono text-xs text-[var(--color-accent)]">ECDH P-256</code> pada Web Crypto API browser Anda.
              </p>
              <p>
                Sistem tidak menyimpan kunci privat Anda di server. Jika terjadi peretasan pada peladen, peretas tetap tidak memiliki kemampuan teknis untuk mendeskripsi pesan Anda.
              </p>
            </div>
          </div>

          {/* User Rights */}
          <div className="space-y-[var(--space-xs)]">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                borderLeft: '2px solid var(--color-accent)',
                paddingLeft: 'var(--space-xs)',
              }}
            >
              3. Hak-Hak Pengguna
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-xs)]">
              <div
                style={{
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: 'var(--rule-hairline)',
                }}
                className="space-y-1"
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-accent)' }}>
                  HAK 01: HAPUS AKUN & DATA
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Pengguna berhak mengajukan penghapusan akun permanen beserta seluruh identitas yang tersimpan di basis data kapan saja.
                </p>
              </div>

              <div
                style={{
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: 'var(--rule-hairline)',
                }}
                className="space-y-1"
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-accent)' }}>
                  HAK 02: EKSPOR DATA OPERASIONAL
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Pengguna dapat meminta salinan data profil dan riwayat otentikasi akun yang tersimpan secara terstruktur.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div
            style={{
              padding: 'var(--space-md)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg-surface)',
              border: 'var(--rule-hairline)',
            }}
            className="flex flex-col sm:flex-row justify-between items-center gap-[var(--space-sm)]"
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-main)' }}>
                Pertanyaan Terkait Kebijakan Privasi?
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
                Hubungi Petugas Perlindungan Data kami untuk pertanyaan resmi.
              </div>
            </div>

            <Link
              to="/contact"
              style={{
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-paper)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
              className="cursor-pointer shrink-0"
            >
              Hubungi Support
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default PrivacyPolicy;
