import React, { FC, useState } from "react";
import "../../styles/Dashboard.css";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDuplicate } from "react-icons/hi";
import "../../styles/Components.css";
import { Reader } from "@ethersproject/abi/lib/coders/abstract-coder";
import IItems from "interfaces/items";

interface IUploadComponent {
  setPicture;
  setImgData;
  imgData;
  selectedItem;
  imgSrc;
  setImgSrc;
  items: IItems[];
  setItems: (items: IItems[]) => void;
}

const UploadComponent: FC<IUploadComponent> = ({
  setPicture,
  setImgData,
  imgData,
  selectedItem,
  imgSrc,
  setImgSrc,
  items,
  setItems,
}) => {
  //   if (selectedItem) {
  const onChangePicture = (e) => {
    // console.log(selectedItem, "selected");
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const updatedItems = items.map((item) => {
          if (item.i === selectedItem.i) {
            return {
              ...item,
              imgData: reader.result,
            };
          }
          return item;
        });
        setItems(updatedItems);
        setImgData([{ id: selectedItem.i, data: reader.result }]);
      });
      reader.readAsDataURL(e.target.files[0]);

      //   console.log(imgData, "imgData");
    }

    // };
  };
  //   console.log(imgSrc, "imgSrc");
  //   console.log(imgData[0]?.data, "data");
  console.log(imgData, "imgdata");
  //   console.log(selectedItem, "selectedItem");

  return (
    <div className="items-center w-full px-3 py-2 text-gray-600 rounded">
      <div className="px-1 text-left my-1 text-xl text-gray-500 font-regular font-normal not-italic">
        Upload Image
      </div>
      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <input
            onChange={onChangePicture}
            className="form-control
    block
    w-full
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
          />
          {/* <img src={imgData} /> */}
        </div>
      </div>
    </div>
  );
};
export default UploadComponent;
