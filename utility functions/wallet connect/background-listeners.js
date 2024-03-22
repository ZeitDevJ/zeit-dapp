import { getBalance, getCurrentChainId } from "./get-credentials";
import shortenAdress from "../miscellanous/shorten-address";
import { REQUIRED_CHAIN_ID } from "@/data/constants";
import toastInvoker from "../miscellanous/toast-invoker";

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
        toastInvoker("success", "Success!", "Wallet connected successfully!");

        const chainId = await getCurrentChainId();
        if (chainId !== REQUIRED_CHAIN_ID) {
          toastInvoker(
            "warning",
            "Wrong Network!",
            "You're on a wrong chain, change to continue!"
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
        return;
      }
    } catch (error) {
      toastInvoker(
        "danger",
        "Network connection error!",
        "Check your network, try reloading thi page, this might help!"
      );
    }
  }
};

const checkSwitchAccounts = async (
  appData,
  setAppData,
  balance,
  setBalance
) => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    window.ethereum.on("accountsChanged", async (accounts) => {
      if (accounts.length > 0) {
        toastInvoker(
          "info",
          "Account changed!",
          "Refreshing wallet details..."
        );
        const account = accounts[0];
        const sAddy = shortenAdress(account);
        setAppData({
          ...appData,
          walletAddress: account,
          shortenedWAddress: sAddy,
        });

        const fetchedBal = await getBalance(account);
        const roundedUpBal = fetchedBal.toFixed(2);
        setBalance({
          ...balance,
          fullBalance: balance,
          roundedBalance: roundedUpBal,
        });
      } else {
        console.log(accounts[0]);
        toastInvoker(
          "warning",
          "Wallet disconnected!",
          "Wallet disconnected!, connect to use this app!"
        );
        return;
      }
    });
  }
};
const checkChangeNetwork = async (
  setIsOnChain,
  balance,
  setBalance,
  address
) => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    window.ethereum.on("chainChanged", async (chainId) => {
      if (chainId !== REQUIRED_CHAIN_ID) {
        toastInvoker(
          "warning",
          "Wrong Network!",
          "You're on a wrong chain, change to continue!"
        );
        setIsOnChain(false);
        if (balance.roundedBalance !== null && address !== null) {
          const fetchedBal = await getBalance(address);
          const roundedUpBal = fetchedBal.toFixed(2);
          setBalance({
            ...balance,
            roundedBalance: roundedUpBal,
          });
        }
      } else {
        setIsOnChain(true);
        if (balance.roundedBalance === null && address !== null) {
          setBalance({
            ...balance,
            roundedBalance: null,
          });
        }
      }
    });
  }
};

export { getCurrentWalletConnected, checkSwitchAccounts, checkChangeNetwork };
