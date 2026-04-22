import React, { useState, useEffect, useRef } from "react";

const OffersCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const timeoutRef = useRef(null);

    // Offer images data
    const offers = [
        { id: 1, image: "https://app.easylottery.in/img/carousel/S2.jpg" },
        { id: 2, image: "https://app.easylottery.in/img/carousel/S5.jpg" },
        { id: 3, image: "https://app.easylottery.in/img/carousel/S4.jpg" },
        { id: 4, image: "https://app.easylottery.in/img/carousel/S6.jpg" },
        { id: 5, image: "https://app.easylottery.in/img/carousel/S1.jpg" },
    ];

    const getSlidesPerView = () => {
        const width = window.innerWidth;
        if (width < 640) return 1;
        if (width < 768) return 2;
        if (width < 1024) return 3;
        return 4;
    };

    const [slidesPerView, setSlidesPerView] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            setSlidesPerView(getSlidesPerView());
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const maxSlides = offers.length - slidesPerView;
        if (currentSlide > maxSlides) {
            setCurrentSlide(Math.max(0, maxSlides));
        }
    }, [slidesPerView]);

    useEffect(() => {
        if (isAutoPlaying) {
            timeoutRef.current = setTimeout(() => {
                const maxSlides = offers.length - slidesPerView;
                setCurrentSlide(prev => prev >= maxSlides ? 0 : prev + 1);
            }, 3000);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentSlide, isAutoPlaying, slidesPerView]);

    const goToSlide = (index) => {
        const maxSlides = offers.length - slidesPerView;
        setCurrentSlide(Math.min(index, maxSlides));
    };

    const nextSlide = () => {
        const maxSlides = offers.length - slidesPerView;
        setCurrentSlide(prev => prev >= maxSlides ? 0 : prev + 1);
    };

    const prevSlide = () => {
        const maxSlides = offers.length - slidesPerView;
        setCurrentSlide(prev => prev <= 0 ? maxSlides : prev - 1);
    };

    const slideWidth = 100 / slidesPerView;
    const totalDots = offers.length - slidesPerView + 1;

    return (
        <section className="pt-4 sm:pt-5 pb-6 sm:pb-8 md:pb-10 lg:pb-12 px-3 sm:px-4 bg-gradient-to-br from-[#f0f4ff] to-white">
            <div className="max-w-7xl mx-auto">

                {/* Section Header - Responsive */}
                <div className="text-center mb-6 sm:mb-8">
                    <h2 className="
                        text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                        font-bold text-[#004296] inline-block relative
                    ">
                        Win-Worthy Offers
                        <span className="
                            absolute -bottom-2 left-1/2 -translate-x-1/2 
                            bg-[#FBEFA4] rounded-full
                            w-14 h-0.5 sm:w-16 sm:h-1 md:w-20
                        "></span>
                    </h2>
                    <p className="text-gray-500 mt-3 sm:mt-4 text-xs sm:text-sm md:text-base">
                        Grab these amazing offers and boost your winning chances!
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="overflow-hidden rounded-xl sm:rounded-2xl">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentSlide * slideWidth}%)` }}
                        >
                            {offers.map((offer) => (
                                <div
                                    key={offer.id}
                                    className="shrink-0 px-1 sm:px-2"
                                    style={{ width: `${slideWidth}%` }}
                                >
                                    <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                                        <div className="
                                            relative overflow-hidden
                                            h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72
                                        ">
                                            <img
                                                src={offer.image}
                                                alt={`Offer ${offer.id}`}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {totalDots > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="
                                    hidden sm:flex
                                    absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 
                                    w-8 h-8 sm:w-10 sm:h-10 
                                    bg-white rounded-full shadow-lg 
                                    items-center justify-center 
                                    text-[#004296] hover:bg-[#004296] hover:text-white 
                                    transition-all z-10
                                "
                                aria-label="Previous slide"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                className="
                                    hidden sm:flex
                                    absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 
                                    w-8 h-8 sm:w-10 sm:h-10 
                                    bg-white rounded-full shadow-lg 
                                    items-center justify-center 
                                    text-[#004296] hover:bg-[#004296] hover:text-white 
                                    transition-all z-10
                                "
                                aria-label="Next slide"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {totalDots > 1 && (
                    <div className="flex justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                        {Array.from({ length: totalDots }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`
                                    h-1.5 sm:h-2 rounded-full transition-all duration-300 
                                    ${currentSlide === index
                                        ? 'w-6 sm:w-8 bg-[#004296]'
                                        : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                                    }
                                `}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default OffersCarousel;