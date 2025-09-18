import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Monitor, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { LoginCredentials } from "@/types/authTypes";

// Schema de validação usando Yup
const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email é obrigatório")
    .email("Formato de email inválido")
    .max(255, "Email deve ter no máximo 255 caracteres"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
});

const Login: React.FC = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>("");

  // Configuração do React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur", // Valida quando o campo perde o foco
  });

  // Se já estiver autenticado, redireciona para a home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Função para submeter o formulário
  const onSubmit = async (data: LoginCredentials) => {
    try {
      setLoginError("");
      await login(data);
      // O redirecionamento será feito automaticamente pelo Navigate acima
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      // Mapeia erros específicos para mensagens mais amigáveis
      if (
        errorMessage.includes("401") ||
        errorMessage.includes("credentials")
      ) {
        setLoginError("Email ou senha incorretos. Verifique suas credenciais.");
      } else if (errorMessage.includes("404")) {
        setLoginError(
          "Serviço de autenticação não encontrado. Tente novamente mais tarde."
        );
      } else if (errorMessage.includes("500")) {
        setLoginError("Erro interno do servidor. Tente novamente mais tarde.");
      } else if (errorMessage.includes("Network")) {
        setLoginError(
          "Erro de conexão. Verifique sua internet e tente novamente."
        );
      } else {
        setLoginError(errorMessage);
      }
    }
  };

  // Função para alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-light flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary">Cosmo</span>
          </div>
          <CardTitle className="text-2xl">Fazer Login</CardTitle>
          <p className="text-muted-foreground">
            Entre com suas credenciais para acessar o sistema
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
                disabled={isSubmitting || isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  {...register("password")}
                  className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                  disabled={isSubmitting || isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting || isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Erro de login */}
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {loginError}
                </p>
              </div>
            )}

            {/* Botão de login */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            © 2025 Flávio Severiano | Cosmo - Sistema de Inventário de TI
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
