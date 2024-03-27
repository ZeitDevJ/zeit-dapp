import { useData } from "@/context/DataContext";
import { memo } from "react";

const SwapButton = memo(({ buttonState }) => {
  const { isConnected } = useData();
  if (isConnected !== true) {
    return (
      <button disabled className="w-full medium-btn default-btn">
        Wallet Not Connected
      </button>
    );
  } else if (buttonState === "") {
    return (
      <button disabled className="w-full medium-btn default-btn">
        Enter an amount
      </button>
    );
  } else if (buttonState === "ready") {
    return <button className="w-full medium-btn default-btn">Get quote</button>;
  }
});

export default SwapButton;
