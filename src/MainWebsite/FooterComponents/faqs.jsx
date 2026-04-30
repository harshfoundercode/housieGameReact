import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import { API } from "../../services/api_url";

const FAQs = () => {
    const navigate = useNavigate();
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

    // Parse FAQ HTML to extract questions and answers
    const parseFaqToArray = (htmlContent) => {
        if (!htmlContent) return [];
        
        const faqs = [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        
        // Find all strong tags (questions) and their parent li elements
        const listItems = doc.querySelectorAll('ul li');
        
        listItems.forEach(li => {
            const strongTag = li.querySelector('strong');
            if (strongTag) {
                // Extract question (text within strong tag)
                const question = strongTag.textContent.trim();
                // Extract answer (text after strong tag)
                let answer = li.textContent.replace(strongTag.textContent, '').trim();
                // Remove any extra whitespace and clean up
                answer = answer.replace(/^[:\s]+/, '');
                
                if (question && answer) {
                    faqs.push({ question, answer });
                }
            }
        });
        
        return faqs;
    };

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                setLoading(true);
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

        fetchFaqs();
    }, []);

    // Parse FAQ data
    const faqList = parseFaqToArray(apiData.faq);

    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="flex justify-center items-center h-96">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296] mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading FAQs...</p>
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
                        Frequently Asked Questions
                    </h1>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-8 md:py-10 px-4">
                <div className="max-w-4xl mx-auto">
                    {faqList.length > 0 ? (
                        <div className="space-y-6">
                            {faqList.map((faq, index) => (
                                <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                                    <h3 className="font-bold text-[#004296] text-lg md:text-xl mb-3">
                                        {index + 1}. {faq.question}
                                    </h3>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No FAQs available at the moment.</p>
                        </div>
                    )}

                    {/* Back Button */}
                    <div className="text-center mt-10">
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

export default FAQs;