import { IPublications } from "./widget.interfaces";
import widgetActionTypes from "./widget.types";

export const getPublication = (payload: IPublications) => ({
  type: widgetActionTypes.FETCH_PUBLICATION,
  payload,
});
