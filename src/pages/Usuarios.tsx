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
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  Building,
  Mail,
  User,
} from "lucide-react";

// Tipos para definir os status e cargos de usuários
type StatusUsuario = "ATIVO" | "INATIVO";
type CargoUsuario =
  | "DESENVOLVEDOR"
  | "ANALISTA"
  | "GERENTE"
  | "DIRETOR"
  | "ESTAGIARIO"
  | "COORDENADOR";
type DepartamentoUsuario =
  | "TI"
  | "RH"
  | "FINANCEIRO"
  | "COMERCIAL"
  | "MARKETING"
  | "OPERACIONAL";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: CargoUsuario;
  departamento: DepartamentoUsuario;
  status: StatusUsuario;
  telefone?: string;
  dataAdmissao: string;
  dataUltimoAcesso?: string;
}

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("TODOS");
  const [departamentoFilter, setDepartamentoFilter] = useState<string>("TODOS");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Dados simulados de usuários
  const usuarios: Usuario[] = [
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@empresa.com",
      cargo: "DESENVOLVEDOR",
      departamento: "TI",
      status: "ATIVO",
      telefone: "(11) 99999-1111",
      dataAdmissao: "2023-01-15",
      dataUltimoAcesso: "2024-07-30 14:30:00",
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria.santos@empresa.com",
      cargo: "ANALISTA",
      departamento: "TI",
      status: "ATIVO",
      telefone: "(11) 99999-2222",
      dataAdmissao: "2023-03-10",
      dataUltimoAcesso: "2024-07-30 09:15:00",
    },
    {
      id: 3,
      nome: "Carlos Lima",
      email: "carlos.lima@empresa.com",
      cargo: "GERENTE",
      departamento: "TI",
      status: "ATIVO",
      telefone: "(11) 99999-3333",
      dataAdmissao: "2022-08-20",
      dataUltimoAcesso: "2024-07-29 16:45:00",
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana.costa@empresa.com",
      cargo: "ANALISTA",
      departamento: "RH",
      status: "INATIVO",
      telefone: "(11) 99999-4444",
      dataAdmissao: "2023-05-12",
      dataUltimoAcesso: "2024-06-15 11:20:00",
    },
    {
      id: 5,
      nome: "Pedro Oliveira",
      email: "pedro.oliveira@empresa.com",
      cargo: "DESENVOLVEDOR",
      departamento: "TI",
      status: "ATIVO",
      telefone: "(11) 99999-5555",
      dataAdmissao: "2023-07-08",
      dataUltimoAcesso: "2024-07-30 13:10:00",
    },
    {
      id: 6,
      nome: "Fernanda Lima",
      email: "fernanda.lima@empresa.com",
      cargo: "COORDENADOR",
      departamento: "MARKETING",
      status: "ATIVO",
      telefone: "(11) 99999-6666",
      dataAdmissao: "2022-11-20",
      dataUltimoAcesso: "2024-07-30 10:30:00",
    },
    {
      id: 7,
      nome: "Rafael Mendes",
      email: "rafael.mendes@empresa.com",
      cargo: "DIRETOR",
      departamento: "COMERCIAL",
      status: "ATIVO",
      telefone: "(11) 99999-7777",
      dataAdmissao: "2021-04-15",
      dataUltimoAcesso: "2024-07-30 08:00:00",
    },
    {
      id: 8,
      nome: "Lucas Ferreira",
      email: "lucas.ferreira@empresa.com",
      cargo: "ESTAGIARIO",
      departamento: "TI",
      status: "ATIVO",
      telefone: "(11) 99999-8888",
      dataAdmissao: "2024-02-01",
      dataUltimoAcesso: "2024-07-30 15:20:00",
    },
    {
      id: 9,
      nome: "Camila Rodrigues",
      email: "camila.rodrigues@empresa.com",
      cargo: "ANALISTA",
      departamento: "FINANCEIRO",
      status: "ATIVO",
      telefone: "(11) 99999-9999",
      dataAdmissao: "2023-09-12",
      dataUltimoAcesso: "2024-07-30 12:45:00",
    },
    {
      id: 10,
      nome: "Bruno Alves",
      email: "bruno.alves@empresa.com",
      cargo: "DESENVOLVEDOR",
      departamento: "TI",
      status: "INATIVO",
      telefone: "(11) 99999-0000",
      dataAdmissao: "2022-06-30",
      dataUltimoAcesso: "2024-05-20 17:30:00",
    },
    {
      id: 11,
      nome: "Juliana Pereira",
      email: "juliana.pereira@empresa.com",
      cargo: "GERENTE",
      departamento: "RH",
      status: "ATIVO",
      telefone: "(11) 98888-1111",
      dataAdmissao: "2021-10-05",
      dataUltimoAcesso: "2024-07-30 11:15:00",
    },
    {
      id: 12,
      nome: "Roberto Silva",
      email: "roberto.silva@empresa.com",
      cargo: "COORDENADOR",
      departamento: "OPERACIONAL",
      status: "ATIVO",
      telefone: "(11) 98888-2222",
      dataAdmissao: "2023-01-20",
      dataUltimoAcesso: "2024-07-29 14:00:00",
    },
  ];

  // Função para obter ícone baseado no departamento
  const getDepartamentoIcon = (departamento: DepartamentoUsuario) => {
    switch (departamento) {
      case "TI":
        return User;
      case "RH":
        return Users;
      case "FINANCEIRO":
        return Building;
      case "COMERCIAL":
        return Building;
      case "MARKETING":
        return Building;
      case "OPERACIONAL":
        return Building;
      default:
        return Building;
    }
  };

  // Função para obter badge de status com cores
  const getStatusBadge = (status: StatusUsuario) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium gap-1";

    switch (status) {
      case "ATIVO":
        return {
          classes: `${baseClasses} bg-success/10 text-success border border-success/20`,
          icon: CheckCircle,
          label: "Ativo",
        };
      case "INATIVO":
        return {
          classes: `${baseClasses} bg-danger/10 text-danger border border-danger/20`,
          icon: XCircle,
          label: "Inativo",
        };
      default:
        return {
          classes: `${baseClasses} bg-muted text-muted-foreground`,
          icon: XCircle,
          label: status,
        };
    }
  };

  // Função para obter cor do cargo
  const getCargoColor = (cargo: CargoUsuario) => {
    switch (cargo) {
      case "DIRETOR":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "GERENTE":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "COORDENADOR":
        return "text-indigo-600 bg-indigo-50 border-indigo-200";
      case "ANALISTA":
        return "text-green-600 bg-green-50 border-green-200";
      case "DESENVOLVEDOR":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "ESTAGIARIO":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  // Função para obter ação baseada no status
  const getStatusAction = (usuario: Usuario) => {
    if (usuario.status === "ATIVO") {
      return {
        label: "Desativar",
        variant: "destructive" as const,
        icon: UserX,
        action: () => console.log(`Desativar usuário ${usuario.nome}`),
      };
    } else {
      return {
        label: "Reativar",
        variant: "default" as const,
        icon: UserCheck,
        action: () => console.log(`Reativar usuário ${usuario.nome}`),
      };
    }
  };

  // Filtros aplicados
  const filteredUsuarios = usuarios.filter((usuario) => {
    const matchesSearch =
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "TODOS" || usuario.status === statusFilter;
    const matchesDepartamento =
      departamentoFilter === "TODOS" ||
      usuario.departamento === departamentoFilter;

    return matchesSearch && matchesStatus && matchesDepartamento;
  });

  // Cálculos de paginação
  const totalItems = filteredUsuarios.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredUsuarios.slice(startIndex, endIndex);

  // Reset da página atual quando filtros mudam
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, departamentoFilter]);

  // Função para gerar números das páginas a serem exibidas
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

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie a base de colaboradores da empresa
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Usuário
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
              <Label htmlFor="search">Buscar usuários</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="search"
                  placeholder="Nome ou email..."
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
                  <SelectItem value="ATIVO">Ativo</SelectItem>
                  <SelectItem value="INATIVO">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Departamento */}
            <div>
              <Label htmlFor="departamento-filter">Departamento</Label>
              <Select
                value={departamentoFilter}
                onValueChange={setDepartamentoFilter}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Todos os departamentos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="TI">TI</SelectItem>
                  <SelectItem value="RH">RH</SelectItem>
                  <SelectItem value="FINANCEIRO">Financeiro</SelectItem>
                  <SelectItem value="COMERCIAL">Comercial</SelectItem>
                  <SelectItem value="MARKETING">Marketing</SelectItem>
                  <SelectItem value="OPERACIONAL">Operacional</SelectItem>
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
            <CardTitle>Base de Colaboradores ({totalItems} usuários)</CardTitle>
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
                  <TableHead className="w-12">Depto</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((usuario) => {
                  const DepartamentoIcon = getDepartamentoIcon(
                    usuario.departamento
                  );
                  const statusBadge = getStatusBadge(usuario.status);
                  const StatusIcon = statusBadge.icon;
                  const statusAction = getStatusAction(usuario);
                  const cargoColor = getCargoColor(usuario.cargo);

                  return (
                    <TableRow key={usuario.id}>
                      <TableCell>
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/50">
                          <DepartamentoIcon className="w-4 h-4 text-primary" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{usuario.nome}</div>
                          {usuario.telefone && (
                            <div className="text-xs text-muted-foreground">
                              {usuario.telefone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{usuario.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cargoColor}`}
                        >
                          {usuario.cargo}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-foreground">
                          {usuario.departamento}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={statusBadge.classes}>
                          <StatusIcon className="w-3 h-3" />
                          {statusBadge.label}
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
                          <Button variant="ghost" size="sm" title="Editar">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant={statusAction.variant}
                            size="sm"
                            onClick={statusAction.action}
                            className="gap-1"
                            title={statusAction.label}
                          >
                            <statusAction.icon className="w-4 h-4" />
                            {statusAction.label}
                          </Button>
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
                {totalItems} usuários
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
          {filteredUsuarios.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum usuário encontrado
              </h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros ou adicionar novos usuários.
              </p>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Cadastrar Primeiro Usuário
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Usuarios;
