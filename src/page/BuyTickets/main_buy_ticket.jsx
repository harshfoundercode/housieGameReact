// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ROUTES } from "../../routes/routes";
// import { parseGameDateTime } from "./utils/parsers";
// import { useTimer } from "./hooks/useTimer";
// import { useTickets } from "./hooks/useTickets";
// import { useAgents } from "./hooks/useAgents";
// import { useCart } from "./hooks/useCart";
// import { usePagination } from "./hooks/usePagination";
// import { useScreenSize } from "./hooks/useScreenSize";
// import { TICKETS_PER_PAGE } from "./Utils/constants";

// // Components
// import GameHeader from "./components/GameHeader";
// import TimerCards from "./components/TimerCards";
// import SearchBar from "./components/SearchBar";
// import TicketsGrid from "./components/TicketsGrid";
// import Pagination from "./components/Pagination";
// import CartModal from "./components/CartModal";
// import CheckoutModal from "./components/CheckoutModal";
// import AgentModal from "./components/AgentModal";
// import BookingModal from "./components/BookingModal";
// import FloatingActionButtons from "./components/FloatingAction";

// const GamePage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { gameId, gameName, gameDate, roundTime } = location.state || { 
//     gameId: null, 
//     gameName: "Game",
//     gameDate: null,
//     roundTime: null
//   };
  
//   // UI States
//   const [search, setSearch] = useState("");
//   const [showFabMenu, setShowFabMenu] = useState(false);
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [showAgentModal, setShowAgentModal] = useState(false);
//   const [showCart, setShowCart] = useState(false);
//   const [showCheckout, setShowCheckout] = useState(false);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//   const [walletBalance] = useState(2500);
  
//   // Booking States
//   const [selectedTicketType, setSelectedTicketType] = useState("");
//   const [currentStep, setCurrentStep] = useState(1);
//   const [quantity, setQuantity] = useState(1);
//   const [playerName, setPlayerName] = useState("");
//   const [playerPhone, setPlayerPhone] = useState("");
//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [searchAgent, setSearchAgent] = useState("");

//   // Custom Hooks
//   const { isMobile, isTablet } = useScreenSize();
//   const { tickets, loadingTickets, ticketError } = useTickets(gameId);
//   const { agents, loadingAgents, selectedAgentData, fetchAndSelectAgent } = useAgents();
//   const { cart, addToCart, removeFromCart, getCartTotal, getCartCount, clearCart } = useCart();
  
//   const gameDateTime = parseGameDateTime(gameDate, roundTime);
//   const { timeLeft, getFormattedGameDate, getFormattedGameTime, getGameDay } = useTimer(gameDateTime);
  
//   const { 
//     paginatedTickets, 
//     filteredTickets, 
//     currentPage, 
//     totalPages, 
//     handlePageChange, 
//     getPageNumbers 
//   } = usePagination(tickets, search);

//   // Calculate available tickets
//   const availableTickets = tickets.length;

//   // Payment handlers
//   const handleWalletPayment = () => {
//     const total = getCartTotal();
//     if (walletBalance >= total) {
//       alert(`✅ Payment Successful!\n\nAmount Deducted: ₹${total}\nRemaining Balance: ₹${walletBalance - total}\n\nYour tickets have been booked successfully!\n\nThank you for your purchase! 🎉`);
//       clearCart();
//       setShowCheckout(false);
//       setSelectedPaymentMethod(null);
//     } else {
//       alert(`❌ Insufficient Balance!\n\nWallet Balance: ₹${walletBalance}\nCart Total: ₹${total}\n\nPlease add funds or choose agent payment.`);
//     }
//   };

//   const handleAgentPayment = () => {
//     setShowCheckout(false);
//     setShowAgentModal(true);
//     setSelectedPaymentMethod('agent');
//   };

//   const handleProceedToCheckout = () => {
//     if (cart.length === 0) {
//       alert("Your cart is empty!");
//       return;
//     }
//     setShowCart(false);
//     setShowCheckout(true);
//   };

//   const handleContactAgent = (agent) => {
//     const cartItems = cart.map(item => `Ticket #${item.id} - ${item.name}`).join('\n');
//     const message = encodeURIComponent(
//       `Hello ${agent.name},\n\nI want to purchase the following tickets:\n\n${cartItems}\n\nTotal Amount: ₹${getCartTotal()}\n\nPlease help me complete the booking.\n\nThank you!`
//     );
//     window.open(`https://wa.me/${agent.phone}?text=${message}`, '_blank');
    
//     setTimeout(() => {
//       clearCart();
//       setShowAgentModal(false);
//       alert("🎉 Booking request sent! The agent will contact you shortly to complete the payment and booking.");
//     }, 1000);
//   };

//   const handleCallAgent = (agent) => {
//     window.location.href = `tel:${agent.phone}`;
//   };

