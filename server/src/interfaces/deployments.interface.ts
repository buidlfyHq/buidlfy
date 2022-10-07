import { Error } from './common.interface';

export interface IDeploymentResponse extends Error {
  deploymentId: string;
  topic: string;
  status: DeploymentStatus;
  createdAt: string;
  protocol: string;
  sitename: string;
}

export interface ISpheronDeploymentResponse {
  message: string;
  success: boolean;
  topic: string;
  deploymentId: string;
  projectId: string;
  body: {
    deploymentId: string;
    githubUrl: string;
    folderName: string;
    topic: string;
    framework: string;
    branch: string;
    buildCommand: string;
    installCommand: string;
    publishDirectory: string;
    protocol: string;
    workspace: string;
    isWorkspace: boolean;
    logsToCapture: Array<Object>;
    env: Object;
    paidViaSubscription: boolean;
    commitId: string | null;
  };
}

export interface IFetchDeploymentResponse {
  sitePreview: string;
  topic: string;
  status: DeploymentStatus;
  project: string;
  createdAt: any;
  updatedAt: any;
  protocol: string;
  failedMessage: string;
}

export enum DeploymentStatus {
  QUEUED = 'Queued',
  PREPARING = 'Preparing',
  DEPLOYING = 'Deploying',
  DEPLOYED = 'Deployed',
  FAILED = 'Failed',
}

export interface StreamType {
  type: number;
  data: any;
}
