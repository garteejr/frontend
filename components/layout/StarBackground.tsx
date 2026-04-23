'use client';

import { useEffect, useRef } from 'react';

export default function StarBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 60; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 3 + 1;
      star.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:#fff;
        width:${size}px;
        height:${size}px;
        top:${Math.random() * 100}%;
        left:${Math.random() * 100}%;
        animation: twinkle ${1.5 + Math.random() * 2}s infinite alternate;
        animation-delay:${Math.random() * 3}s;
      `;
      container.appendChild(star);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
