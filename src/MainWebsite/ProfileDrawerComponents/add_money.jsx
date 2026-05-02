import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import { addMoney, transactionHistory } from "../../services/add_money_services";


const Credits = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("add");
    const [amount, setAmount] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("1");
    const [loading, setLoading] = useState(false);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [userData, setUserData] = useState(null);
    const [transactionHistoryData, setTransactionHistoryData] = useState([]);

  
    // Check login status and get user data from localStorage (initial load)
    const checkCreditStatus = () => {
        const user = localStorage.getItem("user");
        if (user && user !== "undefined") {
            try {
                const parsedUser = JSON.parse(user);
                setUserData(parsedUser);
            } catch (e) {
                console.error("Error parsing user data:", e);
                setUserData(null);
            }
        } else {
            setUserData(null);
        }
    };

    // Fetch transaction history
    const fetchTransactionHistory = async () => {
        setLoadingHistory(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found");
                setLoadingHistory(false);
                return;
            }

            const response = await transactionHistory();
            console.log("Transaction History Response:", response);

            if (response.success) {
                setTransactionHistoryData(response.data || []);
            } else {
                console.error("Failed to fetch history:", response.message);
                setTransactionHistoryData([]);
            }
        } catch (error) {
            console.error("Error fetching transaction history:", error);
            setTransactionHistoryData([]);
        } finally {
            setLoadingHistory(false);
        }
    };

    useEffect(() => {
        checkCreditStatus();


        if (activeTab === "history") {
            fetchTransactionHistory();
        }
    }, [activeTab]);

    const paymentMethods = [
        { id: "1", name: "Cashfree", icon: "https://play-lh.googleusercontent.com/9mvLUB1uIU1SBEaGEDw4Mo8VwrwM47N5yxfMB9DhUfqNc3Wlu7hSmNVOyAYRXQ0nfQ=w240-h480-rw" },
    ];

    const quickAmounts = [200, 500, 1000, 2000, 5000];

    const handleAddMoney = async () => {
        const amountNum = parseFloat(amount);

        if (!amount || isNaN(amountNum) || amountNum < 100) {
            alert("Please enter a valid amount (minimum ₹100)");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to add money");
                navigate("/login");
                return;
            }

            const response = await addMoney(amountNum);
            console.log("Add Money Response:", response);

            if (response.success) {
                alert(`Successfully added ₹${amountNum} to your wallet!`);

                // Refresh profile data to get updated balance
                await checkCreditStatus();

                // Clear amount
                setAmount("");

                // Refresh transaction history if on history tab
                if (activeTab === "history") {
                    await fetchTransactionHistory();
                }

                // Dispatch event for navbar update
                window.dispatchEvent(new Event('creditsUpdated'));
                window.dispatchEvent(new Event('profileUpdated'));
            } else {
                throw new Error(response.message || "Failed to add money");
            }
        } catch (error) {
            console.error("Add Money Error:", error);
            alert(error.message || "Failed to add money. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Get current balance from userData
    const getCurrentBalance = () => {
        if (userData?.total_balance) {
            return parseFloat(userData.total_balance);
        }
        return 0;
    };

    const currentBalance = getCurrentBalance();

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const formatTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    };

    // Get icon for transaction type
    const getTransactionIcon = (type, method) => {
        if (type === "credit") {
            if (method === "referral") return "🤝";
            return "↓";
        }
        return "↑";
    };

    // Get method display name
    const getMethodDisplay = (method) => {
        if (method === "referral") return "Referral";
        return method?.toUpperCase() || "Wallet";
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="grow pt-24 md:pt-28 pb-12 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Page Title */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-[#004296]">Add Credits</h1>
                            <p className="text-gray-500 text-sm md:text-base mt-1">Securely add funds to your Tambola wallet</p>
                        </div>
                    </div>

                    {/* Available Balance Card - Showing all balances from profile API */}
                    <div className="bg-linear-to-r from-[#004296] to-[#003380] rounded-2xl p-5 mb-8 text-white shadow-md">
                        <p className="text-white/70 text-sm font-medium">Total Balance</p>
                        <p className="text-4xl font-bold mt-1">
                            ₹{currentBalance.toLocaleString('en-IN', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}
                        </p>
                          <button
                                onClick={checkCreditStatus}
                                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                                title="Refresh Profile"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>

                        {/* Balance Breakdown - if these fields exist in your profile API */}
                        {(userData?.main_balance !== undefined ||
                            userData?.winning_balance !== undefined ||
                            userData?.bonus_balance !== undefined) && (
                                <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-white/20">
                                    {userData?.main_balance !== undefined && (
                                        <div>
                                            <p className="text-white/50 text-[10px]">Main</p>
                                            <p className="text-white text-sm font-semibold">
                                                ₹{parseFloat(userData.main_balance || 0).toLocaleString('en-IN', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </p>
                                        </div>
                                    )}
                                    {userData?.winning_balance !== undefined && (
                                        <div>
                                            <p className="text-white/50 text-[10px]">Winning</p>
                                            <p className="text-white text-sm font-semibold">
                                                ₹{parseFloat(userData.winning_balance || 0).toLocaleString('en-IN', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </p>
                                        </div>
                                    )}
                                    {userData?.bonus_balance !== undefined && (
                                        <div>
                                            <p className="text-white/50 text-[10px]">Bonus</p>
                                            <p className="text-white text-sm font-semibold">
                                                ₹{parseFloat(userData.bonus_balance || 0).toLocaleString('en-IN', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                    </div>

                    {/* Tab Bar */}
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            onClick={() => setActiveTab("add")}
                            className={`pb-3 px-4 text-sm md:text-base font-medium transition-all ${activeTab === "add"
                                    ? "text-[#004296] border-b-2 border-[#004296]"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Add Credits
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`pb-3 px-4 text-sm md:text-base font-medium transition-all ${activeTab === "history"
                                    ? "text-[#004296] border-b-2 border-[#004296]"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            Transaction History
                        </button>
                    </div>

                    {/* ========== ADD CREDITS SCREEN ========== */}
                    {activeTab === "add" && (
                        <div className="space-y-6">
                            {/* Two Column Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                {/* LEFT COLUMN - Amount Input Card */}
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                                    <label className="block text-gray-700 font-medium mb-2">Enter Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Min ₹100"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#004296] focus:ring-1 focus:ring-[#004296] outline-none text-lg font-medium"
                                    />

                                    {/* Quick Amount Buttons */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {quickAmounts.map((amt) => (
                                            <button
                                                key={amt}
                                                onClick={() => setAmount(amt)}
                                                className={`px-4 py-2 rounded-3xl text-sm font-medium border transition-all ${parseFloat(amount) === amt
                                                        ? "bg-[#004296] text-white border-[#004296]"
                                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                                    }`}
                                            >
                                                ₹{amt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* RIGHT COLUMN - Payment Method Selection Card */}
                                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                                    <label className="block text-gray-700 font-medium mb-3">Select Payment Method</label>
                                    <div className="space-y-2">
                                        {paymentMethods.map((method) => (
                                            <label
                                                key={method.id}
                                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedPayment === method.id
                                                        ? "border-[#004296] bg-blue-50/50"
                                                        : "border-gray-200 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value={method.id}
                                                    checked={selectedPayment === method.id}
                                                    onChange={(e) => setSelectedPayment(e.target.value)}
                                                    className="w-4 h-4 text-[#004296] focus:ring-[#004296]"
                                                />
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={method.icon}
                                                        alt={method.name}
                                                        className="w-6 h-6 rounded object-contain"
                                                    />
                                                    <span className="font-medium text-gray-800 text-sm">{method.name}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Proceed Button */}
                            <button
                                onClick={handleAddMoney}
                                disabled={loading}
                                className="w-full py-3.5 rounded-lg font-bold text-[#004296] bg-[#FBEFA4] hover:bg-[#FFE44D] shadow-sm hover:shadow transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Processing..." : `Proceed to Add ₹${amount || "0"}`}
                            </button>
                        </div>
                    )}

                    {/* ========== HISTORY SCREEN ========== */}
                    {activeTab === "history" && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {loadingHistory ? (
                                <div className="flex justify-center items-center py-16">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004296]"></div>
                                    <span className="ml-3 text-gray-500">Loading history...</span>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {transactionHistoryData.length > 0 ? (
                                        transactionHistoryData.map((txn) => (
                                            <div key={txn.id} className="p-4 hover:bg-gray-50 transition-all">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                                            }`}>
                                                            {getTransactionIcon(txn.type, txn.method)}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-800">{txn.title || txn.description}</p>
                                                            <p className="text-gray-500 text-xs">
                                                                {formatDate(txn.created_at)} • {formatTime(txn.created_at)} • {getMethodDisplay(txn.method)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className={`font-bold ${txn.type === "credit" ? "text-green-600" : "text-red-600"}`}>
                                                            {txn.type === "credit" ? "+" : "-"}₹{parseFloat(txn.amount).toLocaleString('en-IN', {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2
                                                            })}
                                                        </p>
                                                        <p className={`text-xs ${txn.status === "success" ? "text-green-500" : "text-red-500"
                                                            }`}>
                                                            {txn.status === "success" ? "✓ Success" : "✗ Failed"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-16">
                                            <span className="text-5xl mb-4 block opacity-30">📋</span>
                                            <p className="text-gray-500">No transaction history found</p>
                                            <p className="text-gray-400 text-sm mt-1">Your recent credits and debits will appear here.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Credits;