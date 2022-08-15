import React, { FC, useEffect, useState } from "react";
import IItems from "interfaces/items";
import "styles/components.css";
import "styles/dashboard.css";
import { uploadFileToWeb3Storage } from "config/web3storage";

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
              let newArray = [...item.children];
              newArray[childIndex] = child;

              return {
                ...item,
                children: newArray,
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
    <div className="items-center w-full px-3 py-2 text-gray-600 rounded">
      <div className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Upload Image
      </div>
      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <input
            onChange={onChangeImage}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 file:cursor-pointer"
            type="file"
            id="formFile"
          />
          {size ? (
            <h3 className="mt-2 text-red-500 text-sm ml-1">
              Please upload file below 5 mb
            </h3>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default UploadComponent;
