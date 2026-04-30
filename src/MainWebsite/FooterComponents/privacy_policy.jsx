// src/page/PrivacyPolicy.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import { API } from "../../services/api_url";

const PrivacyPolicy = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [privacyHtml, setPrivacyHtml] = useState("");

    useEffect(() => {
        const fetchPrivacyPolicy = async () => {
            try {
                setLoading(true);
                const response = await fetch(API.FOOTER_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success && result.data) {
                    setPrivacyHtml(result.data.privacy || "");
                } else {
                    throw new Error('Invalid API response structure');
                }

                setError(null);
            } catch (err) {
                console.error('Error fetching privacy policy:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPrivacyPolicy();
    }, []);

    // Parse Privacy HTML to extract structured data
    const parsePrivacyToArray = (htmlContent) => {
        if (!htmlContent) return [];
        
        const sections = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Find all paragraphs
        const paragraphs = doc.querySelectorAll('p');
        let introText = "";
        
        // Extract intro text from first paragraph
        if (paragraphs.length > 0) {
            introText = paragraphs[0].textContent.trim();
        }
        
        // Find h3 headings and their following content
        const headings = doc.querySelectorAll('h3');
        
        headings.forEach((heading, index) => {
            const title = heading.textContent.trim();
            let content = "";
            
            // Get the next sibling or next paragraph
            let nextElement = heading.nextElementSibling;
            while (nextElement && nextElement.tagName !== 'H3') {
                if (nextElement.tagName === 'P') {
                    content += nextElement.textContent.trim() + " ";
                } else if (nextElement.tagName === 'UL') {
                    const listItems = nextElement.querySelectorAll('li');
                    listItems.forEach(li => {
                        content += `• ${li.textContent.trim()} `;
                    });
                }
                nextElement = nextElement.nextElementSibling;
            }
            
            if (title && content.trim()) {
                sections.push({
                    title: `${index + 1}. ${title}`,
                    content: content.trim()
                });
            }
        });
        
        return { introText, sections };
    };

    // Get current date for last updated
    const getLastUpdated = () => {
        const date = new Date();
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const { introText, sections } = parsePrivacyToArray(privacyHtml);

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading Privacy Policy...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
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
                        
                        
                        {/* Intro */}
                        {introText && (
                            <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <p className="text-gray-700 text-sm md:text-base">
                                    {introText}
                                </p>
                            </div>
                        )}

                        {/* Privacy Sections */}
                        {sections.length > 0 ? (
                            <div className="space-y-6">
                                {sections.map((section, index) => (
                                    <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                                        <h3 className="text-lg font-bold text-[#004296] mb-2">
                                            {section.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Fallback: Render raw HTML if parsing fails
                            <div 
                                className="prose prose-sm md:prose-base max-w-none"
                                dangerouslySetInnerHTML={{ __html: privacyHtml }}
                            />
                        )}

                       
                    </div>

                    {/* Back Button */}
                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate("/")}
                            className="text-[#004296] hover:text-[#003380] font-medium text-sm flex items-center gap-2 mx-auto transition-colors"
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