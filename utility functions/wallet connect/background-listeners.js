const getCurrentWalletConnected = async () => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        // then there is an account yay!
        const account = accounts[0];
        console.log(account);

        // then fetch balance

        const result = await window.ethereum.request({
          method: "eth_getBalance",
          params: [account, "latest"],
        });
        console.log(result);
        const wei = parseInt(result, 16);
        const balance = wei / 10 ** 18;
        console.log(balance);
      } else {
        // we rest, dont do much headers, it's a side effect, don;t disturb the user
        return;
      }

      //   use String..substring(0,6) ... string.substring(38) to shorten
    } catch (error) {
      // just say network error here like oncuechange, so they know what's going on!
    }
  }
};

const checkSwitchAccounts = () => {
  if (typeof window != undefined && typeof window.ethereum != "undefined") {
    window.ethereum.on("accountsChanged", (accounts) => {
      // notify, accounts ChannelMergerNode, and if there's need, ask them sign in again
      console.log(accounts[0]);
    });
  }
};

// remember to store wallet adderess and other neccessary details in context !

export { getCurrentWalletConnected, checkSwitchAccounts };
