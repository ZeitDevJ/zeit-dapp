const metamaskConnect = async () => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      console.log(account);

      //   use String..substring(0,6) ... string.substring(38) to shorten

      const result = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      console.log(result);
      const wei = parseInt(result, 16);
      const balance = wei / 10 ** 18;
      console.log(balance);
    } catch (error) {
      // deal with error here well
      // user declined request basically.....
    }
  } else {
    // deal with error here well
    // tell them they have no metamask?
    // take users to download metaask?
  }
};

export default metamaskConnect;
