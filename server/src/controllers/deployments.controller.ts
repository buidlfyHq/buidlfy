import { UpdateDeploymentDomainDto, VerifyDeploymentDomainDto } from '@/dtos/deployments.dto';
import { DeployAppDto, DeploymentResponseDto } from '@/dtos/deployments.dto';
import DeploymentService from '@/services/deployments.service';
import { NextFunction, Request, Response } from 'express';
import DomainService from '@/services/domain.service';
import { IFetchDeploymentResponse } from '@/interfaces/deployments.interface';

class DeploymentsController {
  public deploymentService = new DeploymentService();
  public domainService = new DomainService();

  public startDeployment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deploymentData: DeployAppDto = req.body;
      const deploymentResponse: DeploymentResponseDto = await this.deploymentService.deployApp(deploymentData);

      res.status(200).json({ data: deploymentResponse.toJson(), message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateDeploymentDomain = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { siteName, deploymentId }: UpdateDeploymentDomainDto = req.body;
      const deploymentResponse = await this.deploymentService.getDeployment(deploymentId);
      const {
        project: { _id: projectId },
        sitePreview: deploymentLink,
      }: IFetchDeploymentResponse = deploymentResponse.data.deployment;
      console.log(deploymentResponse.data, projectId, deploymentLink);
      const { domain } = await this.domainService.generateSitename(siteName, projectId, deploymentLink);
      res.status(200).json({ data: { success: true, domain }, message: 'Subdomain created!' });
    } catch (error) {
      next(error);
    }
  };

  public verifyDeploymentDomain = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { domainId, projectId }: VerifyDeploymentDomainDto = req.body;

      console.log(domainId, projectId);
      const verifyResponse = await this.domainService.verifySubdomain(domainId, projectId);
      console.log(verifyResponse);
      const {
        domain: { verified: domainVerified },
      } = verifyResponse.data;
      res.status(200).json({ data: { success: domainVerified }, message: domainVerified ? 'Subdomain verified!' : 'Subdomain not verified' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export default DeploymentsController;
