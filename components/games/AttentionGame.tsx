'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { GameProps } from '../types';
import { ATT_L1, ATT_L2, ATT_L3 } from '../data/attention';
import ProgressBar from '@/components/ProgressBar';

export default function AttentionGame({ level, onComplete }: GameProps) {
  return level === 1 ? (
    <OddOneOut onComplete={onComplete} />
  ) : (
    <SimonSays level={level} onComplete={onComplete} />
  );
}

/* ── Level 1: Odd-one-out ──────────────────────────────────── */
function OddOneOut({ onComplete }: { onComplete: (s: number, t: number) => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const total = ATT_L1.length;

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === ATT_L1[qi].odd;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);

    setTimeout(() => {
      const nextQi = qi + 1;
      if (nextQi >= total) {
        onComplete(newScore, total);
      } else {
        setQi(nextQi);
        setSelected(null);
      }
    }, 700);
  }

  const q = ATT_L1[qi];

  return (
    <div>
      <ProgressBar current={qi} total={total} color="#EF4444" />
      <p className="text-xs text-gray-400 mt-3 mb-1">Ronde {qi + 1} dari {total}</p>
      <p className="text-base font-medium text-gray-800 mb-4">Temukan yang BERBEDA!</p>

      <div className="grid grid-cols-3 gap-2 max-w-[220px] mx-auto mb-4">
        {q.grid.map((emoji, i) => {
          const isSelected = selected === i;
          const isCorrect = isSelected && i === q.odd;
          const isWrong = isSelected && i !== q.odd;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="text-3xl p-2.5 rounded-xl border-2 transition-all leading-none"
              style={{
                borderColor: isCorrect ? '#16A34A' : isWrong ? '#DC2626' : 'transparent',
                backgroundColor: isCorrect ? '#DCFCE7' : isWrong ? '#FEE2E2' : '#F9FAFB',
                cursor: selected !== null ? 'default' : 'pointer',
              }}
            >
              {emoji}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <p className={`text-center font-medium ${selected === q.odd ? 'text-green-600' : 'text-red-600'}`}>
          {selected === q.odd ? 'Benar! 🎉' : 'Bukan itu, coba lagi!'}
        </p>
      )}
    </div>
  );
}

/* ── Level 2 & 3: Simon Says ───────────────────────────────── */
function SimonSays({ level, onComplete }: GameProps) {
  const data = level === 2 ? ATT_L2 : ATT_L3;
  const [round, setRound] = useState(0);
  const [phase, setPhase] = useState<'showing' | 'input'>('showing');
  const [shownCount, setShownCount] = useState(0);
  const [input, setInput] = useState<number[]>([]);
  const [flashIdx, setFlashIdx] = useState<number | null>(null);
  const scoreRef = useRef(0);

  const startRound = useCallback(
    (r: number) => {
      const seq = data.seqs[r];
      if (!seq) return;
      setPhase('showing');
      setShownCount(0);
      setInput([]);
      setFlashIdx(null);

      const timers: ReturnType<typeof setTimeout>[] = [];
      let i = 0;

      const showNext = () => {
        if (i >= seq.length) {
          timers.push(setTimeout(() => setPhase('input'), 500));
          return;
        }
        setShownCount(i + 1);
        setFlashIdx(seq[i]);
        timers.push(setTimeout(() => setFlashIdx(null), 400));
        i++;
        timers.push(setTimeout(showNext, 700));
      };

      timers.push(setTimeout(showNext, 300));
      return () => timers.forEach(clearTimeout);
    },
    [data]
  );

  useEffect(() => {
    return startRound(round);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  function handleInput(colorIdx: number) {
    if (phase !== 'input') return;
    const seq = data.seqs[round];
    const expected = seq[input.length];

    if (colorIdx === expected) {
      const newInput = [...input, colorIdx];
      if (newInput.length === seq.length) {
        scoreRef.current += 1;
        const nextRound = round + 1;
        if (nextRound >= data.seqs.length) {
          onComplete(scoreRef.current, data.seqs.length);
        } else {
          setRound(nextRound);
        }
      } else {
        setInput(newInput);
      }
    } else {
      // Wrong tap — restart current round
      setRound((r) => r); // trigger re-effect via startRound dependency trick
      startRound(round);
    }
  }

  const seq = data.seqs[round] ?? [];

  return (
    <div>
      <ProgressBar current={round} total={data.seqs.length} color="#EF4444" />
      <p className="text-xs text-gray-400 mt-3 mb-1">
        Ronde {round + 1} dari {data.seqs.length}
      </p>
      <p className="text-base font-medium text-gray-800 mb-2">
        {phase === 'showing' ? 'Perhatikan urutannya!' : 'Ulangi urutannya!'}
      </p>

      {/* Shown sequence preview */}
      <div className="flex gap-2 flex-wrap mb-3 min-h-[36px]">
        {Array.from({ length: phase === 'showing' ? shownCount : seq.length }, (_, i) => (
          <span
            key={i}
            className="text-2xl leading-none"
            style={{ opacity: phase === 'showing' ? 1 : 0.4 }}
          >
            {data.colors[seq[i]]}
          </span>
        ))}
      </div>

      {/* Color buttons */}
      <div className="flex gap-2 justify-center flex-wrap">
        {data.colors.map((em, ci) => (
          <button
            key={ci}
            onClick={() => handleInput(ci)}
            className="w-16 h-16 rounded-xl border-none text-3xl transition-all duration-150"
            style={{
              backgroundColor: '#F3F4F6',
              opacity: phase === 'input' ? 1 : 0.5,
              cursor: phase === 'input' ? 'pointer' : 'default',
              transform: flashIdx === ci ? 'scale(1.15)' : 'scale(1)',
              filter: flashIdx === ci ? 'brightness(1.3)' : 'none',
            }}
          >
            {em}
          </button>
        ))}
      </div>

      {phase === 'input' && (
        <p className="text-center text-xs text-gray-400 mt-3">
          Sudah dimasukkan: {input.length}/{seq.length}
        </p>
      )}
    </div>
  );
}
