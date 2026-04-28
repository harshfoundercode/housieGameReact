// src/components/Banner.js (UPDATED)
import React, { useState, useEffect } from "react";
import BannerLogo from '../../assets/Banner.jpg'; 
import { getBanner } from "../../services/banner_services";

const Banner = () => {

    const [bannerImage, setBannerImage] = useState(null);  
    const [loading, setLoading] = useState(true);          
    const [error, setError] = useState(null);               

    useEffect(() => {
        fetchBannerFromAPI();
    }, []); // YEH INITSTATE JAISA HAI JO EK BAR HI KAM KRTA HAI

    const fetchBannerFromAPI = async () => {
        try {
            setLoading(true);
            
            const response = await getBanner();
            
            console.log("Full Response:", response);
            console.log("Success:", response.success);
            console.log("Data:", response.data);
            console.log("Image URL:", response.data?.image_url);
            
            if (response.success && response.data?.image_url) {
                setBannerImage(response.data.image_url); 
            } else {
                setBannerImage(null); 
            }
            
        } catch (err) {
            console.error("Error fetching banner:", err);
            setError(err.message);
            setBannerImage(null); 
        } finally {
            setLoading(false);
        }
    };

    const displayImage = bannerImage || BannerLogo; // API image nahi hai to fallback

    return (
        <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28">
            <div className="relative w-full">
                
                {/* Loading Overlay */}
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 z-10">
                        <div className="text-white text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                            <p className="text-sm">Loading banner...</p>
                        </div>
                    </div>
                )}
                
              
                
                {/* ✅ Banner Image */}
                <img
                    src={displayImage}
                    alt="Tambola Banner"
                    className={`
                        w-full
                        h-62.5
                        xs:h-[300px]
                        sm:h-87.5
                        md:h-75
                        lg:h-87.5
                        xl:h-100
                        2xl:h-112.5
                        object-cover
                        object-center
                        transition-opacity duration-500
                        ${loading ? 'opacity-50' : 'opacity-100'}
                    `}
                    onLoad={() => console.log("✅ Banner image loaded")}
                    onError={() => {
                        console.log("❌ Banner image failed to load, using fallback");
                        setBannerImage(null); // Agar API image load nahi hui to fallback
                    }}
                />
                
            </div>
        </section>
    );
};

export default Banner;