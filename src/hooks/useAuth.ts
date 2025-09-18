import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import type { AuthContextType } from "@/types/authTypes";

/**
 * Hook personalizado para acessar o contexto de autenticação
 * @returns O contexto de autenticação
 * @throws Error se usado fora do AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser usado dentro de um AuthProvider. " +
        "Certifique-se de que o componente está envolvido pelo AuthProvider."
    );
  }

  return context;
};
