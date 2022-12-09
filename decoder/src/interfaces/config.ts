import IWorkspace from "./workspace";

export default interface IConfig {
  head: {
    title: string;
    logo: string;
  };
  background: string;
  builder: IWorkspace[];
  contract: {
    abi: IContractConfig[];
    address: string;
  };
  oracle: IOracleConfig;
}

export interface IContractConfig {
  inputs: { internalType: string; name: string; type: string }[];
  name: string;
  outputs: { internalType: string; name: string; type: string }[];
  stateMutability: string;
  type: string;
}

export interface IOracleConfig {
  methodName: string;
  stateMutability: string;
  inputs: {
    id: string;
    send: boolean;
  }[];
  outputs: { id: string }[];
}
