import { ReactSVG } from "react-svg";

const ToastInfo = ({ toast, t }) => {
  return (
    <div className="bg-[#fff] w-[415px] rounded-[8px] overflow-hidden shadow-lg flex items-center h-[72px]">
      <figure className="w-[72px] text-[#697586] bg-[url(/images/widgets/info-ring.jpg)] bg-center h-full flex justify-center items-center">
        <ReactSVG src="/images/widgets/info-bell.svg" />
      </figure>
      <div className="flex-1 pl-[8px]">
        <p className="tmdmed text-black font-generic">Successfully Swapped</p>
        <span className="tsmreg text-[#697586] font-generic">Sub text</span>
      </div>
      <div className="w-[100px] h-full">
        <button
          onClick={() => toast.dismiss(t)}
          className="pl-[14px] hover:bg-[#69758610] w-full h-full text-left tsmsbold"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ToastInfo;
