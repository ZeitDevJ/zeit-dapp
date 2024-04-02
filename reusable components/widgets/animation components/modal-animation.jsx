import { ReactSVG } from "react-svg";
import { useData } from "@/context/DataContext";

const ModalAnimation = ({ connectWallet, loadState }) => {
  const { mode } = useData();
  if (loadState) {
    console.log(loadState);
  }
  return (
    <>
      <div
        className={` ${
          loadState ? "translate-x-0 delay-150" : "translate-x-[100%]"
        }  transition-[.4s] `}
      >
        <div className={`flex mb-[16px] text-black w-full justify-between`}>
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
        <p className="tsmreg font-generic text-[#666666] mb-[100px]">
          Connecting...
        </p>
        <div className="flex mb-[120px] w-fit mx-auto">
          <figure className="translate-x-[20px] react-svg color-change-top translate-y-[-20px]">
            <ReactSVG src="/images/modal/zeit-top.svg" />
          </figure>
          <figure className="translate-x-[-20px] react-svg color-change-bottom translate-y-[20px]">
            <ReactSVG src="/images/modal/zeit-bottom.svg" />
          </figure>
        </div>
        <div className="flex items-center justify-between">
          <p className="tsmreg font-generic text-[#666666]">Can't Connect?</p>
          <button
            onClick={connectWallet}
            className="font-generic text-[#666666] txsmed py-[4px] px-[12px] transition-[.4s] rounded-[8px] hover:bg-[#EEF2F6]"
          >
            Try again
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalAnimation;
