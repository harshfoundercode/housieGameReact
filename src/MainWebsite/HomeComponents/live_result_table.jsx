// // import React from "react";
// // import { useNavigate } from "react-router-dom";
// // import { ROUTES } from "../../routes/routes";
// // import { useGameRounds } from "../../hooks/live_result_hooks";
// // import { parseDateTime, formatDrawTime, formatDays } from "../../styles/constants/DateTimeHelper";

// // const LiveResultTable = ({ limit = 4, showViewAll = true }) => {
// //     const navigate = useNavigate();
// //     const { gameRounds, loading, error, refreshGameRounds } = useGameRounds();

// //     // Process API data - USE ONLY API DATA, NO CALCULATIONS FOR STATUS
// //     const processGameData = (games) => {
// //         if (!games || !Array.isArray(games)) return [];

// //         return games.map((game) => {
// //             // Handle games without start_datetime
// //             if (!game.start_datetime) {
// //                 return {
// //                     id: game.game_id,
// //                     gameName: game.title || game.name || "Game",
// //                     drawTime: "TBD",
// //                     days: "TBD",
// //                     status: game.status || 'upcoming',
// //                     roundTime: null,
// //                     gameDate: null,
// //                     startDateTime: null,
// //                     ticketPrice: game.ticket_price,
// //                     totalTickets: game.total_tickets,
// //                     soldTickets: game.sold_tickets,
// //                     availableTickets: game.available_tickets,
// //                     totalPrizes: game.total_prizes,
// //                     totalPrizeAmount: game.total_prize_amount,
// //                     bonus: game.bonus,
// //                     prizes: game.prizes
// //                 };
// //             }

// //             const { gameDate, roundTime } = parseDateTime(game.start_datetime);
// //             const drawTime = formatDrawTime(roundTime, gameDate);
// //             const days = formatDays(game.start_datetime);

// //             return {
// //                 id: game.game_id,
// //                 gameName: game.title || game.name || "Game",
// //                 drawTime: drawTime,
// //                 days: days,
// //                 status: game.status || 'upcoming',
// //                 roundTime: roundTime,
// //                 gameDate: gameDate,
// //                 startDateTime: game.start_datetime,
// //                 ticketPrice: game.ticket_price,
// //                 totalTickets: game.total_tickets,
// //                 soldTickets: game.sold_tickets,
// //                 availableTickets: game.available_tickets,
// //                 totalPrizes: game.total_prizes,
// //                 totalPrizeAmount: game.total_prize_amount,
// //                 bonus: game.bonus,
// //                 prizes: game.prizes
// //             };
// //         });
// //     };

// //     // Get games from API response and sort them
// //     const allGames = processGameData(gameRounds?.data?.games || []).sort((a, b) => {
// //         const statusOrder = { live: 0, upcoming: 1, completed: 2, ended: 2, cancelled: 3 };
// //         return (statusOrder[a.status] || 1) - (statusOrder[b.status] || 1);
// //     });

// //     // Limit the number of games shown (for main page)
// //     const displayGames = limit ? allGames.slice(0, limit) : allGames;

// //     // Get live games based on API status
// //     const liveGames = allGames.filter(game => game.status === 'live');
    
// //     const GAME_STATE_KEY = "tambola_current_game_state";

// //     // Navigate to game based on API status
// //     const handleGameClick = (game) => {
// //         const state = {
// //             gameId: game.id,
// //             gameName: game.gameName,
// //             gameDate: game.gameDate,
// //             roundTime: game.roundTime
// //         };

// //         sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));

// //         if (game.status === 'live' || game.status === 'completed' || game.status === 'ended') {
// //             navigate(ROUTES.AFTERGAME, { state });
// //         } else {
// //             navigate(ROUTES.GAME, { state });
// //         }
// //     };

// //     // Loading State
// //     if (loading) {
// //         return (
// //             <section className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-3 sm:px-4">
// //                 <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
// //                     <div className="text-center mb-4 sm:mb-5 md:mb-6">
// //                         <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#004296]">
// //                             Loading Schedule...
// //                         </h2>
// //                     </div>
// //                     <div className="bg-white rounded-xl shadow-md p-6">
// //                         <div className="animate-pulse space-y-4">
// //                             {[1, 2, 3, 4].map((item) => (
// //                                 <div key={item} className="flex items-center justify-between">
// //                                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
// //                                     <div className="h-8 bg-gray-200 rounded-full w-20"></div>
// //                                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     </div>
// //                 </div>
// //             </section>
// //         );
// //     }

// //     // Error State
// //     if (error) {
// //         return (
// //             <section className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-3 sm:px-4">
// //                 <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-center">
// //                     <div className="bg-red-50 border border-red-200 rounded-xl p-6">
// //                         <span className="text-4xl mb-2 block">⚠️</span>
// //                         <h3 className="text-red-800 font-semibold text-lg">Failed to load schedule</h3>
// //                         <p className="text-red-600 text-sm mt-2">{error}</p>
// //                         <button
// //                             onClick={refreshGameRounds}
// //                             className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
// //                         >
// //                             Try Again
// //                         </button>
// //                     </div>
// //                 </div>
// //             </section>
// //         );
// //     }

// //     return (
// //         <section className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-3 sm:px-4">
// //             <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">

// //                 {/* Heading */}
// //                 <div className="text-center mb-4 sm:mb-5 md:mb-6">
// //                     <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#004296] inline-block relative">
// //                         {showViewAll ? ' Live Draw Schedule' : 'Live Draw Schedule'}
// //                         <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FBEFA4] rounded-full w-12 h-0.5 sm:w-14 sm:h-1 md:w-16"></span>
// //                     </h2>
// //                 </div>

// //                 {/* Table Container */}
// //                 <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden border border-gray-100 mb-4 sm:mb-5">

// //                     {/* Header */}
// //                     <div className="bg-gradient-to-r from-[#004296] to-[#003380] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4">
// //                         <h3 className="text-[#FBEFA4] font-bold text-xs sm:text-sm md:text-base tracking-wide flex items-center justify-center gap-1 sm:gap-2">
// //                             <span className="hidden xs:inline">🎲</span>
// //                             LIVE DRAW SCHEDULE
// //                             <span className="hidden xs:inline">🎲</span>
// //                         </h3>
// //                     </div>

