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
  setProviderState
) => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
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
          "I have detected you're on a wrong chain, kindly change it to continue!"
        );
      } else {
        const fetchedBal = await getBalance(account);
        const roundedUpBal = fetchedBal.toFixed(2);
        setBalance({
          ...balance,
          fullBalance: balance,
          roundedBalance: roundedUpBal,
        });
        setIsOnChain(true);
      }
    } catch (error) {
      // deal with error here well
      // user declined request basically.....
    }
  } else {
    // deal with error here well
    // tell them they have no metamask?
    // take users to download metaask?
  }
};

export default metamaskConnect;
