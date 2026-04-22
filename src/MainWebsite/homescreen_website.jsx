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
            <section id="home">
                <Navbar />
            </section>


            {/* {BANNER} */}
            <Banner />

            {/* {LIVE RESULT TABLE} */}

            <section id="live-draws">
                <LiveResultTable />
            </section>


            {/* {WIN WORTHY OFFERS} */}
            <OffersCarousel />

            {/* {TODAYS WINNERS} */}
            <section id="winners">
                <TodaysWinner />
            </section>

            {/* HOW IT WORKS Section */}
            <section id="how-it-works">
                <HowItWorks />
            </section>

            {/* REFER & EARN Section */}
            <section id="refer-earn">
                <ReferAndEarn />
            </section>

            {/* {FOOTER} */}
            <Footer />

        </div>
    );
};

export default HomeScreenWebsite;