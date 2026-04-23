'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import BackButton from '@/components/common/BackButton';
import { useGame } from '../context/GameContext';

const DISTRACTORS = ['🍎', '🐸', '🌺', '🍕', '🎈', '🦋', '🐶', '🌈'];

interface Distractor {
  id: number;
  emoji: string;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export default function FocusGame() {
  const { addScore, showReward } = useGame();
  const [focusScore, setFocusScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetPos, setTargetPos] = useState({ left: 40, top: 40 });
  const [distractors, setDistr] = useState<Distractor[]>([]);
  const [ended, setEnded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreRef = useRef(0);

  const moveTarget = useCallback(() => {
    setTargetPos({ left: Math.random() * 80, top: Math.random() * 80 });
  }, []);

  const handleHit = useCallback(() => {
    scoreRef.current += 1;
    setFocusScore(scoreRef.current);
    addScore(1);
    moveTarget();
  }, [addScore, moveTarget]);

  const handleDistractorClick = useCallback(() => {
    scoreRef.current = Math.max(0, scoreRef.current - 1);
    setFocusScore(scoreRef.current);
  }, []);

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setEnded(true);
    const s = scoreRef.current;
    const stars = s >= 15 ? '🌟🌟🌟' : s >= 8 ? '🌟🌟' : '🌟';
    const msg =
      s >= 15 ? 'Fokus luar biasa! Kamu juara!' : s >= 8 ? 'Bagus sekali! Terus latihan ya!' : 'Coba lagi, kamu pasti bisa!';
    showReward(stars, `Waktu Habis! Skor: ${s}`, msg);
  }, [showReward]);

  // Spawn distractors
  useEffect(() => {
    const list: Distractor[] = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      emoji: DISTRACTORS[Math.floor(Math.random() * DISTRACTORS.length)],
      left: 10 + Math.random() * 80,
      top: 10 + Math.random() * 70,
      duration: 2 + Math.random() * 2,
      delay: Math.random(),
    }));
    setDistr(list);
  }, []);

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { endGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [endGame]);

  return (
    <div>
      <BackButton section="attention" />
      <div className="font-fredoka text-xl" style={{ color: '#FFD60A' }}>🎯 Klik Bintang!</div>
      <div className="text-sm text-muted font-semibold mb-3">Klik hanya pada bintang ⭐, jangan klik yang lain!</div>

      <div className="flex gap-4 items-center justify-center mb-3">
        <div className="font-fredoka text-xl" style={{ color: '#FFD60A' }}>Skor: {focusScore}</div>
        <div className="font-fredoka text-xl" style={{ color: '#FF6B35' }}>⏱️ {timeLeft}s</div>
      </div>

      <div
        className="relative overflow-hidden rounded-2xl"
        style={{ height: 220, background: '#0a0520' }}
      >
        {/* Target star */}
        {!ended && (
          <div
            onClick={handleHit}
            className="absolute text-4xl cursor-pointer transition-all duration-200 select-none"
            style={{ left: `${targetPos.left}%`, top: `${targetPos.top}%` }}
          >
            ⭐
          </div>
        )}

        {/* Distractors */}
        {distractors.map((d) => (
          <div
            key={d.id}
            onClick={handleDistractorClick}
            className="absolute text-3xl cursor-pointer select-none"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              animation: `float ${d.duration}s ease-in-out infinite`,
              animationDelay: `${d.delay}s`,
            }}
          >
            {d.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
