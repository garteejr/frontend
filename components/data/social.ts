export const SOC_L1 = [
  { face: '😢', label: 'Sedih',    opts: ['Sedih', 'Senang', 'Marah'],    ans: 0 },
  { face: '😊', label: 'Senang',   opts: ['Takut', 'Senang', 'Sedih'],    ans: 1 },
  { face: '😠', label: 'Marah',    opts: ['Marah', 'Senang', 'Terkejut'], ans: 0 },
  { face: '😨', label: 'Takut',    opts: ['Sedih', 'Marah', 'Takut'],     ans: 2 },
  { face: '😮', label: 'Terkejut', opts: ['Terkejut', 'Senang', 'Sedih'], ans: 0 },
];

export const SOC_L2 = [
  {
    scene: 'Temanmu menangis karena jatuh.',
    q: 'Apa yang kamu lakukan?',
    opts: ['Tanya apakah dia baik-baik saja 💙', 'Tertawa melihatnya 😄', 'Pergi bermain sendiri 🎮'],
    ans: 0,
  },
  {
    scene: 'Kamu ingin mainan yang sedang dipakai teman.',
    q: 'Apa yang kamu lakukan?',
    opts: ['Ambil paksa mainannya 😤', 'Minta dengan sopan dan tunggu 🙏', 'Menangis dan marah 😭'],
    ans: 1,
  },
  {
    scene: 'Temanmu memberimu kue.',
    q: 'Apa yang kamu katakan?',
    opts: ['Langsung makan tanpa berkata apa-apa', 'Terima kasih! 😊', 'Aku tidak mau! 😠'],
    ans: 1,
  },
  {
    scene: 'Kamu tidak sengaja memecahkan vas bunga.',
    q: 'Apa yang kamu lakukan?',
    opts: ['Berpura-pura tidak tahu', 'Minta maaf dan beritahu orang tua 🙏', 'Menyalahkan adik'],
    ans: 1,
  },
  {
    scene: 'Temanmu baru saja menang dalam permainan.',
    q: 'Apa yang kamu katakan?',
    opts: ['Selamat! Kamu hebat! 👏', 'Itu tidak adil! 😤', 'Pura-pura tidak melihat'],
    ans: 0,
  },
];

export interface StoryStep {
  story: string;
  q: string;
  opts: string[];
  cor: number;
  ok: string;
  no: string;
}

export interface Story {
  title: string;
  steps: StoryStep[];
}

export const SOC_L3: Story[] = [
  {
    title: 'Di Taman Bermain',
    steps: [
      {
        story: 'Kamu melihat anak baru yang terlihat kesepian dan tidak bermain bersama siapapun.',
        q: 'Apa yang kamu lakukan?',
        opts: ['Dekati dan ajak bicara 😊', 'Biarkan saja dia', 'Ajak temanmu menjauh'],
        cor: 0,
        ok: 'Bagus! Kamu sangat ramah.',
        no: 'Coba lebih peduli terhadap teman baru.',
      },
      {
        story: 'Dia terlihat pemalu dan tidak langsung menjawab sapaanmu.',
        q: 'Apa yang kamu lakukan selanjutnya?',
        opts: ['Pergi saja karena tidak direspons', 'Senyum dan tunggu dengan sabar 🙂', 'Paksa dia untuk bicara'],
        cor: 1,
        ok: 'Kesabaran itu penting!',
        no: 'Orang pemalu butuh waktu lebih lama.',
      },
      {
        story: 'Akhirnya dia tersenyum dan memperkenalkan diri. Namanya Budi.',
        q: 'Apa yang kamu lakukan selanjutnya?',
        opts: ['Perkenalkan diri dan ajak bermain 🎉', 'Langsung pergi bermain sendiri', 'Tidak menjawab'],
        cor: 0,
        ok: 'Luar biasa! Kamu berhasil mendapat teman baru!',
        no: 'Sayang, Budi sudah mulai terbuka lho.',
      },
    ],
  },
  {
    title: 'Di Kelas',
    steps: [
      {
        story: 'Sari duduk sendirian saat makan siang dan terlihat sedih.',
        q: 'Apa yang kamu lakukan?',
        opts: ['Dekati dan tanya ada apa 💙', 'Duduk di tempat lain', 'Abaikan saja'],
        cor: 0,
        ok: 'Kamu peduli! Itu sangat baik.',
        no: 'Sari butuh teman sekarang.',
      },
      {
        story: 'Sari bercerita kehilangan pensil dan takut dimarahi guru.',
        q: 'Bagaimana kamu membantu?',
        opts: ['Pinjamkan pensil cadanganmu ✏️', 'Katakan "Itu masalahmu"', 'Langsung pergi makan'],
        cor: 0,
        ok: 'Kamu baik sekali!',
        no: 'Teman butuh bantuan nyata.',
      },
      {
        story: 'Sari sangat berterima kasih atas bantuanmu.',
        q: 'Apa yang kamu rasakan?',
        opts: ['Senang karena bisa membantu 😊', 'Menyesal sudah membantu', 'Biasa saja'],
        cor: 0,
        ok: 'Membantu orang lain membuat kita ikut senang!',
        no: 'Coba renungkan lagi perasaanmu.',
      },
    ],
  },
];
