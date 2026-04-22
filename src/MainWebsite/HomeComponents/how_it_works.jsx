import React from "react";

const HowItWorks = () => {
    const youtubeVideoId = "5yMfIQSsHJg";
    const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

    return (
        <section className="w-full bg-linear-to-br from-[#004296] via-[#003380] to-[#002266] py-8 sm:py-12 lg:py-16 xl:py-20 px-4 relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>
            
            {/* Decorative Blobs */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-[#FBEFA4] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#FBEFA4] rounded-full blur-3xl opacity-5"></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                
                {/* Responsive Grid - Mobile: Stack, Desktop: 2 Columns */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
                    
                    {/* LEFT SIDE - Heading & Subheading */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-block bg-[#FBEFA4]/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 border border-[#FBEFA4]/30">
                            <span className="text-[#FBEFA4] text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2">
                                <span>🎥</span> 
                                <span className="hidden xs:inline">QUICK TUTORIAL</span>
                                <span className="inline xs:hidden">TUTORIAL</span>
                                <span>🎥</span>
                            </span>
                        </div>
                        
                        {/* Main Heading - Responsive Font */}
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                            How It <span className="text-[#FBEFA4]">Works</span>
                        </h2>
                        
                        {/* Subheading - Responsive */}
                        <p className="text-white/70 text-sm sm:text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-4 sm:mb-6">
                            Watch this 2-minute video and learn how to play Tambola like a pro. Simple, fast, and fun!
                        </p>
                        
                        {/* Features List */}
                        <div className="flex flex-col gap-2 sm:gap-3 max-w-sm mx-auto lg:mx-0">
                            <div className="flex items-center gap-2 sm:gap-3 text-white/80 justify-center lg:justify-start">
                                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FBEFA4]/20 rounded-full flex items-center justify-center text-[#FBEFA4] text-xs sm:text-sm font-bold">1</span>
                                <span className="text-xs sm:text-sm md:text-base">Choose your lucky ticket</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 text-white/80 justify-center lg:justify-start">
                                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FBEFA4]/20 rounded-full flex items-center justify-center text-[#FBEFA4] text-xs sm:text-sm font-bold">2</span>
                                <span className="text-xs sm:text-sm md:text-base">Mark numbers as they're called</span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 text-white/80 justify-center lg:justify-start">
                                <span className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FBEFA4]/20 rounded-full flex items-center justify-center text-[#FBEFA4] text-xs sm:text-sm font-bold">3</span>
                                <span className="text-xs sm:text-sm md:text-base">Complete patterns and win big!</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Video */}
                    <div className="relative group cursor-pointer w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto" onClick={() => window.open(youtubeUrl, '_blank')}>
                        
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 sm:-inset-2 bg-[#FBEFA4] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                        
                        {/* Video Card */}
                        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border-2 lg:border-3 border-white/20 group-hover:border-[#FBEFA4] transition-all duration-300">
                            
                            {/* Thumbnail */}
                            <img
                                src={thumbnailUrl}
                                alt="How to Play Tambola"
                                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#004296]/80 via-[#004296]/20 to-transparent"></div>
                            
                            {/* Play Button - Responsive Size */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="
                                    w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
                                    bg-[#FBEFA4] rounded-full 
                                    flex items-center justify-center
                                    shadow-xl sm:shadow-2xl group-hover:scale-110 
                                    transition-all duration-300
                                    border-2 sm:border-4 border-white/30
                                ">
                                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#004296] ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7L8 5z" />
                                    </svg>
                                </div>
                            </div>

                            {/* YouTube Badge - Responsive */}
                            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 bg-black/60 backdrop-blur-sm px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full">
                                <span className="text-white text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                    <span className="hidden xs:inline">YouTube</span>
                                </span>
                            </div>

                            {/* Duration Badge - Responsive */}
                            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 lg:bottom-4 lg:right-4 bg-black/60 backdrop-blur-sm px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full">
                                <span className="text-white text-xs sm:text-sm font-medium">2:30</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;