function calcularSalarioLiquido(
  salarioBruto,
  inss,
  impostoRenda,
  outrosDescontos
) {
  const salarioLiquido = salarioBruto - inss - impostoRenda - outrosDescontos;

  return salarioLiquido;
}

module.exports = calcularSalarioLiquido;
