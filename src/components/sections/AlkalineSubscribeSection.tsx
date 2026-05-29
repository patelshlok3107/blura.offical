'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AlkalineSubscribeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const whatsappNumber = "917990394138";
  
  // Custom message for 18L jar
  const whatsappMsg = "Hi, I'd like to order blüra Alkaline Water (18L jar). Please share delivery details and pricing.";
  const encodedMsg = encodeURIComponent(whatsappMsg);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  // Standard bulk message
  const bulkMsg = "Hi, I'm interested in ordering blüra Alkaline Water (18L jars) in bulk. Please share details.";
  const bulkUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(bulkMsg)}`;

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const features = featuresRef.current;

    if (!section || !left || !right || !features) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(left,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(right,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      "-=0.6"
    )
    .fromTo(Array.from(features.children),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
      "-=0.4"
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .alkaline-subscribe-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .alkaline-subscribe-right {
            padding: 32px 20px !important;
          }
          .alkaline-subscribe-price {
            font-size: 48px !important;
          }
        }
      `}</style>
      <section 
        ref={sectionRef}
        style={{
          background: 'white',
          padding: 'clamp(60px, 10vw, 120px) 24px',
          borderTop: '1px solid var(--silver-light)',
          overflow: 'hidden',
        }}
      >
        <div 
          className="alkaline-subscribe-grid"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Product Image */}
          <div ref={leftRef} style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              width: 'clamp(200px, 60vw, 300px)',
              height: 'clamp(200px, 60vw, 300px)',
              background: 'radial-gradient(circle, rgba(47,91,140,0.1) 0%, transparent 70%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              filter: 'blur(30px)',
              zIndex: 0,
            }} />
            
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/jar-18l.png" 
              alt="blüra 18L"
              style={{
                width: '100%',
                maxWidth: 'clamp(240px, 50vw, 380px)',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.1))',
              }}
            />
          </div>

          {/* Right: Booking Card */}
          <div ref={rightRef}>
            <div 
              className="alkaline-subscribe-right"
              style={{
                background: 'var(--bg-primary)',
                borderRadius: '24px',
                padding: '48px',
                border: '1px solid var(--silver-light)',
                boxShadow: 'var(--shadow-medium)',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '24px',
              }}>
                <span style={{ fontSize: 'clamp(20px, 3vw, 24px)' }}>📅</span>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(10px, 2vw, 12px)',
                  fontWeight: '600',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                }}>
                  Weekly Delivery. On-Time. Every Time.
                </p>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: 'var(--text-tertiary)',
                  marginBottom: '8px',
                }}>Rate Per Jar</div>
                <div 
                  className="alkaline-subscribe-price"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '56px',
                    color: 'var(--dark-blue)',
                    lineHeight: 1,
                  }}
                >₹120/-</div>
              </div>

              <div style={{ 
                borderTop: '1px dashed var(--silver)', 
                paddingTop: '24px',
                marginBottom: '40px',
              }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: 'var(--text-tertiary)',
                  marginBottom: '8px',
                }}>Deposit Amount</div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(28px, 4vw, 32px)',
                  color: 'var(--dark-blue)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>₹200/-</div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                }}>(Fully Refundable)</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '18px 0' }}
                >
                  <span>Pre-Book Your Delivery</span>
                </a>
                <a 
                  href={bulkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center', padding: '16px 0' }}
                >
                  Order in Bulk
                </a>
              </div>

              <div style={{
                marginTop: '24px',
                textAlign: 'center',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap',
              }}>
                <span>📞 Call us:</span> <span style={{ fontWeight: 600, color: 'var(--dark-blue)' }}>+91 79903 94138</span>
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={featuresRef}
          style={{
            marginTop: 'clamp(40px, 8vw, 80px)',
            borderTop: '1px solid var(--silver-light)',
            paddingTop: 'clamp(40px, 8vw, 60px)',
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(20px, 5vw, 60px)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: '💧', text: 'Better Hydration' },
            { icon: '✨', text: 'Better Health' },
            { icon: '🤍', text: 'Better You' },
          ].map(item => (
            <div key={item.text} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: 'var(--text-secondary)',
              }}>{item.text}</span>
            </div>
          ))}
        </div>
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '12px',
          fontWeight: '600',
          letterSpacing: '0.3em',
          color: 'var(--text-tertiary)',
        }}>
          PURE. SAFE. TRUSTED.
        </div>
      </section>
    </>
  );
}
