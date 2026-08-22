import { Link } from 'react-router-dom';

/* Hallmark · Ft6 Letter close · knobs: signoff=roman, postscript=yes, width=60ch */

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: 'clamp(var(--space-xl), 4vw, var(--space-3xl)) var(--page-gutter) clamp(var(--space-lg), 3vw, var(--space-2xl))',
        borderTop: 'var(--rule-hairline)',
        backgroundColor: 'var(--color-bg-base)',
      }}
    >
      <div
        style={{
          maxWidth: '60ch',
          marginInline: 'auto',
        }}
      >
        {/* Letter signoff */}
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(var(--text-base), 3vw, var(--text-lg))',
            lineHeight: 1.4,
            color: 'var(--color-text-main)',
            fontWeight: 300,
          }}
        >
          Terima kasih sudah membaca,
          <br />
          <span style={{ fontWeight: 600, fontStyle: 'normal' }}>
            — Tim Guyu Chat
          </span>
        </p>

        {/* Postscript with links */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            marginTop: 'clamp(var(--space-md), 2vw, var(--space-lg))',
            lineHeight: 1.7,
          }}
        >
          P.S. — Punya pertanyaan teknis atau ingin berkontribusi?{' '}
          <Link
            to="/contact"
            style={{
              color: 'var(--color-accent)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationThickness: '1px',
            }}
          >
            Kirim pesan kepada kami
          </Link>
          .
        </p>

        {/* Minimal meta row */}
        <div
          className="flex flex-wrap items-center"
          style={{
            gap: 'clamp(var(--space-sm), 2vw, var(--space-lg))',
            marginTop: 'clamp(var(--space-lg), 3vw, var(--space-2xl))',
            paddingTop: 'clamp(var(--space-md), 2vw, var(--space-lg))',
            borderTop: 'var(--rule-hairline)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-dim)',
          }}
        >
          <span>© {year} Guyu Chat</span>
          <Link
            to="/privacy-policy"
            style={{
              color: 'var(--color-text-dim)',
              textDecoration: 'none',
              transition: `color var(--dur-micro) var(--ease-out)`,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-dim)'}
          >
            Kebijakan Privasi
          </Link>
          <Link
            to="/terms-of-service"
            style={{
              color: 'var(--color-text-dim)',
              textDecoration: 'none',
              transition: `color var(--dur-micro) var(--ease-out)`,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-dim)'}
          >
            Ketentuan Layanan
          </Link>
          <Link
            to="/about"
            style={{
              color: 'var(--color-text-dim)',
              textDecoration: 'none',
              transition: `color var(--dur-micro) var(--ease-out)`,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-dim)'}
          >
            Tentang
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
