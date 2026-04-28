import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

const ProfileDrawer = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    // Get user data from localStorage
    const storedUser = localStorage.getItem("user");
const userData = storedUser && storedUser !== "undefined" 
    ? JSON.parse(storedUser) 
    : null;
    
    const credits = localStorage.getItem("credits") || "1250";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        onClose();
        navigate(ROUTES.HomeScreenWebsite);
        window.location.reload();
    };

    const handleNavigate = (path) => {
        navigate(path);
        onClose();
    };

    const menuItems = [
        { icon: "💰", label: "Credits", path: ROUTES.Credits},
        { icon: "🎫", label: "Buy Tickets", path: ROUTES.GAME },
        { icon: "📋", label: "My Tickets", path: ROUTES.MyTickets },
    ];

    const moreItems = [
        { icon: "✅", label: "My KYC", path: ROUTES.KYC },
        { icon: "🌐", label: "Language", path: ROUTES.LANG },
        { icon: "⚙️", label: "Settings", path: ROUTES.SETTINGS},
        { icon: "📰", label: "News & Media", path: ROUTES.MEDIA },
        { icon: "📊", label: "Ticket Results", path: "/ticket-results" },
        { icon: "🏅", label: "Results", path: ROUTES.AllResults},
    ];

    const getUserInitial = () => {
        if (!userData) return "U"; // null/undefined check
        if (userData?.name) return userData.name.charAt(0).toUpperCase();
        if (userData?.firstName) return userData.firstName.charAt(0).toUpperCase();
        return "U";
    };

    const getUserDisplayName = () => {
        if (!userData) return "User";
        if (userData?.name) return userData.name;
        if (userData?.firstName && userData?.lastName)
            return `${userData.firstName} ${userData.lastName}`;
        if (userData?.firstName) return userData.firstName;
        return "User";
    };

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

                    {/* User Info */}
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-linear-to-br from-[#FBEFA4] to-[#FFE44D] rounded-full flex items-center justify-center text-[#004296] text-1xl font-bold border-2 border-white">
                            {getUserInitial()}
                        </div>
                        <div>
                            <h3 className="font-bold text-1xl">{getUserDisplayName()}</h3>
                            <p className="text-white/70 text-sm">{userData?.phone || "+91 98765 43210"}</p>
                            <p className="text-white/50 text-xs">Member since Jan 2025</p>
                        </div>
                    </div>
                </div>

                {/* Drawer Content */}
                <div className="overflow-y-auto h-[calc(100%-140px)]">

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
                                        <span className="text-gray-700  text-sm font-medium group-hover:text-[#004296]">
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
                    <div className="p-4">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all"
                        >
                            <span> 📲 </span>
                            Logout
                        </button>
                    </div>
                </div>        
            </div>
        </>
    );
};

export default ProfileDrawer;