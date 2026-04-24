// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { ROUTES } from "../../routes/routes";
// import logoImage from "../../assets/tambolaGame.jpeg";

// const tickets = [
//   {
//     id: 1,
//     name: "6000683491",
//     win: "1.01%",
//     numbers: [
//       [7, 0, 24, 0, 44, 0, 68, 72, 0],
//       [0, 13, 0, 31, 0, 47, 73, 0, 84],
//       [28, 0, 39, 0, 57, 0, 0, 78, 86],
//     ],
//   },
//   {
//     id: 2,
//     name: "Hilton Saikia",
//     win: "1.83%",
//     numbers: [
//       [3, 0, 23, 42, 0, 60, 0, 80, 0],
//       [0, 14, 0, 0, 30, 0, 51, 69, 83],
//       [4, 0, 25, 0, 48, 56, 0, 0, 77],
//     ],
//   },
//   {
//     id: 3,
//     name: "Rajiv S",
//     win: "1.39%",
//     numbers: [
//       [12, 26, 0, 40, 0, 65, 0, 71, 0],
//       [0, 0, 5, 0, 19, 0, 33, 52, 88],
//       [9, 21, 0, 37, 0, 66, 79, 0, 0],
//     ],
//   },
//   {
//     id: 4,
//     name: "Priya Sharma",
//     win: "2.15%",
//     numbers: [
//       [8, 0, 27, 0, 43, 61, 0, 75, 0],
//       [0, 11, 0, 29, 0, 0, 46, 62, 81],
//       [15, 0, 34, 0, 55, 0, 70, 0, 89],
//     ],
//   },
//   {
//     id: 5,
//     name: "Amit Kumar",
//     win: "0.97%",
//     numbers: [
//       [2, 18, 0, 35, 0, 58, 0, 0, 76],
//       [0, 0, 10, 0, 22, 0, 49, 63, 82],
//       [17, 36, 0, 53, 0, 0, 67, 85, 0],
//     ],
//   },
//   {
//     id: 6,
//     name: "Sarah Chen",
//     win: "2.47%",
//     numbers: [
//       [6, 0, 20, 0, 41, 0, 59, 74, 0],
//       [0, 16, 0, 32, 0, 50, 0, 64, 87],
//       [1, 0, 38, 0, 54, 0, 71, 0, 90],
//     ],
//   },
//   {
//     id: 7,
//     name: "Vikram Singh",
//     win: "1.56%",
//     numbers: [
//       [9, 0, 21, 45, 0, 62, 0, 78, 0],
//       [0, 4, 0, 0, 28, 0, 52, 68, 83],
//       [11, 0, 33, 0, 56, 72, 0, 0, 88],
//     ],
//   },
//   {
//     id: 8,
//     name: "Meera Patel",
//     win: "3.21%",
//     numbers: [
//       [5, 19, 0, 38, 0, 57, 0, 73, 0],
//       [0, 0, 14, 0, 26, 0, 43, 65, 80],
//       [8, 31, 0, 47, 0, 69, 0, 0, 86],
//     ],
//   },
//   {
//     id: 9,
//     name: "John D'Souza",
//     win: "1.72%",
//     numbers: [
//       [12, 0, 24, 0, 36, 55, 0, 0, 79],
//       [0, 7, 0, 29, 0, 0, 48, 61, 84],
//       [15, 0, 35, 0, 51, 0, 66, 81, 0],
//     ],
//   },
//   {
//     id: 10,
//     name: "Anjali Gupta",
//     win: "2.08%",
//     numbers: [
//       [3, 17, 0, 42, 0, 60, 0, 77, 0],
//       [0, 0, 10, 0, 23, 0, 44, 63, 82],
//       [13, 30, 0, 49, 0, 70, 0, 0, 85],
//     ],
//   },
//   {
//     id: 11,
//     name: "Mohammed Ali",
//     win: "1.64%",
//     numbers: [
//       [18, 0, 25, 0, 39, 58, 0, 76, 0],
//       [0, 6, 0, 22, 0, 0, 46, 67, 89],
//       [2, 0, 34, 0, 53, 0, 71, 0, 83],
//     ],
//   },
//   {
//     id: 12,
//     name: "Kavita Reddy",
//     win: "2.93%",
//     numbers: [
//       [11, 0, 27, 41, 0, 54, 0, 72, 0],
//       [0, 16, 0, 0, 32, 0, 50, 64, 80],
//       [8, 0, 21, 0, 37, 59, 0, 0, 87],
//     ],
//   },
//   {
//     id: 13,
//     name: "Rahul Nair",
//     win: "1.18%",
//     numbers: [
//       [4, 20, 0, 45, 0, 66, 0, 0, 78],
//       [0, 0, 9, 0, 28, 0, 52, 69, 84],
//       [14, 31, 0, 55, 0, 0, 73, 90, 0],
//     ],
//   },
//   {
//     id: 14,
//     name: "Sophia Rodrigues",
//     win: "2.56%",
//     numbers: [
//       [7, 0, 19, 0, 33, 56, 0, 74, 0],
//       [0, 12, 0, 26, 0, 0, 47, 61, 81],
//       [5, 0, 36, 0, 48, 0, 68, 0, 86],
//     ],
//   },
//   {
//     id: 15,
//     name: "Arjun Menon",
//     win: "1.42%",
//     numbers: [
//       [1, 23, 0, 40, 0, 63, 0, 79, 0],
//       [0, 0, 15, 0, 29, 0, 43, 65, 83],
//       [10, 24, 0, 51, 0, 0, 70, 0, 88],
//     ],
//   },
//   {
//     id: 16,
//     name: "Neha Kapoor",
//     win: "1.95%",
//     numbers: [
//       [13, 0, 28, 0, 44, 57, 0, 75, 0],
//       [0, 3, 0, 21, 0, 0, 38, 62, 82],
//       [17, 0, 35, 0, 49, 0, 67, 0, 85],
//     ],
//   },
//   {
//     id: 17,
//     name: "David Fernandes",
//     win: "2.34%",
//     numbers: [
//       [8, 18, 0, 37, 0, 55, 0, 71, 0],
//       [0, 0, 6, 0, 30, 0, 46, 64, 89],
//       [11, 22, 0, 42, 0, 60, 0, 0, 78],
//     ],
//   },
//   {
//     id: 18,
//     name: "Lakshmi Iyer",
//     win: "1.27%",
//     numbers: [
//       [16, 0, 25, 0, 41, 59, 0, 80, 0],
//       [0, 2, 0, 33, 0, 0, 50, 66, 84],
//       [9, 0, 20, 0, 39, 0, 58, 0, 77],
//     ],
//   },
//   {
//     id: 19,
//     name: "Karan Malhotra",
//     win: "2.71%",
//     numbers: [
//       [14, 0, 27, 43, 0, 61, 0, 73, 0],
//       [0, 5, 0, 0, 24, 0, 48, 69, 86],
//       [12, 0, 32, 0, 54, 72, 0, 0, 88],
//     ],
//   },
//   {
//     id: 20,
//     name: "Zara Sheikh",
//     win: "1.88%",
//     numbers: [
//       [10, 26, 0, 36, 0, 53, 0, 76, 0],
//       [0, 0, 4, 0, 21, 0, 45, 65, 81],
//       [18, 31, 0, 47, 0, 63, 0, 0, 90],
//     ],
//   },
// ];

// // Ticket Set Options
// const TICKET_SETS = [
//   {
//     id: 1,
//     name: "🎲 Beginner's Luck",
//     tickets: [1, 2, 3],
//     price: 299,
//     description: "Perfect for first-time players! 3 tickets with balanced numbers",
//     difficulty: "Easy",
//     winChance: "Good"
//   },
//   {
//     id: 2,
//     name: "⭐ Golden Chance",
//     tickets: [4, 5, 6],
//     price: 399,
//     description: "Popular choice! Higher winning probability",
//     difficulty: "Medium",
//     winChance: "Better"
//   },
//   {
//     id: 3,
//     name: "💎 Platinum Pro",
//     tickets: [7, 8, 9],
//     price: 499,
//     description: "For serious players! Premium number combinations",
//     difficulty: "Advanced",
//     winChance: "Best"
//   },
//   {
//     id: 4,
//     name: "👑 Royal Flush",
//     tickets: [10, 11, 12],
//     price: 599,
//     description: "VIP experience with lucky numbers",
//     difficulty: "Pro",
//     winChance: "Premium"
//   },
//   {
//     id: 5,
//     name: "🎯 Target Master",
//     tickets: [13, 14, 15],
//     price: 699,
//     description: "Strategic number placement for better odds",
//     difficulty: "Expert",
//     winChance: "Excellent"
//   },
// ];

// // Agents Data
// const AGENTS = [
//   {
//     id: 1,
//     name: "Rajesh Kumar",
//     phone: "+919876543210",
//     whatsapp: "919876543210",
//     email: "rajesh.k@tambola.com",
//     experience: "8+ years",
//     language: "Hindi, English",
//     rating: 4.8,
//     totalBookings: 1250,
//     available: true,
//     avatar: "👨‍💼",
//     specialization: "Premium Tickets",
//     workingHours: "9 AM - 9 PM",
//     responseTime: "< 5 mins"
//   },
//   {
//     id: 2,
//     name: "Priya Sharma",
//     phone: "+919876543211",
//     whatsapp: "919876543211",
//     email: "priya.s@tambola.com",
//     experience: "5+ years",
//     language: "Hindi, English, Gujarati",
//     rating: 4.9,
//     totalBookings: 980,
//     available: true,
//     avatar: "👩‍💼",
//     specialization: "Group Bookings",
//     workingHours: "10 AM - 8 PM",
//     responseTime: "< 3 mins"
//   },
//   {
//     id: 3,
//     name: "Amit Patel",
//     phone: "+919876543212",
//     whatsapp: "919876543212",
//     email: "amit.p@tambola.com",
//     experience: "12+ years",
//     language: "Hindi, English, Marathi",
//     rating: 4.7,
//     totalBookings: 2100,
//     available: false,
//     avatar: "👨‍💼",
//     specialization: "VIP Service",
//     workingHours: "11 AM - 10 PM",
//     responseTime: "< 10 mins"
//   },
//   {
//     id: 4,
//     name: "Neha Gupta",
//     phone: "+919876543213",
//     whatsapp: "919876543213",
//     email: "neha.g@tambola.com",
//     experience: "3+ years",
//     language: "Hindi, English, Bengali",
//     rating: 5.0,
//     totalBookings: 450,
//     available: true,
//     avatar: "👩‍💼",
//     specialization: "New Players Guide",
//     workingHours: "8 AM - 7 PM",
//     responseTime: "< 2 mins"
//   },
//   {
//     id: 5,
//     name: "Suresh Reddy",
//     phone: "+919876543214",
//     whatsapp: "919876543214",
//     email: "suresh.r@tambola.com",
//     experience: "7+ years",
//     language: "Hindi, English, Telugu, Tamil",
//     rating: 4.6,
//     totalBookings: 1500,
//     available: true,
//     avatar: "👨‍💼",
//     specialization: "South India Region",
//     workingHours: "9 AM - 9 PM",
//     responseTime: "< 7 mins"
//   }
// ];

// const GamePage = () => {
//   const navigate = useNavigate();
//   const [timeLeft, setTimeLeft] = useState("");
//   const [search, setSearch] = useState("");
//   const [showFabMenu, setShowFabMenu] = useState(false);
//   const [availableTickets, setAvailableTickets] = useState(0);
//   const [showBookingModal, setShowBookingModal] = useState(false);
//   const [showAgentModal, setShowAgentModal] = useState(false);
//   const [selectedTicketType, setSelectedTicketType] = useState("");
//   const [selectedSets, setSelectedSets] = useState([]);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [showHelp, setShowHelp] = useState(false);
//   const [searchAgent, setSearchAgent] = useState("");
//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [playerName, setPlayerName] = useState("");
//   const [playerPhone, setPlayerPhone] = useState("");

//   const [showCustomBuilder, setShowCustomBuilder] = useState(false);
//   const [customTicketData, setCustomTicketData] = useState(null);
//   const gameTimeRef = useRef(new Date());

