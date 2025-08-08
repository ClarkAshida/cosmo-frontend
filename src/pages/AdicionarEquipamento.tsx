import { useState } from "react";
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
} from "@/components/ui";
import {
  Smartphone,
  Laptop,
  Monitor,
  CreditCard,
  Save,
  ArrowLeft,
  Printer,
  Package,
  Loader2,
  Cpu,
  Building,
  Users,
  FileText,
} from "lucide-react";

// Tipos para os equipamentos
type EquipmentType =
  | "notebook"
  | "celular"
  | "monitor"
  | "chip"
  | "impressora"
  | "outros";

interface BaseFormData {
  // Informações Gerais (Campos Comuns)
  numeroPatrimonio: string;
  numeroSerie: string;
  marca: string;
  modelo: string;
  status: string;
  estadoConservacao: string;
  valor: string;
  notaFiscal: string;
  empresaId: string;
  departamentoId: string;
}

const AdicionarEquipamento = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<EquipmentType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estado inicial do formulário
  const [formData, setFormData] = useState<BaseFormData>({
    numeroPatrimonio: "",
    numeroSerie: "",
    marca: "",
    modelo: "",
    status: "DISPONIVEL",
    estadoConservacao: "NOVO",
    valor: "",
    notaFiscal: "",
    empresaId: "",
    departamentoId: "",
  });

  // Estados específicos para cada tipo
  const [notebookData, setNotebookData] = useState({
    sistemaOperacional: "",
    processador: "",
    memoriaRam: "",
    armazenamento: "",
    hostname: "",
    enderecoMac: "",
  });

  const [celularData, setCelularData] = useState({
    imei: "",
    eid: "",
    capacidadeArmazenamento: "",
    sistemaOperacional: "",
  });

  const [monitorData, setMonitorData] = useState({
    tamanhoTela: "",
    resolucao: "",
    tipoConexao: "",
    taxaAtualizacao: "",
  });

  const [chipData, setChipData] = useState({
    numero: "",
    operadora: "",
    plano: "",
    iccid: "",
  });

  const [impressoraData, setImpressoraData] = useState({
    tipoImpressao: "",
    conectividade: "",
    velocidadeImpressao: "",
    capacidadePapel: "",
  });

  // Dados simulados
  const empresas = [
    { id: "1", nome: "Matriz São Paulo" },
    { id: "2", nome: "Filial Rio de Janeiro" },
    { id: "3", nome: "Filial Belo Horizonte" },
  ];

  const departamentos = [
    { id: "1", nome: "Tecnologia da Informação" },
    { id: "2", nome: "Recursos Humanos" },
    { id: "3", nome: "Financeiro" },
    { id: "4", nome: "Comercial" },
    { id: "5", nome: "Marketing" },
  ];

  // Tipos de equipamentos com ícones e descrições
  const equipmentTypes = [
    {
      value: "notebook" as EquipmentType,
      label: "Notebook",
      icon: Laptop,
      description: "Computadores portáteis, laptops",
      color: "bg-blue-500",
    },
    {
      value: "celular" as EquipmentType,
      label: "Celular",
      icon: Smartphone,
      description: "Smartphones, telefones móveis",
      color: "bg-green-500",
    },
    {
      value: "monitor" as EquipmentType,
      label: "Monitor",
      icon: Monitor,
      description: "Monitores, telas externas",
      color: "bg-purple-500",
    },
    {
      value: "chip" as EquipmentType,
      label: "Chip",
      icon: CreditCard,
      description: "Chips de celular, cartões SIM",
      color: "bg-orange-500",
    },
    {
      value: "impressora" as EquipmentType,
      label: "Impressora",
      icon: Printer,
      description: "Impressoras, multifuncionais",
      color: "bg-red-500",
    },
    {
      value: "outros" as EquipmentType,
      label: "Outros",
      icon: Package,
      description: "Outros tipos de equipamentos",
      color: "bg-gray-500",
    },
  ];

  // Opções para selects
  const statusOptions = [
    { value: "DISPONIVEL", label: "Disponível" },
    { value: "EM_USO", label: "Em Uso" },
    { value: "EM_MANUTENCAO", label: "Em Manutenção" },
    { value: "INATIVO", label: "Inativo" },
  ];

  const estadoConservacaoOptions = [
    { value: "NOVO", label: "Novo" },
    { value: "OTIMO", label: "Ótimo" },
    { value: "BOM", label: "Bom" },
    { value: "REGULAR", label: "Regular" },
    { value: "RUIM", label: "Ruim" },
  ];

  // Handlers
  const handleTypeSelect = (type: EquipmentType) => {
    setSelectedType(type);
  };

  const handleBack = () => {
    if (selectedType) {
      setSelectedType(null);
    } else {
      navigate("/equipamentos");
    }
  };

  const handleInputChange = (field: keyof BaseFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpecificInputChange = (field: string, value: string) => {
    switch (selectedType) {
      case "notebook":
        setNotebookData((prev) => ({ ...prev, [field]: value }));
        break;
      case "celular":
        setCelularData((prev) => ({ ...prev, [field]: value }));
        break;
      case "monitor":
        setMonitorData((prev) => ({ ...prev, [field]: value }));
        break;
      case "chip":
        setChipData((prev) => ({ ...prev, [field]: value }));
        break;
      case "impressora":
        setImpressoraData((prev) => ({ ...prev, [field]: value }));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Montar DTO específico baseado no tipo
      let equipmentDTO;
      let endpoint;

      switch (selectedType) {
        case "notebook":
          equipmentDTO = { ...formData, ...notebookData };
          endpoint = "/api/equipamentos/notebook";
          break;
        case "celular":
          equipmentDTO = { ...formData, ...celularData };
          endpoint = "/api/equipamentos/celular";
          break;
        case "monitor":
          equipmentDTO = { ...formData, ...monitorData };
          endpoint = "/api/equipamentos/monitor";
          break;
        case "chip":
          equipmentDTO = { ...formData, ...chipData };
          endpoint = "/api/equipamentos/chip";
          break;
        case "impressora":
          equipmentDTO = { ...formData, ...impressoraData };
          endpoint = "/api/equipamentos/impressora";
          break;
        default:
          equipmentDTO = formData;
          endpoint = "/api/equipamentos";
      }

      console.log("Enviando para:", endpoint);
      console.log("Dados:", equipmentDTO);

      // Simular chamada da API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simular ID do equipamento criado
      const equipamentoId = Math.floor(Math.random() * 1000) + 1;

      // Toast de sucesso (simulado)
      console.log(
        `✅ ${equipmentTypes.find((t) => t.value === selectedType)?.label} ${
          formData.marca
        } ${formData.modelo} cadastrado com sucesso!`
      );

      // Redirecionar para detalhes do equipamento
      navigate(`/equipamentos/${equipamentoId}`);
    } catch (error) {
      console.error("Erro ao cadastrar equipamento:", error);
      // Aqui seria mostrado toast de erro
    } finally {
      setIsLoading(false);
    }
  };

  // Componente TypeSelectorGrid
  const TypeSelectorGrid = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Qual tipo de equipamento você deseja cadastrar?
        </h2>
        <p className="text-muted-foreground">
          Selecione o tipo para continuar com o formulário específico
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipmentTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card
              key={type.value}
              className="cursor-pointer transition-all hover:shadow-medium hover:border-primary/20 group"
              onClick={() => handleTypeSelect(type.value)}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 ${type.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {type.label}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  // Componente DynamicEquipmentForm
  const DynamicEquipmentForm = () => {
    const selectedTypeInfo = equipmentTypes.find(
      (t) => t.value === selectedType
    );
    const Icon = selectedTypeInfo?.icon || Package;

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header do Formulário */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-12 h-12 ${selectedTypeInfo?.color} rounded-lg flex items-center justify-center`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Cadastrar {selectedTypeInfo?.label}
            </h2>
            <p className="text-sm text-muted-foreground">
              Preencha as informações abaixo para cadastrar o equipamento
            </p>
          </div>
        </div>

        {/* Seção: Informações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Informações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numeroPatrimonio">Número do Patrimônio *</Label>
                <Input
                  id="numeroPatrimonio"
                  placeholder="Ex: NB001, CEL002, MON003"
                  value={formData.numeroPatrimonio}
                  onChange={(e) =>
                    handleInputChange("numeroPatrimonio", e.target.value)
                  }
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="numeroSerie">Número de Série *</Label>
                <Input
                  id="numeroSerie"
                  placeholder="Ex: ABC123456789"
                  value={formData.numeroSerie}
                  onChange={(e) =>
                    handleInputChange("numeroSerie", e.target.value)
                  }
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marca">Marca *</Label>
                <Input
                  id="marca"
                  placeholder="Ex: Dell, Samsung, Apple"
                  value={formData.marca}
                  onChange={(e) => handleInputChange("marca", e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="modelo">Modelo *</Label>
                <Input
                  id="modelo"
                  placeholder="Ex: Inspiron 15 3000, Galaxy A54"
                  value={formData.modelo}
                  onChange={(e) => handleInputChange("modelo", e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="estadoConservacao">Estado de Conservação</Label>
                <Select
                  value={formData.estadoConservacao}
                  onValueChange={(value) =>
                    handleInputChange("estadoConservacao", value)
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {estadoConservacaoOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="valor">Valor (R$) *</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  placeholder="Ex: 2500.00"
                  value={formData.valor}
                  onChange={(e) => handleInputChange("valor", e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="empresaId">Empresa *</Label>
                <Select
                  value={formData.empresaId}
                  onValueChange={(value) =>
                    handleInputChange("empresaId", value)
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione a empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {empresas.map((empresa) => (
                      <SelectItem key={empresa.id} value={empresa.id}>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {empresa.nome}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="departamentoId">Departamento *</Label>
                <Select
                  value={formData.departamentoId}
                  onValueChange={(value) =>
                    handleInputChange("departamentoId", value)
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione o departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departamentos.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {dept.nome}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notaFiscal">Nota Fiscal</Label>
              <Input
                id="notaFiscal"
                placeholder="Número da nota fiscal (opcional)"
                value={formData.notaFiscal}
                onChange={(e) =>
                  handleInputChange("notaFiscal", e.target.value)
                }
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Seção: Especificações Técnicas */}
        {renderSpecificFields()}

        {/* Botões de Ação */}
        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <Button
            type="submit"
            disabled={
              isLoading ||
              !formData.numeroPatrimonio ||
              !formData.marca ||
              !formData.modelo ||
              !formData.valor ||
              !formData.empresaId ||
              !formData.departamentoId
            }
            className="flex-1 gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar Equipamento
              </>
            )}
          </Button>
        </div>
      </form>
    );
  };

  // Renderizar campos específicos baseado no tipo
  const renderSpecificFields = () => {
    const commonClasses = "mt-2";

    switch (selectedType) {
      case "notebook":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                Especificações Técnicas - Notebook
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sistemaOperacional">
                    Sistema Operacional
                  </Label>
                  <Select
                    value={notebookData.sistemaOperacional}
                    onValueChange={(value) =>
                      handleSpecificInputChange("sistemaOperacional", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione o SO" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="windows-11">Windows 11</SelectItem>
                      <SelectItem value="windows-10">Windows 10</SelectItem>
                      <SelectItem value="ubuntu">Ubuntu</SelectItem>
                      <SelectItem value="macos">macOS</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="processador">Processador</Label>
                  <Input
                    id="processador"
                    placeholder="Ex: Intel Core i5-11400H"
                    value={notebookData.processador}
                    onChange={(e) =>
                      handleSpecificInputChange("processador", e.target.value)
                    }
                    className={commonClasses}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="memoriaRam">Memória RAM</Label>
                  <Select
                    value={notebookData.memoriaRam}
                    onValueChange={(value) =>
                      handleSpecificInputChange("memoriaRam", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione a RAM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4gb">4 GB</SelectItem>
                      <SelectItem value="8gb">8 GB</SelectItem>
                      <SelectItem value="16gb">16 GB</SelectItem>
                      <SelectItem value="32gb">32 GB</SelectItem>
                      <SelectItem value="64gb">64 GB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="armazenamento">Armazenamento</Label>
                  <Select
                    value={notebookData.armazenamento}
                    onValueChange={(value) =>
                      handleSpecificInputChange("armazenamento", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione o armazenamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="256gb-ssd">256 GB SSD</SelectItem>
                      <SelectItem value="512gb-ssd">512 GB SSD</SelectItem>
                      <SelectItem value="1tb-ssd">1 TB SSD</SelectItem>
                      <SelectItem value="1tb-hdd">1 TB HDD</SelectItem>
                      <SelectItem value="2tb-hdd">2 TB HDD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hostname">Hostname</Label>
                  <Input
                    id="hostname"
                    placeholder="Ex: NB-JOAO-001"
                    value={notebookData.hostname}
                    onChange={(e) =>
                      handleSpecificInputChange("hostname", e.target.value)
                    }
                    className={commonClasses}
                  />
                </div>
                <div>
                  <Label htmlFor="enderecoMac">Endereço MAC</Label>
                  <Input
                    id="enderecoMac"
                    placeholder="Ex: 00:1B:44:11:3A:B7"
                    value={notebookData.enderecoMac}
                    onChange={(e) =>
                      handleSpecificInputChange("enderecoMac", e.target.value)
                    }
                    className={commonClasses}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "celular":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Especificações Técnicas - Celular
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="imei">IMEI *</Label>
                  <Input
                    id="imei"
                    placeholder="Ex: 123456789012345"
                    value={celularData.imei}
                    onChange={(e) =>
                      handleSpecificInputChange("imei", e.target.value)
                    }
                    required
                    className={commonClasses}
                  />
                </div>
                <div>
                  <Label htmlFor="eid">EID (eSIM)</Label>
                  <Input
                    id="eid"
                    placeholder="Ex: 89049032000000000000000000000001"
                    value={celularData.eid}
                    onChange={(e) =>
                      handleSpecificInputChange("eid", e.target.value)
                    }
                    className={commonClasses}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacidadeArmazenamento">
                    Capacidade de Armazenamento
                  </Label>
                  <Select
                    value={celularData.capacidadeArmazenamento}
                    onValueChange={(value) =>
                      handleSpecificInputChange(
                        "capacidadeArmazenamento",
                        value
                      )
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione a capacidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="64gb">64 GB</SelectItem>
                      <SelectItem value="128gb">128 GB</SelectItem>
                      <SelectItem value="256gb">256 GB</SelectItem>
                      <SelectItem value="512gb">512 GB</SelectItem>
                      <SelectItem value="1tb">1 TB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sistemaOperacionalCelular">
                    Sistema Operacional
                  </Label>
                  <Select
                    value={celularData.sistemaOperacional}
                    onValueChange={(value) =>
                      handleSpecificInputChange("sistemaOperacional", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione o SO" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="android">Android</SelectItem>
                      <SelectItem value="ios">iOS</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "monitor":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Especificações Técnicas - Monitor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tamanhoTela">Tamanho da Tela</Label>
                  <Select
                    value={monitorData.tamanhoTela}
                    onValueChange={(value) =>
                      handleSpecificInputChange("tamanhoTela", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione o tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="19">19"</SelectItem>
                      <SelectItem value="21.5">21.5"</SelectItem>
                      <SelectItem value="24">24"</SelectItem>
                      <SelectItem value="27">27"</SelectItem>
                      <SelectItem value="32">32"</SelectItem>
                      <SelectItem value="ultrawide">Ultrawide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="resolucao">Resolução</Label>
                  <Select
                    value={monitorData.resolucao}
                    onValueChange={(value) =>
                      handleSpecificInputChange("resolucao", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione a resolução" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1080p">1920x1080 (Full HD)</SelectItem>
                      <SelectItem value="1440p">2560x1440 (QHD)</SelectItem>
                      <SelectItem value="4k">3840x2160 (4K)</SelectItem>
                      <SelectItem value="ultrawide">
                        3440x1440 (Ultrawide)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipoConexao">Tipo de Conexão</Label>
                  <Select
                    value={monitorData.tipoConexao}
                    onValueChange={(value) =>
                      handleSpecificInputChange("tipoConexao", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione a conexão" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hdmi">HDMI</SelectItem>
                      <SelectItem value="displayport">DisplayPort</SelectItem>
                      <SelectItem value="vga">VGA</SelectItem>
                      <SelectItem value="dvi">DVI</SelectItem>
                      <SelectItem value="usb-c">USB-C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="taxaAtualizacao">Taxa de Atualização</Label>
                  <Select
                    value={monitorData.taxaAtualizacao}
                    onValueChange={(value) =>
                      handleSpecificInputChange("taxaAtualizacao", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione a taxa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60hz">60 Hz</SelectItem>
                      <SelectItem value="75hz">75 Hz</SelectItem>
                      <SelectItem value="120hz">120 Hz</SelectItem>
                      <SelectItem value="144hz">144 Hz</SelectItem>
                      <SelectItem value="240hz">240 Hz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "chip":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Especificações Técnicas - Chip
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numero">Número *</Label>
                  <Input
                    id="numero"
                    placeholder="Ex: (11) 99999-9999"
                    value={chipData.numero}
                    onChange={(e) =>
                      handleSpecificInputChange("numero", e.target.value)
                    }
                    required
                    className={commonClasses}
                  />
                </div>
                <div>
                  <Label htmlFor="operadora">Operadora</Label>
                  <Select
                    value={chipData.operadora}
                    onValueChange={(value) =>
                      handleSpecificInputChange("operadora", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione a operadora" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vivo">Vivo</SelectItem>
                      <SelectItem value="claro">Claro</SelectItem>
                      <SelectItem value="tim">TIM</SelectItem>
                      <SelectItem value="oi">Oi</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plano">Plano</Label>
                  <Input
                    id="plano"
                    placeholder="Ex: Controle 50GB"
                    value={chipData.plano}
                    onChange={(e) =>
                      handleSpecificInputChange("plano", e.target.value)
                    }
                    className={commonClasses}
                  />
                </div>
                <div>
                  <Label htmlFor="iccid">ICCID</Label>
                  <Input
                    id="iccid"
                    placeholder="Ex: 8955061500002154712"
                    value={chipData.iccid}
                    onChange={(e) =>
                      handleSpecificInputChange("iccid", e.target.value)
                    }
                    className={commonClasses}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case "impressora":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Printer className="w-5 h-5" />
                Especificações Técnicas - Impressora
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tipoImpressao">Tipo de Impressão</Label>
                  <Select
                    value={impressoraData.tipoImpressao}
                    onValueChange={(value) =>
                      handleSpecificInputChange("tipoImpressao", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laser">Laser</SelectItem>
                      <SelectItem value="jato-tinta">Jato de Tinta</SelectItem>
                      <SelectItem value="matricial">Matricial</SelectItem>
                      <SelectItem value="termica">Térmica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="conectividade">Conectividade</Label>
                  <Select
                    value={impressoraData.conectividade}
                    onValueChange={(value) =>
                      handleSpecificInputChange("conectividade", value)
                    }
                  >
                    <SelectTrigger className={commonClasses}>
                      <SelectValue placeholder="Selecione a conectividade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usb">USB</SelectItem>
                      <SelectItem value="ethernet">Ethernet</SelectItem>
                      <SelectItem value="wifi">Wi-Fi</SelectItem>
                      <SelectItem value="bluetooth">Bluetooth</SelectItem>
                      <SelectItem value="multipla">Múltipla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="velocidadeImpressao">
                    Velocidade de Impressão
                  </Label>
                  <Input
                    id="velocidadeImpressao"
                    placeholder="Ex: 20 ppm"
                    value={impressoraData.velocidadeImpressao}
                    onChange={(e) =>
                      handleSpecificInputChange(
                        "velocidadeImpressao",
                        e.target.value
                      )
                    }
                    className={commonClasses}
                  />
                </div>
                <div>
                  <Label htmlFor="capacidadePapel">Capacidade de Papel</Label>
                  <Input
                    id="capacidadePapel"
                    placeholder="Ex: 250 folhas"
                    value={impressoraData.capacidadePapel}
                    onChange={(e) =>
                      handleSpecificInputChange(
                        "capacidadePapel",
                        e.target.value
                      )
                    }
                    className={commonClasses}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header da página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {selectedType ? "Novo Equipamento" : "Adicionar Equipamento"}
          </h1>
          <p className="text-muted-foreground">
            {selectedType
              ? `Cadastre um novo ${equipmentTypes
                  .find((t) => t.value === selectedType)
                  ?.label.toLowerCase()} no sistema`
              : "Selecione o tipo de equipamento que deseja cadastrar"}
          </p>
        </div>
        {!selectedType && (
          <Button
            variant="outline"
            onClick={() => navigate("/equipamentos")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Equipamentos
          </Button>
        )}
      </div>

      {/* Conteúdo principal */}
      {!selectedType ? <TypeSelectorGrid /> : <DynamicEquipmentForm />}
    </div>
  );
};

export default AdicionarEquipamento;
