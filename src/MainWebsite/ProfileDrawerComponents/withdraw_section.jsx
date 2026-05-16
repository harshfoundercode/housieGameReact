
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Navbar from "../HomeComponents/nav_bar";
// // import Footer from "../HomeComponents/footer";
// // import { API } from '../../services/api_url';

// // const Withdraw = () => {
// //   const navigate = useNavigate();
// //   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
// //   const [selectedMethod, setSelectedMethod] = useState(null);
// //   const [withdrawAmount, setWithdrawAmount] = useState("");
// //   const [error, setError] = useState("");
// //   const [success, setSuccess] = useState("");
// //   const [loading, setLoading] = useState(true);
  
// //   // State for KYC data
// //   const [kycData, setKycData] = useState(null);
// //   const [walletBalance, setWalletBalance] = useState(0);
  
// //   // Static data - Withdrawal settings
// //   const [withdrawalSettings] = useState({
// //     minAmount: 100,
// //     maxAmount: 50000,
// //     processingFee: 0,
// //     processingTime: "24-48 hours",
// //   });
  
// //   // State for withdrawal history
// //   const [withdrawalHistory, setWithdrawalHistory] = useState([]);
// //   const [historyLoading, setHistoryLoading] = useState(true);

// //   // Helper function to handle API responses
// //   const handleApiResponse = async (response) => {
// //     const data = await response.json();
// //     if (!response.ok) {
// //       throw new Error(data?.message || `HTTP error! status: ${response.status}`);
// //     }
// //     return data;
// //   };

// //   // Fetch KYC data on component mount
// //   useEffect(() => {
// //     fetchKYCData();
// //     fetchWalletBalance();
// //     fetchWithdrawalHistory();
// //   }, []);

// //   const fetchKYCData = async () => {
// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
      
// //       const response = await fetch(`${API.GET_KYC_URL}`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': token ? `Bearer ${token}` : '',
// //         },
// //       });

// //       const result = await handleApiResponse(response);
// //       console.log("KYC Data Response:", result);

// //       if (result.success && result.data) {
// //         setKycData(result.data);
// //         setError("");
// //       } else {
// //         setError("Please complete your KYC to withdraw funds");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching KYC data:", error);
// //       setError("Failed to fetch KYC data. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchWalletBalance = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
      
// //       const response = await fetch(`${API.PROFILE_URL}`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': token ? `Bearer ${token}` : '',
// //         },
// //       });

// //       const result = await handleApiResponse(response);
// //       console.log("Wallet Balance Response:", result);

// //       if (result.success) {
// //         setWalletBalance(result.data.total_balance || 0);
// //       } else {
// //         setWalletBalance(0);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching wallet balance:", error);
// //       setWalletBalance(0);
// //       setError("Failed to fetch wallet balance. Please refresh the page.");
// //     }
// //   };

// //   const fetchWithdrawalHistory = async () => {
// //     setHistoryLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
      
// //       const response = await fetch(`${API.WITHDRAWAL_HISTORY_URL}`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': token ? `Bearer ${token}` : '',
// //         },
// //       });

// //       const result = await handleApiResponse(response);
// //       console.log("Withdrawal History Response:", result);

// //       if (result.success && result.data) {
// //         setWithdrawalHistory(result.data);
// //       } else {
// //         // Fallback to empty array if no data
// //         setWithdrawalHistory([]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching withdrawal history:", error);
     
// //     } finally {
// //       setHistoryLoading(false);
// //     }
// //   };

// //   const handleWithdrawRequest = async () => {
// //     // Clear previous messages
// //     setError("");
// //     setSuccess("");

// //     // Validate amount
// //     const amount = parseFloat(withdrawAmount);
// //     if (isNaN(amount) || amount <= 0) {
// //       setError("Please enter a valid amount");
// //       return;
// //     }

// //     if (amount < withdrawalSettings.minAmount) {
// //       setError(`Minimum withdrawal amount is ₹${withdrawalSettings.minAmount}`);
// //       return;
// //     }

// //     if (amount > withdrawalSettings.maxAmount) {
// //       setError(`Maximum withdrawal amount is ₹${withdrawalSettings.maxAmount}`);
// //       return;
// //     }

// //     if (amount > walletBalance) {
// //       setError("Insufficient balance");
// //       return;
// //     }

// //     if (!selectedMethod) {
// //       setError("Please select a withdrawal method");
// //       return;
// //     }

// //     if (kycData?.status !== 'approved') {
// //       setError("Your KYC is not approved. Please complete KYC verification first.");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const token = localStorage.getItem("token");
      
// //       // Format the request body according to API specification
// //       const withdrawalData = {
// //         amount: amount,
// //         method: selectedMethod.type
// //       };

// //       console.log("Sending withdrawal request:", withdrawalData);
// //       console.log("To endpoint:", API.requestWithdrawal);

// //       const response = await fetch(`${API.requestWithdrawal}`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': token ? `Bearer ${token}` : '',
// //         },
// //         body: JSON.stringify(withdrawalData),
// //       });

// //       const result = await handleApiResponse(response);
// //       console.log("Withdrawal Response:", result);

// //       if (response.ok && result.success !== false) {
// //         setSuccess(`Withdrawal request of ₹${amount.toLocaleString()} submitted successfully! Your request will be processed within ${withdrawalSettings.processingTime}.`);
// //         setShowWithdrawModal(false);
// //         setWithdrawAmount("");
// //         setSelectedMethod(null);
// //         setError("");
        
// //         // Refresh wallet balance and history
// //         await fetchWalletBalance();
// //         await fetchWithdrawalHistory();
        
