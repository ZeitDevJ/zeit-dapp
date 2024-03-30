import { useData } from "@/context/DataContext";
import calculateMinimumAmountReceived from "@/utility functions/general/get-minimum-amount";
import calculateFee from "@/utility functions/miscellanous/fee-calculator";
import { convertToWEI } from "@/utility functions/miscellanous/price-converter";
import {
  roundDown,
  roundUpTo4DecimalPlaces,
} from "@/utility functions/miscellanous/round-figures";
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
      const payload = convertToWEI(firstTokenAmount);
      const payloadUnit = convertToWEI(1);
      setQuotePopup(true);
      const data = await getAmountsOut(
        providerState,
        payload,
        firstToken.addy,
        secondToken.addy
      );
      const dataUnit = await getAmountsOut(
        providerState,
        payloadUnit,
        firstToken.addy,
        secondToken.addy
      );

      const roundedData = roundUpTo4DecimalPlaces(data);
      const roundedUnit = roundDown(dataUnit);
      const feeOnSwap = calculateFee(firstTokenAmount);
      const slippage = 2;
      calculateMinimumAmountReceived(data, slippage);
      setRtPrice({
        ...rtPrice,
        roundFour: roundedData,
        fee: feeOnSwap,
        real: data,
        perOne: roundedUnit,
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
