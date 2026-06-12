// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import Navbar from "../HomeComponents/nav_bar";
// // // import Footer from "../HomeComponents/footer";
// // // import { addMoney, transactionHistory } from "../../services/add_money_services";
// // // import { API } from "../../services/api_url";

// // // const Credits = () => {
// // //     const navigate = useNavigate();
// // //     const [activeTab, setActiveTab] = useState("add");
// // //     const [amount, setAmount] = useState("");
// // //     const [selectedPayment, setSelectedPayment] = useState("1");
// // //     const [loading, setLoading] = useState(false);
// // //     const [loadingHistory, setLoadingHistory] = useState(false);
// // //     const [loadingBalance, setLoadingBalance] = useState(false);
// // //     const [userData, setUserData] = useState(null);
// // //     const [transactionHistoryData, setTransactionHistoryData] = useState([]);

// // //     // Fetch user profile from API (includes wallet balance)
// // //     const fetchUserProfileFromAPI = async () => {
// // //         setLoadingBalance(true);
// // //         try {
// // //             const token = localStorage.getItem("token");
// // //             if (!token) {
// // //                 console.log("No token found");
// // //                 return;
// // //             }

// // //             const response = await fetch(`${API.PROFILE_URL}`, {
// // //                 method: "GET",
// // //                 headers: {
// // //                     "Authorization": `Bearer ${token}`,
// // //                     "Content-Type": "application/json",
// // //                 },
// // //             });

// // //             const result = await response.json();
// // //             console.log("Profile API Response:", result);

// // //             if (result.status === 200 && result.success) {
// // //                 const profileData = result.data;
// // //                 setUserData(profileData);
                
// // //                 // Update localStorage
// // //                 localStorage.setItem("user", JSON.stringify(profileData));
                
// // //                 // Update credits in localStorage for navbar
// // //                 if (profileData.total_balance) {
// // //                     localStorage.setItem("credits", profileData.total_balance);
// // //                 }
                
// // //                 // Dispatch event for navbar update
// // //                 window.dispatchEvent(new Event('creditsUpdated'));
// // //                 window.dispatchEvent(new Event('profileUpdated'));
                
// // //                 return profileData;
// // //             } else {
// // //                 throw new Error(result.message || "Failed to fetch profile");
// // //             }
// // //         } catch (error) {
// // //             console.error("Error fetching profile:", error);
// // //             // Fallback to localStorage
// // //             checkCreditStatus();
// // //             return null;
// // //         } finally {
// // //             setLoadingBalance(false);
// // //         }
// // //     };

// // //     // Check login status and get user data from localStorage (initial load)
// // //     const checkCreditStatus = () => {
// // //         const user = localStorage.getItem("user");
// // //         if (user && user !== "undefined") {
// // //             try {
// // //                 const parsedUser = JSON.parse(user);
// // //                 setUserData(parsedUser);
// // //             } catch (e) {
// // //                 console.error("Error parsing user data:", e);
// // //                 setUserData(null);
// // //             }
// // //         } else {
// // //             setUserData(null);
// // //         }
// // //     };

// // //     // Refresh wallet balance - API call karega
// // //     const refreshWalletBalance = async () => {
// // //         await fetchUserProfileFromAPI();
// // //     };

// // //     // Fetch transaction history
// // //     const fetchTransactionHistory = async () => {
// // //         setLoadingHistory(true);
// // //         try {
// // //             const token = localStorage.getItem("token");
// // //             if (!token) {
// // //                 console.log("No token found");
// // //                 setLoadingHistory(false);
// // //                 return;
// // //             }

// // //             const response = await transactionHistory();
// // //             console.log("Transaction History Response:", response);

// // //             if (response.success) {
// // //                 setTransactionHistoryData(response.data || []);
// // //             } else {
// // //                 console.error("Failed to fetch history:", response.message);
// // //                 setTransactionHistoryData([]);
// // //             }
// // //         } catch (error) {
// // //             console.error("Error fetching transaction history:", error);
// // //             setTransactionHistoryData([]);
// // //         } finally {
// // //             setLoadingHistory(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         checkCreditStatus();
// // //         fetchUserProfileFromAPI(); // Initial load ke liye API call
        
// // //         if (activeTab === "history") {
// // //             fetchTransactionHistory();
// // //         }
// // //     }, [activeTab]);

// // //     const paymentMethods = [
// // //         { id: "1", name: "Cashfree", icon: "https://play-lh.googleusercontent.com/9mvLUB1uIU1SBEaGEDw4Mo8VwrwM47N5yxfMB9DhUfqNc3Wlu7hSmNVOyAYRXQ0nfQ=w240-h480-rw" },
// // //     ];

// // //     const quickAmounts = [200, 500, 1000, 2000, 5000];

// // //     const handleAddMoney = async () => {
// // //         const amountNum = parseFloat(amount);

// // //         if (!amount || isNaN(amountNum) || amountNum < 100) {
// // //             alert("Please enter a valid amount (minimum ₹100)");
// // //             return;
// // //         }

// // //         setLoading(true);

// // //         try {
// // //             const token = localStorage.getItem("token");
// // //             if (!token) {
// // //                 alert("Please login to add money");
// // //                 navigate("/login");
// // //                 return;
// // //             }

// // //             const response = await addMoney(amountNum);
// // //             console.log("Add Money Response:", response);

// // //             if (response.success) {
// // //                 alert(`Successfully added ₹${amountNum} to your wallet!`);

// // //                 // Refresh profile data to get updated balance
// // //                 await refreshWalletBalance();

// // //                 // Clear amount
// // //                 setAmount("");

// // //                 // Refresh transaction history if on history tab
// // //                 if (activeTab === "history") {
// // //                     await fetchTransactionHistory();
// // //                 }
// // //             } else {
// // //                 throw new Error(response.message || "Failed to add money");
// // //             }
// // //         } catch (error) {
// // //             console.error("Add Money Error:", error);
// // //             alert(error.message || "Failed to add money. Please try again.");
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     // Get current balance from userData
// // //     const getCurrentBalance = () => {
// // //         if (userData?.total_balance) {
// // //             return parseFloat(userData.total_balance);
// // //         }
// // //         return 0;
// // //     };

// // //     const currentBalance = getCurrentBalance();

// // //     // Format date for display
// // //     const formatDate = (dateString) => {
// // //         if (!dateString) return "";
// // //         const date = new Date(dateString);
// // //         return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
// // //     };

// // //     const formatTime = (dateString) => {
// // //         if (!dateString) return "";
// // //         const date = new Date(dateString);
// // //         return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
// // //     };

// // //     // Get icon for transaction type
// // //     const getTransactionIcon = (type, method) => {
// // //         if (type === "credit") {
// // //             if (method === "referral") return "🤝";
// // //             return "↓";
// // //         }
// // //         return "↑";
// // //     };

// // //     // Get method display name
// // //     const getMethodDisplay = (method) => {
// // //         if (method === "referral") return "Referral";
// // //         return method?.toUpperCase() || "Wallet";
// // //     };

// // //     return (
// // //         <div className="min-h-screen bg-gray-50 flex flex-col">
// // //             <Navbar />

// // //             <main className="grow pt-24 md:pt-28 pb-12 px-4">
// // //                 <div className="max-w-7xl mx-auto">

// // //                     {/* Page Title */}
// // //                     <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
// // //                         <div>
// // //                             <h1 className="text-3xl md:text-4xl font-bold text-[#004296]">Add Credits</h1>
// // //                             <p className="text-gray-500 text-sm md:text-base mt-1">Securely add funds to your Tambola wallet</p>
// // //                         </div>
// // //                     </div>

// // //                     {/* Available Balance Card - Showing all balances from profile API */}
// // //                     <div className="bg-linear-to-r from-[#004296] to-[#003380] rounded-2xl p-5 mb-8 text-white shadow-md">
// // //                         <div className="flex items-center justify-between">
// // //                             <div>
// // //                                 <p className="text-white/70 text-sm font-medium">Total Balance</p>
// // //                                 <p className="text-4xl font-bold mt-1">
// // //                                     {loadingBalance ? (
// // //                                         <span className="inline-block animate-pulse">---</span>
// // //                                     ) : (
// // //                                         `₹${currentBalance.toLocaleString('en-IN', {
// // //                                             minimumFractionDigits: 2,
// // //                                             maximumFractionDigits: 2
// // //                                         })}`
// // //                                     )}
// // //                                 </p>
// // //                             </div>
// // //                             <button
// // //                                 onClick={refreshWalletBalance}
// // //                                 disabled={loadingBalance}
// // //                                 className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-50"
// // //                                 title="Refresh Balance"
// // //                             >
// // //                                 <svg 
// // //                                     className={`w-5 h-5 ${loadingBalance ? 'animate-spin' : ''}`} 
// // //                                     fill="none" 
// // //                                     stroke="currentColor" 
// // //                                     viewBox="0 0 24 24"
// // //                                 >
// // //                                     <path 
// // //                                         strokeLinecap="round" 
// // //                                         strokeLinejoin="round" 
// // //                                         strokeWidth={2} 
// // //                                         d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
// // //                                     />
// // //                                 </svg>
// // //                             </button>
// // //                         </div>

