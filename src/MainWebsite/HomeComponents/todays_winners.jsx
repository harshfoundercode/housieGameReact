// export default TodaysWinner;
import React, { useState, useEffect } from "react"; // Added missing imports
import WinnerBg from "../../assets/winnerbg.png";
import  {getWinnerList}  from "../../services/winner_list";

const TodaysWinner = () => {
  const [winnersList, setWinnersList] = useState([]); // Changed from null to []
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWinnersListFromAPI();
  }, []);

  const fetchWinnersListFromAPI = async () => {
    try {
      setLoading(true);
      setError(null);

      // Service call - returns array of WinnersListModel
      const winnersList = await getWinnerList();

      console.log("📦 Winners list received in component:", winnersList);
      console.log("📦 Total winners:", winnersList.length);

      // Convert models to plain objects for component use
      const formattedWinnersList = winnersList.map(winner => winner.toJSON());
      setWinnersList(formattedWinnersList);

    } catch (err) {
      console.error("Error fetching winner list:", err);
      setError(err.message);
      setWinnersList([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to mask phone number
  const maskPhone = (phone) => {
    if (!phone || phone.length < 6) return phone;
    return phone.slice(0, 4) + "****" + phone.slice(-2);
  };

  // Function to get icon based on win type
  const getWinIcon = (winType) => {
    const icons = {
      'FULL': '🏆',
      'TOP': '⭐',
      'MIDDLE': '🎯',
      'BOTTOM': '💫',
      'EARLY5': '🌟'
    };
    return icons[winType] || '🎉';
  };

  // Show loading state
  if (loading) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-600">
            Loading Winners...
          </h2>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-500">
            Error: {error}
          </h2>
        </div>
      </section>
    );
  }

  // Show empty state
  if (!winnersList || winnersList.length === 0) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-600">
            No winners today
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4">

      {/* Section Header */}
      <div className="text-center mb-4 sm:mb-5 md:mb-8 lg:mb-10">
        <h2 className="font-bold text-[#004296] inline-block relative text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Today's Winners
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FBEFA4] rounded-full w-10 h-0.5 sm:w-12 sm:h-0.5 md:w-14 md:h-1 lg:w-16"></span>
        </h2>
      </div>

      {/* Winner Image Container */}
      <div className="mx-auto overflow-hidden w-full shadow-md rounded-lg sm:shadow-lg sm:rounded-xl lg:shadow-xl lg:rounded-2xl mb-6 sm:mb-8">
        <img
          src={WinnerBg}
          alt="Today's Winners"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Winners Grid Container */}
      <div className="mx-auto max-w-full px-1 sm:max-w-xl sm:px-2 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">

          {/* Mobile Grid - 1 column (shows first 6 winners) */}
          <div className="grid grid-cols-1 gap-2 sm:gap-3 md:hidden">
            {winnersList.slice(0, 6).map((winner, index) => (
              <WinnerCard 
                key={winner.winnerId || index} 
                winner={winner} 
                maskPhone={maskPhone}
                getWinIcon={getWinIcon}
                rank={index + 1}
              />
            ))}
          </div>

          {/* Tablet Grid - 2 columns */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-3">
            {winnersList.map((winner, index) => (
              <WinnerCard 
                key={winner.winnerId || index} 
                winner={winner} 
                maskPhone={maskPhone}
                getWinIcon={getWinIcon}
                rank={index + 1}
              />
            ))}
          </div>

          {/* Desktop Grid - Row 1 */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {winnersList.slice(0, 6).map((winner, index) => (
              <WinnerCard 
                key={winner.winnerId || index} 
                winner={winner} 
                maskPhone={maskPhone}
                getWinIcon={getWinIcon}
                rank={index + 1}
              />
            ))}
          </div>

          {/* Desktop Grid - Row 2 */}
          <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-6 gap-3 mt-3">
            {winnersList.slice(6, 12).map((winner, index) => (
              <WinnerCard 
                key={winner.winnerId || index + 6} 
                winner={winner} 
                maskPhone={maskPhone}
                getWinIcon={getWinIcon}
                rank={index + 7}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// Winner Card Component - Fixed with correct property names
const WinnerCard = ({ winner, maskPhone, getWinIcon, rank }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md hover:shadow-lg transition-all duration-300 p-2 sm:p-3 border border-gray-100 hover:border-[#FBEFA4]">
      
      {/* Icon and Win Type */}
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <span className="text-xl sm:text-2xl">
          {getWinIcon(winner.winType)}
        </span>
        <span className="bg-[#004296] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
          {winner.winType}
        </span>
      </div>

      {/* User Name */}
      <h4 className="font-bold text-gray-800 text-xs sm:text-sm md:text-base truncate capitalize">
        {winner.userName}
      </h4>

      {/* Ticket Number and Amount */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-gray-500 text-[10px] sm:text-xs">
          Ticket #{winner.ticketNumber}
        </span>
        <span className="text-[#004296] font-bold text-xs sm:text-sm md:text-base">
          ₹{winner.amount}
        </span>
      </div>

      {/* Phone - Half Hidden */}
      <div className="mt-1.5 sm:mt-2 flex items-center gap-1 text-gray-400 text-[10px] sm:text-xs">
        <span className="hidden xs:inline">📱</span>
        <span className="font-mono">{maskPhone(winner.phone)}</span>
      </div>
    </div>
  );
};

export default TodaysWinner;