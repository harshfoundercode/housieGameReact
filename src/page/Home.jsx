import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useIsMobile, useIsTablet } from "../styles/responsive_sizes";
// Import your image asset
import tambolaGame from "../assets/tambolaGame.jpeg"; // Apna path adjust karein

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  return (
    <div className="h-screen bg-gradient-to-br from-[#004296] via-[#002b66] to-[#001433] flex items-center justify-center p-4 md:p-6 overflow-hidden relative">
      
      {/* Animated Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Animated Orbital Circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-[#FBEFA4]/20 rounded-full absolute animate-spin-slow"></div>
        <div className="w-[400px] h-[400px] md:w-[700px] md:h-[700px] border border-[#FBEFA4]/10 rounded-full absolute animate-spin-slow" style={{animationDirection: 'reverse', animationDuration: '15s'}}></div>
        <div className="w-[500px] h-[500px] md:w-[900px] md:h-[900px] border border-white/5 rounded-full absolute animate-spin-slow" style={{animationDuration: '20s'}}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-[#FBEFA4] rounded-full opacity-60 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.2 + Math.random() * 0.5
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl h-full flex flex-col items-center justify-between py-6 md:py-8">
        
        {/* Top Section - Logo & Brand */}
        <div className="flex flex-col items-center">
          {/* Logo with Custom Image */}
          <div className="relative group cursor-pointer mb-3">
            <div className="absolute inset-0 bg-[#FBEFA4] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative w-20 h-20 md:w-30 md:h-30 rounded-full flex items-center justify-center border-2 border-[#FBEFA4] shadow-xl overflow-hidden">
              {/* Custom Image Asset */}
              <img 
                src={tambolaGame} 
                alt="Tambola Dice" 
                className="w-full h-full object-cover rounded-full"

              />
            </div>
          </div>
          
          {/* Brand Name */}
          <h2 className="text-[#FBEFA4] text-xs md:text-sm font-medium tracking-[0.3em] uppercase opacity-80">
            Play & Win
          </h2>
        </div>

        {/* Middle Section - Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          
          {/* Main Title */}
          <h1 className={`${isMobile ? 'text-6xl' : 'text-7xl md:text-8xl lg:text-9xl'} font-black text-white tracking-tight mb-3 text-center`}>
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#FBEFA4] via-[#FFF5C2] to-[#FBEFA4] bg-clip-text text-transparent">
                TAMBOLA
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 md:h-4 bg-[#FBEFA4]/20 blur-md"></span>
            </span>
          </h1>
          
          {/* Tagline */}
          <div className="flex items-center gap-2 md:gap-3 mb-8">
            <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#FBEFA4]"></span>
            <p className="text-white/70 text-sm md:text-base font-light tracking-wider">
              The Classic Number Game Experience
            </p>
            <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#FBEFA4]"></span>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
            {['🎫 5 Cards Max', '🏆 Daily Prizes', '⚡ Live Results'].map((feature, i) => (
              <span 
                key={i}
                className="bg-white/5 backdrop-blur-sm text-white/80 text-xs md:text-sm px-4 py-2 rounded-full border border-white/10 hover:border-[#FBEFA4]/40 hover:bg-white/10 transition-all duration-300"
              >
                {feature}
              </span>
            ))}
          </div>

        

          {/* Buttons */}
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 md:gap-4 w-full max-w-md`}>
            {/* Primary CTA */}
            <button
              onClick={() => navigate(ROUTES.GAME)}
              className="group relative flex-1 bg-[#FBEFA4] hover:bg-[#FFE44D] text-[#004296] py-4 px-6 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Play Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            {/* Secondary CTA */}
            <button
              onClick={() => navigate(ROUTES.AFTERGAME)}
              className="group flex-1 bg-transparent hover:bg-white/10 text-white border-2 border-white/30 hover:border-[#FBEFA4] py-4 px-6 rounded-2xl font-bold text-base md:text-lg transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                Live Draws
                <span className="text-lg">📺</span>
              </span>
            </button>
          </div>
        </div>

      

        {/* Bottom Decoration */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <p className="text-white/20 text-[10px] tracking-widest">
            ✦ PRESS PLAY TO BEGIN ✦
          </p>
        </div>
      </div>

      {/* CSS for slow spin */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;