'use client';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--silver-light)',
      padding: '80px 48px 40px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '60px',
          marginBottom: '80px',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '36px',
              fontWeight: '300',
              color: 'var(--dark-blue)',
              marginBottom: '12px',
            }}>blüra</div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: '300',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: '220px',
            }}>
              A moment of clarity in a chaotic world. Natural mineral water from the Himalayan foothills.
            </p>
            <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
              {['Instagram', 'Twitter', 'LinkedIn'].map(social => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid var(--silver)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    textDecoration: 'none',
                    fontSize: '10px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: '500',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.borderColor = 'var(--accent-blue)';
                    (e.target as HTMLElement).style.color = 'var(--accent-blue)';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.borderColor = 'var(--silver)';
                    (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: '20px',
            }}>Navigation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/product', label: 'Product' },
                { href: '/about', label: 'About' },
                { href: '/sustainability', label: 'Sustainability' },
                { href: '/contact', label: 'Contact' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: '300',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: '20px',
            }}>Product</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Natural Mineral Water', 'Mineral Composition', 'Himalayan Source', 'Premium Packaging'].map(item => (
                <span
                  key={item}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: '300',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              marginBottom: '20px',
            }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="mailto:contact@bluralife.com" style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: '300',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
              }}>
                contact@bluralife.com
              </a>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: '300',
                color: 'var(--text-secondary)',
              }}>
                +91 79903 94138
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: '300',
                color: 'var(--text-secondary)',
              }}>
                Kathmandu, Singpur<br />Dist. Rajkot, Gujarat 382430
              </span>
            </div>
          </div>
        </div>

        <div className="divider" style={{ marginBottom: '32px' }} />

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: '300',
            color: 'var(--text-tertiary)',
          }}>
            © {year} blüra. All rights reserved. One small sip for you, one giant step for the planet. <span style={{ opacity: 0.7, marginLeft: '8px' }}>shlokk.patel</span>
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms', 'Sitemap'].map(item => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: '300',
                  color: 'var(--text-tertiary)',
                  textDecoration: 'none',
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}


