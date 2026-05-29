'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AlkalineHeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const realJarRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const realJar = realJarRef.current;
    const textContainer = textContainerRef.current;
    const badges = badgesRef.current;

    if (!realJar || !textContainer || !badges) return;

    // Simple fade-in animation on load instead of scroll trigger
    const tl = gsap.timeline();

    tl.fromTo(realJar, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 0.2)
      .fromTo(textContainer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.4)
      .fromTo(badges.children, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 }, 
        0.6
      );

  }, []);

  return (
    <section 
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 24px 60px',
      }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        {/* Glow behind jar */}
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(47,91,140,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: 0,
        }} />

        {/* Real Photorealistic Jar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          ref={realJarRef}
          src="/images/jar-18l.png"
          alt="blüra 18L Alkaline Jar"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 2,
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.15))',
            animation: 'floatSlow 4s ease-in-out infinite',
            opacity: 0,
          }}
        />
      </div>

      <div ref={textContainerRef} style={{ textAlign: 'center', opacity: 0 }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: '300',
          color: 'var(--dark-blue)',
          lineHeight: 1.1,
          marginBottom: '16px',
        }}>
          Engineered for Purity
        </h1>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          fontWeight: '300',
          color: 'var(--text-secondary)',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          Every detail meticulously crafted to deliver the ultimate alkaline hydration experience right to your door.
        </p>
      </div>

      <div ref={badgesRef} style={{ display: 'flex', gap: '24px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['pH 9+', '18 Litres', 'Essential Minerals', 'Negative ORP'].map((badge) => (
          <div key={badge} style={{
            background: 'white',
            padding: '12px 24px',
            borderRadius: '100px',
            border: '1px solid var(--silver-light)',
            boxShadow: 'var(--shadow-soft)',
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue)',
            opacity: 0, // Set by GSAP
          }}>
            {badge}
          </div>
        ))}
      </div>
    </section>
  );
}
