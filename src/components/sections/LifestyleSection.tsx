'use client';
import { useEffect, useRef } from 'react';

export default function LifestyleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-reveal]').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0) translateX(0)';
              }, i * 180);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="lifestyle-section"
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Mountain background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/mountains.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        opacity: 0.07,
      }} />

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Big headline */}
        <div className="lifestyle-headline" style={{ marginBottom: 'clamp(48px, 8vw, 100px)', textAlign: 'center' }}>
          <div
            data-reveal
            style={{
              opacity: 0,
              transform: 'translateY(50px)',
              transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(48px, 8vw, 100px)',
              fontWeight: '300',
              lineHeight: 1.05,
              color: 'var(--dark-blue)',
              letterSpacing: '-0.03em',
              marginBottom: '24px',
            }}>
              Purity is<br />
              <em style={{ color: 'var(--accent-blue)' }}>not a luxury.</em><br />
              It&apos;s a standard.
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              fontWeight: '300',
              color: 'var(--text-secondary)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}>
              We don&apos;t add. We don&apos;t alter. We simply deliver what the Himalayas have been perfecting for millennia.
            </p>
          </div>
        </div>

        {/* Lifestyle visual */}
        <div
          data-reveal
          style={{
            opacity: 0,
            transform: 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
            marginBottom: '100px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/can-droplets-v2.png"
            alt="blüra premium can with condensation droplets"
            style={{
              width: '100%',
              maxWidth: '360px',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 30px 80px rgba(47,91,140,0.15))',
            }}
          />
        </div>

        {/* Three pillars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '60px',
        }}
          className="pillars-grid"
        >
          {[
            {
              number: '01',
              title: 'Untouched Source',
              body: "blüra's spring emerges from protected Himalayan foothills where no industrial activity exists. It's nature, undisturbed.",
            },
            {
              number: '02',
              title: 'Zero Plastic Promise',
              body: "Every blüra is packaged in 100% aluminium — infinitely recyclable, forever premium. Our planet doesn't have a Plan B.",
            },
            {
              number: '03',
              title: 'Elevation of Self',
              body: 'When you choose blüra, you choose clarity — in your hydration, in your choices, in your impact on the world.',
            },
          ].map((pillar, i) => (
            <div
              key={pillar.number}
              data-reveal
              style={{
                opacity: 0,
                transform: `translateX(${i % 2 === 0 ? -20 : 20}px)`,
                transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '48px',
                fontWeight: '300',
                color: 'rgba(47,91,140,0.12)',
                lineHeight: 1,
                marginBottom: '16px',
              }}>
                {pillar.number}
              </div>
              <div style={{
                width: '32px',
                height: '1px',
                background: 'var(--accent-blue)',
                marginBottom: '20px',
              }} />
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '24px',
                fontWeight: '400',
                color: 'var(--dark-blue)',
                marginBottom: '16px',
              }}>
                {pillar.title}
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: '300',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
              }}>
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}


