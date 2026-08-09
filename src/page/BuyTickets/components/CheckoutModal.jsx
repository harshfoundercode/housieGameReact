import React from 'react';

const CheckoutModal = ({ 
  showCheckout, 
  setShowCheckout, 
  selectedPaymentMethod, 
  setSelectedPaymentMethod, 
  getCartTotal, 
  getCartCount, 
  walletBalance,
  walletLoading,
  walletError,
  fetchWalletBalance,
  handleDirectPayment,
  handleAgentPayment 
}) => {
  if (!showCheckout) return null;

  const paymentMethods = [
    {
      id: 'direct',
      name: 'Wallet',
      icon: '💳',
      description: 'Pay via wallet',
      comingSoon: false
    },
    {
      id: 'agent',
      name: 'Pay via Agent',
      icon: '🤝',
      description: 'Contact an agent to complete booking',
      comingSoon: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-lg max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-[#FBEFA4]/50 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-[#FBEFA4]">
              💰 Checkout
            </h2>
            <button
              onClick={() => setShowCheckout(false)}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <span className="text-xl sm:text-2xl">✕</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Order Summary */}
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <h3 className="text-white font-bold mb-3">Order Summary</h3>
            <div className="flex justify-between text-white/70 text-sm mb-2">
              <span>Total Tickets:</span>
              <span>{getCartCount()}</span>
            </div>
            <div className="flex justify-between text-[#FBEFA4] font-bold text-lg border-t border-white/20 pt-2">
              <span>Total Amount:</span>
              <span>₹{getCartTotal()}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3 mb-6">
            <h3 className="text-white font-bold mb-3">Select Payment Method</h3>
            
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.id)}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
                  selectedPaymentMethod === method.id
                    ? 'border-[#FBEFA4] bg-[#FBEFA4]/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-bold">
                      {method.name}
                      {method.comingSoon && (
                        <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full">Coming Soon</span>
                      )}
                    </h4>
                    <p className="text-white/60 text-sm">{method.description}</p>
                    {method.id === 'direct' && selectedPaymentMethod === 'direct' && (
                      <div className="mt-2 flex flex-col gap-2">
                        <p className="text-white/70 text-xs">
                          {walletLoading
                            ? 'Loading wallet balance...'
                            : walletError
                            ? `Balance unavailable: ${walletError}`
                            : `Wallet Balance: ₹${walletBalance.toLocaleString('en-IN')}`}
                        </p>
                        <button
                          type="button"
                          onClick={fetchWalletBalance}
                          disabled={walletLoading}
                          className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 text-white/80 text-xs hover:bg-white/20 transition-all disabled:opacity-50"
                        >
                          Refresh balance
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPaymentMethod === method.id
                      ? 'border-[#FBEFA4]'
                      : 'border-white/40'
                  }`}>
                    {selectedPaymentMethod === method.id && (
                      <div className="w-3 h-3 rounded-full bg-[#FBEFA4]"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pay Button */}
          <button
            onClick={() => {
              if (selectedPaymentMethod === 'direct') {
                handleDirectPayment(getCartTotal(), null, () => {});
              } else if (selectedPaymentMethod === 'agent') {
                handleAgentPayment();
              }
            }}
            disabled={!selectedPaymentMethod}
            className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
              selectedPaymentMethod
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                : 'bg-white/20 text-white/40 cursor-not-allowed'
            }`}
          >
            {selectedPaymentMethod === 'direct' 
              ? '💳 Pay ₹' + getCartTotal() 
              : selectedPaymentMethod === 'agent'
              ? '🤝 Connect with Agent'
              : 'Select Payment Method'}
          </button>

          {/* Payment Info */}
          <div className="mt-4 text-center">
            <p className="text-white/40 text-xs">
              🔒 Your payment information is secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;