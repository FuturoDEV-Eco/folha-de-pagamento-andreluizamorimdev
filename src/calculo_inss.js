function calcularInss(salarioBruto) {
  const TETO_INSS = 908.85;
  let inss = 0;

  if (salarioBruto <= 1412) {
    inss = salarioBruto * 0.075;
  } else if (salarioBruto >= 1412.01 && salarioBruto <= 2666.68) {
    inss = salarioBruto * 0.09;
  } else if (salarioBruto >= 2666.69 && salarioBruto <= 4000.03) {
    inss = salarioBruto * 0.12;
  } else {
    inss = salarioBruto * 0.14;
  }

  if (inss >= TETO_INSS) {
    inss = TETO_INSS;
  }

  return inss;
}

module.exports = calcularInss;
