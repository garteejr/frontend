'use client';

import { useGame } from '../context/GameContext';
import GameCard from '@/components/common/GameCard';
import DrawGame from '@/components/games/DrawGame';

export default function MotorSection() {
  const { currentGame, setCurrentGame } = useGame();

  if (currentGame === 'draw') return <div className="bg-card rounded-3xl p-5 min-h-[340px]"><DrawGame /></div>;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="text-center mb-4">
        <div className="font-fredoka text-2xl mb-1" style={{ color: '#FF6B35' }}>✋ Motorik</div>
        <div className="text-sm text-muted font-semibold">Latih koordinasi tangan dan mata!</div>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        <GameCard
          icon="🎨"
          title="Menggambar Bebas"
          description="Gambar apa saja yang kamu suka!"
          accentColor="#FF6B35"
          onClick={() => setCurrentGame('draw')}
        />
      </div>
    </div>
  );
}
