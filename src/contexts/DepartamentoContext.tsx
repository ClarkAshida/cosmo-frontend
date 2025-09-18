import React, { createContext, useState, useCallback, useEffect } from "react";
import { departamentoService } from "@/services/departamentoService";
import type {
  DepartamentoContextType,
  Departamento,
  CreateDepartamentoRequest,
  UpdateDepartamentoRequest,
  DepartamentoFilters,
  DepartamentoQueryParams,
} from "@/types/departamentoTypes";

export const DepartamentoContext = createContext<
  DepartamentoContextType | undefined
>(undefined);

interface DepartamentoProviderProps {
  children: React.ReactNode;
}

export const DepartamentoProvider: React.FC<DepartamentoProviderProps> = ({
  children,
}) => {
  // Estado principal
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estado da paginação
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Estado dos filtros
  const [filters, setFilters] = useState<DepartamentoFilters>({});

  // Função para buscar departamentos
  const fetchDepartamentos = useCallback(
    async (params?: DepartamentoQueryParams) => {
      try {
        setLoading(true);
        setError(null);

        const queryParams = {
          page: currentPage,
          size: pageSize,
          sortBy: "nome",
          sortDir: "asc" as const,
          ...filters,
          ...params,
        };

        const response = await departamentoService.getDepartamentos(
          queryParams
        );

        setDepartamentos(response._embedded.departamentos);

        // Atualiza informações de paginação se disponível
        if (response.page) {
          setCurrentPage(response.page.number);
          setTotalPages(response.page.totalPages);
          setTotalElements(response.page.totalElements);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao carregar departamentos";
        setError(errorMessage);
        console.error("Erro ao buscar departamentos:", err);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, pageSize, filters]
  );

  // Função para criar departamento
  const createDepartamento = useCallback(
    async (departamentoData: CreateDepartamentoRequest) => {
      try {
        setLoading(true);
        setError(null);

        await departamentoService.createDepartamento(departamentoData);

        // Recarrega a lista após criação
        await fetchDepartamentos();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao criar departamento";
        setError(errorMessage);
        throw err; // Re-throw para permitir tratamento no componente
      } finally {
        setLoading(false);
      }
    },
    [fetchDepartamentos]
  );

  // Função para atualizar departamento
  const updateDepartamento = useCallback(
    async (id: number, departamentoData: UpdateDepartamentoRequest) => {
      try {
        setLoading(true);
        setError(null);

        await departamentoService.updateDepartamento(id, departamentoData);

        // Recarrega a lista após atualização
        await fetchDepartamentos();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao atualizar departamento";
        setError(errorMessage);
        throw err; // Re-throw para permitir tratamento no componente
      } finally {
        setLoading(false);
      }
    },
    [fetchDepartamentos]
  );

  // Função para deletar departamento
  const deleteDepartamento = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        setError(null);

        await departamentoService.deleteDepartamento(id);

        // Recarrega a lista após exclusão
        await fetchDepartamentos();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao excluir departamento";
        setError(errorMessage);
        throw err; // Re-throw para permitir tratamento no componente
      } finally {
        setLoading(false);
      }
    },
    [fetchDepartamentos]
  );

  // Função para definir filtros
  const setFiltersCallback = useCallback((newFilters: DepartamentoFilters) => {
    setFilters(newFilters);
    setCurrentPage(0); // Reset para primeira página ao filtrar
  }, []);

  // Função para definir página
  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Função para definir tamanho da página
  const setPageSizeCallback = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(0); // Reset para primeira página ao mudar tamanho
  }, []);

  // Função para limpar erro
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Função para recarregar dados
  const refreshData = useCallback(() => {
    return fetchDepartamentos();
  }, [fetchDepartamentos]);

  // Carrega dados iniciais
  useEffect(() => {
    fetchDepartamentos();
  }, [fetchDepartamentos]);

  const contextValue: DepartamentoContextType = {
    departamentos,
    loading,
    error,
    currentPage,
    totalPages,
    totalElements,
    pageSize,
    filters,
    fetchDepartamentos,
    createDepartamento,
    updateDepartamento,
    deleteDepartamento,
    setFilters: setFiltersCallback,
    setPage,
    setPageSize: setPageSizeCallback,
    clearError,
    refreshData,
  };

  return (
    <DepartamentoContext.Provider value={contextValue}>
      {children}
    </DepartamentoContext.Provider>
  );
};
