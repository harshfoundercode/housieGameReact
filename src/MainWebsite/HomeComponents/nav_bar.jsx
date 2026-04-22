// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import logoImage from "../../assets/tambolaGame.jpeg"; 


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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
        { name: "Home", path: ROUTES.HomeScreenWebsite},
        { name: "Result", path: ROUTES.GAME },
        { name: "Rules", path: ROUTES.AFTERGAME },
        { name: "FAQs", path: "#faqs" },
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

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white py-3'
                : 'bg-white py-3'
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
                                Tambola
                            </h1>
                            <span className="text-[#004296] text-lg md:text-xl font-bold ml-0.5">.</span>
                            <span className="text-[#004296] text-lg md:text-xl font-bold">com</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <div className="hidden md:flex items-center gap-1 bg-gray-50 rounded-full p-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive(item.path)
                                            ? 'bg-[#004296] text-white shadow-md'
                                            : 'text-gray-600 hover:text-[#004296] hover:bg-gray-100'
                                        }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Right Side - Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-gray-600 hover:text-[#004296] text-sm font-medium transition-colors px-3 py-2"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-[#004296] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#003380] transition-all shadow-md hover:shadow-lg border border-[#004296]"
                        >
                            Register
                        </button>
                    </div>

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

                {/* Mobile Menu */}
                {isMobile && isMobileMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-gray-200">
                        <div className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`px-4 py-3 rounded-xl text-left text-base font-medium transition-all ${isActive(item.path)
                                            ? 'bg-[#004296] text-white'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.name}
                                </button>
                            ))}

                            <div className="grid grid-cols-2 gap-3 mt-4">
                                <button
                                    onClick={() => {
                                        navigate('/login');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="py-3 rounded-xl text-center text-[#004296] font-medium bg-gray-100 hover:bg-gray-200 transition-all"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => {
                                        navigate('/register');
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="py-3 rounded-xl text-center bg-[#004296] text-white font-semibold hover:bg-[#003380] transition-all shadow-md"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;