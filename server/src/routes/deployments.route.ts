import { Router } from 'express';
import DeploymentsController from '@controllers/deployments.controller';
import { Routes } from '@interfaces/routes.interface';
import isAuthenticated from '@middlewares/authorization.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { DeployAppDto, CreateDeploymentSubdomainDto, VerifyDeploymentSubdomainDto, UpdateDeploymentSubdomainDto } from '@dtos/deployments.dto';

class DeploymentsRoute implements Routes {
  public path = '/deployment';
  public router = Router();
  public deploymentController = new DeploymentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, isAuthenticated(), validationMiddleware(DeployAppDto, 'body'), this.deploymentController.startDeployment);
    this.router.put(
      `${this.path}/create-subdomain`,
      isAuthenticated(),
      validationMiddleware(CreateDeploymentSubdomainDto, 'body'),
      this.deploymentController.createDeploymentSubdomain,
    );
    this.router.patch(
      `${this.path}/update-subdomain`,
      isAuthenticated(),
      validationMiddleware(UpdateDeploymentSubdomainDto, 'body'),
      this.deploymentController.updateDeploymentSubdomain,
    );
    this.router.patch(
      `${this.path}/verify-subdomain`,
      isAuthenticated(),
      validationMiddleware(VerifyDeploymentSubdomainDto, 'body'),
      this.deploymentController.verifyDeploymentSubdomain,
    );
  }
}

export default DeploymentsRoute;
