'use client';

import { useGame } from '../context/GameContext';
import type { SectionId } from '../types';

const navItems: { id: SectionId; icon: string; label: string; color: string; border: string }[] = [
  { id: 'home',      icon: '🏠', label: 'Beranda', color: '#FFD60A', border: '#FFD60A' },
  { id: 'attention', icon: '🎯', label: 'Fokus',   color: '#FFD60A', border: '#FFD60A' },
  { id: 'language',  icon: '💬', label: 'Bahasa',  color: '#22C55E', border: '#22C55E' },
  { id: 'cognitive', icon: '🧠', label: 'Kognitif',color: '#3B82F6', border: '#3B82F6' },
  { id: 'motor',     icon: '✋', label: 'Motorik', color: '#FF6B35', border: '#FF6B35' },
  { id: 'social',    icon: '❤️', label: 'Sosial',  color: '#FF4D8F', border: '#FF4D8F' },
];

export default function Navigation() {
  const { currentSection, setCurrentSection } = useGame();

  return (
    <nav className="flex flex-wrap gap-2 justify-center my-4">
      {navItems.map((item) => {
        const isActive = currentSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentSection(item.id)}
            className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-2xl font-nunito font-extrabold text-xs min-w-[70px] transition-all duration-200 relative overflow-hidden"
            style={{
              background: isActive ? 'rgba(255,255,255,0.08)' : '#1A1040',
              border: `2.5px solid ${item.border}`,
              color: item.color,
              transform: isActive ? 'translateY(-3px) scale(1.05)' : undefined,
              boxShadow: isActive ? `0 0 20px ${item.color}66` : undefined,
            }}
          >
            <span className="text-[22px]">{item.icon}</span>
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