//   // Media Query Detection
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 640);
//       setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   useEffect(() => {
//     const gameTime = gameTimeRef.current;
//     gameTime.setHours(21);
//     gameTime.setMinutes(0);
//     gameTime.setSeconds(0);

//     setAvailableTickets(tickets.length);
//   }, []);

//   // Countdown Timer
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const diff = gameTimeRef.current - now;

//       if (diff <= 0) {
//         setTimeLeft("Game Live 🔴");
//         clearInterval(interval);
//         return;
//       }

//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const minutes = Math.floor((diff / (1000 * 60)) % 60);
//       const seconds = Math.floor((diff / 1000) % 60);

//       setTimeLeft(
//         `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
//       );
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const formattedGameTime = gameTimeRef.current.toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });

//   const formattedDate = gameTimeRef.current.toLocaleDateString("en-IN", {
//     weekday: 'short',
//     day: 'numeric',
//     month: 'short'
//   });

//   const filteredTickets = tickets.filter((ticket) => {
//     const searchText = search.toLowerCase();
//     return (
//       ticket.name.toLowerCase().includes(searchText) ||
//       ticket.id.toString().includes(searchText)
//     );
//   });

//   const filteredAgents = AGENTS.filter(agent => {
//     const searchLower = searchAgent.toLowerCase();
//     return (
//       agent.name.toLowerCase().includes(searchLower) ||
//       agent.language.toLowerCase().includes(searchLower) ||
//       agent.specialization.toLowerCase().includes(searchLower)
//     );
//   });

//   const handleContactAgent = (agent) => {
//     const message = encodeURIComponent(
//       `Hello ${agent.name},\n\nI'm interested in booking Tambola tickets. Can you please help me with the booking process?\n\nThank you!`
//     );
//     window.open(`https://wa.me/${agent.whatsapp}?text=${message}`, '_blank');
//   };

//   const handleCallAgent = (agent) => {
//     window.location.href = `tel:${agent.phone}`;
//   };

//   const handleSetSelection = (setId) => {
//     if (selectedSets.includes(setId)) {
//       setSelectedSets(selectedSets.filter(id => id !== setId));
//     } else {
//       setSelectedSets([...selectedSets, setId]);
//     }
//   };


//   const getTicketTypeName = () => {
//     const types = {
//       random: "Random Single Ticket",
//       halfsheet: "Half Sheet (6 Tickets)",
//       fullsheet: "Full Sheet (12 Tickets)",
//       custom: customTicketData ? "Custom Ticket (15 Numbers)" : "Custom Ticket",
//       set: `${selectedSets.length} Set${selectedSets.length > 1 ? 's' : ''} Selected`
//     };
//     return types[selectedTicketType] || "Not Selected";
//   };

//   const getTicketTypeDescription = () => {
//     const descriptions = {
//       random: "🎲 One individual Tambola ticket with 15 random numbers. Perfect for beginners!",
//       halfsheet: "📄 Half Sheet = 6 different tickets. Better chances to win with more number coverage!",
//       fullsheet: "📋 Full Sheet = 12 tickets. Maximum winning probability! Professional player's choice.",
//       set: "📦 Pre-selected ticket bundles with special number combinations. Great value for groups!"
//     };
//     return descriptions[selectedTicketType] || "";
//   };

//   const getTicketTypePrice = () => {
//     switch (selectedTicketType) {
//       case "random": return 50;
//       case "halfsheet": return 200;
//       case "fullsheet": return 350;
//       default: return 0;
//     }
//   };

//   const getTotalPrice = () => {
//     if (selectedTicketType === "set") {
//       return selectedSets.reduce((total, setId) => {
//         const set = TICKET_SETS.find(s => s.id === setId);
//         return total + (set?.price || 0);
//       }, 0);
//     }
//     return getTicketTypePrice() * quantity;
//   };

//   const getTicketCount = () => {
//     if (selectedTicketType === "random") return quantity;
//     if (selectedTicketType === "halfsheet") return quantity * 6;
//     if (selectedTicketType === "fullsheet") return quantity * 12;
//     if (selectedTicketType === "custom") return 1;
//     if (selectedTicketType === "set") return selectedSets.length * 3;
//     return 0;
//   };

//   const handleNextStep = () => {
//     if (currentStep === 1 && (!playerName || !playerPhone)) {
//       alert("Please fill in your details to continue");
//       return;
//     }
//     if (currentStep === 2 && !selectedTicketType) {
//       alert("Please select a ticket type");
//       return;
//     }
//     if (currentStep === 3 && selectedTicketType === "set" && selectedSets.length === 0) {
//       alert("Please select at least one ticket set");
//       return;
//     }
//     setCurrentStep(currentStep + 1);
//   };

//   const handleBookingSubmit = (e) => {
//     e.preventDefault();

//     if (!playerName || !playerPhone) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     if (!selectedTicketType) {
//       alert("Please select a ticket type");
//       return;
//     }

//     if (selectedTicketType === "set" && selectedSets.length === 0) {
//       alert("Please select at least one ticket set");
//       return;
//     }

//     const bookingData = {
//       playerName,
//       playerPhone,
//       ticketType: selectedTicketType,
//       quantity: selectedTicketType !== "set" && selectedTicketType !== "custom" ? quantity : null,
//       selectedSets: selectedTicketType === "set" ? selectedSets : null,
//       customTicket: selectedTicketType === "custom" ? customTicketData : null,
//       timestamp: new Date().toISOString(),
//     };

//     console.log("Booking Data:", bookingData);

//     alert(`🎉 Booking Successful!\n\nThank you ${playerName}!\n\nTicket Type: ${getTicketTypeName()}\nTotal Amount: ₹${getTotalPrice()}\n\nYou will receive confirmation on ${playerPhone}\n\nGood luck for the game! 🍀`);

//     // Reset states
//     setShowBookingModal(false);
//     setPlayerName("");
//     setPlayerPhone("");
//     setSelectedSets([]);
//     setQuantity(1);
//     setSelectedTicketType("");
//     setCustomTicketData(null);
//     setCurrentStep(1);
//   };

//   return (
//     <>
//       <div className={`min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative`}>

//         {/* Animated background elements */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
//             backgroundSize: '40px 40px'
//           }}></div>
//         </div>

//         <div className="relative z-10 max-w-8xl mx-auto space-y-3">

//           {/* LOGO HEADER - Click to go Home (Replacing "GET RICH") */}
//           <div className="flex justify-center mb-2">
//             <div
//               onClick={() => navigate(ROUTES.HOME)}
//               className="relative group cursor-pointer"
//             >
//               <div className="absolute inset-0 bg-[#FBEFA4] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
//               <div className="relative w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-[#004296] to-[#002b66] rounded-full flex items-center justify-center border-4 border-[#FBEFA4] shadow-xl overflow-hidden">
//                 <img
//                   src={logoImage}
//                   alt="Tambola Logo"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* TICKET FOR GAMES Header */}
//           <div className="overflow-hidden rounded-b-3xl bg-linear-to-r from-[#004296] to-[#003380] p-2 md:p-3 relative border border-[#FBEFA4]/30">
//             <div className="absolute top-0 right-0 w-40 h-40 bg-[#FBEFA4] rounded-full filter blur-3xl opacity-10"></div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-[#FBEFA4] via-white to-[#FBEFA4] bg-clip-text text-transparent tracking-wider">
//               TICKET FOR GAMES
//             </h1>
//           </div>

//           {/* TIMER SECTION - Single Row: Date | Game Time | Countdown */}
//           <div className="timer-cards grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
//             <div className="timer-card bg-[#004296]/60 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-[#FBEFA4]/30">
//               <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
//                 <span className="text-[#FBEFA4] text-lg">📅</span>
//                 <p className="font-bold text-[#FBEFA4] text-sm sm:text-base">Date</p>
//               </div>
//               <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white">
//                 {formattedDate}
//               </p>
//             </div>

//             <div className="timer-card bg-[#004296]/60 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-[#FBEFA4]/30">
//               <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
//                 <span className="text-[#FBEFA4] text-lg">⏰</span>
//                 <p className="font-bold text-[#FBEFA4] text-sm sm:text-base">Game Time</p>
//               </div>
//               <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white">
//                 {formattedGameTime}
//               </p>
//             </div>

//             <div className="timer-card bg-[#FBEFA4]/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-[#FBEFA4]">
//               <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
//                 <span className="text-[#FBEFA4] text-lg">⏱️</span>
//                 <p className="font-bold text-[#FBEFA4] text-sm sm:text-base">Countdown</p>
//               </div>
//               <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-[#FBEFA4] font-mono">
//                 {timeLeft}
//               </p>
//             </div>
//           </div>

//           {/* Tickets Container */}
//           <div className="w-full bg-[#004296]/40 backdrop-blur-sm p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-xl border border-[#FBEFA4]/30">

//             {/* SEARCH BAR - Responsive */}
//             <div className="w-full flex justify-center p-2 md:p-3 relative">
//               <div className="search-container relative w-full sm:w-[90%] md:w-125 lg:w-150 p-2">
//                 <input
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="🔍 Search by name or ticket number..."
//                   className="search-input w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border-2 border-[#FBEFA4]/40 text-sm sm:text-base outline-none focus:border-[#FBEFA4] transition-all"
//                 />
//                 {search && (
//                   <button
//                     onClick={() => setSearch("")}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FBEFA4] hover:text-white bg-[#004296]/50 rounded-full w-6 h-6 flex items-center justify-center"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* TICKETS GRID - Responsive */}
//             <div className="tickets-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pb-16 sm:pb-20 md:pb-24 p-2 md:p-4 relative">
//               {filteredTickets.length > 0 ? (
//                 filteredTickets.map((ticket) => (
//                   <div
//                     key={ticket.id}
//                     className="ticket-card group relative bg-white rounded-2xl md:rounded-3xl p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-[#FBEFA4] hover:border-[#FBEFA4] hover:scale-[1.02]"
//                   >
//                     <div className="relative z-10">
//                       {/* TITLE */}
//                       <div className="overflow-hidden bg-linear-to-r from-[#004296] to-[#003380] mb-2 md:mb-3 rounded-xl p-2 border border-[#FBEFA4]/30">
//                         <h1 className="ticket-title text-xl sm:text-2xl font-bold text-center text-[#FBEFA4] tracking-wider">
//                           TNO:{ticket.id}
//                         </h1>
//                       </div>

//                       {/* MAIN CONTENT (LEFT + RIGHT) - Responsive layout */}
//                       <div className="ticket-content flex flex-col sm:flex-row gap-3 md:gap-4">
//                         {/* LEFT SIDE */}
//                         <div className="flex-1">
//                           {/* BOOKED INFO */}
//                           <div className="booked-info bg-[#FBEFA4]/10 text-gray-800 rounded-xl md:rounded-2xl p-2 sm:p-3 mb-2 md:mb-3 text-xs sm:text-sm shadow border border-[#FBEFA4]/30">
//                             <p className="truncate"><b className="text-[#004296]">Booked By:</b> {ticket.name}</p>
//                             <p><b className="text-[#004296]">Agent Name:</b> -</p>
//                             <p><b className="text-[#004296]">Won last Time?:</b> <span className="text-green-600 font-bold">{ticket.win}</span></p>
//                           </div>

//                           {/* GRID */}
//                           <div className="bg-gray-50 p-1 sm:p-2 rounded-xl md:rounded-2xl shadow-inner border border-gray-200">
//                             <div className="ticket-grid-numbers grid grid-cols-9 gap-0.5 sm:gap-1">
//                               {ticket.numbers.map((row, i) => (
//                                 <React.Fragment key={i}>
//                                   {row.map((num, j) => (
//                                     <div
//                                       key={`${i}-${j}`}
//                                       className={`number-cell h-6 sm:h-7 md:h-8 flex items-center justify-center text-[0.625rem] sm:text-xs font-bold rounded border
//                                         ${num !== 0
//                                           ? "bg-linear-to-brrom-[#004296] to-[#003380] text-white border-[#FBEFA4]/40"
//                                           : "bg-gray-200 text-gray-400"}`}
//                                     >
//                                       {num !== 0 ? num : ""}
//                                     </div>
//                                   ))}
//                                 </React.Fragment>
//                               ))}
//                             </div>
//                           </div>
//                         </div>

