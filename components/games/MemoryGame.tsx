'use client';

import { useCallback, useEffect, useState } from 'react';
import BackButton from '@/components/common/BackButton';
import { useGame } from '../context/GameContext';

const EMOJIS = ['🦁', '🐘', '🦊', '🐬', '🦋', '🐸', '🌺', '🍕'];

interface CardState {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

function buildCards(): CardState[] {
  return [...EMOJIS, ...EMOJIS]
    .sort(() => Math.random() - 0.5)
    .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
}

export default function MemoryGame() {
  const { addScore, showReward } = useGame();
  const [cards, setCards] = useState<CardState[]>(buildCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [locked, setLocked] = useState(false);
  const [pairs, setPairs] = useState(0);

  const flip = useCallback(
    (id: number) => {
      if (locked) return;
      const card = cards[id];
      if (card.flipped || card.matched) return;

      const newFlipped = [...flipped, id];
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)),
      );

      if (newFlipped.length === 2) {
        setLocked(true);
        const [a, b] = newFlipped;
        if (cards[a].emoji === cards[b].emoji) {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c)),
          );
          const newPairs = pairs + 1;
          setPairs(newPairs);
          addScore(2);
          setFlipped([]);
          setLocked(false);
          if (newPairs === 8) {
            showReward('🌟🌟🌟', 'Semua Pasangan Ketemu!', 'Memorimu sangat kuat! Luar biasa! 🧠');
          }
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === a || c.id === b ? { ...c, flipped: false } : c,
              ),
            );
            setFlipped([]);
            setLocked(false);
          }, 1000);
        }
      } else {
        setFlipped(newFlipped);
      }
    },
    [cards, flipped, locked, pairs, addScore, showReward],
  );

  return (
    <div>
      <BackButton section="attention" />
      <div className="font-fredoka text-xl" style={{ color: '#FFD60A' }}>🃏 Kartu Memori</div>
      <div className="text-sm text-muted font-semibold mb-3">Cari pasangan kartu yang sama! Klik 2 kartu.</div>

      <div className="flex justify-center gap-4 mb-3">
        <span className="font-fredoka text-lg" style={{ color: '#22C55E' }}>
          Pasangan: {pairs}/8
        </span>
      </div>

      <div
        className="grid gap-2 mx-auto"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 400 }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => flip(card.id)}
            className={`mem-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
          >
            {card.flipped || card.matched ? card.emoji : '❓'}
          </div>
        ))}
      </div>
    </div>
  );
}
