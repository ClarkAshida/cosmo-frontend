import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { usePageTitle } from "./hooks/usePageTitle";
import Home from "./pages/Home";
import CreateTerm from "./pages/CreateTerm";
import Equipamentos from "./pages/Equipamentos";
import AdicionarEquipamento from "./pages/AdicionarEquipamento";
import Usuarios from "./pages/Usuarios";
import Historico from "./pages/Historico";
import Configuracoes from "./pages/Configuracoes";
import Login from "./pages/Login";

function App() {
  const pageTitle = usePageTitle();

  return (
    <Layout pageTitle={pageTitle}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/criar-termo" element={<CreateTerm />} />
        <Route path="/equipamentos" element={<Equipamentos />} />
        <Route
          path="/adicionar-equipamento"
          element={<AdicionarEquipamento />}
        />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
