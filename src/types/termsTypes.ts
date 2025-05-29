export type DeviceType = "celular" | "notebook" | "chip" | "monitor" | "";

export interface DeviceFields {
  id: string;
  type: string;
  details: {
    [key: string]: string;
  };
}

export interface CollaboratorData {
  email: string;
  nome: string;
  cpf: string;
  estado: string;
}

export interface TermoData {
  colaborador: CollaboratorData;
  dispositivos: DeviceFields[];
}
