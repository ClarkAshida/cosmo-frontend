/* eslint-disable @typescript-eslint/no-unused-vars */
import apiClient from "@/api/apiClient";
import type {
  Departamento,
  DepartamentoPageResponse,
  CreateDepartamentoRequest,
  UpdateDepartamentoRequest,
  DepartamentoQueryParams,
  DepartamentoFilters,
} from "@/types/departamentoTypes";

export const departamentoService = {
  /**
   * Lista todos os departamentos com paginação
   */
  async getDepartamentos(
    params: DepartamentoQueryParams = {}
  ): Promise<DepartamentoPageResponse> {
    const {
      page = 0,
      size = 10,
      sortBy = "nome",
      sortDir = "asc",
      ...filters
    } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDir,
    });

    // Adiciona filtros se existirem
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        queryParams.append(key, value);
      }
    });

    const response = await apiClient.get<DepartamentoPageResponse>(
      `/api/departamentos?${queryParams.toString()}`
    );

    return response.data;
  },

  /**
   * Busca departamentos com filtros específicos
   */
  async filterDepartamentos(
    filters: DepartamentoFilters,
    params: DepartamentoQueryParams = {}
  ): Promise<DepartamentoPageResponse> {
    const { page = 0, size = 10, sortBy = "nome", sortDir = "asc" } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDir,
    });

    // Adiciona filtros
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        queryParams.append(key, value);
      }
    });

    const response = await apiClient.get<DepartamentoPageResponse>(
      `/api/departamentos/filtrar?${queryParams.toString()}`
    );

    return response.data;
  },

  /**
   * Cria um novo departamento
   */
  async createDepartamento(
    departamento: CreateDepartamentoRequest
  ): Promise<Departamento> {
    const response = await apiClient.post<Departamento>(
      "/api/departamentos",
      departamento
    );
    return response.data;
  },

  /**
   * Atualiza um departamento existente
   */
  async updateDepartamento(
    id: number,
    departamento: UpdateDepartamentoRequest
  ): Promise<Departamento> {
    const response = await apiClient.put<Departamento>(
      `/api/departamentos/${id}`,
      departamento
    );
    return response.data;
  },

  /**
   * Exclui um departamento
   */
  async deleteDepartamento(id: number): Promise<void> {
    await apiClient.delete(`/api/departamentos/${id}`);
  },

  /**
   * Busca um departamento específico por ID
   */
  async getDepartamentoById(id: number): Promise<Departamento> {
    const response = await apiClient.get<Departamento>(
      `/api/departamentos/${id}`
    );
    return response.data;
  },

  /**
   * Valida se um departamento pode ser excluído (verifica dependências)
   */
  async validateDelete(
    _id: number
  ): Promise<{ canDelete: boolean; message?: string }> {
    try {
      // Aqui você pode implementar uma validação específica se a API fornecer
      // Por enquanto, assumimos que departamentos podem ter dependências (usuários, equipamentos)
      // que precisam ser verificadas
      return { canDelete: true };
    } catch (_error) {
      return {
        canDelete: false,
        message:
          "Não é possível excluir este departamento pois possui usuários ou equipamentos associados.",
      };
    }
  },

  /**
   * Busca departamentos por nome (busca parcial)
   */
  async searchDepartamentosByNome(
    nome: string,
    params: DepartamentoQueryParams = {}
  ): Promise<DepartamentoPageResponse> {
    return this.filterDepartamentos({ nome }, params);
  },

  /**
   * Obtém estatísticas do departamento (se disponível na API)
   */
  async getDepartamentoStats(
    _id: number
  ): Promise<{ usuariosCount?: number; equipamentosCount?: number }> {
    try {
      // Esta função pode ser implementada quando a API fornecer endpoints de estatísticas
      // Por enquanto retorna dados padrão
      return {};
    } catch (error) {
      console.error("Erro ao obter estatísticas do departamento:", error);
      return {};
    }
  },
};
