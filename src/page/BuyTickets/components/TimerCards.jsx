import React from 'react';

const TimerCards = ({ getFormattedGameDate, getFormattedGameTime, getGameDay, timeLeft }) => {
  const timerCards = [
    { icon: '📅', label: 'Game Date', value: getFormattedGameDate() },
    { icon: '⏰', label: 'Draw Time', value: getFormattedGameTime() },
    { icon: '📆', label: 'Day', value: getGameDay() },
    { icon: '⏱️', label: 'Countdown', value: timeLeft || "Calculating...", highlight: true },
  ];

  return (
    <div className="timer-cards grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      {timerCards.map((card, index) => (
        <div
          key={index}
          className={`timer-card backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border ${
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
  );
};

export default TimerCards;