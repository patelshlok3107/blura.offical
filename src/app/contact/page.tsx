'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = (field: string) => ({
    width: '100%',
    padding: '16px 0',
    background: 'none',
    border: 'none',
    borderBottom: `1px solid ${focused === field ? 'var(--accent-blue)' : 'var(--silver)'}`,
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    fontWeight: '300',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    display: 'block',
  });

  return (
    <div style={{ background: 'var(--bg-primary)', paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{
        padding: '100px 24px 80px',
        textAlign: 'center',
        background: `
          radial-gradient(ellipse 60% 50% at 50% 30%, rgba(47,91,140,0.04) 0%, transparent 70%),
          var(--bg-primary)
        `,
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--accent-blue)',
          marginBottom: '24px',
        }}>Get in Touch</p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(48px, 8vw, 90px)',
          fontWeight: '300',
          color: 'var(--dark-blue)',
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '24px',
        }}>
          Say Hello
        </h1>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '16px',
          fontWeight: '300',
          lineHeight: 1.8,
          color: 'var(--text-secondary)',
          maxWidth: '440px',
          margin: '0 auto',
        }}>
          For retail partnerships, press enquiries, or just to tell us you love blüra — we&apos;d love to hear from you.
        </p>
      </section>

      {/* Contact section */}
      <section style={{ padding: '40px 24px 120px' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '80px',
        }} className="contact-grid">
          {/* Info */}
          <div>
            <div style={{ marginBottom: '48px' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                marginBottom: '16px',
              }}>Email</p>
              <a href="mailto:contact@bluralife.com" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '22px',
                fontWeight: '300',
                color: 'var(--dark-blue)',
                textDecoration: 'none',
              }}>
                contact@bluralife.com
              </a>
            </div>

            <div style={{ marginBottom: '48px' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                marginBottom: '16px',
              }}>Phone</p>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '22px',
                fontWeight: '300',
                color: 'var(--dark-blue)',
              }}>+91 79903 94138</p>
            </div>

            <div style={{ marginBottom: '48px' }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                marginBottom: '16px',
              }}>Address</p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                fontWeight: '300',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
              }}>
                A-502 KENS AVLON,<br />
                OPP. SADGURU VATIKA,<br />
                NIKOL, AHMEDABAD-382350,<br />
                GUJARAT, INDIA
              </p>
            </div>

            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                fontWeight: '500',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                marginBottom: '20px',
              }}>Follow</p>
              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { label: 'Instagram', handle: '@bluraofficial' },
                  { label: 'Twitter', handle: '@blura' },
                ].map(social => (
                  <a key={social.label} href="#" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                  }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      fontWeight: '500',
                      color: 'var(--dark-blue)',
                      marginBottom: '2px',
                    }}>{social.label}</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '11px',
                      fontWeight: '300',
                      color: 'var(--text-tertiary)',
                    }}>{social.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 40px',
                animation: 'fadeInUp 0.6s ease',
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '60px',
                  fontWeight: '300',
                  color: 'var(--accent-blue)',
                  marginBottom: '24px',
                }}>◈</div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '40px',
                  fontWeight: '300',
                  color: 'var(--dark-blue)',
                  marginBottom: '16px',
                }}>Message Sent</h2>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '15px',
                  fontWeight: '300',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.8,
                }}>
                  Thank you for reaching out. We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }} className="form-top-grid">
                  <div>
                    <label style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '10px',
                      fontWeight: '500',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-tertiary)',
                      display: 'block',
                      marginBottom: '8px',
                    }}>Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="Jane Doe"
                      style={inputStyle('name')}
                    />
                  </div>
                  <div>
                    <label style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '10px',
                      fontWeight: '500',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-tertiary)',
                      display: 'block',
                      marginBottom: '8px',
                    }}>Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="jane@example.com"
                      style={inputStyle('email')}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: '500',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-tertiary)',
                    display: 'block',
                    marginBottom: '8px',
                  }}>Subject</label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    onFocus={() => setFocused('subject')}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...inputStyle('subject'),
                      cursor: 'pointer',
                      appearance: 'none',
                    }}
                  >
                    <option value="">Select a topic</option>
                    <option value="retail">Retail Partnership</option>
                    <option value="press">Press Enquiry</option>
                    <option value="wholesale">Wholesale Order</option>
                    <option value="feedback">Product Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    fontWeight: '500',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--text-tertiary)',
                    display: 'block',
                    marginBottom: '8px',
                  }}>Message</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell us what's on your mind..."
                    style={{
                      ...inputStyle('message'),
                      resize: 'none',
                      lineHeight: '1.8',
                    } as React.CSSProperties}
                  />
                </div>

                <button
                  type="submit"
                  id="contact-submit"
                  className="btn-primary"
                  style={{ alignSelf: 'flex-start', minWidth: '200px', justifyContent: 'center' }}
                >
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .form-top-grid { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: var(--silver); }
        select option { background: var(--bg-primary); color: var(--text-primary); }
      `}</style>
    </div>
  );
}


