import { memo, useEffect } from "react";
import { ReactSVG } from "react-svg";
import disconnectWallet from "@/utility functions/wallet connect/disconnect";

const BasicDropDown = memo(
  ({ isOpen, address, setDropDownOpen, reference }) => {
    const copyAddress = () => {
      if (address) {
        navigator.clipboard.writeText(address);
      } else {
        // hndle notification saying adderess empty
      }
    };

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (isOpen) {
          if (reference.current && !reference.current.contains(event.target)) {
            setDropDownOpen(false);
          }
        }
      };

      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [isOpen]);

    return (
      <div
        className={`${
          isOpen === false && "scale-y-0"
        } absolute bg-white w-[100%] transition-[.4s] left-0 top-[100%] p-[8px] rounded-[8px] shadow-lg`}
      >
        <div className="flex flex-col gap-[8px]">
          <button
            onClick={copyAddress}
            className="tetiary-btn text-[#3D3D3D] rounded-[4px] tmdreg font-generic flex gap-[8px] px-[8px] py-[6px] items-center"
          >
            <ReactSVG src="/images/nav/copy.svg" />
            Copy Address
          </button>
          <button className="tetiary-btn text-[#3D3D3D] rounded-[4px] tmdreg font-generic flex gap-[8px] px-[8px] py-[6px] items-center">
            <ReactSVG src="/images/nav/book.svg" />
            Transactions
          </button>
          <button className="tetiary-btn text-[#3D3D3D] rounded-[4px] tmdreg font-generic flex gap-[8px] px-[8px] py-[6px] items-center">
            <ReactSVG src="/images/nav/external-link.svg" />
            View Explorer
          </button>
          <button
            onClick={() => {
              disconnectWallet();
              setDropDownOpen(false);
            }}
            className="tetiary-btn text-[#3D3D3D] rounded-[4px] tmdreg font-generic flex gap-[8px] px-[8px] py-[6px] items-center"
          >
            <ReactSVG src="/images/nav/log-out.svg" />
            Disconnect
          </button>
        </div>
      </div>
    );
  }
);

export default BasicDropDown;
