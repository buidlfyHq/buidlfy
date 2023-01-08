import { UserV2 } from 'twitter-api-v2';
import { HttpException } from '@exceptions/HttpException';
import userModel from '@models/users.model';
import { isEmpty } from '@utils/util';
import { client } from '@/twitter';
import Logger from '@/logger';
import { BUIDLFY_TWITTER_ID, MAX_RESULTS, TWEET_TEXT } from '@/config';
import { User } from '@/interfaces/users.interface';

class AuthService {
  public users = userModel;

  public async authenticate(address: string, walletName: string): Promise<User> {
    if (isEmpty(address)) throw new HttpException(400, 'Address is empty');
    try {
      const findUser: User = await this.users.findOne({ address });
      if (findUser) return findUser;
      const createUserData: User = await this.users.create({ address, walletName });
      return createUserData;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - authenticate - `);
      Logger.error(error);
      throw error;
    }
  }

  public async verify(twitterHandle: string, address: string, data: UserV2): Promise<User | { errorMessage: string }> {
    try {
      // check if user is following Buidlfy
      const followingList = await client.v2.following(data.id);
      const isFollowing = followingList.data.filter(account => account.id === BUIDLFY_TWITTER_ID)[0] ? true : false;
      if (!isFollowing) {
        return { errorMessage: 'Follow buidlfy to get access' };
      }

      // check if user has shared the beta launch on twitter
      const tweetList: any = await client.v2.userTimeline(data.id, { max_results: Number(MAX_RESULTS) });
      const hasTweeted = tweetList._realData.data.filter((tweet: { text: string }) => tweet.text === TWEET_TEXT)[0] ? true : false;
      if (!hasTweeted) {
        return { errorMessage: 'Share the beta launch on twitter to get access' };
      }

      const verified = isFollowing && hasTweeted ? true : false;
      const verifiedUser: User = await this.users.findOneAndUpdate(
        { address: address },
        {
          $set: {
            handle: twitterHandle,
            verified: verified,
          },
        },
      );
      return verifiedUser;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - verify - `);
      Logger.error(error);
      throw error;
    }
  }
}

export default AuthService;