//                         {/* RIGHT SIDE */}
//                         <div className="ticket-right w-full sm:w-[40%] flex flex-col justify-between">
//                           <p className="text-xs sm:text-sm text-gray-700 mb-2 font-medium">
//                             Book the ticket. We have big big prize for this game.
//                           </p>

//                           <div className="ticket-buttons flex flex-row sm:flex-col gap-2 mt-2">
//                             <button className="bg-linear-to-r from-[#004296] to-[#003380] hover:from-[#003380] hover:to-[#004296] text-white py-1.5 sm:py-2 px-3 rounded-lg text-sm sm:text-base font-semibold transition-all shadow-md border border-[#FBEFA4]/30">
//                               Buy Now
//                             </button>
//                             <button className="bg-[#FBEFA4] hover:bg-[#FFE44D] text-[#004296] py-1.5 sm:py-2 px-3 rounded-lg text-sm sm:text-base font-semibold transition-all shadow-md">
//                               Add Cart
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="col-span-full text-center py-8 sm:py-12">
//                   <p className="text-lg sm:text-2xl text-[#FBEFA4]">No tickets found</p>
//                   <p className="text-white/60 text-sm sm:text-base mt-2">Try a different search term</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* FLOATING ACTION BUTTONS - Responsive */}
//         <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 sm:gap-3">
//           {showFabMenu && (
//             <div className="flex flex-col gap-2 sm:gap-3 mb-2 sm:mb-3">
//               <button
//                 onClick={() => {
//                   setShowFabMenu(false);
//                   setShowBookingModal(true);
//                   setCurrentStep(1);
//                 }}
//                 className="fab-menu-button flex items-center gap-2 sm:gap-3 bg-linear-to-r from-[#004296] to-[#003380] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl text-xs sm:text-sm border-2 border-[#FBEFA4]"
//               >
//                 <span className="text-base sm:text-xl">🎫</span>
//                 <span className="font-semibold">
//                   {isMobile ? availableTickets : `${availableTickets} Tickets Available`}
//                 </span>
//               </button>

//               <button
//                 onClick={() => {
//                   setShowFabMenu(false);
//                   setShowAgentModal(true);
//                 }}
//                 className="fab-menu-button flex items-center gap-2 sm:gap-3 bg-[#FBEFA4] text-[#004296] px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl text-xs sm:text-sm font-bold"
//               >
//                 <span className="text-base sm:text-xl">📞</span>
//                 <span className="font-semibold">Contact Agent</span>
//               </button>
//             </div>
//           )}

//           <button
//             onClick={() => setShowFabMenu(!showFabMenu)}
//             className="fab-button w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 bg-linear-to-br from-[#004296] to-[#003380] rounded-full shadow-2xl flex items-center justify-center border-3 border-[#FBEFA4] hover:scale-110 transition-all"
//           >
//             <span className={`text-xl sm:text-2xl md:text-3xl text-[#FBEFA4] transition-transform duration-300 ${showFabMenu ? 'rotate-45' : ''}`}>
//               {showFabMenu ? '✕' : '🎯'}
//             </span>
//           </button>
//         </div>

//         {/* AGENT MODAL - Responsive */}
//         {showAgentModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
//             <div className="agent-modal bg-linear-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-5xl max-h-[90vh] overflow-hidden border-2 border-[#FBEFA4]/50 shadow-2xl">
//               {/* Modal Header */}
//               <div className="sticky top-0 bg-linear-to-r from-[#004296] to-[#003380] p-4 sm:p-6 border-b-2 border-[#FBEFA4]/50 z-10">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4] flex items-center gap-2 sm:gap-3">
//                       <span>📞</span> Contact Our Agents
//                     </h2>
//                     <p className="text-white/80 text-xs sm:text-sm mt-1">Connect with our experienced agents for quick assistance</p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setShowAgentModal(false);
//                       setSelectedAgent(null);
//                       setSearchAgent("");
//                     }}
//                     className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
//                   >
//                     <span className="text-lg sm:text-2xl">✕</span>
//                   </button>
//                 </div>

//                 {/* Agent Search */}
//                 <div className="mt-3 sm:mt-4 relative">
//                   <input
//                     type="text"
//                     placeholder="🔍 Search by name, language, or specialization..."
//                     value={searchAgent}
//                     onChange={(e) => setSearchAgent(e.target.value)}
//                     className="w-full px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base rounded-xl bg-white/10 border border-[#FBEFA4]/30 text-white placeholder-white/50 outline-none focus:border-[#FBEFA4]"
//                   />
//                   {searchAgent && (
//                     <button
//                       onClick={() => setSearchAgent("")}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
//                   <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 text-center">
//                     <p className="text-[0.625rem] sm:text-xs text-white/60">Total Agents</p>
//                     <p className="text-base sm:text-xl font-bold text-[#FBEFA4]">{AGENTS.length}</p>
//                   </div>
//                   <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 text-center">
//                     <p className="text-[0.625rem] sm:text-xs text-white/60">Available Now</p>
//                     <p className="text-base sm:text-xl font-bold text-green-400">
//                       {AGENTS.filter(a => a.available).length}
//                     </p>
//                   </div>
//                   <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 text-center">
//                     <p className="text-[0.625rem] sm:text-xs text-white/60">Avg Response</p>
//                     <p className="text-base sm:text-xl font-bold text-[#FBEFA4]">{"< 5 min"}</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Modal Body */}
//               <div className="overflow-y-auto max-h-[calc(85vh-200px)] p-3 sm:p-4 md:p-6">
//                 {!selectedAgent ? (
//                   <div className="grid gap-3 sm:gap-4">
//                     {filteredAgents.length > 0 ? (
//                       filteredAgents.map((agent) => (
//                         <div
//                           key={agent.id}
//                           className={`agent-card bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-3 sm:p-4 md:p-5 border-2 ${agent.available ? 'border-[#FBEFA4]/30' : 'border-gray-500/30 opacity-75'
//                             }`}
//                         >
//                           <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
//                             <div className="relative">
//                               <div className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 bg-gradient-to-br from-[#004296] to-[#003380] rounded-full flex items-center justify-center text-2xl sm:text-3xl border-2 border-[#FBEFA4]/50">
//                                 {agent.avatar}
//                               </div>
//                               <div className={`absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white ${agent.available ? 'bg-green-500' : 'bg-gray-500'
//                                 }`}></div>
//                             </div>

//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-1">
//                                 <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{agent.name}</h3>
//                                 <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-0.5 rounded-full">
//                                   <span className="text-[#FBEFA4] text-xs sm:text-sm">★</span>
//                                   <span className="text-xs sm:text-sm text-[#FBEFA4]">{agent.rating}</span>
//                                 </div>
//                               </div>

//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-sm">
//                                 <p className="text-white/70">
//                                   <span className="text-white/50">Experience:</span> {agent.experience}
//                                 </p>
//                                 <p className="text-white/70">
//                                   <span className="text-white/50">Languages:</span> {agent.language}
//                                 </p>
//                                 <p className="text-white/70">
//                                   <span className="text-white/50">Specialization:</span> {agent.specialization}
//                                 </p>
//                                 <p className="text-white/70">
//                                   <span className="text-white/50">Response:</span> {agent.responseTime}
//                                 </p>
//                               </div>

//                               <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
//                                 <span className="text-[0.625rem] sm:text-xs bg-white/10 px-2 py-1 rounded-full text-white/60">
//                                   📞 {agent.phone}
//                                 </span>
//                                 <span className="text-[0.625rem] sm:text-xs bg-green-500/20 px-2 py-1 rounded-full text-green-300">
//                                   💬 WhatsApp
//                                 </span>
//                               </div>
//                             </div>

//                             <div className="agent-actions flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
//                               <button
//                                 onClick={() => handleContactAgent(agent)}
//                                 disabled={!agent.available}
//                                 className={`flex-1 px-3 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 ${agent.available
//                                   ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
//                                   : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
//                                   }`}
//                               >
//                                 <span>💬</span> WhatsApp
//                               </button>
//                               <button
//                                 onClick={() => setSelectedAgent(agent)}
//                                 className="flex-1 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 text-white"
//                               >
//                                 <span>👁️</span> View
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="text-center py-8 sm:py-12">
//                         <p className="text-lg sm:text-2xl text-white/50 mb-2">😕 No agents found</p>
//                         <p className="text-white/40 text-sm sm:text-base">Try adjusting your search</p>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="space-y-4 sm:space-y-6">
//                     <button
//                       onClick={() => setSelectedAgent(null)}
//                       className="text-[#FBEFA4] hover:text-white flex items-center gap-2 text-sm sm:text-base"
//                     >
//                       ← Back to all agents
//                     </button>

//                     <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
//                       <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
//                         <div className="relative">
//                           <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#004296] to-[#003380] rounded-full flex items-center justify-center text-4xl sm:text-5xl border-3 border-[#FBEFA4]">
//                             {selectedAgent.avatar}
//                           </div>
//                           <div className={`absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-3 border-white ${selectedAgent.available ? 'bg-green-500' : 'bg-gray-500'
//                             }`}></div>
//                         </div>

//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 sm:gap-3 mb-2">
//                             <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{selectedAgent.name}</h3>
//                             <div className="flex items-center gap-1 bg-yellow-500/20 px-2 sm:px-3 py-1 rounded-full">
//                               <span className="text-[#FBEFA4] text-base sm:text-lg">★</span>
//                               <span className="text-[#FBEFA4] text-sm sm:text-base">{selectedAgent.rating}</span>
//                               <span className="text-white/50 text-xs sm:text-sm">({selectedAgent.totalBookings} bookings)</span>
//                             </div>
//                           </div>

//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
//                             <div>
//                               <p className="text-white/50 text-xs sm:text-sm">Experience</p>
//                               <p className="text-white text-base sm:text-lg">{selectedAgent.experience}</p>
//                             </div>
//                             <div>
//                               <p className="text-white/50 text-xs sm:text-sm">Languages</p>
//                               <p className="text-white text-base sm:text-lg">{selectedAgent.language}</p>
//                             </div>
//                             <div>
//                               <p className="text-white/50 text-xs sm:text-sm">Specialization</p>
//                               <p className="text-white text-base sm:text-lg">{selectedAgent.specialization}</p>
//                             </div>
//                             <div>
//                               <p className="text-white/50 text-xs sm:text-sm">Working Hours</p>
//                               <p className="text-white text-base sm:text-lg">{selectedAgent.workingHours}</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
//                         <button
//                           onClick={() => handleCallAgent(selectedAgent)}
//                           className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 text-white"
//                         >
//                           <span className="text-xl sm:text-2xl">📞</span> Call Now
//                         </button>
//                         <button
//                           onClick={() => handleContactAgent(selectedAgent)}
//                           className="p-3 sm:p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 text-white"
//                         >
//                           <span className="text-xl sm:text-2xl">💬</span> WhatsApp
//                         </button>
//                       </div>

//                       <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
//                         <p className="text-xs sm:text-sm text-blue-200">
//                           <span className="font-bold">💡 Tip:</span> WhatsApp is the fastest way to get a response.
//                           {selectedAgent.name} typically replies within {selectedAgent.responseTime}!
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="sticky bottom-0 bg-gradient-to-r from-[#004296] to-[#003380] p-3 sm:p-4 border-t border-[#FBEFA4]/30">
//                 <p className="text-center text-white/50 text-xs sm:text-sm">
//                   All agents are verified and experienced in Tambola games.
//                   Your privacy is protected.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ENHANCED BOOKING MODAL - Responsive */}
//         {showBookingModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
//             <div className="booking-modal bg-gradient-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">

