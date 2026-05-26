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
    const duration = 2800; // 2.8 seconds for smooth text-filling progress
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

    // Zoom the fully filled text in (scale up huge and fade out)
    tl.to(logoRef.current, {
      scale: 35,
      opacity: 0,
      duration: 1.8,
      ease: 'power4.inOut'
    });

    // Fade out the main container
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
        background: '#070f1a', // Premium deep obsidian dark background (matching NeoLeaf's sleek aesthetic)
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Premium subtle ambient glow behind the text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(47, 91, 140, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Centered bold text logo with horizontal linear gradient clip progress (NeoLeaf-Style) */}
      <div
        ref={logoRef}
        style={{
          position: 'relative',
          zIndex: 10,
          fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: 'clamp(54px, 12vw, 130px)',
          fontWeight: 900,
          letterSpacing: '-0.05em', // Tightly-spaced kerning matching NeoLeaf exactly
          textTransform: 'lowercase', // Matches blüra branding syntax
          color: 'transparent',
          backgroundImage: `linear-gradient(to right, #ffffff ${progress}%, rgba(255, 255, 255, 0.12) ${progress}%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          display: 'inline-block',
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
      >
        blüra
      </div>
    </div>
  );
}
