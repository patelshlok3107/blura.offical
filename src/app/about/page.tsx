import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story — blüra',
  description: 'The story behind blüra — a Himalayan mineral water brand built on purity, sustainability, and the belief that hydration should be an elevation.',
};

export default function AboutPage() {
  const timeline = [
    { year: '2020', title: 'The Idea', desc: 'In the chaos of modern life, founder Shlok envisioned a water brand that stood for radical purity — no plastic, no compromise.' },
    { year: '2021', title: 'Finding the Source', desc: 'After months exploring the Himalayan foothills, we identified a protected spring with exceptional mineral balance and pristine purity.' },
    { year: '2022', title: 'The Aluminium Promise', desc: 'We committed to 100% aluminium packaging — the most sustainable beverage packaging on Earth. Zero plastic, forever.' },
    { year: '2023', title: 'blüra is Born', desc: 'blüra — Natural Mineral Water. From Himalayan Foothills. A moment of clarity in a chaotic world.' },
    { year: '2024', title: 'Elevating India', desc: 'blüra reaches premium retailers, yoga studios, fine dining tables, and mindful homes across India.' },
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
        background: `
          radial-gradient(ellipse 70% 60% at 50% 30%, rgba(47,91,140,0.04) 0%, transparent 70%),
          var(--bg-primary)
        `,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        {/* Mountains BG */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0.06,
        }}>
          <svg viewBox="0 0 1440 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
            <path d="M0 300 L120 160 L220 200 L360 70 L480 130 L580 50 L700 100 L820 40 L960 100 L1080 60 L1200 120 L1320 80 L1440 150 L1440 300 Z" fill="rgba(28,53,87,0.8)" />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: '500',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue)',
            marginBottom: '24px',
          }}>Our Story</p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(52px, 9vw, 100px)',
            fontWeight: '300',
            color: 'var(--dark-blue)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '32px',
          }}>
            Born from<br />
            <em style={{ color: 'var(--accent-blue)' }}>Clarity</em>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px',
            fontWeight: '300',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
          }}>
            We didn&apos;t set out to build a water company. We set out to change how people think about what they drink.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{
        padding: '120px 24px',
        background: 'var(--bg-secondary)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '100px' }} className="about-grid">
            <div>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontWeight: '300',
                color: 'var(--dark-blue)',
                marginBottom: '28px',
                lineHeight: 1.2,
              }}>
                The Philosophy of Pure
              </h2>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: '300',
                lineHeight: 1.9,
                color: 'var(--text-secondary)',
                marginBottom: '20px',
              }}>
                With blüra, we bring nature&apos;s purity to your hands — untouched, unbothered, and uncompromising. We don&apos;t add minerals. We don&apos;t filter them out. We simply allow the Himalayas to do what they&apos;ve always done.
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: '300',
                lineHeight: 1.9,
                color: 'var(--text-secondary)',
              }}>
                Each can of blüra is a small act of faith — in nature, in sustainability, in the belief that your choices shape tomorrow.
              </p>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/can-back-v2.png"
                alt="blüra — a moment of clarity"
                style={{
                  width: '80%',
                  maxWidth: '380px',
                  margin: '0 auto',
                  display: 'block',
                  filter: 'drop-shadow(0 20px 60px rgba(47,91,140,0.15))',
                  animation: 'floatSlow 5s ease-in-out infinite',
                }}
              />
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) {
              .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            }
          `}</style>

          {/* Big quote */}
          <blockquote style={{
            textAlign: 'center',
            padding: '60px 40px',
            borderTop: '1px solid var(--silver)',
            borderBottom: '1px solid var(--silver)',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(24px, 4vw, 40px)',
              fontWeight: '300',
              fontStyle: 'italic',
              color: 'var(--dark-blue)',
              lineHeight: 1.4,
              maxWidth: '700px',
              margin: '0 auto',
            }}>
              &ldquo;a moment of clarity in a chaotic world&rdquo;
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              fontWeight: '400',
              letterSpacing: '0.1em',
              color: 'var(--text-tertiary)',
              marginTop: '20px',
              textTransform: 'uppercase',
            }}>— The blüra Promise</p>
          </blockquote>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '120px 24px', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent-blue)',
              marginBottom: '16px',
            }}>Journey</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: '300',
              color: 'var(--dark-blue)',
            }}>From Idea to Elevation</h2>
          </div>

          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: '8px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, var(--accent-blue), rgba(47,91,140,0.1))',
            }} />

            {timeline.map((item, i) => (
              <div key={item.year} style={{
                position: 'relative',
                marginBottom: '60px',
                animation: `fadeInUp 0.6s ease ${i * 0.1}s both`,
              }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute',
                  left: '-36px',
                  top: '4px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--bg-primary)',
                  border: '2px solid var(--accent-blue)',
                }} />

                <span style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '14px',
                  fontWeight: '400',
                  color: 'var(--accent-blue)',
                  letterSpacing: '0.05em',
                  display: 'block',
                  marginBottom: '8px',
                }}>{item.year}</span>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '28px',
                  fontWeight: '400',
                  color: 'var(--dark-blue)',
                  marginBottom: '12px',
                }}>{item.title}</h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  fontWeight: '300',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team values */}
      <section style={{ padding: '100px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '300',
            color: 'var(--dark-blue)',
            marginBottom: '60px',
          }}>What We Believe In</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }} className="values-grid">
            {[
              { value: 'Purity', desc: 'No additives. No treatment. Nothing but what nature provides.' },
              { value: 'Responsibility', desc: 'Zero plastic is not a goal. It is the only option.' },
              { value: 'Elevation', desc: 'blüra is for those who choose to live with intention.' },
            ].map(v => (
              <div key={v.value} style={{ padding: '40px 24px' }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '36px',
                  fontWeight: '300',
                  color: 'var(--dark-blue)',
                  marginBottom: '16px',
                  fontStyle: 'italic',
                }}>{v.value}</div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: '300',
                  lineHeight: 1.8,
                  color: 'var(--text-secondary)',
                }}>{v.desc}</p>
              </div>
            ))}
          </div>
          <style>{`
            @media (max-width: 600px) { .values-grid { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>
    </div>
  );
}


