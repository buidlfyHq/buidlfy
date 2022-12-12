import request from 'graphql-request';
import config from 'config';
import { getPublicationsQuery } from './widget.utils';

export const getPublicationService = async (publicationId: string) => {
  try {
    const res = await request(config.widget.LENS_GRAPHQL_URL, getPublicationsQuery, { publicationId });
    const publication = res?.publication;
    console.log(res, 'res');

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
