import { useData } from "@/context/DataContext";
import getAllowance from "@/utility functions/general/get-allowance";
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
    setApproveInfo,
    slippageInfo,
  }) => {
    const { firstTokenAmount, secondTokenAmount } = tokenAmount;
    const { isConnected, providerState, appData } = useData();
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
      if (tokenAmount.secondTokenFullAmount === null) {
        setRtPrice({
          ...rtPrice,
          fee: feeOnSwap,
          perOne: roundedUnit,
          minimumRecieved: tokenAmount.secondTokenAmount,
          minimumRecievedRound: tokenAmount.secondTokenAmount,
        });
      } else {
        const { minimumAmountReceived, roundedValue } =
          calculateMinimumAmountReceived(
            tokenAmount.firstTokenFullAmount ||
              tokenAmount.secondTokenFullAmount,
            slippageInfo
          );
        setRtPrice({
          ...rtPrice,
          fee: feeOnSwap,
          perOne: roundedUnit,
          minimumRecieved: minimumAmountReceived,
          minimumRecievedRound: roundedValue,
        });
      }
      if (firstToken.addy !== "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9") {
        const allowance = await getAllowance(
          providerState,
          firstToken.addy,
          appData.walletAddress
        );
        console.log(allowance);
        const amtToSwap = parseFloat(tokenAmount.firstTokenAmount);
        console.log(amtToSwap);
        if (allowance >= amtToSwap) {
          console.log("hi");
          setApproveInfo(true);
        } else {
          setApproveInfo(false);
        }
      }
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
