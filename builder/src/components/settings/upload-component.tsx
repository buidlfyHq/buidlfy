import React, { FC } from "react";
import IItems from "interfaces/items";
import "styles/components.css";
import "styles/dashboard.css";

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
  const onChangeImage = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const updatedItems = items.map((item) => {
          let selectedChild = item.children?.find(
            (child) => child.i === selectedItem.i
          );
          if (item.i === selectedItem.i) {
            return {
              ...item,
              imgData: reader.result,
            };
          } else if (selectedChild?.i === selectedItem.i) {
            let child = {
              ...selectedChild,
              imgData: reader.result,
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
            className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100 file:cursor-pointer"
            type="file"
            id="formFile"
          />
        </div>
      </div>
    </div>
  );
};
export default UploadComponent;