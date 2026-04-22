import React from "react";
import bannerImage from "../../assets/Banner.jpg"; 

const Banner = () => {

    return (
        <div className="pt-20 md:pt-24 ">

            <div className="relative w-full">
                <span className="overflow-hidden">
                    <img
                        src={bannerImage}
                        className="w-full h-auto object-cover"
                    />
                </span>
            </div>
        </div>
    );
};

export default Banner;