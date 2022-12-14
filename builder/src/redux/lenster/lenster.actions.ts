import { IPublications } from './lenster.interfaces';
import lensterActionTypes from './lenster.types';

export const getPublication = (payload: IPublications) => ({
  type: lensterActionTypes.FETCH_PUBLICATION,
  payload,
});
