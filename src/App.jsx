

import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import { ROUTES } from "./routes/routes";
import GamePage from "./page/BeforeGameLive/gamePage";
import AfterGameLive from "./page/AfterGameLive/afterGameLive";
import HomeScreenWebsite from "./MainWebsite/homescreen_website";
import RulesAndTerms from "./MainWebsite/FooterComponents/rules_regulation_terms";
import CancellationRefundPolicy from "./MainWebsite/FooterComponents/cancellation_refund_policy";
import PrivacyPolicy from "./MainWebsite/FooterComponents/privacy_policy";
import FAQs from "./MainWebsite/FooterComponents/faqs";
import Login from "./MainWebsite/AuthComponents/login_screen";
import Register from "./MainWebsite/AuthComponents/register_screen";
import ReferralGuide from "./MainWebsite/HomeComponents/referal_guide";
import MyTickets from "./MainWebsite/ProfileDrawerComponents/my_tickets";
import Credits from "./MainWebsite/ProfileDrawerComponents/add_money";
import KYC from "./MainWebsite/ProfileDrawerComponents/kyc";
import Language from "./MainWebsite/ProfileDrawerComponents/language";
import Settings from "./MainWebsite/ProfileDrawerComponents/setting";
import NewsAndMedia from "./MainWebsite/ProfileDrawerComponents/media_news";
import AllResults from "./MainWebsite/ProfileDrawerComponents/all_results";

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Main Website - Home */}
        <Route path={ROUTES.HomeScreenWebsite} element={<HomeScreenWebsite />} />
        <Route path={ROUTES.ReferalGuide} element={<ReferralGuide />} />
        <Route path={ROUTES.Credits} element={<Credits />} />
        <Route path={ROUTES.MyTickets} element={<MyTickets />} />
        <Route path={ROUTES.KYC} element={<KYC />} />
        <Route path={ROUTES.LANG} element={<Language />} />
        <Route path={ROUTES.SETTINGS} element={<Settings />} />
        <Route path={ROUTES.MEDIA} element={<NewsAndMedia />} />
        <Route path={ROUTES.AllResults} element={<AllResults />} />

        {/* Auth Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* Policy Routes */}
        <Route path={ROUTES.RULES} element={<RulesAndTerms />} />
        <Route path={ROUTES.CANCELATIONREFUNDPOLICY} element={<CancellationRefundPolicy />} />
        <Route path={ROUTES.PRIVACYPOLICY} element={<PrivacyPolicy />} />
        <Route path={ROUTES.FAQS} element={<FAQs />} />

        {/* Game Routes */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.GAME} element={<GamePage />} />
        <Route path={ROUTES.AFTERGAME} element={<AfterGameLive />} />

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;