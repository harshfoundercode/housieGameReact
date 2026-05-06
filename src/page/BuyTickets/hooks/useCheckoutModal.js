import { useState, useCallback } from 'react';

export const useCheckoutModal = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [walletBalance] = useState(2500);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const handleWalletPayment = useCallback((cartTotal, onSuccess) => {
    if (walletBalance >= cartTotal) {
      setIsProcessing(true);
      
      // Simulate payment processing
      setTimeout(() => {
        alert(`✅ Payment Successful!\n\nAmount Deducted: ₹${cartTotal}\nRemaining Balance: ₹${walletBalance - cartTotal}\n\nYour tickets have been booked successfully!\n\nThank you for your purchase! 🎉`);
        setIsProcessing(false);
        closeCheckout();
        if (onSuccess) onSuccess();
      }, 1000);
    } else {
      alert(`❌ Insufficient Balance!\n\nWallet Balance: ₹${walletBalance}\nCart Total: ₹${cartTotal}\n\nPlease add funds or choose agent payment.`);
    }
  }, [walletBalance, closeCheckout]);

  const handleAgentPayment = useCallback((onProceed) => {
    setShowCheckout(false);
    setSelectedPaymentMethod('agent');
    if (onProceed) onProceed();
  }, []);

  const validateAndProcessPayment = useCallback((cartTotal, cartCount) => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return false;
    }

    if (cartCount === 0) {
      alert("Your cart is empty!");
      return false;
    }

    return true;
  }, [selectedPaymentMethod]);

  return {
    showCheckout,
    setShowCheckout,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    walletBalance,
    isProcessing,
    openCheckout,
    closeCheckout,
    selectPaymentMethod,
    handleWalletPayment,
    handleAgentPayment,
    validateAndProcessPayment
  };
};