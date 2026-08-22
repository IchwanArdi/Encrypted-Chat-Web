import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { FileText, ArrowRight } from 'lucide-react';

/* Hallmark · genre: editorial · theme: Atelier
 * Terms of Service page with responsive clamp spacing and Atelier tokens
 */

function TermsOfService() {
  const TERMS_SECTIONS = [
    {
      id: 'SEC-01',
      title: '1. Penerimaan Syarat & Ketentuan',
      content: 'Dengan mengakses atau menggunakan platform Guyu Chat, Anda secara penuh menyetujui dan terikat oleh Syarat & Ketentuan ini. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda dilarang menggunakan layanan Guyu Chat.',
    },
    {
      id: 'SEC-02',
      title: '2. Kelayakan & Keamanan Akun',
      content: 'Pengguna wajib berusia minimal 13 tahun. Anda bertanggung jawab menjaga kerahasiaan kredensial login Anda. Aktivitas yang dilakukan melalui akun Anda merupakan tanggung jawab hukum Anda sepenuhnya.',
    },
    {
      id: 'SEC-03',
      title: '3. Aturan Perilaku Pengguna (Acceptable Use)',
      content: 'Pengguna dilarang memanfaatkan platform untuk tindakan ilegal, penyebaran malware, aktivitas penyadapan tanpa hak, spamming otomatis, atau pelecehan kepada pengguna lain. Pelanggaran berat akan mengakibatkan penangguhan akun secara permanen.',
    },
    {
      id: 'SEC-04',
      title: '4. Batasan Tanggung Jawab Platform',
      content: 'Guyu Chat disediakan dengan prinsip "sebagaimana adanya" (AS-IS). Karena arsitektur zero-knowledge yang kami terapkan, kami tidak bertanggung jawab atas kehilangan kunci privat lokal atau pesan yang terhapus di perangkat pengguna.',
    },
    {
      id: 'SEC-05',
      title: '5. Ketersediaan Layanan (Uptime)',
      content: 'Kami berusaha menjaga ketersediaan layanan sistem secara optimal. Namun, kami tidak menjamin ketersediaan tanpa henti akibat pemeliharaan jaringan terjadwal atau gangguan infrastruktur pihak ketiga.',
    },
    {
      id: 'SEC-06',
      title: '6. Perubahan Ketentuan Layanan',
      content: 'Guyu Chat berhak memperbarui dokumen Syarat & Ketentuan ini sewaktu-waktu. Perubahan signifikan akan diumumkan melalui pembaruan pada halaman ini.',
    },
  ];

  return (
    <>
      <SEO
        title="Ketentuan Layanan - Guyu Chat"
        description="Dokumentasi resmi Syarat & Ketentuan penggunaan platform obrolan privat Guyu Chat."
        keywords="terms of service, ketentuan layanan, syarat dan ketentuan, guyu chat, aturan penggunaan"
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
              <FileText className="w-3.5 h-3.5" />
              <span>DOKUMEN LEGAL & LISENSI LAYANAN</span>
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
              Ketentuan <span style={{ color: 'var(--color-accent)' }}>Layanan</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(var(--text-sm), 2vw, var(--text-md))',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
              }}
            >
              Aturan dan syarat penggunaan platform Guyu Chat yang berlaku bagi seluruh pengguna.
            </p>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-dim)',
              }}
            >
              Berlaku Efektif: 1 Januari 2026 • Versi Dokumen: TOS-v2.1
            </div>
          </div>
        </section>

        {/* TL;DR Summary Block */}
        <section
          style={{
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            borderBottom: 'var(--rule-hairline)',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
        >
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
            >
              // RINGKASAN SINGKAT DOKUMEN
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-sm)] text-xs font-mono text-[var(--color-text-muted)]">
              <div className="space-y-1">
                <div style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>YANG DIPERBOLEHKAN:</div>
                <div>• Berkomunikasi secara etis & privat.</div>
                <div>• Menggunakan layanan web tanpa biaya langganan.</div>
                <div>• Menghapus akun kapan saja secara mandiri.</div>
              </div>
              <div className="space-y-1">
                <div style={{ fontWeight: 700, color: 'var(--color-accent)' }}>YANG DILARANG:</div>
                <div>• Melakukan serangan siber atau spamming.</div>
                <div>• Menyalahgunakan platform untuk kegiatan ilegal.</div>
                <div>• Mencoba mendekripsi obrolan pengguna lain.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Terms Stack */}
        <section
          style={{
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
          className="space-y-[var(--space-md)]"
        >
          {TERMS_SECTIONS.map((sec) => (
            <div
              key={sec.id}
              style={{
                padding: 'var(--space-lg)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-surface)',
                border: 'var(--rule-hairline)',
              }}
              className="space-y-[var(--space-3xs)]"
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>
                {sec.id}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                }}
              >
                {sec.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                }}
              >
                {sec.content}
              </p>
            </div>
          ))}

          {/* Bottom Footer Action */}
          <div
            style={{
              paddingTop: 'var(--space-md)',
              borderTop: 'var(--rule-hairline)',
            }}
            className="flex flex-col sm:flex-row justify-between items-center gap-[var(--space-sm)]"
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
              Memiliki pertanyaan legal? Hubungi support@guyuchat.com
            </div>
            <Link
              to="/privacy-policy"
              style={{
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-bg-surface)',
                border: 'var(--rule-hairline)',
                color: 'var(--color-text-main)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                textDecoration: 'none',
              }}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Baca Kebijakan Privasi</span>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default TermsOfService;