// //                     {/* Column Headers - Desktop */}
// //                     <div className="hidden md:grid grid-cols-4 gap-3 lg:gap-4 bg-gray-50 px-4 sm:px-5 md:px-6 py-2 sm:py-3 border-b border-gray-200">
// //                         <span className="text-gray-600 font-semibold text-xs sm:text-sm">Game Name</span>
// //                         <span className="text-gray-600 font-semibold text-xs sm:text-sm text-center">Draw Time</span>
// //                         <span className="text-gray-600 font-semibold text-xs sm:text-sm text-center">Schedule</span>
// //                         <span className="text-gray-600 font-semibold text-xs sm:text-sm text-right">Status</span>
// //                     </div>

// //                     {/* Game Items */}
// //                     <div className="divide-y divide-gray-100">
// //                         {displayGames.length > 0 ? displayGames.map((item, index) => (
// //                             <div
// //                                 key={item.id}
// //                                 onClick={() => handleGameClick(item)}
// //                                 className={`cursor-pointer p-3 sm:p-4 md:p-0 hover:bg-gray-50 transition-all ${
// //                                     index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
// //                                 } ${item.status === 'live' ? 'bg-green-50/50 hover:bg-green-50' : ''}`}
// //                             >
// //                                 {/* Mobile View */}
// //                                 <div className="md:hidden space-y-2">
// //                                     <div className="flex items-center justify-between">
// //                                         <div className="flex items-center gap-1.5 sm:gap-2">
// //                                             {item.status === "live" && (
// //                                                 <span className="relative flex h-2 w-2">
// //                                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
// //                                                     <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
// //                                                 </span>
// //                                             )}
// //                                             <span className="font-bold text-gray-800 text-xs sm:text-sm">
// //                                                 {item.gameName}
// //                                             </span>
// //                                         </div>
// //                                         <div className="flex items-center gap-2">
// //                                             <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
// //                                                 item.status === 'live' 
// //                                                     ? 'bg-green-500 text-white animate-pulse'
// //                                                     : item.status === 'completed' || item.status === 'ended'
// //                                                     ? 'bg-gray-400 text-white'
// //                                                     : item.status === 'cancelled'
// //                                                     ? 'bg-red-400 text-white'
// //                                                     : 'bg-blue-100 text-blue-800'
// //                                             }`}>
// //                                                 {item.status === 'live' ? 'LIVE' : 
// //                                                  item.status === 'completed' || item.status === 'ended' ? 'ENDED' : 
// //                                                  item.status === 'cancelled' ? 'CANCELLED' : 
// //                                                  'UPCOMING'}
// //                                             </span>
// //                                             <span className="bg-[#FBEFA4] text-[#004296] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm">
// //                                                 {item.drawTime}
// //                                             </span>
// //                                         </div>
// //                                     </div>
// //                                     <p className="text-gray-500 text-[10px] sm:text-xs flex items-center gap-1">
// //                                         <span>📅</span>
// //                                         <span>{item.days}</span>
// //                                     </p>
// //                                 </div>

// //                                 {/* Desktop View */}
// //                                 <div className="hidden md:grid grid-cols-4 gap-3 lg:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4">
// //                                     <div className="flex items-center gap-1.5 sm:gap-2">
// //                                         {item.status === "live" && (
// //                                             <span className="relative flex h-2 w-2">
// //                                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
// //                                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
// //                                             </span>
// //                                         )}
// //                                         <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">
// //                                             {item.gameName}
// //                                         </span>
// //                                     </div>
// //                                     <div className="flex justify-center">
// //                                         <span className="bg-[#FBEFA4] text-[#004296] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm">
// //                                             {item.drawTime}
// //                                         </span>
// //                                     </div>
// //                                     <div className="flex items-center justify-center">
// //                                         <span className="text-gray-500 text-xs sm:text-sm">
// //                                             {item.days}
// //                                         </span>
// //                                     </div>
// //                                     <div className="flex items-center justify-end">
// //                                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${
// //                                             item.status === 'live' 
// //                                                 ? 'bg-green-500 text-white animate-pulse'
// //                                                 : item.status === 'completed' || item.status === 'ended'
// //                                                 ? 'bg-gray-400 text-white'
// //                                                 : item.status === 'cancelled'
// //                                                 ? 'bg-red-400 text-white'
// //                                                 : 'bg-blue-100 text-blue-800'
// //                                         }`}>
// //                                             {item.status === 'live' ? '🔴 LIVE' : 
// //                                              item.status === 'completed' || item.status === 'ended' ? '✓ ENDED' : 
// //                                              item.status === 'cancelled' ? '✗ CANCELLED' : 
// //                                              '⏰ UPCOMING'}
// //                                         </span>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         )) : (
// //                             <div className="p-6 text-center text-gray-500">
// //                                 No upcoming games scheduled
// //                             </div>
// //                         )}
// //                     </div>
// //                 </div>

// //                 {/* View All Button */}
// //                 {showViewAll && limit && allGames.length > limit && (
// //                     <div className="text-center pt-2 sm:pt-3 mb-6">
// //                         <button
// //                             onClick={() => navigate(ROUTES.ALL_LIVE_RESULTS)}
// //                             className="bg-gradient-to-r from-[#004296] to-[#003380] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#FBEFA4]/30 inline-flex items-center gap-1.5 sm:gap-2"
// //                         >
// //                             <span>📋</span>
// //                             View All Games ({allGames.length})
// //                             <span>→</span>
// //                         </button>
// //                     </div>
// //                 )}
// //             </div>
// //         </section>
// //     );
// // };

// // export default LiveResultTable;
// // LiveResultTable.jsx - with Custom SSE (Header Support)
// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "../../routes/routes";
// import { useGameRounds } from "../../hooks/live_result_hooks";
// import { parseDateTime, formatDrawTime, formatDays } from "../../styles/constants/DateTimeHelper";

