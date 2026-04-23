import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";

const NewsAndMedia = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  // Sample news and media data
  const newsArticles = [
    {
      id: 1,
      title: "Sweet Dreamz Draw Results Announced",
      excerpt: "Check out the latest winners of the Sweet Dreamz daily draw. Congratulations to all the lucky winners!",
      image: "https://images.unsplash.com/photo-1638913660695-5c1d4e5b3e0c?w=400&h=250&fit=crop",
      date: "2025-04-23",
      time: "4:30 PM",
      category: "results",
      readMoreUrl: "/news/1",
    },
    {
      id: 2,
      title: "New Feature: Auto-Play Introduced in Tambola Caller",
      excerpt: "We are excited to announce the new auto-play feature in our Tambola Caller. Sit back and enjoy the game!",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=250&fit=crop",
      date: "2025-04-22",
      time: "10:15 AM",
      category: "updates",
      readMoreUrl: "/news/2",
    },
    {
      id: 3,
      title: "Referral Bonus Increased to ₹500",
      excerpt: "Refer your friends and earn even more! We've increased the referral bonus to ₹500 for a limited time.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
      date: "2025-04-21",
      time: "2:00 PM",
      category: "promotions",
      readMoreUrl: "/news/3",
    },
    {
      id: 4,
      title: "Responsible Gaming Week: Play Safe",
      excerpt: "Join us for Responsible Gaming Week. Learn tips and tools to ensure your gaming remains fun and safe.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
      date: "2025-04-20",
      time: "11:00 AM",
      category: "updates",
      readMoreUrl: "/news/4",
    },
    {
      id: 5,
      title: "Multiwin Draw: Congratulations to Priya Sharma!",
      excerpt: "Priya Sharma from Mumbai won the Multiwin jackpot. A big congratulations to our grand prize winner.",
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=400&h=250&fit=crop",
      date: "2025-04-19",
      time: "12:15 PM",
      category: "results",
      readMoreUrl: "/news/5",
    },
    {
      id: 6,
      title: "Website Maintenance Scheduled for April 25",
      excerpt: "We will be performing scheduled maintenance on April 25th from 2:00 AM to 4:00 AM. Service may be interrupted.",
      image: "https://images.unsplash.com/photo-1558494949-ef010c202cc5?w=400&h=250&fit=crop",
      date: "2025-04-18",
      time: "9:30 AM",
      category: "updates",
      readMoreUrl: "/news/6",
    },
  ];

  const categories = [
    { id: "all", name: "All News", icon: "📰" },
    { id: "promotions", name: "Promotions", icon: "🎁" },
    { id: "results", name: "Results", icon: "🏆" },
    { id: "updates", name: "Updates", icon: "🔔" },
  ];

  const filteredArticles = activeCategory === "all" 
    ? newsArticles 
    : newsArticles.filter(article => article.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 md:pt-28 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#004296] mb-2">
              News & Media
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              Stay updated with the latest announcements, results, and promotions
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-2.5 rounded-lg text-sm md:text-base font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-[#004296] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className="hidden sm:inline">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#004296] text-white text-xs px-2 py-1 rounded-full capitalize">
                      {article.category}
                    </span>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-gray-400 text-xs">
                        <span>📅 {article.date}</span>
                        <span className="mx-2">•</span>
                        <span>🕐 {article.time}</span>
                      </div>
                      <button 
                        onClick={() => navigate(article.readMoreUrl)}
                        className="text-[#004296] font-medium text-sm hover:underline"
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <span className="text-5xl block mb-4 opacity-40">📰</span>
                <p className="text-gray-500 text-lg">No news articles found</p>
                <p className="text-gray-400 text-sm mt-1">Check back later for updates</p>
              </div>
            )}
          </div>

          {/* Load More Button (Optional) */}
          {filteredArticles.length > 0 && (
            <div className="text-center mt-10">
              <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm">
                Load More
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsAndMedia;