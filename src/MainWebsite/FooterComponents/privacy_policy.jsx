// src/page/PrivacyPolicy.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";


const PrivacyPolicy = () => {
    const navigate = useNavigate();

    const privacyData = [
        {
            title: "1. Information We Collect",
            content: "We collect personal information such as name, phone number, email address, and payment details when you register on Tambola.com. We also collect transaction data, game history, and device information for security and analytics purposes."
        },
        {
            title: "2. How We Use Your Information",
            content: "Your information is used to process transactions, verify your identity, provide customer support, send game updates and promotional offers, improve our services, and comply with legal obligations."
        },
        {
            title: "3. Data Security",
            content: "We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits. Your payment information is processed through PCI-compliant payment gateways."
        },
        {
            title: "4. Information Sharing",
            content: "We do not sell your personal information to third parties. Information may be shared with payment processors, KYC verification partners, and law enforcement when required by law."
        },
        {
            title: "5. Cookies and Tracking",
            content: "We use cookies and similar technologies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser."
        },
        {
            title: "6. Data Retention",
            content: "We retain your personal information for as long as your account is active or as needed to provide services. Transaction records are retained for 7 years as per Indian tax laws."
        },
        {
            title: "7. Your Rights",
            content: "You have the right to access, correct, or delete your personal information. You can withdraw consent for marketing communications at any time. Contact support@tambola.com to exercise these rights."
        },
        {
            title: "8. Children's Privacy",
            content: "Tambola.com is strictly for users aged 18 and above. We do not knowingly collect information from minors. If we discover a minor has provided information, it will be deleted immediately."
        },
        {
            title: "9. Third-Party Links",
            content: "Our website may contain links to third-party sites. We are not responsible for their privacy practices. Please review their policies before providing any information."
        },
        {
            title: "10. Changes to Privacy Policy",
            content: "We may update this policy periodically. Significant changes will be notified via email or website announcement. Continued use of our services constitutes acceptance of the updated policy."
        },
        {
            title: "11. Grievance Officer",
            content: "For any privacy-related concerns, contact our Grievance Officer: Name: Rajesh Kumar, Email: grievance@tambola.com, Phone: 1800-123-4567, Address: 123 Tambola Tower, MG Road, Bengaluru - 560001."
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Header Banner */}
            <section className="pt-24 md:pt-28 pb-8 px-4 bg-linear-to-br from-[#004296] to-[#003380]">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                        Privacy <span className="text-[#FBEFA4]">Policy</span>
                    </h1>
                    <p className="text-white/70 text-sm md:text-base">
                        Your privacy is important to us. Learn how we protect your data.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-8 md:py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                        
                        {/* Last Updated */}
                        <div className="mb-6 pb-4 border-b border-gray-200">
                            <p className="text-gray-400 text-sm">
                                Last Updated: April 21, 2026
                            </p>
                        </div>

                        {/* Intro */}
                        <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-gray-700 text-sm md:text-base">
                                At Tambola.com, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                            </p>
                        </div>

                        {/* Privacy Sections */}
                        <div className="space-y-6">
                            {privacyData.map((item, index) => (
                                <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                                    <h3 className="text-lg font-bold text-[#004296] mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Contact Box */}
                        <div className="mt-8 p-5 bg-[#FBEFA4]/10 rounded-xl border border-[#FBEFA4]/30">
                            <h4 className="font-bold text-[#004296] mb-2">📞 Questions about our Privacy Policy?</h4>
                            <p className="text-gray-600 text-sm mb-3">
                                Contact our Data Protection Officer:
                            </p>
                            <div className="space-y-1 text-sm">
                                <p className="text-gray-700">📧 privacy@tambola.com</p>
                                <p className="text-gray-700">📞 1800-123-4567 (Toll Free)</p>
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate("/")}
                            className="text-[#004296] hover:text-[#003380] font-medium text-sm flex items-center gap-2 mx-auto"
                        >
                            <span>←</span> Back to Home
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;