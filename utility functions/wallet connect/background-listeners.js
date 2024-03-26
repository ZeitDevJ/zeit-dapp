import { getBalance, getCurrentChainId } from "./get-credentials";
import shortenAdress from "../miscellanous/shorten-address";
import { REQUIRED_CHAIN_ID } from "@/data/constants";
import toastInvoker from "../miscellanous/toast-invoker";
import { ethers } from "ethers";

const getCurrentWalletConnected = async (
  appData,
  setAppData,
  setIsConnected,
  setIsOnChain,
  balance,
  setBalance,
  setProviderState,
  setSignerState
) => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_accounts", []);
      const signer = provider.getSigner();
      if (accounts.length > 0) {
        const account = accounts[0];
        const sAddy = shortenAdress(account);
        setAppData({
          ...appData,
          walletAddress: account,
          shortenedWAddress: sAddy,
        });
        setProviderState(provider);
        setSignerState(signer);
        setIsConnected(true);
        toastInvoker("success", "Success!", "Wallet connected successfully!");

        const chainId = await getCurrentChainId();
        if (chainId !== REQUIRED_CHAIN_ID) {
          toastInvoker(
            "warning",
            "Wrong Network!",
            "Wrong chain, change to continue!"
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
        "Check your network!"
      );
    }
  }
};

const checkSwitchAccounts = async (
  appData,
  setAppData,
  setIsConnected,
  balance,
  setBalance,
  setProviderState,
  setSignerState
) => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    window.ethereum.on("accountsChanged", async () => {
      if (accounts.length > 0 && appData.walletAddress != null) {
        toastInvoker(
          "info",
          "Account changed!",
          "Refreshing wallet details..."
        );
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);
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

        const fetchedBal = await getBalance(account);
        const roundedUpBal = fetchedBal.toFixed(2);
        setBalance({
          ...balance,
          fullBalance: balance,
          roundedBalance: roundedUpBal,
        });
      } else if (accounts.length > 0 && appData.walletAddress == null) {
        return;
      } else {
        toastInvoker(
          "warning",
          "Wallet disconnected!",
          "Connect to use this app!"
        );
        setAppData({
          ...appData,
          walletAddress: null,
          shortenedWAddress: null,
        });
        setBalance({
          ...balance,
          fullBalance: null,
          roundedBalance: null,
        });
        setIsConnected(false);
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