// // //                         {/* Balance Breakdown - if these fields exist in your profile API */}
// // //                         {(userData?.main_balance !== undefined ||
// // //                             userData?.winning_balance !== undefined ||
// // //                             userData?.bonus_balance !== undefined) && (
// // //                                 <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-white/20">
// // //                                     {userData?.main_balance !== undefined && (
// // //                                         <div>
// // //                                             <p className="text-white/50 text-[10px]">Main</p>
// // //                                             <p className="text-white text-sm font-semibold">
// // //                                                 ₹{parseFloat(userData.main_balance || 0).toLocaleString('en-IN', {
// // //                                                     minimumFractionDigits: 2,
// // //                                                     maximumFractionDigits: 2
// // //                                                 })}
// // //                                             </p>
// // //                                         </div>
// // //                                     )}
// // //                                     {userData?.winning_balance !== undefined && (
// // //                                         <div>
// // //                                             <p className="text-white/50 text-[10px]">Winning</p>
// // //                                             <p className="text-white text-sm font-semibold">
// // //                                                 ₹{parseFloat(userData.winning_balance || 0).toLocaleString('en-IN', {
// // //                                                     minimumFractionDigits: 2,
// // //                                                     maximumFractionDigits: 2
// // //                                                 })}
// // //                                             </p>
// // //                                         </div>
// // //                                     )}
// // //                                     {userData?.bonus_balance !== undefined && (
// // //                                         <div>
// // //                                             <p className="text-white/50 text-[10px]">Bonus</p>
// // //                                             <p className="text-white text-sm font-semibold">
// // //                                                 ₹{parseFloat(userData.bonus_balance || 0).toLocaleString('en-IN', {
// // //                                                     minimumFractionDigits: 2,
// // //                                                     maximumFractionDigits: 2
// // //                                                 })}
// // //                                             </p>
// // //                                         </div>
// // //                                     )}
// // //                                 </div>
// // //                             )}
// // //                     </div>

// // //                     {/* Tab Bar */}
// // //                     <div className="flex border-b border-gray-200 mb-6">
// // //                         <button
// // //                             onClick={() => setActiveTab("add")}
// // //                             className={`pb-3 px-4 text-sm md:text-base font-medium transition-all ${activeTab === "add"
// // //                                     ? "text-[#004296] border-b-2 border-[#004296]"
// // //                                     : "text-gray-500 hover:text-gray-700"
// // //                                 }`}
// // //                         >
// // //                             Add Credits
// // //                         </button>
// // //                         <button
// // //                             onClick={() => setActiveTab("history")}
// // //                             className={`pb-3 px-4 text-sm md:text-base font-medium transition-all ${activeTab === "history"
// // //                                     ? "text-[#004296] border-b-2 border-[#004296]"
// // //                                     : "text-gray-500 hover:text-gray-700"
// // //                                 }`}
// // //                         >
// // //                             Transaction History
// // //                         </button>
// // //                     </div>

// // //                     {/* ========== ADD CREDITS SCREEN ========== */}
// // //                     {activeTab === "add" && (
// // //                         <div className="space-y-6">
// // //                             {/* Two Column Layout */}
// // //                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
// // //                                 {/* LEFT COLUMN - Amount Input Card */}
// // //                                 <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
// // //                                     <label className="block text-gray-700 font-medium mb-2">Enter Amount (₹)</label>
// // //                                     <input
// // //                                         type="number"
// // //                                         value={amount}
// // //                                         onChange={(e) => setAmount(e.target.value)}
// // //                                         placeholder="Min ₹100"
// // //                                         className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#004296] focus:ring-1 focus:ring-[#004296] outline-none text-lg font-medium"
// // //                                     />

// // //                                     {/* Quick Amount Buttons */}
// // //                                     <div className="flex flex-wrap gap-2 mt-4">
// // //                                         {quickAmounts.map((amt) => (
// // //                                             <button
// // //                                                 key={amt}
// // //                                                 onClick={() => setAmount(amt)}
// // //                                                 className={`px-4 py-2 rounded-3xl text-sm font-medium border transition-all ${parseFloat(amount) === amt
// // //                                                         ? "bg-[#004296] text-white border-[#004296]"
// // //                                                         : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// // //                                                     }`}
// // //                                             >
// // //                                                 ₹{amt}
// // //                                             </button>
// // //                                         ))}
// // //                                     </div>
// // //                                 </div>

// // //                                 {/* RIGHT COLUMN - Payment Method Selection Card */}
// // //                                 <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
// // //                                     <label className="block text-gray-700 font-medium mb-3">Select Payment Method</label>
// // //                                     <div className="space-y-2">
// // //                                         {paymentMethods.map((method) => (
// // //                                             <label
// // //                                                 key={method.id}
// // //                                                 className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedPayment === method.id
// // //                                                         ? "border-[#004296] bg-blue-50/50"
// // //                                                         : "border-gray-200 hover:bg-gray-50"
// // //                                                     }`}
// // //                                             >
// // //                                                 <input
// // //                                                     type="radio"
// // //                                                     name="payment"
// // //                                                     value={method.id}
// // //                                                     checked={selectedPayment === method.id}
// // //                                                     onChange={(e) => setSelectedPayment(e.target.value)}
// // //                                                     className="w-4 h-4 text-[#004296] focus:ring-[#004296]"
// // //                                                 />
// // //                                                 <div className="flex items-center gap-2">
// // //                                                     <img
// // //                                                         src={method.icon}
// // //                                                         alt={method.name}
// // //                                                         className="w-6 h-6 rounded object-contain"
// // //                                                     />
// // //                                                     <span className="font-medium text-gray-800 text-sm">{method.name}</span>
// // //                                                 </div>
// // //                                             </label>
// // //                                         ))}
// // //                                     </div>
// // //                                 </div>
// // //                             </div>

// // //                             {/* Proceed Button */}
// // //                             <button
// // //                                 onClick={handleAddMoney}
// // //                                 disabled={loading}
// // //                                 className="w-full py-3.5 rounded-lg font-bold text-[#004296] bg-[#FBEFA4] hover:bg-[#FFE44D] shadow-sm hover:shadow transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
// // //                             >
// // //                                 {loading ? "Processing..." : `Proceed to Add ₹${amount || "0"}`}
// // //                             </button>
// // //                         </div>
// // //                     )}

// // //                     {/* ========== HISTORY SCREEN ========== */}
// // //                     {activeTab === "history" && (
// // //                         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// // //                             {loadingHistory ? (
// // //                                 <div className="flex justify-center items-center py-16">
// // //                                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004296]"></div>
// // //                                     <span className="ml-3 text-gray-500">Loading history...</span>
// // //                                 </div>
// // //                             ) : (
// // //                                 <div className="divide-y divide-gray-100">
// // //                                     {transactionHistoryData.length > 0 ? (
// // //                                         transactionHistoryData.map((txn) => (
// // //                                             <div key={txn.id} className="p-4 hover:bg-gray-50 transition-all">
// // //                                                 <div className="flex items-center justify-between">
// // //                                                     <div className="flex items-center gap-3">
// // //                                                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
// // //                                                             }`}>
// // //                                                             {getTransactionIcon(txn.type, txn.method)}
// // //                                                         </div>
// // //                                                         <div>
// // //                                                             <p className="font-medium text-gray-800">{txn.title || txn.description}</p>
// // //                                                             <p className="text-gray-500 text-xs">
// // //                                                                 {formatDate(txn.created_at)} • {formatTime(txn.created_at)} • {getMethodDisplay(txn.method)}
// // //                                                             </p>
// // //                                                         </div>
// // //                                                     </div>
// // //                                                     <div className="text-right">
// // //                                                         <p className={`font-bold ${txn.type === "credit" ? "text-green-600" : "text-red-600"}`}>
// // //                                                             {txn.type === "credit" ? "+" : "-"}₹{parseFloat(txn.amount).toLocaleString('en-IN', {
// // //                                                                 minimumFractionDigits: 2,
// // //                                                                 maximumFractionDigits: 2
// // //                                                             })}
// // //                                                         </p>
// // //                                                         <p className={`text-xs ${txn.status === "success" ? "text-green-500" : "text-red-500"
// // //                                                             }`}>
// // //                                                             {txn.status === "success" ? "✓ Success" : "✗ Failed"}
// // //                                                         </p>
// // //                                                     </div>
// // //                                                 </div>
// // //                                             </div>
// // //                                         ))
// // //                                     ) : (
// // //                                         <div className="text-center py-16">
// // //                                             <span className="text-5xl mb-4 block opacity-30">📋</span>
// // //                                             <p className="text-gray-500">No transaction history found</p>
// // //                                             <p className="text-gray-400 text-sm mt-1">Your recent credits and debits will appear here.</p>
// // //                                         </div>
// // //                                     )}
// // //                                 </div>
// // //                             )}
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //             </main>

// // //             <Footer />
// // //         </div>
// // //     );
// // // };

// // // export default Credits;
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../HomeComponents/nav_bar";
// // import Footer from "../HomeComponents/footer";
// // import { transactionHistory } from "../../services/add_money_services";
// // import { API } from "../../services/api_url";

// // const Credits = () => {
// //     const navigate = useNavigate();

// //     const [activeTab, setActiveTab] = useState("add");
// //     const [amount, setAmount] = useState("");
// //     const [loading, setLoading] = useState(false);
// //     const [loadingHistory, setLoadingHistory] = useState(false);
// //     const [loadingBalance, setLoadingBalance] = useState(false);

// //     const [userData, setUserData] = useState(null);
// //     const [transactionHistoryData, setTransactionHistoryData] = useState([]);

