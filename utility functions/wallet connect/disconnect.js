const disconnectWallet = () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      console.log("cheese");
    } catch (error) {
      console.error("Error disconnecting wallet:", error.message);
    }
  } else {
    console.error("Ethereum provider not found.");
  }
};
export default disconnectWallet;
