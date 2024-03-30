import { ethers } from "ethers";

const convertToWEI = (amount) => {
  let strngAmount = null;
  if (amount == null || amount === "") return;
  if (typeof amount != "string") {
    strngAmount = amount.toString();
  } else {
    strngAmount = amount;
  }
  if (strngAmount == "0") {
    return 0;
  }
  return ethers.utils.parseEther(strngAmount);
};
const convertToBalance = (amount) => {
  return ethers.utils.formatEther(amount);
};

export { convertToBalance, convertToWEI };
