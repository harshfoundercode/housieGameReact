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

//             if (response && response.data && Array.isArray(response.data)) {
//                 setTransactionHistoryData(response.data);
//             } else if (response && Array.isArray(response)) {
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
//         // {
//         //     id: "gateway",
//         //     name: "Online Payment",
//         //     description: "Pay securely via payment gateway",
//         //     icon: (
//         //         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
//         //         </svg>
//         //     ),
//         // },
//         {
//             id: "manual",
//             name: "Manual Payment",
//             description: "Pay via UPI & upload screenshot",
//             icon: (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//             ),
//         },
//     ];

//     const quickAmounts = [
//         { value: 200, label: "₹200" },
//         { value: 500, label: "₹500" },
//         { value: 1000, label: "₹1,000" },
//         { value: 2000, label: "₹2,000" },
//         { value: 5000, label: "₹5,000" },
//     ];

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
//             } else {
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
//         const date = new Date(dateString.replace(" ", "T"));
//         if (isNaN(date.getTime())) return "";
//         return date.toLocaleTimeString("en-IN", {
//             hour: "2-digit",
//             minute: "2-digit",
//         });
//     };

//     // =========================
//     // TRANSACTION HELPERS
//     // =========================

//     const getTransactionIcon = (type, method) => {
//         if (type === "credit") {
//             if (method === "referral") return "🤝";
//             if (method === "bonus") return "🎁";
//             return "↓";
//         }
//         return "↑";
//     };

//     const getMethodDisplay = (method) => {
//         const methods = {
//             referral: "Referral Bonus",
//             bonus: "Bonus",
//             gateway: "Online Payment",
//             manual: "Manual Payment",
//             UPI: "UPI Payment",
//             wallet: "Wallet",
//         };
//         return methods[method] || method?.toUpperCase() || "Wallet";
//     };

//     const getStatusBadge = (status) => {
//         const statusStyles = {
//             completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
//             success: "bg-emerald-50 text-emerald-700 border-emerald-200",
//             pending: "bg-amber-50 text-amber-700 border-amber-200",
//             approved: "bg-sky-50 text-sky-700 border-sky-200",
//             failed: "bg-rose-50 text-rose-700 border-rose-200",
//             rejected: "bg-rose-50 text-rose-700 border-rose-200",
//         };

//         const statusLabels = {
//             completed: "Completed",
//             success: "Success",
//             pending: "Pending",
//             approved: "Approved",
//             failed: "Failed",
//             rejected: "Rejected",
//         };

//         const style = statusStyles[status?.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200";
//         const label = statusLabels[status?.toLowerCase()] || status || "Unknown";

//         return (
//             <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${style}`}>
//                 {label}
//             </span>
//         );
//     };

//     // =========================
//     // RENDER
//     // =========================

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex flex-col">
//             <Navbar />

//             <main className="grow pt-24 md:pt-28 pb-16 px-4">
//                 <div className="max-w-4xl mx-auto">

//                     {/* HEADER */}
//                     <div className="mb-8 text-center md:text-left">
//                         <h1 className="text-4xl font-bold bg-gradient-to-r from-[#004296] to-blue-600 bg-clip-text text-transparent">
//                             Wallet & Credits
//                         </h1>
//                         <p className="text-gray-500 mt-2 text-lg">
//                             Manage your funds and transactions
//                         </p>
//                     </div>

//                     {/* BALANCE CARD */}
//                     <div className="relative overflow-hidden bg-gradient-to-br from-[#004296] via-blue-700 to-blue-600 rounded-3xl p-8 mb-8 text-white shadow-xl shadow-blue-200">
//                         {/* Decorative circles */}
//                         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
//                         <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                        
//                         <div className="relative">
//                             <div className="flex items-center justify-between mb-6">
//                                 <div>
//                                     <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
//                                         Available Balance
//                                     </p>
//                                     <p className="text-5xl md:text-6xl font-bold mt-2 tracking-tight">
//                                         {loadingBalance ? (
//                                             <span className="animate-pulse opacity-70">₹ ---</span>
//                                         ) : (
//                                             `₹${currentBalance.toLocaleString("en-IN", {
//                                                 minimumFractionDigits: 2,
//                                                 maximumFractionDigits: 2,
//                                             })}`
//                                         )}
//                                     </p>
//                                 </div>
                                