// const LiveResultTable = ({ limit = 4, showViewAll = true }) => {
//     const navigate = useNavigate();
//     const { gameRounds, loading, error, refreshGameRounds } = useGameRounds();
//     const [games, setGames] = useState([]);
//     const [sseConnected, setSseConnected] = useState(false);
//     const [liveGameId, setLiveGameId] = useState(null);
//     const eventSourceRef = useRef(null);
//     const retryTimeoutRef = useRef(null);
//     const GAME_STATE_KEY = "tambola_current_game_state";

//     // Process API data
//     const processGameData = (gamesData) => {
//         if (!gamesData || !Array.isArray(gamesData)) return [];

//         return gamesData.map((game) => {
//             if (!game.start_datetime) {
//                 return {
//                     id: game.game_id,
//                     gameName: game.title || game.name || "Game",
//                     drawTime: "TBD",
//                     days: "TBD",
//                     status: game.status || 'upcoming',
//                     roundTime: null,
//                     gameDate: null,
//                     startDateTime: null,
//                     ticketPrice: game.ticket_price,
//                     totalTickets: game.total_tickets,
//                     soldTickets: game.sold_tickets,
//                     availableTickets: game.available_tickets,
//                     totalPrizes: game.total_prizes,
//                     totalPrizeAmount: game.total_prize_amount,
//                     bonus: game.bonus,
//                     prizes: game.prizes
//                 };
//             }

//             const { gameDate, roundTime } = parseDateTime(game.start_datetime);
//             const drawTime = formatDrawTime(roundTime, gameDate);
//             const days = formatDays(game.start_datetime);

//             return {
//                 id: game.game_id,
//                 gameName: game.title || game.name || "Game",
//                 drawTime: drawTime,
//                 days: days,
//                 status: game.status || 'upcoming',
//                 roundTime: roundTime,
//                 gameDate: gameDate,
//                 startDateTime: game.start_datetime,
//                 ticketPrice: game.ticket_price,
//                 totalTickets: game.total_tickets,
//                 soldTickets: game.sold_tickets,
//                 availableTickets: game.available_tickets,
//                 totalPrizes: game.total_prizes,
//                 totalPrizeAmount: game.total_prize_amount,
//                 bonus: game.bonus,
//                 prizes: game.prizes
//             };
//         });
//     };

//     // ✅ Custom SSE with Fetch API (Header Support)
//     const setupCustomSSE = async () => {
//         const token = localStorage.getItem("token");
        
//         if (!token) {
//             console.log("⚠️ No token found, skipping SSE connection");
//             return;
//         }

//         // Close existing connection
//         if (eventSourceRef.current) {
//             eventSourceRef.current.abort?.();
//             eventSourceRef.current = null;
//         }

//         try {
//             console.log("🔌 Connecting to SSE with headers...");
            
//             // ✅ Using fetch with headers
//             const controller = new AbortController();
//             eventSourceRef.current = controller;

//             const response = await fetch('https://api.luckyfunda.com/api/user/sse-connect', {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'text/event-stream',
//                     'Authorization': `Bearer ${token}`,
//                     'Accept': 'text/event-stream',
//                     'Cache-Control': 'no-cache',
//                 },
//                 signal: controller.signal,
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//             console.log("✅ SSE Connection established with headers");
//             setSseConnected(true);

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder();
//             let buffer = '';

//             // ✅ Read SSE stream
//             const readStream = async () => {
//                 try {
//                     while (true) {
//                         const { done, value } = await reader.read();
//                         if (done) {
//                             console.log("📡 SSE stream ended");
//                             break;
//                         }

//                         // Decode and process the chunk
//                         const chunk = decoder.decode(value, { stream: true });
//                         buffer += chunk;

//                         // Process complete events (separated by double newline)
//                         const events = buffer.split('\n\n');
//                         buffer = events.pop() || '';

//                         for (const event of events) {
//                             if (event.trim()) {
//                                 handleSSEEvent(event);
//                             }
//                         }
//                     }
//                 } catch (error) {
//                     if (error.name !== 'AbortError') {
//                         console.error("❌ SSE Stream error:", error);
//                         setSseConnected(false);
//                         // Retry after delay
//                         retryTimeoutRef.current = setTimeout(() => {
//                             setupCustomSSE();
//                         }, 5000);
//                     }
//                 }
//             };

//             readStream();

//         } catch (error) {
//             console.error("❌ Failed to setup SSE with headers:", error);
//             setSseConnected(false);
            
//             // Retry after delay
//             retryTimeoutRef.current = setTimeout(() => {
//                 setupCustomSSE();
//             }, 5000);
//         }
//     };

//     // ✅ Handle SSE Events
//     const handleSSEEvent = (eventData) => {
//         try {
//             // Parse SSE event format: "event: game_created\ndata: {...}"
//             const lines = eventData.split('\n');
//             let eventType = '';
//             let data = '';

//             for (const line of lines) {
//                 if (line.startsWith('event: ')) {
//                     eventType = line.substring(7).trim();
//                 } else if (line.startsWith('data: ')) {
//                     data = line.substring(6).trim();
//                 }
//             }

//             if (!data) return;

//             const parsedData = JSON.parse(data);
//             console.log(`📡 SSE Event [${eventType}]:`, parsedData);

//             // ✅ Handle different event types
//             switch (eventType) {
//                 case 'connected':
//                     console.log("✅ SSE Connected successfully");
//                     setSseConnected(true);
//                     break;

//                 case 'game_created':
//                     handleGameCreated(parsedData);
//                     break;

//                 case 'game_updated':
//                     handleGameUpdated(parsedData);
//                     break;

//                 case 'game_live':
//                     handleGameLive(parsedData);
//                     break;

//                 case 'game_completed':
//                     handleGameCompleted(parsedData);
//                     break;

//                 default:
//                     // If no event type, check data type
//                     if (parsedData.type === 'game_created') {
//                         handleGameCreated(parsedData.data);
//                     } else if (parsedData.type === 'game_updated') {
//                         handleGameUpdated(parsedData.data);
//                     } else if (parsedData.type === 'game_live') {
//                         handleGameLive(parsedData.data);
//                     } else if (parsedData.type === 'game_completed') {
//                         handleGameCompleted(parsedData.data);
//                     }
//                     break;
//             }
//         } catch (error) {
//             console.error("❌ Error parsing SSE event:", error);
//         }
//     };

