import { createAsyncThunk } from '@reduxjs/toolkit';
import request from 'graphql-request';
import config from 'config';
import { getPublicationsQuery } from './lenster.utils';
import { updateWorkspaceElement } from 'redux/workspace/workspace.reducers';
import { IRootState } from 'redux/root-state.interface';
import { IPublication } from './lenster.interfaces';

export const fetchPublicationAsync = createAsyncThunk(
  'lenster/fetchPublication',
  async (payload: { i: string; id: string; name: string }, { dispatch, getState }) => {
    const { i, id, name } = payload;
    const state = getState() as IRootState;
    const savedPosts = state.workspace.workspaceElements.find(workspaceElement => workspaceElement.i === i)?.posts;
    try {
      const res = await request(config.lenster.LENS_GRAPHQL_URL, getPublicationsQuery, { publicationId: name });
      const publication = res?.publication;
      const newPublication: IPublication = {
        i: i,
        id: id,
        name: name,
        profileId: publication?.profile.id,
        ownedBy: publication?.profile.ownedBy,
        profilePicture: publication?.profile?.picture?.original?.url,
        profileName: publication?.profile?.name,
        coverPicture: publication?.profile?.coverPicture?.original?.url,
        handle: publication?.profile.handle,
        createdAt: publication?.createdAt,
        postDescription: publication?.metadata?.content,
        postMedia: publication?.metadata?.media[0]?.original?.url,
      };
      dispatch(
        updateWorkspaceElement({
          settingItemId: i,
          propertyName: 'posts',
          propertyValue: [...savedPosts, newPublication],
        }),
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error in fetchPublicationAsync --> ', error);
    }
  },
);
