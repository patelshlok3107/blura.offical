'use client';
import { useState, useRef, useEffect } from 'react';

const tabs = ['Overview', 'Minerals', 'Benefits', 'Source Story', 'Packaging'];

const minerals = [
  { name: 'Calcium', value: '31.3', unit: 'mg/L', note: 'Bone & teeth health' },
  { name: 'Magnesium', value: '4.61', unit: 'mg/L', note: 'Muscle function' },
  { name: 'Sodium', value: '12.5', unit: 'mg/L', note: 'Electrolyte balance' },
  { name: 'Potassium', value: '1.25', unit: 'mg/L', note: 'Heart health' },
  { name: 'Bicarbonate', value: '5.80', unit: 'mg/L', note: 'pH buffering' },
  { name: 'Sulphate', value: '5.80', unit: 'mg/L', note: 'Detoxification' },
  { name: 'Chloride', value: '21.0', unit: 'mg/L', note: 'Cellular hydration' },
  { name: 'TDS', value: '7.10', unit: 'mg/L', note: 'Total dissolved solids' },
];

const benefits = [
  { icon: '◈', title: 'Natural Hydration', desc: 'Minerals naturally present help your cells absorb water more efficiently than filtered water.' },
  { icon: '◇', title: 'Electrolyte Rich', desc: 'The perfect balance of electrolytes supports muscle function, nerve health, and energy.' },
  { icon: '◉', title: 'pH Balanced', desc: 'At 7.4, blüra matches your body\'s ideal pH — promoting alkaline balance naturally.' },
  { icon: '◎', title: 'Plastic Free', desc: '100% aluminium packaging. No BPA, no microplastics, no compromise.' },
  { icon: '⬡', title: 'Pair with Clean Eating', desc: 'blüra enhances any wellness ritual — from yoga to clean meals to mindful moments.' },
  { icon: '◆', title: 'Elevate Your Table', desc: 'Serve blüra at dining experiences where only the finest belongs.' },
];

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [dragRotation, setDragRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const lastX = useRef(0);
  const canRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastX.current = e.clientX;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    setDragRotation(prev => prev + dx * 0.6);
  };

  const onMouseUp = () => setIsDragging(false);

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Hero */}
      <section style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 60px',
        background: `
          radial-gradient(ellipse 60% 60% at 50% 50%, rgba(47,91,140,0.04) 0%, transparent 70%),
          var(--bg-primary)
        `,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }} className="product-hero-grid">
          {/* Interactive can */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              ref={canRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                perspective: '800px',
                perspectiveOrigin: 'center',
              }}
            >
              <div style={{
                transform: `rotateY(${dragRotation}deg)`,
                transformStyle: 'preserve-3d',
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                width: 'clamp(200px, 28vw, 340px)',
                position: 'relative',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/can-white.png"
                  alt="blüra — drag to rotate"
                  draggable={false}
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 80px rgba(47,91,140,0.2))',
                    animation: isDragging ? 'none' : 'floatSlow 5s ease-in-out infinite',
                  }}
                />
                {/* Front face of can (back side) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/can-back-v2.png"
                  alt="blüra back"
                  draggable={false}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0 30px 80px rgba(47,91,140,0.2))',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg) scale(0.85)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '10px',
              fontWeight: '500',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--accent-blue)',
              marginBottom: '16px',
            }}>Flagship Product</p>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(48px, 7vw, 80px)',
              fontWeight: '300',
              color: 'var(--dark-blue)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: '8px',
            }}>blüra</h1>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '20px',
              fontWeight: '300',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              marginBottom: '32px',
            }}>
              Natural Mineral Water · 500ml · Aluminium
            </p>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              fontWeight: '300',
              lineHeight: 1.9,
              color: 'var(--text-secondary)',
              marginBottom: '40px',
              maxWidth: '400px',
            }}>
              Sourced from protected springs in the Himalayan foothills. Naturally filtered through ancient rock strata. Sealed in infinitely recyclable aluminium.
            </p>

            {/* Quick specs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              marginBottom: '40px',
              padding: '24px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
            }}>
              {[
                { label: 'Volume', value: '500 ml' },
                { label: 'pH Value', value: '7.4' },
                { label: 'Source', value: 'Himalayan Springs' },
                { label: 'Packaging', value: '100% Aluminium' },
              ].map(spec => (
                <div key={spec.label}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: '500',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-tertiary)',
                    marginBottom: '4px',
                  }}>{spec.label}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '20px',
                    fontWeight: '400',
                    color: 'var(--dark-blue)',
                  }}>{spec.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/917990394138?text=Hi,%20I%E2%80%99m%20interested%20in%20ordering%20bl%C3%BCra%20mineral%20water%20in%20bulk.%20Please%20share%20details."
                target="_blank"
                rel="noopener noreferrer"
                id="buy-now-product"
                className="btn-primary"
                onClick={() => fetch('/api/inquiry', { method: 'POST', body: JSON.stringify({ source: 'Product Page CTA' }) })}
                style={{ flex: '1', minWidth: '160px', justifyContent: 'center' }}
              >
                <span>Get Bulk Pricing</span>
              </a>
            </div>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: '300',
              color: 'var(--text-tertiary)',
              marginTop: '16px',
            }}>
              ← Drag the can to rotate it
            </p>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .product-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* Tabs */}
      <section style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--silver-light)',
        borderBottom: '1px solid var(--silver-light)',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          overflowX: 'auto',
        }}>
          {tabs.map((tab, i) => (
            <button
              key={tab}
              id={`tab-${tab.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => setActiveTab(i)}
              style={{
                flex: '1',
                minWidth: '120px',
                padding: '20px 16px',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === i ? '2px solid var(--accent-blue)' : '2px solid transparent',
                color: activeTab === i ? 'var(--accent-blue)' : 'var(--text-secondary)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section style={{ padding: '80px 24px', maxWidth: '900px', margin: '0 auto' }}>
        {activeTab === 0 && (
          <div style={{ animation: 'fadeInUp 0.5s ease' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: '300',
              color: 'var(--dark-blue)',
              marginBottom: '32px',
            }}>One Product. One Promise.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="overview-grid">
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                fontWeight: '300',
                lineHeight: 1.9,
                color: 'var(--text-secondary)',
              }}>
                blüra is not a product line. It is a singular commitment to purity. One 500ml aluminium can, one natural source, one unwavering standard. We believe that when something is perfect, it doesn&apos;t need a variant.
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                fontWeight: '300',
                lineHeight: 1.9,
                color: 'var(--text-secondary)',
              }}>
                Natural mineral water collected from Himalayan foothills springs, where the water has been filtered through ancient rock strata for centuries. Untouched. Unprocessed. Delivered to you in the world&apos;s most recyclable packaging.
              </p>
            </div>
            <style>{`
              @media (max-width: 600px) { .overview-grid { grid-template-columns: 1fr !important; } }
            `}</style>
          </div>
        )}

        {activeTab === 1 && (
          <div style={{ animation: 'fadeInUp 0.5s ease' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: '300',
              color: 'var(--dark-blue)',
              marginBottom: '12px',
            }}>Mineral Composition</h2>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: '300',
              color: 'var(--text-secondary)',
              marginBottom: '40px',
            }}>
              Approximate values per 1000ml (mg/L) — as naturally present in the source
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {minerals.map((mineral, i) => (
                <div key={mineral.name} style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 120px 1fr',
                  alignItems: 'center',
                  padding: '20px 0',
                  borderBottom: '1px solid var(--silver-light)',
                  animation: `fadeInUp 0.4s ease ${i * 0.06}s both`,
                }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    fontWeight: '400',
                    color: 'var(--text-primary)',
                  }}>{mineral.name}</div>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '28px',
                    fontWeight: '300',
                    color: 'var(--dark-blue)',
                    textAlign: 'center',
                  }}>{mineral.value} <span style={{ fontSize: '12px', fontFamily: 'Inter', fontWeight: '300', color: 'var(--text-tertiary)' }}>{mineral.unit}</span></div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '12px',
                    fontWeight: '300',
                    color: 'var(--text-tertiary)',
                    textAlign: 'right',
                  }}>{mineral.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div style={{ animation: 'fadeInUp 0.5s ease' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: '300',
              color: 'var(--dark-blue)',
              marginBottom: '48px',
            }}>Why blüra?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }} className="benefits-grid">
              {benefits.map((b, i) => (
                <div key={b.title} style={{
                  padding: '32px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  border: '1px solid var(--silver-light)',
                  animation: `fadeInUp 0.4s ease ${i * 0.08}s both`,
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,91,140,0.3)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--silver-light)'}
                >
                  <div style={{
                    fontSize: '24px',
                    color: 'var(--accent-blue)',
                    marginBottom: '16px',
                  }}>{b.icon}</div>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '22px',
                    fontWeight: '400',
                    color: 'var(--dark-blue)',
                    marginBottom: '12px',
                  }}>{b.title}</h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: '300',
                    lineHeight: 1.8,
                    color: 'var(--text-secondary)',
                  }}>{b.desc}</p>
                </div>
              ))}
            </div>
            <style>{`
              @media (max-width: 600px) { .benefits-grid { grid-template-columns: 1fr !important; } }
            `}</style>
          </div>
        )}

        {activeTab === 3 && (
          <div style={{ animation: 'fadeInUp 0.5s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="story-grid">
              <div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '10px',
                  fontWeight: '500',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-blue)',
                  marginBottom: '24px',
                }}>The Source</p>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: '300',
                  color: 'var(--dark-blue)',
                  marginBottom: '24px',
                  lineHeight: 1.2,
                }}>From the Heart of the Himalayas</h2>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: '300',
                  lineHeight: 1.9,
                  color: 'var(--text-secondary)',
                  marginBottom: '24px',
                }}>
                  The Himalayan foothills are one of Earth&apos;s last pristine water reservoirs. Here, ancient glaciers melt and percolate through layers of granite, limestone, and mineral-rich rock — a natural filtration system millions of years in the making.
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: '300',
                  lineHeight: 1.9,
                  color: 'var(--text-secondary)',
                }}>
                  blüra&apos;s spring sits at an altitude where air quality, water purity, and mineral content converge at their finest. We protect this source as fiercely as we protect our promise to you.
                </p>
              </div>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/mountains.png"
                  alt="Himalayan foothills source"
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    filter: 'saturate(0.85)',
                  }}
                />
              </div>
            </div>
            <style>{`
              @media (max-width: 600px) { .story-grid { grid-template-columns: 1fr !important; } }
            `}</style>
          </div>
        )}

        {activeTab === 4 && (
          <div style={{ animation: 'fadeInUp 0.5s ease' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: '300',
              color: 'var(--dark-blue)',
              marginBottom: '48px',
            }}>Premium Aluminium Packaging</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }} className="packaging-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {[
                  { title: 'Infinitely Recyclable', desc: 'Aluminium can be recycled indefinitely without loss of quality. Once blüra, always blüra — even after recycling.' },
                  { title: 'Zero BPA, Zero Plastic', desc: 'No microplastics. No hormone-disrupting chemicals. Just pure water and pure metal.' },
                  { title: 'Premium Matte Finish', desc: 'The distinctive matte white finish with Himalayan mountain line art. Packaging that earns its place on any table.' },
                  { title: 'Stays Colder Longer', desc: 'Aluminium conducts cold better than plastic — your blüra stays crisp from fridge to last sip.' },
                ].map(item => (
                  <div key={item.title} style={{ display: 'flex', gap: '20px' }}>
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--accent-blue)',
                      flexShrink: 0,
                      marginTop: '8px',
                    }} />
                    <div>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '22px',
                        fontWeight: '400',
                        color: 'var(--dark-blue)',
                        marginBottom: '8px',
                      }}>{item.title}</h3>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        fontWeight: '300',
                        lineHeight: 1.8,
                        color: 'var(--text-secondary)',
                      }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/can-top.png"
                  alt="blüra top view — premium aluminium"
                  style={{
                    width: '80%',
                    height: 'auto',
                    filter: 'drop-shadow(0 20px 50px rgba(47,91,140,0.15))',
                    animation: 'floatSlow 5s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
            <style>{`
              @media (max-width: 600px) { .packaging-grid { grid-template-columns: 1fr !important; } }
            `}</style>
          </div>
        )}
      </section>
    </div>
  );
}



