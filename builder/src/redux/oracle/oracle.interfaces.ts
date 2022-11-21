export interface IOracleState {
  oracleConfig: IOracleConfig;
  oracleElementSelector: IOracleElementSelector;
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

export interface IOracleElementSelector {
  buttonId: string;
}
