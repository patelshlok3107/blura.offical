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
          marginLeft: '-14px',
          marginTop: '-20px',
          width: '28px',
          height: '40px',
          opacity: 0,
          zIndex: 20,
          willChange: 'transform, opacity',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(180deg, rgba(190,215,240,0.35) 0%, rgba(120,175,230,0.55) 45%, rgba(47,91,140,0.45) 100%)',
            borderRadius: '50% 50% 50% 50% / 30% 30% 70% 70%',
            position: 'relative',
            boxShadow:
              '0 0 24px rgba(47,91,140,0.2), inset 0 -4px 8px rgba(47,91,140,0.1)',
          }}
        >
          {/* Specular highlight */}
          <div
            style={{
              position: 'absolute',
              top: '18%',
              left: '22%',
              width: '32%',
              height: '22%',
              background: 'rgba(255,255,255,0.7)',
              borderRadius: '50%',
              filter: 'blur(1.5px)',
            }}
          />
          {/* Secondary highlight */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '20%',
              width: '14%',
              height: '10%',
              background: 'rgba(255,255,255,0.35)',
              borderRadius: '50%',
              filter: 'blur(1px)',
            }}
          />
        </div>
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
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="ripple-ring"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${100 + i * 70}px`,
              height: `${36 + i * 26}px`,
              marginLeft: `${-(100 + i * 70) / 2}px`,
              marginTop: `${-(36 + i * 26) / 2}px`,
              border: `${1.8 - i * 0.25}px solid rgba(47, 91, 140, ${0.4 - i * 0.06})`,
              borderRadius: '50%',
              transformOrigin: 'center center',
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
