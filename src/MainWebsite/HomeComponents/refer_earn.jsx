import React from "react";

const ReferAndEarn = () => {
    return (
        <section className="w-full bg-gradient-to-r from-[#3d366d] to-[#b10b00] py-14 px-4 relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                
                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    
                    {/* LEFT SIDE - Heading & Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-[#FBEFA4]/30">
                            <span className="text-[#FBEFA4] text-sm font-medium flex items-center gap-2">
                                <span>🤝</span> REFER & EARN <span>🤝</span>
                            </span>
                        </div>
                        
                        {/* Main Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                            Refer & <span className="text-[#FBEFA4]">Earn</span>
                        </h2>
                        
                        {/* Subheading */}
                        <p className="text-white/80 text-base md:text-lg max-w-md mx-auto lg:mx-0 mb-6">
                            Share the fun with your friends and earn exciting rewards when they join Tambola!
                        </p>
                        
                        {/* Stats */}
                        <div className="flex gap-6 justify-center lg:justify-start">
                            <div>
                                <p className="text-2xl md:text-3xl font-bold text-[#FBEFA4]">₹500</p>
                                <p className="text-white/50 text-xs">Per Referral</p>
                            </div>
                            <div className="border-l border-white/20 pl-6">
                                <p className="text-2xl md:text-3xl font-bold text-[#FBEFA4]">10K+</p>
                                <p className="text-white/50 text-xs">Users Referred</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Steps */}
                    <div className="space-y-4">
                        {/* Step 1 */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20 flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FBEFA4] rounded-full flex items-center justify-center text-[#3d366d] font-bold text-lg shrink-0">
                                1
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-base md:text-lg mb-1">Get Your Link</h4>
                                <p className="text-white/70 text-sm">Copy your unique referral link from your dashboard</p>
                            </div>
                        </div>
                        
                        {/* Step 2 */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20 flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FBEFA4] rounded-full flex items-center justify-center text-[#3d366d] font-bold text-lg shrink-0">
                                2
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-base md:text-lg mb-1">Share with Friends</h4>
                                <p className="text-white/70 text-sm">Invite friends via WhatsApp, email, or social media</p>
                            </div>
                        </div>
                        
                        {/* Step 3 */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/20 flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FBEFA4] rounded-full flex items-center justify-center text-[#3d366d] font-bold text-lg shrink-0">
                                3
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-base md:text-lg mb-1">Earn ₹500</h4>
                                <p className="text-white/70 text-sm">Get ₹500 when your friend makes their first purchase</p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <button className="
                                w-full sm:w-auto
                                bg-[#FBEFA4] text-[#3d366d] 
                                px-6 py-3 rounded-full font-bold text-base
                                shadow-lg hover:shadow-xl hover:scale-105
                                transition-all duration-300
                                inline-flex items-center justify-center gap-2
                            ">
                                <span>🤝</span>
                                Start Referring Now
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReferAndEarn;