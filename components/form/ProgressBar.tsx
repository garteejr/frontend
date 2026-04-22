const labels = ["Nama", "Usia", "Kelamin", "Siap"];

export default function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mt-8">
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 to-blue-500 transition-all duration-500"
          style={{ width: `${((step + 1) / 4) * 100}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {labels.map((l, i) => (
          <span key={l} className={`text-xs font-bold ${i <= step ? "text-blue-500" : "text-gray-300"}`}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}