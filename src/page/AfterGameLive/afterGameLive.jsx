import React, { useEffect, useState, useRef } from "react";

const AfterGameLive = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const gameTimeRef = useRef(new Date());

  // Media Query Detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const gameTime = gameTimeRef.current;
    gameTime.setHours(21);
    gameTime.setMinutes(0);
    gameTime.setSeconds(0);
  }, []);

  // Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = gameTimeRef.current - now;

      if (diff <= 0) {
        setTimeLeft("Game Live 🔴");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedGameTime = gameTimeRef.current.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Generate numbers 1-90
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);

  return (
    <>
      <style>
        {`
          /* Mobile Styles (max-width: 640px) */
          @media (max-width: 640px) {
            .game-container {
              padding: 0.75rem !important;
            }
            
            .header-title {
              font-size: 1.875rem !important;
              padding: 1rem !important;
            }
            
            .regular-player-title {
              font-size: 1.25rem !important;
              padding: 0.5rem !important;
            }
            
            .timer-cards {
              grid-template-columns: 1fr !important;
              gap: 0.5rem !important;
            }
            
            .timer-card {
              padding: 0.75rem !important;
            }
            
            .timer-card p:first-child {
              font-size: 0.875rem !important;
            }
            
            .timer-card p:last-child {
              font-size: 1.125rem !important;
            }
            
            .search-container {
              width: 100% !important;
            }
            
            .search-input {
              padding: 0.5rem 1rem !important;
              font-size: 0.875rem !important;
            }

            /* Number Board Mobile */
            .board-title {
              font-size: 1.5rem !important;
              padding: 0.25rem 1rem !important;
            }
            
            .board-cell {
              width: 2rem !important;
              height: 2rem !important;
              font-size: 0.7rem !important;
            }
          }

          /* Tablet Styles (min-width: 641px and max-width: 1024px) */
          @media (min-width: 641px) and (max-width: 1024px) {
            .game-container {
              padding: 1rem !important;
            }
            
            .header-title {
              font-size: 2.5rem !important;
            }
            
            .timer-cards {
              gap: 0.75rem !important;
            }
            
            .timer-card {
              padding: 1rem !important;
            }

            /* Number Board Tablet */
            .board-cell {
              width: 2.5rem !important;
              height: 2.5rem !important;
              font-size: 0.875rem !important;
            }
          }

          /* Desktop Styles (min-width: 1025px) */
          @media (min-width: 1025px) {
            .board-cell {
              width: 3rem !important;
              height: 3rem !important;
              font-size: 1rem !important;
            }
          }

          /* Touch-friendly adjustments */
          @media (hover: none) and (pointer: coarse) {
            button, 
            [role="button"] {
              min-height: 44px !important;
            }
            
            input {
              font-size: 16px !important;
            }
          }
        `}
      </style>

      <div className={`min-h-screen bg-black text-white game-container p-4 md:p-6 relative`}>
        <div className="relative z-10 max-w-8xl mx-auto space-y-3">
          {/* HEADER */}
          <div className="relative overflow-hidden rounded-b-3xl bg-linear-to-br from-[#4D4D4D] via-[#4A4A4A] to-[#303030] p-3 md:p-5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#303030] rounded-full filter blur-3xl opacity-20"></div>
            <h1 className="header-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center bg-white bg-clip-text text-transparent tracking-wider">
              GET RICH
            </h1>
          </div>

          <div className="overflow-hidden rounded-b-3xl bg-linear-to-br from-[#4D4D4D] via-[#4A4A4A] to-[#303030] p-2 md:p-3 relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#303030] rounded-full filter blur-3xl opacity-20"></div>
            <h1 className="regular-player-title text-xl sm:text-2xl md:text-3xl font-bold text-center bg-white bg-clip-text text-transparent tracking-wider">
              Regular Player Link
            </h1>
          </div>

          {/* TIMER SECTION */}
          <div className="timer-cards grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            <div className="timer-card bg-[#4D4D4D] backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                <p className="font-bold text-white text-sm sm:text-base">Date</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white">
                {isMobile
                  ? new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
                  : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                }
              </p>
            </div>

            <div className="timer-card bg-[#4D4D4D] backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                <p className="font-bold text-white text-sm sm:text-base">Countdown</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white font-mono">
                {timeLeft}
              </p>
            </div>

            <div className="timer-card bg-[#4D4D4D] backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6">
              <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                <p className="font-bold text-white text-sm sm:text-base">Game Time</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white">
                {formattedGameTime}
              </p>
            </div>
          </div>


          <div className="overflow-hidden rounded-2xl bg-[#FFC107] p-2 md:p-5 relative">
            {/* NUMBER BOARD SECTION */}
            <div className="w-full max-w-8xl mx-auto mt-6">

              {/* GAME OVER BADGE */}
              <div className="flex justify-center mb-4 relative">
                <div className="absolute top-1/2 w-full h-0.75 bg-white shadow-lg shadow-red-700"></div>
                <h2 className="relative z-10 bg-red-600 text-white text-xl md:text-2xl font-bold px-6 py-2 rounded shadow-lg border-4 border-white">
                  GAME IS OVER
                </h2>
              </div>

              {/* GRID */}
{/* GRID */}
<div className="px-2 sm:px-4 md:px-10 lg:px-20">
  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1 sm:gap-2">

    {numbers.map((num) => {
      const isCalled = num % 3 !== 0;

      return (
        <div
          key={num}
          className={`
            flex items-center justify-center 
            font-bold 
            border-2 sm:border-3 border-white 
            rounded-3xl
            shadow-md sm:shadow-lg shadow-[#8705059a]
            transition-all
            
            ${isCalled
              ? "bg-green-700 text-white"
              : "bg-orange-400 text-black"}
          `}
          style={{
            height: "35px",
          }}
        >
          <span className="text-[10px] sm:text-sm md:text-base">
            {num}
          </span>
        </div>
      );
    })}

  </div>
</div>

              <div className="px-4 md:px-23">

              {/* BOTTOM LINE */}
              <div className="mt-4 h-5 bg-green-700 rounded-full border-5 border-white "></div>
            </div>
            </div>
          </div>




          {/* 🔥 PLAYER RANKING */}
          <div className="w-full max-w-8xl mx-auto mt-8">

            <div className="bg-[#2C2C2C] rounded-3xl p-4 shadow-xl">
              <h2 className="text-center text-white text-2xl md:text-3xl font-regular mb-4">
                Player Ranking
              </h2>

              <div className="flex gap-4 overflow-x-auto pb-4">
                {[1, 2, 3, 4, 5, 6, 7].map((rank) => (
                  <div
                    key={rank}
                    className="min-w-55 bg-white text-black rounded-xl p-4 text-center shadow"
                  >
                    <p className="font-bold">Rank-{rank}: Player {rank}</p>
                    <p className="mt-2 font-bold">Tno: {rank * 100}</p>
                    <p className="mt-2 font-bold ">(15/15)</p>
                  </div>
                ))}
              </div>
            </div>

          </div>


          {/* 🎟 TICKET SEARCH SECTION */}
          <div className="w-full max-w-8xl mx-auto mt-6">

            <div className="bg-[#6B6B6B] rounded-3xl shadow-xl">

              <div  className="bg-[#848484] rounded-3xl p-4 shadow-xl" >
                <h2 className="text-white text-xl md:text-2xl font-semibold text-center">
                TICKETS FOR GAMES
               </h2>
              </div>
            
              <div className="flex flex-col items-center gap-3 mt-2">
                <input
                  placeholder="e.g enter tno,name or agent"
                  className="px-6 py-2 rounded-full bg-white text-black w-full max-w-md outline-none"
                />

                <button className="bg-yellow-400 text-black px-8 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition m-3">
                  Search
                </button>

              </div>

            </div>

          </div>


          {/* 🏆 WINNER LIST */}
          <div className="w-full max-w-8xl mx-auto mt-6">

            <div className="bg-[#2C2C2C] rounded-3xl p-4 shadow-xl">

              <h2 className="text-center text-white text-2xl md:text-3xl font-semibold mb-6">
                Winner List
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                {[
                  "First Full House",
                  "Second Full House",
                  "Third Full House",
                  "Full Sheet Bonus",
                  "Bottom Line",
                  "Middle Line",
                ].map((title, index) => (   
                  <div
                    key={index}
                    className="bg-linear-to-b from-yellow-400 to-yellow-600 rounded-2xl p-4 shadow-lg text-center"
                  >
                    <div className="bg-green-700 text-white py-1 rounded-full mb-3 text-sm font-semibold">
                      {title}
                    </div>

                    <p className="font-bold text-black">
                      TNO: {200 + index} (Player)
                    </p>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default AfterGameLive;