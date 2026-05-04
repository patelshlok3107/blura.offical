'use client';
import { useEffect, useRef } from 'react';

export default function GlassSection() {
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
      id="glass-section"
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vh',
        background: 'radial-gradient(circle, rgba(47,91,140,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        alignItems: 'center',
      }}
        className="responsive-grid-1"
      >
        {/* Glass visual */}
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/glass.png"
            alt="Crystal clear glass of blüra water"
            style={{
              width: '100%',
              maxWidth: '420px',
              height: 'auto',
              borderRadius: '12px',
              filter: 'drop-shadow(0 20px 60px rgba(47,91,140,0.1))',
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).parentElement!.innerHTML = CSSGlass();
            }}
          />

          {/* Ripple rings */}
          {[1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: `${i * 60}px`,
                height: `${i * 20}px`,
                border: '1px solid rgba(47,91,140,0.15)',
                borderRadius: '50%',
                animation: `ripple ${2 + i * 0.5}s ease-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Text */}
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
            }}>The Experience</p>

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: '300',
              lineHeight: 1.1,
              color: 'var(--dark-blue)',
              marginBottom: '40px',
            }}>
              Pure.<br />
              Balanced.<br />
              <em style={{ color: 'var(--accent-blue)' }}>Refreshing.</em>
            </h2>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: '300',
              lineHeight: 1.9,
              color: 'var(--text-secondary)',
              maxWidth: '380px',
              marginBottom: '40px',
            }}>
              Each sip of blüra carries the mineral richness of the Himalayan foothills — a natural balance of electrolytes that your body recognises and welcomes.
            </p>

            <blockquote style={{
              borderLeft: '2px solid var(--accent-blue)',
              paddingLeft: '24px',
              margin: '0',
            }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '22px',
                fontWeight: '300',
                fontStyle: 'italic',
                color: 'var(--dark-blue)',
                lineHeight: 1.5,
              }}>
                &ldquo;A moment of clarity in a chaotic world.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Stats */}
          <div
            data-reveal
            style={{
              opacity: 0,
              transform: 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
              marginTop: '48px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '32px',
            }}
          >
            {[
              { value: '7.4', label: 'pH Balance', unit: '' },
              { value: '500', label: 'Volume', unit: 'ml' },
              { value: '31', label: 'Calcium', unit: 'mg/L' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '40px',
                  fontWeight: '300',
                  color: 'var(--dark-blue)',
                  lineHeight: 1,
                }}>
                  {stat.value}
                  <span style={{ fontSize: '14px', fontFamily: "'Inter', sans-serif", fontWeight: '300', color: 'var(--text-secondary)' }}>
                    {stat.unit}
                  </span>
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  fontWeight: '500',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-tertiary)',
                  marginTop: '4px',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-grid-1 {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}

function CSSGlass() {
  return `
    <div style="width:280px; height:360px; position:relative; display:flex; align-items:center; justify-content:center;">
      <div style="width:160px; height:280px; border:2px solid rgba(47,91,140,0.2); border-top:none; border-radius:0 0 20px 20px; position:relative; overflow:hidden; background:rgba(255,255,255,0.3); backdrop-filter:blur(8px);">
        <div style="position:absolute; bottom:0; left:0; right:0; height:65%; background:linear-gradient(180deg, rgba(100,160,220,0.1), rgba(47,91,140,0.2)); border-radius:0 0 18px 18px;"></div>
        <div style="position:absolute; top:0; left:15%; width:12%; height:100%; background:linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);"></div>
      </div>
    </div>
  `;
}