//   // Loading state
//   if (loadingTickets) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative">
//         <div className="relative z-10 max-w-8xl mx-auto space-y-3">
//           <div className="flex justify-center items-center h-64">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FBEFA4] mx-auto mb-4"></div>
//               <p className="text-[#FBEFA4]">Loading tickets for {gameName}...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (ticketError) {
//     return (
//       <div className="min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative">
//         <div className="relative z-10 max-w-8xl mx-auto space-y-3">
//           <div className="text-center py-12">
//             <div className="text-red-400 text-6xl mb-4">⚠️</div>
//             <h2 className="text-2xl font-bold mb-2">Failed to Load Game</h2>
//             <p className="text-white/70 mb-6">{ticketError}</p>
//             <button
//               onClick={() => navigate(ROUTES.HomeScreenWebsite)}
//               className="bg-[#FBEFA4] text-[#004296] px-6 py-2 rounded-full font-semibold"
//             >
//               Go Back Home
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative">
//         {/* Animated background elements */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
//             backgroundSize: '40px 40px'
//           }}></div>
//         </div>

//         <div className="relative z-10 max-w-8xl mx-auto space-y-3">
//           {/* Header Section */}
//           <GameHeader 
//             gameName={gameName} 
//             getCartCount={getCartCount} 
//             setShowCart={setShowCart} 
//           />

//           {/* Timer Section */}
//           <TimerCards 
//             getFormattedGameDate={getFormattedGameDate}
//             getFormattedGameTime={getFormattedGameTime}
//             getGameDay={getGameDay}
//             timeLeft={timeLeft}
//           />

//           {/* Tickets Container */}
//           <div className="w-full bg-[#004296]/40 backdrop-blur-sm p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-xl border border-[#FBEFA4]/30">
//             <SearchBar search={search} setSearch={setSearch} />
            
//             <TicketsGrid 
//               paginatedTickets={paginatedTickets}
//               cart={cart}
//               addToCart={addToCart}
//             />

//             <Pagination 
//               currentPage={currentPage}
//               totalPages={totalPages}
//               getPageNumbers={getPageNumbers}
//               handlePageChange={handlePageChange}
//               filteredTickets={filteredTickets}
//               ticketsPerPage={TICKETS_PER_PAGE}
//             />
//           </div>
//         </div>

//         {/* Floating Action Buttons */}
//         <FloatingActionButtons 
//           isMobile={isMobile}
//           availableTickets={availableTickets}
//           showFabMenu={showFabMenu}
//           setShowFabMenu={setShowFabMenu}
//           setShowBookingModal={setShowBookingModal}
//           setCurrentStep={setCurrentStep}
//           setShowAgentModal={setShowAgentModal}
//         />
//       </div>

//       {/* Modals */}
//       <CartModal 
//         showCart={showCart}
//         setShowCart={setShowCart}
//         cart={cart}
//         removeFromCart={removeFromCart}
//         getCartTotal={getCartTotal}
//         getCartCount={getCartCount}
//         clearCart={clearCart}
//         handleProceedToCheckout={handleProceedToCheckout}
//       />

//       <CheckoutModal 
//         showCheckout={showCheckout}
//         setShowCheckout={setShowCheckout}
//         selectedPaymentMethod={selectedPaymentMethod}
//         setSelectedPaymentMethod={setSelectedPaymentMethod}
//         getCartTotal={getCartTotal}
//         getCartCount={getCartCount}
//         walletBalance={walletBalance}
//         handleWalletPayment={handleWalletPayment}
//         handleAgentPayment={handleAgentPayment}
//       />

//       <AgentModal 
//         showAgentModal={showAgentModal}
//         setShowAgentModal={setShowAgentModal}
//         selectedPaymentMethod={selectedPaymentMethod}
//         agents={agents}
//         loadingAgents={loadingAgents}
//         selectedAgent={selectedAgent}
//         setSelectedAgent={setSelectedAgent}
//         selectedAgentData={selectedAgentData}
//         searchAgent={searchAgent}
//         setSearchAgent={setSearchAgent}
//         fetchAndSelectAgent={fetchAndSelectAgent}
//         handleContactAgent={handleContactAgent}
//         handleCallAgent={handleCallAgent}
//         cart={cart}
//         getCartTotal={getCartTotal}
//         setSelectedAgentData={setSelectedAgentData}
//       />

