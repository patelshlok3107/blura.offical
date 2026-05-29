'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const lifestyles = [
  { img: 'lifestyle-yoga.png', title: 'Yoga & Fitness Enthusiasts' },
  { img: 'lifestyle-family.png', title: 'Healthy Families' },
  { img: 'lifestyle-office.png', title: 'Offices & Workplaces' },
  { img: 'lifestyle-gym.png', title: 'Gyms & Fitness Centers' },
  { img: 'lifestyle-cafe.jpg', title: 'Cafes & Restaurants' },
];

export default function AlkalineLifestyleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(Array.from(text.children),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
    )
    .fromTo(cardsRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      "-=0.2"
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <style>{`
        .lifestyle-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .lifestyle-card:hover .lifestyle-bg {
          transform: scale(1.03);
        }
      `}</style>
      <section 
        ref={sectionRef}
        style={{
          background: 'var(--bg-primary)',
          padding: 'clamp(60px, 10vw, 120px) 0',
          overflow: 'hidden',
        }}
      >
        <div 
          ref={textRef}
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            textAlign: 'center', 
            marginBottom: 'clamp(32px, 5vw, 60px)',
            padding: '0 24px'
          }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: '300',
            color: 'var(--dark-blue)',
            marginBottom: '16px',
          }}>Perfect For Every Lifestyle</h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(14px, 2vw, 16px)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Whether you&apos;re pushing limits in the studio, managing a busy household, or leading a team, blüra Alkaline seamlessly fits into your routine.
          </p>
        </div>

        <div 
          className="lifestyle-scroll-container"
          style={{
            display: 'flex',
            gap: 'clamp(16px, 3vw, 24px)',
            overflowX: 'auto',
            padding: '20px clamp(20px, 5vw, calc((100vw - 1200px) / 2 + 24px))',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none',  // IE 10+
          }}
        >
          {lifestyles.map((item, index) => (
            <div 
              key={item.title}
              ref={el => { cardsRef.current[index] = el; }}
              className="lifestyle-card"
              style={{
                flex: '0 0 auto',
                width: 'clamp(260px, 75vw, 320px)',
                height: 'clamp(360px, 100vw, 440px)',
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                scrollSnapAlign: 'center',
                boxShadow: 'var(--shadow-light)',
                cursor: 'pointer',
              }}
            >
              {/* Background Image */}
              <div 
                className="lifestyle-bg"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(/images/${item.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease',
                }} 
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
