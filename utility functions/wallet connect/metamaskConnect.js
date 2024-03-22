import shortenAdress from "../miscellanous/shorten-address";
import { getBalance, getCurrentChainId } from "./get-credentials";
import { REQUIRED_CHAIN_ID } from "@/data/constants";

const metamaskConnect = async (
  appData,
  setAppData,
  setIsConnected,
  setIsOnChain,
  balance,
  setBalance,
  setPopUp
) => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const account = accounts[0];
      const sAddy = shortenAdress(account);
      setAppData({
        ...appData,
        walletAddress: account,
        shortenedWAddress: sAddy,
      });
      setIsConnected(true);
      setPopUp(false);

      const chainId = await getCurrentChainId();
      if (chainId !== REQUIRED_CHAIN_ID) {
        console.log(
          `Wrong network detected. Please switch to the Polygon network from chain ${chainId}`
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
