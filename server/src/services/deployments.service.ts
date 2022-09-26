import axios from 'axios';
import { DeployAppDto } from '@/dtos/deployments.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { DECODER_GIT_URL, DEPLOYMENT_ENDPOINT, ORGANIZATION_ID, SPHERON_API_HOST, SPHERON_TOKEN } from '@/config';
import { randomUUID } from 'crypto';

class DeploymentService {
  public async deployApp(deploymentData: DeployAppDto): Promise<any> {
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
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SPHERON_TOKEN}`,
      };
      const response = await axios.post(`${SPHERON_API_HOST}${DEPLOYMENT_ENDPOINT}`, deploymentPayload, { headers });
      console.log(response.data);
      return;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default DeploymentService;
