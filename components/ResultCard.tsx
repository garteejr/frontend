"use client";

import { ResultType, ProfileType } from "@/app/skrining/tpyes";
import { riskConfig } from "@/app/skrining/constants";

type Props = {
  result: ResultType;
  profile: ProfileType | null;
  onDashboard: () => void;
  onReset: () => void;
  onPricing: () => void;
  onDokter: () => void;
  onBelajar: () => void;
};

const DOMAIN_CLUSTERS: Record<number, { label: string; icon: string; color: string; bg: string; border: string }> = {
  2:  { label: "KETERLAMBATAN BICARA & KOMUNIKASI", icon: "💬", color: "#3B3B98", bg: "#EEF0FF", border: "#C7CAFF" },
  6:  { label: "KETERLAMBATAN BICARA & KOMUNIKASI", icon: "💬", color: "#3B3B98", bg: "#EEF0FF", border: "#C7CAFF" },
  7:  { label: "KETERLAMBATAN BICARA & KOMUNIKASI", icon: "💬", color: "#3B3B98", bg: "#EEF0FF", border: "#C7CAFF" },
  9:  { label: "KETERLAMBATAN BICARA & KOMUNIKASI", icon: "💬", color: "#3B3B98", bg: "#EEF0FF", border: "#C7CAFF" },
  17: { label: "KETERLAMBATAN BICARA & KOMUNIKASI", icon: "💬", color: "#3B3B98", bg: "#EEF0FF", border: "#C7CAFF" },
  18: { label: "KETERLAMBATAN BICARA & KOMUNIKASI", icon: "💬", color: "#3B3B98", bg: "#EEF0FF", border: "#C7CAFF" },
  1:  { label: "KONTAK MATA & RESPONS SOSIAL",      icon: "👁️", color: "#7C3AED", bg: "#F3E8FF", border: "#DDD6FE" },
  10: { label: "KONTAK MATA & RESPONS SOSIAL",      icon: "👁️", color: "#7C3AED", bg: "#F3E8FF", border: "#DDD6FE" },
  14: { label: "KONTAK MATA & RESPONS SOSIAL",      icon: "👁️", color: "#7C3AED", bg: "#F3E8FF", border: "#DDD6FE" },
  16: { label: "KONTAK MATA & RESPONS SOSIAL",      icon: "👁️", color: "#7C3AED", bg: "#F3E8FF", border: "#DDD6FE" },
  5:  { label: "PERILAKU BERULANG (REPETITIVE)",    icon: "🔄", color: "#B45309", bg: "#FFFBEB", border: "#FDE68A" },
  8:  { label: "KONTAK MATA & RESPONS SOSIAL",      icon: "👁️", color: "#7C3AED", bg: "#F3E8FF", border: "#DDD6FE" },
  11: { label: "KONTAK MATA & RESPONS SOSIAL",      icon: "👁️", color: "#7C3AED", bg: "#F3E8FF", border: "#DDD6FE" },
  12: { label: "SENSORI SENSITIF",                  icon: "👂", color: "#0E7490", bg: "#ECFEFF", border: "#A5F3FC" },
  19: { label: "KONTAK MATA & RESPONS SOSIAL",      icon: "👁️", color: "#7C3AED", bg: "#F3E8FF", border: "#DDD6FE" },
  20: { label: "KONTAK MATA & RESPONS SOSIAL",      icon: "👁️", color: "#7C3AED", bg: "#F3E8FF", border: "#DDD6FE" },
  3:  { label: "CARA BERMAIN & INTERAKSI SOSIAL",   icon: "🧩", color: "#065F46", bg: "#ECFDF5", border: "#A7F3D0" },
  15: { label: "CARA BERMAIN & INTERAKSI SOSIAL",   icon: "🧩", color: "#065F46", bg: "#ECFDF5", border: "#A7F3D0" },
  4:  { label: "CARA BERMAIN & INTERAKSI SOSIAL",   icon: "🧩", color: "#065F46", bg: "#ECFDF5", border: "#A7F3D0" },
  13: { label: "SENSORI SENSITIF",                  icon: "👂", color: "#0E7490", bg: "#ECFEFF", border: "#A5F3FC" },
};

