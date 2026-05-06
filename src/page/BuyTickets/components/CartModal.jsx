import React from 'react';

const CartModal = ({ 
  showCart, 
  setShowCart, 
  cart, 
  removeFromCart, 
  getCartTotal, 
  getCartCount, 
  clearCart, 
  handleProceedToCheckout 
}) => {
  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-[#FBEFA4]/50 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4] flex items-center gap-2">
              🛒 Your Cart ({getCartCount()} items)
            </h2>
            <button
              onClick={() => setShowCart(false)}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
            >
              <span className="text-xl sm:text-2xl">✕</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold">Ticket #{item.ticketNumber || item.id}</h4>
                    <p className="text-white/60 text-sm">Price: ₹{item.price || 100}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-[#FBEFA4] font-bold">₹{item.price || 100}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/70">Total Amount:</span>
                  <span className="text-[#FBEFA4] text-2xl font-bold">₹{getCartTotal()}</span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleProceedToCheckout}
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold"
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-4xl mb-4">🛒</p>
              <p className="text-white/70 text-lg">Your cart is empty</p>
              <p className="text-white/40 text-sm mt-2">Add tickets to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;