import type { StoryNode } from '../types';

export const storyData: StoryNode[] = [
  {
    scene: '🏫',
    text: 'Hari ini Ali ingin bermain di taman sekolah. Dia melihat teman barunya, Budi, sedang duduk sendirian. Apa yang sebaiknya Ali lakukan?',
    choices: [
      { text: '💬 Menyapa Budi dan mengajaknya bermain', next: 1 },
      { text: '🏃 Langsung bermain sendiri', next: 2 },
    ],
  },
  {
    scene: '🤝',
    text: 'Ali berkata "Hei Budi, mau ikut main bersama aku?" Budi tersenyum senang! Mereka berdua bermain bola bersama. Apa yang Ali rasakan?',
    choices: [
      { text: '😊 Senang karena punya teman baru', next: 3 },
      { text: '😐 Biasa saja', next: 3 },
    ],
  },
  {
    scene: '😢',
    text: 'Budi duduk sendirian dan merasa kesepian. Ali bermain sendirian juga. Apa akibatnya?',
    choices: [
      { text: '😔 Keduanya merasa sepi', next: 3 },
      { text: '🔄 Coba lagi & sapa Budi', next: 0 },
    ],
  },
  {
    scene: '🌟',
    text: 'Sekarang Ali dan Budi berteman akrab! Mereka belajar bahwa berbagi dan menyapa membuat hati bahagia! Kamu hebat!',
    choices: [],
  },
];
