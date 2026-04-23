'use client';

import { useGame } from '../context/GameContext';
import type { SectionId } from '../types';

const categories: {
  id: SectionId;
  icon: string;
  name: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}[] = [
  { id: 'attention', icon: '🎯', name: 'Perhatian', desc: 'Latih fokus & konsentrasi dengan permainan seru',  color: '#FFD60A', bg: 'linear-gradient(135deg,#1A1040,#3B2D00)', border: '#FFD60A' },
  { id: 'language',  icon: '💬', name: 'Bahasa',    desc: 'Belajar bicara & komunikasi dengan teman',          color: '#22C55E', bg: 'linear-gradient(135deg,#1A1040,#064416)', border: '#22C55E' },
  { id: 'cognitive', icon: '🧩', name: 'Kognitif',  desc: 'Asah pikiran dengan puzzle & pola',                 color: '#3B82F6', bg: 'linear-gradient(135deg,#1A1040,#0c2a6e)', border: '#3B82F6' },
  { id: 'motor',     icon: '✋', name: 'Motorik',   desc: 'Latih gerakan tangan dengan menggambar',            color: '#FF6B35', bg: 'linear-gradient(135deg,#1A1040,#6b2000)', border: '#FF6B35' },
  { id: 'social',    icon: '💖', name: 'Sosial',    desc: 'Pahami perasaan & berteman dengan baik',            color: '#FF4D8F', bg: 'linear-gradient(135deg,#1A1040,#6b0030)', border: '#FF4D8F' },
];

export default function HomeSection() {
  const { setCurrentSection } = useGame();

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="text-center py-5">
        <span
          className="text-6xl block"
          style={{ animation: 'heroFloat 3s ease-in-out infinite' }}
        >
          🚀
        </span>
        <div className="font-fredoka text-3xl welcome-gradient my-2">
          Selamat Datang, Pejuang Hebat!
        </div>
        <p className="text-sm text-muted font-semibold max-w-sm mx-auto leading-relaxed">
          Belajar itu menyenangkan! Pilih kategori pelajaran favoritmu dan mulai petualangan belajar hari ini 🎉
        </p>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setCurrentSection(cat.id)}
            className="rounded-[20px] p-4 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
            style={{ background: cat.bg, border: `3px solid ${cat.border}` }}
          >
            <span className="text-[44px] block mb-2">{cat.icon}</span>
            <div className="font-fredoka text-base mb-1" style={{ color: cat.color }}>{cat.name}</div>
            <div className="text-[11px] text-muted leading-tight">{cat.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
