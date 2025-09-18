import { useState } from "react";
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui";
import { PaginationControls } from "@/components/PaginationControls";
import { SearchFilters } from "@/components/SearchFilters";
import { useEmpresa } from "@/hooks/useEmpresa";
import { useDepartamento } from "@/hooks/useDepartamento";
import type { Empresa } from "@/types/empresaTypes";
import type { Departamento } from "@/types/departamentoTypes";
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Building,
  Users,
  AlertTriangle,
  Loader2,
} from "lucide-react";

// Tipos para as entidades (mantidos para compatibilidade)
type SelectedItem = Empresa | Departamento | null;

// Estados para os modais
type ModalType = "none" | "create" | "edit" | "delete";
type EntityType = "departamento" | "empresa";

const Configuracoes = () => {
  // Hooks dos contextos
  const empresaContext = useEmpresa();
  const departamentoContext = useDepartamento();

  const [modalType, setModalType] = useState<ModalType>("none");
  const [entityType, setEntityType] = useState<EntityType>("departamento");
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [formData, setFormData] = useState({ nome: "", estado: "" });
  const [formErrors, setFormErrors] = useState<{
    nome?: string;
    estado?: string;
  }>({});

  // Estados para controle de loading específico
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Funções para abrir modais
  const openCreateModal = (type: EntityType) => {
    setEntityType(type);
    setModalType("create");
    setFormData({ nome: "", estado: "" });
    setSelectedItem(null);
    setFormErrors({});
  };

  const openEditModal = (type: EntityType, item: Empresa | Departamento) => {
    setEntityType(type);
    setModalType("edit");
    setSelectedItem(item);
    setFormData({
      nome: item.nome,
      estado: "estado" in item ? item.estado : "",
    });
    setFormErrors({});
  };

  const openDeleteModal = (type: EntityType, item: Empresa | Departamento) => {
    setEntityType(type);
    setModalType("delete");
    setSelectedItem(item);
  };

  const closeModal = () => {
    setModalType("none");
    setSelectedItem(null);
    setFormData({ nome: "", estado: "" });
    setFormErrors({});
    setIsSubmitting(false);
  };

  // Função de validação
  const validateForm = (): boolean => {
    const errors: { nome?: string; estado?: string } = {};

    if (!formData.nome.trim()) {
      errors.nome = "Nome é obrigatório";
    } else if (formData.nome.trim().length < 2) {
      errors.nome = "Nome deve ter pelo menos 2 caracteres";
    }

    if (entityType === "empresa") {
      if (!formData.estado.trim()) {
        errors.estado = "Estado é obrigatório";
      } else if (formData.estado.trim().length !== 2) {
        errors.estado = "Estado deve ter exatamente 2 caracteres";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Funções CRUD
  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      if (entityType === "departamento") {
        await departamentoContext.createDepartamento({
          nome: formData.nome.trim(),
        });
      } else {
        await empresaContext.createEmpresa({
          nome: formData.nome.trim(),
          estado: formData.estado.trim().toUpperCase(),
        });
      }

      closeModal();
    } catch (error) {
      console.error(`Erro ao criar ${entityType}:`, error);
      // O erro já foi tratado no contexto, apenas mantemos o modal aberto
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedItem || !validateForm()) return;

    try {
      setIsSubmitting(true);

      if (entityType === "departamento") {
        await departamentoContext.updateDepartamento(selectedItem.id, {
          nome: formData.nome.trim(),
        });
      } else {
        await empresaContext.updateEmpresa(selectedItem.id, {
          nome: formData.nome.trim(),
          estado: formData.estado.trim().toUpperCase(),
        });
      }

      closeModal();
    } catch (error) {
      console.error(`Erro ao atualizar ${entityType}:`, error);
      // O erro já foi tratado no contexto, apenas mantemos o modal aberto
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      setIsSubmitting(true);

      if (entityType === "departamento") {
        await departamentoContext.deleteDepartamento(selectedItem.id);
      } else {
        await empresaContext.deleteEmpresa(selectedItem.id);
      }

      closeModal();
    } catch (error) {
      console.error(`Erro ao excluir ${entityType}:`, error);
      // O erro já foi tratado no contexto, apenas mantemos o modal aberto
    } finally {
      setIsSubmitting(false);
    }
  };

  // Componente EntityList reutilizável
  const EntityList = ({
    items,
    type,
    loading,
    error,
  }: {
    items: (Departamento | Empresa)[];
    type: EntityType;
    loading: boolean;
    error: string | null;
  }) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Carregando...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8 text-destructive">
          <AlertTriangle className="w-12 h-12 mx-auto mb-2" />
          <p className="font-medium">Erro ao carregar dados</p>
          <p className="text-sm">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              if (type === "empresa") {
                empresaContext.refreshData();
              } else {
                departamentoContext.refreshData();
              }
            }}
          >
            Tentar Novamente
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                {type === "departamento" ? (
                  <Users className="w-5 h-5 text-primary" />
                ) : (
                  <Building className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <div className="font-medium">{item.nome}</div>
                {"estado" in item && item.estado && (
                  <div className="text-sm text-muted-foreground">
                    Estado: {item.estado}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  ID: {item.id}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openEditModal(type, item)}
                disabled={loading}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => openDeleteModal(type, item)}
                disabled={loading}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="mb-2">
              {type === "departamento" ? (
                <Users className="w-12 h-12 mx-auto text-muted-foreground/50" />
              ) : (
                <Building className="w-12 h-12 mx-auto text-muted-foreground/50" />
              )}
            </div>
            <p>Nenhum {type} encontrado.</p>
            <p className="text-sm">Clique em "Adicionar Novo" para começar.</p>
          </div>
        )}
      </div>
    );
  };

  // Componente ActionHeader reutilizável
  const ActionHeader = ({
    title,
    type,
    onAdd,
  }: {
    title: string;
    type: EntityType;
    onAdd: () => void;
  }) => {
    const context = type === "empresa" ? empresaContext : departamentoContext;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie os dados mestres utilizados em outros cadastros
            </p>
          </div>
          <Button onClick={onAdd} className="gap-2" disabled={context.loading}>
            <Plus className="w-4 h-4" />
            Adicionar Novo
          </Button>
        </div>

        {/* Filtros de busca */}
        <SearchFilters
          filters={context.filters as Record<string, string | undefined>}
          onFiltersChange={(filters) => {
            if (type === "empresa") {
              empresaContext.setFilters(
                filters as import("@/types/empresaTypes").EmpresaFilters
              );
            } else {
              departamentoContext.setFilters(
                filters as import("@/types/departamentoTypes").DepartamentoFilters
              );
            }
          }}
          loading={context.loading}
          fields={
            type === "empresa"
              ? [
                  {
                    key: "nome",
                    label: "Nome da Empresa",
                    placeholder: "Digite o nome da empresa",
                  },
                  {
                    key: "estado",
                    label: "Estado",
                    placeholder: "Ex: SP, RJ, MG",
                    maxLength: 2,
                  },
                ]
              : [
                  {
                    key: "nome",
                    label: "Nome do Departamento",
                    placeholder: "Digite o nome do departamento",
                  },
                ]
          }
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie os dados mestres e configurações do sistema
          </p>
        </div>
      </div>

      {/* Tabs principais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Gerenciamento de Entidades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="departamentos">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="departamentos">Departamentos</TabsTrigger>
              <TabsTrigger value="empresas">Empresas</TabsTrigger>
            </TabsList>

            <TabsContent value="departamentos" className="mt-6">
              <ActionHeader
                title="Gerenciar Departamentos"
                type="departamento"
                onAdd={() => openCreateModal("departamento")}
              />
              <EntityList
                items={departamentoContext.departamentos}
                type="departamento"
                loading={departamentoContext.loading}
                error={departamentoContext.error}
              />

              {/* Paginação para departamentos */}
              {departamentoContext.totalElements > 0 && (
                <PaginationControls
                  currentPage={departamentoContext.currentPage}
                  totalPages={departamentoContext.totalPages}
                  totalElements={departamentoContext.totalElements}
                  pageSize={departamentoContext.pageSize}
                  onPageChange={departamentoContext.setPage}
                  onPageSizeChange={departamentoContext.setPageSize}
                  loading={departamentoContext.loading}
                />
              )}
            </TabsContent>

            <TabsContent value="empresas" className="mt-6">
              <ActionHeader
                title="Gerenciar Empresas"
                type="empresa"
                onAdd={() => openCreateModal("empresa")}
              />
              <EntityList
                items={empresaContext.empresas}
                type="empresa"
                loading={empresaContext.loading}
                error={empresaContext.error}
              />

              {/* Paginação para empresas */}
              {empresaContext.totalElements > 0 && (
                <PaginationControls
                  currentPage={empresaContext.currentPage}
                  totalPages={empresaContext.totalPages}
                  totalElements={empresaContext.totalElements}
                  pageSize={empresaContext.pageSize}
                  onPageChange={empresaContext.setPage}
                  onPageSizeChange={empresaContext.setPageSize}
                  loading={empresaContext.loading}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* FormModal - Modal de Criar/Editar */}
      <Dialog
        open={modalType === "create" || modalType === "edit"}
        onOpenChange={() => closeModal()}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {modalType === "create" ? "Novo" : "Editar"}{" "}
              {entityType === "departamento" ? "Departamento" : "Empresa"}
            </DialogTitle>
            <DialogDescription>
              {modalType === "create"
                ? `Preencha os dados do novo ${
                    entityType === "departamento" ? "departamento" : "empresa"
                  }.`
                : `Altere os dados do ${
                    entityType === "departamento" ? "departamento" : "empresa"
                  }.`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                placeholder={`Nome do ${
                  entityType === "departamento" ? "departamento" : "empresa"
                }`}
                className={`mt-2 ${
                  formErrors.nome ? "border-destructive" : ""
                }`}
                disabled={isSubmitting}
              />
              {formErrors.nome && (
                <p className="text-sm text-destructive mt-1">
                  {formErrors.nome}
                </p>
              )}
            </div>

            {entityType === "empresa" && (
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  value={formData.estado}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      estado: e.target.value.toUpperCase(),
                    })
                  }
                  placeholder="Ex: SP, RJ, MG..."
                  maxLength={2}
                  className={`mt-2 ${
                    formErrors.estado ? "border-destructive" : ""
                  }`}
                  disabled={isSubmitting}
                />
                {formErrors.estado && (
                  <p className="text-sm text-destructive mt-1">
                    {formErrors.estado}
                  </p>
                )}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              onClick={modalType === "create" ? handleCreate : handleUpdate}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {modalType === "create" ? "Criar" : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ConfirmationModal - Modal de Confirmação de Exclusão */}
      <Dialog open={modalType === "delete"} onOpenChange={() => closeModal()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o{" "}
              {entityType === "departamento" ? "departamento" : "empresa"} '
              {selectedItem?.nome}'? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={closeModal}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Confirmar Exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Configuracoes;
