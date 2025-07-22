import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Monitor, Plus, BarChart3 } from "lucide-react";

const Home: React.FC = () => {
  const quickActions = [
    {
      title: "Criar Termo de Responsabilidade",
      description: "Gere um novo termo de responsabilidade para equipamentos",
      href: "/criar-termo",
      icon: FileText,
      color: "bg-primary hover:bg-primary-hover",
    },
    {
      title: "Visualizar Equipamentos",
      description: "Consulte todos os equipamentos cadastrados no sistema",
      href: "/equipamentos",
      icon: Monitor,
      color: "bg-secondary hover:bg-secondary/80",
    },
    {
      title: "Adicionar Equipamento",
      description: "Cadastre um novo equipamento no inventário",
      href: "/adicionar-equipamento",
      icon: Plus,
      color: "bg-success hover:bg-success/80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Bem-vindo ao Cosmo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sistema completo de gerenciamento de inventário de TI. Gerencie
            equipamentos, visualize relatórios e controle termos de
            responsabilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.href}
                className="hover:shadow-medium transition-all duration-200"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-lg ${
                        action.color.split(" ")[0]
                      } text-white`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg">{action.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{action.description}</p>
                  <Button asChild className={action.color} size="lg">
                    <Link to={action.href} className="w-full">
                      Acessar
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Resumo do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">124</div>
                <div className="text-sm text-muted-foreground">
                  Equipamentos Ativos
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">89</div>
                <div className="text-sm text-muted-foreground">
                  Termos Emitidos
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">12</div>
                <div className="text-sm text-muted-foreground">Pendentes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">35</div>
                <div className="text-sm text-muted-foreground">Usuários</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