// //         // Close success message after 5 seconds
// //         setTimeout(() => setSuccess(""), 5000);
// //       } else {
// //         setError(result.message || result.error || "Withdrawal request failed. Please try again.");
// //       }
// //     } catch (error) {
// //       console.error("Error requesting withdrawal:", error);
// //       setError(error.message || "Network error. Please check your connection and try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getStatusBadge = (status) => {
// //     const statusConfig = {
// //       pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
// //       processing: { color: "bg-blue-100 text-blue-800", label: "Processing" },
// //       completed: { color: "bg-green-100 text-green-800", label: "Completed" },
// //       rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
// //       failed: { color: "bg-red-100 text-red-800", label: "Failed" },
// //     };
// //     const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
// //     return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return "N/A";
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString("en-IN", {
// //       day: "2-digit",
// //       month: "2-digit",
// //       year: "numeric",
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   // Get bank account method from KYC
// //   const getBankMethod = () => {
// //     if (kycData && kycData.account_number && kycData.bank_name) {
// //       return {
// //         id: 1,
// //         type: "bank",
// //         accountHolderName: kycData.account_holder_name,
// //         bankName: kycData.bank_name,
// //         accountNumber: `XXXX${kycData.account_number.slice(-4)}`,
// //         ifscCode: kycData.ifsc_code,
// //       };
// //     }
// //     return null;
// //   };

// //   // Get UPI method from KYC
// //   const getUPIMethod = () => {
// //     if (kycData && kycData.upi_id) {
// //       return {
// //         id: 2,
// //         type: "upi",
// //         upiId: kycData.upi_id,
// //       };
// //     }
// //     return null;
// //   };

// //   // Get available withdrawal methods
// //   const getWithdrawalMethods = () => {
// //     const methods = [];
// //     const bankMethod = getBankMethod();
// //     const upiMethod = getUPIMethod();
    
// //     if (bankMethod) methods.push(bankMethod);
// //     if (upiMethod) methods.push(upiMethod);
    
// //     return methods;
// //   };

// //   const withdrawalMethods = getWithdrawalMethods();
// //   const hasAnyMethod = withdrawalMethods.length > 0;

// //   if (loading && !kycData) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex flex-col">
// //         <Navbar />
// //         <div className="flex-grow flex items-center justify-center">
// //           <div className="text-center">
// //             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296]"></div>
// //             <p className="text-gray-500 mt-4">Loading withdrawal data...</p>
// //           </div>
// //         </div>
// //         <Footer />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col">
// //       <Navbar />

// //       <main className="grow pt-24 md:pt-25 pb-12 px-4">
// //         <div className="max-w-6xl mx-auto">
          
// //           {/* Success/Error Messages */}
// //           {success && (
// //             <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
// //               <div className="flex items-center gap-2">
// //                 <span className="text-green-600">✓</span>
// //                 <p className="text-green-700 text-sm">{success}</p>
// //               </div>
// //             </div>
// //           )}
// //           {error && (
// //             <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
// //               <div className="flex items-center gap-2">
// //                 <span className="text-red-600">⚠</span>
// //                 <p className="text-red-700 text-sm">{error}</p>
// //               </div>
// //             </div>
// //           )}

// //           {/* Wallet Balance Card */}
// //           <div className="bg-gradient-to-r from-[#004296] to-[#003380] rounded-2xl p-6 mb-6 text-white shadow-lg">
// //             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
// //               <div>
// //                 <p className="text-white/80 text-sm mb-1 flex items-center gap-1">
// //                   <span>💰</span> Available Balance
// //                 </p>
// //                 <h2 className="text-3xl md:text-4xl font-bold">₹{walletBalance.toLocaleString()}</h2>
// //                 <p className="text-white/60 text-xs mt-2">
// //                   Min withdrawal: ₹{withdrawalSettings.minAmount} | Max: ₹{withdrawalSettings.maxAmount}
// //                 </p>
// //               </div>
// //               <button
// //                 onClick={() => setShowWithdrawModal(true)}
// //                 disabled={walletBalance < withdrawalSettings.minAmount || !hasAnyMethod}
// //                 className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
// //                   walletBalance < withdrawalSettings.minAmount || !hasAnyMethod
// //                     ? "bg-gray-400 cursor-not-allowed"
// //                     : "bg-[#FBEFA4] text-[#004296] hover:bg-[#FFE44D] shadow-lg"
// //                 }`}
// //               >
// //                 💸 Withdraw Now
// //               </button>
// //             </div>
// //           </div>

// //           {/* Two Column Layout */}
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
// //             {/* Withdrawal Methods Section - Readonly from KYC */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //               <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
// //                 <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
// //                   <span>💳</span> Withdrawal Methods
// //                 </h3>
// //                 <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
// //                   Verified from KYC
// //                 </span>
// //               </div>

// //               {/* Info Banner */}
// //               <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
// //                 <p className="text-xs text-blue-800 flex items-center gap-1">
// //                   <span>ℹ️</span> Your withdrawal methods are fetched from your KYC details. 
// //                   To update these, please update your KYC information.
// //                 </p>
// //               </div>

// //               {!hasAnyMethod ? (
// //                 <div className="text-center py-8">
// //                   <span className="text-4xl block mb-3">⚠️</span>
// //                   <p className="text-gray-500 text-sm">No withdrawal methods found</p>
// //                   <p className="text-gray-400 text-xs mt-1">Please complete your KYC with bank account or UPI details</p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-3">
// //                   {/* Bank Account Section - Readonly */}
// //                   {getBankMethod() && (
// //                     <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
// //                       <div className="flex justify-between items-start">
// //                         <div className="flex-1">
// //                           <div className="flex items-center gap-2 mb-2">
// //                             <span className="text-xl">🏦</span>
// //                             <span className="font-semibold text-gray-800">
// //                               {kycData?.bank_name}
// //                             </span>
// //                             <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
// //                               KYC Verified
// //                             </span>
// //                           </div>
// //                           <p className="text-sm text-gray-700 font-medium">
// //                             {kycData?.account_holder_name}
// //                           </p>
// //                           <p className="text-xs text-gray-500 mt-1">
// //                             Account: XXXX{kycData?.account_number?.slice(-4)} | IFSC: {kycData?.ifsc_code}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}

// //                   {/* UPI Section - Readonly */}
// //                   {getUPIMethod() && (
// //                     <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
// //                       <div className="flex justify-between items-start">
// //                         <div className="flex-1">
// //                           <div className="flex items-center gap-2 mb-2">
// //                             <span className="text-xl">📱</span>
// //                             <span className="font-semibold text-gray-800">
// //                               UPI ID
// //                             </span>
// //                             <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
// //                               KYC Verified
// //                             </span>
// //                           </div>
// //                           <p className="text-sm text-gray-700 font-mono">{kycData?.upi_id}</p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>
// //               )}

// //               {/* KYC Status */}
// //               {kycData && (
// //                 <div className="mt-4 pt-3 border-t border-gray-200">
// //                   <div className="flex items-center justify-between text-xs">
// //                     <span className="text-gray-500">KYC Status:</span>
// //                     <span className={`font-medium ${kycData.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>
// //                       {kycData.status === 'approved' ? 'Verified' : kycData.status === 'pending' ? 'Pending Verification' : 'Not Verified'}
// //                     </span>
// //                   </div>
// //                   {kycData.status !== 'approved' && (
// //                     <p className="text-xs text-red-500 mt-2">
// //                       Please ensure your KYC is approved to withdraw funds
// //                     </p>
// //                   )}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Withdrawal History Section */}
// //             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
// //               <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
// //                 <span>📜</span> Withdrawal History
// //               </h3>
              
// //               {historyLoading ? (
// //                 <div className="text-center py-8">
// //                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004296]"></div>
// //                   <p className="text-gray-500 text-sm mt-2">Loading history...</p>
// //                 </div>
// //               ) : withdrawalHistory.length === 0 ? (
// //                 <div className="text-center py-8">
// //                   <span className="text-4xl block mb-3">📜</span>
// //                   <p className="text-gray-500 text-sm">No withdrawal history</p>
// //                   <p className="text-gray-400 text-xs mt-1">Your withdrawal requests will appear here</p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
// //                   {withdrawalHistory.map((withdrawal) => (
// //                     <div
// //                       key={withdrawal.id || withdrawal._id}
// //                       className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
// //                     >
// //                       <div className="flex justify-between items-start mb-2">
// //                         <div>
// //                           <p className="font-bold text-gray-800 text-lg">
// //                             ₹{withdrawal.amount?.toLocaleString()}
// //                           </p>
// //                           <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
// //                             <span>🕐</span> {formatDate(withdrawal.created_at || withdrawal.createdAt)}
// //                           </p>
// //                         </div>
// //                         {getStatusBadge(withdrawal.status)}
// //                       </div>
// //                       <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
// //                         <p className="flex items-center gap-1">
// //                           <span>🏦</span> 
// //                           Method: {withdrawal.method_type || withdrawal.method === "bank" ? "Bank Transfer" : "UPI"}
// //                           {withdrawal.bankName && (
// //                             <span className="text-gray-600"> - {withdrawal.bankName}</span>
// //                           )}
// //                           {withdrawal.upiId && (
// //                             <span className="text-gray-600"> - {withdrawal.upiId}</span>
// //                           )}
// //                         </p>
// //                         {withdrawal.status === "completed" && withdrawal.transaction_id && (
// //                           <p className="text-green-600 mt-1">
// //                             Transaction ID: {withdrawal.transaction_id}
// //                           </p>
// //                         )}
// //                         {withdrawal.rejection_reason && (
// //                           <p className="text-red-600 mt-1">
// //                             Reason: {withdrawal.rejection_reason}
// //                           </p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </main>

// //       {/* Withdraw Modal */}
// //       {showWithdrawModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
// //           <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
// //             <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 text-white rounded-t-2xl">
// //               <div className="flex justify-between items-center">
// //                 <h3 className="text-lg font-bold flex items-center gap-2">
// //                   <span>💸</span> Request Withdrawal
// //                 </h3>
// //                 <button
// //                   onClick={() => {
// //                     setShowWithdrawModal(false);
// //                     setError("");
// //                     setWithdrawAmount("");
// //                     setSelectedMethod(null);
// //                   }}
// //                   className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
// //                 >
// //                   ✕
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="p-4">
// //               {/* Available Balance */}
// //               <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 mb-4">
// //                 <p className="text-sm text-gray-600">Available Balance</p>
// //                 <p className="text-2xl font-bold text-[#004296]">₹{walletBalance.toLocaleString()}</p>
// //               </div>

// //               {/* Amount Input */}
// //               <div className="mb-4">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Withdrawal Amount *
// //                 </label>
// //                 <div className="relative">
// //                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
// //                   <input
// //                     type="number"
// //                     value={withdrawAmount}
// //                     onChange={(e) => {
// //                       setWithdrawAmount(e.target.value);
// //                       setError("");
// //                     }}
// //                     placeholder={`Min ₹${withdrawalSettings.minAmount} - Max ₹${withdrawalSettings.maxAmount}`}
// //                     className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004296] focus:border-[#004296] outline-none transition-all"
// //                     min={withdrawalSettings.minAmount}
// //                     max={Math.min(withdrawalSettings.maxAmount, walletBalance)}
// //                   />
// //                 </div>
// //                 <div className="flex justify-between mt-1">
// //                   <p className="text-xs text-gray-500">
// //                     Min: ₹{withdrawalSettings.minAmount} | Max: ₹{withdrawalSettings.maxAmount}
// //                   </p>
// //                   {withdrawAmount && !isNaN(withdrawAmount) && (
// //                     <p className="text-xs text-gray-500">
// //                       Processing fee: ₹{withdrawalSettings.processingFee}
// //                     </p>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Withdrawal Method Selection */}
// //               <div className="mb-6">
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Select Withdrawal Method *
// //                 </label>
// //                 <div className="space-y-2">
// //                   {withdrawalMethods.length === 0 ? (
// //                     <div className="text-center p-4 bg-gray-50 rounded-lg">
// //                       <p className="text-sm text-gray-500">No withdrawal methods available</p>
// //                       <p className="text-xs text-gray-400 mt-1">Please complete your KYC with bank account or UPI details</p>
// //                     </div>
// //                   ) : (
// //                     withdrawalMethods.map((method) => (
// //                       <label
// //                         key={method.id}
// //                         className={`flex items-start p-3 border rounded-xl cursor-pointer transition-all ${
// //                           selectedMethod?.id === method.id
// //                             ? "border-[#004296] bg-blue-50 shadow-sm"
// //                             : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
// //                         }`}
// //                       >
// //                         <input
// //                           type="radio"
// //                           name="withdrawalMethod"
// //                           value={method.id}
// //                           checked={selectedMethod?.id === method.id}
// //                           onChange={() => {
// //                             setSelectedMethod(method);
// //                             setError("");
// //                           }}
// //                           className="mt-1 mr-3 accent-[#004296]"
// //                         />
// //                         <div className="flex-1">
// //                           <div className="flex items-center gap-2">
// //                             <span>{method.type === "bank" ? "🏦" : "📱"}</span>
// //                             <p className="font-medium text-gray-800">
// //                               {method.type === "bank" ? method.bankName : "UPI Transfer"}
// //                             </p>
// //                             <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
// //                               Verified
// //                             </span>
// //                           </div>
// //                           <p className="text-xs text-gray-500 mt-1">
// //                             {method.type === "bank"
// //                               ? `${method.accountHolderName} - ${method.accountNumber}`
// //                               : method.upiId}
// //                           </p>
// //                           {method.type === "bank" && method.ifscCode && (
// //                             <p className="text-xs text-gray-400 mt-0.5">
// //                               IFSC: {method.ifscCode}
// //                             </p>
// //                           )}
// //                         </div>
// //                       </label>
// //                     ))
// //                   )}
// //                 </div>
// //               </div>

// //               {/* KYC Info Note */}
// //               {kycData?.status !== 'approved' && (
// //                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
// //                   <p className="text-xs text-red-800">
// //                     ⚠️ Your KYC is {kycData?.status || 'not completed'}. Please complete KYC verification to withdraw funds.
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Info Note */}
// //               <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
// //                 <p className="text-xs text-yellow-800">
// //                   ℹ️ Withdrawals are processed within {withdrawalSettings.processingTime}. 
// //                   Funds will be sent to your registered {selectedMethod?.type === "bank" ? "bank account" : "UPI ID"}.
// //                 </p>
// //               </div>

// //               {/* Error Message */}
// //               {error && (
// //                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
// //                   <p className="text-red-700 text-sm flex items-center gap-2">
// //                     <span>⚠️</span> {error}
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Action Buttons */}
// //               <div className="flex gap-3">
// //                 <button
// //                   onClick={handleWithdrawRequest}
// //                   disabled={loading || !withdrawAmount || !selectedMethod || withdrawalMethods.length === 0 || kycData?.status !== 'approved'}
// //                   className="flex-1 py-2.5 rounded-xl font-semibold bg-[#004296] text-white hover:bg-[#003380] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
// //                 >
// //                   {loading ? (
// //                     <>
// //                       <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// //                       Processing...
// //                     </>
// //                   ) : (
// //                     "Confirm Withdrawal"
// //                   )}
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     setShowWithdrawModal(false);
// //                     setError("");
// //                     setWithdrawAmount("");
// //                     setSelectedMethod(null);
// //                   }}
// //                   className="flex-1 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <Footer />
// //     </div>
// //   );
// // };

