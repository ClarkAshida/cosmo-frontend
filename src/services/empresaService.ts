/* eslint-disable @typescript-eslint/no-unused-vars */
import apiClient from "@/api/apiClient";
import type {
  Empresa,
  EmpresaPageResponse,
  CreateEmpresaRequest,
  UpdateEmpresaRequest,
  EmpresaQueryParams,
  EmpresaFilters,
} from "@/types/empresaTypes";

export const empresaService = {
  /**
   * Lista todas as empresas com paginação
   */
  async getEmpresas(
    params: EmpresaQueryParams = {}
  ): Promise<EmpresaPageResponse> {
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

    const response = await apiClient.get<EmpresaPageResponse>(
      `/api/empresas?${queryParams.toString()}`
    );

    return response.data;
  },

  /**
   * Busca empresas com filtros específicos
   */
  async filterEmpresas(
    filters: EmpresaFilters,
    params: EmpresaQueryParams = {}
  ): Promise<EmpresaPageResponse> {
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

    const response = await apiClient.get<EmpresaPageResponse>(
      `/api/empresas/filtrar?${queryParams.toString()}`
    );

    return response.data;
  },

  /**
   * Cria uma nova empresa
   */
  async createEmpresa(empresa: CreateEmpresaRequest): Promise<Empresa> {
    const response = await apiClient.post<Empresa>("/api/empresas", empresa);
    return response.data;
  },

  /**
   * Atualiza uma empresa existente
   */
  async updateEmpresa(
    id: number,
    empresa: UpdateEmpresaRequest
  ): Promise<Empresa> {
    const response = await apiClient.put<Empresa>(
      `/api/empresas/${id}`,
      empresa
    );
    return response.data;
  },

  /**
   * Exclui uma empresa
   */
  async deleteEmpresa(id: number): Promise<void> {
    await apiClient.delete(`/api/empresas/${id}`);
  },

  /**
   * Busca uma empresa específica por ID
   */
  async getEmpresaById(id: number): Promise<Empresa> {
    const response = await apiClient.get<Empresa>(`/api/empresas/${id}`);
    return response.data;
  },

  /**
   * Valida se uma empresa pode ser excluída (verifica dependências)
   */
  async validateDelete(
    id: number
  ): Promise<{ canDelete: boolean; message?: string }> {
    try {
      // Aqui você pode implementar uma validação específica se a API fornecer
      // Por enquanto, assumimos que todas as empresas podem ser excluídas
      return { canDelete: true };
    } catch (error) {
      return {
        canDelete: false,
        message:
          "Não é possível excluir esta empresa pois possui dependências.",
      };
    }
  },

  /**
   * Busca empresas por estado
   */
  async getEmpresasByEstado(
    estado: string,
    params: EmpresaQueryParams = {}
  ): Promise<EmpresaPageResponse> {
    return this.filterEmpresas({ estado }, params);
  },

  /**
   * Busca empresas por nome (busca parcial)
   */
  async searchEmpresasByNome(
    nome: string,
    params: EmpresaQueryParams = {}
  ): Promise<EmpresaPageResponse> {
    return this.filterEmpresas({ nome }, params);
  },
};
