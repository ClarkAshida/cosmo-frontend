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

  const { height } = page.getSize();

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

  // 🖥️ Dispositivos – formatar como uma pequena tabela de texto
  let startY = height - 200;
  for (const device of data.dispositivos) {
    const descricao =
      `Tipo: ${device.type.toUpperCase()}, ` +
      Object.entries(device.details)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");

    drawText(descricao, 60, startY, 10);
    startY -= 18;
    if (startY < 120) {
      // Prevenção de overflow: só 4-6 dispositivos por página (simplificado)
      break;
    }
  }

  // 💾 Gerar e salvar
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(
    blob,
    `Termo-de-Responsabilidade--${data.dispositivos[0].type}--${data.colaborador.nome}.pdf`
  );
};
