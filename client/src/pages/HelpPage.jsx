import { useState } from 'react';
import SEO from '../components/SEO';
import { HelpCircle, Search, ChevronDown, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

/* Hallmark · genre: editorial · theme: Atelier
 * Help Center page with responsive clamp spacing and Atelier tokens
 */

function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const CATEGORIES = [
    { id: 'all', label: 'Semua Topik' },
    { id: 'general', label: 'Pengenalan' },
    { id: 'security', label: 'Keamanan & E2EE' },
    { id: 'account', label: 'Manajemen Akun' },
    { id: 'troubleshoot', label: 'Pemecahan Masalah' },
  ];

  const FAQS = [
    {
      id: 1,
      category: 'general',
      question: 'Bagaimana cara memulai obrolan di Guyu Chat?',
      answer: 'Klik tombol "Mulai Chat", buat akun dalam beberapa detik, lalu Anda bisa langsung memasuki ruang obrolan publik atau memulai percakapan privat.',
    },
    {
      id: 2,
      category: 'security',
      question: 'Bagaimana cara kerja Enkripsi End-to-End di platform ini?',
      answer: 'Kunci enkripsi dibangkitkan secara lokal di browser Anda menggunakan algoritma Web Crypto AES-256-GCM. Pesan dienkripsi sebelum terkirim ke server, sehingga server hanya menerima biner ciphertext acak.',
    },
    {
      id: 3,
      category: 'security',
      question: 'Apakah pesan saya disimpan di server?',
      answer: 'Server Guyu Chat menganut prinsip Zero-Knowledge. Konten plaintext percakapan tidak pernah disimpan atau diolah di server.',
    },
    {
      id: 4,
      category: 'account',
      question: 'Apakah saya perlu mengunduh aplikasi tambahan?',
      answer: 'Tidak. Guyu Chat berjalan penuh di browser modern (Chrome, Edge, Firefox, Safari) baik pada perangkat desktop maupun seluler.',
    },
    {
      id: 5,
      category: 'troubleshoot',
      question: 'Pesan saya gagal terkirim atau koneksi terputus, apa yang harus dilakukan?',
      answer: 'Pastikan jaringan internet Anda stabil dan mendukung protokol WebSocket. Jika masalah berlanjut, coba muat ulang (refresh) halaman atau lakukan login ulang.',
    },
    {
      id: 6,
      category: 'account',
      question: 'Bagaimana cara mengajukan penghapusan akun permanen?',
      answer: 'Anda dapat mengisi formulir permohonan penghapusan akun di tautan Hapus Akun atau menghubungi tim dukungan kami.',
    },
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Pusat Bantuan & FAQ - Guyu Chat"
        description="Dokumentasi pusat bantuan dan jawaban pertanyaan umum seputar fungsi, enkripsi, dan solusi kendala di Guyu Chat."
        keywords="pusat bantuan, faq, help center, guyu chat, masalah teknis, panduan enkripsi"
        type="website"
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
              <HelpCircle className="w-3.5 h-3.5" />
              <span>PUSAT BANTUAN & FAQ TECHNICAL</span>
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
              Pusat <span style={{ color: 'var(--color-accent)' }}>Bantuan</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(var(--text-sm), 2vw, var(--text-md))',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
              }}
            >
              Cari panduan dan solusi teknis terkait penggunaan platform obrolan privat Guyu Chat.
            </p>

            {/* Search Bar */}
            <div className="pt-2 max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik kata kunci pertanyaan..."
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-bg-surface)',
                    border: 'var(--rule-hairline)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--space-sm) var(--space-md)',
                    paddingLeft: '2.5rem',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text-main)',
                    outline: 'none',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-focus)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
                />
                <Search className="w-4 h-4 text-[var(--color-text-dim)] absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs & FAQ List */}
        <section
          style={{
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
          className="space-y-[var(--space-lg)]"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 pb-[var(--space-sm)]" style={{ borderBottom: 'var(--rule-hairline)' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="cursor-pointer"
                style={{
                  padding: 'var(--space-xs) var(--space-sm)',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: activeCategory === cat.id ? 700 : 400,
                  backgroundColor: activeCategory === cat.id ? 'var(--color-ink)' : 'var(--color-bg-surface)',
                  color: activeCategory === cat.id ? 'var(--color-paper)' : 'var(--color-text-muted)',
                  border: activeCategory === cat.id ? '1px solid var(--color-ink)' : 'var(--rule-hairline)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-[var(--space-xs)]">
            {filteredFaqs.length === 0 ? (
              <div
                style={{
                  padding: 'var(--space-xl)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: 'var(--rule-hairline)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-dim)',
                  textAlign: 'center',
                }}
                className="space-y-1"
              >
                <div>[ TIDAK ADA HASIL FAQ DITEMUKAN ]</div>
                <div>Coba gunakan kata kunci pencarian yang berbeda.</div>
              </div>
            ) : (
              filteredFaqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group rounded overflow-hidden"
                  style={{
                    backgroundColor: 'var(--color-bg-surface)',
                    border: 'var(--rule-hairline)',
                  }}
                >
                  <summary
                    className="cursor-pointer flex justify-between items-center gap-4 select-none"
                    style={{
                      padding: 'var(--space-md)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-main)',
                    }}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className="w-4 h-4 text-[var(--color-accent)] shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div
                    style={{
                      padding: 'var(--space-md)',
                      paddingTop: 'var(--space-xs)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.7,
                      borderTop: 'var(--rule-hairline)',
                      backgroundColor: 'var(--color-bg-base)',
                    }}
                  >
                    {faq.answer}
                  </div>
                </details>
              ))
            )}
          </div>

          {/* Contact Support Footer */}
          <div
            style={{
              padding: 'var(--space-lg)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg-surface)',
              border: 'var(--rule-hairline)',
            }}
            className="flex flex-col sm:flex-row items-center justify-between gap-[var(--space-md)]"
          >
            <div className="space-y-1 text-center sm:text-left">
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 600 }}>
                Masih memiliki pertanyaan lain?
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                Tim pengembang kami siap membantu memecahkan kendala penggunaan aplikasi.
              </p>
            </div>

            <div className="flex flex-wrap gap-[var(--space-xs)] shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 cursor-pointer"
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
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Kirim Pesan Support</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HelpPage;
