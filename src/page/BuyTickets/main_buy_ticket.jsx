import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { parseGameDateTime } from "../../page/BuyTickets/Utils/parsers";
import { getGameRounds } from "../../services/live_schedule_result_services";

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

const GAME_STATE_KEY = "tambola_current_game_state";

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const savedGameState = (() => {
    try {
      return JSON.parse(sessionStorage.getItem(GAME_STATE_KEY));
    } catch {
      return null;
    }
  })();

  const routeState = location.state && Object.keys(location.state).length ? location.state : savedGameState;
  const { gameId, gameName, gameDate, roundTime } = routeState || {
    gameId: null,
    gameName: "Game",
    gameDate: null,
    roundTime: null
  };

  useEffect(() => {
    if (location.state && location.state.gameId) {
      sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(location.state));
    }
  }, [location.state]);

  useEffect(() => {
    if (!gameId) {
      navigate(ROUTES.HOME);
    }
  }, [gameId, navigate]);

  // UI States
  const [search, setSearch] = useState("");
  const [showFabMenu, setShowFabMenu] = useState(false);

  // Custom Hooks
  const { isMobile, isTablet } = useScreenSize();
  const { 
    tickets, 
    loadingTickets, 
    ticketError, 
    apiPricing, 
    refetchTickets,
    updateTicketStatus,
    removeTickets 
  } = useTickets(gameId);
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

  const availableTickets = tickets.length;

  useEffect(() => {
    if (!gameId) return;
    let active = true;

    const checkGameStatus = async () => {
      try {
        const response = await getGameRounds();
        const game = response?.data?.games?.find((item) =>
          String(item.game_id) === String(gameId) || String(item.id) === String(gameId)
        );

        const status = (game?.status || '').toLowerCase();
        if (!game) return;

        if (status === 'live' || status === 'completed' || status === 'ended') {
          const parsed = game.start_datetime ? parseGameDateTime(game.start_datetime) : null;
          const redirectState = {
            gameId: Number(game.game_id || game.id),
            gameName: game.title || game.name || game.gameName || gameName,
            gameDate: parsed?.gameDate || gameDate,
            roundTime: parsed?.roundTime || roundTime,
          };

          if (active) {
            navigate(ROUTES.AFTERGAME, { replace: true, state: redirectState });
          }
        }
      } catch (error) {
        console.warn('Game status check failed:', error);
      }
    };

    checkGameStatus();
    const intervalId = setInterval(checkGameStatus, 30000);
    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, [gameDate, gameId, gameName, navigate, roundTime]);

  // ✅ Get correct price based on ticket type
  const getTicketGroupPrice = (ticket, apiPricing) => {
    if (!ticket || !apiPricing) return ticket?.price || 100;
    
    // If ticket has type from API
    if (ticket.ticket_type) {
      if (ticket.ticket_type === 'fullsheet') {
        return parseFloat(apiPricing.full_sheet_price) || ticket.price || 100;
      } else if (ticket.ticket_type === 'halfsheet') {
        return parseFloat(apiPricing.half_sheet_price) || ticket.price || 100;
      }
    }
    
    // Default: use ticket's own price
    return ticket.price || ticket.ticket_amount || 100;
  };

  // Calculate cart total with API pricing
  const calculateCartTotal = () => {
    if (!cartModal.cart || cartModal.cart.length === 0) return 0;
    
    const ticketNumbers = cartModal.cart.map(ticket => {
      const num = parseInt(ticket.ticketNumber || ticket.id || '0');
      return { ticket, number: num };
    }).sort((a, b) => a.number - b.number);

    const rows = {};
    ticketNumbers.forEach(({ ticket, number }) => {
      const rowNumber = Math.ceil(number / 6);
      if (!rows[rowNumber]) {
        rows[rowNumber] = [];
      }
      rows[rowNumber].push({ ticket, number });
    });

    let total = 0;
    
    Object.values(rows).forEach(rowTickets => {
      rowTickets.sort((a, b) => a.number - b.number);
      
      let i = 0;
      while (i < rowTickets.length) {
        if (i + 5 < rowTickets.length && 
            rowTickets[i + 5].number - rowTickets[i].number === 5) {
          let isConsecutive = true;
          for (let j = 1; j < 6; j++) {
            if (rowTickets[i + j].number - rowTickets[i + j - 1].number !== 1) {
              isConsecutive = false;
              break;
            }
          }
          
          if (isConsecutive) {
            total += parseFloat(apiPricing?.full_sheet_price) || 0;
            i += 6;
            continue;
          }
        }
        
        if (i + 2 < rowTickets.length && 
            rowTickets[i + 2].number - rowTickets[i].number === 2) {
          let isConsecutive = true;
          for (let j = 1; j < 3; j++) {
            if (rowTickets[i + j].number - rowTickets[i + j - 1].number !== 1) {
              isConsecutive = false;
              break;
            }
          }
          
          if (isConsecutive) {
            total += parseFloat(apiPricing?.half_sheet_price) || 0;
            i += 3;
            continue;
          }
        }
        
        total += rowTickets[i].ticket.price || 100;
        i++;
      }
    });
    
    return total;
  };

  // Handle add to cart with group pricing
  const handleAddToCart = (ticket) => {
    if (cartModal.cart.some(item => item.id === ticket.id)) {
      return;
    }
    
    // Calculate the correct price based on group
    const groupPrice = getTicketGroupPrice(ticket, apiPricing);
    
    // Create a modified ticket with the correct price
    const ticketWithPrice = {
      ...ticket,
      price: groupPrice,
      ticket_amount: groupPrice
    };
    
    cartModal.addToCart(ticketWithPrice);
    updateTicketStatus([ticket.id], 'reserved');
  };

  // Handle remove from cart
  const handleRemoveFromCart = (ticketId) => {
    cartModal.removeFromCart(ticketId);
    updateTicketStatus([ticketId], 'available');
  };

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
  // const handleCheckoutPayment = () => {
  //   if (!checkoutModal.selectedPaymentMethod) {
  //     alert("Please select a payment method");
  //     return;
  //   }

  //   const ticketDetails = checkoutModal.prepareTicketIdsPayload(cartModal.cart);

  //   if (checkoutModal.selectedPaymentMethod === 'direct') {
  //     const ticketIds = cartModal.cart.map(item => item.id);
      
  //     checkoutModal.handleDirectPayment(
  //       calculateCartTotal(),
  //       cartModal.cart,
  //       () => {
  //         updateTicketStatus(ticketIds, 'booked');
  //         cartModal.clearCart();
  //         setTimeout(() => refetchTickets(), 500);
  //       },
  //       ticketDetails
  //     );
  //   } else if (checkoutModal.selectedPaymentMethod === 'agent') {
  //     checkoutModal.handleAgentPayment(() => {
  //       agentModal.openAgentModal('agent');
  //     });
  //   }
  // };

  // // Handle agent contact
  // const handleAgentContact = (agent) => {
  //   if (cartModal.cart.length === 0) {
  //     alert("Your cart is empty!");
  //     return;
  //   }

  //   const agentId = agent?.agent_id;

  //   if (!agentId) {
  //     alert("Error: Agent information incomplete. Please try another agent.");
  //     return;
  //   }

  //   const ticketIds = cartModal.cart.map(item => {
  //     return item.id || item.ticket_id || item.ticketId;
  //   });

  //   const ticketDetails = checkoutModal.prepareTicketIdsPayload(cartModal.cart);

  //   checkoutModal.handleAgentBooking(
  //     agentId,
  //     cartModal.cart,
  //     () => {
  //       updateTicketStatus(ticketIds, 'booked');
  //       agentModal.handleContactViaWhatsApp(agent, cartModal.cart, calculateCartTotal());
  //       cartModal.clearCart();
  //       agentModal.closeAgentModal();
  //       setTimeout(() => refetchTickets(), 500);
  //     },
  //     ticketDetails
  //   );
  // };

  // In GamePage.js - Update handleCheckoutPayment function

// Handle checkout payment
// const handleCheckoutPayment = () => {
//   if (!checkoutModal.selectedPaymentMethod) {
//     alert("Please select a payment method");
//     return;
//   }

//   // ✅ Pass apiPricing to prepareTicketIdsPayload
//   const ticketDetails = checkoutModal.prepareTicketIdsPayload(cartModal.cart, apiPricing);
//   console.log("Prepared Ticket Details with Group Pricing:", ticketDetails);

//   if (checkoutModal.selectedPaymentMethod === 'direct') {
//     const ticketIds = cartModal.cart.map(item => item.id);
    
//     checkoutModal.handleDirectPayment(
//       calculateCartTotal(),
//       cartModal.cart,
//       () => {
//         updateTicketStatus(ticketIds, 'booked');
//         cartModal.clearCart();
//         setTimeout(() => refetchTickets(), 500);
//       },
//       ticketDetails
//     );
//   } else if (checkoutModal.selectedPaymentMethod === 'agent') {
//     checkoutModal.handleAgentPayment(() => {
//       agentModal.openAgentModal('agent');
//     });
//   }
// };

// // Handle agent contact
// const handleAgentContact = (agent) => {
//   if (cartModal.cart.length === 0) {
//     alert("Your cart is empty!");
//     return;
//   }

//   const agentId = agent?.agent_id;

//   if (!agentId) {
//     alert("Error: Agent information incomplete. Please try another agent.");
//     return;
//   }

//   const ticketIds = cartModal.cart.map(item => {
//     return item.id || item.ticket_id || item.ticketId;
//   });

//   // ✅ Pass apiPricing to prepareTicketIdsPayload
//   const ticketDetails = checkoutModal.prepareTicketIdsPayload(cartModal.cart, apiPricing);

//   checkoutModal.handleAgentBooking(
//     agentId,
//     cartModal.cart,
//     () => {
//       updateTicketStatus(ticketIds, 'booked');
//       agentModal.handleContactViaWhatsApp(agent, cartModal.cart, calculateCartTotal());
//       cartModal.clearCart();
//       agentModal.closeAgentModal();
//       setTimeout(() => refetchTickets(), 500);
//     },
//     ticketDetails
//   );
// };

   // In GamePage.js - handleCheckoutPayment function

const handleCheckoutPayment = () => {
  if (!checkoutModal.selectedPaymentMethod) {
    alert("Please select a payment method");
    return;
  }

  // ✅ Pass apiPricing to prepareTicketIdsPayload
  const ticketDetails = checkoutModal.prepareTicketIdsPayload(cartModal.cart, apiPricing);
  console.log("Prepared Ticket Details with Group Pricing:", JSON.stringify(ticketDetails, null, 2));

  if (checkoutModal.selectedPaymentMethod === 'direct') {
    const ticketIds = cartModal.cart.map(item => item.id);
    
    checkoutModal.handleDirectPayment(
      calculateCartTotal(),
      cartModal.cart,
      () => {
        updateTicketStatus(ticketIds, 'booked');
        cartModal.clearCart();
        setTimeout(() => refetchTickets(), 500);
      },
      ticketDetails // ✅ Pass prepared ticket details
    );
  } else if (checkoutModal.selectedPaymentMethod === 'agent') {
    checkoutModal.handleAgentPayment(() => {
      agentModal.openAgentModal('agent');
    });
  }
};

// Handle agent contact
const handleAgentContact = (agent) => {
  if (cartModal.cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const agentId = agent?.agent_id;

  if (!agentId) {
    alert("Error: Agent information incomplete. Please try another agent.");
    return;
  }

  const ticketIds = cartModal.cart.map(item => {
    return item.id || item.ticket_id || item.ticketId;
  });

  // ✅ Pass apiPricing to prepareTicketIdsPayload
  const ticketDetails = checkoutModal.prepareTicketIdsPayload(cartModal.cart, apiPricing);

  checkoutModal.handleAgentBooking(
    agentId,
    cartModal.cart,
    () => {
      updateTicketStatus(ticketIds, 'booked');
      agentModal.handleContactViaWhatsApp(agent, cartModal.cart, calculateCartTotal());
      cartModal.clearCart();
      agentModal.closeAgentModal();
      setTimeout(() => refetchTickets(), 500);
    },
    ticketDetails // ✅ Pass prepared ticket details
  );
};

  // Handle booking submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    await bookingModal.submitBooking();
  };

  // Go Back Handler
  const handleGoBack = () => {
    sessionStorage.removeItem(GAME_STATE_KEY);
    navigate(ROUTES.HOME);
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
          
          {/* Back Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-sm font-medium border border-white/10 hover:border-white/20"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </button>
            
            {/* Game Name Display */}
            <span className="text-sm md:text-base font-medium text-white/80">
              {gameName || "Game"}
            </span>
          </div>

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
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveFromCart}
              apiPricing={apiPricing}
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
      </div>

      {/* Modals */}
      <CartModal
        showCart={cartModal.showCart}
        setShowCart={cartModal.setShowCart}
        cart={cartModal.cart}
        removeFromCart={handleRemoveFromCart}
        getCartTotal={calculateCartTotal}
        getCartCount={cartModal.getCartCount}
        clearCart={cartModal.clearCart}
        handleProceedToCheckout={handleProceedToCheckout}
        apiPricing={apiPricing}
      />

      <CheckoutModal
        showCheckout={checkoutModal.showCheckout}
        setShowCheckout={checkoutModal.setShowCheckout}
        selectedPaymentMethod={checkoutModal.selectedPaymentMethod}
        setSelectedPaymentMethod={checkoutModal.selectPaymentMethod}
        getCartTotal={calculateCartTotal}
        getCartCount={cartModal.getCartCount}
        cartItems={cartModal.cart}
        walletBalance={checkoutModal.walletBalance}
        walletLoading={checkoutModal.walletLoading}
        walletError={checkoutModal.walletError}
        fetchWalletBalance={checkoutModal.fetchWalletBalance}
        handleDirectPayment={checkoutModal.handleDirectPayment}
        onDirectPaymentSuccess={() => {
          const ticketIds = cartModal.cart.map(item => item.id);
          if (ticketIds.length) updateTicketStatus(ticketIds, 'booked');
          cartModal.clearCart();
          setTimeout(() => refetchTickets(), 500);
        }}
        handleAgentPayment={() => checkoutModal.handleAgentPayment(
          () => agentModal.openAgentModal('agent')
        )}
        prepareTicketIdsPayload={checkoutModal.prepareTicketIdsPayload}
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
        getCartTotal={calculateCartTotal}
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