// import Polygon from "../../assets/icons/polygon-network.svg";
// import Arbitrum from "../../assets/icons/arbitrum.svg";

export const networks = {
  80001: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "matic",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq",
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    // logo: Polygon,
    networkId: 80001,
  },
  421611: {
    chainId: `0x${Number(421611).toString(16)}`,
    chainName: "arbitrum",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.arbitrum.io/rpc"], // needs to be changed before deploying to alchemy
    blockExplorerUrls: ["https://testnet.arbiscan.io/"],
    // logo: Arbitrum,
    networkId: 421611,
  },
  137: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "polygon",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://polygon-mainnet.g.alchemy.com/v2/2WHiOE7RDIfdtrrAIJ95Mr2-R75pd-Rr",
    ],
    blockExplorerUrls: ["https://polygonscan.com/"],
    // logo: Polygon,
    networkId: 137,
  },
};
