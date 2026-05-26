'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const totalDuration = 4000; // 4 seconds total
    const interval = 40;

    const fadeOutTimer = setTimeout(() => setIsFadingOut(true), totalDuration - 800); 
    const finishTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, totalDuration);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / (totalDuration / interval));
        return next > 100 ? 100 : next;
      });
    }, interval);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(finishTimer);
      clearInterval(progressTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: `
          radial-gradient(ellipse 70% 60% at 50% 40%, rgba(47, 91, 140, 0.04) 0%, transparent 70%),
          var(--bg-primary)
        `,
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Background Image - matches landing page exactly */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero-bg-v2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          opacity: 0.35,
          animation: 'kenBurnsBg 8s ease-out forwards',
        }}
      />

      {/* Light Overlay - matches landing page exactly */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(248,249,250,0.5) 0%, rgba(248,249,250,0.3) 40%, rgba(248,249,250,0.7) 100%)',
        }}
      />

      {/* Mist layers */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '-10%',
        right: '-10%',
        height: '35%',
        background: 'linear-gradient(to top, rgba(248,249,250,0.95) 0%, rgba(248,249,250,0.6) 50%, transparent 100%)',
      }} />

      {/* Main Content Wrapper */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-5vh',
        }}
      >
        {/* Animated Brand Logo */}
        <div style={{
          marginBottom: '20px',
          animation: 'fadeInUp 1s ease forwards',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/logo.png" 
            alt="blüra CANNED HIMALAYAN WATER" 
            style={{ 
              width: 'clamp(240px, 40vw, 500px)', 
              height: 'auto'
            }} 
          />
        </div>

        {/* Floating Can */}
        <div
          style={{
            position: 'relative',
            width: 'clamp(180px, 22vw, 300px)',
            height: 'auto',
            animation: 'fadeInUp 1.2s ease forwards, floatSlow 4s ease-in-out infinite',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/can-white.png"
            alt="blüra Can"
            style={{
              width: '100%',
              height: 'auto',
              filter: 'drop-shadow(0 30px 80px rgba(47, 91, 140, 0.2))',
            }}
          />
        </div>
      </div>

      {/* Loading Bar at Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          zIndex: 10,
          animation: 'fadeIn 1s ease forwards',
          animationDelay: '0.5s',
          opacity: 0,
        }}
      >
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--text-tertiary)',
        }}>
          {progress < 100 ? 'Preparing Experience' : 'Ready'}
        </span>
        
        {/* Progress Bar */}
        <div style={{
          width: 'clamp(150px, 20vw, 250px)',
          height: '2px',
          background: 'rgba(47, 91, 140, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: `${progress}%`,
            background: 'var(--accent-blue)',
            transition: 'width 0.1s linear',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes kenBurnsBg {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-1%, -1%); }
        }
      `}</style>
    </div>
  );
}
