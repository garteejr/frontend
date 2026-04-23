'use client';

import { useGame } from '../context/GameContext';
import GameCard from '@/components/common/GameCard';
import VocabGame from '@/components/games/VocabGame';
import StoryGame from '@/components/games/StoryGame';

export default function LanguageSection() {
  const { currentGame, setCurrentGame } = useGame();

  if (currentGame === 'vocab') return <div className="bg-card rounded-3xl p-5 min-h-[340px]"><VocabGame /></div>;
  if (currentGame === 'story') return <div className="bg-card rounded-3xl p-5 min-h-[340px]"><StoryGame /></div>;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="text-center mb-4">
        <div className="font-fredoka text-2xl mb-1" style={{ color: '#22C55E' }}>💬 Bahasa &amp; Komunikasi</div>
        <div className="text-sm text-muted font-semibold">Belajar kata-kata &amp; cara bicara dengan teman!</div>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        <GameCard
          icon="🔤"
          title="Kosakata"
          description="Tebak nama benda dari gambar!"
          accentColor="#22C55E"
          onClick={() => setCurrentGame('vocab')}
        />
        <GameCard
          icon="📖"
          title="Cerita Interaktif"
          description="Buat pilihan dalam cerita & belajar berkomunikasi!"
          accentColor="#14B8A6"
          onClick={() => setCurrentGame('story')}
        />
      </div>
    </div>
  );
}
