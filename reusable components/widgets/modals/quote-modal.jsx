import { useData } from "@/context/DataContext";
import ModalSkeleton from "./modal-skeleton";
import { ReactSVG } from "react-svg";

const QuoteModal = ({ popUp, setPopUp }) => {
  const { mode } = useData();
  return (
    <ModalSkeleton width="max-w-[402px]" popUp={popUp}>
      <section className="p-[16px]">
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
          <div className="flex flex-row mb-[8px] gap-[8px]">
            <figure className="">{/* token icon here */}</figure>
            <p className="smsbold font-generic text-[#364152]">LSDc</p>
          </div>
          <p className="smsbold font-generic text-[#F36960]">128.73</p>
        </div>
        <figure className="react-svg w-fit color-change-anim mx-auto">
          <ReactSVG src="/images/modal/zeit.svg" />
        </figure>
      </section>
    </ModalSkeleton>
  );
};

export default QuoteModal;
