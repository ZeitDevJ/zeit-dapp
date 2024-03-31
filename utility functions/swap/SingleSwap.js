import { ethers } from "ethers";
import routerABI from "@/data/router-abi";
import { factoryAddress, routerAddress } from "@/data/constants";
import { convertToBalance } from "../miscellanous/price-converter";
import factoryABI from "@/data/factory-abi";
// try catch here
const getAmountsOut = async (
  providerState,
  amountIn,
  addressTo,
  addressFrom
) => {
  const Contract = new ethers.Contract(routerAddress, routerABI, providerState);
  const data = await Contract.getAmountsOut(amountIn, [addressFrom, addressTo]);
  return convertToBalance(data);
};
const getAmountsIn = async (
  providerState,
  amountOut,
  addressTo,
  addressFrom
) => {
  const Contract = new ethers.Contract(routerAddress, routerABI, providerState);
  const data = await Contract.getAmountsIn(amountOut, [addressTo, addressFrom]);
  return convertToBalance(data, true);
};
const getReserves = async (tokenA, tokenB, providerState) => {
  const Contract = new ethers.Contract(
    factoryAddress,
    factoryABI,
    providerState
  );
  const data = await Contract.getReserves(factoryAddress, tokenA, tokenB);
};
export { getAmountsOut, getReserves, getAmountsIn };
