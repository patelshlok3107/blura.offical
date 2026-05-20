'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Sequence timing
    const totalDuration = 5000; // 5 seconds total

    // Fade out screen slightly before end to blend with HeroSection
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, totalDuration - 800); 

    // Remove component
    const finishTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = '';
    }, totalDuration);

    // Progress bar animation
    const interval = 50;
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
        background: 'var(--bg-primary)',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Background Layer: Mountain River with slow Ken Burns */}
      <div
        style={{
          position: 'absolute',
          inset: '-5%',
          backgroundImage: 'url(/images/loading-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'kenBurnsBg 10s ease-out forwards',
          // Fade opacity to match HeroSection (0.35) as progress nears 100
          opacity: 0.8 - (0.45 * (progress / 100)),
        }}
      />

      {/* Dark overlay that fades away as it loads to reveal light background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
          opacity: 1 - (progress / 100),
        }}
      />
      
      {/* Light overlay that fades in as it loads (matches HeroSection) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(248,249,250,0.5) 0%, rgba(248,249,250,0.3) 40%, rgba(248,249,250,0.7) 100%)',
          opacity: progress / 100,
        }}
      />

      {/* Big Background Text: blüra */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(120px, 25vw, 400px)',
          fontWeight: '300',
          color: 'rgba(255,255,255,0.15)', // Semi-transparent white
          whiteSpace: 'nowrap',
          letterSpacing: '-0.02em',
          zIndex: 1,
          // Subtle scale up animation
          animation: 'scaleText 8s ease-out forwards',
        }}
      >
        blüra
      </div>

      {/* Foreground Layer: The Can (Centered) */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(200px, 30vw, 400px)',
          height: '90%',
          backgroundImage: 'url(/images/loading-2.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom center',
          zIndex: 2,
          animation: 'floatSlow 4s ease-in-out infinite',
        }}
      />

      {/* Bottom Right: Small Logo & Loading Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px',
          zIndex: 3,
        }}
      >
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: progress > 80 ? 'var(--dark-blue)' : '#ffffff',
          transition: 'color 1s ease',
        }}>
          Loading...
        </div>
        
        {/* Progress Bar Container */}
        <div style={{
          width: '200px',
          height: '3px',
          background: 'rgba(128,128,128,0.3)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Progress Bar Fill */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: `${progress}%`,
            background: progress > 80 ? 'var(--accent-blue)' : '#ffffff',
            transition: 'width 0.1s linear, background 1s ease',
          }} />
        </div>
      </div>
      
      {/* Inline styles for Ken Burns */}
      <style>{`
        @keyframes kenBurnsBg {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.15) translate(-1%, -1%); }
        }
        @keyframes scaleText {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
