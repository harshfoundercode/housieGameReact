import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import Navbar from "./nav_bar";
import Footer from "./footer";

const ReferralGuide = () => {
  const navigate = useNavigate();
  const [referralLink] = useState("https://tambola.com/ref/USER123");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `Join me on Tambola and win exciting prizes! Use my referral link: ${referralLink}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#004296] mb-3">
              Referral <span className="text-[#FBEFA4] bg-[#004296] px-2 py-1 rounded-lg">Guide</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
              Share Tambola with your friends and earn rewards when they join and play!
            </p>
          </div>

          {/* How It Works - Steps */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8 border border-gray-100">
            <h2 className="text-xl font-bold text-[#004296] mb-6 text-center">How Referral Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#004296] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Get Your Link</h3>
                <p className="text-gray-500 text-sm">
                  Copy your unique referral link from the box below.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#004296] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Share with Friends</h3>
                <p className="text-gray-500 text-sm">
                  Share your link via WhatsApp, Email, or any social media.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-[#004296] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Earn Rewards</h3>
                <p className="text-gray-500 text-sm">
                  Get ₹500 credited when your friend makes their first purchase.
                </p>
              </div>
            </div>
          </div>

          {/* Referral Link Box */}
          <div className="bg-gradient-to-r from-[#004296] to-[#003380] rounded-2xl shadow-lg p-6 md:p-8 text-white mb-8">
            <h3 className="text-xl font-bold mb-2 text-center">Your Unique Referral Link</h3>
            <p className="text-white/70 text-sm text-center mb-6">
              Share this link with friends. When they sign up and play, you both win!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20">
                <code className="text-[#FBEFA4] text-sm md:text-base break-all">
                  {referralLink}
                </code>
              </div>
              <button
                onClick={handleCopyLink}
                className="bg-[#FBEFA4] text-[#004296] px-6 py-3 rounded-xl font-bold hover:bg-[#FFE44D] transition-all shadow-md whitespace-nowrap"
              >
                {copied ? "✓ Copied!" : "📋 Copy Link"}
              </button>
            </div>

            <div className="text-center mt-6">
              <p className="text-white/60 text-xs mb-3">or share directly via</p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={handleShareWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                >
                  💬 WhatsApp
                </button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">
                  📧 Email
                </button>
                <button className="bg-black/20 hover:bg-black/30 text-white px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">
                  🔗 More
                </button>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="bg-yellow-50 rounded-xl p-5 border border-[#FBEFA4]/30">
            <h4 className="font-bold text-[#004296] mb-2">📋 Referral Terms</h4>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>• Referral bonus is credited only after the referred friend makes their first ticket purchase.</li>
              <li>• Maximum referral bonus per user is ₹5,000 per month.</li>
              <li>• Referral links are unique to each account. Do not share your account credentials.</li>
              <li>• Tambola reserves the right to modify or cancel the referral program at any time.</li>
            </ul>
          </div>

          {/* Back Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate(ROUTES.HomeScreenWebsite)}
              className="text-[#004296] hover:text-[#003380] font-medium text-sm flex items-center gap-2 mx-auto"
            >
              <span>←</span> Back to Home
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReferralGuide;