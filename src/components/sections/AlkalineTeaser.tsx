'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AlkalineTeaser() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const jarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const jar = jarRef.current;
    if (!section || !text || !jar) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(Array.from(text.children),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
    )
    .fromTo(jar,
      { y: 60, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' },
      '-=0.5'
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, #0c1d36 0%, #0f2a4a 100%)',
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', right: '20%',
        transform: 'translate(50%, -50%)',
        width: 'clamp(300px, 50vw, 600px)', height: 'clamp(300px, 50vw, 600px)',
        background: 'radial-gradient(circle, rgba(47,91,140,0.35) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center',
      }}>
        {/* Text */}
        <div ref={textRef} style={{ color: 'white' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px', fontWeight: '700',
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: '#7ab3e8', marginBottom: '16px',
          }}>✦ New Release</p>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: '300', lineHeight: 1.1,
            marginBottom: '20px',
          }}>
            Introducing<br />blüra Alkaline
          </h2>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: '300',
            color: 'rgba(255,255,255,0.65)', lineHeight: 1.8,
            marginBottom: '36px', maxWidth: '420px',
          }}>
            Premium pH 9+ alkaline water with essential minerals, delivered weekly to your home or office in our 18-litre jar.
          </p>

          {/* Specs row */}
          <div style={{
            display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '36px',
          }}>
            {['pH 9+', '18L Jar', 'Minerals', '−ORP'].map(spec => (
              <span key={spec} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px', fontWeight: '600',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '8px 16px', borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.8)',
                background: 'rgba(255,255,255,0.07)',
              }}>{spec}</span>
            ))}
          </div>

          <Link href="/alkaline-water" style={{ textDecoration: 'none' }}>
            <button style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px', fontWeight: '600',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '16px 36px', borderRadius: '100px',
              background: 'white', color: '#0c1d36',
              border: 'none', cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
            }}
            >
              Discover More →
            </button>
          </Link>
        </div>

        {/* Jar image */}
        <div ref={jarRef} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '70%', height: '70%',
            background: 'radial-gradient(circle, rgba(100,160,230,0.2) 0%, transparent 70%)',
            borderRadius: '50%', filter: 'blur(30px)',
          }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/jar-18l.png"
            alt="blüra 18L Alkaline Water Jar"
            style={{
              width: '100%', maxWidth: 'clamp(200px, 40vw, 420px)',
              height: 'auto', position: 'relative',
              filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.5))',
              animation: 'floatSlow 6s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
