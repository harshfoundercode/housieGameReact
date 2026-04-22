import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import tambolaLogo from "../../assets/tambolaGame.jpeg";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone: "",
        otp: "",
    });
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const testimonials = [
        {
            id: 1,
            title: "Rahul won ₹50,000",
            thumbnail: "https://img.youtube.com/vi/5yMfIQSsHJg/mqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=5yMfIQSsHJg"
        },
        {
            id: 2,
            title: "Priya's First Win",
            thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        },
        {
            id: 3,
            title: "How Tambola Works",
            thumbnail: "https://img.youtube.com/vi/5yMfIQSsHJg/mqdefault.jpg",
            videoUrl: "https://www.youtube.com/watch?v=5yMfIQSsHJg"
        },
    ];

    // FIXED: Proper onChange handler
    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Only allow numbers
        if (value === '' || /^[0-9]+$/.test(value)) {
            setFormData({
                ...formData,
                phone: value,
            });
        }
        setError("");
    };

    const handleOTPChange = (e) => {
        const value = e.target.value;
        // Only allow numbers
        if (value === '' || /^[0-9]+$/.test(value)) {
            setFormData({
                ...formData,
                otp: value,
            });
        }
        setError("");
    };

    const handleSendOTP = () => {
        if (!formData.phone || formData.phone.length < 10) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setOtpSent(true);
            setLoading(false);
            setError("");
        }, 1000);
    };

    const handleVerifyOTP = () => {
        if (!formData.otp || formData.otp.length < 4) {
            setError("Please enter a valid OTP");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            alert("Login successful! Welcome to Tambola!");
            setLoading(false);
            navigate("/");
        }, 1500);
    };

    const handleGuestLogin = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-white flex flex-col lg:flex-row">
            
            {/* LEFT PANEL - Image (Hidden on mobile, visible on lg+) */}
            <div className="hidden lg:block lg:w-[450px] xl:w-[550px] 2xl:w-[600px] h-screen sticky top-0 relative overflow-hidden">
                <img
                    src={tambolaLogo}
                    alt="Tambola Login"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#004296]/50 via-[#002266]/40 to-[#001133]/70"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-8 xl:p-10">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 xl:p-8 border border-white/20">
                        <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-3">
                            Play <span className="text-[#FBEFA4]">Tambola</span>
                        </h2>
                        <p className="text-white/80 text-sm xl:text-base mb-4">
                            Join millions of players and win exciting prizes daily!
                        </p>
                        <div className="flex items-center gap-3 text-white/60 text-sm">
                            <span>🏆 10,000+ Winners</span>
                            <span>•</span>
                            <span>💰 ₹1Cr+ Prizes</span>
                            <span>•</span>
                            <span>⭐ 4.8 Rating</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL - Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 md:py-10 min-h-screen lg:min-h-0">
                <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                    
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#004296] to-[#0066cc] rounded-2xl flex items-center justify-center shadow-lg">
                            <img src={tambolaLogo} alt="Tambola" className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-xl" />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-5 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#004296]">
                            Welcome to Tambola
                        </h2>
                        <p className="text-gray-500 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                            Sign in to play and win big!
                        </p>
                    </div>

                    {/* Login Form Card */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-5 sm:p-6 md:p-8 border border-gray-100">
                        
                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-2.5 sm:p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs sm:text-sm flex items-center gap-2">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        {/* Phone Number Field - FIXED */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base">📱</span>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    placeholder="Enter your phone number"
                                    maxLength="10"
                                    disabled={otpSent}
                                    className={`w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all outline-none text-sm sm:text-base text-gray-800 ${
                                        otpSent 
                                            ? 'bg-gray-100 border-gray-200 cursor-not-allowed' 
                                            : 'border-gray-300 focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20'
                                    }`}
                                />
                            </div>
                            <p className="text-gray-400 text-[10px] sm:text-xs mt-1">
                                We'll send OTP to this number
                            </p>
                        </div>

                        {/* OTP Field - Shows after Send OTP */}
                        {otpSent && (
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">
                                    Enter OTP <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base">🔐</span>
                                    <input
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleOTPChange}
                                        placeholder="Enter 6-digit OTP"
                                        maxLength="6"
                                        className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all text-sm sm:text-base text-gray-800"
                                    />
                                </div>
                                <div className="flex justify-between mt-1">
                                    <p className="text-gray-400 text-[10px] sm:text-xs">
                                        OTP sent to +91 {formData.phone}
                                    </p>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setOtpSent(false);
                                            setFormData({...formData, otp: ""});
                                        }}
                                        className="text-[#004296] text-[10px] sm:text-xs hover:underline font-medium"
                                    >
                                        Change Number
                                    </button>
                                </div>
                                <p className="text-right mt-1">
                                    <button 
                                        type="button"
                                        className="text-[#004296] text-[10px] sm:text-xs hover:underline font-medium"
                                    >
                                        Resend OTP
                                    </button>
                                </p>
                            </div>
                        )}

                        {/* Action Button */}
                        {!otpSent ? (
                            <button
                                type="button"
                                onClick={handleSendOTP}
                                disabled={loading}
                                className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-white bg-gradient-to-r from-[#004296] to-[#0066cc] hover:from-[#003380] hover:to-[#004296] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    "Send OTP"
                                )}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleVerifyOTP}
                                disabled={loading}
                                className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                        </svg>
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify & Login"
                                )}
                            </button>
                        )}

                        {/* Divider */}
                        <div className="relative my-4 sm:my-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-3 text-gray-400">or</span>
                            </div>
                        </div>

                        {/* Continue as Guest Button */}
                        <button
                            type="button"
                            onClick={handleGuestLogin}
                            className="w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-[#004296] bg-[#FBEFA4] hover:bg-[#FFE44D] shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
                        >
                            Continue as Guest
                        </button>

                        {/* Register Button */}
                        <p className="text-center text-gray-500 text-xs sm:text-sm mt-4 sm:mt-5">
                            New to Tambola?{" "}
                            <Link to="/register" className="text-[#004296] font-semibold hover:underline">
                                Create Account
                            </Link>
                        </p>
                    </div>

                    {/* Testimonial Videos Section */}
                    <div className="mt-6 sm:mt-8">
                        <h3 className="text-center text-gray-700 font-semibold mb-3 sm:mb-4 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base">
                            <span>🎥</span> Player Testimonials <span>🎥</span>
                        </h3>
                        
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {testimonials.map((video) => (
                                <div 
                                    key={video.id}
                                    onClick={() => window.open(video.videoUrl, '_blank')}
                                    className="cursor-pointer group"
                                >
                                    <div className="relative rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-all">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-14 sm:h-16 md:h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 flex items-center justify-center">
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-[#FBEFA4] rounded-full flex items-center justify-center shadow-lg">
                                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#004296] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7L8 5z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-600 mt-1 truncate text-center">
                                        {video.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                
                </div>
            </div>
        </div>
    );
};

export default Login;