// //     // PAYMENT STATES
// //     const [paymentType, setPaymentType] = useState("gateway");
// //     const [screenshot, setScreenshot] = useState(null);

// //     // QR CODE
// //     const [qrCode, setQrCode] = useState("");

// //     // Token helper function
// //     const getToken = () => {
// //         return localStorage.getItem("token");
// //     };

// //     // =========================
// //     // FETCH QR CODE
// //     // =========================

// //     const fetchQrCode = async () => {
// //         try {
// //             const token = getToken();
// //             const response = await fetch(
// //                 "https://api.luckyfunda.com/api/wallet/payment-qr",
// //                 {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                     },
// //                 }
// //             );

// //             const result = await response.json();

// //             console.log("QR CODE RESPONSE", result);

// //             if (result?.data?.qr_image) {
// //                 setQrCode(result.data.qr_image);
// //             }
// //         } catch (error) {
// //             console.log("QR ERROR", error);
// //         }
// //     };

// //     // =========================
// //     // USER PROFILE
// //     // =========================

// //     const fetchUserProfileFromAPI = async () => {
// //         setLoadingBalance(true);

// //         try {
// //             const token = getToken();

// //             if (!token) {
// //                 setLoadingBalance(false);
// //                 return;
// //             }

// //             const response = await fetch(`${API.PROFILE_URL}`, {
// //                 method: "GET",
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                     "Content-Type": "application/json",
// //                 },
// //             });

// //             const result = await response.json();

// //             console.log("PROFILE API RESPONSE", result);

// //             if (result.status === 200 && result.success) {
// //                 const profileData = result.data;

// //                 setUserData(profileData);

// //                 localStorage.setItem(
// //                     "user",
// //                     JSON.stringify(profileData)
// //                 );

// //                 if (profileData.total_balance) {
// //                     localStorage.setItem(
// //                         "credits",
// //                         profileData.total_balance
// //                     );
// //                 }

// //                 window.dispatchEvent(
// //                     new Event("creditsUpdated")
// //                 );

// //                 window.dispatchEvent(
// //                     new Event("profileUpdated")
// //                 );
// //             }
// //         } catch (error) {
// //             console.log("PROFILE ERROR", error);
// //         } finally {
// //             setLoadingBalance(false);
// //         }
// //     };

// //     // =========================
// //     // CHECK USER
// //     // =========================

// //     const checkCreditStatus = () => {
// //         const user = localStorage.getItem("user");

// //         if (user && user !== "undefined") {
// //             try {
// //                 const parsedUser = JSON.parse(user);
// //                 setUserData(parsedUser);
// //             } catch (e) {
// //                 console.log("USER PARSE ERROR", e);
// //                 setUserData(null);
// //             }
// //         } else {
// //             setUserData(null);
// //         }
// //     };

// //     // =========================
// //     // REFRESH WALLET
// //     // =========================

// //     const refreshWalletBalance = async () => {
// //         await fetchUserProfileFromAPI();
// //     };

// //     // =========================
// //     // TRANSACTION HISTORY
// //     // =========================

// //     const fetchTransactionHistory = async () => {
// //         setLoadingHistory(true);

// //         try {
// //             const token = getToken();
            
// //             if (!token) {
// //                 setLoadingHistory(false);
// //                 return;
// //             }

// //             const response = await transactionHistory(token);

// //             console.log("TRANSACTION HISTORY RESPONSE", response);

// //             if (response.success) {
// //                 setTransactionHistoryData(response.data || []);
// //             } else {
// //                 setTransactionHistoryData([]);
// //             }
// //         } catch (error) {
// //             console.log("TRANSACTION HISTORY ERROR", error);
// //             setTransactionHistoryData([]);
// //         } finally {
// //             setLoadingHistory(false);
// //         }
// //     };

// //     // =========================
// //     // USE EFFECT
// //     // =========================

// //     useEffect(() => {
// //         checkCreditStatus();
// //         fetchUserProfileFromAPI();
// //         fetchQrCode();
// //     }, []);

// //     useEffect(() => {
// //         if (activeTab === "history") {
// //             fetchTransactionHistory();
// //         }
// //     }, [activeTab]);

// //     // =========================
// //     // PAYMENT METHODS
// //     // =========================

// //     const paymentMethods = [
// //         {
// //             id: "gateway",
// //             name: "Gateway",
// //             icon: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
// //         },
// //         {
// //             id: "manual",
// //             name: "Manual Payment",
// //             icon: "https://cdn-icons-png.flaticon.com/512/2704/2704029.png",
// //         },
// //     ];

// //     const quickAmounts = [200, 500, 1000, 2000, 5000];

// //     // =========================
// //     // ADD MONEY
// //     // =========================

// //     const handleAddMoney = async () => {
// //         const amountNum = parseFloat(amount);

// //         if (!amount || isNaN(amountNum) || amountNum < 100) {
// //             alert("Please enter a valid amount (minimum ₹100)");
// //             return;
// //         }

// //         try {
// //             setLoading(true);

// //             const token = getToken();

// //             if (!token) {
// //                 alert("Please login first");
// //                 navigate("/login");
// //                 setLoading(false);
// //                 return;
// //             }

// //             let response;

// //             // =========================
// //             // GATEWAY API
// //             // =========================

// //             if (paymentType === "gateway") {
// //                 response = await fetch(
// //                     "https://api.luckyfunda.com/api/wallet/add-credit",
// //                     {
// //                         method: "POST",
// //                         headers: {
// //                             "Content-Type": "application/json",
// //                             Authorization: `Bearer ${token}`,
// //                         },
// //                         body: JSON.stringify({
// //                             amount: amountNum,
// //                             type: "gateway",
// //                         }),
// //                     }
// //                 );
// //             }

// //             // =========================
// //             // MANUAL API
// //             // =========================

// //             else {
// //                 if (!screenshot) {
// //                     alert("Please upload a payment screenshot");
// //                     setLoading(false);
// //                     return;
// //                 }

// //                 const formData = new FormData();

// //                 formData.append("amount", amountNum);
// //                 formData.append("type", "manual");
// //                 formData.append("screenshot", screenshot);

// //                 response = await fetch(
// //                     "https://api.luckyfunda.com/api/wallet/add-credit",
// //                     {
// //                         method: "POST",
// //                         headers: {
// //                             Authorization: `Bearer ${token}`,
// //                         },
// //                         body: formData,
// //                     }
// //                 );
// //             }

// //             const result = await response.json();

// //             console.log("PAYMENT RESPONSE", result);

// //             if (response.ok) {
// //                 alert(
// //                     paymentType === "gateway"
// //                         ? "Payment initiated successfully! You will be redirected to payment gateway."
// //                         : "Manual payment submitted successfully! It will be verified shortly."
// //                 );

// //                 setAmount("");
// //                 setScreenshot(null);

// //                 await refreshWalletBalance();

// //                 if (activeTab === "history") {
// //                     await fetchTransactionHistory();
// //                 }
// //             } else {
// //                 throw new Error(
// //                     result.message || "Payment failed. Please try again."
// //                 );
// //             }
// //         } catch (error) {
// //             console.log("PAYMENT ERROR", error);

// //             alert(error.message || "Something went wrong. Please try again.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     // =========================
// //     // BALANCE
// //     // =========================

// //     const getCurrentBalance = () => {
// //         if (userData?.total_balance) {
// //             return parseFloat(userData.total_balance);
// //         }

// //         return 0;
// //     };

// //     const currentBalance = getCurrentBalance();

// //     // =========================
// //     // DATE FORMAT
// //     // =========================

// //     const formatDate = (dateString) => {
// //         if (!dateString) return "";

// //         const date = new Date(dateString);

// //         return date.toLocaleDateString("en-IN", {
// //             day: "2-digit",
// //             month: "short",
// //             year: "numeric",
// //         });
// //     };

// //     const formatTime = (dateString) => {
// //         if (!dateString) return "";

// //         const date = new Date(dateString);

// //         return date.toLocaleTimeString("en-IN", {
// //             hour: "2-digit",
// //             minute: "2-digit",
// //         });
// //     };

// //     // =========================
// //     // TRANSACTION ICON
// //     // =========================

// //     const getTransactionIcon = (type, method) => {
// //         if (type === "credit") {
// //             if (method === "referral") return "🤝";
// //             if (method === "bonus") return "🎁";
// //             return "💰";
// //         }

// //         return "💸";
// //     };

// //     const getMethodDisplay = (method) => {
// //         if (method === "referral") return "Referral Bonus";
// //         if (method === "bonus") return "Bonus";
// //         if (method === "gateway") return "Online Payment";
// //         if (method === "manual") return "Manual Payment";
// //         return method?.toUpperCase() || "Wallet";
// //     };

// //     const getStatusBadge = (status) => {
// //         switch (status) {
// //             case "completed":
// //                 return (
// //                     <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
// //                         Completed
// //                     </span>
// //                 );
// //             case "pending":
// //                 return (
// //                     <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
// //                         Pending
// //                     </span>
// //                 );
// //             case "failed":
// //                 return (
// //                     <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
// //                         Failed
// //                     </span>
// //                 );
// //             default:
// //                 return (
// //                     <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
// //                         {status}
// //                     </span>
// //                 );
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen bg-gray-50 flex flex-col">
// //             <Navbar />

// //             <main className="grow pt-24 md:pt-28 pb-12 px-4">
// //                 <div className="max-w-7xl mx-auto">

// //                     {/* TITLE */}

// //                     <div className="mb-8">
// //                         <h1 className="text-3xl font-bold text-[#004296]">
// //                             Add Credits
// //                         </h1>

// //                         <p className="text-gray-500 mt-1">
// //                             Securely add money to your wallet
// //                         </p>
// //                     </div>

// //                     {/* BALANCE CARD */}

// //                     <div className="bg-gradient-to-r from-[#004296] to-[#003380] rounded-2xl p-5 mb-8 text-white shadow-lg">
// //                         <div className="flex items-center justify-between">
// //                             <div>
// //                                 <p className="text-white/70 text-sm">
// //                                     Total Balance
// //                                 </p>

// //                                 <p className="text-4xl font-bold mt-1">
// //                                     {loadingBalance ? (
// //                                         <span className="animate-pulse">---</span>
// //                                     ) : (
// //                                         `₹${currentBalance.toLocaleString(
// //                                             "en-IN",
// //                                             {
// //                                                 minimumFractionDigits: 2,
// //                                                 maximumFractionDigits: 2,
// //                                             }
// //                                         )}`
// //                                     )}
// //                                 </p>
// //                             </div>
                            
// //                             <button 
// //                                 onClick={refreshWalletBalance}
// //                                 className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
// //                                 title="Refresh Balance"
// //                             >
// //                                 🔄
// //                             </button>
// //                         </div>
// //                     </div>

// //                     {/* TAB */}

// //                     <div className="flex border-b border-gray-200 mb-6">
// //                         <button
// //                             onClick={() => setActiveTab("add")}
// //                             className={`pb-3 px-4 font-medium transition-colors ${
// //                                 activeTab === "add"
// //                                     ? "text-[#004296] border-b-2 border-[#004296]"
// //                                     : "text-gray-500 hover:text-gray-700"
// //                             }`}
// //                         >
// //                             Add Credits
// //                         </button>

// //                         <button
// //                             onClick={() =>
// //                                 setActiveTab("history")
// //                             }
// //                             className={`pb-3 px-4 font-medium transition-colors ${
// //                                 activeTab === "history"
// //                                     ? "text-[#004296] border-b-2 border-[#004296]"
// //                                     : "text-gray-500 hover:text-gray-700"
// //                             }`}
// //                         >
// //                             Transaction History
// //                         </button>
// //                     </div>

// //                     {/* ADD SCREEN */}

// //                     {activeTab === "add" && (
// //                         <div className="space-y-6">

// //                             {/* AMOUNT */}

// //                             <div className="bg-white rounded-xl p-5 shadow-sm border">
// //                                 <label className="block text-gray-700 font-medium mb-2">
// //                                     Enter Amount (₹)
// //                                 </label>

// //                                 <input
// //                                     type="number"
// //                                     value={amount}
// //                                     onChange={(e) =>
// //                                         setAmount(e.target.value)
// //                                     }
// //                                     placeholder="Minimum ₹100"
// //                                     min="100"
// //                                     className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-[#004296] focus:ring-1 focus:ring-[#004296] transition-all"
// //                                 />

// //                                 <div className="flex flex-wrap gap-2 mt-4">
// //                                     {quickAmounts.map((amt) => (
// //                                         <button
// //                                             key={amt}
// //                                             onClick={() =>
// //                                                 setAmount(amt.toString())
// //                                             }
// //                                             className={`px-4 py-2 rounded-full border transition-all ${
// //                                                 parseFloat(amount) === amt
// //                                                     ? "bg-[#004296] text-white border-[#004296]"
// //                                                     : "bg-white border-gray-300 hover:border-[#004296] hover:text-[#004296]"
// //                                             }`}
// //                                         >
// //                                             ₹{amt}
// //                                         </button>
// //                                     ))}
// //                                 </div>
// //                             </div>

// //                             {/* PAYMENT METHODS */}

// //                             <div className="bg-white rounded-xl p-5 shadow-sm border">
// //                                 <label className="block text-gray-700 font-medium mb-3">
// //                                     Select Payment Method
// //                                 </label>

// //                                 <div className="space-y-3">
// //                                     {paymentMethods.map((method) => (
// //                                         <label
// //                                             key={method.id}
// //                                             className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
// //                                                 paymentType === method.id
// //                                                     ? "border-[#004296] bg-blue-50"
// //                                                     : "border-gray-200 hover:border-[#004296]"
// //                                             }`}
// //                                         >
// //                                             <input
// //                                                 type="radio"
// //                                                 value={method.id}
// //                                                 checked={
// //                                                     paymentType ===
// //                                                     method.id
// //                                                 }
// //                                                 onChange={(e) =>
// //                                                     setPaymentType(
// //                                                         e.target.value
// //                                                     )
// //                                                 }
// //                                                 className="accent-[#004296]"
// //                                             />

// //                                             <img
// //                                                 src={method.icon}
// //                                                 alt={method.name}
// //                                                 className="w-7 h-7"
// //                                             />

// //                                             <span className="font-medium">
// //                                                 {method.name}
// //                                             </span>
// //                                         </label>
// //                                     ))}
// //                                 </div>
// //                             </div>

// //                             {/* MANUAL PAYMENT */}

// //                             {paymentType === "manual" && (
// //                                 <div className="bg-white rounded-xl p-5 shadow-sm border">

// //                                     <h2 className="text-xl font-bold mb-5">
// //                                         Scan QR Code & Pay
// //                                     </h2>

// //                                     {/* QR */}

// //                                     <div className="flex justify-center mb-4">
// //                                         {qrCode ? (
// //                                             <img
// //                                                 src={qrCode}
// //                                                 alt="Payment QR Code"
// //                                                 className="w-64 h-64 object-contain border rounded-xl shadow-sm"
// //                                             />
// //                                         ) : (
// //                                             <div className="w-64 h-64 flex items-center justify-center border rounded-xl bg-gray-50">
// //                                                 <div className="text-center">
// //                                                     <div className="animate-spin text-2xl mb-2">⏳</div>
// //                                                     <p className="text-sm text-gray-500">Loading QR...</p>
// //                                                 </div>
// //                                             </div>
// //                                         )}
// //                                     </div>

// //                                     <p className="text-center text-sm text-gray-500 mb-4">
// //                                         Scan this QR code with any UPI app and make the payment
// //                                     </p>

// //                                     {/* SCREENSHOT */}

// //                                     <div className="mt-6">
// //                                         <label className="block font-medium mb-2">
// //                                             Upload Payment Screenshot
// //                                         </label>

// //                                         <input
// //                                             type="file"
// //                                             accept="image/*"
// //                                             onChange={(e) =>
// //                                                 setScreenshot(
// //                                                     e.target.files[0]
// //                                                 )
// //                                             }
// //                                             className="w-full border border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#004296] file:text-white hover:file:bg-[#003380]"
// //                                         />
// //                                     </div>

// //                                     {/* PREVIEW */}

// //                                     {screenshot && (
// //                                         <div className="mt-4">
// //                                             <p className="text-sm text-gray-500 mb-2">Preview:</p>
// //                                             <img
// //                                                 src={URL.createObjectURL(
// //                                                     screenshot
// //                                                 )}
// //                                                 alt="Payment screenshot preview"
// //                                                 className="w-40 h-40 object-cover rounded-xl border shadow-sm"
// //                                             />
// //                                         </div>
// //                                     )}
// //                                 </div>
// //                             )}

// //                             {/* BUTTON */}

// //                             <button
// //                                 onClick={handleAddMoney}
// //                                 disabled={loading}
// //                                 className="w-full py-4 rounded-xl bg-[#FBEFA4] hover:bg-[#FFE44D] font-bold text-[#004296] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
// //                             >
// //                                 {loading ? (
// //                                     <span className="flex items-center justify-center gap-2">
// //                                         <span className="animate-spin">⏳</span>
// //                                         Processing...
// //                                     </span>
// //                                 ) : paymentType === "gateway" ? (
// //                                     `Proceed to Pay ₹${amount || 0}`
// //                                 ) : (
// //                                     `Submit Manual Payment ₹${amount || 0}`
// //                                 )}
// //                             </button>
// //                         </div>
// //                     )}

// //                     {/* HISTORY */}

// //                     {activeTab === "history" && (
// //                         <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

// //                             {loadingHistory ? (
// //                                 <div className="p-10 text-center">
// //                                     <div className="animate-spin text-3xl mb-3">⏳</div>
// //                                     <p className="text-gray-500">Loading transactions...</p>
// //                                 </div>
// //                             ) : transactionHistoryData.length > 0 ? (
// //                                 <div className="divide-y divide-gray-100">
// //                                     {transactionHistoryData.map((txn) => (
// //                                         <div
// //                                             key={txn.id || txn._id}
// //                                             className="p-4 hover:bg-gray-50 transition-colors"
// //                                         >
// //                                             <div className="flex justify-between items-start">
// //                                                 <div className="flex gap-3">

// //                                                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
// //                                                         {getTransactionIcon(
// //                                                             txn.type,
// //                                                             txn.method
// //                                                         )}
// //                                                     </div>

// //                                                     <div>
// //                                                         <div className="flex items-center gap-2">
// //                                                             <p className="font-medium text-gray-800">
// //                                                                 {txn.title ||
// //                                                                     txn.description ||
// //                                                                     "Transaction"}
// //                                                             </p>
// //                                                             {getStatusBadge(txn.status)}
// //                                                         </div>

