"use client";

export default function LoadingScreen() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');
        .ls-root * { font-family: 'Nunito', sans-serif; box-sizing: border-box; }
        .ls-spin { animation: lsSpin 1.1s cubic-bezier(0.4,0,0.6,1) infinite; }
        @keyframes lsSpin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .ls-pulse { animation: lsPulse 1.5s ease-in-out infinite; }
        @keyframes lsPulse {
          0%,100% { opacity: 0.5; transform: scale(0.95); }
          50%      { opacity: 1;   transform: scale(1.05); }
        }
        .ls-dots span { animation: lsDot 1.2s ease-in-out infinite; display: inline-block; }
        .ls-dots span:nth-child(2) { animation-delay: 0.2s; }
        .ls-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes lsDot {
          0%,80%,100% { transform: translateY(0); opacity: 0.4; }
          40%          { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
      <div
        className="ls-root"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2563EB 0%, #0D9488 50%, #EF4444 100%)",
          padding: "24px",
        }}
      >
        <div style={{
          background: "#FDFAF4",
          borderRadius: "28px",
          padding: "56px 48px",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        }}>
          {/* Spinner ring */}
          <div style={{ position: "relative", width: "80px", height: "80px", margin: "0 auto 28px" }}>
            <div className="ls-spin" style={{
              width: "80px", height: "80px", borderRadius: "50%",
              border: "5px solid #E5E7EB",
              borderTopColor: "#6366F1",
              borderRightColor: "#A855F7",
            }} />
            {/* SVG Brain Icon */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }} className="ls-pulse">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left hemisphere */}
                <path
                  d="M12 5C12 5 10.5 3 8.5 3C6 3 4 5 4 7.5C4 8.5 4.3 9.4 4.9 10.1C4.3 10.7 4 11.6 4 12.5C4 14.2 5.1 15.7 6.6 16.2C6.5 16.5 6.5 16.8 6.5 17C6.5 18.7 7.8 20 9.5 20C10.2 20 10.9 19.8 11.4 19.3C11.6 19.5 11.8 19.7 12 19.8"
                  stroke="#6366F1"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Right hemisphere */}
                <path
                  d="M12 5C12 5 13.5 3 15.5 3C18 3 20 5 20 7.5C20 8.5 19.7 9.4 19.1 10.1C19.7 10.7 20 11.6 20 12.5C20 14.2 18.9 15.7 17.4 16.2C17.5 16.5 17.5 16.8 17.5 17C17.5 18.7 16.2 20 14.5 20C13.8 20 13.1 19.8 12.6 19.3C12.4 19.5 12.2 19.7 12 19.8"
                  stroke="#A855F7"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Center line */}
                <line
                  x1="12"
                  y1="5"
                  x2="12"
                  y2="19.8"
                  stroke="#6366F1"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                />
                {/* Left folds */}
                <path d="M7 9.5C8 9.5 9 10 9.5 11" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M6.8 13C7.8 13 9 13.5 9.5 14.5" stroke="#6366F1" strokeWidth="1.2" strokeLinecap="round" />
                {/* Right folds */}
                <path d="M17 9.5C16 9.5 15 10 14.5 11" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M17.2 13C16.2 13 15 13.5 14.5 14.5" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#111827", marginBottom: "10px" }}>
            Menganalisis jawaban
          </h2>
          <p style={{ fontSize: "14px", color: "#9CA3AF", fontWeight: 600, marginBottom: "20px" }}>
            Sistem sedang memproses hasil skrining si kecil...
          </p>

          <div className="ls-dots" style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                width: "10px", height: "10px", borderRadius: "50%",
                background: "#6366F1", display: "block",
              }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}