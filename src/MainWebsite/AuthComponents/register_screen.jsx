import React, { useState } from "react";
import { useNavigate, Link, Routes } from "react-router-dom";
import tambolaLogo from "../../assets/tambolaGame.jpeg";
import { ROUTES } from "../../routes/routes";
import { sendOTP, verifyOTP, registerUser } from "../../services/register_user";


const Register = () => {
    const navigate = useNavigate();
    
    // Step tracking: 1 = phone/checkboxes, 2 = name fields, 3 = OTP
    const [step, setStep] = useState(1);
    
    const [formData, setFormData] = useState({
        phone: "",
        referralCode: "",
        firstName: "",
        lastName: "",
    });
    
    const [checkboxes, setCheckboxes] = useState({
    
        termsAgree: false,
    });
    
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(""); // Success message ke liye naya state
    const [error, setError] = useState("");

    // Check if all checkboxes are checked
    const allChecked =  checkboxes.termsAgree;

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[0-9]+$/.test(value)) {
            setFormData({ ...formData, phone: value });
        }
        setError("");
    };

    const handleReferralChange = (e) => {
        setFormData({ ...formData, referralCode: e.target.value.toUpperCase() });
    };

    const handleNameChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleCheckboxChange = (field) => {
        setCheckboxes({ ...checkboxes, [field]: !checkboxes[field] });
        setError("");
    };

     // Save user data to localStorage (Shared Preferences equivalent)
    const saveUserData = (token, userData) => {
        try {
            // Save token
            localStorage.setItem("token", token);
            
            // Save user data
            localStorage.setItem("user", JSON.stringify(userData));
            
            // Optional: Save registration timestamp
            localStorage.setItem("registrationTime", new Date().toISOString());
            
            console.log("User data saved successfully:", { token, userData });
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };

    // Check if user is already logged in
    const isUserLoggedIn = () => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        return token && user;
    };

    // Step 1 → Step 2: Validate and proceed to name fields
    const handleProceedToName = () => {
        if (!formData.phone || formData.phone.length < 10) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }
        if (!checkboxes.termsAgree) {
            setError("Please agree to the Terms & Conditions");
            return;
        }
        setError("");
        setStep(2);
        console.log("Proceeding to name fields with phone:", formData.phone);
    };

    // Step 2 → Step 3: Validate name and send OTP
    const handleSendOTP = async () => {
        if (!formData.firstName || formData.firstName.trim() === "") {
            setError("Please enter your first name");
            return;
        }
        if (!formData.lastName || formData.lastName.trim() === "") {
            setError("Please enter your last name");
            return;
        }

        setLoading(true);
        setError("");
        setSuccessMessage("");
         try {
            // API call to send OTP
            const response = await sendOTP(formData.phone);
            console.log("OTP sent successfully:", response);
            setSuccessMessage("OTP sent successfully to your phone number!");
            setStep(3);
            
        } catch (err) {
            console.error("Error sending OTP:", err);
            setError(err.message || "Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

  
    // Register.jsx - Update handleVerifyOTP function
    const handleVerifyOTP = async () => {
    if (!otp || otp.length < 4) {
        setError("Please enter a valid OTP");
        return;
    }
    setLoading(true);
    setError("");
      try {
            // Step 3a: OTP verify karo
            const verifyResponse = await verifyOTP(formData.phone, otp);
            console.log("OTP verified:", verifyResponse);

            // Step 3b: OTP verify hone ke baad register karo
            const registrationData = {
                phone: formData.phone,        
                first_name: formData.firstName.trim(),
                last_name: formData.lastName.trim(),
                referral_code: formData.referralCode || ""
            };
        
            const registerResponse = await registerUser(registrationData);
            console.log("Registration successful:", registerResponse);

            // Check if response was successful
        if (!registerResponse.success || registerResponse.status !== 200) {
            throw new Error(registerResponse.message || "Registration failed");
        }

        // Extract token and user data from response (corrected for your API structure)
        const { data } = registerResponse;
        
        // Get token from data object
        const authToken = data?.token;
        
        // Get user data from data object
        const userData = {
            first_name: data?.first_name,
            last_name: data?.last_name,
            phone: data?.phone,
            user_id: data?.user_id,
            referral_code: data?.referral_code,
            referred_by: data?.referred_by,
        };
        
        if (!authToken || !userData.user_id) {
            throw new Error("Invalid response from server: Missing token or user data");
        }

        
        saveUserData(authToken, userData);
        
            // Success message
            alert(`Welcome ${formData.firstName}! Registration successful!`);
            navigate("/");
            window.location.reload();
            
        } catch (err) {
            console.error("Error during verification/registration:", err);
            setError(err.message || "Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
   
 // Resend OTP
    const handleResendOTP = async () => {
        setLoading(true);
        setError("");
        setSuccessMessage("");

        try {
            const response = await sendOTP(formData.phone);
            console.log("OTP resent:", response);
            setSuccessMessage("OTP resent successfully!");
        } catch (err) {
            setError(err.message || "Failed to resend OTP");
        } finally {
            setLoading(false);
        }
    };

    // Go back to previous step
    const handleBack = () => {
        setStep(step - 1);
        setError("");
        setSuccessMessage("");
    };

    // Change phone number (from OTP screen)
    const handleChangePhone = () => {
        setStep(1);
        setOtp("");
        setError("");
         setSuccessMessage("");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-[#004296] via-[#002b66] to-[#001433] flex flex-col lg:flex-row">
            
            {/* LEFT PANEL - Static Image & Content (Same as Login) */}
            <div className="hidden lg:flex lg:w-112.5 xl:w-137.5 2xl:w-150 h-screen sticky top-0 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>
                
                {/* Glow Orbs */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#FBEFA4] rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#FBEFA4] rounded-full blur-3xl opacity-10"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-8 xl:px-10 w-full">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 xl:w-24 xl:h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border-2 border-[#FBEFA4]/50">
                                <img src={tambolaLogo} alt="Tambola" className="w-12 h-12 xl:w-14 xl:h-14 object-cover rounded-xl" />
                            </div>
                        </div>
                        <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white mb-3">
                            Join <span className="text-[#FBEFA4]">Tambola</span>
                        </h2>
                        <p className="text-white/70 text-sm xl:text-base mb-6">
                            Create your account and start winning today!
                        </p>
                        
                      

                        {/* Step Indicator */}
                        <div className="mt-6 flex items-center justify-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${step >= 1 ? 'bg-[#FBEFA4]' : 'bg-white/30'}`}></div>
                            <div className={`w-8 h-0.5 ${step >= 2 ? 'bg-[#FBEFA4]' : 'bg-white/30'}`}></div>
                            <div className={`w-2 h-2 rounded-full ${step >= 2 ? 'bg-[#FBEFA4]' : 'bg-white/30'}`}></div>
                            <div className={`w-8 h-0.5 ${step >= 3 ? 'bg-[#FBEFA4]' : 'bg-white/30'}`}></div>
                            <div className={`w-2 h-2 rounded-full ${step >= 3 ? 'bg-[#FBEFA4]' : 'bg-white/30'}`}></div>
                        </div>
                        <p className="text-white/50 text-[10px] mt-2">
                            Step {step} of 3
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL - Register Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6 sm:py-8 md:py-10 min-h-screen">
                <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                    
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex justify-center mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-[#FBEFA4]/50">
                            <img src={tambolaLogo} alt="Tambola" className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-xl" />
                        </div>
                    </div>

                    {/* Header */}
                    <div className="text-center mb-5 sm:mb-6">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                            {step === 1 && "Create Account"}
                            {step === 2 && "Your Details"}
                            {step === 3 && "Verify OTP"}
                        </h2>
                        <p className="text-white/70 mt-1 sm:mt-2 text-xs sm:text-sm">
                            {step === 1 && "Enter your phone number to get started"}
                            {step === 2 && "Tell us your name"}
                            {step === 3 && `Enter the OTP sent to +91 ${formData.phone}`}
                        </p>
                    </div>

                    {/* Register Form Card */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-6 md:p-8 border-2 border-[#FBEFA4]/30 transition-all duration-300">
                        
                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs sm:text-sm flex items-center gap-2">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        {/* ========== STEP 1: Phone + Checkboxes ========== */}
                        {step === 1 && (
                            <>
                                {/* Phone Number Field */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">
                                        Phone Number <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">📱</span>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                            placeholder="Enter 10-digit number"
                                            maxLength="10"
                                            className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all text-sm sm:text-base text-gray-800"
                                        />
                                    </div>
                                    <p className="text-gray-400 text-[10px] sm:text-xs mt-1 ml-1">
                                        We'll send OTP to this number
                                    </p>
                                </div>

                                {/* Referral Code Field - Optional */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">
                                        Referral Code <span className="text-gray-400 text-[10px]">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🎁</span>
                                        <input
                                            type="text"
                                            value={formData.referralCode}
                                            onChange={handleReferralChange}
                                            placeholder="Enter referral code"
                                            className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all text-sm sm:text-base text-gray-800 uppercase"
                                        />
                                    </div>
                                </div>

                                {/* Checkboxes */}
                                <div className="space-y-3 mb-5">
                                  

                                    <label className="flex items-start gap-3 cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={checkboxes.termsAgree}
                                                onChange={() => handleCheckboxChange("termsAgree")}
                                                className="sr-only peer"
                                            />
                                            <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#004296] peer-checked:border-[#004296] transition-all flex items-center justify-center">
                                                {checkboxes.termsAgree && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                        <span className="text-gray-600 text-xs sm:text-sm">
                                            I agree to the{" "}
                                            <Link to="/rules" className="text-[#004296] hover:underline font-medium">Terms</Link>{" "}
                                            and{" "}
                                            <Link to="/privacy" className="text-[#004296] hover:underline font-medium">Privacy Policy</Link>
                                        </span>
                                    </label>
                                </div>

                                {/* Continue Button */}
                                <button
                                    type="button"
                                    onClick={handleProceedToName}
                                    className="w-full py-3 sm:py-3.5 rounded-xl font-bold text-[#004296] bg-[#FBEFA4] hover:bg-[#FFE44D] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                                >
                                    Continue →
                                </button>
                            </>
                        )}

                        {/* ========== STEP 2: Name Fields ========== */}
                        {step === 2 && (
                            <>
                                {/* First Name */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleNameChange}
                                            placeholder="Enter your first name"
                                            className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all text-sm sm:text-base text-gray-800"
                                        />
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleNameChange}
                                            placeholder="Enter your last name"
                                            className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all text-sm sm:text-base text-gray-800"
                                        />
                                    </div>
                                </div>

                                {/* Phone Number (Read-only display) */}
                                <div className="mb-5 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                    <p className="text-gray-500 text-[10px] sm:text-xs">Registered Phone</p>
                                    <p className="text-gray-800 font-medium text-sm sm:text-base">+91 {formData.phone}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="flex-1 py-3 sm:py-3.5 rounded-xl font-semibold text-[#004296] bg-white border-2 border-[#004296] hover:bg-gray-50 transition-all text-sm sm:text-base"
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSendOTP}
                                        disabled={loading}
                                        className="flex-1 py-3 sm:py-3.5 rounded-xl font-bold text-[#004296] bg-[#FBEFA4] hover:bg-[#FFE44D] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
                                    >
                                        {loading ? "Sending..." : "Send OTP →"}
                                    </button>
                                </div>
                            </>
                        )}

                        {/* ========== STEP 3: OTP Verification ========== */}
                        {step === 3 && (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-xs sm:text-sm">
                                        Enter OTP <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔐</span>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === '' || /^[0-9]+$/.test(value)) {
                                                    setOtp(value);
                                                }
                                            }}
                                            placeholder="Enter 4-digit OTP"
                                            maxLength="4"
                                            className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#004296] focus:ring-2 focus:ring-[#004296]/20 outline-none transition-all text-sm sm:text-base text-gray-800"
                                        />
                                    </div>
                                    
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-gray-400 text-[10px] sm:text-xs">
                                            Didn't receive code?
                                        </p>
                                        <button 
                                            type="button"
                                            onClick={handleSendOTP}
                                            className="text-[#004296] text-[10px] sm:text-xs hover:underline font-medium"
                                        >
                                            Resend OTP
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleChangePhone}
                                        className="flex-1 py-3 sm:py-3.5 rounded-xl font-semibold text-[#004296] bg-white border-2 border-[#004296] hover:bg-gray-50 transition-all text-sm sm:text-base"
                                    >
                                        ← Change Number
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleVerifyOTP}
                                        disabled={loading}
                                        className="flex-1 py-3 sm:py-3.5 rounded-xl font-bold text-white bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                                </svg>
                                                Verifying...
                                            </>
                                        ) : (
                                            "Create Account →"
                                        )}
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Divider */}
                        <div className="relative my-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-white px-3 text-gray-400">or</span>
                            </div>
                        </div>

                        {/* Already have account - Login Button */}
                        <button
                            type="button"
                            onClick={() => navigate(ROUTES.LOGIN)}
                            className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-[#004296] bg-white border-2 border-[#004296] hover:bg-[#004296] hover:text-white shadow-md hover:shadow-lg transition-all text-sm sm:text-base"
                        >
                            Already have an account? Login
                        </button>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center mt-4 sm:mt-5 text-[10px] sm:text-xs text-white/50">
                        By registering, you agree to our{" "}
                        <Link to="/rules" className="text-[#FBEFA4] hover:underline">Terms</Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-[#FBEFA4] hover:underline">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Register;