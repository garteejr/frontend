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

/* ── Risk theme ─────────────────────────────── */
const RISK_THEME = {
  HIGH: {
    label: "Risiko Tinggi",
    dot: "#EF4444",
    text: "#DC2626",
    softBg: "#FFF5F5",
    softBorder: "#FECACA",
    actionTitle: "Tindakan Segera Diperlukan",
    emoji: "🚨",
    rightBg: "linear-gradient(160deg,#7F1D1D 0%,#1C1917 100%)",
    headline: "Jangan tunda,\nsegera konsultasi",
    headlineEmoji: "💙",
    barColor: "#EF4444",
  },
  MODERATE: {
    label: "Risiko Sedang",
    dot: "#F59E0B",
    text: "#B45309",
    softBg: "#FFFBEB",
    softBorder: "#FDE68A",
    actionTitle: "Perlu Pemantauan",
    emoji: "⚠️",
    rightBg: "linear-gradient(160deg,#78350F 0%,#1C1917 100%)",
    headline: "Pantau terus\nperkembangan si kecil",
    headlineEmoji: "💛",
    barColor: "#F59E0B",
  },
  LOW: {
    label: "Risiko Rendah",
    dot: "#22C55E",
    text: "#15803D",
    softBg: "#F0FDF4",
    softBorder: "#BBF7D0",
    actionTitle: "Perkembangan Baik",
    emoji: "✅",
    rightBg: "linear-gradient(160deg,#14532D 0%,#1C1917 100%)",
    headline: "Si kecil\nberkembang baik!",
    headlineEmoji: "💚",
    barColor: "#22C55E",
  },
} as const;

function get30DaysLater() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