//               {/* Modal Header with Progress Bar */}
//               <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-[#FBEFA4]/50 z-10">
//                 <div className="flex justify-between items-center mb-3 sm:mb-4">
//                   <div className="flex items-center gap-2 sm:gap-3">
//                     <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4]">Book Your Tickets</h2>
//                     <button
//                       onClick={() => setShowHelp(!showHelp)}
//                       className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
//                       title="How to book tickets?"
//                     >
//                       <span className="text-base sm:text-lg">❓</span>
//                     </button>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setShowBookingModal(false);
//                       setCurrentStep(1);
//                       setSelectedTicketType("");
//                       setSelectedSets([]);
//                       setQuantity(1);
//                     }}
//                     className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
//                   >
//                     <span className="text-xl sm:text-2xl">✕</span>
//                   </button>
//                 </div>

//                 {/* Help Box */}
//                 {showHelp && (
//                   <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-sm border border-[#FBEFA4]/30">
//                     <h3 className="font-bold text-[#FBEFA4] mb-2">📖 How to Book Tickets:</h3>
//                     <ol className="list-decimal list-inside space-y-1 text-white/90">
//                       <li>Enter your name and phone number</li>
//                       <li>Choose your ticket type (Single, Half Sheet, or Full Sheet)</li>
//                       <li>Select quantity or choose from special ticket sets</li>
//                       <li>Review your order and confirm booking</li>
//                     </ol>
//                     <p className="mt-2 text-[#FBEFA4]">💡 Tip: Half Sheet and Full Sheet give better value and more winning chances!</p>
//                   </div>
//                 )}

//                 {/* Progress Steps */}
//                 <div className="progress-steps flex items-center justify-between">
//                   {[1, 2, 3, 4].map((step) => (
//                     <div key={step} className="flex items-center">
//                       <div className={`step-number w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-base transition-all ${currentStep >= step
//                         ? 'bg-[#FBEFA4] text-[#004296] shadow-lg'
//                         : 'bg-white/20 text-white/60'
//                         }`}>
//                         {step}
//                       </div>
//                       {step < 4 && (
//                         <div className={`w-8 sm:w-12 md:w-20 h-1 mx-1 sm:mx-2 ${currentStep > step ? 'bg-[#FBEFA4]' : 'bg-white/20'
//                           }`}></div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex justify-between mt-1 sm:mt-2 text-[0.625rem] sm:text-xs text-white/80">
//                   <span>Details</span>
//                   <span>Choose Type</span>
//                   <span>Select</span>
//                   <span>Confirm</span>
//                 </div>
//               </div>

//               {/* Modal Body with Steps */}
//               <form onSubmit={handleBookingSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">

//                 {/* STEP 1: Player Details */}
//                 {currentStep === 1 && (
//                   <div className="space-y-4 sm:space-y-6">
//                     <div className="bg-gradient-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
//                       <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
//                         <span>👤</span> Step 1: Your Details
//                       </h3>
//                       <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6">Please enter your information to book tickets</p>

//                       <div className="form-grid grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                         <div>
//                           <label className="block text-[#FBEFA4] mb-2 text-base sm:text-lg">
//                             Full Name <span className="text-red-400">*</span>
//                           </label>
//                           <input
//                             type="text"
//                             value={playerName}
//                             onChange={(e) => setPlayerName(e.target.value)}
//                             placeholder="e.g., Raj Kumar"
//                             className="w-full px-3 sm:px-4 py-2 sm:py-4 rounded-xl bg-white/10 border-2 border-[#FBEFA4]/30 text-white placeholder-white/40 outline-none focus:border-[#FBEFA4] text-sm sm:text-base"
//                             required
//                           />
//                           <p className="text-[0.625rem] sm:text-xs text-white/50 mt-1">This name will appear on your ticket</p>
//                         </div>

//                         <div>
//                           <label className="block text-[#FBEFA4] mb-2 text-base sm:text-lg">
//                             Phone Number <span className="text-red-400">*</span>
//                           </label>
//                           <input
//                             type="tel"
//                             value={playerPhone}
//                             onChange={(e) => setPlayerPhone(e.target.value)}
//                             placeholder="e.g., 9876543210"
//                             className="w-full px-3 sm:px-4 py-2 sm:py-4 rounded-xl bg-white/10 border-2 border-[#FBEFA4]/30 text-white placeholder-white/40 outline-none focus:border-[#FBEFA4] text-sm sm:text-base"
//                             required
//                           />
//                           <p className="text-[0.625rem] sm:text-xs text-white/50 mt-1">We'll send booking confirmation via SMS/WhatsApp</p>
//                         </div>
//                       </div>

//                       <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
//                         <p className="text-xs sm:text-sm text-blue-200">
//                           <span className="font-bold">🔒 Your information is safe:</span> We only use this to send your ticket details and game updates.
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex justify-end">
//                       <button
//                         type="button"
//                         onClick={handleNextStep}
//                         className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold text-sm sm:text-base"
//                       >
//                         Next: Choose Ticket Type →
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* STEP 2: Choose Ticket Type */}
//                 {currentStep === 2 && (
//                   <div className="space-y-4 sm:space-y-6">
//                     <div className="bg-gradient-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
//                       <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
//                         <span>🎫</span> Step 2: Choose Ticket Type
//                       </h3>

//                       <div className="ticket-types-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//                         {[
//                           { id: 'random', name: 'Single Ticket', price: 50, tickets: 1, icon: '🎲' },
//                           { id: 'halfsheet', name: 'Half Sheet', price: 200, tickets: 6, icon: '📄' },
//                           { id: 'fullsheet', name: 'Full Sheet', price: 350, tickets: 12, icon: '📋' },
//                         ].map((type) => (
//                           <div
//                             key={type.id}
//                             onClick={() => {
//                               setSelectedTicketType(type.id);

//                             }}
//                             className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${selectedTicketType === type.id
//                               ? 'border-[#FBEFA4] bg-[#FBEFA4]/10'
//                               : 'border-white/20 bg-white/5 hover:border-[#FBEFA4]/50'
//                               }`}
//                           >
//                             <div className="text-3xl mb-2">{type.icon}</div>
//                             <h4 className="text-lg font-bold text-white">{type.name}</h4>
//                             <p className="text-[#FBEFA4] font-bold text-xl mt-1">₹{type.price}</p>
//                             <p className="text-white/60 text-sm">{type.tickets} ticket{type.tickets > 1 ? 's' : ''}</p>
//                           </div>
//                         ))}
//                       </div>

//                       {selectedTicketType && selectedTicketType !== 'custom' && (
//                         <div className="mt-4 p-4 bg-[#FBEFA4]/10 rounded-xl border border-[#FBEFA4]/30">
//                           <p className="text-white/90 text-sm">{getTicketTypeDescription()}</p>
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex justify-between">
//                       <button
//                         type="button"
//                         onClick={() => setCurrentStep(1)}
//                         className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-sm sm:text-base"
//                       >
//                         ← Back
//                       </button>

//                       <button
//                         type="button"
//                         onClick={handleNextStep}
//                         disabled={!selectedTicketType}
//                         className={`px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-white font-bold text-sm sm:text-base ${selectedTicketType
//                           ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
//                           : 'bg-gray-500 cursor-not-allowed'
//                           }`}
//                       >
//                         Next: Select Quantity →
//                       </button>

//                     </div>
//                   </div>
//                 )}



//                 {/* STEP 3: Select Quantity or Sets */}
//                 {currentStep === 3 && (
//                   <div className="space-y-4 sm:space-y-6">
//                     <div className="bg-gradient-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
//                       <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
//                         <span>🔢</span> Step 3: Select Quantity
//                       </h3>

//                       {selectedTicketType !== 'set' ? (
//                         <div>
//                           <label className="block text-[#FBEFA4] mb-2 text-base sm:text-lg">How many?</label>
//                           <div className="flex items-center gap-4">
//                             <button
//                               type="button"
//                               onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                               className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full text-white text-xl font-bold"
//                             >
//                               -
//                             </button>
//                             <span className="text-2xl font-bold text-white">{quantity}</span>
//                             <button
//                               type="button"
//                               onClick={() => setQuantity(quantity + 1)}
//                               className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full text-white text-xl font-bold"
//                             >
//                               +
//                             </button>
//                           </div>
//                           <p className="text-white/60 text-sm mt-2">Total Tickets: {getTicketCount()}</p>
//                         </div>
//                       ) : (
//                         <div>
//                           <p className="text-white/80 mb-4">Choose from our special ticket sets:</p>
//                           <div className="grid gap-3">
//                             {TICKET_SETS.map((set) => (
//                               <div
//                                 key={set.id}
//                                 onClick={() => handleSetSelection(set.id)}
//                                 className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${selectedSets.includes(set.id)
//                                   ? 'border-[#FBEFA4] bg-[#FBEFA4]/10'
//                                   : 'border-white/20 bg-white/5 hover:border-[#FBEFA4]/50'
//                                   }`}
//                               >
//                                 <div className="flex justify-between items-center">
//                                   <div>
//                                     <h4 className="text-lg font-bold text-white">{set.name}</h4>
//                                     <p className="text-white/60 text-sm">{set.description}</p>
//                                     <p className="text-white/50 text-xs mt-1">Difficulty: {set.difficulty} | Win Chance: {set.winChance}</p>
//                                   </div>
//                                   <div className="text-right">
//                                     <p className="text-[#FBEFA4] font-bold text-xl">₹{set.price}</p>
//                                     <p className="text-white/60 text-sm">{set.tickets.length} tickets</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex justify-between">
//                       <button
//                         type="button"
//                         onClick={() => setCurrentStep(2)}
//                         className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-sm sm:text-base"
//                       >
//                         ← Back
//                       </button>
//                       <button
//                         type="button"
//                         onClick={handleNextStep}
//                         className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold text-sm sm:text-base"
//                       >
//                         Next: Review →
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* STEP 4: Review & Confirm */}
//                 {currentStep === 4 && (
//                   <div className="space-y-4 sm:space-y-6">
//                     <div className="bg-gradient-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
//                       <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
//                         <span>✅</span> Step 4: Review & Confirm
//                       </h3>

//                       <div className="space-y-3">
//                         <div className="flex justify-between py-2 border-b border-white/20">
//                           <span className="text-white/70">Player Name:</span>
//                           <span className="text-white font-bold">{playerName}</span>
//                         </div>
//                         <div className="flex justify-between py-2 border-b border-white/20">
//                           <span className="text-white/70">Phone Number:</span>
//                           <span className="text-white font-bold">{playerPhone}</span>
//                         </div>
//                         <div className="flex justify-between py-2 border-b border-white/20">
//                           <span className="text-white/70">Ticket Type:</span>
//                           <span className="text-white font-bold">{getTicketTypeName()}</span>
//                         </div>
//                         <div className="flex justify-between py-2 border-b border-white/20">
//                           <span className="text-white/70">Total Tickets:</span>
//                           <span className="text-white font-bold">{getTicketCount()}</span>
//                         </div>
//                         <div className="flex justify-between py-2">
//                           <span className="text-[#FBEFA4] text-lg font-bold">Total Amount:</span>
//                           <span className="text-[#FBEFA4] text-xl font-bold">₹{getTotalPrice()}</span>
//                         </div>
//                       </div>

//                       <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
//                         <p className="text-xs sm:text-sm text-green-200">
//                           By confirming, you agree to our terms and conditions. Payment will be collected by your assigned agent.
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex justify-between">
//                       <button
//                         type="button"
//                         onClick={() => setCurrentStep(3)}
//                         className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-sm sm:text-base"
//                       >
//                         ← Back
//                       </button>
//                       <button
//                         type="submit"
//                         className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#FBEFA4] to-[#FFE44D] hover:from-[#FFE44D] hover:to-[#FBEFA4] rounded-xl text-[#004296] font-bold text-sm sm:text-base"
//                       >
//                         Confirm Booking 🎉
//                       </button>
//                     </div>
//                   </div>
//                 )}

//               </form>
//             </div>
//           </div>
//         )}


//         {/* Bottom decoration */}
//         <div className="fixed bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-[#FBEFA4] to-transparent shadow-lg shadow-[#FBEFA4]/50"></div>
//       </div>
//     </>
//   );
// };

// export default GamePage;
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import logoImage from "../../assets/tambolaGame.jpeg";

