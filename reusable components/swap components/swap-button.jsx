import { useData } from "@/context/DataContext";
import { memo } from "react";

const SwapButton = memo(({ tokenAmount, fetchReserves }) => {
  const { firstTokenAmount, secondTokenAmount } = tokenAmount;
  const { isConnected } = useData();
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
          onClick={fetchReserves}
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
});

export default SwapButton;
