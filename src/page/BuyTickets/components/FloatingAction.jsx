import React from 'react';

const FloatingActionButtons = ({ 
  isMobile, 
  availableTickets, 
  showFabMenu, 
  setShowFabMenu, 
  setShowBookingModal, 
  setCurrentStep, 
  setShowAgentModal 
}) => {
  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 sm:gap-3">
      {showFabMenu && (
        <div className="flex flex-col gap-2 sm:gap-3 mb-2 sm:mb-3">
          <button
            onClick={() => {
              setShowFabMenu(false);
              setShowBookingModal(true);
              setCurrentStep(1);
            }}
            className="fab-menu-button flex items-center gap-2 sm:gap-3 bg-linear-to-r from-[#004296] to-[#003380] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl text-xs sm:text-sm border-2 border-[#FBEFA4]"
          >
            <span className="text-base sm:text-xl">🎫</span>
            <span className="font-semibold">
              {isMobile ? availableTickets : `${availableTickets} Tickets Available`}
            </span>
          </button>

          <button
            onClick={() => {
              setShowFabMenu(false);
              setShowAgentModal(true);
            }}
            className="fab-menu-button flex items-center gap-2 sm:gap-3 bg-[#FBEFA4] text-[#004296] px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl text-xs sm:text-sm font-bold"
          >
            <span className="text-base sm:text-xl">📞</span>
            <span className="font-semibold">Contact Agent</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setShowFabMenu(!showFabMenu)}
        className="fab-button w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 bg-linear-to-br from-[#004296] to-[#003380] rounded-full shadow-2xl flex items-center justify-center border-3 border-[#FBEFA4] hover:scale-110 transition-all"
      >
        <span className={`text-xl sm:text-2xl md:text-3xl text-[#FBEFA4] transition-transform duration-300 ${showFabMenu ? 'rotate-45' : ''}`}>
          {showFabMenu ? '✕' : '🎯'}
        </span>
      </button>
    </div>
  );
};

export default FloatingActionButtons;