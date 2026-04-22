"use client";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const AutofyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="10" fill="url(#grad)" />
    <path
      d="M9 22 L13.5 10 L16 16 L18.5 10 L23 22"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <circle cx="16" cy="16" r="2" fill="white" opacity="0.9" />
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#22c55e" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isSignedIn || !user) return;

    fetch("/api/auth", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        console.log("Auth berhasil:", data);
        setUserData(data);
      })
      .catch((err) => console.error("Error:", err));

  }, [isSignedIn]);

  return (
    <div className="flex justify-between items-center mb-10">
      <div className="flex items-center gap-2.5">
        <AutofyIcon />
        <span
          className="text-white text-xl font-bold tracking-tight"
          style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", letterSpacing: "-0.02em" }}
        >
          Autify
        </span>
      </div>

      <div className="flex items-center gap-4">
        {!isSignedIn && (
          <SignInButton mode="modal">
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-green-400 text-white text-sm font-semibold shadow-md hover:scale-105 hover:shadow-orange-400/30 hover:shadow-lg transition-all duration-200">
              Masuk / Daftar
            </button>
          </SignInButton>
        )}
        <UserButton />
      </div>
    </div>
  );
}