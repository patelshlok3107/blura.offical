'use client';
import { useEffect, useRef } from 'react';

const features = [
  {
    id: 'mineral-composition',
    label: 'Natural Mineral Composition',
    description: 'Calcium, Magnesium, Potassium — precisely as nature intended.',
    position: 'left',
    top: '12%',
    icon: '⬡',
  },
  {
    id: 'himalayan-source',
    label: 'Himalayan Source',
    description: 'Sourced from protected springs in the Himalayan foothills.',
    position: 'left',
    top: '35%',
    icon: '◈',
  },
  {
    id: 'electrolyte-balance',
    label: 'Electrolyte Balance',
    description: 'pH 7.4 — perfectly balanced for optimal absorption.',
    position: 'left',
    top: '58%',
    icon: '◇',
  },
  {
    id: 'premium-packaging',
    label: 'Premium Aluminium',
    description: '500ml of purity in an infinitely recyclable aluminium can.',
    position: 'right',
    top: '22%',
    icon: '◉',
  },
  {
    id: 'eco-friendly',
    label: 'Eco-Friendly Design',
    description: 'Zero plastic. 100% aluminium. One giant step for the planet.',
    position: 'right',
    top: '48%',
    icon: '◎',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-feature]').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0) translateX(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const leftFeatures = features.filter(f => f.position === 'left');
  const rightFeatures = features.filter(f => f.position === 'right');

  return (
    <section
      ref={sectionRef}
      id="features-section"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background abstract element to fill space */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(47,91,140,0.04) 0%, transparent 60%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(47,91,140,0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'var(--accent-blue)',
          marginBottom: '16px',
        }}>What&apos;s Inside</p>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(36px, 6vw, 72px)',
          fontWeight: '300',
          color: 'var(--dark-blue)',
          letterSpacing: '-0.02em',
        }}>
          Engineered by Nature
        </h2>
      </div>

      {/* Feature layout */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 260px 1fr',
        gap: '40px',
        alignItems: 'center',
      }}
        className="feature-layout"
      >
        {/* Left features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {leftFeatures.map((feature) => (
            <div
              key={feature.id}
              id={feature.id}
              data-feature
              style={{
                opacity: 0,
                transform: 'translateX(-30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
              }}
            >
              {/* Content */}
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'var(--dark-blue)',
                  marginBottom: '6px',
                  letterSpacing: '0.02em',
                }}>
                  {feature.label}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: '300',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}>
                  {feature.description}
                </div>
              </div>
              {/* Connector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '2px' }}>
                <div style={{
                  width: '32px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, var(--accent-blue))',
                }} />
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--accent-blue)',
                  background: 'var(--bg-primary)',
                  flexShrink: 0,
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Center can */}
        <div
          data-feature
          style={{
            opacity: 0,
            transform: 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Soft glow */}
          <div style={{
            position: 'absolute',
            inset: '-40px',
            background: 'radial-gradient(circle, rgba(47,91,140,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
          }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/can-white.png"
            alt="blüra can features"
            style={{
              width: '100%',
              maxWidth: '220px',
              height: 'auto',
              filter: 'drop-shadow(0 20px 60px rgba(47,91,140,0.15))',
              position: 'relative',
              zIndex: 1,
              animation: 'floatSlow 6s ease-in-out infinite',
            }}
          />
        </div>

        {/* Right features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {rightFeatures.map((feature) => (
            <div
              key={feature.id}
              id={feature.id}
              data-feature
              style={{
                opacity: 0,
                transform: 'translateX(30px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
              }}
            >
              {/* Connector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '2px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  border: '1.5px solid var(--accent-blue)',
                  background: 'var(--bg-primary)',
                  flexShrink: 0,
                }} />
                <div style={{
                  width: '32px',
                  height: '1px',
                  background: 'linear-gradient(90deg, var(--accent-blue), transparent)',
                }} />
              </div>
              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'var(--dark-blue)',
                  marginBottom: '6px',
                  letterSpacing: '0.02em',
                }}>
                  {feature.label}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: '300',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                }}>
                  {feature.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .feature-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}


