import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import Logger from '@/logger';
import { UploadDto } from '@/dtos/upload.dto';
import Web3StorageService from './web3-storage.service';

class UploadService {
  web3StorageService = new Web3StorageService();

  public async uploadFile(uploadData: UploadDto): Promise<string> {
    if (isEmpty(uploadData)) throw new HttpException(400, 'deploymentData is empty');
    try {
      const uploadResponse = await this.web3StorageService.uploadFileToWeb3Storage(uploadData.data);
      return uploadResponse;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - uploadFile - `);
      Logger.error(error);
      throw error;
    }
  }
}

export default UploadService;
