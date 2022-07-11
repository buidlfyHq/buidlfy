import React, { FC, useState, useEffect } from "react";
import { Popover } from "@headlessui/react";
import ShortUniqueId from "short-unique-id";
import { AiOutlineDoubleLeft, AiOutlineSetting } from "react-icons/ai";
import { BiGridSmall } from "react-icons/bi";
import { components } from "./component";
import IItems from "interfaces/items";
import BgColorComponent from "../Utils/BgColorComponent";

interface ISidebar {
  className: string;
  setClassName: (className: string) => void;
  items: IItems[];
  setItems: (items: IItems[]) => void;
  setSelector: (selector: {
    methodName: string;
    type: string;
    name: string;
  }) => void;
  elementConfig: object;
  addContainer;
  settingItemId;
  backgroundColor;
  setBackgroundColor;
}

const Sidebar: FC<ISidebar> = ({
  className,
  setClassName,
  items,
  setItems,
  setSelector,
  elementConfig,
  addContainer,
  settingItemId,
  backgroundColor,
  setBackgroundColor,
}) => {
  const uid = new ShortUniqueId();
  const [indexValue, setIndexValue] = useState(0);

  const selectedItem =
    items?.find((item) => item.i === settingItemId) ||
    items?.map((item) =>
      item.children?.find((child) => child.i === settingItemId)
    )[0];

  const hideSidebar = () => {
    setClassName("hidden");
  };

  const incrementIndex = () => {
    setIndexValue(indexValue + 1);
  };

  const checkY = (items: IItems[]) => {
    if (items.length === 0) return 0;
    else {
      let arr = items.map((item) => {
        return item.name === "Container"
          ? Math.max(...item.children.map((obj) => obj.y), item.y)
          : item.y;
      });
      return Math.max(...arr) + 1;
    }
  };

  const setBgColor = (bgColor: { rgb: any }) => {
    setBackgroundColor(bgColor);
  };
  const handleSave = () => {
    if (items?.length > 0) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  };
  useEffect(() => {
    let saveItems = localStorage.getItem("items");
    if (saveItems) {
      setItems(JSON.parse(saveItems));
    }
  }, []);
  const handleClear = () => {
    localStorage.removeItem("items");
    setItems([]);
  };
  const checkContainerY = (selectedItem: IItems) => {
    if (selectedItem.children.length === 0) return 0;
    else {
      let arr = selectedItem.children.map((item) => item.y);
      return Math.max(...arr) + 1;
    }
  };

  return (
    <main
      className={`fixed left-0 top-0 z-0 w-[250px] border-r h-full ${className}`}
    >
      {/* user name */}
      <section className="flex flex-row justify-between items-center h-[60px]">
        <Popover className="relative p-3 bg-white">
          <Popover.Button>
            <span className="bg-blue-300 mr-2 rounded-[50%] p-1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            User Name
          </Popover.Button>

          <Popover.Panel className="absolute bg-white z-10 mt-5 rounded-md shadow-sm border w-[225px] p-2">
            <div className="flex flex-row items-center justify-start">
              <span className="bg-blue-300 mr-2 rounded-[50%] p-3">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <div className="flex flex-col">
                <div>User Name</div>
                <div>xyz.spheron.com</div>
              </div>
            </div>
            <hr className="my-2" />
            <div>
              <div>All Sites</div>
              <div>Create a new Site</div>
            </div>
            <hr className="my-2" />
            <div>Logout</div>
          </Popover.Panel>
        </Popover>
        {/* Toggle button */}
        <div
          onClick={hideSidebar}
          className="m-2 p-2 text-slate-600 text-[18px] hover:bg-slate-100 hover:rounded-md cursor-pointer"
        >
          <AiOutlineDoubleLeft />
        </div>
      </section>

      {/* Site settings */}
      <div className="p-3 mt-16">
        {/* <div className="flex flex-row items-center cursor-pointer">
          <span className="ml-1 mr-1 text-2xl">
            <BiGridSmall />
          </span>{" "}
          All Sites
        </div> */}
        <div className="flex flex-row items-center">
          <button
            onClick={() => handleSave()}
            className="w-fit bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
          <button
            onClick={() => handleClear()}
            className="w-fit ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Components */}
      <div className="px-6 py-3 mt-10">
        {addContainer ? (
          <>
            {components
              .filter((c) => c.name !== "Container")
              ?.map((c, index) => {
                return (
                  <div
                    key={index}
                    className="px-4 py-2 my-1 transition-colors duration-150 ease-in-out rounded-lg cursor-pointer hover:bg-slate-100"
                    onClick={() => {
                      console.log(selectedItem);
                      let y = checkContainerY(selectedItem);
                      let newC = {
                        ...c,
                        i: uid(),
                        x: 0,
                        y,
                        w: 12,
                        minW: 1,
                      };
                      // incrementIndex();
                      // console.log(newC)
                      let updatedItem = {
                        ...selectedItem,
                        children: [...selectedItem.children, newC],
                      };
                      const elementsIndex = items.findIndex(
                        (item) => item.i === selectedItem.i
                      );
                      let newArray = [...items];
                      newArray[elementsIndex] = updatedItem;
                      setItems(newArray);
                    }}
                  >
                    {c.name}
                  </div>
                );
              })}
          </>
        ) : (
          <>
            {components?.map((c, index) => {
              return (
                <div
                  key={index}
                  className="px-4 py-2 my-1 transition-colors duration-150 ease-in-out rounded-lg cursor-pointer hover:bg-slate-100"
                  onClick={() => {
                    let y = checkY(items);
                    let newC = {
                      ...c,
                      i: uid(),
                      x: 0,
                      y: y,
                      w: 12,
                      minW: 1,
                    };
                    // incrementIndex();
                    setItems([...items, newC]);
                  }}
                >
                  {c.name}
                </div>
              );
            })}
          </>
        )}
      </div>
    </main>
  );
};

export default Sidebar;
