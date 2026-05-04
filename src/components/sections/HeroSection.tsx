'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const canRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax on mouse move
    const onMouseMove = (e: MouseEvent) => {
      const can = canRef.current;
      if (!can) return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const dx = (e.clientX - centerX) / centerX;
      const dy = (e.clientY - centerY) / centerY;
      can.style.transform = `translateY(-12px) rotateY(${dx * 8}deg) rotateX(${-dy * 4}deg)`;
    };

    const onMouseLeave = () => {
      if (canRef.current) {
        canRef.current.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg)';
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse 70% 60% at 50% 40%, rgba(47, 91, 140, 0.04) 0%, transparent 70%),
          radial-gradient(ellipse 50% 40% at 80% 80%, rgba(47, 91, 140, 0.03) 0%, transparent 60%),
          var(--bg-primary)
        `,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Hero background image — real Himalayan river */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/hero-bg-v2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        opacity: 0.35,
      }} />
      {/* Soft white overlay for text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(248,249,250,0.5) 0%, rgba(248,249,250,0.3) 40%, rgba(248,249,250,0.7) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Mist layers */}
      <div ref={mistRef} style={{
        position: 'absolute',
        bottom: 0,
        left: '-10%',
        right: '-10%',
        height: '35%',
        background: 'linear-gradient(to top, rgba(248,249,250,0.95) 0%, rgba(248,249,250,0.6) 50%, transparent 100%)',
        animation: 'mistFlow 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Mountain SVG line art */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: 0,
        right: 0,
        opacity: 0.07,
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
          <path
            d="M0 200 L120 120 L200 150 L320 60 L420 110 L520 40 L620 90 L700 20 L800 80 L900 50 L1000 100 L1100 70 L1200 120 L1320 80 L1440 130 L1440 200 Z"
            fill="rgba(28,53,87,0.15)"
            stroke="rgba(28,53,87,0.4)"
            strokeWidth="1"
            className="mountain-line"
          />
          <path
            d="M0 200 L80 160 L180 180 L280 140 L380 165 L480 130 L580 155 L680 110 L780 140 L880 115 L980 145 L1080 120 L1180 150 L1280 130 L1440 160 L1440 200 Z"
            fill="rgba(28,53,87,0.06)"
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '120px 24px 80px',
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Top label */}
        <div
          ref={textRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: '500',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue)',
            marginBottom: '32px',
            animation: 'fadeInUp 1s ease forwards',
            animationDelay: '0.2s',
            opacity: 0,
          }}
        >
          From Himalayan Foothills
        </div>

        {/* Brand name */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(72px, 12vw, 160px)',
          fontWeight: '300',
          letterSpacing: '-0.04em',
          lineHeight: 0.9,
          color: 'var(--dark-blue)',
          animation: 'fadeInUp 1.2s ease forwards',
          animationDelay: '0.4s',
          opacity: 0,
          marginBottom: '8px',
        }}>
          bl<span style={{ color: 'var(--accent-blue)' }}>ü</span>ra
        </div>

        {/* Tagline */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(16px, 3vw, 24px)',
          fontWeight: '300',
          fontStyle: 'italic',
          letterSpacing: '0.06em',
          color: 'var(--text-secondary)',
          animation: 'fadeInUp 1.2s ease forwards',
          animationDelay: '0.7s',
          opacity: 0,
          marginBottom: '60px',
        }}>
          Elevate Yourself
        </div>

        {/* Can */}
        <div
          ref={canRef}
          style={{
            position: 'relative',
            marginBottom: '60px',
            cursor: 'none',
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            animation: 'fadeIn 1.5s ease forwards, floatSlow 5s ease-in-out 1.5s infinite',
            animationDelay: '1s, 0s',
            opacity: 0,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Soft halo glow */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(47,91,140,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            animation: 'pulse 4s ease-in-out infinite',
          }} />

          {/* Actual can image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/can-white.png"
            alt="blüra Premium Mineral Water"
            style={{
              width: 'clamp(180px, 22vw, 300px)',
              height: 'auto',
              filter: 'drop-shadow(0 30px 80px rgba(47, 91, 140, 0.2)) drop-shadow(0 8px 30px rgba(0,0,0,0.1))',
              position: 'relative',
              zIndex: 2,
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = 'none';
              const fallback = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />

          {/* CSS Fallback Can */}
          <HeroCSSCan />
        </div>

        {/* Scroll hint */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'fadeInUp 1s ease forwards',
          animationDelay: '2s',
          opacity: 0,
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: '500',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)',
          }}>Scroll to explore</span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--accent-blue), transparent)',
            animation: 'breathe 2s ease-in-out infinite',
          }} />
        </div>
      </div>

      {/* Ambient light top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(47,91,140,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}

function HeroCSSCan() {
  return (
    <div style={{
      display: 'none',
      width: 'clamp(150px, 18vw, 240px)',
      aspectRatio: '1 / 2.2',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '14px 14px 10px 10px',
        background: `linear-gradient(135deg,
          #e8edf2 0%, #f4f6f8 12%, #ffffff 28%,
          #eef1f5 44%, #dde2e8 58%,
          #c8cdd4 74%, #e0e4e8 88%, #f0f2f4 100%)`,
        boxShadow: '0 20px 60px rgba(47, 91, 140, 0.15), 0 4px 20px rgba(0,0,0,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: 0,
          right: 0,
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(20px, 4vw, 36px)',
            fontWeight: '400',
            color: 'var(--dark-blue)',
          }}>blüra</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(5px, 1vw, 8px)',
            fontWeight: '500',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue)',
            marginTop: '4px',
          }}>Elevate Yourself</div>
        </div>
      </div>
    </div>
  );
}


