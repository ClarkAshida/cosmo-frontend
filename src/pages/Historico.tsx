import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui";
import {
  History,
  Search,
  Filter,
  Eye,
  Package,
  RotateCcw,
  X,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  Calendar,
  Monitor,
  FileText,
  Trash2,
} from "lucide-react";

// Tipos para definir eventos e status
type TipoEvento = "ENTREGA" | "DEVOLUCAO" | "CANCELAMENTO";
type StatusAssinatura = "ASSINADO" | "PENDENTE" | "REJEITADO" | "EXPIRADO";

interface RegistroHistorico {
  id: number;
  tipoEvento: TipoEvento;
  equipamento: {
    nome: string;
    patrimonio: string;
    tipo: string;
  };
  usuario: {
    nome: string;
    email: string;
    departamento: string;
  };
  dataEvento: string;
  statusAssinatura: StatusAssinatura;
  observacoes?: string;
  termoId?: string;
  podeSerCancelado: boolean;
}

const Historico = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoEventoFilter, setTipoEventoFilter] = useState<string>("TODOS");
  const [statusAssinaturaFilter, setStatusAssinaturaFilter] =
    useState<string>("TODOS");
  const [usuarioFilter, setUsuarioFilter] = useState("");
  const [equipamentoFilter, setEquipamentoFilter] = useState("");
  const [dataInicioFilter, setDataInicioFilter] = useState("");
  const [dataFimFilter, setDataFimFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Dados simulados de histórico
  const registrosHistorico: RegistroHistorico[] = [
    {
      id: 1,
      tipoEvento: "ENTREGA",
      equipamento: {
        nome: "Dell Inspiron 15 3000",
        patrimonio: "NB001",
        tipo: "NOTEBOOK",
      },
      usuario: {
        nome: "João Silva",
        email: "joao.silva@empresa.com",
        departamento: "TI",
      },
      dataEvento: "2024-07-30 14:30:00",
      statusAssinatura: "ASSINADO",
      observacoes:
        "Entrega realizada com sucesso. Equipamento em perfeito estado.",
      termoId: "TERMO-2024-001",
      podeSerCancelado: true,
    },
    {
      id: 2,
      tipoEvento: "DEVOLUCAO",
      equipamento: {
        nome: "Samsung 24' Full HD",
        patrimonio: "MON001",
        tipo: "MONITOR",
      },
      usuario: {
        nome: "Maria Santos",
        email: "maria.santos@empresa.com",
        departamento: "TI",
      },
      dataEvento: "2024-07-29 16:45:00",
      statusAssinatura: "ASSINADO",
      observacoes: "Devolução por mudança de setor.",
      termoId: "TERMO-2024-002",
      podeSerCancelado: false,
    },
    {
      id: 3,
      tipoEvento: "ENTREGA",
      equipamento: {
        nome: "Motorola G54 5G",
        patrimonio: "CEL001",
        tipo: "CELULAR",
      },
      usuario: {
        nome: "Carlos Lima",
        email: "carlos.lima@empresa.com",
        departamento: "COMERCIAL",
      },
      dataEvento: "2024-07-28 10:15:00",
      statusAssinatura: "PENDENTE",
      observacoes: "Aguardando assinatura do termo de responsabilidade.",
      termoId: "TERMO-2024-003",
      podeSerCancelado: true,
    },
    {
      id: 4,
      tipoEvento: "CANCELAMENTO",
      equipamento: {
        nome: "HP Pavilion 14",
        patrimonio: "NB002",
        tipo: "NOTEBOOK",
      },
      usuario: {
        nome: "Ana Costa",
        email: "ana.costa@empresa.com",
        departamento: "RH",
      },
      dataEvento: "2024-07-27 11:20:00",
      statusAssinatura: "REJEITADO",
      observacoes: "Cancelamento solicitado pelo usuário antes da entrega.",
      termoId: "TERMO-2024-004",
      podeSerCancelado: false,
    },
    {
      id: 5,
      tipoEvento: "ENTREGA",
      equipamento: {
        nome: "iPhone 14",
        patrimonio: "CEL003",
        tipo: "CELULAR",
      },
      usuario: {
        nome: "Pedro Oliveira",
        email: "pedro.oliveira@empresa.com",
        departamento: "TI",
      },
      dataEvento: "2024-07-26 15:30:00",
      statusAssinatura: "EXPIRADO",
      observacoes: "Termo de responsabilidade expirou sem assinatura.",
      termoId: "TERMO-2024-005",
      podeSerCancelado: false,
    },
    {
      id: 6,
      tipoEvento: "DEVOLUCAO",
      equipamento: {
        nome: "Lenovo ThinkPad E14",
        patrimonio: "NB003",
        tipo: "NOTEBOOK",
      },
      usuario: {
        nome: "Fernanda Lima",
        email: "fernanda.lima@empresa.com",
        departamento: "MARKETING",
      },
      dataEvento: "2024-07-25 09:45:00",
      statusAssinatura: "ASSINADO",
      observacoes: "Devolução por fim de contrato.",
      termoId: "TERMO-2024-006",
      podeSerCancelado: false,
    },
    {
      id: 7,
      tipoEvento: "ENTREGA",
      equipamento: {
        nome: "Samsung Galaxy A54",
        patrimonio: "CEL002",
        tipo: "CELULAR",
      },
      usuario: {
        nome: "Rafael Mendes",
        email: "rafael.mendes@empresa.com",
        departamento: "COMERCIAL",
      },
      dataEvento: "2024-07-24 13:10:00",
      statusAssinatura: "ASSINADO",
      observacoes: "Entrega para novo colaborador.",
      termoId: "TERMO-2024-007",
      podeSerCancelado: true,
    },
    {
      id: 8,
      tipoEvento: "CANCELAMENTO",
      equipamento: {
        nome: "LG 27' 4K",
        patrimonio: "MON002",
        tipo: "MONITOR",
      },
      usuario: {
        nome: "Lucas Ferreira",
        email: "lucas.ferreira@empresa.com",
        departamento: "TI",
      },
      dataEvento: "2024-07-23 14:55:00",
      statusAssinatura: "ASSINADO",
      observacoes: "Cancelamento por mudança de projeto.",
      termoId: "TERMO-2024-008",
      podeSerCancelado: false,
    },
    {
      id: 9,
      tipoEvento: "ENTREGA",
      equipamento: {
        nome: "Acer Aspire 5",
        patrimonio: "NB004",
        tipo: "NOTEBOOK",
      },
      usuario: {
        nome: "Camila Rodrigues",
        email: "camila.rodrigues@empresa.com",
        departamento: "FINANCEIRO",
      },
      dataEvento: "2024-07-22 11:30:00",
      statusAssinatura: "PENDENTE",
      observacoes: "Entrega agendada, aguardando confirmação.",
      termoId: "TERMO-2024-009",
      podeSerCancelado: true,
    },
    {
      id: 10,
      tipoEvento: "DEVOLUCAO",
      equipamento: {
        nome: "Xiaomi Redmi Note 12",
        patrimonio: "CEL004",
        tipo: "CELULAR",
      },
      usuario: {
        nome: "Bruno Alves",
        email: "bruno.alves@empresa.com",
        departamento: "TI",
      },
      dataEvento: "2024-07-21 16:20:00",
      statusAssinatura: "ASSINADO",
      observacoes: "Devolução por desligamento.",
      termoId: "TERMO-2024-010",
      podeSerCancelado: false,
    },
  ];

  // Função para obter badge do tipo de evento
  const getTipoEventoBadge = (tipo: TipoEvento) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium gap-1";

    switch (tipo) {
      case "ENTREGA":
        return {
          classes: `${baseClasses} bg-blue-100 text-blue-700 border border-blue-200`,
          icon: Package,
          label: "Entrega",
        };
      case "DEVOLUCAO":
        return {
          classes: `${baseClasses} bg-green-100 text-green-700 border border-green-200`,
          icon: RotateCcw,
          label: "Devolução",
        };
      case "CANCELAMENTO":
        return {
          classes: `${baseClasses} bg-red-100 text-red-700 border border-red-200`,
          icon: X,
          label: "Cancelamento",
        };
      default:
        return {
          classes: `${baseClasses} bg-gray-100 text-gray-700 border border-gray-200`,
          icon: FileText,
          label: tipo,
        };
    }
  };

  // Função para obter badge do status de assinatura
  const getStatusAssinaturaBadge = (status: StatusAssinatura) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium gap-1";

    switch (status) {
      case "ASSINADO":
        return {
          classes: `${baseClasses} bg-success/10 text-success border border-success/20`,
          icon: CheckCircle,
          label: "Assinado",
        };
      case "PENDENTE":
        return {
          classes: `${baseClasses} bg-warning/10 text-warning border border-warning/20`,
          icon: Clock,
          label: "Pendente",
        };
      case "REJEITADO":
        return {
          classes: `${baseClasses} bg-danger/10 text-danger border border-danger/20`,
          icon: XCircle,
          label: "Rejeitado",
        };
      case "EXPIRADO":
        return {
          classes: `${baseClasses} bg-orange-100 text-orange-700 border border-orange-200`,
          icon: AlertTriangle,
          label: "Expirado",
        };
      default:
        return {
          classes: `${baseClasses} bg-muted text-muted-foreground`,
          icon: Clock,
          label: status,
        };
    }
  };

  // Função para obter ícone do tipo de equipamento
  const getTipoEquipamentoIcon = (tipo: string) => {
    switch (tipo.toUpperCase()) {
      case "NOTEBOOK":
        return Monitor;
      case "CELULAR":
        return Monitor;
      case "MONITOR":
        return Monitor;
      default:
        return Package;
    }
  };

  // Filtros aplicados
  const filteredRegistros = registrosHistorico.filter((registro) => {
    const matchesSearch =
      registro.equipamento.nome
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      registro.equipamento.patrimonio
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      registro.usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registro.usuario.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTipoEvento =
      tipoEventoFilter === "TODOS" || registro.tipoEvento === tipoEventoFilter;
    const matchesStatusAssinatura =
      statusAssinaturaFilter === "TODOS" ||
      registro.statusAssinatura === statusAssinaturaFilter;
    const matchesUsuario =
      !usuarioFilter ||
      registro.usuario.nome.toLowerCase().includes(usuarioFilter.toLowerCase());
    const matchesEquipamento =
      !equipamentoFilter ||
      registro.equipamento.nome
        .toLowerCase()
        .includes(equipamentoFilter.toLowerCase()) ||
      registro.equipamento.patrimonio
        .toLowerCase()
        .includes(equipamentoFilter.toLowerCase());

    // Filtro de data (simplificado para demo)
    let matchesDataInicio = true;
    let matchesDataFim = true;

    if (dataInicioFilter) {
      const dataInicio = new Date(dataInicioFilter);
      const dataRegistro = new Date(registro.dataEvento);
      matchesDataInicio = dataRegistro >= dataInicio;
    }

    if (dataFimFilter) {
      const dataFim = new Date(dataFimFilter);
      const dataRegistro = new Date(registro.dataEvento);
      matchesDataFim = dataRegistro <= dataFim;
    }

    return (
      matchesSearch &&
      matchesTipoEvento &&
      matchesStatusAssinatura &&
      matchesUsuario &&
      matchesEquipamento &&
      matchesDataInicio &&
      matchesDataFim
    );
  });

  // Cálculos de paginação
  const totalItems = filteredRegistros.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredRegistros.slice(startIndex, endIndex);

  // Reset da página atual quando filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    tipoEventoFilter,
    statusAssinaturaFilter,
    usuarioFilter,
    equipamentoFilter,
    dataInicioFilter,
    dataFimFilter,
  ]);

  // Função para gerar números das páginas
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  // Função para formatar data
  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleString("pt-BR");
  };

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Histórico de Movimentações
          </h1>
          <p className="text-muted-foreground">
            Log completo de auditoria de todas as movimentações do sistema
          </p>
        </div>
      </div>

      {/* FilterBar Avançada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros Avançados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Busca geral */}
            <div className="md:col-span-2 lg:col-span-1">
              <Label htmlFor="search">Busca geral</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="search"
                  placeholder="Equipamento, usuário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filtro por Tipo de Evento */}
            <div>
              <Label htmlFor="tipo-evento-filter">Tipo de Evento</Label>
              <Select
                value={tipoEventoFilter}
                onValueChange={setTipoEventoFilter}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Todos os eventos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="ENTREGA">Entrega</SelectItem>
                  <SelectItem value="DEVOLUCAO">Devolução</SelectItem>
                  <SelectItem value="CANCELAMENTO">Cancelamento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Status de Assinatura */}
            <div>
              <Label htmlFor="status-assinatura-filter">
                Status Assinatura
              </Label>
              <Select
                value={statusAssinaturaFilter}
                onValueChange={setStatusAssinaturaFilter}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="ASSINADO">Assinado</SelectItem>
                  <SelectItem value="PENDENTE">Pendente</SelectItem>
                  <SelectItem value="REJEITADO">Rejeitado</SelectItem>
                  <SelectItem value="EXPIRADO">Expirado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Usuário */}
            <div>
              <Label htmlFor="usuario-filter">Usuário</Label>
              <Input
                id="usuario-filter"
                placeholder="Nome do usuário..."
                value={usuarioFilter}
                onChange={(e) => setUsuarioFilter(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Filtro por Equipamento */}
            <div>
              <Label htmlFor="equipamento-filter">Equipamento</Label>
              <Input
                id="equipamento-filter"
                placeholder="Nome ou patrimônio..."
                value={equipamentoFilter}
                onChange={(e) => setEquipamentoFilter(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Data Início */}
            <div>
              <Label htmlFor="data-inicio-filter">Data Início</Label>
              <Input
                id="data-inicio-filter"
                type="date"
                value={dataInicioFilter}
                onChange={(e) => setDataInicioFilter(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Data Fim */}
            <div>
              <Label htmlFor="data-fim-filter">Data Fim</Label>
              <Input
                id="data-fim-filter"
                type="date"
                value={dataFimFilter}
                onChange={(e) => setDataFimFilter(e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Botão limpar filtros */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setTipoEventoFilter("TODOS");
                  setStatusAssinaturaFilter("TODOS");
                  setUsuarioFilter("");
                  setEquipamentoFilter("");
                  setDataInicioFilter("");
                  setDataFimFilter("");
                }}
                className="mt-2 w-full"
              >
                Limpar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DataTable principal */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>
              Registros de Histórico ({totalItems} registros)
            </CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="items-per-page" className="text-sm">
                Itens por página:
              </Label>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">ID</TableHead>
                  <TableHead>Tipo de Evento</TableHead>
                  <TableHead>Equipamento</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Data do Evento</TableHead>
                  <TableHead>Status Assinatura</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((registro) => {
                  const tipoEventoBadge = getTipoEventoBadge(
                    registro.tipoEvento
                  );
                  const statusAssinaturaBadge = getStatusAssinaturaBadge(
                    registro.statusAssinatura
                  );
                  const EquipamentoIcon = getTipoEquipamentoIcon(
                    registro.equipamento.tipo
                  );
                  const EventoIcon = tipoEventoBadge.icon;
                  const StatusIcon = statusAssinaturaBadge.icon;

                  return (
                    <TableRow key={registro.id}>
                      <TableCell className="font-mono text-sm">
                        #{registro.id.toString().padStart(3, "0")}
                      </TableCell>
                      <TableCell>
                        <span className={tipoEventoBadge.classes}>
                          <EventoIcon className="w-3 h-3" />
                          {tipoEventoBadge.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/50">
                            <EquipamentoIcon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">
                              {registro.equipamento.nome}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {registro.equipamento.patrimonio}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {registro.usuario.nome}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {registro.usuario.departamento}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatarData(registro.dataEvento)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={statusAssinaturaBadge.classes}>
                          <StatusIcon className="w-3 h-3" />
                          {statusAssinaturaBadge.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Ver detalhes"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {registro.podeSerCancelado && (
                            <Button
                              variant="destructive"
                              size="sm"
                              title="Cancelar histórico"
                              onClick={() =>
                                console.log(`Cancelar registro ${registro.id}`)
                              }
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Componente de Paginação */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1} a {Math.min(endIndex, totalItems)} de{" "}
                {totalItems} registros
              </div>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) setCurrentPage(currentPage - 1);
                      }}
                      className={
                        currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>

                  {getPageNumbers().map((pageNumber, index) => (
                    <PaginationItem key={index}>
                      {pageNumber === "..." ? (
                        <PaginationEllipsis />
                      ) : (
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(Number(pageNumber));
                          }}
                          isActive={currentPage === pageNumber}
                        >
                          {pageNumber}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages)
                          setCurrentPage(currentPage + 1);
                      }}
                      className={
                        currentPage >= totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Estado vazio */}
          {filteredRegistros.length === 0 && (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum registro encontrado
              </h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros para encontrar os registros desejados.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setTipoEventoFilter("TODOS");
                  setStatusAssinaturaFilter("TODOS");
                  setUsuarioFilter("");
                  setEquipamentoFilter("");
                  setDataInicioFilter("");
                  setDataFimFilter("");
                }}
              >
                Limpar Todos os Filtros
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Historico;
