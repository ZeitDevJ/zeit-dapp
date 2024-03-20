import { memo } from "react";
import TradingViewWidget from "@/reusable components/charts/TradingViewWidget";

const ChartComponent = memo(({ symbol, chartMod }) => {
  return (
    <div
      className={`transition-[.4s] w-[80%] hidden md:block rounded-[16px] sw-bxshdw ${
        chartMod ? "max-w-[100%] p-[16px]" : "max-w-0 invisible"
      } `}
    >
      <TradingViewWidget symbol={symbol} />
    </div>
  );
});

export default ChartComponent;
