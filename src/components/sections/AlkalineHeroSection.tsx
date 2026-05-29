'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AlkalineHeroSection() {
  const jarRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const jar = jarRef.current;
    const text = textRef.current;
    const badges = badgesRef.current;
    if (!jar || !text || !badges) return;

    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(jar, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' })
      .fromTo(Array.from(text.children), { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.7, ease: 'power2.out' }, '-=0.5')
      .fromTo(Array.from(badges.children), { opacity: 0, y: 12 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, '-=0.3');
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .alkaline-hero-jar { max-width: 220px !important; }
          .alkaline-hero-badges { gap: 10px !important; }
          .alkaline-hero-badge { padding: 8px 14px !important; font-size: 10px !important; }
        }
      `}</style>
      <section style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(100px, 15vw, 140px) clamp(20px, 5vw, 48px) clamp(60px, 8vw, 80px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle top gradient */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '200px',
          background: 'linear-gradient(to bottom, rgba(12,29,54,0.03), transparent)',
          pointerEvents: 'none',
        }} />

        {/* Jar */}
        <div style={{ position: 'relative', marginBottom: 'clamp(24px, 4vw, 48px)' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 'clamp(200px, 35vw, 340px)', height: 'clamp(200px, 35vw, 340px)',
            background: 'radial-gradient(circle, rgba(47,91,140,0.15) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(30px)',
          }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={jarRef}
            src="/images/jar-18l.png"
            alt="blüra 18L Alkaline Jar"
            className="alkaline-hero-jar"
            style={{
              width: '100%', maxWidth: 'clamp(200px, 35vw, 360px)',
              height: 'auto', position: 'relative',
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.12))',
              animation: 'floatSlow 5s ease-in-out infinite',
              opacity: 0,
            }}
          />
        </div>

        {/* Text */}
        <div ref={textRef} style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px', fontWeight: '700',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'var(--accent-blue)', marginBottom: '12px', opacity: 0,
          }}>Premium Alkaline Water</p>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: '300', color: 'var(--dark-blue)',
            lineHeight: 1.1, marginBottom: '16px', opacity: 0,
          }}>
            Engineered for Purity
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: '300',
            color: 'var(--text-secondary)', lineHeight: 1.8,
            maxWidth: '480px', margin: '0 auto', opacity: 0,
          }}>
            Every detail meticulously crafted to deliver the ultimate alkaline hydration experience right to your door.
          </p>
        </div>

        {/* Badges */}
        <div
          ref={badgesRef}
          className="alkaline-hero-badges"
          style={{
            display: 'flex', flexWrap: 'wrap',
            gap: 'clamp(10px, 2vw, 20px)',
            marginTop: 'clamp(28px, 4vw, 48px)',
            justifyContent: 'center',
          }}
        >
          {['pH 9+', '18 Litres', 'Essential Minerals', 'Negative ORP'].map(badge => (
            <div
              key={badge}
              className="alkaline-hero-badge"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px', fontWeight: '600',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '10px 22px', borderRadius: '100px',
                border: '1px solid rgba(28,53,87,0.15)',
                color: 'var(--accent-blue)',
                background: 'white',
                boxShadow: '0 2px 12px rgba(28,53,87,0.07)',
                opacity: 0,
              }}
            >{badge}</div>
          ))}
        </div>
      </section>
    </>
  );
}