const tickets = [
  {
    id: 1,
    name: "6000683491",
    win: "1.01%",
    numbers: [
      [7, 0, 24, 0, 44, 0, 68, 72, 0],
      [0, 13, 0, 31, 0, 47, 73, 0, 84],
      [28, 0, 39, 0, 57, 0, 0, 78, 86],
    ],
  },
  {
    id: 2,
    name: "Hilton Saikia",
    win: "1.83%",
    numbers: [
      [3, 0, 23, 42, 0, 60, 0, 80, 0],
      [0, 14, 0, 0, 30, 0, 51, 69, 83],
      [4, 0, 25, 0, 48, 56, 0, 0, 77],
    ],
  },
  {
    id: 3,
    name: "Rajiv S",
    win: "1.39%",
    numbers: [
      [12, 26, 0, 40, 0, 65, 0, 71, 0],
      [0, 0, 5, 0, 19, 0, 33, 52, 88],
      [9, 21, 0, 37, 0, 66, 79, 0, 0],
    ],
  },
  {
    id: 4,
    name: "Priya Sharma",
    win: "2.15%",
    numbers: [
      [8, 0, 27, 0, 43, 61, 0, 75, 0],
      [0, 11, 0, 29, 0, 0, 46, 62, 81],
      [15, 0, 34, 0, 55, 0, 70, 0, 89],
    ],
  },
  {
    id: 5,
    name: "Amit Kumar",
    win: "0.97%",
    numbers: [
      [2, 18, 0, 35, 0, 58, 0, 0, 76],
      [0, 0, 10, 0, 22, 0, 49, 63, 82],
      [17, 36, 0, 53, 0, 0, 67, 85, 0],
    ],
  },
  {
    id: 6,
    name: "Sarah Chen",
    win: "2.47%",
    numbers: [
      [6, 0, 20, 0, 41, 0, 59, 74, 0],
      [0, 16, 0, 32, 0, 50, 0, 64, 87],
      [1, 0, 38, 0, 54, 0, 71, 0, 90],
    ],
  },
  {
    id: 7,
    name: "Vikram Singh",
    win: "1.56%",
    numbers: [
      [9, 0, 21, 45, 0, 62, 0, 78, 0],
      [0, 4, 0, 0, 28, 0, 52, 68, 83],
      [11, 0, 33, 0, 56, 72, 0, 0, 88],
    ],
  },
  {
    id: 8,
    name: "Meera Patel",
    win: "3.21%",
    numbers: [
      [5, 19, 0, 38, 0, 57, 0, 73, 0],
      [0, 0, 14, 0, 26, 0, 43, 65, 80],
      [8, 31, 0, 47, 0, 69, 0, 0, 86],
    ],
  },
  {
    id: 9,
    name: "John D'Souza",
    win: "1.72%",
    numbers: [
      [12, 0, 24, 0, 36, 55, 0, 0, 79],
      [0, 7, 0, 29, 0, 0, 48, 61, 84],
      [15, 0, 35, 0, 51, 0, 66, 81, 0],
    ],
  },
  {
    id: 10,
    name: "Anjali Gupta",
    win: "2.08%",
    numbers: [
      [3, 17, 0, 42, 0, 60, 0, 77, 0],
      [0, 0, 10, 0, 23, 0, 44, 63, 82],
      [13, 30, 0, 49, 0, 70, 0, 0, 85],
    ],
  },
  {
    id: 11,
    name: "Mohammed Ali",
    win: "1.64%",
    numbers: [
      [18, 0, 25, 0, 39, 58, 0, 76, 0],
      [0, 6, 0, 22, 0, 0, 46, 67, 89],
      [2, 0, 34, 0, 53, 0, 71, 0, 83],
    ],
  },
  {
    id: 12,
    name: "Kavita Reddy",
    win: "2.93%",
    numbers: [
      [11, 0, 27, 41, 0, 54, 0, 72, 0],
      [0, 16, 0, 0, 32, 0, 50, 64, 80],
      [8, 0, 21, 0, 37, 59, 0, 0, 87],
    ],
  },
  {
    id: 13,
    name: "Rahul Nair",
    win: "1.18%",
    numbers: [
      [4, 20, 0, 45, 0, 66, 0, 0, 78],
      [0, 0, 9, 0, 28, 0, 52, 69, 84],
      [14, 31, 0, 55, 0, 0, 73, 90, 0],
    ],
  },
  {
    id: 14,
    name: "Sophia Rodrigues",
    win: "2.56%",
    numbers: [
      [7, 0, 19, 0, 33, 56, 0, 74, 0],
      [0, 12, 0, 26, 0, 0, 47, 61, 81],
      [5, 0, 36, 0, 48, 0, 68, 0, 86],
    ],
  },
  {
    id: 15,
    name: "Arjun Menon",
    win: "1.42%",
    numbers: [
      [1, 23, 0, 40, 0, 63, 0, 79, 0],
      [0, 0, 15, 0, 29, 0, 43, 65, 83],
      [10, 24, 0, 51, 0, 0, 70, 0, 88],
    ],
  },
  {
    id: 16,
    name: "Neha Kapoor",
    win: "1.95%",
    numbers: [
      [13, 0, 28, 0, 44, 57, 0, 75, 0],
      [0, 3, 0, 21, 0, 0, 38, 62, 82],
      [17, 0, 35, 0, 49, 0, 67, 0, 85],
    ],
  },
  {
    id: 17,
    name: "David Fernandes",
    win: "2.34%",
    numbers: [
      [8, 18, 0, 37, 0, 55, 0, 71, 0],
      [0, 0, 6, 0, 30, 0, 46, 64, 89],
      [11, 22, 0, 42, 0, 60, 0, 0, 78],
    ],
  },
  {
    id: 18,
    name: "Lakshmi Iyer",
    win: "1.27%",
    numbers: [
      [16, 0, 25, 0, 41, 59, 0, 80, 0],
      [0, 2, 0, 33, 0, 0, 50, 66, 84],
      [9, 0, 20, 0, 39, 0, 58, 0, 77],
    ],
  },
  {
    id: 19,
    name: "Karan Malhotra",
    win: "2.71%",
    numbers: [
      [14, 0, 27, 43, 0, 61, 0, 73, 0],
      [0, 5, 0, 0, 24, 0, 48, 69, 86],
      [12, 0, 32, 0, 54, 72, 0, 0, 88],
    ],
  },
  {
    id: 20,
    name: "Zara Sheikh",
    win: "1.88%",
    numbers: [
      [10, 26, 0, 36, 0, 53, 0, 76, 0],
      [0, 0, 4, 0, 21, 0, 45, 65, 81],
      [18, 31, 0, 47, 0, 63, 0, 0, 90],
    ],
  },
];

// Ticket Set Options
const TICKET_SETS = [
  {
    id: 1,
    name: "🎲 Beginner's Luck",
    tickets: [1, 2, 3],
    price: 299,
    description: "Perfect for first-time players! 3 tickets with balanced numbers",
    difficulty: "Easy",
    winChance: "Good"
  },
  {
    id: 2,
    name: "⭐ Golden Chance",
    tickets: [4, 5, 6],
    price: 399,
    description: "Popular choice! Higher winning probability",
    difficulty: "Medium",
    winChance: "Better"
  },
  {
    id: 3,
    name: "💎 Platinum Pro",
    tickets: [7, 8, 9],
    price: 499,
    description: "For serious players! Premium number combinations",
    difficulty: "Advanced",
    winChance: "Best"
  },
  {
    id: 4,
    name: "👑 Royal Flush",
    tickets: [10, 11, 12],
    price: 599,
    description: "VIP experience with lucky numbers",
    difficulty: "Pro",
    winChance: "Premium"
  },
  {
    id: 5,
    name: "🎯 Target Master",
    tickets: [13, 14, 15],
    price: 699,
    description: "Strategic number placement for better odds",
    difficulty: "Expert",
    winChance: "Excellent"
  },
];

// Agents Data
const AGENTS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    phone: "+919876543210",
    whatsapp: "919876543210",
    email: "rajesh.k@tambola.com",
    experience: "8+ years",
    language: "Hindi, English",
    rating: 4.8,
    totalBookings: 1250,
    available: true,
    avatar: "👨‍💼",
    specialization: "Premium Tickets",
    workingHours: "9 AM - 9 PM",
    responseTime: "< 5 mins"
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "+919876543211",
    whatsapp: "919876543211",
    email: "priya.s@tambola.com",
    experience: "5+ years",
    language: "Hindi, English, Gujarati",
    rating: 4.9,
    totalBookings: 980,
    available: true,
    avatar: "👩‍💼",
    specialization: "Group Bookings",
    workingHours: "10 AM - 8 PM",
    responseTime: "< 3 mins"
  },
  {
    id: 3,
    name: "Amit Patel",
    phone: "+919876543212",
    whatsapp: "919876543212",
    email: "amit.p@tambola.com",
    experience: "12+ years",
    language: "Hindi, English, Marathi",
    rating: 4.7,
    totalBookings: 2100,
    available: false,
    avatar: "👨‍💼",
    specialization: "VIP Service",
    workingHours: "11 AM - 10 PM",
    responseTime: "< 10 mins"
  },
  {
    id: 4,
    name: "Neha Gupta",
    phone: "+919876543213",
    whatsapp: "919876543213",
    email: "neha.g@tambola.com",
    experience: "3+ years",
    language: "Hindi, English, Bengali",
    rating: 5.0,
    totalBookings: 450,
    available: true,
    avatar: "👩‍💼",
    specialization: "New Players Guide",
    workingHours: "8 AM - 7 PM",
    responseTime: "< 2 mins"
  },
  {
    id: 5,
    name: "Suresh Reddy",
    phone: "+919876543214",
    whatsapp: "919876543214",
    email: "suresh.r@tambola.com",
    experience: "7+ years",
    language: "Hindi, English, Telugu, Tamil",
    rating: 4.6,
    totalBookings: 1500,
    available: true,
    avatar: "👨‍💼",
    specialization: "South India Region",
    workingHours: "9 AM - 9 PM",
    responseTime: "< 7 mins"
  }
];

// Payment Methods
const PAYMENT_METHODS = [
  {
    id: 'wallet',
    name: '💰 Wallet Payment',
    description: 'Pay directly from your wallet balance',
    icon: '💰',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'agent',
    name: '🤝 Pay via Agent',
    description: 'Contact an agent to complete your purchase',
    icon: '🤝',
    color: 'from-blue-500 to-blue-600'
  }
];

