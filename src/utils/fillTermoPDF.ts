// src/utils/fillTermoPDF.ts

import { saveAs } from "file-saver";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import type { TermoData } from "../types/termsTypes";

export const generateFilledPDF = async (
  templateBytes: Uint8Array,
  data: TermoData
) => {
  const pdfDoc = await PDFDocument.load(templateBytes);
  const page = pdfDoc.getPages()[1];
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const estadosPorExtenso: Record<string, string> = {
    RN: "Rio Grande do Norte",
    CE: "Ceará",
    SP: "São Paulo",
    MG: "Minas Gerais",
    // outros estados aqui...
  };

  const drawText = (text: string, x: number, y: number, size = 12) => {
    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  };

  // Dados de Endereço
  const estadoExtenso =
    estadosPorExtenso[data.colaborador.estado] || data.colaborador.estado;
  drawText(estadoExtenso, 85, 205, 12);

  // 🧍 Dados do colaborador
  drawText(data.colaborador.nome, 210, 165, 12);
  drawText(data.colaborador.cpf, 110, 120, 12);

  // 📅 Data atual
  const hoje = new Date();
  drawText(hoje.getDate().toString().padStart(2, "0"), 290, 205, 12);
  drawText(
    hoje
      .toLocaleString("pt-BR", { month: "long" })
      .replace(/^\w/, (c) => c.toUpperCase()),
    325,
    205,
    12
  );
  drawText(hoje.getFullYear().toString(), 425, 205, 12);

  // Agora vamos desenhar as duas "tabelas" com os dispositivos:
  let startYInfo = 460; // ajuste conforme seu layout (área da primeira tabela)
  let startYValores = 460; // mesma altura inicial para a segunda tabela

  for (const device of data.dispositivos) {
    // Formata o tipo sem o prefixo "01 " para diferenciar (opcional)
    // Ou usa direto device.type (já vem com "01 ...")
    const tipo = device.type;

    // Construção do texto para tabela INFORMAÇÕES
    let infoText = "";
    if (tipo.includes("CELULAR") || tipo.includes("APARELHO CELULAR")) {
      // Por exemplo, "01 APARELHO CELULAR | IMEI: XXXXX"
      infoText = `${tipo}IMEI: ${device.details.imei || ""}`;
    } else if (tipo.includes("CHIP")) {
      infoText = `${tipo}N DE TELEFONE: ${device.details.numero || ""}`;
    } else if (tipo.includes("NOTEBOOK")) {
      infoText = `${tipo}TAG: ${device.details.tag || ""}`;
    } else if (tipo.includes("MONITOR")) {
      infoText = `${tipo}PAT.: ${device.details.patrimonio || ""}`;
    } else {
      infoText = `${tipo}`;
    }

    drawText(infoText, 60, startYInfo, 10);

    // Construção do texto para tabela VALORES
    const valorText = ` ${tipo}R$ ${device.details.valor || "0,00"}${
      device.details.notaFiscal || ""
    }`;
    drawText(valorText, 320, startYValores, 10);

    startYInfo -= 18;
    startYValores -= 18;

    if (startYInfo < 120) break; // limita linhas para não ultrapassar página
  }

  // 💾 Gerar e salvar
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(
    blob,
    `Termo-de-Responsabilidade--${data.dispositivos[0].type}--${data.colaborador.nome}.pdf`
  );
};
