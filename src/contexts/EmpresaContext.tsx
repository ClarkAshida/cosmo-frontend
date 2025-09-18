import React, { createContext, useState, useCallback, useEffect } from "react";
import { empresaService } from "@/services/empresaService";
import type {
  EmpresaContextType,
  Empresa,
  CreateEmpresaRequest,
  UpdateEmpresaRequest,
  EmpresaFilters,
  EmpresaQueryParams,
} from "@/types/empresaTypes";

// Cria o contexto de empresa
export const EmpresaContext = createContext<EmpresaContextType | undefined>(
  undefined
);

interface EmpresaProviderProps {
  children: React.ReactNode;
}

export const EmpresaProvider: React.FC<EmpresaProviderProps> = ({
  children,
}) => {
  // Estado principal
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estado da paginação
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Estado dos filtros
  const [filters, setFilters] = useState<EmpresaFilters>({});

  // Função para buscar empresas
  const fetchEmpresas = useCallback(
    async (params?: EmpresaQueryParams) => {
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

        const response = await empresaService.getEmpresas(queryParams);

        setEmpresas(response._embedded.empresas);

        // Atualiza informações de paginação se disponível
        if (response.page) {
          setCurrentPage(response.page.number);
          setTotalPages(response.page.totalPages);
          setTotalElements(response.page.totalElements);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao carregar empresas";
        setError(errorMessage);
        console.error("Erro ao buscar empresas:", err);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, pageSize, filters]
  );

  // Função para criar empresa
  const createEmpresa = useCallback(
    async (empresaData: CreateEmpresaRequest) => {
      try {
        setLoading(true);
        setError(null);

        await empresaService.createEmpresa(empresaData);

        // Recarrega a lista após criação
        await fetchEmpresas();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao criar empresa";
        setError(errorMessage);
        throw err; // Re-throw para permitir tratamento no componente
      } finally {
        setLoading(false);
      }
    },
    [fetchEmpresas]
  );

  // Função para atualizar empresa
  const updateEmpresa = useCallback(
    async (id: number, empresaData: UpdateEmpresaRequest) => {
      try {
        setLoading(true);
        setError(null);

        await empresaService.updateEmpresa(id, empresaData);

        // Recarrega a lista após atualização
        await fetchEmpresas();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao atualizar empresa";
        setError(errorMessage);
        throw err; // Re-throw para permitir tratamento no componente
      } finally {
        setLoading(false);
      }
    },
    [fetchEmpresas]
  );

  // Função para deletar empresa
  const deleteEmpresa = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        setError(null);

        await empresaService.deleteEmpresa(id);

        // Recarrega a lista após exclusão
        await fetchEmpresas();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao excluir empresa";
        setError(errorMessage);
        throw err; // Re-throw para permitir tratamento no componente
      } finally {
        setLoading(false);
      }
    },
    [fetchEmpresas]
  );

  // Função para definir filtros
  const setFiltersCallback = useCallback((newFilters: EmpresaFilters) => {
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
    return fetchEmpresas();
  }, [fetchEmpresas]);

  // Carrega dados iniciais
  useEffect(() => {
    fetchEmpresas();
  }, [fetchEmpresas]);

  const contextValue: EmpresaContextType = {
    empresas,
    loading,
    error,
    currentPage,
    totalPages,
    totalElements,
    pageSize,
    filters,
    fetchEmpresas,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
    setFilters: setFiltersCallback,
    setPage,
    setPageSize: setPageSizeCallback,
    clearError,
    refreshData,
  };

  return (
    <EmpresaContext.Provider value={contextValue}>
      {children}
    </EmpresaContext.Provider>
  );
};
