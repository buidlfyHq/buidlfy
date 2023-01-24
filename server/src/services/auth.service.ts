import { SiweMessage } from 'siwe';
import { UserV2 } from 'twitter-api-v2';
import { HttpException } from '@exceptions/HttpException';
import TwitterService from './twitter.service';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import Logger from '@/logger';
import { User } from '@interfaces/users.interface';

class AuthService {
  public users = userModel;
  public twitterService = new TwitterService();

  public async getUser(address: string): Promise<User> {
    if (isEmpty(address)) throw new HttpException(400, 'Address is empty');
    try {
      const user: User = await this.users.findOne({ address });
      if (user) return user;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - getUser - `);
      Logger.error(error);
      throw error;
    }
  }

  public async verifySignature(message: string, signature: string): Promise<SiweMessage> {
    try {
      const newMessage = new SiweMessage(message);
      const fields = await newMessage.validate(signature);
      return fields;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - verifySignature - `);
      Logger.error(error);
      throw error;
    }
  }

  public async authenticate(address: string, walletName: string): Promise<User> {
    if (isEmpty(address)) throw new HttpException(400, 'Address is empty');
    try {
      const user: User = await this.users.findOne({ address });
      if (user) return user;
      const newUser: User = await this.users.create({ address, walletName });
      return newUser;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - authenticate - `);
      Logger.error(error);
      throw error;
    }
  }

  public async verify(twitterHandle: string, address: string, user: UserV2): Promise<User | { errorMessage: string }> {
    try {
      const isFollowing = await this.twitterService.isFollowing(user.id);
      if (!isFollowing) {
        return { errorMessage: 'Follow buidlfy to get access' };
      }

      const hasTweeted = await this.twitterService.hasTweeted(user.id);
      if (!hasTweeted) {
        return { errorMessage: 'Share the beta launch on twitter to get access' };
      }

      const verified = isFollowing && hasTweeted;
      await this.users.findOneAndUpdate(
        { address: address },
        {
          $set: {
            handle: twitterHandle,
            verified: verified,
          },
        },
      );
      const verifiedUser: User = await this.users.findOne({ address });
      return verifiedUser;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - verify - `);
      Logger.error(error);
      throw error;
    }
  }
}

export default AuthService;
