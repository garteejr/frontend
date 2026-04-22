"use client";

import { ResultType, ProfileType } from "@/app/skrining/tpyes";
import { riskConfig } from "@/app/skrining/constants";

type Props = {
  result: ResultType;
  profile: ProfileType | null;
  onDashboard: () => void;
  onReset: () => void;
  onDokter: () => void;
};

export default function ResultCard({
  result,
  profile,
  onDashboard,
  onReset,
  onDokter,
}: Props) {
  // 🔥 SAFE GUARD
  if (!result || !result.detail) {
    return <div>Data hasil tidak valid</div>;
  }

  const risk = riskConfig[result.riskLevel];

  const riskQuestions = result.detail.filter((d) => d?.risk_point > 0);
  const safeCount = result.detail.filter((d) => d?.risk_point === 0).length;
  const riskCount = riskQuestions.length;

  const riskLabel: Record<string, string> = {
    HIGH: "Risiko Tinggi",
    MODERATE: "Risiko Sedang",
    LOW: "Risiko Rendah",
  };

  const riskText: Record<string, string> = {
    HIGH: "#DC2626",
    MODERATE: "#D97706",
    LOW: "#16A34A",
  };

  function get30DaysLater() {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Hasil Skrining</h1>

      {/* SCORE */}
      <div>
        <h2>
          {result.score} / {result.detail.length}
        </h2>
        <p style={{ color: riskText[result.riskLevel] }}>
          {riskLabel[result.riskLevel]}
        </p>
      </div>

      {/* SUMMARY */}
      <div>
        <p>Aman: {safeCount}</p>
        <p>Perlu perhatian: {riskCount}</p>
      </div>

      {/* ACTION */}
      <div style={{ marginTop: 10 }}>
        <strong>Rekomendasi:</strong>
        <p>{result.action}</p>
      </div>

      {/* PROFILE */}
      {profile && (
        <div style={{ marginTop: 10 }}>
          <p>
            {profile.name} - {profile.age} tahun -{" "}
            {profile.gender === "L" ? "Laki-laki" : "Perempuan"}
          </p>
        </div>
      )}

      {/* BUTTON */}
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        {result.riskLevel !== "LOW" && (
          <button onClick={onDokter}>Cari Dokter</button>
        )}

        <button onClick={onReset}>Ulangi</button>
        <button onClick={onDashboard}>Dashboard</button>
      </div>

      {/* REMINDER */}
      <div style={{ marginTop: 20 }}>
        <p>
          Lakukan skrining ulang pada: <b>{get30DaysLater()}</b>
        </p>
      </div>
    </div>
  );
}