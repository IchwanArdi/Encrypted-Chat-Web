/* Hallmark · genre: editorial · macrostructure: Split Studio · theme: Atelier
 * tone: luxury-editorial · anchor hue: oklch(52% 0.16 30)
 * H2 hero knobs: ratio=7/5, right-side=interactive-live-simulation, divider=negative-space
 * pre-emit critique: P5 H4 E5 S5 R5 V5
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ShieldCheck, Eye, Lock, ArrowRight, RefreshCw, Send } from 'lucide-react';

/* ─── Content data ─── */

const PROTOCOL_SPECS = [
  {
    label: 'Enkripsi',
    value: 'AES-256-GCM',
    note: 'Setiap pesan dienkripsi di perangkat pengirim sebelum meninggalkan browser.',
  },
  {
    label: 'Pertukaran Kunci',
    value: 'ECDH (P-256)',
    note: 'Kunci sesi diturunkan secara lokal melalui Elliptic-Curve Diffie–Hellman.',
  },
  {
    label: 'Transportasi',
    value: 'WebSocket (TLS)',
    note: 'Koneksi persisten untuk pengiriman pesan instan tanpa polling.',
  },
  {
    label: 'Penyimpanan Server',
    value: 'Nol',
    note: 'Server hanya merutekan ciphertext. Tidak ada plaintext, tidak ada log, tidak ada profil.',
  },
  {
    label: 'Kunci Privat',
    value: 'Perangkat saja',
    note: 'Tidak pernah dikirim ke server. Tidak pernah meninggalkan browser Anda.',
  },
];

const FAQ_DATA = [
  {
    q: 'Bagaimana pesan saya dilindungi?',
    a: 'Setiap pesan dienkrip dengan AES-256-GCM di browser Anda. Kunci sesi diturunkan melalui ECDH — artinya hanya perangkat penerima yang dapat mendekripsi. Server kami hanya melihat ciphertext acak.',
  },
  {
    q: 'Apakah perlu mengunduh aplikasi?',
    a: 'Tidak. Guyu Chat berjalan sepenuhnya di browser modern — desktop maupun ponsel. Tidak ada instalasi, tidak ada extension.',
  },
  {
    q: 'Apa yang disimpan server?',
    a: 'Akun Anda dan metadata routing minimal. Pesan disimpan sebagai ciphertext yang hanya bisa dibaca oleh penerima. Server tidak menyimpan plaintext, kunci privat, atau log obrolan.',
  },
  {
    q: 'Bagaimana kalau saya kehilangan perangkat?',
    a: 'Kunci privat tersimpan di perangkat. Jika perangkat hilang, buat akun baru dan turunkan kunci baru. Pesan lama yang terenkripsi dengan kunci sebelumnya tidak dapat dipulihkan — itu sesuai rancangan, bukan kekurangan.',
  },
];

/* ─── Pseudo-cipher generator ─── */
const generateCipher = (input) => {
  if (!input) return '0x8F4A9C21E3F9A7B4…';
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h << 5) - h + input.charCodeAt(i);
    h |= 0;
  }
  const hex = Math.abs(h).toString(16).padEnd(12, '0e4f');
  return `0x${hex.toUpperCase().slice(0, 16)}… [AES-256-GCM]`;
};

