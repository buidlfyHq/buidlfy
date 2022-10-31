export interface IPublishState {
  publishConfig: string;
  domainName: string;
  deploymentId: string;
  transactionResponse: string;
  projectId: string;
  currentStep: number;
  domainId: string;
  publishStatus: boolean;
  publishFailed: boolean;
}

