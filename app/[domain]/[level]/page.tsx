'use client';
import { useState, useCallback, use } from 'react';
import { notFound } from 'next/navigation';
import { Domain, Level } from '@/components/types';
import { DOMAINS } from '@/app/lib/constants';
import GameLayout from '@/components/GameLayout';
import GameResult from '@/components/GameResult';
import AttentionGame    from '@/components/games/AttentionGame';
import CommunicationGame from '@/components/games/CommunicationGame';
import SensoryGame      from '@/components/games/SensoryGame';
import MotoricGame      from '@/components/games/MotoricGame';
import SocialGame       from '@/components/games/SocialGame';

const VALID_DOMAINS: Domain[] = ['attention', 'communication', 'sensory', 'motoric', 'social'];
const LEVEL_MAP: Record<string, Level> = { level1: 1, level2: 2, level3: 3 };

interface PageProps {
  params: Promise<{ domain: string; level: string }>;
}

export default function GamePage({ params }: PageProps) {
  const { domain: domainParam, level: levelParam } = use(params);

  // Validate params
  const domain = VALID_DOMAINS.find((d) => d === domainParam) as Domain | undefined;
  const level = LEVEL_MAP[levelParam] as Level | undefined;
  if (!domain || !level) notFound();

  const sec = DOMAINS.find((d) => d.key === domain)!;

  // Game state: 'playing' | 'result'
  const [gameState, setGameState] = useState<'playing' | 'result'>('playing');
  const [result, setResult] = useState({ score: 0, total: 0 });
  const [score, setScore] = useState(0);
  const [gameKey, setGameKey] = useState(0); // remount game on replay

  const handleComplete = useCallback(
    (finalScore: number, total: number) => {
      setResult({ score: finalScore, total });
      setScore(finalScore);

      // Persist to localStorage
      try {
        const saved = JSON.parse(localStorage.getItem('my-app') ?? '{}');
        const pct = finalScore / total;
        const stars = pct >= 0.8 ? 3 : pct >= 0.5 ? 2 : 1;
        const key = `${domain}_${level}`;
        saved[key] = Math.max(stars, saved[key] ?? 0);
        localStorage.setItem('my-app', JSON.stringify(saved));
      } catch {}

      setGameState('result');
    },
    [domain, level]
  );

  function handleReplay() {
    setGameState('playing');
    setScore(0);
    setGameKey((k) => k + 1); // force remount of game component
  }

  const GameComponent = GAME_MAP[domain];

  return (
    <>
      {gameState === 'playing' ? (
        <GameLayout domain={domain} level={level} score={score}>
          <GameComponent key={gameKey} level={level} onComplete={handleComplete} />
        </GameLayout>
      ) : (
        <div className="max-w-xl mx-auto px-4 py-6">
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5"
            style={{ borderTopWidth: 3, borderTopColor: sec.color }}
          >
            <GameResult
              domain={domain}
              level={level}
              score={result.score}
              total={result.total}
              onReplay={handleReplay}
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ── Domain → component map ─────────────────────────────────── */
const GAME_MAP: Record<Domain, React.ComponentType<{ level: Level; onComplete: (s: number, t: number) => void }>> = {
  attention:     AttentionGame,
  communication: CommunicationGame,
  sensory:       SensoryGame,
  motoric:       MotoricGame,
  social:        SocialGame,
};
