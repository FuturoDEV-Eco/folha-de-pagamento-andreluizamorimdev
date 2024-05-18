const calcularInss = require("./calculo_inss");
const readline = require("readline");
const input = readline.createInterface(process.stdin, process.stdout);
const folhaPagamento = {
  nome: "",
  salarioBruto: 0,
  inss: 0,
  impostoRenda: 0,
  salarioLiquido: 0
};

input.question("Qual o seu salario? ", (salario) => {
  folhaPagamento.salarioBruto = Number(salario);
  folhaPagamento.inss = calcularInss(folhaPagamento.salarioBruto);
  console.log("INSS: " + folhaPagamento.inss.toFixed(2));
  input.close();
});