// //                                                         <p className="text-xs text-gray-500 mt-1">
// //                                                             {formatDate(
// //                                                                 txn.created_at
// //                                                             )}{" "}
// //                                                             •{" "}
// //                                                             {formatTime(
// //                                                                 txn.created_at
// //                                                             )}{" "}
// //                                                             •{" "}
// //                                                             {getMethodDisplay(
// //                                                                 txn.method
// //                                                             )}
// //                                                         </p>
                                                        
// //                                                         {txn.transaction_id && (
// //                                                             <p className="text-xs text-gray-400 mt-1">
// //                                                                 ID: {txn.transaction_id}
// //                                                             </p>
// //                                                         )}
// //                                                     </div>
// //                                                 </div>

// //                                                 <div className="text-right">
// //                                                     <p
// //                                                         className={`font-bold text-lg ${
// //                                                             txn.type ===
// //                                                             "credit"
// //                                                                 ? "text-green-600"
// //                                                                 : "text-red-600"
// //                                                         }`}
// //                                                     >
// //                                                         {txn.type ===
// //                                                         "credit"
// //                                                             ? "+"
// //                                                             : "-"}
// //                                                         ₹
// //                                                         {parseFloat(
// //                                                             txn.amount
// //                                                         ).toFixed(2)}
// //                                                     </p>
                                                    
// //                                                     {txn.closing_balance && (
// //                                                         <p className="text-xs text-gray-400 mt-1">
// //                                                             Balance: ₹{parseFloat(txn.closing_balance).toFixed(2)}
// //                                                         </p>
// //                                                     )}
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             ) : (
// //                                 <div className="p-10 text-center">
// //                                     <div className="text-4xl mb-3">📭</div>
// //                                     <p className="text-gray-500">No transaction history found</p>
// //                                     <button
// //                                         onClick={fetchTransactionHistory}
// //                                         className="mt-3 text-[#004296] underline text-sm"
// //                                     >
// //                                         Refresh
// //                                     </button>
// //                                 </div>
// //                             )}
// //                         </div>
// //                     )}
// //                 </div>
// //             </main>

// //             <Footer />
// //         </div>
// //     );
// // };

// // export default Credits;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../HomeComponents/nav_bar";
// import Footer from "../HomeComponents/footer";
// import { transactionHistory } from "../../services/add_money_services";
// import { API } from "../../services/api_url";

// const Credits = () => {
//     const navigate = useNavigate();

//     const [activeTab, setActiveTab] = useState("add");
//     const [amount, setAmount] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [loadingHistory, setLoadingHistory] = useState(false);
//     const [loadingBalance, setLoadingBalance] = useState(false);

//     const [userData, setUserData] = useState(null);
//     const [transactionHistoryData, setTransactionHistoryData] = useState([]);

//     // PAYMENT STATES
//     const [paymentType, setPaymentType] = useState("gateway");
//     const [screenshot, setScreenshot] = useState(null);

//     // QR CODE
//     const [qrCode, setQrCode] = useState("");

//     // Token helper function
//     const getToken = () => {
//         return localStorage.getItem("token");
//     };

//     // =========================
//     // FETCH QR CODE
//     // =========================

//     const fetchQrCode = async () => {
//         try {
//             const token = getToken();
//             const response = await fetch(
//                 "https://api.luckyfunda.com/api/wallet/payment-qr",
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             const result = await response.json();

//             console.log("QR CODE RESPONSE", result);

//             if (result?.data?.qr_image) {
//                 setQrCode(result.data.qr_image);
//             }
//         } catch (error) {
//             console.log("QR ERROR", error);
//         }
//     };

//     // =========================
//     // USER PROFILE
//     // =========================

//     const fetchUserProfileFromAPI = async () => {
//         setLoadingBalance(true);

//         try {
//             const token = getToken();

//             if (!token) {
//                 setLoadingBalance(false);
//                 return;
//             }

//             const response = await fetch(`${API.PROFILE_URL}`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             const result = await response.json();

//             console.log("PROFILE API RESPONSE", result);

//             if (result.status === 200 && result.success) {
//                 const profileData = result.data;

//                 setUserData(profileData);

//                 localStorage.setItem(
//                     "user",
//                     JSON.stringify(profileData)
//                 );

//                 if (profileData.total_balance) {
//                     localStorage.setItem(
//                         "credits",
//                         profileData.total_balance
//                     );
//                 }

//                 window.dispatchEvent(
//                     new Event("creditsUpdated")
//                 );

//                 window.dispatchEvent(
//                     new Event("profileUpdated")
//                 );
//             }
//         } catch (error) {
//             console.log("PROFILE ERROR", error);
//         } finally {
//             setLoadingBalance(false);
//         }
//     };

//     // =========================
//     // CHECK USER
//     // =========================

//     const checkCreditStatus = () => {
//         const user = localStorage.getItem("user");

//         if (user && user !== "undefined") {
//             try {
//                 const parsedUser = JSON.parse(user);
//                 setUserData(parsedUser);
//             } catch (e) {
//                 console.log("USER PARSE ERROR", e);
//                 setUserData(null);
//             }
//         } else {
//             setUserData(null);
//         }
//     };

//     // =========================
//     // REFRESH WALLET
//     // =========================

//     const refreshWalletBalance = async () => {
//         await fetchUserProfileFromAPI();
//     };

//     // =========================
//     // TRANSACTION HISTORY
//     // =========================

//     const fetchTransactionHistory = async () => {
//         setLoadingHistory(true);

//         try {
//             const token = getToken();
            
//             if (!token) {
//                 setLoadingHistory(false);
//                 return;
//             }

//             const response = await transactionHistory(token);

//             console.log("TRANSACTION HISTORY RESPONSE", response);

//             // API response structure: { message: "...", data: [...] }
//             if (response && response.data && Array.isArray(response.data)) {
//                 setTransactionHistoryData(response.data);
//             } else if (response && Array.isArray(response)) {
//                 // If response itself is an array
//                 setTransactionHistoryData(response);
//             } else {
//                 console.log("Unexpected response format:", response);
//                 setTransactionHistoryData([]);
//             }
//         } catch (error) {
//             console.log("TRANSACTION HISTORY ERROR", error);
//             setTransactionHistoryData([]);
//         } finally {
//             setLoadingHistory(false);
//         }
//     };

//     // =========================
//     // USE EFFECT
//     // =========================

//     useEffect(() => {
//         checkCreditStatus();
//         fetchUserProfileFromAPI();
//         fetchQrCode();
//     }, []);

//     useEffect(() => {
//         if (activeTab === "history") {
//             fetchTransactionHistory();
//         }
//     }, [activeTab]);

//     // =========================
//     // PAYMENT METHODS
//     // =========================

//     const paymentMethods = [
//         {
//             id: "gateway",
//             name: "Gateway",
//             icon: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
//         },
//         {
//             id: "manual",
//             name: "Manual Payment",
//             icon: "https://cdn-icons-png.flaticon.com/512/2704/2704029.png",
//         },
//     ];

//     const quickAmounts = [200, 500, 1000, 2000, 5000];

//     // =========================
//     // ADD MONEY
//     // =========================

//     const handleAddMoney = async () => {
//         const amountNum = parseFloat(amount);

//         if (!amount || isNaN(amountNum) || amountNum < 100) {
//             alert("Please enter a valid amount (minimum ₹100)");
//             return;
//         }

//         try {
//             setLoading(true);

//             const token = getToken();

//             if (!token) {
//                 alert("Please login first");
//                 navigate("/login");
//                 setLoading(false);
//                 return;
//             }

//             let response;

//             // =========================
//             // GATEWAY API
//             // =========================

//             if (paymentType === "gateway") {
//                 response = await fetch(
//                     "https://api.luckyfunda.com/api/wallet/add-credit",
//                     {
//                         method: "POST",
//                         headers: {
//                             "Content-Type": "application/json",
//                             Authorization: `Bearer ${token}`,
//                         },
//                         body: JSON.stringify({
//                             amount: amountNum,
//                             type: "gateway",
//                         }),
//                     }
//                 );
//             }

//             // =========================
//             // MANUAL API
//             // =========================

//             else {
//                 if (!screenshot) {
//                     alert("Please upload a payment screenshot");
//                     setLoading(false);
//                     return;
//                 }

//                 const formData = new FormData();

//                 formData.append("amount", amountNum);
//                 formData.append("type", "manual");
//                 formData.append("screenshot", screenshot);

//                 response = await fetch(
//                     "https://api.luckyfunda.com/api/wallet/add-credit",
//                     {
//                         method: "POST",
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                         body: formData,
//                     }
//                 );
//             }

//             const result = await response.json();

//             console.log("PAYMENT RESPONSE", result);

//             if (response.ok) {
//                 alert(
//                     paymentType === "gateway"
//                         ? "Payment initiated successfully! You will be redirected to payment gateway."
//                         : "Manual payment submitted successfully! It will be verified shortly."
//                 );

//                 setAmount("");
//                 setScreenshot(null);

//                 await refreshWalletBalance();

//                 if (activeTab === "history") {
//                     await fetchTransactionHistory();
//                 }
//             } else {
//                 throw new Error(
//                     result.message || "Payment failed. Please try again."
//                 );
//             }
//         } catch (error) {
//             console.log("PAYMENT ERROR", error);

//             alert(error.message || "Something went wrong. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // =========================
//     // BALANCE
//     // =========================

//     const getCurrentBalance = () => {
//         if (userData?.total_balance) {
//             return parseFloat(userData.total_balance);
//         }

//         return 0;
//     };

//     const currentBalance = getCurrentBalance();

//     // =========================
//     // DATE FORMAT
//     // =========================

//     const formatDate = (dateString) => {
//         if (!dateString) return "";
        
//         // Handle "2026-05-21 18:17:12" format
//         const date = new Date(dateString.replace(" ", "T"));
        
//         if (isNaN(date.getTime())) return dateString;
        
//         return date.toLocaleDateString("en-IN", {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//         });
//     };

//     const formatTime = (dateString) => {
//         if (!dateString) return "";
        
//         // Handle "2026-05-21 18:17:12" format
//         const date = new Date(dateString.replace(" ", "T"));
        
//         if (isNaN(date.getTime())) return "";
        
//         return date.toLocaleTimeString("en-IN", {
//             hour: "2-digit",
//             minute: "2-digit",
//         });
//     };

//     // =========================
//     // TRANSACTION ICON
//     // =========================

//     const getTransactionIcon = (type, method) => {
//         if (type === "credit") {
//             if (method === "referral") return "🤝";
//             if (method === "bonus") return "🎁";
//             return "💰";
//         }

//         return "💸";
//     };

//     const getMethodDisplay = (method) => {
//         if (method === "referral") return "Referral Bonus";
//         if (method === "bonus") return "Bonus";
//         if (method === "gateway") return "Online Payment";
//         if (method === "manual") return "Manual Payment";
//         if (method === "UPI") return "UPI Payment";
//         if (method === "wallet") return "Wallet";
//         return method?.toUpperCase() || "Wallet";
//     };

//     const getStatusBadge = (status) => {
//         switch (status?.toLowerCase()) {
//             case "completed":
//             case "success":
//                 return (
//                     <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
//                         Completed
//                     </span>
//                 );
//             case "pending":
//                 return (
//                     <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-medium">
//                         Pending
//                     </span>
//                 );
//             case "approved":
//                 return (
//                     <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
//                         Approved
//                     </span>
//                 );
//             case "failed":
//             case "rejected":
//                 return (
//                     <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">
//                         Failed
//                     </span>
//                 );
//             default:
//                 return (
//                     <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">
//                         {status || "Unknown"}
//                     </span>
//                 );
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex flex-col">
//             <Navbar />

//             <main className="grow pt-24 md:pt-28 pb-12 px-4">
//                 <div className="max-w-7xl mx-auto">

//                     {/* TITLE */}

//                     <div className="mb-8">
//                         <h1 className="text-3xl font-bold text-[#004296]">
//                             Add Credits
//                         </h1>

//                         <p className="text-gray-500 mt-1">
//                             Securely add money to your wallet
//                         </p>
//                     </div>

//                     {/* BALANCE CARD */}

//                     <div className="bg-gradient-to-r from-[#004296] to-[#003380] rounded-2xl p-5 mb-8 text-white shadow-lg">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <p className="text-white/70 text-sm">
//                                     Total Balance
//                                 </p>

//                                 <p className="text-4xl font-bold mt-1">
//                                     {loadingBalance ? (
//                                         <span className="animate-pulse">---</span>
//                                     ) : (
//                                         `₹${currentBalance.toLocaleString(
//                                             "en-IN",
//                                             {
//                                                 minimumFractionDigits: 2,
//                                                 maximumFractionDigits: 2,
//                                             }
//                                         )}`
//                                     )}
//                                 </p>
//                             </div>
                            
//                             <button 
//                                 onClick={refreshWalletBalance}
//                                 className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
//                                 title="Refresh Balance"
//                             >
//                                 🔄
//                             </button>
//                         </div>
//                     </div>

//                     {/* TAB */}

//                     <div className="flex border-b border-gray-200 mb-6">
//                         <button
//                             onClick={() => setActiveTab("add")}
//                             className={`pb-3 px-4 font-medium transition-colors ${
//                                 activeTab === "add"
//                                     ? "text-[#004296] border-b-2 border-[#004296]"
//                                     : "text-gray-500 hover:text-gray-700"
//                             }`}
//                         >
//                             Add Credits
//                         </button>

//                         <button
//                             onClick={() =>
//                                 setActiveTab("history")
//                             }
//                             className={`pb-3 px-4 font-medium transition-colors ${
//                                 activeTab === "history"
//                                     ? "text-[#004296] border-b-2 border-[#004296]"
//                                     : "text-gray-500 hover:text-gray-700"
//                             }`}
//                         >
//                             Transaction History
//                         </button>
//                     </div>

//                     {/* ADD SCREEN */}

//                     {activeTab === "add" && (
//                         <div className="space-y-6">

//                             {/* AMOUNT */}

//                             <div className="bg-white rounded-xl p-5 shadow-sm border">
//                                 <label className="block text-gray-700 font-medium mb-2">
//                                     Enter Amount (₹)
//                                 </label>

//                                 <input
//                                     type="number"
//                                     value={amount}
//                                     onChange={(e) =>
//                                         setAmount(e.target.value)
//                                     }
//                                     placeholder="Minimum ₹100"
//                                     min="100"
//                                     className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:border-[#004296] focus:ring-1 focus:ring-[#004296] transition-all"
//                                 />

//                                 <div className="flex flex-wrap gap-2 mt-4">
//                                     {quickAmounts.map((amt) => (
//                                         <button
//                                             key={amt}
//                                             onClick={() =>
//                                                 setAmount(amt.toString())
//                                             }
//                                             className={`px-4 py-2 rounded-full border transition-all ${
//                                                 parseFloat(amount) === amt
//                                                     ? "bg-[#004296] text-white border-[#004296]"
//                                                     : "bg-white border-gray-300 hover:border-[#004296] hover:text-[#004296]"
//                                             }`}
//                                         >
//                                             ₹{amt}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* PAYMENT METHODS */}

//                             <div className="bg-white rounded-xl p-5 shadow-sm border">
//                                 <label className="block text-gray-700 font-medium mb-3">
//                                     Select Payment Method
//                                 </label>

//                                 <div className="space-y-3">
//                                     {paymentMethods.map((method) => (
//                                         <label
//                                             key={method.id}
//                                             className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
//                                                 paymentType === method.id
//                                                     ? "border-[#004296] bg-blue-50"
//                                                     : "border-gray-200 hover:border-[#004296]"
//                                             }`}
//                                         >
//                                             <input
//                                                 type="radio"
//                                                 value={method.id}
//                                                 checked={
//                                                     paymentType ===
//                                                     method.id
//                                                 }
//                                                 onChange={(e) =>
//                                                     setPaymentType(
//                                                         e.target.value
//                                                     )
//                                                 }
//                                                 className="accent-[#004296]"
//                                             />

//                                             <img
//                                                 src={method.icon}
//                                                 alt={method.name}
//                                                 className="w-7 h-7"
//                                             />

//                                             <span className="font-medium">
//                                                 {method.name}
//                                             </span>
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* MANUAL PAYMENT */}

