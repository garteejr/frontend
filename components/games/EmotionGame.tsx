'use client';

import { useCallback, useState } from 'react';
import BackButton from '@/components/common/BackButton';
import ResultMessage from '@/components/common/ResultMessage';
import { useGame } from '../context/GameContext';
import { emotionQuestions, emotions } from '../data/emotions';

export default function EmotionGame() {
  const { addScore, showReward } = useGame();
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<{ msg: string; type: 'correct' | 'wrong' } | null>(null);

  const q = emotionQuestions[idx];

  const selectEmotion = useCallback(
    (name: string) => {
      if (answered) return;
      setAnswered(true);
      setSelected(name);
      if (name === q.answer) {
        setResult({ msg: `✅ Benar! Perasaan "${name}" itu benar! Kamu pandai mengenali emosi! +5 XP`, type: 'correct' });
        addScore(5);
      } else {
        setResult({ msg: `❌ Jawaban yang tepat adalah "${q.answer}". Yuk belajar lagi!`, type: 'wrong' });
      }
    },
    [answered, q, addScore],
  );

  const next = useCallback(() => {
    const nextIdx = (idx + 1) % emotionQuestions.length;
    setIdx(nextIdx);
    setAnswered(false);
    setSelected(null);
    setResult(null);
    if (nextIdx === 0) {
      showReward('🌟🌟🌟', 'Kamu Ahli Emosi!', 'Kamu sangat baik memahami perasaan! 💖');
    }
  }, [idx, showReward]);

  return (
    <div>
      <BackButton section="social" />
      <div className="font-fredoka text-xl" style={{ color: '#FFD60A' }}>😊 Kenali Emosi</div>
      <div className="text-sm text-muted font-semibold mb-3">Pilih nama emosi yang sesuai dengan situasinya!</div>

      {/* Emotion dictionary */}
      <div className="mb-4">
        <div className="text-xs font-bold text-muted mb-2 text-center">🌈 Kamus Emosi</div>
        <div className="flex flex-wrap gap-2.5 justify-center">
          {emotions.map((e) => (
            <button
              key={e.name}
              onClick={() => selectEmotion(e.name)}
              className="rounded-[20px] px-4 py-3 cursor-pointer transition-all duration-300 text-center min-w-[90px] hover:scale-105"
              style={{
                background: selected === e.name ? '#3B2D00' : '#231657',
                border: `3px solid ${selected === e.name ? '#FFD60A' : 'transparent'}`,
              }}
            >
              <span
                className="text-4xl block mb-1"
                style={{ animation: 'emotionBob 2s ease infinite' }}
              >
                {e.emoji}
              </span>
              <div className="text-[11px] font-bold" style={{ color: e.color }}>{e.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="rounded-2xl p-3.5 mb-3" style={{ background: '#2D1B6B' }}>
        <div className="text-5xl text-center mb-2">{q.img}</div>
        <div className="text-sm font-bold text-center" style={{ color: '#E2D9FA' }}>{q.question}</div>
      </div>

      {result && <ResultMessage message={result.msg} type={result.type} />}

      <button
        onClick={next}
        className="block mx-auto mt-2.5 rounded-xl px-3 py-1.5 text-white text-xs font-bold font-nunito cursor-pointer transition-all duration-200"
        style={{ background: '#231657', border: '2px solid #4C1D95' }}
      >
        Pertanyaan Berikutnya ➡️
      </button>
    </div>
  );
}
