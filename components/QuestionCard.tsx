"use client";

import { useState, useEffect } from "react";
import { Answer } from "@/app/skrining/tpyes";

interface Props {
  question: string;
  step: number;
  total: number;
  onAnswer: (value: Answer) => void;
  onBack: () => void;
  currentAnswer?: Answer | null;
}

export default function QuestionCard({
  question,
  step,
  total,
  onAnswer,
  onBack,
  currentAnswer,
}: Props) {
  const [selected, setSelected] = useState<Answer | null>(currentAnswer ?? null);
  const [animating, setAnimating] = useState(false);
  const [entering, setEntering] = useState(true);

  const progress = (step / total) * 100;

  useEffect(() => {
    setEntering(true);
    setSelected(currentAnswer ?? null);
    const t = setTimeout(() => setEntering(false), 350);
    return () => clearTimeout(t);
  }, [step, currentAnswer]);

  const handleSelect = (val: Answer) => {
    if (animating) return;
    setSelected(val);
  };

  const handleNext = () => {
    if (!selected || animating) return;
    setAnimating(true);
    setTimeout(() => {
      onAnswer(selected);
      setAnimating(false);
    }, 280);
  };

  // ✅ FIX: hapus kondisi "step === 0", selalu trigger onBack()
  const handleBack = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      onBack();
      setAnimating(false);
    }, 180);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900;1000&display=swap');
        .qcard-root * { font-family: 'Nunito', sans-serif; box-sizing: border-box; }
        .qcard-enter { animation: slideUp 0.35s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .qcard-fade-out { opacity: 0.45; transform: scale(0.98); transition: all 0.25s ease; }
        .ans-btn { transition: all 0.17s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer; }
        .ans-btn:hover { transform: translateY(-2px); }
        .ans-btn:active { transform: scale(0.95); }
        .next-btn { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer; }
        .next-btn:hover:not(:disabled) { transform: translateY(-2px); }
        .next-btn:active:not(:disabled) { transform: scale(0.96); }
        .back-btn { transition: all 0.18s ease; }
        .back-btn:hover { opacity: 0.75; }
      `}</style>

      <div
        className="qcard-root"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2563EB 0%, #0D9488 50%, #EF4444 100%)",
          padding: "24px",
        }}
      >
        <div
          className={entering ? "qcard-enter" : animating ? "qcard-fade-out" : ""}
          style={{
            background: "#FDFAF4",
            borderRadius: "28px",
            padding: "32px 36px",
            width: "100%",
            maxWidth: "560px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
          }}
        >
          {/* ── Top row ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
            <div style={{
              background: "#FADB14",
              border: "2.5px solid #111",
              borderRadius: "999px",
              padding: "6px 18px",
              fontWeight: 900,
              fontSize: "13px",
              color: "#111",
              boxShadow: "2.5px 2.5px 0 #111",
            }}>
              Pertanyaan {step + 1} dari {total}
            </div>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#9CA3AF" }}>
              {step} terjawab
            </div>
          </div>

          {/* ── Progress bar ── */}
          <div style={{ background: "#E5E7EB", borderRadius: "999px", height: "7px", marginBottom: "28px", overflow: "hidden" }}>
            <div style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #3B82F6, #8B5CF6)",
              height: "100%",
              borderRadius: "999px",
              transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
            }} />
          </div>

          {/* ── Question body ── */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              fontSize: "11px", fontWeight: 800, color: "#EF4444",
              letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: "10px",
            }}>
              Pertanyaan #{step + 1}
            </div>

            <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#111827", lineHeight: 1.38, margin: 0 }}>
              {question}
            </h2>
          </div>

          {/* ── Answer buttons ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "28px" }}>
            {(["YA", "TIDAK"] as Answer[]).map((opt) => {
              const isYa = opt === "YA";
              const isSelected = selected === opt;
              return (
                <button
                  key={opt}
                  className="ans-btn"
                  onClick={() => handleSelect(opt)}
                  style={{
                    padding: "13px 16px",
                    borderRadius: "14px",
                    fontWeight: 800,
                    fontSize: "15px",
                    border: isSelected
                      ? `2.5px solid ${isYa ? "#6366F1" : "#EF4444"}`
                      : "2.5px solid #E5E7EB",
                    background: isSelected
                      ? isYa ? "#EEF2FF" : "#FFF1F2"
                      : "#FFFFFF",
                    color: isSelected
                      ? isYa ? "#4F46E5" : "#E11D48"
                      : "#374151",
                    boxShadow: isSelected
                      ? isYa
                        ? "0 4px 14px rgba(99,102,241,0.18)"
                        : "0 4px 14px rgba(239,68,68,0.14)"
                      : "0 1px 6px rgba(0,0,0,0.06)",
                    transform: isSelected ? "translateY(-2px)" : "none",
                  }}
                >
                  {opt === "YA" ? "Ya" : "Tidak"}
                </button>
              );
            })}
          </div>

          {/* ── Footer ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

           <button
                onClick={handleBack}
                className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors duration-200"
              >
                Kembali
              </button>

            <div style={{ fontSize: "14px", fontWeight: 800, color: "#9CA3AF" }}>
              {step + 1} / {total}
            </div>

            <button
              className="next-btn"
              disabled={!selected}
              onClick={handleNext}
              style={{
                background: selected ? "#00E96A" : "#E5E7EB",
                border: selected ? "2.5px solid #111" : "2.5px solid transparent",
                boxShadow: selected ? "4px 4px 0 #111" : "none",
                borderRadius: "14px",
                padding: "11px 24px",
                fontWeight: 900,
                fontSize: "14px",
                color: selected ? "#111" : "#9CA3AF",
                cursor: selected ? "pointer" : "not-allowed",
              }}
            >
              Lanjut →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}