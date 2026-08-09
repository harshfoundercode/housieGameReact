let serverErrorHandler = null;
let isLoggingOut = false;

export const setServerErrorHandler = (handler) => {
  serverErrorHandler = handler;
};

// Export function to set logging out state
export const setLoggingOut = (value) => {
  isLoggingOut = value;
};

// Store original fetch
const originalFetch = window.fetch;

// Override global fetch
window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    
    // If logging out, don't process any error responses
    if (isLoggingOut) {
      console.log("ℹ️ Logout in progress, ignoring error responses");
      return response;
    }
    
    // Check for 503 Service Unavailable
    if (response.status === 503) {
      console.error("🔴 Service Unavailable (503) detected!");
      
      if (serverErrorHandler && !isLoggingOut) {
        serverErrorHandler.showServerError(
          "Service is temporarily unavailable. Please try again in a few moments.",
          () => {
            return originalFetch(...args);
          }
        );
      }
      
      return new Response(JSON.stringify({
        success: false,
        status: 503,
        message: "Service Unavailable"
      }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Handle 401 Unauthorized without global server error popup
    if (response.status === 401) {
      console.error("🔴 Unauthorized (401) detected!");
      
      // Clear auth data if token exists
      const token = localStorage.getItem("token");
      if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();
      }
      
      return response;
    }

    // Handle 403 Forbidden without global server error popup
    if (response.status === 403) {
      console.error("🔴 Forbidden (403) detected!");
      return response;
    }

    // Handle 500 Internal Server Error without global server error popup
    if (response.status === 500) {
      console.error("🔴 Internal Server Error (500) detected!");
      return response;
    }

    return response;
    
  } catch (error) {
    console.error("🔴 Network Error:", error);
    
    // Don't show errors during logout
    if (isLoggingOut) {
      console.log("ℹ️ Logout in progress, ignoring network error");
      throw error;
    }
    
    // Network error
    if (error.message === "Failed to fetch" || error.name === "TypeError") {
      if (serverErrorHandler) {
        serverErrorHandler.showServerError(
          "Unable to connect to server. Please check your internet connection.",
          () => {
            return originalFetch(...args);
          }
        );
      }
    }
    
    throw error;
  }
};

console.log("✅ Global API Interceptor initialized");