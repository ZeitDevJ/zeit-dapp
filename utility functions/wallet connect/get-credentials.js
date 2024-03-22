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

export { getBalance };
