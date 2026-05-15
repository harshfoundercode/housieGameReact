// Withdraw.jsx
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
  
  // Static data - Withdrawal settings
  const [withdrawalSettings] = useState({
    minAmount: 100,
    maxAmount: 50000,
    processingFee: 0,
    processingTime: "24-48 hours",
  });
  
  // Static data - Withdrawal history (will be replaced with API)
  const [withdrawalHistory] = useState([
    {
      id: 101,
      amount: 5000,
      status: "completed",
      method_type: "bank",
      bankName: "Bank of Baroda",
      accountNumber: "XXXX7890",
      created_at: "2026-05-10T10:30:00",
      transaction_id: "TXNSBI123456",
    },
    {
      id: 102,
      amount: 2500,
      status: "pending",
      method_type: "upi",
      upiId: "abhee@sbi",
      created_at: "2026-05-12T15:45:00",
    },
  ]);

  // Fetch KYC data on component mount
  useEffect(() => {
    fetchKYCData();
    fetchWalletBalance();
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

      const result = await response.json();
      console.log("KYC Data Response:", result);

      if (result.success && result.data) {
        setKycData(result.data);
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
      
      const response = await fetch(`${API.walletBalance}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });

      const result = await response.json();
      console.log("Wallet Balance Response:", result);

      if (result.success) {
        setWalletBalance(result.balance || 12500);
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      // Set default balance if API fails
      setWalletBalance(12500);
    }
  };

  const handleWithdrawRequest = async () => {
    // Validate amount
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amount < withdrawalSettings.minAmount) {
      setError(`Minimum withdrawal amount is ₹${withdrawalSettings.minAmount}`);
      return;
    }

    if (amount > withdrawalSettings.maxAmount) {
      setError(`Maximum withdrawal amount is ₹${withdrawalSettings.maxAmount}`);
      return;
    }

    if (amount > walletBalance) {
      setError("Insufficient balance");
      return;
    }

    if (!selectedMethod) {
      setError("Please select a withdrawal method");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      const withdrawalData = {
        amount: amount,
        method_type: selectedMethod.type,
        ...(selectedMethod.type === "bank" && {
          account_number: kycData.account_number,
          ifsc_code: kycData.ifsc_code,
          bank_name: kycData.bank_name,
          account_holder_name: kycData.account_holder_name,
        }),
        ...(selectedMethod.type === "upi" && {
          upi_id: kycData.upi_id,
        }),
      };

      const response = await fetch(`${API.requestWithdrawal}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(withdrawalData),
      });

      const result = await response.json();
      console.log("Withdrawal Response:", result);

      if (result.success) {
        setSuccess(`Withdrawal request of ₹${amount} submitted successfully!`);
        setShowWithdrawModal(false);
        setWithdrawAmount("");
        setSelectedMethod(null);
        // Refresh wallet balance
        await fetchWalletBalance();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result.message || "Withdrawal request failed");
      }
    } catch (error) {
      console.error("Error requesting withdrawal:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      processing: { color: "bg-blue-100 text-blue-800", label: "Processing" },
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  const formatDate = (dateString) => {
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
                  Min withdrawal: ₹{withdrawalSettings.minAmount} | Max: ₹{withdrawalSettings.maxAmount}
                </p>
              </div>
              <button
                onClick={() => setShowWithdrawModal(true)}
                disabled={walletBalance < withdrawalSettings.minAmount || !hasAnyMethod}
                className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  walletBalance < withdrawalSettings.minAmount || !hasAnyMethod
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FBEFA4] text-[#004296] hover:bg-[#FFE44D] shadow-lg"
                }`}
              >
                💸 Withdraw Now
              </button>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Withdrawal Methods Section - Readonly from KYC */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <span>💳</span> Withdrawal Methods
                </h3>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Verified from KYC
                </span>
              </div>

              {/* Info Banner */}
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 flex items-center gap-1">
                  <span>ℹ️</span> Your withdrawal methods are fetched from your KYC details. 
                  To update these, please update your KYC information.
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
                  {/* Bank Account Section - Readonly */}
                  {getBankMethod() && (
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">🏦</span>
                            <span className="font-semibold text-gray-800">
                              {kycData?.bank_name}
                            </span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              KYC Verified
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

                  {/* UPI Section - Readonly */}
                  {getUPIMethod() && (
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">📱</span>
                            <span className="font-semibold text-gray-800">
                              UPI ID
                            </span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              KYC Verified
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 font-mono">{kycData?.upi_id}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* KYC Status */}
              {kycData && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">KYC Status:</span>
                    <span className={`font-medium ${kycData.status === 'approved' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {kycData.status === 'approved' ? 'Verified' : kycData.status === 'pending' ? 'Pending Verification' : 'Not Verified'}
                    </span>
                  </div>
                  {kycData.status !== 'approved' && (
                    <p className="text-xs text-red-500 mt-2">
                      Please ensure your KYC is approved to withdraw funds
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Withdrawal History Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
                <span>📜</span> Withdrawal History
              </h3>
              
              {withdrawalHistory.length === 0 ? (
                <div className="text-center py-8">
                  <span className="text-4xl block mb-3">📜</span>
                  <p className="text-gray-500 text-sm">No withdrawal history</p>
                  <p className="text-gray-400 text-xs mt-1">Your withdrawal requests will appear here</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {withdrawalHistory.map((withdrawal) => (
                    <div
                      key={withdrawal.id}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-gray-800 text-lg">
                            ₹{withdrawal.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <span>🕐</span> {formatDate(withdrawal.created_at)}
                          </p>
                        </div>
                        {getStatusBadge(withdrawal.status)}
                      </div>
                      <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                        <p className="flex items-center gap-1">
                          <span>🏦</span> 
                          Method: {withdrawal.method_type === "bank" ? "Bank Transfer" : "UPI"}
                          {withdrawal.method_type === "bank" && withdrawal.bankName && (
                            <span className="text-gray-600"> - {withdrawal.bankName}</span>
                          )}
                          {withdrawal.method_type === "upi" && withdrawal.upiId && (
                            <span className="text-gray-600"> - {withdrawal.upiId}</span>
                          )}
                        </p>
                        {withdrawal.status === "completed" && withdrawal.transaction_id && (
                          <p className="text-green-600 mt-1">
                            Transaction ID: {withdrawal.transaction_id}
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
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder={`Enter amount between ₹${withdrawalSettings.minAmount} - ₹${withdrawalSettings.maxAmount}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004296] focus:border-[#004296] outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum: ₹{withdrawalSettings.minAmount} | Maximum: ₹{withdrawalSettings.maxAmount}
                </p>
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
                          onChange={() => setSelectedMethod(method)}
                          className="mt-1 mr-3"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span>{method.type === "bank" ? "🏦" : "📱"}</span>
                            <p className="font-medium text-gray-800">
                              {method.type === "bank" ? method.bankName : "UPI Transfer"}
                            </p>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              Verified
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {method.type === "bank"
                              ? `${method.accountHolderName} - ${method.accountNumber}`
                              : method.upiId}
                          </p>
                        </div>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {/* KYC Info Note */}
              {kycData?.status !== 'approved' && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-800">
                    ⚠️ Your KYC is {kycData?.status}. Please complete KYC verification to withdraw funds.
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
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleWithdrawRequest}
                  disabled={loading || !withdrawAmount || !selectedMethod || withdrawalMethods.length === 0 || kycData?.status !== 'approved'}
                  className="flex-1 py-2.5 rounded-xl font-semibold bg-[#004296] text-white hover:bg-[#003380] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : "Confirm Withdrawal"}
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