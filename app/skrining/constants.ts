export type Domain =
  | "attention"
  | "language/communication"
  | "cognitive"
  | "motoric"
  | "social_emotional";

export interface Question {
  question_id: string;
  domain: Domain;
  question: string;
}

export const quiz: Question[] = [
  {
    question_id: "Q1",
    domain: "attention",
    question:
      "Jika Anda menunjuk pada sesuatu di seberang ruangan, apakah anak Anda melihat ke arah itu?",
  },
  {
    question_id: "Q2",
    domain: "language/communication",
    question: "Apakah Anda pernah bertanya-tanya apakah anak Anda mungkin tuli?",
  },
  {
    question_id: "Q3",
    domain: "cognitive",
    question: "Apakah anak Anda bermain pura-pura atau bermain khayalan?",
  },
  {
    question_id: "Q4",
    domain: "motoric",
    question: "Apakah anak Anda suka memanjat benda-benda?",
  },
  {
    question_id: "Q5",
    domain: "social_emotional",
    question:
      "Apakah anak Anda membuat gerakan jari yang tidak biasa di dekat matanya?",
  },
  {
    question_id: "Q6",
    domain: "language/communication",
    question:
      "Apakah anak Anda menunjuk dengan satu jari untuk meminta sesuatu atau untuk mendapatkan bantuan?",
  },
  {
    question_id: "Q7",
    domain: "language/communication",
    question:
      "Apakah anak Anda menunjuk dengan satu jari untuk menunjukkan sesuatu yang menarik kepada Anda?",
  },
  {
    question_id: "Q8",
    domain: "social_emotional",
    question: "Apakah anak Anda tertarik pada anak-anak lain?",
  },
  {
    question_id: "Q9",
    domain: "language/communication",
    question:
      "Apakah anak Anda menunjukkan sesuatu kepada Anda dengan membawanya atau mengangkatnya agar Anda dapat melihatnya – bukan untuk meminta bantuan, tetapi hanya untuk berbagi?",
  },
  {
    question_id: "Q10",
    domain: "attention",
    question: "Apakah anak Anda merespon ketika Anda memanggil namanya?",
  },
  {
    question_id: "Q11",
    domain: "social_emotional",
    question:
      "Ketika Anda tersenyum kepada anak Anda, apakah ia tersenyum kembali kepada Anda?",
  },
  {
    question_id: "Q12",
    domain: "social_emotional",
    question:
      "Apakah anak Anda menjadi terganggu oleh suara bising sehari-hari?",
  },
  {
    question_id: "Q13",
    domain: "motoric",
    question: "Apakah anak Anda bisa berjalan?",
  },
  {
    question_id: "Q14",
    domain: "attention",
    question:
      "Apakah anak Anda melihat ke mata Anda ketika Anda berbicara dengannya, bermain dengannya, atau memakaikannya pakaian?",
  },
  {
    question_id: "Q15",
    domain: "cognitive",
    question: "Apakah anak Anda mencoba meniru apa yang Anda lakukan?",
  },
  {
    question_id: "Q16",
    domain: "attention",
    question:
      "Jika Anda memutar kepala untuk melihat sesuatu, apakah anak Anda melihat ke sekitar untuk melihat apa yang Anda lihat?",
  },
  {
    question_id: "Q17",
    domain: "language/communication",
    question: "Apakah anak Anda mencoba membuat Anda melihat kepadanya?",
  },
  {
    question_id: "Q18",
    domain: "language/communication",
    question:
      "Apakah anak Anda memahami ketika Anda memintanya melakukan sesuatu?",
  },
  {
    question_id: "Q19",
    domain: "social_emotional",
    question:
      "Jika sesuatu yang baru terjadi, apakah anak Anda menatap wajah Anda untuk melihat bagaimana perasaan Anda tentang hal tersebut?",
  },
  {
    question_id: "Q20",
    domain: "motoric",
    question: "Apakah anak Anda menyukai aktivitas yang melibatkan gerakan?",
  },
];

// Array of question strings (for QuestionCard compatibility)
export const questions: string[] = quiz.map((q) => q.question);

// Map step index (1-based) to domain
export const areaMap: Record<number, string> = Object.fromEntries(
  quiz.map((q, i) => [i + 1, q.domain])
);

export const riskConfig = {
  HIGH: {
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    label: "High Risk",
    icon: "🚨",
    desc: "Segera konsultasi ke profesional.",
  },
  MODERATE: {
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    label: "Moderate",
    icon: "⚠️",
    desc: "Perlu skrining lanjutan.",
  },
  LOW: {
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
    label: "Low Risk",
    icon: "✅",
    desc: "Tidak ditemukan risiko signifikan.",
  },
};