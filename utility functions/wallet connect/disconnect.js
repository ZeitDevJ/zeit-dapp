const disconnectWallet = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      window.ethereum.chainId = null;
      window.ethereum.selectedAddress = null;
    } catch (error) {
      console.error("Error disconnecting wallet:", error.message);
    }
  } else {
    console.error("Ethereum provider not found.");
  }
};
export default disconnectWallet;
