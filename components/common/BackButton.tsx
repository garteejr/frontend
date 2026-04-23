'use client';

import { useGame } from '../context/GameContext';
import type { SectionId } from '../types';

interface BackButtonProps {
  section: SectionId;
  label?: string;
}

export default function BackButton({ section, label = 'Kembali' }: BackButtonProps) {
  const { setCurrentSection } = useGame();

  return (
    <button
      onClick={() => setCurrentSection(section)}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold font-nunito text-muted transition-all duration-200 mb-3 hover:text-white"
      style={{ background: '#231657', border: '2px solid #4C1D95' }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#7C3AED')}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#4C1D95')}
    >
      ← {label}
    </button>
  );
}
