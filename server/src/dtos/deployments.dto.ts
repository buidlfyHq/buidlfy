import { IDeploymentResponse, DeploymentStatus, ISpheronDeploymentResponse } from '@/interfaces/deployments.interface';
import { IsString } from 'class-validator';

export class DeployAppDto {
  @IsString()
  public config: string;

  @IsString()
  public clientTopic: string;
}

export class CreateDeploymentSubdomainDto {
  @IsString()
  public deploymentId: string;

  @IsString()
  public siteName: string;
}

export class UpdateDeploymentSubdomainDto {
  @IsString()
  public deploymentId: string;

  @IsString()
  public subdomainId: string;
}

export class VerifyDeploymentSubdomainDto {
  @IsString()
  public domainId: string;

  @IsString()
  public projectId: string;
}

export class DeploymentResponseDto implements IDeploymentResponse {
  deploymentId: string;
  topic: string;
  status: DeploymentStatus;
  createdAt: string;
  protocol: string;
  sitename: string;
  error: boolean;
  message: string;

  constructor(spheronResponse: ISpheronDeploymentResponse) {
    this.deploymentId = spheronResponse.deploymentId;
    this.topic = spheronResponse.topic;
    this.status = DeploymentStatus.QUEUED;
    this.createdAt = Date.now().toString();
    this.protocol = spheronResponse.deployment.protocol;
    this.error = !spheronResponse.success;
    this.message = spheronResponse.message;
  }

  populateSitename(sitename: string) {
    this.sitename = sitename;
  }

  toJson() {
    return {
      deploymentId: this.deploymentId,
      topic: this.topic,
      status: this.status,
      createdAt: this.createdAt,
      protocol: this.protocol,
      error: this.error,
      message: this.message,
    };
  }
}
