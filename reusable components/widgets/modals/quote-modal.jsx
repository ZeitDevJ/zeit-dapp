import { useData } from "@/context/DataContext";
import ModalSkeleton from "./modal-skeleton";
import { ReactSVG } from "react-svg";
import { roundDown } from "@/utility functions/miscellanous/round-figures";
import { memo } from "react";

const QuoteModal = memo(
  ({ popUp, setPopUp, firstToken, secondToken, tokenAmount, rtPrice }) => {
    const { mode } = useData();
    return (
      <ModalSkeleton
        marginTop="top-[5vh]"
        width="max-w-[527px]"
        padding="0px"
        popUp={popUp}
      >
        <section className="p-[32px]">
          <div className="flex mb-[32px] text-black w-full justify-between">
            <p
              className={` font-generic smsbold ${
                mode ? "text-[#000]" : "text-white"
              } `}
            >
              Confirm swap
            </p>
            <button onClick={() => setPopUp(false)}>
              <ReactSVG src="/images/swap/close.svg" />
            </button>
          </div>
          <div className="w-fit mx-auto mb-[32px]">
            <div className="flex w-fit mx-auto mb-[8px] gap-[8px]">
              {/* <figure className="">token icon here</figure> */}
              <p className="smsbold font-generic text-[#364152]">
                {firstToken.name ? firstToken?.name : "null"}
              </p>
            </div>
            <p className="smsbold w-fit mx-auto font-generic text-[#F36960]">
              {tokenAmount.firstTokenFullAmount
                ? roundDown(tokenAmount?.firstTokenFullAmount, 4)
                : tokenAmount.firstTokenAmount}
            </p>
          </div>
          <figure className="react-svg w-fit color-change-anim mx-auto">
            <ReactSVG src="/images/modal/zeit.svg" />
          </figure>
          <div className="w-fit mx-auto my-[32px]">
            <div className="flex w-fit mx-auto mb-[8px] gap-[8px]">
              {/* <figure className="">token icon here</figure> */}
              <p className="smsbold font-generic text-[#364152]">
                {secondToken.name ? secondToken?.name : "null"}
              </p>
            </div>
            <p className="smsbold w-fit mx-auto font-generic text-[#53AFAD]">
              {tokenAmount.secondTokenFullAmount
                ? roundDown(tokenAmount.secondTokenFullAmount, 4)
                : tokenAmount.secondTokenAmount}
            </p>
          </div>
        </section>
        <section className="bg-[#5BC0BE]  pt-[16px] px-[32px] pb-[32px]">
          <div className="bg-[#7CCDCB] mb-[16px] py-[8px] px-[6px] rounded-[16px]">
            <div className="flex mb-[8px] justify-between">
              <div className="flex gap-[8px]">
                <p className="font-generic tsmmed text-[#fff] items-center">
                  Price
                </p>
                <button className="text-[#374857] react-svg">
                  <ReactSVG src="/images/widgets/refresh.svg" />
                </button>
              </div>
              <p className="font-generic tsmreg text-white">
                1 {firstToken.name ? firstToken?.name : "null"} ≈{" "}
                {rtPrice.perOne ? rtPrice?.perOne : null}{" "}
                {secondToken.name ? secondToken?.name : "null"}
              </p>
            </div>
            <div className="flex mb-[8px] justify-between">
              <p className="font-generic tsmmed text-[#fff] items-center">
                Fee
              </p>
              <p className="font-generic tsmreg text-white">
                {rtPrice.fee ? rtPrice?.fee : null}{" "}
                {firstToken.name ? firstToken?.name : "null"}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-generic tsmmed text-[#fff] items-center">
                Minimum recieved
              </p>
              <p className="font-generic tsmreg text-white">
                {rtPrice ? rtPrice?.minimumRecievedRound : null}{" "}
                {tokenAmount.firstTokenFullAmount
                  ? firstToken?.name
                  : secondToken?.name}
              </p>
            </div>
          </div>
          {firstToken.addy !== "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9" ? (
            <>
              <div className="">
                <button className="tetiary-btn w-full py-[10px] rounded-[8px] tmdsbold font-generic">
                  Approve token spend
                </button>
              </div>
              <div className="mt-[16px]">
                <button
                  disabled
                  className="w-full medium-btn default-btn py-[10px] rounded-[8px] tmdsbold font-generic"
                >
                  Swap
                </button>
              </div>
            </>
          ) : (
            <div className="mt-[16px]">
              <button className="w-full medium-btn tetiary-btn py-[10px] rounded-[8px] tmdsbold font-generic">
                Swap
              </button>
            </div>
          )}
        </section>
      </ModalSkeleton>
    );
  }
);

export default QuoteModal;
