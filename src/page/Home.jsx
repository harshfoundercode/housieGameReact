import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/routes";
import { useIsMobile, useIsTablet } from "../styles/responsive_sizes";

const Home = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Dynamic classes based on screen size
  const getTitleSize = () => {
    if (isMobile) return "text-4xl";
    if (isTablet) return "text-5xl md:text-6xl";
    return "text-7xl md:text-8xl";
  };

  const getPadding = () => {
    if (isMobile) return "p-4";
    if (isTablet) return "p-6";
    return "p-6 md:p-8";
  };

  const getLogoSize = () => {
    if (isMobile) return "w-20 h-20 text-4xl";
    if (isTablet) return "w-24 h-24 text-5xl";
    return "w-28 h-28 text-5xl";
  };

  return (
    <div className={`min-h-screen bg-linear-to-br from-black via-[#1a1a1a] to-black text-white flex flex-col items-center justify-center ${getPadding()} relative overflow-hidden`}>
      
      {/* Animated background elements - Responsive sizing */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 md:-top-40 -right-20 md:-right-40 w-40 md:w-60 lg:w-80 h-40 md:h-60 lg:h-80 bg-[#008000] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-20 md:-bottom-40 -left-20 md:-left-40 w-40 md:w-60 lg:w-80 h-40 md:h-60 lg:h-80 bg-[#FFC107] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '1000ms'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 md:w-72 lg:w-96 h-48 md:h-72 lg:h-96 bg-[#4D4D4D] rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-pulse" style={{animationDelay: '500ms'}}></div>
      </div>

      {/* Floating numbers - Hide on mobile */}
      {!isMobile && (
        <>
          <div className="absolute top-10 left-10 text-4xl md:text-6xl font-bold text-[#008000] opacity-20 rotate-12">7</div>
          <div className="absolute bottom-20 right-10 text-5xl md:text-8xl font-bold text-[#FFC107] opacity-20 -rotate-12">42</div>
          <div className="absolute top-40 right-20 text-2xl md:text-4xl font-bold text-[#4D4D4D] opacity-20 rotate-45">23</div>
          <div className="absolute bottom-40 left-20 text-3xl md:text-5xl font-bold text-[#FFC107] opacity-20 -rotate-45">88</div>
        </>
      )}

      {/* Main content */}
      <div className="relative z-10 text-center space-y-4 md:space-y-6 lg:space-y-8 max-w-full md:max-w-2xl px-4">
        
        {/* Logo/Icon Section */}
        <div className="flex justify-center mb-4 md:mb-6">
          <div className={`${getLogoSize()} bg-linear-to-br from-[#FFC107] to-[#008000] rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform border-2 border-[#FFC107]/50`}>
            <span>🎯</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-2 md:space-y-3">
          <h1 className={`${getTitleSize()} font-extrabold bg-linear-to-r from-[#FFC107] via-[#008000] to-[#4D4D4D] bg-clip-text text-transparent leading-tight drop-shadow-lg`}>
            Tambola
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-[#FFC107]/80 font-light tracking-wide px-2">
            The Ultimate Number Game Experience
          </p>
        </div>

        {/* Features Grid - Responsive */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-3 gap-4 md:gap-5'} my-6 md:my-8 lg:my-10`}>
          <div className="bg-linear-to-br from-[#008000]/10 to-[#4D4D4D]/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 border border-[#FFC107]/30 shadow-xl hover:shadow-[#FFC107]/20 transition-all hover:scale-105">
            <div className="text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3">🎲</div>
            <p className="text-xs md:text-sm font-semibold text-[#FFC107]">Multiple Cards</p>
            {!isMobile && <p className="text-xs text-[#4D4D4D]/70 mt-1">Play with friends</p>}
          </div>
          <div className="bg-linear-to-br from-[#008000]/10 to-[#4D4D4D]/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 border border-[#FFC107]/30 shadow-xl hover:shadow-[#FFC107]/20 transition-all hover:scale-105">
            <div className="text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3">🎯</div>
            <p className="text-xs md:text-sm font-semibold text-[#FFC107]">Auto Caller</p>
            {!isMobile && <p className="text-xs text-[#4D4D4D]/70 mt-1">Random numbers</p>}
          </div>
          <div className="bg-linear-to-br from-[#008000]/10 to-[#4D4D4D]/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 border border-[#FFC107]/30 shadow-xl hover:shadow-[#FFC107]/20 transition-all hover:scale-105">
            <div className="text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3">🏆</div>
            <p className="text-xs md:text-sm font-semibold text-[#FFC107]">Win Prizes</p>
            {!isMobile && <p className="text-xs text-[#4D4D4D]/70 mt-1">Be the champion</p>}
          </div>
        </div>

        {/* Start Button - Responsive sizing */}
        <button
          onClick={() => navigate(ROUTES.GAME)}
          className={`group relative ${isMobile ? 'px-8 py-4 text-lg' : 'px-10 md:px-12 py-4 md:py-5 text-lg md:text-xl'} bg-linear-to-r from-[#008000] via-[#006400] to-[#FFC107] rounded-xl md:rounded-2xl font-bold shadow-2xl hover:shadow-[#FFC107]/40 transform hover:scale-105 transition-all duration-300 overflow-hidden border border-[#FFC107]/50`}
        >
          <span className="relative z-10 flex items-center gap-2 text-white">
            Start Playing Now
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-[#FFC107] to-[#008000] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>

           {/* Start Button - GameLive homepage */}
        <button
          onClick={() => navigate(ROUTES.AFTERGAME)}
          className={`group relative ${isMobile ? 'px-8 py-4 text-lg' : 'px-10 md:px-10 py-4 md:py-5 text-lg md:text-xl'} bg-linear-to-r from-[#008000] via-[#006400] to-[#FFC107] rounded-xl md:rounded-2xl font-bold shadow-2xl hover:shadow-[#FFC107]/40 transform hover:scale-105 transition-all duration-300 overflow-hidden border border-[#FFC107]/50`}
        >
          <span className="relative z-10 flex items-center gap-2 text-white">
            Start Playing Now 2
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-[#FFC107] to-[#008000] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>

        {/* Footer text */}
        <p className="text-[#4D4D4D] text-xs md:text-sm mt-6 md:mt-8 lg:mt-10 tracking-wider">
          Press start to begin your Tambola journey ✦
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-linear-to-r from-transparent via-[#FFC107] to-transparent shadow-lg shadow-[#FFC107]/50"></div>
      
      {/* Top decoration line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#008000] to-transparent"></div>
    </div>
  );
};

export default Home;