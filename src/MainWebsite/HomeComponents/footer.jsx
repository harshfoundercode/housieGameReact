import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/tambolaGame.jpeg";
import { ROUTES } from "../../routes/routes";
import LiveResultTable from "./live_result_table";
import TodaysWinner from "./todays_winners";
import HowItWorks from "./how_it_works";
import RulesAndTerms from "../FooterComponents/rules_regulation_terms";
import CancellationRefundPolicy from "../FooterComponents/cancellation_refund_policy";
import PrivacyPolicy from "../FooterComponents/privacy_policy";
import FAQs from "../FooterComponents/faqs";
import { API } from "../../services/api_url";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [contactInfo, setContactInfo] = useState({
        address: "Loading...",
        email: "Loading...",
        phone: "Loading...",
        whatsapp: "Loading..."
    });
    const [isLoadingContact, setIsLoadingContact] = useState(true);

    // Fetch contact information from API
    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const response = await fetch(API.FOOTER_URL);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result.success && result.data && result.data.contact) {
                    // Parse contact data - it could be string or object
                    const contactData = typeof result.data.contact === 'string' 
                        ? JSON.parse(result.data.contact) 
                        : result.data.contact;
                    
                    setContactInfo({
                        address: contactData.address || "Delhi, India",
                        email: contactData.email || "test@mail.com",
                        phone: contactData.phone || "9999999999",
                        whatsapp: contactData.whatsapp || "7881116009"
                    });
                }
            } catch (error) {
                console.error('Error fetching contact info:', error);
                // Set fallback data
                setContactInfo({
                    address: "Delhi, India",
                    email: "test@mail.com",
                    phone: "9999999999",
                    whatsapp: "7881116009"
                });
            } finally {
                setIsLoadingContact(false);
            }
        };

        fetchContactInfo();
    }, []);

    // Format phone number for display
    const formatPhone = (phone) => {
        if (!phone || phone === "Loading...") return phone;
        // Remove any non-numeric characters
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        // Format as Indian phone number if it's 10 digits
        if (cleanPhone.length === 10) {
            return `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`;
        }
        return phone;
    };

    // Scroll to section function
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

   // Quick Links with section IDs
    const quickLinks = [
        { name: "Home", sectionId: "home" },
        { name: "Live Draws", sectionId: "live-draws" },
        { name: "Winners", sectionId: "winners" },
        { name: "How to Play", sectionId: "how-it-works" },
    ];
    // Policy Links - Using ROUTES paths
    const policyLinks = [
        { name: "Rules & Regulations", path: ROUTES.RULES },
        { name: "Terms & Conditions", path: ROUTES.RULES },
        // { name: "Cancellation & Refund", path: ROUTES.CANCELATIONREFUNDPOLICY },
        { name: "Privacy Policy", path: ROUTES.PRIVACYPOLICY },
        { name: "FAQs", path: ROUTES.FAQS },
    ];

    return (
        <footer className="w-full bg-gradient-to-br from-[#001a33] via-[#002266] to-[#001a4d] text-white relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #FBEFA4 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}></div>
            </div>
            
            {/* Glow Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FBEFA4] rounded-full blur-3xl opacity-5"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#004296] rounded-full blur-3xl opacity-10"></div>

            {/* Top Border Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FBEFA4] to-transparent"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-12">
                
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    
                    {/* Column 1 - Logo & About */}
                    <div className="text-center sm:text-left">
                        <div className="flex items-center gap-2 justify-center sm:justify-start mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#004296] to-[#0066cc] rounded-xl flex items-center justify-center shadow-lg">
                                <img src={logoImage} alt="Tambola" className="w-full h-full object-cover rounded-xl" />
                            </div>
                            <h3 className="text-xl font-bold">
                                <span className="text-[#FBEFA4]">Bingo Tambola Lucky Funda</span>
                                <span className="text-white">.com</span>
                            </h3>
                        </div>
                        <p className="text-white/60 text-sm mb-4">
                            India's most trusted online Tambola platform. Play, win, and celebrate with millions of players!
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex items-center gap-3 justify-center sm:justify-start mt-4">
                            <a href="#" className="w-8 h-8 bg-white/10 hover:bg-[#FBEFA4]/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                <svg className="w-4 h-4 text-[#FBEFA4]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 bg-white/10 hover:bg-[#FBEFA4]/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                <svg className="w-4 h-4 text-[#FBEFA4]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 bg-white/10 hover:bg-[#FBEFA4]/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                <svg className="w-4 h-4 text-[#FBEFA4]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 bg-white/10 hover:bg-[#FBEFA4]/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                <svg className="w-4 h-4 text-[#FBEFA4]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                
                    <div className="text-center sm:text-left">
                        <h4 className="text-[#FBEFA4] font-bold text-base mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                           {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <button
                                        onClick={() => scrollToSection(link.sectionId)}
                                        className="text-white/60 hover:text-[#FBEFA4] text-sm transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 - Policies */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-[#FBEFA4] font-bold text-base mb-4">Policies & Legal</h4>
                        <ul className="space-y-2">
                            {policyLinks.map((link, i) => (
                                <li key={i}>
                                    <Link 
                                        to={link.path} 
                                        className="text-white/60 hover:text-[#FBEFA4] text-sm transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 - Contact Info (Dynamic from API) */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-[#FBEFA4] font-bold text-base mb-4">Contact Us</h4>
                        
                        {isLoadingContact ? (
                            // Loading skeleton for contact info
                            <div className="space-y-3 animate-pulse">
                                <div className="flex items-start gap-3 justify-center sm:justify-start">
                                    <div className="w-5 h-5 bg-white/10 rounded mt-1"></div>
                                    <div className="space-y-2 flex-1">
                                        <div className="h-3 bg-white/10 rounded w-full"></div>
                                        <div className="h-3 bg-white/10 rounded w-3/4"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 justify-center sm:justify-start">
                                    <div className="w-5 h-5 bg-white/10 rounded"></div>
                                    <div className="h-3 bg-white/10 rounded w-2/3"></div>
                                </div>
                                <div className="flex items-center gap-3 justify-center sm:justify-start">
                                    <div className="w-5 h-5 bg-white/10 rounded"></div>
                                    <div className="h-3 bg-white/10 rounded w-1/2"></div>
                                </div>
                                <div className="flex items-center gap-3 justify-center sm:justify-start">
                                    <div className="w-5 h-5 bg-white/10 rounded"></div>
                                    <div className="h-3 bg-white/10 rounded w-3/4"></div>
                                </div>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {/* Address */}
                                <li className="flex items-start gap-3 justify-center sm:justify-start">
                                    <span className="text-[#FBEFA4] text-lg mt-1">📍</span>
                                    <span className="text-white/60 text-sm">
                                        {contactInfo.address}
                                    </span>
                                </li>
                                
                                {/* Email */}
                                <li className="flex items-center gap-3 justify-center sm:justify-start">
                                    <span className="text-[#FBEFA4] text-lg">📧</span>
                                    <a 
                                        href={`mailto:${contactInfo.email}`} 
                                        className="text-white/60 hover:text-[#FBEFA4] text-sm transition-colors"
                                    >
                                        {contactInfo.email}
                                    </a>
                                </li>
                                
                                {/* Phone */}
                                <li className="flex items-center gap-3 justify-center sm:justify-start">
                                    <span className="text-[#FBEFA4] text-lg">📞</span>
                                    <a 
                                        href={`tel:${contactInfo.phone}`} 
                                        className="text-white/60 hover:text-[#FBEFA4] text-sm transition-colors"
                                    >
                                        {formatPhone(contactInfo.phone)}
                                    </a>
                                </li>
                                
                                {/* WhatsApp */}
                                <li className="flex items-center gap-3 justify-center sm:justify-start">
                                    <span className="text-[#FBEFA4] text-lg">💬</span>
                                    <a 
                                        href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white/60 hover:text-[#FBEFA4] text-sm transition-colors flex items-center gap-1.5"
                                    >
                                        <span>WhatsApp: {contactInfo.whatsapp}</span>
                                        <span className="text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full font-medium">
                                            Chat
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10">
                    <p className="text-white/40 text-xs text-center md:text-left">
                        © {currentYear} Tambola.com. All rights reserved. 
                        <span className="mx-2">|</span>
                        <span className="text-[#FBEFA4]/60">Play Responsibly • 18+ Only</span>
                    </p>
                    <p className="text-white/30 text-xs">
                        Made with <span className="text-red-500">❤️</span> in India
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;