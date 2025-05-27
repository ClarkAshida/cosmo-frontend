import React, { useState } from "react";

// Definindo tipos
interface DeviceFields {
  id: string;
  type: string;
  details: {
    [key: string]: string;
  };
}

const CreateTermForm: React.FC = () => {
  // Estado para armazenar os dispositivos
  const [devices, setDevices] = useState<DeviceFields[]>([
    { id: "device-1", type: "", details: {} },
  ]);

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

  // Função para renderizar os campos específicos com base no tipo de dispositivo
  const renderDeviceDetails = (device: DeviceFields) => {
    switch (device.type) {
      case "celular":
        return (
          <div>
            <label htmlFor={`imei-${device.id}`}>IMEI:</label>
            <input
              type="text"
              id={`imei-${device.id}`}
              value={device.details.tag || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "imei", e.target.value)
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
              value={device.details.tag || ""}
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

            <label htmlFor={`serviceTag-${device.id}`}>Service Tag:</label>
            <input
              type="text"
              id={`serviceTag-${device.id}`}
              value={device.details.serviceTag || ""}
              onChange={(e) =>
                handleDetailChange(device.id, "serviceTag", e.target.value)
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
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form>
      <div>
        <h1>Informações do Colaborador</h1>
      </div>
      <div>
        <label htmlFor="name">Nome Completo do Responsável:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div>
        <label htmlFor="cpf">CPF:</label>
        <input type="text" id="cpf" name="cpf" required />
      </div>
      <div>
        <label htmlFor="estado">Estado:</label>
        <select name="estado" id="estado">
          <option value="">Selecione</option>
          <option value="RN">RN</option>
          <option value="CE">CE</option>
          <option value="SP">SP</option>
          <option value="MG">MG</option>
        </select>
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
            >
              <option value="">Selecione</option>
              <option value="celular">Celular</option>
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
