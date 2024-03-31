import { useData } from "@/context/DataContext";
import calculateMinimumAmountReceived from "@/utility functions/general/get-minimum-amount";
import calculateFee from "@/utility functions/miscellanous/fee-calculator";
import { convertToWEI } from "@/utility functions/miscellanous/price-converter";
import { roundDown } from "@/utility functions/miscellanous/round-figures";
import { getAmountsOut } from "@/utility functions/swap/SingleSwap";
import { memo } from "react";

const SwapButton = memo(
  ({
    tokenAmount,
    setQuotePopup,
    setRtPrice,
    firstToken,
    secondToken,
    rtPrice,
  }) => {
    const { firstTokenAmount, secondTokenAmount } = tokenAmount;
    const { isConnected, providerState } = useData();
    const prepareQuote = async () => {
      const payloadUnit = convertToWEI(1);
      setQuotePopup(true);
      const dataUnit = await getAmountsOut(
        providerState,
        payloadUnit,
        secondToken.addy,
        firstToken.addy
      );

      const roundedUnit = roundDown(dataUnit, 2);
      const feeOnSwap = roundDown(calculateFee(firstTokenAmount), 4);
      console.log(feeOnSwap);
      const slippage = 2;
      const { minimumAmountReceived, roundedValue } =
        calculateMinimumAmountReceived(
          tokenAmount.firstTokenFullAmount || tokenAmount.secondTokenFullAmount,
          slippage
        );
      setRtPrice({
        ...rtPrice,
        fee: feeOnSwap,
        perOne: roundedUnit,
        minimumRecieved: minimumAmountReceived,
        minimumRecievedRound: roundedValue,
      });
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
