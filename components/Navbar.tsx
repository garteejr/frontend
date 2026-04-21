import { JSX } from "react/jsx-runtime";

export default function Navbar(): JSX.Element {
  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-white text-2xl font-semibold flex items-center gap-2">
        🧠 Autify
      </h1>

      <button className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-green-400 text-white shadow-md hover:scale-105 transition">
        Registrasi
      </button>
    </div>
  );
}