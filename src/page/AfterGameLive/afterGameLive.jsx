import React, { useEffect, useState, useRef } from "react";

const AfterGameLive = () => {
  const [timeLeft, setTimeLeft] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Controlled input
  const [selectedWinner, setSelectedWinner] = useState(null);

  const gameTimeRef = useRef(new Date());

  // Set game time once (21:00)
  useEffect(() => {
    const gameTime = gameTimeRef.current;
    gameTime.setHours(21);
    gameTime.setMinutes(0);
    gameTime.setSeconds(0);
    gameTime.setMilliseconds(0);
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

  // Format date based on screen size (using CSS media query is preferred, but keep for simplicity)
  const dateString = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: window.innerWidth >= 640 ? "numeric" : undefined,
  });

  // Generate numbers 1-90
  const numbers = Array.from({ length: 90 }, (_, i) => i + 1);

  // --- Mock data (replace with actual data from props/API) ---
  const calledNumbers = new Set([5, 12, 23, 34, 45, 56, 67, 78, 89]); // Example called numbers
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
  // -----------------------------------------------------------

  // Handle search (placeholder)
  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Implement actual search logic
  };

  // Helper to generate a sample ticket (static for demo)
  const generateSampleTicket = () => {
    // In a real app, you'd fetch ticket data based on TNO
    const ticketNumbers = [
      [4, 16, 28, 0, 41, 53, 0, 70, 82],
      [9, 0, 21, 33, 45, 0, 58, 69, 0],
      [0, 12, 24, 0, 37, 49, 61, 0, 73],
    ];
    return ticketNumbers;
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6 relative">
      <div className="relative z-10 max-w-7xl mx-auto space-y-3">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-b-3xl bg-gradient-to-br from-[#4D4D4D] via-[#4A4A4A] to-[#303030] p-3 md:p-5">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#303030] rounded-full filter blur-3xl opacity-20"></div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center bg-white bg-clip-text text-transparent tracking-wider">
            GET RICH
          </h1>
        </div>

        <div className="overflow-hidden rounded-b-3xl bg-gradient-to-br from-[#4D4D4D] via-[#4A4A4A] to-[#303030] p-2 md:p-3 relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#303030] rounded-full filter blur-3xl opacity-20"></div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center bg-white bg-clip-text text-transparent tracking-wider">
            Regular Player Link
          </h2>
        </div>

        {/* TIMER SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          <div className="bg-[#4D4D4D] backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6">
            <p className="font-bold text-white text-sm sm:text-base text-center mb-1">Date</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white">
              {dateString}
            </p>
          </div>

          <div className="bg-[#4D4D4D] backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6">
            <p className="font-bold text-white text-sm sm:text-base text-center mb-1">Countdown</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white font-mono">
              {timeLeft}
            </p>
          </div>

          <div className="bg-[#4D4D4D] backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6">
            <p className="font-bold text-white text-sm sm:text-base text-center mb-1">Game Time</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white">
              {formattedGameTime}
            </p>
          </div>
        </div>

        {/* NUMBER BOARD SECTION */}
        <div className="overflow-hidden rounded-2xl bg-[#FFC107] p-2 md:p-5">
          <div className="w-full max-w-4xl mx-auto mt-6">
            {/* GAME OVER BADGE */}
            <div className="flex justify-center mb-4 relative">
              <div className="absolute top-1/2 w-full h-0.5 bg-white shadow-lg shadow-red-700"></div>
              <h2 className="relative z-10 bg-red-600 text-white text-xl md:text-2xl font-bold px-6 py-2 rounded shadow-lg border-4 border-white">
                GAME IS OVER
              </h2>
            </div>

            {/* GRID */}
            <div className="px-2 sm:px-4 md:px-10 lg:px-20">
              <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1 sm:gap-2">
                {numbers.map((num) => {
                  const isCalled = calledNumbers.has(num); // Use actual called numbers
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
                        ${isCalled ? "bg-green-700 text-white" : "bg-orange-400 text-black"}
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
              <div className="mt-4 h-5 bg-green-700 rounded-full border-5 border-white"></div>
            </div>
          </div>
        </div>

        {/* PLAYER RANKING */}
        <div className="w-full max-w-7xl mx-auto mt-8">
          <div className="bg-[#2C2C2C] rounded-3xl p-4 shadow-xl">
            <h2 className="text-center text-white text-2xl md:text-3xl font-normal mb-4">
              Player Ranking
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-4">
              {rankingData.map((item) => (
                <div
                  key={item.rank}
                  className="min-w-[220px] bg-white text-black rounded-xl p-4 text-center shadow"
                >
                  <p className="font-bold">Rank-{item.rank}: {item.name}</p>
                  <p className="mt-2 font-bold">Tno: {item.tno}</p>
                  <p className="mt-2 font-bold">({item.progress})</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TICKET SEARCH SECTION */}
        <div className="w-full max-w-7xl mx-auto mt-6">
          <div className="bg-[#6B6B6B] rounded-3xl shadow-xl">
            <div className="bg-[#848484] rounded-3xl p-4 shadow-xl">
              <h2 className="text-white text-xl md:text-2xl font-semibold text-center">
                TICKETS FOR GAMES
              </h2>
            </div>

            <div className="flex flex-col items-center gap-3 mt-2 p-4">
              <input
                type="text"
                placeholder="e.g enter tno, name or agent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-6 py-2 rounded-full bg-white text-black w-full max-w-md outline-none"
              />
              <button
                onClick={handleSearch}
                className="bg-yellow-400 text-black px-8 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* WINNER LIST */}
        <div className="w-full max-w-7xl mx-auto mt-6">
          <div className="bg-[#2C2C2C] rounded-3xl p-4 shadow-xl">
            <h2 className="text-center text-white text-2xl md:text-3xl font-semibold mb-6">
              Winner List
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
                  className="bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-2xl p-4 shadow-lg text-center cursor-pointer hover:scale-105 transition"
                >
                  <div className="bg-green-700 text-white py-1 rounded-full mb-3 text-sm font-semibold">
                    {title}
                  </div>
                  <p className="font-bold text-black">TNO: {200 + index} (Player)</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WINNER MODAL */}
      {selectedWinner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1f1f1f] rounded-3xl w-full max-w-3xl p-4 relative shadow-2xl">
            <button
              onClick={() => setSelectedWinner(null)}
              className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 className="text-center text-2xl md:text-3xl text-white font-bold mb-4">
              {selectedWinner.title}
            </h2>

            <div className="bg-yellow-400 text-black text-center py-2 rounded-xl font-bold mb-3">
              TNO: {selectedWinner.tno}
            </div>

            <div className="bg-white text-black rounded-full px-4 py-2 mb-4 text-sm">
              Booked By: {selectedWinner.name}
            </div>

            {/* Tambola Ticket Grid */}
            <div className="bg-orange-400 p-3 rounded-2xl">
              <div className="grid grid-cols-9 gap-1">
                {generateSampleTicket().flat().map((num, i) => {
                  const isMarked = calledNumbers.has(num); // Mark if number was called
                  return (
                    <div
                      key={i}
                      className={`h-10 flex items-center justify-center border rounded text-sm font-semibold
                        ${isMarked ? "bg-green-700 text-white" : "bg-gray-200 text-black"}
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
    </div>
  );
};

export default AfterGameLive;