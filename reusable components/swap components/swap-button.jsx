import { useData } from "@/context/DataContext";
import { convertToWEI } from "@/utility functions/miscellanous/price-converter";
import { getAmountsOut } from "@/utility functions/swap/SingleSwap";
import { memo } from "react";

const SwapButton = memo(
  ({ tokenAmount, setQuotePopup, setRtPrice, firstToken, secondToken }) => {
    const { firstTokenAmount, secondTokenAmount } = tokenAmount;
    const { isConnected, providerState } = useData();
    const payload = convertToWEI(firstToken.tokenBalance);
    const prepareQuote = async () => {
      setQuotePopup(true);
      const data = await getAmountsOut(
        providerState,
        payload,
        firstToken.addy,
        secondToken.addy
      );
      console.log(data);
    };
    if (isConnected !== true) {
      return (
        <button disabled className="w-full medium-btn default-btn">
          Wallet Not Connected
        </button>
      );
    } else {
      if (
        firstTokenAmount !== null &&
        firstTokenAmount != "0" &&
        firstTokenAmount !== "" &&
        secondTokenAmount !== null &&
        secondTokenAmount != "0" &&
        secondTokenAmount !== ""
      ) {
        return (
          <button
            onClick={prepareQuote}
            className="w-full medium-btn default-btn"
          >
            Get quote
          </button>
        );
      } else {
        return (
          <button disabled className="w-full medium-btn default-btn">
            Enter an amount
          </button>
        );
      }
    }
  }
);

export default SwapButton;