// // export default Withdraw;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../HomeComponents/nav_bar";
// import Footer from "../HomeComponents/footer";
// import { API } from '../../services/api_url';

// const Withdraw = () => {
//   const navigate = useNavigate();
//   const [showWithdrawModal, setShowWithdrawModal] = useState(false);
//   const [selectedMethod, setSelectedMethod] = useState(null);
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(true);
  
//   // State for KYC data
//   const [kycData, setKycData] = useState(null);
//   const [walletBalance, setWalletBalance] = useState(0);
  
//   // Static data - Withdrawal settings
//   const [withdrawalSettings] = useState({
//     minAmount: 100,
//     maxAmount: 50000,
//     processingFee: 0,
//     processingTime: "24-48 hours",
//   });
  
//   // State for withdrawal history
//   const [withdrawalHistory, setWithdrawalHistory] = useState([]);
//   const [historyLoading, setHistoryLoading] = useState(true);

//   // Helper function to handle API responses
//   const handleApiResponse = async (response) => {
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data?.message || `HTTP error! status: ${response.status}`);
//     }
//     return data;
//   };

//   // Fetch KYC data on component mount
//   useEffect(() => {
//     fetchKYCData();
//     fetchWalletBalance();
//     fetchWithdrawalHistory();
//   }, []);

//   const fetchKYCData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
      
//       const response = await fetch(`${API.GET_KYC_URL}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : '',
//         },
//       });

//       const result = await handleApiResponse(response);
//       console.log("KYC Data Response:", result);

//       if (result.success && result.data) {
//         setKycData(result.data);
//         setError("");
//       } else {
//         setError("Please complete your KYC to withdraw funds");
//       }
//     } catch (error) {
//       console.error("Error fetching KYC data:", error);
//       setError("Failed to fetch KYC data. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchWalletBalance = async () => {
//     try {
//       const token = localStorage.getItem("token");
      
//       const response = await fetch(`${API.PROFILE_URL}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : '',
//         },
//       });

//       const result = await handleApiResponse(response);
//       console.log("Wallet Balance Response:", result);

//       if (result.success) {
//         setWalletBalance(result.data.total_balance || 0);
//       } else {
//         setWalletBalance(0);
//       }
//     } catch (error) {
//       console.error("Error fetching wallet balance:", error);
//       setWalletBalance(0);
//       setError("Failed to fetch wallet balance. Please refresh the page.");
//     }
//   };

//  const fetchWithdrawalHistory = async () => {
//     setHistoryLoading(true);
//     try {
//       const token = localStorage.getItem("token");
      
//       const response = await fetch(`${API.WITHDRAWAL_HISTORY_URL}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : '',
//         },
//       });

//       const result = await handleApiResponse(response);
//       console.log("Withdrawal History Response:", result);

