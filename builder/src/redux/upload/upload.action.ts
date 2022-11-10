import uploadActionTypes from "./upload.types";

export const uploadImage = (payload: {
  data: string | ArrayBuffer;
  id?: string;
}) => ({
  type: uploadActionTypes.UPLOAD_IMAGE,
  payload,
});
