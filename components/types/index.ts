export type Level = 1 | 2 | 3;

export type Domain =
  | 'attention'
  | 'communication'
  | 'sensory'
  | 'motoric'
  | 'social';

export type SectionId = 'home' | Domain;

// GameId — null berarti tidak ada game yang sedang aktif
export type GameId = `${Domain}_${Level}` | null;

// RewardData — payload untuk modal reward setelah level selesai
export interface RewardData {
  stars: string;
  title: string;
  message: string;
}

export interface GameProps {
  level: Level;
  onComplete: (score: number, total: number) => void;
}

export interface DomainConfig {
  key: Domain;
  label: string;
  emoji: string;
  color: string;
  desc: string;
}

export interface LevelConfig {
  n: Level;
  label: string;
  color: string;
  bg: string;
  tc: string;
}