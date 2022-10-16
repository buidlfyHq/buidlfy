import { Web3Storage, File } from 'web3.storage';
import Logger from '@/logger';
import { WEB3_STORAGE_ACCESS_TOKEN } from '@/config';

class Web3StorageService {
  private web3StorageClient: Web3Storage;

  constructor() {
    this.web3StorageClient = new Web3Storage({ token: WEB3_STORAGE_ACCESS_TOKEN });
  }

  public async uploadFileToWeb3Storage(dataUri: string): Promise<string> {
    try {
      const file = this.createFileFromContent(dataUri);
      Logger.info('Uploading file to Web3 Storage');
      const cid = await this.web3StorageClient.put([file], { wrapWithDirectory: false });
      Logger.info(`Uploaded file cid: ${cid}`);
      return `https://${cid}.ipfs.dweb.link/`;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - deployApp - ${error.message}`);
      throw error;
    }
  }

  private getBuffer(content: string, base64: boolean): Buffer {
    return base64 ? Buffer.from(content, 'base64') : Buffer.from(content);
  }

  private parseDataUri(dataUri: string): { mimeType: string; base64encoded: boolean; fileContent: string } {
    const [metaData, fileContent] = dataUri.split(',');
    const [mimeType, base64] = metaData.substring(5).split(';');
    return {
      mimeType,
      base64encoded: base64 != null,
      fileContent,
    };
  }

  private createFileFromContent(dataUri: string) {
    const parsed = this.parseDataUri(dataUri);
    return new File([this.getBuffer(parsed.fileContent, parsed.base64encoded)], '');
  }
}

export default Web3StorageService;
