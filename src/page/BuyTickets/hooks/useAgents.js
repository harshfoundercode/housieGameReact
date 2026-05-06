import { useState, useEffect, useCallback } from 'react';
import { getAgents, getAgentDetails } from "../../../services/agent_services";

export const useAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [selectedAgentData, setSelectedAgentData] = useState(null);

  const fetchAgents = useCallback(async () => {
    setLoadingAgents(true);
    try {
      const response = await getAgents();
      console.log("Fetched agents:", response);
      
      if (response.success && response.data) {
        setAgents(response.data);
      } else {
        throw new Error(response.message || "Failed to load agents");
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      setAgents([]);
    } finally {
      setLoadingAgents(false);
    }
  }, []);

  const fetchAndSelectAgent = async (agent) => {
    try {
      const response = await getAgentDetails(agent.agent_id);
      console.log("Agent details:", response);
      
      if (response.success && response.data) {
        setSelectedAgentData(response.data);
      }
    } catch (error) {
      console.error("Error fetching agent details:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  return {
    agents,
    loadingAgents,
    selectedAgentData,
    fetchAndSelectAgent
  };
};