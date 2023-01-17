import { createAsyncThunk } from '@reduxjs/toolkit';
import request from 'graphql-request';
import config from 'config';
import { getPublicationsQuery } from './lenster.utils';

export const fetchPublicationAsync = createAsyncThunk('lenster/fetchPublication', async (payload: { i: string; id: string; name: string }) => {
  const { i, id, name } = payload;
  try {
    const res = await request(config.lenster.LENS_GRAPHQL_URL, getPublicationsQuery, { publicationId: name });
    const publication = res?.publication;
    return { id, fetchedPublication: publication, i };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in fetchPublicationAsync --> ', error);
  }
});
