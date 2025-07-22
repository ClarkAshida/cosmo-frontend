import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTerm from "./pages/CreateTerm";
import Equipamentos from "./pages/Equipamentos";
import AdicionarEquipamento from "./pages/AdicionarEquipamento";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/criar-termo" element={<CreateTerm />} />
      <Route path="/equipamentos" element={<Equipamentos />} />
      <Route path="/adicionar-equipamento" element={<AdicionarEquipamento />} />
    </Routes>
  );
}

export default App;
