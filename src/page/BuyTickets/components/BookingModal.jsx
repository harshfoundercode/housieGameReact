import React, { useState } from 'react';
import { TICKET_TYPES } from '../../BuyTickets/Utils/constants';

const BookingModal = ({ 
  showBookingModal, 
  setShowBookingModal, 
  currentStep, 
  setCurrentStep, 
  selectedTicketType, 
  setSelectedTicketType, 
  quantity, 
  setQuantity, 
  playerName, 
  setPlayerName, 
  playerPhone, 
  setPlayerPhone 
}) => {
  const [showHelp, setShowHelp] = useState(false);

  if (!showBookingModal) return null;

  const getTicketTypeName = () => {
    const types = {
      random: "Single Ticket",
      halfsheet: "Half Sheet (6 Tickets)",
      fullsheet: "Full Sheet (12 Tickets)",
    };
    return types[selectedTicketType] || "Not Selected";
  };

  const getTicketTypePrice = () => {
    switch (selectedTicketType) {
      case "random": return 100;
      case "halfsheet": return 500;
      case "fullsheet": return 1000;
      default: return 0;
    }
  };

  const getTotalPrice = () => {
    return getTicketTypePrice() * quantity;
  };

  const getTicketCount = () => {
    if (selectedTicketType === "random") return quantity;
    if (selectedTicketType === "halfsheet") return quantity * 6;
    if (selectedTicketType === "fullsheet") return quantity * 12;
    return 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && (!playerName || !playerPhone)) {
      alert("Please fill in your details to continue");
      return;
    }
    if (currentStep === 2 && !selectedTicketType) {
      alert("Please select a ticket type");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!playerName || !playerPhone) {
      alert("Please fill in all required fields");
      return;
    }

    if (!selectedTicketType) {
      alert("Please select a ticket type");
      return;
    }

    alert(`🎉 Booking Successful!\n\nThank you ${playerName}!\n\nTicket Type: ${getTicketTypeName()}\nQuantity: ${quantity}\nTotal Tickets: ${getTicketCount()}\nTotal Amount: ₹${getTotalPrice()}\n\nYou will receive confirmation on ${playerPhone}\n\nGood luck for the game! 🍀`);

    setShowBookingModal(false);
    setPlayerName("");
    setPlayerPhone("");
    setQuantity(1);
    setSelectedTicketType("");
    setCurrentStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="booking-modal bg-linear-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">
        {/* Modal Header with Progress Bar */}
        <div className="sticky top-0 bg-linear-to-r from-[#004296] to-[#003380] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-[#FBEFA4]/50 z-10">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4]">Book Your Tickets</h2>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                title="How to book tickets?"
              >
                <span className="text-base sm:text-lg">❓</span>
              </button>
            </div>
            <button
              onClick={() => {
                setShowBookingModal(false);
                setCurrentStep(1);
                setSelectedTicketType("");
                setQuantity(1);
              }}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <span className="text-xl sm:text-2xl">✕</span>
            </button>
          </div>

          {/* Help Box */}
          {showHelp && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-sm border border-[#FBEFA4]/30">
              <h3 className="font-bold text-[#FBEFA4] mb-2">📖 How to Book Tickets:</h3>
              <ol className="list-decimal list-inside space-y-1 text-white/90">
                <li>Enter your name and phone number</li>
                <li>Choose your ticket type (Single, Half Sheet, or Full Sheet)</li>
                <li>Select quantity</li>
                <li>Review your order and confirm booking</li>
              </ol>
              <p className="mt-2 text-[#FBEFA4]">💡 Tip: Half Sheet and Full Sheet give better value and more winning chances!</p>
            </div>
          )}

          {/* Progress Steps */}
          <div className="progress-steps flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`step-number w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-base transition-all ${
                  currentStep >= step
                    ? 'bg-[#FBEFA4] text-[#004296] shadow-lg'
                    : 'bg-white/20 text-white/60'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-8 sm:w-12 md:w-20 h-1 mx-1 sm:mx-2 ${currentStep > step ? 'bg-[#FBEFA4]' : 'bg-white/20'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1 sm:mt-2 text-[0.625rem] sm:text-xs text-white/80">
            <span>Details</span>
            <span>Choose Type</span>
            <span>Quantity</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Modal Body with Steps */}
        <form onSubmit={handleBookingSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* STEP 1: Player Details */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-linear-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
                  <span>👤</span> Step 1: Your Details
                </h3>
                <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6">Please enter your information to book tickets</p>

                <div className="form-grid grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-[#FBEFA4] mb-2 text-base sm:text-lg">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="e.g., Raj Kumar"
                      className="w-full px-3 sm:px-4 py-2 sm:py-4 rounded-xl bg-white/10 border-2 border-[#FBEFA4]/30 text-white placeholder-white/40 outline-none focus:border-[#FBEFA4] text-sm sm:text-base"
                      required
                    />
                    <p className="text-[0.625rem] sm:text-xs text-white/50 mt-1">This name will appear on your ticket</p>
                  </div>

                  <div>
                    <label className="block text-[#FBEFA4] mb-2 text-base sm:text-lg">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={playerPhone}
                      onChange={(e) => setPlayerPhone(e.target.value)}
                      placeholder="e.g., 9876543210"
                      className="w-full px-3 sm:px-4 py-2 sm:py-4 rounded-xl bg-white/10 border-2 border-[#FBEFA4]/30 text-white placeholder-white/40 outline-none focus:border-[#FBEFA4] text-sm sm:text-base"
                      required
                    />
                    <p className="text-[0.625rem] sm:text-xs text-white/50 mt-1">We'll send booking confirmation via SMS/WhatsApp</p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <p className="text-xs sm:text-sm text-blue-200">
                    <span className="font-bold">🔒 Your information is safe:</span> We only use this to send your ticket details and game updates.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold text-sm sm:text-base"
                >
                  Next: Choose Ticket Type →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Ticket Type */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
                  <span>🎫</span> Step 2: Choose Ticket Type
                </h3>

                <div className="ticket-types-grid grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {TICKET_TYPES.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setSelectedTicketType(type.id)}
                      className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                        selectedTicketType === type.id
                          ? 'border-[#FBEFA4] bg-[#FBEFA4]/10'
                          : 'border-white/20 bg-white/5 hover:border-[#FBEFA4]/50'
                      }`}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <h4 className="text-lg font-bold text-white">{type.name}</h4>
                      <p className="text-[#FBEFA4] font-bold text-xl mt-1">₹{type.price}</p>
                      <p className="text-white/60 text-sm">{type.tickets} ticket{type.tickets > 1 ? 's' : ''}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-sm sm:text-base"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!selectedTicketType}
                  className={`px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-white font-bold text-sm sm:text-base ${
                    selectedTicketType
                      ? 'bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      : 'bg-gray-500 cursor-not-allowed'
                  }`}
                >
                  Next: Select Quantity →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Select Quantity */}
          {currentStep === 3 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-linear-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
                  <span>🔢</span> Step 3: Select Quantity
                </h3>

                <div>
                  <label className="block text-[#FBEFA4] mb-2 text-base sm:text-lg">
                    How many {selectedTicketType === 'random' ? 'tickets' : selectedTicketType === 'halfsheet' ? 'half sheets' : 'full sheets'}?
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full text-white text-xl font-bold"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-white">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full text-white text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-white/60 text-sm mt-2">Total Tickets: {getTicketCount()}</p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-sm sm:text-base"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold text-sm sm:text-base"
                >
                  Next: Review →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Confirm */}
          {currentStep === 4 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
                  <span>✅</span> Step 4: Review & Confirm
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span className="text-white/70">Player Name:</span>
                    <span className="text-white font-bold">{playerName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span className="text-white/70">Phone Number:</span>
                    <span className="text-white font-bold">{playerPhone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span className="text-white/70">Ticket Type:</span>
                    <span className="text-white font-bold">{getTicketTypeName()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span className="text-white/70">Quantity:</span>
                    <span className="text-white font-bold">{quantity}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/20">
                    <span className="text-white/70">Total Tickets:</span>
                    <span className="text-white font-bold">{getTicketCount()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#FBEFA4] text-lg font-bold">Total Amount:</span>
                    <span className="text-[#FBEFA4] text-xl font-bold">₹{getTotalPrice()}</span>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-xs sm:text-sm text-green-200">
                    By confirming, you agree to our terms and conditions. Payment will be collected by your assigned agent.
                  </p>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-sm sm:text-base"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-linear-to-r from-[#FBEFA4] to-[#FFE44D] hover:from-[#FFE44D] hover:to-[#FBEFA4] rounded-xl text-[#004296] font-bold text-sm sm:text-base"
                >
                  Confirm Booking 🎉
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingModal;