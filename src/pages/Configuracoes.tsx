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
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Building,
  Users,
  AlertTriangle,
} from "lucide-react";

// Tipos para as entidades
interface Departamento {
  id: number;
  nome: string;
  criadoEm: string;
}

interface Empresa {
  id: number;
  nome: string;
  estado: string;
  criadoEm: string;
}

// Tipos auxiliares
type SelectedItem = Departamento | Empresa | null;

// Estados para os modais
type ModalType = "none" | "create" | "edit" | "delete";
type EntityType = "departamento" | "empresa";

const Configuracoes = () => {
  const [modalType, setModalType] = useState<ModalType>("none");
  const [entityType, setEntityType] = useState<EntityType>("departamento");
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const [formData, setFormData] = useState({ nome: "", estado: "" });

  // Dados mockados de departamentos
  const [departamentos, setDepartamentos] = useState<Departamento[]>([
    {
      id: 1,
      nome: "Tecnologia da Informação",
      criadoEm: "2023-01-15",
    },
    {
      id: 2,
      nome: "Recursos Humanos",
      criadoEm: "2023-01-15",
    },
    {
      id: 3,
      nome: "Financeiro",
      criadoEm: "2023-01-15",
    },
    {
      id: 4,
      nome: "Comercial",
      criadoEm: "2023-01-15",
    },
    {
      id: 5,
      nome: "Marketing",
      criadoEm: "2023-01-15",
    },
    {
      id: 6,
      nome: "Operacional",
      criadoEm: "2023-02-20",
    },
  ]);

  // Dados mockados de empresas
  const [empresas, setEmpresas] = useState<Empresa[]>([
    {
      id: 1,
      nome: "Matriz São Paulo",
      estado: "SP",
      criadoEm: "2023-01-15",
    },
    {
      id: 2,
      nome: "Filial Rio de Janeiro",
      estado: "RJ",
      criadoEm: "2023-03-10",
    },
    {
      id: 3,
      nome: "Filial Belo Horizonte",
      estado: "MG",
      criadoEm: "2023-05-20",
    },
  ]);

  // Funções para abrir modais
  const openCreateModal = (type: EntityType) => {
    setEntityType(type);
    setModalType("create");
    setFormData({ nome: "", estado: "" });
    setSelectedItem(null);
  };

  const openEditModal = (type: EntityType, item: Departamento | Empresa) => {
    setEntityType(type);
    setModalType("edit");
    setSelectedItem(item);
    setFormData({
      nome: item.nome,
      estado: "estado" in item ? item.estado : "",
    });
  };

  const openDeleteModal = (type: EntityType, item: Departamento | Empresa) => {
    setEntityType(type);
    setModalType("delete");
    setSelectedItem(item);
  };

  const closeModal = () => {
    setModalType("none");
    setSelectedItem(null);
    setFormData({ nome: "", estado: "" });
  };

  // Funções CRUD
  const handleCreate = () => {
    if (entityType === "departamento") {
      const newDepartamento: Departamento = {
        id: Math.max(...departamentos.map((d) => d.id)) + 1,
        nome: formData.nome,
        criadoEm: new Date().toISOString().split("T")[0],
      };
      setDepartamentos([...departamentos, newDepartamento]);
      // Simular toast: "Departamento 'X' criado com sucesso!"
      console.log(`Departamento '${formData.nome}' criado com sucesso!`);
    } else {
      const newEmpresa: Empresa = {
        id: Math.max(...empresas.map((e) => e.id)) + 1,
        nome: formData.nome,
        estado: formData.estado,
        criadoEm: new Date().toISOString().split("T")[0],
      };
      setEmpresas([...empresas, newEmpresa]);
      // Simular toast: "Empresa 'X' criada com sucesso!"
      console.log(`Empresa '${formData.nome}' criada com sucesso!`);
    }
    closeModal();
  };

  const handleUpdate = () => {
    if (!selectedItem) return;

    if (entityType === "departamento") {
      setDepartamentos(
        departamentos.map((d) =>
          d.id === selectedItem.id ? { ...d, nome: formData.nome } : d
        )
      );
      console.log(`Departamento '${formData.nome}' atualizado com sucesso!`);
    } else {
      setEmpresas(
        empresas.map((e) =>
          e.id === selectedItem.id
            ? { ...e, nome: formData.nome, estado: formData.estado }
            : e
        )
      );
      console.log(`Empresa '${formData.nome}' atualizada com sucesso!`);
    }
    closeModal();
  };

  const handleDelete = () => {
    if (!selectedItem) return;

    if (entityType === "departamento") {
      // Simular verificação de dependências
      const hasUsers = Math.random() > 0.7; // 30% chance de ter usuários
      if (hasUsers) {
        console.log(
          "Erro: Não é possível excluir um departamento que ainda possui usuários ou equipamentos associados."
        );
        return;
      }
      setDepartamentos(departamentos.filter((d) => d.id !== selectedItem.id));
      console.log(`Departamento '${selectedItem.nome}' excluído com sucesso!`);
    } else {
      setEmpresas(empresas.filter((e) => e.id !== selectedItem.id));
      console.log(`Empresa '${selectedItem.nome}' excluída com sucesso!`);
    }
    closeModal();
  };

  // Componente EntityList reutilizável
  const EntityList = ({
    items,
    type,
  }: {
    items: (Departamento | Empresa)[];
    type: EntityType;
  }) => (
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
                Criado em: {new Date(item.criadoEm).toLocaleDateString("pt-BR")}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openEditModal(type, item)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openDeleteModal(type, item)}
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
          <p>Nenhum {type} cadastrado ainda.</p>
          <p className="text-sm">Clique em "Adicionar Novo" para começar.</p>
        </div>
      )}
    </div>
  );

  // Componente ActionHeader reutilizável
  const ActionHeader = ({
    title,
    onAdd,
  }: {
    title: string;
    onAdd: () => void;
  }) => (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">
          Gerencie os dados mestres utilizados em outros cadastros
        </p>
      </div>
      <Button onClick={onAdd} className="gap-2">
        <Plus className="w-4 h-4" />
        Adicionar Novo
      </Button>
    </div>
  );

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
                onAdd={() => openCreateModal("departamento")}
              />
              <EntityList items={departamentos} type="departamento" />
            </TabsContent>

            <TabsContent value="empresas" className="mt-6">
              <ActionHeader
                title="Gerenciar Empresas"
                onAdd={() => openCreateModal("empresa")}
              />
              <EntityList items={empresas} type="empresa" />
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
                className="mt-2"
              />
            </div>

            {entityType === "empresa" && (
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  value={formData.estado}
                  onChange={(e) =>
                    setFormData({ ...formData, estado: e.target.value })
                  }
                  placeholder="Ex: SP, RJ, MG..."
                  maxLength={2}
                  className="mt-2"
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
            <Button
              onClick={modalType === "create" ? handleCreate : handleUpdate}
              disabled={
                !formData.nome || (entityType === "empresa" && !formData.estado)
              }
            >
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
            <Button variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirmar Exclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Configuracoes;
