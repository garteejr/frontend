import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { GameProvider } from '@/components/context/GameContext';
import "./globals.css";

// Konfigurasi Font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata (Silakan sesuaikan judulnya)
export const metadata: Metadata = {
  title: 'Autify',
  description: 'M-CHAT-R/f.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html
        lang="id"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          {/* GameProvider membungkus children agar context game bisa diakses di seluruh app */}
          <GameProvider>
            {children}
          </GameProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}