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
const convertToBalance = (amount, param) => {
  if (param) {
    if (!amount[0]._isBigNumber) {
      return amount[0]._hex;
    } else {
      return ethers.utils.formatEther(amount[0]._hex);
    }
  } else {
    if (!amount[1]._isBigNumber) {
      return amount[1]._hex;
    } else {
      return ethers.utils.formatEther(amount[1]._hex);
    }
  }
};
const convertToBalanceTwo = (amount) => {
  return ethers.utils.formatEther(amount._hex);
};
export { convertToBalance, convertToWEI, convertToBalanceTwo };
