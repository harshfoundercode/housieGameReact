import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useState, useEffect, useCallback } from "react";
import { ROUTES } from "./routes/routes";
import ProtectedRoute from "./routes/protected_routes";

// Public pages — eagerly loaded (fast first paint)
import HomeScreenWebsite from "./MainWebsite/homescreen_website";
import Login from "./MainWebsite/AuthComponents/login_screen";
import Register from "./MainWebsite/AuthComponents/register_screen";
import { setServerErrorHandler, setLoggingOut } from "./ServerError/api_interceptor"; // Import this


// Lazy loaded — sirf jab zarurat ho
const Home             = lazy(() => import("./page/Home"));
const GamePage         = lazy(() => import("./page/BuyTickets/main_buy_ticket"));
const AfterGameLive    = lazy(() => import("./page/AfterGameLive/afterGameLive"));
const MyTickets        = lazy(() => import("./MainWebsite/ProfileDrawerComponents/my_tickets"));
const Credits          = lazy(() => import("./MainWebsite/ProfileDrawerComponents/add_money"));
const KYCAddEdit       = lazy(() => import("./MainWebsite/ProfileDrawerComponents/kyc_add_edit"));
const KYCView          = lazy(() => import("./MainWebsite/ProfileDrawerComponents/kyc_view"));
const Settings         = lazy(() => import("./MainWebsite/ProfileDrawerComponents/setting"));
const Language         = lazy(() => import("./MainWebsite/ProfileDrawerComponents/language"));
const AllResults       = lazy(() => import("./MainWebsite/ProfileDrawerComponents/all_results"));
const AllLiveResults   = lazy(() => import("./MainWebsite/HomeComponents/all_limit_results"));
const ReferralGuide    = lazy(() => import("./MainWebsite/HomeComponents/referal_guide"));
const NewsAndMedia     = lazy(() => import("./MainWebsite/ProfileDrawerComponents/media_news"));
const RulesAndTerms    = lazy(() => import("./MainWebsite/FooterComponents/rules_regulation_terms"));
const CancellationRefundPolicy = lazy(() => import("./MainWebsite/FooterComponents/cancellation_refund_policy"));
const PrivacyPolicy    = lazy(() => import("./MainWebsite/FooterComponents/privacy_policy"));
const FAQs             = lazy(() => import("./MainWebsite/FooterComponents/faqs"));

// Global Server Error Popup
const ServerErrorPopup = lazy(() => import("./ServerError/server_error_popup"));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// ========== SERVER ERROR HANDLER (Global) ==========
let globalServerErrorHandler = null;

export const setGlobalServerErrorHandler = (handler) => {
  globalServerErrorHandler = handler;
};

