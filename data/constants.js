import E20ABI from "./ERC20-token-abi";

const REQUIRED_CHAIN_ID = "0xaa36a7";
const coinInfo = [
  {
    id: 1,
    address: "0x619aA97A3Ee04bb6A4d0248a4693b23cabe3f75a",
    abbv: "T1",
    tokenName: "MyToken1",
    abi: E20ABI,
  },
  {
    id: 2,
    address: "0x945a22710C6Ed732b069c78Ea41d85DC359666Cf",
    abbv: "T2",
    tokenName: "MyToken2",
    abi: E20ABI,
  },
];

export { REQUIRED_CHAIN_ID, coinInfo };
