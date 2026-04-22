"use client";

interface Props {
  message: string;
  onRetry: () => void;
}

export default function ErrorScreen({ message, onRetry }: Props) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&display=swap');
        .es-root * { font-family: 'Nunito', sans-serif; box-sizing: border-box; }
        .es-btn { transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1); cursor: pointer; }
        .es-btn:hover { transform: translateY(-2px); }
        .es-btn:active { transform: scale(0.96); }
      `}</style>
      <div
        className="es-root"
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
          padding: "48px 40px",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
        }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>😔</div>
          <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#111827", marginBottom: "10px" }}>
            Terjadi Kesalahan
          </h2>
          <div style={{
            background: "#FFF1F2",
            border: "1.5px solid #FECDD3",
            borderRadius: "14px",
            padding: "14px 18px",
            marginBottom: "28px",
          }}>
            <p style={{ fontSize: "13px", color: "#E11D48", fontWeight: 700, margin: 0 }}>
              {message}
            </p>
          </div>
          <button
            className="es-btn"
            onClick={onRetry}
            style={{
              background: "#00E96A",
              border: "2.5px solid #111",
              boxShadow: "4px 4px 0 #111",
              borderRadius: "16px",
              padding: "13px 32px",
              fontWeight: 900,
              fontSize: "15px",
              color: "#111",
            }}
          >
            Coba Lagi →
          </button>
        </div>
      </div>
    </>
  );
}