//     // ✅ Handle Game Created
//     const handleGameCreated = (newGame) => {
//         if (!newGame) return;
//         console.log("🎮 New game created:", newGame.title);

//         const processedGame = {
//             id: newGame.game_id,
//             gameName: newGame.title,
//             drawTime: formatDrawTime(
//                 newGame.start_datetime ? newGame.start_datetime.split(' ')[1] : null,
//                 newGame.start_datetime ? newGame.start_datetime.split(' ')[0] : null
//             ),
//             days: formatDays(newGame.start_datetime),
//             status: newGame.status || 'upcoming',
//             roundTime: newGame.start_datetime ? newGame.start_datetime.split(' ')[1] : null,
//             gameDate: newGame.start_datetime ? newGame.start_datetime.split(' ')[0] : null,
//             startDateTime: newGame.start_datetime,
//             ticketPrice: newGame.ticket_price,
//             totalTickets: newGame.total_tickets,
//             soldTickets: newGame.sold_tickets || 0,
//             availableTickets: newGame.available_tickets || newGame.total_tickets,
//             totalPrizes: newGame.total_prizes,
//             totalPrizeAmount: newGame.total_prize_amount,
//             bonus: newGame.bonus,
//             prizes: newGame.prizes
//         };

//         setGames(prevGames => {
//             const exists = prevGames.some(g => g.id === newGame.game_id);
//             if (exists) {
//                 return prevGames.map(g => 
//                     g.id === newGame.game_id ? { ...processedGame, ...g } : g
//                 );
//             }
//             return [processedGame, ...prevGames];
//         });

//         showNotification(`🎮 New Game: ${newGame.title}`, 'info');
//     };

//     // ✅ Handle Game Updated
//     const handleGameUpdated = (updatedGame) => {
//         if (!updatedGame) return;
//         console.log("🔄 Game updated:", updatedGame.title);

//         setGames(prevGames => 
//             prevGames.map(g => {
//                 if (g.id === updatedGame.game_id) {
//                     return {
//                         ...g,
//                         status: updatedGame.status || g.status,
//                         soldTickets: updatedGame.sold_tickets || g.soldTickets,
//                         availableTickets: updatedGame.available_tickets || g.availableTickets
//                     };
//                 }
//                 return g;
//             })
//         );
//     };

//     // ✅ Handle Game Live
//     const handleGameLive = (liveGame) => {
//         if (!liveGame) return;
//         console.log("🔴 Game is now LIVE:", liveGame.title);
//         setLiveGameId(liveGame.game_id);

//         setGames(prevGames => 
//             prevGames.map(g => {
//                 if (g.id === liveGame.game_id) {
//                     return { ...g, status: 'live' };
//                 }
//                 return g;
//             })
//         );

//         showNotification(`🔴 ${liveGame.title} is now LIVE!`, 'success');
//     };

//     // ✅ Handle Game Completed
//     const handleGameCompleted = (completedGame) => {
//         if (!completedGame) return;
//         console.log("🏁 Game completed:", completedGame.title);

//         setGames(prevGames => 
//             prevGames.map(g => {
//                 if (g.id === completedGame.game_id) {
//                     return { ...g, status: 'completed' };
//                 }
//                 return g;
//             })
//         );
//     };

//     // ✅ Show Notification
//     const showNotification = (message, type = 'info') => {
//         const toast = document.createElement('div');
//         toast.className = `fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all transform translate-x-0 max-w-xs ${
//             type === 'success' ? 'bg-green-500 text-white' :
//             type === 'error' ? 'bg-red-500 text-white' :
//             'bg-blue-500 text-white'
//         }`;
//         toast.textContent = message;
//         document.body.appendChild(toast);
        
//         setTimeout(() => {
//             toast.classList.add('opacity-0', 'translate-x-full');
//             setTimeout(() => toast.remove(), 300);
//         }, 4000);
//     };

//     // ✅ Initial data load
//     useEffect(() => {
//         if (gameRounds?.data?.games) {
//             const processed = processGameData(gameRounds.data.games);
//             setGames(processed);
//         }
//     }, [gameRounds]);

//     // ✅ Setup SSE on component mount
//     useEffect(() => {
//         setupCustomSSE();

//         return () => {
//             // Cleanup
//             if (eventSourceRef.current) {
//                 eventSourceRef.current.abort?.();
//                 eventSourceRef.current = null;
//             }
//             if (retryTimeoutRef.current) {
//                 clearTimeout(retryTimeoutRef.current);
//                 retryTimeoutRef.current = null;
//             }
//             console.log("🧹 Cleaned up SSE connection");
//         };
//     }, []);

//     // ✅ Sort games
//     const allGames = [...games].sort((a, b) => {
//         const statusOrder = { live: 0, upcoming: 1, completed: 2, ended: 2, cancelled: 3 };
//         return (statusOrder[a.status] || 1) - (statusOrder[b.status] || 1);
//     });

//     const displayGames = limit ? allGames.slice(0, limit) : allGames;
//     const liveGames = allGames.filter(game => game.status === 'live');

//     // Navigate to game
//     const handleGameClick = (game) => {
//         const state = {
//             gameId: game.id,
//             gameName: game.gameName,
//             gameDate: game.gameDate,
//             roundTime: game.roundTime
//         };

//         sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));

//         if (game.status === 'live' || game.status === 'completed' || game.status === 'ended') {
//             navigate(ROUTES.AFTERGAME, { state });
//         } else {
//             navigate(ROUTES.GAME, { state });
//         }
//     };

//     // Loading State
//     if (loading) {
//         return (
//             <section className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-3 sm:px-4">
//                 <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
//                     <div className="text-center mb-4 sm:mb-5 md:mb-6">
//                         <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#004296]">
//                             Loading Schedule...
//                         </h2>
//                     </div>
//                     <div className="bg-white rounded-xl shadow-md p-6">
//                         <div className="animate-pulse space-y-4">
//                             {[1, 2, 3, 4].map((item) => (
//                                 <div key={item} className="flex items-center justify-between">
//                                     <div className="h-4 bg-gray-200 rounded w-1/3"></div>
//                                     <div className="h-8 bg-gray-200 rounded-full w-20"></div>
//                                     <div className="h-4 bg-gray-200 rounded w-1/4"></div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         );
//     }

