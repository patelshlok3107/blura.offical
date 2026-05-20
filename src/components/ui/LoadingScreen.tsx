'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [activeLayer, setActiveLayer] = useState(0); // 0 for can, 1 for woman
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Sequence timing
    const totalDuration = 7000; // 7 seconds total
    const switchTime = 3500; // Switch image at 3.5s

    // Switch to second foreground image
    const layerTimer = setTimeout(() => {
      setActiveLayer(1);
    }, switchTime);

    // Fade out screen
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, totalDuration - 800); // start fade out slightly before end

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
      clearTimeout(layerTimer);
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
        background: '#000',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Background Layer: Mountain River with slow Ken Burns */}
      <div
        style={{
          position: 'absolute',
          inset: '-5%', // Extra space for panning
          backgroundImage: 'url(/images/loading-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'kenBurnsBg 10s ease-out forwards',
          opacity: 0.8,
        }}
      />

      {/* Foreground Layer 0: The Can */}
      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          right: '15%',
          width: 'clamp(200px, 30vw, 400px)',
          height: '80%',
          backgroundImage: 'url(/images/loading-2.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom center',
          opacity: activeLayer === 0 ? 1 : 0,
          transform: activeLayer === 0 ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.95)',
          transition: 'all 1.5s cubic-bezier(0.25, 1, 0.5, 1)',
          animation: activeLayer === 0 ? 'floatSlow 4s ease-in-out infinite' : 'none',
        }}
      />

      {/* Foreground Layer 1: The Woman Drinking */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          width: 'clamp(300px, 45vw, 600px)',
          height: '90%',
          backgroundImage: 'url(/images/loading-3.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom left',
          opacity: activeLayer === 1 ? 1 : 0,
          transform: activeLayer === 1 ? 'translateX(0) scale(1)' : 'translateX(-50px) scale(1.05)',
          transition: 'all 1.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      />

      {/* Overlay Gradient for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* Bottom Right: Logo & Loading Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '12px',
        }}
      >
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(48px, 6vw, 80px)',
          fontWeight: '300',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          blüra
        </div>
        
        {/* Progress Bar Container */}
        <div style={{
          width: '200px',
          height: '3px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Progress Bar Fill */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: `${progress}%`,
            background: '#ffffff',
            transition: 'width 0.1s linear',
          }} />
        </div>
      </div>
      
      {/* Inline styles for Ken Burns */}
      <style>{`
        @keyframes kenBurnsBg {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.15) translate(-1%, -1%); }
        }
      `}</style>
    </div>
  );
}
