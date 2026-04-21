import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import { ROUTES } from "./routes/routes";
import GamePage from "./page/BeforeGameLive/gamePage";
import AfterGameLive from "./page/AfterGameLive/afterGameLive";
import HomeScreenWebsite from "./MainWebsite/homescreen_website";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website Landing Page - Opens First */}
        <Route path="/" element={<HomeScreenWebsite />} />
        <Route path={ROUTES.HomeScreenWebsite} element={<HomeScreenWebsite />} />
        
        {/* Game Routes - Accessible via navigation from website */}
        <Route path="/app" element={<Navigate to={ROUTES.HOME} />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.GAME} element={<GamePage />} />
        <Route path={ROUTES.AFTERGAME} element={<AfterGameLive />} />
        
        {/* Catch all - Redirect to landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;