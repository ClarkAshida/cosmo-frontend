import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { usePageTitle } from "./hooks/usePageTitle";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./contexts/AuthContext";
import { TokenManager } from "./components/TokenManager";
import Home from "./pages/Home";
import CreateTerm from "./pages/CreateTerm";
import Equipamentos from "./pages/Equipamentos";
import AdicionarEquipamento from "./pages/AdicionarEquipamento";
import Usuarios from "./pages/Usuarios";
import Historico from "./pages/Historico";
import Configuracoes from "./pages/Configuracoes";
import Login from "./pages/Login";

// Componente para rotas protegidas
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o conteúdo
  return <>{children}</>;
};

// Componente principal da aplicação
const AppContent: React.FC = () => {
  const pageTitle = usePageTitle();
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rota de login - acessível apenas para usuários não autenticados */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Rotas protegidas - requerem autenticação */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout pageTitle={pageTitle}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/criar-termo" element={<CreateTerm />} />
                <Route path="/equipamentos" element={<Equipamentos />} />
                <Route
                  path="/equipamentos/novo"
                  element={<AdicionarEquipamento />}
                />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/historico" element={<Historico />} />
                <Route path="/configuracoes" element={<Configuracoes />} />

                {/* Rota catch-all para redirecionar para home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <TokenManager />
      <AppContent />
    </AuthProvider>
  );
}

export default App;
