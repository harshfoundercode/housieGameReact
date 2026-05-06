import { useState, useCallback } from 'react';

export const useCartModal = () => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((ticket) => {
    setCart(prev => {
      const existingTicket = prev.find(item => item.id === ticket.id);
      if (existingTicket) {
        alert(`Ticket #${ticket.id} is already in your cart!`);
        return prev;
      }
      return [...prev, { ...ticket, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((ticketId) => {
    setCart(prev => prev.filter(item => item.id !== ticketId));
  }, []);

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price || 100), 0);
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