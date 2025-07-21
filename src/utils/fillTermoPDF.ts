import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { type TDocumentDefinitions } from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.vfs;

export const fillTermoPDF = () => {
  const docDefinition: TDocumentDefinitions = {
    content: [
      {
        text: "Termo de Entrega de Equipamentos de TI",
        style: "header",
      },
      {
        text: "Este documento estabelece os termos e condições da entrega dos equipamentos de Tecnologia da Informação (TI) pela empresa.",
        style: "paragraph",
        margin: [0, 10, 0, 20],
      },

      // Tabela: Equipamento + Informações
      {
        text: "X EQUIPAMENTO INFORMAÇÕES",
        bold: true,
        margin: [0, 0, 0, 5],
      },
      {
        table: {
          headerRows: 1,
          widths: ["*", "*"],
          body: [
            ["Descrição", "IMEI"],
            ["01 APARELHO CELULAR", "356789101234567"],
          ],
        },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 15],
      },

      // Tabela: Equipamento + Valores + Nº Fiscal
      {
        text: "X EQUIPAMENTO VALORES N° FISCAL",
        bold: true,
        margin: [0, 0, 0, 5],
      },
      {
        table: {
          headerRows: 1,
          widths: ["*", "*", "*"],
          body: [
            ["Descrição", "Valor", "Nº Fiscal"],
            ["01 APARELHO CELULAR", "R$ N/A", "4234234"],
          ],
        },
        layout: "lightHorizontalLines",
        margin: [0, 0, 0, 25],
      },

      // Dados do colaborador
      {
        columns: [
          { text: "Nome do Colaborador (a):", width: "40%" },
          { text: "Flávio Alexandre", bold: true, width: "60%" },
        ],
        margin: [0, 0, 0, 5],
      },
      {
        columns: [
          { text: "CPF:", width: "20%" },
          { text: "125.966.284-57", width: "40%" },
          { text: "Matrícula:", width: "20%" },
          { text: "N/A", width: "20%" },
        ],
        margin: [0, 0, 0, 5],
      },

      // Local e data
      {
        text: "Natal, 21 de Julho de 2025",
        alignment: "right",
        margin: [0, 30, 0, 10],
      },

      // Assinatura
      {
        text: "Assinatura: ___________________________",
        margin: [0, 20, 0, 0],
      },
    ],
    styles: {
      header: {
        fontSize: 16,
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      paragraph: {
        fontSize: 11,
        alignment: "justify",
      },
    },
  };

  pdfMake.createPdf(docDefinition).download("arquivo.pdf");
};
