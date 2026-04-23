export const COMM_L1 = [
  { word: 'Apel',     opts: ['🍎', '🍌', '🍊'], ans: 0 },
  { word: 'Kucing',   opts: ['🐶', '🐱', '🐰'], ans: 1 },
  { word: 'Matahari', opts: ['🌙', '⭐', '☀️'], ans: 2 },
  { word: 'Rumah',    opts: ['🏠', '🌳', '🚗'], ans: 0 },
  { word: 'Buku',     opts: ['✏️', '📚', '🎒'], ans: 1 },
];

export const COMM_L2 = [
  { sent: 'Kucing suka minum ___',  opts: ['susu', 'buku', 'kursi'],     ans: 0 },
  { sent: 'Langit berwarna ___',    opts: ['hitam', 'biru', 'merah'],    ans: 1 },
  { sent: 'Kita makan dengan ___',  opts: ['pensil', 'sendok', 'buku'],  ans: 1 },
  { sent: 'Burung bisa ___',        opts: ['terbang', 'berenang', 'berlari'], ans: 0 },
  { sent: 'Ikan hidup di ___',      opts: ['air', 'tanah', 'udara'],     ans: 0 },
];

export const COMM_L3 = [
  { words: ['aku', 'suka', 'makan', 'apel'],    answer: 'aku suka makan apel' },
  { words: ['kucing', 'itu', 'sangat', 'lucu'], answer: 'kucing itu sangat lucu' },
  { words: ['ibu', 'memasak', 'nasi', 'goreng'],answer: 'ibu memasak nasi goreng' },
  { words: ['adik', 'bermain', 'di', 'taman'],  answer: 'adik bermain di taman' },
];
