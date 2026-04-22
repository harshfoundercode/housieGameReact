import React from "react";
import BannerLogo from '../../assets/Banner.jpg';

const Banner = () => {
    return (
        <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28">
            <div className="relative w-full">
                <img
                    src={BannerLogo}
                    alt="Tambola Banner"
                    className="
                        w-full
                        h-80.5
                        xs:h-[300px]
                        sm:h-90.5
                        md:h-75
                        lg:h-87.5
                        xl:h-100
                        2xl:h-112.5
                    "
                />
                
            </div>
        </section>
    );
};

export default Banner;