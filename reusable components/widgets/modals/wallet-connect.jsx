import { memo } from "react";
import { ReactSVG } from "react-svg";
import { useData } from "@/context/DataContext";
import ModalSkeleton from "./modal-skeleton";
import metamaskConnect from "@/utility functions/wallet connect/metamaskConnect";

const WalletConnect = memo(({ popUp, setPopUp }) => {
  const {
    mode,
    appData,
    setAppData,
    setIsConnected,
    setIsOnChain,
    balance,
    setBalance,
  } = useData();
  return (
    <ModalSkeleton width="max-w-[356px]" popUp={popUp}>
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
              setPopUp
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
        We do not own your private key and cannot connect to your wallet without
        your consent.
      </p>
    </ModalSkeleton>
  );
});

export default WalletConnect;
