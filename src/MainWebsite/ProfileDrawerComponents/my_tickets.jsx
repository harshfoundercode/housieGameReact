
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "../../routes/routes";
// import Footer from "../HomeComponents/footer";
// import Navbar from "../HomeComponents/nav_bar";
// import { getMyTickets } from "../../services/my_tickets_services";

// const MyTickets = () => {
//     const navigate = useNavigate();
//     const [tickets, setTickets] = useState([]);
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [showTicketDetail, setShowTicketDetail] = useState(false);
//     const [selectedTicketDetail, setSelectedTicketDetail] = useState(null);
//     const [filterStatus, setFilterStatus] = useState("all");
//     const [activeTab, setActiveTab] = useState("bookings"); // "bookings" or "requests"

//     useEffect(() => {
//         fetchMyTickets();
//     }, []);

//     const fetchMyTickets = async () => {
//         setLoading(true);
//         try {
//             const response = await getMyTickets();
//             console.log("My Tickets Response:", response);
            
//             if (response.success && response.data) {
//                 // Handle tickets
//                 if (response.data.tickets && Array.isArray(response.data.tickets)) {
//                     const groupedTickets = groupTicketsByBooking(response.data.tickets);
//                     setTickets(groupedTickets);
//                 } else if (Array.isArray(response.data)) {
//                     const groupedTickets = groupTicketsByBooking(response.data);
//                     setTickets(groupedTickets);
//                 } else {
//                     setError("No tickets found");
//                 }
                
//                 // Handle request list
//                 if (response.data.request_list && Array.isArray(response.data.request_list)) {
//                     setRequests(response.data.request_list);
//                 }
//             } else {
//                 setError("No tickets found");
//             }
//         } catch (error) {
//             console.error("Error fetching tickets:", error);
//             setError("Failed to fetch tickets");
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Group tickets by booking_id
//     const groupTicketsByBooking = (ticketData) => {
//         const grouped = {};
        
//         ticketData.forEach(ticket => {
//             const bookingId = ticket.booking_id;
            
//             if (!grouped[bookingId]) {
//                 grouped[bookingId] = {
//                     booking_id: bookingId,
//                     booking_status: ticket.booking_status || 'confirmed',
//                     booking_type: ticket.booking_type || 'direct',
//                     title: ticket.title || 'Tambola Game',
//                     game_date: ticket.game_date || null,
//                     game_time: ticket.game_time || null,
//                     tickets: [],
//                     total_price: 0
//                 };
//             }
            
//             // Parse ticket_data JSON string
//             let parsedTicketData = [];
//             try {
//                 let cleanData = ticket.ticket_data;
//                 if (typeof cleanData === 'string') {
//                     cleanData = cleanData.replace(/^"|"$/g, '').replace(/\\"/g, '"');
//                     parsedTicketData = JSON.parse(cleanData);
//                 } else if (Array.isArray(cleanData)) {
//                     parsedTicketData = cleanData;
//                 } else {
//                     parsedTicketData = [[], [], []];
//                 }
//             } catch (e) {
//                 console.error("Error parsing ticket data:", e);
//                 try {
//                     parsedTicketData = JSON.parse(ticket.ticket_data);
//                 } catch (e2) {
//                     console.error("Fallback parse also failed:", e2);
//                     parsedTicketData = [[], [], []];
//                 }
//             }
            
//             if (!Array.isArray(parsedTicketData) || parsedTicketData.length !== 3) {
//                 parsedTicketData = [[], [], []];
//             }
            
//             grouped[bookingId].tickets.push({
//                 ticket_id: ticket.ticket_id,
//                 ticket_number: ticket.ticket_number,
//                 ticket_data: parsedTicketData,
//                 ticket_status: ticket.ticket_status || 'sold',
//                 price: 50
//             });
            
//             grouped[bookingId].total_price += 50;
//         });
        
//         return Object.values(grouped);
//     };

//     // Calculate status based on booking_status
//     const getTicketStatus = (bookingStatus) => {
//         switch(bookingStatus) {
//             case 'confirmed':
//                 return 'active';
//             case 'completed':
//                 return 'completed';
//             case 'won':
//                 return 'won';
//             case 'cancelled':
//                 return 'cancelled';
//             default:
//                 return 'active';
//         }
//     };

//     // Get request status with proper styling
//     const getRequestStatusInfo = (status) => {
//         switch(status) {
//             case 'pending':
//                 return { label: '⏳ Pending', color: 'bg-yellow-100 text-yellow-600' };
//             case 'accepted':
//                 return { label: '✅ Accepted', color: 'bg-green-100 text-green-600' };
//             case 'declined':
//                 return { label: '❌ Declined', color: 'bg-red-100 text-red-600' };
//             case 'booked':
//                 return { label: '📌 Booked', color: 'bg-blue-100 text-blue-600' };
//             default:
//                 return { label: status || 'Unknown', color: 'bg-gray-100 text-gray-600' };
//         }
//     };

//     const handleViewTicket = (booking) => {
//         setSelectedTicketDetail(booking);
//         setShowTicketDetail(true);
//     };

//     // Filter tickets
//     const filteredTickets = tickets.filter(booking => {
//         if (filterStatus === "all") return true;
//         const status = getTicketStatus(booking.booking_status);
//         return status === filterStatus;
//     });

//     // Filter requests
//     const filteredRequests = requests.filter(request => {
//         if (filterStatus === "all") return true;
//         return request.status === filterStatus;
//     });