//       // ✅ FIX: Check for data directly (without success wrapper)
//       if (result.data && Array.isArray(result.data)) {
//         setWithdrawalHistory(result.data);
//       } else if (Array.isArray(result)) {
//         setWithdrawalHistory(result);
//       } else {
//         console.warn("Unexpected response format:", result);
//         setWithdrawalHistory([]);
//       }
//     } catch (error) {
//       console.error("Error fetching withdrawal history:", error);
//       setWithdrawalHistory([]);
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   const handleWithdrawRequest = async () => {
//     // Clear previous messages
//     setError("");
//     setSuccess("");

//     // Validate amount
//     const amount = parseFloat(withdrawAmount);
//     if (isNaN(amount) || amount <= 0) {
//       setError("Please enter a valid amount");
//       return;
//     }

//     if (amount < withdrawalSettings.minAmount) {
//       setError(`Minimum withdrawal amount is ₹${withdrawalSettings.minAmount}`);
//       return;
//     }

//     if (amount > withdrawalSettings.maxAmount) {
//       setError(`Maximum withdrawal amount is ₹${withdrawalSettings.maxAmount}`);
//       return;
//     }

//     if (amount > walletBalance) {
//       setError("Insufficient balance");
//       return;
//     }

//     if (!selectedMethod) {
//       setError("Please select a withdrawal method");
//       return;
//     }

//     if (kycData?.status !== 'verified') {
//       setError("Your KYC is not verified. Please complete KYC verification first.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
      
//       // Format the request body according to API specification
//       const withdrawalData = {
//         amount: amount,
//         method: selectedMethod.type
//       };

//       console.log("Sending withdrawal request:", withdrawalData);
//       console.log("To endpoint:", API.WITHDRAWAL_REQUEST_URL);

//       const response = await fetch(`${API.WITHDRAWAL_REQUEST_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : '',
//         },
//         body: JSON.stringify(withdrawalData),
//       });

//       const result = await handleApiResponse(response);
//       console.log("Withdrawal Response:", result);

//       if (response.ok && result.success !== false) {
//         setSuccess(`Withdrawal request of ₹${amount.toLocaleString()} submitted successfully! Your request will be processed within ${withdrawalSettings.processingTime}.`);
//         setShowWithdrawModal(false);
//         setWithdrawAmount("");
//         setSelectedMethod(null);
//         setError("");
        
//         // Refresh wallet balance and history
//         await fetchWalletBalance();
//         await fetchWithdrawalHistory();
        
//         // Close success message after 5 seconds
//         setTimeout(() => setSuccess(""), 5000);
//       } else {
//         setError(result.message || result.error || "Withdrawal request failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error requesting withdrawal:", error);
//       setError(error.message || "Network error. Please check your connection and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // KYC Status Badge Configuration
//   const getKYCStatusBadge = (status) => {
//     const statusConfig = {
//       pending: { 
//         color: "bg-yellow-100 text-yellow-800 border-yellow-300", 
//         icon: "⏳", 
//         label: "Pending Verification",
//         description: "Your KYC is under review"
//       },
//       rejected: { 
//         color: "bg-red-100 text-red-800 border-red-300", 
//         icon: "❌", 
//         label: "Rejected",
//         description: "Your KYC was rejected. Please resubmit."
//       },
//       verified: { 
//         color: "bg-green-100 text-green-800 border-green-300", 
//         icon: "✅", 
//         label: "Verified",
//         description: "Your KYC is verified"
//       }
//     };
//     return statusConfig[status?.toLowerCase()] || {
//       color: "bg-gray-100 text-gray-800 border-gray-300",
//       icon: "❓",
//       label: "Unknown",
//       description: "KYC status unknown"
//     };
//   };

//   // Check if KYC is verified (allows withdrawal)
//   const isKYCVerified = kycData?.status?.toLowerCase() === 'verified';
  
//   // Check if KYC is pending
//   const isKYCPending = kycData?.status?.toLowerCase() === 'pending';
  
//   // Check if KYC is rejected
//   const isKYCRejected = kycData?.status?.toLowerCase() === 'rejected';

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
//       processing: { color: "bg-blue-100 text-blue-800", label: "Processing" },
//       completed: { color: "bg-green-100 text-green-800", label: "Completed" },
//       rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
//       failed: { color: "bg-red-100 text-red-800", label: "Failed" },
//     };
//     const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
//     return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Get bank account method from KYC
//   const getBankMethod = () => {
//     if (kycData && kycData.account_number && kycData.bank_name) {
//       return {
//         id: 1,
//         type: "bank",
//         accountHolderName: kycData.account_holder_name,
//         bankName: kycData.bank_name,
//         accountNumber: `XXXX${kycData.account_number.slice(-4)}`,
//         ifscCode: kycData.ifsc_code,
//       };
//     }
//     return null;
//   };

//   // Get UPI method from KYC
//   const getUPIMethod = () => {
//     if (kycData && kycData.upi_id) {
//       return {
//         id: 2,
//         type: "upi",
//         upiId: kycData.upi_id,
//       };
//     }
//     return null;
//   };

//   // Get available withdrawal methods
//   const getWithdrawalMethods = () => {
//     const methods = [];
//     const bankMethod = getBankMethod();
//     const upiMethod = getUPIMethod();
    
//     if (bankMethod) methods.push(bankMethod);
//     if (upiMethod) methods.push(upiMethod);
    
//     return methods;
//   };

//   const withdrawalMethods = getWithdrawalMethods();
//   const hasAnyMethod = withdrawalMethods.length > 0;
  
//   // Can withdraw only if KYC is verified AND balance is sufficient AND has method
//   const canWithdraw = isKYCVerified && walletBalance >= withdrawalSettings.minAmount && hasAnyMethod;

//   if (loading && !kycData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         <Navbar />
//         <div className="flex-grow flex items-center justify-center">
//           <div className="text-center">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296]"></div>
//             <p className="text-gray-500 mt-4">Loading withdrawal data...</p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Navbar />

//       <main className="grow pt-24 md:pt-25 pb-12 px-4">
//         <div className="max-w-6xl mx-auto">
          
//           {/* Success/Error Messages */}
//           {success && (
//             <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
//               <div className="flex items-center gap-2">
//                 <span className="text-green-600">✓</span>
//                 <p className="text-green-700 text-sm">{success}</p>
//               </div>
//             </div>
//           )}
//           {error && (
//             <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-red-600">⚠</span>
//                 <p className="text-red-700 text-sm">{error}</p>
//               </div>
//             </div>
//           )}

//           {/* Wallet Balance Card */}
//           <div className="bg-gradient-to-r from-[#004296] to-[#003380] rounded-2xl p-6 mb-6 text-white shadow-lg">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div>
//                 <p className="text-white/80 text-sm mb-1 flex items-center gap-1">
//                   <span>💰</span> Available Balance
//                 </p>
//                 <h2 className="text-3xl md:text-4xl font-bold">₹{walletBalance.toLocaleString()}</h2>
//                 <p className="text-white/60 text-xs mt-2">
//                   Min withdrawal: ₹{withdrawalSettings.minAmount} | Max: ₹{withdrawalSettings.maxAmount}
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowWithdrawModal(true)}
//                 disabled={!canWithdraw}
//                 className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
//                   !canWithdraw
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-[#FBEFA4] text-[#004296] hover:bg-[#FFE44D] shadow-lg"
//                 }`}
//               >
//                 💸 Withdraw Now
//               </button>
//             </div>
//           </div>

//           {/* KYC Status Alert Banner */}
//           {!isKYCVerified && kycData && (
//             <div className={`mb-6 p-4 rounded-xl border ${getKYCStatusBadge(kycData.status).color}`}>
//               <div className="flex items-start gap-3">
//                 <span className="text-2xl">{getKYCStatusBadge(kycData.status).icon}</span>
//                 <div className="flex-1">
//                   <h4 className="font-semibold text-sm">
//                     KYC Status: {getKYCStatusBadge(kycData.status).label}
//                   </h4>
//                   <p className="text-xs mt-1 opacity-80">
//                     {getKYCStatusBadge(kycData.status).description}
//                   </p>
//                   {isKYCPending && (
//                     <p className="text-xs mt-2 opacity-80">
//                       Your KYC verification is in progress. You'll be able to withdraw once verified.
//                     </p>
//                   )}
//                   {isKYCRejected && (
//                     <div className="mt-2">
//                       <p className="text-xs opacity-80 mb-2">
//                         Your KYC was rejected. Please update your KYC details and resubmit for verification.
//                       </p>
//                       <button
//                         onClick={() => navigate('/kyc')}
//                         className="text-xs px-3 py-1.5 bg-white/80 rounded-lg font-medium hover:bg-white transition-all"
//                       >
//                         Update KYC
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Two Column Layout */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
//             {/* Withdrawal Methods Section - Readonly from KYC */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
//                 <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
//                   <span>💳</span> Withdrawal Methods
//                 </h3>
//                 {kycData && (
//                   <span className={`text-xs px-2 py-1 rounded-full border ${getKYCStatusBadge(kycData.status).color}`}>
//                     {getKYCStatusBadge(kycData.status).icon} {getKYCStatusBadge(kycData.status).label}
//                   </span>
//                 )}
//               </div>

//               {/* Info Banner */}
//               <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                 <p className="text-xs text-blue-800 flex items-center gap-1">
//                   <span>ℹ️</span> Your withdrawal methods are fetched from your KYC details. 
//                   To update these, please update your KYC information.
//                 </p>
//               </div>

//               {!hasAnyMethod ? (
//                 <div className="text-center py-8">
//                   <span className="text-4xl block mb-3">⚠️</span>
//                   <p className="text-gray-500 text-sm">No withdrawal methods found</p>
//                   <p className="text-gray-400 text-xs mt-1">Please complete your KYC with bank account or UPI details</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {/* Bank Account Section - Readonly */}
//                   {getBankMethod() && (
//                     <div className={`border rounded-xl p-4 transition-all ${
//                       isKYCVerified ? 'bg-green-50 border-green-200' : 
//                       isKYCPending ? 'bg-yellow-50 border-yellow-200' : 
//                       isKYCRejected ? 'bg-red-50 border-red-200' : 
//                       'bg-gray-50 border-gray-200'
//                     }`}>
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <span className="text-xl">🏦</span>
//                             <span className="font-semibold text-gray-800">
//                               {kycData?.bank_name}
//                             </span>
//                             <span className={`text-xs px-2 py-0.5 rounded-full border ${
//                               isKYCVerified ? 'bg-green-100 text-green-700 border-green-300' :
//                               isKYCPending ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
//                               'bg-red-100 text-red-700 border-red-300'
//                             }`}>
//                               {getKYCStatusBadge(kycData.status).label}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-700 font-medium">
//                             {kycData?.account_holder_name}
//                           </p>
//                           <p className="text-xs text-gray-500 mt-1">
//                             Account: XXXX{kycData?.account_number?.slice(-4)} | IFSC: {kycData?.ifsc_code}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* UPI Section - Readonly */}
//                   {getUPIMethod() && (
//                     <div className={`border rounded-xl p-4 transition-all ${
//                       isKYCVerified ? 'bg-green-50 border-green-200' : 
//                       isKYCPending ? 'bg-yellow-50 border-yellow-200' : 
//                       isKYCRejected ? 'bg-red-50 border-red-200' : 
//                       'bg-gray-50 border-gray-200'
//                     }`}>
//                       <div className="flex justify-between items-start">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <span className="text-xl">📱</span>
//                             <span className="font-semibold text-gray-800">
//                               UPI ID
//                             </span>
//                             <span className={`text-xs px-2 py-0.5 rounded-full border ${
//                               isKYCVerified ? 'bg-green-100 text-green-700 border-green-300' :
//                               isKYCPending ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
//                               'bg-red-100 text-red-700 border-red-300'
//                             }`}>
//                               {getKYCStatusBadge(kycData.status).label}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-700 font-mono">{kycData?.upi_id}</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* KYC Status Summary */}
//               {kycData && (
//                 <div className="mt-4 pt-3 border-t border-gray-200">
//                   <div className="space-y-2">
//                     {/* Status Row */}
//                     <div className="flex items-center justify-between text-xs">
//                       <span className="text-gray-500">KYC Status:</span>
//                       <span className={`font-medium flex items-center gap-1 ${
//                         isKYCVerified ? 'text-green-600' : 
//                         isKYCPending ? 'text-yellow-600' : 
//                         'text-red-600'
//                       }`}>
//                         {getKYCStatusBadge(kycData.status).icon} {getKYCStatusBadge(kycData.status).label}
//                       </span>
//                     </div>
                    
//                     {/* Details Rows */}
//                     {kycData.id_type && (
//                       <div className="flex items-center justify-between text-xs">
//                         <span className="text-gray-500">ID Type:</span>
//                         <span className="font-medium text-gray-700 uppercase">{kycData.id_type}</span>
//                       </div>
//                     )}
//                     {kycData.pancard_number && (
//                       <div className="flex items-center justify-between text-xs">
//                         <span className="text-gray-500">PAN:</span>
//                         <span className="font-medium text-gray-700">{kycData.pancard_number.toUpperCase()}</span>
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Action buttons based on status */}
//                   {isKYCRejected && (
//                     <button
//                       onClick={() => navigate('/kyc')}
//                       className="mt-3 w-full py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-all"
//                     >
//                       Resubmit KYC
//                     </button>
//                   )}
//                   {isKYCPending && (
//                     <p className="text-xs text-blue-600 mt-3 flex items-center gap-1">
//                       <span>⏳</span> Verification in progress - Please check back later
//                     </p>
//                   )}
//                   {!kycData && (
//                     <button
//                       onClick={() => navigate('/kyc')}
//                       className="mt-3 w-full py-2 bg-[#004296] text-white text-sm rounded-lg hover:bg-[#003380] transition-all"
//                     >
//                       Complete KYC
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Withdrawal History Section */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
//               <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
//                 <span>📜</span> Withdrawal History
//               </h3>
              
