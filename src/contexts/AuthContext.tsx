import React, { createContext, useCallback, useEffect, useState } from "react";
import { authService } from "@/services/authService";
import type {
  AuthContextType,
  User,
  LoginCredentials,
  ApiError,
} from "@/types/authTypes";

// Cria o contexto de autenticação
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Função para fazer login
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      try {
        setIsLoading(true);
        const userData = await authService.signIn(credentials);
        setUser(userData);
      } catch (error) {
        // Re-throw o erro para que o componente de login possa tratá-lo
        const apiError = error as ApiError;
        throw new Error(apiError.message || "Erro ao fazer login");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Função para fazer logout
  const logout = useCallback((): void => {
    authService.signOut();
    setUser(null);
  }, []);

  // Verifica se o usuário está autenticado
  const isAuthenticated = user !== null;

  // Efeito para verificar se existe uma sessão ativa ao carregar a aplicação
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Verifica se há tokens e dados do usuário salvos
        if (authService.isAuthenticated()) {
          const savedUser = authService.getUser();
          if (savedUser) {
            setUser(savedUser);
          } else {
            // Se não conseguir recuperar o usuário, limpa tudo
            authService.signOut();
          }
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        // Em caso de erro, limpa tudo para garantir estado consistente
        authService.signOut();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Listener para mudanças de storage (para sincronizar entre abas)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Este evento é disparado quando há mudanças no localStorage em outras abas
      // Como estamos usando cookies, vamos verificar periodicamente se ainda temos tokens
      if (event.key === "auth-check") {
        if (!authService.isAuthenticated() && user) {
          // Se os tokens foram removidos em outra aba, faz logout aqui também
          logout();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user, logout]);

  // Verifica periodicamente se os tokens ainda estão válidos
  useEffect(() => {
    if (!user) return;

    const checkAuthStatus = () => {
      if (!authService.isAuthenticated()) {
        // Se os tokens não existem mais, faz logout
        logout();
      }
    };

    // Verifica a cada 5 minutos (reduzido de 30 segundos para ser menos intrusivo)
    const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user, logout]);
  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
