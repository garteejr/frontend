'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { GameId, RewardData, SectionId } from '../types';

interface GameContextValue {
  score: number;
  addScore: (pts: number) => void;
  currentSection: SectionId;
  setCurrentSection: (id: SectionId) => void;
  currentGame: GameId;
  setCurrentGame: (id: GameId) => void;
  rewardData: RewardData | null;
  showReward: (stars: string, title: string, message: string) => void;
  closeReward: () => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(20);
  const [currentSection, setCurrentSection] = useState<SectionId>('home');
  const [currentGame, setCurrentGame] = useState<GameId>(null);
  const [rewardData, setRewardData] = useState<RewardData | null>(null);

  const addScore = useCallback((pts: number) => {
    setScore((s) => s + pts);
  }, []);

  const showReward = useCallback(
    (stars: string, title: string, message: string) => {
      setRewardData({ stars, title, message });
      addScore(10);
      spawnConfetti();
    },
    [addScore],
  );

  const closeReward = useCallback(() => setRewardData(null), []);

  const handleSetSection = useCallback((id: SectionId) => {
    setCurrentSection(id);
    setCurrentGame(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        score,
        addScore,
        currentSection,
        setCurrentSection: handleSetSection,
        currentGame,
        setCurrentGame,
        rewardData,
        showReward,
        closeReward,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

// Confetti helper (runs in browser only)
function spawnConfetti() {
  if (typeof window === 'undefined') return;
  const colors = ['#FFD60A', '#FF6B35', '#FF4D8F', '#7C3AED', '#3B82F6', '#22C55E'];
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left:${Math.random() * 100}vw;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      animation: confettiFall ${1.5 + Math.random() * 2}s linear forwards;
      animation-delay:${Math.random() * 0.5}s;
      transform:rotate(${Math.random() * 360}deg);
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}
