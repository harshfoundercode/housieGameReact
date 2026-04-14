import React, { useEffect, useState, useRef } from "react";
import { THEME, CARD_STYLES, BUTTON_STYLES, BUTTON_STYLES_TWO } from "../styles/constants/theme";

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

// Ticket Set Options with detailed descriptions
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

const GamePage = () => {
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

  // Form states
  const [playerName, setPlayerName] = useState("");
  const [playerPhone, setPlayerPhone] = useState("");
  const [quantity, setQuantity] = useState(1);

  const gameTimeRef = useRef(new Date());

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

  const handleContactAgent = (agent) => {
    // Open WhatsApp with predefined message
    const message = encodeURIComponent(
      `Hello ${agent.name},\n\nI'm interested in booking Tambola tickets. Can you please help me with the booking process?\n\nThank you!`
    );
    window.open(`https://wa.me/${agent.whatsapp}?text=${message}`, '_blank');

    // Optional: Show confirmation
    setTimeout(() => {
      alert(`Connecting you to ${agent.name} via WhatsApp...`);
    }, 500);
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
      quantity: selectedTicketType !== "set" ? quantity : null,
      selectedSets: selectedTicketType === "set" ? selectedSets : null,
      timestamp: new Date().toISOString(),
    };

    console.log("Booking Data:", bookingData);

    // Show success message with booking details
    alert(`🎉 Booking Successful!\n\nThank you ${playerName}!\n\nTicket Type: ${getTicketTypeName()}\nTotal Amount: ₹${getTotalPrice()}\n\nYou will receive confirmation on ${playerPhone}\n\nGood luck for the game! 🍀`);

    // Reset form and close modal
    setShowBookingModal(false);
    setPlayerName("");
    setPlayerPhone("");
    setSelectedSets([]);
    setQuantity(1);
    setSelectedTicketType("");
    setCurrentStep(1);
  };

  const getTicketTypeName = () => {
    const types = {
      random: "Random Single Ticket",
      halfsheet: "Half Sheet (6 Tickets)",
      fullsheet: "Full Sheet (12 Tickets)",
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

  return (
    <div className={`min-h-screen bg-black text-white p-4 md:p-6 relative`}>

      {/* Animated background elements */}

      <div className="relative z-10 max-w-8xl mx-auto space-y-3">

        {/* HEADER with Gradient */}
        <div className="relative overflow-hidden rounded-b-3xl bg-linear-to-br from-[#4D4D4D] via-[#4A4A4A] to-[#303030] p-5">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#303030] rounded-full filter blur-3xl opacity-20"></div>
          <h1 className="text-5xl md:text-6xl font-medium text-center bg-white bg-clip-text text-transparent tracking-wider">
            GET RICH
          </h1>
        </div>

        <div className="overflow-hidden rounded-b-3xl bg-linear-to-br from-[#4D4D4D] via-[#4A4A4A] to-[#303030] p-2 md:p-3 relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#303030] rounded-full filter blur-3xl opacity-20"></div>
          <h1 className="text-5xl md:text-2xl font-bold text-center bg-white bg-clip-text text-transparent tracking-wider">
            Regular Player Link
          </h1>
        </div>

        {/* TIMER SECTION - Enhanced Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#4D4D4D] backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="font-bold text-[bg-white]">Date</p>
            </div>
            <p className="text-2xl font-bold text-center text-white">
              {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>

          <div className="bg-[#4D4D4D] backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="font-bold text-white">Countdown</p>
            </div>
            <p className="text-2xl font-bold text-center text-white font-mono">
              {timeLeft}
            </p>
          </div>

          <div className="bg-[#4D4D4D] backdrop-blur-lg rounded-2xl p-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="font-bold text-white">Game Time</p>
            </div>
            <p className="text-2xl font-bold text-center text-white">
              {formattedGameTime}
            </p>
          </div>
        </div>



        {/* Tickets Container*/}
        {/* OUTER CONTAINER */}
        <div className="w-full bg-[#636363] p-2 rounded-3xl shadow-xl">
          {/* INNER CARD */}
          <div className="overflow-hidden rounded-3xl bg-[#848484] p-2 md:p-3 relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#303030] rounded-full filter blur-3xl opacity-20"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-center bg-white bg-clip-text text-transparent tracking-wider">
              TICKET FOR GAMES
            </h1>
          </div>
          {/* SEARCH BAR - Enhanced */}
          <div className="w-full flex justify-center p-2 md:p-3 relative">
            <div className="relative w-full sm:w-[90%] md:w-125 lg:w-150 p-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Search by name or ticket number..."
                className="w-full px-6 py-3 rounded-full bg-white text-black placeholder-black"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
                >
                  ✕
                </button>
              )}

            </div>
          </div>
          {/* TICKETS GRID - Enhanced Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24 p-2 md:p-4 relative">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="group relative bg-[#FFC107] rounded-3xl p-4 shadow-2xl hover:shadow-[#FBBF24]/40 transition-all duration-300"
                >
                  <div className="relative z-10">

                    {/* TITLE */}
                    <div className="overflow-hidden bg-linear-to-br from-[#FFD65C] via-[#FFD65C] to-[#FFD65C]">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD65C] rounded-full filter blur-3xl opacity-20"></div>
                      <h1 className="text-5xl md:text-2xl font-bold text-center bg-white bg-clip-text text-transparent tracking-wider">
                        TNO:{ticket.id}
                      </h1>
                    </div>


                    {/* MAIN CONTENT (LEFT + RIGHT) */}
                    <div className="flex gap-4">

                      {/* LEFT SIDE */}
                      <div className="flex-1">

                        {/* BOOKED INFO */}
                        <div className="bg-white  text-black rounded-2xl p-3 mb-3 text-sm shadow">
                          <p><b>Booked By:</b> {ticket.name}</p>
                          <p><b>Agent Name:</b> -</p>
                          <p><b>Won last Time?:</b> {ticket.win}</p>
                        </div>



                        {/* GRID */}
                        <div className="bg-white p-2 rounded-2xl shadow-inner">
                          <div className="grid grid-cols-9 gap-1">
                            {ticket.numbers.map((row, i) => (
                              <React.Fragment key={i}>
                                {row.map((num, j) => (
                                  <div
                                    key={`${i}-${j}`}
                                    className={`h-8 flex items-center justify-center text-xs font-bold rounded border
                      ${num !== 0
                                        ? "bg-gray-200 text-black"
                                        : "bg-gray-100"
                                      }`}
                                  >
                                    {num !== 0 ? num : ""}
                                  </div>
                                ))}
                              </React.Fragment>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* RIGHT SIDE */}
                      <div className="w-[40%] flex flex-col justify-between">

                        <p className="text-sm font-semibold text-[#2C1810]">
                          Book the ticket. We have big big prize for this game.
                        </p>

                        <div className="flex flex-col gap-2 mt-3">
                          <button className="bg-[#808080] text-white py-2 rounded-lg">
                            Buy Now
                          </button>

                          <button className="bg-[#808080] text-white py-2 rounded-lg">
                            Add Cart
                          </button>
                        </div>

                      </div>

                    </div>




                    {/* <button
                      onClick={() => {
                        setShowBookingModal(true);
                        setSelectedTicketType("random");
                      }}
                      className={`${BUTTON_STYLES_TWO} w-full py-3! text-lg`}
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => {
                        setShowBookingModal(true);
                        setSelectedTicketType("random");
                      }}
                      className={`${BUTTON_STYLES_TWO} w-full py-3! text-lg`}
                    >
                      Add Cart
                    </button> */}
                  </div>
                </div>
              ))
            ) :
              (
                <div className="col-span-full text-center py-12">
                  <p className="text-2xl text-[#FDE68A]">No tickets found</p>
                  <p className="text-white/60 mt-2">Try a different search term</p>
                </div>
              )}
          </div>

        </div>
      </div>


      {/* FLOATING ACTION BUTTONS - FIXED onClick handler */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {showFabMenu && (
          <div className="flex flex-col gap-3 mb-3 animate-in slide-in-from-bottom-2 duration-300">
            <button
              onClick={() => {
                setShowFabMenu(false);
                setShowBookingModal(true);
                setCurrentStep(1);
              }}
              className="flex items-center gap-3 bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-[#DC2626]/50 transform hover:scale-105 transition-all border border-[#FBBF24]/50"
            >
              <span className="text-xl">🎫</span>
              <span className="font-semibold">{availableTickets} Tickets Available</span>
            </button>

            <button
              onClick={() => {
                setShowFabMenu(false);
                setShowAgentModal(true);
              }}
              className="flex items-center gap-3 bg-gradient-to-r from-[#D97706] to-[#FBBF24] text-[#2C1810] px-6 py-3 rounded-full shadow-2xl hover:shadow-[#FBBF24]/50 transform hover:scale-105 transition-all border border-white/50"
            >
              <span className="text-xl">📞</span>
              <span className="font-semibold">Contact Agent</span>
            </button>
          </div>
        )}

        <button
          onClick={() => setShowFabMenu(!showFabMenu)}
          className="w-16 h-16 bg-gradient-to-br from-[#FBBF24] to-[#D97706] rounded-full shadow-2xl hover:shadow-[#FBBF24]/50 transform hover:scale-110 transition-all flex items-center justify-center border-2 border-white/50"
        >
          <span className={`text-3xl transition-transform duration-300 ${showFabMenu ? 'rotate-45' : ''}`}>
            {showFabMenu ? '✕' : '🎯'}
          </span>
        </button>
      </div>

      {showAgentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-[#2C1810] to-[#1A0F0A] rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-hidden border-2 border-[#FBBF24]/50 shadow-2xl">

            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#DC2626] to-[#D97706] p-6 border-b-2 border-[#FBBF24]/50 z-10">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <span>📞</span> Contact Our Agents
                  </h2>
                  <p className="text-white/80 mt-1">Connect with our experienced agents for quick assistance</p>
                </div>
                <button
                  onClick={() => {
                    setShowAgentModal(false);
                    setSelectedAgent(null);
                    setSearchAgent("");
                  }}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <span className="text-2xl">✕</span>
                </button>
              </div>

              {/* Agent Search */}
              <div className="mt-4 relative">
                <input
                  type="text"
                  placeholder="🔍 Search by name, language, or specialization..."
                  value={searchAgent}
                  onChange={(e) => setSearchAgent(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-[#FBBF24]/30 text-white placeholder-white/50 outline-none focus:border-[#FBBF24] transition-all"
                />
                {searchAgent && (
                  <button
                    onClick={() => setSearchAgent("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/60">Total Agents</p>
                  <p className="text-xl font-bold text-[#FBBF24]">{AGENTS.length}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/60">Available Now</p>
                  <p className="text-xl font-bold text-green-400">
                    {AGENTS.filter(a => a.available).length}
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-2 text-center">
                  <p className="text-xs text-white/60">Avg Response</p>
                  <p className="text-xl font-bold text-[#FBBF24]">{"< 5 min"}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto max-h-[calc(85vh-200px)] p-6">
              {!selectedAgent ? (
                <div className="grid gap-4">
                  {filteredAgents.length > 0 ? (
                    filteredAgents.map((agent) => (
                      <div
                        key={agent.id}
                        className={`bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-5 border-2 transition-all ${agent.available
                          ? 'border-[#FBBF24]/30 hover:border-[#FBBF24] hover:shadow-lg hover:shadow-[#FBBF24]/20'
                          : 'border-gray-500/30 opacity-75'
                          }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#DC2626] to-[#D97706] rounded-full flex items-center justify-center text-3xl border-2 border-[#FBBF24]/50">
                              {agent.avatar}
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${agent.available ? 'bg-green-500' : 'bg-gray-500'
                              }`}></div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                              <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-0.5 rounded-full">
                                <span className="text-yellow-400">★</span>
                                <span className="text-sm text-yellow-400">{agent.rating}</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
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

                            <div className="flex items-center gap-2 mt-3">
                              <span className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/60">
                                📞 {agent.phone}
                              </span>
                              <span className="text-xs bg-green-500/20 px-2 py-1 rounded-full text-green-300">
                                💬 WhatsApp Available
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleContactAgent(agent)}
                              disabled={!agent.available}
                              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${agent.available
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/30'
                                : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                                }`}
                            >
                              <span>💬</span> WhatsApp
                            </button>
                            <button
                              onClick={() => setSelectedAgent(agent)}
                              className="px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all flex items-center gap-2"
                            >
                              <span>👁️</span> View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-2xl text-white/50 mb-2">😕 No agents found</p>
                      <p className="text-white/40">Try adjusting your search</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <button
                    onClick={() => setSelectedAgent(null)}
                    className="text-[#FBBF24] hover:underline flex items-center gap-2"
                  >
                    ← Back to all agents
                  </button>

                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-[#FBBF24]/30">
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-[#DC2626] to-[#D97706] rounded-full flex items-center justify-center text-5xl border-3 border-[#FBBF24]">
                          {selectedAgent.avatar}
                        </div>
                        <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-3 border-white ${selectedAgent.available ? 'bg-green-500' : 'bg-gray-500'
                          }`}></div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-3xl font-bold text-white">{selectedAgent.name}</h3>
                          <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                            <span className="text-yellow-400 text-lg">★</span>
                            <span className="text-yellow-400">{selectedAgent.rating}</span>
                            <span className="text-white/50 text-sm">({selectedAgent.totalBookings} bookings)</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-white/50 text-sm">Experience</p>
                            <p className="text-white text-lg">{selectedAgent.experience}</p>
                          </div>
                          <div>
                            <p className="text-white/50 text-sm">Languages</p>
                            <p className="text-white text-lg">{selectedAgent.language}</p>
                          </div>
                          <div>
                            <p className="text-white/50 text-sm">Specialization</p>
                            <p className="text-white text-lg">{selectedAgent.specialization}</p>
                          </div>
                          <div>
                            <p className="text-white/50 text-sm">Working Hours</p>
                            <p className="text-white text-lg">{selectedAgent.workingHours}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <button
                        onClick={() => handleCallAgent(selectedAgent)}
                        className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3"
                      >
                        <span className="text-2xl">📞</span> Call Now
                      </button>
                      <button
                        onClick={() => handleContactAgent(selectedAgent)}
                        className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-3"
                      >
                        <span className="text-2xl">💬</span> WhatsApp
                      </button>
                    </div>

                    <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <p className="text-sm text-blue-200">
                        <span className="font-bold">💡 Tip:</span> WhatsApp is the fastest way to get a response.
                        {selectedAgent.name} typically replies within {selectedAgent.responseTime}!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-gradient-to-r from-[#2C1810] to-[#1A0F0A] p-4 border-t border-[#FBBF24]/30">
              <p className="text-center text-white/50 text-sm">
                All agents are verified and experienced in Tambola games.
                Your privacy is protected.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ENHANCED BOOKING MODAL WITH STEP-BY-STEP GUIDE */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-[#2C1810] to-[#1A0F0A] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#FBBF24]/50 shadow-2xl">

            {/* Modal Header with Progress Bar */}
            <div className="sticky top-0 bg-gradient-to-r from-[#DC2626] to-[#D97706] p-6 rounded-t-3xl border-b-2 border-[#FBBF24]/50 z-10">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-white">Book Your Tickets</h2>
                  <button
                    onClick={() => setShowHelp(!showHelp)}
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                    title="How to book tickets?"
                  >
                    <span className="text-lg">❓</span>
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowBookingModal(false);
                    setCurrentStep(1);
                    setSelectedTicketType("");
                  }}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  <span className="text-2xl">✕</span>
                </button>
              </div>

              {/* Help Box */}
              {showHelp && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 text-sm">
                  <h3 className="font-bold text-[#FBBF24] mb-2">📖 How to Book Tickets:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-white/90">
                    <li>Enter your name and phone number</li>
                    <li>Choose your ticket type (Single, Half Sheet, or Full Sheet)</li>
                    <li>Select quantity or choose from special ticket sets</li>
                    <li>Review your order and confirm booking</li>
                  </ol>
                  <p className="mt-2 text-[#FDE68A]">💡 Tip: Half Sheet and Full Sheet give better value and more winning chances!</p>
                </div>
              )}

              {/* Progress Steps */}
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= step
                      ? 'bg-[#FBBF24] text-[#2C1810] shadow-lg'
                      : 'bg-white/20 text-white/60'
                      }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-12 md:w-20 h-1 mx-2 ${currentStep > step ? 'bg-[#FBBF24]' : 'bg-white/20'
                        }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-white/80">
                <span>Details</span>
                <span>Choose Type</span>
                <span>Select</span>
                <span>Confirm</span>
              </div>
            </div>

            {/* Modal Body with Steps */}
            <form onSubmit={handleBookingSubmit} className="p-6 space-y-6">

              {/* STEP 1: Player Details */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
                  <div className="bg-gradient-to-r from-[#DC2626]/10 to-[#D97706]/10 rounded-xl p-6 border border-[#FBBF24]/30">
                    <h3 className="text-2xl font-bold text-[#FBBF24] mb-4 flex items-center gap-2">
                      <span>👤</span> Step 1: Your Details
                    </h3>
                    <p className="text-white/80 mb-6">Please enter your information to book tickets</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#FDE68A] mb-2 text-lg">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={playerName}
                          onChange={(e) => setPlayerName(e.target.value)}
                          placeholder="e.g., Raj Kumar"
                          className="w-full px-4 py-4 rounded-xl bg-white/10 border-2 border-[#FBBF24]/30 text-white placeholder-white/40 outline-none focus:border-[#FBBF24] transition-all text-lg"
                          required
                        />
                        <p className="text-xs text-white/50 mt-1">This name will appear on your ticket</p>
                      </div>

                      <div>
                        <label className="block text-[#FDE68A] mb-2 text-lg">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          value={playerPhone}
                          onChange={(e) => setPlayerPhone(e.target.value)}
                          placeholder="e.g., 9876543210"
                          className="w-full px-4 py-4 rounded-xl bg-white/10 border-2 border-[#FBBF24]/30 text-white placeholder-white/40 outline-none focus:border-[#FBBF24] transition-all text-lg"
                          required
                        />
                        <p className="text-xs text-white/50 mt-1">We'll send booking confirmation via SMS/WhatsApp</p>
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                      <p className="text-sm text-blue-200">
                        <span className="font-bold">🔒 Your information is safe:</span> We only use this to send your ticket details and game updates.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className={`${BUTTON_STYLES} !px-8`}
                    >
                      Next: Choose Ticket Type →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Choose Ticket Type */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
                  <div className="bg-gradient-to-r from-[#DC2626]/10 to-[#D97706]/10 rounded-xl p-6 border border-[#FBBF24]/30">
                    <h3 className="text-2xl font-bold text-[#FBBF24] mb-4 flex items-center gap-2">
                      <span>🎟️</span> Step 2: Select Ticket Type
                    </h3>

                    {/* What are these? Info */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                      <p className="text-yellow-200 text-sm">
                        <span className="font-bold">💡 New to Tambola?</span> Here's what each option means:
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      {/* Random Ticket */}
                      <div
                        onClick={() => setSelectedTicketType("random")}
                        className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${selectedTicketType === "random"
                          ? 'bg-gradient-to-br from-[#DC2626] to-[#D97706] border-[#FBBF24] shadow-xl scale-105'
                          : 'bg-white/10 border-[#FBBF24]/30 hover:bg-white/20'
                          }`}
                      >
                        <div className="text-4xl mb-3">🎲</div>
                        <div className="font-bold text-xl mb-2">Single Ticket</div>
                        <div className="text-2xl font-bold text-[#FBBF24] mb-3">₹50</div>
                        <ul className="text-sm space-y-1 text-white/80">
                          <li>• 1 Tambola ticket</li>
                          <li>• 15 random numbers</li>
                          <li>• Perfect for beginners</li>
                        </ul>
                      </div>

                      {/* Half Sheet */}
                      <div
                        onClick={() => setSelectedTicketType("halfsheet")}
                        className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${selectedTicketType === "halfsheet"
                          ? 'bg-gradient-to-br from-[#DC2626] to-[#D97706] border-[#FBBF24] shadow-xl scale-105'
                          : 'bg-white/10 border-[#FBBF24]/30 hover:bg-white/20'
                          }`}
                      >
                        <div className="text-4xl mb-3">📄</div>
                        <div className="font-bold text-xl mb-2">Half Sheet</div>
                        <div className="text-2xl font-bold text-[#FBBF24] mb-3">₹200</div>
                        <ul className="text-sm space-y-1 text-white/80">
                          <li>• 6 different tickets</li>
                          <li>• Better winning chances</li>
                          <li>• <span className="text-green-300">Best Value!</span></li>
                        </ul>
                      </div>

                      {/* Full Sheet */}
                      <div
                        onClick={() => setSelectedTicketType("fullsheet")}
                        className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${selectedTicketType === "fullsheet"
                          ? 'bg-gradient-to-br from-[#DC2626] to-[#D97706] border-[#FBBF24] shadow-xl scale-105'
                          : 'bg-white/10 border-[#FBBF24]/30 hover:bg-white/20'
                          }`}
                      >
                        <div className="text-4xl mb-3">📋</div>
                        <div className="font-bold text-xl mb-2">Full Sheet</div>
                        <div className="text-2xl font-bold text-[#FBBF24] mb-3">₹350</div>
                        <ul className="text-sm space-y-1 text-white/80">
                          <li>• 12 complete tickets</li>
                          <li>• Maximum winning odds</li>
                          <li>• Pro player's choice</li>
                        </ul>
                      </div>
                    </div>

                    {/* Selected Type Description */}
                    {selectedTicketType && (
                      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <p className="text-green-200">
                          <span className="font-bold">✅ You selected:</span> {getTicketTypeName()}
                        </p>
                        <p className="text-sm text-white/70 mt-1">{getTicketTypeDescription()}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className={`${BUTTON_STYLES} !px-8`}
                      disabled={!selectedTicketType}
                    >
                      Next: Select Quantity/Sets →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Quantity or Sets */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
                  <div className="bg-gradient-to-r from-[#DC2626]/10 to-[#D97706]/10 rounded-xl p-6 border border-[#FBBF24]/30">
                    <h3 className="text-2xl font-bold text-[#FBBF24] mb-4 flex items-center gap-2">
                      <span>🔢</span> Step 3: {selectedTicketType === "set" ? "Choose Sets" : "Select Quantity"}
                    </h3>

                    {selectedTicketType !== "set" ? (
                      // Quantity Selection
                      <div>
                        <div className="bg-white/5 rounded-xl p-6 mb-6">
                          <label className="block text-[#FDE68A] mb-4 text-lg">
                            How many {selectedTicketType === "random" ? "tickets" : "sheets"} would you like?
                          </label>

                          <div className="flex items-center justify-center gap-6">
                            <button
                              type="button"
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="w-16 h-16 rounded-xl bg-white/10 border-2 border-[#FBBF24]/30 text-3xl font-bold hover:bg-white/20 transition-all"
                            >
                              -
                            </button>

                            <div className="text-center">
                              <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                                min="1"
                                max="10"
                                className="w-32 px-4 py-4 rounded-xl bg-white/10 border-2 border-[#FBBF24]/30 text-white text-center text-4xl font-bold outline-none focus:border-[#FBBF24] transition-all"
                              />
                              <p className="text-sm text-white/60 mt-2">
                                = {getTicketCount()} total ticket{getTicketCount() !== 1 ? 's' : ''}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => setQuantity(Math.min(10, quantity + 1))}
                              className="w-16 h-16 rounded-xl bg-white/10 border-2 border-[#FBBF24]/30 text-3xl font-bold hover:bg-white/20 transition-all"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Value comparison */}
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                          <p className="text-blue-200 text-sm">
                            <span className="font-bold">💰 Value Tip:</span> Buying more tickets increases your winning chances!
                            {selectedTicketType === "random" && " Consider Half Sheet for better value (₹33 per ticket instead of ₹50)."}
                            {selectedTicketType === "halfsheet" && " Half Sheet is 33% cheaper per ticket than buying single tickets!"}
                            {selectedTicketType === "fullsheet" && " Full Sheet gives you the best value at just ₹29 per ticket!"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      // Sets Selection
                      <div>
                        <div className="mb-4">
                          <button
                            type="button"
                            onClick={() => setSelectedTicketType("")}
                            className="text-[#FBBF24] underline"
                          >
                            ← Back to ticket types
                          </button>
                        </div>

                        <div className="space-y-3 max-h-96 overflow-y-auto p-2">
                          {TICKET_SETS.map((set) => (
                            <div
                              key={set.id}
                              onClick={() => handleSetSelection(set.id)}
                              className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedSets.includes(set.id)
                                ? 'bg-gradient-to-r from-[#DC2626]/30 to-[#D97706]/30 border-[#FBBF24] shadow-lg'
                                : 'bg-white/5 border-[#FBBF24]/30 hover:bg-white/10'
                                }`}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${selectedSets.includes(set.id)
                                      ? 'bg-[#FBBF24] border-[#FBBF24]'
                                      : 'border-[#FBBF24]/50'
                                      }`}>
                                      {selectedSets.includes(set.id) && (
                                        <span className="text-[#2C1810] font-bold">✓</span>
                                      )}
                                    </div>
                                    <div className="font-bold text-xl text-white">{set.name}</div>
                                  </div>
                                  <p className="text-sm text-white/70 ml-9">{set.description}</p>
                                  <div className="ml-9 mt-2 flex gap-4">
                                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
                                      Difficulty: {set.difficulty}
                                    </span>
                                    <span className="text-xs bg-[#FBBF24]/20 px-3 py-1 rounded-full text-[#FBBF24]">
                                      Win Chance: {set.winChance}
                                    </span>
                                  </div>
                                  <p className="text-xs text-white/50 ml-9 mt-2">
                                    Tickets included: #{set.tickets.join(', #')}
                                  </p>
                                </div>
                                <div className="text-2xl font-bold text-[#FBBF24] ml-4">
                                  ₹{set.price}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedTicketType("random")}
                          className="mt-4 text-sm text-[#FBBF24] underline"
                        >
                          Or buy individual tickets instead →
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className={`${BUTTON_STYLES} !px-8`}
                    >
                      Next: Review & Confirm →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Review and Confirm */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in slide-in-from-right-2 duration-300">
                  <div className="bg-gradient-to-r from-[#DC2626]/10 to-[#D97706]/10 rounded-xl p-6 border border-[#FBBF24]/30">
                    <h3 className="text-2xl font-bold text-[#FBBF24] mb-4 flex items-center gap-2">
                      <span>✅</span> Step 4: Review Your Order
                    </h3>

                    {/* Order Summary */}
                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-xl p-5">
                        <h4 className="font-bold text-lg mb-3 text-[#FDE68A]">Player Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-white/60">Name</p>
                            <p className="text-lg">{playerName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-white/60">Phone</p>
                            <p className="text-lg">{playerPhone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-xl p-5">
                        <h4 className="font-bold text-lg mb-3 text-[#FDE68A]">Order Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Ticket Type:</span>
                            <span className="font-bold">{getTicketTypeName()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Tickets:</span>
                            <span className="font-bold">{getTicketCount()} ticket{getTicketCount() !== 1 ? 's' : ''}</span>
                          </div>
                          {selectedTicketType === "set" && selectedSets.length > 0 && (
                            <div>
                              <p className="mb-2">Selected Sets:</p>
                              {selectedSets.map(setId => {
                                const set = TICKET_SETS.find(s => s.id === setId);
                                return (
                                  <div key={setId} className="text-sm bg-white/5 p-2 rounded mb-1">
                                    {set?.name} - ₹{set?.price}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="bg-gradient-to-r from-[#DC2626]/30 to-[#D97706]/30 rounded-xl p-6 border border-[#FBBF24]/50">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold">Total Amount:</span>
                          <span className="text-4xl font-bold text-[#FBBF24]">₹{getTotalPrice()}</span>
                        </div>
                        <p className="text-xs text-white/60 mt-2">
                          *Payment will be collected by the agent before the game starts
                        </p>
                      </div>

                      {/* Terms */}
                      <div className="flex items-start gap-2 text-sm text-white/70">
                        <input type="checkbox" required className="mt-1" />
                        <span>
                          I agree to the terms and conditions. I understand that tickets are non-refundable
                          and subject to game rules.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className={`${BUTTON_STYLES} !px-12 !py-4 text-xl`}
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
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent shadow-lg shadow-[#FBBF24]/50"></div>
    </div>
  );
};

export default GamePage;