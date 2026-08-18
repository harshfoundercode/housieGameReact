import { useState, useCallback } from 'react';

export const useCartModal = () => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((ticket) => {
    setCart(prev => {
      // Check if ticket already exists in cart
      const existingTicket = prev.find(item => item.id === ticket.id);
      if (existingTicket) {
        const ticketNumber = ticket.ticketNumber || ticket.ticket_number || ticket.id;
        alert(`Ticket #${ticketNumber} is already in your cart!`);
        return prev;
      }
      
      // Add ticket with necessary fields
      return [...prev, { 
        ...ticket, 
        quantity: 1,
        // Ensure required fields exist
        ticketNumber: ticket.ticketNumber || ticket.ticket_number || ticket.id,
        ticket_name: ticket.ticket_name || ticket.ticketName || ticket.name || `T-${ticket.id}`,
        ticket_amount: ticket.ticket_amount || ticket.amount || ticket.price || 100
      }];
    });
  }, []);

  const removeFromCart = useCallback((ticketId) => {
    setCart(prev => prev.filter(item => item.id !== ticketId));
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => {
      // Use ticket_amount if available, otherwise fallback to price
      const amount = item.ticket_amount || item.amount || item.price || 100;
      return total + parseFloat(amount);
    }, 0);
  }, [cart]);

  const getCartCount = useCallback(() => {
    return cart.length;
  }, [cart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const openCart = useCallback(() => {
    setShowCart(true);
  }, []);

  const closeCart = useCallback(() => {
    setShowCart(false);
  }, []);

  const toggleCart = useCallback(() => {
    setShowCart(prev => !prev);
  }, []);

  return {
    showCart,
    setShowCart,
    cart,
    addToCart,
    removeFromCart,
    getCartTotal,
    getCartCount,
    clearCart,
    openCart,
    closeCart,
    toggleCart
  };
};