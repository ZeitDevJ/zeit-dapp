const calculateFee = (amount) => {
  if (typeof amount === "string") {
    return parseFloat(amount) * 0.003;
  } else {
    return amount * 0.003;
  }
};

export default calculateFee;
