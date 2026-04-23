'use client';

import { useGame } from '../context/GameContext';
import GameCard from '@/components/common/GameCard';
import FocusGame from '@/components/games/FocusGame';
import MemoryGame from '@/components/games/MemoryGame';

export default function AttentionSection() {
  const { currentGame, setCurrentGame } = useGame();

  if (currentGame === 'focus')  return <div className="bg-card rounded-3xl p-5 min-h-[340px]"><FocusGame /></div>;
  if (currentGame === 'memory') return <div className="bg-card rounded-3xl p-5 min-h-[340px]"><MemoryGame /></div>;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="text-center mb-4">
        <div className="font-fredoka text-2xl mb-1" style={{ color: '#FFD60A' }}>🎯 Latihan Perhatian</div>
        <div className="text-sm text-muted font-semibold">Klik benda yang diminta! Jangan terkecoh ya!</div>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        <GameCard
          icon="🎯"
          title="Klik Target!"
          description="Klik bintang yang muncul, jangan klik yang lain!"
          accentColor="#FFD60A"
          onClick={() => setCurrentGame('focus')}
        />
        <GameCard
          icon="🃏"
          title="Kartu Memori"
          description="Cari pasangan kartu yang sama! Ingat posisinya!"
          accentColor="#FF6B35"
          onClick={() => setCurrentGame('memory')}
        />
      </div>
    </div>
  );
}
