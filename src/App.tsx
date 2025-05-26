import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTerm from "./pages/CreateTerm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/criar-termo" element={<CreateTerm />} />
    </Routes>
  );
}

export default App;
