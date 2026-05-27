import React, { useState, useEffect } from "react";
import { getBanner } from "../../services/banner_services";

const Banner = () => {

    const [bannerImage, setBannerImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        fetchBannerFromAPI();
    }, []);

    const fetchBannerFromAPI = async () => {
        try {
            setLoading(true);

            const response = await getBanner();

            console.log("Full Response:", response);

            if (response?.data?.image_url) {

                const img = new Image();
                img.src = response.data.image_url;

                img.onload = () => {
                    setBannerImage(response.data.image_url);
                    setImageLoaded(true);
                    setLoading(false);
                };

                img.onerror = () => {
                    console.log("❌ API image failed");

                    setBannerImage(null);
                    setImageLoaded(false);
                    setLoading(false);
                };

            } else {

                console.log("❌ No image from API");

                setBannerImage(null);
                setImageLoaded(false);
                setLoading(false);
            }

        } catch (err) {

            console.error("Error fetching banner:", err);

            setError(err.message);

            setBannerImage(null);
            setImageLoaded(false);
            setLoading(false);
        }
    };

    return (
        <section className="w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28">
            <div className="relative w-full overflow-hidden">

                {/* Shimmer Loader */}
                {loading && (
                    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">

                        <div
                            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
                            style={{
                                backgroundSize: "200% 100%",
                                animation: "shimmer 1.5s infinite linear",
                            }}
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center">

                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-lg mb-4 animate-pulse" />

                            <div className="w-48 sm:w-64 h-4 bg-gray-300 rounded mb-2 animate-pulse" />

                            <div className="w-36 sm:w-48 h-3 bg-gray-300 rounded animate-pulse" />

                            <div className="flex gap-2 mt-4">
                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0s" }}
                                />

                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                />

                                <div
                                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.4s" }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-20 shadow-lg">
                        <p className="text-sm">
                            ⚠️ Failed to load banner
                        </p>
                    </div>
                )}

                {/* Banner Image */}
                {/* Banner Image */}
{!loading && bannerImage && (
    <div
        className={`transition-all duration-700 ${
            imageLoaded
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
        }`}
    >
        <img
            src={bannerImage}
            alt="Tambola Banner"
            className="
                w-full
                h-auto
                max-h-75
                sm:max-h-100
                md:max-h-125
                lg:max-h-137.5
                xl:max-h-150
                object-fill
                object-center
                transition-all
                duration-700
            "
            onLoad={() => {
                console.log("✅ Banner image loaded");
                setImageLoaded(true);
            }}
            onError={() => {
                console.log("❌ Image failed");

                setBannerImage(null);
                setImageLoaded(false);
            }}
        />
    </div>
)}
            </div>

            {/* Animations */}
            <style>{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }

                .animate-shimmer {
                    animation: shimmer 1.5s infinite linear;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }

                .animate-pulse {
                    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }

                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-25%);
                    }
                }

                .animate-bounce {
                    animation: bounce 1s infinite;
                }
            `}</style>
        </section>
    );
};

export default Banner;