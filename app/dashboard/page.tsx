"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const isSubscribed = false;

const menuItems = [
  { label: "Home", icon: "📊", link: "/" },
  { label: "Skrining", icon: "🔍", link: "/skrining" },
  { label: "Belajar", icon: "🎓", link: "/belajar", requireSubscription: true },
  { label: "Perkembangan", icon: "📈", link: "/perkembangan" },
];

const days = [
  { label: "Sen, 23", active: false },
  { label: "Sel, 24", active: false },
  { label: "Rab, 25", active: false },
  { label: "Kam, 26", active: false },
  { label: "Jum, 27", active: false },
  { label: "Sab, 28", active: true },
  { label: "Min, 29", active: false, disabled: true },
];

const progressData = [
  { label: "1", skor: 14, sesi: 2 },
  { label: "2", skor: 13, sesi: 3 },
  { label: "3", skor: 11, sesi: 2 },
  { label: "4", skor: 10, sesi: 4 },
  { label: "5", skor: 9, sesi: 3 },
  { label: "6", skor: 8, sesi: 4 },
  { label: "7", skor: 8, sesi: 3 },
  { label: "8", skor: 7, sesi: 5 },
];

const sessions = [
  { name: "Terapi Wicara", time: "Senin, 09.00–10.00", done: true, color: "bg-red-500" },
  { name: "Terapi ABA", time: "Rabu, 13.00–14.30", done: true, color: "bg-gray-800" },
  { name: "Terapi Okupasi", time: "Jumat, 10.00–11.00", done: false, color: "bg-blue-500" },
];

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDay, setActiveDay] = useState("Sab, 28");

  const firstName = user?.firstName || "Pengguna";
  const fullName = user?.fullName || "Pengguna";

  const maxSkor = 20;
  const maxSesi = 6;

  const chartW = 500;
  const chartH = 120;
  const padX = 20;
  const padY = 10;
  const innerW = chartW - padX * 2;
  const innerH = chartH - padY * 2;

  const skorPoints = progressData.map((d, i) => ({
    x: padX + (i / (progressData.length - 1)) * innerW,
    y: padY + innerH - (d.skor / maxSkor) * innerH,
  }));

  const sesiPoints = progressData.map((d, i) => ({
    x: padX + (i / (progressData.length - 1)) * innerW,
    y: padY + innerH - (d.sesi / maxSesi) * innerH,
  }));

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="flex min-h-screen bg-[#f0ede6] font-sans">

      {/* ===== SIDEBAR DESKTOP ===== */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1e2435] text-white fixed h-full z-20 py-7 px-5">
        <div className="mb-8">
          <h1 className="text-base font-extrabold text-white tracking-tight">Autify</h1>
          <p className="text-white/30 text-xs mt-0.5 tracking-widest uppercase">Pantau Anak Anda</p>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-300 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {firstName[0]}
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm truncate">{fullName}</p>
            <span className="text-xs bg-yellow-400 text-gray-900 font-bold px-2 py-0.5 rounded-full">
              {isSubscribed ? "Pro" : "Sedang"}
            </span>
          </div>
        </div>

        <p className="text-white/30 text-[10px] font-bold tracking-widest mb-2 uppercase">Utama</p>
        <nav className="flex flex-col gap-0.5 mb-6">
          {menuItems.map((item) => {
            const isActive = pathname === item.link;
            const locked = item.requireSubscription && !isSubscribed;
            return (
              <button
                key={item.label}
                onClick={() => locked ? router.push("/pricing") : router.push(item.link)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${isActive
                    ? "bg-yellow-400 text-gray-900"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </span>
                {locked && <span className="text-xs opacity-60">🔒</span>}
              </button>
            );
          })}
        </nav>

        {!isSubscribed && (
          <button
            onClick={() => router.push("/pricing")}
            className="mt-auto w-full py-2.5 rounded-2xl bg-gradient-to-r from-orange-400 to-green-400 text-white font-bold text-sm hover:opacity-90 transition"
          >
            🔓 Upgrade Pro
          </button>
        )}
      </aside>

      {/* ===== MOBILE SIDEBAR ===== */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="w-64 bg-[#1e2435] text-white p-6 flex flex-col h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="font-extrabold text-white">Autify</h1>
              <button onClick={() => setSidebarOpen(false)} className="text-white/40 text-xl">✕</button>
            </div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-yellow-300 flex items-center justify-center text-white font-bold text-sm shrink-0">
                {firstName[0]}
              </div>
              <div className="min-w-0">
                <p className="text-white font-bold text-sm truncate">{fullName}</p>
                <span className="text-xs bg-yellow-400 text-gray-900 font-bold px-2 py-0.5 rounded-full">Sedang</span>
              </div>
            </div>
            <nav className="flex flex-col gap-0.5">
              {menuItems.map((item) => {
                const locked = item.requireSubscription && !isSubscribed;
                return (
                  <button
                    key={item.label}
                    onClick={() => { setSidebarOpen(false); locked ? router.push("/pricing") : router.push(item.link); }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/10 hover:text-white transition"
                  >
                    <span className="flex items-center gap-2.5"><span>{item.icon}</span>{item.label}</span>
                    {locked && <span className="text-xs">🔒</span>}
                  </button>
                );
              })}
            </nav>
            {!isSubscribed && (
              <button onClick={() => router.push("/pricing")} className="mt-auto w-full py-2.5 rounded-2xl bg-gradient-to-r from-orange-400 to-green-400 text-white font-bold text-sm">
                🔓 Upgrade Pro
              </button>
            )}
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 md:ml-64 min-h-screen min-w-0">

        {/* Top Bar */}
        <div className="bg-[#f0ede6] sticky top-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-black/10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-gray-700 text-xl mr-1 shrink-0"
            >
              ☰
            </button>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight truncate">
                Dashboard Pemantauan
              </h2>
              <p className="text-gray-400 text-xs truncate hidden sm:block">
                Sabtu, 28 Maret 2026 · Minggu ke-12 Program
              </p>
              <p className="text-gray-400 text-xs sm:hidden">
                Sab, 28 Mar · Minggu ke-12
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => router.push("/skrining")}
              className="px-3 sm:px-4 py-2 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition"
            >
              + Skrining
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">

          {/* Day Selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
            {days.map((d) => (
              <button
                key={d.label}
                onClick={() => !d.disabled && setActiveDay(d.label)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border-2 whitespace-nowrap transition
                  ${activeDay === d.label
                    ? "bg-gray-900 text-white border-gray-900"
                    : d.disabled
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-900 text-gray-900 hover:bg-gray-100"
                  }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {[
              { icon: "📊", label: "SKOR RISIKO M-CHAT", value: "7", sub: "▼ 2 poin dari skrining lalu", subColor: "text-red-500", border: "border-t-red-400" },
              { icon: "📋", label: "SESI SELESAI", value: "34", sub: "▲ 4 sesi minggu ini", subColor: "text-green-500", border: "border-t-blue-400" },
              { icon: "⭐", label: "MILESTONE TERCAPAI", value: "12", sub: "▲ 3 bulan ini", subColor: "text-green-500", border: "border-t-green-400" },
              { icon: "📅", label: "HARI PROGRAM", value: "83", sub: "dari 90 hari target", subColor: "text-gray-400", border: "border-t-yellow-400" },
            ].map((card, i) => (
              <div key={i} className={`bg-white rounded-2xl p-4 sm:p-5 border-2 border-gray-100 border-t-4 ${card.border} shadow-sm`}>
                <span className="text-xl sm:text-2xl mb-2 block">{card.icon}</span>
                <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1 leading-tight">{card.label}</p>
                <p className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">{card.value}</p>
                <p className={`text-[11px] sm:text-xs font-semibold ${card.subColor} leading-tight`}>{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Alert Banner */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 sm:px-5 py-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <span className="text-2xl shrink-0">🔍</span>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-bold text-sm">Risiko Sedang — Pemantauan Aktif</p>
              <p className="text-gray-500 text-xs mt-0.5">
                3 area dalam pemantauan: Komunikasi, Kontak Mata, Perilaku Berulang. Skrining ulang dijadwal 14 April 2026.
              </p>
            </div>
            <div className="flex gap-2 shrink-0 flex-wrap">
              <span className="text-xs bg-yellow-300 text-yellow-900 font-bold px-3 py-1 rounded-full whitespace-nowrap">● Sedang</span>
              <span className="text-xs bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full whitespace-nowrap">↓ Membaik</span>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Grafik Line Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-100 shadow-sm min-w-0 overflow-hidden">
              <div className="flex items-start sm:items-center justify-between mb-1 gap-2">
                <div className="min-w-0">
                  <h3 className="font-extrabold text-gray-900 text-sm sm:text-base">Tren Perkembangan</h3>
                  <p className="text-gray-400 text-xs">Skor risiko 8 minggu terakhir</p>
                </div>
                <select className="text-xs sm:text-sm border-2 border-gray-200 rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 font-semibold text-gray-700 bg-white shrink-0">
                  <option>8 Minggu</option>
                  <option>4 Minggu</option>
                  <option>3 Bulan</option>
                </select>
              </div>

              <div className="flex gap-4 mb-3 mt-3">
                <span className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                  <span className="w-4 h-0.5 bg-red-400 inline-block rounded" /> Skor Risiko
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                  <span className="w-4 h-0.5 border-t-2 border-dashed border-blue-400 inline-block" /> Sesi Selesai
                </span>
              </div>

              <div className="w-full overflow-hidden">
                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-28 sm:h-36" preserveAspectRatio="none">
                  {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                    <line key={i} x1={padX} x2={chartW - padX} y1={padY + t * innerH} y2={padY + t * innerH} stroke="#e5e7eb" strokeWidth="1" />
                  ))}
                  <path d={toPath(skorPoints)} fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  {skorPoints.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="4" fill="#f87171" />
                  ))}
                  <path d={toPath(sesiPoints)} fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6 3" strokeLinecap="round" strokeLinejoin="round" />
                  {sesiPoints.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="3" fill="#60a5fa" />
                  ))}
                  {[20, 15, 10, 5].map((v, i) => (
                    <text key={i} x={padX - 4} y={padY + innerH - (v / maxSkor) * innerH + 4} fontSize="9" fill="#9ca3af" textAnchor="end">{v}</text>
                  ))}
                </svg>
              </div>
            </div>

            {/* Sesi Panel */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 border-2 border-gray-100 shadow-sm">
              <h3 className="font-extrabold text-gray-900 mb-0.5 text-sm sm:text-base">Sesi Minggu Ini</h3>
              <p className="text-gray-400 text-xs mb-4 sm:mb-5">3 sesi terjadwal</p>
              <div className="flex flex-col gap-3 sm:gap-4">
                {sessions.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${s.color} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">{s.name}</p>
                      <p className="text-xs text-gray-400">{s.time}</p>
                    </div>
                    {s.done ? (
                      <span className="text-xs text-green-600 font-bold whitespace-nowrap">✓ Selesai</span>
                    ) : (
                      <span className="text-xs text-gray-400 font-semibold whitespace-nowrap">Terjadwal</span>
                    )}
                  </div>
                ))}
              </div>

              {!isSubscribed && (
                <button
                  onClick={() => router.push("/pricing")}
                  className="mt-5 sm:mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-400 to-green-400 text-white font-bold text-sm hover:opacity-90 transition"
                >
                  🔓 Upgrade Pro
                </button>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}