import React, { useState, useEffect, useRef } from "react";

const OffersCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const timeoutRef = useRef(null);

    // Offer images data
    const offers = [
        {
            id: 1,
            image: "https://app.easylottery.in/img/carousel/S2.jpg",
        },
        {
            id: 2,
            image: "https://app.easylottery.in/img/carousel/S5.jpg",
        },
        {
            id: 3,
            image: "https://app.easylottery.in/img/carousel/S4.jpg",
        },
        {
            id: 4,
            image: "https://app.easylottery.in/img/carousel/S6.jpg",
        },
        {
            id: 5,
            image: "https://app.easylottery.in/img/carousel/S1.jpg", // Changed from duplicate S6
        },
    ];

    // Check screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 640);
            setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Get slides per view based on screen size
    const getSlidesPerView = () => {
        if (isMobile) return 1;
        if (isTablet) return 3;
        return 4;
    };

    // Auto-play effect
    useEffect(() => {
        if (isAutoPlaying) {
            timeoutRef.current = setTimeout(() => {
                const slidesPerView = getSlidesPerView();
                const maxSlides = offers.length - slidesPerView;
                setCurrentSlide(prev => prev >= maxSlides ? 0 : prev + 1);
            }, 3000);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentSlide, isAutoPlaying, isMobile, isTablet]);

    // Navigation functions
    const goToSlide = (index) => {
        const slidesPerView = getSlidesPerView();
        const maxSlides = offers.length - slidesPerView;
        setCurrentSlide(Math.min(index, maxSlides));
    };

    const nextSlide = () => {
        const slidesPerView = getSlidesPerView();
        const maxSlides = offers.length - slidesPerView;
        setCurrentSlide(prev => prev >= maxSlides ? 0 : prev + 1);
    };

    const prevSlide = () => {
        const slidesPerView = getSlidesPerView();
        const maxSlides = offers.length - slidesPerView;
        setCurrentSlide(prev => prev <= 0 ? maxSlides : prev - 1);
    };

    const slidesPerView = getSlidesPerView();
    const slideWidth = 100 / slidesPerView;
    const totalDots = offers.length - slidesPerView + 1;

    return (
        <section className="py-8 md:py-12 px-4 bg-linear-to-br from-[#f0f4ff] to-white">
            <div className="max-w-7xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#004296] inline-block relative">
                        Win-Worthy Offers
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#FBEFA4] rounded-full"></span>
                    </h2>
                    <p className="text-gray-500 mt-4 text-sm md:text-base">
                        Grab these amazing offers and boost your winning chances!
                    </p>
                </div>

                {/* Carousel Container */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    {/* Carousel Wrapper */}
                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentSlide * slideWidth}%)` }}
                        >
                            {offers.map((offer) => (
                                <div
                                    key={offer.id}
                                    className="shrink-0 px-2"
                                    style={{ width: `${slideWidth}%` }}
                                >
                                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                                        {/* Image Container */}
                                        <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                                            <img
                                                src={offer.image}
                                                alt={`Offer ${offer.id}`}
                                                className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows - Only show if more than 1 slide */}
                    {totalDots > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#004296] hover:bg-[#004296] hover:text-white transition-all z-10"
                                aria-label="Previous slide"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#004296] hover:bg-[#004296] hover:text-white transition-all z-10"
                                aria-label="Next slide"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                {/* Dots Indicator - Only show if more than 1 dot */}
                {totalDots > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {Array.from({ length: totalDots }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    currentSlide === index
                                        ? 'w-8 bg-[#004296]'
                                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                                }`}
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