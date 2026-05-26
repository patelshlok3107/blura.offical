'use client';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  loadingState: 'loading' | 'transitioning' | 'loaded';
  onTransitionStart: () => void;
  onTransitionEnd: () => void;
}

export default function LoadingScreen({
  loadingState,
  onTransitionStart,
  onTransitionEnd
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasTriggeredTransition = useRef(false);

  // Counter logic
  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 2200; // 2.2 seconds for loading progress
    const range = end - start;
    let startTime: number | null = null;

    const animateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const currentProgress = Math.min(
        start + (elapsedTime / duration) * range,
        end
      );
      
      setProgress(Math.floor(currentProgress));

      if (elapsedTime < duration) {
        requestAnimationFrame(animateCounter);
      } else {
        setProgress(100);
      }
    };

    requestAnimationFrame(animateCounter);
  }, []);

  // Handle progress completion
  useEffect(() => {
    if (progress === 100 && !hasTriggeredTransition.current) {
      hasTriggeredTransition.current = true;
      triggerTransition();
    }
  }, [progress]);

  const triggerTransition = () => {
    onTransitionStart();

    const tl = gsap.timeline({
      onComplete: () => {
        onTransitionEnd();
      }
    });

    // 1. Instantly fade out the counter so only the logo zooms
    tl.to(counterRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.4,
      ease: 'power2.out'
    });

    // 2. Zoom the logo in (scale up huge and fade out)
    tl.to(logoRef.current, {
      scale: 35,
      opacity: 0,
      duration: 1.8,
      ease: 'power4.inOut'
    }, '-=0.2');

    // 3. Fade out the main container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power3.inOut'
    }, '-=1.6');
  };

  // Helper to format the counter with leading zeros
  const formatPercentage = (val: number) => {
    if (val < 10) return `00${val}`;
    if (val < 100) return `0${val}`;
    return `${val}`;
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#070f1a', // Premium deep obsidian dark blue background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Premium subtle ambient glow behind the logo */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(47, 91, 140, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main Logo Container */}
      <div
        ref={logoRef}
        style={{
          position: 'relative',
          zIndex: 10,
          transformOrigin: 'center center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 'clamp(240px, 40vw, 500px)',
          height: 'auto',
          willChange: 'transform, opacity',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/logo.png" 
          alt="blüra Logo" 
          style={{ 
            width: '100%', 
            height: 'auto',
            filter: 'brightness(0) invert(0.95) drop-shadow(0 0 20px rgba(255, 255, 255, 0.05))', // Renders original logo in stunning soft silver-white
          }} 
        />
      </div>

      {/* Modern minimalist percentage indicator */}
      <div
        ref={counterRef}
        style={{
          position: 'absolute',
          bottom: '10%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 10,
          willChange: 'opacity, transform',
        }}
      >
        <span
          style={{
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: '300',
            letterSpacing: '0.15em',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          {formatPercentage(progress)}%
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '9px',
            fontWeight: '400',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.35)',
          }}
        >
          PREPARING PURITY
        </span>
      </div>
    </div>
  );
}
