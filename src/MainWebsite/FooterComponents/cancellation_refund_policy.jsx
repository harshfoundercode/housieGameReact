import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../HomeComponents/nav_bar";
import Footer from "../HomeComponents/footer";

const CancellationRefundPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            {/* Header */}
            <section className="pt-24 md:pt-28 pb-6 px-4 bg-[#004296]">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Cancellation & Refund Policy
                    </h1>
                </div>
            </section>

            {/* Content - Just the essential text */}
            <section className="py-10 px-4">
                <div className="max-w-3xl mx-auto">
                    
                    <div className="text-gray-700 text-base leading-relaxed space-y-6">
                        <p className="font-medium text-lg text-[#004296]">
                            Lottery Tickets are non-refundable as per the government lottery rules unless the draw is cancelled.
                        </p>
                        
                        <p>
                            Postponement of draw or change of mind after purchase will not allow/enable you to get any refund, whereas cancellation of draw will allow full refund of the amount paid.
                        </p>
                    </div>

                    {/* Back Button */}
                    <div className="text-center mt-12">
                        <button
                            onClick={() => navigate("/")}
                            className="text-[#004296] hover:text-[#003380] font-medium text-sm flex items-center gap-2 mx-auto"
                        >
                            <span>←</span> Back to Home
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CancellationRefundPolicy;