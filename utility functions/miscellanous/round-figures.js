const roundDown = (number) => {
  if (typeof number === "string") {
    return Math.floor(parseFloat(number) * 100) / 100;
  } else {
    return Math.floor(number * 100) / 100;
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
