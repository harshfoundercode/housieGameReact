import React from "react";


const LiveResultTable = () => {

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
        <div className="min-h-screen">

            {/* LIVE RESULT */}
            <section className="py-8 md:py-12 px-4">
                <div className="max-w-3xl mx-auto">

                    {/* Heading */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#004296] inline-block relative">
                            Live Draw Schedule
                            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#FBEFA4] rounded-full"></span>
                        </h2>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-4 ">

                        {/* Header */}
                        <div className="bg-linear-to-r from-[#004296] to-[#003380] px-6 py-4">
                            <h3 className="text-[#FBEFA4] font-bold text-base tracking-wide">
                                🎲 LIVE DRAW SCHEDULE
                            </h3>
                        </div>

                        {/* Column Headers - Desktop Only */}
                        <div className="hidden md:grid grid-cols-3 gap-4 bg-gray-50 px-6 py-3 border-b border-gray-200">
                            <span className="text-gray-600 font-semibold text-sm">Game Name</span>
                            <span className="text-gray-600 font-semibold text-sm text-center">Draw Time</span>
                            <span className="text-gray-600 font-semibold text-sm text-right">Days</span>
                        </div>

                        {/* Body */}
                        <div className="divide-y divide-gray-100">
                            {liveDrawSchedule.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`p-4 md:p-0 hover:bg-gray-50 transition-all ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                                >
                                    {/* Mobile View */}
                                    <div className="md:hidden space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {item.status === "live" && (
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                    </span>
                                                )}
                                                <span className="font-bold text-gray-800">{item.gameName}</span>
                                            </div>
                                            <span className="bg-[#FBEFA4] text-[#004296] px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                                {item.drawTime}
                                            </span>
                                        </div>
                                        <p className="text-gray-500 text-xs flex items-center gap-1">
                                            <span>📅</span> {item.days}
                                        </p>
                                    </div>

                                    {/* Desktop View */}
                                    <div className="hidden md:grid grid-cols-3 gap-4 px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {item.status === "live" && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                                </span>
                                            )}
                                            <span className="font-semibold text-gray-800">{item.gameName}</span>
                                        </div>
                                        <div className="flex justify-center">
                                            <span className="bg-[#FBEFA4] text-[#004296] px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                                                {item.drawTime}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-end gap-1">
                                            <span className="text-gray-500 text-sm">{item.days}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* View Live Draw Button */}
                    <div className="text-center pt-5">
                        <button
                            onClick={() => navigate(ROUTES.AFTERGAME)}
                            className="bg-linear-to-r from-[#004296] to-[#003380] text-white px-8 py-3 rounded-full font-semibold text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#FBEFA4]/30 inline-flex items-center gap-2"
                        >
                            <span>🔴</span>
                            View Live Draw
                            <span>→</span>
                        </button>
                    </div>


                </div>
            </section>

        </div>
    );
};

export default LiveResultTable;