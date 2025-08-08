import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui";
import {
  Monitor,
  Smartphone,
  Laptop,
  CreditCard,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Package,
  Wrench,
  RotateCcw,
  CheckCircle,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  User,
  FileText,
  Loader2,
  X,
} from "lucide-react";

// Tipos para definir os status e tipos de equipamento
type StatusEquipamento = "DISPONIVEL" | "EM_USO" | "EM_MANUTENCAO" | "INATIVO";
type TipoEquipamento = "NOTEBOOK" | "CELULAR" | "MONITOR" | "CHIP" | "OUTROS";

interface Equipamento {
  id: number;
  patrimonio?: string;
  serial?: string;
  hostname?: string;
  tipo: TipoEquipamento;
  modelo: string;
  status: StatusEquipamento;
  usuarioAtual?: string;
  valor: string;
  dataAquisicao: string;
}

// Tipos para os modais
interface Usuario {
  id: number;
  nome: string;
  email: string;
  departamento: string;
}

interface FormDataEntrega {
  usuarioId: string;
  dataEntrega: string;
  observacoes: string;
}

interface FormDataDevolucao {
  condicaoRetorno: string;
  novostatus: StatusEquipamento;
  dataDevolucao: string;
  observacoes: string;
}

type ModalType = "none" | "entrega" | "devolucao";

