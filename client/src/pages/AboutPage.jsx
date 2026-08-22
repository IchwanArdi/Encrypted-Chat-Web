import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ShieldCheck, Lock, Zap, Cpu, ArrowRight, Target, Rocket } from 'lucide-react';

/* Hallmark · genre: editorial · theme: Atelier
 * About page with responsive clamp spacing and Atelier tokens
 */

function AboutPage() {
  const VALUES = [
    {
      code: 'VAL_01',
      title: 'Privasi Sebagai Hak Mutlak',
      desc: 'Setiap percakapan dilindungi enkripsi client-side end-to-end. Kami percaya privasi data pengguna adalah hak mendasar dalam dunia digital.',
      icon: Lock,
    },
    {
      code: 'VAL_02',
      title: 'Performa Tanpa Hambatan',
      desc: 'Platform dirancang dengan arsitektur socket teroptimasi untuk memastikan pengiriman pesan berkecepatan tinggi tanpa hambatan antrean.',
      icon: Zap,
    },
    {
      code: 'VAL_03',
      title: 'Transparansi Tanpa Log',
      desc: 'Sistem tidak memproses, mengekstrak, atau menyimpan data teks obrolan pengguna di server. Zero-knowledge secara penuh.',
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      <SEO
        title="Tentang Guyu Chat — Protokol Obrolan Terenkripsi"
        description="Pelajari visi, misi, dan prinsip arsitektur zero-knowledge di balik platform obrolan privat Guyu Chat."
        keywords="tentang guyu chat, e2ee chat, arsitektur privasi, zero-knowledge, obrolan aman"
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
              <Cpu className="w-3.5 h-3.5" />
              <span>DOKUMENTASI ARSITEKTUR & MISI</span>
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
              Tentang <span style={{ color: 'var(--color-accent)' }}>Guyu Chat</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(var(--text-sm), 2vw, var(--text-md))',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
              }}
            >
              Guyu Chat dikembangkan dengan prinsip utama menghadirkan infrastruktur komunikasi privat yang cepat, transparan, dan tidak bergantung pada pengolahan data terpusat.
            </p>
          </div>
        </section>

        {/* Narrative & Origins */}
        <section
          style={{
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            borderBottom: 'var(--rule-hairline)',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-lg)] items-start">
            <div
              className="lg:col-span-4"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-accent)',
              }}
            >
              <div>// LATAR BELAKANG PROYEK</div>
              <div style={{ color: 'var(--color-text-dim)' }}>Tujuan & Filosofi Pengembangan</div>
            </div>

            <div className="lg:col-span-8 space-y-[var(--space-sm)] text-sm text-[var(--color-text-muted)] leading-relaxed">
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  color: 'var(--color-text-main)',
                }}
              >
                Guyu Chat dimulai dari kebutuhan akan platform perpesanan web yang tidak melakukan pelacakan aktivitas pengguna maupun penyimpanan log pesan di server.
              </p>
              <p>
                Sebagian besar aplikasi obrolan modern memproses data pesan di server terpusat untuk keperluan analitik atau profil iklan. Guyu Chat mematahkan paradigma ini dengan memindahkan seluruh komputasi kunci enkripsi ke peramban (browser) pengguna secara langsung.
              </p>
              <p>
                Kunci privat dibangkitkan secara independen pada perangkat pengirim dan penerima. Dengan demikian, peladen (server) hanya bertindak sebagai perantara paket biner terenkripsi (ciphertext) tanpa pernah memiliki kemampuan membaca isi obrolan.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section
          style={{
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            borderBottom: 'var(--rule-hairline)',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)]">
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
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-bg-base)',
                  border: 'var(--rule-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent)',
                }}
              >
                <Target className="w-5 h-5" />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent)',
                }}
              >
                01 / MISI UTAMA
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                }}
              >
                Menciptakan Komunikasi Bebas Sadap
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                }}
              >
                Menyediakan saluran komunikasi real-time yang menjamin privasi penuh pengguna tanpa batasan langganan atau pengumpulan metadata pribadi.
              </p>
            </div>

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
                  width: '2.25rem',
                  height: '2.25rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-bg-base)',
                  border: 'var(--rule-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent)',
                }}
              >
                <Rocket className="w-5 h-5" />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent)',
                }}
              >
                02 / VISI JANGKA PANJANG
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                }}
              >
                Standar Baru Keamanan Web
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                }}
              >
                Menjadi rujukan platform web modern dalam menerapkan enkripsi zero-knowledge yang ringan, mudah diakses, dan transparan bagi publik.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section
          style={{
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
          className="space-y-[var(--space-lg)]"
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-3xs)',
              }}
            >
              PRINSIP UTAMA
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, var(--text-2xl))',
                fontWeight: 600,
              }}
            >
              Nilai Arsitektur Sistem
            </h2>
          </div>

          <div className="space-y-[var(--space-xs)]">
            {VALUES.map((val, idx) => (
              <div
                key={idx}
                style={{
                  padding: 'var(--space-md)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: 'var(--rule-hairline)',
                }}
                className="grid grid-cols-1 md:grid-cols-12 gap-[var(--space-xs)] items-center"
              >
                <div className="md:col-span-2 lg:col-span-1">
                  <div
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-bg-base)',
                      border: 'var(--rule-hairline)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                    }}
                  >
                    {val.code}
                  </div>
                </div>
                <div className="md:col-span-10 lg:col-span-11 space-y-1">
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 600,
                    }}
                  >
                    {val.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="pt-[var(--space-lg)] flex flex-col sm:flex-row justify-between items-center gap-[var(--space-md)]"
            style={{ borderTop: 'var(--rule-hairline)' }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-base)' }}>Siap Menggunakan Guyu Chat?</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }}>
                Gunakan langsung melalui peramban web Anda.
              </div>
            </div>
            <Link
              to="/login"
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
              <span>Mulai Chat Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default AboutPage;
