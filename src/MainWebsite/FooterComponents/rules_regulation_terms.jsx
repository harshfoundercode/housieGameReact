import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import {API} from "../../services/api_url";


const RulesAndTerms = () => {
    const navigate = useNavigate();
    const [showMoreRules, setShowMoreRules] = useState(false);
    const [showMoreTerms, setShowMoreTerms] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiData, setApiData] = useState({
        rules: "",
        terms: "",
        refund: "",
        shipping: "",
        privacy: "",
        faq: "",
        contact: null
    });

    // Parse HTML content to extract list items
    const parseHtmlToList = (htmlContent) => {
        if (!htmlContent) return [];
        
        const items = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Extract all list items from ul
        const listItems = doc.querySelectorAll('ul li');
        listItems.forEach(li => {
            items.push(li.textContent.trim());
        });
        
        // Also check for h3 and paragraphs if needed
        const disclaimer = doc.querySelector('p');
        if (disclaimer && disclaimer.textContent.includes('DISCLAIMER')) {
            items.push(disclaimer.textContent.trim());
        }
        
        return items;
    };

    // Parse Terms HTML to extract list items
    const parseTermsToList = (htmlContent) => {
        if (!htmlContent) return [];
        
        const items = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        const listItems = doc.querySelectorAll('ul li');
        listItems.forEach(li => {
            items.push(li.textContent.trim());
        });
        
        return items;
    };

    useEffect(() => {
        const fetchRulesAndTerms = async () => {
            try {
                setLoading(true);
                // Replace with your actual API endpoint
                const response = await fetch(API.FOOTER_URL);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (result.success && result.data) {
                    setApiData({
                        rules: result.data.rules || "",
                        terms: result.data.terms || "",
                        refund: result.data.refund || "",
                        shipping: result.data.shipping || "",
                        privacy: result.data.privacy || "",
                        faq: result.data.faq || "",
                        contact: result.data.contact ? JSON.parse(result.data.contact) : null
                    });
                } else {
                    throw new Error('Invalid API response structure');
                }
                
                setError(null);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRulesAndTerms();
    }, []);

    // Parse the API HTML content into arrays
    const dosAndDonts = parseHtmlToList(apiData.rules);
    const rulesGuidelines = parseHtmlToList(apiData.rules); // Rules & Guidelines are also in the same HTML
    const termsConditions = parseTermsToList(apiData.terms);

    // Separate Do's & Don'ts from Rules & Guidelines
    // The API returns both in the same HTML, so we need to split them
    const getDosAndDontsOnly = () => {
        const items = [];
        if (!apiData.rules) return [];
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(apiData.rules, 'text/html');
        
        // Find the Do's & Don'ts section
        const h3Elements = doc.querySelectorAll('h3');
        let foundDosDonts = false;
        
        h3Elements.forEach(h3 => {
            if (h3.textContent.includes("Do's & Don'ts")) {
                foundDosDonts = true;
                let nextElement = h3.nextElementSibling;
                while (nextElement && nextElement.tagName !== 'H3') {
                    if (nextElement.tagName === 'UL') {
                        const listItems = nextElement.querySelectorAll('li');
                        listItems.forEach(li => {
                            items.push(li.textContent.trim());
                        });
                    }
                    nextElement = nextElement.nextElementSibling;
                }
            }
        });
        
        return items;
    };

    const getRulesGuidelinesOnly = () => {
        const items = [];
        if (!apiData.rules) return [];
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(apiData.rules, 'text/html');
        
        // Find the Rules & Guidelines section
        const h3Elements = doc.querySelectorAll('h3');
        let foundRules = false;
        
        h3Elements.forEach(h3 => {
            if (h3.textContent.includes("Rules & Guidelines")) {
                foundRules = true;
                let nextElement = h3.nextElementSibling;
                while (nextElement && nextElement.tagName !== 'H3') {
                    if (nextElement.tagName === 'UL') {
                        const listItems = nextElement.querySelectorAll('li');
                        listItems.forEach(li => {
                            items.push(li.textContent.trim());
                        });
                    }
                    nextElement = nextElement.nextElementSibling;
                }
            }
        });
        
        // Also get the disclaimer paragraph
        const disclaimer = doc.querySelector('p');
        if (disclaimer && disclaimer.textContent.includes('DISCLAIMER')) {
            items.push(disclaimer.textContent.trim());
        }
        
        return items;
    };

    const dosAndDontsList = getDosAndDontsOnly();
    const rulesGuidelinesList = getRulesGuidelinesOnly();
    const termsConditionsList = parseTermsToList(apiData.terms);

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading rules and regulations...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex justify-center items-center h-96 px-4">
                    <div className="text-center bg-red-50 p-8 rounded-lg max-w-md mx-auto">
                        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="text-xl font-bold text-red-700 mb-2">Error Loading Content</h3>
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-[#004296] text-white px-6 py-2 rounded-lg hover:bg-[#003380] transition"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Header */}
            <section className="pt-24 md:pt-28 pb-6 px-4 bg-[#004296]">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Rules & Regulations
                    </h1>
                </div>
            </section>

            {/* Content */}
            <section className="py-8 md:py-10 px-4">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Intro Text */}
                    <div className="mb-8 text-gray-700 text-sm md:text-base leading-relaxed">
                        <p className="mb-4">
                            We operate as an online Tambola platform. We operate in a responsible, safe and legal manner to protect the participants within the framework of relevant guidelines, laws and regulatory authorities.
                        </p>
                        <p>
                            We have created a transparent and legal way for the participants to try their luck for fun and keeping the joy of winning in mind. All the information pertaining to the purchase of tickets via Tambola.com, their sale, their prize winnings and compliance within the regulatory framework are easily accessible via our website.
                        </p>
                    </div>

                    {/* Do's & Don'ts Section */}
                    {dosAndDontsList.length > 0 && (
                        <div className="mb-10">
                            <h3 className="text-xl md:text-2xl font-bold text-[#004296] mb-4">
                                Do's & Don'ts of responsible participation in Online Lottery:
                            </h3>
                            <div className="space-y-3">
                                {dosAndDontsList.map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <span className="text-[#004296] font-bold min-w-7">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <p className="text-gray-600 text-sm md:text-base">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Rules and Guidelines Section */}
                    {rulesGuidelinesList.length > 0 && (
                        <div className="mb-10">
                            <h3 className="text-xl md:text-2xl font-bold text-[#004296] mb-4">
                                Rules and Guidelines
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 italic">
                                For company employees, agents and their employees and purchasers (hereinafter referred to as "They")
                            </p>
                            <div className="space-y-3">
                                {rulesGuidelinesList.slice(0, showMoreRules ? rulesGuidelinesList.length : 8).map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <span className="text-[#004296] font-bold min-w-7">
                                            {index + 1}.
                                        </span>
                                        <p className="text-gray-600 text-sm md:text-base">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {rulesGuidelinesList.length > 8 && (
                                <button 
                                    onClick={() => setShowMoreRules(!showMoreRules)}
                                    className="mt-4 text-[#004296] font-medium text-sm hover:underline"
                                >
                                    Read {showMoreRules ? 'Less' : 'More'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Terms & Conditions Section */}
                    {termsConditionsList.length > 0 && (
                        <div className="mb-10">
                            <h3 className="text-xl md:text-2xl font-bold text-[#004296] mb-4">
                                Terms & Conditions
                            </h3>
                            <div className="space-y-3">
                                {termsConditionsList.slice(0, showMoreTerms ? termsConditionsList.length : 6).map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <span className="text-[#004296] font-bold min-w-7">
                                            {index + 1}.
                                        </span>
                                        <p className="text-gray-600 text-sm md:text-base">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {termsConditionsList.length > 6 && (
                                <button 
                                    onClick={() => setShowMoreTerms(!showMoreTerms)}
                                    className="mt-4 text-[#004296] font-medium text-sm hover:underline"
                                >
                                    Read {showMoreTerms ? 'Less' : 'More'}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Jurisdiction */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-gray-700 font-medium mb-2">
                            All disputes are subjected to the courts of Shillong and only the courts of Shillong has jurisdiction.
                        </p>
                        <p className="text-gray-700 font-medium">
                            All verdicts of the management are final with respect to the disputes regarding the prize or draw methodology.
                        </p>
                    </div>

                    {/* Back Button */}
                    <div className="text-center mt-10">
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

export default RulesAndTerms;