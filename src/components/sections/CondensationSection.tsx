'use client';
import { useEffect, useRef } from 'react';

// Fixed condensation drops with deterministic values to prevent hydration mismatch
const drops = [
  { id: 0, x: 18.5, size: 3.2, delay: 0.8, duration: 3.1, opacity: 0.7 },
  { id: 1, x: 32.0, size: 2.1, delay: 2.3, duration: 2.4, opacity: 0.5 },
  { id: 2, x: 45.8, size: 4.5, delay: 0.2, duration: 4.2, opacity: 0.9 },
  { id: 3, x: 60.2, size: 3.8, delay: 1.7, duration: 3.5, opacity: 0.6 },
  { id: 4, x: 75.4, size: 2.6, delay: 3.1, duration: 2.8, opacity: 0.8 },
  { id: 5, x: 22.7, size: 5.1, delay: 0.5, duration: 4.8, opacity: 0.4 },
  { id: 6, x: 88.1, size: 2.8, delay: 2.8, duration: 3.3, opacity: 0.7 },
  { id: 7, x: 12.3, size: 3.5, delay: 1.2, duration: 2.9, opacity: 0.6 },
  { id: 8, x: 52.6, size: 4.0, delay: 3.7, duration: 3.7, opacity: 0.9 },
  { id: 9, x: 38.9, size: 2.3, delay: 0.9, duration: 4.1, opacity: 0.5 },
  { id: 10, x: 68.4, size: 3.7, delay: 2.1, duration: 2.6, opacity: 0.7 },
  { id: 11, x: 82.0, size: 2.9, delay: 1.5, duration: 3.9, opacity: 0.8 },
  { id: 12, x: 15.6, size: 4.3, delay: 3.4, duration: 4.4, opacity: 0.6 },
  { id: 13, x: 56.2, size: 3.1, delay: 0.4, duration: 3.0, opacity: 0.9 },
  { id: 14, x: 28.7, size: 5.5, delay: 2.6, duration: 2.3, opacity: 0.4 },
  { id: 15, x: 72.3, size: 2.4, delay: 1.1, duration: 4.6, opacity: 0.7 },
  { id: 16, x: 42.1, size: 3.9, delay: 3.9, duration: 3.2, opacity: 0.5 },
  { id: 17, x: 90.5, size: 4.8, delay: 1.8, duration: 2.7, opacity: 0.8 },
];

export default function CondensationSection() {
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
      id="condensation-section"
      style={{
        minHeight: '100vh',
        background: `
          linear-gradient(180deg, var(--bg-secondary) 0%, #E2E8EF 50%, var(--bg-secondary) 100%)
        `,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background cold atmosphere */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/condensation.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.12,
      }} />

      {/* Ambient blue glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80vw',
        height: '50vh',
        background: 'radial-gradient(ellipse, rgba(47,91,140,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
        className="responsive-grid-cold"
      >
        {/* Text side */}
        <div>
          <div
            data-reveal
            style={{
              opacity: 0,
              transform: 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent-blue)',
              marginBottom: '24px',
            }}>Serve Cold</p>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: '300',
              lineHeight: 1.1,
              color: 'var(--dark-blue)',
              marginBottom: '32px',
            }}>
              Cold.<br />
              Crisp.<br />
              <em style={{ color: 'var(--accent-blue)' }}>Alive.</em>
            </h2>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: '300',
              lineHeight: 1.9,
              color: 'var(--text-secondary)',
              maxWidth: '360px',
              marginBottom: '48px',
            }}>
              Best experienced chilled. The cold awakens every mineral note — a sensory experience as nature designed it.
            </p>

            {/* Temperature badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 28px',
              background: 'rgba(47,91,140,0.06)',
              border: '1px solid rgba(47,91,140,0.15)',
              borderRadius: '4px',
            }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '32px',
                fontWeight: '300',
                color: 'var(--dark-blue)',
              }}>4–8°C</span>
              <div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: '500',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}>Ideal Serving</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: '300',
                  color: 'var(--text-tertiary)',
                }}>Temperature Range</div>
              </div>
            </div>
          </div>
        </div>

        {/* Can with condensation */}
        <div
          data-reveal
          style={{
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Cold aura */}
          <div style={{
            position: 'absolute',
            inset: '-60px',
            background: 'radial-gradient(circle, rgba(100,160,220,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'pulse 3s ease-in-out infinite',
          }} />

          {/* Can + drops */}
          <div style={{ position: 'relative', width: 'clamp(200px, 25vw, 300px)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/can-white.png"
              alt="Cold blüra with condensation"
              style={{
                width: '100%',
                height: 'auto',
                filter: 'drop-shadow(0 20px 60px rgba(47,91,140,0.15)) drop-shadow(0 0 20px rgba(100,160,220,0.1))',
              }}
            />

            {/* Condensation drops */}
            {drops.map(drop => (
              <div
                key={drop.id}
                style={{
                  position: 'absolute',
                  left: `${drop.x}%`,
                  top: '15%',
                  width: `${drop.size}px`,
                  height: `${drop.size * 1.4}px`,
                  background: 'radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.9), rgba(180,210,240,0.6))',
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  opacity: drop.opacity,
                  animation: `dropFall ${drop.duration}s ease-in ${drop.delay}s infinite`,
                  boxShadow: '0 1px 3px rgba(47,91,140,0.1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-grid-cold {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}


