import { API } from './api_url';

// Get all agents
export const getAgents = async () => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.GET_AGENTS_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    const result = await response.json();
    console.log("Agents API Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch agents');
    }

    return result;
  } catch (error) {
    console.error("getAgents Error:", error);
    throw error;
  }
};

// Get agent details by ID
export const getAgentDetails = async (agentId) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API.GET_AGENT_DETAILS_URL}${agentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
      },
    });

    const result = await response.json();
    console.log("Agent Details API Response:", result);

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch agent details');
    }

    return result;
  } catch (error) {
    console.error("getAgentDetails Error:", error);
    throw error;
  }
};