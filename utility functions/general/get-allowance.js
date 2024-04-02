import E20ABI from "@/data/ERC20-token-abi";
import { routerAddress } from "@/data/constants";
import { ethers } from "ethers";
import { convertToBalanceTwo } from "../miscellanous/price-converter";

const getAllowance = async (providerState, tokenAddress, userAddress) => {
  const Contract = new ethers.Contract(tokenAddress, E20ABI, providerState);
  const data = await Contract.allowance(userAddress, routerAddress);
  return convertToBalanceTwo(data);
};
export default getAllowance;
