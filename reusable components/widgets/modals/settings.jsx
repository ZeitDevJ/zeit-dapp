import { memo } from "react";
import ModalSkeleton from "./modal-skeleton";
import { useData } from "@/context/DataContext";
import { ReactSVG } from "react-svg";
import BasicToolTip from "../tooltips/basic-tooltip";

const Settings = memo(({ popUp, setPopUp }) => {
  const { mode } = useData();
  return (
    <ModalSkeleton popUp={popUp}>
      <div className="flex mb-[16px] text-black w-full justify-between">
        <p
          className={` font-generic smsbold ${
            mode ? "text-[#000]" : "text-white"
          } `}
        >
          Settings
        </p>
        <button onClick={() => setPopUp(false)}>
          <ReactSVG src="/images/swap/close.svg" />
        </button>
      </div>
      <div className="flex items-center mb-[16px] gap-[8px]">
        <p className="tmdmed font-generic">Default Transaction Speed</p>
        <button className="tool-tip">
          <ReactSVG src="images/swap/help.svg" />
          <BasicToolTip message="Content here" />
        </button>
      </div>
      <div className="flex gap-[8px]">
        <button
          style={{ boxShadow: "1px 2px 2px 0px rgba(0,0,0,0.25)" }}
          className="px-[16px] py-[8px] font-generic tsmmed bg-[#5BC0BE] text-white rounded-[24px]"
        >
          Default
        </button>
        <button className="px-[16px] font-generic tsmmed py-[8px] bg-transparent rounded-[24px] border ">
          Standard
        </button>
        <button className="px-[16px] font-generic tsmmed py-[8px] bg-transparent rounded-[24px] border ">
          Fast
        </button>
        <button className="px-[16px] font-generic tsmmed py-[8px] bg-transparent rounded-[24px] border ">
          Instant
        </button>
      </div>
      <div className="flex items-center my-[16px] gap-[8px]">
        <p className="tmdmed font-generic">Slippage Tolerance</p>
        <button className="tool-tip">
          <ReactSVG src="images/swap/help.svg" />
          <BasicToolTip message="You ain't got no slippage!" />
        </button>
      </div>
      <div className="flex items-center gap-[8px]">
        <button
          style={{ boxShadow: "1px 2px 2px 0px rgba(0,0,0,0.25)" }}
          className="px-[16px] py-[8px] font-generic tsmmed bg-[#5BC0BE] text-white rounded-[24px]"
        >
          0.1%
        </button>
        <button className="px-[16px] font-generic tsmmed py-[8px] bg-transparent rounded-[24px] border ">
          0.5%
        </button>
        <button className="px-[16px] font-generic tsmmed py-[8px] bg-transparent rounded-[24px] border ">
          2.0%
        </button>
        <input
          placeholder="Slippage"
          type="number"
          className="px-[16px] outline-none w-full font-generic max-w-[91px] tsmmed py-[8px] bg-transparent rounded-[24px] border "
        />
        <span className="text-[#5BC0BE] font-generic tlgsbold">%</span>
      </div>
    </ModalSkeleton>
  );
});

export default Settings;
