// src/services/api_interceptor.js

let serverErrorHandler = null;

export const setServerErrorHandler = (handler) => {
  serverErrorHandler = handler;
};

// Store original fetch
const originalFetch = window.fetch;

// Override global fetch
window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    
    // Check for 500 Internal Server Error
    if (response.status === 500) {
      console.error("🔴 Server Error (500) detected!");
      
      // Don't throw, just notify the handler
      if (serverErrorHandler) {
        serverErrorHandler.showServerError(
          "Internal Server Error. Please wait and try again.",
          () => {
            // Retry the original request
            return originalFetch(...args);
          }
        );
      }
      
      // Return a special response instead of throwing
      return new Response(JSON.stringify({
        success: false,
        status: 500,
        message: "Internal Server Error"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check for 401 Unauthorized
    if (response.status === 401) {
      console.error("🔴 Unauthorized (401) detected!");
      
      if (serverErrorHandler) {
        serverErrorHandler.showServerError(
          "Your session has expired. Please login again.",
          null
        );
      }
      
      // Clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();
      
      return new Response(JSON.stringify({
        success: false,
        status: 401,
        message: "Unauthorized"
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return response;
    
  } catch (error) {
    console.error("🔴 Network Error:", error);
    
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