const CLUSTER_DESCRIPTIONS: Record<string, string> = {
  "KETERLAMBATAN BICARA & KOMUNIKASI": "Anak belum menunjukkan minat berkomunikasi atau menggunakan gestur untuk berbagi informasi.",
  "PERILAKU BERULANG (REPETITIVE)":    "Anak menunjukkan gerakan atau minat yang berulang-ulang secara tidak biasa.",
  "KONTAK MATA & RESPONS SOSIAL":      "Anak kurang merespons saat dipanggil, menghindari kontak mata, atau tidak bereaksi terhadap ekspresi wajah.",
  "CARA BERMAIN & INTERAKSI SOSIAL":   "Anak kurang tertarik bermain bersama orang lain, meniru, atau bermain pura-pura.",
  "SENSORI SENSITIF":                  "Anak menunjukkan reaksi tidak biasa terhadap suara, cahaya, tekstur, atau sensasi fisik.",
};

const SEVERITY_COLOR: Record<string, { bg: string; text: string }> = {
  berat:  { bg: "#FFE4E4", text: "#DC2626" },
  sedang: { bg: "#FEF3C7", text: "#D97706" },
  ringan: { bg: "#DCFCE7", text: "#16A34A" },
};

function get30DaysLater() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function ResultCard({ result, profile, onDashboard, onReset, onDokter }: Props) {
  const risk = riskConfig[result.riskLevel];
  const riskQuestions = result.detail.filter((d) => d.risk_point > 0);
  const safeCount     = result.detail.filter((d) => d.risk_point === 0).length;
  const riskCount     = riskQuestions.length;

  const clusterMap: Record<string, { questions: number[]; severity: string; info: typeof DOMAIN_CLUSTERS[number] }> = {};
  riskQuestions.forEach((item) => {
    const cluster = DOMAIN_CLUSTERS[item.question];
    if (!cluster) return;
    if (!clusterMap[cluster.label]) clusterMap[cluster.label] = { questions: [], severity: "ringan", info: cluster };
    clusterMap[cluster.label].questions.push(item.question);
  });

  const clusterEntries = Object.entries(clusterMap);
  clusterEntries.forEach(([, val], i) => {
    val.severity =
      i === 0 ? (result.riskLevel === "HIGH" ? "berat" : result.riskLevel === "MODERATE" ? "sedang" : "ringan")
      : i === 1 ? (result.riskLevel === "HIGH" ? "sedang" : "ringan")
      : "ringan";
  });

  const chipIcons  = ["💬", "🔄", "👁️", "🧩", "👂"];
  const chipLabels = clusterEntries.map(([label]) => {
    const w = label.split(" ")[0];
    return w === "KETERLAMBATAN" ? "Keterlambatan"
      : w === "PERILAKU" ? "Perilaku"
      : w === "KONTAK"   ? "Kontak"
      : w === "CARA"     ? "Cara"
      : "Sensori";
  });

  const riskLabel:  Record<string, string> = { HIGH: "Risiko Tinggi", MODERATE: "Risiko Sedang", LOW: "Risiko Rendah" };
  const riskDot:    Record<string, string> = { HIGH: "#EF4444", MODERATE: "#FBBF24", LOW: "#4ADE80" };
  const riskText:   Record<string, string> = { HIGH: "#DC2626", MODERATE: "#D97706", LOW: "#16A34A" };
  const riskBorder: Record<string, string> = { HIGH: "#FECACA", MODERATE: "#FDE68A", LOW: "#BBF7D0" };
  const riskBg:     Record<string, string> = { HIGH: "#FFF0F0", MODERATE: "#FFFBEB", LOW: "#F0FDF4" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        .rc * { font-family: 'Nunito', sans-serif; box-sizing: border-box; }
        .rc-scroll::-webkit-scrollbar { width: 4px; }
        .rc-scroll::-webkit-scrollbar-thumb { background: #D1D5DB; border-radius: 99px; }
        .rc-btn { transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer; border: none; }
        .rc-btn:hover  { transform: translateY(-2px); }
        .rc-btn:active { transform: scale(0.97); }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rc-a0 { animation: fadeUp 0.4s 0.00s ease both; }
        .rc-a1 { animation: fadeUp 0.4s 0.07s ease both; }
        .rc-a2 { animation: fadeUp 0.4s 0.14s ease both; }
        .rc-a3 { animation: fadeUp 0.4s 0.21s ease both; }

        /* Desktop: side-by-side */
        .rc-body  { display: flex; flex-direction: row; }
        .rc-left  { flex: 1; overflow-y: auto; max-height: 600px; padding: 22px 28px 32px; }
        .rc-right { width: 320px; flex-shrink: 0; position: relative; overflow: hidden; display: flex; flex-direction: column; min-height: 480px; }

        /* Tablet */
        @media (max-width: 900px) {
          .rc-right { width: 260px; }
        }

        /* Mobile: stack vertically */
        @media (max-width: 700px) {
          .rc-body { flex-direction: column-reverse; }
          .rc-left { max-height: none; padding: 16px 16px 28px; }
          .rc-right { width: 100%; min-height: 220px; }
          .rc-header { padding: 10px 14px !important; }
          .rc-dots-wrap { padding: 10px 14px 4px !important; }
          .rc-score-row { flex-direction: column; gap: 10px !important; }
        }
        @media (max-width: 420px) {
          .rc-badge { font-size: 11px !important; padding: 4px 10px !important; }
          .rc-right-title { font-size: 20px !important; }
        }
      `}</style>

      <div className="rc" style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #EF4444 0%, #0D9488 50%, #2563EB 100%)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "20px",
      }}>
        <div style={{
          background: "#FDFAF4", borderRadius: "24px",
          width: "100%", maxWidth: "1100px",
          overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
          display: "flex", flexDirection: "column",
        }}>

          {/* HEADER */}
          <div className="rc-header" style={{
            padding: "14px 28px", display: "flex", alignItems: "center",
            gap: "9px", borderBottom: "1.5px solid #F3F4F6", flexWrap: "wrap",
          }}>
            <span className="rc-badge" style={{
              background: "#FADB14", border: "2px solid #111", borderRadius: "999px",
              padding: "5px 15px", fontWeight: 900, fontSize: "13px", color: "#111",
              boxShadow: "2px 2px 0 #111", whiteSpace: "nowrap",
            }}>Hasil Skrining</span>

            <span className="rc-badge" style={{
              display: "flex", alignItems: "center", gap: "5px",
              background: riskBg[result.riskLevel], border: `1.5px solid ${riskBorder[result.riskLevel]}`,
              borderRadius: "999px", padding: "5px 13px",
              fontWeight: 800, fontSize: "13px", color: riskText[result.riskLevel], whiteSpace: "nowrap",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: riskDot[result.riskLevel], display: "inline-block" }} />
              {riskLabel[result.riskLevel]}
            </span>

            {clusterEntries.length > 0 && (
              <span className="rc-badge" style={{
                background: "#F9FAFB", border: "1.5px solid #E5E7EB",
                borderRadius: "999px", padding: "5px 13px",
                fontWeight: 700, fontSize: "13px", color: "#6B7280", whiteSpace: "nowrap",
              }}>
                {clusterEntries.length} area
              </span>
            )}

            <span style={{ marginLeft: "auto", fontSize: "12px", fontWeight: 700, color: "#9CA3AF", whiteSpace: "nowrap" }}>
              {result.detail.length} pertanyaan selesai
            </span>
          </div>

          {/* GRADIENT BAR */}
          <div style={{ height: "5px", background: "linear-gradient(90deg, #EF4444, #F59E0B, #10B981, #3B82F6)" }} />

          {/* DOTS */}
          <div className="rc-dots-wrap" style={{ padding: "10px 28px 6px", display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              {result.detail.map((item, i) => (
                <div key={i} style={{
                  width: 11, height: 11, borderRadius: "50%", flexShrink: 0,
                  background: item.risk_point > 0 ? "#EF4444" : "#22C55E",
                }} />
              ))}
            </div>
            <div style={{ display: "flex", gap: "14px", fontSize: "11px", fontWeight: 700, color: "#9CA3AF" }}>
              <span><span style={{ color: "#22C55E" }}>●</span> Aman ({safeCount})</span>
              <span><span style={{ color: "#EF4444" }}>●</span> Perlu perhatian ({riskCount})</span>
            </div>
          </div>

          {/* BODY */}
          <div className="rc-body">

            {/* LEFT */}
            <div className="rc-left rc-scroll">

              {/* Score */}
              <div className="rc-score-row rc-a0" style={{ display: "flex", gap: "18px", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ position: "relative", width: 84, height: 84, flexShrink: 0 }}>
                  <svg width="84" height="84" viewBox="0 0 84 84">
                    <circle cx="42" cy="42" r="35" fill="none" stroke="#F3F4F6" strokeWidth="7" />
                    <circle
                      cx="42" cy="42" r="35" fill="none"
                      stroke={riskDot[result.riskLevel]}
                      strokeWidth="7"
                      strokeDasharray={`${(result.score / result.detail.length) * 219.9} 219.9`}
                      strokeLinecap="round"
                      transform="rotate(-90 42 42)"
                    />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "21px", fontWeight: 900, color: "#111827", lineHeight: 1 }}>{result.score}</span>
                    <span style={{ fontSize: "9px", color: "#9CA3AF", fontWeight: 700 }}>dari {result.detail.length}</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "1.5px", color: "#9CA3AF", marginBottom: "3px" }}>SKOR RISIKO</div>
                  <div style={{ fontSize: "27px", fontWeight: 900, color: "#111827", lineHeight: 1 }}>
                    {result.score} <span style={{ fontSize: "15px", color: "#9CA3AF" }}>/ {result.detail.length}</span>
                  </div>
                  {riskCount > 0 && (
                    <div style={{ fontSize: "11px", color: "#F59E0B", fontWeight: 700, marginTop: "3px" }}>⚠️ {riskCount} item kritis</div>
                  )}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "5px", marginTop: "7px",
                    background: riskBg[result.riskLevel], border: `1.5px solid ${riskBorder[result.riskLevel]}`,
                    borderRadius: "999px", padding: "4px 12px",
                  }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: riskDot[result.riskLevel], display: "inline-block" }} />
                    <span style={{ fontWeight: 800, fontSize: "12px", color: riskText[result.riskLevel] }}>{riskLabel[result.riskLevel]}</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="rc-a1" style={{
                background: riskBg[result.riskLevel], border: `1.5px solid ${riskBorder[result.riskLevel]}`,
                borderRadius: "14px", padding: "14px 16px", marginBottom: "20px",
              }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "17px" }}>{risk.icon}</span>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: "13px", color: riskText[result.riskLevel], marginBottom: "5px" }}>
                      {result.riskLevel === "HIGH" ? "Diperlukan Tindakan Segera"
                        : result.riskLevel === "MODERATE" ? "Perlu Pemantauan Lanjutan"
                        : "Perkembangan Baik"}
                    </div>
                    <div style={{ fontSize: "12px", color: "#374151", lineHeight: 1.6 }}>{result.action}</div>
                  </div>
                </div>
              </div>

              {/* Clusters */}
              {clusterEntries.length > 0 && (
                <>
                  <div style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "1.5px", color: riskText[result.riskLevel], marginBottom: "9px" }}>
                    AREA KRITIS YANG TERDETEKSI ({clusterEntries.length})
                  </div>
                  <div className="rc-a2" style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "22px" }}>
                    {clusterEntries.map(([label, val], i) => {
                      const sc = SEVERITY_COLOR[val.severity] || SEVERITY_COLOR.ringan;
                      return (
                        <div key={i} style={{ background: val.info.bg, border: `1.5px solid ${val.info.border}`, borderRadius: "13px", padding: "12px 14px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "5px", marginBottom: "3px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <span style={{ fontSize: "14px" }}>{val.info.icon}</span>
                              <span style={{ fontWeight: 900, fontSize: "11px", color: val.info.color }}>{label}</span>
                            </div>
                            <span style={{ background: sc.bg, color: sc.text, fontWeight: 800, fontSize: "10px", borderRadius: "999px", padding: "2px 8px" }}>
                              {val.severity}
                            </span>
                          </div>
                          <div style={{ fontSize: "11px", color: "#6B7280", fontWeight: 600, marginBottom: "3px" }}>
                            {val.questions.length} indikator: {val.questions.map(q => `#${q}`).join(", ")}
                          </div>
                          <div style={{ fontSize: "12px", color: "#374151" }}>{CLUSTER_DESCRIPTIONS[label]}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Rujukan */}
              {(result.riskLevel === "HIGH" || result.riskLevel === "MODERATE") && (
                <>
                  <div style={{ fontSize: "10px", fontWeight: 900, letterSpacing: "1.5px", color: "#3B82F6", marginBottom: "9px" }}>
                    RUJUKAN PROFESIONAL YANG DISARANKAN
                  </div>
                  <div className="rc-a3" style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                    {[
                      { title: "Dokter Spesialis Anak (Sp.A)", icon: "🏥", time: "Dalam 1 minggu",  desc: "Langkah pertama: minta surat rujukan dan evaluasi tumbuh kembang komprehensif." },
                      { title: "Psikiater / Psikolog Anak",    icon: "🧠", time: "Dalam 2 minggu", desc: "Evaluasi perilaku, kognitif, dan emosional secara mendalam oleh profesional klinis." },
                    ].map((ref, i) => (
                      <div key={i} style={{ background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: "13px", padding: "12px 14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "5px", marginBottom: "4px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "16px" }}>{ref.icon}</span>
                            <span style={{ fontWeight: 900, fontSize: "12px", color: "#111827" }}>{ref.title}</span>
                          </div>
                          <span style={{ background: "#FFF7ED", color: "#EA580C", fontWeight: 700, fontSize: "10px", borderRadius: "999px", padding: "2px 8px" }}>
                            ⏱ {ref.time}
                          </span>
                        </div>
                        <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "8px" }}>{ref.desc}</div>
                        <button className="rc-btn" onClick={onDokter} style={{
                          width: "100%", padding: "9px", background: "#EF5350",
                          borderRadius: "10px", color: "#fff", fontWeight: 800, fontSize: "12px",
                        }}>
                          Cari {ref.title.split(" ")[0]} Terdekat →
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Persiapan */}
              {result.riskLevel === "HIGH" && (
                <div style={{ background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: "13px", padding: "12px 14px", marginBottom: "12px" }}>
                  <div style={{ fontWeight: 900, fontSize: "11px", color: "#374151", marginBottom: "7px" }}>📋 PERSIAPAN SEBELUM KE DOKTER</div>
                  {["Catat hasil skrining ini untuk dibawa ke dokter","Rekam video singkat perilaku anak sehari-hari","Catat milestone perkembangan sejak lahir","Bawa riwayat kehamilan & kelahiran"].map((tip, i) => (
                    <div key={i} style={{ fontSize: "12px", color: "#374151", display: "flex", gap: "6px", marginBottom: "3px" }}>
                      <span style={{ color: "#22C55E", fontWeight: 900 }}>✓</span> {tip}
                    </div>
                  ))}
                </div>
              )}

              {/* Skrining ulang */}
              <div style={{ background: "#FFF5F5", border: "1.5px dashed #FECACA", borderRadius: "13px", padding: "12px 14px", marginBottom: "12px" }}>
                <div style={{ display: "flex", gap: "9px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "17px" }}>🗓️</span>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: "10px", letterSpacing: "1px", color: "#DC2626", marginBottom: "3px" }}>SKRINING ULANG PASCA EVALUASI</div>
                    <div style={{ fontSize: "12px", color: "#DC2626", lineHeight: 1.6 }}>
                      Setelah mendapat penanganan dari profesional, lakukan skrining ulang dalam <strong>30 hari.</strong>
                    </div>
                    <div style={{ fontSize: "11px", color: "#EF4444", fontWeight: 700, marginTop: "3px" }}>Target: {get30DaysLater()}</div>
                  </div>
                </div>
              </div>

              {/* Encouragement */}
              <div style={{ background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: "13px", padding: "12px 14px", marginBottom: "10px", display: "flex", gap: "9px" }}>
                <span style={{ fontSize: "17px" }}>💙</span>
                <div style={{ fontSize: "12px", color: "#1E40AF", lineHeight: 1.7 }}>
                  <strong>Ingat: ini bukan akhir perjalanan, ini awalnya.</strong> Banyak anak yang mendapat intervensi dini berkembang luar biasa. Anda sudah melakukan langkah terbaik dengan melakukan skrining ini.
                </div>
              </div>

              <div style={{ fontSize: "10px", color: "#9CA3AF", marginTop: "10px", lineHeight: 1.6 }}>
                ⚠️ Hasil ini bukan diagnosis medis. M-CHAT-R adalah alat skrining awal yang membantu mengidentifikasi anak yang memerlukan evaluasi lebih lanjut.
              </div>
            </div>

            {/* RIGHT */}
            <div className="rc-right">
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(17,24,39,.2) 0%,rgba(17,24,39,.6) 50%,rgba(17,24,39,.97) 100%)", zIndex: 1 }} />

              {/* Badge top-right */}
              <div style={{ position: "relative", zIndex: 2, padding: "16px 16px 0", display: "flex", justifyContent: "flex-end" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  background: "#fff", border: "2px solid #E5E7EB", borderRadius: "999px",
                  padding: "5px 12px", fontWeight: 900, fontSize: "12px", color: riskText[result.riskLevel],
                }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: riskDot[result.riskLevel], display: "inline-block" }} />
                  {riskLabel[result.riskLevel]}
                </div>
              </div>

              {/* Bottom */}
              <div style={{ position: "relative", zIndex: 2, marginTop: "auto", padding: "16px" }}>
                <div style={{
                  background: "rgba(0,0,0,0.46)", backdropFilter: "blur(4px)",
                  borderRadius: "9px", padding: "5px 11px", display: "inline-block",
                  fontSize: "11px", color: "#E5E7EB", fontWeight: 700, marginBottom: "9px",
                }}>Tentang si kecil</div>

                <div className="rc-right-title" style={{ fontSize: "22px", fontWeight: 900, color: "#fff", lineHeight: 1.3, marginBottom: "12px" }}>
                  {result.riskLevel === "HIGH"   ? <>Jangan tunda,<br />segera konsultasi 💙</>
                   : result.riskLevel === "MODERATE" ? <>Pantau terus<br />perkembangan si kecil 💛</>
                   : <>Si kecil<br />berkembang baik! 💚</>}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
                  {chipLabels.map((chip, i) => (
                    <span key={i} style={{
                      background: "rgba(255,255,255,0.13)", backdropFilter: "blur(4px)",
                      border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px",
                      padding: "3px 10px", fontSize: "11px", fontWeight: 700, color: "#fff",
                    }}>
                      {chipIcons[i] ?? "📌"} {chip}
                    </span>
                  ))}
                </div>

                {profile && (
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 600, marginBottom: "12px" }}>
                    {profile.name} · {profile.age} tahun · {profile.gender === "L" ? "Laki-laki" : "Perempuan"}
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {result.riskLevel !== "LOW" && (
                    <button className="rc-btn" onClick={onDokter} style={{
                      width: "100%", padding: "10px",
                      background: "#EF5350", border: "2.5px solid #111",
                      borderRadius: "10px", color: "#fff", fontWeight: 900, fontSize: "13px",
                      boxShadow: "3px 3px 0 #111",
                    }}>
                      📞 Cari Dokter Sekarang
                    </button>
                  )}
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button className="rc-btn" onClick={onReset} style={{
                      flex: 1, padding: "9px", background: "transparent",
                      border: "2px solid #fff", borderRadius: "10px",
                      color: "#fff", fontWeight: 800, fontSize: "12px",
                    }}>↩ Ulangi</button>
                    <button className="rc-btn" onClick={onDashboard} style={{
                      flex: 1, padding: "9px", background: "transparent",
                      border: "2px solid #fff", borderRadius: "10px",
                      color: "#fff", fontWeight: 800, fontSize: "12px",
                    }}>🏠 Dashboard</button>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* rc-body */}
        </div>
      </div>
    </>
  );
}