import { ReactSVG } from "react-svg";
import { useData } from "@/context/DataContext";
import ModalSkeleton from "./modal-skeleton";
import { memo } from "react";

const TokenSelect = memo(
  ({
    popUp,
    setModal,
    setFirstToken,
    setSecondToken,
    firstToken,
    secondToken,
    order,
    setSymbol,
  }) => {
    const { mode } = useData();

    const selectToken = (abbrev, cAddress) => {
      if (abbrev == secondToken.name && order == "from") {
        setSecondToken({
          addy: firstToken.token,
          name: firstToken.name,
        });
        setFirstToken({
          addy: cAddress,
          name: abbrev,
        });
        setSymbol(abbrev + firstToken.name);
        setModal(false);
        return;
      } else if (abbrev == firstToken.name && order == "to") {
        setFirstToken({
          addy: secondToken.token,
          name: secondToken.name,
        });
        setSecondToken({
          addy: cAddress,
          name: abbrev,
        });
        setSymbol(secondToken.name + abbrev);
        setModal(false);
        return;
      }
      if (order == "from") {
        setFirstToken({
          addy: cAddress,
          name: abbrev,
        });
        setSymbol(abbrev + secondToken.name);
      } else {
        setSecondToken({
          addy: cAddress,
          name: abbrev,
        });
        setSymbol(firstToken.name + abbrev);
      }
      setModal(false);
    };
    return (
      <ModalSkeleton width="max-w-[356px]" popUp={popUp}>
        <div className="flex mb-[8px] w-full justify-between">
          <p
            className={` font-generic smsbold ${
              mode ? "text-[#000]" : "text-white"
            } `}
          >
            Select Token
          </p>
          <button onClick={() => setModal((prev) => !prev)}>
            <ReactSVG src="/images/swap/close.svg" />
          </button>
        </div>
        {/* <p className="text-[16px] font-Inter font-[400]">
            Search using a Token name or Contract address
          </p>
          <div className="">
            <input
              type="text"
              className="w-full p-[6px] my-[16px] text-[#A3A3A3] font-Inter text-[16px] font-[400] text-input"
            />
          </div> */}
        <h3 className="font-generic tmdbold mb-[16px]">Hot Tokens</h3>
        <div className="flex gap-[16px] overflow-x-auto mb-[12px] pb-[4px]">
          <button
            onClick={() => selectToken("BTC")}
            className="h-[40px] p-[8px] text-[#364152] flex items-center tsmreg"
          >
            {/* <TokenImg classNames="mr-[4px]" tokenType="BTC" /> */}
            BTC
          </button>
          <button
            onClick={() => selectToken("ETH")}
            className="h-[40px] p-[8px] text-[#364152] flex items-center tsmreg"
          >
            {/* <TokenImg classNames="mr-[4px]" tokenType="ETH" /> */}
            ETH
          </button>
          <button
            onClick={() => selectToken("USDT")}
            className="h-[40px] p-[8px] text-[#364152] flex items-center tsmreg"
          >
            {/* <TokenImg classNames="mr-[4px]" tokenType="USDT" /> */}
            USDT
          </button>
        </div>
        <h3 className="font-Inter text-[16px] font-[700]">Token List</h3>
        <div className="overflow-y-auto max-h-[30vh]">Show list here</div>
      </ModalSkeleton>
    );
  }
);

export default TokenSelect;
