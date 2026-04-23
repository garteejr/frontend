'use client';

import { useGame } from '../context/GameContext';
import GameCard from '@/components/common/GameCard';
import PatternGame from '@/components/games/PatternGame';
import SortGame from '@/components/games/SortGame';

export default function CognitiveSection() {
  const { currentGame, setCurrentGame } = useGame();

  if (currentGame === 'pattern') return <div className="bg-card rounded-3xl p-5 min-h-[340px]"><PatternGame /></div>;
  if (currentGame === 'sort')    return <div className="bg-card rounded-3xl p-5 min-h-[340px]"><SortGame /></div>;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="text-center mb-4">
        <div className="font-fredoka text-2xl mb-1" style={{ color: '#3B82F6' }}>🧠 Kognitif</div>
        <div className="text-sm text-muted font-semibold">Asah otak dengan puzzle dan pola yang seru!</div>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        <GameCard
          icon="🔢"
          title="Pola & Urutan"
          description="Lengkapi pola yang hilang!"
          accentColor="#3B82F6"
          onClick={() => setCurrentGame('pattern')}
        />
        <GameCard
          icon="🗂️"
          title="Sortir & Kelompokkan"
          description="Kelompokkan benda sesuai kategorinya!"
          accentColor="#7C3AED"
          onClick={() => setCurrentGame('sort')}
        />
      </div>
    </div>
  );
}
