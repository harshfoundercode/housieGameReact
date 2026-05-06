import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (ticket) => {
    setCart(prev => {
      const existingTicket = prev.find(item => item.id === ticket.id);
      if (existingTicket) {
        alert(`Ticket #${ticket.id} is already in your cart!`);
        return prev;
      }
      return [...prev, { ...ticket, quantity: 1 }];
    });
  };

  const removeFromCart = (ticketId) => {
    setCart(prev => prev.filter(item => item.id !== ticketId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price || 100), 0);
  };

  const getCartCount = () => {
    return cart.length;
  };

  const clearCart = () => {
    setCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    getCartTotal,
    getCartCount,
    clearCart
  };
};