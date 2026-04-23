// src/page/Language.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";

const Language = () => {
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState("english");
    const [isSaved, setIsSaved] = useState(false);

    const languages = [
        { 
            id: "english", 
            name: "English", 
            nativeName: "English",
            icon: "🇬🇧",
            flag: "🇬🇧",
            description: "Change language to English"
        },
        { 
            id: "hindi", 
            name: "Hindi", 
            nativeName: "हिन्दी",
            icon: "🇮🇳",
            flag: "🇮🇳",
            description: "भाषा हिन्दी में बदलें"
        },
        { 
            id: "marathi", 
            name: "Marathi", 
            nativeName: "मराठी",
            icon: "🇮🇳",
            flag: "🏵️",
            description: "भाषा मराठीमध्ये बदला"
        },
    ];

    const handleLanguageSelect = (langId) => {
        setSelectedLang(langId);
        setIsSaved(false);
    };

    const handleSaveLanguage = () => {
        const selectedLanguage = languages.find(lang => lang.id === selectedLang);
        localStorage.setItem("language", selectedLang);
        localStorage.setItem("languageName", selectedLanguage.name);
        setIsSaved(true);
        
        setTimeout(() => {
            alert(`Language changed to ${selectedLanguage.name}`);
            navigate(-1); // Go back to previous page
        }, 800);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-white flex flex-col">
            <Navbar />

            <main className="grow pt-24 md:pt-28 pb-12 px-4">
                <div className="max-w-2xl mx-auto">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                       
                        <h1 className="text-3xl md:text-3xl font-bold text-[#004296] mb-2">
                            Select Language
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base">
                            Choose your preferred language for the app
                        </p>
                    </div>

                    {/* Current Language Display */}
                    <div className="bg-[#004296]/5 rounded-xl p-4 mb-6 border border-[#004296]/20">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Current Language</span>
                            <span className="text-[#004296] font-bold">
                                {languages.find(l => l.id === (localStorage.getItem("language") || "english"))?.name || "English"}
                            </span>
                        </div>
                    </div>

                    {/* Language Options */}
                    <div className="space-y-3 mb-8">
                        {languages.map((lang) => (
                            <label
                                key={lang.id}
                                className={`flex items-center p-4 md:p-5 rounded-xl border-2 cursor-pointer transition-all ${
                                    selectedLang === lang.id
                                        ? "border-[#004296] bg-[#004296]/5 shadow-md"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="language"
                                    value={lang.id}
                                    checked={selectedLang === lang.id}
                                    onChange={() => handleLanguageSelect(lang.id)}
                                    className="w-4 h-4 text-[#004296] focus:ring-[#004296]"
                                />
                                <div className="flex items-center gap-4 flex-1 ml-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-gray-800 text-sm">{lang.name}</h3>
                                            <span className="text-gray-500 text-sm">{lang.nativeName}</span>
                                        </div>
                                    </div>
                                    {selectedLang === lang.id && (
                                        <svg className="w-6 h-6 text-[#004296]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>

                   

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleSaveLanguage}
                            disabled={isSaved}
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-md ${
                                isSaved 
                                    ? "bg-green-500" 
                                    : "bg-[#004296] hover:bg-[#003380]"
                            }`}
                        >
                            {isSaved ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span>✓</span>
                                    {selectedLang === "english" && "Language Saved!"}
                                    {selectedLang === "hindi" && "भाषा सहेज ली गई!"}
                                    {selectedLang === "marathi" && "भाषा जतन केली!"}
                                </span>
                            ) : (
                                <span>
                                    {selectedLang === "english" && "Save Language"}
                                    {selectedLang === "hindi" && "भाषा सहेजें"}
                                    {selectedLang === "marathi" && "भाषा जतन करा"}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => navigate(-1)}
                            className="w-full py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
                        >
                            Cancel
                        </button>
                    </div>

                    {/* Note */}
                    <p className="text-center text-gray-400 text-xs mt-6">
                        You can change the language anytime from settings
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Language;