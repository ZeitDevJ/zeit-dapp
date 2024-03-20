import { useData } from "@/context/DataContext";
import { memo } from "react";

const ModalSkeleton = memo(({ children, popUp }) => {
  const { mode } = useData();
  return (
    <section
      className={`fixed ${!popUp && "translate-y-[-110%] opacity-20"} ${
        mode ? "bg-[#00000029]" : "backdrop-blur-[9px] bg-[#00000075]"
      } transition-[.5s] z-[50] w-full top-0 bottom-0 bg-[#00000029]`}
    >
      <div className="fixed w-full top-[15vh] h-fit">
        <div
          className={` p-[16px] w-[94%] mx-auto md:w-[25%] min-w-fit rounded-[16px] ${
            mode ? "hero" : "bg-[#1E1E1E]"
          }  `}
        >
          {children}
        </div>
      </div>
    </section>
  );
});

export default ModalSkeleton;
