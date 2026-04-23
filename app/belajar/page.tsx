"use client"; // Tambahkan ini karena kamu menggunakan Hook (useGame)

import { JSX } from "react/jsx-runtime";
import StarBackground from '@/components/layout/StarBackground';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import ProgressBar from '@/components/layout/ProgressBar';
import RewardOverlay from '@/components/common/RewardOverlay';
import HomeSection from '@/components/sections/HomeSection';
import AttentionSection from '@/components/sections/AttentionSection';
import LanguageSection from '@/components/sections/LanguageSection';
import CognitiveSection from '@/components/sections/CognitiveSection';
import MotorSection from '@/components/sections/MotorSection';
import SocialSection from '@/components/sections/SocialSection';

// Sesuaikan path import ini dengan folder asli kamu
// Jika folder 'context' ada di luar 'components', hapus '/components'
import { useGame } from '@/components/context/GameContext'; 

export default function Belajar(): JSX.Element {
  // --- PERBAIKAN DI SINI ---
  // Kita panggil hook useGame untuk mengambil nilai currentSection
  const { currentSection } = useGame(); 
  // -------------------------

  return (
    <>
      <StarBackground />

      <main
        className="relative z-10 max-w-[900px] mx-auto px-4"
        style={{ paddingBottom: 32 }}
      >
        <Header />
        <ProgressBar />
        <Navigation />

        <div className="mt-2">
          {currentSection === 'home'      && <HomeSection />}
          {currentSection === 'attention' && <AttentionSection />}
          {currentSection === 'language'  && <LanguageSection />}
          {currentSection === 'cognitive' && <CognitiveSection />}
          {currentSection === 'motor'     && <MotorSection />}
          {currentSection === 'social'    && <SocialSection />}
        </div>
      </main>

      <RewardOverlay />
    </>
  );
}