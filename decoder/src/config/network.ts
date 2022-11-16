export const networks = {
    56: {
      chainId: 56,
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
      chainId: 80001,
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
      chainId: 1,
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
      chainId: 420,
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
      chainId: 137,
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
      chainId: 97,
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
      chainId: 10,
      chainName: "Optimism",
      nativeCurrency: {
        name: "Optimism",
        symbol: "OP",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.optimism.io"],
      blockExplorerUrls: ["https://optimistic.etherscan.io/"],
    },
  };