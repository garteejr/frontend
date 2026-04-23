import type { Emotion, EmotionQuestion } from '../types';

export const emotions: Emotion[] = [
  { emoji: '😊', name: 'Senang',   desc: 'Ketika kamu mendapat hadiah atau bermain dengan teman',        color: '#22C55E' },
  { emoji: '😢', name: 'Sedih',    desc: 'Ketika sesuatu yang buruk terjadi atau kehilangan sesuatu',    color: '#3B82F6' },
  { emoji: '😠', name: 'Marah',    desc: 'Ketika sesuatu tidak adil atau kamu tidak suka sesuatu',       color: '#EF4444' },
  { emoji: '😨', name: 'Takut',    desc: 'Ketika ada sesuatu yang menakutkan atau tidak aman',           color: '#7C3AED' },
  { emoji: '😮', name: 'Terkejut', desc: 'Ketika sesuatu yang tidak kamu duga terjadi tiba-tiba',        color: '#FFD60A' },
  { emoji: '🤗', name: 'Sayang',   desc: 'Perasaan hangat terhadap orang yang kamu cintai',              color: '#FF4D8F' },
];

export const emotionQuestions: EmotionQuestion[] = [
  { img: '😊', question: 'Temanmu memberikanmu coklat kesukaanmu. Kamu merasa...?', answer: 'Senang' },
  { img: '😢', question: 'Mainan kesayanganmu hilang. Kamu merasa...?',             answer: 'Sedih'  },
  { img: '😠', question: 'Seseorang mengambil giliranmu tanpa minta izin. Kamu merasa...?', answer: 'Marah' },
  { img: '😨', question: 'Kamu mendengar suara keras di malam hari. Kamu merasa...?', answer: 'Takut' },
];
