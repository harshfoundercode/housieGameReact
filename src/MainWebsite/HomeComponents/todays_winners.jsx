// TodaysWinner.jsx - Original UI with only Games + Winners (No History)
import React, { useState, useEffect } from "react";
import WinnerBg from "../../assets/winnerbg.png";
import { getWinnerList, getLiveGames } from "../../services/winner_list";
import { getWinnerBannerApi } from "../../services/winner_banner_services";

const TodaysWinner = () => {
  // Level 1: Games State
  const [gamesList, setGamesList] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Level 2: Winners List
  const [winnersList, setWinnersList] = useState([]);
  const [loadingWinners, setLoadingWinners] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");

  const [view, setView] = useState("games");
  const limit = 10;

  useEffect(() => {
    fetchBannerFromAPI();
    fetchLiveGames(page);
  }, [page]);

  const fetchBannerFromAPI = async () => {
    try {
      const response = await getWinnerBannerApi();
      if (response.data) {
        setBannerImage(response.data.image_url);
      }
    } catch (err) {
      console.error("Error fetching banner:", err);
    }
  };

  const fetchLiveGames = async (pageNum) => {
    try {
      setLoading(true);
      setError(null);
      const today = new Date().toISOString().split('T')[0];
      const response = await getLiveGames(pageNum, limit, today);
      
      if (response && response.success) {
        const games = response.data?.games || [];
        setGamesList(games);
        setTotalPages(response.data?.totalPages || 1);
      } else {
        setError(response?.message || "Failed to load games");
      }
    } catch (err) {
      console.error("Error fetching games:", err);
      setError(err.message || "Failed to load games");
    } finally {
      setLoading(false);
    }
  };

  const fetchWinnersForGame = async (game) => {
    try {
      setLoadingWinners(true);
      setSelectedGame(game);
      const response = await getWinnerList(game.game_id);
      const formattedWinners = response.map(winner => winner.toJSON());
      setWinnersList(formattedWinners);
      setView("winners");
    } catch (err) {
      console.error("Error fetching winners:", err);
      setWinnersList([]);
    } finally {
      setLoadingWinners(false);
    }
  };

  const goBack = () => {
    setView("games");
    setSelectedGame(null);
    setWinnersList([]);
    setUserSearchTerm("");
  };

  const filteredGames = gamesList.filter((g) => {
    const matchesSearch = g.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(g.game_id).includes(searchTerm);
    const matchesStatus = statusFilter === "all" || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredWinners = winnersList.filter((winner) => {
    const userName = winner.userName || "";
    return userName.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      winner.phone?.includes(userSearchTerm);
  });

  const getStatusBadge = (status) => {
    const badges = {
      upcoming: { class: "bg-yellow-100 text-yellow-700", text: "UPCOMING", icon: "⏳" },
      live: { class: "bg-red-100 text-red-700", text: "LIVE", icon: "🔴" },
      completed: { class: "bg-green-100 text-green-700", text: "COMPLETED", icon: "✅" },
    };
    return badges[status] || badges.upcoming;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const maskPhone = (phone) => {
    if (!phone || phone.length < 6) return phone;
    return phone.slice(0, 4) + "****" + phone.slice(-2);
  };

  const getWinIcon = (winType) => {
    const icons = {
      'FULL': '🏆',
      'TOP': '⭐',
      'MIDDLE': '🎯',
      'BOTTOM': '💫',
      'EARLY5': '🌟',
      'QUICK6': '⚡',
      'QUICK7': '🔥'
    };
    return icons[winType] || '🎉';
  };

  const displayImage = bannerImage || WinnerBg;

  if (loading) {
    return (
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004296]"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-600 mt-4">
            Loading Games...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4">
      
      {/* Section Header */}
      <div className="text-center mb-4 sm:mb-5 md:mb-8 lg:mb-10">
        <h2 className="font-bold text-[#004296] inline-block relative text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          {view === "games" && "Today's Games"}
          {view === "winners" && `🏆 Winners - ${selectedGame?.title || ""}`}
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FBEFA4] rounded-full w-10 h-0.5 sm:w-12 sm:h-0.5 md:w-14 md:h-1 lg:w-16"></span>
        </h2>
      </div>

      {/* Back Button */}
      {view === "winners" && (
        <div className="max-w-7xl mx-auto mb-4 px-4">
          <button 
            onClick={goBack}
            className="text-[#004296] font-medium hover:underline text-sm flex items-center gap-1"
          >
            ← Back to Games
          </button>
        </div>
      )}

      {/* Banner */}
      {view === "games" && (
        <div className="mx-auto overflow-hidden w-full md:w-[90%] lg:w-[94%] xl:w-[90%] rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg lg:shadow-xl mb-6 sm:mb-8">
          <img
            src={displayImage}
            alt="Today's Winners"
            className="w-full h-[140px] sm:h-[150px] md:h-[160px] lg:h-[180px] xl:h-[200px] object-cover"
          />
        </div>
      )}

      {/* LEVEL 1: GAMES GRID */}
      {view === "games" && (
        <>
          {/* Search and Filter */}
          <div className="max-w-7xl mx-auto mb-4 px-4">
            <div className="bg-white rounded-xl shadow-sm p-3 flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[180px] flex items-center bg-gray-100 rounded-lg px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#004296] transition-all">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by title or game ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent p-2 outline-none text-sm"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                )}
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-sm text-gray-500 font-medium mr-1">Status:</span>
                {["all", "upcoming", "live", "completed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      statusFilter === s 
                        ? 'bg-[#004296] text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="max-w-7xl mx-auto px-4">
            {filteredGames.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Games Found</h3>
                <p className="text-gray-400">{gamesList.length === 0 ? "No games available today" : "Try adjusting your filters"}</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                  {filteredGames.map((game) => {
                    const statusBadge = getStatusBadge(game.status);
                    return (
                      <div
                        key={game.game_id}
                        onClick={() => fetchWinnersForGame(game)}
                        className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 cursor-pointer border-2 border-transparent hover:border-[#004296] hover:-translate-y-1"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                            #{game.game_id}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusBadge.class}`}>
                            {statusBadge.icon} {statusBadge.text}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 mb-2 truncate">
                          {game.title}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">📅 Date:</span>
                            <span className="text-gray-700 font-medium text-xs">{formatDate(game.start_datetime)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">🎫 Tickets:</span>
                            <span className="text-gray-700 font-medium">{game.total_tickets}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">💰 Price:</span>
                            <span className="text-gray-700 font-medium">₹{game.ticket_price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">🏆 Winners:</span>
                            <span className="text-gray-700 font-medium">{game.total_winners || 0}</span>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-gray-100 text-right">
                          <span className="text-[#004296] font-semibold text-sm">
                            View Winners →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page <= 1}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        page <= 1 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-[#004296] text-white hover:bg-[#003380]'
                      }`}
                    >
                      ← Previous
                    </button>
                    <span className="text-gray-600 text-sm">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page >= totalPages}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        page >= totalPages 
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                          : 'bg-[#004296] text-white hover:bg-[#003380]'
                      }`}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      {/* LEVEL 2: WINNERS LIST */}
      {view === "winners" && (
        <div className="max-w-7xl mx-auto px-4">
          {/* Search Winners */}
          <div className="mb-4">
            <div className="bg-white rounded-xl shadow-sm p-3 flex flex-wrap gap-3 items-center">
              <div className="flex-1 min-w-[200px] flex items-center bg-gray-100 rounded-lg px-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#004296] transition-all">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search winners by name or phone..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent p-2 outline-none text-sm"
                />
                {userSearchTerm && (
                  <button onClick={() => setUserSearchTerm("")} className="text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                )}
              </div>
              <div className="text-sm text-gray-500 font-medium">
                {filteredWinners.length} winners
              </div>
            </div>
          </div>

          {/* Winners Grid */}
          {loadingWinners ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004296]"></div>
              <p className="mt-4 text-gray-500 font-medium">Loading winners...</p>
            </div>
          ) : filteredWinners.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Winners Yet</h3>
              <p className="text-gray-400">No winners for this game yet. Check back later!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {filteredWinners.map((winner, index) => (
                  <div
                    key={winner.winnerId || index}
                    className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 p-4 border-2 border-transparent hover:border-[#004296] hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FBEFA4] to-[#FFE44D] flex items-center justify-center text-[#004296] text-lg font-bold flex-shrink-0">
                        {winner.userName?.[0] || "W"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-800 truncate text-sm">
                          {winner.userName || 'Anonymous Player'}
                        </h4>
                        <p className="text-xs text-gray-500">📱 {maskPhone(winner.phone)}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="bg-[#FBEFA4] text-[#004296] px-2 py-0.5 rounded font-medium">
                        {getWinIcon(winner.winType)} {winner.winType}
                      </span>
                      <span className="text-[#004296] font-bold">₹{winner.amount}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400 truncate">
                      {winner.prizeName?.replace(/_/g, ' ') || 'N/A'}
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-100 text-right">
                      <span className="text-[#004296] text-xs font-medium">
                        Ticket #{winner.ticketNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              {filteredWinners.length > 0 && (
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <div className="bg-white rounded-xl shadow-sm px-6 py-3 border border-gray-100 flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <span className="block text-xl font-bold text-[#004296]">{filteredWinners.length}</span>
                      <span className="text-xs text-gray-500">Total Winners</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm px-6 py-3 border border-gray-100 flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <span className="block text-xl font-bold text-green-600">
                        ₹{filteredWinners.reduce((sum, w) => sum + (w.amount || 0), 0).toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">Total Prize Pool</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default TodaysWinner;