import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";
import type { RefreshTokenResponse, ApiError } from "@/types/authTypes";

// Configuração da instância do Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000, // Aumentado para 15 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag para evitar múltiplas tentativas de refresh simultâneas
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

// Função para processar a fila de requisições pendentes
const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });

  failedQueue = [];
};

// Interceptor de requisição - adiciona o token de acesso
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta - trata erros e refresh token
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };

    // Se o erro for 401 e não for uma tentativa de retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Se já estamos fazendo refresh, adiciona na fila
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = Cookies.get("refreshToken");
      const userEmail = Cookies.get("userEmail");

      if (refreshToken && userEmail) {
        try {
          // Tenta fazer o refresh do token
          const response = await axios.post<RefreshTokenResponse>(
            `${
              import.meta.env.VITE_API_BASE_URL
            }/api/auth/refresh/${userEmail}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data;

          // Atualiza os cookies com os novos tokens - tempo estendido
          const cookieOptions = {
            secure: import.meta.env.PROD,
            sameSite: "strict" as const,
            expires: 30, // 30 dias para maior durabilidade
          };

          Cookies.set("accessToken", newAccessToken, cookieOptions);
          Cookies.set("refreshToken", newRefreshToken, cookieOptions);

          // Processa a fila de requisições pendentes
          processQueue(null, newAccessToken);

          // Refaz a requisição original com o novo token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return apiClient(originalRequest);
        } catch (refreshError) {
          // Se o refresh falhar, limpa os cookies e redireciona para login
          processQueue(
            refreshError instanceof Error
              ? refreshError
              : new Error("Refresh failed"),
            null
          );

          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          Cookies.remove("userEmail");
          Cookies.remove("user");

          // Redireciona para login
          window.location.href = "/login";

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        // Se não há tokens, limpa tudo e redireciona
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userEmail");
        Cookies.remove("user");

        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    // Para outros tipos de erro, cria um objeto de erro padronizado
    const apiError: ApiError = {
      message:
        (error.response?.data as { message?: string })?.message ||
        error.message ||
        "Erro interno do servidor",
      status: error.response?.status,
      code: error.code,
    };

    return Promise.reject(apiError);
  }
);

export default apiClient;
