import { useState, useCallback, useEffect } from 'react';
import { bookTicket } from '../../../services/booking_services';
import { getUserProfile } from '../../../services/profile_services';

export const useCheckoutModal = (gameId) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletLoading, setWalletLoading] = useState(false);
  const [walletError, setWalletError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const fetchWalletBalance = useCallback(async () => {
    setWalletLoading(true);
    setWalletError(null);

    try {
      const response = await getUserProfile();
      console.log("Full API Response:", response);
      
      if (response.data && response.data.data) {
        const balance = Number(
          response.data.data.total_balance ||
          0
        );
        console.log('fetchWalletBalance: api balance ->', balance);
        setWalletBalance(balance);
        return balance;
      }

      console.warn('fetchWalletBalance: API returned no data, falling back to cached profile');
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const cached = JSON.parse(userStr);
          const cachedBalance = Number(cached.total_balance ?? 0);
          console.log('fetchWalletBalance: cached balance ->', cachedBalance);
          setWalletBalance(cachedBalance);
          return cachedBalance;
        } catch (e) {
          console.warn('fetchWalletBalance: failed to parse cached user', e);
        }
      }

      throw new Error('Failed to load wallet balance');
    } catch (error) {
      console.error('Wallet balance error:', error);
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const cached = JSON.parse(userStr);
          const cachedBalance = Number(cached.total_balance ?? 0);
          console.log('fetchWalletBalance: fallback cached balance ->', cachedBalance);
          setWalletBalance(cachedBalance);
          setWalletError(error.message || 'Unable to load balance (used cached)');
          return cachedBalance;
        } catch (e) {
          console.warn('fetchWalletBalance: failed to parse cached user in catch', e);
        }
      }

      setWalletBalance(0);
      setWalletError(error.message || 'Unable to load balance');
      return 0;
    } finally {
      setWalletLoading(false);
    }
  }, []);

  const openCheckout = useCallback(() => {
    setShowCheckout(true);
    setSelectedPaymentMethod(null);
    fetchWalletBalance();
  }, [fetchWalletBalance]);

  const closeCheckout = useCallback(() => {
    setShowCheckout(false);
    setSelectedPaymentMethod(null);
    setIsProcessing(false);
  }, []);

  const selectPaymentMethod = useCallback((methodId) => {
    setSelectedPaymentMethod(methodId);
  }, []);

  // ✅ Fixed: Helper function to prepare ticket_ids with per ticket pricing
  const prepareTicketIdsPayload = useCallback((cartItems, apiPricing) => {
    if (!cartItems || cartItems.length === 0) return [];

    console.log("📊 prepareTicketIdsPayload - cartItems:", cartItems);
    console.log("📊 prepareTicketIdsPayload - apiPricing:", apiPricing);

    // First, group tickets to determine their type
    const ticketNumbers = cartItems.map(ticket => {
      const num = parseInt(ticket.ticketNumber || ticket.ticket_number || ticket.id || '0');
      return { ticket, number: num };
    }).sort((a, b) => a.number - b.number);

    const rows = {};
    ticketNumbers.forEach(({ ticket, number }) => {
      const rowNumber = Math.ceil(number / 6);
      if (!rows[rowNumber]) {
        rows[rowNumber] = [];
      }
      rows[rowNumber].push({ ticket, number });
    });

    const ticketDetails = [];

    Object.values(rows).forEach(rowTickets => {
      rowTickets.sort((a, b) => a.number - b.number);
      
      let i = 0;
      while (i < rowTickets.length) {
        // Check for full sheet (6 consecutive)
        if (i + 5 < rowTickets.length && 
            rowTickets[i + 5].number - rowTickets[i].number === 5) {
          let isConsecutive = true;
          for (let j = 1; j < 6; j++) {
            if (rowTickets[i + j].number - rowTickets[i + j - 1].number !== 1) {
              isConsecutive = false;
              break;
            }
          }
          
          if (isConsecutive) {
            const sheetTickets = rowTickets.slice(i, i + 6).map(t => t.ticket);
            const ticketType = 'fullsheet';
            // ✅ Group price divided by 6 (per ticket price) - with proper fallback
            let groupPrice = 0;
            if (apiPricing && apiPricing.full_sheet_price) {
              groupPrice = parseFloat(apiPricing.full_sheet_price);
            } else {
              // Fallback: try to get price from first ticket in the group
              const firstTicket = sheetTickets[0];
              groupPrice = parseFloat(firstTicket?.price || firstTicket?.ticket_amount || 10);
            }
            const perTicketPrice = parseFloat((groupPrice / 6).toFixed(2));
            
            console.log(`📊 Fullsheet - Group Price: ${groupPrice}, Per Ticket: ${perTicketPrice}`);
            
            sheetTickets.forEach(ticket => {
              const ticketId = parseInt(ticket.id || ticket.ticket_id || ticket.ticketId || 0);
              
              ticketDetails.push({
                ticket_id: ticketId,
                ticket_name: ticketType,
                ticket_amount: perTicketPrice
              });
            });
            i += 6;
            continue;
          }
        }
        
        // Check for half sheet (3 consecutive)
        if (i + 2 < rowTickets.length && 
            rowTickets[i + 2].number - rowTickets[i].number === 2) {
          let isConsecutive = true;
          for (let j = 1; j < 3; j++) {
            if (rowTickets[i + j].number - rowTickets[i + j - 1].number !== 1) {
              isConsecutive = false;
              break;
            }
          }
          
          if (isConsecutive) {
            const sheetTickets = rowTickets.slice(i, i + 3).map(t => t.ticket);
            const ticketType = 'halfsheet';
            // ✅ Group price divided by 3 (per ticket price) - with proper fallback
            let groupPrice = 0;
            if (apiPricing && apiPricing.half_sheet_price) {
              groupPrice = parseFloat(apiPricing.half_sheet_price);
            } else {
              // Fallback: try to get price from first ticket in the group
              const firstTicket = sheetTickets[0];
              groupPrice = parseFloat(firstTicket?.price || firstTicket?.ticket_amount || 5);
            }
            const perTicketPrice = parseFloat((groupPrice / 3).toFixed(2));
            
            console.log(`📊 Halfsheet - Group Price: ${groupPrice}, Per Ticket: ${perTicketPrice}`);
            
            sheetTickets.forEach(ticket => {
              const ticketId = parseInt(ticket.id || ticket.ticket_id || ticket.ticketId || 0);
              
              ticketDetails.push({
                ticket_id: ticketId,
                ticket_name: ticketType,
                ticket_amount: perTicketPrice
              });
            });
            i += 3;
            continue;
          }
        }
        
        // Random single ticket
        const ticket = rowTickets[i].ticket;
        const ticketType = 'random';
        const ticketId = parseInt(ticket.id || ticket.ticket_id || ticket.ticketId || 0);
        // ✅ Random ticket price - individual ticket price with proper fallback
        const perTicketPrice = parseFloat(ticket.price || ticket.ticket_amount || 15);
        
        console.log(`📊 Random - Per Ticket Price: ${perTicketPrice}`);
        
        ticketDetails.push({
          ticket_id: ticketId,
          ticket_name: ticketType,
          ticket_amount: perTicketPrice
        });
        i++;
      }
    });

    console.log("✅ Final Prepared Ticket Details:", JSON.stringify(ticketDetails, null, 2));
    return ticketDetails;
  }, []);

  // Direct Payment - Wallet Booking with ticket details
  const handleDirectPayment = useCallback(async (cartTotal, cartItems, onSuccess, ticketDetails) => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Please add tickets before paying.");
      return;
    }

    setIsProcessing(true);
    
    try {
      const currentBalance = await fetchWalletBalance();
      if (currentBalance < cartTotal) {
        alert(`❌ Insufficient Balance!\n\nWallet Balance: ₹${currentBalance}\nCart Total: ₹${cartTotal}\n\nPlease add funds or choose agent payment.`);
        setIsProcessing(false);
        return;
      }

      // ✅ Pass apiPricing to prepareTicketIdsPayload
      const finalTicketDetails = ticketDetails || prepareTicketIdsPayload(cartItems, apiPricing);
      
      const bookingData = {
        game_id: Number(gameId),
        type: "direct",
        ticket_ids: finalTicketDetails
      };

      console.log("📤 Direct Booking Data with Ticket Details:", JSON.stringify(bookingData, null, 2));

      const response = await bookTicket(bookingData);

      if (response.success) {
        setBookingSuccess(true);
        const ticketIds = finalTicketDetails.map(t => t.ticket_id).join(', ');
        alert(`✅ Booking Successful!\n\nYour tickets (${ticketIds}) have been booked!\nAmount: ₹${cartTotal}\n\nThank you for your purchase! 🎉`);
        
        await fetchWalletBalance();
        closeCheckout();
        if (onSuccess) onSuccess();
      } else {
        throw new Error(response.message || 'Booking failed');
      }
    } catch (error) {
      console.error("❌ Booking error:", error);
      alert(`❌ Booking Failed!\n\n${error.message}\n\nPlease try again or contact support.`);
    } finally {
      setIsProcessing(false);
    }
  }, [gameId, closeCheckout, fetchWalletBalance, prepareTicketIdsPayload]);

  // Agent Payment - Opens agent modal
  const handleAgentPayment = useCallback((onProceed) => {
    setShowCheckout(false);
    setSelectedPaymentMethod('agent');
    if (onProceed) onProceed();
  }, []);

  useEffect(() => {
    if (showCheckout && selectedPaymentMethod === 'direct') {
      fetchWalletBalance();
    }
  }, [showCheckout, selectedPaymentMethod, fetchWalletBalance]);

  // Agent Booking with ticket details
  const handleAgentBooking = useCallback(async (agentId, cartItems, onSuccess, ticketDetails) => {
    console.log("=== Agent Booking Debug ===");
    console.log("Agent ID:", agentId);
    console.log("Cart Items:", cartItems);
    
    setIsProcessing(true);
    
    try {
      // ✅ Pass apiPricing to prepareTicketIdsPayload
      const finalTicketDetails = ticketDetails || prepareTicketIdsPayload(cartItems, apiPricing);
      
      const bookingData = {
        game_id: Number(gameId),
        agent_id: Number(agentId),
        type: "agent",
        ticket_ids: finalTicketDetails
      };

      console.log("📤 Agent Booking Data with Ticket Details:", JSON.stringify(bookingData, null, 2));

      const response = await bookTicket(bookingData);
      console.log("Booking Response:", response);

      if (response.success) {
        setBookingSuccess(true);
        const ticketIds = finalTicketDetails.map(t => t.ticket_id).join(', ');
        alert(`✅ Booking Request Sent!\n\nYour tickets: ${ticketIds}\n\nThe agent will process your booking shortly.\n\nThank you for your patience! 🎉`);
        
        closeCheckout();
        if (onSuccess) onSuccess();
      } else {
        throw new Error(response.message || 'Agent booking failed');
      }
    } catch (error) {
      console.error("❌ Agent booking error:", error);
      alert(`❌ Booking Failed!\n\n${error.message}\n\nPlease try again or contact support.`);
    } finally {
      setIsProcessing(false);
    }
  }, [gameId, closeCheckout, prepareTicketIdsPayload]);

  // Future: Payment gateway integration
  const initializePaymentGateway = useCallback((amount, tickets, onSuccess) => {
    console.log("Payment Gateway - To be integrated");
  }, []);

  return {
    // State
    showCheckout,
    setShowCheckout,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    walletBalance,
    walletLoading,
    walletError,
    isProcessing,
    bookingSuccess,
    
    // Actions
    openCheckout,
    closeCheckout,
    selectPaymentMethod,
    fetchWalletBalance,
    handleDirectPayment,
    handleAgentPayment,
    handleAgentBooking,
    initializePaymentGateway,
    prepareTicketIdsPayload
  };
};