const GamePage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");
  const [search, setSearch] = useState("");
  const [showFabMenu, setShowFabMenu] = useState(false);
  const [availableTickets, setAvailableTickets] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState("");
  const [selectedSets, setSelectedSets] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [showHelp, setShowHelp] = useState(false);
  const [searchAgent, setSearchAgent] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [playerName, setPlayerName] = useState("");
  const [playerPhone, setPlayerPhone] = useState("");

  // Cart State
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [walletBalance] = useState(2500);
  
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [customTicketData, setCustomTicketData] = useState(null);
  const gameTimeRef = useRef(new Date());

  // Media Query Detection
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const gameTime = gameTimeRef.current;
    gameTime.setHours(21);
    gameTime.setMinutes(0);
    gameTime.setSeconds(0);

    setAvailableTickets(tickets.length);
  }, []);

  // Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = gameTimeRef.current - now;

      if (diff <= 0) {
        setTimeLeft("Game Live 🔴");
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedGameTime = gameTimeRef.current.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = gameTimeRef.current.toLocaleDateString("en-IN", {
    weekday: 'short',
    day: 'numeric',
    month: 'short'
  });

  const filteredTickets = tickets.filter((ticket) => {
    const searchText = search.toLowerCase();
    return (
      ticket.name.toLowerCase().includes(searchText) ||
      ticket.id.toString().includes(searchText)
    );
  });

  const filteredAgents = AGENTS.filter(agent => {
    const searchLower = searchAgent.toLowerCase();
    return (
      agent.name.toLowerCase().includes(searchLower) ||
      agent.language.toLowerCase().includes(searchLower) ||
      agent.specialization.toLowerCase().includes(searchLower)
    );
  });

  // Cart Functions
  const addToCart = (ticket) => {
    setCart(prev => {
      const existingTicket = prev.find(item => item.id === ticket.id);
      if (existingTicket) {
        alert(`Ticket #${ticket.id} is already in your cart!`);
        return prev;
      }
      return [...prev, { ...ticket, quantity: 1 }];
    });
  };

  const removeFromCart = (ticketId) => {
    setCart(prev => prev.filter(item => item.id !== ticketId));
  };

  const getCartTotal = () => {
    return cart.reduce((total) => total + 50, 0);
  };

  const getCartCount = () => {
    return cart.length;
  };

  const clearCart = () => {
    setCart([]);
  };

  // Payment Functions
  const handleWalletPayment = () => {
    const total = getCartTotal();
    if (walletBalance >= total) {
      alert(`✅ Payment Successful!\n\nAmount Deducted: ₹${total}\nRemaining Balance: ₹${walletBalance - total}\n\nYour tickets have been booked successfully!\n\nThank you for your purchase! 🎉`);
      clearCart();
      setShowCheckout(false);
      setSelectedPaymentMethod(null);
    } else {
      alert(`❌ Insufficient Balance!\n\nWallet Balance: ₹${walletBalance}\nCart Total: ₹${total}\n\nPlease add funds or choose agent payment.`);
    }
  };

  const handleAgentPayment = () => {
    setShowCheckout(false);
    setShowAgentModal(true);
    setSelectedPaymentMethod('agent');
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleContactAgent = (agent) => {
    const cartItems = cart.map(item => `Ticket #${item.id} - ${item.name}`).join('\n');
    const message = encodeURIComponent(
      `Hello ${agent.name},\n\nI want to purchase the following tickets:\n\n${cartItems}\n\nTotal Amount: ₹${getCartTotal()}\n\nPlease help me complete the booking.\n\nThank you!`
    );
    window.open(`https://wa.me/${agent.whatsapp}?text=${message}`, '_blank');
    
    setTimeout(() => {
      clearCart();
      setShowAgentModal(false);
      alert("🎉 Booking request sent! The agent will contact you shortly to complete the payment and booking.");
    }, 1000);
  };

  const handleCallAgent = (agent) => {
    window.location.href = `tel:${agent.phone}`;
  };

  const handleSetSelection = (setId) => {
    if (selectedSets.includes(setId)) {
      setSelectedSets(selectedSets.filter(id => id !== setId));
    } else {
      setSelectedSets([...selectedSets, setId]);
    }
  };

  const addSetToCart = (setData) => {
    const ticketsInSet = tickets.filter(t => setData.tickets.includes(t.id));
    let addedCount = 0;
    let skippedCount = 0;
    
    ticketsInSet.forEach(ticket => {
      const existingInCart = cart.find(item => item.id === ticket.id);
      if (!existingInCart) {
        setCart(prev => [...prev, { ...ticket, quantity: 1 }]);
        addedCount++;
      } else {
        skippedCount++;
      }
    });
    
    setTimeout(() => {
      if (addedCount > 0) {
        alert(`✅ Added ${addedCount} tickets from "${setData.name}" to cart!\n${skippedCount > 0 ? `⚠️ ${skippedCount} tickets were already in cart.` : ''}\nTotal: ₹${setData.price}`);
      } else {
        alert(`⚠️ All tickets from "${setData.name}" are already in your cart!`);
      }
    }, 100);
  };

  const getTicketTypeName = () => {
    const types = {
      random: "Random Single Ticket",
      halfsheet: "Half Sheet (6 Tickets)",
      fullsheet: "Full Sheet (12 Tickets)",
      custom: customTicketData ? "Custom Ticket (15 Numbers)" : "Custom Ticket",
      set: `${selectedSets.length} Set${selectedSets.length > 1 ? 's' : ''} Selected`
    };
    return types[selectedTicketType] || "Not Selected";
  };

  const getTicketTypeDescription = () => {
    const descriptions = {
      random: "🎲 One individual Tambola ticket with 15 random numbers. Perfect for beginners!",
      halfsheet: "📄 Half Sheet = 6 different tickets. Better chances to win with more number coverage!",
      fullsheet: "📋 Full Sheet = 12 tickets. Maximum winning probability! Professional player's choice.",
      set: "📦 Pre-selected ticket bundles with special number combinations. Great value for groups!"
    };
    return descriptions[selectedTicketType] || "";
  };

  const getTicketTypePrice = () => {
    switch (selectedTicketType) {
      case "random": return 50;
      case "halfsheet": return 200;
      case "fullsheet": return 350;
      default: return 0;
    }
  };

  const getTotalPrice = () => {
    if (selectedTicketType === "set") {
      return selectedSets.reduce((total, setId) => {
        const set = TICKET_SETS.find(s => s.id === setId);
        return total + (set?.price || 0);
      }, 0);
    }
    return getTicketTypePrice() * quantity;
  };

  const getTicketCount = () => {
    if (selectedTicketType === "random") return quantity;
    if (selectedTicketType === "halfsheet") return quantity * 6;
    if (selectedTicketType === "fullsheet") return quantity * 12;
    if (selectedTicketType === "custom") return 1;
    if (selectedTicketType === "set") return selectedSets.length * 3;
    return 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && (!playerName || !playerPhone)) {
      alert("Please fill in your details to continue");
      return;
    }
    if (currentStep === 2 && !selectedTicketType) {
      alert("Please select a ticket type");
      return;
    }
    if (currentStep === 3 && selectedTicketType === "set" && selectedSets.length === 0) {
      alert("Please select at least one ticket set");
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!playerName || !playerPhone) {
      alert("Please fill in all required fields");
      return;
    }

    if (!selectedTicketType) {
      alert("Please select a ticket type");
      return;
    }

    if (selectedTicketType === "set" && selectedSets.length === 0) {
      alert("Please select at least one ticket set");
      return;
    }

    const bookingData = {
      playerName,
      playerPhone,
      ticketType: selectedTicketType,
      quantity: selectedTicketType !== "set" && selectedTicketType !== "custom" ? quantity : null,
      selectedSets: selectedTicketType === "set" ? selectedSets : null,
      customTicket: selectedTicketType === "custom" ? customTicketData : null,
      timestamp: new Date().toISOString(),
    };

    console.log("Booking Data:", bookingData);

    alert(`🎉 Booking Successful!\n\nThank you ${playerName}!\n\nTicket Type: ${getTicketTypeName()}\nTotal Amount: ₹${getTotalPrice()}\n\nYou will receive confirmation on ${playerPhone}\n\nGood luck for the game! 🍀`);

    setShowBookingModal(false);
    setPlayerName("");
    setPlayerPhone("");
    setSelectedSets([]);
    setQuantity(1);
    setSelectedTicketType("");
    setCustomTicketData(null);
    setCurrentStep(1);
  };

  return (
    <>
      <div className={`min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] text-white game-container p-4 md:p-6 relative`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-8xl mx-auto space-y-3">
          {/* LOGO HEADER */}
          <div className="flex justify-center mb-2">
            <div
              onClick={() => navigate(ROUTES.HOME)}
              className="relative group cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#FBEFA4] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#004296] to-[#002b66] rounded-full flex items-center justify-center border-4 border-[#FBEFA4] shadow-xl overflow-hidden">
                <img
                  src={logoImage}
                  alt="Tambola Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* TICKET FOR GAMES Header with Cart Button */}
          <div className="overflow-hidden rounded-b-3xl bg-gradient-to-r from-[#004296] to-[#003380] p-2 md:p-3 relative border border-[#FBEFA4]/30">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FBEFA4] rounded-full filter blur-3xl opacity-10"></div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center flex-1 bg-gradient-to-r from-[#FBEFA4] via-white to-[#FBEFA4] bg-clip-text text-transparent tracking-wider">
                TICKET FOR GAMES
              </h1>
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-[#FBEFA4] hover:bg-[#FFE44D] text-[#004296] px-4 py-2 rounded-xl font-bold text-sm md:text-base shadow-lg transition-all transform hover:scale-105"
              >
                🛒 Cart {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* TIMER SECTION */}
          <div className="timer-cards grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            <div className="timer-card bg-[#004296]/60 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-[#FBEFA4]/30">
              <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                <span className="text-[#FBEFA4] text-lg">📅</span>
                <p className="font-bold text-[#FBEFA4] text-sm sm:text-base">Date</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white">
                {formattedDate}
              </p>
            </div>

            <div className="timer-card bg-[#004296]/60 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-[#FBEFA4]/30">
              <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                <span className="text-[#FBEFA4] text-lg">⏰</span>
                <p className="font-bold text-[#FBEFA4] text-sm sm:text-base">Game Time</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-white">
                {formattedGameTime}
              </p>
            </div>

            <div className="timer-card bg-[#FBEFA4]/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border-2 border-[#FBEFA4]">
              <div className="flex items-center justify-center gap-2 mb-1 md:mb-2">
                <span className="text-[#FBEFA4] text-lg">⏱️</span>
                <p className="font-bold text-[#FBEFA4] text-sm sm:text-base">Countdown</p>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-center text-[#FBEFA4] font-mono">
                {timeLeft}
              </p>
            </div>
          </div>

          {/* Tickets Container */}
          <div className="w-full bg-[#004296]/40 backdrop-blur-sm p-2 md:p-3 rounded-2xl md:rounded-3xl shadow-xl border border-[#FBEFA4]/30">
            {/* SEARCH BAR */}
            <div className="w-full flex justify-center p-2 md:p-3 relative">
              <div className="search-container relative w-full sm:w-[90%] md:w-125 lg:w-150 p-2">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="🔍 Search by name or ticket number..."
                  className="search-input w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border-2 border-[#FBEFA4]/40 text-sm sm:text-base outline-none focus:border-[#FBEFA4] transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FBEFA4] hover:text-white bg-[#004296]/50 rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* TICKETS GRID */}
            <div className="tickets-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 pb-16 sm:pb-20 md:pb-24 p-2 md:p-4 relative">
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => {
                  const isInCart = cart.some(item => item.id === ticket.id);
                  
                  return (
                    <div
                      key={ticket.id}
                      className={`ticket-card group relative bg-white rounded-2xl md:rounded-3xl p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                        isInCart ? 'border-green-500' : 'border-[#FBEFA4] hover:border-[#FBEFA4]'
                      } hover:scale-[1.02]`}
                    >
                      {isInCart && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold z-20">
                          ✓ In Cart
                        </div>
                      )}
                      
                      <div className="relative z-10">
                        {/* TITLE */}
                        <div className="overflow-hidden bg-gradient-to-r from-[#004296] to-[#003380] mb-2 md:mb-3 rounded-xl p-2 border border-[#FBEFA4]/30">
                          <h1 className="ticket-title text-xl sm:text-2xl font-bold text-center text-[#FBEFA4] tracking-wider">
                            TNO:{ticket.id}
                          </h1>
                        </div>

                        {/* MAIN CONTENT */}
                        <div className="ticket-content flex flex-col sm:flex-row gap-3 md:gap-4">
                          <div className="flex-1">
                            <div className="booked-info bg-[#FBEFA4]/10 text-gray-800 rounded-xl md:rounded-2xl p-2 sm:p-3 mb-2 md:mb-3 text-xs sm:text-sm shadow border border-[#FBEFA4]/30">
                              <p className="truncate"><b className="text-[#004296]">Booked By:</b> {ticket.name}</p>
                              <p><b className="text-[#004296]">Agent Name:</b> -</p>
                              <p><b className="text-[#004296]">Won last Time?:</b> <span className="text-green-600 font-bold">{ticket.win}</span></p>
                            </div>

                            <div className="bg-gray-50 p-1 sm:p-2 rounded-xl md:rounded-2xl shadow-inner border border-gray-200">
                              <div className="ticket-grid-numbers grid grid-cols-9 gap-0.5 sm:gap-1">
                                {ticket.numbers.map((row, i) => (
                                  <React.Fragment key={i}>
                                    {row.map((num, j) => (
                                      <div
                                        key={`${i}-${j}`}
                                        className={`number-cell h-6 sm:h-7 md:h-8 flex items-center justify-center text-[0.625rem] sm:text-xs font-bold rounded border
                                          ${num !== 0
                                            ? "bg-gradient-to-br from-[#004296] to-[#003380] text-white border-[#FBEFA4]/40"
                                            : "bg-gray-200 text-gray-400"}`}
                                      >
                                        {num !== 0 ? num : ""}
                                      </div>
                                    ))}
                                  </React.Fragment>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="ticket-right w-full sm:w-[40%] flex flex-col justify-between">
                            <p className="text-xs sm:text-sm text-gray-700 mb-2 font-medium">
                              Book the ticket. We have big big prize for this game.
                            </p>

                            <div className="ticket-buttons flex flex-row sm:flex-col gap-2 mt-2">
                              <button 
                                onClick={() => addToCart(ticket)}
                                disabled={isInCart}
                                className={`py-1.5 sm:py-2 px-3 rounded-lg text-sm sm:text-base font-semibold transition-all shadow-md ${
                                  isInCart 
                                    ? 'bg-green-500 text-white cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-[#004296] to-[#003380] hover:from-[#003380] hover:to-[#004296] text-white border border-[#FBEFA4]/30'
                                }`}
                              >
                                {isInCart ? '✓ Added' : 'Add to Cart'}
                              </button>
                              <button className="bg-[#FBEFA4] hover:bg-[#FFE44D] text-[#004296] py-1.5 sm:py-2 px-3 rounded-lg text-sm sm:text-base font-semibold transition-all shadow-md">
                                Buy Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-8 sm:py-12">
                  <p className="text-lg sm:text-2xl text-[#FBEFA4]">No tickets found</p>
                  <p className="text-white/60 text-sm sm:text-base mt-2">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Ticket Sets Section */}
            <div className="mt-6 px-2 md:px-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#FBEFA4] mb-4 text-center">
                🎁 Special Ticket Sets
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
                {TICKET_SETS.map(set => (
                  <div
                    key={set.id}
                    className="bg-gradient-to-br from-[#004296]/40 to-[#003380]/40 rounded-xl p-4 border border-[#FBEFA4]/30 hover:border-[#FBEFA4] transition-all cursor-pointer hover:scale-105"
                  >
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white mb-2">{set.name}</h3>
                      <p className="text-white/60 text-xs mb-3">{set.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-white/50 text-xs">Difficulty: {set.difficulty}</span>
                        <span className="text-white/50 text-xs">Win: {set.winChance}</span>
                      </div>
                      <p className="text-[#FBEFA4] font-bold text-xl mb-3">₹{set.price}</p>
                      <button
                        onClick={() => addSetToCart(set)}
                        className="w-full bg-[#FBEFA4] hover:bg-[#FFE44D] text-[#004296] py-2 rounded-lg font-bold text-sm transition-all"
                      >
                        Add Set to Cart ({set.tickets.length} tickets)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING ACTION BUTTONS */}
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2 sm:gap-3">
          {showFabMenu && (
            <div className="flex flex-col gap-2 sm:gap-3 mb-2 sm:mb-3">
              <button
                onClick={() => {
                  setShowFabMenu(false);
                  setShowBookingModal(true);
                  setCurrentStep(1);
                }}
                className="fab-menu-button flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-[#004296] to-[#003380] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl text-xs sm:text-sm border-2 border-[#FBEFA4]"
              >
                <span className="text-base sm:text-xl">🎫</span>
                <span className="font-semibold">
                  {isMobile ? availableTickets : `${availableTickets} Tickets Available`}
                </span>
              </button>

              <button
                onClick={() => {
                  setShowFabMenu(false);
                  setShowAgentModal(true);
                }}
                className="fab-menu-button flex items-center gap-2 sm:gap-3 bg-[#FBEFA4] text-[#004296] px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl text-xs sm:text-sm font-bold"
              >
                <span className="text-base sm:text-xl">📞</span>
                <span className="font-semibold">Contact Agent</span>
              </button>
            </div>
          )}

          <button
            onClick={() => setShowFabMenu(!showFabMenu)}
            className="fab-button w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 bg-gradient-to-br from-[#004296] to-[#003380] rounded-full shadow-2xl flex items-center justify-center border-3 border-[#FBEFA4] hover:scale-110 transition-all"
          >
            <span className={`text-xl sm:text-2xl md:text-3xl text-[#FBEFA4] transition-transform duration-300 ${showFabMenu ? 'rotate-45' : ''}`}>
              {showFabMenu ? '✕' : '🎯'}
            </span>
          </button>
        </div>

        {/* CART MODAL */}
        {showCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">
              <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-[#FBEFA4]/50 z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4] flex items-center gap-2">
                    🛒 Your Cart ({getCartCount()} items)
                  </h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
                  >
                    <span className="text-xl sm:text-2xl">✕</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {cart.length > 0 ? (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-bold">Ticket #{item.id}</h4>
                          <p className="text-white/60 text-sm">Booked by: {item.name}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-[#FBEFA4] font-bold">₹50</p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white/70">Total Amount:</span>
                        <span className="text-[#FBEFA4] text-2xl font-bold">₹{getCartTotal()}</span>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={clearCart}
                          className="flex-1 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold"
                        >
                          Clear Cart
                        </button>
                        <button
                          onClick={handleProceedToCheckout}
                          className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold"
                        >
                          Proceed to Checkout →
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-4xl mb-4">🛒</p>
                    <p className="text-white/70 text-lg">Your cart is empty</p>
                    <p className="text-white/40 text-sm mt-2">Add tickets to get started!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CHECKOUT MODAL */}
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">
              <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-[#FBEFA4]/50 z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#FBEFA4]">💳 Checkout</h2>
                  <button
                    onClick={() => {
                      setShowCheckout(false);
                      setSelectedPaymentMethod(null);
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
                  >
                    <span className="text-xl sm:text-2xl">✕</span>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {/* Order Summary */}
                <div className="bg-white/10 rounded-xl p-4 mb-6">
                  <h3 className="text-white font-bold mb-3">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Items:</span>
                      <span className="text-white">{getCartCount()} tickets</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Total Amount:</span>
                      <span className="text-[#FBEFA4] font-bold text-lg">₹{getCartTotal()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <h3 className="text-white font-bold mb-4">Select Payment Method</h3>
                <div className="grid gap-4">
                  {PAYMENT_METHODS.map(method => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-[#FBEFA4] bg-[#FBEFA4]/10'
                          : 'border-white/20 bg-white/5 hover:border-[#FBEFA4]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{method.icon}</span>
                        <div>
                          <h4 className="text-white font-bold">{method.name}</h4>
                          <p className="text-white/60 text-sm">{method.description}</p>
                          {method.id === 'wallet' && (
                            <p className="text-[#FBEFA4] text-sm mt-1">
                              Balance: ₹{walletBalance}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setShowCheckout(false);
                      setSelectedPaymentMethod(null);
                    }}
                    className="flex-1 py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!selectedPaymentMethod) {
                        alert("Please select a payment method");
                        return;
                      }
                      if (selectedPaymentMethod === 'wallet') {
                        handleWalletPayment();
                      } else if (selectedPaymentMethod === 'agent') {
                        handleAgentPayment();
                      }
                    }}
                    disabled={!selectedPaymentMethod}
                    className={`flex-1 py-3 rounded-xl font-bold ${
                      selectedPaymentMethod
                        ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                        : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {selectedPaymentMethod === 'agent' ? 'Select Agent →' : 'Pay Now ₹' + getCartTotal()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AGENT MODAL */}
        {showAgentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
            <div className="agent-modal bg-gradient-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-5xl max-h-[90vh] overflow-hidden border-2 border-[#FBEFA4]/50 shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 sm:p-6 border-b-2 border-[#FBEFA4]/50 z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4] flex items-center gap-2 sm:gap-3">
                      <span>📞</span> Contact Our Agents
                    </h2>
                    <p className="text-white/80 text-xs sm:text-sm mt-1">
                      {selectedPaymentMethod === 'agent' 
                        ? 'Select an agent to complete your ticket purchase' 
                        : 'Connect with our experienced agents for quick assistance'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setShowAgentModal(false);
                      setSelectedAgent(null);
                      setSearchAgent("");
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <span className="text-lg sm:text-2xl">✕</span>
                  </button>
                </div>

                {/* Agent Search */}
                <div className="mt-3 sm:mt-4 relative">
                  <input
                    type="text"
                    placeholder="🔍 Search by name, language, or specialization..."
                    value={searchAgent}
                    onChange={(e) => setSearchAgent(e.target.value)}
                    className="w-full px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base rounded-xl bg-white/10 border border-[#FBEFA4]/30 text-white placeholder-white/50 outline-none focus:border-[#FBEFA4]"
                  />
                  {searchAgent && (
                    <button
                      onClick={() => setSearchAgent("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
                  <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 text-center">
                    <p className="text-[0.625rem] sm:text-xs text-white/60">Total Agents</p>
                    <p className="text-base sm:text-xl font-bold text-[#FBEFA4]">{AGENTS.length}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 text-center">
                    <p className="text-[0.625rem] sm:text-xs text-white/60">Available Now</p>
                    <p className="text-base sm:text-xl font-bold text-green-400">
                      {AGENTS.filter(a => a.available).length}
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-1.5 sm:p-2 text-center">
                    <p className="text-[0.625rem] sm:text-xs text-white/60">Avg Response</p>
                    <p className="text-base sm:text-xl font-bold text-[#FBEFA4]">{"< 5 min"}</p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="overflow-y-auto max-h-[calc(85vh-200px)] p-3 sm:p-4 md:p-6">
                {!selectedAgent ? (
                  <div className="grid gap-3 sm:gap-4">
                    {filteredAgents.length > 0 ? (
                      filteredAgents.map((agent) => (
                        <div
                          key={agent.id}
                          className={`agent-card bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-3 sm:p-4 md:p-5 border-2 ${agent.available ? 'border-[#FBEFA4]/30' : 'border-gray-500/30 opacity-75'}`}
                        >
                          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 bg-gradient-to-br from-[#004296] to-[#003380] rounded-full flex items-center justify-center text-2xl sm:text-3xl border-2 border-[#FBEFA4]/50">
                                {agent.avatar}
                              </div>
                              <div className={`absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white ${agent.available ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white">{agent.name}</h3>
                                <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-0.5 rounded-full">
                                  <span className="text-[#FBEFA4] text-xs sm:text-sm">★</span>
                                  <span className="text-xs sm:text-sm text-[#FBEFA4]">{agent.rating}</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-sm">
                                <p className="text-white/70">
                                  <span className="text-white/50">Experience:</span> {agent.experience}
                                </p>
                                <p className="text-white/70">
                                  <span className="text-white/50">Languages:</span> {agent.language}
                                </p>
                                <p className="text-white/70">
                                  <span className="text-white/50">Specialization:</span> {agent.specialization}
                                </p>
                                <p className="text-white/70">
                                  <span className="text-white/50">Response:</span> {agent.responseTime}
                                </p>
                              </div>

                              <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
                                <span className="text-[0.625rem] sm:text-xs bg-white/10 px-2 py-1 rounded-full text-white/60">
                                  📞 {agent.phone}
                                </span>
                                <span className="text-[0.625rem] sm:text-xs bg-green-500/20 px-2 py-1 rounded-full text-green-300">
                                  💬 WhatsApp
                                </span>
                              </div>
                            </div>

                            <div className="agent-actions flex flex-row sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                              <button
                                onClick={() => handleContactAgent(agent)}
                                disabled={!agent.available}
                                className={`flex-1 px-3 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 ${
                                  agent.available
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                                    : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                                }`}
                              >
                                <span>💬</span> WhatsApp
                              </button>
                              <button
                                onClick={() => setSelectedAgent(agent)}
                                className="flex-1 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 text-white"
                              >
                                <span>👁️</span> View
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 sm:py-12">
                        <p className="text-lg sm:text-2xl text-white/50 mb-2">😕 No agents found</p>
                        <p className="text-white/40 text-sm sm:text-base">Try adjusting your search</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    <button
                      onClick={() => setSelectedAgent(null)}
                      className="text-[#FBEFA4] hover:text-white flex items-center gap-2 text-sm sm:text-base"
                    >
                      ← Back to all agents
                    </button>

                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
                      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="relative">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#004296] to-[#003380] rounded-full flex items-center justify-center text-4xl sm:text-5xl border-3 border-[#FBEFA4]">
                            {selectedAgent.avatar}
                          </div>
                          <div className={`absolute -bottom-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-3 border-white ${selectedAgent.available ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{selectedAgent.name}</h3>
                            <div className="flex items-center gap-1 bg-yellow-500/20 px-2 sm:px-3 py-1 rounded-full">
                              <span className="text-[#FBEFA4] text-base sm:text-lg">★</span>
                              <span className="text-[#FBEFA4] text-sm sm:text-base">{selectedAgent.rating}</span>
                              <span className="text-white/50 text-xs sm:text-sm">({selectedAgent.totalBookings} bookings)</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                            <div>
                              <p className="text-white/50 text-xs sm:text-sm">Experience</p>
                              <p className="text-white text-base sm:text-lg">{selectedAgent.experience}</p>
                            </div>
                            <div>
                              <p className="text-white/50 text-xs sm:text-sm">Languages</p>
                              <p className="text-white text-base sm:text-lg">{selectedAgent.language}</p>
                            </div>
                            <div>
                              <p className="text-white/50 text-xs sm:text-sm">Specialization</p>
                              <p className="text-white text-base sm:text-lg">{selectedAgent.specialization}</p>
                            </div>
                            <div>
                              <p className="text-white/50 text-xs sm:text-sm">Working Hours</p>
                              <p className="text-white text-base sm:text-lg">{selectedAgent.workingHours}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                        <button
                          onClick={() => handleCallAgent(selectedAgent)}
                          className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 text-white"
                        >
                          <span className="text-xl sm:text-2xl">📞</span> Call Now
                        </button>
                        <button
                          onClick={() => handleContactAgent(selectedAgent)}
                          className="p-3 sm:p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 text-white"
                        >
                          <span className="text-xl sm:text-2xl">💬</span> WhatsApp
                        </button>
                      </div>

                      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <p className="text-xs sm:text-sm text-blue-200">
                          <span className="font-bold">💡 Tip:</span> WhatsApp is the fastest way to get a response.
                          {selectedAgent.name} typically replies within {selectedAgent.responseTime}!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-gradient-to-r from-[#004296] to-[#003380] p-3 sm:p-4 border-t border-[#FBEFA4]/30">
                <p className="text-center text-white/50 text-xs sm:text-sm">
                  All agents are verified and experienced in Tambola games.
                  Your privacy is protected.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ENHANCED BOOKING MODAL */}
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm">
            <div className="booking-modal bg-gradient-to-br from-[#004296] to-[#002b66] rounded-2xl sm:rounded-3xl w-full max-w-[95%] sm:max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-[#FBEFA4]/50 shadow-2xl">
              {/* Modal Header with Progress Bar */}
              <div className="sticky top-0 bg-gradient-to-r from-[#004296] to-[#003380] p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl border-b-2 border-[#FBEFA4]/50 z-10">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#FBEFA4]">Book Your Tickets</h2>
                    <button
                      onClick={() => setShowHelp(!showHelp)}
                      className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                      title="How to book tickets?"
                    >
                      <span className="text-base sm:text-lg">❓</span>
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setShowBookingModal(false);
                      setCurrentStep(1);
                      setSelectedTicketType("");
                      setSelectedSets([]);
                      setQuantity(1);
                    }}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
                  >
                    <span className="text-xl sm:text-2xl">✕</span>
                  </button>
                </div>

                {/* Help Box */}
                {showHelp && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-sm border border-[#FBEFA4]/30">
                    <h3 className="font-bold text-[#FBEFA4] mb-2">📖 How to Book Tickets:</h3>
                    <ol className="list-decimal list-inside space-y-1 text-white/90">
                      <li>Enter your name and phone number</li>
                      <li>Choose your ticket type (Single, Half Sheet, or Full Sheet)</li>
                      <li>Select quantity or choose from special ticket sets</li>
                      <li>Review your order and confirm booking</li>
                    </ol>
                    <p className="mt-2 text-[#FBEFA4]">💡 Tip: Half Sheet and Full Sheet give better value and more winning chances!</p>
                  </div>
                )}

                {/* Progress Steps */}
                <div className="progress-steps flex items-center justify-between">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`step-number w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-base transition-all ${
                        currentStep >= step
                          ? 'bg-[#FBEFA4] text-[#004296] shadow-lg'
                          : 'bg-white/20 text-white/60'
                      }`}>
                        {step}
                      </div>
                      {step < 4 && (
                        <div className={`w-8 sm:w-12 md:w-20 h-1 mx-1 sm:mx-2 ${currentStep > step ? 'bg-[#FBEFA4]' : 'bg-white/20'}`}></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1 sm:mt-2 text-[0.625rem] sm:text-xs text-white/80">
                  <span>Details</span>
                  <span>Choose Type</span>
                  <span>Select</span>
                  <span>Confirm</span>
                </div>
              </div>

              {/* Modal Body with Steps */}
              <form onSubmit={handleBookingSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* STEP 1: Player Details */}
                {currentStep === 1 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gradient-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
                        <span>👤</span> Step 1: Your Details
                      </h3>
                      <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6">Please enter your information to book tickets</p>

                      <div className="form-grid grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-[#FBEFA4] mb-2 text-base sm:text-lg">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="e.g., Raj Kumar"
                            className="w-full px-3 sm:px-4 py-2 sm:py-4 rounded-xl bg-white/10 border-2 border-[#FBEFA4]/30 text-white placeholder-white/40 outline-none focus:border-[#FBEFA4] text-sm sm:text-base"
                            required
                          />
                          <p className="text-[0.625rem] sm:text-xs text-white/50 mt-1">This name will appear on your ticket</p>
                        </div>

                        <div>
                          <label className="block text-[#FBEFA4] mb-2 text-base sm:text-lg">
                            Phone Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            value={playerPhone}
                            onChange={(e) => setPlayerPhone(e.target.value)}
                            placeholder="e.g., 9876543210"
                            className="w-full px-3 sm:px-4 py-2 sm:py-4 rounded-xl bg-white/10 border-2 border-[#FBEFA4]/30 text-white placeholder-white/40 outline-none focus:border-[#FBEFA4] text-sm sm:text-base"
                            required
                          />
                          <p className="text-[0.625rem] sm:text-xs text-white/50 mt-1">We'll send booking confirmation via SMS/WhatsApp</p>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <p className="text-xs sm:text-sm text-blue-200">
                          <span className="font-bold">🔒 Your information is safe:</span> We only use this to send your ticket details and game updates.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold text-sm sm:text-base"
                      >
                        Next: Choose Ticket Type →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Choose Ticket Type */}
                {currentStep === 2 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gradient-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
                        <span>🎫</span> Step 2: Choose Ticket Type
                      </h3>

                      <div className="ticket-types-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {[
                          { id: 'random', name: 'Single Ticket', price: 50, tickets: 1, icon: '🎲' },
                          { id: 'halfsheet', name: 'Half Sheet', price: 200, tickets: 6, icon: '📄' },
                          { id: 'fullsheet', name: 'Full Sheet', price: 350, tickets: 12, icon: '📋' },
                        ].map((type) => (
                          <div
                            key={type.id}
                            onClick={() => setSelectedTicketType(type.id)}
                            className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                              selectedTicketType === type.id
                                ? 'border-[#FBEFA4] bg-[#FBEFA4]/10'
                                : 'border-white/20 bg-white/5 hover:border-[#FBEFA4]/50'
                            }`}
                          >
                            <div className="text-3xl mb-2">{type.icon}</div>
                            <h4 className="text-lg font-bold text-white">{type.name}</h4>
                            <p className="text-[#FBEFA4] font-bold text-xl mt-1">₹{type.price}</p>
                            <p className="text-white/60 text-sm">{type.tickets} ticket{type.tickets > 1 ? 's' : ''}</p>
                          </div>
                        ))}
                      </div>

                      {selectedTicketType && selectedTicketType !== 'custom' && (
                        <div className="mt-4 p-4 bg-[#FBEFA4]/10 rounded-xl border border-[#FBEFA4]/30">
                          <p className="text-white/90 text-sm">{getTicketTypeDescription()}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-sm sm:text-base"
                      >
                        ← Back
                      </button>

                      <button
                        type="button"
                        onClick={handleNextStep}
                        disabled={!selectedTicketType}
                        className={`px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-white font-bold text-sm sm:text-base ${
                          selectedTicketType
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                            : 'bg-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Next: Select Quantity →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Select Quantity or Sets */}
                {currentStep === 3 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gradient-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
                        <span>🔢</span> Step 3: Select Quantity
                      </h3>

                      {selectedTicketType !== 'set' ? (
                        <div>
                          <label className="block text-[#FBEFA4] mb-2 text-base sm:text-lg">How many?</label>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full text-white text-xl font-bold"
                            >
                              -
                            </button>
                            <span className="text-2xl font-bold text-white">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => setQuantity(quantity + 1)}
                              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full text-white text-xl font-bold"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-white/60 text-sm mt-2">Total Tickets: {getTicketCount()}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-white/80 mb-4">Choose from our special ticket sets:</p>
                          <div className="grid gap-3">
                            {TICKET_SETS.map((set) => (
                              <div
                                key={set.id}
                                onClick={() => handleSetSelection(set.id)}
                                className={`cursor-pointer rounded-xl p-4 border-2 transition-all ${
                                  selectedSets.includes(set.id)
                                    ? 'border-[#FBEFA4] bg-[#FBEFA4]/10'
                                    : 'border-white/20 bg-white/5 hover:border-[#FBEFA4]/50'
                                }`}
                              >
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="text-lg font-bold text-white">{set.name}</h4>
                                    <p className="text-white/60 text-sm">{set.description}</p>
                                    <p className="text-white/50 text-xs mt-1">Difficulty: {set.difficulty} | Win Chance: {set.winChance}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[#FBEFA4] font-bold text-xl">₹{set.price}</p>
                                    <p className="text-white/60 text-sm">{set.tickets.length} tickets</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-sm sm:text-base"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-white font-bold text-sm sm:text-base"
                      >
                        Next: Review →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Review & Confirm */}
                {currentStep === 4 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gradient-to-r from-[#004296]/30 to-[#003380]/30 rounded-xl p-4 sm:p-6 border border-[#FBEFA4]/30">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FBEFA4] mb-3 sm:mb-4 flex items-center gap-2">
                        <span>✅</span> Step 4: Review & Confirm
                      </h3>

                      <div className="space-y-3">
                        <div className="flex justify-between py-2 border-b border-white/20">
                          <span className="text-white/70">Player Name:</span>
                          <span className="text-white font-bold">{playerName}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/20">
                          <span className="text-white/70">Phone Number:</span>
                          <span className="text-white font-bold">{playerPhone}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/20">
                          <span className="text-white/70">Ticket Type:</span>
                          <span className="text-white font-bold">{getTicketTypeName()}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/20">
                          <span className="text-white/70">Total Tickets:</span>
                          <span className="text-white font-bold">{getTicketCount()}</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="text-[#FBEFA4] text-lg font-bold">Total Amount:</span>
                          <span className="text-[#FBEFA4] text-xl font-bold">₹{getTotalPrice()}</span>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <p className="text-xs sm:text-sm text-green-200">
                          By confirming, you agree to our terms and conditions. Payment will be collected by your assigned agent.
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold text-sm sm:text-base"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#FBEFA4] to-[#FFE44D] hover:from-[#FFE44D] hover:to-[#FBEFA4] rounded-xl text-[#004296] font-bold text-sm sm:text-base"
                      >
                        Confirm Booking 🎉
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* Bottom decoration */}
        <div className="fixed bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-[#FBEFA4] to-transparent shadow-lg shadow-[#FBEFA4]/50"></div>
      </div>
    </>
  );
};

export default GamePage;