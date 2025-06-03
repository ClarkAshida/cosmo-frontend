import React, { useState } from "react";
import type {
  CollaboratorData,
  DeviceFields,
  TermoData,
} from "../../types/termsTypes";
import { generateFilledPDF } from "../../utils/fillTermoPDF";

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

    // // 2. Gerar os itens agregados para celular e notebook
    // const itensAgregados = devices.flatMap((device) => {
    //   if (device.type === "celular" || device.type === "notebook") {
    //     return [
    //       {
    //         id: `agregado-${device.id}`,
    //         type: "01 CARREGADOR",
    //         details: {}, // sem detalhes, só o tipo mesmo
    //       },
    //     ];
    //   }
    //   return [];
    // });

    // // 3. Combinar dispositivos principais + agregados
    // const dispositivosFinal = [...dispositivosComPrefixo, ...itensAgregados];

    const termoData: TermoData = {
      colaborador,
      dispositivos: dispositivosComPrefixo,
    };

    console.log("Dados do termo com prefixos e agregados:", termoData);

    try {
      const response = await fetch("/termo-de-responsabilidade-3.pdf");
      const arrayBuffer = await response.arrayBuffer();

      await generateFilledPDF(new Uint8Array(arrayBuffer), termoData);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };

  // Função para renderizar os campos específicos com base no tipo de dispositivo
  const renderDeviceDetails = (device: DeviceFields) => {
    switch (device.type) {
      case "aparelho celular":
        return (
          <div>
            <label htmlFor={`imei-${device.id}`}>IMEI:</label>
            <input
              type="text"
              id={`imei-${device.id}`}
              value={device.details.imei || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "imei", e.target.value)
              }
              required
            />

            <label htmlFor={`modelo-${device.id}`}>Modelo:</label>
            <select
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
            </select>

            {device.details.modelo === "outro" && (
              <div>
                <label htmlFor={`modeloOutro-${device.id}`}>
                  Especifique o modelo:
                </label>
                <input
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

            <label htmlFor={`valor-${device.id}`}>Valor:</label>
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
              required
            />

            <label htmlFor={`notaFiscal-${device.id}`}>Nota Fiscal:</label>
            <input
              type="text"
              id={`notaFiscal-${device.id}`}
              value={device.details.notaFiscal || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "notaFiscal", e.target.value)
              }
            />
          </div>
        );
      case "notebook":
        return (
          <div>
            <label htmlFor={`tag-${device.id}`}>TAG:</label>
            <input
              type="text"
              id={`tag-${device.id}`}
              value={device.details.tag || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "tag", e.target.value)
              }
              required
            />

            <label htmlFor={`modelo-${device.id}`}>Modelo:</label>
            <input
              type="text"
              id={`modelo-${device.id}`}
              value={device.details.modelo || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "modelo", e.target.value)
              }
              required
            />

            <label htmlFor={`valor-${device.id}`}>Valor:</label>
            <input
              type="number"
              id={`valor-${device.id}`}
              value={device.details.valor || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "valor", e.target.value)
              }
              required
            />

            <label htmlFor={`notaFiscal-${device.id}`}>Nota Fiscal:</label>
            <input
              type="text"
              id={`notaFiscal-${device.id}`}
              value={device.details.notaFiscal || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "notaFiscal", e.target.value)
              }
            />
          </div>
        );

      case "chip":
        return (
          <div>
            <label htmlFor={`numero-${device.id}`}>Número:</label>
            <input
              type="text"
              id={`tag-${device.id}`}
              value={device.details.numero || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "numero", e.target.value)
              }
              required
            />
            <label htmlFor={`valor-${device.id}`}>Valor:</label>
            <input
              type="number"
              id={`valor-${device.id}`}
              value={device.details.valor || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "valor", e.target.value)
              }
              required
            />
            <label htmlFor={`notaFiscal-${device.id}`}>Nota Fiscal:</label>
            <input
              type="text"
              id={`notaFiscal-${device.id}`}
              value={device.details.notaFiscal || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "notaFiscal", e.target.value)
              }
            />
          </div>
        );

      case "monitor":
        return (
          <div>
            <label htmlFor={`patrimonio-${device.id}`}>Patrimônio:</label>
            <input
              type="text"
              id={`patrimonio-${device.id}`}
              value={device.details.patrimonio || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "patrimonio", e.target.value)
              }
              required
            />
            <label htmlFor={`marca-${device.id}`}>Marca:</label>
            <input
              type="text"
              id={`marca-${device.id}`}
              value={device.details.marca || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "marca", e.target.value)
              }
              required
            />

            <label htmlFor={`tag-${device.id}`}>Tag:</label>
            <input
              type="text"
              id={`tag-${device.id}`}
              value={device.details.tag || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "tag", e.target.value)
              }
              required
            />

            <label htmlFor={`valor-${device.id}`}>Valor:</label>
            <input
              type="number"
              id={`valor-${device.id}`}
              value={device.details.valor || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "valor", e.target.value)
              }
              required
            />
            <label htmlFor={`notaFiscal-${device.id}`}>Nota Fiscal:</label>
            <input
              type="text"
              id={`notaFiscal-${device.id}`}
              value={device.details.notaFiscal || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "notaFiscal", e.target.value)
              }
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Informações do Colaborador</h1>
      </div>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={colaborador.email}
          onChange={(e) =>
            setColaborador({ ...colaborador, email: e.target.value })
          }
          required
        />
        <button>🔍</button>
      </div>
      <div>
        <label htmlFor="name">Nome Completo do Responsável:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={colaborador.nome}
          onChange={(e) =>
            setColaborador({ ...colaborador, nome: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={colaborador.cpf}
          onChange={(e) =>
            setColaborador({ ...colaborador, cpf: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label htmlFor="cidade">Cidade:</label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          value={colaborador.cidade}
          onChange={(e) =>
            setColaborador({ ...colaborador, cidade: e.target.value })
          }
          required
        />
      </div>

      <div>
        <h1>Informações do Equipamento</h1>
      </div>

      {devices.map((device, index) => (
        <div
          key={device.id}
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h3>Equipamento {index + 1}</h3>
            {devices.length > 1 && (
              <button
                type="button"
                onClick={() => removeDevice(device.id)}
                style={{
                  background: "#ff4d4d",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                }}
              >
                Remover
              </button>
            )}
          </div>

          <div>
            <label htmlFor={`equipamento-${device.id}`}>
              Tipo de Equipamento:
            </label>
            <select
              id={`equipamento-${device.id}`}
              value={device.type}
              onChange={(e) => handleTypeChange(device.id, e.target.value)}
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
      ))}

      <div style={{ marginTop: "15px" }}>
        <button
          type="button"
          onClick={addDevice}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "4px",
          }}
        >
          + Adicionar Equipamento
        </button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          type="submit"
          style={{
            background: "#2196F3",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
          }}
        >
          Salvar Termo
        </button>
      </div>
    </form>
  );
};

export default CreateTermForm;
