function calcularImpostoRenda(salarioBruto) {
  let impostoRenda = 0;
  let aliquota = 0;

  if (salarioBruto <= 2112.0) {
    aliquota = 0;
    impostoRenda = impostoRenda * aliquota;
    return impostoRenda;
  } else if (salarioBruto >= 2112.01 && salarioBruto <= 2826.65) {
    aliquota = 0.075;
    impostoRenda = salarioBruto * aliquota - 158.4;
  } else if (salarioBruto >= 2826.66 && salarioBruto <= 3751.05) {
    aliquota = 0.15;
    impostoRenda = salarioBruto * aliquota - 370.4;
  } else if (salarioBruto >= 3751.06 && salarioBruto <= 4664.68) {
    aliquota = 0.225;
    impostoRenda = salarioBruto * aliquota - 651.73;
  } else {
    aliquota = 0.275;
    impostoRenda = salarioBruto * aliquota - 884.96;
  }
  return impostoRenda;
}

module.exports = calcularImpostoRenda;
