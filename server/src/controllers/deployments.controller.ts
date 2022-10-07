import { HttpException } from '@exceptions/HttpException';
import { IDomain } from './../interfaces/domain.interface';
import { UpdateDeploymentDomainDto } from './../dtos/deployments.dto';
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
      const { domainName, deploymentId }: UpdateDeploymentDomainDto = req.body;
      const deploymentResponse = await this.deploymentService.getDeployment(deploymentId);
      const { project: projectId, sitePreview: deploymentLink }: IFetchDeploymentResponse = deploymentResponse.data;
      const domainResponse = await this.domainService.getDomain(projectId, domainName);
      const { _id: domainId }: IDomain = domainResponse.data.domain;
      const updatedDomainResponse = await this.domainService.updateSubdomainLink(domainId, projectId, deploymentLink);
      const { link: updatedDeploymentLink }: IDomain = updatedDomainResponse.data.domain;
      if (updatedDeploymentLink === deploymentLink) {
        const verifyResponse = await this.domainService.verifySubdomain(domainId, projectId);
        const domainVerified: boolean = verifyResponse.data.success;
        if (domainVerified) {
          res.status(200).json({ data: { success: domainVerified }, message: 'Subdomain updated and verified!' });
        } else {
          throw new HttpException(406, "Domain couldn't be verified, please try again.");
        }
      } else {
        throw new HttpException(406, "Deployment link doesn't get updated, please try again.");
      }
    } catch (error) {
      next(error);
    }
  };
}

export default DeploymentsController;
