import React from "react";
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

const Footer = () => {
    const currentYear = new Date().getFullYear();

    
    
    
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
        { name: "Cancellation & Refund", path: ROUTES.CANCELATIONREFUNDPOLICY },
        { name: "Privacy Policy", path: ROUTES.PRIVACYPOLICY },
        { name: "FAQs", path: ROUTES.FAQS },
    ];


    return (
        <footer className="w-full bg-linear-to-br from-[#001a33] via-[#002266] to-[#001a4d] text-white relative overflow-hidden">
            
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
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-[#FBEFA4] to-transparent"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-12">
                
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    
                    {/* Column 1 - Logo & About */}
                    <div className="text-center sm:text-left">
                        <div className="flex items-center gap-2 justify-center sm:justify-start mb-4">
                            <div className="w-10 h-10 bg-linear-to-br from-[#004296] to-[#0066cc] rounded-xl flex items-center justify-center shadow-lg">
                                <img src={logoImage} alt="Tambola" className="w-full h-full object-cover rounded-xl" />
                            </div>
                            <h3 className="text-xl font-bold">
                                <span className="text-[#FBEFA4]">Tambola</span>
                                <span className="text-white">.com</span>
                            </h3>
                        </div>
                        <p className="text-white/60 text-sm mb-4">
                            India's most trusted online Tambola platform. Play, win, and celebrate with millions of players!
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-3 justify-center sm:justify-start">
                            {["📘", "🐦", "📸", "▶️"].map((icon, i) => (
                                <div key={i} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm hover:bg-[#FBEFA4] hover:text-[#004296] transition-all cursor-pointer">
                                    {icon}
                                </div>
                            ))}
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

                    {/* Column 4 - Contact Info */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-[#FBEFA4] font-bold text-base mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 justify-center sm:justify-start">
                                <span className="text-[#FBEFA4] text-lg">📍</span>
                                <span className="text-white/60 text-sm">
                                    123 Tambola Tower, MG Road,<br />
                                    Bengaluru, Karnataka - 560001
                                </span>
                            </li>
                            <li className="flex items-center gap-3 justify-center sm:justify-start">
                                <span className="text-[#FBEFA4] text-lg">📧</span>
                                <a href="mailto:support@tambola.com" className="text-white/60 hover:text-[#FBEFA4] text-sm transition-colors">
                                    support@tambola.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 justify-center sm:justify-start">
                                <span className="text-[#FBEFA4] text-lg">📞</span>
                                <a href="tel:+9118001234567" className="text-white/60 hover:text-[#FBEFA4] text-sm transition-colors">
                                    1800-123-4567
                                </a>
                            </li>
                            <li className="flex items-center gap-3 justify-center sm:justify-start">
                                <span className="text-[#FBEFA4] text-lg">💬</span>
                                <span className="text-white/60 text-sm">
                                    WhatsApp: +91 98765 43210
                                </span>
                            </li>
                        </ul>
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