'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/product', label: 'Product' },
  { href: '/about', label: 'About' },
  { href: '/sustainability', label: 'Sustainability' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detect mobile via JS (avoids Tailwind class issues)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav
        id="main-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          padding: scrolled ? '14px clamp(20px, 5vw, 48px)' : 'clamp(18px, 3vw, 28px) clamp(20px, 5vw, 48px)',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          background: scrolled ? '#ffffff' : 'transparent',
          backdropFilter: 'none',
          borderBottom: 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(28, 53, 87, 0.05)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1400px', margin: '0 auto' }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              height: '40px', 
            }}>
              <img src="/images/logo.png" alt="blüra" style={{ 
                width: isMobile ? '120px' : '150px', 
                height: 'auto',
                maxWidth: 'none',
              }} />
            </div>
          </Link>

          {/* Desktop Nav — only rendered on non-mobile */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: '500',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: pathname === link.href ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    transition: 'color 0.3s ease',
                    position: 'relative',
                  }}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span style={{
                      position: 'absolute',
                      bottom: '-4px', left: 0, right: 0,
                      height: '1px',
                      background: 'var(--accent-blue)',
                    }} />
                  )}
                </Link>
              ))}
              <a
                href="https://wa.me/917990394138?text=Hi,%20I%E2%80%99m%20interested%20in%20ordering%20bl%C3%BCra%20mineral%20water%20in%20bulk.%20Please%20share%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '11px' }}
                onClick={() => fetch('/api/inquiry', { method: 'POST', body: JSON.stringify({ source: 'Navbar Desktop' }) })}
              >
                <span>Order in Bulk</span>
              </a>
            </div>
          )}

          {/* Mobile Hamburger — only on mobile */}
          {isMobile && (
            <button
              id="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: 'var(--dark-blue)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                      : i === 1 ? 'scaleX(0)'
                        : 'rotate(-45deg) translate(5px, -5px)'
                    : 'none',
                }} />
              ))}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Full-Screen Menu Overlay */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(240, 244, 248, 0.98)',
          backdropFilter: 'blur(24px)',
          zIndex: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'absolute', top: '24px', right: '24px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '28px', color: 'var(--dark-blue)',
              lineHeight: 1,
            }}
            aria-label="Close menu"
          >
            ×
          </button>

          {/* Logo inside menu */}
          <div style={{ 
            marginBottom: '40px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img src="/images/logo.png" alt="blüra" style={{ width: '200px', height: 'auto', maxWidth: 'none' }} />
          </div>

          {/* Nav links */}
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '36px',
                fontWeight: '300',
                textDecoration: 'none',
                color: pathname === link.href ? 'var(--accent-blue)' : 'var(--text-primary)',
                letterSpacing: '-0.01em',
                padding: '8px 0',
                transition: 'color 0.3s ease',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${i * 0.06}s`,
              }}
            >
              {link.label}
            </Link>
          ))}

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/917990394138?text=Hi,%20I%E2%80%99m%20interested%20in%20ordering%20bl%C3%BCra%20mineral%20water%20in%20bulk.%20Please%20share%20details."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => fetch('/api/inquiry', { method: 'POST', body: JSON.stringify({ source: 'Navbar Mobile' }) })}
            style={{
              marginTop: '32px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '16px 40px',
              background: 'var(--dark-blue)',
              color: 'white',
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: '2px',
            }}
          >
            <span>Order in Bulk</span>
          </a>
        </div>
      )}
    </>
  );
}