const Equipamentos = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");
  const [tipoFilter, setTipoFilter] = useState<string>("TODOS");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Estados para os modais
  const [modalType, setModalType] = useState<ModalType>("none");
  const [selectedEquipamento, setSelectedEquipamento] =
    useState<Equipamento | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para formulário de entrega
  const [formDataEntrega, setFormDataEntrega] = useState<FormDataEntrega>({
    usuarioId: "",
    dataEntrega: new Date().toISOString().split("T")[0],
    observacoes: "",
  });

  // Estados para formulário de devolução
  const [formDataDevolucao, setFormDataDevolucao] = useState<FormDataDevolucao>(
    {
      condicaoRetorno: "",
      novostatus: "DISPONIVEL",
      dataDevolucao: new Date().toISOString().split("T")[0],
      observacoes: "",
    }
  );

  // Dados simulados de usuários
  const usuarios: Usuario[] = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@empresa.com",
      departamento: "TI",
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@empresa.com",
      departamento: "RH",
    },
    {
      id: 3,
      nome: "Pedro Oliveira",
      email: "pedro.oliveira@empresa.com",
      departamento: "Comercial",
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana.costa@empresa.com",
      departamento: "Financeiro",
    },
    {
      id: 5,
      nome: "Carlos Lima",
      email: "carlos.lima@empresa.com",
      departamento: "Marketing",
    },
  ];

  // Dados simulados mais realistas com mais itens para testar paginação
  const equipamentos: Equipamento[] = [
    {
      id: 1,
      patrimonio: "NB001",
      serial: "ABC123456789",
      hostname: "NB-JOAO-001",
      tipo: "NOTEBOOK",
      modelo: "Dell Inspiron 15 3000",
      status: "EM_USO",
      usuarioAtual: "João Silva",
      valor: "R$ 3.200,00",
      dataAquisicao: "2023-01-15",
    },
    {
      id: 2,
      patrimonio: "CEL001",
      serial: "IMEI123456789012345",
      tipo: "CELULAR",
      modelo: "Motorola G54 5G",
      status: "DISPONIVEL",
      valor: "R$ 2.540,00",
      dataAquisicao: "2023-03-10",
    },
    {
      id: 3,
      patrimonio: "MON001",
      serial: "MON789456123",
      tipo: "MONITOR",
      modelo: "Samsung 24' Full HD",
      status: "EM_USO",
      usuarioAtual: "Maria Santos",
      valor: "R$ 800,00",
      dataAquisicao: "2023-02-20",
    },
    {
      id: 4,
      patrimonio: "CHIP001",
      serial: "11999887766",
      tipo: "CHIP",
      modelo: "Claro Controle",
      status: "EM_MANUTENCAO",
      valor: "R$ 50,00",
      dataAquisicao: "2023-01-05",
    },
    {
      id: 5,
      patrimonio: "NB002",
      serial: "DEF987654321",
      hostname: "NB-CARLOS-002",
      tipo: "NOTEBOOK",
      modelo: "HP Pavilion 14",
      status: "DISPONIVEL",
      valor: "R$ 2.800,00",
      dataAquisicao: "2023-04-01",
    },
    {
      id: 6,
      patrimonio: "CEL002",
      serial: "IMEI987654321098765",
      tipo: "CELULAR",
      modelo: "Samsung Galaxy A54",
      status: "EM_USO",
      usuarioAtual: "Pedro Oliveira",
      valor: "R$ 1.999,00",
      dataAquisicao: "2023-05-12",
    },
    {
      id: 7,
      patrimonio: "MON002",
      serial: "MON456789012",
      tipo: "MONITOR",
      modelo: "LG 27' 4K",
      status: "DISPONIVEL",
      valor: "R$ 1.200,00",
      dataAquisicao: "2023-06-08",
    },
    {
      id: 8,
      patrimonio: "NB003",
      serial: "GHI456789012",
      hostname: "NB-ANA-003",
      tipo: "NOTEBOOK",
      modelo: "Lenovo ThinkPad E14",
      status: "EM_USO",
      usuarioAtual: "Ana Costa",
      valor: "R$ 3.500,00",
      dataAquisicao: "2023-07-20",
    },
    {
      id: 9,
      patrimonio: "CHIP002",
      serial: "11988776655",
      tipo: "CHIP",
      modelo: "Vivo Pós",
      status: "DISPONIVEL",
      valor: "R$ 60,00",
      dataAquisicao: "2023-08-15",
    },
    {
      id: 10,
      patrimonio: "CEL003",
      serial: "IMEI555444333222111",
      tipo: "CELULAR",
      modelo: "iPhone 14",
      status: "EM_MANUTENCAO",
      valor: "R$ 5.200,00",
      dataAquisicao: "2023-09-10",
    },
    {
      id: 11,
      patrimonio: "NB004",
      serial: "JKL789012345",
      hostname: "NB-LUCAS-004",
      tipo: "NOTEBOOK",
      modelo: "Acer Aspire 5",
      status: "DISPONIVEL",
      valor: "R$ 2.400,00",
      dataAquisicao: "2023-10-05",
    },
    {
      id: 12,
      patrimonio: "MON003",
      serial: "MON123789456",
      tipo: "MONITOR",
      modelo: "Dell 22' Full HD",
      status: "EM_USO",
      usuarioAtual: "Rafael Mendes",
      valor: "R$ 650,00",
      dataAquisicao: "2023-11-12",
    },
    {
      id: 13,
      patrimonio: "CEL004",
      serial: "IMEI111222333444555",
      tipo: "CELULAR",
      modelo: "Xiaomi Redmi Note 12",
      status: "DISPONIVEL",
      valor: "R$ 1.200,00",
      dataAquisicao: "2023-12-01",
    },
    {
      id: 14,
      patrimonio: "NB005",
      serial: "MNO012345678",
      hostname: "NB-FERNANDA-005",
      tipo: "NOTEBOOK",
      modelo: "Asus VivoBook 15",
      status: "EM_USO",
      usuarioAtual: "Fernanda Lima",
      valor: "R$ 2.600,00",
      dataAquisicao: "2024-01-18",
    },
    {
      id: 15,
      patrimonio: "CHIP003",
      serial: "11977665544",
      tipo: "CHIP",
      modelo: "TIM Controle",
      status: "INATIVO",
      valor: "R$ 45,00",
      dataAquisicao: "2024-02-10",
    },
  ];

  // Funções para obter ícones e cores baseados no tipo
  const getTipoIcon = (tipo: TipoEquipamento) => {
    switch (tipo) {
      case "NOTEBOOK":
        return Laptop;
      case "CELULAR":
        return Smartphone;
      case "MONITOR":
        return Monitor;
      case "CHIP":
        return CreditCard;
      default:
        return Package;
    }
  };

  // Função para obter badge de status com cores
  const getStatusBadge = (status: StatusEquipamento) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium gap-1";

    switch (status) {
      case "DISPONIVEL":
        return {
          classes: `${baseClasses} bg-success/10 text-success border border-success/20`,
          icon: CheckCircle,
          label: "Disponível",
        };
      case "EM_USO":
        return {
          classes: `${baseClasses} bg-primary/10 text-primary border border-primary/20`,
          icon: Clock,
          label: "Em Uso",
        };
      case "EM_MANUTENCAO":
        return {
          classes: `${baseClasses} bg-warning/10 text-warning border border-warning/20`,
          icon: Wrench,
          label: "Em Manutenção",
        };
      case "INATIVO":
        return {
          classes: `${baseClasses} bg-danger/10 text-danger border border-danger/20`,
          icon: AlertTriangle,
          label: "Inativo",
        };
      default:
        return {
          classes: `${baseClasses} bg-muted text-muted-foreground`,
          icon: MoreHorizontal,
          label: status,
        };
    }
  };

  // Funções para abrir/fechar modais
  const openDeliveryModal = (equipamento: Equipamento) => {
    setSelectedEquipamento(equipamento);
    setModalType("entrega");
    setFormDataEntrega({
      usuarioId: "",
      dataEntrega: new Date().toISOString().split("T")[0],
      observacoes: "",
    });
  };

  const openReturnModal = (equipamento: Equipamento) => {
    setSelectedEquipamento(equipamento);
    setModalType("devolucao");
    setFormDataDevolucao({
      condicaoRetorno: "",
      novostatus: "DISPONIVEL",
      dataDevolucao: new Date().toISOString().split("T")[0],
      observacoes: "",
    });
  };

  const closeModal = () => {
    setModalType("none");
    setSelectedEquipamento(null);
    setIsLoading(false);
  };

  // Função para processar entrega
  const handleEntrega = async () => {
    if (!selectedEquipamento || !formDataEntrega.usuarioId) return;

    setIsLoading(true);

    try {
      // Passo 1: Criar Histórico
      console.log("Passo 1: Criando histórico de entrega...");
      await fetch("/api/historicos/entregar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipamentoId: selectedEquipamento.id,
          usuarioId: formDataEntrega.usuarioId,
          dataEntrega: formDataEntrega.dataEntrega,
          observacoes: formDataEntrega.observacoes,
        }),
      });

      // Simulação: sempre sucesso
      const historico = { id: Math.floor(Math.random() * 1000) };

      // Passo 2: Gerar PDF
      console.log("Passo 2: Gerando PDF do termo de entrega...");
      // Aqui seria integrada a biblioteca jsPDF
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simular processamento

      // Passo 3: Enviar para assinatura
      console.log("Passo 3: Enviando para serviço de assinatura...");
      const signingUrl = `https://d4sign.com.br/sign/${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Passo 4: Atualizar histórico com URL de assinatura
      console.log("Passo 4: Atualizando histórico com URL de assinatura...");
      await fetch(`/api/historicos/${historico.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signingUrl,
          statusAssinatura: "PENDENTE",
        }),
      });

      // Feedback de sucesso
      console.log("✅ Equipamento entregue e termo enviado para assinatura!");
      closeModal();
    } catch (error) {
      console.error("Erro no processo de entrega:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para processar devolução
  const handleDevolucao = async () => {
    if (!selectedEquipamento || !formDataDevolucao.condicaoRetorno) return;

    setIsLoading(true);

    try {
      // Passo 1: Registrar devolução
      console.log("Passo 1: Registrando devolução...");
      await fetch(`/api/historicos/${selectedEquipamento.id}/devolver`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          condicaoRetorno: formDataDevolucao.condicaoRetorno,
          novoStatus: formDataDevolucao.novostatus,
          dataDevolucao: formDataDevolucao.dataDevolucao,
          observacoes: formDataDevolucao.observacoes,
        }),
      });

      // Passo 2: Gerar PDF do termo de devolução
      console.log("Passo 2: Gerando PDF do termo de devolução...");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Passo 3: Enviar para assinatura
      console.log("Passo 3: Enviando para serviço de assinatura...");
      const signingUrl = `https://d4sign.com.br/sign/${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      console.log("URL de assinatura gerada:", signingUrl);

      // Passo 4: Atualizar registro
      console.log("Passo 4: Atualizando registro com URL de assinatura...");

      // Feedback de sucesso
      console.log("✅ Devolução registrada e termo enviado para assinatura!");
      closeModal();
    } catch (error) {
      console.error("Erro no processo de devolução:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para obter ação contextual baseada no status
  const getContextualAction = (equipamento: Equipamento) => {
    switch (equipamento.status) {
      case "DISPONIVEL":
        return {
          label: "Entregar",
          variant: "default" as const,
          icon: Package,
          action: () => openDeliveryModal(equipamento),
        };
      case "EM_USO":
        return {
          label: "Devolver",
          variant: "secondary" as const,
          icon: RotateCcw,
          action: () => openReturnModal(equipamento),
        };
      case "EM_MANUTENCAO":
        return {
          label: "Marcar Disponível",
          variant: "outline" as const,
          icon: CheckCircle,
          action: () =>
            console.log(`Marcar como disponível ${equipamento.patrimonio}`),
        };
      default:
        return null;
    }
  };

  // Filtros aplicados
  const filteredEquipamentos = equipamentos.filter((equip) => {
    const matchesSearch =
      (equip.patrimonio?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (equip.serial?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (equip.hostname?.toLowerCase() || "").includes(
        searchTerm.toLowerCase()
      ) ||
      (equip.modelo?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "TODOS" || equip.status === statusFilter;
    const matchesTipo = tipoFilter === "TODOS" || equip.tipo === tipoFilter;

    return matchesSearch && matchesStatus && matchesTipo;
  });

  // Cálculos de paginação
  const totalItems = filteredEquipamentos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredEquipamentos.slice(startIndex, endIndex);

  // Reset da página atual quando filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, tipoFilter]);

  // Função para gerar números das páginas a serem exibidas
  const getPageNumbers = () => {
    const delta = 2; // Quantas páginas mostrar antes e depois da atual
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

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Equipamentos</h1>
          <p className="text-muted-foreground">
            Gerencie o inventário completo de ativos de TI
          </p>
        </div>
        <Button className="gap-2" onClick={() => navigate("/equipamentos/novo")}>
          <Plus className="w-4 h-4" />
          Novo Equipamento
        </Button>
      </div>

      {/* FilterBar e SearchBar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros e Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Campo de busca */}
            <div className="md:col-span-2">
              <Label htmlFor="search">Buscar equipamentos</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="search"
                  placeholder="Patrimônio, serial, hostname..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filtro por Status */}
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="DISPONIVEL">Disponível</SelectItem>
                  <SelectItem value="EM_USO">Em Uso</SelectItem>
                  <SelectItem value="EM_MANUTENCAO">Em Manutenção</SelectItem>
                  <SelectItem value="INATIVO">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Tipo */}
            <div>
              <Label htmlFor="tipo-filter">Tipo</Label>
              <Select value={tipoFilter} onValueChange={setTipoFilter}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="NOTEBOOK">Notebook</SelectItem>
                  <SelectItem value="CELULAR">Celular</SelectItem>
                  <SelectItem value="MONITOR">Monitor</SelectItem>
                  <SelectItem value="CHIP">Chip</SelectItem>
                  <SelectItem value="OUTROS">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DataTable principal */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>
              Inventário de Equipamentos ({totalItems} itens)
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
                  <TableHead className="w-12">Tipo</TableHead>
                  <TableHead>Patrimônio</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usuário Atual</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((equip) => {
                  const TipoIcon = getTipoIcon(equip.tipo);
                  const statusBadge = getStatusBadge(equip.status);
                  const StatusIcon = statusBadge.icon;
                  const contextualAction = getContextualAction(equip);

                  return (
                    <TableRow key={equip.id}>
                      <TableCell>
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/50">
                          <TipoIcon className="w-4 h-4 text-primary" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">
                            {equip.patrimonio}
                          </div>
                          {equip.hostname && (
                            <div className="text-xs text-muted-foreground">
                              {equip.hostname}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{equip.modelo}</div>
                          <div className="text-xs text-muted-foreground">
                            {equip.serial}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={statusBadge.classes}>
                          <StatusIcon className="w-3 h-3" />
                          {statusBadge.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        {equip.usuarioAtual ? (
                          <div className="font-medium text-foreground">
                            {equip.usuarioAtual}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            Não atribuído
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">
                        {equip.valor}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          {contextualAction && (
                            <Button
                              variant={contextualAction.variant}
                              size="sm"
                              onClick={contextualAction.action}
                              className="gap-1"
                            >
                              <contextualAction.icon className="w-4 h-4" />
                              {contextualAction.label}
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
                {totalItems} equipamentos
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
          {filteredEquipamentos.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum equipamento encontrado
              </h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros ou adicionar novos equipamentos.
              </p>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Cadastrar Primeiro Equipamento
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Entrega */}
      <Dialog open={modalType === "entrega"} onOpenChange={() => closeModal()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Entregar Equipamento
            </DialogTitle>
            <DialogDescription>
              Preencha os dados para registrar a entrega do equipamento{" "}
              <span className="font-medium">
                {selectedEquipamento?.patrimonio}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="usuario">Usuário</Label>
              <Select
                value={formDataEntrega.usuarioId}
                onValueChange={(value) =>
                  setFormDataEntrega({ ...formDataEntrega, usuarioId: value })
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o usuário" />
                </SelectTrigger>
                <SelectContent>
                  {usuarios.map((usuario) => (
                    <SelectItem key={usuario.id} value={usuario.id.toString()}>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{usuario.nome}</div>
                          <div className="text-xs text-muted-foreground">
                            {usuario.departamento}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dataEntrega">Data de Entrega</Label>
              <Input
                id="dataEntrega"
                type="date"
                value={formDataEntrega.dataEntrega}
                onChange={(e) =>
                  setFormDataEntrega({
                    ...formDataEntrega,
                    dataEntrega: e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="observacoesEntrega">Observações</Label>
              <Input
                id="observacoesEntrega"
                placeholder="Observações sobre a entrega (opcional)"
                value={formDataEntrega.observacoes}
                onChange={(e) =>
                  setFormDataEntrega({
                    ...formDataEntrega,
                    observacoes: e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeModal} disabled={isLoading}>
              Cancelar
            </Button>
            <Button
              onClick={handleEntrega}
              disabled={!formDataEntrega.usuarioId || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Confirmar e Gerar Termo
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Devolução */}
      <Dialog
        open={modalType === "devolucao"}
        onOpenChange={() => closeModal()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-secondary-foreground" />
              Registrar Devolução
            </DialogTitle>
            <DialogDescription>
              Registre a devolução do equipamento{" "}
              <span className="font-medium">
                {selectedEquipamento?.patrimonio}
              </span>{" "}
              em uso por{" "}
              <span className="font-medium">
                {selectedEquipamento?.usuarioAtual}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="condicaoRetorno">Condição de Retorno</Label>
              <Select
                value={formDataDevolucao.condicaoRetorno}
                onValueChange={(value) => {
                  let novoStatus: StatusEquipamento = "DISPONIVEL";
                  if (value === "danificado") novoStatus = "EM_MANUTENCAO";
                  if (value === "descarte") novoStatus = "INATIVO";

                  setFormDataDevolucao({
                    ...formDataDevolucao,
                    condicaoRetorno: value,
                    novostatus: novoStatus,
                  });
                }}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione a condição" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="perfeito">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      Perfeito estado → Disponível
                    </div>
                  </SelectItem>
                  <SelectItem value="bom">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Bom estado → Disponível
                    </div>
                  </SelectItem>
                  <SelectItem value="danificado">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-warning" />
                      Danificado → Manutenção
                    </div>
                  </SelectItem>
                  <SelectItem value="descarte">
                    <div className="flex items-center gap-2">
                      <X className="w-4 h-4 text-destructive" />
                      Para descarte → Inativo
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="dataDevolucao">Data de Devolução</Label>
              <Input
                id="dataDevolucao"
                type="date"
                value={formDataDevolucao.dataDevolucao}
                onChange={(e) =>
                  setFormDataDevolucao({
                    ...formDataDevolucao,
                    dataDevolucao: e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="observacoesDevolucao">Observações</Label>
              <Input
                id="observacoesDevolucao"
                placeholder="Observações sobre a devolução (opcional)"
                value={formDataDevolucao.observacoes}
                onChange={(e) =>
                  setFormDataDevolucao({
                    ...formDataDevolucao,
                    observacoes: e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeModal} disabled={isLoading}>
              Cancelar
            </Button>
            <Button
              onClick={handleDevolucao}
              disabled={!formDataDevolucao.condicaoRetorno || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Confirmar Devolução e Gerar Termo
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Equipamentos;
