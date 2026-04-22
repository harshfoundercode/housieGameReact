import React from "react";
import OffersCarousel from "./HomeComponents/win_worthy_offers";
import LiveResultTable from "./HomeComponents/live_result_table";
import Banner from "./HomeComponents/banner";
import Navbar from "./HomeComponents/nav_bar";
import TodaysWinner from "./HomeComponents/todays_winners";
import HowItWorks from "./HomeComponents/how_it_works";
import ReferAndEarn from "./HomeComponents/refer_earn";
import Footer from "./HomeComponents/footer";

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


            {/* {How it works} */}
            <HowItWorks />

           {/* {refer and earn} */}
            <ReferAndEarn />
        
            {/* {FOOTER} */}
            <Footer />
             
        </div>
    );
};

export default HomeScreenWebsite;