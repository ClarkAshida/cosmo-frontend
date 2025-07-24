import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { type TDocumentDefinitions } from "pdfmake/interfaces";
import { logoBase64 } from "./logoBase64"; // Import your logo base64 string

pdfMake.vfs = pdfFonts.vfs;

interface Equipamento {
  nome: string;
  valor: string;
  informacoes: string;
}

interface DadosColaborador {
  nome: string;
  cpf: string;
  data: string;
  local: string;
}

export const fillTermoPDF = (
  equipamentos: Equipamento[] = [
    {
      nome: "01 NOTEBOOK",
      valor: "R$ 4.156,29",
      informacoes: "MODELO: LATITUDE 3440\nST: FFS7M74\nNOTA: N/A",
    },
    {
      nome: "01 CARREGADOR",
      valor: "",
      informacoes: "SIM",
    },
  ],
  dadosColaborador: DadosColaborador = {
    nome: "Morgan Marcelo Viana de Oliveira",
    cpf: "705.635.104-20",
    data: "16 de julho de 2025",
    local: "Natal",
  }
) => {
  const docDefinition: TDocumentDefinitions = {
    pageSize: "A4",
    pageMargins: [26, 26, 26, 26],
    defaultStyle: {
      fontSize: 12,
    },
    content: [
      // Borda ao redor do documento - Primeira página
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 0,
            w: 545,
            h: 792,
            lineWidth: 0.5,
            lineColor: "#000000",
          },
        ],
        absolutePosition: { x: 26, y: 26 },
      },
      // Primeira página - Cabeçalho
      {
        table: {
          widths: [120, "*"],
          body: [
            [
              {
                image: logoBase64,
                width: 120,
                height: 35,
                alignment: "center",
                border: [true, true, true, true],
                margin: [0, 15, 0, 0],
              },
              {
                stack: [
                  {
                    text: "Termo de Entrega de Equipamentos de TI",
                    style: "headerTitle",
                    alignment: "center",
                    margin: [0, 6, 0, -6],
                  },
                  {
                    text: "________________________________________________________________________",
                    border: [false, false, false, true],
                    borderColor: ["", "", "", "#000000"],
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: "Este documento estabelece os termos e condições da entrega dos equipamentos de Tecnologia da Informação (TI) pela empresa Alares aos seus colaboradores.",
                    style: "headerSubtext",
                    alignment: "center",
                    margin: [0, 6, 0, 6],
                  },
                ],
                border: [true, true, true, true],
                margin: [0, 0, 0, 0],
              },
            ],
          ],
        },
        layout: {
          defaultBorder: true,
        },
        margin: [8, 10, 8, 20],
      },

      // Termos e condições
      {
        text: [
          { text: "1. Responsabilidade do Colaborador:", bold: true },
          {
            text: " O colaborador reconhece que o equipamento de TI fornecido pela Alares é de propriedade da mesma, e que o uso é exclusivamente para fins de trabalho. O colaborador é responsável por manter o equipamento em condições adequadas, incluindo a prevenção de danos, roubo ou perda.",
          },
        ],
        style: "terms",
        margin: [20, 0, 20, 12],
      },
      {
        text: [
          { text: "2. Uso Adequado:", bold: true },
          {
            text: " O colaborador concorda em usar o equipamento de TI apenas para fins profissionais e em conformidade com as políticas de segurança da informação da Alares. O uso inadequado, como instalação de software não autorizado, acesso a conteúdo inadequado ou uso para fins pessoais, pode resultar em penalidades e até mesmo em demissão.",
          },
        ],
        style: "terms",
        margin: [20, 0, 20, 12],
      },
      {
        text: [
          { text: "3. Devolução do Equipamento:", bold: true },
          {
            text: " O colaborador deve devolver o equipamento de TI no final do seu contrato de trabalho, quando solicitado pela Alares. O equipamento deve ser devolvido em boas condições de funcionamento, juntamente com todos os acessórios e componentes originais.",
          },
        ],
        style: "terms",
        margin: [20, 0, 20, 12],
      },
      {
        text: [
          { text: "4. Condições de Uso:", bold: true },
          {
            text: " A Alares não se responsabiliza por quaisquer danos ou perdas decorrentes do uso inadequado do equipamento de TI pelo colaborador. Além disso, a Alares reserva-se o direito de monitorar o uso do equipamento de TI, a fim de garantir a conformidade com as políticas e procedimentos da Alares.",
          },
        ],
        style: "terms",
        margin: [20, 0, 20, 12],
      },
      {
        text: [
          { text: "Penalidades:", bold: true },
          {
            text: " Os colaboradores serão responsáveis, trabalhista, civil e penalmente, pelo uso indevido das ferramentas mencionadas nesse Termo, pela não obediência às presentes regras e por quaisquer prejuízos que estes comportamentos possam causar à Alares ou a terceiros.",
          },
        ],
        style: "terms",
        margin: [20, 0, 20, 8],
      },
      {
        text: [
          { text: "As penalidades aos itens " },
          { text: "(1,2,3)", bold: true },
          {
            text: " de violações às condições de uso dos recursos de tecnologia da informação, serão aplicadas pela Empresa e a critério desta, através das seguintes especificações:",
          },
        ],
        style: "terms",
        margin: [20, 0, 20, 8],
      },
      {
        ul: [
          "Será descontado da folha de pagamento o valor do equipamento de acordo com as orientações disponibilizadas pela área de Recursos Humanos da Alares.",
        ],
        style: "terms",
        margin: [40, 0, 20, 12],
      },
      {
        text: [
          { text: "5. Disposições Gerais:", bold: true },
          {
            text: " Este termo de entrega de equipamentos de TI constitui um acordo integral entre a Alares e o colaborador, e substitui todas as negociações anteriores. Qualquer alteração ou renúncia a este acordo deve ser feita por escrito e assinada por ambas as partes. Este acordo é regido pelas leis do Brasil e quaisquer disputas devem ser resolvidas por meio de arbitragem.",
          },
        ],
        style: "terms",
        margin: [20, 0, 20, 15],
      },
      {
        text: "Ao assinar este termo, o colaborador reconhece que recebeu o equipamento de TI da empresa em boas condições de funcionamento e concorda com os termos e condições estabelecidos neste documento.",
        style: "terms",
        margin: [20, 0, 20, 0],
      },

      // Segunda página
      { text: "", pageBreak: "before" },

      // Borda ao redor do documento - Segunda página
      {
        canvas: [
          {
            type: "rect",
            x: 0,
            y: 0,
            w: 545,
            h: 792,
            lineWidth: 0.5,
            lineColor: "#000000",
          },
        ],
        absolutePosition: { x: 26, y: 26 },
      },

      // Cabeçalho da segunda página
      {
        table: {
          widths: [120, "*"],
          body: [
            [
              {
                image: logoBase64,
                width: 120,
                height: 30,
                alignment: "center",
                border: [true, true, true, true],
                margin: [0, 15, 0, 0],
              },
              {
                stack: [
                  {
                    text: "Termo de Entrega de Equipamentos de TI",
                    style: "headerTitle",
                    alignment: "center",
                    margin: [0, 0, 6, 0],
                  },
                  {
                    text: "________________________________________________________________________",
                    border: [false, false, false, true],
                    borderColor: ["", "", "", "#000000"],
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: "Este documento estabelece os termos e condições da entrega dos equipamentos de Tecnologia da Informação (TI) pela empresa Alares aos seus colaboradores.",
                    style: "headerSubtext",
                    alignment: "center",
                    margin: [0, 6, 0, 6],
                  },
                ],
                border: [true, true, true, true],
                margin: [0, 0, 0, 0],
              },
            ],
          ],
        },
        layout: {
          defaultBorder: true,
        },
        margin: [8, 10, 8, 20],
      },

      // Tabela única: X | EQUIPAMENTO | VALORES | INFORMAÇÕES
      {
        table: {
          widths: [25, 120, 80, "*"],
          body: [
            // Cabeçalho da tabela
            [
              { text: "X", style: "tableHeader", alignment: "center" },
              {
                text: "EQUIPAMENTO",
                style: "tableHeader",
                alignment: "center",
              },
              { text: "VALORES", style: "tableHeader", alignment: "center" },
              {
                text: "INFORMAÇÕES",
                style: "tableHeader",
                alignment: "center",
              },
            ],
            // Linhas dinâmicas baseadas nos equipamentos
            ...equipamentos.map((equipamento) => [
              {
                text: "",
                alignment: "center",
                margin: [0, 5, 0, 5],
                fontSize: 10,
              },
              {
                text: equipamento.nome,
                alignment: "left",
                margin: [5, 5, 5, 5],
                fontSize: 10,
              },
              {
                text: equipamento.valor,
                alignment: "center",
                margin: [5, 5, 5, 5],
                fontSize: 10,
              },
              {
                text: equipamento.informacoes,
                alignment: "left",
                margin: [5, 5, 5, 5],
                fontSize: 10,
              },
            ]),
          ],
        },
        layout: {
          defaultBorder: true,
        },
        margin: [8, 0, 8, 50],
      },

      // Local e data
      {
        text: `${dadosColaborador.local}, ${dadosColaborador.data}`,
        alignment: "right",
        margin: [0, 0, 30, 50],
        fontSize: 12,
        bold: true,
      },

      // Dados do colaborador
      {
        text: [
          { text: "Nome do Colaborador (a):", bold: true },
          { text: ` ${dadosColaborador.nome}` },
        ],
        margin: [30, 0, 30, 15],
        fontSize: 12,
      },

      {
        columns: [
          {
            text: [
              { text: "CPF:", bold: true },
              { text: ` ${dadosColaborador.cpf}` },
            ],
            width: "50%",
            fontSize: 12,
          },
          {
            text: [
              { text: "Matrícula:", bold: true },
              { text: " ___________" },
            ],
            width: "50%",
            fontSize: 12,
          },
        ],
        margin: [30, 0, 30, 50],
      },

      // Linha de assinatura
      {
        text: [
          { text: "Assinatura:", bold: true },
          {
            text: " _________________________________________________________________",
          },
        ],
        margin: [30, 0, 30, 0],
        fontSize: 12,
      },
    ],
    styles: {
      headerTitle: {
        fontSize: 20,
        bold: true,
        color: "#000000",
      },
      headerSubtext: {
        fontSize: 10,
        color: "#000000",
      },
      tableHeader: {
        fontSize: 10,
        bold: true,
        fillColor: "#ffffff",
        color: "#000000",
      },
      terms: {
        fontSize: 12,
        alignment: "justify",
        lineHeight: 1.2,
      },
    },
  };

  pdfMake.createPdf(docDefinition).download("termo-de-responsabilidade.pdf");
};
