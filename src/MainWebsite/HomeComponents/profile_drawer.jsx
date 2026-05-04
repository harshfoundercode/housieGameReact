import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { API } from "../../services/api_url";

const ProfileDrawer = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Get initial user data from localStorage
    const storedUser = localStorage.getItem("user");
    const initialUserData = storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;


    // Fetch profile data from API when drawer opens
    useEffect(() => {
        if (isOpen) {
            fetchProfileData();
        }
    }, [isOpen]);

    const fetchProfileData = async () => {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            // Replace with your actual profile API endpoint
            const response = await fetch(`${API.PROFILE_URL}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();
            console.log("Profile API Response:", result);

            if (result.status === 200 && result.success) {
                setProfileData(result.data);

                // Update localStorage with fresh user data
                const updatedUserData = {
                    user_id: result.data.user_id,
                    first_name: result.data.first_name,
                    last_name: result.data.last_name,
                    phone: result.data.phone,
                    is_verified: result.data.is_verified,
                    referral_code: result.data.referral_code,
                    referred_by: result.data.referred_by,
                    created_at: result.data.created_at,
                    updated_at: result.data.updated_at,
                    main_balance: result.data.main_balance,
                    winning_balance: result.data.winning_balance,
                    referral_bonus: result.data.referral_bonus,
                    bonus_balance: result.data.bonus_balance,
                    total_balance: result.data.total_balance
                };

                localStorage.setItem("user", JSON.stringify(updatedUserData));
            } else {
                throw new Error(result.message || "Failed to fetch profile data");
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError(err.message || "Failed to load profile data");
            // Fallback to localStorage data if API fails
            if (initialUserData) {
                setProfileData(initialUserData);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("userPhone");
        localStorage.removeItem("userName");
        localStorage.removeItem("referralCode");
        localStorage.removeItem("credits");
        localStorage.removeItem("registrationTime");
        localStorage.removeItem("loginTime");

        onClose();
        navigate(ROUTES.HomeScreenWebsite);
        window.location.reload();
    };

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };

    const menuItems = [
        { icon: "🎫", label: "Buy Tickets", path: ROUTES.GAME },
        { icon: "📋", label: "My Tickets", path: ROUTES.MyTickets },
    ];

    const moreItems = [
        { icon: "✅", label: "My KYC", path: ROUTES.KYC_VIEW },
        { icon: "✅", label: "Add KYC", path: ROUTES.KYC_ADD},
        // { icon: "✅", label: "Update KYC", path: ROUTES.KYC_EDIT},
        { icon: "🌐", label: "Language", path: ROUTES.LANG },
        { icon: "⚙️", label: "Settings", path: ROUTES.SETTINGS },
        { icon: "📰", label: "News & Media", path: ROUTES.MEDIA },
        // { icon: "📊", label: "Ticket Results", path: "/ticket-results" },
        { icon: "🏅", label: "Results", path: ROUTES.AllResults },
    ];

    const getUserInitial = () => {
        // Use API data first, then fallback to localStorage
        if (profileData?.first_name) {
            return profileData.first_name.charAt(0).toUpperCase();
        }
        if (initialUserData?.first_name) {
            return initialUserData.first_name.charAt(0).toUpperCase();
        }
        if (initialUserData?.name) return initialUserData.name.charAt(0).toUpperCase();
        return "U";
    };

    const getUserDisplayName = () => {
        // Use API data first, then fallback to localStorage
        if (profileData?.first_name) {
            const lastName = profileData.last_name ? ` ${profileData.last_name}` : "";
            return `${profileData.first_name}${lastName}`;
        }
        if (initialUserData?.first_name) {
            const lastName = initialUserData.last_name ? ` ${initialUserData.last_name}` : "";
            return `${initialUserData.first_name}${lastName}`;
        }
        if (initialUserData?.name) return initialUserData.name;
        return "User";
    };

    const getUserPhone = () => {
        if (profileData?.phone) return profileData.phone;
        if (initialUserData?.phone) return initialUserData.phone;
        return "+91 98765 43210";
    };

    const formatPhoneNumber = (phone) => {
        if (!phone) return "+91 98765 43210";
        // Format phone number as +91 XXXXX XXXXX
        const cleaned = phone.toString().replace(/\D/g, '');
        if (cleaned.length === 10) {
            return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
        }
        return phone;
    };

    const getMemberSince = () => {
        if (profileData?.created_at) {
            const date = new Date(profileData.created_at);
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }
        return "Jan 2025";
    };

    const getVerificationBadge = () => {
        if (profileData?.is_verified === 1) {
            return { text: "Verified", color: "text-green-600", bg: "bg-green-100", icon: "✓" };
        }
        return { text: "Unverified", color: "text-red-600", bg: "bg-red-100", icon: "⚠" };
    };

    const verificationStatus = getVerificationBadge();

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                    onClick={onClose}
                ></div>
            )}

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>

                {/* Drawer Header */}
                <div className="bg-linear-to-r from-[#004296] to-[#003380] p-5 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">My Profile</h3>
                        <button
                            onClick={onClose}
                            className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="bg-red-500/20 rounded-lg p-3 mb-3">
                            <p className="text-white text-sm">{error}</p>
                            <button
                                onClick={fetchProfileData}
                                className="text-white text-xs underline mt-1"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {/* User Info */}
                    {!loading && (
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-14 h-14 bg-linear-to-br from-[#FBEFA4] to-[#FFE44D] rounded-full flex items-center justify-center text-[#004296] text-2xl font-bold border-2 border-white">
                                    {getUserInitial()}
                                </div>
                                {/* Verification Badge */}
                                <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${verificationStatus.bg} rounded-full flex items-center justify-center text-xs font-bold border-2 border-white`}>
                                    <span className={verificationStatus.color}>{verificationStatus.icon}</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-lg">{getUserDisplayName()}</h3>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${verificationStatus.bg} ${verificationStatus.color}`}>
                                        {verificationStatus.text}
                                    </span>
                                </div>
                                <p className="text-white/70 text-sm">{formatPhoneNumber(getUserPhone())}</p>
                                <p className="text-white/50 text-xs">Member since {getMemberSince()}</p>
                            </div>
                            {/* Refresh Button */}
                            <button
                                onClick={fetchProfileData}
                                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                                title="Refresh Profile"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Drawer Content */}
                <div className="overflow-y-auto h-[calc(100%-180px)]">

                    {/* Credits Section */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="bg-linear-to-r from-[#FBEFA4] to-[#FFE44D] rounded-xl p-4">
                            {/* Total Balance */}
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="text-[#004296]/70 text-xs font-medium">Total Balance</p>
                                    <p className="text-[#004296] text-3xl font-bold">
                                        ₹ {profileData?.total_balance ? parseFloat(profileData.total_balance).toLocaleString('en-IN', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }) : '0.00'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleNavigate(ROUTES.Credits)}
                                    className="bg-[#004296] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#002b66] transition-all shadow-md"
                                >
                                    + Add Credits
                                </button>
                            </div>

                            {/* Balance Breakdown */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-[#004296]/15">
                                {/* Main Balance */}
                                <div className="bg-white/50 rounded-lg p-2">
                                    <div className="flex items-center gap-1">
                                        <p className="text-[#004296]/70 text-[10px] font-medium">Main</p>
                                    </div>
                                    <p className="text-[#004296] text-sm font-bold">
                                        ₹ {profileData?.main_balance ? parseFloat(profileData.main_balance).toLocaleString('en-IN', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }) : '0.00'}
                                    </p>
                                </div>

                                {/* Winning Balance */}
                                <div className="bg-white/50 rounded-lg p-2">
                                    <div className="flex items-center gap-1">
                                        <p className="text-[#004296]/70 text-[10px] font-medium">Winning</p>
                                    </div>
                                    <p className="text-[#004296] text-sm font-bold">
                                        ₹ {profileData?.winning_balance ? parseFloat(profileData.winning_balance).toLocaleString('en-IN', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }) : '0.00'}
                                    </p>
                                </div>

                                {/* Referral Bonus */}
                                <div className="bg-white/50 rounded-lg p-2">
                                    <div className="flex items-center gap-1">
                                        <p className="text-[#004296]/70 text-[10px] font-medium">Referral</p>
                                    </div>
                                    <p className="text-[#004296] text-sm font-bold">
                                        ₹ {profileData?.referral_bonus ? parseFloat(profileData.referral_bonus).toLocaleString('en-IN', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }) : '0.00'}
                                    </p>
                                </div>

                                {/* Bonus Balance */}
                                <div className="bg-white/50 rounded-lg p-2">
                                    <div className="flex items-center gap-1">
                                        <p className="text-[#004296]/70 text-[10px] font-medium">Bonus</p>
                                    </div>
                                    <p className="text-[#004296] text-sm font-bold">
                                        ₹ {profileData?.bonus_balance ? parseFloat(profileData.bonus_balance).toLocaleString('en-IN', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }) : '0.00'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Menu Section */}
                    <div className="p-4">
                        <p className="text-gray-400 text-xs font-medium mb-2 px-2">MAIN MENU</p>
                        <div className="space-y-1">
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleNavigate(item.path)}
                                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="text-gray-700 text-sm font-medium group-hover:text-[#004296]">
                                            {item.label}
                                        </span>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#004296]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="px-4"><div className="border-t border-gray-100"></div></div>

                    {/* More Settings Section */}
                    <div className="p-4">
                        <p className="text-gray-400 text-xs font-medium mb-2 px-2">MORE SETTINGS</p>
                        <div className="space-y-1">
                            {moreItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleNavigate(item.path)}
                                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="text-gray-700 text-sm font-medium group-hover:text-[#004296]">
                                            {item.label}
                                        </span>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#004296]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="px-4"><div className="border-t border-gray-100"></div></div>

                    {/* Logout Button */}
                    <div className="p-4 pb-6">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all"
                        >
                            <span>🚪</span>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileDrawer;