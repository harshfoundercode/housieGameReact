import React from "react";
import BannerLogo from '../../assets/Banner.jpg';

const Banner = () => {
    return (
        <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28">
            <div className="w-full">
                <img
                    src={BannerLogo}
                    alt="Tambola Banner"
                    className="
                        w-full h-auto
                        max-h-[200px]
                        sm:max-h-[300px]
                        md:max-h-[400px]
                        lg:max-h-[500px]
                        xl:max-h-[600px]
                        object-contain
                        sm:object-cover
                    "
                />
            </div>
        </section>
    );
};

export default Banner;