// Override fetch for global error handling
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    
    // Handle 500 Internal Server Error
    if (response.status === 500) {
      console.error("🔴 Server Error (500) detected!");
      
      if (globalServerErrorHandler) {
        globalServerErrorHandler.showServerError(
          "Internal Server Error. The server is not responding. Please wait and try again.",
          () => originalFetch(...args) // Retry callback
        );
      }
      
      // Return error response
      return new Response(JSON.stringify({
        success: false,
        status: 500,
        message: "Internal Server Error"
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Handle 401 Unauthorized
    if (response.status === 401) {
      console.error("🔴 Unauthorized (401) detected!");
      
      // Clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();
      
      if (globalServerErrorHandler) {
        globalServerErrorHandler.showServerError(
          "Your session has expired. Please login again to continue.",
          null // No retry, redirect to login
        );
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
    
    // Handle 403 Forbidden
    if (response.status === 403) {
      console.error("🔴 Forbidden (403) detected!");
      
      if (globalServerErrorHandler) {
        globalServerErrorHandler.showServerError(
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
    
    // Network/Connection error
    if (error.message === "Failed to fetch" || error.name === "TypeError") {
      if (globalServerErrorHandler) {
        globalServerErrorHandler.showServerError(
          "Unable to connect to server. Please check your internet connection and try again.",
          () => originalFetch(...args) // Retry callback
        );
      }
    }
    
    throw error;
  }
};

console.log("✅ Global API Error Interceptor initialized");
// ========== END SERVER ERROR HANDLER ==========

// ========== APP CONTENT WITH ERROR HANDLER ==========
// const AppContent = () => {
//   const [serverError, setServerError] = useState({
//     isOpen: false,
//     message: "",
//     retryCallback: null,
//     showLoginButton: true
//   });

//   // Show server error popup
//   const showServerError = useCallback((message, retryFn = null) => {
//     setServerError({
//       isOpen: true,
//       message: message || "Something went wrong. Please try again.",
//       retryCallback: retryFn,
//       showLoginButton: true
//     });
//   }, []);

//   // Close popup and go to login
//   const handleCloseToLogin = useCallback(() => {
//     setServerError(prev => ({ ...prev, isOpen: false }));
    
//     // Clear all auth data
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     sessionStorage.clear();
    
//     // Redirect to login using hash
//     setTimeout(() => {
//       window.location.hash = "#/login";
//       window.location.reload();
//     }, 300);
//   }, []);

//   // Retry the failed request
//   const handleRetry = useCallback(async () => {
//     setServerError(prev => ({ ...prev, isOpen: false }));
    
//     // Small delay
//     await new Promise(resolve => setTimeout(resolve, 1000));
    
//     if (serverError.retryCallback) {
//       try {
//         await serverError.retryCallback();
//         // Success - reload current page
//         window.location.reload();
//       } catch (error) {
//         // Failed again - show popup
//         setServerError(prev => ({
//           ...prev,
//           isOpen: true,
//           message: "Server is still not responding. Please try again later."
//         }));
//       }
//     } else {
//       // No retry callback - reload page
//       window.location.reload();
//     }
//   }, [serverError.retryCallback]);

//   // Register global error handler
//   useEffect(() => {
//     setGlobalServerErrorHandler({
//       showServerError,
//     });
    
//     console.log("✅ Global server error handler registered");
    
//     return () => {
//       setGlobalServerErrorHandler(null);
//     };
//   }, [showServerError]);

//   return (
//     <>
//       <Suspense fallback={<PageLoader />}>
//         <Routes>
//           {/* ✅ Public routes */}
//           <Route path={ROUTES.HomeScreenWebsite} element={<HomeScreenWebsite />} />
//           <Route path={ROUTES.LOGIN}             element={<Login />} />
//           <Route path={ROUTES.REGISTER}          element={<Register />} />
//           <Route path={ROUTES.RULES}             element={<RulesAndTerms />} />
//           <Route path={ROUTES.CANCELATIONREFUNDPOLICY} element={<CancellationRefundPolicy />} />
//           <Route path={ROUTES.PRIVACYPOLICY}     element={<PrivacyPolicy />} />
//           <Route path={ROUTES.FAQS}              element={<FAQs />} />
//           <Route path={ROUTES.ReferalGuide}      element={<ReferralGuide />} />
//           <Route path={ROUTES.MEDIA}             element={<NewsAndMedia />} />
//           <Route path={ROUTES.ALL_LIVE_RESULTS}  element={<AllLiveResults />} />

//           {/* 🔒 Protected routes */}
//           <Route path={ROUTES.HOME} element={
//             <ProtectedRoute><Home /></ProtectedRoute>
//           }/>
//           <Route path={ROUTES.GAME} element={
//             <ProtectedRoute><GamePage /></ProtectedRoute>
//           }/>
//           <Route path={ROUTES.AFTERGAME} element={
//             <ProtectedRoute><AfterGameLive /></ProtectedRoute>
//           }/>
//           <Route path={ROUTES.MyTickets} element={
//             <ProtectedRoute><MyTickets /></ProtectedRoute>
//           }/>
//           <Route path={ROUTES.Credits} element={
//             <ProtectedRoute><Credits /></ProtectedRoute>
//           }/>
//           <Route path={ROUTES.KYC_ADD} element={
//             <ProtectedRoute><KYCAddEdit isEditMode={false} /></ProtectedRoute>
//           }/>
//           <Route path={ROUTES.KYC_EDIT} element={
//             <ProtectedRoute><KYCAddEdit isEditMode={true} /></ProtectedRoute>
//           }/>
//           <Route path={ROUTES.KYC_VIEW} element={
//             <ProtectedRoute><KYCView /></ProtectedRoute>
//           }/>
//           <Route path={ROUTES.LANG}     element={
//             <ProtectedRoute><Language /></ProtectedRoute>
//           }/>
//           <Route path={ROUTES.SETTINGS} element={
//             <ProtectedRoute><Settings /></ProtectedRoute>
//           }/>
//           <Route path={ROUTES.AllResults} element={
//             <ProtectedRoute><AllResults /></ProtectedRoute>
//           }/>

//           {/* 404 */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Suspense>

//       {/* Global Server Error Popup */}
//       <Suspense fallback={null}>
//         {serverError.isOpen && (
//           <ServerErrorPopup 
//             isOpen={serverError.isOpen}
//             message={serverError.message}
//             onClose={handleCloseToLogin}
//             onRetry={handleRetry}
//           />
//         )}
//       </Suspense>
//     </>
//   );
// };


// ========== APP CONTENT WITH ERROR HANDLER ==========
const AppContent = () => {
  const [serverError, setServerError] = useState({
    isOpen: false,
    message: "",
    retryCallback: null,
    showLoginButton: true
  });

  // Show server error popup
  const showServerError = useCallback((message, retryFn = null) => {
    setServerError({
      isOpen: true,
      message: message || "Something went wrong. Please try again.",
      retryCallback: retryFn,
      showLoginButton: true
    });
  }, []);

  // Close popup and go to login
  const handleCloseToLogin = useCallback(() => {
    setServerError(prev => ({ ...prev, isOpen: false }));
    
    // Clear all auth data
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to login using hash
    setTimeout(() => {
      window.location.hash = ROUTES.LOGIN;
      window.location.reload();
    }, 300);
  }, []);

  // Retry the failed request
  const handleRetry = useCallback(async () => {
    setServerError(prev => ({ ...prev, isOpen: false }));
    
    // Small delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (serverError.retryCallback) {
      try {
        await serverError.retryCallback();
        // Success - reload current page
        window.location.reload();
      } catch (error) {
        // Failed again - show popup
        setServerError(prev => ({
          ...prev,
          isOpen: true,
          message: "Server is still not responding. Please try again later."
        }));
      }
    } else {
      // No retry callback - reload page
      window.location.reload();
    }
  }, [serverError.retryCallback]);

  // Register global error handler
  useEffect(() => {
    setServerErrorHandler({
      showServerError,
    });
    
    // Reset logout flag on mount
    setLoggingOut(false);
    
    console.log("✅ Global server error handler registered");
    
    return () => {
      setServerErrorHandler(null);
      setLoggingOut(false);
    };
  }, [showServerError]);

  return (
    <>
      <Suspense fallback={<PageLoader />}>
         <Routes>
           {/* ✅ Public routes */}
           <Route path={ROUTES.HomeScreenWebsite} element={<HomeScreenWebsite />} />
           <Route path={ROUTES.LOGIN}             element={<Login />} />
           <Route path={ROUTES.REGISTER}          element={<Register />} />
           <Route path={ROUTES.RULES}             element={<RulesAndTerms />} />
           <Route path={ROUTES.CANCELATIONREFUNDPOLICY} element={<CancellationRefundPolicy />} />
           <Route path={ROUTES.PRIVACYPOLICY}     element={<PrivacyPolicy />} />
           <Route path={ROUTES.FAQS}              element={<FAQs />} />
           <Route path={ROUTES.ReferalGuide}      element={<ReferralGuide />} />
           <Route path={ROUTES.MEDIA}             element={<NewsAndMedia />} />
           <Route path={ROUTES.ALL_LIVE_RESULTS}  element={<AllLiveResults />} />

           {/* 🔒 Protected routes */}
          <Route path={ROUTES.HOME} element={
            <ProtectedRoute><Home /></ProtectedRoute>
             }/>
          <Route path={ROUTES.GAME} element={
            <ProtectedRoute><GamePage /></ProtectedRoute>
          }/>
          <Route path={ROUTES.AFTERGAME} element={
            <ProtectedRoute><AfterGameLive /></ProtectedRoute>
          }/>
          <Route path={ROUTES.MyTickets} element={
            <ProtectedRoute><MyTickets /></ProtectedRoute>
          }/>
         <Route path={ROUTES.Credits} element={
            <ProtectedRoute><Credits /></ProtectedRoute>
          }/>
           <Route path={ROUTES.KYC_ADD} element={
            <ProtectedRoute><KYCAddEdit isEditMode={false} /></ProtectedRoute>
          }/>
          <Route path={ROUTES.KYC_EDIT} element={
            <ProtectedRoute><KYCAddEdit isEditMode={true} /></ProtectedRoute>
          }/>
          <Route path={ROUTES.KYC_VIEW} element={
            <ProtectedRoute><KYCView /></ProtectedRoute>
          }/>
          <Route path={ROUTES.LANG}     element={
            <ProtectedRoute><Language /></ProtectedRoute>
          }/>
          <Route path={ROUTES.SETTINGS} element={
            <ProtectedRoute><Settings /></ProtectedRoute>
          }/>
          <Route path={ROUTES.AllResults} element={
            <ProtectedRoute><AllResults /></ProtectedRoute>
          }/>

       {/* 404 */}
           <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
      </Suspense>

      {/* Global Server Error Popup */}
      <Suspense fallback={null}>
        {serverError.isOpen && (
          <ServerErrorPopup 
            isOpen={serverError.isOpen}
            message={serverError.message}
            onClose={handleCloseToLogin}
            onRetry={handleRetry}
          />
        )}
      </Suspense>
    </>
  );
};


// ========== MAIN APP ==========
function App() {
   useEffect(() => {
    // Sirf development mode mein token print karo
    if (process.env.NODE_ENV === 'development') {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      console.log("\n========== DEV MODE: AUTH CHECK ==========");
      console.log("Token:", token || "❌ No token found");
      if (token) {
        console.log("User:", user ? JSON.parse(user) : "No user data");
        // Decode JWT
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log("Token Expiry:", new Date(payload.exp * 1000).toLocaleString());
        } catch (e) { }
      }
      console.log("==========================================\n");

      // Make it globally available
      window.printAuth = () => {
        console.log("Token:", localStorage.getItem("token"));
        console.log("User:", localStorage.getItem("user"));
      };
    }
  }, []);
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;