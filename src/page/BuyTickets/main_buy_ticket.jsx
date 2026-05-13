// export default GamePage;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { parseGameDateTime } from "../../page/BuyTickets/Utils/parsers";

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
  const checkoutModal = useCheckoutModal(gameId);
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

    if (checkoutModal.selectedPaymentMethod === 'direct') {

      // Call wallet payment with cart items
      checkoutModal.handleWalletPayment(
        cartModal.getCartTotal(),
        cartModal.cart,
        () => {
          cartModal.clearCart();
          // Optionally refresh tickets
        }
      );
    } else if (checkoutModal.selectedPaymentMethod === 'agent') {
      checkoutModal.handleAgentPayment(() => {
        agentModal.openAgentModal('agent');
      });
    }
  };

  // Handle agent contact
  // Handle agent contact - FIXED with agent_id
  const handleAgentContact = (agent) => {
    console.log("Selected Agent:", agent);
    console.log("Cart items:", cartModal.cart);

    // Check cart
    if (cartModal.cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Get agent ID - agent list mein agent_id aa raha hai
    const agentId = agent?.agent_id;

    console.log("Agent ID:", agentId);

    if (!agentId) {
      console.error("Agent ID not found. Agent object:", agent);
      alert("Error: Agent information incomplete. Please try another agent.");
      return;
    }

    // Get ticket IDs from cart
    const ticketIds = cartModal.cart.map(item => {
      // Check what field contains ticket ID in your cart
      return item.id || item.ticket_id || item.ticketId;
    });

    console.log("Ticket IDs:", ticketIds);
    console.log("Game ID:", gameId);

    // Process agent booking through API
    checkoutModal.handleAgentBooking(
      agentId,
      cartModal.cart,
      () => {
        // Send WhatsApp message after successful booking
        agentModal.handleContactViaWhatsApp(agent, cartModal.cart, cartModal.getCartTotal());
        cartModal.clearCart();
        agentModal.closeAgentModal();
      }
    );
  };


  // Handle booking submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    await bookingModal.submitBooking();
  };

  // Loading state
  if (loadingTickets) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative">
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
      <div className="min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative">
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
      <div className="min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative">
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
        {/* <FloatingActionButtons
          isMobile={isMobile}
          availableTickets={availableTickets}
          showFabMenu={showFabMenu}
          setShowFabMenu={setShowFabMenu}
          setShowBookingModal={bookingModal.openBookingModal}
          setCurrentStep={bookingModal.setCurrentStep}
          setShowAgentModal={agentModal.openAgentModal}
        /> */}
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
        handleDirectPayment={() => checkoutModal.handleDirectPayment(
          cartModal.getCartTotal(),
          cartModal.cart,
          () => cartModal.clearCart()  
        )}
        handleAgentPayment={() => checkoutModal.handleAgentPayment(
          () => agentModal.openAgentModal('agent')
        )}
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
      <div className="fixed bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-linear-to-r from-transparent via-[#FBEFA4] to-transparent shadow-lg shadow-[#FBEFA4]/50"></div>
    </>
  );
};

export default GamePage;