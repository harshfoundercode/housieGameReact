import React from "react";
import { useNavigate } from "react-router-dom";
import { THEME, CARD_STYLES, BUTTON_STYLES, TITLE_STYLES } 
from "../styles/constants/theme";
import { ROUTES } from "../routes/routes";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen ${THEME.classes.bgGradient} text-white flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#DC2626] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FBBF24] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1000ms'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B4513] rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '500ms'}}></div>
      </div>

      {/* Floating numbers decoration */}
      <div className="absolute top-10 left-10 text-6xl font-bold text-[#DC2626] opacity-20 rotate-12">7</div>
      <div className="absolute bottom-20 right-10 text-8xl font-bold text-[#FBBF24] opacity-20 -rotate-12">42</div>
      <div className="absolute top-40 right-20 text-4xl font-bold text-[#EF4444] opacity-20 rotate-45">23</div>
      <div className="absolute bottom-40 left-20 text-5xl font-bold text-[#FDE047] opacity-20 -rotate-45">88</div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        
        {/* Logo/Icon Section */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 bg-linear-to-br from-[#FBBF24] via-[#F59E0B] to-[#D97706] rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform border-2 border-[#FBBF24]/50">
            <span className="text-5xl">🎯</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-3">
          <h1 className={TITLE_STYLES}>
            Tambola
          </h1>
          <p className={`text-xl md:text-2xl ${THEME.classes.textSubtitle} font-light tracking-wide`}>
            The Ultimate Number Game Experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-5 my-10">
          <div className={CARD_STYLES}>
            <div className="text-3xl mb-3">🎲</div>
            <p className="text-sm font-semibold text-[#FEF3C7]">Multiple Cards</p>
            <p className="text-xs text-[#FDE68A]/70 mt-1">Play with friends</p>
          </div>
          <div className={CARD_STYLES}>
            <div className="text-3xl mb-3">🎯</div>
            <p className="text-sm font-semibold text-[#FEF3C7]">Auto Caller</p>
            <p className="text-xs text-[#FDE68A]/70 mt-1">Random numbers</p>
          </div>
          <div className={CARD_STYLES}>
            <div className="text-3xl mb-3">🏆</div>
            <p className="text-sm font-semibold text-[#FEF3C7]">Win Prizes</p>
            <p className="text-xs text-[#FDE68A]/70 mt-1">Be the champion</p>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => navigate(ROUTES.GAME)}
          className={BUTTON_STYLES}
        >
          <span className="relative z-10 flex items-center gap-2 text-[#FEF3C7]">
            Start Playing Now
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
          <div className={`absolute inset-0 ${THEME.classes.bgButtonHover} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300`}></div>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>

        {/* Footer text */}
        <p className={`${THEME.classes.textMuted} text-sm mt-10 tracking-wider`}>
          Press start to begin your Tambola journey ✦
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r from-transparent via-[#FBBF24] to-transparent shadow-lg shadow-[#FBBF24]/50"></div>
      
      {/* Top decoration line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#DC2626] to-transparent"></div>
    </div>
  );
};

export default Home;