import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";

const FAQs = () => {
    const navigate = useNavigate();

    const faqData = [
        {
            question: "1. Who are we?",
            answer: "Tambola.com is a Government approved lottery distribution website that allows a safe, secure and transparent lottery for the Indian public. Our lottery is exclusively available to citizens of India, currently residing in India, except those in lottery-free states. Tambola.com is subject to all the pertinent laws and taxation system of India."
        },
        {
            question: "2. What is Lottery?",
            answer: "Lottery is a game of chance in which a large number of tickets are sold and a draw is held for a certain number of prizes. Generally, the winner receives a large multiple of their cost but with an extremely high chance of losing in comparison to winning."
        },
        {
            question: "3. What are the options in selecting the tickets?",
            answer: "We have three types of ticket selection options:\n\nOption 1: Random Selection\nYour ticket number is randomly selected by our system. Since tickets purchased cannot be refunded or numbers cannot be exchanged please apply caution before opting for this method.\n\nOption 2: Total Sum Selection\nYou can choose a digit from one to nine. The sum of the digits of your ticket number will be the number you chose. For example, if you choose 9 it can be any series of digits where the sum will be 9, as is the case in the following 8199, 9999, 8073, 3078.\n\nOption 3: Complete Selection\nThis method gives you the most freedom in choosing the exact ticket number you like. However, please note that there is a possibility that the ticket number you want may already be sold or unavailable for that draw due to the limited availability of a specific number. The way you choose to buy the tickets does not affect the outcome of the draw in any way."
        },
        {
            question: "4. Why is there a limit on the maximum number of tickets that can be purchased?",
            answer: "This is a measure implemented as a part of our responsible lottery initiative. We would like you to have fun, without developing an addiction to gambling."
        },
        {
            question: "5. Why has my account been blocked despite being a paying customer?",
            answer: "This is a measure implemented as a part of our responsible lottery initiative. Your account may be blocked temporarily/permanently if our system detects that you have been on a losing streak. You can appeal this by providing your income statement to prove you are playing within your means. Please note that a winning streak will not result in your account being blocked."
        },
        {
            question: "6. How to add one or more bank accounts?",
            answer: "Add your bank account details from the KYC section in the app. The bank account should be in your name and should be provided in advance as we will transfer the prizes only through the bank account.\n\nWe don't permit the trade, resale, gifting of Tambola.com tickets. The same applies for recharge as we don't allow anyone to recharge your account or you to recharge others account."
        },
        {
            question: "7. How long is a winning ticket is valid for?",
            answer: "A winning ticket is valid for 60 days from the date of draw, within which period a claims form with all the necessary requirements must be submitted."
        },
        {
            question: "8. What is the credit policy?",
            answer: "Please ensure that you have credit only to cover your intended purchases for the next 24 hours. We strictly prohibit excessive credit beyond that in line with our responsible lottery initiative."
        },
        {
            question: "9. What is the Anti Money Laundering (AML) policy?",
            answer: "Our AML policy is stringent. If any winning ticket is found to be exchanged from the original purchaser or the details of the same is shared with any third party/parties, it can trigger a review by our audit team. Please refrain from doing so as it is easily detectable in a fully digital lottery. Any attempts to do so will be treated as wilful attempts to defraud the system.\n\nIf any scamsters, fraudulent actors or third party actors approach you with any such ideas, please inform us at the earliest via our contact details listed on the Contact Us page and alert the relevant government authorities such as the police, Income Tax department, etc."
        },
        {
            question: "10. Are the tickets only available for purchase to Citizens of India?",
            answer: "Yes, in accordance with the relevant laws, Tambola.com is exclusively for Indian citizens currently residing in India subject to the Laws of India including the laws of each state."
        },
        {
            question: "11. Who owns Tambola.com?",
            answer: "Tambola.com is the brand name of the government approved digital lottery whose sub-distributor enabler is Tambola Services Private Limited. The Government of India is responsible for the conduction and supervision of the lottery."
        },
        {
            question: "12. How can a winning ticket be claimed?",
            answer: "All winning claims are processed immediately by the Directorate of State Lottery subject to verification and authentication.\n\nPlease ensure that all the details are provided correctly on the claims form. If any errors do arise, please inform the support team immediately. Please follow the instructions in the claim form and along with required documents. All our draws are conducted through government licensed lottery, so kindly rest assured that all your details are safe and whatever you are doing is legal.\n\nAll prizes will be credited directly to your bank account by the conducting government. All unclaimed prizes belongs to the government. The validity of any claims made after the 60 day period is at determined by the discretion of the conducting government."
        },
        {
            question: "13. What personal information is required by Tambola.com to issue the prize?",
            answer: "You are required to provide ALL the information listed on the claim forms in accordance with your government issued identification cards and PAN. As it is a government approved lottery, it is legal and safe to provide your personal information."
        },
        {
            question: "14. What is done about those who are/may be addicted to gambling?",
            answer: "This is a measure implemented as a part of our responsible lottery initiative. The details of any person known to/ suspected of exhibiting tendencies associated with an addiction to gambling should be sent to the support team immediately."
        },
        {
            question: "15. Will the new Online Gaming Bill ban digital lotteries like Tambola?",
            answer: "No, Tambola is fully authorised under the Lotteries (Regulation) Act, 1998, which governs all state-run lotteries in India. The new Online Gaming Bill, 2025 only prohibits private online money games (like rummy, poker, betting apps, etc.) that are not regulated by law. State lotteries, including digital lotteries like Tambola, remain completely legal and unaffected."
        },
        {
            question: "16. What is the difference between online money games and online lotteries?",
            answer: "Online money games (as defined in the new Bill) are privately operated games where people deposit money expecting winnings, with no government oversight. In contrast, lotteries are conducted strictly under the 1998 Lottery Act by State Governments. Tambola is part of the government-regulated system, where proceeds go to the State, and operations are monitored under law."
        },
        {
            question: "17. So does the new Bill affect my ability to play Tambola online?",
            answer: "Not at all. Tambola continues to operate legally under the 1998 Act. The new Bill does not override or replace the Lottery Act. Customers can confidently continue participating in Tambola draws."
        },
        {
            question: "18. Is it safe and legal to buy Tambola tickets online?",
            answer: "Yes. Tambola is state-authorised and legally protected under the Lotteries (Regulation) Act, 1998. Your transactions are safe, transparent, and compliant with government rules. The new Bill does not affect your participation in any way."
        },
        {
            question: "19. Why is the government banning other online money games but not lotteries?",
            answer: "Because private online money games often cause addiction, fraud, and financial harm. Lotteries, on the other hand, are regulated by the government under the 1998 Act, with strict rules and proceeds going back to the State for public welfare. That's why authorised lotteries like Tambola remain legal and unaffected."
        },
        {
            question: "20. Will Tambola continue in digital format, or do we need to buy tickets offline now?",
            answer: "Tambola will continue in digital format as usual. There is no restriction under the new Bill on state-run digital lotteries. Customers can keep using the Tambola platform safely."
        },
        {
            question: "21. What happens if someone confuses Tambola with banned online gaming apps?",
            answer: "Our customer care team will clarify that Tambola is not an online money game, but a government-regulated state lottery under the 1998 Act. The new Bill does not apply to Tambola."
        },
        {
            question: "22. What if my number appears in 2nd and 3rd Prize lists?",
            answer: "You get only the 2nd Prize (the higher one)."
        },
        {
            question: "23. Does this apply to all orderings (permutations) of the same digits?",
            answer: "Yes. Any order counts as the same number for this rule."
        },
        {
            question: "24. Can I win again with the same number in another draw/day?",
            answer: "Yes. This rule applies within a single draw only."
        },
        {
            question: "25. What if I bought multiple separate tickets with the same number?",
            answer: "Each valid ticket is treated separately for the highest eligible prize."
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Header - Simple like EasyLottery */}
            <section className="pt-24 md:pt-28 pb-6 px-4 bg-[#004296]">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        FAQ
                    </h1>
                </div>
            </section>

            {/* FAQ Content - Simple numbered list style */}
            <section className="py-8 md:py-10 px-4">
                <div className="max-w-4xl mx-auto">
                    
                    <div className="space-y-5">
                        {faqData.map((faq, index) => (
                            <div key={index} className="border-b border-gray-200 pb-5 last:border-0">
                                <h3 className="font-bold text-[#004296] text-lg md:text-xl mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
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

export default FAQs;