interface ProgressBarProps {
  current: number;
  total: number;
  color: string;
}

export default function ProgressBar({ current, total, color }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}
