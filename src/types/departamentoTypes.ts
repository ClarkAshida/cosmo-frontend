// Tipos para a entidade Departamento
export interface Departamento {
  id: number;
  nome: string;
  _links?: {
    self: {
      href: string;
    };
  };
}

// Tipos para criação e edição de departamento
export interface CreateDepartamentoRequest {
  nome: string;
}

export interface UpdateDepartamentoRequest {
  nome: string;
}

// Tipos para filtros
export interface DepartamentoFilters {
  nome?: string;
}

// Tipos para paginação baseados na resposta da API
export interface PaginationLinks {
  self: { href: string };
  first: { href: string };
  last: { href: string };
  next?: { href: string };
  prev?: { href: string };
}

export interface DepartamentoPageResponse {
  _links: PaginationLinks;
  _embedded: {
    departamentos: Departamento[];
  };
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

// Tipos para parâmetros de consulta
export interface DepartamentoQueryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  nome?: string;
}

// Tipo para contexto
export interface DepartamentoContextType {
  // Estado
  departamentos: Departamento[];
  loading: boolean;
  error: string | null;

  // Paginação
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;

  // Filtros
  filters: DepartamentoFilters;

  // Ações
  fetchDepartamentos: (params?: DepartamentoQueryParams) => Promise<void>;
  createDepartamento: (
    departamento: CreateDepartamentoRequest
  ) => Promise<void>;
  updateDepartamento: (
    id: number,
    departamento: UpdateDepartamentoRequest
  ) => Promise<void>;
  deleteDepartamento: (id: number) => Promise<void>;
  setFilters: (filters: DepartamentoFilters) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  clearError: () => void;
  refreshData: () => Promise<void>;
}
