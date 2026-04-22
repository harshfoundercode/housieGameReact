import React from "react";
import WinnerBg from "../../assets/winnerbg.png";

const TodaysWinner = () => {
    // Winner data - 12 winners
    const winners = [
        { id: 1, name: "Rajesh Kumar", rank: 1, tno: "TN-001", phone: "9876543210", prize: "₹50,000", icon: "🏆" },
        { id: 2, name: "Priya Sharma", rank: 2, tno: "TN-045", phone: "9876543211", prize: "₹25,000", icon: "🥈" },
        { id: 3, name: "Amit Patel", rank: 3, tno: "TN-078", phone: "9876543212", prize: "₹10,000", icon: "🥉" },
        { id: 4, name: "Neha Gupta", rank: 4, tno: "TN-112", phone: "9876543213", prize: "₹5,000", icon: "⭐" },
        { id: 5, name: "Suresh Reddy", rank: 5, tno: "TN-156", phone: "9876543214", prize: "₹2,500", icon: "⭐" },
        { id: 6, name: "Anjali Singh", rank: 6, tno: "TN-189", phone: "9876543215", prize: "₹1,000", icon: "⭐" },
        { id: 7, name: "Vikram Malhotra", rank: 7, tno: "TN-234", phone: "9876543216", prize: "₹500", icon: "🎲" },
        { id: 8, name: "Meera Iyer", rank: 8, tno: "TN-267", phone: "9876543217", prize: "₹500", icon: "🎲" },
        { id: 9, name: "Rahul Nair", rank: 9, tno: "TN-298", phone: "9876543218", prize: "₹250", icon: "🎲" },
        { id: 10, name: "Kavita Menon", rank: 10, tno: "TN-345", phone: "9876543219", prize: "₹250", icon: "🎲" },
        { id: 11, name: "Arjun Kapoor", rank: 11, tno: "TN-378", phone: "9876543220", prize: "₹100", icon: "🎯" },
        { id: 12, name: "Zara Sheikh", rank: 12, tno: "TN-401", phone: "9876543221", prize: "₹100", icon: "🎯" },
    ];

    // Function to mask phone number
    const maskPhone = (phone) => {
        return phone.slice(0, 4) + "****" + phone.slice(-2);
    };

    return (
        <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-3 sm:px-4">
            
            {/* Section Header - Responsive */}
            <div className="text-center mb-4 sm:mb-5 md:mb-8 lg:mb-10">
                <h2 className="
                    font-bold text-[#004296] inline-block relative
                    text-xl sm:text-2xl md:text-3xl lg:text-4xl
                ">
                    Today's Winners
                    <span className="
                        absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#FBEFA4] rounded-full
                        w-10 h-0.5
                        sm:w-12 sm:h-0.5
                        md:w-14 md:h-1
                        lg:w-16
                    "></span>
                </h2>
            </div>

            {/* Winner Image Container - Responsive Width */}
            <div className="
                mx-auto overflow-hidden
                w-full shadow-md rounded-lg
                sm:shadow-lg sm:rounded-xl
                lg:shadow-xl lg:rounded-2xl
                mb-6 sm:mb-8
            ">
                <img
                    src={WinnerBg}
                    alt="Today's Winners"
                    className="w-full h-auto object-cover"
                />
            </div>

            {/* Winners Grid Container - Responsive Max Width */}
            <div className="
                mx-auto
                max-w-full px-1
                sm:max-w-xl sm:px-2
                md:max-w-3xl
                lg:max-w-5xl
                xl:max-w-6xl
                2xl:max-w-7xl
            ">
                <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                   
                    {/* Mobile Grid - 1 column (shows first 6 winners) */}
                    <div className="grid grid-cols-1 gap-2 sm:gap-3 md:hidden">
                        {winners.slice(0, 6).map((winner) => (
                            <WinnerCard key={winner.id} winner={winner} maskPhone={maskPhone} />
                        ))}
                    </div>

                    {/* Tablet Grid - 2 columns (shows all 12 winners) */}
                    <div className="hidden md:grid lg:hidden grid-cols-2 gap-3">
                        {winners.map((winner) => (
                            <WinnerCard key={winner.id} winner={winner} maskPhone={maskPhone} />
                        ))}
                    </div>

                    {/* Desktop Grid - 3 columns (shows first 6 in row 1) */}
                    <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-6 gap-3">
                        {winners.slice(0, 6).map((winner) => (
                            <WinnerCard key={winner.id} winner={winner} maskPhone={maskPhone} />
                        ))}
                    </div>
                    
                    {/* Desktop Grid - 3 columns (shows next 6 in row 2) */}
                    <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-6 gap-3 mt-3">
                        {winners.slice(6, 12).map((winner) => (
                            <WinnerCard key={winner.id} winner={winner} maskPhone={maskPhone} />
                        ))}
                    </div>

            
                </div>
            </div>
        </section>
    );
};

// Winner Card Component - Responsive
const WinnerCard = ({ winner, maskPhone }) => {
    return (
        <div className="
            bg-white rounded-lg sm:rounded-xl 
            shadow-sm sm:shadow-md hover:shadow-lg 
            transition-all duration-300 
            p-2 sm:p-3 
            border border-gray-100 hover:border-[#FBEFA4]
        ">
            {/* Icon and Rank */}
            <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-xl sm:text-2xl">{winner.icon}</span>
                <span className="bg-[#004296] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
                    Rank #{winner.rank}
                </span>
            </div>

            {/* Name */}
            <h4 className="font-bold text-gray-800 text-xs sm:text-sm md:text-base truncate">
                {winner.name}
            </h4>

            {/* TNO and Prize */}
            <div className="flex items-center justify-between mt-1">
                <span className="text-gray-500 text-[10px] sm:text-xs">{winner.tno}</span>
                <span className="text-[#004296] font-bold text-xs sm:text-sm md:text-base">
                    {winner.prize}
                </span>
            </div>

            {/* Phone - Half Hidden */}
            <div className="mt-1.5 sm:mt-2 flex items-center gap-1 text-gray-400 text-[10px] sm:text-xs">
                <span className="hidden xs:inline">📱</span>
                <span className="font-mono">{maskPhone(winner.phone)}</span>
            </div>
        </div>
    );
};

export default TodaysWinner;