export default function ResultCard({ result, profile, onDashboard, onReset, onDokter }: Props) {
  if (!result || !result.detail) return <div style={{ padding: 24 }}>Data hasil tidak valid</div>;

  const risk   = riskConfig[result.riskLevel];
  const T      = RISK_THEME[result.riskLevel];
  const riskQ  = result.detail.filter(d => d?.risk_point > 0);
  const safeN  = result.detail.filter(d => d?.risk_point === 0).length;
  const riskN  = riskQ.length;
  const total  = result.detail.length;
  const pct    = Math.round((result.score / total) * 100);
  const R      = 44; // SVG circle radius
  const C      = 2 * Math.PI * R;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');

        .rc * { font-family:'Nunito',sans-serif; box-sizing:border-box; margin:0; padding:0; }

        /* scrollbar */
        .rc-scroll::-webkit-scrollbar { width:4px; }
        .rc-scroll::-webkit-scrollbar-thumb { background:#DDD8CE; border-radius:9px; }

        /* button base */
        .btn {
          cursor:pointer; border:none; outline:none;
          transition: transform .17s cubic-bezier(.34,1.56,.64,1), opacity .15s ease;
        }
        .btn:hover  { transform:translateY(-2px); }
        .btn:active { transform:scale(.96); }

        /* animations */
        @keyframes up {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes dashFill {
          from { stroke-dasharray:0 ${C.toFixed(1)}; }
        }
        @keyframes ping {
          0%,100% { transform:scale(1);   opacity:1; }
          50%      { transform:scale(1.6); opacity:.4; }
        }
        .a0 { animation:up .4s .00s ease both; }
        .a1 { animation:up .4s .06s ease both; }
        .a2 { animation:up .4s .12s ease both; }
        .a3 { animation:up .4s .18s ease both; }
        .a4 { animation:up .4s .24s ease both; }
        .a5 { animation:up .4s .30s ease both; }
        .gauge-arc { animation:dashFill .9s .35s cubic-bezier(.4,0,.2,1) both; }
        .ping { animation:ping 2s ease-in-out infinite; }

        /* ── PAGE ── */
        .page {
          min-height:100vh;
          background:linear-gradient(135deg,#EF4444 0%,#0D9488 50%,#2563EB 100%);
          display:flex; align-items:flex-start; justify-content:center;
          padding:24px 16px 48px;
        }

        /* ── CARD ── */
        .card {
          background:#FDFAF4; border-radius:28px;
          width:100%; max-width:1080px;
          box-shadow:0 32px 80px rgba(0,0,0,.22);
          overflow:hidden; display:flex; flex-direction:column;
        }

        /* ── TOP BAR ── */
        .topbar {
          padding:14px 28px;
          display:flex; align-items:center; gap:8px; flex-wrap:wrap;
          border-bottom:1.5px solid #EDE9DE;
        }
        .pill {
          display:inline-flex; align-items:center; gap:5px;
          border-radius:999px; padding:5px 14px;
          font-weight:800; font-size:12px; white-space:nowrap;
        }

        /* ── RAINBOW BAR ── */
        .rainbow { height:4px; background:linear-gradient(90deg,#EF4444,#F59E0B,#10B981,#3B82F6); }

        /* ── DOT ROW ── */}
        .dotrow { padding:10px 28px 8px; display:flex; flex-direction:column; gap:5px; }
        .dot { width:11px; height:11px; border-radius:50%; flex-shrink:0; }

        /* ── BODY ── */
        .body { display:flex; }
        .left {
          flex:1; padding:24px 28px 36px;
          overflow-y:auto; max-height:660px;
        }
        .right {
          width:290px; flex-shrink:0;
          display:flex; flex-direction:column;
          position:relative; overflow:hidden; min-height:500px;
        }

        /* ── SECTION LABEL ── */
        .sec-label {
          font-size:10px; font-weight:900; letter-spacing:2px;
          text-transform:uppercase; color:#A8A29E; margin-bottom:10px;
        }

        /* ── CLUSTER CARD ── */
        .cl-card {
          border-radius:14px; padding:13px 15px; margin-bottom:8px;
        }

        /* ── REFERRAL CARD ── */
        .ref-card {
          background:#fff; border:1.5px solid #EDE9DE;
          border-radius:14px; padding:14px 16px; margin-bottom:9px;
        }

        /* ── MOBILE ── */
        @media (max-width:720px) {
          .topbar   { padding:10px 14px; }
          .dotrow   { padding:8px 14px 6px; }
          .body     { flex-direction:column-reverse; }
          .left     { max-height:none; padding:16px 14px 28px; }
          .right    { width:100%; min-height:200px; }
          .score-row{ flex-direction:column !important; gap:12px !important; }
        }
        @media (max-width:400px) {
          .pill     { font-size:11px; padding:4px 10px; }
          .rh       { font-size:19px !important; }
        }
      `}</style>

      <div className="rc">
        <div className="page">
          <div className="card">

            {/* ── TOP BAR ── */}
            <div className="topbar a0">
              {/* Hasil Skrining badge */}
              <span className="pill" style={{ background:"#FADB14", border:"2.5px solid #111", color:"#111", boxShadow:"2.5px 2.5px 0 #111", fontWeight:900 }}>
                Hasil Skrining
              </span>

              {/* Risk badge */}
              <span className="pill" style={{ background:T.softBg, border:`1.5px solid ${T.softBorder}`, color:T.text }}>
                <span className="ping" style={{ width:7, height:7, borderRadius:"50%", background:T.dot, display:"inline-block", flexShrink:0 }} />
                {T.label}
              </span>

              {/* Total questions */}
              <span className="pill" style={{ background:"#F5F0E8", border:"1.5px solid #EDE9DE", color:"#78716C" }}>
                {total} pertanyaan
              </span>

              {/* Profile right */}
              {profile && (
                <span style={{ marginLeft:"auto", fontSize:"12px", fontWeight:700, color:"#A8A29E", whiteSpace:"nowrap" }}>
                  {profile.name} · {profile.age} thn
                </span>
              )}
            </div>

            {/* ── RAINBOW ── */}
            <div className="rainbow" />

            {/* ── DOT PROGRESS ── */}
            <div className="dotrow a1">
              <div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>
                {result.detail.map((item, i) => (
                  <div key={i} className="dot" style={{ background: item?.risk_point > 0 ? "#EF4444" : "#22C55E" }} />
                ))}
              </div>
              <div style={{ display:"flex", gap:"16px", fontSize:"11px", fontWeight:700, color:"#A8A29E" }}>
                <span><span style={{ color:"#22C55E" }}>●</span> Aman ({safeN})</span>
                <span><span style={{ color:"#EF4444" }}>●</span> Perlu perhatian ({riskN})</span>
              </div>
            </div>

            {/* ── BODY ── */}
            <div className="body">

              {/* ══ LEFT ══ */}
              <div className="left rc-scroll">

                {/* Score gauge */}
                <div className="score-row a2" style={{ display:"flex", gap:"22px", alignItems:"center", marginBottom:"26px" }}>
                  {/* SVG ring */}
                  <div style={{ position:"relative", width:100, height:100, flexShrink:0 }}>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r={R} fill="none" stroke="#EDE9DE" strokeWidth="9" />
                      <circle
                        className="gauge-arc"
                        cx="50" cy="50" r={R}
                        fill="none" stroke={T.dot} strokeWidth="9"
                        strokeLinecap="round"
                        strokeDasharray={`${(pct / 100) * C} ${C}`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                      <span style={{ fontSize:"28px", fontWeight:900, color:"#1C1917", lineHeight:1 }}>{result.score}</span>
                      <span style={{ fontSize:"10px", fontWeight:700, color:"#A8A29E" }}>dari {total}</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div style={{ flex:1 }}>
                    <div className="sec-label" style={{ marginBottom:"3px" }}>Skor Risiko</div>
                    <div style={{ fontSize:"38px", fontWeight:900, color:"#1C1917", lineHeight:1, marginBottom:"4px" }}>
                      {result.score}
                      <span style={{ fontSize:"18px", color:"#C8C3B8" }}> / {total}</span>
                    </div>
                    {riskN > 0 && (
                      <div style={{ fontSize:"12px", color:"#F59E0B", fontWeight:800, marginBottom:"8px" }}>
                        ⚠️ {riskN} indikator kritis
                      </div>
                    )}
                    <span className="pill" style={{ background:T.softBg, border:`1.5px solid ${T.softBorder}`, color:T.text, fontWeight:900 }}>
                      <span style={{ fontSize:"14px" }}>{T.emoji}</span> {T.label}
                    </span>
                  </div>
                </div>

                {/* Action banner */}
                <div className="a3" style={{
                  background: T.softBg, border:`1.5px solid ${T.softBorder}`,
                  borderRadius:"16px", padding:"16px 18px", marginBottom:"26px",
                }}>
                  <div style={{ fontWeight:900, fontSize:"13px", color:T.text, marginBottom:"6px" }}>
                    {T.emoji} {T.actionTitle}
                  </div>
                  <div style={{ fontSize:"13px", color:"#44403C", lineHeight:1.75 }}>{result.action}</div>
                </div>

                {/* Answer grid */}
                <div className="a4" style={{ marginBottom:"26px" }}>
                  <div className="sec-label">Ringkasan Jawaban</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(52px,1fr))", gap:"6px" }}>
                    {result.detail.map((item, i) => {
                      const bad = item?.risk_point > 0;
                      return (
                        <div key={i} style={{
                          borderRadius:"11px", padding:"8px 4px",
                          background: bad ? "#FFF1F1" : "#F0FDF4",
                          border:`1.5px solid ${bad ? "#FECACA" : "#BBF7D0"}`,
                          textAlign:"center",
                        }}>
                          <div style={{ fontSize:"10px", fontWeight:900, color: bad ? "#EF4444" : "#22C55E" }}>
                            #{item.question ?? i + 1}
                          </div>
                          <div style={{ fontSize:"12px", color: bad ? "#EF4444" : "#22C55E", marginTop:"2px" }}>
                            {bad ? "⚠" : "✓"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── Rujukan (HIGH only) ── */}
                {result.riskLevel === "HIGH" && (
                  <div className="a5" style={{ marginBottom:"24px" }}>
                    <div className="sec-label" style={{ color:"#3B82F6" }}>Rujukan Profesional</div>
                    {[
                      { title:"Dokter Spesialis Anak (Sp.A)", icon:"🏥", time:"Dalam 1 minggu",  desc:"Minta surat rujukan dan evaluasi tumbuh kembang komprehensif." },
                      { title:"Psikiater / Psikolog Anak",    icon:"🧠", time:"Dalam 2 minggu", desc:"Evaluasi perilaku, kognitif, dan emosional oleh profesional klinis." },
                    ].map((ref, i) => (
                      <div key={i} className="ref-card">
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"6px", marginBottom:"5px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"7px" }}>
                            <span style={{ fontSize:"17px" }}>{ref.icon}</span>
                            <span style={{ fontWeight:900, fontSize:"13px", color:"#1C1917" }}>{ref.title}</span>
                          </div>
                          <span className="pill" style={{ background:"#FFF7ED", color:"#EA580C", fontWeight:800, fontSize:"10px", padding:"2px 9px" }}>
                            ⏱ {ref.time}
                          </span>
                        </div>
                        <div style={{ fontSize:"12px", color:"#78716C", marginBottom:"10px" }}>{ref.desc}</div>
                        <button className="btn" onClick={onDokter} style={{
                          width:"100%", padding:"10px",
                          background:"#EF5350", borderRadius:"11px",
                          color:"#fff", fontWeight:900, fontSize:"13px",
                        }}>
                          Cari {ref.title.split(" ")[0]} Terdekat →
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Persiapan (HIGH only) ── */}
                {result.riskLevel === "HIGH" && (
                  <div style={{
                    background:"#F5F0E8", border:"1.5px solid #EDE9DE",
                    borderRadius:"14px", padding:"14px 16px", marginBottom:"14px",
                  }}>
                    <div style={{ fontWeight:900, fontSize:"11px", color:"#44403C", marginBottom:"8px", letterSpacing:"0.5px" }}>
                      📋 Persiapan Sebelum ke Dokter
                    </div>
                    {["Catat hasil skrining ini untuk dibawa ke dokter","Rekam video singkat perilaku anak sehari-hari","Catat milestone perkembangan sejak lahir","Bawa riwayat kehamilan & kelahiran"].map((t, i) => (
                      <div key={i} style={{ display:"flex", gap:"7px", fontSize:"12px", color:"#57534E", marginBottom:"4px" }}>
                        <span style={{ color:"#22C55E", fontWeight:900, flexShrink:0 }}>✓</span>{t}
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Skrining ulang ── */}
                <div style={{
                  background:"#FFF5F5", border:"1.5px dashed #FECACA",
                  borderRadius:"14px", padding:"14px 16px", marginBottom:"14px",
                }}>
                  <div style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                    <span style={{ fontSize:"18px", flexShrink:0 }}>🗓️</span>
                    <div>
                      <div style={{ fontWeight:900, fontSize:"10px", letterSpacing:"1.5px", color:"#DC2626", textTransform:"uppercase", marginBottom:"4px" }}>
                        Skrining Ulang Pasca Evaluasi
                      </div>
                      <div style={{ fontSize:"13px", color:"#DC2626", lineHeight:1.65 }}>
                        Lakukan skrining ulang dalam <strong>30 hari</strong> setelah penanganan.
                      </div>
                      <div style={{ fontSize:"11px", color:"#EF4444", fontWeight:800, marginTop:"4px" }}>
                        Target: {get30DaysLater()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Encouragement ── */}
                <div style={{
                  background:"#EFF6FF", border:"1.5px solid #BFDBFE",
                  borderRadius:"14px", padding:"14px 16px", marginBottom:"12px",
                  display:"flex", gap:"10px",
                }}>
                  <span style={{ fontSize:"18px", flexShrink:0 }}>💙</span>
                  <div style={{ fontSize:"13px", color:"#1E40AF", lineHeight:1.75 }}>
                    <strong>Ini bukan akhir perjalanan — ini awalnya.</strong> Banyak anak yang mendapat intervensi dini berkembang luar biasa. Anda sudah melakukan langkah terbaik.
                  </div>
                </div>

                <div style={{ fontSize:"10px", color:"#A8A29E", lineHeight:1.6, marginTop:"8px" }}>
                  ⚠️ Hasil ini bukan diagnosis medis. M-CHAT-R adalah alat skrining awal yang membantu mengidentifikasi anak yang memerlukan evaluasi lebih lanjut.
                </div>
              </div>

              {/* ══ RIGHT PANEL ══ */}
              <div className="right">
                {/* dark gradient bg */}
                <div style={{ position:"absolute", inset:0, background:T.rightBg, zIndex:0 }} />
                {/* subtle noise texture via SVG */}
                <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:.04, zIndex:1 }} xmlns="http://www.w3.org/2000/svg">
                  <filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
                  <rect width="100%" height="100%" filter="url(#noise)"/>
                </svg>

                {/* risk badge top-right */}
                <div style={{ position:"relative", zIndex:2, padding:"18px 18px 0", display:"flex", justifyContent:"flex-end" }}>
                  <div style={{
                    display:"flex", alignItems:"center", gap:"6px",
                    background:"rgba(255,255,255,.12)", backdropFilter:"blur(8px)",
                    border:"1px solid rgba(255,255,255,.2)",
                    borderRadius:"999px", padding:"5px 13px",
                    fontWeight:900, fontSize:"12px", color:"#fff",
                  }}>
                    <span style={{ width:7, height:7, borderRadius:"50%", background:T.dot, display:"inline-block", flexShrink:0 }} />
                    {T.label}
                  </div>
                </div>

                {/* score mini card */}
                <div style={{ position:"relative", zIndex:2, padding:"0 18px", marginTop:"auto" }}>
                  <div style={{
                    background:"rgba(255,255,255,.08)", backdropFilter:"blur(10px)",
                    border:"1px solid rgba(255,255,255,.12)",
                    borderRadius:"16px", padding:"14px 16px", marginBottom:"16px",
                    display:"flex", alignItems:"center", gap:"12px",
                  }}>
                    {/* mini ring */}
                    <div style={{ position:"relative", width:56, height:56, flexShrink:0 }}>
                      <svg width="56" height="56" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="5" />
                        <circle
                          cx="28" cy="28" r="22" fill="none"
                          stroke={T.dot} strokeWidth="5" strokeLinecap="round"
                          strokeDasharray={`${(pct / 100) * (2 * Math.PI * 22)} ${2 * Math.PI * 22}`}
                          transform="rotate(-90 28 28)"
                        />
                      </svg>
                      <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <span style={{ fontSize:"14px", fontWeight:900, color:"#fff" }}>{pct}%</span>
                      </div>
                    </div>
                    {/* stats */}
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:"10px", color:"rgba(255,255,255,.5)", fontWeight:700, marginBottom:"2px" }}>SKOR SKRINING</div>
                      <div style={{ fontSize:"22px", fontWeight:900, color:"#fff", lineHeight:1 }}>
                        {result.score}<span style={{ fontSize:"12px", color:"rgba(255,255,255,.4)" }}> / {total}</span>
                      </div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:"10px", color:"rgba(255,255,255,.5)", fontWeight:700, marginBottom:"2px" }}>KRITIS</div>
                      <div style={{ fontSize:"20px", fontWeight:900, color:T.dot, lineHeight:1 }}>{riskN}</div>
                    </div>
                  </div>

                  {/* headline */}
                  <div style={{
                    background:"rgba(0,0,0,.3)", backdropFilter:"blur(6px)",
                    borderRadius:"10px", padding:"5px 11px", display:"inline-block",
                    fontSize:"11px", color:"rgba(255,255,255,.7)", fontWeight:700, marginBottom:"10px",
                  }}>Tentang si kecil</div>

                  <div className="rh" style={{ fontSize:"22px", fontWeight:900, color:"#fff", lineHeight:1.35, marginBottom:"16px", whiteSpace:"pre-line" }}>
                    {T.headline} {T.headlineEmoji}
                  </div>

                  {/* profile */}
                  {profile && (
                    <div style={{ fontSize:"11px", color:"rgba(255,255,255,.55)", fontWeight:700, marginBottom:"16px" }}>
                      {profile.name} · {profile.age} thn · {profile.gender === "L" ? "Laki-laki" : "Perempuan"}
                    </div>
                  )}

                  {/* CTA buttons */}
                  <div style={{ display:"flex", flexDirection:"column", gap:"7px", paddingBottom:"18px" }}>
                    {/* Cari dokter ONLY for HIGH */}
                    {result.riskLevel === "HIGH" && (
                      <button className="btn" onClick={onDokter} style={{
                        width:"100%", padding:"11px 16px",
                        background:"#EF5350", border:"2.5px solid #111",
                        borderRadius:"12px", color:"#fff",
                        fontWeight:900, fontSize:"13px",
                        boxShadow:"3px 3px 0 rgba(0,0,0,.4)",
                      }}>
                        📞 Cari Dokter Sekarang
                      </button>
                    )}
                    <div style={{ display:"flex", gap:"7px" }}>
                      <button className="btn" onClick={onReset} style={{
                        flex:1, padding:"10px",
                        background:"rgba(255,255,255,.1)", backdropFilter:"blur(6px)",
                        border:"1.5px solid rgba(255,255,255,.3)",
                        borderRadius:"12px", color:"#fff", fontWeight:800, fontSize:"12px",
                      }}>↩ Ulangi</button>
                      <button className="btn" onClick={onDashboard} style={{
                        flex:1, padding:"10px",
                        background:"rgba(255,255,255,.1)", backdropFilter:"blur(6px)",
                        border:"1.5px solid rgba(255,255,255,.3)",
                        borderRadius:"12px", color:"#fff", fontWeight:800, fontSize:"12px",
                      }}>🏠 Dashboard</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>{/* body */}
          </div>{/* card */}
        </div>
      </div>
    </>
  );
}