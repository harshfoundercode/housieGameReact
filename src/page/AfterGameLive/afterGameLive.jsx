import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import logoImage from "../../assets/tambolaGame.jpeg";
import TambolaCaller from "./tambola_board";
import AnimatedTambolaCaller from "./animated_tambola_controller";

const AfterGameLive = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWinner, setSelectedWinner] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showCaller, setShowCaller] = useState(true);
  const [callerType, setCallerType] = useState("animated"); // ← ADD THIS: "animated" or "classic"

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Generate numbers 1-90
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);

  // --- Mock data ---
  const calledNumbers = new Set([5, 12, 23, 34, 45, 56, 67, 78, 89]);
  const rankingData = [
    { rank: 1, name: "Player 1", tno: 100, progress: "15/15" },
    { rank: 2, name: "Player 2", tno: 200, progress: "14/15" },
    { rank: 3, name: "Player 3", tno: 300, progress: "13/15" },
    { rank: 4, name: "Player 4", tno: 400, progress: "12/15" },
    { rank: 5, name: "Player 5", tno: 500, progress: "11/15" },
    { rank: 6, name: "Player 6", tno: 600, progress: "10/15" },
    { rank: 7, name: "Player 7", tno: 700, progress: "9/15" },
  ];
  const winnerCategories = [
    "First Full House",
    "Second Full House",
    "Third Full House",
    "Full Sheet Bonus",
    "Bottom Line",
    "Middle Line",
  ];

  // Handle search
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  // Generate sample ticket
  const generateSampleTicket = () => {
    const ticketNumbers = [
      [4, 16, 28, 0, 41, 53, 0, 70, 82],
      [9, 0, 21, 33, 45, 0, 58, 69, 0],
      [0, 12, 24, 0, 37, 49, 61, 0, 73],
    ];
    return ticketNumbers;
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
        <div className="flex justify-between items-center mb-2">
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

        {/* Toggle Buttons - Switch between Caller Types */}
        <div className="flex justify-center gap-3 mb-2">
          <button
            onClick={() => {
              setShowCaller(true);
              setCallerType("animated");
            }}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border-2 ${
              showCaller && callerType === "animated"
                ? "bg-[#FBEFA4] text-[#004296] border-[#FBEFA4]"
                : "bg-transparent text-white/60 border-white/20 hover:border-[#FBEFA4]/50"
            }`}
          >
            🎲 3D Animated Caller
          </button>
          <button
            onClick={() => {
              setShowCaller(true);
              setCallerType("classic");
            }}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border-2 ${
              showCaller && callerType === "classic"
                ? "bg-[#FBEFA4] text-[#004296] border-[#FBEFA4]"
                : "bg-transparent text-white/60 border-white/20 hover:border-[#FBEFA4]/50"
            }`}
          >
            📋 Classic Caller
          </button>
          <button
            onClick={() => setShowCaller(false)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border-2 ${
              !showCaller
                ? "bg-[#FBEFA4] text-[#004296] border-[#FBEFA4]"
                : "bg-transparent text-white/60 border-white/20 hover:border-[#FBEFA4]/50"
            }`}
          >
            📊 Number Board
          </button>
        </div>

        {/* CONDITIONAL RENDERING */}
        {showCaller ? (
          callerType === "animated" ? (
            <AnimatedTambolaCaller />
          ) : (
            <TambolaCaller />
          )
        ) : (
          <>
            {/* TIMER SECTION - Single Row */}
            <div className="timer-row flex items-center justify-center gap-3 md:gap-6 bg-[#004296]/60 backdrop-blur-sm rounded-2xl p-3 md:p-4 border-2 border-[#FBEFA4]/40">
              <div className="flex items-center gap-2 bg-[#004296]/50 px-4 md:px-6 py-2 md:py-3 rounded-xl border border-[#FBEFA4]/40">
                <span className="text-[#FBEFA4] text-lg md:text-xl">📅</span>
                <div>
                  <p className="text-[#FBEFA4]/70 text-[10px] md:text-xs font-medium">Date</p>
                  <p className="text-[#FBEFA4] font-bold text-sm md:text-base">
                    {new Date().toLocaleDateString("en-IN", { weekday: 'short', day: 'numeric', month: 'short' })}
                  </p>
                </div>
              </div>

              <div className="w-0.5-8 bg-linear-to-b from-transparent via-[#FBEFA4] to-transparent"></div>

              <div className="flex items-center gap-2 bg-[#004296]/50 px-4 md:px-6 py-2 md:py-3 rounded-xl border border-[#FBEFA4]/40">
                <span className="text-[#FBEFA4] text-lg md:text-xl">⏰</span>
                <div>
                  <p className="text-[#FBEFA4]/70 text-[10px] md:text-xs font-medium">Game Time</p>
                  <p className="text-[#FBEFA4] font-bold text-sm md:text-base">09:00 PM</p>
                </div>
              </div>

              <div className="w-0.5-8 bg-linear-to-b from-transparent via-[#FBEFA4] to-transparent"></div>

              <div className="flex items-center gap-2 bg-[#FBEFA4] px-4 md:px-6 py-2 md:py-3 rounded-xl border-2 border-[#FBEFA4] shadow-md">
                <span className="text-[#004296] text-lg md:text-xl">⏱️</span>
                <div>
                  <p className="text-[#004296]/70 text-[10px] md:text-xs font-medium">Countdown</p>
                  <p className="text-[#004296] font-bold text-sm md:text-base font-mono">00:00:00</p>
                </div>
              </div>
            </div>

            {/* NUMBER BOARD SECTION */}
            <div className="overflow-hidden rounded-2xl bg-[#FBEFA4] p-2 md:p-5 border-2 border-[#004296]/30">
              <div className="w-full max-w-4xl mx-auto mt-6">
                <div className="flex justify-center mb-4 relative">
                  <div className="absolute top-1/2 w-full h-0.5 bg-[#004296] shadow-lg"></div>
                  <h2 className="relative z-10 bg-[#004296] text-[#FBEFA4] text-xl md:text-2xl font-bold px-6 py-2 rounded shadow-lg border-4 border-[#FBEFA4]">
                    GAME IS OVER
                  </h2>
                </div>

                <div className="px-2 sm:px-4 md:px-10 lg:px-20">
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1 sm:gap-2">
                    {numbers.map((num) => {
                      const isCalled = calledNumbers.has(num);
                      return (
                        <div
                          key={num}
                          className={`
                            flex items-center justify-center 
                            font-bold 
                            border-2 sm:border-3 border-[#004296]
                            rounded-3xl
                            shadow-md sm:shadow-lg
                            transition-all
                            ${isCalled ? "bg-[#004296] text-[#FBEFA4]" : "bg-white text-[#004296]"}
                          `}
                          style={{ height: "35px" }}
                        >
                          <span className="text-[10px] sm:text-sm md:text-base">{num}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="px-4 md:px-23">
                  <div className="mt-4 h-5 bg-[#004296] rounded-full border-4 border-[#FBEFA4]"></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* PLAYER RANKING */}
        <div className="w-full max-w-7xl mx-auto mt-8">
          <div className="bg-[#004296]/60 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-2 border-[#FBEFA4]/30">
            <h2 className="text-center text-[#FBEFA4] text-2xl md:text-3xl font-normal mb-4">
              🏆 Player Ranking
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {rankingData.map((item) => (
                <div
                  key={item.rank}
                  className="min-w-55 bg-white rounded-xl p-4 text-center shadow border-2 border-[#FBEFA4]"
                >
                  <p className="font-bold text-[#004296]">Rank-{item.rank}: {item.name}</p>
                  <p className="mt-2 font-bold text-gray-700">Tno: {item.tno}</p>
                  <p className="mt-2 font-bold text-[#004296]">({item.progress})</p>
                </div>
              ))}
            </div>
          </div>
        </div>

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
        <div className="w-full max-w-7xl mx-auto mt-6">
          <div className="bg-[#004296]/60 backdrop-blur-sm rounded-3xl p-4 shadow-xl border-2 border-[#FBEFA4]/30">
            <h2 className="text-center text-[#FBEFA4] text-2xl md:text-3xl font-semibold mb-6">
              🎉 Winner List
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {winnerCategories.map((title, index) => (
                <div
                  key={title}
                  onClick={() =>
                    setSelectedWinner({
                      title,
                      tno: 200 + index,
                      name: "Jehrul",
                    })
                  }
                  className="bg-linear-to-b from-[#FBEFA4] to-[#FFE44D] rounded-2xl p-4 shadow-lg text-center cursor-pointer hover:scale-105 transition border-2 border-white"
                >
                  <div className="bg-[#004296] text-[#FBEFA4] py-1 rounded-full mb-3 text-sm font-semibold">
                    {title}
                  </div>
                  <p className="font-bold text-[#004296]">TNO: {200 + index} (Player)</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WINNER MODAL */}
      {selectedWinner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-linear-to-br from-[#004296] to-[#002b66] rounded-3xl w-full max-w-3xl p-4 relative shadow-2xl border-2 border-[#FBEFA4]">
            <button
              onClick={() => setSelectedWinner(null)}
              className="absolute top-3 right-3 bg-[#004296] text-[#FBEFA4] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#003380] border border-[#FBEFA4]"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-center text-2xl md:text-3xl text-[#FBEFA4] font-bold mb-4">
              {selectedWinner.title}
            </h2>

            <div className="bg-[#FBEFA4] text-[#004296] text-center py-2 rounded-xl font-bold mb-3">
              TNO: {selectedWinner.tno}
            </div>

            <div className="bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-2 mb-4 text-sm border border-[#FBEFA4]/30">
              Booked By: {selectedWinner.name}
            </div>

            <div className="bg-[#FBEFA4] p-3 rounded-2xl">
              <div className="grid grid-cols-9 gap-1">
                {generateSampleTicket().flat().map((num, i) => {
                  const isMarked = calledNumbers.has(num);
                  return (
                    <div
                      key={i}
                      className={`h-10 flex items-center justify-center border rounded text-sm font-semibold
                        ${isMarked ? "bg-[#004296] text-[#FBEFA4] border-[#FBEFA4]" : "bg-white text-[#004296] border-[#004296]/30"}
                        ${num === 0 ? "bg-transparent border-transparent text-transparent" : ""}
                      `}
                    >
                      {num !== 0 ? num : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-linear-to-r from-transparent via-[#FBEFA4] to-transparent shadow-lg shadow-[#FBEFA4]/50"></div>
    </div>
  );
};

export default AfterGameLive;