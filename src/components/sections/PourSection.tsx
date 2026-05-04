'use client';
import { useEffect, useRef } from 'react';

export default function PourSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    if (!section || !image || !overlay) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)));

      // Parallax + scale on the pour photo
      const scale = 1 + progress * 0.08;
      const translateY = (0.5 - progress) * 40;
      image.style.transform = `scale(${scale}) translateY(${translateY}px)`;

      // Fade the overlay text as scrolling
      const overlayOpacity = Math.min(1, progress * 2.5);
      overlay.style.opacity = String(overlayOpacity);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pour-section"
      style={{
        minHeight: '120vh',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sticky container */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Pour photo — full width with parallax */}
        <div
          ref={imageRef}
          style={{
            position: 'absolute',
            inset: '-5%',
            transition: 'transform 0.1s linear',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pour-v2.png"
            alt="blüra pouring crystal clear water into a glass"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center center',
            }}
          />
        </div>

        {/* Gradient overlay for text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(180deg, rgba(248,249,250,0.85) 0%, rgba(248,249,250,0.1) 25%, rgba(248,249,250,0.05) 50%, rgba(248,249,250,0.2) 75%, rgba(248,249,250,0.9) 100%),
            linear-gradient(90deg, rgba(248,249,250,0.7) 0%, transparent 30%, transparent 70%, rgba(248,249,250,0.7) 100%)
          `,
          pointerEvents: 'none',
        }} />

        {/* Text overlay */}
        <div
          ref={overlayRef}
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            width: '100%',
            maxWidth: '1200px',
            padding: '0 48px',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
          className="pour-text-layout"
        >
          {/* Left text */}
          <div style={{ maxWidth: '280px' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent-blue)',
              marginBottom: '16px',
            }}>The Ritual</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: '300',
              lineHeight: 1.2,
              color: 'var(--dark-blue)',
              marginBottom: '20px',
            }}>
              Purity in<br />Every Pour
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: '300',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
            }}>
              Watch as centuries of Himalayan filtration meet your moment of clarity.
            </p>
          </div>

          {/* Right text */}
          <div style={{ maxWidth: '280px', textAlign: 'right' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent-blue)',
              marginBottom: '16px',
            }}>Origin</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: '300',
              lineHeight: 1.2,
              color: 'var(--dark-blue)',
              marginBottom: '20px',
            }}>
              Filtered by<br />Himalayan Rock
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: '300',
              lineHeight: 1.8,
              color: 'var(--text-secondary)',
            }}>
              Through millions of years of natural stone, every drop is purified to perfection before it reaches you.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pour-text-layout {
            flex-direction: column !important;
            gap: 40px !important;
            text-align: center !important;
            padding: 0 24px !important;
          }
          .pour-text-layout > div {
            text-align: center !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}