//                                 <button 
//                                     onClick={refreshWalletBalance}
//                                     className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur-sm"
//                                     title="Refresh Balance"
//                                 >
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                                     </svg>
//                                 </button>
//                             </div>
                            
//                             <div className="flex items-center gap-2 text-blue-100 text-sm">
//                                 <span className="inline-block w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
//                                 Account Active
//                             </div>
//                         </div>
//                     </div>

//                     {/* TABS */}
//                     <div className="flex bg-white rounded-2xl p-1.5 mb-8 shadow-sm border border-gray-100">
//                         <button
//                             onClick={() => setActiveTab("add")}
//                             className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
//                                 activeTab === "add"
//                                     ? "bg-[#004296] text-white shadow-lg shadow-blue-200"
//                                     : "text-gray-500 hover:text-gray-700"
//                             }`}
//                         >
//                             <span className="flex items-center justify-center gap-2">
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                 </svg>
//                                 Add Money
//                             </span>
//                         </button>

//                         <button
//                             onClick={() => setActiveTab("history")}
//                             className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
//                                 activeTab === "history"
//                                     ? "bg-[#004296] text-white shadow-lg shadow-blue-200"
//                                     : "text-gray-500 hover:text-gray-700"
//                             }`}
//                         >
//                             <span className="flex items-center justify-center gap-2">
//                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
//                                 </svg>
//                                 History
//                             </span>
//                         </button>
//                     </div>

//                     {/* ADD MONEY SCREEN */}
//                     {activeTab === "add" && (
//                         <div className="space-y-6 animate-fadeIn">

//                             {/* AMOUNT INPUT */}
//                             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                                 <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
//                                     Enter Amount
//                                 </label>
                                
//                                 <div className="relative">
//                                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl font-medium">
//                                         ₹
//                                     </span>
//                                     <input
//                                         type="number"
//                                         value={amount}
//                                         onChange={(e) => setAmount(e.target.value)}
//                                         placeholder="0.00"
//                                         min="100"
//                                         className="w-full pl-10 pr-4 py-4 rounded-xl border-2 border-gray-100 outline-none text-2xl font-bold text-gray-800 focus:border-[#004296] focus:ring-4 focus:ring-blue-50 transition-all"
//                                     />
//                                 </div>

//                                 <p className="text-gray-400 text-sm mt-2">Minimum amount: ₹100</p>

//                                 <div className="flex flex-wrap gap-3 mt-5">
//                                     {quickAmounts.map((item) => (
//                                         <button
//                                             key={item.value}
//                                             onClick={() => setAmount(item.value.toString())}
//                                             className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
//                                                 parseFloat(amount) === item.value
//                                                     ? "bg-[#004296] text-white shadow-lg shadow-blue-200 scale-105"
//                                                     : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:scale-105"
//                                             }`}
//                                         >
//                                             {item.label}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* PAYMENT METHODS */}
//                             <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//                                 <label className="block text-gray-700 font-semibold mb-4 text-sm uppercase tracking-wide">
//                                     Payment Method
//                                 </label>

//                                 <div className="grid gap-3">
//                                     {paymentMethods.map((method) => (
//                                         <label
//                                             key={method.id}
//                                             className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
//                                                 paymentType === method.id
//                                                     ? "border-[#004296] bg-blue-50/50 shadow-md"
//                                                     : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
//                                             }`}
//                                         >
//                                             <div className={`p-2.5 rounded-xl transition-colors ${
//                                                 paymentType === method.id ? "bg-[#004296] text-white" : "bg-gray-100 text-gray-500"
//                                             }`}>
//                                                 {method.icon}
//                                             </div>
                                            
//                                             <div className="flex-1">
//                                                 <p className="font-semibold text-gray-800">{method.name}</p>
//                                                 <p className="text-sm text-gray-500">{method.description}</p>
//                                             </div>

//                                             <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
//                                                 paymentType === method.id
//                                                     ? "border-[#004296] bg-[#004296]"
//                                                     : "border-gray-300"
//                                             }`}>
//                                                 {paymentType === method.id && (
//                                                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//                                                     </svg>
//                                                 )}
//                                             </div>
                                            
