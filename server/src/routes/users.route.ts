import { Router } from 'express';
import UsersController from '@/controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/nonce`, this.usersController.createNonce);
    this.router.post(`${this.path}/verify`, this.usersController.verifySignature);
    this.router.get(`${this.path}/personal_information`, this.usersController.getInformation);
  }
}

export default UsersRoute;