//               {historyLoading ? (
//                 <div className="text-center py-8">
//                   <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004296]"></div>
//                   <p className="text-gray-500 text-sm mt-2">Loading history...</p>
//                 </div>
//               ) : withdrawalHistory.length === 0 ? (
//                 <div className="text-center py-8">
//                   <span className="text-4xl block mb-3">📜</span>
//                   <p className="text-gray-500 text-sm">No withdrawal history</p>
//                   <p className="text-gray-400 text-xs mt-1">Your withdrawal requests will appear here</p>
//                 </div>
//               ) : (
//                 <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
//                   {withdrawalHistory.map((withdrawal) => (
//                     <div
//                       key={withdrawal.id || withdrawal._id}
//                       className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
//                     >
//                       <div className="flex justify-between items-start mb-2">
//                         <div>
//                           <p className="font-bold text-gray-800 text-lg">
//                             ₹{withdrawal.amount?.toLocaleString()}
//                           </p>
//                           <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
//                             <span>🕐</span> {formatDate(withdrawal.created_at || withdrawal.createdAt)}
//                           </p>
//                         </div>
//                         {getStatusBadge(withdrawal.status)}
//                       </div>
//                       <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
//                         <p className="flex items-center gap-1">
//                           <span>🏦</span> 
//                           Method: {withdrawal.method_type || withdrawal.method === "bank" ? "Bank Transfer" : "UPI"}
//                           {withdrawal.bankName && (
//                             <span className="text-gray-600"> - {withdrawal.bankName}</span>
//                           )}
//                           {withdrawal.upiId && (
//                             <span className="text-gray-600"> - {withdrawal.upiId}</span>
//                           )}
//                         </p>
//                         {withdrawal.status === "completed" && withdrawal.transaction_id && (
//                           <p className="text-green-600 mt-1">
//                             Transaction ID: {withdrawal.transaction_id}
//                           </p>
//                         )}
//                         {withdrawal.rejection_reason && (
//                           <p className="text-red-600 mt-1">
//                             Reason: {withdrawal.rejection_reason}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Withdraw Modal */}
//       {showWithdrawModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
//           <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
//             <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 text-white rounded-t-2xl">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-bold flex items-center gap-2">
//                   <span>💸</span> Request Withdrawal
//                 </h3>
//                 <button
//                   onClick={() => {
//                     setShowWithdrawModal(false);
//                     setError("");
//                     setWithdrawAmount("");
//                     setSelectedMethod(null);
//                   }}
//                   className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>

//             <div className="p-4">
//               {/* Available Balance */}
//               <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 mb-4">
//                 <p className="text-sm text-gray-600">Available Balance</p>
//                 <p className="text-2xl font-bold text-[#004296]">₹{walletBalance.toLocaleString()}</p>
//               </div>