//     // Status counts for tickets
//     const statusCounts = {
//         all: tickets.length,
//         active: tickets.filter(t => getTicketStatus(t.booking_status) === "active").length,
//         completed: tickets.filter(t => getTicketStatus(t.booking_status) === "completed").length,
//         won: tickets.filter(t => getTicketStatus(t.booking_status) === "won").length,
//     };

//     // Status counts for requests
//     const requestStatusCounts = {
//         all: requests.length,
//         pending: requests.filter(r => r.status === 'pending').length,
//         accepted: requests.filter(r => r.status === 'accepted').length,
//         declined: requests.filter(r => r.status === 'declined').length,
//         booked: requests.filter(r => r.status === 'booked').length,
//     };

//     // Format date
//     const formatDate = (dateString) => {
//         if (!dateString) return "N/A";
//         try {
//             const date = new Date(dateString);
//             return date.toLocaleDateString('en-IN', {
//                 year: 'numeric',
//                 month: 'short',
//                 day: 'numeric'
//             });
//         } catch {
//             return dateString;
//         }
//     };

//     // Loading State
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
//                 <Navbar />
//                 <main className="grow pt-24 md:pt-28 pb-12 px-4 flex items-center justify-center">
//                     <div className="text-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296] mx-auto mb-4"></div>
//                         <p className="text-gray-500">Loading your tickets...</p>
//                     </div>
//                 </main>
//                 <Footer />
//             </div>
//         );
//     }

//     // Error State
//     if (error && tickets.length === 0 && requests.length === 0) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
//                 <Navbar />
//                 <main className="grow pt-24 md:pt-28 pb-12 px-4">
//                     <div className="max-w-6xl mx-auto text-center py-16">
//                         <span className="text-6xl mb-4 block opacity-40">🎫</span>
//                         <p className="text-gray-500 text-lg">{error}</p>
//                         <button
//                             onClick={() => navigate(ROUTES.GAME)}
//                             className="mt-6 bg-[#004296] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#003380] transition-all shadow-md"
//                         >
//                             Buy Tickets Now
//                         </button>
//                     </div>
//                 </main>
//                 <Footer />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
//             <Navbar />
            
//             {/* Header Banner */}
//             <div className="bg-gradient-to-r from-[#004296] to-[#003380] pt-24 md:pt-28 pb-8 px-4">
//                 <div className="max-w-6xl mx-auto">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//                         My Tickets & Requests
//                     </h1>
//                     <p className="text-white/70 text-sm md:text-base">
//                         View and manage all your Tambola tickets and agent requests in one place
//                     </p>
//                 </div>
//             </div>

//             <main className="grow -mt-5 pb-12 px-4">
//                 <div className="max-w-6xl mx-auto">

//                     {/* Tabs */}
//                     <div className="flex gap-2 mb-6">
//                         <button
//                             onClick={() => setActiveTab("bookings")}
//                             className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
//                                 activeTab === "bookings"
//                                     ? "bg-[#004296] text-white shadow-md"
//                                     : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//                             }`}
//                         >
//                             <span>🎫</span>
//                             <span>My Bookings</span>
//                             <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                                 activeTab === "bookings"
//                                     ? "bg-white/20 text-white"
//                                     : "bg-gray-100 text-gray-600"
//                             }`}>
//                                 {tickets.length}
//                             </span>
//                         </button>
//                         <button
//                             onClick={() => setActiveTab("requests")}
//                             className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
//                                 activeTab === "requests"
//                                     ? "bg-[#004296] text-white shadow-md"
//                                     : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//                             }`}
//                         >
//                             <span>📋</span>
//                             <span>Agent Requests</span>
//                             <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                                 activeTab === "requests"
//                                     ? "bg-white/20 text-white"
//                                     : "bg-gray-100 text-gray-600"
//                             }`}>
//                                 {requests.length}
//                             </span>
//                         </button>
//                     </div>

