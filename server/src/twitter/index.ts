import { TwitterApi } from 'twitter-api-v2';
import { BEARER_TOKEN } from '@config';

export const client = new TwitterApi(BEARER_TOKEN);
