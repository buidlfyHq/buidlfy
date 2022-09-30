import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateWorkspaceElement,
  updateUploadedImageData,
} from "redux/workspace/workspace.reducers";
import { uploadFileToWeb3Storage } from "utils/web3storage";
import { IMAGE_SIZE_VARIABLE } from "config/constant";
import "styles/components.css";
import "styles/dashboard.css";

interface IUploadComponent {
  i: string;
}

const UploadComponent: FC<IUploadComponent> = ({ i }) => {
  const dispatch = useDispatch();
  const [sizeExceeded, setSizeExceeded] = useState<boolean>(false);

  // FIX: find suitable types for e
  const onChangeImage = async (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > IMAGE_SIZE_VARIABLE) {
        setSizeExceeded(true);
      } else {
        setSizeExceeded(false);
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
          dispatch(
            updateUploadedImageData({
              settingItemId: i,
              uploadedImageData: reader.result as string,
            })
          );
          const cid = await uploadFileToWeb3Storage(reader.result as string);
          dispatch(
            updateWorkspaceElement({
              settingItemId: i,
              propertyName: "imgData",
              propertyValue: cid,
            })
          );
        });
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  return (
    <div className="items-center w-full mx-1 py-2 text-gray-600 rounded">
      <div className="px-2 margin-text text-left mt-2 ">Upload Image</div>
      <div className="flex justify-center">
        <div className="mb-3 mt-5 upload-img">
          <label htmlFor="inputTag" className="image-label">
            Drag and drop a file, or{" "}
            <span className="purple-label">browse</span>
            <input
              onChange={onChangeImage}
              className="upload-input"
              // It is important in next branch
              // className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer"
              type="file"
              id="inputTag"
            />
          </label>
        </div>
        <br />
      </div>
      <div className="flex justify-center">
        <button className="upload-btn mx-2 ">Upload</button>
      </div>
      {sizeExceeded ? (
        <h3 className="text-red-500 text-sm ml-5 mb-2">
          Please upload file below 5 mb
        </h3>
      ) : null}
    </div>
  );
};
export default UploadComponent;
