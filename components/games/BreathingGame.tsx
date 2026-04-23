'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import BackButton from '@/components/common/BackButton';
import { useGame } from '../context/GameContext';

const PHASES = [
  { name: 'Tarik Napas...', cls: 'inhale', dur: 4000 },
  { name: 'Tahan...',       cls: '',       dur: 4000 },
  { name: 'Hembuskan...',   cls: 'exhale', dur: 4000 },
  { name: 'Istirahat...',   cls: '',       dur: 2000 },
];

export default function BreathingGame() {
  const { addScore, showReward } = useGame();
  const [phase, setPhase] = useState<string>('');
  const [label, setLabel] = useState('Ketuk lingkaran untuk mulai');
  const [circleText, setCircleText] = useState('Klik Mulai');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countRef = useRef(0);
  const phaseIdx = useRef(0);

  const runPhase = useCallback(() => {
    const ph = PHASES[phaseIdx.current];
    setPhase(ph.cls);
    setCircleText(ph.name);
    setLabel(ph.name);
    phaseIdx.current = (phaseIdx.current + 1) % PHASES.length;
    if (phaseIdx.current === 0) {
      countRef.current += 1;
      addScore(2);
      if (countRef.current >= 3) {
        showReward('🌟🌟🌟', 'Pikiran Tenang!', 'Kamu berhasil melatih pernapasan! Luar biasa! 🌬️');
      }
    }
  }, [addScore, showReward]);

  const startBreathing = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    phaseIdx.current = 0;
    runPhase();
    intervalRef.current = setInterval(runPhase, 4000);
  }, [runPhase]);

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  return (
    <div>
      <BackButton section="social" />
      <div className="font-fredoka text-xl text-center" style={{ color: '#FFD60A' }}>🌬️ Napas Tenang</div>
      <div className="text-sm text-muted font-semibold text-center mb-4">
        Latihan bernapas untuk menenangkan diri dan fokus
      </div>

      <div className="text-center py-5">
        <div
          onClick={startBreathing}
          className={`breathing-circle ${phase}`}
        >
          {circleText}
        </div>

        <div
          className="text-center font-fredoka text-xl mt-3"
          style={{ color: '#A78BFA' }}
        >
          {label}
        </div>

        <div className="mt-4 text-sm font-semibold text-muted">
          Ikuti gerakan lingkaran:<br />
          Membesar = Tarik napas | Mengecil = Hembuskan
        </div>
      </div>

      <div className="rounded-2xl p-3 mt-2" style={{ background: '#231657' }}>
        <div className="text-xs font-bold text-muted mb-2">💡 Tips Pernapasan:</div>
        <div className="text-xs leading-7" style={{ color: '#E2D9FA' }}>
          • Hirup napas dalam 4 hitungan<br />
          • Tahan napas 4 hitungan<br />
          • Hembuskan napas dalam 4 hitungan<br />
          • Ulangi 3–5 kali untuk merasa lebih tenang
        </div>
      </div>
    </div>
  );
}
