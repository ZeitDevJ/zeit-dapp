import { memo, useState } from "react";
import { ReactSVG } from "react-svg";
import { useData } from "@/context/DataContext";
import ModalSkeleton from "./modal-skeleton";
import metamaskConnect from "@/utility functions/wallet connect/metamaskConnect";
import ModalAnimation from "../animation components/modal-animation";

const WalletConnect = memo(({ popUp, setPopUp }) => {
  const {
    mode,
    appData,
    setAppData,
    setIsConnected,
    setIsOnChain,
    balance,
    setBalance,
    setSignerState,
    setProviderState,
  } = useData();
  const [loadState, setLoadState] = useState(false);
  return (
    <ModalSkeleton width="max-w-[356px]" popUp={popUp}>
      <div className="overflow-hidden relative">
        <div
          className={`absolute top-0 ${
            loadState && "translate-x-[-100%]"
          } transition-[.4s] left-0`}
        >
          <div className="flex mb-[32px] text-black w-full justify-between">
            <p
              className={` font-generic smsbold ${
                mode ? "text-[#000]" : "text-white"
              } `}
            >
              Connect Wallet
            </p>
            <button onClick={() => setPopUp(false)}>
              <ReactSVG src="/images/swap/close.svg" />
            </button>
          </div>
          <p className="font-generic tsmreg mb-[32px]">
            Choose how you want to connect. There are several wallet providers.
          </p>
          <div className="flex flex-col mb-[32px] gap-[16px]">
            <button
              onClick={() =>
                metamaskConnect(
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
                )
              }
              className="flex items-center justify-between tetiary-btn rounded-[8px] px-[12px] py-[14px]"
            >
              <span className="tsmreg font-generic">Metamask</span>
              <ReactSVG src="/images/modal/metamask.svg" />
            </button>
            <button className="flex items-center justify-between tetiary-btn rounded-[8px] px-[12px] py-[14px]">
              <span className="tsmreg font-generic">Coinbase</span>
              <ReactSVG src="/images/modal/coinbase.svg" />
            </button>
            <button className="flex items-center justify-between tetiary-btn rounded-[8px] px-[12px] py-[14px]">
              <span className="tsmreg font-generic">Wallet Connect</span>
              <ReactSVG src="/images/modal/wallet-connect.svg" />
            </button>
          </div>
          <p className="font-generic tsmreg">
            We do not own your private key and cannot connect to your wallet
            without your consent.
          </p>
        </div>
        <ModalAnimation
          loadState={loadState}
          connectWallet={() => {
            metamaskConnect(
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
            );
            console.log(loadState);
          }}
        />
      </div>
    </ModalSkeleton>
  );
});

export default WalletConnect;
