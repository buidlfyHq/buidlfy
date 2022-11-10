import { NextFunction, Request, Response } from 'express';
import Logger from '@/logger';
import UploadService from '@/services/upload.service';
import { UploadDto } from '@/dtos/upload.dto';

class UploadController {
  public uploadService = new UploadService();

  public uploadFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uploadData: UploadDto = req.body;
      const uploadResponse = await this.uploadService.uploadFile(uploadData);

      res.status(200).json({ data: uploadResponse, message: 'Uploaded Successfully!' });
    } catch (error) {
      Logger.error(`Error found in ${__filename} - startDeployment - ${error.message}`);
      next(error);
    }
  };
}

export default UploadController;
