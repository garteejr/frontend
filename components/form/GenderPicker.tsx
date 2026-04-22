"use client";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const MaleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="20" r="10" fill="#1e40af" />
    <circle cx="32" cy="18" r="4" fill="#93c5fd" />
    <rect x="24" y="30" width="16" height="18" rx="6" fill="#1e40af" />
    <rect x="20" y="33" width="10" height="4" rx="2" fill="#1e40af" />
    <rect x="34" y="33" width="10" height="4" rx="2" fill="#1e40af" />
    <rect x="24" y="46" width="6" height="10" rx="3" fill="#1e40af" />
    <rect x="34" y="46" width="6" height="10" rx="3" fill="#1e40af" />
    <text x="42" y="14" fontSize="14" fill="#3b82f6" fontWeight="bold">♂</text>
  </svg>
);

const FemaleIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="20" r="10" fill="#dc2626" />
    <circle cx="32" cy="18" r="4" fill="#fca5a5" />
    <path d="M20 34 Q32 28 44 34 L42 50 Q32 54 22 50 Z" fill="#dc2626" />
    <rect x="24" y="48" width="6" height="10" rx="3" fill="#dc2626" />
    <rect x="34" y="48" width="6" height="10" rx="3" fill="#dc2626" />
    <text x="40" y="14" fontSize="14" fill="#ef4444" fontWeight="bold">♀</text>
  </svg>
);

export default function GenderPicker({ value, onChange }: Props) {
  const options = [
    { val: "L", label: "Laki-laki", sub: "Putra", icon: <MaleIcon /> },
    { val: "P", label: "Perempuan", sub: "Putri", icon: <FemaleIcon /> },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => (
        <button
          key={opt.val}
          onClick={() => onChange(opt.val)}
          className={`rounded-2xl p-6 text-center transition-all duration-200 flex flex-col items-center gap-2
            ${value === opt.val
              ? "border-2 border-purple-500 bg-purple-50 -translate-y-2 shadow-lg shadow-purple-200"
              : "border-2 border-gray-200 bg-white hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-100 hover:border-purple-300"
            }`}
        >
          <div>{opt.icon}</div>
          <div className={`font-extrabold text-lg ${value === opt.val ? "text-purple-700" : "text-gray-800"}`}>
            {opt.label}
          </div>
          <div className="text-sm text-gray-400">{opt.sub}</div>
        </button>
      ))}
    </div>
  );
}