//                                             <input
//                                                 type="radio"
//                                                 value={method.id}
//                                                 checked={paymentType === method.id}
//                                                 onChange={(e) => setPaymentType(e.target.value)}
//                                                 className="hidden"
//                                             />
//                                         </label>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* MANUAL PAYMENT QR */}
//                             {paymentType === "manual" && (
//                                 <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-fadeIn">
//                                     <h3 className="font-semibold text-gray-800 mb-6 text-lg">
//                                         Scan & Pay
//                                     </h3>

//                                     <div className="flex flex-col items-center">
//                                         <div className="relative">
//                                             {qrCode ? (
//                                                 <img
//                                                     src={qrCode}
//                                                     alt="QR Code"
//                                                     className="w-56 h-56 object-contain rounded-2xl border-2 border-gray-100 shadow-lg"
//                                                 />
//                                             ) : (
//                                                 <div className="w-56 h-56 flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
//                                                     <div className="text-center">
//                                                         <div className="animate-spin text-3xl mb-2">⏳</div>
//                                                         <p className="text-sm text-gray-400">Loading QR...</p>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>

//                                         <p className="text-center text-gray-500 text-sm mt-4 max-w-sm">
//                                             Open any UPI app and scan this QR code to make payment
//                                         </p>

//                                         <div className="w-full mt-6 pt-6 border-t border-gray-100">
//                                             <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
//                                                 Upload Screenshot
//                                             </label>
                                            
//                                             <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-[#004296] hover:bg-blue-50/30 transition-all">
//                                                 {screenshot ? (
//                                                     <div className="flex items-center gap-2 text-emerald-600">
//                                                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                                         </svg>
//                                                         <span className="font-medium">Screenshot selected</span>
//                                                     </div>
//                                                 ) : (
//                                                     <div className="text-center">
//                                                         <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                                         </svg>
//                                                         <p className="text-gray-500 text-sm">Click to upload</p>
//                                                     </div>
//                                                 )}
//                                                 <input
//                                                     type="file"
//                                                     accept="image/*"
//                                                     onChange={(e) => setScreenshot(e.target.files[0])}
//                                                     className="hidden"
//                                                 />
//                                             </label>
//                                         </div>

//                                         {screenshot && (
//                                             <div className="mt-4">
//                                                 <img
//                                                     src={URL.createObjectURL(screenshot)}
//                                                     alt="Preview"
//                                                     className="w-32 h-32 object-cover rounded-xl border shadow-sm"
//                                                 />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* SUBMIT BUTTON */}
//                             <button
//                                 onClick={handleAddMoney}
//                                 disabled={loading}
//                                 className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#004296] to-blue-600 hover:from-[#003380] hover:to-blue-700 text-white font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transform hover:-translate-y-0.5"
//                             >
//                                 {loading ? (
//                                     <span className="flex items-center justify-center gap-3">
//                                         <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                                         </svg>
//                                         Processing...
//                                     </span>
//                                 ) : (
//                                     <span className="flex items-center justify-center gap-2">
//                                         {paymentType === "gateway" ? (
//                                             <>
//                                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//                                                 </svg>
//                                                 Pay ₹{amount || "0"}
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                 </svg>
//                                                 Submit Payment ₹{amount || "0"}
//                                             </>
//                                         )}
//                                     </span>
//                                 )}
//                             </button>
//                         </div>
//                     )}

//                     {/* TRANSACTION HISTORY */}
//                     {activeTab === "history" && (
//                         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
                            
//                             {/* Header */}
//                             <div className="p-6 border-b border-gray-100">
//                                 <div className="flex items-center justify-between">
//                                     <h3 className="font-semibold text-gray-800 text-lg">
//                                         Transaction History
//                                     </h3>
//                                     {transactionHistoryData.length > 0 && (
//                                         <span className="text-sm text-gray-400">
//                                             {transactionHistoryData.length} transactions
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>

