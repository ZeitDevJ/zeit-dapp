const roundDown = (number, significantFigures) => {
  if (number == null) return;
  if (typeof number === "string") {
    number = parseFloat(number);
  }

  if (isNaN(number) || number === 0) {
    return 0;
  }
  const numStr = number.toString();

  if (numStr.includes(".")) {
    const [integerPart, decimalPart] = numStr.split(".");

    if (parseInt(integerPart) !== 0) {
      return (
        Math.floor(number * 10 ** significantFigures) / 10 ** significantFigures
      );
    } else {
      const multiplier = Math.pow(
        10,
        significantFigures - Math.floor(Math.log10(Math.abs(number))) - 1
      );
      return Math.floor(number * multiplier) / multiplier;
    }
  } else {
    return (
      Math.floor(number * 10 ** significantFigures) / 10 ** significantFigures
    );
  }
};

function roundUpTo5DecimalPlaces(number) {
  if (typeof number === "string") {
    return Math.floor(parseFloat(number) * 100000) / 100000;
  } else {
    return Math.ceil(number * 100000) / 100000;
  }
}

function roundUpTo4DecimalPlaces(number) {
  if (typeof number === "string") {
    return Math.floor(parseFloat(number) * 10000) / 10000;
  } else {
    return Math.ceil(number * 10000) / 10000;
  }
}

export { roundDown, roundUpTo4DecimalPlaces, roundUpTo5DecimalPlaces };
