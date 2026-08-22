import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.webp';

/* Hallmark · N9 Edge-aligned minimal · knobs: CTA=outlined, wordmark=serif, padding-block=spacious */

const NAV_LINKS = [
  { path: '/about', label: 'Tentang' },
  { path: '/help', label: 'Bantuan' },
  { path: '/contact', label: 'Kontak' },
  { path: '/privacy-policy', label: 'Privasi' },
  { path: '/terms-of-service', label: 'Ketentuan' },
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="sticky top-0 z-[200]"
      style={{
        backgroundColor: 'oklch(96.5% 0.008 35 / 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* N9: wordmark hard-left, CTA hard-right, silence between */}
      <div
        className="flex items-center justify-between"
        style={{
          padding: 'var(--space-lg) var(--page-gutter)',
          maxWidth: '80rem',
          marginInline: 'auto',
        }}
      >
        {/* Wordmark — serif display face */}
        <Link
          to="/"
          className="flex items-center gap-[var(--space-sm)] group"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="overflow-hidden flex items-center justify-center"
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: 'var(--radius-md)',
              border: 'var(--rule-hairline)',
              backgroundColor: 'var(--color-bg-base)',
            }}
          >
            <img src={logo} alt="Guyu Chat" className="w-full h-full object-cover" />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-md)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--color-text-main)',
            }}
          >
            Guyu Chat
          </span>
        </Link>

        {/* Desktop: single outlined CTA — the silence IS the design */}
        <div className="hidden md:flex items-center gap-[var(--space-lg)]">
          <Link
            to="/login"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              transition: `color var(--dur-micro) var(--ease-out)`,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-main)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
          >
            Masuk
          </Link>
          <Link
            to="/register"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--color-text-main)',
              padding: 'var(--space-xs) var(--space-lg)',
              border: '1px solid var(--color-ink)',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              transition: `background-color var(--dur-micro) var(--ease-out), color var(--dur-micro) var(--ease-out)`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--color-ink)';
              e.currentTarget.style.color = 'var(--color-paper)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-main)';
            }}
          >
            Mulai sekarang →
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden" ref={mobileMenuRef}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="cursor-pointer"
            style={{
              padding: 'var(--space-xs)',
              border: 'var(--rule-hairline)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-bg-base)',
              color: 'var(--color-text-main)',
            }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Mobile dropdown */}
          {isMobileMenuOpen && (
            <div
              className="absolute top-full right-0 left-0"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                borderBottom: 'var(--rule-hairline)',
                padding: 'var(--space-lg) var(--page-gutter)',
              }}
            >
              <nav
                className="flex flex-col"
                style={{ gap: 'var(--space-2xs)' }}
              >
                {NAV_LINKS.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        padding: 'var(--space-xs) var(--space-sm)',
                        borderRadius: 'var(--radius-sm)',
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div
                className="grid grid-cols-2"
                style={{
                  gap: 'var(--space-sm)',
                  marginTop: 'var(--space-lg)',
                  paddingTop: 'var(--space-lg)',
                  borderTop: 'var(--rule-hairline)',
                }}
              >
                <Link
                  to="/login"
                  className="text-center"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text-main)',
                    padding: 'var(--space-sm)',
                    border: 'var(--rule-hairline)',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                  }}
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="text-center"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: 'var(--color-paper)',
                    backgroundColor: 'var(--color-ink)',
                    padding: 'var(--space-sm)',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                  }}
                >
                  Daftar
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom hairline */}
      <div style={{ borderBottom: 'var(--rule-hairline)' }} />
    </header>
  );
}

export default Navbar;