//                     {/* ========== BOOKINGS TAB ========== */}
//                     {activeTab === "bookings" && (
//                         <>
//                             {/* Stats Cards */}
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//                                 <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-gray-500 text-xs">Total Bookings</p>
//                                             <p className="text-2xl font-bold text-[#004296]">{statusCounts.all}</p>
//                                         </div>
//                                         <div className="w-10 h-10 bg-[#004296]/10 rounded-full flex items-center justify-center">
//                                             <span className="text-xl">🎫</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-gray-500 text-xs">Active</p>
//                                             <p className="text-2xl font-bold text-green-600">{statusCounts.active}</p>
//                                         </div>
//                                         <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                                             <span className="text-xl">🟢</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-gray-500 text-xs">Completed</p>
//                                             <p className="text-2xl font-bold text-gray-600">{statusCounts.completed}</p>
//                                         </div>
//                                         <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//                                             <span className="text-xl">✅</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-gray-500 text-xs">Won</p>
//                                             <p className="text-2xl font-bold text-yellow-600">{statusCounts.won}</p>
//                                         </div>
//                                         <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
//                                             <span className="text-xl">🏆</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Filter Tabs */}
//                             <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
//                                 {[
//                                     { id: "all", label: "All Bookings", icon: "📋" },
//                                     { id: "active", label: "Active", icon: "🟢" },
//                                     { id: "completed", label: "Completed", icon: "✅" },
//                                     { id: "won", label: "Won", icon: "🏆" },
//                                 ].map((tab) => (
//                                     <button
//                                         key={tab.id}
//                                         onClick={() => setFilterStatus(tab.id)}
//                                         className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                                             filterStatus === tab.id
//                                                 ? "bg-[#004296] text-white shadow-md"
//                                                 : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//                                         }`}
//                                     >
//                                         <span>{tab.icon}</span>
//                                         <span>{tab.label}</span>
//                                         <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                                             filterStatus === tab.id
//                                                 ? "bg-white/20 text-white"
//                                                 : "bg-gray-100 text-gray-600"
//                                         }`}>
//                                             {statusCounts[tab.id]}
//                                         </span>
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* Tickets List */}
//                             <div className="space-y-4">
//                                 {filteredTickets.length > 0 ? (
//                                     filteredTickets.map((booking) => {
//                                         const status = getTicketStatus(booking.booking_status);
//                                         return (
//                                             <div
//                                                 key={booking.booking_id}
//                                                 className="bg-white rounded-xl p-4 md:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
//                                             >
//                                                 <div className="flex flex-col md:flex-row justify-between items-start gap-4">
//                                                     <div className="flex-1">
//                                                         <div className="flex flex-wrap items-center gap-3 mb-3">
//                                                             <h3 className="font-bold text-gray-800 text-lg">
//                                                                 Booking #{booking.booking_id}
//                                                             </h3>
//                                                             <span className={`text-xs px-3 py-1 rounded-full font-medium ${
//                                                                 status === "active" ? "bg-green-100 text-green-600" :
//                                                                 status === "completed" ? "bg-gray-100 text-gray-600" :
//                                                                 "bg-yellow-100 text-yellow-600"
//                                                             }`}>
//                                                                 {status === "active" ? "🟢 Active" :
//                                                                  status === "completed" ? "✅ Completed" :
//                                                                  "🏆 Won"}
//                                                             </span>
//                                                             <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium capitalize">
//                                                                 {booking.booking_type || 'direct'}
//                                                             </span>
//                                                             <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">
//                                                                 {booking.tickets.length} {booking.tickets.length === 1 ? 'Ticket' : 'Tickets'}
//                                                             </span>
//                                                         </div>

//                                                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
//                                                             <div className="flex items-center gap-2">
//                                                                 <span className="text-gray-400">🎲</span>
//                                                                 <span className="text-gray-600">{booking.title || 'Tambola Game'}</span>
//                                                             </div>
//                                                             <div className="flex items-center gap-2">
//                                                                 <span className="text-gray-400">📅</span>
//                                                                 <span className="text-gray-600">
//                                                                     {formatDate(booking.game_date) || "N/A"} 
//                                                                     {booking.game_time ? ` • ${booking.game_time}` : ""}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center gap-2">
//                                                                 <span className="text-gray-400">🎫</span>
//                                                                 <span className="text-gray-600">
//                                                                     {booking.tickets.length} Ticket{booking.tickets.length > 1 ? 's' : ''}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center gap-2">
//                                                                 <span className="text-gray-400">💰</span>
//                                                                 <span className="text-[#004296] font-bold">₹{booking.total_price}</span>
//                                                             </div>
//                                                         </div>
//                                                     </div>

//                                                     <div className="flex gap-2 w-full md:w-auto">
//                                                         <button
//                                                             onClick={() => handleViewTicket(booking)}
//                                                             className="flex-1 md:flex-none bg-[#004296] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#003380] transition-all shadow-sm hover:shadow-md"
//                                                         >
//                                                             View Details
//                                                         </button>
//                                                     </div>
//                                                 </div>

//                                                 {/* Ticket Numbers Preview */}
//                                                 <div className="mt-4 pt-4 border-t border-gray-100">
//                                                     <div className="flex flex-wrap gap-2">
//                                                         {booking.tickets.map((ticket, idx) => (
//                                                             <div key={idx} className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
//                                                                 <span className="text-xs text-gray-400 font-medium">#{ticket.ticket_number}</span>
//                                                                 <div className="flex gap-0.5">
//                                                                     {Array.isArray(ticket.ticket_data) && 
//                                                                      ticket.ticket_data.flat().filter(n => n !== null && n !== 0).slice(0, 5).map((num, i) => (
//                                                                         <span key={i} className="w-5 h-5 bg-white border border-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-700">
//                                                                             {num}
//                                                                         </span>
//                                                                     ))}
//                                                                     {Array.isArray(ticket.ticket_data) && 
//                                                                      ticket.ticket_data.flat().filter(n => n !== null && n !== 0).length > 5 && (
//                                                                         <span className="text-gray-400 text-xs ml-1 flex items-center">
//                                                                             +{ticket.ticket_data.flat().filter(n => n !== null && n !== 0).length - 5}
//                                                                         </span>
//                                                                     )}
//                                                                 </div>
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })
//                                 ) : (
//                                     <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
//                                         <span className="text-6xl mb-4 block opacity-40">🎫</span>
//                                         <p className="text-gray-500 text-lg">No tickets found</p>
//                                         <p className="text-gray-400 text-sm mt-1">Try changing the filter or buy new tickets</p>
//                                         <button
//                                             onClick={() => navigate(ROUTES.GAME)}
//                                             className="mt-6 bg-[#004296] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#003380] transition-all shadow-md"
//                                         >
//                                             Buy Tickets Now
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </>
//                     )}

