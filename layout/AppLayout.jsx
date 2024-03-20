import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import WalletConnect from "@/reusable components/modals/wallet-connect";
import BasicDropDown from "@/reusable components/dropdowns/basic-dropdown";

const AppLayout = () => {
  const { pathname, asPath, events } = useRouter();
  const [navState, toggleNavState] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [isOpen, setDropDownOpen] = useState(false);
  const toggleNav = () => {
    toggleNavState(!navState);
  };
  const navLinks = [
    { key: 1, title: "Trade", path: "/trade" },
    { key: 2, title: "Swap", path: "/" },
    { key: 3, title: "Earn", path: "/earn" },
    { key: 4, title: "Invites", path: "/invite" },
  ];
  const links = navLinks.map(({ path, key, title }) => (
    <Link key={key} href={path}>
      <li
        className={`${
          pathname === path || asPath === path ? "activeLink" : ""
        } font-Inter text-[#697586] font-[500] text-[16px] px-[16px] py-[8px]`}
      >
        {title}
      </li>
    </Link>
  ));
  useEffect(() => {
    const onHashChangeStart = (url) => {
      toggleNavState(false);
    };

    events.on("hashChangeStart", onHashChangeStart);
    events.on("routeChangeStart", onHashChangeStart);

    return () => {
      events.off("hashChangeStart", onHashChangeStart);
      events.off("routeChangeStart", onHashChangeStart);
    };
  }, [events]);
  return (
    <>
      <header
        className={`fixed flex items-center justify-between bg-transparent backdrop-blur-sm w-full py-1 z-[3] px-[1rem] md:px-[2rem]`}
      >
        <div className="">
          <Link href="/">
            <ReactSVG src="/images/main/zeit-logo-full.svg" />
          </Link>
        </div>
        <nav
          className={`md:w-fit ${
            navState == false
              ? "translate-x-[100%] md:translate-x-0"
              : "translate-x-0"
          } left-0 md:top-0 top-[10vh] transition-[.4s] py-[3rem] md:py-0 w-full z-[5] text-center absolute bg-white md:bg-transparent md:relative border md:border-[#E3E8EF] md:rounded-[16px] px-[8px]`}
        >
          <ul className="flex mx-auto w-fit justify-between">{links}</ul>
        </nav>
        <div className="flex items-center gap-[27px]">
          {/* conditionally render */}
          <button className="px-[8px] flex items-center py-[10px] border gap-[10px] border-[#CDD5DF] rounded-[8px]">
            <ReactSVG src="/images/nav/warning.svg" />
            <ReactSVG src="/images/nav/chevron.svg" />
          </button>
          <div className="p-[12px] relative flex items-center border gap-[10px] border-[#CDD5DF] rounded-[8px]">
            <span className="tsmmed font-generic">36.37ETH</span>
            <button
              onClick={() => setDropDownOpen((prevState) => !prevState)}
              className="flex items-center py-[6px] px-[12px] gap-[8px] text-[#333333] bg-[#EEF2F6] rounded-[6px]"
            >
              <span className="tsmmed font-generic">0xjus...u2</span>
              <ReactSVG src="/images/nav/chevron.svg" />
            </button>
            <BasicDropDown isOpen={isOpen} />
          </div>
          <button
            onClick={() => setPopUp(true)}
            className="px-[30px] py-[10px] tmdsbold font-generic border gap-[10px] border-[#CDD5DF] rounded-[8px]"
          >
            Connect Wallet
          </button>
        </div>
        <button type="button" onClick={toggleNav} className="z-[2] md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            className={`transition-[.4s] ${navState ? "hidden" : ""}`}
            height="32"
            viewBox="0 0 32 1"
            fill="none"
          >
            <path
              d="M5.33333 10.6667H26.6667M5.33333"
              stroke="#666481"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            className={`transition-[.4s] ${
              navState
                ? "rotate-[45deg] translate-x-[10%] translate-y-[13%]"
                : "hidden"
            }`}
            height="32"
            viewBox="0 10 32 2"
            fill="none"
          >
            <path
              d="M5.333333 21.3334H18.6667"
              stroke="#666481"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            className={`transition-[.4s] ${
              navState
                ? "rotate-[-45deg] translate-y-[-50%] translate-x-[20%]"
                : ""
            }`}
            height="32"
            viewBox="0 20 32 32"
            fill="none"
          >
            <path
              d="M5.333333 21.3334H18.6667"
              stroke="#666481"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>
      <WalletConnect popUp={popUp} setPopUp={setPopUp} />
    </>
  );
};

export default AppLayout;
