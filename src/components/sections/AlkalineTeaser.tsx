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
        start: 'top 75%',
        end: 'bottom top',
        toggleActions: 'play reverse play reverse',
      }
    });

    tl.fromTo(text.children, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' }
    )
    .fromTo(jar,
      { y: 100, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
      "-=0.6"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        background: '#0c1d36', // Deep navy
        padding: 'clamp(80px, 10vw, 120px) 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '25%',
        transform: 'translate(50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(47,91,140,0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Text Content */}
        <div ref={textRef} style={{ color: 'white' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue-light)',
            marginBottom: '20px',
          }}>
            New Release
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: '300',
            lineHeight: 1.1,
            marginBottom: '24px',
          }}>
            Introducing <br/> blüra Alkaline
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: '300',
            color: 'var(--silver)',
            lineHeight: 1.8,
            marginBottom: '40px',
            maxWidth: '400px',
          }}>
            Premium hydration, now delivered to your door. Experience the pure balance of pH 9+ alkaline water with essential minerals in our new 18-litre jar.
          </p>
          
          <Link href="/alkaline-water" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ background: 'white', color: '#0c1d36', display: 'inline-flex', padding: '16px 32px' }}>
              <span>Discover More →</span>
            </button>
          </Link>
        </div>

        {/* Image Content */}
        <div ref={jarRef} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/jar-18l.png" 
            alt="blüra 18L Alkaline Water Jar" 
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.5))',
              animation: 'floatSlow 6s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
