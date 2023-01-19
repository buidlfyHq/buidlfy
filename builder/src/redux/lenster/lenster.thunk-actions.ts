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
        profileId: publication?.publication?.profile.id,
        ownedBy: publication?.publication?.profile.ownedBy,
        profilePicture: publication?.publication?.profile?.picture?.original?.url,
        profileName: publication?.publication?.profile?.name,
        coverPicture: publication?.publication?.profile?.coverPicture?.original?.url,
        handle: publication?.publication?.profile.handle,
        createdAt: publication?.publication?.createdAt,
        postDescription: publication?.publication?.metadata?.content,
        postMedia: publication?.publication?.metadata?.media[0]?.original?.url,
      };
      dispatch(
        updateWorkspaceElement({
          settingItemId: publication.i,
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
