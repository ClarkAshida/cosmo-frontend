import Cookies from "js-cookie";
import apiClient from "@/api/apiClient";
import type {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
  User,
  AuthTokens,
} from "@/types/authTypes";

// Configurações dos cookies - aumentado tempo de expiração
const cookieOptions = {
  secure: import.meta.env.PROD, // HTTPS apenas em produção
  sameSite: "strict" as const, // Proteção CSRF
  expires: 30, // 30 dias (aumentado para maior durabilidade)
};

export const authService = {
  /**
   * Realiza login do usuário
   */
  async signIn(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await apiClient.post<LoginResponse>(
        "/api/auth/signin",
        credentials
      );
      const { username, accessToken, refreshToken } = response.data;

      // Armazena tokens e email nos cookies
      Cookies.set("accessToken", accessToken, cookieOptions);
      Cookies.set("refreshToken", refreshToken, cookieOptions);
      Cookies.set("userEmail", credentials.email, cookieOptions);

      // Cria objeto do usuário
      const user: User = {
        username,
        email: credentials.email,
      };

      // Armazena dados do usuário
      Cookies.set("user", JSON.stringify(user), cookieOptions);

      return user;
    } catch (error) {
      // Remove quaisquer tokens que possam existir em caso de erro
      this.signOut();
      throw error;
    }
  },

  /**
   * Renova o token de acesso
   */
  async refreshToken(email: string, refreshToken: string): Promise<AuthTokens> {
    try {
      const response = await apiClient.post<RefreshTokenResponse>(
        `/api/auth/refresh/${email}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      // Atualiza os cookies com os novos tokens
      Cookies.set("accessToken", newAccessToken, cookieOptions);
      Cookies.set("refreshToken", newRefreshToken, cookieOptions);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      // Se o refresh falhar, remove todos os cookies
      this.signOut();
      throw error;
    }
  },

  /**
   * Realiza logout do usuário
   */
  signOut(): void {
    // Remove todos os cookies relacionados à autenticação
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("userEmail");
    Cookies.remove("user");
  },

  /**
   * Recupera o usuário dos cookies
   */
  getUser(): User | null {
    try {
      const userCookie = Cookies.get("user");
      if (!userCookie) return null;

      const user = JSON.parse(userCookie) as User;

      // Valida se o objeto do usuário tem as propriedades necessárias
      if (
        user &&
        typeof user.username === "string" &&
        typeof user.email === "string"
      ) {
        return user;
      }

      return null;
    } catch (error) {
      console.error("Erro ao recuperar dados do usuário:", error);
      return null;
    }
  },

  /**
   * Recupera os tokens dos cookies
   */
  getTokens(): AuthTokens | null {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");

    if (accessToken && refreshToken) {
      return {
        accessToken,
        refreshToken,
      };
    }

    return null;
  },

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    const tokens = this.getTokens();
    const user = this.getUser();

    return !!(tokens && user);
  },

  /**
   * Recupera o email do usuário dos cookies
   */
  getUserEmail(): string | null {
    return Cookies.get("userEmail") || null;
  },
};
