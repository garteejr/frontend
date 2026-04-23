'use client';

import { useCallback, useState } from 'react';
import BackButton from '@/components/common/BackButton';
import { useGame } from '../context/GameContext';
import { storyData } from '../data/story';

export default function StoryGame() {
  const { addScore, showReward } = useGame();
  const [storyIdx, setStoryIdx] = useState(0);

  const node = storyData[storyIdx];

  const choose = useCallback(
    (next: number) => {
      setStoryIdx(next);
      addScore(3);
    },
    [addScore],
  );

  return (
    <div>
      <BackButton section="language" />
      <div className="font-fredoka text-xl" style={{ color: '#FFD60A' }}>📖 Cerita Interaktif</div>

      <div className="rounded-2xl p-4 mb-3 mt-3" style={{ background: '#231657', border: '2px solid #4C1D95' }}>
        <div className="text-5xl text-center mb-2">{node.scene}</div>
        <p className="text-sm leading-relaxed font-semibold text-center" style={{ color: '#E2D9FA' }}>
          {node.text}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {node.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => choose(choice.next)}
            className="text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200"
            style={{ background: '#2D1B6B', border: '2.5px solid #4C1D95' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3B0764';
              e.currentTarget.style.borderColor = '#7C3AED';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2D1B6B';
              e.currentTarget.style.borderColor = '#4C1D95';
            }}
          >
            {choice.text}
          </button>
        ))}

        {node.choices.length === 0 && (
          <button
            onClick={() =>
              showReward('🌟🌟🌟', 'Cerita Selesai!', 'Kamu belajar cara berteman yang baik!')
            }
            className="rounded-2xl px-7 py-3 font-fredoka text-lg text-white transition-all duration-200 hover:scale-105"
            style={{ background: 'linear-gradient(135deg,#7C3AED,#FF4D8F)', border: 'none' }}
          >
            🎉 Selesai!
          </button>
        )}
      </div>
    </div>
  );
}