//       <BookingModal 
//         showBookingModal={showBookingModal}
//         setShowBookingModal={setShowBookingModal}
//         currentStep={currentStep}
//         setCurrentStep={setCurrentStep}
//         selectedTicketType={selectedTicketType}
//         setSelectedTicketType={setSelectedTicketType}
//         quantity={quantity}
//         setQuantity={setQuantity}
//         playerName={playerName}
//         setPlayerName={setPlayerName}
//         playerPhone={playerPhone}
//         setPlayerPhone={setPlayerPhone}
//         getTicketTypeName={() => {
//           const types = { random: "Single Ticket", halfsheet: "Half Sheet (6 Tickets)", fullsheet: "Full Sheet (12 Tickets)" };
//           return types[selectedTicketType] || "Not Selected";
//         }}
//         getTicketTypePrice={() => {
//           switch (selectedTicketType) {
//             case "random": return 100;
//             case "halfsheet": return 500;
//             case "fullsheet": return 1000;
//             default: return 0;
//           }
//         }}
//         getTotalPrice={() => getTicketTypePrice() * quantity}
//         getTicketCount={() => {
//           if (selectedTicketType === "random") return quantity;
//           if (selectedTicketType === "halfsheet") return quantity * 6;
//           if (selectedTicketType === "fullsheet") return quantity * 12;
//           return 0;
//         }}
//       />

//       {/* Bottom decoration */}
//       <div className="fixed bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-linear-to-r from-transparent via-[#FBEFA4] to-transparent shadow-lg shadow-[#FBEFA4]/50"></div>
//     </>
//   );
// };

// export default GamePage;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { parseGameDateTime } from "./utils/parsers";

// Custom Hooks
import { useTimer } from "./hooks/useTimer";
import { useTickets } from "./hooks/useTickets";
import { useAgents } from "./hooks/useAgents";
import { useCartModal } from "./hooks/useCartModel";
import { useCheckoutModal } from "./hooks/useCheckoutModal";
import { useAgentModal } from "./hooks/useAgentModal";
import { useBookingModal } from "./hooks/useBookingModal";
import { usePagination } from "./hooks/usePagination";
import { useScreenSize } from "./hooks/useScreenSize";