//                             {paymentType === "manual" && (
//                                 <div className="bg-white rounded-xl p-5 shadow-sm border">

//                                     <h2 className="text-xl font-bold mb-5">
//                                         Scan QR Code & Pay
//                                     </h2>

//                                     {/* QR */}

//                                     <div className="flex justify-center mb-4">
//                                         {qrCode ? (
//                                             <img
//                                                 src={qrCode}
//                                                 alt="Payment QR Code"
//                                                 className="w-64 h-64 object-contain border rounded-xl shadow-sm"
//                                             />
//                                         ) : (
//                                             <div className="w-64 h-64 flex items-center justify-center border rounded-xl bg-gray-50">
//                                                 <div className="text-center">
//                                                     <div className="animate-spin text-2xl mb-2">⏳</div>
//                                                     <p className="text-sm text-gray-500">Loading QR...</p>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>

//                                     <p className="text-center text-sm text-gray-500 mb-4">
//                                         Scan this QR code with any UPI app and make the payment
//                                     </p>

//                                     {/* SCREENSHOT */}

//                                     <div className="mt-6">
//                                         <label className="block font-medium mb-2">
//                                             Upload Payment Screenshot
//                                         </label>

//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) =>
//                                                 setScreenshot(
//                                                     e.target.files[0]
//                                                 )
//                                             }
//                                             className="w-full border border-gray-300 rounded-lg p-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#004296] file:text-white hover:file:bg-[#003380]"
//                                         />
//                                     </div>

//                                     {/* PREVIEW */}

//                                     {screenshot && (
//                                         <div className="mt-4">
//                                             <p className="text-sm text-gray-500 mb-2">Preview:</p>
//                                             <img
//                                                 src={URL.createObjectURL(
//                                                     screenshot
//                                                 )}
//                                                 alt="Payment screenshot preview"
//                                                 className="w-40 h-40 object-cover rounded-xl border shadow-sm"
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             {/* BUTTON */}

//                             <button
//                                 onClick={handleAddMoney}
//                                 disabled={loading}
//                                 className="w-full py-4 rounded-xl bg-[#FBEFA4] hover:bg-[#FFE44D] font-bold text-[#004296] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
//                             >
//                                 {loading ? (
//                                     <span className="flex items-center justify-center gap-2">
//                                         <span className="animate-spin">⏳</span>
//                                         Processing...
//                                     </span>
//                                 ) : paymentType === "gateway" ? (
//                                     `Proceed to Pay ₹${amount || 0}`
//                                 ) : (
//                                     `Submit Manual Payment ₹${amount || 0}`
//                                 )}
//                             </button>
//                         </div>
//                     )}

