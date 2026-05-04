'use client';
import { useEffect, useRef } from 'react';

interface BluraCanProps {
  width?: number;
  height?: number;
  rotationDeg?: number;
  tiltDeg?: number;
  className?: string;
  style?: React.CSSProperties;
  imageIndex?: 0 | 1 | 2 | 3;
  shadow?: boolean;
}

const canImages = [
  '/images/can-front.png',
  '/images/can-back.png',
  '/images/can-top.png',
  '/images/can-white.png',
];

export default function BluraCan({
  width = 280,
  height = 560,
  rotationDeg = 0,
  tiltDeg = 0,
  className = '',
  style = {},
  imageIndex = 0,
  shadow = true,
}: BluraCanProps) {
  return (
    <div
      className={className}
      style={{
        width,
        height,
        position: 'relative',
        transform: `rotateY(${rotationDeg}deg) rotateZ(${tiltDeg}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease',
        ...style,
      }}
    >
      {/* Glow/Halo behind the can */}
      {shadow && (
        <div style={{
          position: 'absolute',
          bottom: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '30px',
          background: 'radial-gradient(ellipse, rgba(47, 91, 140, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }} />
      )}

      {/* Can image - using the real product photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/can-white.png"
        alt="blüra Premium Mineral Water Can"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          filter: 'drop-shadow(0 20px 60px rgba(47, 91, 140, 0.18)) drop-shadow(0 4px 20px rgba(0,0,0,0.1))',
        }}
        onError={(e) => {
          // Fallback: render a CSS can if image not found
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* CSS Fallback Can (shown if image fails) */}
      <CanFallback width={width} height={height} />
    </div>
  );
}

// Beautiful CSS-rendered can as fallback
function CanFallback({ width, height }: { width: number; height: number }) {
  const canW = width * 0.55;
  const canH = height * 0.85;

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: canW,
        height: canH,
        position: 'relative',
      }}>
        {/* Main can body */}
        <div style={{
          width: '100%',
          height: '100%',
          borderRadius: `${canW * 0.15}px ${canW * 0.15}px ${canW * 0.12}px ${canW * 0.12}px`,
          background: `linear-gradient(
            135deg,
            #e8edf2 0%,
            #f4f6f8 15%,
            #ffffff 30%,
            #eef1f5 45%,
            #dde2e8 60%,
            #c8cdd4 75%,
            #e0e4e8 88%,
            #f0f2f4 100%
          )`,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(47, 91, 140, 0.15), 0 4px 20px rgba(0,0,0,0.08), inset 2px 0 8px rgba(255,255,255,0.4), inset -2px 0 8px rgba(0,0,0,0.05)',
        }}>
          {/* Shine highlight */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            width: '20%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            borderRadius: '50%',
          }} />

          {/* blüra text on can */}
          <div style={{
            position: 'absolute',
            top: '28%',
            left: 0,
            right: 0,
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: `${canW * 0.22}px`,
              fontWeight: '400',
              color: 'var(--dark-blue)',
              letterSpacing: '-0.02em',
            }}>blüra</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: `${canW * 0.07}px`,
              fontWeight: '500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-blue)',
              marginTop: '4px',
            }}>Elevate Yourself</div>
          </div>

          {/* Mountain line art */}
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            right: '10%',
            opacity: 0.12,
          }}>
            <svg viewBox="0 0 100 40" fill="none" stroke="var(--dark-blue)" strokeWidth="0.8">
              <path d="M0 40 L15 20 L25 28 L40 8 L55 25 L65 15 L80 30 L90 22 L100 35 L100 40 Z" fill="rgba(47,91,140,0.08)" />
            </svg>
          </div>

          {/* Natural Mineral Water label */}
          <div style={{
            position: 'absolute',
            bottom: '12%',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: "'Inter', sans-serif",
            fontSize: `${canW * 0.07}px`,
            fontWeight: '300',
            letterSpacing: '0.08em',
            color: 'var(--dark-blue)',
            opacity: 0.7,
          }}>
            Natural Mineral Water
          </div>
        </div>

        {/* Top lid */}
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '82%',
          height: '16px',
          background: 'linear-gradient(180deg, #c8cdd4 0%, #a8adb4 50%, #8a8f96 100%)',
          borderRadius: `${canW * 0.15}px ${canW * 0.15}px 0 0`,
          boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        }} />

        {/* Pull tab */}
        <div style={{
          position: 'absolute',
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '30%',
          height: '10px',
          background: 'linear-gradient(180deg, #b0b5bc, #9a9fa6)',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        }} />

        {/* Bottom rim */}
        <div style={{
          position: 'absolute',
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '78%',
          height: '14px',
          background: 'linear-gradient(180deg, #a8adb4, #888d94)',
          borderRadius: `0 0 ${canW * 0.12}px ${canW * 0.12}px`,
        }} />

        {/* Shadow ellipse */}
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '20px',
          background: 'radial-gradient(ellipse, rgba(47,91,140,0.18) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(6px)',
        }} />
      </div>
    </div>
  );
}


