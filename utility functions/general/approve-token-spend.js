import E20ABI from "@/data/ERC20-token-abi";
import { routerAddress } from "@/data/constants";
import { ethers } from "ethers";
import toastInvoker from "../miscellanous/toast-invoker";

const approveSpend = async (
  signerState,
  tokenAddress,
  amount,
  setAppState,
  appState,
  setApproval
) => {
  setAppState({
    ...appState,
    isApprovedLoading: true,
  });
  try {
    const Contract = new ethers.Contract(tokenAddress, E20ABI, signerState);
    const data = await Contract.approve(routerAddress, amount);
    Contract.on("Approval", () => {
      toastInvoker("success", "Success", "Token approval success!");
      setAppState({
        ...appState,
        isApprovedLoading: false,
      });
      setApproval(true);
    });
  } catch (error) {
    if (error.code == "ACTION_REJECTED") {
      toastInvoker("danger", "Request rejected!", "User rejected the request");
    }
    setAppState({
      ...appState,
      isApprovedLoading: false,
    });
    setApproval(false);
  }
  // console.log(data);

  // Needed for swap sha
};
export default approveSpend;
