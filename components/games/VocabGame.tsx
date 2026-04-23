'use client';

import { useCallback, useEffect, useState } from 'react';
import BackButton from '@/components/common/BackButton';
import ResultMessage from '@/components/common/ResultMessage';
import { useGame } from '../context/GameContext';
import { vocabData } from '../data/vocab';

export default function VocabGame() {
  const { addScore } = useGame();
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [result, setResult] = useState<{ msg: string; type: 'correct' | 'wrong' } | null>(null);

  const item = vocabData[idx];

  const check = useCallback(
    (optIdx: number) => {
      if (answered) return;
      setAnswered(true);
      setSelected(optIdx);
      if (optIdx === item.answerIndex) {
        setResult({ msg: '✅ Benar! Kamu pintar sekali! +5 XP', type: 'correct' });
        addScore(5);
      } else {
        setResult({ msg: `❌ Jawabannya adalah ${item.options[item.answerIndex]}. Coba lagi ya!`, type: 'wrong' });
      }
      setTimeout(() => {
        setIdx((i) => (i + 1) % vocabData.length);
        setAnswered(false);
        setSelected(null);
        setResult(null);
      }, 2000);
    },
    [answered, item, addScore],
  );

  return (
    <div>
      <BackButton section="language" />
      <div className="font-fredoka text-xl" style={{ color: '#FFD60A' }}>🔤 Tebak Kosakata</div>
      <div className="text-sm text-muted font-semibold mb-3">
        Soal {idx + 1} dari {vocabData.length}
      </div>

      <div
        className="text-6xl text-center mb-2"
        style={{ animation: 'questionBounce 1s ease-out' }}
      >
        {item.img}
      </div>

      <div className="text-base font-bold text-center mb-4 px-3 py-3 rounded-2xl" style={{ background: '#2D1B6B' }}>
        {item.question}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {item.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => check(i)}
            className={`quiz-opt ${
              answered && i === item.answerIndex ? 'correct' : ''
            } ${answered && selected === i && i !== item.answerIndex ? 'wrong' : ''}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {result && <ResultMessage message={result.msg} type={result.type} />}
    </div>
  );
}
