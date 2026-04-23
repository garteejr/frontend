'use client';

import { useGame } from '../context/GameContext';

export default function ProgressBar() {
  const { score } = useGame();
  const pct = Math.min(100, score / 5);

  return (
    <div className="bg-card rounded-xl px-4 py-2.5 mb-3 flex items-center gap-3">
      <span className="text-xs text-muted font-bold whitespace-nowrap">⚡ Level Mu</span>

      <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: '#2D1B6B' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #FFD60A, #FF6B35)',
          }}
        />
      </div>

      <span className="font-fredoka text-lg text-brand-yellow whitespace-nowrap">
        🌟 {score} XP
      </span>
    </div>
  );
}
