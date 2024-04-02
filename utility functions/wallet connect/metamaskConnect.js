import shortenAdress from "../miscellanous/shorten-address";
import { getBalance, getCurrentChainId } from "./get-credentials";
import { REQUIRED_CHAIN_ID } from "@/data/constants";
import toastInvoker from "../miscellanous/toast-invoker";
import { ethers } from "ethers";

const metamaskConnect = async (
  appData,
  setAppData,
  setIsConnected,
  setIsOnChain,
  balance,
  setBalance,
  setPopUp,
  setSignerState,
  setProviderState,
  setLoadState
) => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    setLoadState(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const account = accounts[0];
      const sAddy = shortenAdress(account);
      setProviderState(provider);
      setSignerState(signer);
      setAppData({
        ...appData,
        walletAddress: account,
        shortenedWAddress: sAddy,
      });
      setIsConnected(true);
      setPopUp(false);
      toastInvoker("success", "Success!", "Wallet connected successfully!");

      const chainId = await getCurrentChainId();
      if (chainId !== REQUIRED_CHAIN_ID) {
        toastInvoker(
          "warning",
          "Wrong Network!",
          "Wrong network, change to continue!"
        );
      } else {
        const fetchedBal = await getBalance(account);
        const roundedUpBal = fetchedBal.toFixed(2);
        setBalance({
          ...balance,
          fullBalance: fetchedBal,
          roundedBalance: roundedUpBal,
        });
        setIsOnChain(true);
      }
      setLoadState(false);
    } catch (error) {
      if (error.code == 4001) {
        toastInvoker("danger", "Rejected!", error.message);
      } else if (error.code == -32002) {
        toastInvoker(
          "warning",
          "Request queued",
          "Check your wallet to connect!"
        );
      } else {
        toastInvoker(
          "danger",
          "Poor Network!",
          "Check your internet connection!"
        );
        setLoadState(false);
      }
    }
  } else {
    toastInvoker(
      "warning",
      "Wallet not found",
      "We didn't find any wallet in browser"
    );
    window.open(
      "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      "_blank"
    );
    setLoadState(false);
  }
};

export default metamaskConnect;
