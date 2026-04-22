import React from "react";

const HowItWorks = () => {
    const youtubeVideoId = "5yMfIQSsHJg";
    const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

    return (
        <section className="w-full bg-gradient-to-br from-[#004296] via-[#003380] to-[#002266] py-12 md:py-16 lg:py-20 px-4 relative overflow-hidden">
            
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
                
                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    
                    {/* LEFT SIDE - Heading & Subheading */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-block bg-[#FBEFA4]/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-[#FBEFA4]/30">
                            <span className="text-[#FBEFA4] text-sm font-medium flex items-center gap-2">
                                <span>🎥</span> QUICK TUTORIAL <span>🎥</span>
                            </span>
                        </div>
                        
                        {/* Main Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            How It <span className="text-[#FBEFA4]">Works</span>
                        </h2>
                        
                        {/* Subheading */}
                        <p className="text-white/70 text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-6">
                            Watch this 2-minute video and learn how to play Tambola like a pro. Simple, fast, and fun!
                        </p>
                        
                        {/* Features List */}
                        <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0">
                            <div className="flex items-center gap-3 text-white/80">
                                <span className="w-8 h-8 bg-[#FBEFA4]/20 rounded-full flex items-center justify-center text-[#FBEFA4] text-sm font-bold">1</span>
                                <span>Choose your lucky ticket</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <span className="w-8 h-8 bg-[#FBEFA4]/20 rounded-full flex items-center justify-center text-[#FBEFA4] text-sm font-bold">2</span>
                                <span>Mark numbers as they're called</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <span className="w-8 h-8 bg-[#FBEFA4]/20 rounded-full flex items-center justify-center text-[#FBEFA4] text-sm font-bold">3</span>
                                <span>Complete patterns and win big!</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Video */}
                    <div className="relative group cursor-pointer" onClick={() => window.open(youtubeUrl, '_blank')}>
                        
                        {/* Glow Effect */}
                        <div className="absolute -inset-2 bg-[#FBEFA4] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                        
                        {/* Video Card */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-3 border-white/20 group-hover:border-[#FBEFA4] transition-all duration-300">
                            
                            {/* Thumbnail */}
                            <img
                                src={thumbnailUrl}
                                alt="How to Play Tambola"
                                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                            />
                            
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#004296]/80 via-[#004296]/20 to-transparent"></div>
                            
                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="
                                    w-20 h-20 md:w-24 md:h-24
                                    bg-[#FBEFA4] rounded-full 
                                    flex items-center justify-center
                                    shadow-2xl group-hover:scale-110 
                                    transition-all duration-300
                                    border-4 border-white/30
                                ">
                                    <svg className="w-10 h-10 md:w-12 md:h-12 text-[#004296] ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7L8 5z" />
                                    </svg>
                                </div>
                            </div>

                            {/* YouTube Badge */}
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="text-white text-sm font-medium flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                    YouTube
                                </span>
                            </div>

                            {/* Duration */}
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                                <span className="text-white text-sm font-medium">2:30</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;