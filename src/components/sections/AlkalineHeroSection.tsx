'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AlkalineHeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const blueprintRef = useRef<HTMLImageElement>(null);
  const realJarRef = useRef<HTMLImageElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const blueprint = blueprintRef.current;
    const realJar = realJarRef.current;
    const textContainer = textContainerRef.current;
    const badges = badgesRef.current;

    if (!container || !blueprint || !realJar || !textContainer || !badges) return;

    // Timeline for scroll transition
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
      }
    });

    // Morph blueprint to real jar
    tl.to(blueprint, { opacity: 0, scale: 1.1, duration: 1 }, 0)
      .fromTo(realJar, { opacity: 0, scale: 0.9, y: 50 }, { opacity: 1, scale: 1, y: 0, duration: 1 }, 0)
      .to(container, { background: 'var(--bg-primary)', duration: 1 }, 0)
      .fromTo(textContainer, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, 0.5)
      .fromTo(badges.children, 
        { opacity: 0, scale: 0.8, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.5 }, 
        0.6
      );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      style={{
        height: '100vh',
        background: '#0c1d36', // Starts dark for blueprint
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '24px',
      }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Blueprint Jar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          ref={blueprintRef}
          src="/images/jar-blueprint.png"
          alt="blüra 18L Blueprint"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 1,
          }}
        />

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
            filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.1))',
            opacity: 0,
          }}
        />
      </div>

      <div ref={textContainerRef} style={{ textAlign: 'center', opacity: 0, marginTop: '40px' }}>
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
