'use client';
import { useEffect, useRef, useState } from 'react';

export default function PourSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    if (!section || !image || !overlay || isMobile) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)));
      const scale = 1 + progress * 0.08;
      const translateY = (0.5 - progress) * 40;
      image.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      const overlayOpacity = Math.min(1, progress * 2.5);
      overlay.style.opacity = String(overlayOpacity);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  /* ---- MOBILE LAYOUT ---- */
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="pour-section"
        style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}
      >
        {/* Image */}
        <div style={{ width: '100%', maxHeight: '50vh', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pour-v2.png"
            alt="blüra pouring crystal clear water"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        {/* Text below image on mobile */}
        <div style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: '500', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-blue)', marginBottom: '12px' }}>The Ritual</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: '300', lineHeight: 1.2, color: 'var(--dark-blue)', marginBottom: '16px' }}>
              Purity in<br />Every Pour
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: '300', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              Watch as centuries of Himalayan filtration meet your moment of clarity.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: '500', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-blue)', marginBottom: '12px' }}>Origin</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 7vw, 48px)', fontWeight: '300', lineHeight: 1.2, color: 'var(--dark-blue)', marginBottom: '16px' }}>
              Filtered by<br />Himalayan Rock
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: '300', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              Through millions of years of natural stone, every drop is purified to perfection before it reaches you.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ---- DESKTOP LAYOUT (original sticky parallax) ---- */
  return (
    <section
      ref={sectionRef}
      id="pour-section"
      style={{ minHeight: '120vh', background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div ref={imageRef} style={{ position: 'absolute', inset: '-5%', transition: 'transform 0.1s linear' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pour-v2.png"
            alt="blüra pouring crystal clear water into a glass"
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center center' }}
          />
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            linear-gradient(180deg, rgba(248,249,250,0.85) 0%, rgba(248,249,250,0.1) 25%, rgba(248,249,250,0.05) 50%, rgba(248,249,250,0.2) 75%, rgba(248,249,250,0.9) 100%),
            linear-gradient(90deg, rgba(248,249,250,0.7) 0%, transparent 30%, transparent 70%, rgba(248,249,250,0.7) 100%)
          `,
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* --- NEW COOL BACKGROUND ELEMENTS --- */}
        {/* Huge scrolling watermark */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.4,
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(150px, 25vw, 400px)',
            fontWeight: '300',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(47, 91, 140, 0.1)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.1em',
            margin: 0,
            lineHeight: 1,
          }}>
            BLÜRA
          </h1>
        </div>

        {/* Subtle animated floating rings / droplets */}
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{
            position: 'absolute',
            top: `${15 + i * 15}%`,
            left: `${10 + (i % 2 === 0 ? 70 : 0) + i * 5}%`,
            width: `${20 + i * 10}px`,
            height: `${20 + i * 10}px`,
            border: '1px solid rgba(47, 91, 140, 0.15)',
            borderRadius: '50%',
            zIndex: 0,
            animation: `floatSlow ${4 + i}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.5}s`,
          }} />
        ))}
        {/* ---------------------------------- */}
        <div
          ref={overlayRef}
          className="pour-text-layout"
          style={{
            position: 'relative', zIndex: 2,
            display: 'flex', width: '100%', maxWidth: '1200px',
            padding: '0 48px', justifyContent: 'space-between', alignItems: 'center',
            opacity: 0, transition: 'opacity 0.3s ease',
          }}
        >
          <div style={{ maxWidth: '280px' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: '500', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-blue)', marginBottom: '16px' }}>The Ritual</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '300', lineHeight: 1.2, color: 'var(--dark-blue)', marginBottom: '20px' }}>
              Purity in<br />Every Pour
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: '300', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              Watch as centuries of Himalayan filtration meet your moment of clarity.
            </p>
          </div>
          <div style={{ maxWidth: '280px', textAlign: 'right' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', fontWeight: '500', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-blue)', marginBottom: '16px' }}>Origin</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: '300', lineHeight: 1.2, color: 'var(--dark-blue)', marginBottom: '20px' }}>
              Filtered by<br />Himalayan Rock
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: '300', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              Through millions of years of natural stone, every drop is purified to perfection before it reaches you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
