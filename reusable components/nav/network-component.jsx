import { memo } from "react";
import { ReactSVG } from "react-svg";
import { useData } from "@/context/DataContext";
import changeNetwork from "@/utility functions/wallet connect/change-network";

const NetworkComponent = memo(() => {
  const { isOnChain, isConnected } = useData();
  if (isConnected === true) {
    if (isOnChain === true) {
      return (
        <p className="px-[30px] py-[10px] tmdsbold font-generic border gap-[10px] border-[#CDD5DF] rounded-[8px]">
          Sepolia
        </p>
      );
    } else {
      return (
        <button
          onClick={changeNetwork}
          className="px-[8px] flex items-center py-[10px] border gap-[10px] border-[#CDD5DF] rounded-[8px]"
        >
          <ReactSVG src="/images/nav/warning.svg" />
          <ReactSVG src="/images/nav/chevron.svg" />
        </button>
      );
    }
  } else {
    return null;
  }
});

export default NetworkComponent;
