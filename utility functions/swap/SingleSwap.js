import { ethers } from "ethers";
import routerABI from "@/data/router-abi";
import { routerAddress } from "@/data/constants";

const getAmountsOut = async (
  providerState,
  amountIn,
  addressTo,
  addressFrom
) => {
  const Contract = new ethers.Contract(routerAddress, routerABI, providerState);
  const data = await Contract.getAmountOut(amountIn, [addressFrom, addressTo]);
  return data;
};

return { getAmountsOut };
