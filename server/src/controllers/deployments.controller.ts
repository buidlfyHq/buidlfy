import { DeployAppDto } from '@/dtos/deployments.dto';
import DeploymentService from '@/services/deployments.service';
import { NextFunction, Request, Response } from 'express';

class DeploymentsController {
  public deploymentService = new DeploymentService();

  public startDeployment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deploymentData: DeployAppDto = req.body;
      const deploymentResponse: any = await this.deploymentService.deployApp(deploymentData);

      res.status(200).json({ data: deploymentResponse, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default DeploymentsController;
