export interface IConfig {
    web3: {
        WEB3_STORAGE_ACCESS_TOKEN: string;
      };   
  }
  
  const NODE_ENV: string = process.env.REACT_APP_STAGE || "development";
  
  const development: IConfig = {
   
      web3: {
        WEB3_STORAGE_ACCESS_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg"
      }
  };
  
  const production: IConfig = {
    web3: {
        WEB3_STORAGE_ACCESS_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg"
      }
  };
  
  const test: IConfig = {
    web3: {
        WEB3_STORAGE_ACCESS_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ0YzVmOEYzRkQxNGU2NjY5MmYxMTEzOGYwNjI1NmI3OGI2OTZDOTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjAwMzM3NTQ5MjcsIm5hbWUiOiJJbWFnZSJ9.qnAvxlOygBO6RQCkaPb2JSMVUeO-JQk7sRkeJygqOGg"
      }
  };
  
  const config: {
    [name: string]: IConfig;
  } = {
    test,
    development,
    production,
  };
  
  export default config[NODE_ENV];