import { IPublication } from './lenster.interfaces';
import lensterActionTypes from './lenster.types';

export const getPublication = (payload: IPublication) => ({
  type: lensterActionTypes.FETCH_PUBLICATION,
  payload,
});
