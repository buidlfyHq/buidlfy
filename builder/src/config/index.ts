export interface IConfig {
  address: {
    buidlfyErc1155: string;
    marketplace: string;
    usdt: string;
    oracle: string;
  };
  web3: {
    WEB3_STORAGE_ACCESS_TOKEN: string;
  };
  template: {
    TEMPLATE_GRAPHQL_URL: string;
    MORALIS_X_API_KEY: string;
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
  lenster: {
    LENS_GRAPHQL_URL: string;
  };
  site: {
    SITE_URL: string;
  };
  spheron: {
    SPHERON_URL: string;
  };
}

const NODE_ENV: string = process.env.REACT_APP_STAGE || 'local';

const development: IConfig = {
  address: {
    buidlfyErc1155: '0x4F7B6744A17251148C3Eb1C91666c3b0707D3bE8',
    marketplace: '0x6c9177882a082d7Ddd76B45385e427D12d24000d',
    usdt: '0x36fEe18b265FBf21A89AD63ea158F342a7C64abB',
    oracle: '0x36dA71ccAd7A67053f0a4d9D5f55b725C9A25A3E',
  },
  web3: {
    WEB3_STORAGE_ACCESS_TOKEN:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg',
  },
  template: {
    TEMPLATE_GRAPHQL_URL: 'https://api.thegraph.com/subgraphs/name/buidlfyhq/buidlfy-template-testnet',
    MORALIS_X_API_KEY: '2ffY3sVNITHVIIDV5WTq0VeGdVe1CHs0m3oL7mjD4t2NKKKNyod2p50Kfvg7O4Xh',
  },
  server: {
    SERVER: 'https://api.buidlfy.com',
  },
  network: {
    DEFAULT_NETWORK: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: 'mumbai',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    },
  },
  lenster: {
    LENS_GRAPHQL_URL: 'https://api.lens.dev',
  },
  site: {
    SITE_URL: 'https://buidlfy.com/',
  },
  spheron: {
    SPHERON_URL: 'https://spheron.network/',
  },
};

const production: IConfig = {
  address: {
    buidlfyErc1155: '0x4F7B6744A17251148C3Eb1C91666c3b0707D3bE8',
    marketplace: '0x6c9177882a082d7Ddd76B45385e427D12d24000d',
    usdt: '0x36fEe18b265FBf21A89AD63ea158F342a7C64abB',
    oracle: '0x36dA71ccAd7A67053f0a4d9D5f55b725C9A25A3E',
  },
  web3: {
    WEB3_STORAGE_ACCESS_TOKEN:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg',
  },
  template: {
    TEMPLATE_GRAPHQL_URL: 'https://api.thegraph.com/subgraphs/name/buidlfyhq/buidlfy-template-testnet',
    MORALIS_X_API_KEY: '2ffY3sVNITHVIIDV5WTq0VeGdVe1CHs0m3oL7mjD4t2NKKKNyod2p50Kfvg7O4Xh',
  },
  server: {
    SERVER: 'https://api.buidlfy.com',
  },
  network: {
    DEFAULT_NETWORK: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: 'mumbai',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    },
  },
  lenster: {
    LENS_GRAPHQL_URL: 'https://api.lens.dev',
  },
  site: {
    SITE_URL: 'https://buidlfy.com/',
  },
  spheron: {
    SPHERON_URL: 'https://spheron.network/',
  },
};

const local: IConfig = {
  address: {
    buidlfyErc1155: '0x4F7B6744A17251148C3Eb1C91666c3b0707D3bE8',
    marketplace: '0x6c9177882a082d7Ddd76B45385e427D12d24000d',
    usdt: '0x36fEe18b265FBf21A89AD63ea158F342a7C64abB',
    oracle: '0x36dA71ccAd7A67053f0a4d9D5f55b725C9A25A3E',
  },
  web3: {
    WEB3_STORAGE_ACCESS_TOKEN:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg',
  },
  template: {
    TEMPLATE_GRAPHQL_URL: 'https://api.thegraph.com/subgraphs/name/buidlfyhq/buidlfy-template-testnet',
    MORALIS_X_API_KEY: '2ffY3sVNITHVIIDV5WTq0VeGdVe1CHs0m3oL7mjD4t2NKKKNyod2p50Kfvg7O4Xh',
  },
  server: {
    SERVER: 'http://localhost:8000',
  },
  network: {
    DEFAULT_NETWORK: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: 'mumbai',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon-mumbai.g.alchemy.com/v2/i0JIYxK_EGtBX5aGG1apX4KuoH7j_7dq'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    },
  },
  lenster: {
    LENS_GRAPHQL_URL: 'https://api.lens.dev',
  },
  site: {
    SITE_URL: 'https://buidlfy.com/',
  },
  spheron: {
    SPHERON_URL: 'https://spheron.network/',
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
