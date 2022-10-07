import { CreateDeploymentSubdomainDto, VerifyDeploymentSubdomainDto } from '@/dtos/deployments.dto';
import { DeployAppDto, DeploymentResponseDto } from '@/dtos/deployments.dto';
import DeploymentService from '@/services/deployments.service';
import { NextFunction, Request, Response } from 'express';
import DomainService from '@/services/domain.service';
import { IFetchDeploymentResponse } from '@/interfaces/deployments.interface';
import Logger from '@/logger';

class DeploymentsController {
  public deploymentService = new DeploymentService();
  public domainService = new DomainService();

  public startDeployment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deploymentData: DeployAppDto = req.body;
      const deploymentResponse: DeploymentResponseDto = await this.deploymentService.deployApp(deploymentData);

      res.status(200).json({ data: deploymentResponse.toJson(), message: 'created' });
    } catch (error) {
      Logger.error(`Error found in ${__filename} - startDeployment - ${error.message}`);
      next(error);
    }
  };

  public createDeploymentSubdomain = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { siteName, deploymentId }: CreateDeploymentSubdomainDto = req.body;
      const deploymentResponse = await this.deploymentService.getDeployment(deploymentId);
      const {
        project: { _id: projectId },
        sitePreview: deploymentLink,
      }: IFetchDeploymentResponse = deploymentResponse.data.deployment;
      const { domain } = await this.domainService.generateSitename(siteName, projectId, deploymentLink);
      res.status(200).json({ data: { success: true, domain }, message: 'Subdomain created!' });
    } catch (error) {
      Logger.error(`Error found in ${__filename} - createDeploymentDomain - ${error.message}`);
      next(error);
    }
  };

  public verifyDeploymentSubdomain = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { domainId, projectId }: VerifyDeploymentSubdomainDto = req.body;

      const verifyResponse = await this.domainService.verifySubdomain(domainId, projectId);
      const {
        domain: { verified: domainVerified },
      } = verifyResponse.data;
      res.status(200).json({ data: { success: domainVerified }, message: domainVerified ? 'Subdomain verified!' : 'Subdomain not verified' });
    } catch (error) {
      Logger.error(`Error found in ${__filename} - verifyDeploymentDomain - ${error.message}`);
      next(error);
    }
  };
}

export default DeploymentsController;
