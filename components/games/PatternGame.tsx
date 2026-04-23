'use client';

import { useCallback, useEffect, useState } from 'react';
import BackButton from '@/components/common/BackButton';
import ResultMessage from '@/components/common/ResultMessage';
import { useGame } from '../context/GameContext';
import { patterns } from '../data/patterns';

export default function PatternGame() {
  const { addScore, showReward } = useGame();
  const [idx, setIdx] = useState(0);
  const [slotState, setSlotState] = useState<{ value: string; status: 'correct' | 'wrong' | null }>({ value: '?', status: null });
  const [result, setResult] = useState<{ msg: string; type: 'correct' | 'wrong' } | null>(null);

  const pat = patterns[idx];

  const check = useCallback(
    (choice: string) => {
      if (slotState.status !== null) return;
      if (choice === pat.ans) {
        setSlotState({ value: choice, status: 'correct' });
        setResult({ msg: '✅ Benar! Kamu sangat cerdas! +5 XP', type: 'correct' });
        addScore(5);
      } else {
        setSlotState({ value: choice, status: 'wrong' });
        setResult({ msg: `❌ Jawabannya adalah ${pat.ans}. Yuk coba lagi!`, type: 'wrong' });
      }
      setTimeout(() => {
        const nextIdx = (idx + 1) % patterns.length;
        setIdx(nextIdx);
        setSlotState({ value: '?', status: null });
        setResult(null);
        if (nextIdx === 0) {
          showReward('🌟🌟🌟', 'Semua Pola Selesai!', 'Otakmu sangat tajam! Hebat! 🧠');
        }
      }, 2000);
    },
    [slotState, pat, idx, addScore, showReward],
  );

  return (
    <div>
      <BackButton section="cognitive" />
      <div className="font-fredoka text-xl" style={{ color: '#FFD60A' }}>🔢 Pola &amp; Urutan</div>
      <div className="text-sm text-muted font-semibold mb-4">
        Soal {idx + 1}/{patterns.length} — Isi yang hilang!
      </div>

      {/* Pattern row */}
      <div className="flex gap-2 items-center justify-center flex-wrap mb-2">
        {pat.seq.map((item, i) =>
          item === '?' ? (
            <div
              key={i}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-extrabold transition-all ${
                slotState.status === 'correct'
                  ? 'answer-slot-correct'
                  : slotState.status === 'wrong'
                  ? 'answer-slot-wrong'
                  : ''
              }`}
              style={
                slotState.status === null
                  ? { background: '#0a0520', border: '3px dashed #4C1D95', color: '#A78BFA', fontSize: 14 }
                  : { fontSize: 26 }
              }
            >
              {slotState.value}
            </div>
          ) : (
            <div
              key={i}
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: '#231657', border: '3px solid transparent' }}
            >
              {item}
            </div>
          ),
        )}
      </div>

      <p className="text-center text-xs text-muted font-bold mb-3">Pilih jawabannya:</p>

      {/* Choices */}
      <div className="flex gap-2 flex-wrap justify-center">
        {pat.choices.map((c) => (
          <div
            key={c}
            onClick={() => check(c)}
            className="w-[54px] h-[54px] rounded-xl flex items-center justify-center text-2xl cursor-pointer transition-all duration-200 hover:scale-110"
            style={{ background: '#231657', border: '3px solid #4C1D95' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FFD60A')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#4C1D95')}
          >
            {c}
          </div>
        ))}
      </div>

      {result && <ResultMessage message={result.msg} type={result.type} />}
    </div>
  );
}
