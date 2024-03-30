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
  const { _hex } = ethers.utils.parseEther(strngAmount);
  return _hex;
};
const convertToBalance = (amount) => {
  if (!amount[1]._isBigNumber) {
    return amount[1]._hex;
  } else {
    return ethers.utils.formatEther(amount[1]._hex);
  }
};

export { convertToBalance, convertToWEI };
