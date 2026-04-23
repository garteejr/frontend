import { DomainConfig, LevelConfig } from '@/components/types';

export const DOMAINS: DomainConfig[] = [
  {
    key: 'attention',
    label: 'Perhatian',
    emoji: '🎯',
    color: '#EF4444',
    desc: 'Latih fokus & konsentrasi',
  },
  {
    key: 'communication',
    label: 'Komunikasi',
    emoji: '💬',
    color: '#3B82F6',
    desc: 'Belajar kata & komunikasi',
  },
  {
    key: 'sensory',
    label: 'Sensorik',
    emoji: '🧩',
    color: '#10B981',
    desc: 'Asah otak dengan pola & urutan',
  },
  {
    key: 'motoric',
    label: 'Motorik',
    emoji: '✋',
    color: '#F59E0B',
    desc: 'Latih ketepatan & kecepatan',
  },
  {
    key: 'social',
    label: 'Sosial',
    emoji: '❤️',
    color: '#EC4899',
    desc: 'Pahami perasaan & berteman',
  },
];

export const LEVELS: LevelConfig[] = [
  { n: 1, label: 'Mudah', color: '#16A34A', bg: '#DCFCE7', tc: '#14532D' },
  { n: 2, label: 'Sedang', color: '#D97706', bg: '#FEF3C7', tc: '#78350F' },
  { n: 3, label: 'Sulit', color: '#DC2626', bg: '#FEE2E2', tc: '#7F1D1D' },
];

export const DOMAIN_LABELS: Record<string, string> = {
  attention: 'Perhatian',
  communication: 'Komunikasi',
  sensory: 'Sensorik',
  motoric: 'Motorik',
  social: 'Sosial',
};
