import { decode as base64_decode } from "base-64";

export const OracleContractAddress =
  "0x456891c78077d31f70ca027a46d68f84a2b814d4";

const BuilderConfig = base64_decode(
  process.env.REACT_APP_BUIDLFY_CONFIGURATION || ""
);

export default BuilderConfig;
