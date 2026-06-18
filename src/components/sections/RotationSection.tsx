'use client';
import { useEffect, useRef, useState } from 'react';

export default function RotationShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewH - rect.top) / (viewH + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Determine which image to show based on rotation angle
  const deg = scrollProgress * 360;
  // Show back image when rotated between 90-270 degrees (back-facing)
  const showBack = deg > 90 && deg < 270;

  return (
    <section
      ref={sectionRef}
      id="rotation-section"
      style={{
        minHeight: '120vh',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sticky content */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '40px',
        padding: '24px',
      }}>
        {/* Label */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: '500',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue)',
            marginBottom: '16px',
          }}>360° View</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: '300',
            color: 'var(--dark-blue)',
            letterSpacing: '-0.02em',
          }}>
            Every Angle, Premium
          </h2>
        </div>

        {/* Rotating can stage */}
        <div style={{
          perspective: '1000px',
          perspectiveOrigin: 'center center',
        }}>
          <div
            style={{
              position: 'relative',
              width: 'clamp(200px, 24vw, 320px)',
            }}
          >
            {/* Front image — visible when facing front */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/can-white.png"
              alt="blüra front view"
              style={{
                width: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 30px 80px rgba(47,91,140,0.2)) drop-shadow(0 0 40px rgba(47,91,140,0.1))',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: showBack ? 0 : 1,
                transform: showBack ? 'scale(0.92)' : 'scale(1)',
                position: 'relative',
                zIndex: showBack ? 1 : 2,
              }}
            />
            {/* Back image — visible when facing back */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/can-back-v2.png"
              alt="blüra back view"
              style={{
                width: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 30px 80px rgba(47,91,140,0.2)) drop-shadow(0 0 40px rgba(47,91,140,0.1))',
                transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: showBack ? 1 : 0,
                transform: showBack ? 'scale(1)' : 'scale(0.92)',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: showBack ? 2 : 1,
              }}
            />
            {/* Rotating light sweep */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(${105 + deg * 0.5}deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)`,
              borderRadius: '8px',
              pointerEvents: 'none',
              zIndex: 3,
            }} />
          </div>
        </div>

        {/* Dynamic label showing current view */}
        <div style={{
          display: 'flex',
          gap: '48px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {['Front', 'Side', 'Back', 'Side'].map((view, i) => {
            const viewDeg = i * 90;
            const diff = Math.abs(deg - viewDeg);
            const isActive = diff < 45 || diff > 315;
            return (
              <span key={`${view}-${i}`} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: isActive ? '600' : '500',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--accent-blue)' : 'var(--text-tertiary)',
                transition: 'all 0.4s ease',
              }}>
                {view}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}


