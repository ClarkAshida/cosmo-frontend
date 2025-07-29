import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { Tooltip as CustomTooltip } from "@/components/ui";
import {
  Box,
  CheckCircle2,
  Laptop,
  Wrench,
  ChevronDown,
  ChevronUp,
  ArrowRightLeft,
  Undo2,
  XCircle,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Home: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Função para obter a mensagem do tooltip baseada no tipo de evento
  const getTooltipMessage = (type: string) => {
    switch (type) {
      case "entrega":
        return "Equipamento entregue ao colaborador";
      case "devolucao":
        return "Equipamento devolvido pelo colaborador";
      case "cancelamento":
        return "Solicitação de equipamento cancelada";
      default:
        return "Evento do sistema";
    }
  };

  // Função para obter as classes CSS baseadas no tipo de evento
  const getEventIconClasses = (type: string) => {
    const baseClasses =
      "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 cursor-help";
    switch (type) {
      case "entrega":
        return `${baseClasses} bg-success/10 hover:bg-success/20 border border-success/20`;
      case "devolucao":
        return `${baseClasses} bg-warning/10 hover:bg-warning/20 border border-warning/20`;
      case "cancelamento":
        return `${baseClasses} bg-danger/10 hover:bg-danger/20 border border-danger/20`;
      default:
        return `${baseClasses} bg-accent/50 hover:bg-accent border border-border`;
    }
  };

  // Função para obter a cor do ícone baseada no tipo de evento
  const getEventIconColor = (type: string) => {
    switch (type) {
      case "entrega":
        return "text-success";
      case "devolucao":
        return "text-warning";
      case "cancelamento":
        return "text-danger";
      default:
        return "text-muted-foreground";
    }
  };

  // Dados mockados para os KPIs
  const kpiData = [
    {
      title: "Equipamentos Totais",
      value: "258",
      description: "Total de ativos cadastrados no sistema.",
      icon: Box,
      color: "text-primary",
    },
    {
      title: "Disponíveis para Entrega",
      value: "32",
      description: "Ativos prontos para serem alocados.",
      icon: CheckCircle2,
      color: "text-success",
    },
    {
      title: "Em Uso",
      value: "194",
      description: "Ativos atualmente com colaboradores.",
      icon: Laptop,
      color: "text-warning",
    },
    {
      title: "Em Manutenção",
      value: "12",
      description: "Equipamentos aguardando reparo ou análise.",
      icon: Wrench,
      color: "text-danger",
    },
  ];

  // Dados mockados para o gráfico de pizza
  const chartData = [
    { type: "Notebook", count: 120, fill: "hsl(var(--primary))" },
    { type: "Celular", count: 85, fill: "hsl(var(--success))" },
    { type: "Monitor", count: 40, fill: "hsl(var(--warning))" },
    { type: "Impressora", count: 13, fill: "hsl(var(--danger))" },
  ];

  // Dados mockados para o gráfico de barras
  const barData = [
    { department: "Engenharia", count: 75 },
    { department: "Vendas", count: 50 },
    { department: "Marketing", count: 42 },
    { department: "Recursos Humanos", count: 27 },
  ];

  // Dados mockados para a tabela de histórico
  const historyData = [
    {
      icon: ArrowRightLeft,
      description: "Notebook Dell foi entregue para João Silva.",
      date: "há 5 minutos",
      type: "entrega",
    },
    {
      icon: Undo2,
      description: "iPhone 13 foi devolvido por Maria Santos.",
      date: "há 23 minutos",
      type: "devolucao",
    },
    {
      icon: ArrowRightLeft,
      description: "Monitor Samsung foi entregue para Pedro Oliveira.",
      date: "há 1 hora",
      type: "entrega",
    },
    {
      icon: XCircle,
      description: "Solicitação de Impressora HP foi cancelada.",
      date: "há 2 horas",
      type: "cancelamento",
    },
    {
      icon: Undo2,
      description: "MacBook Pro foi devolvido por Ana Costa.",
      date: "ontem",
      type: "devolucao",
    },
  ];

  const chartConfig = {
    notebook: {
      label: "Notebook",
      color: "hsl(var(--primary))",
    },
    celular: {
      label: "Celular",
      color: "hsl(var(--success))",
    },
    monitor: {
      label: "Monitor",
      color: "hsl(var(--warning))",
    },
    impressora: {
      label: "Impressora",
      color: "hsl(var(--danger))",
    },
  };

  return (
    <div className="space-y-6">
      {/* Seção 1: Cards de KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card
              key={index}
              className="hover:shadow-medium transition-all duration-200"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {kpi.value}
                </div>
                <p className="text-xs text-muted-foreground">
                  {kpi.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Seção 3: Controle de Expansão */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>Ocultar Gráficos</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>Mostrar Gráficos Detalhados</span>
            </>
          )}
        </Button>
      </div>

      {/* Seção 4: Área de Gráficos Detalhados (Expansível) */}
      {isExpanded && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico 1: Composição do Inventário */}
          <Card>
            <CardHeader>
              <CardTitle>Composição do Inventário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} unidades`, name]}
                      labelFormatter={() => ""}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      formatter={(value) => value}
                    />
                  </PieChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico 2: Equipamentos por Departamento */}
          <Card>
            <CardHeader>
              <CardTitle>Equipamentos por Departamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart
                    layout="horizontal"
                    data={barData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="department"
                      type="category"
                      width={100}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `${value} equipamentos`,
                        "Quantidade",
                      ]}
                      labelFormatter={(label) => `Departamento: ${label}`}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Seção 2: Tabela de Últimas Movimentações (Sempre Visível) */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Movimentações</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Evento</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-[100px]">Data</TableHead>
                <TableHead className="w-[100px]">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <CustomTooltip
                        content={getTooltipMessage(item.type)}
                        position="top"
                        delay={200}
                      >
                        <div className={getEventIconClasses(item.type)}>
                          <Icon
                            className={`w-4 h-4 ${getEventIconColor(
                              item.type
                            )}`}
                          />
                        </div>
                      </CustomTooltip>
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.description}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.date}
                    </TableCell>
                    <TableCell>
                      <Button variant="secondary" size="sm">
                        Detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