//     // Error State
//     if (error) {
//         return (
//             <section className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-3 sm:px-4">
//                 <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-center">
//                     <div className="bg-red-50 border border-red-200 rounded-xl p-6">
//                         <span className="text-4xl mb-2 block">⚠️</span>
//                         <h3 className="text-red-800 font-semibold text-lg">Failed to load schedule</h3>
//                         <p className="text-red-600 text-sm mt-2">{error}</p>
//                         <button
//                             onClick={refreshGameRounds}
//                             className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
//                         >
//                             Try Again
//                         </button>
//                     </div>
//                 </div>
//             </section>
//         );
//     }

//     return (
//         <section className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-3 sm:px-4">
//             <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">

//                 {/* Heading with SSE Status */}
//                 <div className="text-center mb-4 sm:mb-5 md:mb-6">
//                     <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#004296] inline-block relative">
//                         {showViewAll ? ' Live Draw Schedule' : 'Live Draw Schedule'}
//                         <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FBEFA4] rounded-full w-12 h-0.5 sm:w-14 sm:h-1 md:w-16"></span>
//                     </h2>
//                     {/* ✅ SSE Connection Status */}
//                     <div className="flex items-center justify-center gap-2 mt-2">
//                         <span className={`inline-block w-2 h-2 rounded-full ${sseConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
//                         <span className="text-xs text-gray-500">
//                             {sseConnected ? '🟢 Live Updates' : '🔴 Offline'}
//                         </span>
//                         {liveGames.length > 0 && (
//                             <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
//                                 {liveGames.length} LIVE
//                             </span>
//                         )}
//                     </div>
//                 </div>

//                 {/* Table Container */}
//                 <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden border border-gray-100 mb-4 sm:mb-5">

//                     {/* Header */}
//                     <div className="bg-gradient-to-r from-[#004296] to-[#003380] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4">
//                         <h3 className="text-[#FBEFA4] font-bold text-xs sm:text-sm md:text-base tracking-wide flex items-center justify-center gap-1 sm:gap-2">
//                             <span className="hidden xs:inline">🎲</span>
//                             LIVE DRAW SCHEDULE
//                             <span className="hidden xs:inline">🎲</span>
//                         </h3>
//                     </div>

//                     {/* Column Headers - Desktop */}
//                     <div className="hidden md:grid grid-cols-4 gap-3 lg:gap-4 bg-gray-50 px-4 sm:px-5 md:px-6 py-2 sm:py-3 border-b border-gray-200">
//                         <span className="text-gray-600 font-semibold text-xs sm:text-sm">Game Name</span>
//                         <span className="text-gray-600 font-semibold text-xs sm:text-sm text-center">Draw Time</span>
//                         <span className="text-gray-600 font-semibold text-xs sm:text-sm text-center">Schedule</span>
//                         <span className="text-gray-600 font-semibold text-xs sm:text-sm text-right">Status</span>
//                     </div>

//                     {/* Game Items */}
//                     <div className="divide-y divide-gray-100">
//                         {displayGames.length > 0 ? displayGames.map((item, index) => (
//                             <div
//                                 key={item.id}
//                                 onClick={() => handleGameClick(item)}
//                                 className={`cursor-pointer p-3 sm:p-4 md:p-0 hover:bg-gray-50 transition-all ${
//                                     index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
//                                 } ${item.status === 'live' ? 'bg-green-50/50 hover:bg-green-50 border-l-4 border-l-green-500' : ''}`}
//                             >
//                                 {/* Mobile View */}
//                                 <div className="md:hidden space-y-2">
//                                     <div className="flex items-center justify-between">
//                                         <div className="flex items-center gap-1.5 sm:gap-2">
//                                             {item.status === "live" && (
//                                                 <span className="relative flex h-2 w-2">
//                                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                                                     <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                                                 </span>
//                                             )}
//                                             <span className="font-bold text-gray-800 text-xs sm:text-sm">
//                                                 {item.gameName}
//                                             </span>
//                                         </div>
//                                         <div className="flex items-center gap-2">
//                                             <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
//                                                 item.status === 'live' 
//                                                     ? 'bg-green-500 text-white animate-pulse'
//                                                     : item.status === 'completed' || item.status === 'ended'
//                                                     ? 'bg-gray-400 text-white'
//                                                     : item.status === 'cancelled'
//                                                     ? 'bg-red-400 text-white'
//                                                     : 'bg-blue-100 text-blue-800'
//                                             }`}>
//                                                 {item.status === 'live' ? 'LIVE' : 
//                                                  item.status === 'completed' || item.status === 'ended' ? 'ENDED' : 
//                                                  item.status === 'cancelled' ? 'CANCELLED' : 
//                                                  'UPCOMING'}
//                                             </span>
//                                             <span className="bg-[#FBEFA4] text-[#004296] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm">
//                                                 {item.drawTime}
//                                             </span>
//                                         </div>
//                                     </div>
//                                     <p className="text-gray-500 text-[10px] sm:text-xs flex items-center gap-1">
//                                         <span>📅</span>
//                                         <span>{item.days}</span>
//                                     </p>
//                                 </div>

