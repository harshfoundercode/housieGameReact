import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

const LiveResultTable = () => {
    const navigate = useNavigate();

    // Live Draw Schedule Data
    const liveDrawSchedule = [
        {
            id: 1,
            gameName: "Sweet Dreamz",
            drawTime: "4:30 PM",
            days: "Monday, Tuesday, Wednesday, Friday, Saturday",
            status: "live"
        },
        {
            id: 2,
            gameName: "Multiwin",
            drawTime: "12:15 PM",
            days: "Every Thursday",
            status: "upcoming"
        },
        {
            id: 3,
            gameName: "Tambola Classic",
            drawTime: "7:30 PM",
            days: "Monday to Saturday",
            status: "live"
        },
        {
            id: 4,
            gameName: "Morning Delight",
            drawTime: "10:00 AM",
            days: "Monday, Wednesday, Friday",
            status: "upcoming"
        },
        {
            id: 5,
            gameName: "Jackpot Special",
            drawTime: "9:00 PM",
            days: "Saturday, Sunday",
            status: "upcoming"
        },
    ];

    return (
        <section className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 px-3 sm:px-4">
            <div className="max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">

                {/* Heading - Responsive */}
                <div className="text-center mb-4 sm:mb-5 md:mb-6">
                    <h2 className="
                        text-xl sm:text-2xl md:text-3xl 
                        font-bold text-[#004296] inline-block relative
                    ">
                        Live Draw Schedule
                        <span className="
                            absolute -bottom-2 left-1/2 -translate-x-1/2 
                            bg-[#FBEFA4] rounded-full
                            w-12 h-0.5
                            sm:w-14 sm:h-1
                            md:w-16
                        "></span>
                    </h2>
                </div>

                {/* Table Container - Responsive */}
                <div className="
                    bg-white rounded-xl sm:rounded-2xl 
                    shadow-md sm:shadow-lg 
                    overflow-hidden border border-gray-100 
                    mb-4 sm:mb-5
                ">

                    {/* Header - Responsive */}
                    <div className="
                        bg-linear-to-r from-[#004296] to-[#003380] 
                        px-4 sm:px-5 md:px-6 
                        py-3 sm:py-3.5 md:py-4
                    ">
                        <h3 className="
                            text-[#FBEFA4] font-bold 
                            text-xs sm:text-sm md:text-base 
                            tracking-wide
                            flex items-center justify-center gap-1 sm:gap-2
                        ">
                            <span className="hidden xs:inline">🎲</span> 
                            LIVE DRAW SCHEDULE
                            <span className="hidden xs:inline">🎲</span>
                        </h3>
                    </div>

                    {/* Column Headers - Hidden on mobile, visible on md+ */}
                    <div className="
                        hidden md:grid grid-cols-3 gap-3 lg:gap-4 
                        bg-gray-50 px-4 sm:px-5 md:px-6 py-2 sm:py-3 
                        border-b border-gray-200
                    ">
                        <span className="text-gray-600 font-semibold text-xs sm:text-sm">Game Name</span>
                        <span className="text-gray-600 font-semibold text-xs sm:text-sm text-center">Draw Time</span>
                        <span className="text-gray-600 font-semibold text-xs sm:text-sm text-right">Days</span>
                    </div>

                    {/* Body */}
                    <div className="divide-y divide-gray-100">
                        {liveDrawSchedule.map((item, index) => (
                            <div
                                key={item.id}
                                className={`
                                    p-3 sm:p-4 md:p-0 
                                    hover:bg-gray-50 transition-all 
                                    ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
                                `}
                            >
                                {/* Mobile View - Visible only on mobile */}
                                <div className="md:hidden space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                            {item.status === "live" && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </span>
                                            )}
                                            <span className="font-bold text-gray-800 text-xs sm:text-sm">
                                                {item.gameName}
                                            </span>
                                        </div>
                                        <span className="
                                            bg-[#FBEFA4] text-[#004296] 
                                            px-2 sm:px-3 py-0.5 sm:py-1 
                                            rounded-full text-[10px] sm:text-xs font-bold shadow-sm
                                        ">
                                            {item.drawTime}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-[10px] sm:text-xs flex items-center gap-1">
                                        <span>📅</span> 
                                        <span className="truncate">{item.days}</span>
                                    </p>
                                </div>

                                {/* Desktop View - Hidden on mobile, visible on md+ */}
                                <div className="
                                    hidden md:grid grid-cols-3 gap-3 lg:gap-4 
                                    px-4 sm:px-5 md:px-6 py-3 sm:py-4
                                ">
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        {item.status === "live" && (
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                        )}
                                        <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">
                                            {item.gameName}
                                        </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <span className="
                                            bg-[#FBEFA4] text-[#004296] 
                                            px-3 sm:px-4 py-1 sm:py-1.5 
                                            rounded-full text-xs sm:text-sm font-bold shadow-sm
                                        ">
                                            {item.drawTime}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-end gap-1">
                                        <span className="text-gray-500 text-xs sm:text-sm truncate">
                                            {item.days}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* View Live Draw Button - Responsive */}
                <div className="text-center pt-2 sm:pt-3">
                    <button
                        onClick={() => navigate(ROUTES.AFTERGAME)}
                        className="
                            bg-linear-to-r from-[#004296] to-[#003380] 
                            text-white 
                            px-6 sm:px-8 py-2.5 sm:py-3 
                            mb-6
                            rounded-full font-semibold 
                            text-sm sm:text-base 
                            shadow-md sm:shadow-lg 
                            hover:shadow-lg sm:hover:shadow-xl 
                            hover:scale-105 transition-all duration-300 
                            border border-[#FBEFA4]/30 
                            inline-flex items-center gap-1.5 sm:gap-2
                        "
                    >
                        <span>🔴</span>
                        View Live Draw
                        <span>→</span>
                    </button>
                    
            
                </div>
            </div>
        </section>
    );
};

export default LiveResultTable;