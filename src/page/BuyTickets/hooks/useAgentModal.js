import { useState, useCallback, useMemo } from 'react';

export const useAgentModal = (agents = []) => {
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedAgentData, setSelectedAgentData] = useState(null);
  const [searchAgent, setSearchAgent] = useState("");
  const [isContacting, setIsContacting] = useState(false);

  const filteredAgents = useMemo(() => {
    if (!searchAgent.trim()) return agents;
    
    const searchLower = searchAgent.toLowerCase();
    return agents.filter(agent => 
      agent.name.toLowerCase().includes(searchLower) ||
      agent.phone?.toLowerCase().includes(searchLower)
    );
  }, [agents, searchAgent]);

  const openAgentModal = useCallback((paymentMethod = null) => {
    setShowAgentModal(true);
    setSelectedAgent(null);
    setSelectedAgentData(null);
    setSearchAgent("");
  }, []);

  const closeAgentModal = useCallback(() => {
    setShowAgentModal(false);
    setSelectedAgent(null);
    setSelectedAgentData(null);
    setSearchAgent("");
    setIsContacting(false);
  }, []);

  const selectAgent = useCallback((agent) => {
    setSelectedAgent(agent);
    setSelectedAgentData(null);
  }, []);

  const clearSelectedAgent = useCallback(() => {
    setSelectedAgent(null);
    setSelectedAgentData(null);
  }, []);

  const updateSearchAgent = useCallback((searchTerm) => {
    setSearchAgent(searchTerm);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchAgent("");
  }, []);

  const handleContactViaWhatsApp = useCallback((agent, cartItems = [], cartTotal = 0) => {
    setIsContacting(true);
    
    const itemsList = cartItems.length > 0 
      ? cartItems.map(item => `Ticket #${item.id} - ${item.name}`).join('\n')
      : 'No specific tickets';
    
    const message = encodeURIComponent(
      `Hello ${agent.name},\n\nI want to purchase the following tickets:\n\n${itemsList}\n\nTotal Amount: ₹${cartTotal}\n\nPlease help me complete the booking.\n\nThank you!`
    );
    
    window.open(`https://wa.me/${agent.phone}?text=${message}`, '_blank');
    
    setTimeout(() => {
      setIsContacting(false);
      closeAgentModal();
      alert("🎉 Booking request sent! The agent will contact you shortly to complete the payment and booking.");
    }, 1000);
  }, [closeAgentModal]);

  const handleCallAgent = useCallback((agent) => {
    window.location.href = `tel:${agent.phone}`;
  }, []);

  const getAgentStats = useCallback(() => {
    return {
      total: agents.length,
      available: agents.length,
      searchResults: filteredAgents.length
    };
  }, [agents, filteredAgents]);

  return {
    // State
    showAgentModal,
    setShowAgentModal,
    selectedAgent,
    setSelectedAgent,
    selectedAgentData,
    setSelectedAgentData,
    searchAgent,
    setSearchAgent,
    isContacting,
    
    // Computed
    filteredAgents,
    agentStats: getAgentStats(),
    
    // Actions
    openAgentModal,
    closeAgentModal,
    selectAgent,
    clearSelectedAgent,
    updateSearchAgent,
    clearSearch,
    handleContactViaWhatsApp,
    handleCallAgent
  };
};