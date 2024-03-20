import { useState, useContext, createContext, useEffect } from "react";
const DataContext = createContext({});
const { Provider } = DataContext;
import {
  getCurrentWalletConnected,
  checkSwitchAccounts,
} from "@/utility functions/wallet connect/background-listeners";

const DataGet = ({ children }) => {
  const [mode, setMode] = useState(true);
  useEffect(() => {
    getCurrentWalletConnected();
    checkSwitchAccounts();
  }, []);

  return <Provider value={{ setMode, mode }}>{children}</Provider>;
};
const useData = () => useContext(DataContext);
export { useData, DataGet };
