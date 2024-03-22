import { REQUIRED_CHAIN_ID } from "@/data/constants";
const changeNetwork = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: REQUIRED_CHAIN_ID }],
      });

      console.log("User has been prompted to switch to the Polygon network.");
    } catch (error) {
      //   if (error.code === 4902) {
      //     console.log("Please add the Polygon network to MetaMask")
      //    }
      //   await window.ethereum.request({
      //     method: "wallet_addEthereumChain",
      //     params: [
      //       {
      //         chainId: REQUIRED_CHAIN_ID,
      //         chainName: "Polygon",
      //         nativeCurrency: {
      //           name: "Sepolia",
      //           symbol: "ETH",
      //           decimals: 18,
      //         },
      //         rpcUrls: ["https://sepolia.infura.io/v3/"],
      //         blockExplorerUrls: ["https://sepolia.etherscan.io"],
      //       },
      //     ],
      //   });
      // for arthera
      console.error(error);

      // CODE 4001 is user rejected request
    }
  } else {
    console.error("Ethereum provider not found.");
  }
};

export default changeNetwork;