//               {/* Amount Input */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Withdrawal Amount *
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
//                   <input
//                     type="number"
//                     value={withdrawAmount}
//                     onChange={(e) => {
//                       setWithdrawAmount(e.target.value);
//                       setError("");
//                     }}
//                     placeholder={`Min ₹${withdrawalSettings.minAmount} - Max ₹${withdrawalSettings.maxAmount}`}
//                     className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004296] focus:border-[#004296] outline-none transition-all"
//                     min={withdrawalSettings.minAmount}
//                     max={Math.min(withdrawalSettings.maxAmount, walletBalance)}
//                   />
//                 </div>
//                 <div className="flex justify-between mt-1">
//                   <p className="text-xs text-gray-500">
//                     Min: ₹{withdrawalSettings.minAmount} | Max: ₹{withdrawalSettings.maxAmount}
//                   </p>
//                   {withdrawAmount && !isNaN(withdrawAmount) && (
//                     <p className="text-xs text-gray-500">
//                       Processing fee: ₹{withdrawalSettings.processingFee}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Withdrawal Method Selection */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Select Withdrawal Method *
//                 </label>
//                 <div className="space-y-2">
//                   {withdrawalMethods.length === 0 ? (
//                     <div className="text-center p-4 bg-gray-50 rounded-lg">
//                       <p className="text-sm text-gray-500">No withdrawal methods available</p>
//                       <p className="text-xs text-gray-400 mt-1">Please complete your KYC with bank account or UPI details</p>
//                     </div>
//                   ) : (
//                     withdrawalMethods.map((method) => (
//                       <label
//                         key={method.id}
//                         className={`flex items-start p-3 border rounded-xl cursor-pointer transition-all ${
//                           selectedMethod?.id === method.id
//                             ? "border-[#004296] bg-blue-50 shadow-sm"
//                             : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
//                         }`}
//                       >
//                         <input
//                           type="radio"
//                           name="withdrawalMethod"
//                           value={method.id}
//                           checked={selectedMethod?.id === method.id}
//                           onChange={() => {
//                             setSelectedMethod(method);
//                             setError("");
//                           }}
//                           className="mt-1 mr-3 accent-[#004296]"
//                           disabled={!isKYCVerified}
//                         />
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2">
//                             <span>{method.type === "bank" ? "🏦" : "📱"}</span>
//                             <p className="font-medium text-gray-800">
//                               {method.type === "bank" ? method.bankName : "UPI Transfer"}
//                             </p>
//                             <span className={`text-xs px-2 py-0.5 rounded-full border ${
//                               isKYCVerified ? 'bg-green-100 text-green-700 border-green-300' :
//                               isKYCPending ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
//                               'bg-red-100 text-red-700 border-red-300'
//                             }`}>
//                               {getKYCStatusBadge(kycData?.status).label}
//                             </span>
//                           </div>
//                           <p className="text-xs text-gray-500 mt-1">
//                             {method.type === "bank"
//                               ? `${method.accountHolderName} - ${method.accountNumber}`
//                               : method.upiId}
//                           </p>
//                           {method.type === "bank" && method.ifscCode && (
//                             <p className="text-xs text-gray-400 mt-0.5">
//                               IFSC: {method.ifscCode}
//                             </p>
//                           )}
//                         </div>
//                       </label>
//                     ))
//                   )}
//                 </div>
//               </div>

//               {/* KYC Status Warning in Modal */}
//               {!isKYCVerified && kycData && (
//                 <div className={`mb-4 p-3 rounded-lg border ${getKYCStatusBadge(kycData.status).color}`}>
//                   <p className="text-xs flex items-center gap-2">
//                     <span>{getKYCStatusBadge(kycData.status).icon}</span>
//                     {isKYCPending && "Your KYC is under verification. Withdrawal will be available once verified."}
//                     {isKYCRejected && "Your KYC was rejected. Please resubmit your KYC documents."}
//                     {!kycData && "Please complete your KYC to withdraw funds."}
//                   </p>
//                 </div>
//               )}

//               {/* Info Note */}
//               <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                 <p className="text-xs text-yellow-800">
//                   ℹ️ Withdrawals are processed within {withdrawalSettings.processingTime}. 
//                   Funds will be sent to your registered {selectedMethod?.type === "bank" ? "bank account" : "UPI ID"}.
//                 </p>
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//                   <p className="text-red-700 text-sm flex items-center gap-2">
//                     <span>⚠️</span> {error}
//                   </p>
//                 </div>
//               )}

//               {/* Action Buttons */}
//               <div className="flex gap-3">
//                 <button
//                   onClick={handleWithdrawRequest}
//                   disabled={loading || !withdrawAmount || !selectedMethod || withdrawalMethods.length === 0 || !isKYCVerified}
//                   className="flex-1 py-2.5 rounded-xl font-semibold bg-[#004296] text-white hover:bg-[#003380] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                       Processing...
//                     </>
//                   ) : (
//                     "Confirm Withdrawal"
//                   )}
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowWithdrawModal(false);
//                     setError("");
//                     setWithdrawAmount("");
//                     setSelectedMethod(null);
//                   }}
//                   className="flex-1 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default Withdraw;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import { API } from '../../services/api_url';

