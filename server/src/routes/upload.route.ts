import { Router } from 'express';
import DeploymentsController from '@/controllers/deployments.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { UploadDto } from '@/dtos/upload.dto';

class UploadRoute implements Routes {
  public path = '/upload';
  public router = Router();
  public deploymentController = new DeploymentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, validationMiddleware(UploadDto, 'body'), this.deploymentController.startDeployment);
  }
}

export default UploadRoute;
