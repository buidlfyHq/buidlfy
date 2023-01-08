import { Router } from 'express';
import AuthController from '@/controllers/auth.controller';
import { Routes } from '@interfaces/routes.interface';

class AuthRoute implements Routes {
  public path = '';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/nonce`, this.authController.createNonce);
    this.router.post(`${this.path}/signin`, this.authController.signin);
    this.router.get(`${this.path}/signout`, this.authController.signout);
    this.router.post(`${this.path}/verify_tweet`, this.authController.verifyTweet);
  }
}

export default AuthRoute;
