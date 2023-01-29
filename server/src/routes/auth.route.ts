import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import isAuthenticated from '@middlewares/authorization.middleware';
import validationMiddleware from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { SigninDto, SubscribeNewsletterDto, VerifyTwitterDto } from '@/dtos/auth.dto';

class AuthRoute implements Routes {
  public path = '';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/user-status`, isAuthenticated(), this.authController.userStatus);
    this.router.get(`${this.path}/nonce`, this.authController.createNonce);
    this.router.post(`${this.path}/signin`, validationMiddleware(SigninDto, 'body'), this.authController.signin);
    this.router.get(`${this.path}/signout`, isAuthenticated(), this.authController.signout);
    this.router.patch(
      `${this.path}/verify-tweet`,
      isAuthenticated(),
      validationMiddleware(VerifyTwitterDto, 'body'),
      this.authController.verifyTweet,
    );
    this.router.patch(
      `${this.path}/subscribe-newsletter`,
      isAuthenticated(),
      validationMiddleware(SubscribeNewsletterDto, 'body'),
      this.authController.subscribeNewsletter,
    );
  }
}

export default AuthRoute;
