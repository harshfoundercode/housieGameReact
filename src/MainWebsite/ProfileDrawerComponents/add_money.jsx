import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";


const Credits = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("add"); // "add" or "history"
    const [amount, setAmount] = useState("");
    const [selectedPayment, setSelectedPayment] = useState("upi");
    const [upiId, setUpiId] = useState("");

    // Mock data for transaction history
    const transactionHistory = [
        { id: 1, type: "credit", amount: 500, date: "2025-04-22", time: "14:30", method: "UPI", status: "success", description: "Added via UPI" },
        { id: 2, type: "debit", amount: 50, date: "2025-04-22", time: "10:15", method: "Wallet", status: "success", description: "Ticket Purchase - TN-001" },
        { id: 3, type: "credit", amount: 1250, date: "2025-04-21", time: "09:00", method: "Welcome Bonus", status: "success", description: "Registration Bonus" },
        { id: 4, type: "credit", amount: 200, date: "2025-04-20", time: "18:45", method: "UPI", status: "success", description: "Added via UPI" },
        { id: 5, type: "debit", amount: 100, date: "2025-04-20", time: "12:30", method: "Wallet", status: "success", description: "Ticket Purchase - TN-045" },
        { id: 6, type: "credit", amount: 1000, date: "2025-04-19", time: "16:20", method: "Card", status: "failed", description: "Payment failed - Retry" },
    ];

    const quickAmounts = [200, 500, 1000, 2000, 5000];

    const paymentMethods = [
        { id: "1", name: "Cashfree", icon: "https://play-lh.googleusercontent.com/9mvLUB1uIU1SBEaGEDw4Mo8VwrwM47N5yxfMB9DhUfqNc3Wlu7hSmNVOyAYRXQ0nfQ=w240-h480-rw" },

    ];

    const handleAddMoney = () => {
        if (!amount || amount < 100) {
            alert("Please enter a valid amount (minimum ₹100)");
            return;
        }
        if (selectedPayment === "upi" && !upiId) {
            alert("Please enter your UPI ID");
            return;
        }
        alert(`Proceeding to pay ₹${amount} via ${selectedPayment.toUpperCase()}`);
        // Add payment logic here
    };

    const currentBalance = 1250; // This would come from your state/API

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

                    {/* Available Balance Card */}
                    <div className="bg-linear-to-r from-[#004296] to-[#003380] rounded-2xl p-5 mb-8 text-white shadow-md">
                        <p className="text-white/70 text-sm font-medium">Available Balance</p>
                        <p className="text-4xl font-bold mt-1">₹{currentBalance.toLocaleString()}</p>
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

                            {/* Two Column Layout - Amount & Payment Methods in One Row */}
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
                                                className={`px-4 py-2 rounded-3xl text-sm font-medium border transition-all ${amount == amt
                                                    ? "bg-[#780606] text-white"
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
                                className="w-full py-3.5 rounded-lg font-bold text-[#004296] bg-[#FBEFA4] hover:bg-[#FFE44D] shadow-sm hover:shadow transition-all text-lg" >
                                Proceed to Add ₹{amount || "0"}
                            </button>
                        </div>
                    )}


                    {/* ========== HISTORY SCREEN ========== */}
                    {activeTab === "history" && (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                            {/* Transaction List */}
                            <div className="divide-y divide-gray-100">
                                {transactionHistory.length > 0 ? (
                                    transactionHistory.map((txn) => (
                                        <div key={txn.id} className="p-4 hover:bg-gray-50 transition-all">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${txn.type === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                                                        }`}>
                                                        {txn.type === "credit" ? "↓" : "↑"}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{txn.description}</p>
                                                        <p className="text-gray-500 text-xs">{txn.date} • {txn.time} • {txn.method}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`font-bold ${txn.type === "credit" ? "text-green-600" : "text-red-600"
                                                        }`}>
                                                        {txn.type === "credit" ? "+" : "-"}₹{txn.amount}
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
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Credits;