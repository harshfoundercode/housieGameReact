import React from 'react';
import { PAYMENT_METHODS } from '../utils/constants';

const CheckoutModal = ({ 
  showCheckout, 
  setShowCheckout, 
  selectedPaymentMethod, 
  setSelectedPaymentMethod, 
  getCartTotal, 
  getCartCount, 
  walletBalance, 
  handleWalletPayment, 
  handleAgentPayment 
}) => {
  if (!showCheckout) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-linear-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">
        <div className="sticky top-0 bg-linear-to-r from-[#004296] to-[#003380] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-[#FBEFA4]/50 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#FBEFA4]">💳 Checkout</h2>
            <button
              onClick={() => {
                setShowCheckout(false);
                setSelectedPaymentMethod(null);
              }}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <span className="text-xl sm:text-2xl">✕</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Order Summary */}
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-white font-bold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Items:</span>
                <span className="text-white">{getCartCount()} tickets</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Total Amount:</span>
                <span className="text-[#FBEFA4] font-bold text-lg">₹{getCartTotal()}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <h3 className="text-white font-bold mb-4">Select Payment Method</h3>
          <div className="grid gap-4">
            {PAYMENT_METHODS.map(method => (
              <div
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                  selectedPaymentMethod === method.id
                    ? 'border-[#FBEFA4] bg-[#FBEFA4]/10'
                    : 'border-white/20 bg-white/5 hover:border-[#FBEFA4]/50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{method.icon}</span>
                  <div>
                    <h4 className="text-white font-bold">{method.name}</h4>
                    <p className="text-white/60 text-sm">{method.description}</p>
                    {method.id === 'wallet' && (
                      <div className="mt-2 p-2 bg-green-500/20 rounded-lg">
                        <p className="text-[#FBEFA4] text-sm">
                          Balance: ₹{walletBalance}
                        </p>
                        {getCartTotal() > walletBalance && (
                          <p className="text-red-400 text-xs mt-1">
                            ⚠️ Insufficient balance! Please add funds or choose agent payment.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                setShowCheckout(false);
                setSelectedPaymentMethod(null);
              }}
              className="flex-1 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!selectedPaymentMethod) {
                  alert("Please select a payment method");
                  return;
                }
                if (selectedPaymentMethod === 'wallet') {
                  if (getCartTotal() > walletBalance) {
                    alert(`❌ Insufficient Balance!\n\nWallet Balance: ₹${walletBalance}\nCart Total: ₹${getCartTotal()}\n\nPlease add funds or choose agent payment.`);
                    return;
                  }
                  handleWalletPayment();
                } else if (selectedPaymentMethod === 'agent') {
                  handleAgentPayment();
                }
              }}
              disabled={!selectedPaymentMethod}
              className={`flex-1 py-3 rounded-xl font-bold ${
                selectedPaymentMethod
                  ? 'bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                  : 'bg-gray-500 text-gray-300 cursor-not-allowed'
              }`}
            >
              {selectedPaymentMethod === 'agent' ? 'Select Agent →' : `Pay Now ₹${getCartTotal()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;