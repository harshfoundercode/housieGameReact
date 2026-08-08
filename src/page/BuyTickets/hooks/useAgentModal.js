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
  console.log("Selecting agent:", agent);
  console.log("Agent ID:", agent?.agent_id);
  setSelectedAgent(agent);
  setSelectedAgentData(null);
}, []);

// ✅ NEW: Fetch and select agent with details
  const fetchAndSelectAgent = useCallback(async (agent) => {
    try {
      // Set the selected agent
      setSelectedAgent(agent);
      
      // You can fetch additional data from an API here
      // For now, using mock data or existing agent data
      const agentData = {
        total_bookings: agent.total_bookings || Math.floor(Math.random() * 50) + 10,
        total_sales: agent.total_sales || (Math.floor(Math.random() * 50000) + 10000).toString(),
        phone: agent.phone,
        name: agent.name,
        email: agent.email || 'agent@example.com',
        whatsapp_number: agent.whatsapp_number || agent.phone
      };
      
      // Set the agent data
      setSelectedAgentData(agentData);
      
      console.log("Agent data loaded:", agentData);
    } catch (error) {
      console.error("Error fetching agent data:", error);
      // Set fallback data
      setSelectedAgentData({
        total_bookings: 0,
        total_sales: "0",
        phone: agent.phone,
        name: agent.name,
        whatsapp_number: agent.phone
      });
    }
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

 // In handleContactViaWhatsApp - Use agent_id if available
// const handleContactViaWhatsApp = useCallback((agent, cartItems = [], cartTotal = 0) => {
//   setIsContacting(true);
  
//   const itemsList = cartItems.length > 0 
//     ? cartItems.map(item => `Ticket #${item.ticketNumber || item.id} - ₹${item.price || 100}`).join('\n')
//     : 'No specific tickets';
  
//   // Use whatsapp_number from agent data
//   const phoneNumber = agent?.whatsapp_number || agent?.phone;
  
//   const message = encodeURIComponent(
//     `Hello ${agent.name},\n\nI want to purchase the following tickets:\n\n${itemsList}\n\nTotal Amount: ₹${cartTotal}\n\nPlease help me complete the booking.\n\nThank you!`
//   );
  
//   if (phoneNumber) {
//     window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
//   } else {
//     alert("Agent phone number not available");
//   }
  
//   setTimeout(() => {
//     setIsContacting(false);
//     closeAgentModal();
//     alert("🎉 Booking request sent! The agent will contact you shortly to complete the payment and booking.");
//   }, 1000);
// }, [closeAgentModal]);



  const handleContactViaWhatsApp = useCallback((agent, cartItems = [], cartTotal = 0) => {
  setIsContacting(true);
  
  const itemsList = cartItems.length > 0 
    ? cartItems.map(item => `Ticket #${item.ticketNumber || item.id} - ₹${item.price || 100}`).join('\n')
    : 'No specific tickets';
  
  // Get phone number from agent
  let phoneNumber = agent?.whatsapp_number || agent?.phone || '';
  
  // Remove any non-numeric characters
  phoneNumber = phoneNumber.replace(/\D/g, '');
  
  // Check if number already has country code
  // India country code is 91
  const hasCountryCode = phoneNumber.startsWith('91') || phoneNumber.startsWith('+91');
  
  if (!hasCountryCode && phoneNumber.length === 10) {
    // Add India country code (91) for 10-digit numbers
    phoneNumber = `91${phoneNumber}`;
  } else if (!hasCountryCode && phoneNumber.length > 10) {
    // If it's longer than 10 digits but doesn't have 91, maybe it already has country code
    // We'll just use it as is
  } else if (!hasCountryCode && phoneNumber.length < 10) {
    // Invalid phone number
    alert("Invalid phone number format");
    setIsContacting(false);
    return;
  }
  
  // Remove '+' if present for WhatsApp URL
  phoneNumber = phoneNumber.replace(/^\+/, '');
  
  const message = encodeURIComponent(
    `Hello ${agent.name},\n\nI want to purchase the following tickets:\n\n${itemsList}\n\nTotal Amount: ₹${cartTotal}\n\nPlease help me complete the booking.\n\nThank you!`
  );
  
  if (phoneNumber && phoneNumber.length >= 10) {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  } else {
    alert("Agent phone number not available or invalid");
    setIsContacting(false);
  }
  
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
    fetchAndSelectAgent,
    clearSelectedAgent,
    updateSearchAgent,
    clearSearch,
    handleContactViaWhatsApp,
    handleCallAgent
  };
};