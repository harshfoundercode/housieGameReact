import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import logoImage from "../../assets/tambolaGame.jpeg";
import TambolaCaller from "./tambola_board";
import AnimatedTambolaCaller from "./animated_tambola_controller";
import PlayerRanking from "./GameResultComponents/player_ranking";
import WinnerList from "./GameResultComponents/winner_list";

const AfterGameLive = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);


  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);



  // Handle search
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };



  return (
    <div className="min-h-screen bg-linear-to-br from-[#0a0a2e] via-[#1a0a3e] to-[#0a0a2e] text-white p-4 md:p-6 relative">

      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-3">

        {/* LOGO HEADER - Click to go Home */}
        <div className="flex justify-between items-center mb-10">
          <div
            onClick={() => navigate(ROUTES.HOME)}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-[#FBEFA4] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-[#004296] to-[#002b66] rounded-full flex items-center justify-center border-3 border-[#FBEFA4] shadow-xl overflow-hidden">
              <img
                src={logoImage}
                alt="Tambola Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <h1 className="text-xl md:text-2xl font-bold">
            <span className="text-[#FBEFA4]">TAMBOLA</span>
            <span className="text-white/60 ml-2">LIVE GAME</span>
          </h1>

          <div className="w-12"></div>
        </div>

        {/* CONDITIONAL RENDERING */}
        <AnimatedTambolaCaller />

        {/* PLAYER RANKING */}
        <PlayerRanking />

        {/* TICKET SEARCH SECTION */}
        <div className="w-full max-w-7xl mx-auto mt-6">
          <div className="bg-[#004296]/40 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-[#FBEFA4]/30">
            <div className="bg-linear-to-r from-[#004296] to-[#003380] rounded-3xl p-4 shadow-xl border-b-2 border-[#FBEFA4]/30">
              <h2 className="text-[#FBEFA4] text-xl md:text-2xl font-semibold text-center">
                🔍 TICKETS FOR GAMES
              </h2>
            </div>

            <div className="flex flex-col items-center gap-3 mt-2 p-4">
              <input
                type="text"
                placeholder="e.g enter tno, name or agent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border-2 border-[#FBEFA4]/40 w-full max-w-md outline-none focus:border-[#FBEFA4]"
              />
              <button
                onClick={handleSearch}
                className="bg-[#FBEFA4] text-[#004296] px-8 py-2 rounded-full font-semibold shadow-md hover:bg-[#FFE44D] transition border-2 border-white/30"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* WINNER LIST */}
        <WinnerList />
      </div>

      {/* Bottom decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-linear-to-r from-transparent via-[#FBEFA4] to-transparent shadow-lg shadow-[#FBEFA4]/50"></div>
    </div>
  );
};

export default AfterGameLive;