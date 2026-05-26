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
  const hasTriggeredTransition = useRef(false);

  // Counter / Progress logic
  useEffect(() => {
    let start = 0;
    const end = 100;
    const duration = 2800; // 2.8 seconds for smooth liquid filling progress
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

    // 1. Zoom the fully filled logo in (scale up huge and fade out)
    tl.to(logoRef.current, {
      scale: 35,
      opacity: 0,
      duration: 1.8,
      ease: 'power4.inOut'
    });

    // 2. Fade out the main container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power3.inOut'
    }, '-=1.6');
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

      {/* Main Logo Container acting as the Progress Bar */}
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
        {/* Bottom Logo - transparent silhouette outline */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/logo.png" 
          alt="blüra Logo Outline" 
          style={{ 
            width: '100%', 
            height: 'auto',
            display: 'block',
            opacity: 0.12, // Subtle, transparent outline
            filter: 'brightness(0) invert(0.95)',
          }} 
        />

        {/* Top Logo Wrapper - height matches progress level */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: `${progress}%`, // Rising water level
            overflow: 'hidden',
            transition: 'height 0.12s linear',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {/* Top Logo - glowing crystalline water-blue image overlay */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/images/logo.png" 
            alt="blüra Logo Water Fill" 
            style={{ 
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%', 
              height: 'auto',
              maxWidth: 'none',
              // Water glow filter: white base with intense drop shadows in white/light-blue
              filter: `brightness(0) invert(1) 
                       drop-shadow(0 0 15px rgba(255, 255, 255, 0.7)) 
                       drop-shadow(0 0 6px var(--accent-blue-light))`,
            }} 
          />

          {/* Meniscus / Glowing water boundary line at top of fill */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.95), 0 0 4px var(--accent-blue-light)',
              animation: 'wavyMeniscus 2.s ease-in-out infinite',
              pointerEvents: 'none',
              zIndex: 5,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes wavyMeniscus {
          0%, 100% { transform: scaleY(1) translateY(0); opacity: 0.8; }
          50% { transform: scaleY(1.4) translateY(-1px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
