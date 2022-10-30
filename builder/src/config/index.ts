export interface IConfig {
  web3: {
    WEB3_STORAGE_ACCESS_TOKEN: string;
  };
  template: {
    TEMPLATE_GRAPHQL_URL: string;
  };
  server: {
    SERVER: string;
  };
  network: {
    DEFAULT_NETWORK: {
      chainId: string;
      chainName: string;
      nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
      };
      rpcUrls: string[];
      blockExplorerUrls: string[];
    };
  };
}

const NODE_ENV: string = process.env.REACT_APP_STAGE || "local";

const development: IConfig = {
  web3: {
    WEB3_STORAGE_ACCESS_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg",
  },
  template: {
    TEMPLATE_GRAPHQL_URL:
      "https://api.thegraph.com/subgraphs/name/man-jain/buid-reg",
  },
  server: {
    SERVER: "https://api.buidlfy.com/",
  },
  network: {
    DEFAULT_NETWORK: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "mumbai",
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
  },
};

const production: IConfig = {
  web3: {
    WEB3_STORAGE_ACCESS_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg",
  },
  template: {
    TEMPLATE_GRAPHQL_URL:
      "https://api.thegraph.com/subgraphs/name/man-jain/buid-reg",
  },
  server: {
    SERVER: "https://api.buidlfy.com/",
  },
  network: {
    DEFAULT_NETWORK: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "mumbai",
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
  },
};

const local: IConfig = {
  web3: {
    WEB3_STORAGE_ACCESS_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg",
  },
  template: {
    TEMPLATE_GRAPHQL_URL:
      "https://api.thegraph.com/subgraphs/name/man-jain/buid-reg",
  },
  server: {
    SERVER: "https://api.buidlfy.com/",
  },
  network: {
    DEFAULT_NETWORK: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "mumbai",
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
  },
};

const config: {
  [name: string]: IConfig;
} = {
  local,
  development,
  production,
};

export default config[NODE_ENV];
