'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-reveal]').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta-section"
      style={{
        minHeight: '100vh',
        background: 'var(--dark-blue)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse 60% 50% at 30% 50%, rgba(47,91,140,0.3) 0%, transparent 70%),
          radial-gradient(ellipse 60% 50% at 70% 50%, rgba(28,53,87,0.4) 0%, transparent 70%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Mountain SVG */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.06,
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1440 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
          <path
            d="M0 300 L140 160 L240 200 L380 80 L500 140 L620 40 L720 100 L820 60 L920 120 L1040 70 L1160 140 L1300 90 L1440 160 L1440 300 Z"
            fill="rgba(248,249,250,1)"
          />
        </svg>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
      }}>
        {/* Label */}
        <div
          data-reveal
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            marginBottom: '24px',
          }}
        >
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: '500',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>
            Natural Mineral Water • From Himalayan Foothills
          </span>
        </div>

        {/* Main heading */}
        <div
          data-reveal
          style={{
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            marginBottom: '24px',
          }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(48px, 9vw, 110px)',
            fontWeight: '300',
            color: '#F8F9FA',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            Elevate Your<br />
            <em style={{
              color: 'rgba(100,160,220,0.9)',
              fontStyle: 'italic',
            }}>Hydration</em>
          </h2>
        </div>

        {/* Subtext */}
        <div
          data-reveal
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            marginBottom: '56px',
          }}
        >
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: '300',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.8,
            maxWidth: '480px',
          }}>
            One product. One source. One promise — pure mineral water as nature intended, sealed in premium aluminium.
          </p>
        </div>

        {/* Can centrepiece */}
        <div
          data-reveal
          style={{
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
            marginBottom: '56px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/can-white.png"
            alt="blüra Natural Mineral Water"
            style={{
              width: 'clamp(140px, 18vw, 240px)',
              height: 'auto',
              filter: 'drop-shadow(0 30px 80px rgba(47,91,140,0.5)) drop-shadow(0 0 60px rgba(100,160,220,0.2)) brightness(1.1)',
              animation: 'floatSlow 5s ease-in-out infinite',
            }}
          />
        </div>

        {/* Buttons */}
        <div
          data-reveal
          className="cta-buttons"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <a
            href="https://wa.me/917990394138?text=Hi,%20I%E2%80%99m%20interested%20in%20ordering%20bl%C3%BCra%20mineral%20water%20in%20bulk.%20Please%20share%20details."
            target="_blank"
            rel="noopener noreferrer"
            id="buy-blura-cta"
            onClick={() => fetch('/api/inquiry', { method: 'POST', body: JSON.stringify({ source: 'Footer CTA' }) })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '18px 48px',
              background: '#F8F9FA',
              color: 'var(--dark-blue)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#F8F9FA';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <span>Inquire Now</span>
            <span style={{ fontSize: '16px' }}>→</span>
          </a>
          <Link
            href="/about"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '18px 48px',
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.5)';
              (e.currentTarget as HTMLElement).style.color = 'white';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            <span>Our Story</span>
          </Link>
        </div>

        {/* Trust badge */}
        <div
          data-reveal
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            marginTop: '48px',
            display: 'flex',
            gap: '32px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['100% Natural', 'Zero Plastic', 'pH Balanced 7.4', 'FSSAI Approved'].map(badge => (
            <div key={badge} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(100,160,220,0.7)',
              }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: '400',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.4)',
              }}>
                {badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



