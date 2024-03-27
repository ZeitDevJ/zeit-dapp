import { memo } from "react";
import Input from "../inputs/swap-input";
import { ReactSVG } from "react-svg";
import { useData } from "@/context/DataContext";
import { ethers } from "ethers";
import roundDown from "@/utility functions/miscellanous/round-down";

const SwapBody = memo(
  ({
    setTokenAmount,
    firstToken,
    secondToken,
    tokenAmount,
    rotateStat,
    setStat,
    setFirstToken,
    setSecondToken,
    setSymbol,
    setModal,
    setOrder,
  }) => {
    const { providerState, appData, balance } = useData();
    const handleSwitch = async () => {
      setStat(true);
      if (secondToken.addy === "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9") {
        const roundBal = roundDown(balance.fullBalance);
        setFirstToken({
          name: secondToken.name,
          addy: secondToken.addy,
          abi: secondToken.abi,
          tokenBalance: roundBal,
        });
      } else {
        const Contract = new ethers.Contract(
          secondToken.addy,
          secondToken.abi,
          providerState
        );
        const data = await Contract.balanceOf(appData.walletAddress);
        const roundBal = roundDown(ethers.utils.formatEther(data));

        setFirstToken({
          name: secondToken.name,
          addy: secondToken.addy,
          abi: secondToken.abi,
          tokenBalance: roundBal,
        });
      }
      setSecondToken({
        name: firstToken.name,
        addy: firstToken.addy,
        abi: firstToken.abi,
      });
      setTimeout(() => setStat(false), 500);
      setSymbol(secondToken.name + firstToken.name);
    };
    const togglePopUp = (val) => {
      setModal(true);
      setOrder(val);
    };
    const changeAmount = ({ target }) => {
      const { name, value } = target;
      setTokenAmount({
        ...tokenAmount,
        [name]: value,
      });
    };
    const handlePercentageClick = (argument) => {
      switch (argument) {
        case "25":
          setTokenAmount({
            ...tokenAmount,
            firstTokenAmount: firstToken.tokenBalance * 0.25,
          });
          break;
        case "50":
          setTokenAmount({
            ...tokenAmount,
            firstTokenAmount: firstToken.tokenBalance * 0.5,
          });
          break;
        case "75":
          setTokenAmount({
            ...tokenAmount,
            firstTokenAmount: firstToken.tokenBalance * 0.75,
          });
          break;
        default:
          setTokenAmount({
            ...tokenAmount,
            firstTokenAmount: firstToken.tokenBalance,
          });
      }
    };
    return (
      <>
        <div className="p-[8px] border border-[#E3E8EF] rounded-[16px]">
          <div className="h-[40px]">
            <button
              onClick={() => togglePopUp("from")}
              className="h-full rounded-[8px] w-fit font-Inter font-[400] text-[#364152] text-[14px] flex items-center p-[8px]"
            >
              {firstToken.name}
              <span className="ml-[8px]">
                <ReactSVG src="/images/nav/chevron.svg" />
              </span>
            </button>
          </div>
          <Input
            inputName="firstTokenAmount"
            handlePercentageClick={handlePercentageClick}
            tokenAmount={tokenAmount.firstTokenAmount}
            tokenAddress={firstToken.addy}
            changeAmount={changeAmount}
          />
        </div>
        <div className="my-[16px] mx-auto w-fit">
          <button onClick={handleSwitch} className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-[.4s] ${rotateStat && "rotate-[90deg]"}`}
              width="40"
              height="30"
              viewBox="0 0 40 30"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.70864 19.5226C10.7949 21.4041 13.5106 21.4041 14.5969 19.5225L21.2039 8.07895H9.5042C8.40719 8.07895 7.5179 7.18965 7.5179 6.09265C7.5179 4.99564 8.4072 4.10635 9.5042 4.10635H23.4933C24.4471 2.24814 23.102 0.00195485 20.9789 0.00195467L3.32671 0.00195313C1.15413 0.00195294 -0.203721 2.35383 0.882565 4.23534L9.70864 19.5226Z"
                fill="#5BC0BE"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M29.7874 9.49023C28.7011 7.60872 25.9854 7.60873 24.8991 9.49023L18.2965 20.9262H30.1609C31.2579 20.9262 32.1472 21.8155 32.1472 22.9125C32.1472 24.0095 31.2579 24.8988 30.1609 24.8988H16.0066C15.0452 26.7585 16.3911 29.0108 18.5171 29.0108H36.1693C38.3419 29.0108 39.6997 26.6589 38.6134 24.7774L29.7874 9.49023Z"
                fill="#424242"
              />
            </svg>
          </button>
        </div>
        <div className="p-[8px] border border-[#E3E8EF] rounded-[16px]">
          <div className="h-[40px]">
            <button
              onClick={() => togglePopUp("to")}
              className="h-full rounded-[8px] w-fit font-Inter font-[400] text-[#364152] text-[14px] flex items-center p-[8px]"
            >
              {/* <TokenImg
                    classNames="mr-[4px]"
                    tokenType={secondToken.name}
                  /> */}
              {secondToken.name}
              <span className="ml-[8px]">
                <ReactSVG src="/images/nav/chevron.svg" />
              </span>
            </button>
          </div>
          <Input
            inputName="secondTokenAmount"
            tokenAmount={tokenAmount.secondTokenAmount}
            changeAmount={changeAmount}
            tokenAddress={secondToken.addy}
          />
        </div>
      </>
    );
  }
);

export default SwapBody;
