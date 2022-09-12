import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { updateItems } from "reducers/itemsReducer";
import { uploadFileToWeb3Storage } from "utils/web3storage";
import IItems from "interfaces/items";
import "styles/components.css";
import "styles/dashboard.css";

interface IUploadComponent {
  selectedItem: IItems;
}

const UploadComponent: FC<IUploadComponent> = ({ selectedItem }) => {
  const dispatch = useDispatch();
  const [sizeExceeded, setSizeExceeded] = useState<boolean>(false);

  // search suitable types for e
  const onChangeImage = async (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > 5242880) {
        setSizeExceeded(true);
      } else {
        setSizeExceeded(false);
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
          const cid = await uploadFileToWeb3Storage(reader.result as string);
          dispatch(
            updateItems({
              level: 0,
              settingItemId: selectedItem.i,
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
      <div className="px-2 margin-text text-left mt-2 text-xl text-gray-500 font-regular font-normal not-italic">
        Upload Image
      </div>
      <div className="flex justify-center">
        <div className="mb-3 mt-5 upload-img">
          <label htmlFor="inputTag" className="image-label">
            Drag and drop a file, or{" "}
            <span className="purple-label">browse</span>
            <input
              onChange={onChangeImage}
              className="upload-input"
              // className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer"
              type="file"
              id="inputTag"
            />
          </label>
          {sizeExceeded ? (
            <h3 className="mt-2 text-red-500 text-sm ml-1">
              Please upload file below 5 mb
            </h3>
          ) : null}
        </div>
        <br />
      </div>
      <div className="flex justify-center">
        <button className="upload-btn mx-2 ">Upload</button>
      </div>
    </div>
  );
};
export default UploadComponent;
