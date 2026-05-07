// import { useState, useCallback , useEffect } from 'react';
// import { bookTicket, getWalletBalance } from '../../../services/booking_services';

// export const useCheckoutModal = () => {
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [bookingSuccess, setBookingSuccess] = useState(false);

//    // Fetch wallet balance
//   useEffect(() => {
//     fetchWalletBalance();
//   }, []);

//   const fetchWalletBalance = async () => {
//     try {
//       const response = await getWalletBalance();
//       if (response.success && response.data) {
//         setWalletBalance(response.data.total_balance || 0);
//       }
//     } catch (error) {
//       console.error("Error fetching wallet balance:", error);
//     }
//   };

//   const openCheckout = useCallback(() => {
//     setShowCheckout(true);
//     setSelectedPaymentMethod(null);
//     fetchWalletBalance(); // Refresh balance
//   }, []);

//   const closeCheckout = useCallback(() => {
//     setShowCheckout(false);
//     setSelectedPaymentMethod(null);
//     setIsProcessing(false);
//   }, []);

//   const selectPaymentMethod = useCallback((methodId) => {
//     setSelectedPaymentMethod(methodId);
//   }, []);

//     // Wallet Payment - Direct Booking
//   const handleWalletPayment = useCallback(async (cartTotal, cartItems, onSuccess) => {
//     if (walletBalance < cartTotal) {
//       alert(`❌ Insufficient Balance!\n\nWallet Balance: ₹${walletBalance}\nCart Total: ₹${cartTotal}\n\nPlease add funds or choose agent payment.`);
//       return;
//     }

//     setIsProcessing(true);
    
//     try {
//       // Extract ticket IDs from cart
//       const ticketIds = cartItems.map(item => item.id || item.ticket_id);
      
//       const bookingData = {
//         game_id: gameId,
//         type: "direct",
//         ticket_ids: ticketIds
//       };

//       console.log("Booking Data (Direct):", bookingData);

//       const response = await bookTicket(bookingData);

//       if (response.success) {
//         setBookingSuccess(true);
//         alert(`✅ Payment Successful!\n\nAmount Deducted: ₹${cartTotal}\nRemaining Balance: ₹${walletBalance - cartTotal}\n\nYour tickets have been booked successfully!\n\nThank you for your purchase! 🎉`);
        
//         // Refresh wallet balance
//         fetchWalletBalance();
        
//         closeCheckout();
//         if (onSuccess) onSuccess();
//       } else {
//         throw new Error(response.message || 'Booking failed');
//       }
//     } catch (error) {
//       console.error("Booking error:", error);
//       alert(`❌ Booking Failed!\n\n${error.message}\n\nPlease try again or contact support.`);
//     } finally {
//       setIsProcessing(false);
//     }
//   }, [walletBalance, gameId, closeCheckout, fetchWalletBalance]);


//   const handleAgentPayment = useCallback((onProceed) => {
//     setShowCheckout(false);
//     setSelectedPaymentMethod('agent');
//     if (onProceed) onProceed();
//   }, []);

//   // Agent Booking - Called after agent selection
//   const handleAgentBooking = useCallback(async (agentId, cartItems, onSuccess) => {
//     setIsProcessing(true);
    
//     try {
//       const ticketIds = cartItems.map(item => item.id || item.ticket_id);
      
//       const bookingData = {
//         game_id: gameId,
//         agent_id: agentId,
//         type: "agent",
//         ticket_ids: ticketIds
//       };

//       console.log("Booking Data (Agent):", bookingData);

//       const response = await bookTicket(bookingData);

//       if (response.success) {
//         setBookingSuccess(true);
//         alert(`✅ Booking Request Sent!\n\nThe agent will process your booking shortly.\n\nThank you for your patience! 🎉`);
        
//         closeCheckout();
//         if (onSuccess) onSuccess();
//       } else {
//         throw new Error(response.message || 'Agent booking failed');
//       }
//     } catch (error) {
//       console.error("Agent booking error:", error);
//       alert(`❌ Booking Failed!\n\n${error.message}\n\nPlease try again or contact support.`);
//     } finally {
//       setIsProcessing(false);
//     }
//   }, [gameId, closeCheckout]);

//   return {
//     showCheckout,
//     setShowCheckout,
//     selectedPaymentMethod,
//     setSelectedPaymentMethod,
//     walletBalance,
//     isProcessing,
//     bookingSuccess,
//     openCheckout,
//     closeCheckout,
//     selectPaymentMethod,
//     handleWalletPayment,
//     handleAgentPayment,
//     handleAgentBooking,
//     fetchWalletBalance
//   };
// };

//   const validateAndProcessPayment = useCallback((cartTotal, cartCount) => {
//     if (!selectedPaymentMethod) {
//       alert("Please select a payment method");
//       return false;
//     }

//     if (cartCount === 0) {
//       alert("Your cart is empty!");
//       return false;
//     }

//     return true;
//   }, [selectedPaymentMethod]);

//   return {
//     showCheckout,
//     setShowCheckout,
//     selectedPaymentMethod,
//     setSelectedPaymentMethod,
//     walletBalance,
//     isProcessing,
//     openCheckout,
//     closeCheckout,
//     selectPaymentMethod,
//     handleWalletPayment,
//     handleAgentPayment,
//     validateAndProcessPayment
//   };

