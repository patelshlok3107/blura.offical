'use client';

const TextBlock = () => {
  const words = [
    "blüra life", "✧",
    "blüra life", "✧",
    "blüra life", "✧",
    "blüra life", "✧"
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', paddingRight: '40px' }}>
      {words.map((word, idx) => (
        <span key={idx} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(40px, 6vw, 80px)',
          fontWeight: '300',
          color: word === '✧' ? 'var(--accent-blue)' : 'var(--dark-blue)',
          marginRight: '40px',
          whiteSpace: 'nowrap',
          letterSpacing: '0.02em',
        }}>
          {word}
        </span>
      ))}
    </div>
  );
};

export default function MarqueeSection() {

  return (
    <section style={{
      padding: '60px 0',
      background: 'var(--bg-primary)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Scroll Left */}
      <div style={{ display: 'flex', whiteSpace: 'nowrap', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', animation: 'marqueeLeft 30s linear infinite' }}>
          <TextBlock />
          <TextBlock />
          <TextBlock />
          <TextBlock />
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
