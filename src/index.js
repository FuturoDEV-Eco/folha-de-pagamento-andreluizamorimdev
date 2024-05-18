const calcularImpostoRenda = require("./calculo_imposto_renda");
const calcularInss = require("./calculo_inss");
const readline = require("readline");
const calcularSalarioLiquido = require("./calculo_salario_liquido");
const formatarCpf = require("./formatarCpf");
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
        input.close();
      });
    });
  });
});
