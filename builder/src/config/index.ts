export interface IConfig {
  web3: {
    WEB3_STORAGE_ACCESS_TOKEN: string;
  };
  template: {
    TEMPLATE_GRAPHQL_URL: string;
  };
  initiatePublish: {
    INITIATE_PUBLISH: string;
  },
  getPublish: {
    GET_PUBLISH: string;
  },
  verifyPublish: {
    VERIFY_PUBLISH: string;
  }
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
  initiatePublish: {
    INITIATE_PUBLISH: "http://localhost:8080/deployment/create"
  },
  getPublish: {
    GET_PUBLISH: "http://localhost:8080/deployment/create-subdomain"
  },
  verifyPublish: {
    VERIFY_PUBLISH: "http://localhost:8080/deployment/verify-subdomain"
  }
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
  initiatePublish: {
    INITIATE_PUBLISH: "http://localhost:8080/deployment/create"
  },
  getPublish: {
    GET_PUBLISH: "http://localhost:8080/deployment/create-subdomain"
  },
  verifyPublish: {
    VERIFY_PUBLISH: "http://localhost:8080/deployment/verify-subdomain"
  }
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
  initiatePublish: {
    INITIATE_PUBLISH: "http://localhost:8080/deployment/create"
  },
  getPublish: {
    GET_PUBLISH: "http://localhost:8080/deployment/create-subdomain"
  },
  verifyPublish: {
    VERIFY_PUBLISH: "http://localhost:8080/deployment/verify-subdomain"
  }
};

const config: {
  [name: string]: IConfig;
} = {
  local,
  development,
  production,
};

export default config[NODE_ENV];
