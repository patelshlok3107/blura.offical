'use client';
import { useEffect, useState } from 'react';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      className="floating-whatsapp"
      href="https://wa.me/917990394138?text=Hi,%20I%E2%80%99m%20interested%20in%20ordering%20bl%C3%BCra%20mineral%20water%20in%20bulk.%20Please%20share%20details."
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => fetch('/api/inquiry', { method: 'POST', body: JSON.stringify({ source: 'Floating Widget' }) })}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'var(--dark-blue)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 10px 40px rgba(28, 53, 87, 0.3)',
        zIndex: 999,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        textDecoration: 'none',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px) scale(1.05)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 15px 50px rgba(28, 53, 87, 0.4)';
        (e.currentTarget as HTMLElement).style.background = 'var(--accent-blue)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 40px rgba(28, 53, 87, 0.3)';
        (e.currentTarget as HTMLElement).style.background = 'var(--dark-blue)';
      }}
      aria-label="Contact on WhatsApp"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </a>
  );
}

