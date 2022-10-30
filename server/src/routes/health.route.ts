import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import HealthController from '@/controllers/health.controller';

class HealthRoute implements Routes {
  public path = '/healthCheck';
  public router = Router();
  public healthController = new HealthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.healthController.healthCheck);
  }
}

export default HealthRoute;