/* ─── Live E2EE Interactive Chat Simulation ─── */
function LiveChatSimulation() {
  const [perspective, setPerspective] = useState('client'); // 'client' | 'server'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Alice',
      plainText: 'Apakah server bisa membaca isi pesan ini?',
      cipherText: '0x8F4A9C21E3F9A7B490E1… [AES-256-GCM]',
      time: '19:04',
    },
    {
      id: 2,
      sender: 'Bob',
      plainText: 'Nol. Server hanya merutekan ciphertext acak.',
      cipherText: '0x7C2E910B4F3A8812D956… [AES-256-GCM]',
      time: '19:05',
    },
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'Anda',
      plainText: userInput.trim(),
      cipherText: generateCipher(userInput.trim()),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev.slice(-3), newMsg]);
    setUserInput('');
  };

  return (
    <div
      style={{
        border: 'var(--rule-hairline)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        backgroundColor: 'var(--color-bg-base)',
      }}
      className="space-y-0"
    >
      {/* Header Bar */}
      <div
        style={{
          padding: 'var(--space-xs) var(--space-md)',
          backgroundColor: 'var(--color-bg-surface)',
          borderBottom: 'var(--rule-hairline)',
        }}
        className="flex items-center justify-between gap-2"
      >
        <div className="flex items-center gap-2">
          <div
            style={{
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'oklch(60% 0.15 140)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              color: 'var(--color-text-main)',
            }}
          >
            SIMULASI TRANSMISI E2EE
          </span>
        </div>

        {/* Perspective Switcher */}
        <div className="flex gap-1">
          <button
            onClick={() => setPerspective('client')}
            className="cursor-pointer"
            style={{
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              backgroundColor: perspective === 'client' ? 'var(--color-ink)' : 'transparent',
              color: perspective === 'client' ? 'var(--color-paper)' : 'var(--color-text-dim)',
              border: perspective === 'client' ? '1px solid var(--color-ink)' : '1px solid transparent',
              transition: `all var(--dur-micro) var(--ease-out)`,
            }}
          >
            Tampilan User
          </button>
          <button
            onClick={() => setPerspective('server')}
            className="cursor-pointer"
            style={{
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              backgroundColor: perspective === 'server' ? 'var(--color-accent)' : 'transparent',
              color: perspective === 'server' ? 'var(--color-paper)' : 'var(--color-text-dim)',
              border: perspective === 'server' ? '1px solid var(--color-accent)' : '1px solid transparent',
              transition: `all var(--dur-micro) var(--ease-out)`,
            }}
          >
            Tampilan Server
          </button>
        </div>
      </div>

      {/* Perspective Info Strip */}
      <div
        style={{
          padding: 'var(--space-2xs) var(--space-md)',
          backgroundColor: perspective === 'server' ? 'var(--color-paper-3)' : 'var(--color-bg-surface)',
          borderBottom: 'var(--rule-hairline)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: perspective === 'server' ? 'var(--color-accent)' : 'var(--color-text-muted)',
        }}
        className="flex items-center justify-between"
      >
        <span>
          {perspective === 'server'
            ? '🔒 SERVER: HANYA MENERIMA CIPHERTEXT ACAK'
            : '🔓 CLIENT: DEKRIPSI INSTAN DI BROWSER'}
        </span>
        <span className="hidden sm:inline">ZERO-KNOWLEDGE</span>
      </div>

      {/* Messages Stream */}
      <div
        style={{
          padding: 'var(--space-md)',
          minHeight: '13rem',
          maxHeight: '15rem',
        }}
        className="overflow-y-auto space-y-3"
      >
        {messages.map((msg) => {
          const isRight = msg.sender === 'Anda' || msg.sender === 'Bob';
          return (
            <div key={msg.id} className={`flex flex-col ${isRight ? 'items-end' : 'items-start'}`}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-dim)',
                  marginBottom: '2px',
                }}
              >
                {msg.sender} • {msg.time}
              </div>

              <div
                style={{
                  maxWidth: '85%',
                  padding: 'var(--space-xs) var(--space-sm)',
                  borderRadius: 'var(--radius-sm)',
                  border: perspective === 'server' ? '1px solid var(--color-accent)' : 'var(--rule-hairline)',
                  backgroundColor:
                    perspective === 'server'
                      ? 'oklch(95% 0.05 30)'
                      : isRight
                      ? 'var(--color-ink)'
                      : 'var(--color-bg-surface)',
                  color:
                    perspective === 'server'
                      ? 'var(--color-accent)'
                      : isRight
                      ? 'var(--color-paper)'
                      : 'var(--color-text-main)',
                  fontFamily: perspective === 'server' ? 'var(--font-mono)' : 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  wordBreak: 'break-all',
                }}
              >
                {perspective === 'server' ? (
                  <div>
                    <span style={{ fontWeight: 700 }}>[ENCRYPTED] </span>
                    {msg.cipherText}
                  </div>
                ) : (
                  msg.plainText
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Try Input */}
      <form
        onSubmit={handleSendMessage}
        style={{
          padding: 'var(--space-xs) var(--space-md)',
          borderTop: 'var(--rule-hairline)',
          backgroundColor: 'var(--color-bg-surface)',
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ketik pesan simulasi di sini…"
          style={{
            flex: 1,
            backgroundColor: 'var(--color-bg-base)',
            border: 'var(--rule-hairline)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-xs) var(--space-sm)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-main)',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={!userInput.trim()}
          className="cursor-pointer flex items-center gap-1"
          style={{
            padding: 'var(--space-xs) var(--space-sm)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-ink)',
            color: 'var(--color-paper)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            border: 'none',
            opacity: !userInput.trim() ? 0.5 : 1,
          }}
        >
          <Send className="w-3 h-3" />
          <span>Kirim</span>
        </button>
      </form>

      {/* Footer Spec Badges */}
      <div
        style={{
          padding: 'var(--space-2xs) var(--space-md)',
          borderTop: 'var(--rule-hairline)',
          backgroundColor: 'var(--color-paper-3)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-dim)',
        }}
        className="flex items-center justify-between"
      >
        <span>AES-256-GCM</span>
        <span>ECDH (P-256)</span>
        <span>WebSocket TLS</span>
      </div>
    </div>
  );
}

/* ─── FAQ accordion item ─── */
function FaqItem({ q, a, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: 'var(--rule-hairline)' }}>
      <button
        onClick={onToggle}
        className="w-full text-left cursor-pointer"
        style={{
          padding: 'clamp(var(--space-md), 2.5vw, var(--space-lg)) 0',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'var(--space-md)',
          alignItems: 'start',
          background: 'none',
          border: 'none',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(var(--text-base), 2.5vw, var(--text-md))',
          fontWeight: 500,
          color: 'var(--color-text-main)',
          lineHeight: 1.3,
          letterSpacing: '-0.01em',
        }}
      >
        <span>{q}</span>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            fontWeight: 300,
            color: 'var(--color-text-dim)',
            transition: `transform var(--dur-short) var(--ease-in-out)`,
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: `grid-template-rows var(--dur-long) var(--ease-in-out)`,
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(var(--text-sm), 2vw, var(--text-base))',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              paddingBottom: 'var(--space-md)',
              maxWidth: '55ch',
            }}
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ─── */
function LandingPage() {
  const [demoInput, setDemoInput] = useState('Pesan ini terenkripsi sebelum terkirim');
  const [openFaq, setOpenFaq] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  const cipher = useMemo(() => generateCipher(demoInput), [demoInput]);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const toggleFaq = useCallback((i) => {
    setOpenFaq((prev) => (prev === i ? null : i));
  }, []);

  return (
    <>
      <SEO
        title="Guyu Chat — Obrolan Terenkripsi di Browser"
        description="Percakapan privat dengan enkripsi end-to-end langsung di browser. Tanpa penyimpanan plaintext, tanpa log, tanpa kompromi."
        keywords="chat terenkripsi, end to end encryption, e2ee, guyu chat, privasi, zero knowledge"
        type="website"
      />

      <div
        style={{
          backgroundColor: 'var(--color-bg-base)',
          color: 'var(--color-text-main)',
          fontFamily: 'var(--font-body)',
        }}
      >

        {/* ════════════════════════════════════════════════════
            HERO — H2 Split Diptych (7fr / 5fr)
            Left: typographic statement. Right: Live E2EE Simulation.
            ════════════════════════════════════════════════════ */}
        <section
          className="reveal"
          style={{
            '--i': 0,
            padding: 'clamp(var(--space-lg), 5vw, var(--space-3xl)) var(--page-gutter) clamp(var(--space-lg), 4vw, var(--space-2xl))',
            maxWidth: '80rem',
            marginInline: 'auto',
          }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-12"
            style={{
              gap: 'clamp(var(--space-md), 4vw, var(--space-2xl))',
              alignItems: 'start',
            }}
          >
            {/* Left — 7 of 12 */}
            <div className="lg:col-span-7" style={{ paddingTop: 'clamp(0px, 2vw, var(--space-xl))' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5.5vw, 5rem)',
                  fontWeight: 300,
                  lineHeight: 1.08,
                  letterSpacing: '-0.03em',
                  color: 'var(--color-text-main)',
                }}
              >
                Percakapan
                <br />
                yang tidak bisa
                <br />
                <span style={{ fontWeight: 700 }}>dibaca orang lain.</span>
              </h1>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(var(--text-sm), 2.5vw, var(--text-md))',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  marginTop: 'clamp(var(--space-md), 3vw, var(--space-xl))',
                  maxWidth: '45ch',
                }}
              >
                Guyu Chat mengenkripsi setiap pesan di perangkat Anda sebelum meninggalkan browser. Server kami hanya melihat ciphertext — tidak ada plaintext, tidak ada log, tidak ada kompromi.
              </p>

              {/* CTA row */}
              <div
                className="flex flex-wrap items-center"
                style={{
                  gap: 'clamp(var(--space-md), 3vw, var(--space-xl))',
                  marginTop: 'clamp(var(--space-lg), 4vw, var(--space-2xl))',
                }}
              >
                <Link
                  to="/register"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 500,
                    color: 'var(--color-text-main)',
                    padding: 'var(--space-sm) clamp(var(--space-md), 3vw, var(--space-xl))',
                    border: '1px solid var(--color-ink)',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    transition: `background-color var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-ink)';
                    e.currentTarget.style.color = 'var(--color-paper)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-main)';
                  }}
                >
                  Mulai percakapan →
                </Link>
                <Link
                  to="/about"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 400,
                    color: 'var(--color-accent)',
                    textDecoration: 'underline',
                    textUnderlineOffset: '4px',
                    textDecorationThickness: '1px',
                    transition: `text-decoration-thickness var(--dur-micro) var(--ease-out)`,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecorationThickness = '2px')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecorationThickness = '1px')}
                >
                  Baca dokumentasi teknis
                </Link>
              </div>
            </div>

            {/* Right — 5 of 12: Interactive E2EE Chat Simulation */}
            <div
              className="lg:col-span-5"
              style={{
                paddingTop: 'clamp(0px, 2vw, var(--space-md))',
              }}
            >
              <LiveChatSimulation />
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-text-dim)',
                  marginTop: 'var(--space-sm)',
                  lineHeight: 1.6,
                }}
              >
                Gunakan beralih perspektif di atas untuk melihat perbedaan antara apa yang Anda baca vs apa yang diterima server.
              </p>
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            PROTOCOL ARCHITECTURE — F3 Tabular Spec Sheet
            ════════════════════════════════════════════════════ */}
        <section
          className="reveal"
          style={{
            '--i': 1,
            borderTop: 'var(--rule-hairline)',
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
          }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-12"
            style={{
              maxWidth: '80rem',
              marginInline: 'auto',
              gap: 'clamp(var(--space-md), 3vw, var(--space-2xl))',
              alignItems: 'start',
            }}
          >
            {/* Left heading column */}
            <div className="lg:col-span-4">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 4vw, var(--text-display-s))',
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-main)',
                }}
              >
                Arsitektur
                <br />
                keamanan.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(var(--text-sm), 2vw, var(--text-base))',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  marginTop: 'var(--space-md)',
                  maxWidth: '30ch',
                }}
              >
                Setiap komponen dirancang agar server tidak memiliki kemampuan teknis untuk mengakses isi pesan.
              </p>
            </div>

            {/* Right spec table */}
            <div className="lg:col-span-8">
              <div style={{ borderTop: 'var(--rule-hairline)' }}>
                {PROTOCOL_SPECS.map((spec, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-12"
                    style={{
                      borderBottom: 'var(--rule-hairline)',
                      padding: 'var(--space-md) 0',
                      gap: 'var(--space-xs)',
                      alignItems: 'baseline',
                    }}
                  >
                    <div
                      className="md:col-span-3"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 500,
                        color: 'var(--color-text-main)',
                      }}
                    >
                      {spec.label}
                    </div>
                    <div
                      className="md:col-span-3 tnum"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-accent)',
                      }}
                    >
                      {spec.value}
                    </div>
                    <div
                      className="md:col-span-6"
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      {spec.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            THE CIPHER — Interactive encryption demo
            ════════════════════════════════════════════════════ */}
        <section
          className="reveal"
          style={{
            '--i': 2,
            borderTop: 'var(--rule-hairline)',
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            backgroundColor: 'var(--color-bg-surface)',
          }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-12"
            style={{
              maxWidth: '80rem',
              marginInline: 'auto',
              gap: 'clamp(var(--space-md), 3vw, var(--space-2xl))',
              alignItems: 'start',
            }}
          >
            <div className="lg:col-span-5 lg:order-2">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 4vw, var(--text-display-s))',
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-main)',
                }}
              >
                Apa yang
                <br />
                dilihat server.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(var(--text-sm), 2vw, var(--text-base))',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  marginTop: 'var(--space-md)',
                  maxWidth: '35ch',
                }}
              >
                Ketik apa saja di kolom input. Perhatikan bagaimana hasilnya berubah menjadi ciphertext yang tidak bisa dibaca — itulah yang diterima server kami.
              </p>
            </div>

            <div className="lg:col-span-7 lg:order-1">
              <div
                style={{
                  border: 'var(--rule-hairline)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-bg-base)',
                }}
              >
                <div
                  style={{
                    padding: 'var(--space-md) var(--space-lg)',
                    borderBottom: 'var(--rule-hairline)',
                  }}
                >
                  <label
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-dim)',
                      marginBottom: 'var(--space-xs)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Plaintext
                  </label>
                  <input
                    type="text"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="Ketik teks di sini…"
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      color: 'var(--color-text-main)',
                      outline: 'none',
                      padding: 0,
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: 'var(--space-xs) var(--space-lg)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-dim)',
                    borderBottom: 'var(--rule-hairline)',
                    backgroundColor: 'var(--color-bg-surface)',
                  }}
                >
                  ↓ AES-256-GCM + ECDH
                </div>

                <div
                  style={{
                    padding: 'var(--space-md) var(--space-lg)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--color-text-dim)',
                      marginBottom: 'var(--space-xs)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Ciphertext (terlihat oleh server)
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 500,
                      color: 'var(--color-accent)',
                      wordBreak: 'break-all',
                      lineHeight: 1.6,
                    }}
                  >
                    {cipher}
                    <span
                      style={{
                        opacity: cursorVisible ? 1 : 0,
                        transition: `opacity 80ms linear`,
                        color: 'var(--color-accent)',
                      }}
                    >
                      ▮
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            INQUIRY — FAQ accordion
            ════════════════════════════════════════════════════ */}
        <section
          className="reveal"
          style={{
            '--i': 3,
            borderTop: 'var(--rule-hairline)',
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
          }}
        >
          <div
            className="grid grid-cols-1 lg:grid-cols-12"
            style={{
              maxWidth: '80rem',
              marginInline: 'auto',
              gap: 'clamp(var(--space-md), 3vw, var(--space-2xl))',
              alignItems: 'start',
            }}
          >
            <div className="lg:col-span-4">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 4vw, var(--text-display-s))',
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-main)',
                }}
              >
                Pertanyaan
                <br />
                yang wajar.
              </h2>
            </div>

            <div className="lg:col-span-8">
              <div style={{ borderTop: 'var(--rule-hairline)' }}>
                {FAQ_DATA.map((item, i) => (
                  <FaqItem
                    key={i}
                    q={item.q}
                    a={item.a}
                    isOpen={openFaq === i}
                    onToggle={() => toggleFaq(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* ════════════════════════════════════════════════════
            CTA STRIP — single line, single action
            ════════════════════════════════════════════════════ */}
        <section
          className="reveal"
          style={{
            '--i': 4,
            borderTop: 'var(--rule-hairline)',
            padding: 'clamp(var(--space-lg), 4vw, var(--space-2xl)) var(--page-gutter)',
            textAlign: 'left',
          }}
        >
          <div style={{ maxWidth: '80rem', marginInline: 'auto' }}>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3.5vw, var(--text-2xl))',
                fontWeight: 300,
                color: 'var(--color-text-main)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                maxWidth: '30ch',
              }}
            >
              Percakapan Anda layak mendapat privasi yang sebenarnya.
            </p>
            <Link
              to="/register"
              style={{
                display: 'inline-block',
                marginTop: 'var(--space-md)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                color: 'var(--color-text-main)',
                padding: 'var(--space-sm) clamp(var(--space-md), 3vw, var(--space-xl))',
                border: '1px solid var(--color-ink)',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                transition: `background-color var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-ink)';
                e.currentTarget.style.color = 'var(--color-paper)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-text-main)';
              }}
            >
              Buat akun gratis →
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}

export default LandingPage;
