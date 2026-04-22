"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import StepBadge from "@/components/form/StepBadge";
import ProgressBar from "@/components/form/ProgressBar";
import GenderPicker from "@/components/form/GenderPicker";

const GreenButton = ({ label, onClick, disabled = false }: { label: string; onClick?: () => void; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-6 py-3 sm:px-8 sm:py-3 rounded-2xl font-extrabold text-black text-sm sm:text-base transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
    style={{
      backgroundColor: disabled ? "#d1d5db" : "#00E96A",
      border: "3px solid #111",
      boxShadow: disabled ? "none" : "4px 4px 0px #111",
      color: disabled ? "#9ca3af" : "#111",
    }}
  >
    {label}
  </button>
);

const CONCERNS = [
  "Keterlambatan Bicara",
  "Belum Tahu",
  "Perilaku Berulang",
  "Sensori Sensitif",
  "Kontak Mata",
  "Cara Bermain",
];

export default function FormPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("L");
  const [concerns, setConcerns] = useState<string[]>([]);

  const isValid = [name.trim(), age, gender][step];

  const handleNext = () => setStep((s) => s + 1);

  const handleBack = () => {
    if (step === 0) {
      router.push("/");
    } else {
      setStep((s) => s - 1);
    }
  };

  // ✅ FIX: push bukan replace biar Form tetap ada di history
  const handleSubmit = () => {
    const profile = { name, age: Number(age), gender, concerns };
    localStorage.setItem("profile", JSON.stringify(profile));
    router.push("/skrining");
  };

  const toggleConcern = (c: string) => {
    setConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const stepContent = [
    {
      title: "Siapa nama pahlawan kecil kita?",
      sub: "Nama panggilan kesayangan juga boleh!",
      input: (
        <input
          type="text"
          placeholder="Nama si kecil..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-2 border-blue-400 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-sm sm:text-base bg-transparent outline-none focus:border-purple-500 text-gray-900"
        />
      ),
    },
    {
      title: "Berapa usianya sekarang?",
      sub: "Pilih usia yang paling tepat",
      input: (
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {["2", "3", "4"].map((a) => (
            <button
              key={a}
              onClick={() => setAge(a)}
              className={`border-2 rounded-2xl p-3 sm:p-5 text-center transition-all duration-200 flex flex-col items-center gap-1
                ${age === a
                  ? "border-purple-500 bg-purple-50 -translate-y-2 shadow-lg shadow-purple-200"
                  : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50 hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-100"
                }`}
            >
              <span className="text-2xl sm:text-3xl">🎂</span>
              <div className={`text-sm sm:text-base font-bold transition-colors duration-200 ${
                age === a ? "text-purple-700" : "text-gray-800"
              }`}>
                {a} Tahun
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: "Jenis kelaminnya?",
      sub: "Ini membantu hasil skrining lebih akurat",
      input: <GenderPicker value={gender} onChange={setGender} />,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 via-teal-500 to-red-400 p-4 sm:p-6">
      <div className="bg-[#fdf8f0] rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-lg">
        {step < 3 ? (
          <>
            <StepBadge current={step + 1} total={4} />
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">
              {stepContent[step].title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-5 sm:mb-7">
              {stepContent[step].sub}
            </p>
            {stepContent[step].input}
            <ProgressBar step={step} />
            <div className="flex justify-between items-center mt-5 sm:mt-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors duration-200"
              >
                 Kembali
              </button>
              <GreenButton
                label="Lanjut →"
                onClick={handleNext}
                disabled={!isValid}
              />
            </div>
          </>
        ) : (
          <>
            <StepBadge current={4} total={4} />
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1">
              Apa yang paling diperhatikan?{" "}
              <span className="text-xs sm:text-sm font-normal text-gray-400">(opsional)</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-4 sm:mb-5">
              Boleh pilih lebih dari satu
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-6">
              {CONCERNS.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleConcern(c)}
                  className={`px-3 py-3 sm:px-4 sm:py-4 rounded-2xl text-xs sm:text-sm font-semibold text-center transition-all duration-200 border-2
                    ${concerns.includes(c)
                      ? "border-purple-500 bg-purple-50 text-purple-700 -translate-y-1 shadow-md shadow-purple-200"
                      : "border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50 hover:-translate-y-1 hover:shadow-md hover:shadow-purple-100"
                    }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <ProgressBar step={3} />

            <div className="flex justify-between items-center mt-5 sm:mt-6">
              <button
                onClick={handleBack}
                className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-400 hover:text-gray-700 transition-colors duration-200"
              >
                 Kembali
              </button>
              <GreenButton label="Mulai Quiz →" onClick={handleSubmit} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}