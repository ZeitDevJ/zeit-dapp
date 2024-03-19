import { useData } from "@/context/DataContext";

const ModalSkeleton = ({ children, popUp }) => {
  const { mode } = useData();
  return (
    <section
      className={`fixed ${!popUp && "translate-y-[-110%] opacity-20"} ${
        mode ? "bg-[#00000029]" : "backdrop-blur-[9px] bg-[#00000075]"
      } transition-[.5s] z-[50] w-full top-0 bottom-0 bg-[#00000029]`}
    >
      <div
        className={`fixed p-[16px] w-[94%] left-[3%] md:w-[25%] md:left-[37.5%] rounded-[16px] ${
          mode ? "hero" : "bg-[#1E1E1E]"
        } h-fit top-[15vh]`}
      >
        {children}
      </div>
    </section>
  );
};

export default ModalSkeleton;
