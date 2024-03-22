import { memo, useState, useRef } from "react";
import { ReactSVG } from "react-svg";
import { useData } from "@/context/DataContext";
import BasicDropDown from "@/reusable components/widgets/dropdowns/basic-dropdown";

const ConnectComponent = memo(({ setPopUp }) => {
  const { isConnected, appData, balance } = useData();
  const [isOpen, setDropDownOpen] = useState(false);
  const inputElement = useRef();
  if (isConnected === true) {
    return (
      <div
        ref={inputElement}
        className="p-[12px] relative flex items-center border gap-[10px] border-[#CDD5DF] rounded-[8px]"
      >
        <span className="tsmmed font-generic">
          {balance.roundedBalance ? balance.roundedBalance : "-"} ETH
        </span>
        <button
          onClick={() => setDropDownOpen((prevState) => !prevState)}
          className="flex items-center py-[6px] px-[12px] gap-[8px] text-[#333333] bg-[#EEF2F6] rounded-[6px]"
        >
          <span className="tsmmed font-generic">
            {appData.shortenedWAddress && appData.shortenedWAddress}
          </span>
          <ReactSVG src="/images/nav/chevron.svg" />
        </button>
        <BasicDropDown
          address={appData.walletAddress}
          setDropDownOpen={setDropDownOpen}
          isOpen={isOpen}
          reference={inputElement}
        />
      </div>
    );
  } else {
    return (
      <button
        onClick={() => setPopUp(true)}
        className="px-[30px] py-[10px] tmdsbold font-generic border gap-[10px] border-[#CDD5DF] rounded-[8px]"
      >
        Connect Wallet
      </button>
    );
  }
});
export default ConnectComponent;
