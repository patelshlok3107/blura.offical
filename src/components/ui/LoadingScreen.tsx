'use client';
import { useEffect, useRef, useState } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const transitionStarted = useRef(false);

  // Store callbacks in refs
  const cbStart = useRef(onTransitionStart);
  const cbEnd = useRef(onTransitionEnd);
  useEffect(() => {
    cbStart.current = onTransitionStart;
    cbEnd.current = onTransitionEnd;
  });

  // Handle video playback events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // We can trigger the transition when the video ends, or at a specific time.
    // The Awwwards droplet video is about 4-5 seconds long.
    const handleTimeUpdate = () => {
      // Start the logo reveal slightly before the video ends (e.g., at 3 seconds)
      if (video.currentTime > 2.5 && !videoEnded) {
        setVideoEnded(true);
      }
    };

    const handleEnded = () => {
      if (!videoEnded) setVideoEnded(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoEnded]);

  // Handle the transition GSAP timeline once the video is "ended" (or reached the threshold)
  useEffect(() => {
    if (videoEnded && !transitionStarted.current) {
      transitionStarted.current = true;
      
      const logo = logoContainerRef.current;
      const sweep = sweepRef.current;
      const container = containerRef.current;
      const video = videoRef.current;
      
      const tl = gsap.timeline();

      // 1. Fade in the logo over the video
      tl.fromTo(
        logo,
        { opacity: 0, scale: 0.85, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      );

      // 2. Light sweep across the logo
      tl.fromTo(
        sweep,
        { x: '-100%' },
        { x: '250%', duration: 0.9, ease: 'power2.inOut' },
        '-=0.4'
      );

      // 3. Zoom the logo in hugely to transition to landing page
      tl.add(() => {
        cbStart.current();
      }, '+=0.3');

      tl.to(logo, {
        scale: 10,
        opacity: 0,
        duration: 1.4,
        ease: 'power4.inOut',
      });
      
      // Fade out the video at the same time
      tl.to(video, {
        opacity: 0,
        duration: 1.2,
        ease: 'power2.inOut',
      }, '-=1.4');

      // 4. Fade out the whole container and finish
      tl.to(
        container,
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => {
            cbEnd.current();
          },
        },
        '-=0.6'
      );
    }
  }, [videoEnded]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#070f1a', // Dark background for the video
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Real Droplet Video Background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        src="/videos/loading-drop.mp4"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 10,
        }}
      />
      
      {/* ── Optional Dark Overlay to make logo pop ── */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.15)',
          zIndex: 15,
        }}
      />

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
          alt="blüra Elevate Yourself"
          loading="eager"
          style={{
            width: 'clamp(220px, 32vw, 420px)',
            height: 'auto',
            display: 'block',
            filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.3))' // Shadow for visibility over video
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
