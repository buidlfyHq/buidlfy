import React, { FC, useState } from "react";
import IItems from "interfaces/items";
import "styles/components.css";
import "styles/dashboard.css";
import { uploadFileToWeb3Storage } from "utils/web3storage";

interface IUploadComponent {
  selectedItem: IItems;
  items: IItems[];
  setItems: (items: IItems[]) => void;
}

const UploadComponent: FC<IUploadComponent> = ({
  selectedItem,
  items,
  setItems,
}) => {
  const [size, setSize] = useState<boolean>(false);

  const onChangeImage = async (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size > 5242880) {
        setSize(true);
      } else {
        setSize(false);
        const reader = new FileReader();
        reader.addEventListener("load", async () => {
          const cid = await uploadFileToWeb3Storage(reader.result as string);
          const updatedItems = items.map((item) => {
            let selectedChild = item.children?.find(
              (child) => child.i === selectedItem.i
            );
            if (item.i === selectedItem.i) {
              return {
                ...item,
                imgData: cid,
              };
            } else if (selectedChild?.i === selectedItem.i) {
              let child = {
                ...selectedChild,
                imgData: cid,
              };
              const childIndex = item.children?.findIndex(
                (c) => c.i === selectedItem.i
              );
              let newChildren = [...item.children];
              newChildren[childIndex] = child;

              return {
                ...item,
                children: newChildren,
              };
            }
            return item;
          });
          setItems(updatedItems);
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
      {size ? (
        <h3 className="text-red-500 text-sm ml-5 mb-2">
          Please upload file below 5 mb
        </h3>
      ) : null}
      <div className="flex justify-center">
        <button className="upload-btn mx-2 ">Upload</button>
      </div>
    </div>
  );
};
export default UploadComponent;
