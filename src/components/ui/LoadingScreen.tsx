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
  const containerRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  // Store callbacks in refs to avoid stale closure in the GSAP timeline
  const cbStart = useRef(onTransitionStart);
  const cbEnd = useRef(onTransitionEnd);
  useEffect(() => {
    cbStart.current = onTransitionStart;
    cbEnd.current = onTransitionEnd;
  });

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const drop = dropRef.current;
    const rippleContainer = rippleRef.current;
    const mountain = mountainRef.current;
    const logo = logoContainerRef.current;
    const sweep = sweepRef.current;
    const container = containerRef.current;

    if (!drop || !rippleContainer || !mountain || !logo || !sweep || !container) return;

    const rippleRings = rippleContainer.querySelectorAll('.ripple-ring');
    const tl = gsap.timeline();

    // ═══════════════════════════════════════════════
    // STAGE 1 — DROP APPEARS  (0 → 0.7s)
    // A single water droplet materialises at center-top
    // ═══════════════════════════════════════════════
    tl.fromTo(
      drop,
      { opacity: 0, scale: 0.2, y: -140 },
      { opacity: 1, scale: 1, y: -140, duration: 0.7, ease: 'power2.out' },
    );

    // ═══════════════════════════════════════════════
    // STAGE 2 — DROP FALLS  (0.7 → 1.3s)
    // Droplet accelerates downward with a slight stretch
    // ═══════════════════════════════════════════════
    tl.to(drop, {
      y: 0,
      scaleY: 1.25,
      scaleX: 0.8,
      duration: 0.6,
      ease: 'power2.in',
    });

    // ═══════════════════════════════════════════════
    // STAGE 3 — RIPPLE EXPANDS  (1.3 → 2.8s)
    // Droplet vanishes on "impact"; concentric ovals expand
    // ═══════════════════════════════════════════════
    tl.to(drop, { opacity: 0, scale: 2.5, duration: 0.12, ease: 'power2.out' });
    tl.set(rippleContainer, { opacity: 1 });
    tl.fromTo(
      rippleRings,
      { scaleX: 0, scaleY: 0, opacity: 0.7 },
      {
        scaleX: 1,
        scaleY: 1,
        opacity: 0,
        duration: 1.4,
        ease: 'power1.out',
        stagger: 0.22,
      },
    );

    // ═══════════════════════════════════════════════
    // STAGE 4 — MIST RISES  (overlaps with stage 3)
    // Himalayan mountains emerge through soft mist
    // ═══════════════════════════════════════════════
    tl.fromTo(
      mountain,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'power2.out' },
      '-=1.3',
    );

    // ═══════════════════════════════════════════════
    // STAGE 5 — LOGO REVEAL  (overlaps with stage 4)
    // blüra logo fades in and scales to full size
    // ═══════════════════════════════════════════════
    tl.fromTo(
      logo,
      { opacity: 0, scale: 0.82, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.6',
    );

    // ═══════════════════════════════════════════════
    // STAGE 6 — LIGHT SWEEP
    // Bright highlight slides across the logo
    // ═══════════════════════════════════════════════
    tl.fromTo(
      sweep,
      { x: '-100%' },
      { x: '250%', duration: 0.9, ease: 'power2.inOut' },
      '-=0.2',
    );

    // ═══════════════════════════════════════════════
    // STAGE 7 — FADE TO LANDING
    // Logo scales up hugely, everything fades out
    // ═══════════════════════════════════════════════
    tl.add(() => {
      cbStart.current();
    }, '+=0.35');

    tl.to(logo, {
      scale: 10,
      opacity: 0,
      duration: 1.4,
      ease: 'power4.inOut',
    });

    tl.to(
      mountain,
      { opacity: 0, duration: 0.9, ease: 'power2.in' },
      '-=1.4',
    );

    // ═══════════════════════════════════════════════
    // STAGE 8 — SMOOTH TRANSITION (FINAL)
    // Container disappears, hero section takes over
    // ═══════════════════════════════════════════════
    tl.to(
      container,
      {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          cbEnd.current();
        },
      },
      '-=0.7',
    );

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background:
          'linear-gradient(180deg, #dce5ef 0%, #e8eef5 25%, #f2f5f9 55%, #ffffff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Mountain Background Layer ── */}
      <div
        ref={mountainRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          willChange: 'opacity, transform',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/mountains.png"
          alt=""
          loading="eager"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
          }}
        />
        {/* Top mist overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '35%',
            background:
              'linear-gradient(to bottom, rgba(220,229,239,0.95) 0%, rgba(232,238,245,0.6) 50%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Bottom mist overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '45%',
            background:
              'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 40%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Side mist vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(255,255,255,0.7) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Water Droplet ── */}
      <div
        ref={dropRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: '-15px',
          marginTop: '-25px',
          width: '30px',
          height: '50px',
          opacity: 0,
          zIndex: 20,
          willChange: 'transform, opacity',
        }}
      >
        <svg width="30" height="50" viewBox="0 0 30 50" style={{ filter: 'drop-shadow(0px 10px 10px rgba(47,91,140,0.3))' }}>
          <defs>
            <radialGradient id="water-grad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="25%" stopColor="rgba(255, 255, 255, 0.5)" />
              <stop offset="60%" stopColor="rgba(180, 210, 240, 0.4)" />
              <stop offset="90%" stopColor="rgba(47, 91, 140, 0.6)" />
              <stop offset="100%" stopColor="rgba(20, 50, 90, 0.8)" />
            </radialGradient>
            <linearGradient id="highlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <filter id="liquid-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Main Droplet Body (Teardrop shape) */}
          <path 
            d="M 15,2 C 15,2 28,25 28,35 C 28,43 22,48 15,48 C 8,48 2,43 2,35 C 2,25 15,2 15,2 Z" 
            fill="url(#water-grad)" 
            filter="url(#liquid-glow)"
          />
          {/* Inner Caustic Highlight */}
          <path 
            d="M 15,46 C 20,46 25,42 25,36 C 25,38 20,42 15,42 C 10,42 5,38 5,36 C 5,42 10,46 15,46 Z" 
            fill="rgba(255,255,255,0.6)" 
            filter="blur(1px)"
          />
          {/* Main Specular Highlight (Left side curve) */}
          <path 
            d="M 6,32 C 6,26 10,18 14,12 C 10,18 8,26 9,32 C 9,34 7,34 6,32 Z" 
            fill="url(#highlight)" 
            filter="blur(0.5px)"
          />
        </svg>
      </div>

      {/* ── Ripple Container ── */}
      <div
        ref={rippleRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          zIndex: 15,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="ripple-ring"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${120 + i * 80}px`,
              height: `${40 + i * 28}px`,
              marginLeft: `${-(120 + i * 80) / 2}px`,
              marginTop: `${-(40 + i * 28) / 2}px`,
              borderRadius: '50%',
              transformOrigin: 'center center',
              // Realistic refractive water ripple effect
              boxShadow: `
                inset 0 2px 4px rgba(255, 255, 255, ${0.6 - i * 0.1}), 
                inset 0 -2px 6px rgba(47, 91, 140, ${0.2 - i * 0.05}),
                0 4px 8px rgba(47, 91, 140, ${0.15 - i * 0.03}),
                0 -2px 4px rgba(255, 255, 255, ${0.5 - i * 0.1})
              `,
              border: `${2 - i * 0.3}px solid rgba(255, 255, 255, ${0.4 - i * 0.1})`,
              backdropFilter: `blur(${3 - i * 0.5}px) contrast(1.1)`,
              WebkitBackdropFilter: `blur(${3 - i * 0.5}px) contrast(1.1)`,
              background: `rgba(200, 220, 240, ${0.05 - i * 0.01})`
            }}
          />
        ))}
      </div>

      {/* ── Logo Container ── */}
      <div
        ref={logoContainerRef}
        style={{
          position: 'relative',
          zIndex: 30,
          opacity: 0,
          willChange: 'transform, opacity',
          transformOrigin: 'center center',
          overflow: 'hidden',
          borderRadius: '4px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.png"
          alt="blüra"
          loading="eager"
          style={{
            width: 'clamp(220px, 32vw, 420px)',
            height: 'auto',
            display: 'block',
          }}
        />
        {/* Light sweep overlay */}
        <div
          ref={sweepRef}
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.7) 48%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0.7) 52%, rgba(255,255,255,0.15) 70%, transparent 100%)',
            transform: 'translateX(-100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
