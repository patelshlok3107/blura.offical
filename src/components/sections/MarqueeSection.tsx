'use client';

export default function MarqueeSection() {
  const words1 = [
    "PURE NATURAL MINERAL WATER",
    "✧",
    "FROM THE HIMALAYAN FOOTHILLS",
    "✧",
    "PERFECT ELECTROLYTE BALANCE",
    "✧",
    "NATURALLY ALKALINE",
    "✧"
  ];

  const words2 = [
    "BORN IN NATURE",
    "✧",
    "INFINITELY RECYCLABLE",
    "✧",
    "UNCOMPROMISING PURITY",
    "✧",
    "THE ESSENCE OF LIFE",
    "✧"
  ];

  const TextBlock = ({ words }: { words: string[] }) => (
    <div style={{ display: 'flex', alignItems: 'center', paddingRight: '40px' }}>
      {words.map((word, idx) => (
        <span key={idx} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(50px, 8vw, 100px)',
          fontWeight: '300',
          color: word === '✧' ? 'var(--accent-blue)' : 'transparent',
          WebkitTextStroke: word === '✧' ? '0' : '1px rgba(47, 91, 140, 0.25)',
          marginRight: '40px',
          whiteSpace: 'nowrap',
          letterSpacing: '0.05em',
        }}>
          {word}
        </span>
      ))}
    </div>
  );

  return (
    <section style={{
      padding: '80px 0',
      background: 'var(--bg-primary)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      position: 'relative',
    }}>
      {/* Subtle center gradient line */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(47, 91, 140, 0.2), transparent)',
        zIndex: 1,
      }} />

      {/* Scroll Left */}
      <div style={{ display: 'flex', whiteSpace: 'nowrap', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', animation: 'marqueeLeft 40s linear infinite' }}>
          <TextBlock words={words1} />
          <TextBlock words={words1} />
          <TextBlock words={words1} />
          <TextBlock words={words1} />
        </div>
      </div>

      {/* Scroll Right */}
      <div style={{ display: 'flex', whiteSpace: 'nowrap', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', animation: 'marqueeRight 45s linear infinite' }}>
          <TextBlock words={words2} />
          <TextBlock words={words2} />
          <TextBlock words={words2} />
          <TextBlock words={words2} />
        </div>
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
