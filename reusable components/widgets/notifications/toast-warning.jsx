import { ReactSVG } from "react-svg";

const ToastWarning = ({ toast, t, title, content }) => {
  return (
    <div className="bg-[#fff] w-[415px] rounded-[8px] overflow-hidden shadow-lg flex items-center h-[72px]">
      <figure className="w-[72px] text-[#F79009] bg-[url(/images/widgets/warning-ring.jpg)] bg-center h-full flex justify-center items-center">
        <ReactSVG src="/images/widgets/info-bell.svg" />
      </figure>
      <div className="flex-1 pl-[8px]">
        <p className="tmdmed text-black font-generic">{title}</p>
        <span className="tsmreg text-[#697586] leading-3 font-generic">
          {content}
        </span>
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

export default ToastWarning;
