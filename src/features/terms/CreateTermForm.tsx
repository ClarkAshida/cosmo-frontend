import React, { useState } from "react";
import type {
  CollaboratorData,
  DeviceFields,
  TermoData,
} from "../../types/termsTypes";
import { fillTermoPDF } from "../../utils/fillTermoPDF";
import { User } from "lucide-react";

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
            <div>
              <label
                htmlFor={`imei-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                IMEI:
              </label>
              <input
                type="text"
                id={`imei-${device.id}`}
                value={device.details.imei || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "imei", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`modelo-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Modelo:
              </label>
              <select
                id={`modelo-${device.id}`}
                value={device.details.modelo || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "modelo", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              >
                <option value="">Selecione um modelo</option>
                <option value="motorolag54">Motorola G54 5G</option>
                <option value="motorolag53">Motorola G53 5G</option>
                <option value="motorolag22">Motorola G2</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {device.details.modelo === "outro" && (
              <div>
                <label
                  htmlFor={`modeloOutro-${device.id}`}
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Especifique o modelo:
                </label>
                <input
                  type="text"
                  id={`modeloOutro-${device.id}`}
                  value={device.details.modeloOutro || ""}
                  onChange={(e) =>
                    handleDetailChange(device.id, "modeloOutro", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
              </div>
            )}

            <div>
              <label
                htmlFor={`valor-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Valor:
              </label>
              <input
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
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`notaFiscal-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Nota Fiscal:
              </label>
              <input
                type="text"
                id={`notaFiscal-${device.id}`}
                value={device.details.notaFiscal || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "notaFiscal", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
        );
      case "notebook":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor={`tag-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                TAG:
              </label>
              <input
                type="text"
                id={`tag-${device.id}`}
                value={device.details.tag || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "tag", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`modelo-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Modelo:
              </label>
              <input
                type="text"
                id={`modelo-${device.id}`}
                value={device.details.modelo || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "modelo", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`valor-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Valor:
              </label>
              <input
                type="number"
                id={`valor-${device.id}`}
                value={device.details.valor || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "valor", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`notaFiscal-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Nota Fiscal:
              </label>
              <input
                type="text"
                id={`notaFiscal-${device.id}`}
                value={device.details.notaFiscal || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "notaFiscal", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
        );

      case "chip":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor={`numero-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Número:
              </label>
              <input
                type="text"
                id={`tag-${device.id}`}
                value={device.details.numero || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "numero", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`valor-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Valor:
              </label>
              <input
                type="number"
                id={`valor-${device.id}`}
                value={device.details.valor || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "valor", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`notaFiscal-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Nota Fiscal:
              </label>
              <input
                type="text"
                id={`notaFiscal-${device.id}`}
                value={device.details.notaFiscal || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "notaFiscal", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
        );

      case "monitor":
        return (
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor={`patrimonio-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Patrimônio:
              </label>
              <input
                type="text"
                id={`patrimonio-${device.id}`}
                value={device.details.patrimonio || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "patrimonio", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`marca-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Marca:
              </label>
              <input
                type="text"
                id={`marca-${device.id}`}
                value={device.details.marca || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "marca", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`tag-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Tag:
              </label>
              <input
                type="text"
                id={`tag-${device.id}`}
                value={device.details.tag || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "tag", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`valor-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Valor:
              </label>
              <input
                type="number"
                id={`valor-${device.id}`}
                value={device.details.valor || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "valor", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor={`notaFiscal-${device.id}`}
                className="block text-sm font-medium text-foreground mb-2"
              >
                Nota Fiscal:
              </label>
              <input
                type="text"
                id={`notaFiscal-${device.id}`}
                value={device.details.notaFiscal || ""}
                onChange={(e) =>
                  handleDetailChange(device.id, "notaFiscal", e.target.value)
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-card p-8 space-y-8"
      >
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold text-primary mb-6">
            <User className="w-5 h-5" />
            Informações do Colaborador
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                E-mail:
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={colaborador.email}
                  onChange={(e) =>
                    setColaborador({ ...colaborador, email: e.target.value })
                  }
                  className="flex-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                >
                  🔍
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Nome Completo do Responsável:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={colaborador.nome}
                onChange={(e) =>
                  setColaborador({ ...colaborador, nome: e.target.value })
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-foreground mb-2"
              >
                CPF:
              </label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={colaborador.cpf}
                onChange={(e) =>
                  setColaborador({ ...colaborador, cpf: e.target.value })
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>

            <div>
              <label
                htmlFor="cidade"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Cidade:
              </label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={colaborador.cidade}
                onChange={(e) =>
                  setColaborador({ ...colaborador, cidade: e.target.value })
                }
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6">
            Informações dos Equipamentos
          </h2>

          <div className="space-y-6">
            {devices.map((device, index) => (
              <div
                key={device.id}
                className="bg-muted/50 rounded-lg p-6 border border-border"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-foreground">
                    Equipamento {index + 1}
                  </h3>
                  {devices.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDevice(device.id)}
                      className="px-4 py-2 bg-danger text-danger-foreground rounded-md hover:bg-danger/80 transition-colors"
                    >
                      Remover
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`equipamento-${device.id}`}
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Tipo de Equipamento:
                    </label>
                    <select
                      id={`equipamento-${device.id}`}
                      value={device.type}
                      onChange={(e) =>
                        handleTypeChange(device.id, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="aparelho celular">Celular</option>
                      <option value="notebook">Notebook</option>
                      <option value="chip">Chip</option>
                      <option value="monitor">Monitor</option>
                    </select>
                  </div>

                  {renderDeviceDetails(device)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={addDevice}
              className="px-6 py-3 bg-success text-success-foreground rounded-md hover:bg-success/80 transition-colors font-medium"
            >
              + Adicionar Equipamento
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-border">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary-hover transition-colors font-medium shadow-medium"
          >
            Salvar Termo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTermForm;
