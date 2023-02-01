import { UserV2 } from 'twitter-api-v2';
import userModel from '@models/users.model';
import { client } from '@/twitter';
import Logger from '@/logger';
import { BUIDLFY_TWITTER_ID, MAX_RESULTS, TWEET_TEXT } from '@config';

class TwitterService {
  public users = userModel;

  public async getUserData(twitterHandle: string): Promise<UserV2> {
    try {
      const { data } = await client.v2.userByUsername(twitterHandle);
      return data;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - getUserData - `);
      Logger.error(error);
      throw error;
    }
  }

  public async isFollowing(id: string): Promise<boolean> {
    try {
      const followingList = await client.v2.following(id);
      const following = !!followingList.data.filter(account => account.id === BUIDLFY_TWITTER_ID)[0];
      return following;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - isFollowing - `);
      Logger.error(error);
      throw error;
    }
  }

  public async hasTweeted(id: string): Promise<boolean> {
    try {
      const tweetList: any = await client.v2.userTimeline(id, { max_results: Number(MAX_RESULTS) });
      const tweeted = !!tweetList._realData.data.filter((tweet: { text: string }) => tweet.text === TWEET_TEXT)[0];
      return tweeted;
    } catch (error) {
      Logger.error(`Error found in ${__filename} - hasTweeted - `);
      Logger.error(error);
      throw error;
    }
  }
}

export default TwitterService;
