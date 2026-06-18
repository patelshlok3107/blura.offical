'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  loadingState: 'loading' | 'transitioning' | 'loaded';
  onTransitionStart: () => void;
  onTransitionEnd: () => void;
}

export default function LoadingScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loadingState,
  onTransitionStart,
  onTransitionEnd,
}: LoadingScreenProps) {
  const containerRef    = useRef<HTMLDivElement>(null);
  const curtainRef      = useRef<HTMLDivElement>(null);
  const logoRef         = useRef<HTMLImageElement>(null);
  const progressRef     = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const glowRef         = useRef<HTMLDivElement>(null);
  const hasStarted      = useRef(false);

  const cbStart = useRef(onTransitionStart);
  const cbEnd   = useRef(onTransitionEnd);
  useEffect(() => {
    cbStart.current = onTransitionStart;
    cbEnd.current   = onTransitionEnd;
  });

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const logo        = logoRef.current;
    const progress    = progressRef.current;
    const progressFill = progressFillRef.current;
    const glow        = glowRef.current;
    const curtain     = curtainRef.current;
    const container   = containerRef.current;

    if (!logo || !progress || !progressFill || !glow || !curtain || !container) return;

    const tl = gsap.timeline();

    // ── STAGE 1: Soft ambient glow pulses in behind logo (0 → 0.6s)
    tl.fromTo(
      glow,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
      0
    );

    // ── STAGE 2: Logo materialises — scale up from 0.82, blur clears (0 → 1.0s)
    tl.fromTo(
      logo,
      { opacity: 0, scale: 0.82, filter: 'blur(8px)' },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power3.out',
      },
      0.1
    );

    // ── STAGE 4: Progress bar track appears then fill sweeps left→right
    tl.fromTo(
      progress,
      { opacity: 0, scaleX: 0.4 },
      { opacity: 1, scaleX: 1, duration: 0.5, ease: 'power2.out' },
      0.9
    );
    tl.fromTo(
      progressFill,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: 'power1.inOut', transformOrigin: 'left center' },
      1.0
    );

    // ── STAGE 5: Glow breathes (subtle pulse once logo is visible)
    tl.to(
      glow,
      { scale: 1.12, opacity: 0.7, duration: 0.9, ease: 'sine.inOut', yoyo: true, repeat: 1 },
      1.2
    );

    // ── STAGE 6: Brief hold then signal transition start
    tl.add(() => { cbStart.current(); }, '+=0.1');

    // ── STAGE 7: Logo scale-up & fade out (Alarisa zoom-out feel)
    tl.to(
      logo,
      { opacity: 0, scale: 1.08, duration: 0.65, ease: 'power2.in' },
    );
    tl.to(glow, { opacity: 0, duration: 0.5, ease: 'power2.in' }, '-=0.6');
    tl.to(progress, { opacity: 0, duration: 0.3, ease: 'power2.in' }, '-=0.5');

    // ── STAGE 8: Curtain slides UP — white panel lifts off to reveal the hero beneath
    tl.fromTo(
      curtain,
      { yPercent: 0 },
      {
        yPercent: -100,
        duration: 0.95,
        ease: 'power3.inOut',
        onComplete: () => { cbEnd.current(); },
      },
      '-=0.2'
    );

    // Also fade the main container out simultaneously for extra smoothness
    tl.to(
      container,
      { opacity: 0, duration: 0.3, ease: 'power2.inOut' },
      '-=0.35'
    );

    return () => { tl.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {/* ── White curtain panel (the one that slides up on exit) ── */}
      <div
        ref={curtainRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          pointerEvents: 'all',
          overflow: 'hidden',
        }}
      >
        {/* ── Ambient glow behind logo ── */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            width: 'clamp(340px, 50vw, 640px)',
            height: 'clamp(340px, 50vw, 640px)',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse at center, rgba(26, 54, 93, 0.06) 0%, rgba(26, 54, 93, 0.03) 45%, transparent 70%)',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {/* ── Logo ── */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={logoRef}
          src="/images/logo-new.png"
          alt="blüra"
          loading="eager"
          style={{
            width: 'clamp(200px, 28vw, 380px)',
            height: 'auto',
            display: 'block',
            opacity: 0,
            position: 'relative',
            zIndex: 2,
            userSelect: 'none',
            WebkitUserDrag: 'none',
          } as React.CSSProperties}
        />



        {/* ── Progress bar ── */}
        <div
          ref={progressRef}
          style={{
            position: 'absolute',
            bottom: 'clamp(36px, 5vh, 56px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(100px, 18vw, 180px)',
            height: '1px',
            background: 'rgba(26, 54, 93, 0.12)',
            borderRadius: '1px',
            overflow: 'hidden',
            opacity: 0,
          }}
        >
          <div
            ref={progressFillRef}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#1a365d',
              borderRadius: '1px',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