//                     {/* ========== REQUESTS TAB ========== */}
//                     {activeTab === "requests" && (
//                         <>
//                             {/* Request Stats Cards */}
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//                                 <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-gray-500 text-xs">Total Requests</p>
//                                             <p className="text-2xl font-bold text-[#004296]">{requestStatusCounts.all}</p>
//                                         </div>
//                                         <div className="w-10 h-10 bg-[#004296]/10 rounded-full flex items-center justify-center">
//                                             <span className="text-xl">📋</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-gray-500 text-xs">Pending</p>
//                                             <p className="text-2xl font-bold text-yellow-600">{requestStatusCounts.pending}</p>
//                                         </div>
//                                         <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
//                                             <span className="text-xl">⏳</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-gray-500 text-xs">Accepted</p>
//                                             <p className="text-2xl font-bold text-green-600">{requestStatusCounts.accepted}</p>
//                                         </div>
//                                         <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
//                                             <span className="text-xl">✅</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
//                                     <div className="flex items-center justify-between">
//                                         <div>
//                                             <p className="text-gray-500 text-xs">Declined</p>
//                                             <p className="text-2xl font-bold text-red-600">{requestStatusCounts.declined}</p>
//                                         </div>
//                                         <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
//                                             <span className="text-xl">❌</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Request Filter Tabs */}
//                             <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
//                                 {[
//                                     { id: "all", label: "All Requests", icon: "📋" },
//                                     { id: "pending", label: "Pending", icon: "⏳" },
//                                     { id: "accepted", label: "Accepted", icon: "✅" },
//                                     { id: "declined", label: "Declined", icon: "❌" },
//                                     { id: "booked", label: "Booked", icon: "📌" },
//                                 ].map((tab) => (
//                                     <button
//                                         key={tab.id}
//                                         onClick={() => setFilterStatus(tab.id)}
//                                         className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
//                                             filterStatus === tab.id
//                                                 ? "bg-[#004296] text-white shadow-md"
//                                                 : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
//                                         }`}
//                                     >
//                                         <span>{tab.icon}</span>
//                                         <span>{tab.label}</span>
//                                         <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
//                                             filterStatus === tab.id
//                                                 ? "bg-white/20 text-white"
//                                                 : "bg-gray-100 text-gray-600"
//                                         }`}>
//                                             {requestStatusCounts[tab.id]}
//                                         </span>
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* Requests List */}
//                             <div className="space-y-4">
//                                 {filteredRequests.length > 0 ? (
//                                     filteredRequests.map((request) => {
//                                         const statusInfo = getRequestStatusInfo(request.status);
//                                         return (
//                                             <div
//                                                 key={request.request_id}
//                                                 className="bg-white rounded-xl p-4 md:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
//                                             >
//                                                 <div className="flex flex-col md:flex-row justify-between items-start gap-4">
//                                                     <div className="flex-1">
//                                                         <div className="flex flex-wrap items-center gap-3 mb-3">
//                                                             <h3 className="font-bold text-gray-800 text-lg">
//                                                                 Request #{request.request_id}
//                                                             </h3>
//                                                             <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusInfo.color}`}>
//                                                                 {statusInfo.label}
//                                                             </span>
//                                                             <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
//                                                                 Game #{request.game_id}
//                                                             </span>
//                                                         </div>

//                                                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
//                                                             <div className="flex items-center gap-2">
//                                                                 <span className="text-gray-400">🎫</span>
//                                                                 <span className="text-gray-600">
//                                                                     Quantity: {request.quantity}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center gap-2">
//                                                                 <span className="text-gray-400">🆔</span>
//                                                                 <span className="text-gray-600">
//                                                                     Agent ID: #{request.agent_id}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center gap-2">
//                                                                 <span className="text-gray-400">🎟️</span>
//                                                                 <span className="text-gray-600">
//                                                                     Tickets: {request.ticket_ids ? JSON.parse(request.ticket_ids).length : 0}
//                                                                 </span>
//                                                             </div>
//                                                             <div className="flex items-center gap-2">
//                                                                 <span className="text-gray-400">📅</span>
//                                                                 <span className="text-gray-600">
//                                                                     {formatDate(request.created_at)}
//                                                                 </span>
//                                                             </div>
//                                                             {request.rejection_reason && (
//                                                                 <div className="flex items-center gap-2 col-span-2">
//                                                                     <span className="text-gray-400">💬</span>
//                                                                     <span className="text-red-600 text-sm">
//                                                                         Reason: {request.rejection_reason}
//                                                                     </span>
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     </div>

//                                                     <div className="flex gap-2 w-full md:w-auto">
//                                                         {request.ticket_ids && request.status === 'accepted' && (
//                                                             <button
//                                                                 onClick={() => {
//                                                                     // Find the corresponding booking and show it
//                                                                     const ticketIds = JSON.parse(request.ticket_ids);
//                                                                     const booking = tickets.find(b => 
//                                                                         b.tickets.some(t => ticketIds.includes(t.ticket_id))
//                                                                     );
//                                                                     if (booking) {
//                                                                         handleViewTicket(booking);
//                                                                     }
//                                                                 }}
//                                                                 className="flex-1 md:flex-none bg-[#004296] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#003380] transition-all shadow-sm hover:shadow-md"
//                                                             >
//                                                                 View Tickets
//                                                             </button>
//                                                         )}
//                                                         {request.status === 'pending' && (
//                                                             <span className="flex-1 md:flex-none px-5 py-2.5 rounded-lg text-sm font-medium bg-yellow-50 text-yellow-600 border border-yellow-200">
//                                                                 Awaiting Response
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     })
//                                 ) : (
//                                     <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
//                                         <span className="text-6xl mb-4 block opacity-40">📋</span>
//                                         <p className="text-gray-500 text-lg">No requests found</p>
//                                         <p className="text-gray-400 text-sm mt-1">You haven't made any agent requests yet</p>
//                                         <button
//                                             onClick={() => navigate(ROUTES.GAME)}
//                                             className="mt-6 bg-[#004296] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#003380] transition-all shadow-md"
//                                         >
//                                             Make a Request
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </main>

