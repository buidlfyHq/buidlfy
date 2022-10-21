export interface IConfig {
  web3: {
    WEB3_STORAGE_ACCESS_TOKEN: string;
  };
  template: {
    TEMPLATE_GRAPHQL_URL: string;
  };
  backendApi: {
    BACKEND_API: string;
  };
  network: {
    DEFAULT_NETWORK: {
      id: string;
      name: string;
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
  backendApi: {
    BACKEND_API: "http://localhost:8080/",
  },
  network: {
    DEFAULT_NETWORK: { id: `0x${Number(5).toString(16)}`, name: "goerli" },
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
  backendApi: {
    BACKEND_API: "http://localhost:8080/",
  },
  network: {
    DEFAULT_NETWORK: { id: `0x${Number(5).toString(16)}`, name: "goerli" },
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
  backendApi: {
    BACKEND_API: "http://localhost:8080/",
  },
  network: {
    DEFAULT_NETWORK: { id: `0x${Number(5).toString(16)}`, name: "goerli" },
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
