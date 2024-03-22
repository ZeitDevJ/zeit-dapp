import { useState, useContext, createContext, useEffect } from "react";
const DataContext = createContext({});
const { Provider } = DataContext;
import {
  getCurrentWalletConnected,
  checkSwitchAccounts,
  checkChangeNetwork,
} from "@/utility functions/wallet connect/background-listeners";

const DataGet = ({ children }) => {
  const [mode, setMode] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [isOnChain, setIsOnChain] = useState(false);
  const [appData, setAppData] = useState({
    walletAddress: null,
    shortenedWAddress: null,
  });
  const [balance, setBalance] = useState({
    fullBalance: null,
    roundedBalance: null,
  });
  useEffect(() => {
    console.log(isConnected, isOnChain, appData);
  }, [appData, isConnected, isOnChain]);
  useEffect(() => {
    getCurrentWalletConnected(
      appData,
      setAppData,
      setIsConnected,
      setIsOnChain,
      balance,
      setBalance
    );
    checkSwitchAccounts();
    checkChangeNetwork(setIsOnChain);
  }, []);

  return (
    <Provider
      value={{
        setMode,
        mode,
        isConnected,
        setIsConnected,
        isOnChain,
        setIsOnChain,
        appData,
        setAppData,
        balance,
        setBalance,
      }}
    >
      {children}
    </Provider>
  );
};
const useData = () => useContext(DataContext);
export { useData, DataGet };
