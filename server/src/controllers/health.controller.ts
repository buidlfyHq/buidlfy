import { Request, Response } from 'express';

class HealthController {
  public healthCheck = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send();
  };
}

export default HealthController;