//                     {/* HISTORY */}

//                     {activeTab === "history" && (
//                         <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

//                             {loadingHistory ? (
//                                 <div className="p-10 text-center">
//                                     <div className="animate-spin text-3xl mb-3">⏳</div>
//                                     <p className="text-gray-500">Loading transactions...</p>
//                                 </div>
//                             ) : transactionHistoryData.length > 0 ? (
//                                 <div className="divide-y divide-gray-100">
//                                     {transactionHistoryData.map((txn) => (
//                                         <div
//                                             key={txn.id || txn._id}
//                                             className="p-4 hover:bg-gray-50 transition-colors"
//                                         >
//                                             <div className="flex justify-between items-start">
//                                                 <div className="flex gap-3">

//                                                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
//                                                         {getTransactionIcon(
//                                                             txn.type,
//                                                             txn.method
//                                                         )}
//                                                     </div>

//                                                     <div>
//                                                         <div className="flex items-center gap-2 flex-wrap">
//                                                             <p className="font-medium text-gray-800">
//                                                                 {txn.title ||
//                                                                     txn.description ||
//                                                                     "Transaction"}
//                                                             </p>
//                                                             {getStatusBadge(txn.status)}
//                                                         </div>

//                                                         <p className="text-xs text-gray-500 mt-1">
//                                                             {formatDate(
//                                                                 txn.createdAt
//                                                             )}{" "}
//                                                             •{" "}
//                                                             {formatTime(
//                                                                 txn.createdAt
//                                                             )}{" "}
//                                                             •{" "}
//                                                             {getMethodDisplay(
//                                                                 txn.method
//                                                             )}
//                                                         </p>
                                                        
//                                                         {txn.reject_reason && (
//                                                             <p className="text-xs text-red-500 mt-1">
//                                                                 Reason: {txn.reject_reason}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                 </div>

//                                                 <div className="text-right">
//                                                     <p
//                                                         className={`font-bold text-lg ${
//                                                             txn.type ===
//                                                             "credit"
//                                                                 ? "text-green-600"
//                                                                 : "text-red-600"
//                                                         }`}
//                                                     >
//                                                         {txn.type ===
//                                                         "credit"
//                                                             ? "+"
//                                                             : "-"}
//                                                         ₹
//                                                         {parseFloat(
//                                                             txn.amount
//                                                         ).toFixed(2)}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="p-10 text-center">
//                                     <div className="text-4xl mb-3">📭</div>
//                                     <p className="text-gray-500">No transaction history found</p>
//                                     <button
//                                         onClick={fetchTransactionHistory}
//                                         className="mt-3 text-[#004296] underline text-sm hover:text-[#003380]"
//                                     >
//                                         Refresh
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </main>

//             <Footer />
//         </div>
//     );
// };

// export default Credits;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import { transactionHistory } from "../../services/add_money_services";
import { API } from "../../services/api_url";

