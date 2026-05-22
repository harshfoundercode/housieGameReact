// import React, { useState, useEffect } from "react";
// import BannerLogo from '../../assets/Banner.jpg'; 
// import { getBanner } from "../../services/banner_services";

// const Banner = () => {

//     const [bannerImage, setBannerImage] = useState(null);  
//     const [loading, setLoading] = useState(true);          
//     const [error, setError] = useState(null);               

//     useEffect(() => {
//         fetchBannerFromAPI();
//     }, []); // YEH INITSTATE JAISA HAI JO EK BAR HI KAM KRTA HAI

//     const fetchBannerFromAPI = async () => {
//         try {
//             setLoading(true);
            
//             const response = await getBanner();
            
//             console.log("Full Response:", response);
            
//             if ( response.data) {
//                 setBannerImage(response.data.image_url); 
//             } else {
//                 setBannerImage(null); 
//             }
            
//         } catch (err) {
//             console.error("Error fetching banner:", err);
//             setError(err.message);
//             setBannerImage(null); 
//         } finally {
//             setLoading(false);
//         }
//     };

//     const displayImage = bannerImage || BannerLogo; 

//     return (
//         <section className="w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28">
//             <div className="relative w-full">
                
//                 {/* Loading Overlay */}
//                 {loading && (
//                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
//                         <div className="text-white text-center">
//                             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
//                             <p className="text-sm">Loading banner...</p>
//                         </div>
//                     </div>
//                 )}
                
//                 {/* Error Message */}
//                 {error && (
//                     <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded z-20">
//                         <p className="text-sm">Failed to load banner: {error}</p>
//                     </div>
//                 )}
                
//                 {/* ✅ Banner Image*/}
//                 <img
//                     src={displayImage}
//                     alt="Tambola Banner"
//                     className={`
//                         w-full
//                         h-auto
//                         max-h-100
//                         sm:max-h-125
//                         md:max-h-150
//                         lg:max-h-175
//                         xl:max-h-200
//                         object-cover
//                         object-center
//                         transition-opacity duration-500
//                         ${loading ? 'opacity-50' : 'opacity-100'}
//                     `}
//                     onLoad={() => console.log("✅ Banner image loaded")}
//                     onError={() => {
//                         console.log("❌ Banner image failed to load, using fallback");
//                         setBannerImage(null); // Agar API image load nahi hui to fallback
//                     }}
//                 />
                
//             </div>
//         </section>
//     );
// };

// export default Banner;

import React, { useState, useEffect } from "react";
import BannerLogo from '../../assets/Banner.jpg'; 
import { getBanner } from "../../services/banner_services";

const Banner = () => {

    const [bannerImage, setBannerImage] = useState(null);  
    const [loading, setLoading] = useState(true);          
    const [error, setError] = useState(null);               
    const [imageLoaded, setImageLoaded] = useState(false);  // Track image load

    useEffect(() => {
        fetchBannerFromAPI();
    }, []);

    const fetchBannerFromAPI = async () => {
        try {
            setLoading(true);
            
            const response = await getBanner();
            
            console.log("Full Response:", response);
            
            if (response.data) {
                // Pre-load the image before showing
                const img = new Image();
                img.src = response.data.image_url;
                img.onload = () => {
                    setBannerImage(response.data.image_url);
                    setImageLoaded(true);
                    setLoading(false);
                };
                img.onerror = () => {
                    // If API image fails, use fallback
                    setBannerImage(BannerLogo);
                    setImageLoaded(true);
                    setLoading(false);
                };
            } else {
                // No data, use fallback
                setBannerImage(BannerLogo);
                setImageLoaded(true);
                setLoading(false);
            }
            
        } catch (err) {
            console.error("Error fetching banner:", err);
            setError(err.message);
            setBannerImage(BannerLogo);
            setImageLoaded(true);
            setLoading(false);
        }
    };

    return (
        <section className="w-full pt-16 sm:pt-20 md:pt-24 lg:pt-28">
            <div className="relative w-full overflow-hidden">
                
                {/* Shimmer/Skeleton Loader */}
                {loading && (
                    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"
                            style={{
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 1.5s infinite linear'
                            }}
                        />
                        
                        {/* Decorative elements for skeleton */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            {/* Image icon */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-lg mb-4 animate-pulse" />
                            
                            {/* Text lines */}
                            <div className="w-48 sm:w-64 h-4 bg-gray-300 rounded mb-2 animate-pulse" />
                            <div className="w-36 sm:w-48 h-3 bg-gray-300 rounded animate-pulse" />
                            
                            {/* Loading dots */}
                            <div className="flex gap-2 mt-4">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Error Message */}
                {error && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-20 shadow-lg">
                        <p className="text-sm">⚠️ Failed to load banner</p>
                    </div>
                )}
                
                {/* Banner Image - Hidden during loading */}
                <div className={`transition-all duration-700 ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                    <img
                        src={bannerImage || BannerLogo}
                        alt="Tambola Banner"
                        className={`
                            w-full
                            h-auto
                            max-h-75
                            sm:max-h-100
                            md:max-h-125
                            lg:max-h-137.5
                            xl:max-h-150
                            object-cover
                            object-center
                            transition-all duration-700
                            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                        `}
                        onLoad={() => {
                            console.log("✅ Banner image loaded");
                            setImageLoaded(true);
                        }}
                        onError={() => {
                            console.log("❌ Banner image failed to load, using fallback");
                            if (bannerImage !== BannerLogo) {
                                setBannerImage(BannerLogo);
                            }
                        }}
                    />
                </div>
                
            </div>

            {/* Keyframe Animations */}
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