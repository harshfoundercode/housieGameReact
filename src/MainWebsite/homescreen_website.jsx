import React from "react";
import OffersCarousel from "./HomeComponents/win_worthy_offers";
import LiveResultTable from "./HomeComponents/live_result_table";
import Banner from "./HomeComponents/banner";
import Navbar from "./HomeComponents/nav_bar";
import TodaysWinner from "./HomeComponents/todays_winners";

const HomeScreenWebsite = () => {

    return (
        <div className="min-h-screen bg-white">

            {/* Navbar */}
            <Navbar />

            {/* {BANNER} */}
            <Banner />

            {/* {LIVE RESULT TABLE} */}
            <LiveResultTable />

            {/* {WIN WORTHY OFFERS} */}
            <OffersCarousel />

            {/* {TODAYS WINNERS} */}
            <TodaysWinner />

             <div className="pb-8"></div>
        </div>
    );
};

export default HomeScreenWebsite;