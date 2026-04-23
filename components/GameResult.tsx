'use client';
import Link from 'next/link';
import { Domain, Level } from '../components/types';
import { DOMAINS, LEVELS } from '../app/lib/constants';

interface GameResultProps {
  domain: Domain;
  level: Level;
  score: number;
  total: number;
  onReplay: () => void;
}

export default function GameResult({ domain, level, score, total, onReplay }: GameResultProps) {
  const sec = DOMAINS.find((d) => d.key === domain)!;
  const lv = LEVELS[level - 1];
  const pct = Math.round((score / total) * 100);
  const stars = pct >= 80 ? 3 : pct >= 50 ? 2 : 1;
  const nextLevel = (level + 1) as Level;

  const trophy = stars === 3 ? '🏆' : stars === 2 ? '🥈' : '🥉';
  const headline = stars === 3 ? 'Luar Biasa!' : stars === 2 ? 'Bagus!' : 'Terus Semangat!';

  return (
    <div className="text-center">
      {/* Trophy */}
      <div className="text-6xl mb-2 leading-none">{trophy}</div>
      <h2 className="text-xl font-medium text-gray-800 mb-1">{headline}</h2>
      <p className="text-sm text-gray-500 mb-5">
        {sec.label} — Level {lv.label}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-5">
        {[
          { label: 'Skor',    val: `${score}/${total}`, color: sec.color },
          { label: 'Persen',  val: `${pct}%`,           color: '#3B82F6' },
          { label: 'Bintang', val: '⭐'.repeat(stars),  color: '#F59E0B' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-gray-100 p-3 text-center"
            style={{ borderTopWidth: 3, borderTopColor: s.color }}
          >
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-xl font-medium text-gray-800">{s.val}</p>
          </div>
        ))}
      </div>

      {/* Next level unlock */}
      {level < 3 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-sm text-amber-800">
          ⭐ Level {nextLevel} ({LEVELS[level].label}) sudah terbuka!
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 justify-center flex-wrap">
        <button
          onClick={onReplay}
          className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Ulangi
        </button>

        {level < 3 && (
          <Link
            href={`/${domain}/level${nextLevel}`}
            className="px-5 py-2 text-sm font-medium rounded-xl text-white cursor-pointer"
            style={{ backgroundColor: sec.color }}
          >
            Level Selanjutnya →
          </Link>
        )}

        <Link
          href="/"
          className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        >
          Pilih Aktivitas
        </Link>
      </div>
    </div>
  );
}
