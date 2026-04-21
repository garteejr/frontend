"use client";

import { useState } from "react";

type Answer = "YA" | "TIDAK";

type ResultType = {
  score: number;
  riskLevel: "LOW" | "MODERATE" | "HIGH";
};

export default function Skrining() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState("");

  const questions: string[] = [
    "Apakah anak merespon namanya?",
    "Apakah anak suka kontak mata?",
    "Apakah anak menunjuk benda?",
    "Apakah anak meniru orang lain?",
    "Apakah anak suka bermain dengan orang lain?",
    "Apakah anak memahami perintah sederhana?",
    "Apakah anak tersenyum saat diajak bicara?",
    "Apakah anak bereaksi terhadap suara?",
    "Apakah anak menggunakan gesture?",
    "Apakah anak suka bermain pura-pura?",
    "Apakah anak menunjukkan minat sosial?",
    "Apakah anak mengerti ekspresi wajah?",
    "Apakah anak tertarik dengan anak lain?",
    "Apakah anak berbagi perhatian?",
    "Apakah anak merespon saat dipanggil?",
    "Apakah anak menunjukkan emosi?",
    "Apakah anak bisa fokus?",
    "Apakah anak mengikuti arah pandangan?",
    "Apakah anak memahami komunikasi nonverbal?",
    "Apakah anak nyaman dengan interaksi sosial?"
  ];

  // HANDLE JAWABAN
  const handleAnswer = (value: Answer) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (newAnswers.length === questions.length) {
      submitData(newAnswers);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  // SUBMIT KE API
  const submitData = async (answers: Answer[]) => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        profile: {
          name: "Tegar",
          age: 20,
          gender: "L",
          focusArea: "belum tahu",
        },
        answers: answers,
      };

      const res = await fetch("/api/screening", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal kirim data");

      const data = await res.json();
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  // RESET
  const reset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
    setError("");
  };

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Memproses hasil...</p>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
        <button onClick={reset} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">
          Coba Lagi
        </button>
      </div>
    );
  }

  // HASIL
  if (result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl mb-4">Hasil Skrining</h2>
        <p className="text-lg">Score: {result.score}</p>
        <p className="text-xl font-bold mt-2">
          Risiko: {result.riskLevel}
        </p>

        <button
          onClick={reset}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded"
        >
          Ulangi
        </button>
      </div>
    );
  }

  // PERTANYAAN
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      
      {/* Progress */}
      <p className="mb-2 text-gray-500">
        {step + 1} / {questions.length}
      </p>

      {/* Pertanyaan */}
      <h2 className="text-xl mb-6 text-center">
        {questions[step]}
      </h2>

      {/* Tombol */}
      <div className="flex gap-4">
        <button
          onClick={() => handleAnswer("YA")}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          YA
        </button>

        <button
          onClick={() => handleAnswer("TIDAK")}
          className="bg-red-500 text-white px-6 py-2 rounded"
        >
          TIDAK
        </button>
      </div>
    </div>
  );
}