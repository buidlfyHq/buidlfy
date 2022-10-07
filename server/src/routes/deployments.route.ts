import { Router } from 'express';
import DeploymentsController from '@/controllers/deployments.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { DeployAppDto, CreateDeploymentSubdomainDto, VerifyDeploymentSubdomainDto } from '@/dtos/deployments.dto';

class DeploymentsRoute implements Routes {
  public path = '/deployment';
  public router = Router();
  public deploymentController = new DeploymentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, validationMiddleware(DeployAppDto, 'body'), this.deploymentController.startDeployment);
    this.router.put(
      `${this.path}/create-subdomain`,
      validationMiddleware(CreateDeploymentSubdomainDto, 'body'),
      this.deploymentController.createDeploymentSubdomain,
    );
    this.router.patch(
      `${this.path}/verify-subdomain`,
      validationMiddleware(VerifyDeploymentSubdomainDto, 'body'),
      this.deploymentController.verifyDeploymentSubdomain,
    );
  }
}

export default DeploymentsRoute;