const Withdraw = () => {
  const navigate = useNavigate();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  
  // State for KYC data
  const [kycData, setKycData] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  
  // Dynamic withdrawal settings from profile API
  const [withdrawalSettings, setWithdrawalSettings] = useState({
    minAmount: 100,  // default fallback
    maxAmount: 50000, // default fallback
    processingFee: 0,
    processingTime: "24-48 hours",
  });
  
  // State for withdrawal history
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  // Helper function to handle API responses
  const handleApiResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data?.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchKYCData();
    fetchWalletBalance();
    fetchWithdrawalHistory();
  }, []);

  const fetchKYCData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API.GET_KYC_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const result = await handleApiResponse(response);
      console.log("KYC Data Response:", result);

      if (result.success && result.data) {
        setKycData(result.data);
        setError("");
      } else {
        setError("Please complete your KYC to withdraw funds");
      }
    } catch (error) {
      console.error("Error fetching KYC data:", error);
      setError("Failed to fetch KYC data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchWalletBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API.PROFILE_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const result = await handleApiResponse(response);
      console.log("Wallet Balance & Settings Response:", result);

      if (result.success && result.data) {
        // Set wallet balance
        const balance = parseFloat(result.data.total_balance) || 0;
        setWalletBalance(balance);
        
        // ✅ Set dynamic withdrawal settings from profile API
        const settings = {
          minAmount: parseFloat(result.data.min_withdraw_amount) || 100,
          maxAmount: parseFloat(result.data.max_withdraw_amount_per_day) || 50000,
          processingFee: parseFloat(result.data.withdrawal_fee) || 0,
          processingTime: result.data.withdrawal_processing_time || "24-48 hours",
        };
        
        console.log("Updated Withdrawal Settings:", settings);
        console.log("Wallet Balance:", balance);
        setWithdrawalSettings(settings);
      } else {
        setWalletBalance(0);
        setError("Failed to fetch wallet information");
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      setWalletBalance(0);
      setError("Failed to fetch wallet balance. Please refresh the page.");
    }
  };

  const fetchWithdrawalHistory = async () => {
    setHistoryLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      const response = await fetch(`${API.WITHDRAWAL_HISTORY_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const result = await handleApiResponse(response);
      console.log("Withdrawal History Response:", result);

      // ✅ FIXED: Handle multiple response formats
      if (result.data && Array.isArray(result.data)) {
        setWithdrawalHistory(result.data);
      } else if (result.success && Array.isArray(result.data)) {
        setWithdrawalHistory(result.data);
      } else if (Array.isArray(result)) {
        setWithdrawalHistory(result);
      } else {
        console.warn("No valid withdrawal history data found:", result);
        setWithdrawalHistory([]);
      }
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
      setWithdrawalHistory([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleWithdrawRequest = async () => {
    // Clear previous messages
    setError("");
    setSuccess("");

    // Validate amount
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amount < withdrawalSettings.minAmount) {
      setError(`Minimum withdrawal amount is ₹${withdrawalSettings.minAmount.toLocaleString()}`);
      return;
    }

    if (amount > withdrawalSettings.maxAmount) {
      setError(`Maximum withdrawal amount per day is ₹${withdrawalSettings.maxAmount.toLocaleString()}`);
      return;
    }

    if (amount > walletBalance) {
      setError(`Insufficient balance. Your available balance is ₹${walletBalance.toLocaleString()}`);
      return;
    }

    if (!selectedMethod) {
      setError("Please select a withdrawal method");
      return;
    }

    if (kycData?.status !== 'verified') {
      setError("Your KYC is not verified. Please complete KYC verification first.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Format the request body
      const withdrawalData = {
        amount: amount,
        method: selectedMethod.type
      };

      console.log("Sending withdrawal request:", withdrawalData);
      console.log("To endpoint:", API.WITHDRAWAL_REQUEST_URL);

      const response = await fetch(`${API.WITHDRAWAL_REQUEST_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(withdrawalData),
      });

      const result = await handleApiResponse(response);
      console.log("Withdrawal Response:", result);

      if (response.ok && result.success !== false) {
        setSuccess(`Withdrawal request of ₹${amount.toLocaleString()} submitted successfully! Your request will be processed within ${withdrawalSettings.processingTime}.`);
        setShowWithdrawModal(false);
        setWithdrawAmount("");
        setSelectedMethod(null);
        setError("");
        
        // Refresh wallet balance and history
        await fetchWalletBalance();
        await fetchWithdrawalHistory();
        
        // Auto close success message after 5 seconds
        setTimeout(() => setSuccess(""), 5000);
      } else {
        setError(result.message || result.error || "Withdrawal request failed. Please try again.");
      }
    } catch (error) {
      console.error("Error requesting withdrawal:", error);
      setError(error.message || "Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  // KYC Status Badge Configuration
  const getKYCStatusBadge = (status) => {
    const statusConfig = {
      pending: { 
        color: "bg-yellow-100 text-yellow-800 border-yellow-300", 
        icon: "⏳", 
        label: "Pending Verification",
        description: "Your KYC is under review"
      },
      rejected: { 
        color: "bg-red-100 text-red-800 border-red-300", 
        icon: "❌", 
        label: "Rejected",
        description: "Your KYC was rejected. Please resubmit."
      },
      verified: { 
        color: "bg-green-100 text-green-800 border-green-300", 
        icon: "✅", 
        label: "Verified",
        description: "Your KYC is verified"
      }
    };
    return statusConfig[status?.toLowerCase()] || {
      color: "bg-gray-100 text-gray-800 border-gray-300",
      icon: "❓",
      label: "Unknown",
      description: "KYC status unknown"
    };
  };

  // KYC Status Checks
  const isKYCVerified = kycData?.status?.toLowerCase() === 'verified';
  const isKYCPending = kycData?.status?.toLowerCase() === 'pending';
  const isKYCRejected = kycData?.status?.toLowerCase() === 'rejected';

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      processing: { color: "bg-blue-100 text-blue-800", label: "Processing" },
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
      failed: { color: "bg-red-100 text-red-800", label: "Failed" },
    };
    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get bank account method from KYC
  const getBankMethod = () => {
    if (kycData && kycData.account_number && kycData.bank_name) {
      return {
        id: 1,
        type: "bank",
        accountHolderName: kycData.account_holder_name,
        bankName: kycData.bank_name,
        accountNumber: `XXXX${kycData.account_number.slice(-4)}`,
        ifscCode: kycData.ifsc_code,
      };
    }
    return null;
  };

  // Get UPI method from KYC
  const getUPIMethod = () => {
    if (kycData && kycData.upi_id) {
      return {
        id: 2,
        type: "upi",
        upiId: kycData.upi_id,
      };
    }
    return null;
  };

  // Get available withdrawal methods
  const getWithdrawalMethods = () => {
    const methods = [];
    const bankMethod = getBankMethod();
    const upiMethod = getUPIMethod();
    
    if (bankMethod) methods.push(bankMethod);
    if (upiMethod) methods.push(upiMethod);
    
    return methods;
  };

  const withdrawalMethods = getWithdrawalMethods();
  const hasAnyMethod = withdrawalMethods.length > 0;
  
  // Can withdraw only if KYC is verified AND balance is sufficient AND has method
  const canWithdraw = isKYCVerified && walletBalance >= withdrawalSettings.minAmount && hasAnyMethod;

  if (loading && !kycData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296]"></div>
            <p className="text-gray-500 mt-4">Loading withdrawal data...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="grow pt-24 md:pt-25 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Success/Error Messages */}
          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <p className="text-green-700 text-sm">{success}</p>
              </div>
            </div>
          )}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <span className="text-red-600">⚠</span>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-r from-[#004296] to-[#003380] rounded-2xl p-6 mb-6 text-white shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-white/80 text-sm mb-1 flex items-center gap-1">
                  <span>💰</span> Available Balance
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">₹{walletBalance.toLocaleString()}</h2>
                <p className="text-white/60 text-xs mt-2">
                  Min: ₹{withdrawalSettings.minAmount.toLocaleString()} | Max per day: ₹{withdrawalSettings.maxAmount.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setShowWithdrawModal(true)}
                disabled={!canWithdraw}
                className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  !canWithdraw
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FBEFA4] text-[#004296] hover:bg-[#FFE44D] shadow-lg"
                }`}
              >
                💸 Withdraw Now
              </button>
            </div>
          </div>

          {/* KYC Status Alert Banner */}
          {!isKYCVerified && kycData && (
            <div className={`mb-6 p-4 rounded-xl border ${getKYCStatusBadge(kycData.status).color}`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getKYCStatusBadge(kycData.status).icon}</span>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">
                    KYC Status: {getKYCStatusBadge(kycData.status).label}
                  </h4>
                  <p className="text-xs mt-1 opacity-80">
                    {getKYCStatusBadge(kycData.status).description}
                  </p>
                  {isKYCPending && (
                    <p className="text-xs mt-2 opacity-80">
                      Your KYC verification is in progress. You'll be able to withdraw once verified.
                    </p>
                  )}
                  {isKYCRejected && (
                    <div className="mt-2">
                      <p className="text-xs opacity-80 mb-2">
                        Your KYC was rejected. Please update your KYC details and resubmit for verification.
                      </p>
                      <button
                        onClick={() => navigate('/kyc')}
                        className="text-xs px-3 py-1.5 bg-white/80 rounded-lg font-medium hover:bg-white transition-all"
                      >
                        Update KYC
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Withdrawal Methods Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span>💳</span> Withdrawal Methods
                </h3>
                {kycData && (
                  <span className={`text-xs px-2 py-1 rounded-full border ${getKYCStatusBadge(kycData.status).color}`}>
                    {getKYCStatusBadge(kycData.status).icon} {getKYCStatusBadge(kycData.status).label}
                  </span>
                )}
              </div>

              {/* Limits Info Banner */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <span className="font-semibold">Withdrawal Limits:</span> ₹{withdrawalSettings.minAmount.toLocaleString()} - ₹{withdrawalSettings.maxAmount.toLocaleString()} per day
                  {withdrawalSettings.processingFee > 0 && (
                    <span> | Processing Fee: ₹{withdrawalSettings.processingFee}</span>
                  )}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Processing Time: {withdrawalSettings.processingTime}
                </p>
              </div>

              {!hasAnyMethod ? (
                <div className="text-center py-8">
                  <span className="text-4xl block mb-3">⚠️</span>
                  <p className="text-gray-500 text-sm">No withdrawal methods found</p>
                  <p className="text-gray-400 text-xs mt-1">Please complete your KYC with bank account or UPI details</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Bank Account */}
                  {getBankMethod() && (
                    <div className={`border rounded-xl p-4 transition-all ${
                      isKYCVerified ? 'bg-green-50 border-green-200' : 
                      isKYCPending ? 'bg-yellow-50 border-yellow-200' : 
                      isKYCRejected ? 'bg-red-50 border-red-200' : 
                      'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🏦</span>
                            <span className="font-semibold text-gray-800">
                              {kycData?.bank_name}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${
                              isKYCVerified ? 'bg-green-100 text-green-700 border-green-300' :
                              isKYCPending ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                              'bg-red-100 text-red-700 border-red-300'
                            }`}>
                              {getKYCStatusBadge(kycData?.status).label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 font-medium">
                            {kycData?.account_holder_name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Account: XXXX{kycData?.account_number?.slice(-4)} | IFSC: {kycData?.ifsc_code}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI */}
                  {getUPIMethod() && (
                    <div className={`border rounded-xl p-4 transition-all ${
                      isKYCVerified ? 'bg-green-50 border-green-200' : 
                      isKYCPending ? 'bg-yellow-50 border-yellow-200' : 
                      isKYCRejected ? 'bg-red-50 border-red-200' : 
                      'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">📱</span>
                            <span className="font-semibold text-gray-800">
                              UPI ID
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${
                              isKYCVerified ? 'bg-green-100 text-green-700 border-green-300' :
                              isKYCPending ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                              'bg-red-100 text-red-700 border-red-300'
                            }`}>
                              {getKYCStatusBadge(kycData?.status).label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 font-mono">{kycData?.upi_id}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* KYC Status Summary */}
              {kycData && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">KYC Status:</span>
                      <span className={`font-medium flex items-center gap-1 ${
                        isKYCVerified ? 'text-green-600' : 
                        isKYCPending ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {getKYCStatusBadge(kycData.status).icon} {getKYCStatusBadge(kycData.status).label}
                      </span>
                    </div>
                    
                    {kycData.id_type && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">ID Type:</span>
                        <span className="font-medium text-gray-700 uppercase">{kycData.id_type}</span>
                      </div>
                    )}
                    {kycData.pancard_number && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">PAN:</span>
                        <span className="font-medium text-gray-700">{kycData.pancard_number.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  
                  {isKYCRejected && (
                    <button
                      onClick={() => navigate('/kyc')}
                      className="mt-3 w-full py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-all"
                    >
                      Resubmit KYC
                    </button>
                  )}
                  {isKYCPending && (
                    <p className="text-xs text-blue-600 mt-3 flex items-center gap-1">
                      <span>⏳</span> Verification in progress - Please check back later
                    </p>
                  )}
                  {!kycData && (
                    <button
                      onClick={() => navigate('/kyc')}
                      className="mt-3 w-full py-2 bg-[#004296] text-white text-sm rounded-lg hover:bg-[#003380] transition-all"
                    >
                      Complete KYC
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Withdrawal History Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                <span>📜</span> Withdrawal History
              </h3>
              
              {historyLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#004296]"></div>
                  <p className="text-gray-500 text-sm mt-2">Loading history...</p>
                </div>
              ) : withdrawalHistory.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl block mb-3">📜</span>
                  <p className="text-gray-500 text-sm">No withdrawal history</p>
                  <p className="text-gray-400 text-xs mt-1">Your withdrawal requests will appear here</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {withdrawalHistory.map((withdrawal) => (
                    <div
                      key={withdrawal.id || withdrawal._id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-gray-800 text-lg">
                            ₹{parseFloat(withdrawal.amount).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <span>🕐</span> {formatDate(withdrawal.created_at || withdrawal.createdAt)}
                          </p>
                        </div>
                        {getStatusBadge(withdrawal.status)}
                      </div>
                      <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                        <p className="flex items-center gap-1">
                          <span>
                            {withdrawal.method === "bank" ? "🏦" : 
                             withdrawal.method === "upi" ? "📱" : "💳"}
                          </span> 
                          Method: {withdrawal.method === "bank" ? "Bank Transfer" : 
                                   withdrawal.method === "upi" ? "UPI Transfer" : 
                                   withdrawal.method?.toUpperCase()}
                        </p>
                        {withdrawal.status === "completed" && withdrawal.transaction_id && (
                          <p className="text-green-600 mt-1">
                            Transaction ID: {withdrawal.transaction_id}
                          </p>
                        )}
                        {withdrawal.rejection_reason && (
                          <p className="text-red-600 mt-1">
                            Reason: {withdrawal.rejection_reason}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 text-white rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span>💸</span> Request Withdrawal
                </h3>
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setError("");
                    setWithdrawAmount("");
                    setSelectedMethod(null);
                  }}
                  className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Available Balance */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 mb-4">
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-[#004296]">₹{walletBalance.toLocaleString()}</p>
              </div>

              {/* Amount Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Withdrawal Amount *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => {
                      setWithdrawAmount(e.target.value);
                      setError("");
                    }}
                    placeholder={`₹${withdrawalSettings.minAmount.toLocaleString()} - ₹${withdrawalSettings.maxAmount.toLocaleString()}`}
                    className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004296] focus:border-[#004296] outline-none transition-all"
                    min={withdrawalSettings.minAmount}
                    max={Math.min(withdrawalSettings.maxAmount, walletBalance)}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    Min: ₹{withdrawalSettings.minAmount.toLocaleString()} | Max: ₹{Math.min(withdrawalSettings.maxAmount, walletBalance).toLocaleString()}
                  </p>
                  {withdrawAmount && !isNaN(withdrawAmount) && withdrawalSettings.processingFee > 0 && (
                    <p className="text-xs text-gray-500">
                      Fee: ₹{withdrawalSettings.processingFee}
                    </p>
                  )}
                </div>
              </div>

              {/* Withdrawal Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Withdrawal Method *
                </label>
                <div className="space-y-2">
                  {withdrawalMethods.length === 0 ? (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">No withdrawal methods available</p>
                      <p className="text-xs text-gray-400 mt-1">Please complete your KYC with bank account or UPI details</p>
                    </div>
                  ) : (
                    withdrawalMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-start p-3 border rounded-xl cursor-pointer transition-all ${
                          selectedMethod?.id === method.id
                            ? "border-[#004296] bg-blue-50 shadow-sm"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="withdrawalMethod"
                          value={method.id}
                          checked={selectedMethod?.id === method.id}
                          onChange={() => {
                            setSelectedMethod(method);
                            setError("");
                          }}
                          className="mt-1 mr-3 accent-[#004296]"
                          disabled={!isKYCVerified}
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span>{method.type === "bank" ? "🏦" : "📱"}</span>
                            <p className="font-medium text-gray-800">
                              {method.type === "bank" ? method.bankName : "UPI Transfer"}
                            </p>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${
                              isKYCVerified ? 'bg-green-100 text-green-700 border-green-300' :
                              isKYCPending ? 'bg-yellow-100 text-yellow-700 border-yellow-300' :
                              'bg-red-100 text-red-700 border-red-300'
                            }`}>
                              {getKYCStatusBadge(kycData?.status).label}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {method.type === "bank"
                              ? `${method.accountHolderName} - ${method.accountNumber}`
                              : method.upiId}
                          </p>
                          {method.type === "bank" && method.ifscCode && (
                            <p className="text-xs text-gray-400 mt-0.5">
                              IFSC: {method.ifscCode}
                            </p>
                          )}
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* KYC Status Warning in Modal */}
              {!isKYCVerified && kycData && (
                <div className={`mb-4 p-3 rounded-lg border ${getKYCStatusBadge(kycData.status).color}`}>
                  <p className="text-xs flex items-center gap-2">
                    <span>{getKYCStatusBadge(kycData.status).icon}</span>
                    {isKYCPending && "Your KYC is under verification. Withdrawal will be available once verified."}
                    {isKYCRejected && "Your KYC was rejected. Please resubmit your KYC documents."}
                  </p>
                </div>
              )}

              {/* Info Note */}
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800">
                  ℹ️ Withdrawals are processed within {withdrawalSettings.processingTime}. 
                  Funds will be sent to your registered {selectedMethod?.type === "bank" ? "bank account" : "UPI ID"}.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm flex items-center gap-2">
                    <span>⚠️</span> {error}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleWithdrawRequest}
                  disabled={loading || !withdrawAmount || !selectedMethod || withdrawalMethods.length === 0 || !isKYCVerified}
                  className="flex-1 py-2.5 rounded-xl font-semibold bg-[#004296] text-white hover:bg-[#003380] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    "Confirm Withdrawal"
                  )}
                </button>
                <button
                  onClick={() => {
                    setShowWithdrawModal(false);
                    setError("");
                    setWithdrawAmount("");
                    setSelectedMethod(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Withdraw;