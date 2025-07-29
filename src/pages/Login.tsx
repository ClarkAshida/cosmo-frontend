import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Monitor } from "lucide-react";

const Login: React.FC = () => {
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
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="Sua senha" />
          </div>
          <Button className="w-full" asChild>
            <Link to="/">Entrar</Link>
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Flávio Severiano | Cosmo - Sistema de Inventário de TI
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
