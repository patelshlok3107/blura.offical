'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const lifestyles = [
  { img: 'lifestyle-yoga.png', title: 'Yoga & Fitness Enthusiasts', text: 'Enhance your practice with optimal cellular hydration.' },
  { img: 'lifestyle-family.png', title: 'Healthy Families', text: 'Pure, safe, and balanced water for your loved ones.' },
  { img: 'lifestyle-office.png', title: 'Offices & Workplaces', text: 'Keep your team energized and focused all day long.' },
  { img: 'lifestyle-gym.png', title: 'Gyms & Fitness Centers', text: 'Premium hydration for premium performance.' },
  { img: 'lifestyle-cafe.png', title: 'Cafes & Restaurants', text: 'Elevate your dining experience with blüra.' },
];

export default function AlkalineLifestyleSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add infinite horizontal scroll if needed, or just let CSS handle hover effects
  }, []);

  return (
    <section style={{
      background: 'var(--bg-primary)',
      padding: '120px 24px',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: '300',
          color: 'var(--dark-blue)',
          marginBottom: '16px',
        }}>Perfect For Every Lifestyle</h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
        }}>
          Whether you&apos;re pushing limits in the studio, managing a busy household, or leading a team, blüra Alkaline seamlessly fits into your routine.
        </p>
      </div>

      <div 
        ref={containerRef}
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          padding: '20px',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none',  // IE 10+
        }}
        className="lifestyle-scroll-container"
      >
        {lifestyles.map((item, index) => (
          <div 
            key={item.title}
            style={{
              flex: '0 0 auto',
              width: '300px',
              height: '400px',
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              scrollSnapAlign: 'center',
              cursor: 'pointer',
            }}
            className="lifestyle-card"
          >
            {/* Background Image */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(/images/${item.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'transform 0.5s ease',
            }} className="lifestyle-bg" />

            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(12,29,54,0.9) 0%, rgba(12,29,54,0) 100%)',
              transition: 'background 0.3s ease',
            }} className="lifestyle-overlay" />

            {/* Content */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              padding: '32px 24px',
              color: 'white',
              transform: 'translateY(20px)',
              transition: 'transform 0.4s ease',
            }} className="lifestyle-content">
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '24px',
                fontWeight: '400',
                marginBottom: '8px',
              }}>{item.title}</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: '300',
                lineHeight: 1.6,
                opacity: 0,
                transition: 'opacity 0.4s ease',
              }} className="lifestyle-desc">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .lifestyle-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .lifestyle-card:hover .lifestyle-bg {
          transform: scale(1.05);
        }
        .lifestyle-card:hover .lifestyle-overlay {
          background: linear-gradient(to top, rgba(12,29,54,0.95) 0%, rgba(12,29,54,0.2) 100%);
        }
        .lifestyle-card:hover .lifestyle-content {
          transform: translateY(0);
        }
        .lifestyle-card:hover .lifestyle-desc {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
