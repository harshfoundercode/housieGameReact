import { useState, useCallback, useMemo } from 'react';

export const useBookingModal = () => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [playerName, setPlayerName] = useState("");
  const [playerPhone, setPlayerPhone] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ticket type calculations
  const ticketTypeDetails = useMemo(() => {
    const types = {
      random: { name: "Single Ticket", price: 100, tickets: 1, icon: '🎲' },
      halfsheet: { name: "Half Sheet (6 Tickets)", price: 500, tickets: 6, icon: '📄' },
      fullsheet: { name: "Full Sheet (12 Tickets)", price: 1000, tickets: 12, icon: '📋' },
    };
    return types[selectedTicketType] || { name: "Not Selected", price: 0, tickets: 0, icon: '❓' };
  }, [selectedTicketType]);

  const getTicketTypeName = useCallback(() => {
    return ticketTypeDetails.name;
  }, [ticketTypeDetails]);

  const getTicketTypePrice = useCallback(() => {
    return ticketTypeDetails.price;
  }, [ticketTypeDetails]);

  const getTotalPrice = useCallback(() => {
    return getTicketTypePrice() * quantity;
  }, [getTicketTypePrice, quantity]);

  const getTicketCount = useCallback(() => {
    return ticketTypeDetails.tickets * quantity;
  }, [ticketTypeDetails.tickets, quantity]);

  const getOrderSummary = useCallback(() => {
    return {
      playerName,
      playerPhone,
      ticketType: getTicketTypeName(),
      ticketTypePrice: getTicketTypePrice(),
      quantity,
      totalTickets: getTicketCount(),
      totalPrice: getTotalPrice(),
      pricePerTicket: selectedTicketType === 'random' ? 100 : 
                      selectedTicketType === 'halfsheet' ? 83.33 : 
                      selectedTicketType === 'fullsheet' ? 83.33 : 0
    };
  }, [playerName, playerPhone, getTicketTypeName, getTicketTypePrice, quantity, getTicketCount, getTotalPrice, selectedTicketType]);

  // Navigation
  const openBookingModal = useCallback(() => {
    setShowBookingModal(true);
    setCurrentStep(1);
    setSelectedTicketType("");
    setQuantity(1);
    setPlayerName("");
    setPlayerPhone("");
    setShowHelp(false);
    setIsSubmitting(false);
  }, []);

  const closeBookingModal = useCallback(() => {
    setShowBookingModal(false);
    resetBooking();
  }, []);

  const resetBooking = useCallback(() => {
    setSelectedTicketType("");
    setCurrentStep(1);
    setQuantity(1);
    setPlayerName("");
    setPlayerPhone("");
    setShowHelp(false);
    setIsSubmitting(false);
  }, []);

  const goToStep = useCallback((step) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  }, []);

  const nextStep = useCallback(() => {
    // Validation before moving to next step
    if (currentStep === 1) {
      if (!playerName.trim() || !playerPhone.trim()) {
        alert("Please fill in your details to continue");
        return false;
      }
      if (playerPhone.length < 10) {
        alert("Please enter a valid phone number");
        return false;
      }
    }
    
    if (currentStep === 2 && !selectedTicketType) {
      alert("Please select a ticket type");
      return false;
    }
    
    setCurrentStep(prev => Math.min(prev + 1, 4));
    return true;
  }, [currentStep, playerName, playerPhone, selectedTicketType]);

  const previousStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  // Quantity management
  const incrementQuantity = useCallback(() => {
    setQuantity(prev => Math.min(prev + 1, 10)); // Max 10
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity(prev => Math.max(prev - 1, 1)); // Min 1
  }, []);

  // Help toggle
  const toggleHelp = useCallback(() => {
    setShowHelp(prev => !prev);
  }, []);

  // Form validation
  const validateStep = useCallback((step) => {
    switch(step) {
      case 1:
        return playerName.trim().length > 0 && playerPhone.trim().length >= 10;
      case 2:
        return selectedTicketType !== "";
      case 3:
        return quantity >= 1 && quantity <= 10;
      case 4:
        return true;
      default:
        return false;
    }
  }, [playerName, playerPhone, selectedTicketType, quantity]);

  const isCurrentStepValid = useMemo(() => {
    return validateStep(currentStep);
  }, [currentStep, validateStep]);

  // Submit booking
  const submitBooking = useCallback(async () => {
    if (!playerName || !playerPhone) {
      alert("Please fill in all required fields");
      return false;
    }

    if (!selectedTicketType) {
      alert("Please select a ticket type");
      return false;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert(
        `🎉 Booking Successful!\n\n` +
        `Thank you ${playerName}!\n\n` +
        `Ticket Type: ${getTicketTypeName()}\n` +
        `Quantity: ${quantity}\n` +
        `Total Tickets: ${getTicketCount()}\n` +
        `Total Amount: ₹${getTotalPrice()}\n\n` +
        `You will receive confirmation on ${playerPhone}\n\n` +
        `Good luck for the game! 🍀`
      );

      closeBookingModal();
      return true;
    } catch (error) {
      alert("❌ Booking failed. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [playerName, playerPhone, selectedTicketType, quantity, getTicketTypeName, getTicketCount, getTotalPrice, closeBookingModal]);

  // Progress calculation
  const getProgress = useCallback(() => {
    return ((currentStep - 1) / 3) * 100; // 0%, 33%, 66%, 100%
  }, [currentStep]);

  return {
    // State
    showBookingModal,
    setShowBookingModal,
    selectedTicketType,
    setSelectedTicketType,
    currentStep,
    setCurrentStep,
    quantity,
    setQuantity,
    playerName,
    setPlayerName,
    playerPhone,
    setPlayerPhone,
    showHelp,
    setShowHelp,
    isSubmitting,
    
    // Computed
    ticketTypeDetails,
    isCurrentStepValid,
    orderSummary: getOrderSummary(),
    progress: getProgress(),
    
    // Navigation
    openBookingModal,
    closeBookingModal,
    resetBooking,
    goToStep,
    nextStep,
    previousStep,
    
    // Quantity
    incrementQuantity,
    decrementQuantity,
    
    // Help
    toggleHelp,
    
    // Calculations
    getTicketTypeName,
    getTicketTypePrice,
    getTotalPrice,
    getTicketCount,
    
    // Actions
    validateStep,
    submitBooking
  };
};