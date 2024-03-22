const disconnectWallet = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      window.ethereum = null;
    } catch (error) {
      console.error("Error disconnecting wallet:", error.message);
    }
  } else {
    console.error("Ethereum provider not found.");
  }
};
export default disconnectWallet;
