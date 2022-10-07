import axios, { AxiosResponse } from 'axios';
import { DeployAppDto, DeploymentResponseDto } from '@/dtos/deployments.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty, spheronAuthHeaders } from '@utils/util';
import { DECODER_GIT_URL, DEPLOYMENT_ENDPOINT, ORGANIZATION_ID, SPHERON_API_HOST } from '@/config';
import { randomUUID } from 'crypto';
import { SocketClient } from '@/socket-client';
import { socketServer } from '@/socket';
import { DeploymentStatus, StreamType, ISpheronDeploymentResponse } from '@/interfaces/deployments.interface';
import DomainService from './domain.service';

class DeploymentService {
  domainService = new DomainService();

  public async deployApp(deploymentData: DeployAppDto): Promise<DeploymentResponseDto> {
    if (isEmpty(deploymentData)) throw new HttpException(400, 'deploymentData is empty');
    try {
      const deploymentPayload = {
        organizationId: ORGANIZATION_ID,
        gitUrl: DECODER_GIT_URL,
        repoName: 'buidlfy',
        uniqueTopicId: randomUUID(),
        configuration: {
          buildCommand: 'yarn build',
          installCommand: 'yarn install',
          workspace: 'decoder',
          publishDir: 'build',
          framework: 'react',
          nodeVersion: 'V_14',
        },
        env: {
          CONFIGURATION: deploymentData.config,
        },
        protocol: 'ipfs-filecoin',
        createDefaultWebhook: false,
        provider: 'GITHUB',
        branch: 'dev',
      };
      const response = await axios.post(`${SPHERON_API_HOST}${DEPLOYMENT_ENDPOINT}`, deploymentPayload, { headers: spheronAuthHeaders });
      const deploymentResponse: ISpheronDeploymentResponse = response.data;
      const deploymentDto = new DeploymentResponseDto(deploymentResponse);
      this.listenDeployment(deploymentData.clientTopic, deploymentDto.topic);
      const sitename = await this.domainService.generateSitename(deploymentData.name, deploymentResponse.projectId);
      deploymentDto.populateSitename(sitename);
      return deploymentDto;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private async listenDeployment(clientTopic: string, deploymentTopic: string): Promise<void> {
    if (!deploymentTopic) throw new HttpException(400, 'deploymentData is empty');
    const socketClient = new SocketClient();
    await socketClient.connect();
    socketClient.listen(`deployment.${deploymentTopic}`, (stream: StreamType) => {
      console.log(stream);
      if (stream.type === 1) socketServer.emit(`deployment.${clientTopic}`, { status: DeploymentStatus.DEPLOYING as string });
      if (stream.type === 2) socketServer.emit(`deployment.${clientTopic}`, { status: DeploymentStatus.DEPLOYED as string });
      if (stream.type === 3) socketServer.emit(`deployment.${clientTopic}`, { status: DeploymentStatus.FAILED as string });
      if (stream.type === 4) socketServer.emit(`deployment.${clientTopic}`, { status: DeploymentStatus.PREPARING as string });

      if (stream.type === 2 || stream.type === 3) socketClient.destroy();
    });
  }

  public async getDeployment(deploymentId: string): Promise<AxiosResponse> {
    return axios.get(`${SPHERON_API_HOST}/deployment/${deploymentId}`, { headers: spheronAuthHeaders });
  }
}

export default DeploymentService;
