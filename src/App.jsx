import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import GamePage from "./page/gamePage";
import { ROUTES } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.GAME} element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;