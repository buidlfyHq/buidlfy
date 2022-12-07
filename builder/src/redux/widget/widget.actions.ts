import { IPublicationId } from "./widget.interfaces";
import widgetActionTypes from "./widget.types";

export const getPublication = (payload: {
  publicationId: IPublicationId;
}) => ({
  type: widgetActionTypes.FETCH_PUBLICATION,
  payload
});