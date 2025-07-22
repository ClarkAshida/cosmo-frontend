import React, { useState } from "react";
import type {
  CollaboratorData,
  DeviceFields,
  TermoData,
} from "../../types/termsTypes";
import { fillTermoPDF } from "../../utils/fillTermoPDF";
import { Laptop, Save, Search, Trash, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateTermForm: React.FC = () => {
  const [devices, setDevices] = useState<DeviceFields[]>([
    { id: "device-1", type: "", details: {} },
  ]);

  const [colaborador, setColaborador] = useState<CollaboratorData>({
    email: "",
    nome: "",
    cpf: "",
    cidade: "",
  });

  // Função para adicionar um novo dispositivo com ID único
  const addDevice = () => {
    // Use timestamp para garantir IDs únicos
    const newId = `device-${Date.now()}`;
    setDevices([...devices, { id: newId, type: "", details: {} }]);
  };

  // Função para remover um dispositivo
  const removeDevice = (id: string) => {
    if (devices.length > 1) {
      setDevices(devices.filter((device) => device.id !== id));
    }
  };

  // Função para atualizar o tipo de um dispositivo
  const handleTypeChange = (id: string, value: string) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, type: value, details: {} } : device
      )
    );
  };

  // Função para atualizar detalhes de um dispositivo
  const handleDetailChange = (id: string, field: string, value: string) => {
    setDevices(
      devices.map((device) =>
        device.id === id
          ? { ...device, details: { ...device.details, [field]: value } }
          : device
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dispositivosComPrefixo = devices.map((device) => ({
      ...device,
      type: `01 ${device.type.toUpperCase()}`, // adiciona o prefixo e maiúsculo
    }));

    const termoData: TermoData = {
      colaborador,
      dispositivos: dispositivosComPrefixo,
    };

    console.log("Dados do termo com prefixos e agregados:", termoData);

    try {
      await fillTermoPDF();
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };

  // Função para renderizar os campos específicos com base no tipo de dispositivo
  const renderDeviceDetails = (device: DeviceFields) => {
    switch (device.type) {
      case "aparelho celular":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`imei-${device.id}`}>IMEI</Label>
              <Input
                type="text"
                id={`imei-${device.id}`}
                value={device.details.imei || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "imei", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`modelo-${device.id}`}>Modelo</Label>
              <Select
                id={`modelo-${device.id}`}
                value={device.details.modelo || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "modelo", e.target.value)
                }
                required
              >
                <option value="">Selecione um modelo</option>
                <option value="motorolag54">Motorola G54 5G</option>
                <option value="motorolag53">Motorola G53 5G</option>
                <option value="motorolag22">Motorola G2</option>
                <option value="outro">Outro</option>
              </Select>
            </div>

            {device.details.modelo === "outro" && (
              <div className="space-y-2">
                <Label htmlFor={`modeloOutro-${device.id}`}>
                  Especifique o modelo
                </Label>
                <Input
                  type="text"
                  id={`modeloOutro-${device.id}`}
                  value={device.details.modeloOutro || ""}
                  onChange={(e) =>
                    handleDetailChange(device.id, "modeloOutro", e.target.value)
                  }
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor={`valor-${device.id}`}>Valor</Label>
              <Input
                type="number"
                id={`valor-${device.id}`}
                value={
                  device.details.modelo === "motorolag54"
                    ? "2540"
                    : device.details.modelo === "motorolag53"
                    ? "2150"
                    : device.details.modelo === "motorolag22"
                    ? "1750"
                    : device.details.valor || ""
                }
                onChange={(e) =>
                  handleDetailChange(device.id, "valor", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`notaFiscal-${device.id}`}>Nota Fiscal</Label>
              <Input
                type="text"
                id={`notaFiscal-${device.id}`}
                value={device.details.notaFiscal || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "notaFiscal", e.target.value)
                }
              />
            </div>
          </div>
        );
      case "notebook":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`tag-${device.id}`}>TAG</Label>
              <Input
                type="text"
                id={`tag-${device.id}`}
                value={device.details.tag || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "tag", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`modelo-${device.id}`}>Modelo</Label>
              <Input
                type="text"
                id={`modelo-${device.id}`}
                value={device.details.modelo || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "modelo", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`valor-${device.id}`}>Valor</Label>
              <Input
                type="number"
                id={`valor-${device.id}`}
                value={device.details.valor || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "valor", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`notaFiscal-${device.id}`}>Nota Fiscal</Label>
              <Input
                type="text"
                id={`notaFiscal-${device.id}`}
                value={device.details.notaFiscal || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "notaFiscal", e.target.value)
                }
              />
            </div>
          </div>
        );

      case "chip":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`numero-${device.id}`}>Número</Label>
              <Input
                type="text"
                id={`numero-${device.id}`}
                value={device.details.numero || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "numero", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`valor-${device.id}`}>Valor</Label>
              <Input
                type="number"
                id={`valor-${device.id}`}
                value={device.details.valor || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "valor", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`notaFiscal-${device.id}`}>Nota Fiscal</Label>
              <Input
                type="text"
                id={`notaFiscal-${device.id}`}
                value={device.details.notaFiscal || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "notaFiscal", e.target.value)
                }
              />
            </div>
          </div>
        );

      case "monitor":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`patrimonio-${device.id}`}>Patrimônio</Label>
              <Input
                type="text"
                id={`patrimonio-${device.id}`}
                value={device.details.patrimonio || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "patrimonio", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`marca-${device.id}`}>Marca</Label>
              <Input
                type="text"
                id={`marca-${device.id}`}
                value={device.details.marca || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "marca", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`tag-${device.id}`}>Tag</Label>
              <Input
                type="text"
                id={`tag-${device.id}`}
                value={device.details.tag || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "tag", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`valor-${device.id}`}>Valor</Label>
              <Input
                type="number"
                id={`valor-${device.id}`}
                value={device.details.valor || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "valor", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`notaFiscal-${device.id}`}>Nota Fiscal</Label>
              <Input
                type="text"
                id={`notaFiscal-${device.id}`}
                value={device.details.notaFiscal || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "notaFiscal", e.target.value)
                }
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="shadow-card border-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-primary">
              <User className="w-5 h-5" />
              Informações do Colaborador
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                E-mail
              </Label>
              <div className="flex gap-0">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="colaborador@empresa.com"
                  value={colaborador.email}
                  onChange={(e) =>
                    setColaborador({ ...colaborador, email: e.target.value })
                  }
                  required
                />
                <Button variant="search" size="icon" className="rounded-l-none">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Nome Completo
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nome do responsável"
                  value={colaborador.nome}
                  onChange={(e) =>
                    setColaborador({ ...colaborador, nome: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-sm font-medium">
                  CPF
                </Label>
                <Input
                  type="text"
                  id="cpf"
                  name="cpf"
                  placeholder="000.000.000-00"
                  value={colaborador.cpf}
                  onChange={(e) =>
                    setColaborador({ ...colaborador, cpf: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                Cidade
              </Label>
              <Input
                type="text"
                id="cidade"
                name="cidade"
                placeholder="Cidade do colaborador"
                value={colaborador.cidade}
                onChange={(e) =>
                  setColaborador({ ...colaborador, cidade: e.target.value })
                }
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-primary flex text-center items-center gap-2">
              <Laptop className="w-5 h-5" />
              Informações dos Equipamentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {devices.map((device, index) => (
              <Card key={device.id} className="bg-muted/50 border-border">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-foreground">
                      Equipamento {index + 1}
                    </h3>
                    {devices.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeDevice(device.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash className="w-4 h-4" />
                        Remover
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`equipamento-${device.id}`}>
                        Tipo de Equipamento
                      </Label>
                      <Select
                        id={`equipamento-${device.id}`}
                        value={device.type}
                        onChange={(e) =>
                          handleTypeChange(device.id, e.target.value)
                        }
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="aparelho celular">Celular</option>
                        <option value="notebook">Notebook</option>
                        <option value="chip">Chip</option>
                        <option value="monitor">Monitor</option>
                      </Select>
                    </div>

                    {renderDeviceDetails(device)}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div>
              <Button
                type="button"
                onClick={addDevice}
                variant="success"
                className="w-full md:w-auto"
              >
                + Adicionar Equipamento
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-6">
          <Button variant="cosmo" size="lg" className="gap-2 px-8">
            <Save className="w-5 h-5" />
            Salvar Termo de Responsabilidade
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTermForm;
