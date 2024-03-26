import { useEffect, useState } from "react";
import HeadComp from "@/layout/HeadComp";
import { useData } from "@/context/DataContext";
import ChartComponent from "@/reusable components/swap components/chart-component";
import SwapBody from "@/reusable components/swap components/swap-body";
import TokenSelect from "@/reusable components/widgets/modals/token-select";
import { ReactSVG } from "react-svg";
import Settings from "@/reusable components/widgets/modals/settings";
import E20ABI from "@/data/ERC20-token-abi";
import { ethers } from "ethers";

const Swap = () => {
  const { mode, appData, providerState } = useData();
  const [chartMod, setChartMod] = useState(false);
  const [symbol, setSymbol] = useState("WETHT1");
  const [firstToken, setFirstToken] = useState({
    name: "WETH",
    addy: "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
    abi: E20ABI,
    tokenBalance: null,
  });
  const [secondToken, setSecondToken] = useState({
    name: "T1",
    addy: "0x619aA97A3Ee04bb6A4d0248a4693b23cabe3f75a",
    abi: E20ABI,
    tokenBalance: null,
  });
  const [tokenAmount, setTokenAmount] = useState({
    firstTokenAmount: "",
    secondTokenAmount: "",
  });
  const [rotateStat, setStat] = useState(false);
  const [popUp, setModal] = useState(false);
  const [settingsPopup, setPopUp] = useState(false);
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchTokenBalances = async () => {
      if (!appData.walletAddress) return;

      const firstContract = new ethers.Contract(
        firstToken.addy,
        firstToken.abi,
        providerState
      );
      const secondContract = new ethers.Contract(
        secondToken.addy,
        secondToken.abi,
        providerState
      );

      try {
        const firstBalance = await firstContract.balanceOf(
          appData.walletAddress
        );
        const secondBalance = await secondContract.balanceOf(
          appData.walletAddress
        );

        setFirstToken((prevState) => ({
          ...prevState,
          tokenBalance: ethers.utils.formatEther(firstBalance),
        }));
        setSecondToken((prevState) => ({
          ...prevState,
          tokenBalance: ethers.utils.formatEther(secondBalance),
        }));
      } catch (error) {
        console.error("Error fetching token balances:", error);
      }
    };

    fetchTokenBalances();
  }, [
    appData.walletAddress,
    firstToken.addy,
    firstToken.abi,
    secondToken.addy,
    secondToken.abi,
  ]);
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
          <div className="md:max-w-[584px] min-w-fit w-[95%] mx-auto bg-white rounded-[16px] sw-bxshdw md:w-[35%] p-[16px]">
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
                <button onClick={() => setPopUp(true)} className="">
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
      <Settings popUp={settingsPopup} setPopUp={setPopUp} />
    </>
  );
};

export default Swap;
