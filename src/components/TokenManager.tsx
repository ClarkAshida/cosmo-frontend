import { useEffect, useRef } from "react";
import { authService } from "@/services/authService";
import { useAuth } from "@/hooks/useAuth";

/**
 * Componente para monitoramento e renovação automática de tokens
 * Monitora a validade dos tokens e os renova automaticamente antes da expiração
 */
export const TokenManager: React.FC = () => {
  const { user, logout } = useAuth();
  const renewalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Função para decodificar JWT e obter data de expiração
  const getTokenExpiration = (token: string): number | null => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp ? payload.exp * 1000 : null; // Converte para milliseconds
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  };

  // Função para renovar tokens automaticamente
  const scheduleTokenRenewal = () => {
    if (!user) return;

    const tokens = authService.getTokens();
    const userEmail = authService.getUserEmail();

    if (!tokens || !userEmail) {
      logout();
      return;
    }

    const accessTokenExp = getTokenExpiration(tokens.accessToken);

    if (!accessTokenExp) {
      console.warn("Não foi possível obter expiração do token");
      return;
    }

    const currentTime = Date.now();
    const timeUntilExpiry = accessTokenExp - currentTime;

    // Renova o token 5 minutos antes da expiração (ou imediatamente se já expirou)
    const renewalTime = Math.max(0, timeUntilExpiry - 5 * 60 * 1000);

    console.log("Token expira em:", new Date(accessTokenExp).toLocaleString());
    console.log(
      "Renovação agendada para:",
      new Date(currentTime + renewalTime).toLocaleString()
    );

    // Limpa timeout anterior se existir
    if (renewalTimeoutRef.current) {
      clearTimeout(renewalTimeoutRef.current);
    }

    // Agenda a renovação
    renewalTimeoutRef.current = setTimeout(async () => {
      try {
        console.log("Iniciando renovação automática de token...");
        await authService.refreshToken(userEmail, tokens.refreshToken);
        console.log("Token renovado com sucesso!");

        // Reagenda para o próximo ciclo
        scheduleTokenRenewal();
      } catch (error) {
        console.error("Erro na renovação automática:", error);
        // Se falhar, força logout
        logout();
      }
    }, renewalTime);
  };

  // Inicia o monitoramento quando o usuário faz login
  useEffect(() => {
    if (user) {
      scheduleTokenRenewal();
    }

    // Cleanup: limpa timeout quando componente desmonta ou usuário sai
    return () => {
      if (renewalTimeoutRef.current) {
        clearTimeout(renewalTimeoutRef.current);
      }
    };
  }, [user, logout]);

  // Este componente não renderiza nada visível
  return null;
};
