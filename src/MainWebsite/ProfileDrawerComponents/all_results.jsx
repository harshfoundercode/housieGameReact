import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";


const AllResults = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState("today");
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);

    // Filter options
    const filterOptions = [
        { id: "today", label: "Today's Results" },
        { id: "yesterday", label: "Yesterday's Results" },
        { id: "last7days", label: "Last 7 Days" },
        { id: "last30days", label: "Last 30 Days" },
    ];

    // Mock result data - Simplified (dates only)
    const getResultsByFilter = (filter) => {
        const dates = {
            today: ["23-04-2025"],
            yesterday: ["22-04-2025"],
            last7days: ["23-04-2025", "22-04-2025", "21-04-2025", "20-04-2025", "19-04-2025", "18-04-2025", "17-04-2025"],
            last30days: ["23-04-2025", "20-04-2025", "15-04-2025", "10-04-2025", "05-04-2025", "01-04-2025", "28-03-2025", "25-03-2025", "20-03-2025"],
        };
        return dates[filter] || [];
    };

    // Get day name from date
    const getDayName = (dateStr) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const parts = dateStr.split("-");
        const date = new Date(parts[2], parts[1] - 1, parts[0]);
        return days[date.getDay()];
    };

    // Mock ticket data for a single game (Tambola)
    const getTickets = (dateStr) => {
        return [
            { tno: "TN-001", winner: "Rajesh Kumar", prize: "₹50,000", category: "Full House" },
            { tno: "TN-045", winner: "Priya Sharma", prize: "₹25,000", category: "Top Line" },
            { tno: "TN-078", winner: "Amit Patel", prize: "₹10,000", category: "Middle Line" },
            { tno: "TN-112", winner: "Neha Gupta", prize: "₹5,000", category: "Bottom Line" },
            { tno: "TN-156", winner: "Suresh Reddy", prize: "₹2,500", category: "Early Five" },
        ];
    };

    const handleDateClick = (dateStr) => {
        const tickets = getTickets(dateStr);
        setSelectedResult({
            date: dateStr,
            day: getDayName(dateStr),
            tickets: tickets,
        });
        setShowDetailModal(true);
    };

    const handleDownloadPDF = (ticket) => {
        const pdfContent = `
Tambola Result
Date: ${selectedResult.date}
Ticket: ${ticket.tno}
Winner: ${ticket.winner}
Prize: ${ticket.prize}
Category: ${ticket.category}
        `;
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${ticket.tno}_${selectedResult.date}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    const currentDates = getResultsByFilter(selectedFilter);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <main className="grow pt-24 md:pt-25 pb-12 px-4">
                <div className="max-w-4xl mx-auto">

                    <h1 className="text-purple-800 text-2xl font-bold mb-6 text-center">🏆 Congratulations to those who have won. Please update your KYC immediately.</h1>


                    <h1 className="text-md font-bold mb-1 text-center"> The Disbursement of the first prize money by the Director of the Meghalaya State Lottery is subject to the submission of a testimonial video by the winner, duly confirming their identity and the amount won. The Meghalaya State Government reserves the right to use the First Prize Winner’s testimonial video for the promotion of the Meghalaya State Lottery
                    </h1>

                    {/* Filter Row */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="text-sm font-bold text-[#004296] flex items-center gap-2">
                                <span>📊</span>
                                Select Date
                            </h3>
                            <div className="relative">
                                <select
                                    value={selectedFilter}
                                    onChange={(e) => setSelectedFilter(e.target.value)}
                                    className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm font-medium text-gray-700 focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none cursor-pointer transition-all"
                                >
                                    {filterOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Date Boxes Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {currentDates.length > 0 ? (
                            currentDates.map((dateStr, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleDateClick(dateStr)}
                                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:border-[#004296] hover:shadow-md transition-all group text-center"
                                >
                                    <div className="w-10 h-10 bg-[#004296]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#004296] transition-all">
                                        <span className="text-lg">📅</span>
                                    </div>
                                    <p className="font-bold text-gray-800 group-hover:text-[#004296] transition-all">
                                        {dateStr}
                                    </p>
                                    <p className="text-gray-500 text-xs mt-1">
                                        {getDayName(dateStr)}
                                    </p>
                                </button>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <span className="text-4xl block mb-3 opacity-40">📊</span>
                                <p className="text-gray-500 text-sm">No results found</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* ========== RESULT DETAIL MODAL - FULL ========== */}
            {showDetailModal && selectedResult && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">

                        {/* Modal Header */}
                        <div className="sticky top-0 bg-linear-to-r from-[#004296] to-[#003380] p-4 text-white rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold">{selectedResult.gameName}</h3>
                                </div>
                                <button
                                    onClick={() => setShowDetailModal(false)}
                                    className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-4">

                            {/* Info Cards Row */}
                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200">
                                    <p className="text-gray-500 text-[10px]">Date</p>
                                    <p className="font-bold text-gray-800 text-sm mt-1">{selectedResult.date}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200">
                                    <p className="text-gray-500 text-[10px]">Day</p>
                                    <p className="font-bold text-gray-800 text-sm mt-1">{selectedResult.day}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3 text-center border border-gray-200">
                                    <p className="text-gray-500 text-[10px]">Draw Time</p>
                                    <p className="font-bold text-gray-800 text-sm mt-1">{selectedResult.drawTime}</p>
                                </div>
                            </div>



                            {/* PDF Download Button */}
                            <button
                                onClick={() => handleDownloadPDF(selectedResult.tickets[0])}
                                className="w-full py-2.5 rounded-xl font-bold text-[#004296] bg-[#FBEFA4] hover:bg-[#FFE44D] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                <span>📥</span>
                                Download Result PDF
                            </button>

                            {/* Close Button */}
                            <button
                                onClick={() => setShowDetailModal(false)}
                                className="w-full mt-2 py-2 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default AllResults;