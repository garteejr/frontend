'use client';
import { useState } from 'react';
import { GameProps } from '../types';
import { SOC_L1, SOC_L2, SOC_L3 } from '../data/social';
import ProgressBar from '@/components/ProgressBar';

export default function SocialGame({ level, onComplete }: GameProps) {
  if (level === 1) return <EmotionRecognition onComplete={onComplete} />;
  if (level === 2) return <ScenarioChoice onComplete={onComplete} />;
  return <StoryMode onComplete={onComplete} />;
}

/* ── Level 1: Emotion recognition ───────────────────────────── */
function EmotionRecognition({ onComplete }: { onComplete: (s: number, t: number) => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'q' | 'fb'>('q');
  const total = SOC_L1.length;

  function handlePick(i: number) {
    if (phase !== 'q') return;
    const correct = i === SOC_L1[qi].ans;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setPhase('fb');

    setTimeout(() => {
      const next = qi + 1;
      if (next >= total) onComplete(newScore, total);
      else { setQi(next); setPhase('q'); }
    }, 700);
  }

  const q = SOC_L1[qi];

  return (
    <div>
      <ProgressBar current={qi} total={total} color="#EC4899" />
      <p className="text-xs text-gray-400 mt-3 mb-2">Soal {qi + 1} dari {total}</p>
      <p className="text-base font-medium text-gray-800 mb-4">Apa perasaan anak ini?</p>

      <div className="text-7xl text-center mb-5 leading-none">{q.face}</div>

      <div className="flex gap-2 justify-center flex-wrap">
        {q.opts.map((opt, i) => (
          <button
            key={i}
            onClick={() => handlePick(i)}
            className="px-5 py-2.5 rounded-full border-2 text-sm font-medium transition-all"
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

/* ── Level 2: Scenario choice ───────────────────────────────── */
function ScenarioChoice({ onComplete }: { onComplete: (s: number, t: number) => void }) {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'q' | 'fb'>('q');
  const total = SOC_L2.length;

  function handlePick(i: number) {
    if (phase !== 'q') return;
    const correct = i === SOC_L2[qi].ans;
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setPhase('fb');

    setTimeout(() => {
      const next = qi + 1;
      if (next >= total) onComplete(newScore, total);
      else { setQi(next); setPhase('q'); }
    }, 900);
  }

  const q = SOC_L2[qi];

  return (
    <div>
      <ProgressBar current={qi} total={total} color="#EC4899" />
      <p className="text-xs text-gray-400 mt-3 mb-2">Situasi {qi + 1} dari {total}</p>

      <div className="bg-gray-50 rounded-xl p-3.5 mb-3">
        <p className="text-sm font-medium text-gray-800 mb-1">{q.scene}</p>
        <p className="text-xs text-gray-500">{q.q}</p>
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

/* ── Level 3: Story mode ─────────────────────────────────────── */
function StoryMode({ onComplete }: { onComplete: (s: number, t: number) => void }) {
  const [storyIdx, setStoryIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const totalSteps = SOC_L3.reduce((acc, s) => acc + s.steps.length, 0);
  const doneSteps = SOC_L3.slice(0, storyIdx).reduce((acc, s) => acc + s.steps.length, 0) + stepIdx;

  const story = SOC_L3[storyIdx];
  const step = story?.steps[stepIdx];

  function handlePick(i: number) {
    if (feedback) return;
    const ok = i === step.cor;
    if (ok) setScore((s) => s + 1);
    setFeedback({ ok, msg: ok ? step.ok : step.no });
  }

  function handleNext() {
    setFeedback(null);
    const nextStep = stepIdx + 1;
    if (nextStep >= story.steps.length) {
      const nextStory = storyIdx + 1;
      if (nextStory >= SOC_L3.length) {
        onComplete(score + (feedback?.ok ? 0 : 0), totalSteps);
        // Note: score is already incremented in handlePick
        return;
      }
      setStoryIdx(nextStory);
      setStepIdx(0);
    } else {
      setStepIdx(nextStep);
    }
  }

  if (!story || !step) return null;

  const isLastStep = stepIdx >= story.steps.length - 1;

  return (
    <div>
      <ProgressBar current={doneSteps} total={totalSteps} color="#EC4899" />
      <p className="text-xs text-gray-400 mt-3 mb-1">
        {story.title} — Langkah {stepIdx + 1} dari {story.steps.length}
      </p>

      <div className="bg-pink-50 border border-pink-100 rounded-xl p-3.5 mb-3">
        <p className="text-sm text-gray-800 leading-relaxed">{step.story}</p>
      </div>

      <p className="text-sm font-medium text-gray-800 mb-2.5">{step.q}</p>

      {!feedback ? (
        <div className="flex flex-col gap-2">
          {step.opts.map((opt, i) => (
            <button
              key={i}
              onClick={() => handlePick(i)}
              className="text-left px-4 py-3 text-sm rounded-xl border-[1.5px] border-gray-200 bg-white text-gray-800 cursor-pointer hover:border-pink-200 transition-all"
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <>
          <div
            className="rounded-xl p-3 mb-3 text-sm font-medium"
            style={{
              backgroundColor: feedback.ok ? '#DCFCE7' : '#FEE2E2',
              borderWidth: 0.5,
              borderColor: feedback.ok ? '#86EFAC' : '#FCA5A5',
              color: feedback.ok ? '#14532D' : '#7F1D1D',
            }}
          >
            {feedback.ok ? 'Benar! ' : 'Hmm... '}{feedback.msg}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-2.5 text-sm font-medium rounded-xl text-white cursor-pointer"
            style={{ backgroundColor: '#EC4899' }}
          >
            {isLastStep && storyIdx < SOC_L3.length - 1
              ? 'Cerita Berikutnya →'
              : isLastStep
              ? 'Selesai 🎉'
              : 'Lanjut →'}
          </button>
        </>
      )}
    </div>
  );
}