//             {/* ========== TICKET DETAIL MODAL ========== */}
//             {showTicketDetail && selectedTicketDetail && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//                     <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">

//                         {/* Modal Header */}
//                         <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-5 text-white rounded-t-2xl">
//                             <div className="flex justify-between items-center">
//                                 <div>
//                                     <h3 className="text-xl md:text-2xl font-bold">
//                                         Booking #{selectedTicketDetail.booking_id}
//                                     </h3>
//                                     <p className="text-white/70 text-sm">{selectedTicketDetail.title || 'Tambola Game'}</p>
//                                     <p className="text-white/50 text-xs mt-1">
//                                         {selectedTicketDetail.tickets.length} Ticket{selectedTicketDetail.tickets.length > 1 ? 's' : ''} • ₹{selectedTicketDetail.total_price}
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={() => setShowTicketDetail(false)}
//                                     className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
//                                 >
//                                     ✕
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Modal Body */}
//                         <div className="p-5 md:p-6">

//                             {/* Status Badge */}
//                             <div className="mb-5 flex items-center gap-3 flex-wrap">
//                                 <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
//                                     getTicketStatus(selectedTicketDetail.booking_status) === "active" ? "bg-green-100 text-green-600" :
//                                     getTicketStatus(selectedTicketDetail.booking_status) === "completed" ? "bg-gray-100 text-gray-600" :
//                                     "bg-yellow-100 text-yellow-600"
//                                 }`}>
//                                     {getTicketStatus(selectedTicketDetail.booking_status) === "active" ? "🟢 Active" :
//                                      getTicketStatus(selectedTicketDetail.booking_status) === "completed" ? "✅ Completed" :
//                                      "🏆 Won"}
//                                 </span>
//                                 <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium capitalize">
//                                     {selectedTicketDetail.booking_type || 'direct'}
//                                 </span>
//                                 <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">
//                                     {selectedTicketDetail.tickets.length} Tickets
//                                 </span>
//                             </div>

//                             {/* Booking Details */}
//                             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Game Name</p>
//                                     <p className="font-medium text-gray-800">{selectedTicketDetail.title || 'Tambola Game'}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Booking Type</p>
//                                     <p className="font-medium text-gray-800 capitalize">{selectedTicketDetail.booking_type || 'direct'}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Total Tickets</p>
//                                     <p className="font-medium text-[#004296]">{selectedTicketDetail.tickets.length}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Game Date</p>
//                                     <p className="font-medium text-gray-800">{formatDate(selectedTicketDetail.game_date) || "N/A"}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Game Time</p>
//                                     <p className="font-medium text-gray-800">{selectedTicketDetail.game_time || "N/A"}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-gray-500 text-xs">Total Amount</p>
//                                     <p className="font-medium text-[#004296]">₹{selectedTicketDetail.total_price}</p>
//                                 </div>
//                             </div>

//                             {/* All Tickets in this Booking */}
//                             <div className="space-y-4">
//                                 <h4 className="font-bold text-gray-800">
//                                     Tickets ({selectedTicketDetail.tickets.length})
//                                 </h4>
                                
//                                 {selectedTicketDetail.tickets.map((ticket, idx) => (
//                                     <div key={idx} className="border border-gray-200 rounded-xl p-4">
//                                         <div className="flex justify-between items-center mb-3">
//                                             <h5 className="font-bold text-gray-700">
//                                                 Ticket #{ticket.ticket_number}
//                                             </h5>
//                                             <span className={`text-xs px-2 py-1 rounded-full ${
//                                                 ticket.ticket_status === 'sold' ? 'bg-green-100 text-green-600' :
//                                                 ticket.ticket_status === 'active' ? 'bg-blue-100 text-blue-600' :
//                                                 'bg-gray-100 text-gray-600'
//                                             }`}>
//                                                 {ticket.ticket_status || 'sold'}
//                                             </span>
//                                         </div>
                                        
//                                         {/* Tambola Ticket Grid */}
//                                         <div className="bg-[#FBEFA4] p-3 rounded-xl">
//                                             {Array.isArray(ticket.ticket_data) && ticket.ticket_data.map((row, rowIdx) => (
//                                                 <div key={rowIdx} className="grid grid-cols-9 gap-1 mb-1 last:mb-0">
//                                                     {row.map((num, colIdx) => (
//                                                         <div
//                                                             key={colIdx}
//                                                             className={`aspect-square flex items-center justify-center text-xs font-bold rounded ${
//                                                                 num !== null && num !== 0
//                                                                     ? "bg-white text-[#004296] border border-[#004296]/30"
//                                                                     : "bg-transparent"
//                                                             }`}
//                                                         >
//                                                             {num !== null && num !== 0 ? num : ""}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Action Buttons */}
//                             <div className="flex gap-3 mt-6">
//                                 <button
//                                     onClick={() => setShowTicketDetail(false)}
//                                     className="flex-1 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
//                                 >
//                                     Close
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             <Footer />
//         </div>
//     );
// };

// export default MyTickets;
// MyTickets.jsx - Fixed with proper data handling
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import Footer from "../HomeComponents/footer";
import Navbar from "../HomeComponents/nav_bar";
import { getMyTickets } from "../../services/my_tickets_services";

