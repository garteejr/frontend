'use client';

import { useCallback, useState } from 'react';
import BackButton from '@/components/common/BackButton';
import ResultMessage from '@/components/common/ResultMessage';
import { useGame } from '../context/GameContext';
import { sortBins, sortItems } from '../data/sortItems';

interface RemainingItem {
  id: number;
  emoji: string;
  category: string;
}

export default function SortGame() {
  const { addScore, showReward } = useGame();
  const [remaining, setRemaining] = useState<RemainingItem[]>(
    sortItems.map((item, i) => ({ id: i, ...item })),
  );
  const [bins, setBins] = useState<Record<string, string[]>>(
    Object.fromEntries(sortBins.map((b) => [b.id, []])),
  );
  const [dragId, setDragId] = useState<number | null>(null);
  const [result, setResult] = useState<{ msg: string; type: 'correct' | 'wrong' } | null>(null);

  const handleDragStart = (id: number) => setDragId(id);

  const handleDrop = useCallback(
    (binId: string) => {
      if (dragId === null) return;
      const item = remaining.find((r) => r.id === dragId);
      if (!item) return;

      if (item.category === binId) {
        setBins((prev) => ({ ...prev, [binId]: [...prev[binId], item.emoji] }));
        setRemaining((prev) => prev.filter((r) => r.id !== dragId));
        setResult({ msg: '✅ Benar! Bagus sekali!', type: 'correct' });
        addScore(3);
        const newLen = remaining.length - 1;
        if (newLen === 0) {
          showReward('🌟🌟🌟', 'Semua Tersortir!', 'Kamu bisa mengelompokkan dengan sempurna!');
        }
      } else {
        setResult({ msg: '❌ Coba lagi! Itu bukan kelompok yang tepat.', type: 'wrong' });
      }
      setTimeout(() => setResult(null), 1500);
      setDragId(null);
    },
    [dragId, remaining, addScore, showReward],
  );

  return (
    <div>
      <BackButton section="cognitive" />
      <div className="font-fredoka text-xl" style={{ color: '#FFD60A' }}>🗂️ Sortir &amp; Kelompokkan</div>
      <div className="text-sm text-muted font-semibold mb-4">Seret benda ke kelompok yang benar!</div>

      {/* Draggable items */}
      <div className="flex gap-3 flex-wrap justify-center mb-3">
        {remaining.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item.id)}
            className="w-[70px] h-[70px] rounded-2xl flex items-center justify-center text-3xl cursor-grab transition-all duration-300 hover:scale-110 select-none"
            style={{ background: '#231657', border: '3px solid transparent' }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#7C3AED')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Drop bins */}
      <div className="flex gap-2.5 flex-wrap justify-center">
        {sortBins.map((bin) => (
          <div
            key={bin.id}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }}
            onDragLeave={(e) => e.currentTarget.classList.remove('drag-over')}
            onDrop={(e) => { e.currentTarget.classList.remove('drag-over'); handleDrop(bin.id); }}
            className="sort-bin min-w-[100px] min-h-[80px] rounded-2xl flex flex-col items-center justify-center gap-1 p-2"
            style={{ border: '3px dashed #4C1D95', background: '#0a0520' }}
          >
            <div className="text-[11px] font-bold text-muted">{bin.label}</div>
            <div className="flex flex-wrap gap-1 justify-center text-xl">
              {bins[bin.id].map((emoji, i) => (
                <span key={i}>{emoji}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {result && <ResultMessage message={result.msg} type={result.type} />}
    </div>
  );
}
