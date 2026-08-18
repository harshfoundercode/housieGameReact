import React from 'react';

const CheckoutModal = ({
  showCheckout,
  setShowCheckout,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  getCartTotal,
  getCartCount,
  cartItems,
  walletBalance,
  walletLoading,
  walletError,
  fetchWalletBalance,
  handleDirectPayment,
  onDirectPaymentSuccess,
  handleAgentPayment,
  prepareTicketIdsPayload, // Add this prop
    apiPricing // ✅ Add this prop

}) => {
  if (!showCheckout) return null;

  const handleDirectPay = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Prepare ticket details with type as ticket_name
    const ticketDetails = prepareTicketIdsPayload(cartItems,apiPricing);
   console.log("Checkout - Prepared Ticket Details:", ticketDetails);
    // Call the parent handler with ticket details
    handleDirectPayment(
      getCartTotal(),
      cartItems,
      onDirectPaymentSuccess,
      ticketDetails // Pass prepared ticket details
    );
  };

  const handleAgentPay = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }
    handleAgentPayment();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-md max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-[#FBEFA4]/50 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4] flex items-center gap-2">
              💳 Checkout
            </h2>
            <button
              onClick={() => setShowCheckout(false)}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <span className="text-xl sm:text-2xl">✕</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            {/* Order Summary */}
            <div className="bg-white/10 rounded-xl p-4">
              <h3 className="text-[#FBEFA4] font-semibold text-sm mb-2">Order Summary</h3>
              <div className="flex justify-between text-white/80">
                <span>Total Items:</span>
                <span className="font-bold">{getCartCount()}</span>
              </div>
              <div className="flex justify-between text-white/80 mt-1">
                <span>Total Amount:</span>
                <span className="text-[#FBEFA4] font-bold text-lg">₹{getCartTotal()}</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-[#FBEFA4] font-semibold text-sm mb-3">Select Payment Method</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedPaymentMethod('direct')}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    selectedPaymentMethod === 'direct'
                      ? 'bg-green-500/30 border-2 border-green-400'
                      : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💳</span>
                    <div>
                      <div className="text-white font-semibold">Direct Payment</div>
                      <div className="text-white/60 text-sm">Pay from wallet</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedPaymentMethod('agent')}
                  className={`w-full p-3 rounded-xl text-left transition-all ${
                    selectedPaymentMethod === 'agent'
                      ? 'bg-blue-500/30 border-2 border-blue-400'
                      : 'bg-white/10 border-2 border-transparent hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👤</span>
                    <div>
                      <div className="text-white font-semibold">Agent Payment</div>
                      <div className="text-white/60 text-sm">Pay through agent</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Wallet Balance (for direct payment) */}
            {selectedPaymentMethod === 'direct' && (
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Wallet Balance:</span>
                  <span className="text-[#FBEFA4] font-bold text-lg">
                    {walletLoading ? 'Loading...' : `₹${walletBalance}`}
                  </span>
                </div>
                {walletError && (
                  <div className="text-red-400 text-xs mt-1">{walletError}</div>
                )}
                <button
                  onClick={fetchWalletBalance}
                  className="mt-2 text-xs text-white/50 hover:text-white/80"
                >
                  Refresh Balance
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex-1 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold"
              >
                Cancel
              </button>
              <button
                onClick={selectedPaymentMethod === 'direct' ? handleDirectPay : handleAgentPay}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold"
              >
                {selectedPaymentMethod === 'direct' ? 'Pay Now' : 'Proceed'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;