import { decode as base64_decode } from "base-64";

const BuilderConfig = base64_decode(
  process.env.REACT_APP_BUIDLFY_CONFIGURATION || ""
);
export default BuilderConfig;
