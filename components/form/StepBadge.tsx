export default function StepBadge({ current, total }: { current: number; total: number }) {
  return (
    <span className="inline-block bg-yellow-300 text-yellow-900 text-sm font-extrabold px-4 py-1 rounded-full mb-6">
      Langkah {current} dari {total}
    </span>
  );
}