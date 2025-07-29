import { useLocation } from "react-router-dom";

export const usePageTitle = () => {
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/criar-termo": "Criar Termo",
    "/equipamentos": "Equipamentos",
    "/usuarios": "Usuários",
    "/historico": "Histórico",
    "/configuracoes": "Configurações",
    "/adicionar-equipamento": "Adicionar Equipamento",
    "/login": "Login",
  };

  return pageTitles[location.pathname] || "Cosmo";
};
