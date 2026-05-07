import React from 'react';

const TimerCards = ({ getFormattedGameDate, getFormattedGameTime, getGameDay, timeLeft }) => {
  const timerCards = [
    { icon: '📅', label: 'Date', value: getFormattedGameDate() },
    { icon: '⏰', label: 'Time', value: getFormattedGameTime() },
    { icon: '📆', label: 'Day', value: getGameDay() },
    { icon: '⏱️', label: 'Timer', value: timeLeft || "..." , highlight: true },
  ];

  return (
    <>
      {/* Mobile View - 4 Cards in One Row */}
      <div className="flex sm:hidden gap-1">
        {timerCards.map((card, index) => (
          <div
            key={index}
            className={`flex-1 backdrop-blur-lg rounded-lg p-1.5 border ${
              card.highlight
                ? 'bg-[#FBEFA4]/10 border-2 border-[#FBEFA4]'
                : 'bg-[#004296]/60 border-[#FBEFA4]/30'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-[#FBEFA4] text-xs">{card.icon}</span>
              <p className="font-bold text-[#FBEFA4] text-[8px] leading-tight mt-0.5">{card.label}</p>
            </div>
            <p className={`text-[10px] font-bold text-center mt-1 ${
              card.highlight ? 'text-[#FBEFA4] font-mono' : 'text-white'
            }`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop View - Grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {timerCards.map((card, index) => (
          <div
            key={index}
            className={`backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border ${
              card.highlight
                ? 'bg-[#FBEFA4]/10 border-2 border-[#FBEFA4]'
                : 'bg-[#004296]/60 border-[#FBEFA4]/30'
            }`}
          >
            <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
              <span className="text-[#FBEFA4] text-lg">{card.icon}</span>
              <p className="font-bold text-[#FBEFA4] text-sm sm:text-base">{card.label}</p>
            </div>
            <p className={`text-lg sm:text-xl md:text-2xl font-bold text-center ${
              card.highlight ? 'text-[#FBEFA4] font-mono' : 'text-white'
            }`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TimerCards;