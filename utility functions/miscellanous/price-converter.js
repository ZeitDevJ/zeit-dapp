import { ethers } from "ethers";

const convertToWEI = (amount) => {
  return ethers.utils.parseEther(amount);
};
const convertToBalance = (amount) => {
  return ethers.utils.formatEther(amount);
};

export { convertToBalance, convertToWEI };
