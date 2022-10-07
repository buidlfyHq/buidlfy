import { Router } from 'express';
import DeploymentsController from '@/controllers/deployments.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { DeployAppDto, UpdateDeploymentDomainDto } from '@/dtos/deployments.dto';

class DeploymentsRoute implements Routes {
  public path = '/deployment';
  public router = Router();
  public deploymentController = new DeploymentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(DeployAppDto, 'body'), this.deploymentController.startDeployment);
    this.router.put(`${this.path}/update`, validationMiddleware(UpdateDeploymentDomainDto, 'body'), this.deploymentController.updateDeploymentDomain);
  }
}

export default DeploymentsRoute;
