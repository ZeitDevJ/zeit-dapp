import { useState, useEffect, memo } from "react";
import { ethers } from "ethers";
import { useData } from "@/context/DataContext";
import { coinInfo } from "@/data/constants";
import { roundDown } from "@/utility functions/miscellanous/round-figures";

const TokenList = memo(({ selectToken }) => {
  const { providerState, appData, isOnChain, balance } = useData();
  const [tokenBalances, setTokenBalances] = useState({});

  useEffect(() => {
    const fetchTokenBalances = async () => {
      let balances = {};
      await Promise.all(
        coinInfo.map(async ({ id, address, abi }) => {
          const Contract = new ethers.Contract(address, abi, providerState);
          if (appData.walletAddress && isOnChain) {
            if (address == "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9") {
              const roundBal = roundDown(balance.fullBalance);
              balances[id] = roundBal;
            } else {
              const data = await Contract.balanceOf(appData.walletAddress);
              const roundBal = roundDown(ethers.utils.formatEther(data));
              if (roundBal === 0) {
                balances[id] = "0";
              } else {
                balances[id] = roundBal;
              }
            }
          }
        })
      );
      setTokenBalances(balances);
    };

    fetchTokenBalances();
  }, [providerState, appData.walletAddress, isOnChain, balance.fullBalance]);

  return (
    <div>
      {coinInfo.map(({ id, abbv, tokenName, abi, address }) => (
        <button
          onClick={() => selectToken(abi, abbv, address, tokenBalances[id])}
          key={id}
          className="my-[8px] w-full hover:bg-[#00000010] transition-[.4s] rounded-[8px] flex justify-between items-center py-[4px] px-[8px]"
        >
          <div className="flex items-center gap-[21px]">
            <div className="">
              <p className="text-[#364152] text-left text-[16px] font-[400] font-Inter">
                {abbv}
              </p>
              <p className="text-[#697586] text-left text-[12px] font-[400] font-Inter">
                {tokenName}
              </p>
            </div>
          </div>
          <div className="">
            <p className="text-[#697586] text-[14px] font-[500] font-Inter text-right">
              {tokenBalances[id] || "Loading..."}
            </p>
            <p className="text-[12px] font-Inter font-[600] text-[#17B26A] text-right">
              2.58
            </p>
          </div>
        </button>
      ))}
    </div>
  );
});

export default TokenList;