const Credits = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("add");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [loadingBalance, setLoadingBalance] = useState(false);

    const [userData, setUserData] = useState(null);
    const [transactionHistoryData, setTransactionHistoryData] = useState([]);

    // PAYMENT STATES
    const [paymentType, setPaymentType] = useState("gateway");
    const [screenshot, setScreenshot] = useState(null);

    // QR CODE
    const [qrCode, setQrCode] = useState("");

    // Token helper function
    const getToken = () => {
        return localStorage.getItem("token");
    };

    // =========================
    // FETCH QR CODE
    // =========================

    const fetchQrCode = async () => {
        try {
            const token = getToken();
            const response = await fetch(
                "https://api.luckyfunda.com/api/wallet/payment-qr",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            console.log("QR CODE RESPONSE", result);

            if (result?.data?.qr_image) {
                setQrCode(result.data.qr_image);
            }
        } catch (error) {
            console.log("QR ERROR", error);
        }
    };

    // =========================
    // USER PROFILE
    // =========================

    const fetchUserProfileFromAPI = async () => {
        setLoadingBalance(true);

        try {
            const token = getToken();

            if (!token) {
                setLoadingBalance(false);
                return;
            }

            const response = await fetch(`${API.PROFILE_URL}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            console.log("PROFILE API RESPONSE", result);

            if (result.status === 200 && result.success) {
                const profileData = result.data;

                setUserData(profileData);

                localStorage.setItem(
                    "user",
                    JSON.stringify(profileData)
                );

                if (profileData.total_balance) {
                    localStorage.setItem(
                        "credits",
                        profileData.total_balance
                    );
                }

                window.dispatchEvent(
                    new Event("creditsUpdated")
                );

                window.dispatchEvent(
                    new Event("profileUpdated")
                );
            }
        } catch (error) {
            console.log("PROFILE ERROR", error);
        } finally {
            setLoadingBalance(false);
        }
    };

    // =========================
    // CHECK USER
    // =========================

    const checkCreditStatus = () => {
        const user = localStorage.getItem("user");

        if (user && user !== "undefined") {
            try {
                const parsedUser = JSON.parse(user);
                setUserData(parsedUser);
            } catch (e) {
                console.log("USER PARSE ERROR", e);
                setUserData(null);
            }
        } else {
            setUserData(null);
        }
    };

    // =========================
    // REFRESH WALLET
    // =========================

    const refreshWalletBalance = async () => {
        await fetchUserProfileFromAPI();
    };

    // =========================
    // TRANSACTION HISTORY
    // =========================

    const fetchTransactionHistory = async () => {
        setLoadingHistory(true);

        try {
            const token = getToken();
            
            if (!token) {
                setLoadingHistory(false);
                return;
            }

            const response = await transactionHistory(token);

            console.log("TRANSACTION HISTORY RESPONSE", response);

            if (response && response.data && Array.isArray(response.data)) {
                setTransactionHistoryData(response.data);
            } else if (response && Array.isArray(response)) {
                setTransactionHistoryData(response);
            } else {
                console.log("Unexpected response format:", response);
                setTransactionHistoryData([]);
            }
        } catch (error) {
            console.log("TRANSACTION HISTORY ERROR", error);
            setTransactionHistoryData([]);
        } finally {
            setLoadingHistory(false);
        }
    };

    // =========================
    // USE EFFECT
    // =========================

    useEffect(() => {
        checkCreditStatus();
        fetchUserProfileFromAPI();
        fetchQrCode();
    }, []);

    useEffect(() => {
        if (activeTab === "history") {
            fetchTransactionHistory();
        }
    }, [activeTab]);

    // =========================
    // PAYMENT METHODS
    // =========================

    const paymentMethods = [
        // {
        //     id: "gateway",
        //     name: "Online Payment",
        //     description: "Pay securely via payment gateway",
        //     icon: (
        //         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        //         </svg>
        //     ),
        // },
        {
            id: "manual",
            name: "Manual Payment",
            description: "Pay via UPI & upload screenshot",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            ),
        },
    ];

    const quickAmounts = [
        { value: 200, label: "₹200" },
        { value: 500, label: "₹500" },
        { value: 1000, label: "₹1,000" },
        { value: 2000, label: "₹2,000" },
        { value: 5000, label: "₹5,000" },
    ];

    // =========================
    // ADD MONEY
    // =========================

    const handleAddMoney = async () => {
        const amountNum = parseFloat(amount);

        if (!amount || isNaN(amountNum) || amountNum < 100) {
            alert("Please enter a valid amount (minimum ₹100)");
            return;
        }

        try {
            setLoading(true);

            const token = getToken();

            if (!token) {
                alert("Please login first");
                navigate("/login");
                setLoading(false);
                return;
            }

            let response;

            if (paymentType === "gateway") {
                response = await fetch(
                    "https://api.luckyfunda.com/api/wallet/add-credit",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            amount: amountNum,
                            type: "gateway",
                        }),
                    }
                );
            } else {
                if (!screenshot) {
                    alert("Please upload a payment screenshot");
                    setLoading(false);
                    return;
                }

                const formData = new FormData();

                formData.append("amount", amountNum);
                formData.append("type", "manual");
                formData.append("screenshot", screenshot);

                response = await fetch(
                    "https://api.luckyfunda.com/api/wallet/add-credit",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    }
                );
            }

            const result = await response.json();

            console.log("PAYMENT RESPONSE", result);

            if (response.ok) {
                alert(
                    paymentType === "gateway"
                        ? "Payment initiated successfully! You will be redirected to payment gateway."
                        : "Manual payment submitted successfully! It will be verified shortly."
                );

                setAmount("");
                setScreenshot(null);

                await refreshWalletBalance();

                if (activeTab === "history") {
                    await fetchTransactionHistory();
                }
            } else {
                throw new Error(
                    result.message || "Payment failed. Please try again."
                );
            }
        } catch (error) {
            console.log("PAYMENT ERROR", error);
            alert(error.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // BALANCE
    // =========================

    const getCurrentBalance = () => {
        if (userData?.total_balance) {
            return parseFloat(userData.total_balance);
        }
        return 0;
    };

    const currentBalance = getCurrentBalance();

    // =========================
    // DATE FORMAT
    // =========================

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString.replace(" ", "T"));
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString.replace(" ", "T"));
        if (isNaN(date.getTime())) return "";
        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // =========================
    // TRANSACTION HELPERS
    // =========================

    const getTransactionIcon = (type, method) => {
        if (type === "credit") {
            if (method === "referral") return "🤝";
            if (method === "bonus") return "🎁";
            return "↓";
        }
        return "↑";
    };

    const getMethodDisplay = (method) => {
        const methods = {
            referral: "Referral Bonus",
            bonus: "Bonus",
            gateway: "Online Payment",
            manual: "Manual Payment",
            UPI: "UPI Payment",
            wallet: "Wallet",
        };
        return methods[method] || method?.toUpperCase() || "Wallet";
    };

    const getStatusBadge = (status) => {
        const statusStyles = {
            completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
            success: "bg-emerald-50 text-emerald-700 border-emerald-200",
            pending: "bg-amber-50 text-amber-700 border-amber-200",
            approved: "bg-sky-50 text-sky-700 border-sky-200",
            failed: "bg-rose-50 text-rose-700 border-rose-200",
            rejected: "bg-rose-50 text-rose-700 border-rose-200",
        };

        const statusLabels = {
            completed: "Completed",
            success: "Success",
            pending: "Pending",
            approved: "Approved",
            failed: "Failed",
            rejected: "Rejected",
        };

        const style = statusStyles[status?.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200";
        const label = statusLabels[status?.toLowerCase()] || status || "Unknown";

        return (
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${style}`}>
                {label}
            </span>
        );
    };

    // =========================
    // RENDER
    // =========================

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
            <Navbar />

            <main className="grow pt-24 md:pt-28 pb-16 px-4">
                <div className="max-w-4xl mx-auto">

                    {/* HEADER */}
                    <div className="mb-8 text-center md:text-left">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#004296] to-blue-600 bg-clip-text text-transparent">
                            Wallet & Credits
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg">
                            Manage your funds and transactions
                        </p>
                    </div>

                    {/* BALANCE CARD */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#004296] via-blue-700 to-blue-600 rounded-3xl p-8 mb-8 text-white shadow-xl shadow-blue-200">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                        
                        <div className="relative">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
                                        Available Balance
                                    </p>
                                    <p className="text-5xl md:text-6xl font-bold mt-2 tracking-tight">
                                        {loadingBalance ? (
                                            <span className="animate-pulse opacity-70">₹ ---</span>
                                        ) : (
                                            `₹${currentBalance.toLocaleString("en-IN", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}`
                                        )}
                                    </p>
                                </div>
                                
                                <button 
                                    onClick={refreshWalletBalance}
                                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
                                    title="Refresh Balance"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-2 text-blue-100 text-sm">
                                <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                Account Active
                            </div>
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="flex bg-white rounded-2xl p-1.5 mb-8 shadow-sm border border-gray-100">
                        <button
                            onClick={() => setActiveTab("add")}
                            className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                                activeTab === "add"
                                    ? "bg-[#004296] text-white shadow-lg shadow-blue-200"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add Money
                            </span>
                        </button>

                        <button
                            onClick={() => setActiveTab("history")}
                            className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                                activeTab === "history"
                                    ? "bg-[#004296] text-white shadow-lg shadow-blue-200"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                History
                            </span>
                        </button>
                    </div>

                    {/* ADD MONEY SCREEN */}
                    {activeTab === "add" && (
                        <div className="space-y-6 animate-fadeIn">

                            {/* AMOUNT INPUT */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                                    Enter Amount
                                </label>
                                
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-medium">
                                        ₹
                                    </span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        min="100"
                                        className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-gray-100 outline-none text-2xl font-bold text-gray-800 focus:border-[#004296] focus:ring-4 focus:ring-blue-50 transition-all"
                                    />
                                </div>

                                <p className="text-gray-400 text-sm mt-2">Minimum amount: ₹100</p>

                                <div className="flex flex-wrap gap-3 mt-5">
                                    {quickAmounts.map((item) => (
                                        <button
                                            key={item.value}
                                            onClick={() => setAmount(item.value.toString())}
                                            className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                                                parseFloat(amount) === item.value
                                                    ? "bg-[#004296] text-white shadow-lg shadow-blue-200 scale-105"
                                                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:scale-105"
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* PAYMENT METHODS */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <label className="block text-gray-700 font-semibold mb-4 text-sm uppercase tracking-wide">
                                    Payment Method
                                </label>

                                <div className="grid gap-3">
                                    {paymentMethods.map((method) => (
                                        <label
                                            key={method.id}
                                            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                                paymentType === method.id
                                                    ? "border-[#004296] bg-blue-50/50 shadow-md"
                                                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                            }`}
                                        >
                                            <div className={`p-2.5 rounded-xl transition-colors ${
                                                paymentType === method.id ? "bg-[#004296] text-white" : "bg-gray-100 text-gray-500"
                                            }`}>
                                                {method.icon}
                                            </div>
                                            
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">{method.name}</p>
                                                <p className="text-sm text-gray-500">{method.description}</p>
                                            </div>

                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                                paymentType === method.id
                                                    ? "border-[#004296] bg-[#004296]"
                                                    : "border-gray-300"
                                            }`}>
                                                {paymentType === method.id && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                            
                                            <input
                                                type="radio"
                                                value={method.id}
                                                checked={paymentType === method.id}
                                                onChange={(e) => setPaymentType(e.target.value)}
                                                className="hidden"
                                            />
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* MANUAL PAYMENT QR */}
                            {paymentType === "manual" && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fadeIn">
                                    <h3 className="font-semibold text-gray-800 mb-6 text-lg">
                                        Scan & Pay
                                    </h3>

                                    <div className="flex flex-col items-center">
                                        <div className="relative">
                                            {qrCode ? (
                                                <img
                                                    src={qrCode}
                                                    alt="QR Code"
                                                    className="w-56 h-56 object-contain rounded-2xl border-2 border-gray-100 shadow-lg"
                                                />
                                            ) : (
                                                <div className="w-56 h-56 flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
                                                    <div className="text-center">
                                                        <div className="animate-spin text-3xl mb-2">⏳</div>
                                                        <p className="text-sm text-gray-400">Loading QR...</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-center text-gray-500 text-sm mt-4 max-w-sm">
                                            Open any UPI app and scan this QR code to make payment
                                        </p>

                                        <div className="w-full mt-6 pt-6 border-t border-gray-100">
                                            <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                                                Upload Screenshot
                                            </label>
                                            
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#004296] hover:bg-blue-50/30 transition-all">
                                                {screenshot ? (
                                                    <div className="flex items-center gap-2 text-emerald-600">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        <span className="font-medium">Screenshot selected</span>
                                                    </div>
                                                ) : (
                                                    <div className="text-center">
                                                        <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <p className="text-gray-500 text-sm">Click to upload</p>
                                                    </div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setScreenshot(e.target.files[0])}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>

                                        {screenshot && (
                                            <div className="mt-4">
                                                <img
                                                    src={URL.createObjectURL(screenshot)}
                                                    alt="Preview"
                                                    className="w-32 h-32 object-cover rounded-xl border shadow-sm"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* SUBMIT BUTTON */}
                            <button
                                onClick={handleAddMoney}
                                disabled={loading}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#004296] to-blue-600 hover:from-[#003380] hover:to-blue-700 text-white font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transform hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        {paymentType === "gateway" ? (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Pay ₹{amount || "0"}
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Submit Payment ₹{amount || "0"}
                                            </>
                                        )}
                                    </span>
                                )}
                            </button>
                        </div>
                    )}

                    {/* TRANSACTION HISTORY */}
                    {activeTab === "history" && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
                            
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 text-lg">
                                        Transaction History
                                    </h3>
                                    {transactionHistoryData.length > 0 && (
                                        <span className="text-sm text-gray-400">
                                            {transactionHistoryData.length} transactions
                                        </span>
                                    )}
                                </div>
                            </div>

                            {loadingHistory ? (
                                <div className="p-12 text-center">
                                    <svg className="animate-spin w-8 h-8 text-[#004296] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    <p className="text-gray-400">Loading transactions...</p>
                                </div>
                            ) : transactionHistoryData.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {transactionHistoryData.map((txn, index) => (
                                        <div
                                            key={txn.id || txn._id || index}
                                            className="p-5 hover:bg-gray-50/50 transition-colors group"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    {/* Icon */}
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
                                                        txn.type === "credit"
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-rose-50 text-rose-600"
                                                    }`}>
                                                        {getTransactionIcon(txn.type, txn.method)}
                                                    </div>

                                                    {/* Details */}
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <p className="font-semibold text-gray-800 truncate">
                                                                {txn.title || "Transaction"}
                                                            </p>
                                                            {getStatusBadge(txn.status)}
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {getMethodDisplay(txn.method)} • {formatDate(txn.createdAt)} • {formatTime(txn.createdAt)}
                                                        </p>
                                                        {txn.reject_reason && (
                                                            <p className="text-xs text-rose-500 mt-1">
                                                                Reason: {txn.reject_reason}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Amount */}
                                                <div className="text-right flex-shrink-0">
                                                    <p className={`text-lg font-bold ${
                                                        txn.type === "credit" ? "text-emerald-600" : "text-rose-600"
                                                    }`}>
                                                        {txn.type === "credit" ? "+" : "−"} ₹{parseFloat(txn.amount).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="text-5xl mb-4">📭</div>
                                    <p className="text-gray-500 font-medium">No transactions yet</p>
                                    <p className="text-gray-400 text-sm mt-1">Your transaction history will appear here</p>
                                    <button
                                        onClick={fetchTransactionHistory}
                                        className="mt-4 text-[#004296] font-medium text-sm hover:underline"
                                    >
                                        Refresh
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {/* Animation styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default Credits;