import React from 'react';

const AgentModal = ({ 
  showAgentModal, 
  setShowAgentModal, 
  selectedPaymentMethod, 
  agents, 
  loadingAgents, 
  selectedAgent, 
  setSelectedAgent, 
  selectedAgentData, 
  searchAgent, 
  setSearchAgent, 
  fetchAndSelectAgent, 
  handleContactAgent, 
  handleCallAgent,
  cart,
  getCartTotal,
  setSelectedAgentData  // ✅ Added this prop
}) => {
  if (!showAgentModal) return null;

  const filteredAgents = agents.filter(agent => {
    const searchLower = searchAgent.toLowerCase();
    return agent.name.toLowerCase().includes(searchLower);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
      <div className="agent-modal bg-linear-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-5xl max-h-[90vh] overflow-hidden border-2 border-[#FBEFA4]/50 shadow-2xl">
        {/* Modal Header */}
        <div className="sticky top-0 bg-linear-to-r from-[#004296] to-[#003380] p-4 sm:p-6 border-b-2 border-[#FBEFA4]/50 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4] flex items-center gap-2 sm:gap-3">
                <span>📞</span> Our Agents
              </h2>
              <p className="text-white/80 text-xs sm:text-sm mt-1">
                {selectedPaymentMethod === 'agent' 
                  ? 'Select an agent to complete your ticket purchase' 
                  : 'Connect with our agents for quick assistance'}
              </p>
            </div>
            <button
              onClick={() => {
                setShowAgentModal(false);
                setSelectedAgent(null);
                setSelectedAgentData(null);  // ✅ Using setSelectedAgentData
                setSearchAgent("");
              }}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
            >
              <span className="text-lg sm:text-2xl">✕</span>
            </button>
          </div>

          {/* Agent Search */}
          <div className="mt-3 sm:mt-4 relative">
            <input
              type="text"
              placeholder="🔍 Search by agent name..."
              value={searchAgent}
              onChange={(e) => setSearchAgent(e.target.value)}
              className="w-full px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base rounded-xl bg-white/10 border border-[#FBEFA4]/30 text-white placeholder-white/50 outline-none focus:border-[#FBEFA4]"
            />
            {searchAgent && (
              <button
                onClick={() => setSearchAgent("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-3 sm:mt-4">
            <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 text-center">
              <p className="text-[0.625rem] sm:text-xs text-white/60">Total Agents</p>
              <p className="text-base sm:text-xl font-bold text-[#FBEFA4]">{agents.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 text-center">
              <p className="text-[0.625rem] sm:text-xs text-white/60">Available Now</p>
              <p className="text-base sm:text-xl font-bold text-green-400">{agents.length}</p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto max-h-[calc(85vh-200px)] p-3 sm:p-4 md:p-6">
          {loadingAgents ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FBEFA4] mx-auto"></div>
              <p className="text-white/60 mt-3">Loading agents...</p>
            </div>
          ) : !selectedAgent ? (
            <div className="grid gap-3 sm:gap-4">
              {filteredAgents.length > 0 ? (
                filteredAgents.map((agent) => (
                  <div
                    key={agent.agent_id}
                    className="agent-card bg-linear-to-br from-white/10 to-white/5 rounded-xl p-3 sm:p-4 md:p-5 border-2 border-[#FBEFA4]/30"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 bg-linear-to-br from-[#004296] to-[#003380] rounded-full flex items-center justify-center text-2xl sm:text-3xl border-2 border-[#FBEFA4]/50">
                          👨‍💼
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white bg-green-500"></div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{agent.name}</h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
                          <span className="text-[0.625rem] sm:text-xs bg-white/10 px-2 py-1 rounded-full text-white/60">
                            📞 {agent.phone}
                          </span>
                          <span className="text-[0.625rem] sm:text-xs bg-green-500/20 px-2 py-1 rounded-full text-green-300">
                            💬 WhatsApp
                          </span>
                        </div>
                      </div>

                      <div className="agent-actions flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                        <button
                          onClick={() => handleContactAgent(agent)}
                          className="flex-1 px-3 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 bg-linear-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                        >
                          <span>💬</span> WhatsApp
                        </button>
                        <button
                          onClick={() => fetchAndSelectAgent(agent)}
                          className="flex-1 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 text-white"
                        >
                          <span>👁️</span> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-lg sm:text-2xl text-white/50 mb-2">😕 No agents found</p>
                  <p className="text-white/40 text-sm sm:text-base">Try adjusting your search</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <button
                onClick={() => {
                  setSelectedAgent(null);
                  setSelectedAgentData(null);  // ✅ Using setSelectedAgentData
                }}
                className="text-[#FBEFA4] hover:text-white flex items-center gap-2 text-sm sm:text-base"
              >
                ← Back to all agents
              </button>

              <div className="bg-linear-to-br from-white/10 to-white/5 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-br from-[#004296] to-[#003380] rounded-full flex items-center justify-center text-4xl sm:text-5xl border-3 border-[#FBEFA4]">
                      👨‍💼
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-3 border-white bg-green-500"></div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{selectedAgent.name}</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                      <div>
                        <p className="text-white/50 text-xs sm:text-sm">Phone Number</p>
                        <p className="text-white text-base sm:text-lg">{selectedAgent.phone}</p>
                      </div>
                      {selectedAgentData && (
                        <>
                          <div>
                            <p className="text-white/50 text-xs sm:text-sm">Total Bookings</p>
                            <p className="text-white text-base sm:text-lg">{selectedAgentData.total_bookings || 0}</p>
                          </div>
                          <div>
                            <p className="text-white/50 text-xs sm:text-sm">Total Sales</p>
                            <p className="text-white text-base sm:text-lg">₹{selectedAgentData.total_sales || "0"}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <button
                    onClick={() => handleCallAgent(selectedAgent)}
                    className="p-3 sm:p-4 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 text-white"
                  >
                    <span className="text-xl sm:text-2xl">📞</span> Call Now
                  </button>
                  <button
                    onClick={() => handleContactAgent(selectedAgent)}
                    className="p-3 sm:p-4 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 text-white"
                  >
                    <span className="text-xl sm:text-2xl">💬</span> WhatsApp
                  </button>
                </div>

                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <p className="text-xs sm:text-sm text-blue-200">
                    <span className="font-bold">💡 Tip:</span> WhatsApp is the fastest way to get a response.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-linear-to-r from-[#004296] to-[#003380] p-3 sm:p-4 border-t border-[#FBEFA4]/30">
          <p className="text-center text-white/50 text-xs sm:text-sm">
            All agents are verified. Your privacy is protected.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgentModal;