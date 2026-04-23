import React, { useState } from "react";

const WinnerList = () => {
  const calledNumbers = new Set([5, 12, 23, 34, 45, 56, 67, 78, 89]);

  const [selectedWinner, setSelectedWinner] = useState(null);

  const winnerCategories = [
    "First Full House",
    "Second Full House",
    "Third Full House",
    "Full Sheet Bonus",
    "Bottom Line",
    "Middle Line",
  ];

  // Sample ticket generator (since it was missing)
  const generateSampleTicket = () => {
    return [
      [1, 0, 23, 0, 45, 0, 67, 0, 89],
      [0, 12, 0, 34, 0, 56, 0, 78, 0],
      [5, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  };

  return (
    <>
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
                className="bg-gradient-to-b from-[#FBEFA4] to-[#FFE44D] rounded-2xl p-4 shadow-lg text-center cursor-pointer hover:scale-105 transition border-2 border-white"
              >
                <div className="bg-[#004296] text-[#FBEFA4] py-1 rounded-full mb-3 text-sm font-semibold">
                  {title}
                </div>
                <p className="font-bold text-[#004296]">
                  TNO: {200 + index} (Player)
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WINNER MODAL */}
      {selectedWinner && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-[#004296] to-[#002b66] rounded-3xl w-full max-w-3xl p-4 relative shadow-2xl border-2 border-[#FBEFA4]">
            <button
              onClick={() => setSelectedWinner(null)}
              className="absolute top-3 right-3 bg-[#004296] text-[#FBEFA4] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#003380] border border-[#FBEFA4]"
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
                {generateSampleTicket()
                  .flat()
                  .map((num, i) => {
                    const isMarked = calledNumbers.has(num);

                    return (
                      <div
                        key={i}
                        className={`h-10 flex items-center justify-center border rounded text-sm font-semibold
                        ${
                          isMarked
                            ? "bg-[#004296] text-[#FBEFA4] border-[#FBEFA4]"
                            : "bg-white text-[#004296] border-[#004296]/30"
                        }
                        ${
                          num === 0
                            ? "bg-transparent border-transparent text-transparent"
                            : ""
                        }`}
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
    </>
  );
};

export default WinnerList;