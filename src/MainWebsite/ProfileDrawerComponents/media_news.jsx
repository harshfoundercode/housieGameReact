// src/page/NewsAndMedia.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";
import { getMediaNews } from "../../services/media_news_services";

const NewsAndMedia = () => {
  const navigate = useNavigate();
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // For load more functionality

  useEffect(() => {
    fetchMediaNewsFromAPI();
  }, []);

  const fetchMediaNewsFromAPI = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getMediaNews();

      console.log("Full Response:", response);

      if (response.success && response.data) {
        setMediaData(response.data);
      } else {
        setMediaData([]);
        setError("No data available");
      }

    } catch (err) {
      console.error("Error fetching news media:", err);
      setError(err.message || "Failed to load news and media");
      setMediaData([]);
    } finally {
      setLoading(false);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time function
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get visible articles based on load more
  const visibleArticles = mediaData.slice(0, visibleCount);
  const hasMore = visibleCount < mediaData.length;

  // Handle load more
  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="grow pt-24 md:pt-28 pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004296] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading news and updates...</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error State
  if (error && mediaData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="grow pt-24 md:pt-28 pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center items-center h-96 px-4">
              <div className="text-center bg-red-50 p-8 rounded-lg max-w-md mx-auto">
                <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="text-xl font-bold text-red-700 mb-2">Error Loading News</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={() => fetchMediaNewsFromAPI()}
                  className="bg-[#004296] text-white px-6 py-2 rounded-lg hover:bg-[#003380] transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="grow pt-24 md:pt-28 pb-12 px-4">
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

          {/* News Grid */}
          {visibleArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100 flex flex-col group"
                  >
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-4xl">📰</span>
                        </div>
                      )}
                      
                      {/* Type Badge */}
                      {article.type && (
                        <span className="absolute top-3 right-3 bg-[#004296] text-white text-xs px-2 py-1 rounded-full">
                          {article.type.toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col grow">
                      <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 min-h-[56px]">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-500 text-sm mb-4 line-clamp-3 min-h-[60px]">
                        {article.description || "Click to read more about this announcement..."}
                      </p>

                      <div className="flex items-center text-gray-400 text-xs mt-auto">
                        <span className="flex items-center gap-1">
                          📅 {formatDate(article.created_at)}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center gap-1">
                          🕐 {formatTime(article.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="text-center mt-10">
                  <button
                    onClick={handleLoadMore}
                    className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-all shadow-sm hover:shadow-md"
                  >
                    Load More ({visibleCount}/{mediaData.length})
                  </button>
                </div>
              )}
            </>
          ) : (
            // Empty State
            <div className="text-center py-16">
              <span className="text-5xl block mb-4 opacity-40">📰</span>
              <p className="text-gray-500 text-lg">No news articles found</p>
              <p className="text-gray-400 text-sm mt-1">Check back later for updates</p>
              <button
                onClick={() => fetchMediaNewsFromAPI()}
                className="mt-6 text-[#004296] hover:underline text-sm"
              >
                Refresh
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