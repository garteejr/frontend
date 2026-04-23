'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GameProps } from '../types';
import { MOTOR_POSITIONS, FLASH_POSITIONS, MOTOR_CONFIG } from '../data/motoric';
import ProgressBar from '@/components/ProgressBar';

export default function MotoricGame({ level, onComplete }: GameProps) {
  if (level < 3) return <SequentialTap level={level} onComplete={onComplete} />;
  return <FlashTap onComplete={onComplete} />;
}

/* ── Level 1 & 2: Sequential number tap ─────────────────────── */
function SequentialTap({ level, onComplete }: GameProps) {
  const cfg = level === 1 ? MOTOR_CONFIG.L1 : MOTOR_CONFIG.L2;
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [nextTarget, setNextTarget] = useState(1);

  const posOffset = level === 2 ? 3 : 0;
  const positions = MOTOR_POSITIONS[round + posOffset] ?? MOTOR_POSITIONS[0];

  function handleTap(n: number) {
    if (n !== nextTarget) return;
    const newNext = nextTarget + 1;

    if (newNext > cfg.targets) {
      // Round complete
      const newScore = score + 1;
      setScore(newScore);
      const newRound = round + 1;
      if (newRound >= cfg.rounds) {
        onComplete(newScore, cfg.rounds);
      } else {
        setRound(newRound);
        setNextTarget(1);
      }
    } else {
      setNextTarget(newNext);
    }
  }

  return (
    <div>
      <ProgressBar current={round} total={cfg.rounds} color="#F59E0B" />
      <p className="text-xs text-gray-400 mt-3 mb-1">
        Ronde {round + 1} dari {cfg.rounds}
      </p>
      <p className="text-base font-medium text-gray-800 mb-1">
        Ketuk angka {nextTarget} sampai {cfg.targets}!
      </p>
      <p className="text-xs text-gray-400 mb-3">Ketuk secara berurutan 1 → {cfg.targets}</p>

      <div
        className="relative rounded-xl overflow-hidden border border-gray-100"
        style={{ height: 250, backgroundColor: '#F9FAFB' }}
      >
        {Array.from({ length: cfg.targets }, (_, idx) => {
          const n = idx + 1;
          const pos = positions[idx] ?? { x: 50 + idx * 40, y: 80 };
          const isNext = n === nextTarget;
          const isHit = n < nextTarget;

          return (
            <button
              key={n}
              onClick={() => handleTap(n)}
              className="absolute w-13 h-13 rounded-full border-[3px] flex items-center justify-center text-lg font-bold transition-all duration-200"
              style={{
                left: pos.x,
                top: pos.y,
                width: 52,
                height: 52,
                borderColor: isNext ? '#F59E0B' : isHit ? '#16A34A' : '#D1D5DB',
                backgroundColor: isNext ? '#FFFBEB' : isHit ? '#DCFCE7' : 'white',
                color: isNext ? '#92400E' : isHit ? '#14532D' : '#9CA3AF',
                opacity: isHit ? 0 : 1,
                cursor: isNext ? 'pointer' : 'default',
                transform: isNext ? 'scale(1)' : 'scale(1)',
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Level 3: Flash tap ─────────────────────────────────────── */
function FlashTap({ onComplete }: { onComplete: (s: number, t: number) => void }) {
  const { totalFlashes, flashDuration, gapDuration } = MOTOR_CONFIG.L3;
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [flashPos, setFlashPos] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hitsRef = useRef(0);
  const missesRef = useRef(0);
  const scoreRef = useRef(0);
  const doneRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  };

  const showNext = useCallback(() => {
    const total = hitsRef.current + missesRef.current;
    if (total >= totalFlashes || doneRef.current) return;

    const posIdx = Math.floor(Math.random() * FLASH_POSITIONS.length);
    setFlashPos(posIdx);

    timerRef.current = setTimeout(() => {
      // Missed
      missesRef.current += 1;
      setMisses(missesRef.current);
      setFlashPos(null);
      const newTotal = hitsRef.current + missesRef.current;
      if (newTotal >= totalFlashes) {
        doneRef.current = true;
        setTimeout(() => onComplete(scoreRef.current, totalFlashes), 400);
        return;
      }
      timerRef.current = setTimeout(showNext, 400);
    }, flashDuration);
  }, [flashDuration, totalFlashes, onComplete]);

  useEffect(() => {
    const t = setTimeout(showNext, 500);
    return () => { clearTimeout(t); clearTimer(); doneRef.current = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleHit() {
    clearTimer();
    hitsRef.current += 1;
    scoreRef.current += 1;
    setHits(hitsRef.current);
    setScore(scoreRef.current);
    setFlashPos(null);

    const total = hitsRef.current + missesRef.current;
    if (total >= totalFlashes) {
      doneRef.current = true;
      onComplete(scoreRef.current, totalFlashes);
      return;
    }
    timerRef.current = setTimeout(showNext, gapDuration);
  }

  const done = hits + misses;

  return (
    <div>
      <ProgressBar current={done} total={totalFlashes} color="#F59E0B" />
      <p className="text-xs text-gray-400 mt-3 mb-1">
        Sudah ditap: {done} dari {totalFlashes}
      </p>
      <p className="text-base font-medium text-gray-800 mb-1">
        Ketuk lingkaran sebelum menghilang!
      </p>
      <p className="text-xs text-gray-400 mb-3">
        Ketuk: {hits} | Terlewat: {misses}
      </p>

      <div
        className="relative rounded-xl overflow-hidden border border-gray-100"
        style={{ height: 250, backgroundColor: '#F9FAFB' }}
      >
        {flashPos !== null ? (
          <button
            onClick={handleHit}
            className="absolute w-[52px] h-[52px] rounded-full border-[3px] flex items-center justify-center text-2xl font-bold cursor-pointer transition-all duration-200 hover:scale-110"
            style={{
              left: FLASH_POSITIONS[flashPos % FLASH_POSITIONS.length].x,
              top:  FLASH_POSITIONS[flashPos % FLASH_POSITIONS.length].y,
              borderColor: '#EF4444',
              backgroundColor: '#FEE2E2',
              color: '#7F1D1D',
            }}
          >
            ★
          </button>
        ) : (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-400">
            Bersiap...
          </p>
        )}
      </div>
    </div>
  );
}
