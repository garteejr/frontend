export type SectionId = 'home' | 'attention' | 'language' | 'cognitive' | 'motor' | 'social';

export type GameId =
  | 'focus'
  | 'memory'
  | 'vocab'
  | 'story'
  | 'pattern'
  | 'sort'
  | 'draw'
  | 'emotion'
  | 'breathing'
  | null;

export interface RewardData {
  stars: string;
  title: string;
  message: string;
}

export interface VocabItem {
  img: string;
  question: string;
  options: string[];
  answerIndex: number;
}

export interface StoryNode {
  scene: string;
  text: string;
  choices: { text: string; next: number }[];
}

export interface PatternItem {
  seq: string[];
  ans: string;
  choices: string[];
}

export interface SortItem {
  emoji: string;
  category: string;
}

export interface Emotion {
  emoji: string;
  name: string;
  desc: string;
  color: string;
}

export interface EmotionQuestion {
  img: string;
  question: string;
  answer: string;
}
