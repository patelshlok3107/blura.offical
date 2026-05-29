'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const scienceCards = [
  { title: 'Pure Alkaline', desc: 'pH 9+ for optimal body balance', icon: '💧', x: -300, y: -150 },
  { title: 'Essential Minerals', desc: 'Ca, Mg, Na for daily vitality', icon: '⛰️', x: 300, y: -100 },
  { title: 'Negative ORP', desc: 'Antioxidant-rich for cellular health', icon: '⚡', x: -280, y: 150 },
  { title: 'Balanced Hydration', desc: 'Electrolyte-optimized absorption', icon: '🔄', x: 280, y: 120 },
];

export default function AlkalineScienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const jarRef = useRef<HTMLImageElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(jarRef.current, 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
    )
    .fromTo(cardsRef.current, 
      { opacity: 0, scale: 0.8, x: 0, y: 0 }, 
      { 
        opacity: 1, 
        scale: 1, 
        x: i => scienceCards[i].x, 
        y: i => scienceCards[i].y, 
        duration: 1.2, 
        stagger: 0.2, 
        ease: 'back.out(1.2)' 
      }, 
      "-=0.5"
    );

  }, []);

  return (
    <section 
      ref={sectionRef}
      style={{
        background: '#0c1d36', // Deep navy
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1000px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '600px',
      }}>
        {/* Glow behind jar */}
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          background: 'rgba(47,91,140,0.6)',
          filter: 'blur(60px)',
          borderRadius: '50%',
          animation: 'glowPulse 4s infinite ease-in-out',
          zIndex: 0,
        }} />

        {/* Center Jar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          ref={jarRef}
          src="/images/jar-18l.png" 
          alt="blüra 18L"
          style={{
            width: '280px',
            position: 'relative',
            zIndex: 10,
            animation: 'floatSlow 4s ease-in-out infinite',
            filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.5))',
          }}
        />

        {/* Orbiting Cards */}
        {scienceCards.map((card, i) => (
          <div 
            key={card.title}
            ref={el => { cardsRef.current[i] = el; }}
            className="glass-card"
            style={{
              position: 'absolute',
              padding: '24px',
              width: '220px',
              zIndex: 5,
              opacity: 0, // Set by GSAP
              animation: `orbitFloat ${5 + i}s infinite ease-in-out alternate`,
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>{card.icon}</div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '20px',
              color: 'white',
              marginBottom: '8px',
            }}>{card.title}</h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: 'var(--silver)',
              lineHeight: 1.6,
            }}>{card.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .glass-card {
            position: relative !important;
            transform: none !important;
            animation: none !important;
            width: 100% !important;
            margin-bottom: 20px;
          }
          .science-container {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
