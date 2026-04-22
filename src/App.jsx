// import {Routes, Route, Navigate, HashRouter } from "react-router-dom";
// import Home from "./page/Home";
// import { ROUTES } from "./routes/routes";
// import GamePage from "./page/BeforeGameLive/gamePage";
// import AfterGameLive from "./page/AfterGameLive/afterGameLive";
// import HomeScreenWebsite from "./MainWebsite/homescreen_website";
// import RulesAndTerms from "./MainWebsite/FooterComponents/rules_regulation_terms";
// import CancellationRefundPolicy from "./MainWebsite/FooterComponents/cancellation_refund_policy";
// import PrivacyPolicy from "./MainWebsite/FooterComponents/privacy_policy";
// import FAQs from "./MainWebsite/FooterComponents/faqs";
// import Login from "./MainWebsite/AuthComponents/login_screen";
// import Register from "./MainWebsite/AuthComponents/register_screen";

// function App() {
//   return (
//     <HashRouter >
//       <Routes>
//         {/* Main Website Landing Page - Opens First */}
//         <Route path="/" element={<HomeScreenWebsite />} />
//         <Route path={ROUTES.HomeScreenWebsite} element={<HomeScreenWebsite />} />
//         <Route path={ROUTES.RULES} element={<RulesAndTerms />} />
//         <Route path={ROUTES.CANCELATIONREFUNDPOLICY} element={<CancellationRefundPolicy />} />
//         <Route path={ROUTES.PRIVACYPOLICY} element={<PrivacyPolicy />} />
//         <Route path={ROUTES.FAQS} element={<FAQs />} />
//         <Route path={ROUTES.LOGIN} element={<Login />} />
//         <Route path={ROUTES.REGISTER} element={<Register />} />


//         {/* Game Routes - Accessible via navigation from website */}
//         <Route path="/app" element={<Navigate to={ROUTES.HOME} />} />
//         <Route path={ROUTES.HOME} element={<Home />} />
//         <Route path={ROUTES.GAME} element={<GamePage />} />
//         <Route path={ROUTES.AFTERGAME} element={<AfterGameLive />} />

//         {/* Catch all - Redirect to landing page */}
//         <Route path="*" element={<Navigate to="/" />} />
        
//       </Routes>
//     </HashRouter >
//   );
// }

// export default App;

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

function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Main Website - Home */}
        <Route path={ROUTES.HomeScreenWebsite} element={<HomeScreenWebsite />} />
         <Route path={ROUTES.ReferalGuide} element={<ReferralGuide />} />
        
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