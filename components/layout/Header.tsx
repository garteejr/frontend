export default function Header() {
  return (
    <header className="text-center py-5 relative">
      <span
        className="text-5xl inline-block"
        style={{ animation: 'bounce2 2s infinite', filter: 'drop-shadow(0 0 12px rgba(255,214,10,0.6))' }}
      >
        🦋
      </span>

      <h1
        className="font-fredoka text-3xl sm:text-4xl tracking-wide gradient-title"
        style={{ animation: 'titlePop 1s ease-out' }}
      >
        BelajarBersama
      </h1>

      <p className="text-sm text-muted font-semibold mt-1">
        ✨ Platform Pembelajaran Cerdas untuk Anak Spesial ✨
      </p>

      <div className="flex justify-center gap-2 mt-2">
        {['⭐', '🌟', '⭐', '🌟', '⭐'].map((star, i) => (
          <span
            key={i}
            className="text-xl"
            style={{ animation: 'starSpin 3s infinite linear', animationDelay: `${i * 0.3}s` }}
          >
            {star}
          </span>
        ))}
      </div>
    </header>
  );
}
