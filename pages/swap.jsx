import { useState } from "react";
import HeadComp from "@/layout/HeadComp";
import { useData } from "@/context/DataContext";
import ChartComponent from "@/reusable components/swap components/chart-component";
import SwapBody from "@/reusable components/swap components/swap-body";
import TokenSelect from "@/reusable components/modals/token-select";
import { ReactSVG } from "react-svg";

const Swap = () => {
  const { mode } = useData();
  const [chartMod, setChartMod] = useState(false);
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [firstToken, setFirstToken] = useState({
    name: "BTC",
    addy: "0xB77a3B530c4B268873dc7F5E6270Ef115A655E7F",
  });
  const [secondToken, setSecondToken] = useState({
    name: "USDT",
    addy: "0xC067882ff7528E878fbC85f876a1D4e1964d0dBa",
  });
  const [tokenAmount, setTokenAmount] = useState({
    firstTokenAmount: "",
    secondTokenAmount: "",
  });
  const [rotateStat, setStat] = useState(false);
  const [popUp, setModal] = useState(false);
  const [order, setOrder] = useState(null);

  return (
    <>
      <HeadComp title="Zeit | Swap" />
      <main
        className={`${
          mode ? "bg-white" : "bg-[#1E1E1E]"
        } bg-sw pt-[96px] pb-[179px] transition-[.4s]`}
      >
        <section className="flex items-center md:w-[90%] gap-[32px] mx-auto">
          <ChartComponent chartMod={chartMod} symbol={symbol} />
          <div className="md:max-w-[584px] w-[95%] mx-auto bg-white rounded-[16px] sw-bxshdw md:w-[35%] p-[16px]">
            <h1 className="text-[#364152] text-[24px] font-Inter font-[600]">
              Swap
            </h1>
            <p className="font-Inter text-[16px] text-[#364152] mb-[16px] font-[400]">
              Instantly Trade Tokens
            </p>

            <hr className="mb-[16px] text-[#E3E8EF] bg-[#E3E8EF]" />
            <div className="h-[24px] mb-[16px] w-full">
              <span className="h-full flex gap-[16px] float-right">
                <button
                  onClick={() => setChartMod((prevState) => !prevState)}
                  className="hidden md:block"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6 20V14"
                      stroke={chartMod ? "#5BC0BE" : "#697586"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 20V10"
                      stroke={chartMod ? "#5BC0BE" : "#697586"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 20V4"
                      stroke={chartMod ? "#5BC0BE" : "#697586"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button className="">
                  <ReactSVG src="/images/swap/settings.svg" />
                </button>
              </span>
            </div>
            <SwapBody
              firstToken={firstToken}
              secondToken={secondToken}
              setTokenAmount={setTokenAmount}
              tokenAmount={tokenAmount}
              setStat={setStat}
              setFirstToken={setFirstToken}
              setSecondToken={setSecondToken}
              setSymbol={setSymbol}
              setModal={setModal}
              setOrder={setOrder}
              rotateStat={rotateStat}
            />
            <div className="my-[16px] font-Inter text-[14px] font-[500] text-[#202939] flex justify-between items-center">
              <span className="">Slippage</span>
              <span className="">5%</span>
            </div>
            <section className="">
              <button disabled className="w-full medium-btn default-btn">
                Wallet Not Connected
              </button>
            </section>
          </div>
        </section>
      </main>
      <TokenSelect
        setFirstToken={setFirstToken}
        firstToken={firstToken}
        setSecondToken={setSecondToken}
        setModal={setModal}
        secondToken={secondToken}
        popUp={popUp}
        order={order}
        setSymbol={setSymbol}
      />
    </>
  );
};

export default Swap;