//                                 {/* Desktop View */}
//                                 <div className="hidden md:grid grid-cols-4 gap-3 lg:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4">
//                                     <div className="flex items-center gap-1.5 sm:gap-2">
//                                         {item.status === "live" && (
//                                             <span className="relative flex h-2 w-2">
//                                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                                                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//                                             </span>
//                                         )}
//                                         <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">
//                                             {item.gameName}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-center">
//                                         <span className="bg-[#FBEFA4] text-[#004296] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm">
//                                             {item.drawTime}
//                                         </span>
//                                     </div>
//                                     <div className="flex items-center justify-center">
//                                         <span className="text-gray-500 text-xs sm:text-sm">
//                                             {item.days}
//                                         </span>
//                                     </div>
//                                     <div className="flex items-center justify-end">
//                                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${
//                                             item.status === 'live' 
//                                                 ? 'bg-green-500 text-white animate-pulse'
//                                                 : item.status === 'completed' || item.status === 'ended'
//                                                 ? 'bg-gray-400 text-white'
//                                                 : item.status === 'cancelled'
//                                                 ? 'bg-red-400 text-white'
//                                                 : 'bg-blue-100 text-blue-800'
//                                         }`}>
//                                             {item.status === 'live' ? '🔴 LIVE' : 
//                                              item.status === 'completed' || item.status === 'ended' ? '✓ ENDED' : 
//                                              item.status === 'cancelled' ? '✗ CANCELLED' : 
//                                              '⏰ UPCOMING'}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         )) : (
//                             <div className="p-6 text-center text-gray-500">
//                                 No upcoming games scheduled
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 {/* View All Button */}
//                 {showViewAll && limit && allGames.length > limit && (
//                     <div className="text-center pt-2 sm:pt-3 mb-6">
//                         <button
//                             onClick={() => navigate(ROUTES.ALL_LIVE_RESULTS)}
//                             className="bg-gradient-to-r from-[#004296] to-[#003380] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#FBEFA4]/30 inline-flex items-center gap-1.5 sm:gap-2"
//                         >
//                             <span>📋</span>
//                             View All Games ({allGames.length})
//                             <span>→</span>
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// };

// export default LiveResultTable;
// LiveResultTable.jsx - with Real-time Status Update
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { useGameRounds } from "../../hooks/live_result_hooks";
import { parseDateTime, formatDrawTime, formatDays } from "../../styles/constants/DateTimeHelper";

