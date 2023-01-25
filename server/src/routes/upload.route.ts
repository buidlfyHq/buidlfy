import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import isAuthenticated from '@middlewares/authorization.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { UploadDto } from '@dtos/upload.dto';
import UploadController from '@controllers/upload.controller';

class UploadRoute implements Routes {
  public path = '/upload';
  public router = Router();
  public uploadController = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, isAuthenticated(), validationMiddleware(UploadDto, 'body'), this.uploadController.uploadFile);
  }
}

export default UploadRoute;
