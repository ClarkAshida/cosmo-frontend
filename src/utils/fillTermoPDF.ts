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

  const drawText = (text: string, x: number, y: number, size = 12) => {
    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  };

  // 🧍 Dados do colaborador
  drawText(data.colaborador.nome, 212, 168, 12);
  drawText(data.colaborador.cpf, 112, 126, 12);

  // 📅 Data atual
  const hoje = new Date();
  const dataFormatada = `${data.colaborador.cidade}, ${hoje
    .getDate()
    .toString()
    .padStart(2, "0")} de ${hoje
    .toLocaleString("pt-BR", { month: "long" })
    .replace(/^\w/, (c) => c.toUpperCase())} de ${hoje.getFullYear()}`;
  drawText(dataFormatada, 370, 205, 12);

  // 💻 Dados do Dispositivo
  let alturaInicial = height - 170; // A partir de onde a lista de dispositivos vai começar (ajuste conforme necessário)
  let alturaNotaFiscal = height - 420; // A partir de onde a nota fiscal vai começar (ajuste conforme necessário)

  // Para cada dispositivo, renderiza o tipo e o identificador único
  data.dispositivos.forEach((device) => {
    if (device.type.includes("CARREGADOR")) return; // Ignora dispositivos do tipo CARREGADOR

    // Definindo o texto a ser exibido
    const dispositivoTexto = `${device.type}`;
    const valor = device.details.valor || "N/A";
    const notaFiscal = device.details.notaFiscal || "N/A";
    let identificador = "";

    // Verifica o tipo do dispositivo e insere o identificador correspondente
    switch (device.type) {
      case "01 APARELHO CELULAR":
        identificador = `IMEI: ${device.details.imei || ""}`;
        break;
      case "01 CHIP":
        identificador = `Nº DE TELEFONE: ${device.details.numero || ""}`;
        break;
      case "01 NOTEBOOK":
        identificador = `TAG: ${device.details.tag || ""}`;
        break;
      case "01 MONITOR":
        identificador = `TAG: ${device.details.tag || ""}`;
        break;
      default:
        identificador = `ID: ${device.id}`;
    }

    // Desenha o dispositivo na tabela de informações
    drawText(dispositivoTexto, 120, alturaInicial, 10);
    drawText(identificador, 260, alturaInicial, 10);

    // Desenha as informações adicionais (valor e nota fiscal)
    drawText(dispositivoTexto, 110, alturaNotaFiscal, 10);
    drawText(`R$ ${valor}`, 215, alturaNotaFiscal, 10);
    drawText(notaFiscal, 350, alturaNotaFiscal, 10);

    // Diminui o Y para o próximo dispositivo
    alturaInicial -= 30;
    alturaNotaFiscal -= 30;
  });

  // 💾 Gerar e salvar
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  saveAs(blob, `Termo-de-Responsabilidade--${data.colaborador.nome}.pdf`);
};
