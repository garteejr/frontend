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
  // Store answers as an array indexed by question number so we can go back
  const [answers, setAnswers] = useState<(Answer | null)[]>(
    Array(questions.length).fill(null)
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("profile");
    if (data) setProfile(JSON.parse(data));
  }, []);

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

  const handleBack = () => {
    if (step === 0) {
      router.push("/form"); // 
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const submitData = async (finalAnswers: Answer[]) => {
    setLoading(true);
    setError("");
    try {
      const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
      const payload = {
        profile: {
          name: savedProfile.name || "Guest",
          age: savedProfile.age || 0,
          gender: savedProfile.gender || "L",
          focusArea: "belum tahu",
        },
        answers: finalAnswers,
      };

      const res = await fetch("/api/screening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan");
        return;
      }
      setResult(data.result);
    } catch (err: any) {
      setError(err.message || "Gagal menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    localStorage.removeItem("profile");
    router.push("/form");
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} onRetry={reset} />;
  if (result)
    return (
      <ResultCard
        result={result}
        profile={profile}
        onDashboard={() => router.push("/")}
        onReset={reset}
        onPricing={() => router.push("/pricing")}
        onDokter={() => router.push("/dokter")}
        onBelajar={() => router.push("/belajar")}
      />
    );

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