//                             {loadingHistory ? (
//                                 <div className="p-12 text-center">
//                                     <svg className="animate-spin w-8 h-8 text-[#004296] mx-auto mb-4" fill="none" viewBox="0 0 24 24">
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                                     </svg>
//                                     <p className="text-gray-400">Loading transactions...</p>
//                                 </div>
//                             ) : transactionHistoryData.length > 0 ? (
//                                 <div className="divide-y divide-gray-50">
//                                     {transactionHistoryData.map((txn, index) => (
//                                         <div
//                                             key={txn.id || txn._id || index}
//                                             className="p-5 hover:bg-gray-50/50 transition-colors group"
//                                         >
//                                             <div className="flex items-center justify-between gap-4">
//                                                 <div className="flex items-center gap-4">
//                                                     {/* Icon */}
//                                                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
//                                                         txn.type === "credit"
//                                                             ? "bg-emerald-50 text-emerald-600"
//                                                             : "bg-rose-50 text-rose-600"
//                                                     }`}>
//                                                         {getTransactionIcon(txn.type, txn.method)}
//                                                     </div>

//                                                     {/* Details */}
//                                                     <div className="min-w-0">
//                                                         <div className="flex items-center gap-2 flex-wrap">
//                                                             <p className="font-semibold text-gray-800 truncate">
//                                                                 {txn.title || "Transaction"}
//                                                             </p>
//                                                             {getStatusBadge(txn.status)}
//                                                         </div>
//                                                         <p className="text-sm text-gray-500 mt-1">
//                                                             {getMethodDisplay(txn.method)} • {formatDate(txn.createdAt)} • {formatTime(txn.createdAt)}
//                                                         </p>
//                                                         {txn.reject_reason && (
//                                                             <p className="text-xs text-rose-500 mt-1">
//                                                                 Reason: {txn.reject_reason}
//                                                             </p>
//                                                         )}
//                                                     </div>
//                                                 </div>

//                                                 {/* Amount */}
//                                                 <div className="text-right flex-shrink-0">
//                                                     <p className={`text-lg font-bold ${
//                                                         txn.type === "credit" ? "text-emerald-600" : "text-rose-600"
//                                                     }`}>
//                                                         {txn.type === "credit" ? "+" : "−"} ₹{parseFloat(txn.amount).toFixed(2)}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             ) : (
//                                 <div className="p-12 text-center">
//                                     <div className="text-5xl mb-4">📭</div>
//                                     <p className="text-gray-500 font-medium">No transactions yet</p>
//                                     <p className="text-gray-400 text-sm mt-1">Your transaction history will appear here</p>
//                                     <button
//                                         onClick={fetchTransactionHistory}
//                                         className="mt-4 text-[#004296] font-medium text-sm hover:underline"
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

//             {/* Animation styles */}
//             <style jsx>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(10px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 .animate-fadeIn {
//                     animation: fadeIn 0.3s ease-out;
//                 }
//             `}</style>
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
    const [paymentType, setPaymentType] = useState("manual");
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
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Submit Payment ₹{amount || "0"}
                                    </span>
                                )}
                            </button>
                        </div>
                    )}

                    {/* TRANSACTION HISTORY - WITH SCREENSHOT */}
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
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-4 flex-1">
                                                    {/* Icon */}
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 ${
                                                        txn.type === "credit"
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-rose-50 text-rose-600"
                                                    }`}>
                                                        {getTransactionIcon(txn.type, txn.method)}
                                                    </div>

                                                    {/* Details */}
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <p className="font-semibold text-gray-800 truncate">
                                                                {txn.title || "Transaction"}
                                                            </p>
                                                            {getStatusBadge(txn.status)}
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {getMethodDisplay(txn.method)} • {formatDate(txn.createdAt)} • {formatTime(txn.createdAt)}
                                                        </p>
                                                        
                                                        {/* SCREENSHOT - NEW */}
                                                        {txn.screenshot && (
                                                            <div className="mt-2 flex items-center gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        // Open screenshot in new tab
                                                                        window.open(txn.screenshot, '_blank');
                                                                    }}
                                                                    className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 hover:underline transition-all"
                                                                >
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                    View Screenshot
                                                                </button>
                                                                {/* Thumbnail */}
                                                                <img 
                                                                    src={txn.screenshot} 
                                                                    alt="Payment screenshot"
                                                                    className="w-12 h-12 object-cover rounded-lg border cursor-pointer hover:shadow-md transition-all"
                                                                    onClick={() => window.open(txn.screenshot, '_blank')}
                                                                />
                                                            </div>
                                                        )}
                                                        
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