// // src/services/api_interceptor.js

// let serverErrorHandler = null;

// export const setServerErrorHandler = (handler) => {
//   serverErrorHandler = handler;
// };

// // Store original fetch
// const originalFetch = window.fetch;

// // Override global fetch
// window.fetch = async (...args) => {
//   try {
//     const response = await originalFetch(...args);
    
//     // Check for 500 Internal Server Error
//     if (response.status === 500) {
//       console.error("🔴 Server Error (500) detected!");
      
//       // Don't throw, just notify the handler
//       if (serverErrorHandler) {
//         serverErrorHandler.showServerError(
//           "Internal Server Error. Please wait and try again.",
//           () => {
//             // Retry the original request
//             return originalFetch(...args);
//           }
//         );
//       }
      
//       // Return a special response instead of throwing
//       return new Response(JSON.stringify({
//         success: false,
//         status: 500,
//         message: "Internal Server Error"
//       }), {
//         status: 500,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }
    
//     // Check for 401 Unauthorized
//     if (response.status === 401) {
//       console.error("🔴 Unauthorized (401) detected!");
      
//       if (serverErrorHandler) {
//         serverErrorHandler.showServerError(
//           "Your session has expired. Please login again.",
//           null
//         );
//       }
      
//       // Clear auth data
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       sessionStorage.clear();
      
//       return new Response(JSON.stringify({
//         success: false,
//         status: 401,
//         message: "Unauthorized"
//       }), {
//         status: 401,
//         headers: { 'Content-Type': 'application/json' }
//       });
//     }
    
//     return response;
    
//   } catch (error) {
//     console.error("🔴 Network Error:", error);
    
//     // Network error
//     if (error.message === "Failed to fetch" || error.name === "TypeError") {
//       if (serverErrorHandler) {
//         serverErrorHandler.showServerError(
//           "Unable to connect to server. Please check your internet connection.",
//           () => {
//             return originalFetch(...args);
//           }
//         );
//       }
//     }
    
//     throw error;
//   }
// };

// console.log("✅ Global API Interceptor initialized");
// src/services/api_interceptor.js

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
    
    // Check for 500 Internal Server Error
    if (response.status === 500) {
      console.error("🔴 Server Error (500) detected!");
      
      if (serverErrorHandler) {
        serverErrorHandler.showServerError(
          "Internal Server Error. Please wait and try again.",
          () => {
            return originalFetch(...args);
          }
        );
      }
      
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
      
      // Check if token exists - if not, probably logging out
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("ℹ️ No token found, ignoring 401");
        return response;
      }
      
      // Only show error if we have a handler AND we're not logging out
      if (serverErrorHandler && !isLoggingOut) {
        serverErrorHandler.showServerError(
          "Your session has expired. Please login again.",
          null
        );
        
        // Clear auth data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.clear();
      }
      
      return new Response(JSON.stringify({
        success: false,
        status: 401,
        message: "Unauthorized"
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check for 403 Forbidden
    if (response.status === 403) {
      console.error("🔴 Forbidden (403) detected!");
      
      if (serverErrorHandler && !isLoggingOut) {
        serverErrorHandler.showServerError(
          "Access Denied! You don't have permission to perform this action.",
          null
        );
      }
      
      return new Response(JSON.stringify({
        success: false,
        status: 403,
        message: "Forbidden"
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
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