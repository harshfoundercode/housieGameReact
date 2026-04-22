// src/page/RulesAndTerms.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";

const RulesAndTerms = () => {
    const navigate = useNavigate();
    const [showMoreRules, setShowMoreRules] = useState(false);
    const [showMoreTerms, setShowMoreTerms] = useState(false);

    // Do's & Don'ts Data
    const dosAndDonts = [
        "Do set boundaries and/or limits on lottery expenditure and respect them.",
        "Don't buy lottery tickets with money intended for daily needs.",
        "Don't try and \"make up\" a loss by purchasing more tickets.",
        "Don't borrow money to purchase lottery tickets.",
        "Don't approach a potential lottery win as a solution to real problems and concerns.",
        "Do be aware and open about the money or time spent in purchasing lottery.",
        "Don't neglect work, studies, personal life or other aspect to try your luck in lotteries.",
        "Don't indulge in lottery ticket purchases as a reaction to feeling lonely, bored, sad, burdened, or stressed.",
        "Do seek help or professional counselling when tendencies of addiction to gambling start to arise.",
        "Do be aware that no person or thing can influence the draw result as it is purely a game of chance.",
        "Do contact support@tambola.com if you find your spouse, relative(s) or friend(s) exhibiting tendencies of addiction to gambling or purchasing beyond their means.",
        "DISCLAIMER: Playing online lotteries comes with risks. There's no guarantee of financial gain, so you should only play with what you can afford to.",
    ];

    // Rules and Guidelines Data
    const rulesGuidelines = [
        "Any person/persons below the age of 18 are prohibited from the purchase, distribution, or sale of lottery tickets.",
        "Online operators and agents of our lottery shall not permit adults accompanied by minors to enter or remain on the premises.",
        "They shall not allow minors to purchase online lottery tickets or purchase in the presence of minors.",
        "They shall not give lottery tickets to minors as a gift.",
        "They shall not lend money to customers, friends, or relatives to purchase lottery tickets.",
        "They shall not accept alternative methods of payment or credit.",
        "They should not encourage reckless use of their choice to purchase.",
        "They should not underestimate or neglect to foresee problems and should act immediately when they detect signs of problematic compulsive purchasing behavior.",
        "They should not purchase on behalf of others or give any advice on the same.",
        "No advice or algorithm works in lottery, as it is purely a game of chance.",
        "The high rates of taxes should not be considered a burden, but rather a privilege of protection placed by the respective regulatory authorities.",
        "They should not allow participation, purchase, or access to the establishment if someone exhibits evidence of being under the influence of alcohol and/or drugs.",
        "We encourage responsible lottery practices where the right amount of taxes is paid to the Government.",
        "Fair play in the lottery means playing by the set of rules and awareness of your odds.",
        "Lottery Tickets are non-refundable as per the government lottery rules unless the draw is canceled.",
        "Postponement of the draw or a change of mind after purchase will not allow/enable you to get any refund.",
        "We reserve the right to block you if it is noticed that you are constantly losing exorbitant amounts, for a fixed number of days.",
    ];

    // Terms & Conditions Data
    const termsConditions = [
        "This lottery is operated under applicable laws and regulations of India.",
        "By participating in Tambola.com you agree to be bound by these terms and conditions. Tambola.com reserves the right to amend these terms at any time without prior notice.",
        "Continued participation in the lottery signifies acceptance of any updated terms.",
        "The Online Digital lottery tickets are not sold in states where online lottery is prohibited.",
        "The draws shall be held as per the procedure prescribed in the Rules and supervised by appropriate authorities.",
        "Tambola.com reserves the right to change the Date & Time of Draw.",
        "No Draw shall be held on National Holidays i.e. 26th January, 15th August and 2nd October.",
        "Participants must be at least 18 years old. Participants must purchase tickets in a jurisdiction where participation in the lottery is legal.",
        "Participant information will be collected and used in accordance with our Privacy Policy.",
        "The Participants can purchase the Online Digital Lottery Tickets on our portal Tambola.com only.",
        "Draw is conducted under proper supervision and winners are selected randomly by prescribed methodology.",
        "The draw will be held out of the total scheme and the prizes shall be drawn on the proportionate basis.",
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Header - Simple like EasyLottery */}
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
                    <div className="mb-10">
                        <h3 className="text-xl md:text-2xl font-bold text-[#004296] mb-4">
                            Do's & Don'ts of responsible participation in Online Lottery:
                        </h3>
                        <div className="space-y-3">
                            {dosAndDonts.map((item, index) => (
                                <div key={index} className="flex gap-3">
                                    <span className="text-[#004296] font-bold min-w-[28px]">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rules and Guidelines Section */}
                    <div className="mb-10">
                        <h3 className="text-xl md:text-2xl font-bold text-[#004296] mb-4">
                            Rules and Guidelines
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 italic">
                            For company employees, agents and their employees and purchasers (hereinafter referred to as "They")
                        </p>
                        <div className="space-y-3">
                            {rulesGuidelines.slice(0, showMoreRules ? rulesGuidelines.length : 8).map((item, index) => (
                                <div key={index} className="flex gap-3">
                                    <span className="text-[#004296] font-bold min-w-[28px]">
                                        {index + 1}.
                                    </span>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => setShowMoreRules(!showMoreRules)}
                            className="mt-4 text-[#004296] font-medium text-sm hover:underline"
                        >
                            Read {showMoreRules ? 'Less' : 'More'}
                        </button>
                    </div>

                    {/* Terms & Conditions Section */}
                    <div className="mb-10">
                        <h3 className="text-xl md:text-2xl font-bold text-[#004296] mb-4">
                            Terms & Conditions
                        </h3>
                        <div className="space-y-3">
                            {termsConditions.slice(0, showMoreTerms ? termsConditions.length : 6).map((item, index) => (
                                <div key={index} className="flex gap-3">
                                    <span className="text-[#004296] font-bold min-w-[28px]">
                                        {index + 1}.
                                    </span>
                                    <p className="text-gray-600 text-sm md:text-base">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => setShowMoreTerms(!showMoreTerms)}
                            className="mt-4 text-[#004296] font-medium text-sm hover:underline"
                        >
                            Read {showMoreTerms ? 'Less' : 'More'}
                        </button>
                    </div>

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