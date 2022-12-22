import request from 'graphql-request';
import config from 'config';
import { getPublicationsQuery } from './lenster.utils';

export const getPublicationService = async (publicationId: string) => {
  try {
    const res = await request(config.lenster.LENS_GRAPHQL_URL, getPublicationsQuery, { publicationId });
    const publication = res?.publication;
    return { error: false, errorMessage: '', publication };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in fetching --> ', error);
    return {
      error: true,
      errorMessage: (error as Error).message,
      publication: null,
    };
  }
};
