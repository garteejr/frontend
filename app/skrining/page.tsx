"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Answer, ResultType, ProfileType } from "@/app/skrining/tpyes";
import { questions } from "@/app/skrining/constants";
import LoadingScreen from "@/components/LoadingScreen";
import ErrorScreen from "@/components/ErrorScreen";
import QuestionCard from "@/components/QuestionCard";
import ResultCard from "@/components/ResultCard";

export default function Skrining() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>(
    Array(questions.length).fill(null)
  );

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<ProfileType | null>(null);

  // 🔥 ambil profile dari localStorage
  useEffect(() => {
    const data = localStorage.getItem("profile");
    if (data) {
      try {
        setProfile(JSON.parse(data));
      } catch {
        console.log("Profile parse error");
      }
    }
  }, []);

  // 🔥 handle jawab
  const handleAnswer = (value: Answer) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);

    const nextStep = step + 1;

    if (nextStep === questions.length) {
      submitData(newAnswers as Answer[]);
    } else {
      setStep(nextStep);
    }
  };

  // 🔙 tombol back
  const handleBack = () => {
    if (step === 0) {
      router.push("/form");
    } else {
      setStep((prev) => prev - 1);
    }
  };

  // 🚀 SUBMIT KE API
  const submitData = async (finalAnswers: Answer[]) => {
    setLoading(true);
    setError("");

    try {
      const savedProfile = JSON.parse(
        localStorage.getItem("profile") || "{}"
      );

      const payload = {
        profile: {
          name: savedProfile.name || "Guest",
          age: savedProfile.age || 0,
          gender: savedProfile.gender || "L",
        },
        answers: finalAnswers,
      };

      console.log("📤 KIRIM:", payload);

      const res = await fetch("/api/screening", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      console.log("📥 RESPONSE:", data);

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan dari server");
        return;
      }

      // 🔥 VALIDASI RESPONSE
      if (!data || !data.result || !data.result.detail) {
        setError("Format response backend tidak sesuai");
        return;
      }

      setResult(data.result);

    } catch (err: any) {
      console.log("🔥 ERROR:", err);
      setError(err.message || "Gagal menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 reset
  const reset = () => {
    localStorage.removeItem("profile");
    router.push("/form");
  };

  // ⏳ loading
  if (loading) return <LoadingScreen />;

  // ❌ error
  if (error) return <ErrorScreen message={error} onRetry={reset} />;

  // ✅ hasil
  if (result) {
    return (
      <ResultCard
        result={result}
        profile={profile}
        onDashboard={() => router.push("/")}
        onReset={reset}
        onDokter={() => router.push("/dokter")}
      />
    );
  }

  // ❓ pertanyaan
  return (
    <QuestionCard
      question={questions[step]}
      step={step}
      total={questions.length}
      onAnswer={handleAnswer}
      onBack={handleBack}
      currentAnswer={answers[step]}
    />
  );
}