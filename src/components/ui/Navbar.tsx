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
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
          padding: scrolled ? '16px 48px' : '28px 48px',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          background: scrolled
            ? 'rgba(248, 249, 250, 0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,205,212,0.3)' : 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1400px', margin: '0 auto' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '28px',
                fontWeight: '400',
                letterSpacing: '-0.02em',
                color: 'var(--dark-blue)',
              }}>
                blüra
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '7px',
                fontWeight: '500',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginTop: '1px',
              }}>
                From Himalayan Foothills
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}
            className="hidden md:flex">
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
                    bottom: '-4px',
                    left: 0,
                    right: 0,
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

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
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
                height: '1px',
                background: 'var(--text-primary)',
                transition: 'all 0.3s ease',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px, 4px)'
                    : i === 1 ? 'scaleX(0)'
                      : 'rotate(-45deg) translate(4px, -4px)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(248, 249, 250, 0.97)',
        backdropFilter: 'blur(20px)',
        zIndex: 800,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {navLinks.map(link => (
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
            }}
          >
            {link.label}
          </Link>
        ))}
        <a 
          href="https://wa.me/917990394138?text=Hi,%20I%E2%80%99m%20interested%20in%20ordering%20bl%C3%BCra%20mineral%20water%20in%20bulk.%20Please%20share%20details." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-primary" 
          style={{ marginTop: '20px' }}
          onClick={() => fetch('/api/inquiry', { method: 'POST', body: JSON.stringify({ source: 'Navbar Mobile' }) })}
        >
          <span>Order in Bulk</span>
        </a>
      </div>
    </>
  );
}



