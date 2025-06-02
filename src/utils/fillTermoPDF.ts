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
  drawText(data.colaborador.cidade, 85, 205, 12);

  // 🧍 Dados do colaborador
  drawText(data.colaborador.nome, 212, 164, 12);
  drawText(data.colaborador.cpf, 112, 120, 12);

  // 📅 Data atual
  const hoje = new Date();
  const dataFormatada = `${hoje.getDate().toString().padStart(2, "0")} de ${hoje
    .toLocaleString("pt-BR", { month: "long" })
    .replace(/^\w/, (c) => c.toUpperCase())} de ${hoje.getFullYear()}`;
  drawText(dataFormatada, 390, 205, 12);

  // 💾 Gerar e salvar
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(
    blob,
    `Termo-de-Responsabilidade--${data.dispositivos[0].type}--${data.colaborador.nome}.pdf`
  );
};
