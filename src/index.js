const calcularImpostoRenda = require("./calculo_imposto_renda");
const calcularInss = require("./calculo_inss");
const readline = require("readline");
const calcularSalarioLiquido = require("./calculo_salario_liquido");
const formatarCpf = require("./formatarCpf");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const doc = new PDFDocument();

const input = readline.createInterface(process.stdin, process.stdout);
const folhaPagamento = {
  nome: "",
  salarioBruto: 0,
  inss: 0,
  impostoRenda: 0,
  outrosDescontos: 0,
  salarioLiquido: 0
};

input.question("Nome: ", (nome) => {
  folhaPagamento.nome = nome;
  input.question("CPF: ", (cpf) => {
    folhaPagamento.cpf = formatarCpf(cpf);
    input.question("Mês do pagamento (numérico): ", (mes_pagamento) => {
      folhaPagamento.mesPagamento = Number(mes_pagamento);
      input.question("Salário Bruto: R$ ", (salario) => {
        folhaPagamento.salarioBruto = Number(salario);
        folhaPagamento.inss = calcularInss(folhaPagamento.salarioBruto);
        folhaPagamento.impostoRenda = calcularImpostoRenda(
          folhaPagamento.salarioBruto
        );
        folhaPagamento.salarioLiquido = calcularSalarioLiquido(
          folhaPagamento.salarioBruto,
          folhaPagamento.inss,
          folhaPagamento.impostoRenda,
          folhaPagamento.outrosDescontos
        );

        console.log("\n---- Folha de Pagamento ----");
        console.log(`Nome: ${folhaPagamento.nome}`);
        console.log(`CPF: ${folhaPagamento.cpf}`);
        console.log(`Mês do Pagamento: ${folhaPagamento.mesPagamento}`);
        console.log(
          `Salário Bruto: R$ ${folhaPagamento.salarioBruto.toFixed(2)}`
        );
        console.log(`INSS: R$ ${folhaPagamento.inss.toFixed(2)}`);
        console.log(
          `Imposto de Renda: R$ ${folhaPagamento.impostoRenda.toFixed(2)}`
        );
        console.log(
          `Salário Líquido: R$ ${folhaPagamento.salarioLiquido.toFixed(2)}`
        );

        // ... (código anterior)

        input.question(
          "Deseja gerar um PDF com a folha de pagamento? (s/n) ? ",
          (resposta) => {
            if (resposta.toLowerCase() === "s") {
              if (!fs.existsSync("src/folhas_pagamentos")) {
                fs.mkdirSync("src/folhas_pagamentos");

                console.log("Gerando PDF...");
                const nomeArquivo = `src/folhas_pagamentos/folha_pagamento_${folhaPagamento.nome}.pdf`;

                doc.pipe(fs.createWriteStream(nomeArquivo));
                doc.fontSize(16);
                doc.text("--- Folha de Pagamento ---");
                doc.text(`Data de Geração: ${new Date().toLocaleDateString()}`);
                doc.text(`Nome: ${folhaPagamento.nome}`);
                doc.text(`CPF: ${folhaPagamento.cpf}`);
                doc.text(`Mês do Pagamento: ${folhaPagamento.mesPagamento}`);
                doc.text("--- ---");
                doc.text(
                  `Salário Bruto: R$ ${folhaPagamento.salarioBruto.toFixed(2)}`
                );
                doc.text("--- Descontos ---");
                doc.text(`INSS: R$ ${folhaPagamento.inss.toFixed(2)}`);
                doc.text(
                  `Imposto de Renda: R$ ${folhaPagamento.impostoRenda.toFixed(
                    2
                  )}`
                );
                doc.text(
                  `Outros Descontos: R$ ${folhaPagamento.outrosDescontos.toFixed(
                    2
                  )}`
                );
                doc.text("--- ---");
                doc.text(
                  `Salário Líquido: R$ ${folhaPagamento.salarioLiquido.toFixed(
                    2
                  )}`
                );
                doc.end();
                console.log(`Folha de pagamento salva em ${nomeArquivo}!`);
              }
            } else {
              console.log(
                "Obrigado por utilizar o sistema de folha de pagamento!"
              );
            }
            input.close();
          }
        );
      });
    });
  });
});
