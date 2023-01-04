import { Router } from 'express';
import AuthController from '@/controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/nonce`, this.authController.createNonce);
    this.router.post(`${this.path}/verify`, this.authController.verifySignature);
    this.router.get(`${this.path}/personal_information`, this.authController.getInformation);
  }
}

export default AuthRoute;
