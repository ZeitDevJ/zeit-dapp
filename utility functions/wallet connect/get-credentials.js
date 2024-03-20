const getBalance = async (account) => {
  const result = await window.ethereum.request({
    method: "eth_getBalance",
    params: [account, "latest"],
  });
  console.log(result);
  const wei = parseInt(result, 16);
  const balance = wei / 10 ** 18;
  console.log(balance);
};

export { getBalance };
