import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import logoImage from "../../assets/tambolaGame.jpeg";
import ProfileDrawer from "./profile_drawer";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [credits, setCredits] = useState(null);

    // Check login status and get user data
    const checkLoginStatus = () => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        const storedCredits = localStorage.getItem("credits");
        
        setIsLoggedIn(!!token);
        
        if (user && user !== "undefined") {
            try {
                const parsedUser = JSON.parse(user);
                setUserData(parsedUser);
            } catch (e) {
                console.error("Error parsing user data:", e);
                setUserData(null);
            }
        } else {
            setUserData(null);
        }
        
        if (storedCredits) {
            setCredits(storedCredits);
        }
    };

    // Listen for profile updates and login/logout events
    useEffect(() => {
        checkLoginStatus();
        
        // Listen for storage changes (when data is updated in another tab/window)
        window.addEventListener('storage', checkLoginStatus);
        
        // Custom event listeners for profile updates within same tab
        const handleUserLogin = () => checkLoginStatus();
        const handleUserLogout = () => checkLoginStatus();
        const handleProfileUpdate = () => checkLoginStatus();
        const handleCreditsUpdate = () => {
            const storedCredits = localStorage.getItem("credits");
            if (storedCredits) setCredits(storedCredits);
        };
        
        window.addEventListener('userLoggedIn', handleUserLogin);
        window.addEventListener('userLoggedOut', handleUserLogout);
        window.addEventListener('profileUpdated', handleProfileUpdate);
        window.addEventListener('creditsUpdated', handleCreditsUpdate);
        
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
            window.removeEventListener('userLoggedIn', handleUserLogin);
            window.removeEventListener('userLoggedOut', handleUserLogout);
            window.removeEventListener('profileUpdated', handleProfileUpdate);
            window.removeEventListener('creditsUpdated', handleCreditsUpdate);
        };
    }, []);

    // Check screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: "Home", path: ROUTES.HomeScreenWebsite },
        { name: "Result", path: ROUTES.AFTERGAME },
        { name: "Rules", path: ROUTES.RULES },
        { name: "FAQs", path: ROUTES.FAQS },
    ];

    const isActive = (path) => {
        if (path.startsWith('#')) return false;
        return location.pathname === path;
    };

    const handleNavigation = (path) => {
        if (path.startsWith('#')) {
            const element = document.getElementById(path.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            setIsMobileMenuOpen(false);
        } else {
            navigate(path);
            setIsMobileMenuOpen(false);
        }
    };

    // Get user initial for avatar
    const getUserInitial = () => {
        if (!userData) return "U";
        
        // Check for first_name from API response
        if (userData.first_name) {
            return userData.first_name.charAt(0).toUpperCase();
        }
        if (userData.name) {
            return userData.name.charAt(0).toUpperCase();
        }
        if (userData.firstName) {
            return userData.firstName.charAt(0).toUpperCase();
        }
        return "U";
    };

    // Get user display name for mobile menu
    const getUserDisplayName = () => {
        if (!userData) return "User";
        
        if (userData.first_name) {
            const lastName = userData.last_name ? ` ${userData.last_name}` : "";
            return `${userData.first_name}${lastName}`;
        }
        if (userData.name) return userData.name;
        if (userData.firstName) {
            const lastName = userData.lastName ? ` ${userData.lastName}` : "";
            return `${userData.firstName}${lastName}`;
        }
        return "User";
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        // Refresh user data when drawer closes (in case of updates)
        checkLoginStatus();
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white py-3'
            }`}>
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <div
                            onClick={() => navigate(ROUTES.HomeScreenWebsite)}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <div className="relative">
                                <div className="relative w-10 h-10 md:w-11 md:h-11 bg-linear-to-br from-[#004296] to-[#0066cc] rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all overflow-hidden">
                                    <img
                                        src={logoImage}
                                        alt="Tambola"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="flex items-baseline">
                                <h1 className="text-xl md:text-2xl font-bold text-[#004296]">
                                    Bingo Tambola Lucky Funda
                                </h1>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <div className="hidden md:flex items-center gap-1 bg-gray-50 rounded-full p-1">
                                {navItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigation(item.path)}
                                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                            isActive(item.path)
                                                ? 'bg-[#004296] text-white shadow-md'
                                                : 'text-gray-600 hover:text-[#004296] hover:bg-gray-100'
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Right Side - Auth Buttons OR Profile Avatar */}
                        <div className="flex items-center gap-3">
                            {!isLoggedIn ? (
                                <>
                                    <button
                                        onClick={() => navigate(ROUTES.LOGIN)}
                                        className="hidden sm:block text-gray-600 hover:text-[#004296] text-sm font-medium transition-colors px-3 py-2"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate(ROUTES.REGISTER)}
                                        className="bg-[#004296] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#003380] transition-all shadow-md hover:shadow-lg border border-[#004296]"
                                    >
                                        Register
                                    </button>
                                </>
                            ) : (
                                /* Profile Avatar - Click to open drawer */
                                <div className="flex items-center gap-3">
                                    {/* Credits Display (Optional) */}
                                   
                                    <button
                                        onClick={() => setIsDrawerOpen(true)}
                                        className="relative group"
                                    >
                                        <div className="w-10 h-10 md:w-11 md:h-11 bg-linear-to-br from-[#004296] to-[#0066cc] rounded-full flex items-center justify-center shadow-md border-2 border-[#FBEFA4] overflow-hidden">
                                            <span className="text-white text-lg font-bold">
                                                {getUserInitial()}
                                            </span>
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    </button>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            {isMobile && (
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[#004296] hover:bg-gray-200 transition-all"
                                >
                                    {isMobileMenuOpen ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobile && isMobileMenuOpen && (
                        <div className="md:hidden mt-4 py-4 border-t border-gray-200">
                            <div className="flex flex-col gap-1">
                                {/* Show user info if logged in */}
                                {isLoggedIn && userData && (
                                    <div className="px-4 py-3 mb-2 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-linear-to-br from-[#004296] to-[#0066cc] rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold">{getUserInitial()}</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{getUserDisplayName()}</p>
                                                <p className="text-sm text-gray-500">{userData.phone || userData.phone_number}</p>
                                            </div>
                                        </div>
                                       
                                    </div>
                                )}
                                
                                {navItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigation(item.path)}
                                        className={`px-4 py-3 rounded-xl text-left text-base font-medium transition-all ${
                                            isActive(item.path)
                                                ? 'bg-[#004296] text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}

                                {!isLoggedIn ? (
                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <button
                                            onClick={() => {
                                                navigate(ROUTES.LOGIN);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="py-3 rounded-xl text-center text-[#004296] font-medium bg-gray-100 hover:bg-gray-200 transition-all"
                                        >
                                            Login
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate(ROUTES.REGISTER);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="py-3 rounded-xl text-center bg-[#004296] text-white font-semibold hover:bg-[#003380] transition-all shadow-md"
                                        >
                                            Register
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            // Handle logout from mobile menu
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
                                            
                                            setIsLoggedIn(false);
                                            setUserData(null);
                                            setCredits(null);
                                            setIsMobileMenuOpen(false);
                                            navigate(ROUTES.HomeScreenWebsite);
                                            window.location.reload();
                                        }}
                                        className="mt-4 py-3 rounded-xl text-center bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-all"
                                    >
                                        Logout
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Profile Drawer - Pass userData and refresh function */}
            <ProfileDrawer 
                isOpen={isDrawerOpen}
                onClose={handleDrawerClose}
                onProfileUpdate={checkLoginStatus}
            />
        </>
    );
};

export default Navbar;