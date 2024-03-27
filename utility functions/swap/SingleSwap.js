import { ethers } from "ethers";
import routerABI from "@/data/router-abi";
import { routerAddress } from "@/data/constants";
import { convertToBalance } from "../miscellanous/price-converter";

const getAmountsOut = async (
  providerState,
  amountIn,
  addressTo,
  addressFrom
) => {
  const Contract = new ethers.Contract(routerAddress, routerABI, providerState);
  const data = await Contract.getAmountOut(amountIn, addressFrom, addressTo);
  return convertToBalance(data);
};

export { getAmountsOut };
