'use client';
import Link from 'next/link';
import { Domain, Level } from '../components/types';
import { DOMAINS, LEVELS } from '../app/lib/constants';

interface GameLayoutProps {
  domain: Domain;
  level: Level;
  score: number;
  children: React.ReactNode;
}

export default function GameLayout({ domain, level, score, children }: GameLayoutProps) {
  const sec = DOMAINS.find((d) => d.key === domain)!;
  const lv = LEVELS[level - 1];

  return (
    <div className="max-w-xl mx-auto px-4 py-5 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="px-3 py-1 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          >
            ← Kembali
          </Link>
          <span className="text-sm font-medium text-gray-800">
            {sec.emoji} {sec.label}
          </span>
          <span
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ backgroundColor: lv.bg, color: lv.tc }}
          >
            {lv.label}
          </span>
        </div>
        <span className="text-sm text-gray-500">Skor: {score}</span>
      </div>

      {/* Game area */}
      <div
        className="bg-white rounded-2xl border border-gray-100 p-5"
        style={{ borderTopWidth: 3, borderTopColor: sec.color }}
      >
        {children}
      </div>
    </div>
  );
}