import { useState, useCallback, useEffect } from 'react';
import { bookTicket } from '../../../services/booking_services';

export const useCheckoutModal = (gameId) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);



  const openCheckout = useCallback(() => {
    setShowCheckout(true);
    setSelectedPaymentMethod(null);
  }, []);

  const closeCheckout = useCallback(() => {
    setShowCheckout(false);
    setSelectedPaymentMethod(null);
    setIsProcessing(false);
  }, []);

  const selectPaymentMethod = useCallback((methodId) => {
    setSelectedPaymentMethod(methodId);
  }, []);

  // Wallet Payment - Direct Booking
// Direct Payment - Payment Gateway (Future Implementation)
  const handleDirectPayment = useCallback(async (cartTotal, cartItems, onSuccess) => {
    setIsProcessing(true);
    
    try {
      const ticketIds = cartItems.map(item => {
        const ticketId = item.id || item.ticket_id || item.ticketId || item.number;
        return Number(ticketId);
      });
      
      const bookingData = {
        game_id: Number(gameId),
        type: "direct",
        ticket_ids: ticketIds
      };

      console.log("Direct Booking Data:", bookingData);

      // For now, just show message that payment gateway will open
      // Later: Integrate Razorpay/PhonePe/Paytm
      alert(`🔄 Payment Gateway\n\nPayment gateway will be integrated soon!\n\nBooking Details:\nGame ID: ${gameId}\nTickets: ${ticketIds.join(', ')}\nAmount: ₹${cartTotal}\n\nYour booking will be processed once payment is complete.`);
      
      // Temporary: Direct API call without payment
      const response = await bookTicket(bookingData);

      if (response.success) {
        setBookingSuccess(true);
        alert(`✅ Booking Successful!\n\nYour tickets ${ticketIds.join(', ')} have been booked!\nAmount: ₹${cartTotal}\n\nThank you for your purchase! 🎉`);
        
        closeCheckout();
        if (onSuccess) onSuccess();
      } else {
        throw new Error(response.message || 'Booking failed');
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert(`❌ Booking Failed!\n\n${error.message}\n\nPlease try again or contact support.`);
    } finally {
      setIsProcessing(false);
    }
  }, [gameId, closeCheckout]);


  // Agent Payment - Opens agent modal
  const handleAgentPayment = useCallback((onProceed) => {
    setShowCheckout(false);
    setSelectedPaymentMethod('agent');
    if (onProceed) onProceed();
  }, []);

  
  const handleAgentBooking = useCallback(async (agentId, cartItems, onSuccess) => {
    console.log("=== Agent Booking Debug ===");
    console.log("Agent ID:", agentId);
    console.log("Cart Items:", cartItems);
    
    setIsProcessing(true);
    
    try {
      const ticketIds = cartItems.map(item => {
        const ticketId = item.id || item.ticket_id || item.ticketId || item.number;
        console.log(`Cart Item:`, item, `Ticket ID:`, ticketId);
        return Number(ticketId);
      });
      
      const bookingData = {
        game_id: Number(gameId),
        agent_id: Number(agentId),
        type: "agent",
        ticket_ids: ticketIds
      };

      console.log("Agent Booking Data:", bookingData);

      const response = await bookTicket(bookingData);
      console.log("Booking Response:", response);

      if (response.success) {
        setBookingSuccess(true);
        alert(`✅ Booking Request Sent!\n\nYour tickets: ${ticketIds.join(', ')}\n\nThe agent will process your booking shortly.\n\nThank you for your patience! 🎉`);
        
        closeCheckout();
        if (onSuccess) onSuccess();
      } else {
        throw new Error(response.message || 'Agent booking failed');
      }
    } catch (error) {
      console.error("Agent booking error:", error);
      alert(`❌ Booking Failed!\n\n${error.message}\n\nPlease try again or contact support.`);
    } finally {
      setIsProcessing(false);
    }
  }, [gameId, closeCheckout]);

  // Future: Payment gateway integration
  const initializePaymentGateway = useCallback((amount, tickets, onSuccess) => {
    // TODO: Integrate payment gateway (Razorpay/PhonePe/Paytm)
    console.log("Payment Gateway - To be integrated");
    
    // Example Razorpay integration (future):
    /*
    const options = {
      key: 'rzp_test_XXXXXXXXXX',
      amount: amount * 100,
      currency: 'INR',
      name: 'Your App Name',
      description: `Booking ${tickets.length} tickets`,
      handler: function(response) {
        handleDirectPayment(amount, tickets, onSuccess);
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
      },
      theme: {
        color: '#004296'
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    */
  }, []);

  return {
    // State
    showCheckout,
    setShowCheckout,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    isProcessing,
    bookingSuccess,
    
    // Actions
    openCheckout,
    closeCheckout,
    selectPaymentMethod,
    handleDirectPayment,    // Direct booking with payment gateway
    handleAgentPayment,      // Agent payment flow
    handleAgentBooking,      // Agent booking API
    initializePaymentGateway // Future payment gateway
  };
};