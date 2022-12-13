export const networks = {
  56: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  80001: {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Mumbai",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: [
      "https://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq",
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  1: {
    chainId: `0x${Number(1).toString(16)}`,
    chainName: "ETH",
    nativeCurrency: {
      name: "Ether",
      symbol: "Eth",
      decimals: 18,
    },
    rpcUrls: ["https://api.mycryptoapi.com/eth"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  420: {
    chainId: `0x${Number(420).toString(16)}`,
    chainName: "Optimism Goerli Testnet",
    nativeCurrency: {
      name: "Görli Ether",
      symbol: "Eth",
      decimals: 18,
    },
    rpcUrls: ["https://goerli.optimism.io/"],
    blockExplorerUrls: ["https://goerli-optimism.etherscan.io/"],
  },
  137: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  97: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: "Binance Smart Chain Testnet",
    nativeCurrency: {
      name: "BSC",
      symbol: "BSC",
      decimals: 18,
    },
    rpcUrls: ["https://bsctestapi.terminet.io/rpc"],
    blockExplorerUrls: ["https://testnet.bscscan.com"],
  },
  10: {
    chainId: `0x${Number(10).toString(16)}`,
    chainName: "Optimism",
    nativeCurrency: {
      name: "Optimism",
      symbol: "OP",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorerUrls: ["https://optimistic.etherscan.io/"],
  },
  134: {
    chainId: `0x${Number(134).toString(16)}`,
    chainName: "iExec Sidechain",
    nativeCurrency: {
      name: "xRLC",
      symbol: "xRLC",
      decimals: 18,
    },
    rpcUrls: ["https://bellecour.iex.ec"],
    blockExplorerUrls: ["https://blockscout-bellecour.iex.ec"],
  },
};
