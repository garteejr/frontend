'use client';
import { useState } from 'react';
import { GameProps } from '../types';
import { SENS_L1, SENS_L2, SENS_L3 } from '../data/sensory';
import ProgressBar from '@/components/ProgressBar';

export default function SensoryGame({ level, onComplete }: GameProps) {
  if (level === 2) return <NumberSequence onComplete={onComplete} />;
  return <PatternSequence level={level} onComplete={onComplete} />;
}

/* ── Level 1 & 3: Emoji pattern ─────────────────────────────── */
function PatternSequence({ level, onComplete }: GameProps) {
  const data = level === 1 ? SENS_L1 : SENS_L3;
  const color = '#10B981';
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'q' | 'fb'>('q');
  const total = data.length;

  function handlePick(opt: string) {
    if (phase !== 'q') return;
    const q = data[qi];
    const correct = opt === q.next;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setPhase('fb');

    setTimeout(() => {
      const next = qi + 1;
      if (next >= total) onComplete(newScore, total);
      else { setQi(next); setPhase('q'); }
    }, 700);
  }

  const q = data[qi];

  return (
    <div>
      <ProgressBar current={qi} total={total} color={color} />
      <p className="text-xs text-gray-400 mt-3 mb-2">Soal {qi + 1} dari {total}</p>
      <p className="text-base font-medium text-gray-800 mb-3">Apa yang datang selanjutnya?</p>

      {/* Pattern display */}
      <div className="flex gap-2 items-center justify-center flex-wrap mb-5">
        {q.pat.map((em, i) => (
          <span key={i} className="text-3xl leading-none">{em}</span>
        ))}
        <span className="text-3xl text-gray-400 font-bold">?</span>
      </div>

      {/* Options */}
      <div className="flex gap-3 justify-center">
        {q.opts.map((opt) => (
          <button
            key={opt}
            onClick={() => handlePick(opt)}
            className="text-4xl p-3 rounded-xl border-2 transition-all"
            style={{
              borderColor: '#E5E7EB',
              backgroundColor: 'white',
              cursor: phase === 'q' ? 'pointer' : 'default',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Level 2: Number sequence ───────────────────────────────── */
function NumberSequence({ onComplete }: { onComplete: (s: number, t: number) => void }) {
  const color = '#10B981';
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'q' | 'fb'>('q');
  const total = SENS_L2.length;

  function handlePick(opt: number) {
    if (phase !== 'q') return;
    const q = SENS_L2[qi];
    const correct = opt === q.next;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setPhase('fb');

    setTimeout(() => {
      const next = qi + 1;
      if (next >= total) onComplete(newScore, total);
      else { setQi(next); setPhase('q'); }
    }, 700);
  }

  const q = SENS_L2[qi];

  return (
    <div>
      <ProgressBar current={qi} total={total} color={color} />
      <p className="text-xs text-gray-400 mt-3 mb-2">Soal {qi + 1} dari {total}</p>
      <p className="text-base font-medium text-gray-800 mb-3">Angka berikutnya adalah...</p>

      {/* Number sequence */}
      <div className="flex gap-2 items-center justify-center flex-wrap mb-5">
        {q.seq.map((n, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-medium"
            style={{ backgroundColor: '#EFF6FF', color: '#1E40AF' }}
          >
            {n}
          </div>
        ))}
        <div
          className="w-12 h-12 rounded-xl border-2 border-dashed flex items-center justify-center text-xl text-gray-400"
          style={{ borderColor: '#6B7280' }}
        >
          ?
        </div>
      </div>

      {/* Options */}
      <div className="flex gap-3 justify-center">
        {q.opts.map((opt) => (
          <button
            key={opt}
            onClick={() => handlePick(opt)}
            className="w-16 h-16 rounded-xl border-[1.5px] text-xl font-medium transition-all"
            style={{
              borderColor: '#E5E7EB',
              backgroundColor: 'white',
              color: '#111827',
              cursor: phase === 'q' ? 'pointer' : 'default',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
