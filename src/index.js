const calcularImpostoRenda = require("./calculo_imposto_renda");
const calcularInss = require("./calculo_inss");
const readline = require("readline");
const calcularSalarioLiquido = require("./calculo_salario_liquido");
const input = readline.createInterface(process.stdin, process.stdout);
const folhaPagamento = {
  nome: "",
  salarioBruto: 0,
  inss: 0,
  impostoRenda: 0,
  outrosDescontos: 0,
  salarioLiquido: 0
};

input.question("Qual o seu salario? ", (salario) => {
  folhaPagamento.salarioBruto = Number(salario);
  folhaPagamento.inss = calcularInss(folhaPagamento.salarioBruto);
  console.log("INSS: R$ " + folhaPagamento.inss.toFixed(2));
  folhaPagamento.impostoRenda = calcularImpostoRenda(
    folhaPagamento.salarioBruto
  );
  console.log(
    "Imposto de Renda a ser pago: R$ " + folhaPagamento.impostoRenda.toFixed(2)
  );

  folhaPagamento.salarioLiquido = calcularSalarioLiquido(
    folhaPagamento.salarioBruto,
    folhaPagamento.inss,
    folhaPagamento.impostoRenda,
    folhaPagamento.outrosDescontos
  );
  console.log(
    "Salario Liquido: R$ " + folhaPagamento.salarioLiquido.toFixed(2)
  );
  input.close();
});