// Components
import GameHeader from "./components/GameHeader";
import TimerCards from "./components/TimerCards";
import SearchBar from "./components/SearchBar";
import TicketsGrid from "./components/TicketGrid";
import Pagination from "./components/Pagination";
import CartModal from "./components/CartModal";
import CheckoutModal from "./components/CheckoutModal";
import AgentModal from "./components/AgentModal";
import BookingModal from "./components/BookingModal";
import FloatingActionButtons from "./components/FloatingAction";

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gameId, gameName, gameDate, roundTime } = location.state || { 
    gameId: null, 
    gameName: "Game",
    gameDate: null,
    roundTime: null
  };
  
  // UI States
  const [search, setSearch] = useState("");
  const [showFabMenu, setShowFabMenu] = useState(false);

  // Custom Hooks
  const { isMobile, isTablet } = useScreenSize();
  const { tickets, loadingTickets, ticketError } = useTickets(gameId);
  const { agents, loadingAgents, selectedAgentData, setSelectedAgentData, fetchAndSelectAgent } = useAgents();
  
  // Modal Hooks
  const cartModal = useCartModal();
  const checkoutModal = useCheckoutModal();
  const agentModal = useAgentModal(agents);
  const bookingModal = useBookingModal();
  
  const gameDateTime = parseGameDateTime(gameDate, roundTime);
  const { timeLeft, getFormattedGameDate, getFormattedGameTime, getGameDay } = useTimer(gameDateTime);
  
  const { 
    paginatedTickets, 
    filteredTickets, 
    currentPage, 
    totalPages, 
    handlePageChange, 
    getPageNumbers 
  } = usePagination(tickets, search);

  // Calculate available tickets
  const availableTickets = tickets.length;

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    if (cartModal.cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    cartModal.closeCart();
    checkoutModal.openCheckout();
  };

  // Handle checkout payment
  const handleCheckoutPayment = () => {
    if (!checkoutModal.selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (checkoutModal.selectedPaymentMethod === 'wallet') {
      if (cartModal.getCartTotal() > checkoutModal.walletBalance) {
        alert(`❌ Insufficient Balance!\n\nWallet Balance: ₹${checkoutModal.walletBalance}\nCart Total: ₹${cartModal.getCartTotal()}\n\nPlease add funds or choose agent payment.`);
        return;
      }
      checkoutModal.handleWalletPayment(cartModal.getCartTotal(), () => {
        cartModal.clearCart();
      });
    } else if (checkoutModal.selectedPaymentMethod === 'agent') {
      checkoutModal.handleAgentPayment(() => {
        agentModal.openAgentModal('agent');
      });
    }
  };

  // Handle agent contact
  const handleAgentContact = (agent) => {
    agentModal.handleContactViaWhatsApp(agent, cartModal.cart, cartModal.getCartTotal());
    cartModal.clearCart();
  };

  // Handle booking submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    await bookingModal.submitBooking();
  };

  // Loading state
  if (loadingTickets) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative">
        <div className="relative z-10 max-w-8xl mx-auto space-y-3">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FBEFA4] mx-auto mb-4"></div>
              <p className="text-[#FBEFA4]">Loading tickets for {gameName}...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (ticketError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative">
        <div className="relative z-10 max-w-8xl mx-auto space-y-3">
          <div className="text-center py-12">
            <div className="text-red-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">Failed to Load Game</h2>
            <p className="text-white/70 mb-6">{ticketError}</p>
            <button
              onClick={() => navigate(ROUTES.HomeScreenWebsite)}
              className="bg-[#FBEFA4] text-[#004296] px-6 py-2 rounded-full font-semibold"
            >
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-8xl mx-auto space-y-3">
          {/* Header Section */}
          <GameHeader 
            gameName={gameName} 
            getCartCount={cartModal.getCartCount} 
            setShowCart={cartModal.openCart} 
          />

          {/* Timer Section */}
          <TimerCards 
            getFormattedGameDate={getFormattedGameDate}
            getFormattedGameTime={getFormattedGameTime}
            getGameDay={getGameDay}
            timeLeft={timeLeft}
          />

          {/* Tickets Container */}
          <div className="w-full bg-[#004296]/40 backdrop-blur-sm p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-xl border border-[#FBEFA4]/30">
            <SearchBar search={search} setSearch={setSearch} />
            
            <TicketsGrid 
              paginatedTickets={paginatedTickets}
              cart={cartModal.cart}
              addToCart={cartModal.addToCart}
            />

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              getPageNumbers={getPageNumbers}
              handlePageChange={handlePageChange}
              filteredTickets={filteredTickets}
              ticketsPerPage={6}
            />
          </div>
        </div>

        {/* Floating Action Buttons */}
        <FloatingActionButtons 
          isMobile={isMobile}
          availableTickets={availableTickets}
          showFabMenu={showFabMenu}
          setShowFabMenu={setShowFabMenu}
          setShowBookingModal={bookingModal.openBookingModal}
          setCurrentStep={bookingModal.setCurrentStep}
          setShowAgentModal={agentModal.openAgentModal}
        />
      </div>

      {/* Modals */}
      <CartModal 
        showCart={cartModal.showCart}
        setShowCart={cartModal.setShowCart}
        cart={cartModal.cart}
        removeFromCart={cartModal.removeFromCart}
        getCartTotal={cartModal.getCartTotal}
        getCartCount={cartModal.getCartCount}
        clearCart={cartModal.clearCart}
        handleProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal 
        showCheckout={checkoutModal.showCheckout}
        setShowCheckout={checkoutModal.setShowCheckout}
        selectedPaymentMethod={checkoutModal.selectedPaymentMethod}
        setSelectedPaymentMethod={checkoutModal.selectPaymentMethod}
        getCartTotal={cartModal.getCartTotal}
        getCartCount={cartModal.getCartCount}
        walletBalance={checkoutModal.walletBalance}
        handleWalletPayment={() => checkoutModal.handleWalletPayment(cartModal.getCartTotal(), cartModal.clearCart)}
        handleAgentPayment={() => checkoutModal.handleAgentPayment(() => agentModal.openAgentModal('agent'))}
      />

      <AgentModal 
        showAgentModal={agentModal.showAgentModal}
        setShowAgentModal={agentModal.setShowAgentModal}
        selectedPaymentMethod={checkoutModal.selectedPaymentMethod}
        agents={agents}
        loadingAgents={loadingAgents}
        selectedAgent={agentModal.selectedAgent}
        setSelectedAgent={agentModal.selectAgent}
        selectedAgentData={selectedAgentData}
        searchAgent={agentModal.searchAgent}
        setSearchAgent={agentModal.updateSearchAgent}
        fetchAndSelectAgent={fetchAndSelectAgent}
        handleContactAgent={handleAgentContact}
        handleCallAgent={agentModal.handleCallAgent}
        cart={cartModal.cart}
        getCartTotal={cartModal.getCartTotal}
        setSelectedAgentData={setSelectedAgentData}
      />

      <BookingModal 
        showBookingModal={bookingModal.showBookingModal}
        setShowBookingModal={bookingModal.setShowBookingModal}
        currentStep={bookingModal.currentStep}
        setCurrentStep={bookingModal.setCurrentStep}
        selectedTicketType={bookingModal.selectedTicketType}
        setSelectedTicketType={bookingModal.setSelectedTicketType}
        quantity={bookingModal.quantity}
        setQuantity={bookingModal.setQuantity}
        playerName={bookingModal.playerName}
        setPlayerName={bookingModal.setPlayerName}
        playerPhone={bookingModal.playerPhone}
        setPlayerPhone={bookingModal.setPlayerPhone}
      />

      {/* Bottom decoration */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-[#FBEFA4] to-transparent shadow-lg shadow-[#FBEFA4]/50"></div>
    </>
  );
};

export default GamePage;