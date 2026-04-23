// src/page/MyTickets.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import Footer from "../HomeComponents/footer";
import Navbar from "../HomeComponents/nav_bar";

const MyTickets = () => {
    const navigate = useNavigate();
    const [showTicketDetail, setShowTicketDetail] = useState(false);
    const [selectedTicketDetail, setSelectedTicketDetail] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all"); // all, active, completed, won

    // Mock purchased tickets data with full numbers
    const purchasedTickets = [
        {
            id: 1,
            tno: "TN-001",
            gameName: "Tambola Classic",
            drawDate: "2025-04-23",
            drawTime: "4:30 PM",
            price: 50,
            status: "active",
            bookedBy: "Rajesh Kumar",
            agentName: "Priya Sharma",
            purchaseDate: "2025-04-22",
            purchaseTime: "10:30 AM",
            numbers: [
                [4, 16, 28, 0, 41, 53, 0, 70, 82],
                [9, 0, 21, 33, 45, 0, 58, 69, 0],
                [0, 12, 24, 0, 37, 49, 61, 0, 73]
            ]
        },
        {
            id: 2,
            tno: "TN-045",
            gameName: "Tambola Classic",
            drawDate: "2025-04-23",
            drawTime: "12:15 PM",
            price: 50,
            status: "active",
            bookedBy: "Rajesh Kumar",
            agentName: "Self",
            purchaseDate: "2025-04-22",
            purchaseTime: "11:15 AM",
            numbers: [
                [7, 0, 24, 0, 44, 0, 68, 72, 0],
                [0, 13, 0, 31, 0, 47, 73, 0, 84],
                [28, 0, 39, 0, 57, 0, 0, 78, 86]
            ]
        },
        {
            id: 3,
            tno: "TN-078",
            gameName: "Tambola Classic",
            drawDate: "2025-04-22",
            drawTime: "7:30 PM",
            price: 50,
            status: "completed",
            bookedBy: "Rajesh Kumar",
            agentName: "Amit Patel",
            purchaseDate: "2025-04-21",
            purchaseTime: "3:00 PM",
            numbers: [
                [3, 0, 23, 42, 0, 60, 0, 80, 0],
                [0, 14, 0, 0, 30, 0, 51, 69, 83],
                [4, 0, 25, 0, 48, 56, 0, 0, 77]
            ]
        },
        {
            id: 4,
            tno: "TN-112",
            gameName: "Tambola Classic",
            drawDate: "2025-04-22",
            drawTime: "10:00 AM",
            price: 50,
            status: "won",
            bookedBy: "Rajesh Kumar",
            agentName: "Self",
            purchaseDate: "2025-04-21",
            purchaseTime: "9:00 AM",
            numbers: [
                [8, 0, 27, 0, 43, 61, 0, 75, 0],
                [0, 11, 0, 29, 0, 0, 46, 62, 81],
                [15, 0, 34, 0, 55, 0, 70, 0, 89]
            ],
            prize: "₹5,000"
        },
        {
            id: 5,
            tno: "TN-156",
            gameName: "Tambola Classic",
            drawDate: "2025-04-21",
            drawTime: "9:00 PM",
            price: 100,
            status: "won",
            bookedBy: "Rajesh Kumar",
            agentName: "Priya Sharma",
            purchaseDate: "2025-04-20",
            purchaseTime: "2:30 PM",
            numbers: [
                [5, 19, 0, 38, 0, 57, 0, 73, 0],
                [0, 0, 14, 0, 26, 0, 43, 65, 80],
                [8, 31, 0, 47, 0, 69, 0, 0, 86]
            ],
            prize: "₹25,000"
        },
    ];

    const handleViewTicket = (ticket) => {
        setSelectedTicketDetail(ticket);
        setShowTicketDetail(true);
    };

    const filteredTickets = purchasedTickets.filter(ticket => {
        if (filterStatus === "all") return true;
        return ticket.status === filterStatus;
    });

    const statusCounts = {
        all: purchasedTickets.length,
        active: purchasedTickets.filter(t => t.status === "active").length,
        completed: purchasedTickets.filter(t => t.status === "completed").length,
        won: purchasedTickets.filter(t => t.status === "won").length,
    };

    // Called numbers for demo
    const calledNumbers = [4, 16, 28, 41, 9, 21, 33, 45, 12, 24, 37, 49];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex flex-col">
          <Navbar />
            {/* Header Banner */}
            <div className="bg-linear-to-r from-[#004296] to-[#003380] pt-24 md:pt-28 pb-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        My Tickets
                    </h1>
                    <p className="text-white/70 text-sm md:text-base">
                        View and manage all your Tambola tickets in one place
                    </p>
                </div>
            </div>

            <main className="grow -mt-5 pb-12 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs">Total Tickets</p>
                                    <p className="text-2xl font-bold text-[#004296]">{statusCounts.all}</p>
                                </div>
                                <div className="w-10 h-10 bg-[#004296]/10 rounded-full flex items-center justify-center">
                                    <span className="text-xl">🎫</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs">Active</p>
                                    <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
                                </div>
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-xl">🟢</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs">Completed</p>
                                    <p className="text-2xl font-bold text-gray-600">{statusCounts.completed}</p>
                                </div>
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <span className="text-xl">✅</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-xs">Won</p>
                                    <p className="text-2xl font-bold text-yellow-600">{statusCounts.won}</p>
                                </div>
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <span className="text-xl">🏆</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                        {[
                            { id: "all", label: "All Tickets", icon: "📋" },
                            { id: "active", label: "Active", icon: "🟢" },
                            { id: "completed", label: "Completed", icon: "✅" },
                            { id: "won", label: "Won", icon: "🏆" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setFilterStatus(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filterStatus === tab.id
                                        ? "bg-[#004296] text-white shadow-md"
                                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                    }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${filterStatus === tab.id
                                        ? "bg-white/20 text-white"
                                        : "bg-gray-100 text-gray-600"
                                    }`}>
                                    {statusCounts[tab.id]}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Tickets List */}
                    <div className="space-y-4">
                        {filteredTickets.length > 0 ? (
                            filteredTickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="bg-white rounded-xl p-4 md:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <h3 className="font-bold text-gray-800 text-lg">{ticket.tno}</h3>
                                                <span className={`text-xs px-3 py-1 rounded-full font-medium ${ticket.status === "active" ? "bg-green-100 text-green-600" :
                                                        ticket.status === "completed" ? "bg-gray-100 text-gray-600" :
                                                            "bg-yellow-100 text-yellow-600"
                                                    }`}>
                                                    {ticket.status === "active" ? "🟢 Active" :
                                                        ticket.status === "completed" ? "✅ Completed" :
                                                            "🏆 Won"}
                                                </span>
                                                {ticket.status === "won" && (
                                                    <span className="text-green-600 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
                                                        +{ticket.prize}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-400">🎲</span>
                                                    <span className="text-gray-600">{ticket.gameName}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-400">📅</span>
                                                    <span className="text-gray-600">{ticket.drawDate} • {ticket.drawTime}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-400">👤</span>
                                                    <span className="text-gray-600">Agent: {ticket.agentName}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-400">💰</span>
                                                    <span className="text-[#004296] font-bold">₹{ticket.price}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 w-full md:w-auto">
                                            <button
                                                onClick={() => handleViewTicket(ticket)}
                                                className="flex-1 md:flex-none bg-[#004296] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#003380] transition-all shadow-sm hover:shadow-md"
                                            >
                                                View Details
                                            </button>
                                           
                                        </div>
                                    </div>

                                    {/* Mini Ticket Preview */}
                                    <div className="mt-4 pt-4 border-t border-gray-100 hidden md:block">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 text-xs">Numbers:</span>
                                            <div className="flex flex-wrap gap-1">
                                                {ticket.numbers.flat().filter(n => n !== 0).slice(0, 8).map((num, i) => (
                                                    <span key={i} className="w-7 h-7 bg-gray-100 rounded flex items-center justify-center text-xs font-medium text-gray-700">
                                                        {num}
                                                    </span>
                                                ))}
                                                <span className="text-gray-400 text-xs ml-1">+{ticket.numbers.flat().filter(n => n !== 0).length - 8} more</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                                <span className="text-6xl mb-4 block opacity-40">🎫</span>
                                <p className="text-gray-500 text-lg">No tickets found</p>
                                <p className="text-gray-400 text-sm mt-1">Try changing the filter or buy new tickets</p>
                                <button
                                    onClick={() => navigate(ROUTES.GAME)}
                                    className="mt-6 bg-[#004296] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#003380] transition-all shadow-md"
                                >
                                    Buy Tickets Now
                                </button>
                            </div>
                        )}
                    </div>

                 
                </div>
            </main>

            {/* ========== TICKET DETAIL MODAL ========== */}
            {showTicketDetail && selectedTicketDetail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

                        {/* Modal Header */}
                        <div className="sticky top-0 bg-linear-to-r from-[#004296] to-[#003380] p-5 text-white rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold">{selectedTicketDetail.tno}</h3>
                                    <p className="text-white/70 text-sm">{selectedTicketDetail.gameName}</p>
                                </div>
                                <button
                                    onClick={() => setShowTicketDetail(false)}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-5 md:p-6">

                            {/* Status Badge */}
                            <div className="mb-5 flex items-center gap-3">
                                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${selectedTicketDetail.status === "active" ? "bg-green-100 text-green-600" :
                                        selectedTicketDetail.status === "completed" ? "bg-gray-100 text-gray-600" :
                                            "bg-yellow-100 text-yellow-600"
                                    }`}>
                                    {selectedTicketDetail.status === "active" ? "🟢 Active" :
                                        selectedTicketDetail.status === "completed" ? "✅ Completed" :
                                            "🏆 Won"}
                                </span>
                                {selectedTicketDetail.status === "won" && (
                                    <span className="text-green-600 font-bold text-lg">{selectedTicketDetail.prize}</span>
                                )}
                            </div>

                            {/* Ticket Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-gray-500 text-xs">Booked By</p>
                                    <p className="font-medium text-gray-800">{selectedTicketDetail.bookedBy}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Agent Name</p>
                                    <p className="font-medium text-gray-800">{selectedTicketDetail.agentName}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Ticket Price</p>
                                    <p className="font-medium text-[#004296]">₹{selectedTicketDetail.price}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Purchase Date</p>
                                    <p className="font-medium text-gray-800">{selectedTicketDetail.purchaseDate}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Purchase Time</p>
                                    <p className="font-medium text-gray-800">{selectedTicketDetail.purchaseTime}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Draw Date & Time</p>
                                    <p className="font-medium text-gray-800">{selectedTicketDetail.drawDate} • {selectedTicketDetail.drawTime}</p>
                                </div>
                            </div>

                            {/* Tambola Ticket Grid */}
                            <div className="mb-4">
                                <h4 className="font-bold text-gray-800 mb-3">Ticket Numbers</h4>
                                <div className="bg-[#FBEFA4] p-4 rounded-xl">
                                    <div className="grid grid-cols-9 gap-1.5">
                                        {selectedTicketDetail.numbers.flat().map((num, i) => {
                                            const isMarked = calledNumbers.includes(num);
                                            return (
                                                <div
                                                    key={i}
                                                    className={`aspect-square flex items-center justify-center text-sm font-bold rounded-lg border-2 transition-all ${num !== 0
                                                            ? isMarked
                                                                ? "bg-green-500 text-white border-green-600 shadow-md"
                                                                : "bg-white text-[#004296] border-[#004296]/30 hover:border-[#004296]"
                                                            : "bg-transparent border-transparent"
                                                        }`}
                                                >
                                                    {num !== 0 ? num : ""}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 mt-3 text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                                        <span className="text-gray-600">Called ({calledNumbers.filter(n => selectedTicketDetail.numbers.flat().includes(n)).length})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-white border-2 border-[#004296]/30 rounded"></div>
                                        <span className="text-gray-600">Pending</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowTicketDetail(false)}
                                    className="flex-1 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                                >
                                    Close
                                </button>
                                <button className="flex-1 py-3 rounded-xl font-medium text-white bg-[#004296] hover:bg-[#003380] transition-all shadow-md">
                                    📥 Download Ticket
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

export default MyTickets;