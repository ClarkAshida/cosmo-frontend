import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Smartphone,
  Laptop,
  Monitor,
  CreditCard,
  Save,
} from "lucide-react";

const AdicionarEquipamento = () => {
  const [equipmentType, setEquipmentType] = useState("");
  const [formData, setFormData] = useState({
    modelo: "",
    valor: "",
    responsavel: "",
    notaFiscal: "",
    // Campos específicos por tipo
    imei: "",
    tag: "",
    patrimonio: "",
    marca: "",
    numero: "",
  });

  const equipmentTypes = [
    { value: "celular", label: "Celular", icon: Smartphone },
    { value: "notebook", label: "Notebook", icon: Laptop },
    { value: "monitor", label: "Monitor", icon: Monitor },
    { value: "chip", label: "Chip", icon: CreditCard },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Equipamento adicionado:", {
      type: equipmentType,
      ...formData,
    });
    // Aqui você implementaria a lógica para salvar o equipamento
    alert("Equipamento adicionado com sucesso!");
  };

  const renderSpecificFields = () => {
    switch (equipmentType) {
      case "celular":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="imei">IMEI</Label>
              <Input
                id="imei"
                placeholder="Ex: 123456789012345"
                value={formData.imei}
                onChange={(e) => handleInputChange("imei", e.target.value)}
                required
              />
            </div>
          </>
        );

      case "notebook":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="tag">TAG</Label>
              <Input
                id="tag"
                placeholder="Ex: NB001"
                value={formData.tag}
                onChange={(e) => handleInputChange("tag", e.target.value)}
                required
              />
            </div>
          </>
        );

      case "monitor":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="patrimonio">Patrimônio</Label>
              <Input
                id="patrimonio"
                placeholder="Ex: MON001"
                value={formData.patrimonio}
                onChange={(e) =>
                  handleInputChange("patrimonio", e.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="marca">Marca</Label>
              <Input
                id="marca"
                placeholder="Ex: Samsung"
                value={formData.marca}
                onChange={(e) => handleInputChange("marca", e.target.value)}
                required
              />
            </div>
          </>
        );

      case "chip":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="numero">Número</Label>
              <Input
                id="numero"
                placeholder="Ex: (11) 99999-9999"
                value={formData.numero}
                onChange={(e) => handleInputChange("numero", e.target.value)}
                required
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-light">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Adicionar Equipamento
          </h1>
          <p className="text-lg text-muted-foreground">
            Cadastre um novo equipamento no sistema
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Informações do Equipamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Tipo de Equipamento</Label>
                  <Select
                    value={equipmentType}
                    onValueChange={setEquipmentType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo de equipamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <type.icon className="w-4 h-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {equipmentType && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="modelo">Modelo</Label>
                        <Input
                          id="modelo"
                          placeholder="Ex: Dell Inspiron 15"
                          value={formData.modelo}
                          onChange={(e) =>
                            handleInputChange("modelo", e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="valor">Valor (R$)</Label>
                        <Input
                          id="valor"
                          type="number"
                          placeholder="Ex: 2500"
                          value={formData.valor}
                          onChange={(e) =>
                            handleInputChange("valor", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    {renderSpecificFields()}

                    <div className="space-y-2">
                      <Label htmlFor="responsavel">Responsável</Label>
                      <Input
                        id="responsavel"
                        placeholder="Nome do responsável pelo equipamento"
                        value={formData.responsavel}
                        onChange={(e) =>
                          handleInputChange("responsavel", e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notaFiscal">Nota Fiscal (Opcional)</Label>
                      <Input
                        id="notaFiscal"
                        placeholder="Número da nota fiscal"
                        value={formData.notaFiscal}
                        onChange={(e) =>
                          handleInputChange("notaFiscal", e.target.value)
                        }
                      />
                    </div>

                    <div className="flex gap-4 pt-6">
                      <Button type="submit" className="flex-1 gap-2">
                        <Save className="w-4 h-4" />
                        Salvar Equipamento
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setEquipmentType("");
                          setFormData({
                            modelo: "",
                            valor: "",
                            responsavel: "",
                            notaFiscal: "",
                            imei: "",
                            tag: "",
                            patrimonio: "",
                            marca: "",
                            numero: "",
                          });
                        }}
                      >
                        Limpar
                      </Button>
                    </div>
                  </>
                )}

                {!equipmentType && (
                  <div className="text-center py-8">
                    <Plus className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Selecione o tipo de equipamento para continuar
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdicionarEquipamento;
