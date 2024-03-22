const getBalance = async (account) => {
  let balance = 0;
  const result = await window.ethereum.request({
    method: "eth_getBalance",
    params: [account, "latest"],
  });
  const wei = parseInt(result, 16);
  balance = wei / 10 ** 18;
  return balance;
};
const getCurrentChainId = async () => {
  let chainId = null;
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      return chainId;
    } catch (error) {
      // console.error("Error:", error.message);
      // return null; // Return null in case of error
    }
  } else {
    // console.error("Ethereum provider not found.");
    // return null; // Return null if ethereum provider is not found
    // you might not need to bother them
  }
};

export { getBalance, getCurrentChainId };
