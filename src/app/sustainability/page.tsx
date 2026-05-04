import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sustainability — blüra',
  description: 'blüra\'s commitment to the planet — 100% aluminium packaging, eco-conscious sourcing, and a zero-plastic promise.',
};

export default function SustainabilityPage() {
  const stats = [
    { value: '100%', label: 'Aluminium', sub: 'Infinitely recyclable' },
    { value: '0', label: 'Plastic', sub: 'Zero, forever' },
    { value: '95%', label: 'Less Energy', sub: 'vs. virgin aluminium' },
    { value: '∞', label: 'Recyclable', sub: 'Without quality loss' },
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
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(47,91,140,0.04) 0%, transparent 70%),
          var(--bg-primary)
        `,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: '500',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue)',
            marginBottom: '24px',
          }}>Our Commitment</p>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(52px, 9vw, 96px)',
            fontWeight: '300',
            color: 'var(--dark-blue)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '32px',
          }}>
            One small cup for you.<br />
            <em style={{ color: 'var(--accent-blue)' }}>One giant step for the planet.</em>
          </h1>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '17px',
            fontWeight: '300',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
          }}>
            Sustainability isn&apos;t a marketing strategy. It&apos;s the foundation of every decision we make.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        padding: '80px 24px',
        background: 'var(--dark-blue)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(47,91,140,0.4) 0%, transparent 70%)',
        }} />
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '40px',
          position: 'relative',
          zIndex: 1,
        }} className="stats-grid">
          {stats.map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(48px, 6vw, 72px)',
                fontWeight: '300',
                color: '#F8F9FA',
                lineHeight: 1,
                marginBottom: '8px',
              }}>{stat.value}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: '4px',
              }}>{stat.label}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '11px',
                fontWeight: '300',
                color: 'rgba(255,255,255,0.4)',
              }}>{stat.sub}</div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* Aluminium story */}
      <section style={{ padding: '120px 24px', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '100px' }} className="alum-grid">
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'var(--accent-blue)',
                marginBottom: '24px',
              }}>The Aluminium Advantage</p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: '300',
                color: 'var(--dark-blue)',
                marginBottom: '28px',
                lineHeight: 1.2,
              }}>
                The World&apos;s Most<br />Sustainable Package
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  'Aluminium is the most abundant metal on Earth — and the most recyclable material in the world.',
                  'Recycling aluminium uses 95% less energy than producing it from raw ore. Every can recycled powers the making of 20 more.',
                  'Unlike plastic, aluminium can be recycled indefinitely without losing purity or strength.',
                  'Our cans are made with at least 70% recycled aluminium content — and that number grows every year.',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      border: '1px solid var(--accent-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-blue)' }} />
                    </div>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      fontWeight: '300',
                      lineHeight: 1.8,
                      color: 'var(--text-secondary)',
                    }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/woman-drinking.jpg"
                alt="blüra premium hydration"
                style={{
                  width: '100%',
                  height: '600px',
                  objectFit: 'cover',
                  objectPosition: 'center 30%',
                  borderRadius: '24px',
                  boxShadow: '0 30px 80px rgba(47,91,140,0.15)',
                }}
              />
            </div>
          </div>

          <style>{`
            @media (max-width: 768px) { .alum-grid { grid-template-columns: 1fr !important; } }
          `}</style>

          {/* Source protection */}
          <div style={{
            padding: '60px',
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '1px solid var(--silver-light)',
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent-blue)',
              marginBottom: '20px',
            }}>Source Protection</p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: '300',
              color: 'var(--dark-blue)',
              marginBottom: '24px',
            }}>Protecting What Gives Us Life</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: '300',
              lineHeight: 1.9,
              color: 'var(--text-secondary)',
              maxWidth: '600px',
            }}>
              blüra extracts water responsibly — never exceeding the natural replenishment rate of the spring. We work with local environmental bodies to monitor the ecosystem surrounding our source. What we take, the Himalayas replenish. Our extraction rate ensures the spring will flow for generations.
            </p>
          </div>
        </div>
      </section>

      {/* Lifecycle visual */}
      <section style={{ padding: '100px 24px', background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '300',
            color: 'var(--dark-blue)',
            marginBottom: '60px',
          }}>The blüra Can Lifecycle</h2>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            {[
              { step: '01', label: 'Himalayan Spring', icon: '◈' },
              { step: '02', label: 'Aluminium Can', icon: '◉' },
              { step: '03', label: 'You Enjoy', icon: '◇' },
              { step: '04', label: 'Recycled', icon: '◎' },
              { step: '05', label: 'New Can', icon: '⬡' },
            ].map((item, i, arr) => (
              <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '28px',
                    color: 'var(--accent-blue)',
                    marginBottom: '8px',
                  }}>{item.icon}</div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: '500',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    maxWidth: '80px',
                  }}>{item.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{
                    width: '32px',
                    height: '1px',
                    background: 'linear-gradient(90deg, var(--accent-blue), rgba(47,91,140,0.3))',
                    flexShrink: 0,
                  }} />
                )}
              </div>
            ))}
          </div>

          <div style={{
            marginTop: '60px',
            padding: '24px',
            border: '1px solid rgba(47,91,140,0.15)',
            borderRadius: '8px',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '20px',
              fontStyle: 'italic',
              color: 'var(--dark-blue)',
            }}>
              &ldquo;Fully recycled aluminium is back on shelves in as little as 60 days. No quality lost.&rdquo;
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


