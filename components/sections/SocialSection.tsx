'use client';

import { useGame } from '../context/GameContext';
import GameCard from '@/components/common/GameCard';
import EmotionGame from '@/components/games/EmotionGame';
import BreathingGame from '@/components/games/BreathingGame';

export default function SocialSection() {
  const { currentGame, setCurrentGame } = useGame();

  if (currentGame === 'emotion')   return <div className="bg-card rounded-3xl p-5 min-h-[340px]"><EmotionGame /></div>;
  if (currentGame === 'breathing') return <div className="bg-card rounded-3xl p-5 min-h-[340px]"><BreathingGame /></div>;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="text-center mb-4">
        <div className="font-fredoka text-2xl mb-1" style={{ color: '#FF4D8F' }}>❤️ Sosial &amp; Emosional</div>
        <div className="text-sm text-muted font-semibold">Kenali perasaan dan belajar berteman!</div>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        <GameCard
          icon="😊"
          title="Kenali Emosi"
          description="Tebak perasaan dari ekspresi wajah!"
          accentColor="#FF4D8F"
          onClick={() => setCurrentGame('emotion')}
        />
        <GameCard
          icon="🌬️"
          title="Napas Tenang"
          description="Latihan pernapasan untuk menenangkan diri!"
          accentColor="#7C3AED"
          onClick={() => setCurrentGame('breathing')}
        />
      </div>
    </div>
  );
}
