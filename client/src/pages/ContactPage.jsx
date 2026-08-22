import { useState } from 'react';
import SEO from '../components/SEO';
import { Mail, MessageSquare, Globe, Send, CheckCircle2 } from 'lucide-react';

/* Hallmark · genre: editorial · theme: Atelier
 * Contact page with responsive clamp spacing and Atelier tokens
 */

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <>
      <SEO
        title="Hubungi Kami - Guyu Chat"
        description="Saluran komunikasi dan dukungan pengguna Guyu Chat. Kirimkan pesan, masukan, atau laporan teknis Anda."
        keywords="hubungi kami, contact, dukungan pengguna, support guyu chat, kontak"
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
              <Mail className="w-3.5 h-3.5" />
              <span>SALURAN KOMUNIKASI & SUPPORT</span>
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
              Hubungi <span style={{ color: 'var(--color-accent)' }}>Tim Kami</span>
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(var(--text-sm), 2vw, var(--text-md))',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
              }}
            >
              Kirimkan pertanyaan, masukan teknis, atau kendala penggunaan melalui formulir dukungan berikut.
            </p>
          </div>
        </section>

        {/* Main Content Grid */}
        <section
          style={{
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-lg)] items-start">
            
            {/* Form Column */}
            <div
              className="lg:col-span-7 space-y-[var(--space-md)]"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: 'var(--rule-hairline)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-lg)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-accent)',
                  textTransform: 'uppercase',
                }}
              >
                // FORMULIR DUKUNGAN TEKNIS
              </div>

              {submitted ? (
                <div
                  style={{
                    padding: 'var(--space-lg)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'oklch(95% 0.05 140)',
                    border: '1px solid oklch(50% 0.15 140)',
                    textAlign: 'center',
                  }}
                  className="space-y-[var(--space-xs)]"
                >
                  <CheckCircle2 className="w-10 h-10 mx-auto text-[oklch(40%_0.15_140)]" />
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 600,
                      color: 'oklch(25% 0.15 140)',
                    }}
                  >
                    Pesan Berhasil Terkirim!
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'oklch(35% 0.1 140)',
                    }}
                  >
                    Terima kasih atas masukan Anda. Tim dukungan teknis akan meninjau pesan Anda secepatnya.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="cursor-pointer mt-2"
                    style={{
                      padding: 'var(--space-xs) var(--space-sm)',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-bg-base)',
                      border: 'var(--rule-hairline)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-main)',
                    }}
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-[var(--space-sm)]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-xs)]">
                    <div className="space-y-1">
                      <label
                        htmlFor="name"
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        NAMA LENGKAP:
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
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

                    <div className="space-y-1">
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
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="budi@domain.com"
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

                  <div className="space-y-1">
                    <label
                      htmlFor="subject"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      KATEGORI SUBJEK:
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        backgroundColor: 'var(--color-bg-base)',
                        border: 'var(--rule-hairline)',
                        borderRadius: 'var(--radius-sm)',
                        padding: 'var(--space-xs) var(--space-sm)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-main)',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--color-border-focus)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--color-rule)')}
                    >
                      <option value="">-- Pilih Kategori --</option>
                      <option value="Pertanyaan Teknis">Pertanyaan Teknis</option>
                      <option value="Laporan Bug">Laporan Bug / Kendala</option>
                      <option value="Masukan Fitur">Masukan Fitur</option>
                      <option value="Keamanan & Privasi">Keamanan & Privasi</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="message"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      ISI PESAN / DETAIL KENDALA:
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Jelaskan detail pertanyaan atau kendala Anda di sini..."
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

                  <button
                    type="submit"
                    disabled={isSubmitting}
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
                      opacity: isSubmitting ? 0.6 : 1,
                    }}
                  >
                    {isSubmitting ? (
                      <span>Mengirim Pesan...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Kirim Pesan Dukungan</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Info Cards Column */}
            <div className="lg:col-span-5 space-y-[var(--space-md)]">
              <div
                style={{
                  padding: 'var(--space-lg)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-surface)',
                  border: 'var(--rule-hairline)',
                }}
                className="space-y-[var(--space-xs)]"
              >
                <div className="flex items-center gap-2 text-[var(--color-accent)] font-mono text-xs">
                  <MessageSquare className="w-4 h-4" />
                  <span>RESPONS TEKNIS PRESISI</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-md)', fontWeight: 600 }}>
                  Waktu Operasional Support
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  Laporan teknis dan pesan yang dikirimkan akan diproses oleh pengembang dalam waktu maksimal 24 jam kerja.
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
                <div className="flex items-center gap-2 text-[var(--color-accent)] font-mono text-xs">
                  <Globe className="w-4 h-4" />
                  <span>JALUR KOMUNIKASI</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-dim)' }} className="space-y-2">
                  <div>• Email Direct: support@guyuchat.com</div>
                  <div>• Status Server: 99.9% Uptime WebSocket</div>
                  <div>• Lokasi Node: Web Crypto Native Node</div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}

export default ContactPage;
