import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { useGameRounds } from "../../hooks/live_result_hooks";

const LiveResultTable = ({ limit = 4, showViewAll = true }) => {
    const navigate = useNavigate();
    const { gameRounds, loading, error, refreshGameRounds } = useGameRounds();

    // Helper function to parse ISO datetime string
    const parseDateTime = (startDateTime) => {
        if (!startDateTime) return { gameDate: null, roundTime: null };
        
        try {
            const date = new Date(startDateTime);
            
            // Format date as YYYY-MM-DD
            const gameDate = date.toISOString().split('T')[0];
            
            // Format time as HH:MM:SS
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const roundTime = `${hours}:${minutes}:${seconds}`;
            
            return { gameDate, roundTime };
        } catch (error) {
            console.error("Error parsing datetime:", error);
            return { gameDate: null, roundTime: null };
        }
    };

    // Helper function to format time
    const formatDrawTime = (roundTime, gameDate) => {
        if (roundTime) {
            const [hours, minutes] = roundTime.split(':');
            const date = new Date();
            date.setHours(parseInt(hours), parseInt(minutes), 0);
            return date.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
        return "Upcoming";
    };

    // Helper function to format days
    const formatDays = (startDateTime) => {
        if (!startDateTime) return "Upcoming";
        
        try {
            const date = new Date(startDateTime);
            const now = new Date();
            
            // Reset time for accurate day comparison
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const gameDateObj = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            const diffTime = gameDateObj - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) return "Today";
            if (diffDays === 1) return "Tomorrow";
            if (diffDays > 1) return `In ${diffDays} days`;
            if (diffDays === -1) return "Yesterday";
            if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;

            return date.toLocaleDateString('en-IN', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            console.error("Error formatting days:", error);
            return "Upcoming";
        }
    };

    // Helper function to check if game is live
    const isGameLive = (startDateTime) => {
        if (!startDateTime) return false;

        try {
            const gameDateTime = new Date(startDateTime);
            const now = new Date();
            const diffMinutes = (now - gameDateTime) / (1000 * 60);

            // Game is live if within 30 minutes of scheduled time
            return diffMinutes >= -5 && diffMinutes <= 30;
        } catch (error) {
            return false;
        }
    };

    // Process API data
    const processGameData = (games) => {
        if (!games || !Array.isArray(games)) return [];

        return games.map((game) => {
            // Parse the ISO datetime
            const { gameDate, roundTime } = parseDateTime(game.start_datetime);
            const isLive = isGameLive(game.start_datetime);
            const drawTime = formatDrawTime(roundTime, gameDate);
            const days = formatDays(game.start_datetime);

            return {
                id: game.game_id,
                gameName: game.title || game.name || "Game",
                drawTime: drawTime,
                days: days,
                status: isLive ? 'live' : 'upcoming',
                roundTime: roundTime,
                gameDate: gameDate,
                startDateTime: game.start_datetime,
                ticketPrice: game.ticket_price
            };
        });
    };

    // Get games from API response
    const allGames = processGameData(gameRounds?.data?.games || []);
    
    // Limit the number of games shown (for main page)
    const displayGames = limit ? allGames.slice(0, limit) : allGames;

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

                {/* Heading */}
                <div className="text-center mb-4 sm:mb-5 md:mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#004296] inline-block relative">
                        {showViewAll ? 'Upcoming Live Draws' : 'Live Draw Schedule'}
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FBEFA4] rounded-full w-12 h-0.5 sm:w-14 sm:h-1 md:w-16"></span>
                    </h2>
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
                    <div className="hidden md:grid grid-cols-3 gap-3 lg:gap-4 bg-gray-50 px-4 sm:px-5 md:px-6 py-2 sm:py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-semibold text-xs sm:text-sm">Game Name</span>
                        <span className="text-gray-600 font-semibold text-xs sm:text-sm text-center">Draw Time</span>
                        <span className="text-gray-600 font-semibold text-xs sm:text-sm text-right">Schedule</span>
                    </div>

                    {/* Game Items */}
                    <div className="divide-y divide-gray-100">
                        {displayGames.length > 0 ? displayGames.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    navigate(ROUTES.GAME, {
                                        state: {
                                            gameId: item.id,
                                            gameName: item.gameName,
                                            gameDate: item.gameDate,
                                            roundTime: item.roundTime
                                        }
                                    });
                                }}
                                className={`cursor-pointer p-3 sm:p-4 md:p-0 hover:bg-gray-50 transition-all ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                                }`}
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
                                        <span className="bg-[#FBEFA4] text-[#004296] px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-sm">
                                            {item.drawTime}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-[10px] sm:text-xs flex items-center gap-1">
                                        <span>📅</span>
                                        <span>{item.days}</span>
                                    </p>
                                </div>

                                {/* Desktop View */}
                                <div className="hidden md:grid grid-cols-3 gap-3 lg:gap-4 px-4 sm:px-5 md:px-6 py-3 sm:py-4">
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
                                    <div className="flex items-center justify-end gap-1">
                                        <span className="text-gray-500 text-xs sm:text-sm">
                                            {item.days}
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

                {/* View All Button - Only show if there are more games and showViewAll is true */}
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

                {/* View Live Draw Button */}
                {!showViewAll && (
                    <div className="text-center pt-2 sm:pt-3 mb-6">
                        <button
                            onClick={() => navigate(ROUTES.AFTERGAME)}
                            className="bg-gradient-to-r from-[#004296] to-[#003380] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#FBEFA4]/30 inline-flex items-center gap-1.5 sm:gap-2"
                        >
                            <span>🔴</span>
                            View Live Draw
                            <span>→</span>
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};

export default LiveResultTable;