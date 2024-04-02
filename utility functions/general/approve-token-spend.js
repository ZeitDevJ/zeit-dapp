import E20ABI from "@/data/ERC20-token-abi";
import { routerAddress } from "@/data/constants";
import { ethers } from "ethers";
import toastInvoker from "../miscellanous/toast-invoker";

const approveSpend = async (signerState, tokenAddress, amount) => {
  const Contract = new ethers.Contract(tokenAddress, E20ABI, signerState);
  const data = await Contract.approve(routerAddress, amount);
  Contract.on("Approval", () => {
    toastInvoker("success", "Success", "Token approval success!");
  });
  // console.log(data);

  // Needed for swap sha
};
export default approveSpend;
