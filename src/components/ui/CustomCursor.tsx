'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = 0, mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.setProperty('--x', `${mouseX - 12}px`);
      dot.style.setProperty('--y', `${mouseY - 0}px`);
    };

    const onEnterLink = () => {
      dot.classList.add('cursor-hover');
    };

    const onLeaveLink = () => {
      dot.classList.remove('cursor-hover');
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div ref={dotRef} className="custom-cursor" />
  );
}
