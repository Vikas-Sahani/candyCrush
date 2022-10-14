import { Route, Routes } from "react-router-dom";

import GameRule from "./components/GameRules";
import GameLogic from "./components/GameLogic";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<GameRule />} />
        <Route path="/mainGame" element={<GameLogic />} />
      </Routes>
    </div>
  );
};
export default App;
