import React from "react";


const Banner = () => {

    return (
        <div className="pt-20 md:pt-24 ">

            <div className="relative w-full">
                <span className="overflow-hidden">
                    <img
                        src="src\assets\Banner.jpg"
                        className="w-full h-auto object-cover"
                    />
                </span>
            </div>
        </div>
    );
};

export default Banner;