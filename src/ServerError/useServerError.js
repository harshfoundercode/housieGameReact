import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useServerError = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState({
    isOpen: false,
    message: "",
    retryCallback: null
  });
  
  const originalRequestRef = useRef(null);

  // Show server error popup
  const showServerError = useCallback((message = "", retryFn = null) => {
    setServerError({
      isOpen: true,
      message: message || "Something went wrong on our end. Please try again.",
      retryCallback: retryFn
    });
  }, []);

  // Close popup and redirect to login
  const handleCloseToLogin = useCallback(() => {
    setServerError(prev => ({ ...prev, isOpen: false }));
    
    // Clear all auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    
    // Small delay then redirect
    setTimeout(() => {
      navigate("/login");
      // Fallback
      window.location.href = "/login";
    }, 300);
  }, [navigate]);

  // Retry the failed request
  const handleRetry = useCallback(async () => {
    setServerError(prev => ({ ...prev, isOpen: false }));
    
    // Small delay before retry
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (serverError.retryCallback) {
      serverError.retryCallback();
    } else {
      // Default: reload the page
      window.location.reload();
    }
  }, [serverError.retryCallback]);

  // API wrapper with error handling
  const apiCallWithErrorHandling = useCallback(async (apiFunction, ...args) => {
    try {
      const response = await apiFunction(...args);
      
      // Check for server error
      if (response && response.status === 500) {
        showServerError(
          "Server is experiencing issues. Please wait and try again.",
          () => apiCallWithErrorHandling(apiFunction, ...args)
        );
        return null;
      }
      
      return response;
      
    } catch (error) {
      console.error("API Error:", error);
      
      // Check for 500 error
      if (error.message?.includes("500") || error.message?.includes("Server Error")) {
        showServerError(
          "Server is not responding. Please try again later.",
          () => apiCallWithErrorHandling(apiFunction, ...args)
        );
        return null;
      }
      
      // Check for network error
      if (error.message === "Failed to fetch" || error.name === "TypeError") {
        showServerError(
          "Unable to connect to server. Please check your internet connection.",
          () => apiCallWithErrorHandling(apiFunction, ...args)
        );
        return null;
      }
      
      throw error;
    }
  }, [showServerError]);

  return {
    serverError,
    showServerError,
    handleCloseToLogin,
    handleRetry,
    apiCallWithErrorHandling
  };
};