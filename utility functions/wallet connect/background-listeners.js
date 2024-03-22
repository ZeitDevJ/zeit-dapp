import { getBalance } from "./get-credentials";
import shortenAdress from "../miscellanous/shorten-address";
import { REQUIRED_CHAIN_ID } from "@/data/constants";

const getCurrentWalletConnected = async (
  appData,
  setAppData,
  setIsConnected,
  setIsOnChain,
  balance,
  setBalance
) => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        const account = accounts[0];
        const sAddy = shortenAdress(account);
        setAppData({
          ...appData,
          walletAddress: account,
          shortenedWAddress: sAddy,
        });
        setIsConnected(true);
        const chainId = ethereum.chainId;
        console.log(chainId);
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
      } else {
        // we rest, dont do much headers, it's a side effect, don;t disturb the user
        return;
      }
    } catch (error) {
      // just say network error here like oncuechange, so they know what's going on!
    }
  }
};

const checkSwitchAccounts = async () => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    window.ethereum.on("accountsChanged", (accounts) => {
      // notify, accounts ChannelMergerNode, and if there's need, ask them sign in again
      if (accounts.length > 0) {
        // then there is an account yay!
        const account = accounts[0];
        console.log(account);

        // then fetch balance
        getBalance(account);
      } else {
        console.log(accounts[0]);
        // detect when account has been disconnected here
        // we rest, dont do much headers, it's a side effect, don;t disturb the user
        return;
      }
    });
  }
};
const checkChangeNetwork = async () => {
  window.ethereum.on("chainChanged", (chainId) => {
    if (chainId !== REQUIRED_CHAIN_ID) {
      console.log(
        `Wrong network detected. Please switch to the Polygon network from chain ${chainId}`
      );
      // Optionally, you can call a function to guide the user to switch networks
      // switchToReuiredNetwork();
    } else {
      console.log("right network");
    }
    // You might want to handle network change here
    // For example, refreshing data based on the new network
  });
};

// remember to store wallet adderess and other neccessary details in context !

export { getCurrentWalletConnected, checkSwitchAccounts, checkChangeNetwork };
