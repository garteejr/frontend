'use client';
import { useState } from 'react';
import { GameProps } from '../types';
import { COMM_L1, COMM_L2, COMM_L3 } from '../data/communication';
import ProgressBar from '@/components/ProgressBar';

export default function CommunicationGame({ level, onComplete }: GameProps) {
  if (level === 1) return <MatchEmoji onComplete={onComplete} />;
  if (level === 2) return <FillBlank onComplete={onComplete} />;
  return <WordArrange onComplete={onComplete} />;
}

/* ── Level 1: Match word → emoji ───────────────────────────── */
function MatchEmoji({ onComplete }: { onComplete: (s: number, t: number) => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const total = COMM_L1.length;

  function handlePick(i: number) {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === COMM_L1[qi].ans;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);

    setTimeout(() => {
      const next = qi + 1;
      if (next >= total) onComplete(newScore, total);
      else { setQi(next); setSelected(null); }
    }, 700);
  }

  const q = COMM_L1[qi];

  return (
    <div>
      <ProgressBar current={qi} total={total} color="#3B82F6" />
      <p className="text-xs text-gray-400 mt-3 mb-2">Soal {qi + 1} dari {total}</p>
      <p className="text-lg font-medium text-center text-gray-800 mb-5">
        Mana yang &ldquo;{q.word}&rdquo;?
      </p>

      <div className="flex justify-center gap-4">
        {q.opts.map((em, i) => {
          const isSelected = selected === i;
          const isCorrect = isSelected && i === q.ans;
          const isWrong = isSelected && i !== q.ans;
          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              className="text-5xl p-3 rounded-2xl border-2 transition-all"
              style={{
                borderColor: isCorrect ? '#16A34A' : isWrong ? '#DC2626' : '#E5E7EB',
                backgroundColor: isCorrect ? '#DCFCE7' : isWrong ? '#FEE2E2' : 'white',
                cursor: selected !== null ? 'default' : 'pointer',
              }}
            >
              {em}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Level 2: Fill-in-the-blank ────────────────────────────── */
function FillBlank({ onComplete }: { onComplete: (s: number, t: number) => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'q' | 'fb'>('q');
  const total = COMM_L2.length;

  function handlePick(i: number) {
    if (phase !== 'q') return;
    const correct = i === COMM_L2[qi].ans;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setPhase('fb');

    setTimeout(() => {
      const next = qi + 1;
      if (next >= total) onComplete(newScore, total);
      else { setQi(next); setPhase('q'); }
    }, 800);
  }

  const q = COMM_L2[qi];

  return (
    <div>
      <ProgressBar current={qi} total={total} color="#3B82F6" />
      <p className="text-xs text-gray-400 mt-3 mb-2">Soal {qi + 1} dari {total}</p>
      <p className="text-base font-medium text-gray-800 mb-2">Lengkapi kalimat berikut:</p>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 mb-4 text-base font-medium text-gray-800">
        {q.sent}
      </div>

      <div className="flex flex-col gap-2">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => handlePick(i)}
            className="text-left px-4 py-3 text-sm rounded-xl border-[1.5px] transition-all"
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

/* ── Level 3: Word Arrange ──────────────────────────────────── */
function WordArrange({ onComplete }: { onComplete: (s: number, t: number) => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [wordOrder, setWordOrder] = useState<number[]>([]);
  const [placed, setPlaced] = useState<boolean[]>([]);
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const total = COMM_L3.length;

  const q = COMM_L3[qi];

  function pickWord(wi: number) {
    if (placed[wi] || result !== null) return;
    setPlaced((p) => { const n = [...p]; n[wi] = true; return n; });
    setWordOrder((o) => [...o, wi]);
  }

  function removeWord(pos: number) {
    if (result !== null) return;
    const wi = wordOrder[pos];
    setWordOrder((o) => o.filter((_, i) => i !== pos));
    setPlaced((p) => { const n = [...p]; n[wi] = false; return n; });
  }

  function checkAnswer() {
    const ans = wordOrder.map((i) => q.words[i]).join(' ');
    const correct = ans === q.answer;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setResult(correct ? 'correct' : 'wrong');

    setTimeout(() => {
      const next = qi + 1;
      if (next >= total) onComplete(newScore, total);
      else {
        setQi(next);
        setWordOrder([]);
        setPlaced([]);
        setResult(null);
      }
    }, 1000);
  }

  const allPlaced = wordOrder.length === q.words.length;

  return (
    <div>
      <ProgressBar current={qi} total={total} color="#3B82F6" />
      <p className="text-xs text-gray-400 mt-3 mb-2">Soal {qi + 1} dari {total}</p>
      <p className="text-base font-medium text-gray-800 mb-3">
        Susun kata-kata menjadi kalimat yang benar!
      </p>

      {/* Answer area */}
      <div className="min-h-11 border-[1.5px] border-dashed border-gray-200 rounded-xl p-2 mb-3 flex gap-2 flex-wrap items-center">
        {wordOrder.length === 0 ? (
          <span className="text-sm text-gray-400">Ketuk kata-kata di bawah...</span>
        ) : (
          wordOrder.map((wi, pos) => (
            <button
              key={pos}
              onClick={() => removeWord(pos)}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border-[1.5px]"
              style={{ background: '#EFF6FF', borderColor: '#3B82F6', color: '#1E40AF' }}
            >
              {q.words[wi]}
            </button>
          ))
        )}
      </div>

      {/* Word chips */}
      <div className="flex gap-2 flex-wrap mb-3">
        {q.words.map((word, wi) => (
          <button
            key={wi}
            onClick={() => pickWord(wi)}
            className="px-3 py-2 text-sm font-medium rounded-lg border-[1.5px] border-gray-200 transition-all"
            style={{
              opacity: placed[wi] ? 0.35 : 1,
              cursor: placed[wi] || result !== null ? 'default' : 'pointer',
              backgroundColor: 'white',
              color: '#111827',
            }}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Check button */}
      {allPlaced && result === null && (
        <button
          onClick={checkAnswer}
          className="w-full py-2.5 text-sm font-medium rounded-xl text-white cursor-pointer"
          style={{ backgroundColor: '#3B82F6' }}
        >
          Cek Jawaban
        </button>
      )}

      {result && (
        <p className={`text-center font-medium mt-3 ${result === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
          {result === 'correct' ? 'Benar! 🎉' : 'Kurang tepat, coba lagi!'}
        </p>
      )}
    </div>
  );
}
