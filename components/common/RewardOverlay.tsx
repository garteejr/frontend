'use client';

import { useGame } from '../context/GameContext';

export default function RewardOverlay() {
  const { rewardData, closeReward } = useGame();
  if (!rewardData) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3"
      style={{ background: 'rgba(0,0,0,0.85)', animation: 'rewardFade 0.5s ease' }}
    >
      <div
        className="text-6xl"
        style={{ animation: 'rewardBounce 1s ease-out forwards' }}
      >
        {rewardData.stars}
      </div>

      <div
        className="font-fredoka text-4xl"
        style={{ color: '#FFD60A', textShadow: '0 0 30px #FFD60A' }}
      >
        {rewardData.title}
      </div>

      <div className="text-base font-bold text-muted">{rewardData.message}</div>

      <button
        onClick={closeReward}
        className="rounded-2xl px-7 py-3 font-fredoka text-lg text-white mt-2 transition-all duration-200 hover:scale-105"
        style={{ background: 'linear-gradient(135deg,#7C3AED,#FF4D8F)', border: 'none' }}
      >
        Lanjut Belajar! 🚀
      </button>
    </div>
  );
}
