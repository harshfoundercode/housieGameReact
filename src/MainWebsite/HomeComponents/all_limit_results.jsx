
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import LiveResultTable from "./live_result_table";

const AllLiveResults = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-linear-to-r from-[#004296] to-[#003380] text-white py-4 sm:py-6">
                <div className="max-w-6xl mx-auto px-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white/80 hover:text-white flex items-center gap-2 mb-3 text-sm"
                    >
                        <span>←</span> Back
                    </button>
                    {/* <h1 className="text-2xl sm:text-3xl font-bold text-center">
                        All Live Draw Results
                    </h1>
                    <p className="text-center text-white/70 text-sm mt-2">
                        Complete schedule of all upcoming and live games
                    </p> */}
                </div>
            </div>

            {/* Full list without limit */}
            <LiveResultTable limit={null} showViewAll={false} />
        </div>
    );
};

export default AllLiveResults;