const MyTickets = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showTicketDetail, setShowTicketDetail] = useState(false);
    const [selectedTicketDetail, setSelectedTicketDetail] = useState(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [activeTab, setActiveTab] = useState("bookings");
    const [showRequestDetail, setShowRequestDetail] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        fetchMyTickets();
    }, []);

    const fetchMyTickets = async () => {
        setLoading(true);
        try {
            const response = await getMyTickets();
            console.log("Full Response:", response);
            
            // ✅ Check if response has data
            if (response && response.success && response.data) {
                console.log("✅ Response data:", response.data);
                
                // ✅ Handle tickets - Check if tickets exist
                if (response.data.tickets && Array.isArray(response.data.tickets)) {
                    console.log(`📊 Found ${response.data.tickets.length} tickets`);
                    const groupedTickets = groupTicketsByBooking(response.data.tickets);
                    console.log(`📊 Grouped into ${groupedTickets.length} bookings`);
                    setTickets(groupedTickets);
                } else {
                    console.log("⚠️ No tickets found in response");
                    setTickets([]);
                }
                
                // ✅ Handle request list
                if (response.data.request_list && Array.isArray(response.data.request_list)) {
                    console.log(`📊 Found ${response.data.request_list.length} requests`);
                    const formattedRequests = response.data.request_list.map(req => ({
                        ...req,
                        agent_name: req.agent_name || req.agent?.name || `Agent #${req.agent_id}`,
                        ticket_ids_array: req.ticket_ids ? JSON.parse(req.ticket_ids) : []
                    }));
                    setRequests(formattedRequests);
                } else {
                    console.log("⚠️ No requests found in response");
                    setRequests([]);
                }
                
                // ✅ If no tickets and no requests, show appropriate message
                if (!response.data.tickets && !response.data.request_list) {
                    setError("No data found");
                }
            } else {
                console.log("❌ Response failed:", response);
                setError(response?.message || "No tickets found");
                setTickets([]);
                setRequests([]);
            }
        } catch (error) {
            console.error("❌ Error fetching tickets:", error);
            setError("Failed to fetch tickets");
            setTickets([]);
            setRequests([]);
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
                    booking_status: ticket.booking_status || 'confirmed',
                    booking_type: ticket.booking_type || 'direct',
                    title: ticket.title || 'Tambola Game',
                    game_date: ticket.game_date || null,
                    game_time: ticket.game_time || null,
                    tickets: [],
                    total_price: 0
                };
            }
            
            // Parse ticket_data JSON string
            let parsedTicketData = [];
            try {
                if (typeof ticket.ticket_data === 'string') {
                    // Clean the string - remove extra quotes
                    let cleanData = ticket.ticket_data;
                    // Remove surrounding quotes if present
                    if (cleanData.startsWith('"') && cleanData.endsWith('"')) {
                        cleanData = cleanData.slice(1, -1);
                    }
                    // Replace escaped quotes
                    cleanData = cleanData.replace(/\\"/g, '"');
                    parsedTicketData = JSON.parse(cleanData);
                } else if (Array.isArray(ticket.ticket_data)) {
                    parsedTicketData = ticket.ticket_data;
                } else {
                    parsedTicketData = [[], [], []];
                }
            } catch (e) {
                console.error("Error parsing ticket data for ticket", ticket.ticket_id, e);
                try {
                    // Try direct parse
                    parsedTicketData = JSON.parse(ticket.ticket_data);
                } catch (e2) {
                    console.error("Fallback parse also failed:", e2);
                    parsedTicketData = [[], [], []];
                }
            }
            
            if (!Array.isArray(parsedTicketData) || parsedTicketData.length !== 3) {
                parsedTicketData = [[], [], []];
            }
            
            grouped[bookingId].tickets.push({
                ticket_id: ticket.ticket_id,
                ticket_number: ticket.ticket_number,
                ticket_data: parsedTicketData,
                ticket_status: ticket.ticket_status || 'sold',
                price: 50
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

    // Get request status with proper styling
    const getRequestStatusInfo = (status) => {
        switch(status) {
            case 'pending':
                return { label: '⏳ Pending', color: 'bg-yellow-100 text-yellow-600' };
            case 'accepted':
                return { label: '✅ Accepted', color: 'bg-green-100 text-green-600' };
            case 'declined':
                return { label: '❌ Declined', color: 'bg-red-100 text-red-600' };
            case 'booked':
                return { label: '📌 Booked', color: 'bg-blue-100 text-blue-600' };
            default:
                return { label: status || 'Unknown', color: 'bg-gray-100 text-gray-600' };
        }
    };

    const handleViewTicket = (booking) => {
        setSelectedTicketDetail(booking);
        setShowTicketDetail(true);
    };

    const handleViewRequestDetail = (request) => {
        setSelectedRequest(request);
        setShowRequestDetail(true);
    };

    // Filter tickets
    const filteredTickets = tickets.filter(booking => {
        if (filterStatus === "all") return true;
        const status = getTicketStatus(booking.booking_status);
        return status === filterStatus;
    });

    // Filter requests
    const filteredRequests = requests.filter(request => {
        if (filterStatus === "all") return true;
        return request.status === filterStatus;
    });

    // Status counts for tickets
    const statusCounts = {
        all: tickets.length,
        active: tickets.filter(t => getTicketStatus(t.booking_status) === "active").length,
        completed: tickets.filter(t => getTicketStatus(t.booking_status) === "completed").length,
        won: tickets.filter(t => getTicketStatus(t.booking_status) === "won").length,
    };

    // Status counts for requests
    const requestStatusCounts = {
        all: requests.length,
        pending: requests.filter(r => r.status === 'pending').length,
        accepted: requests.filter(r => r.status === 'accepted').length,
        declined: requests.filter(r => r.status === 'declined').length,
        booked: requests.filter(r => r.status === 'booked').length,
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
            <Navbar />
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-[#004296] to-[#003380] pt-24 md:pt-28 pb-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        My Tickets & Requests
                    </h1>
                    <p className="text-white/70 text-sm md:text-base">
                        View and manage all your Tambola tickets and agent requests in one place
                    </p>
                </div>
            </div>

            <main className="grow -mt-5 pb-12 px-4">
                <div className="max-w-6xl mx-auto">

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                        <button
                            onClick={() => {
                                setActiveTab("bookings");
                                setFilterStatus("all");
                            }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                activeTab === "bookings"
                                    ? "bg-[#004296] text-white shadow-md"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            }`}
                        >
                            <span>🎫</span>
                            <span>My Bookings</span>
                            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                                activeTab === "bookings"
                                    ? "bg-white/20 text-white"
                                    : "bg-gray-100 text-gray-600"
                            }`}>
                                {tickets.length}
                            </span>
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("requests");
                                setFilterStatus("all");
                            }}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                                activeTab === "requests"
                                    ? "bg-[#004296] text-white shadow-md"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                            }`}
                        >
                            <span>📋</span>
                            <span>Agent Requests</span>
                            <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                                activeTab === "requests"
                                    ? "bg-white/20 text-white"
                                    : "bg-gray-100 text-gray-600"
                            }`}>
                                {requests.length}
                            </span>
                        </button>
                    </div>

                    {/* ========== BOOKINGS TAB ========== */}
                    {activeTab === "bookings" && (
                        <>
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
                                                                {booking.booking_type || 'direct'}
                                                            </span>
                                                            <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">
                                                                {booking.tickets.length} {booking.tickets.length === 1 ? 'Ticket' : 'Tickets'}
                                                            </span>
                                                        </div>

                                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">🎲</span>
                                                                <span className="text-gray-600">{booking.title || 'Tambola Game'}</span>
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
                                                            <div key={idx} className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                                                                <span className="text-xs text-gray-400 font-medium">#{ticket.ticket_number}</span>
                                                                <div className="flex gap-0.5">
                                                                    {Array.isArray(ticket.ticket_data) && 
                                                                     ticket.ticket_data.flat().filter(n => n !== null && n !== 0).slice(0, 5).map((num, i) => (
                                                                        <span key={i} className="w-5 h-5 bg-white border border-gray-200 rounded flex items-center justify-center text-xs font-medium text-gray-700">
                                                                            {num}
                                                                        </span>
                                                                    ))}
                                                                    {Array.isArray(ticket.ticket_data) && 
                                                                     ticket.ticket_data.flat().filter(n => n !== null && n !== 0).length > 5 && (
                                                                        <span className="text-gray-400 text-xs ml-1 flex items-center">
                                                                            +{ticket.ticket_data.flat().filter(n => n !== null && n !== 0).length - 5}
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
                        </>
                    )}

                    {/* ========== REQUESTS TAB ========== */}
                    {activeTab === "requests" && (
                        <>
                            {/* Request Stats Cards */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-xs">Total Requests</p>
                                            <p className="text-2xl font-bold text-[#004296]">{requestStatusCounts.all}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-[#004296]/10 rounded-full flex items-center justify-center">
                                            <span className="text-xl">📋</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-xs">Pending</p>
                                            <p className="text-2xl font-bold text-yellow-600">{requestStatusCounts.pending}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <span className="text-xl">⏳</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-xs">Accepted</p>
                                            <p className="text-2xl font-bold text-green-600">{requestStatusCounts.accepted}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <span className="text-xl">✅</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-xs">Declined</p>
                                            <p className="text-2xl font-bold text-red-600">{requestStatusCounts.declined}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                            <span className="text-xl">❌</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Request Filter Tabs */}
                            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                                {[
                                    { id: "all", label: "All Requests", icon: "📋" },
                                    { id: "pending", label: "Pending", icon: "⏳" },
                                    { id: "accepted", label: "Accepted", icon: "✅" },
                                    { id: "declined", label: "Declined", icon: "❌" },
                                    { id: "booked", label: "Booked", icon: "📌" },
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
                                            {requestStatusCounts[tab.id]}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Requests List */}
                            <div className="space-y-4">
                                {filteredRequests.length > 0 ? (
                                    filteredRequests.map((request) => {
                                        const statusInfo = getRequestStatusInfo(request.status);
                                        return (
                                            <div
                                                key={request.request_id}
                                                className="bg-white rounded-xl p-4 md:p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
                                            >
                                                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                                            <h3 className="font-bold text-gray-800 text-lg">
                                                                Request #{request.request_id}
                                                            </h3>
                                                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusInfo.color}`}>
                                                                {statusInfo.label}
                                                            </span>
                                                            <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                                                                Game #{request.game_id}
                                                            </span>
                                                        </div>

                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                                                            {/* Agent Name */}
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">👤</span>
                                                                <span className="text-gray-800 font-medium">
                                                                    {request.agent_name || `Agent #${request.agent_id}`}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">🆔</span>
                                                                <span className="text-gray-600">
                                                                    Agent ID: #{request.agent_id}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">🎫</span>
                                                                <span className="text-gray-600">
                                                                    Quantity: {request.quantity}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">🎟️</span>
                                                                <span className="text-gray-600">
                                                                    Tickets: {request.ticket_ids ? JSON.parse(request.ticket_ids).length : 0}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-400">📅</span>
                                                                <span className="text-gray-600">
                                                                    {formatDate(request.created_at)}
                                                                </span>
                                                            </div>
                                                            {request.rejection_reason && (
                                                                <div className="flex items-center gap-2 col-span-2">
                                                                    <span className="text-gray-400">💬</span>
                                                                    <span className="text-red-600 text-sm">
                                                                        Reason: {request.rejection_reason}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2 w-full md:w-auto">
                                                        <button
                                                            onClick={() => handleViewRequestDetail(request)}
                                                            className="flex-1 md:flex-none bg-[#004296] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#003380] transition-all shadow-sm hover:shadow-md"
                                                        >
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                                        <span className="text-6xl mb-4 block opacity-40">📋</span>
                                        <p className="text-gray-500 text-lg">No requests found</p>
                                        <p className="text-gray-400 text-sm mt-1">You haven't made any agent requests yet</p>
                                        <button
                                            onClick={() => navigate(ROUTES.GAME)}
                                            className="mt-6 bg-[#004296] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#003380] transition-all shadow-md"
                                        >
                                            Make a Request
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* ========== REQUEST DETAIL MODAL ========== */}
            {showRequestDetail && selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-5 text-white rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold">
                                        Request #{selectedRequest.request_id}
                                    </h3>
                                    <p className="text-white/70 text-sm">
                                        Agent: {selectedRequest.agent_name || `Agent #${selectedRequest.agent_id}`}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowRequestDetail(false)}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-5 md:p-6">
                            {/* Status */}
                            <div className="mb-5 flex items-center gap-3 flex-wrap">
                                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                                    selectedRequest.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                    selectedRequest.status === 'accepted' ? 'bg-green-100 text-green-600' :
                                    selectedRequest.status === 'booked' ? 'bg-blue-100 text-blue-600' :
                                    'bg-red-100 text-red-600'
                                }`}>
                                    {selectedRequest.status === 'pending' ? '⏳ Pending' :
                                     selectedRequest.status === 'accepted' ? '✅ Accepted' :
                                     selectedRequest.status === 'booked' ? '📌 Booked' :
                                     '❌ Declined'}
                                </span>
                                <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                                    Game #{selectedRequest.game_id}
                                </span>
                            </div>

                            {/* Request Details */}
                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-gray-500 text-xs">Agent Name</p>
                                    <p className="font-medium text-gray-800">
                                        {selectedRequest.agent_name || `Agent #${selectedRequest.agent_id}`}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Agent ID</p>
                                    <p className="font-medium text-gray-800">#{selectedRequest.agent_id}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Quantity</p>
                                    <p className="font-medium text-gray-800">{selectedRequest.quantity}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs">Request Date</p>
                                    <p className="font-medium text-gray-800">{formatDate(selectedRequest.created_at)}</p>
                                </div>
                                {selectedRequest.rejection_reason && (
                                    <div className="col-span-2">
                                        <p className="text-gray-500 text-xs">Rejection Reason</p>
                                        <p className="font-medium text-red-600">{selectedRequest.rejection_reason}</p>
                                    </div>
                                )}
                            </div>

                            {/* Ticket IDs */}
                            {selectedRequest.ticket_ids && selectedRequest.ticket_ids_array?.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-bold text-gray-800 mb-3">
                                        Tickets ({selectedRequest.ticket_ids_array.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedRequest.ticket_ids_array.map((ticketId, idx) => (
                                            <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium border border-blue-200">
                                                #Ticket {ticketId}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Related Booking Link */}
                            {selectedRequest.status === 'accepted' && selectedRequest.ticket_ids && (
                                <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200">
                                    <p className="text-sm text-green-700">
                                        ✅ This request has been accepted and tickets have been booked.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setActiveTab("bookings");
                                            setShowRequestDetail(false);
                                            setFilterStatus("all");
                                        }}
                                        className="mt-2 text-[#004296] font-medium text-sm hover:underline"
                                    >
                                        View my bookings →
                                    </button>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowRequestDetail(false)}
                                    className="flex-1 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========== TICKET DETAIL MODAL ========== */}
            {showTicketDetail && selectedTicketDetail && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-5 text-white rounded-t-2xl">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold">
                                        Booking #{selectedTicketDetail.booking_id}
                                    </h3>
                                    <p className="text-white/70 text-sm">{selectedTicketDetail.title || 'Tambola Game'}</p>
                                </div>
                                <button
                                    onClick={() => setShowTicketDetail(false)}
                                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className="p-5 md:p-6">
                            {/* Status */}
                            <div className="mb-5 flex items-center gap-3 flex-wrap">
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
                                    {selectedTicketDetail.booking_type || 'direct'}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {selectedTicketDetail.tickets.map((ticket, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h5 className="font-bold text-gray-700">
                                                Ticket #{ticket.ticket_number}
                                            </h5>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                ticket.ticket_status === 'sold' ? 'bg-green-100 text-green-600' :
                                                ticket.ticket_status === 'active' ? 'bg-blue-100 text-blue-600' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                                {ticket.ticket_status || 'sold'}
                                            </span>
                                        </div>
                                        
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

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowTicketDetail(false)}
                                    className="flex-1 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                                >
                                    Close
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