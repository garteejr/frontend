interface GameCardProps {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
  onClick: () => void;
  stars?: number;
  badge?: string;
}

export default function GameCard({
  icon,
  title,
  description,
  accentColor,
  onClick,
  stars = 3,
  badge,
}: GameCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card rounded-[20px] p-4 cursor-pointer transition-all duration-300 text-center relative overflow-hidden hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
      style={{ border: `2.5px solid ${accentColor}` }}
    >
      {badge && (
        <span
          className="absolute top-2.5 right-2.5 rounded-lg text-[10px] font-extrabold px-1.5 py-0.5"
          style={{ background: '#FFD60A', color: '#000' }}
        >
          {badge}
        </span>
      )}

      <span
        className="text-4xl mb-2 block"
        style={{ animation: 'cardBob 3s ease-in-out infinite' }}
      >
        {icon}
      </span>

      <div className="font-fredoka text-base mb-1" style={{ color: accentColor }}>
        {title}
      </div>

      <div className="text-[11px] text-muted leading-tight">{description}</div>

      <div className="mt-1.5 text-sm">{'⭐'.repeat(stars)}</div>
    </div>
  );
}
