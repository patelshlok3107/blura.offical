'use client';
import { useEffect, useRef, useState } from 'react';

export default function BulkInquirySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', phone: '', quantity: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-reveal]').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleWhatsAppClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    let text = 'Hi, I’m interested in ordering blüra mineral water in bulk. Please share details.';
    
    const keywords = (formData.name).toLowerCase();
    const tags: string[] = [];
    if (keywords.includes('hotel')) tags.push('hotel');
    if (keywords.includes('event') || keywords.includes('wedding')) tags.push('event');
    if (keywords.includes('office') || keywords.includes('corporate')) tags.push('office');
    if (keywords.includes('retail') || keywords.includes('store')) tags.push('retail');

    if (formData.name || formData.phone || formData.quantity) {
      text = `Hi, I'm interested in ordering blüra in bulk.\n\n`;
      if (formData.name) text += `Name: ${formData.name}\n`;
      if (formData.phone) text += `Phone: ${formData.phone}\n`;
      if (formData.quantity) text += `Quantity: ${formData.quantity} cans\n`;
      text += `\nPlease share details.`;
    }

    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'form',
          tags: tags.join(',')
        })
      });
    } catch (err) {
      console.error('Failed to log inquiry:', err);
    }

    const url = `https://wa.me/917990394138?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    background: 'transparent',
    border: '1px solid var(--silver)',
    borderRadius: '4px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '14px',
    fontWeight: '300',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  return (
    <section
      ref={sectionRef}
      id="bulk-inquiry-section"
      style={{
        padding: '120px 24px',
        background: 'var(--bg-secondary)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        maxWidth: '1000px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '60px',
        alignItems: 'center',
      }}
        className="responsive-grid-inquiry"
      >
        {/* Text Side */}
        <div data-reveal style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: '500',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--accent-blue)',
            marginBottom: '16px',
          }}>Partnerships</p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: '300',
            color: 'var(--dark-blue)',
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            Looking for bulk orders?
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '16px',
            fontWeight: '300',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: '32px',
          }}>
            Perfect for hotels, exclusive events, corporate offices, and premium retail spaces. Let&apos;s elevate your hydration experience.
          </p>
        </div>

        {/* Form Side */}
        <div data-reveal style={{ 
          opacity: 0, 
          transform: 'translateY(30px)', 
          transition: 'all 0.8s ease',
          background: 'var(--bg-primary)',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-soft)',
        }}
          className="inquiry-card"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="responsive-form-row">
              <input 
                type="text" 
                placeholder="Name / Company" 
                style={inputStyle}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent-blue)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--silver)')}
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                style={inputStyle}
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent-blue)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'var(--silver)')}
              />
            </div>
            <input 
              type="text" 
              placeholder="Estimated Quantity (Optional)" 
              style={inputStyle}
              value={formData.quantity}
              onChange={e => setFormData({ ...formData, quantity: e.target.value })}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent-blue)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--silver)')}
            />
            
            <a 
              href="#"
              onClick={handleWhatsAppClick}
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              <span>Continue on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .responsive-grid-inquiry { grid-template-columns: 1fr !important; gap: 40px !important; }
          .responsive-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

