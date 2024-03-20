import { memo } from "react";

const BasicToolTip = memo(({ message }) => {
  return (
    <span className="absolute  left-[50%] min-w-[108px] txssbold max-w-[324px] sw-bxshdw top-[-100%] px-[12px] py-[8px] translate-x-[-50%] bg-white tool-tip-text rounded-[8px]">
      {message}
    </span>
  );
});

export default BasicToolTip;
