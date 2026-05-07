import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import Footer from "../HomeComponents/footer";
import Navbar from "../HomeComponents/nav_bar";
import { getMyTickets } from "../../services/my_tickets_services";

const MyTickets = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showTicketDetail, setShowTicketDetail] = useState(false);
    const [selectedTicketDetail, setSelectedTicketDetail] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");

    useEffect(() => {
        fetchMyTickets();
    }, []);

    const fetchMyTickets = async () => {
        setLoading(true);
        try {
            const response = await getMyTickets();
            console.log("My Tickets Response:", response);
            
            if (response.success && response.data) {
                // Group tickets by booking_id
                const groupedTickets = groupTicketsByBooking(response.data);
                setTickets(groupedTickets);
            } else {
                setError("No tickets found");
            }
        } catch (error) {
            console.error("Error fetching tickets:", error);
            setError("Failed to fetch tickets");
        } finally {
            setLoading(false);
        }
    };

    // Group tickets by booking_id
    const groupTicketsByBooking = (ticketData) => {
        const grouped = {};
        
        ticketData.forEach(ticket => {
            const bookingId = ticket.booking_id;
            
            if (!grouped[bookingId]) {
                grouped[bookingId] = {
                    booking_id: bookingId,
                    booking_status: ticket.booking_status,
                    booking_type: ticket.booking_type,
                    title: ticket.title,
                    game_date: ticket.game_date,
                    game_time: ticket.game_time,
                    tickets: [],
                    total_price: 0
                };
            }
            
            // Parse ticket_data JSON string
            let parsedTicketData = [];
            try {
                // Clean the ticket_data string (remove extra quotes)
                let cleanData = ticket.ticket_data;
                if (typeof cleanData === 'string') {
                    cleanData = cleanData.replace(/^"|"$/g, '').replace(/\\"/g, '"');
                    parsedTicketData = JSON.parse(cleanData);
                } else if (Array.isArray(cleanData)) {
                    parsedTicketData = cleanData;
                }
            } catch (e) {
                console.error("Error parsing ticket data:", e);
                // Fallback: try direct parse
                try {
                    parsedTicketData = JSON.parse(ticket.ticket_data);
                } catch (e2) {
                    console.error("Fallback parse also failed:", e2);
                    parsedTicketData = [[], [], []];
                }
            }
            
            grouped[bookingId].tickets.push({
                ticket_id: ticket.ticket_id,
                ticket_number: ticket.ticket_number,
                ticket_data: parsedTicketData,
                ticket_status: ticket.ticket_status,
                price: 50 // Default price, API mein nahi hai to default rakho
            });
            
            grouped[bookingId].total_price += 50;
        });
        
        return Object.values(grouped);
    };

    // Calculate status based on booking_status
    const getTicketStatus = (bookingStatus) => {
        switch(bookingStatus) {
            case 'confirmed':
                return 'active';
            case 'completed':
                return 'completed';
            case 'won':
                return 'won';
            case 'cancelled':
                return 'cancelled';
            default:
                return 'active';
        }
    };

    const handleViewTicket = (booking) => {
        setSelectedTicketDetail(booking);
        setShowTicketDetail(true);
    };

    // Filter tickets
    const filteredTickets = tickets.filter(booking => {
        if (filterStatus === "all") return true;
        const status = getTicketStatus(booking.booking_status);
        return status === filterStatus;
    });

    // Status counts
    const statusCounts = {
        all: tickets.length,
        active: tickets.filter(t => getTicketStatus(t.booking_status) === "active").length,
        completed: tickets.filter(t => getTicketStatus(t.booking_status) === "completed").length,
        won: tickets.filter(t => getTicketStatus(t.booking_status) === "won").length,
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
                <Navbar />
                <main className="grow pt-24 md:pt-28 pb-12 px-4 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296] mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading your tickets...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // Error State
    if (error && tickets.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
                <Navbar />
                <main className="grow pt-24 md:pt-28 pb-12 px-4">
                    <div className="max-w-6xl mx-auto text-center py-16">
                        <span className="text-6xl mb-4 block opacity-40">🎫</span>
                        <p className="text-gray-500 text-lg">{error}</p>
                        <button
                            onClick={() => navigate(ROUTES.GAME)}
                            className="mt-6 bg-[#004296] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#003380] transition-all shadow-md"
                        >
                            Buy Tickets Now
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
            <Navbar />
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#004296] to-[#003380] pt-24 md:pt-28 pb-8 px-4">
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
                                    <p className="text-gray-500 text-xs">Total Bookings</p>
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
                            { id: "all", label: "All Bookings", icon: "📋" },
                            { id: "active", label: "Active", icon: "🟢" },
                            { id: "completed", label: "Completed", icon: "✅" },
                            { id: "won", label: "Won", icon: "🏆" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setFilterStatus(tab.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                                    filterStatus === tab.id
                                        ? "bg-[#004296] text-white shadow-md"
                                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                }`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                                    filterStatus === tab.id
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
                            filteredTickets.map((booking) => {
                                const status = getTicketStatus(booking.booking_status);
                                return (
                                    <div
                                        key={booking.booking_id}
                                        className="bg-white rounded-xl p-4 md:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                                    <h3 className="font-bold text-gray-800 text-lg">
                                                        Booking #{booking.booking_id}
                                                    </h3>
                                                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                                                        status === "active" ? "bg-green-100 text-green-600" :
                                                        status === "completed" ? "bg-gray-100 text-gray-600" :
                                                        "bg-yellow-100 text-yellow-600"
                                                    }`}>
                                                        {status === "active" ? "🟢 Active" :
                                                         status === "completed" ? "✅ Completed" :
                                                         "🏆 Won"}
                                                    </span>
                                                    <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium capitalize">
                                                        {booking.booking_type}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-400">🎲</span>
                                                        <span className="text-gray-600">{booking.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-400">📅</span>
                                                        <span className="text-gray-600">
                                                            {formatDate(booking.game_date) || "N/A"} 
                                                            {booking.game_time ? ` • ${booking.game_time}` : ""}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-400">🎫</span>
                                                        <span className="text-gray-600">
                                                            {booking.tickets.length} Ticket{booking.tickets.length > 1 ? 's' : ''}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-400">💰</span>
                                                        <span className="text-[#004296] font-bold">₹{booking.total_price}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 w-full md:w-auto">
                                                <button
                                                    onClick={() => handleViewTicket(booking)}
                                                    className="flex-1 md:flex-none bg-[#004296] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#003380] transition-all shadow-sm hover:shadow-md"
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>

                                        {/* Ticket Numbers Preview */}
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex flex-wrap gap-2">
                                                {booking.tickets.map((ticket, idx) => (
                                                    <div key={idx} className="flex items-center gap-1">
                                                        <span className="text-xs text-gray-400">#{ticket.ticket_number}</span>
                                                        <div className="flex gap-0.5">
                                                            {Array.isArray(ticket.ticket_data) && 
                                                             ticket.ticket_data.flat().filter(n => n !== null).slice(0, 5).map((num, i) => (
                                                                <span key={i} className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center text-xs font-medium text-gray-700">
                                                                    {num}
                                                                </span>
                                                            ))}
                                                            {Array.isArray(ticket.ticket_data) && 
                                                             ticket.ticket_data.flat().filter(n => n !== null).length > 5 && (
                                                                <span className="text-gray-400 text-xs ml-1">
                                                                    +{ticket.ticket_data.flat().filter(n => n !== null).length - 5}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
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
                        <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-5 text-white rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold">
                                        Booking #{selectedTicketDetail.booking_id}
                                    </h3>
                                    <p className="text-white/70 text-sm">{selectedTicketDetail.title}</p>
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
                                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                                    getTicketStatus(selectedTicketDetail.booking_status) === "active" ? "bg-green-100 text-green-600" :
                                    getTicketStatus(selectedTicketDetail.booking_status) === "completed" ? "bg-gray-100 text-gray-600" :
                                    "bg-yellow-100 text-yellow-600"
                                }`}>
                                    {getTicketStatus(selectedTicketDetail.booking_status) === "active" ? "🟢 Active" :
                                     getTicketStatus(selectedTicketDetail.booking_status) === "completed" ? "✅ Completed" :
                                     "🏆 Won"}
                                </span>
                                <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium capitalize">
                                    {selectedTicketDetail.booking_type}
                                </span>
                            </div>

                            {/* Booking Details */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-gray-500 text-xs">Game Name</p>
                                    <p className="font-medium text-gray-800">{selectedTicketDetail.title}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Booking Type</p>
                                    <p className="font-medium text-gray-800 capitalize">{selectedTicketDetail.booking_type}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Total Tickets</p>
                                    <p className="font-medium text-[#004296]">{selectedTicketDetail.tickets.length}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Game Date</p>
                                    <p className="font-medium text-gray-800">{formatDate(selectedTicketDetail.game_date)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Game Time</p>
                                    <p className="font-medium text-gray-800">{selectedTicketDetail.game_time || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Total Amount</p>
                                    <p className="font-medium text-[#004296]">₹{selectedTicketDetail.total_price}</p>
                                </div>
                            </div>

                            {/* All Tickets in this Booking */}
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-800">
                                    Tickets ({selectedTicketDetail.tickets.length})
                                </h4>
                                
                                {selectedTicketDetail.tickets.map((ticket, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="font-bold text-gray-700">
                                                Ticket #{ticket.ticket_number}
                                            </h5>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                ticket.ticket_status === 'sold' ? 'bg-green-100 text-green-600' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                                {ticket.ticket_status}
                                            </span>
                                        </div>
                                        
                                        {/* Tambola Ticket Grid */}
                                        <div className="bg-[#FBEFA4] p-3 rounded-xl">
                                            {Array.isArray(ticket.ticket_data) && ticket.ticket_data.map((row, rowIdx) => (
                                                <div key={rowIdx} className="grid grid-cols-9 gap-1 mb-1 last:mb-0">
                                                    {row.map((num, colIdx) => (
                                                        <div
                                                            key={colIdx}
                                                            className={`aspect-square flex items-center justify-center text-xs font-bold rounded ${
                                                                num !== null && num !== 0
                                                                    ? "bg-white text-[#004296] border border-[#004296]/30"
                                                                    : "bg-transparent"
                                                            }`}
                                                        >
                                                            {num !== null && num !== 0 ? num : ""}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
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