const LiveResultTable = ({ limit = 4, showViewAll = true }) => {
    const navigate = useNavigate();
    const { gameRounds, loading, error, refreshGameRounds } = useGameRounds();
    const [games, setGames] = useState([]);
    const [sseConnected, setSseConnected] = useState(false);
    const [liveGameId, setLiveGameId] = useState(null);
    const eventSourceRef = useRef(null);
    const retryTimeoutRef = useRef(null);
    const timerIntervalRef = useRef(null);
    const GAME_STATE_KEY = "tambola_current_game_state";

    // Process API data
    const processGameData = (gamesData) => {
        if (!gamesData || !Array.isArray(gamesData)) return [];

        return gamesData.map((game) => {
            if (!game.start_datetime) {
                return {
                    id: game.game_id,
                    gameName: game.title || game.name || "Game",
                    drawTime: "TBD",
                    days: "TBD",
                    status: game.status || 'upcoming',
                    roundTime: null,
                    gameDate: null,
                    startDateTime: null,
                    ticketPrice: game.ticket_price,
                    totalTickets: game.total_tickets,
                    soldTickets: game.sold_tickets,
                    availableTickets: game.available_tickets,
                    totalPrizes: game.total_prizes,
                    totalPrizeAmount: game.total_prize_amount,
                    bonus: game.bonus,
                    prizes: game.prizes
                };
            }

            const { gameDate, roundTime } = parseDateTime(game.start_datetime);
            const drawTime = formatDrawTime(roundTime, gameDate);
            const days = formatDays(game.start_datetime);

            return {
                id: game.game_id,
                gameName: game.title || game.name || "Game",
                drawTime: drawTime,
                days: days,
                status: game.status || 'upcoming',
                roundTime: roundTime,
                gameDate: gameDate,
                startDateTime: game.start_datetime,
                ticketPrice: game.ticket_price,
                totalTickets: game.total_tickets,
                soldTickets: game.sold_tickets,
                availableTickets: game.available_tickets,
                totalPrizes: game.total_prizes,
                totalPrizeAmount: game.total_prize_amount,
                bonus: game.bonus,
                prizes: game.prizes
            };
        });
    };

    // ✅ Check if game should be live based on time
    const checkGameLiveStatus = () => {
        const now = new Date();
        
        setGames(prevGames => 
            prevGames.map(game => {
                // Skip if already live, completed, or ended
                if (game.status === 'live' || game.status === 'completed' || game.status === 'ended') {
                    return game;
                }

                // Skip if no start time
                if (!game.startDateTime) {
                    return game;
                }

                try {
                    const gameTime = new Date(game.startDateTime);
                    
                    // Check if game time has passed
                    if (gameTime <= now) {
                        console.log(`🔴 Game ${game.gameName} is now LIVE! (Scheduled: ${game.startDateTime})`);
                        return { ...game, status: 'live' };
                    }
                } catch (e) {
                    console.error("Error checking game time:", e);
                }
                
                return game;
            })
        );
    };

    // ✅ Custom SSE with Fetch API (Header Support)
    const setupCustomSSE = async () => {
        const token = localStorage.getItem("token");
        
        if (!token) {
            console.log("⚠️ No token found, skipping SSE connection");
            return;
        }

        // Close existing connection
        if (eventSourceRef.current) {
            eventSourceRef.current.abort?.();
            eventSourceRef.current = null;
        }

        try {
            console.log("🔌 Connecting to SSE with headers...");
            
            const controller = new AbortController();
            eventSourceRef.current = controller;

            const response = await fetch('https://api.luckyfunda.com/api/user/sse-connect', {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                },
                signal: controller.signal,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log("✅ SSE Connection established with headers");
            setSseConnected(true);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            const readStream = async () => {
                try {
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) {
                            console.log("📡 SSE stream ended");
                            break;
                        }

                        const chunk = decoder.decode(value, { stream: true });
                        buffer += chunk;

                        const events = buffer.split('\n\n');
                        buffer = events.pop() || '';

                        for (const event of events) {
                            if (event.trim()) {
                                handleSSEEvent(event);
                            }
                        }
                    }
                } catch (error) {
                    if (error.name !== 'AbortError') {
                        console.error("❌ SSE Stream error:", error);
                        setSseConnected(false);
                        retryTimeoutRef.current = setTimeout(() => {
                            setupCustomSSE();
                        }, 5000);
                    }
                }
            };

            readStream();

        } catch (error) {
            console.error("❌ Failed to setup SSE with headers:", error);
            setSseConnected(false);
            
            retryTimeoutRef.current = setTimeout(() => {
                setupCustomSSE();
            }, 5000);
        }
    };

    // ✅ Handle SSE Events
    const handleSSEEvent = (eventData) => {
        try {
            const lines = eventData.split('\n');
            let eventType = '';
            let data = '';

            for (const line of lines) {
                if (line.startsWith('event: ')) {
                    eventType = line.substring(7).trim();
                } else if (line.startsWith('data: ')) {
                    data = line.substring(6).trim();
                }
            }

            if (!data) return;

            const parsedData = JSON.parse(data);
            console.log(`📡 SSE Event [${eventType}]:`, parsedData);

            switch (eventType) {
                case 'connected':
                    console.log("✅ SSE Connected successfully");
                    setSseConnected(true);
                    break;

                case 'game_created':
                    handleGameCreated(parsedData);
                    break;

                case 'game_updated':
                    handleGameUpdated(parsedData);
                    break;

                case 'game_live':
                    handleGameLive(parsedData);
                    break;

                case 'game_completed':
                    handleGameCompleted(parsedData);
                    break;

                default:
                    if (parsedData.type === 'game_created') {
                        handleGameCreated(parsedData.data);
                    } else if (parsedData.type === 'game_updated') {
                        handleGameUpdated(parsedData.data);
                    } else if (parsedData.type === 'game_live') {
                        handleGameLive(parsedData.data);
                    } else if (parsedData.type === 'game_completed') {
                        handleGameCompleted(parsedData.data);
                    }
                    break;
            }
        } catch (error) {
            console.error("❌ Error parsing SSE event:", error);
        }
    };

    // ✅ Handle Game Created
    const handleGameCreated = (newGame) => {
        if (!newGame) return;
        console.log("🎮 New game created:", newGame.title);

        const processedGame = {
            id: newGame.game_id,
            gameName: newGame.title,
            drawTime: formatDrawTime(
                newGame.start_datetime ? newGame.start_datetime.split(' ')[1] : null,
                newGame.start_datetime ? newGame.start_datetime.split(' ')[0] : null
            ),
            days: formatDays(newGame.start_datetime),
            status: newGame.status || 'upcoming',
            roundTime: newGame.start_datetime ? newGame.start_datetime.split(' ')[1] : null,
            gameDate: newGame.start_datetime ? newGame.start_datetime.split(' ')[0] : null,
            startDateTime: newGame.start_datetime,
            ticketPrice: newGame.ticket_price,
            totalTickets: newGame.total_tickets,
            soldTickets: newGame.sold_tickets || 0,
            availableTickets: newGame.available_tickets || newGame.total_tickets,
            totalPrizes: newGame.total_prizes,
            totalPrizeAmount: newGame.total_prize_amount,
            bonus: newGame.bonus,
            prizes: newGame.prizes
        };

        setGames(prevGames => {
            const exists = prevGames.some(g => g.id === newGame.game_id);
            if (exists) {
                return prevGames.map(g => 
                    g.id === newGame.game_id ? { ...processedGame, ...g } : g
                );
            }
            return [processedGame, ...prevGames];
        });

        showNotification(`🎮 New Game: ${newGame.title}`, 'info');
    };

    // ✅ Handle Game Updated
    const handleGameUpdated = (updatedGame) => {
        if (!updatedGame) return;
        console.log("🔄 Game updated:", updatedGame.title);

        setGames(prevGames => 
            prevGames.map(g => {
                if (g.id === updatedGame.game_id) {
                    return {
                        ...g,
                        status: updatedGame.status || g.status,
                        soldTickets: updatedGame.sold_tickets || g.soldTickets,
                        availableTickets: updatedGame.available_tickets || g.availableTickets
                    };
                }
                return g;
            })
        );
    };

    // ✅ Handle Game Live
    const handleGameLive = (liveGame) => {
        if (!liveGame) return;
        console.log("🔴 Game is now LIVE:", liveGame.title);
        setLiveGameId(liveGame.game_id);

        setGames(prevGames => 
            prevGames.map(g => {
                if (g.id === liveGame.game_id) {
                    return { ...g, status: 'live' };
                }
                return g;
            })
        );

        showNotification(`🔴 ${liveGame.title} is now LIVE!`, 'success');
    };

    // ✅ Handle Game Completed
    const handleGameCompleted = (completedGame) => {
        if (!completedGame) return;
        console.log("🏁 Game completed:", completedGame.title);

        setGames(prevGames => 
            prevGames.map(g => {
                if (g.id === completedGame.game_id) {
                    return { ...g, status: 'completed' };
                }
                return g;
            })
        );
    };

    // ✅ Show Notification
    const showNotification = (message, type = 'info') => {
        const toast = document.createElement('div');
        toast.className = `fixed top-20 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all transform translate-x-0 max-w-xs ${
            type === 'success' ? 'bg-green-500 text-white' :
            type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
        }`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-x-full');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    };

    // ✅ Initial data load
    useEffect(() => {
        if (gameRounds?.data?.games) {
            const processed = processGameData(gameRounds.data.games);
            setGames(processed);
            
            // ✅ Check live status immediately after loading
            setTimeout(() => checkGameLiveStatus(), 500);
        }
    }, [gameRounds]);

    // ✅ Setup SSE on component mount
    useEffect(() => {
        setupCustomSSE();

        // ✅ Set up timer to check game status every 10 seconds
        timerIntervalRef.current = setInterval(() => {
            checkGameLiveStatus();
        }, 10000); // Check every 10 seconds

        return () => {
            // Cleanup
            if (eventSourceRef.current) {
                eventSourceRef.current.abort?.();
                eventSourceRef.current = null;
            }
            if (retryTimeoutRef.current) {
                clearTimeout(retryTimeoutRef.current);
                retryTimeoutRef.current = null;
            }
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
            console.log("🧹 Cleaned up SSE and timer");
        };
    }, []);

    // ✅ Sort games
    const allGames = [...games].sort((a, b) => {
        const statusOrder = { live: 0, upcoming: 1, completed: 2, ended: 2, cancelled: 3 };
        return (statusOrder[a.status] || 1) - (statusOrder[b.status] || 1);
    });

    const displayGames = limit ? allGames.slice(0, limit) : allGames;
    const liveGames = allGames.filter(game => game.status === 'live');

    // Navigate to game
    const handleGameClick = (game) => {
        const state = {
            gameId: game.id,
            gameName: game.gameName,
            gameDate: game.gameDate,
            roundTime: game.roundTime
        };

        sessionStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));

        if (game.status === 'live' || game.status === 'completed' || game.status === 'ended') {
            navigate(ROUTES.AFTERGAME, { state });
        } else {
            navigate(ROUTES.GAME, { state });
        }
    };

    // Loading State
    if (loading) {
        return (
            <section className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-3 sm:px-4">
                <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
                    <div className="text-center mb-4 sm:mb-5 md:mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#004296]">
                            Loading Schedule...
                        </h2>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="animate-pulse space-y-4">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex items-center justify-between">
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-8 bg-gray-200 rounded-full w-20"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Error State
    if (error) {
        return (
            <section className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-3 sm:px-4">
                <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-center">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <span className="text-4xl mb-2 block">⚠️</span>
                        <h3 className="text-red-800 font-semibold text-lg">Failed to load schedule</h3>
                        <p className="text-red-600 text-sm mt-2">{error}</p>
                        <button
                            onClick={refreshGameRounds}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 transition"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-3 sm:px-4">
            <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">

                {/* Heading with SSE Status */}
                <div className="text-center mb-4 sm:mb-5 md:mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#004296] inline-block relative">
                        {showViewAll ? ' Live Draw Schedule' : 'Live Draw Schedule'}
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FBEFA4] rounded-full w-12 h-0.5 sm:w-14 sm:h-1 md:w-16"></span>
                    </h2>
                    {/* ✅ SSE Connection Status */}
                    <div className="flex items-center justify-center gap-2 mt-2">
                        <span className={`inline-block w-2 h-2 rounded-full ${sseConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-xs text-gray-500">
                            {sseConnected ? '🟢 Live Updates' : '🔴 Offline'}
                        </span>
                        {liveGames.length > 0 && (
                            <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                                {liveGames.length} LIVE
                            </span>
                        )}
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden border border-gray-100 mb-4 sm:mb-5">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#004296] to-[#003380] px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4">
                        <h3 className="text-[#FBEFA4] font-bold text-xs sm:text-sm md:text-base tracking-wide flex items-center justify-center gap-1 sm:gap-2">
                            <span className="hidden xs:inline">🎲</span>
                            LIVE DRAW SCHEDULE
                            <span className="hidden xs:inline">🎲</span>
                        </h3>
                    </div>

                    {/* Column Headers - Desktop */}
                    <div className="hidden md:grid grid-cols-4 gap-3 lg:gap-4 bg-gray-50 px-4 sm:px-5 md:px-6 py-2 sm:py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-semibold text-xs sm:text-sm">Game Name</span>
                        <span className="text-gray-600 font-semibold text-xs sm:text-sm text-center">Draw Time</span>
                        <span className="text-gray-600 font-semibold text-xs sm:text-sm text-center">Schedule</span>
                        <span className="text-gray-600 font-semibold text-xs sm:text-sm text-right">Status</span>
                    </div>

                    {/* Game Items */}
                    <div className="divide-y divide-gray-100">
                        {displayGames.length > 0 ? displayGames.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => handleGameClick(item)}
                                className={`cursor-pointer p-3 sm:p-4 md:p-0 hover:bg-gray-50 transition-all ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                } ${item.status === 'live' ? 'bg-green-50/50 hover:bg-green-50 border-l-4 border-l-green-500' : ''}`}
                            >
                                {/* Mobile View */}
                                <div className="md:hidden space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                            {item.status === "live" && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </span>
                                            )}
                                            <span className="font-bold text-gray-800 text-xs sm:text-sm">
                                                {item.gameName}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                item.status === 'live' 
                                                    ? 'bg-green-500 text-white animate-pulse'
                                                    : item.status === 'completed' || item.status === 'ended'
                                                    ? 'bg-gray-400 text-white'
                                                    : item.status === 'cancelled'
                                                    ? 'bg-red-400 text-white'
                                                    : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {item.status === 'live' ? 'LIVE' : 
                                                 item.status === 'completed' || item.status === 'ended' ? 'ENDED' : 
                                                 item.status === 'cancelled' ? 'CANCELLED' : 
                                                 'UPCOMING'}
                                            </span>
                                            <span className="bg-[#FBEFA4] text-[#004296] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm">
                                                {item.drawTime}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-[10px] sm:text-xs flex items-center gap-1">
                                        <span>📅</span>
                                        <span>{item.days}</span>
                                    </p>
                                </div>

                                {/* Desktop View */}
                                <div className="hidden md:grid grid-cols-4 gap-3 lg:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4">
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        {item.status === "live" && (
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                        )}
                                        <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">
                                            {item.gameName}
                                        </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <span className="bg-[#FBEFA4] text-[#004296] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm">
                                            {item.drawTime}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="text-gray-500 text-xs sm:text-sm">
                                            {item.days}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            item.status === 'live' 
                                                ? 'bg-green-500 text-white animate-pulse'
                                                : item.status === 'completed' || item.status === 'ended'
                                                ? 'bg-gray-400 text-white'
                                                : item.status === 'cancelled'
                                                ? 'bg-red-400 text-white'
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {item.status === 'live' ? '🔴 LIVE' : 
                                             item.status === 'completed' || item.status === 'ended' ? '✓ ENDED' : 
                                             item.status === 'cancelled' ? '✗ CANCELLED' : 
                                             '⏰ UPCOMING'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="p-6 text-center text-gray-500">
                                No upcoming games scheduled
                            </div>
                        )}
                    </div>
                </div>

                {/* View All Button */}
                {showViewAll && limit && allGames.length > limit && (
                    <div className="text-center pt-2 sm:pt-3 mb-6">
                        <button
                            onClick={() => navigate(ROUTES.ALL_LIVE_RESULTS)}
                            className="bg-gradient-to-r from-[#004296] to-[#003380] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#FBEFA4]/30 inline-flex items-center gap-1.5 sm:gap-2"
                        >
                            <span>📋</span>
                            View All Games ({allGames.length})
                            <span>→</span>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LiveResultTable;