// Tipos para a entidade Empresa
export interface Empresa {
  id: number;
  nome: string;
  estado: string;
  _links?: {
    self: {
      href: string;
    };
  };
}

// Tipos para criação e edição de empresa
export interface CreateEmpresaRequest {
  nome: string;
  estado: string;
}

export interface UpdateEmpresaRequest {
  nome: string;
  estado: string;
}

// Tipos para filtros
export interface EmpresaFilters {
  nome?: string;
  estado?: string;
}

// Tipos para paginação baseados na resposta da API
export interface PaginationLinks {
  self: { href: string };
  first: { href: string };
  last: { href: string };
  next?: { href: string };
  prev?: { href: string };
}

export interface EmpresaPageResponse {
  _links: PaginationLinks;
  _embedded: {
    empresas: Empresa[];
  };
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

// Tipos para parâmetros de consulta
export interface EmpresaQueryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  nome?: string;
  estado?: string;
}

// Tipo para contexto
export interface EmpresaContextType {
  // Estado
  empresas: Empresa[];
  loading: boolean;
  error: string | null;

  // Paginação
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;

  // Filtros
  filters: EmpresaFilters;

  // Ações
  fetchEmpresas: (params?: EmpresaQueryParams) => Promise<void>;
  createEmpresa: (empresa: CreateEmpresaRequest) => Promise<void>;
  updateEmpresa: (id: number, empresa: UpdateEmpresaRequest) => Promise<void>;
  deleteEmpresa: (id: number) => Promise<void>;
  setFilters: (filters: EmpresaFilters) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  clearError: () => void;
  refreshData: () => Promise<void>;
}
