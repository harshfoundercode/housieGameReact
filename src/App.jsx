import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import { ROUTES } from "./routes/routes";
import GamePage from "./page/BeforeGameLive/gamePage";
import AfterGameLive from "./page/AfterGameLive/afterGameLive";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.GAME} element={<GamePage />} />
        <Route path={ROUTES.AFTERGAME} element={<AfterGameLive />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;